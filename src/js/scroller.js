// text animation on scroll
function animationFadeInUpOnScroll() {
  const sections = document.querySelectorAll(".ani_fade_in_up");
  if (sections.length) {
    sections.forEach((section) => {
      let t = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "350px bottom",
          toggleActions: "play none none reverse",
        },
      });

      let targets = section.querySelectorAll(".ani_fade_in_up_target");

      t.addLabel("start");

      targets.forEach((target, index) => {
        t.fromTo(
          target,
          0.7,
          {
            y: 40,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            ease: Power1.easeInOut,
          },
          "start+=" + 0.1 * index
        );
      });
    });
  }
}
