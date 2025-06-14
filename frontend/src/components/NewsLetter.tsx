import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newsletterSchema } from "../utils/ValidationSchema";
import type { NewsletterFormData } from "../utils/ValidationSchema";
import GlowingButton from "../styles/GlowingButton";
import { GlowingEffect } from "../styles/Glowing-effect";

const NewsLetter = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<NewsletterFormData>({
		resolver: zodResolver(newsletterSchema),
	});

	const onSubmit = (data: NewsletterFormData) => {
		try {
			localStorage.setItem("email", data.email);
			console.log("Email stored successfully:", data.email);
			reset();
		} catch (error) {
			console.error("Failed to store email:", error);
		}
	};

	return (
		<div className="relative w-full py-16 px-4 sm:px-6 lg:px-8 z-[110]">
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
									disabled={false}
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
										cursor: "text"
									}}
									className="text-[#FFFFFF] focus:outline-none m-0 opacity-[70%]"
									placeholder="example@email.com"
									type="email"
								/>
							</div>
							{/* Error message for desktop */}

						</div>

						{/* Error message for mobile */}
						<div className="lg:hidden w-full flex justify-center mb-4 mt-0">
							{errors.email && (
								<p className="text-red-500 text-sm text-center">
									{errors.email.message}
								</p>
							)}
						</div>

						<div className="w-full lg:w-auto flex justify-center items-center" style={{ height: "57.24px", marginTop: "-12px" }}>
							<GlowingButton onClick={handleSubmit(onSubmit)} />
						</div>
					</div>
					<div className="hidden lg:block justify-start w-72">
						{errors.email && (
							<p className="text-red-500 text-sm mt-2 text-center lg:text-left">
								{errors.email.message}
							</p>
						)}
					</div>

					<div className="w-full flex justify-center mt-8">
						<p
							className="text-[#FFFFFF] opacity-60 text-center"
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
							Sign up for our newsletter to receive the latest updates and
							insights straight to your inbox
						</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default NewsLetter;
