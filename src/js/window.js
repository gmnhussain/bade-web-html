// register plugin
gsap.registerPlugin(ScrollTrigger);

if (
  window.location.pathname == "/" ||
  window.location.pathname == "/index.html"
) {
  document.body.classList.add("home");
}

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

  setTimeout(() => {
    setHomeSubscriptionOn();
  }, 6500);
});

// map page
function hightlightRoom(items) {
  let ids = [];

  items.forEach((item) => {
    let id = "Mask_Group_" + item;
    ids.push(id);
  });

  var allGs = $("#map-svg g");

  for (var i = 2; i < allGs.length; i++) {
    var gElem = allGs[i];
    if (!ids.includes(gElem.id)) {
      gElem.style.opacity = "0.4";
    } else {
      gElem.style.opacity = "1";
    }
  }

  var styleElem = document.head.appendChild(document.createElement("style"));
  styleElem.innerHTML = ".svg-div:before {opacity: 0.4;}";
}

function unhighlightRoom(item) {
  // var allGs = document.getElementsByTagName("g");
  // for (var i = 1; i < allGs.length; i++) {
  //   var gElem = allGs[i];
  //   gElem.style.opacity = "1";
  // }
  // var styleElem = document.head.appendChild(document.createElement("style"));
  // styleElem.innerHTML = ".svg-div:before {opacity: 1;}";
}

// $(".map_item_base").on("click", function () {
//   $(".map_item").removeClass("active");
//   document.querySelector(".map_item_base").classList.add("active");
// });

// for (let index = 1; index <= 6; index++) {
//   let roomNumber = index != 1 ? `-${index}` : "";
//   let selector = "#Mask_Group_14" + roomNumber;
//   let elemn = document.querySelector(selector);
//   if (elemn) {
//     elemn.addEventListener("mouseenter", function (e) {
//       e.stopPropagation();
//       $(".map_item").removeClass("active");
//       document.querySelector(`#room${roomNumber}`).classList.add("active");
//     });
//   }
// }

$("[data-room-no]").on("mouseenter", function () {
  let roomNumber = $(this).attr("data-room-no");
  roomNumber = roomNumber != 1 ? `-${roomNumber}` : "";
  $(".map_item").removeClass("active");
  document.querySelector(`#room${roomNumber}`).classList.add("active");
});

$(".msubs-btn").click(function (event) {
  event.preventDefault();
  let name = $("input[name=navn]").val();
  let email = $("input[name=email]").val();

  if (name != "" && email != "") {
    $.ajax({
      url: "data/file.php",
      type: "POST",
      data: {
        data: name + ", " + email,
      },
      // success:function(response){
      //  if(response) {
      //    $("#response-messages").html("<p style='color: #1e7e34;padding-top: 15px'>Message sent! We Will get back to you Soon</p>");
      //  }
      //  else{
      //    $("#response-messages").html("<p style='color: #1e7e34;padding-top: 15px'>Error ! Please Try Again Later or call us</p>");
      //  }
      // },
    });
    $(".msubs_form").find("input").val("");
    setSubscriptionOff();
  }
});

// policy page
$(".policy_page [data-panel]").on("click", function () {
  $("[data-panel]").removeClass("active");
  $(this).addClass("active");

  const panelId = $(this).attr("data-panel");

  $(".policy_panel").removeClass("active");
  $(`.policy_panel#${panelId}`).addClass("active");
});
