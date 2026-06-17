import { useEffect } from "react";

export function useBubbleCanvas(
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        function resize() {
            canvas!!.width = window.innerWidth;
            canvas!!.height = window.innerHeight;
        }

        resize();
        window.addEventListener("resize", resize);

        const BUBBLE_COUNT = 16;
        interface Bubble {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
        }

        const bubbles: Bubble[] = Array.from({ length: BUBBLE_COUNT }, () => ({
            x: Math.random() * canvas!!.width,
            y: Math.random() * canvas!!.height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            radius: 2 + Math.random() * 4,
        }));

        let animationId: number;

        function animate() {
            ctx!!.clearRect(0, 0, canvas!!.width, canvas!!.height);

            bubbles.forEach((b) => {
                b.x += b.vx;
                b.y += b.vy;

                if (b.x < 0 || b.x > canvas!!.width) b.vx *= -1;
                if (b.y < 0 || b.y > canvas!!.height) b.vy *= -1;

                const gradient = ctx!!.createRadialGradient(
                    b.x - b.radius * 0.3,
                    b.y - b.radius * 0.3,
                    0,
                    b.x,
                    b.y,
                    b.radius,
                );
                gradient.addColorStop(0, "rgba(167, 139, 250, 0.35)");
                gradient.addColorStop(1, "rgba(167, 139, 250, 0.05)");

                ctx!!.beginPath();
                ctx!!.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
                ctx!!.fillStyle = gradient;
                ctx!!.fill();
            });

            animationId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);
}
