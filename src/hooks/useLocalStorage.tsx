import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      if (typeof initialValue === 'function') {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
}

// import { useState, useEffect } from 'react';

// const useLocalStorage = <T,>(key: string, initialValue: T | (() => T)) => {
//   const [storedValue, setStoredValue] = useState<T>(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item
//         ? (JSON.parse(item) as T)
//         : typeof initialValue === 'function'
//         ? (initialValue as () => T)()
//         : initialValue;
//     } catch (error) {
//       console.warn(`Error reading localStorage key "${key}":`, error);
//       return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
//     }
//   });

//   useEffect(() => {
//     try {
//       window.localStorage.setItem(key, JSON.stringify(storedValue));
//     } catch (error) {
//       console.warn(`Error setting localStorage key "${key}":`, error);
//     }
//   }, [key, storedValue]);

//   return [storedValue, setStoredValue] as const; // tuple like useState
// };

// export default useLocalStorage;
