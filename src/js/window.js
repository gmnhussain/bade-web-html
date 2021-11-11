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

// map page
function hightlightRoom(item) {
  var allGs = document.getElementsByTagName("g");

  for (var i = 1; i < allGs.length; i++) {
    var gElem = allGs[i];
    if (item.id !== gElem.id) {
      gElem.style.opacity = "0.4";
    }
  }

  var styleElem = document.head.appendChild(document.createElement("style"));
  styleElem.innerHTML = ".svg-div:before {opacity: 0.4;}";
}

function unhighlightRoom(item) {
  var allGs = document.getElementsByTagName("g");

  for (var i = 1; i < allGs.length; i++) {
    var gElem = allGs[i];
    gElem.style.opacity = "1";
  }

  var styleElem = document.head.appendChild(document.createElement("style"));
  styleElem.innerHTML = ".svg-div:before {opacity: 1;}";
}
