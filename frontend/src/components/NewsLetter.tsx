import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newsletterSchema } from "../utils/ValidationSchema";
import type { NewsletterFormData } from "../utils/ValidationSchema";
import GlowingButton from "../styles/GlowingButton";
import { GlowingEffect } from "../styles/Glowing-effect";
import { useState, useEffect, useRef } from "react";

// Replace this with your actual Google Apps Script web app URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzfqH_wC27ShWEW6yXL-GU_EsRLD6wfZvMXqc01OLh9-hPti9jKKysERcY7G_NQgiT0dQ/exec";

const NewsLetter = () => {
	const [subscriberCount, setSubscriberCount] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(false);
	const [submitError, setSubmitError] = useState<string>("");
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<NewsletterFormData>({
		resolver: zodResolver(newsletterSchema),
	});

	// Fetch subscriber count using JSONP with better error handling
	const fetchSubscriberCount = async () => {
		try {
			const callbackName = `jsonp_callback_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
			let script: HTMLScriptElement;
			let timeoutId: NodeJS.Timeout;

			const promise = new Promise((resolve, reject) => {
				// Set up timeout
				timeoutId = setTimeout(() => {
					cleanup();
					reject(new Error('Request timeout'));
				}, 10000); // 10 second timeout

				// Set up the callback function
				(window as any)[callbackName] = (data: any) => {
					clearTimeout(timeoutId);
					cleanup();
					resolve(data);
				};

				const cleanup = () => {
					if ((window as any)[callbackName]) {
						delete (window as any)[callbackName];
					}
					if (script && script.parentNode) {
						script.parentNode.removeChild(script);
					}
				};

				// Create and append script
				script = document.createElement('script');
				script.onerror = () => {
					clearTimeout(timeoutId);
					cleanup();
					reject(new Error('JSONP request failed'));
				};

				script.onload = () => {
					// If onload fires but callback wasn't called, it's likely a CORS issue
					setTimeout(() => {
						if ((window as any)[callbackName]) {
							clearTimeout(timeoutId);
							cleanup();
							reject(new Error('Callback not executed'));
						}
					}, 1000);
				};

				script.src = `${GOOGLE_SCRIPT_URL}?type=count&callback=${callbackName}&_=${Date.now()}`;
				document.head.appendChild(script);
			});

			const data = await promise;
			setSubscriberCount((data as any).count || 0);
		} catch (error) {
			console.error("Failed to fetch subscriber count:", error);
			// Set a default count or try alternative method
			setSubscriberCount(0);
		}
	};

	useEffect(() => {
		fetchSubscriberCount();
		// Set up periodic refresh every 30 seconds
		const interval = setInterval(fetchSubscriberCount, 30000);
		return () => clearInterval(interval);
	}, []);

	const onSubmit = async (data: NewsletterFormData) => {
		setIsLoading(true);
		setSubmitError("");
		setSubmitSuccess(false);

		try {
			// Method 1: Try JSONP first
			const callbackName = `jsonp_submit_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
			let script: HTMLScriptElement;
			let timeoutId: NodeJS.Timeout;

			const jsonpPromise = new Promise((resolve, reject) => {
				timeoutId = setTimeout(() => {
					cleanup();
					reject(new Error('Request timeout'));
				}, 15000);

				(window as any)[callbackName] = (result: any) => {
					clearTimeout(timeoutId);
					cleanup();
					resolve(result);
				};

				const cleanup = () => {
					if ((window as any)[callbackName]) {
						delete (window as any)[callbackName];
					}
					if (script && script.parentNode) {
						script.parentNode.removeChild(script);
					}
				};

				script = document.createElement('script');
				script.onerror = () => {
					clearTimeout(timeoutId);
					cleanup();
					reject(new Error('JSONP request failed'));
				};

				const encodedEmail = encodeURIComponent(data.email);
				script.src = `${GOOGLE_SCRIPT_URL}?type=subscribe&email=${encodedEmail}&callback=${callbackName}&_=${Date.now()}`;
				document.head.appendChild(script);
			});

			try {
				const result = await jsonpPromise;

				if ((result as any).success) {
					console.log("Email stored successfully:", data.email);
					setSubmitSuccess(true);
					reset();
					// Refresh count after successful submission
					setTimeout(() => fetchSubscriberCount(), 1000);
				} else {
					setSubmitError((result as any).error || "Failed to subscribe");
				}
			} catch (jsonpError) {
				console.log("JSONP failed, trying form submission method...");

				// Method 2: Fallback to form submission
				await submitViaForm(data.email);
			}

		} catch (error) {
			console.error("Failed to store email:", error);
			setSubmitError("Network error. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const submitViaForm = async (email: string) => {
		return new Promise<void>((resolve, reject) => {
			const form = document.createElement('form');
			form.method = 'POST';
			form.action = GOOGLE_SCRIPT_URL;
			form.target = 'newsletter-iframe';
			form.style.display = 'none';

			const emailInput = document.createElement('input');
			emailInput.type = 'hidden';
			emailInput.name = 'email';
			emailInput.value = email;

			form.appendChild(emailInput);
			document.body.appendChild(form);

			const iframe = iframeRef.current;
			if (iframe) {
				let timeoutId: NodeJS.Timeout;

				const handleLoad = () => {
					clearTimeout(timeoutId);

					// Since we can't read the response due to CORS, 
					// we'll assume success and refresh the count
					console.log("Form submitted successfully (assuming success due to CORS)");
					setSubmitSuccess(true);
					reset();

					// Clean up
					iframe.removeEventListener('load', handleLoad);
					if (form.parentNode) {
						document.body.removeChild(form);
					}

					// Refresh count after a delay
					setTimeout(() => fetchSubscriberCount(), 2000);
					resolve();
				};

				const handleError = () => {
					clearTimeout(timeoutId);
					iframe.removeEventListener('load', handleLoad);
					iframe.removeEventListener('error', handleError);
					if (form.parentNode) {
						document.body.removeChild(form);
					}
					reject(new Error('Form submission failed'));
				};

				// Set up timeout
				timeoutId = setTimeout(() => {
					handleError();
				}, 15000);

				iframe.addEventListener('load', handleLoad);
				iframe.addEventListener('error', handleError);
				form.submit();
			} else {
				reject(new Error('Iframe not available'));
			}
		});
	};

	const remainingSpots = subscriberCount ? Math.max(0, 1000 - subscriberCount) : 1000;
	const isLimitReached = remainingSpots === 0;

	return (
		<div className="relative w-full py-16 px-4 sm:px-6 lg:px-8 z-[110]">
			{/* Hidden iframe for form submission fallback */}
			<iframe
				ref={iframeRef}
				name="newsletter-iframe"
				style={{ display: 'none' }}
				title="Newsletter submission"
			/>

			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl mx-auto">
				<div className="flex flex-col items-center">
					<div className="flex flex-col lg:flex-row items-center gap-4 w-full justify-center">
						<div className="flex flex-col">
							<div className="relative mb-4" style={{ width: "369px", height: "57.24px" }}>
								<GlowingEffect
									spread={50}
									glow={true}
									proximity={12}
									inactiveZone={0.01}
									variant="default"
									className="rounded-[40.61px]"
									disabled={isLimitReached}
									borderWidth={2}
								/>
								<input
									{...register("email")}
									style={{
										width: "369px",
										height: "57.24px",
										borderRadius: "36.23px",
										border: "2px solid #2E2E2E",
										background: "#0E0E10",
										fontSize: "16.35",
										lineHeight: "150%",
										fontFamily: "SF Pro, sans-serif",
										fontWeight: "400",
										cursor: isLimitReached ? "not-allowed" : "text"
									}}
									className="text-[#FFFFFF] focus:outline-none m-0 opacity-[70%]"
									placeholder={isLimitReached ? "Limit reached" : "example@email.com"}
									type="email"
									disabled={isLimitReached || isLoading}
								/>
							</div>
						</div>

						<div className="lg:hidden w-full flex justify-center mb-4 mt-0">
							{errors.email && (
								<p className="text-red-500 text-sm text-center">
									{errors.email.message}
								</p>
							)}
							{submitError && (
								<p className="text-red-500 text-sm text-center mt-2">
									{submitError}
								</p>
							)}
							{submitSuccess && (
								<p className="text-green-500 text-sm text-center mt-2">
									Successfully subscribed!
								</p>
							)}
						</div>

						<div className="w-full lg:w-auto flex justify-center items-center" style={{ height: "57.24px", marginTop: "-12px" }}>
							<GlowingButton
								onClick={handleSubmit(onSubmit)}

							/>
						</div>
					</div>
					<div className="hidden lg:block justify-start w-72">
						{errors.email && (
							<p className="text-red-500 text-sm mt-2 text-center lg:text-left">
								{errors.email.message}
							</p>
						)}
						{submitError && (
							<p className="text-red-500 text-sm mt-2 text-center lg:text-left">
								{submitError}
							</p>
						)}
						{submitSuccess && (
							<p className="text-green-500 text-sm mt-2 text-center lg:text-left">
								Successfully subscribed!
							</p>
						)}
					</div>

					<div className="w-full flex flex-col items-center mt-8 gap-2">
						<p
							className="text-[#FFFFFF] opacity-100 text-center"
							style={{
								lineHeight: "150%",
								fontFamily: "SF Pro, sans-serif",
								fontWeight: "400",
								fontSize: "16.25px",
								letterSpacing: "0%",
								width: "352px",
								height: "42px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							Exclusive discounts and premium offers await our first 1,000 subscribers

						</p>

						{!isLimitReached && (
							<div className="flex items-center gap-2 mt-10">
								<p className="text-[#9797C2] font-sora font-light leading-[100%] tracking-[0.4em] text-[14px] text-center md:text-[15px] lg:text-[16px] lg:text-left lg:ml-[40px]">
									{subscriberCount !== undefined
										? `${remainingSpots} SPOTS REMAINING`
										: "LOADING..."
									}
								</p>
								{subscriberCount !== undefined && (
									<div className="flex items-center gap-3">
										<div className="relative w-32 bg-[#1A1A1A] rounded-full h-3 border border-[#2E2E2E] overflow-hidden shadow-inner">
											<div
												className="absolute inset-0 bg-gradient-to-r from-[#171717D9] via-[#7C3AED] to-[#A855F7] h-full rounded-full transition-all duration-700 ease-out shadow-lg"
												style={{
													width: `${((subscriberCount / 1000) * 100).toFixed(1)}%`,
													boxShadow: '0 0 10px rgba(168, 85, 247, 0.4)'
												}}
											>
												<div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 rounded-full"></div>
											</div>
										</div>
										<span className="text-[#9797C2] font-sora font-light leading-[100%] tracking-[0.3em] text-[12px] md:text-[13px] lg:text-[14px]">
											{((subscriberCount / 1000) * 100).toFixed(0)}% FILLED
										</span>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default NewsLetter;