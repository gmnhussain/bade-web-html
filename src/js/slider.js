function initPrimarySlider() {
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

    dots[currentSlide].className = dots[currentSlide].className.replace(
      " active",
      ""
    );
    dots[newSlide].className += " active";

    setTimeout(() => {
      slides[currSlide].classList.remove("btm--out");
      currentSlide = newSlide;
      isAnimating = false;
    }, delayTimer);
  }

  function shiftSlides(direction) {
    let newSlide;
    if (direction == 1 && currentSlide < slides.length - 1) {
      newSlide = currentSlide + 1;
    } else if (direction == -1 && currentSlide > 0) {
      newSlide = currentSlide - 1;
    } else {
      return;
    }
    showSlides(currentSlide, newSlide);
  }

  window.addEventListener("wheel", (event) => {
    if (event.deltaY != 0) {
      const delta = Math.sign(event.deltaY);
      // console.info(delta);

      // 1 is scrolldown, -1 is scroll up

      if (!isAnimating) {
        isAnimating = true;
        shiftSlides(delta);

        //set timer
        setTimeout(function () {
          isAnimating = false;
        }, 3000);
      }
    } else {
      event.preventDefault();
    }
  });
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
  const images = [...slider.querySelectorAll(".ts_images .tsi_item")];
  // const contents = [...slider.querySelectorAll(".ts_contents .tsc_item")];

  const backButton = slider.querySelector(".tsbtn_prev");
  const forwardButton = slider.querySelector(".tsbtn_next");

  let clickable = true,
    activeSlide = 0;

  // initial state
  function initSliderState() {
    images.forEach((slide, index) => {
      if (index === activeSlide) {
        gsap.to(slide, {
          duration: 0,
          zIndex: 2,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
        });
      } else {
        gsap.to(slide, {
          duration: 0,
          zIndex: 1,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
        });
      }
    });
  }
  initSliderState();

  // initSliderState(slidesLarge, activeLarge);
  // initSliderState(slidesSmall, activeSmall);

  // change slide
  function changeSlide(forward, slides, active) {
    let newIndex = forward
      ? (active + 1) % slides.length
      : (active - 1 + slides.length) % slides.length;

    //let contents = slider.querySelectorAll(".ts_contents .tsc_item");

    let t,
      lastImage = slides[active],
      newImage = slides[newIndex],
      c = newImage.querySelector("img");
    // lastContent = contents[active],
    // newContent = contents[newIndex],
    // p = lastContent.querySelectorAll(".ts_stagger"),
    // D = newContent.querySelectorAll(".ts_stagger");

    t = forward ? [0, -100] : [0, 100];

    const tweens = gsap.timeline({
      force3D: 1,
      onComplete: function () {
        clickable = true;
      },
    });

    tweens
      .set(newImage, {
        autoAlpha: 1,
        zIndex: 2,
      })
      .set(lastImage, {
        autoAlpha: 1,
        zIndex: 3,
      })
      .fromTo(
        newImage,
        {
          xPercent: t[0],
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
        lastImage,
        {
          xPercent: 0,
        },
        {
          duration: 1.1,
          xPercent: t[1],
          ease: "expo.inOut",
        },
        0
      )
      // .to(
      //   p,
      //   {
      //     y: -30,
      //     alpha: 0,
      //     ease: "power1.in",
      //     duration: 0.35,
      //     stagger: 0.1,
      //   },
      //   0
      // )
      // .fromTo(
      //   D,
      //   {
      //     y: 60,
      //     rotation: 3,
      //     alpha: 0,
      //   },
      //   {
      //     duration: 1.1,
      //     y: 0,
      //     rotation: 0,
      //     alpha: 1,
      //     ease: "expo",
      //     stagger: 0.1,
      //   },
      //   0.5
      // )
      .set(lastImage, {
        autoAlpha: 0,
        clearProps: "zIndex, xPercent",
        zIndex: 2,
      })
      // .set(lastContent, {
      //   autoAlpha: 0,
      //   clearProps: "zIndex",
      // })
      .set(newImage, {
        // clearProps: "zIndex",
        zIndex: 3,
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

// vwidth slider
const vwidthSlider = new Swiper(".vwidth_slider", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 10,
  centeredSlides: true,
  navigation: {
    nextEl: ".vwidth_slider_next",
    prevEl: ".vwidth_slider_prev",
  },
  breakpoints: {
    992: {
      slidesPerView: "auto",
      centeredSlides: false,
      spaceBetween: 10,
    },
  },
});
