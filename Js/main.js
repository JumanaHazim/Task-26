const sliders = document.querySelectorAll('.cards-slider');

sliders.forEach((slider) => {
  let isDown = false;
  let startX;
  let scrollLeft;
  let isDragging = false;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    isDragging = false;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    isDragging = true;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });
  slider.addEventListener('click', (e) => {
    if (isDragging) {
      e.preventDefault();
      isDragging = false;
    }
  });
});