import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const useSafeTheme = () => {
  const [mounted, setMounted] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? theme : { theme: 'light' }; // 기본값 설정
}; 