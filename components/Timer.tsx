"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  seconds: number;
  onComplete: () => void;
}

export default function Timer({ seconds, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4 mb-4 text-xl font-semibold">
      Time left: {timeLeft}s
    </div>
  );
}
