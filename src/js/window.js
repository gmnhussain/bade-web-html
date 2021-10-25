// register plugin
gsap.registerPlugin(ScrollTrigger);

// window load
window.addEventListener("load", () => {
  initPreloader();
  initPrimarySlider();
  initSecondarySlider();
  // setBgColor();
  animationFadeInUpOnScroll();

  // setTimeout(() => {
  //   setSubscriptionOn();
  // }, 10000);
});
