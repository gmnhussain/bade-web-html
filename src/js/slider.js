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

function initTertiarySlider(slider) {
  // Select all slides and convert node to array for easy handling
  const images = [...slider.querySelectorAll(".ts_images .tsi_item")];
  const contents = [...slider.querySelectorAll(".ts_contents .tsc_item")];

  // select forward and back controller button
  const backButton = slider.querySelector(".tsbtn_prev");
  const forwardButton = slider.querySelector(".tsbtn_next");

  // declare necessary variables
  let clickable = true,
    activeSlide = 0,


  // initial state
  // function initSliderState(slides, active) {
  //   slides.forEach((slide, index) => {
  //     if (index === active) {
  //       gsap.to(slide, {
  //         duration: 0,
  //         zIndex: 3,
  //         xPercent: 0,
  //         yPercent: 0,
  //         opacity: 1,
  //       });
  //     } else {
  //       gsap.to(slide, {
  //         duration: 0,
  //         zIndex: 0,
  //         xPercent: -25,
  //         yPercent: 0,
  //         opacity: 0,
  //       });
  //     }
  //   });
  // }

  // initSliderState(slidesLarge, activeLarge);
  // initSliderState(slidesSmall, activeSmall);

  // change slide
  function changeSlide(forward, slides, active) {
    let newIndex = forward
      ? (active + 1) % slides.length
      : (active - 1 + slides.length) % slides.length;

    //let contents = slider.querySelectorAll(".ts_contents .tsc_item");

    let t,
      // n = this._state,
      i = active,
      r = newIndex,
      u = forward ? "next" : "previous",
      s = slides[i],
      l = slides[r],
      c = l.querySelector("img"),
      f = contents[i],
      h = contents[r],
      p = f.querySelectorAll(".ts_stagger"),
      D = h.querySelectorAll(".ts_stagger");

    t =
      "next" === u
        ? [[100, -100], -25]
        : "previous" === u
        ? [[-100, 100], 25]
        : r > i
        ? [[100, -100], -25]
        : [[-100, 100], 25];

    const tweens = gsap.timeline({
      force3D: 1,
      onComplete: function () {
        clickable = true;
      },
    });

    tweens
      .set([l, h], {
        autoAlpha: 1,
        zIndex: 2,
      })
      .fromTo(
        [l],
        {
          xPercent: 25,
        },
        {
          duration: 1.1,
          xPercent: 0,
          ease: "expo.inOut",
          stagger: 0,
        },
        0
      )
      .fromTo(
        s,
        {
          xPercent: 0,
        },
        {
          duration: 1.1,
          xPercent: -100,
          ease: "expo.inOut",
        },
        0
      )
      .to(
        p,
        {
          y: -30,
          alpha: 0,
          ease: "power1.in",
          duration: 0.35,
          stagger: 0.1,
        },
        0
      )
      .fromTo(
        D,
        {
          y: 60,
          rotation: 3,
          alpha: 0,
        },
        {
          duration: 1.1,
          y: 0,
          rotation: 0,
          alpha: 1,
          ease: "expo",
          stagger: 0.1,
        },
        0.5
      )
      .set(s, {
        autoAlpha: 0,
        clearProps: "zIndex, xPercent",
      })
      .set(f, {
        autoAlpha: 0,
        clearProps: "zIndex",
      })
      .set([l, h], {
        clearProps: "zIndex",
      });

    return newIndex;
  }

  // event listeners
  function callChangeSlide(forward) {
    if (clickable) {
      clickable = false;
      activeSlide = changeSlide(forward, images, activeSlide);
      // activeSmall = changeSlide(forward, slidesSmall, activeSmall);
      // setTimeout(() => {
      //   clickable = true;
      // }, speed * 1000);
    }
  }

  forwardButton.addEventListener("click", () => {
    callChangeSlide(true);
  });

  backButton.addEventListener("click", () => {
    callChangeSlide(false);
  });
}

const tertiarySlider = [...document.querySelectorAll(".tertiary_slider")];
tertiarySlider.forEach((slider) => {
  initTertiarySlider(slider);
});
