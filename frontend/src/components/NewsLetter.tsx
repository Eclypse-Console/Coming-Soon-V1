import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newsletterSchema } from "../utils/ValidationSchema";
import type { NewsletterFormData } from "../utils/ValidationSchema";
import GlowingButton from "../styles/GlowingButton";
import { GlowingEffect } from "../styles/Glowing-effect";
import { trpc } from "../utils/trpc";

const NewsLetter = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<NewsletterFormData>({
		resolver: zodResolver(newsletterSchema),
	});


	const { data: subscriberCount, refetch: refetchCount } = trpc.newsletter.getSubscriberCount.useQuery();

	const addUserMutation = trpc.newsletter.addUser.useMutation({
		onSuccess: (data) => {
			console.log("Email stored successfully:", data.email);
			reset();

			refetchCount();
		},
		onError: (error) => {
			console.error("Failed to store email:", error);
		},
	});

	const onSubmit = (data: NewsletterFormData) => {
		addUserMutation.mutate({
			email: data.email,
		});
	};


	const remainingSpots = subscriberCount ? Math.max(0, 1000 - subscriberCount) : 1000;
	const isLimitReached = remainingSpots === 0;

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
									disabled={isLimitReached}
								/>
							</div>
						</div>

						<div className="lg:hidden w-full flex justify-center mb-4 mt-0">
							{errors.email && (
								<p className="text-red-500 text-sm text-center">
									{errors.email.message}
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