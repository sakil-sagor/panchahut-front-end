import { useEffect, useRef } from "react";

// Custom hook to handle keydown event
const useButtonPrintP = () => {
  const buttonRefCtrlEnter = useRef(null);
  const buttonRefPlus = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.ctrlKey &&
        event.key === "Enter" &&
        buttonRefCtrlEnter.current
      ) {
        buttonRefCtrlEnter.current.click();
      }
      if (event.key === "+" && buttonRefPlus.current) {
        buttonRefPlus.current.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { buttonRefCtrlEnter, buttonRefPlus };
};
export default useButtonPrintP;
