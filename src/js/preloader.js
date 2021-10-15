function setPageLoad() {
  document.body.classList.add("loaded");
}

function hidePreloader() {
  document.querySelector("#preloader").style.display = "none";
}

function initPreloader() {
  const preloader = document.querySelector("#preloader");
  const preBg = document.querySelector(".preloader-bg");
  const preLogo = document.querySelector(".preloader-logo");

  const firstpanel =
    document.querySelector(".primary-slide") ||
    document.querySelector(".first_color");
  const firstcolor = firstpanel.getAttribute("data-bgcolor");

  const tl = gsap.timeline();

  preBg.style.setProperty("--g1", firstcolor);

  tl.set(preLogo, { opacity: 0 })
    .to(preLogo, 0.8, { opacity: 1, delay: 1.3 }, "-=.6")
    .to(preLogo, 0.8, { opacity: 0.3, delay: 0.7 }, "-=.6")
    .to(preLogo, 0.8, { opacity: 0.7, delay: 0.7 }, "-=.6")
    // .to(preLogo, 0.8, { opacity: 0.3, delay: 0.3 }, "-=.6")
    // .to(preLogo, 0.8, { opacity: 0.7, delay: 0.7 }, "-=.6")
    .set(preBg, { opacity: 1, delay: 0.3 })
    .to(preBg, 1.5, { y: "-66.7%", delay: 0.3 })
    .to(preBg, 0.8, { opacity: 0 }, "-=.9")
    .to(preLogo, 0.8, { opacity: 0, y: "-20px" }, "+=.3")
    .to(preloader, 0.2, { opacity: 0 }, "+=.3")
    .call(function () {
      hidePreloader();
      setPageLoad();
    });
}

// window.addEventListener("load", () => {
//   initPreloader();
// });
