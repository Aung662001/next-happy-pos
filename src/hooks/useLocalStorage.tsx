import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialvalve?: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    let json: string | null = "";
    if (typeof window !== "undefined") {
      json = localStorage.getItem(key);
    } else {
      return "";
    }
    if (json) return JSON.parse(json);
    if (typeof initialvalve === "function") {
      return (initialvalve as () => T)();
    } else {
      return initialvalve;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue] as [T, typeof setValue];
}
