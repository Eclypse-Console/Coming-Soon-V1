import React from "react";
import { useRef, useState } from "react";

const GlowingButton = () => {
	const [position, setPosition] = useState({ x: 55, y: 0 });
	const [isHovered, setIsHovered] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isHovered) return;

		const rect = buttonRef.current?.getBoundingClientRect();
		if (rect) {
			let x = e.clientX - rect.left;
			const glowWidth = 74.11;
			const glowRadius = glowWidth / 2;
			const minX = glowRadius;
			const maxX = rect.width - glowRadius;
			x = Math.max(minX, Math.min(x, maxX));
			setPosition({ x, y: rect.height / 2 });
		}
	};

	return (
		<div
			ref={buttonRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="relative w-[178px] h-[63px]"
		>
			<div
				className="absolute"
				style={{
					width: "178px",
					height: "63px",
					top: "-2.02px",
					left: "-4.78px",
					borderRadius: "43.83px",
					background:
						"linear-gradient(90deg, rgba(232, 232, 232, 0), rgba(130, 130, 130, 0.77))",
				}}
			/>

			<button
				type="button"
				className="absolute w-[173px] h-[58px] bg-[#E8E8E8] flex items-center justify-center font-bold font-[SF Pro]"
				style={{
					top: "-0.02px",
					left: "-2.78px",
					borderRadius: "43.83px",
					cursor: "pointer",
				}}
			>
				<span
					style={{
						opacity: "0.7",
						fontFamily: "SF Pro, sans-serif",
						width: "74px",
						height: "29px",
						top: "14px",
						left: "50px",
						fontWeight: "700",
						fontSize: "19.13px",
						lineHeight: "150%",
						color: "#000000",
						letterSpacing: "0",
					}}
				>
					Sign Up
				</span>
			</button>

			<div className="absolute pointer-events-none">
				<div
					className="rounded-full transition-all duration-300"
					style={{
						position: "absolute",
						width: "74.11px",
						height: "76.5px",
						left: `${position.x - 37}px`,
						top: "-10.36px",
						background: "rgba(229, 118, 49, 0.69)",
						filter: "blur(79.14px)",
						opacity: isHovered ? 1 : 0,
						transform: `translateX(${isHovered ? "0" : "0"})`,
						transition: "opacity 0.3s ease-in-out",
					}}
				/>

				<div
					className="rounded-full transition-all duration-300"
					style={{
						position: "absolute",
						width: "63.75px",
						height: "65.34px",
						left: `${position.x - 37}px`,
						top: "-4.78px",
						background: "rgba(242, 149, 52, 1)",
						mixBlendMode: "plus-lighter",
						filter: "blur(16.38px)",
						opacity: isHovered ? 1 : 0,
						transform: `translateX(${isHovered ? "0" : "0"})`,
						transition: "opacity 0.3s ease-in-out",
					}}
				/>
			</div>
		</div>
	);
};

export default GlowingButton;
