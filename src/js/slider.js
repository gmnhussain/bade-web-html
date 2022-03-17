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

function initPrimarySlider() {
  let slides, dots, currentSlide, bgbase;
  let isAnimating = false;
  let delaytimer = 3000; // 1.7 secs

  var xDown = null;
  var yDown = null;

  function init() {
    let hasSlider = document.querySelectorAll(".primary-slides").length;

    bgbase = document.querySelector(".primary-slider-bg");

    if (hasSlider >= 1) {
      slides = document.querySelectorAll(".primary-slides .primary-slide");
      dots = document.querySelectorAll(".primary-dot");
      currentSlide = 1;

      // if ($("body").hasClass("loaded")) {
      //   startUp();
      // }
      setTimeout(() => {
        startUp();
      }, 7000);

      window.addEventListener("wheel", wheelEvent);
      document.addEventListener("keyup", keyUpEvent);
      dotClickEvent();

      document.addEventListener("touchstart", handleTouchStart, false);
      document.addEventListener("touchmove", handleTouchMove, false);
    }
  }

  function startUp() {
    slides[0].classList.add("btm--in", "is--animating", "ani--in");
  }

  // touch event
  function getTouches(e) {
    return e.touches || e.originalEvent.touches;
  }

  function handleTouchStart(e) {
    const firstTouch = getTouches(e)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(e) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = e.touches[0].clientX;
    var yUp = e.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        shiftSlides(1);
      } else {
        shiftSlides(-1);
      }
    } else {
      if (yDiff > 0) {
        shiftSlides(1);
      } else {
        shiftSlides(-1);
      }
    }

    xDown = null;
    yDown = null;
  }

  //interaction
  function dotClickEvent() {
    for (let i = 1; i <= dots.length; i++) {
      //remove classes
      dots[i - 1].addEventListener(
        "click",
        function (i) {
          if (!isAnimating && i != currentSlide) {
            isAnimating = true;

            animateSlides(currentSlide, i);
            //set timer
            setTimeout(function () {
              isAnimating = false;
            }, delaytimer);
          }
        }.bind(null, i)
      );
    }
  }

  function keyUpEvent(event) {
    switch (event.keyCode) {
      case 38:
        //up
        shiftSlides(-1);
        break;
      case 40:
        //down
        shiftSlides(1);
        break;
      case 37:
        //left
        shiftSlides(-1);
        break;
      case 39:
        //right
        shiftSlides(1);
        break;
    }
  }

  function wheelEvent(event) {
    if (event.deltaY != 0) {
      let delta = Math.sign(event.deltaY);
      // 1 is scrolldown, -1 is scroll up
      if (!isAnimating) {
        isAnimating = true;
        shiftSlides(delta);

        //set timer
        setTimeout(function () {
          isAnimating = false;
        }, delaytimer);
      }
    } else {
      event.preventDefault();
    }
  }

  //slide animation
  function shiftSlides(direction) {
    let newSlide;
    if (direction == 1) {
      newSlide = currentSlide + 1;
      if (newSlide > slides.length) {
        newSlide = slides.length;
      }
    } else if (direction == -1) {
      newSlide = currentSlide - 1;
      if (newSlide < 1) {
        newSlide = 1;
      }
    }

    //set class
    if (newSlide != currentSlide) {
      animateSlides(currentSlide, newSlide);
    }
  }

  function animateSlides(cur, newSlide) {
    for (let i = 1; i <= slides.length; i++) {
      slides[i - 1].classList.remove(
        "active",
        "is--animating",
        "ani--in",
        "top--out",
        "btm--in",
        "btm--out",
        "top--in"
      );
    }
    // slides[cur - 1].classList.add("is--animating");
    // slides[newSlide - 1].classList.add("is--animating", "active", "ani--in");

    let color1 = slides[cur - 1].getAttribute("data-bgcolor");
    let color2 = slides[newSlide - 1].getAttribute("data-bgcolor");

    let tl = gsap.timeline({
      onComplete: function () {
        isAnimating = false;
      },
    });

    let currentHeight = 0 - window.innerHeight;

    if (cur < newSlide) {
      bgbase.style.setProperty("--g1", color2);
      bgbase.style.setProperty("--g2", color1);

      slides[cur - 1].classList.add("top--out");
      slides[newSlide - 1].classList.add("active", "ani--in", "btm--in");

      tl.set(bgbase, { y: "0" }).to(bgbase, 2.5, { y: currentHeight });
    } else {
      bgbase.style.setProperty("--g1", color1);
      bgbase.style.setProperty("--g2", color2);

      slides[cur - 1].classList.add("btm--out");
      slides[newSlide - 1].classList.add("active", "ani--in", "top--in");

      tl.set(bgbase, { y: currentHeight }).to(bgbase, 2.5, { y: "0" });
    }

    //dots
    for (let i = 1; i <= dots.length; i++) {
      dots[i - 1].classList.remove("active");
    }
    dots[newSlide - 1].classList.add("active");

    if (newSlide == 1) {
    } else if (newSlide == slides.length) {
    }

    currentSlide = newSlide;
  }

  init();
}

function textSplitAni() {
  var label = "ani-wordletters";

  function init() {
    var text_arr = document.getElementsByClassName(label);
    for (var i = 0; i < text_arr.length; i++) {
      if (!text_arr[i].classList.contains("taw--split")) {
        text_arr[i].innerHTML = splitSentence(text_arr[i].innerHTML);
        text_arr[i].classList.add("taw--split");
      }
    }
  }

  function splitSentence(str) {
    //replace <br> tags with spaces
    str = str.replace(/<br>/g, " ~break~ ");
    str = str.replace(/<br\/>/g, " ~break~ ");
    str = str.replace(/&amp;/g, "&");

    //replace <span>
    str = str.replace(/<span>/g, " ~span~ ");
    str = str.replace(/<\/span>/g, " ~/span~ ");

    //split into words
    var str_html = "";
    var words = str.split(" ");

    for (var i = 0; i < words.length; i++) {
      if (words[i] === "~break~") {
        //if it is a break, add in special breakclass
        str_html += '<span class="cus-ani-linebreak"></span>';
      } else if (words[i] === "~span~") {
        str_html += "<span>";
      } else if (words[i] === "~/span~") {
        str_html += "</span>";
      } else if (words[i] === "") {
        //do nothing
      } else {
        //else split into letters contained in a word
        str_html += '<span class="cus-ani-word">';
        for (var j = 0; j < words[i].length; j++) {
          str_html +=
            '<span class="cus-ani-letter">' + words[i].charAt(j) + "</span>";
        }
        str_html += "</span>";
      }
    }
    return str_html;
  }

  init();
}

textSplitAni();

// footer draggable slider
const footerSlider = new Swiper(".footer_slider", {
  loop: false,
  slidesPerView: "auto",
  spaceBetween: 20,
  centeredSlides: false,
  breakpoints: {
    1280: {
      spaceBetween: 32,
    },
    1600: {
      spaceBetween: 42,
    },
  },
});

const restaurantMenuSlider = new Swiper(".restaurant_menu_slider", {
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 5000,
  },
  speed: 500,
});
