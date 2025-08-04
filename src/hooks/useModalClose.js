import { useEffect } from "react";

export default function useModalClose(isOpen, onClose) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
}

export function usePreventScroll(isOpen, className = "modal-open") {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove(className);
    };
  }, [isOpen, className]);
}
