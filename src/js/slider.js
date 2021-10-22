function initSlider() {
  let slides, dots, currentSlide, previousSlide;
  let isAnimating = false;
  let delayTimer = 3000;

  const hasSlider = document.querySelectorAll(".primary-slider").length;

  if (hasSlider) {
    slides = document.querySelectorAll(".primary-slide");
    dots = document.querySelectorAll(".primary-dot");
    currentSlide = 0;
    previousSlide = 0;

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
    slides[0].classList.add(
      // "btm--in",
      // "is--animating",
      // "ani--in",
      "active"
    );
    dots[0].classList.add("active");

    setTimeout(function () {
      slides[0].classList.add("btm--in");
    }, 6000);
  }

  function showSlides(currSlide, newSlide) {
    isAnimating = true;
    // slides[currSlide].className = slides[currSlide].className.replace(
    //   " active btm--in",
    //   ""
    // );
    // slides[newSlide].className += " active btm--in";
    // slides[prevSlide].classList.remove("btm--out");
    slides[currSlide].classList.remove("active", "btm--in");
    slides[currSlide].classList.add("btm--out");
    slides[newSlide].classList.add("active", "btm--in");

    setTimeout(() => {
      slides[currSlide].classList.remove("btm--out");
      currentSlide = newSlide;
      isAnimating = false;
    }, delayTimer);
  }

  function shiftSlides(direction) {}
}

// initSlider();

function initSecondarySlider() {
  let slides, dots, currentSlide;
  let isAnimating = false;
  let delayTimer = 1000;

  const hasSlider = document.querySelectorAll(".secondary_slider").length;

  if (hasSlider) {
    slides = document.querySelectorAll(".secondary_slide");
    dots = document.querySelectorAll(".secondary_dot");
    currentSlide = 0;
    //previousSlide = 0;

    sliderStartUp();

    // dots.forEach((dot, index) => {
    //   dot.addEventListener("click", (e) => {
    //     if (!isAnimating) {
    //       dots[currentSlide].className = dots[currentSlide].className.replace(
    //         " active",
    //         ""
    //       );
    //       dot.className += " active";
    //       showSlides(currentSlide, index);
    //     }
    //   });
    // });

    if (!isAnimating) {
      document
        .querySelector(".ssnav_btn_prev")
        .addEventListener("click", (e) => {
          let newIndex = (currentSlide - 1 + slides.length) % slides.length;
          showSlides(currentSlide, newIndex);

          updateProgress(slides.length, newIndex);
        });

      document
        .querySelector(".ssnav_btn_next")
        .addEventListener("click", (e) => {
          let newIndex = (currentSlide + 1) % slides.length;
          showSlides(currentSlide, newIndex);

          updateProgress(slides.length, newIndex);
        });
    }
  }

  function sliderStartUp() {
    slides[0].classList.add(
      // "btm--in",
      // "is--animating",
      // "ani--in",
      "active"
    );

    setTimeout(function () {
      slides[0].classList.add("btm--in");
    }, 6000);
  }

  function showSlides(currSlide, newSlide) {
    isAnimating = true;
    slides[currSlide].classList.remove("active", "btm--in");
    slides[currSlide].classList.add("btm--out");
    slides[newSlide].classList.add("active", "btm--in");

    setTimeout(() => {
      slides[currSlide].classList.remove("btm--out");
      currentSlide = newSlide;
      isAnimating = false;
    }, delayTimer);
  }

  function updateProgress(length, index) {
    const progress = document.querySelector(".ssnav_progress span");
    const width = ((index + 1) / length) * 100;
    progress.style.width = width + "%";
  }
}
