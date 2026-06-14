import { useRef, useEffect } from "react";

function HorizontallyScrollable({ children, className = "" }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;

      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = x - startX;

      container.scrollLeft = scrollLeft - walk;
    };

    const stopDragging = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    // -----------------------------
    // TOUCH SUPPORT (IMPORTANT FIX)
    // -----------------------------
    const onTouchStart = (e) => {
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const onTouchMove = (e) => {
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = x - startX;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseup", stopDragging);
    container.addEventListener("mouseleave", stopDragging);

    container.addEventListener("touchstart", onTouchStart);
    container.addEventListener("touchmove", onTouchMove);

    return () => {
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseup", stopDragging);
      container.removeEventListener("mouseleave", stopDragging);

      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className={className}
      style={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        cursor: "grab",
        scrollBehavior: "smooth",
        userSelect: "none",
      }}
    >
      {children}
    </div>
  );
}

export default HorizontallyScrollable;