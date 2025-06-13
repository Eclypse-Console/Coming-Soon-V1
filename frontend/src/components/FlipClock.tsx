import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";

interface FlipCardProps {
	value: string;
}

interface TimeState {
	years: string;
	months: string;
	days: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ value }) => {
	const [displayValue, setDisplayValue] = useState(value);
	const [isFlipping, setIsFlipping] = useState(false);
	const [previousValue, setPreviousValue] = useState(value);

	useEffect(() => {
		if (value !== displayValue) {
			setIsFlipping(true);
			setPreviousValue(displayValue);
			setTimeout(() => setDisplayValue(value), 400);
			setTimeout(() => setIsFlipping(false), 800);
		}
	}, [value, displayValue]);

	return (
		<div
			className="relative w-[103.34px] h-[83.82px] md:w-[166.75px] md:h-[135.25px] lg:w-[199.84px] lg:h-[162.1px]"
			style={{ perspective: "2000px" }}
		>
			<div
				className="absolute inset-0 rounded-2xl p-[1.52px] md:p-[2.1px] lg:p-[2.53px] z-0"
				style={{
					background:
						"linear-gradient(156.52deg, rgba(255, 255, 255, 0.4) 2.12%, rgba(255, 255, 255, 0.0001) 39%, rgba(255, 255, 255, 0.0001) 54.33%, rgba(255, 255, 255, 0.1) 93.02%)",
					WebkitMaskImage: "-webkit-radial-gradient(white, black)",
				}}
			>
				<div
					className="flip-card-wrapper relative w-full h-full rounded-2xl overflow-hidden shadow-2xl z-10"
					style={{ background: "#171717D9", backgroundBlendMode: "luminosity" }}
				>
					<div
						className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50 rounded-r-sm w-[3.9915px] h-[11.0876px] md:w-[5.85px] md:h-[16.25px] lg:w-[7.7191px] lg:h-[21.4419px]"
						style={{
							background: "linear-gradient(180deg, #D9D9D9 0%, #211D1D 100%)",
						}}
					/>
					<div
						className="absolute right-0 top-1/2 transform -translate-y-1/2 z-50 rounded-l-sm w-[3.9915px] h-[11.0876px] md:w-[5.85px] md:h-[16.25px] lg:w-[7.7191px] lg:h-[21.4419px]"
						style={{
							background: "linear-gradient(180deg, #D9D9D9 0%, #211D1D 100%)",
						}}
					/>

					<div
						className="flip-card-top absolute w-full h-1/2 top-0 flex items-center justify-center overflow-hidden"
						style={{
							background: "#171717D9",
							backgroundBlendMode: "luminosity",
						}}
					>
						<span
							className="text-[41.5px] md:text-[67px] lg:text-[80.25px] leading-[69.45px] md:leading-[112px] lg:leading-[134.32px] font-black select-none w-full text-center flex items-center justify-center h-full relative top-1/2 drop-shadow-lg tracking-wider"
							style={{
								fontFamily: "Akira Expanded",
								fontWeight: 800,
								letterSpacing: "-2%",
								background:
									"linear-gradient(277.72deg, #FFFFFF 75.67%, rgba(255, 255, 255, 0) 117.51%)",
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								WebkitTextFillColor: "transparent",
							}}
						>
							{displayValue}
						</span>
					</div>

					<div
						className="flip-card-bottom absolute w-full h-1/2 bottom-0 flex items-center justify-center overflow-hidden"
						style={{
							background: "#171717D9",
							backgroundBlendMode: "luminosity",
						}}
					>
						<span
							className="text-[41.5px] md:text-[67px] lg:text-[80.25px] leading-[69.45px] md:leading-[112px] lg:leading-[134.32px] font-black select-none w-full text-center flex items-center justify-center h-full relative -top-1/2 drop-shadow-lg tracking-wider"
							style={{
								fontFamily: "Akira Expanded",
								fontWeight: 800,
								letterSpacing: "-2%",
								background:
									"linear-gradient(277.72deg, #FFFFFF 75.67%, rgba(255, 255, 255, 0) 117.51%)",
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								WebkitTextFillColor: "transparent",
							}}
						>
							{displayValue}
						</span>
					</div>

					<AnimatePresence mode="wait">
						{isFlipping && (
							<>
								<motion.div
									className="flip-element-top absolute w-full h-1/2 top-0 flex items-center justify-center overflow-hidden z-20"
									style={{
										transformOrigin: "bottom center",
										transformStyle: "preserve-3d",
										background: "#171717D9",
										backgroundBlendMode: "luminosity",
									}}
									initial={{ rotateX: 0 }}
									animate={{ rotateX: -90 }}
									transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
								>
									<span
										className="text-[41.5px] md:text-[67px] lg:text-[80.25px] leading-[69.45px] md:leading-[112px] lg:leading-[134.32px] font-black select-none w-full text-center flex items-center justify-center h-full relative top-1/2 drop-shadow-lg tracking-wider"
										style={{
											fontFamily: "Akira Expanded",
											fontWeight: 800,
											letterSpacing: "-2%",
											backfaceVisibility: "hidden",
											background:
												"linear-gradient(277.72deg, #FFFFFF 75.67%, rgba(255, 255, 255, 0) 117.51%)",
											WebkitBackgroundClip: "text",
											backgroundClip: "text",
											WebkitTextFillColor: "transparent",
										}}
									>
										{previousValue}
									</span>
								</motion.div>

								<motion.div
									className="flip-element-bottom absolute w-full h-1/2 bottom-0 flex items-center justify-center overflow-hidden z-10"
									style={{
										transformOrigin: "top center",
										transformStyle: "preserve-3d",
										background: "#171717D9",
										backgroundBlendMode: "luminosity",
									}}
									initial={{ rotateX: 90 }}
									animate={{ rotateX: 0 }}
									transition={{
										duration: 0.4,
										delay: 0.4,
										ease: [0.25, 0.46, 0.45, 0.94],
									}}
								>
									<span
										className="text-[41.5px] md:text-[67px] lg:text-[80.25px] leading-[69.45px] md:leading-[112px] lg:leading-[134.32px] font-black select-none w-full text-center flex items-center justify-center h-full relative -top-1/2 drop-shadow-lg tracking-wider"
										style={{
											fontFamily: "Akira Expanded",
											fontWeight: 800,
											letterSpacing: "-2%",
											backfaceVisibility: "hidden",
											background:
												"linear-gradient(277.72deg, #FFFFFF 75.67%, rgba(255, 255, 255, 0) 117.51%)",
											WebkitBackgroundClip: "text",
											backgroundClip: "text",
											WebkitTextFillColor: "transparent",
										}}
									>
										{value}
									</span>
								</motion.div>

								<motion.div
									className="absolute inset-0 rounded-2xl pointer-events-none z-30"
									initial={{ opacity: 0 }}
									animate={{ opacity: [0, 0.3, 0.3, 0] }}
									transition={{ duration: 0.8, times: [0, 0.25, 0.75, 1] }}
									style={{
										background:
											"linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
									}}
								/>
							</>
						)}
					</AnimatePresence>

					<div className="absolute w-full h-px top-1/2 transform -translate-y-px bg-white z-40 shadow-lg" />
				</div>
			</div>
		</div>
	);
};

