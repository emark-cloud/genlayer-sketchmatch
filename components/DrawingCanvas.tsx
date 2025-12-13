"use client";

import { useRef, useEffect, useState } from "react";

interface DrawingCanvasProps {
  onSubmit: (dataUrl: string) => void;
  disabled?: boolean;
}

export default function DrawingCanvas({ onSubmit, disabled }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 600;
    canvas.height = 400;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000";

    ctxRef.current = ctx;
  }, []);

  function startDrawing(e: any) {
    if (disabled) return;
    setIsDrawing(true);
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(offsetX, offsetY);
  }

  function draw(e: any) {
    if (!isDrawing || disabled) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current?.lineTo(offsetX, offsetY);
    ctxRef.current?.stroke();
  }

  function stopDrawing() {
    setIsDrawing(false);
    ctxRef.current?.closePath();
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function submit() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    onSubmit(dataUrl);
  }

  return (
    <div className="mt-6">
      <canvas
        ref={canvasRef}
        className={`border rounded shadow-md bg-white ${
          disabled ? "opacity-50" : ""
        }`}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={(e) => startDrawing(e)}
        onTouchMove={(e) => draw(e)}
        onTouchEnd={stopDrawing}
      />

      <div className="flex gap-4 mt-4">
        <button
          onClick={clearCanvas}
          disabled={disabled}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Clear
        </button>

        <button
          onClick={submit}
          disabled={disabled}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Submit Drawing
        </button>
      </div>
    </div>
  );
}
