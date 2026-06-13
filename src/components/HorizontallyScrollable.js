import { useRef, useEffect } from "react";

function HorizontallyScrollable({ children, className = "" }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    let isDragging = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;

      e.preventDefault();

      const distance = e.pageX - startX;
      container.scrollLeft = scrollLeft - distance;
    };

    const handleMouseUp = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    const handleMouseLeave = () => {
      isDragging = false;
      container.style.cursor = "grab";
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);
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
      }}
    >
      {children}
    </div>
  );
}

export default HorizontallyScrollable;

