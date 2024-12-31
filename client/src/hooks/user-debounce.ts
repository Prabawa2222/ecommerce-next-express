import { useEffect, useState } from "react";

export default function useDebounce<T>(
  value: T,
  delay: number,
  initialValue: T
) {
  const [debounceValue, setDebounceValue] = useState<T>(initialValue);

  useEffect(() => {
    const timeoutFn = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeoutFn);
  }, [value, delay]);

  return debounceValue;
}
