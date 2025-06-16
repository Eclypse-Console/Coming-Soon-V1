/* eslint-disable prefer-const */
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
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string>("");
	const [submitSuccess, setSubmitSuccess] = useState(false);
	const iframeRef = useRef<HTMLIFrameElement>(null);

	// Clear success/error messages after timeout
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		if (submitSuccess || submitError) {
			timeoutId = setTimeout(() => {
				setSubmitSuccess(false);
				setSubmitError("");
			}, 3000);
		}
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [submitSuccess, submitError]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<NewsletterFormData>({
		resolver: zodResolver(newsletterSchema),
	});

	const onSubmit = async (data: NewsletterFormData) => {
		setIsSubmitting(true);
		setSubmitError("");
		setSubmitSuccess(false);

		try {
			// Method 1: Try JSONP first with better error handling
			const result = await submitViaJsonp(data.email);

			if (result.success) {
				console.log("Email stored successfully via JSONP:", result.email || data.email);
				setSubmitSuccess(true);
				reset();
			} else {
				throw new Error(result.error || "Failed to subscribe");
			}

		} catch (jsonpError) {
			console.log("JSONP failed, trying form submission method...", jsonpError);

			try {
				// Method 2: Fallback to form submission
				await submitViaForm(data.email);
				console.log("Email stored successfully via form submission");
				setSubmitSuccess(true);
				reset();
			} catch (formError) {
				console.error("Both methods failed:", { jsonpError, formError });
				setSubmitError("Failed to subscribe. Please try again.");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const submitViaJsonp = async (email: string): Promise<any> => {
		return new Promise((resolve, reject) => {
			const callbackName = `jsonp_submit_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
			let script: HTMLScriptElement;
			let timeoutId: NodeJS.Timeout;

			const cleanup = () => {
				if ((window as any)[callbackName]) {
					delete (window as any)[callbackName];
				}
				if (script && script.parentNode) {
					script.parentNode.removeChild(script);
				}
				if (timeoutId) {
					clearTimeout(timeoutId);
				}
			};

			// Set up timeout (increased to 20 seconds)
			timeoutId = setTimeout(() => {
				cleanup();
				reject(new Error('Request timeout'));
			}, 20000);

			// Set up callback
			(window as any)[callbackName] = (result: any) => {
				cleanup();
				if (result.success) {
					resolve(result);
				} else {
					reject(new Error(result.error || 'Unknown error'));
				}
			};

			// Create and configure script
			script = document.createElement('script');
			script.onerror = () => {
				cleanup();
				reject(new Error('JSONP request failed'));
			};

			// Add cache busting and proper encoding
			const encodedEmail = encodeURIComponent(email.trim());
			const timestamp = Date.now();
			script.src = `${GOOGLE_SCRIPT_URL}?type=subscribe&email=${encodedEmail}&callback=${callbackName}&_=${timestamp}`;

			document.head.appendChild(script);
		});
	};

	const submitViaForm = async (email: string): Promise<void> => {
		return new Promise<void>((resolve, reject) => {
			const form = document.createElement('form');
			form.method = 'POST';
			form.action = GOOGLE_SCRIPT_URL;
			form.target = 'newsletter-iframe';
			form.style.display = 'none';

			const emailInput = document.createElement('input');
			emailInput.type = 'hidden';
			emailInput.name = 'email';
			emailInput.value = email.trim();

			const typeInput = document.createElement('input');
			typeInput.type = 'hidden';
			typeInput.name = 'type';
			typeInput.value = 'subscribe';

			form.appendChild(emailInput);
			form.appendChild(typeInput);
			document.body.appendChild(form);

			const iframe = iframeRef.current;
			if (iframe) {
				let timeoutId: NodeJS.Timeout;
				let resolved = false;

				const cleanup = () => {
					if (timeoutId) {
						clearTimeout(timeoutId);
					}
					iframe.removeEventListener('load', handleLoad);
					iframe.removeEventListener('error', handleError);

					if (form.parentNode) {
						document.body.removeChild(form);
					}
				};

				const handleLoad = () => {
					if (resolved) return;
					resolved = true;

					cleanup();
					console.log("Form submitted successfully");

					// For form submissions, we assume success since we can't read the response
					// The backend logging will help us debug any actual failures
					resolve();
				};

				const handleError = () => {
					if (resolved) return;
					resolved = true;

					cleanup();
					reject(new Error('Form submission failed'));
				};

				// Set up timeout - longer timeout for form submissions
				timeoutId = setTimeout(() => {
					if (resolved) return;
					resolved = true;

					cleanup();
					reject(new Error('Form submission timeout'));
				}, 25000); // 25 seconds timeout

				iframe.addEventListener('load', handleLoad);
				iframe.addEventListener('error', handleError);

				try {
					form.submit();
					console.log("Form submission initiated for email:", email);
				} catch (submitError) {
					if (!resolved) {
						resolved = true;
						cleanup();
						reject(new Error('Failed to submit form: ' + submitError));
					}
				}
			} else {
				if (form.parentNode) {
					document.body.removeChild(form);
				}
				reject(new Error('Iframe not available'));
			}
		});
	};

	const getStatusMessage = () => {
		if (isSubmitting) {
			return (
				<div className="flex flex-col items-center whitespace-nowrap">
					<span>Submitting...</span>
					<span>(This usually takes 15 seconds)</span>
				</div>
			);
		}
		if (submitSuccess) {
			return "Successfully subscribed!";
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
									disabled={isSubmitting}
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
										cursor: isSubmitting ? "not-allowed" : "text"
									}}
									className="text-[#FFFFFF] focus:outline-none m-0 opacity-[70%]"
									placeholder="example@email.com"
									type="email"
									disabled={isSubmitting}
								/>
							</div>
						</div>

						<div className="lg:hidden w-full flex justify-center mb-4 mt-0">
							{errors.email && (
								<p className="text-red-500 text-sm text-center font-sora font-light tracking-[0.4em]">
									{errors.email.message}
								</p>
							)}
							{getStatusMessage() && !errors.email && (
								<p className={`${getStatusColor()} text-sm text-center mt-2 font-sora font-light tracking-[0.4em] text-[#9797C2]`}>
									{typeof getStatusMessage() === 'string' ? getStatusMessage() : ''}
								</p>
							)}
							{typeof getStatusMessage() !== 'string' && getStatusMessage() && (
								<div className={`${getStatusColor()} text-sm text-center mt-2 font-sora font-light tracking-[0.4em] text-[#9797C2]`}>
									{getStatusMessage()}
								</div>
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
							<p className="text-red-500 text-sm mt-2 text-center lg:text-left font-sora font-light tracking-[0.4em]">
								{errors.email.message}
							</p>
						)}
						{getStatusMessage() && !errors.email && (
							<>
								{typeof getStatusMessage() === 'string' ? (
									<p className={`${getStatusColor()} text-sm mt-2 text-center lg:text-left font-sora font-light tracking-[0.4em] text-[#9797C2]`}>
										{getStatusMessage()}
									</p>
								) : (
									<div className={`${getStatusColor()} text-sm mt-2 text-center lg:text-left font-sora font-light tracking-[0.4em] text-[#9797C2]`}>
										{getStatusMessage()}
									</div>
								)}
							</>
						)}
					</div>

					<div className="w-full flex flex-col items-center mt-8 gap-2">
						<p
							className="text-[#FFFFFF] opacity-60 text-center text-[12px] md:text-[14px] lg:text-[16.25px] flex flex-col items-center gap-1"
							style={{
								lineHeight: "150%",
								fontFamily: "Akira Expanded",
								fontWeight: 400,
								letterSpacing: "0%",
								height: "auto",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<div>Exclusive discounts and premium</div>
							<div>offers await our first 1,000</div>
							<div>subscribers</div>
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default NewsLetter;