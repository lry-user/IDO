import { useState } from "react";

export const useCountDown = (count: number) =>  {
  const [countdown, setCountdown] = useState(count);
  const startCountDown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  return [countdown, startCountDown] as const;
};
