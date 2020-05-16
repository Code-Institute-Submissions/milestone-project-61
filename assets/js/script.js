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