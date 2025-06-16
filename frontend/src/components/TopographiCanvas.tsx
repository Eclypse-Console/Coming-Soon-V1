import React, { useEffect, useRef } from 'react';

const topographicBg = '/assets/svg/topographic-bg.svg';

const MIN_OPACITY = 0.01;
const MAX_OPACITY = 0.25;
const FADE_IN_DURATION = 90;
const FADE_OUT_DURATION = 900;
const THROTTLE_INTERVAL = 50;
const MAX_POINTS = 15;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

interface Point {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    fadingIn: boolean;
    elapsed: number;
}

interface TopographicCanvasProps {
    height: number;
    offsetY: number;
    className?: string;
}

const TopographicCanvas: React.FC<TopographicCanvasProps> = ({ height, offsetY, className = '' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bgImageRef = useRef<HTMLImageElement | null>(null);
    const pointsRef = useRef<Point[]>([]);
    const lastInteractionTime = useRef<number>(0);
    const animationId = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const isMobile = () => window.innerWidth <= 768;

        const resizeCanvas = () => {
            if (isMobile()) {
                canvas.width = 950 * dpr;
                canvas.height = height * dpr;
                canvas.style.width = '950px';
                canvas.style.height = `${height}px`;
            } else {
                canvas.width = window.innerWidth * dpr;
                canvas.height = height * dpr;
                canvas.style.width = `${window.innerWidth}px`;
                canvas.style.height = `${height}px`;
            }
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const img = new Image();
        img.src = topographicBg;
        img.onload = () => {
            bgImageRef.current = img;
            requestAnimationFrame(animate);
        };

        const handleInteraction = (clientX: number, clientY: number) => {
            const now = Date.now();
            if (now - lastInteractionTime.current < THROTTLE_INTERVAL) return;
            lastInteractionTime.current = now;

            const rect = canvas.getBoundingClientRect();
            if (clientY >= rect.top && clientY <= rect.bottom) {
                const adjustedX = (clientX - rect.left) / dpr;
                const adjustedY = (clientY - rect.top) / dpr;

                if (pointsRef.current.length >= MAX_POINTS) {
                    pointsRef.current.shift();
                }

                pointsRef.current.push({
                    x: adjustedX,
                    y: adjustedY,
                    radius: isMobile() ? 67.5 : 80,
                    opacity: MIN_OPACITY,
                    fadingIn: true,
                    elapsed: 0,
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            handleInteraction(e.clientX, e.clientY);
        };
        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                handleInteraction(touch.clientX, touch.clientY);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                handleInteraction(touch.clientX, touch.clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');

        let lastTimestamp = performance.now();

        function animate(timestamp: number) {
            if (!ctx || !canvas || !tempCtx || !bgImageRef.current) {
                animationId.current = requestAnimationFrame(animate);
                return;
            }

            const delta = timestamp - lastTimestamp;
            lastTimestamp = timestamp;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.globalAlpha = MIN_OPACITY;
            ctx.drawImage(bgImageRef.current, 0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;

            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;

            pointsRef.current.forEach((point) => {
                point.elapsed += delta;

                if (point.fadingIn) {
                    const t = Math.min(point.elapsed / FADE_IN_DURATION, 1);
                    point.opacity = MIN_OPACITY + easeOut(t) * (MAX_OPACITY - MIN_OPACITY);
                    if (t >= 1) {
                        point.fadingIn = false;
                        point.elapsed = 0;
                    }
                } else {
                    const t = Math.min(point.elapsed / FADE_OUT_DURATION, 1);
                    point.opacity = MAX_OPACITY * (1 - easeOut(t));
                    if (point.opacity < MIN_OPACITY) point.opacity = MIN_OPACITY;
                }

                tempCtx.clearRect(0, 0, canvas.width, canvas.height);

                const gradient = tempCtx.createRadialGradient(
                    point.x * dpr,
                    point.y * dpr,
                    0,
                    point.x * dpr,
                    point.y * dpr,
                    point.radius * dpr
                );
                gradient.addColorStop(0, `rgba(255,255,255,${point.opacity})`);
                gradient.addColorStop(0.6, `rgba(255,255,255,${point.opacity * 0.3})`);
                gradient.addColorStop(1, `rgba(255,255,255,0)`);

                tempCtx.fillStyle = gradient;
                tempCtx.fillRect(0, 0, canvas.width, canvas.height);

                tempCtx.globalCompositeOperation = 'source-in';
                tempCtx.drawImage(bgImageRef.current!, 0, 0, canvas.width, canvas.height);
                tempCtx.globalCompositeOperation = 'source-over';

                ctx.drawImage(tempCanvas, 0, 0);
            });

            pointsRef.current = pointsRef.current.filter(
                (p) => p.fadingIn || p.elapsed < FADE_OUT_DURATION
            );

            animationId.current = requestAnimationFrame(animate);
        }

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
            if (animationId.current) {
                cancelAnimationFrame(animationId.current);
            }
        };
    }, [height, offsetY]);

    return (
        <canvas
            ref={canvasRef}
            className={`block w-full ${className}`}
            style={{ display: 'block', height: `${height}px`, touchAction: 'none' }}
        />
    );
};

const DualTopographicCanvas: React.FC = () => {
    const canvasHeight = 948;

    return (
        <div className="relative w-full overflow-hidden">
            <TopographicCanvas height={canvasHeight} offsetY={0} className="z-0" />
            <TopographicCanvas height={canvasHeight} offsetY={canvasHeight} className="z-0" />
        </div>
    );
};

export default DualTopographicCanvas;