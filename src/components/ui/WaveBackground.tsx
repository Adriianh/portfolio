import { useRef } from "react";
import { useWaveCanvas } from "../../hooks/useWaveCanvas";

export function WaveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useWaveCanvas(canvasRef);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 0,
            }}
        />
    );
}
