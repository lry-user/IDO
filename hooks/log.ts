
import { useCallback } from "react";

// 客户端日志上报
export const useLog = () => {

  const log = useCallback(<T>(data: T) => {
    // 判断是否在浏览器中
    if (typeof window === "undefined") {
      return;
    }
    fetch("/api/log-up", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }, []);

  return log;
};
