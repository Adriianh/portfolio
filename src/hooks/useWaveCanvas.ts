import { useEffect } from "react";

export function useWaveCanvas(
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        function resize() {
            canvas!!.width = parent!!.clientWidth;
            canvas!!.height = parent!!.clientHeight;
        }

        resize();
        window.addEventListener("resize", resize);

        const waves = [
            {
                amplitude: 30,
                speed: 0.005,
                color: "rgba(167, 139, 250, 0.08)",
                offsetY: 0.3,
            },
            {
                amplitude: 20,
                speed: 0.008,
                color: "rgba(167, 139, 250, 0.05)",
                offsetY: 0.5,
            },
            {
                amplitude: 25,
                speed: 0.003,
                color: "rgba(167, 139, 250, 0.06)",
                offsetY: 0.7,
            },
        ];

        let animationId: number;
        let time = 0;

        function animate() {
            time += 1;
            ctx!!.clearRect(0, 0, canvas!!.width, canvas!!.height);

            waves.forEach((wave) => {
                ctx!!.beginPath();
                ctx!!.moveTo(0, canvas!!.height * wave.offsetY);

                for (let x = 0; x <= canvas!!.width; x += 2) {
                    const y =
                        canvas!!.height * wave.offsetY +
                        Math.sin((x + time * wave.speed * 100) * 0.02) *
                            wave.amplitude;
                    ctx!!.lineTo(x, y);
                }

                ctx!!.strokeStyle = wave.color;
                ctx!!.lineWidth = 2;
                ctx!!.stroke();
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
