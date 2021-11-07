// register plugin
gsap.registerPlugin(ScrollTrigger);

// window load
window.addEventListener("load", () => {
  initPreloader();
  initPrimarySlider();
  initSecondarySlider();
  // setBgColor();
  animationFadeInUpOnScroll();

  // tertiary slider
  const tertiarySlider = [...document.querySelectorAll(".tertiary_slider")];
  if (tertiarySlider.length) {
    tertiarySlider.forEach((slider) => {
      initTertiarySlider(slider);
    });
  }

  // setTimeout(() => {
  //   setSubscriptionOn();
  // }, 10000);
});
