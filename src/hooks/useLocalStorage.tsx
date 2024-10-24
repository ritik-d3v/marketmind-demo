import { useState } from 'react';

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: SetValue<T>) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Check if window is defined to ensure this code runs in a browser environment
      if (typeof window !== 'undefined') {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or return initialValue if item does not exist
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      // Log any errors and return the initial value
      console.error('Error retrieving value from localStorage:', error);
    }

    // If all else fails, return the initial value
    return initialValue;
  });

  // Function to update the stored value
  const setValue = (value: SetValue<T>): void => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Update state
      setStoredValue(valueToStore);
      // Update localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Log any errors
      console.error('Error setting value in localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
