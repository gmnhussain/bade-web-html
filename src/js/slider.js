function initSlider() {
  let slides, dots, currentSlide;
  let isAnimating = false;
  let delayTimer = 3000;

  const hasSlider = document.querySelectorAll(".primary-slider").length;

  if (hasSlider) {
    slides = document.querySelectorAll(".primary-slide");
    dots = document.querySelectorAll(".primary-dot");
    currentSlide = 0;

    sliderStartUp();

    dots.forEach((dot, index) => {
      dot.addEventListener("click", (e) => {
        if (!isAnimating) {
          dots[currentSlide].className = dots[currentSlide].className.replace(
            " active",
            ""
          );
          dot.className += " active";
          showSlides(currentSlide, index);
        }
      });
    });
  }

  function sliderStartUp() {
    slides[0].classList.add("btm--in", "is--animating", "ani--in", "active");
    dots[0].classList.add("active");
  }

  function showSlides(currSlide, newSlide) {
    isAnimating = true;
    slides[currSlide].className = slides[currSlide].className.replace(
      " active",
      ""
    );
    slides[newSlide].className += " active";

    setTimeout(() => {
      currentSlide = newSlide;
      isAnimating = false;
    }, delayTimer);
  }

  function shiftSlides(direction) {}
}

initSlider();
