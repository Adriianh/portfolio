import { useRef } from "react";
import { useBubbleCanvas } from "../../hooks/useBubbleCanvas";

export function BubbleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useBubbleCanvas(canvasRef);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: -1,
            }}
        />
    );
}
