import { useState, useEffect } from "react";

const useLocalStorage = (
  key: string,
  initialValue: {} | string | undefined
) => {
  // logic is executed only once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== "undefined") {
      return initialValue;
    }

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: Function) => {
    try {
      // to have the same api as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      // save to local storage
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
