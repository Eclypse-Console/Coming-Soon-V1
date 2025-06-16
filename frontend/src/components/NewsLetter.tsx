/* eslint-disable @typescript-eslint/no-explicit-any */
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
	const [, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string>("");
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	// Add effect to clear success message after 2.5 seconds
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		if (submitSuccess) {
			timeoutId = setTimeout(() => {
				setSubmitSuccess(false);
			}, 2500);
		}
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [submitSuccess]);

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
		setIsLoading(true);
		try {
			const callbackName = `jsonp_callback_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
			let script: HTMLScriptElement;
			let timeoutId: NodeJS.Timeout;

			const promise = new Promise((resolve, reject) => {
				
				timeoutId = setTimeout(() => {
					cleanup();
					reject(new Error('Request timeout'));
				}, 10000); 

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

				script = document.createElement('script');
				script.onerror = () => {
					clearTimeout(timeoutId);
					cleanup();
					reject(new Error('JSONP request failed'));
				};

				script.onload = () => {
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
			const actualCount = (data as any).count || 0;
			setSubscriberCount(actualCount);

		} catch (error) {
			console.error("Failed to fetch subscriber count:", error);
			// Keep the current count if fetch fails, don't reset to 0
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchSubscriberCount();
		// Set up periodic refresh every 10 seconds for more real-time updates
		const interval = setInterval(fetchSubscriberCount, 10000);
		return () => clearInterval(interval);
	}, []); // Added dependency array to prevent infinite re-renders

	const onSubmit = async (data: NewsletterFormData) => {
		setIsSubmitting(true);
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

					// Immediately refresh count from Google Sheets after successful submission
					setTimeout(() => fetchSubscriberCount(), 500);
					// Refresh again after a bit more time to ensure consistency
					setTimeout(() => fetchSubscriberCount(), 2000);
				} else {
					setSubmitError((result as any).error || "Failed to subscribe");
				}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (jsonpError) {
				console.log("JSONP failed, trying form submission method...");

				// Method 2: Fallback to form submission
				await submitViaForm(data.email);
			}

		} catch (error) {
			console.error("Failed to store email:", error);
			setSubmitError("Network error. Please try again.");
		} finally {
			setIsSubmitting(false);
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
				// eslint-disable-next-line prefer-const
				let timeoutId: NodeJS.Timeout;

				const handleLoad = () => {
					clearTimeout(timeoutId);
					
					console.log("Form submitted successfully (assuming success due to CORS)");
					setSubmitSuccess(true);
					reset();

					iframe.removeEventListener('load', handleLoad);
					if (form.parentNode) {
						document.body.removeChild(form);
					}

					// Refresh count from Google Sheets after form submission
					setTimeout(() => fetchSubscriberCount(), 1000);
					setTimeout(() => fetchSubscriberCount(), 3000);
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

	// Use only the Google Sheets count, no local state tracking
	const remainingSpots = Math.max(0, 1000 - subscriberCount);
	const isLimitReached = remainingSpots === 0;

	const getStatusMessage = () => {
		if (isSubmitting) {
			return "Submitting... (This usually takes 15 seconds)";
		}
		if (submitSuccess) {
			return "Successfully submitted!";
		}
		if (submitError) {
			return submitError;
		}
		return "";
	};

	const getStatusColor = () => {
		if (isSubmitting) {
			return "text-blue-500";
		}
		if (submitSuccess) {
			return "text-green-500";
		}
		if (submitError) {
			return "text-red-500";
		}
		return "";
	};

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
									disabled={isLimitReached || isSubmitting}
								/>
							</div>
						</div>

						<div className="lg:hidden w-full flex justify-center mb-4 mt-0">
							{errors.email && (
								<p className="text-red-500 text-sm text-center font-sora font-light tracking-[0.4em] text-[#9797C2]">
									{errors.email.message}
								</p>
							)}
							{getStatusMessage() && (
								<p className={`${getStatusColor()} text-sm text-center mt-2 font-sora font-light tracking-[0.4em] text-[#9797C2]`}>
									{getStatusMessage()}
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
							<p className="text-red-500 text-sm mt-2 text-center lg:text-left font-sora font-light tracking-[0.4em] text-[#9797C2]">
								{errors.email.message}
							</p>
						)}
						{getStatusMessage() && !errors.email && (
							<p className={`${getStatusColor()} text-sm mt-2 text-center lg:text-left font-sora font-light tracking-[0.4em] text-[#9797C2]`}>
								{getStatusMessage()}
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

						
					</div>
				</div>
			</form>
		</div>
	);
};

export default NewsLetter;