export function useDrawing() {
  function getCoords(canvas: HTMLCanvasElement, e: any) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX || e.touches?.[0]?.clientX) - rect.left,
      y: (e.clientY || e.touches?.[0]?.clientY) - rect.top
    };
  }

  return { getCoords };
}
