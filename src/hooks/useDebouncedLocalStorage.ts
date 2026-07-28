import { useState, useEffect, useRef } from 'react';

export function useDebouncedLocalStorage<T>(key: string, initialValue: T, delay: number = 300): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    const handler = setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(storedValue));
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [key, storedValue, delay]);

  return [storedValue, setStoredValue];
}
