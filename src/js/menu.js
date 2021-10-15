// overlay menu
$(".menu_icon").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  if ($(".menu-on").length > 0) {
    $("body").removeClass("menu-on");
    document.getElementsByClassName("mmenu-content")[0].scrollTop = 0;
  } else {
    $("body").addClass("menu-on");
  }
});

$(".menu_off_btn").on("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  if ($(".menu-on").length > 0) {
    $("body").removeClass("menu-on");
    document.getElementsByClassName("mmenu-content")[0].scrollTop = 0;
  } else {
    $("body").removeClass("menu-on");
  }
});
