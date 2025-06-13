import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
		<div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl">
				<div className="flex flex-col items-center">
					<div className="flex flex-col lg:flex-row items-center gap-4 w-full justify-center">
						<div className="flex flex-col">
							<div className="relative" style={{ width: "375.83px" }}>
								<GlowingEffect
									spread={50}
									glow={true}
									proximity={12}
									inactiveZone={0.01}
									variant="default"
									className="rounded-[40.61px]"
									disabled={false}
									borderWidth={1.31}
								/>
								<input
									{...register("email")}
									style={{
										width: "375.83px",
										height: "64.17px",
										borderRadius: "40.61px",
										border: "1.31px solid #2E2E2E",
										background: "#0E0E10",
										paddingLeft: "30px",
										fontSize: "18px",
										lineHeight: "1.5",
										position: "relative",
										zIndex: 1,
									}}
									className="text-white focus:outline-none"
									placeholder="example@email.com"
									type="email"
								/>
							</div>
							{errors.email && (
								<p className="text-red-500 text-sm mt-2 text-center lg:text-left">
									{errors.email.message}
								</p>
							)}
						</div>
						<div className="w-full lg:w-auto flex justify-center">
							<button type="submit">
								<GlowingButton />
							</button>
						</div>
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
								width: "422px",
								height: "48px",
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
