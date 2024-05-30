import { useEffect, useRef } from "react";

// Custom hook to handle keydown event
const useButtonPrintP = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "Enter" && buttonRef.current) {
        buttonRef.current.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return buttonRef;
};
export default useButtonPrintP;
