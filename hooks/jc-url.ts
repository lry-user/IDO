import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

export const useJcUrl = () => {

  const [redirectRefer] = useQueryState("redirectRefer", {
    defaultValue: "",
  });

  const [jcRedirectRefer, setJcRedirectRefer] = useState(() => {
    // Check if code is running in browser environment
    if (typeof window !== "undefined") {
      return localStorage.getItem("jc_redirectRefer") || redirectRefer || process.env.NEXT_PUBLIC_JC_DEFAULT_DOMAIN || ''
    }
    return "";
  });

  useEffect(() => {
    if (redirectRefer && typeof window !== "undefined") {
      // Safe localStorage access inside useEffect (only runs in browser)
      localStorage.setItem("jc_redirectRefer", redirectRefer);
      setJcRedirectRefer(redirectRefer);
    }
  }, [redirectRefer]);

  return jcRedirectRefer;
};
