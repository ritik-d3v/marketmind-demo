import { useState, MouseEvent, useEffect } from 'react';
import useLocalStorage from './useLocalStorage'; // Import your useLocalStorage hook from the appropriate path

interface ResizeHook {
  boxStyle: { width: string; height: string };
  boxStyle2: { width: string; height: string };
  resizeFrame: (e: MouseEvent<HTMLButtonElement>) => void;
  stopResize: () => void;
  startResize: (e: MouseEvent<HTMLButtonElement>) => void;
  isHovered: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

const useResizeHook = (): ResizeHook => {
  const minBoxStyleWidthPercentage = 30; // Minimum width percentage for boxStyle
  const minBoxStyle2WidthPercentage = 45; // Minimum width percentage for boxStyle2

  const [drag, setDrag] = useState<{ active: boolean; x: number }>({
    active: false,
    x: 0
  });

  // Retrieve and set initial 'dims.w' value from local storage
  const [storedDimsW, setStoredDimsW] = useLocalStorage<number>('dimsWidth', window.innerWidth * 0.4);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const boxStyle = {
    width: `${storedDimsW}px`, // Use the stored 'dims.w' value
    height: '100%'
  };

  const boxStyle2 = {
    width: `${window.innerWidth - storedDimsW}px`, // Calculate 'boxStyle2' width based on 'dims.w'
    height: '100%'
  };

  const resizeFrame = (e: MouseEvent<HTMLButtonElement>): void => {
    const { active, x } = drag;
    if (active) {
      const xDiff = Math.abs(x - e.clientX);
      let newW = x > e.clientX ? storedDimsW - xDiff : storedDimsW + xDiff;

      // Calculate minimum widths based on percentages of screen width
      const minBoxStyleWidth = (window.innerWidth * minBoxStyleWidthPercentage) / 100;
      const minBoxStyle2Width = (window.innerWidth * minBoxStyle2WidthPercentage) / 100;

      // Enforce minimum width constraint for boxStyle
      if (newW < minBoxStyleWidth) {
        newW = minBoxStyleWidth;
      }

      // Calculate new width for boxStyle2
      const newW2 = window.innerWidth - newW;

      // Enforce minimum width constraint for boxStyle2
      if (newW2 < minBoxStyle2Width) {
        newW = window.innerWidth - minBoxStyle2Width; // Adjust boxStyle width to respect minimum constraint for boxStyle2
      }

      setDrag({ ...drag, x: e.clientX });
      setStoredDimsW(newW); // Update the stored 'dims.w' value
    }
  };

  const stopResize = (): void => {
    setDrag({ ...drag, active: false });
    setIsHovered(false);
  };

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    if (!drag.active) setIsHovered(false);
  };

  const startResize = (e: MouseEvent<HTMLButtonElement>): void => {
    setIsHovered(true);
    setDrag({
      active: true,
      x: e.clientX
    });
  };

  // Add useEffect to update local storage when 'storedDimsW' changes
  useEffect(() => {
    setStoredDimsW(storedDimsW);
  }, [storedDimsW, setStoredDimsW]);

  return {
    boxStyle,
    boxStyle2,
    resizeFrame,
    stopResize,
    startResize,
    isHovered,
    handleMouseEnter,
    handleMouseLeave
  };
};

export default useResizeHook;
