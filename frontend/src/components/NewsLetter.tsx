import React, { useState } from "react";
import { useForm } from "react-hook-form";
import GlowingButton from "../styles/GlowingButton";
import { GlowingEffect } from "../styles/Glowing-effect";

interface FormData {
	email: string;
}

const NewsLetter = () => {
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
	const [isLimitReached, setIsLimitReached] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<FormData>();

	const encode = (data: Record<string, string>) => {
		return Object.keys(data)
			.map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
			.join("&");
	};

	const onSubmit = async (data: FormData) => {
		// Prevent default form submission
		setSubmitStatus('submitting');

		try {
			// More robust fetch with timeout and error handling
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

			const response = await fetch("/", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
				},
				body: encode({
					"form-name": "newsletter-signup",
					"email": data.email.trim().toLowerCase() // Normalize email
				}),
				signal: controller.signal
			});

			clearTimeout(timeoutId);

			// Check for successful response (including redirects)
			if (response.ok || response.status === 302 || response.status === 200) {
				setSubmitStatus('success');
				reset();
				setTimeout(() => setSubmitStatus('idle'), 3000);
			} else {
				console.error('Response not OK:', response.status, response.statusText);
				throw new Error(`HTTP error! status: ${response.status}`);
			}
		} catch (error) {
			console.error('Error submitting form:', error);

			// More specific error handling
			// if (error.name === 'AbortError') {
			// 	console.error('Form submission timed out');
			// } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
			// 	console.error('Network error - possibly offline or connectivity issue');
			// }

			setSubmitStatus('error');
			setTimeout(() => setSubmitStatus('idle'), 3000);
		}
	};

	// Handle form submission with preventDefault
	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSubmit(onSubmit)(e);
	};

	const getStatusMessage = () => {
		switch (submitStatus) {
			case 'submitting':
				return 'Submitting...';
			case 'success':
				return 'Successfully subscribed!';
			case 'error':
				return 'Something went wrong. Please try again.';
			default:
				return '';
		}
	};

	const getStatusColor = () => {
		switch (submitStatus) {
			case 'success':
				return 'text-green-500';
			case 'error':
				return 'text-red-500';
			default:
				return 'text-blue-500';
		}
	};

	const isSubmitting = submitStatus === 'submitting';

	return (
		<div className="relative w-full py-16 px-4 sm:px-6 lg:px-8 z-[110]">
			{/* Hidden form for Netlify bot detection */}
			<form name="newsletter-signup" data-netlify="true" style={{ display: 'none' }}>
				<input type="email" name="email" />
			</form>

			<form
				name="newsletter-signup"
				method="POST"
				data-netlify="true"
				data-netlify-honeypot="bot-field"
				onSubmit={handleFormSubmit}
				className="w-full max-w-4xl mx-auto"
				noValidate
			>
				{/* Hidden inputs for Netlify */}
				<input type="hidden" name="form-name" value="newsletter-signup" />
				<input type="hidden" name="bot-field" />

				<div className="flex flex-col items-center">
					<div className="flex flex-col lg:flex-row items-center gap-4 w-full justify-center">
						<div className="flex flex-col">
							<div className="relative mb-4 border-none" style={{ width: "369px", height: "57.24px" }}>
								<GlowingEffect
									spread={50}
									glow={true}
									proximity={12}
									inactiveZone={0.01}
									variant="default"
									className="rounded-[40.61px] absolute inset-0 z-0"
									borderWidth={2}
									disabled={false}
								/>
								<input
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: "Invalid email address"
										}
									})}
									name="email"
									style={{
										width: "369px",
										height: "57.24px",
										borderRadius: "36.23px",
										border: "2px solid #2E2E2E",
										background: "#0E0E10",
										fontSize: "16.35px",
										lineHeight: "150%",
										fontFamily: "SF Pro, sans-serif",
										fontWeight: "400",
										cursor: isLimitReached ? "not-allowed" : "text",

										position: "relative",

									}}
									className="text-[#FFFFFF] focus:outline-none m-0 opacity-[70%] px-4 relative z-10 "
									placeholder={isLimitReached ? "Limit reached" : "example@email.com"}
									type="email"
									disabled={isLimitReached || isSubmitting}
								/>
							</div>
						</div>

						<div className="w-full lg:w-auto flex justify-center items-center md:align-middle sm:align-middle" style={{ height: "57.24px", marginTop: "-28px" }}>
							<button
								type="submit"
								disabled={isSubmitting}
								style={{ background: 'none', border: 'none', padding: 0 }}
							>
								<GlowingButton />
							</button>
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