"use client";

import { useRef } from "react";

interface Props {
  onSubmit: (dataUrl: string) => void;
  disabled?: boolean;
}

export default function DrawingCanvas({ onSubmit, disabled }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  function getCtx() {
    return canvasRef.current?.getContext("2d");
  }

  function startDraw(e: React.MouseEvent) {
    if (disabled) return;
    drawing.current = true;
    draw(e);
  }

  function endDraw() {
    drawing.current = false;
  }

  function draw(e: React.MouseEvent) {
    if (!drawing.current || disabled) return;

    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const ctx = getCtx();
    if (!ctx) return;

    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }

  function handleSubmit() {
    if (!canvasRef.current) return;

    const dataUrl = canvasRef.current.toDataURL("image/png");

    // 🔒 Prevent empty submissions
    if (!dataUrl || dataUrl.length < 100) {
      alert("Please draw something before submitting.");
      return;
    }

    onSubmit(dataUrl);
  }

  return (
    <div className="space-y-4">
      <canvas
        ref={canvasRef}
        width={500}
        height={400}
        className="border bg-white cursor-crosshair"
        onMouseDown={startDraw}
        onMouseUp={endDraw}
        onMouseMove={draw}
      />

      <button
        onClick={handleSubmit}
        disabled={disabled}
        className="w-full py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        Submit Drawing
      </button>
    </div>
  );
}
