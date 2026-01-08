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

export function usePreventScroll(isOpen, modifier = "modal-open") {
  useEffect(() => {
    const preventScroll = (e) => {
      // For modal-open modifier, check if the scroll event is within the modal
      if (modifier === "modal-open") {
        const target = e.target;
        const modalElement = target.closest(".music-modal");
        if (modalElement) {
          // Allow scrolling within the modal
          return true;
        }

        // Prevent scrolling on background content
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // For menu-open modifier, prevent all scrolling
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    if (isOpen) {
      // Save current scroll position
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      // Store scroll position in body data attributes
      document.body.setAttribute("data-scroll-x", scrollX.toString());
      document.body.setAttribute("data-scroll-y", scrollY.toString());

      // Always add the base body class first
      document.body.classList.add("body");
      // Then add the modifier
      document.body.classList.add(`body--${modifier}`);

      // For both modifiers, prevent scrolling on main content areas
      const mainContent = document.querySelector("main");
      if (mainContent) {
        mainContent.style.overflow = "hidden";
        mainContent.style.pointerEvents = "none";
      }

      // Add event listeners to prevent background scrolling
      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, {
        passive: false,
      });
      document.addEventListener("scroll", preventScroll, { passive: false });
    } else {
      // Remove the modifier
      document.body.classList.remove(`body--${modifier}`);

      // Restore scroll position
      const scrollX = parseInt(
        document.body.getAttribute("data-scroll-x") || "0"
      );
      const scrollY = parseInt(
        document.body.getAttribute("data-scroll-y") || "0"
      );

      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(scrollX, scrollY);
      });

      // Clean up data attributes
      document.body.removeAttribute("data-scroll-x");
      document.body.removeAttribute("data-scroll-y");

      // Restore scrolling on main content areas
      const mainContent = document.querySelector("main");
      if (mainContent) {
        mainContent.style.overflow = "";
        mainContent.style.pointerEvents = "";
      }

      // Remove event listeners
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("scroll", preventScroll);
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove(`body--${modifier}`);

      // Cleanup main content styles
      const mainContent = document.querySelector("main");
      if (mainContent) {
        mainContent.style.overflow = "";
        mainContent.style.pointerEvents = "";
      }

      // Remove event listeners
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("scroll", preventScroll);
    };
  }, [isOpen, modifier]);
}
