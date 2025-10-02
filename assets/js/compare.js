document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".img-compare").forEach(function (container) {
    const overlay = container.querySelector(".img-overlay");
    const handle = container.querySelector(".slider-handle");

    if (!overlay || !handle) return;

    let dragging = false;

    const startDrag = (e) => {
      e.preventDefault();
      dragging = true;
      window.addEventListener("mousemove", onDrag);
      window.addEventListener("touchmove", onDrag);
      window.addEventListener("mouseup", stopDrag);
      window.addEventListener("touchend", stopDrag);
    };

    const onDrag = (e) => {
      if (!dragging) return;
      const rect = container.getBoundingClientRect();
      let x = e.touches ? e.touches[0].clientX : e.clientX;
      let pos = x - rect.left;
      pos = Math.max(0, Math.min(rect.width, pos));
      const percent = (pos / rect.width) * 100;
      overlay.style.width = percent + "%";
      handle.style.left = percent + "%";
    };

    const stopDrag = () => {
      dragging = false;
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("touchmove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchend", stopDrag);
    };

    handle.addEventListener("mousedown", startDrag);
    handle.addEventListener("touchstart", startDrag);
  });
});
