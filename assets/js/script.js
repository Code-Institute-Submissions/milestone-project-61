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
//About 
$("#btn-about-us").click(function () {
    $(this).hide();
    $("#about-us-content").show();
  });
    $("#about-nav-col-next").click(function () {
        $(".team-img-active").next("img").removeClass("display-none").addClass("team-img-active");
        $(".team-img-active").prev("img").addClass("display-none").removeClass("team-img-active");   
        if ($(".team-img-active").is("img:last-child")) {
            $("#about-us-next").addClass("vis-none");
        }  
        $("#about-us-prev").removeClass("vis-none");
        $(".team-header-active").next("h4").removeClass("display-none").addClass("team-header-active");
        $(".team-header-active").prev("h4").addClass("display-none").removeClass("team-header-active");
    }); 
    
    $("#about-nav-col-prev").click(function () {
        $(".team-img-active").prev("img").removeClass("display-none").addClass("team-img-active");
        $(".team-img-active").next("img").addClass("display-none").removeClass("team-img-active");   
        if ($(".team-img-active").is("img:first-child")) { 
            $("#about-us-prev").addClass("vis-none");
        }  
        $("#about-us-next").removeClass("vis-none");
           $(".team-header-active").prev("h4").removeClass("display-none").addClass("team-header-active");
        $(".team-header-active").next("h4").addClass("display-none").removeClass("team-header-active");
    });
//Contact 
    $("#contact-form").submit(function(){
            return submitForm(this);
    })

     $("#contact-social-link").click(function () {
        $(".social-icons").addClass("animated heartBeat delay-1s");
    });
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