import React, { useState, useEffect, useCallback } from "react";

type Timer = ReturnType<typeof setTimeout>;

export function useDebounceFull<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const [timer, setTimer] = useState<Timer | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(() => {
        callback(...args);
      }, delay);

      setTimer(newTimer);
    },
    [callback, delay, timer],
  );

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return debouncedCallback;
}

export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value changes (also on delay change or unmount)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
