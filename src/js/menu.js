// overlay menu
$("#menu_button, .mmenu_onbtn").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  if ($(".menu-on").length > 0) {
    $("body").removeClass("menu-on");
    document.getElementsByClassName("mmenu-content")[0].scrollTop = 0;
  } else {
    $("body").addClass("menu-on");
  }
});

$(".mmb-on").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  if ($(".menu-on").length > 0) {
    $("body").removeClass("menu-on");
    document.getElementsByClassName("mmenu-content")[0].scrollTop = 0;
  } else {
    $("body").removeClass("menu-on");
  }
});
