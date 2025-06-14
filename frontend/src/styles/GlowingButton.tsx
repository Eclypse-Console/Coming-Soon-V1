import React, { useRef, useState } from "react";

interface GlowingButtonProps {
	onClick?: () => void;
}

const GlowingButton = ({ onClick }: GlowingButtonProps) => {
	const [position, setPosition] = useState({ x: 89, y: 31.5 }); // x centered by default (178px width / 2)
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
			className="relative w-[178px] h-[63px] cursor-pointer flex items-center justify-center"
		>
			{/* Glow effects container */}
			<div className="absolute inset-0 pointer-events-none z-20">
				<div
					className="rounded-full transition-all duration-300"
					style={{
						position: "absolute",
						width: "74.11px",
						height: "76.5px",
						left: `${position.x - 37}px`,
						top: `calc(50% - 38.25px)`, // vertically center glow
						background: "rgba(229, 118, 49, 0.69)",
						filter: "blur(39.14px)",
						opacity: isHovered ? 1 : 0,
						transition: "opacity 0.3s ease-in-out",

					}}
				/>

				<div
					className="rounded-full transition-all duration-300"
					style={{
						position: "absolute",
						width: "63.75px",
						height: "65.34px",
						left: `${position.x - 31.875}px`,
						top: `calc(50% - 32.67px)`, // vertically center glow
						background: "rgba(242, 149, 52, 1)",
						mixBlendMode: "plus-lighter",
						filter: "blur(18.38px)",
						opacity: isHovered ? 1 : 0,
						transition: "opacity 0.3s ease-in-out",

					}}
				/>
			</div>

			<div className="relative">
				<div
					className="absolute inset-0"
					style={{
						width: "178px",
						height: "67px",
						top: "-2.02px",
						left: "-4.78px",
						borderRadius: "43.83px",
						background:
							"linear-gradient(90deg, rgba(232, 232, 232, 0), rgba(130, 130, 130, 0.77))",
						zIndex: 0
					}}
				/>

				{/* Main button */}
				<button
					type="submit"
					onClick={onClick}
					className="absolute w-[174px] h-[63px] bg-[#E8E8E8] flex items-center justify-center font-bold font-[SF Pro] z-30 cursor-pointer"
					style={{
						top: "-0.02px",
						left: "-2.78px",
						borderRadius: "43.83px",
						backgroundColor: "#E8E8E8",
						position: "relative",
						zIndex: 20
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
			</div>
		</div>
	);
};

export default GlowingButton;
