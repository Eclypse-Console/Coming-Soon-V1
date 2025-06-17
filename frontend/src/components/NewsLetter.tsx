import { useState } from "react";
import { useForm } from "react-hook-form";
import GlowingButton from "../styles/GlowingButton";
import { GlowingEffect } from "../styles/Glowing-effect";
import { trpc } from "../lib/trpc";

interface FormData {
	email: string;
}

const NewsLetter = () => {
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
	const [isLimitReached] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<FormData>();

	const subscribeMutation = trpc.newsletter.subscribe.useMutation({
		onSuccess: (result) => {
			if (result.success) {
				setSubmitStatus('success');
				reset();
				setTimeout(() => setSubmitStatus('idle'), 3000);
			} else {
				setSubmitStatus('error');
				setTimeout(() => setSubmitStatus('idle'), 3000);
			}
		},
		onError: (error) => {
			console.error('Error submitting form:', error);
			setSubmitStatus('error');
			setTimeout(() => setSubmitStatus('idle'), 3000);
		},
	});

	const onSubmit = async (data: FormData) => {
		setSubmitStatus('submitting');
		subscribeMutation.mutateAsync({
			email: data.email.trim().toLowerCase(),
		});
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
			<form
				name="newsletter-signup"
				method="POST"
				data-netlify="true"
				data-netlify-honeypot="bot-field"
				onSubmit={handleSubmit(onSubmit)}
				className="w-full max-w-4xl mx-auto"
				noValidate
			>
				<input type="hidden" name="form-name" value="newsletter-signup" />
				<input type="hidden" name="bot-field" />

				<div className="flex flex-col items-center">
					<div className="flex flex-col lg:flex-row items-center gap-4 w-full justify-center">
						<div className="flex flex-col items-center">
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
									className="text-[#FFFFFF] focus:outline-none m-0 opacity-[70%] px-4 relative z-10"
									placeholder={isLimitReached ? "Limit reached" : "example@email.com"}
									type="email"
									disabled={isLimitReached || isSubmitting}
								/>
							</div>
						</div>
						<div className="flex flex-col items-center lg:items-start">
							<div className="w-full lg:w-auto flex justify-center items-center lg:mt-[-28px]" style={{ height: "57.24px" }}>
								<button
									type="submit"
									disabled={isSubmitting}
									style={{ background: 'none', border: 'none', padding: 0 }}
								>
									<GlowingButton />
								</button>
							</div>
						</div>
					</div>

					<div className="w-full flex justify-center mt-4">
						{errors.email && (
							<p className="text-sm text-center font-sora font-light tracking-[0.4em] text-[#9797C2]">
								{errors.email.message}
							</p>
						)}
						{getStatusMessage() && !errors.email && (
							<p className={`${getStatusColor()} text-sm text-center font-sora font-light tracking-[0.4em] text-[#9797C2]`}>
								{getStatusMessage()}
							</p>
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