const FlipClock: React.FC = () => {
	const [time, setTime] = useState<TimeState>({
		years: "00",
		months: "00",
		days: "00",
	});

	useEffect(() => {
		const calculateCountdown = () => {
			const now = new Date();
			const target = new Date("2025-09-06T00:00:00");

			let years = target.getFullYear() - now.getFullYear();
			let months = target.getMonth() - now.getMonth();
			let days = target.getDate() - now.getDate();

			if (days < 0) {
				months -= 1;
				days += new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
			}

			if (months < 0) {
				years -= 1;
				months += 12;
			}

			setTime({
				years: String(Math.max(0, years)).padStart(2, "0"),
				months: String(Math.max(0, months)).padStart(2, "0"),
				days: String(Math.max(0, days)).padStart(2, "0"),
			});
		};

		calculateCountdown();
		const interval = setInterval(calculateCountdown, 60000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-col overlay-effect">
			<div
				className="w-[321px] h-[45px] md:w-[460px] md:h-[65px] lg:w-[571px] lg:h-[80px] flex items-center justify-center mx-auto text-[36px] md:text-[50px] lg:text-[64px]"
				style={{
					fontFamily: "Krona One",
					fontWeight: 400,
					lineHeight: "100%",
					letterSpacing: "-3%",
					background: "#8C7ABC",
					WebkitBackgroundClip: "text",
					backgroundClip: "text",
					WebkitTextFillColor: "transparent",
				}}
			>
				Coming Soon
			</div>

			<div className="flip-clock-container w-[340px] h-[83.82px] md:w-[550px] md:h-[135px] lg:w-[657.52px] lg:h-[162.1px] mt-[50px] mx-auto overflow-hidden">
				<motion.div
					className="flip-clock flex gap-3 md:gap-5 lg:gap-6 items-center justify-center w-full h-full"
					initial={{ opacity: 0, scale: 0.8, y: 50 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					transition={{ duration: 1.2, ease: "easeOut" }}
				>
					<FlipCard value={time.years} />
					<FlipCard value={time.months} />
					<FlipCard value={time.days} />
				</motion.div>
			</div>

			<div className="relative mt-4">
				{["YEAR", "MONTH", "DAY"].map((label, i) => {
					const positions = [
						["left-[33px]", "md:left-[62px]", "lg:left-[76px]"],
						["left-[150px]", "md:left-[250px]", "lg:left-[298px]"],
						["left-[263px]", "md:left-[438px]", "lg:left-[522px]"],
					];
					return (
						<div
							key={label}
							className={`absolute ${positions[i][0]} ${positions[i][1]} ${positions[i][2]} w-[45px] h-[18px] md:w-[53px] md:h-[22px] lg:w-[61px] lg:h-6 opacity-60 text-white flex items-center justify-center text-center text-[12px] md:text-[14px] lg:text-[16.25px]`}
							style={{
								fontFamily: "Akira Expanded",
								fontWeight: 800,
								lineHeight: "150%",
								letterSpacing: "0%",
							}}
						>
							{label}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default FlipClock;
