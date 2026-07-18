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
      const target = e.target;
      if (target instanceof Element) {
        if (target.closest(".music-modal__tracklist")) return;
        if (
          modifier === "menu-open" &&
          (target.closest(".menu-toggle") || target.closest(".mobile-nav"))
        ) {
          return;
        }
      }

      // Block page/modal chrome scroll; allow tracklist scrolling.
      e.preventDefault();
      e.stopPropagation();
    };

    const className = `body--${modifier}`;

    const lockScroll = () => {
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      document.body.setAttribute("data-scroll-x", scrollX.toString());
      document.body.setAttribute("data-scroll-y", scrollY.toString());

      document.documentElement.classList.add(className);
      document.body.classList.add("body", className);
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      const mainContent = document.querySelector("main");
      if (mainContent) {
        mainContent.style.overflow = "hidden";
        mainContent.style.pointerEvents = "none";
      }

      document.addEventListener("wheel", preventScroll, { passive: false });
      document.addEventListener("touchmove", preventScroll, {
        passive: false,
      });
      document.addEventListener("scroll", preventScroll, { passive: false });
    };

    const unlockScroll = () => {
      document.documentElement.classList.remove(className);
      document.body.classList.remove(className);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";

      const scrollX = parseInt(
        document.body.getAttribute("data-scroll-x") || "0",
        10
      );
      const scrollY = parseInt(
        document.body.getAttribute("data-scroll-y") || "0",
        10
      );

      requestAnimationFrame(() => {
        window.scrollTo(scrollX, scrollY);
      });

      document.body.removeAttribute("data-scroll-x");
      document.body.removeAttribute("data-scroll-y");

      const mainContent = document.querySelector("main");
      if (mainContent) {
        mainContent.style.overflow = "";
        mainContent.style.pointerEvents = "";
      }

      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("scroll", preventScroll);
    };

    if (!isOpen) return undefined;

    lockScroll();
    return () => {
      unlockScroll();
    };
  }, [isOpen, modifier]);
}
