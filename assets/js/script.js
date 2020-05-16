$(document).ready(function () {
//Home 
    $(".nav-toggle").on({
        mouseover: function () {
        $(this).addClass("nav-el-active");
        },
        mouseout: function () {
        if (!$(this).hasClass("isClicked")) {
            $(this).removeClass("nav-el-active");
        }
        },
        click: function () {
        $("#nav-menu").toggle();
        $(this).toggleClass("isClicked");
        if (!$(this).hasClass("isClicked")) {
            $(this).removeClass("nav-el-active");
        }
        }, 
    });
//Contact 
    $("#contact-form").submit(function(){
            return submitForm(this);
    })
//Footer
$(".footer-to-top").on({
    mouseover: function () {
      $(this).addClass("footer-to-top-hover");
    },
    mouseout: function () {
      $(this).removeClass("footer-to-top-hover");
    },
    click: function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  });
});