"use client";

interface Props {
  onEvaluate: () => Promise<void>;
}

export default function EvaluateButton({ onEvaluate }: Props) {
  return (
    <button
      onClick={onEvaluate}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
    >
      Evaluate Round
    </button>
  );
}
