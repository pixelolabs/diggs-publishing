jQuery(function() {
    /* Global
    Announcement Slider */
    var announcementSlider = new Swiper(".js__announcement-slider", {
        slidesPerView: 1,
        resistance: false,
        shortSwipes: true,
        loop:true,
        
        autoplay: {
            delay: 3000,
        },
        // direction: 'vertical',
        

    });

    /* Announcement 
    Close on Click  */
    $("#announcement-close").on("click", function(e) {
        e.preventDefault();
        $(".announcement-bar").hide();
        $("body").removeClass("announcement-visible");
        $("body").addClass("announcement-hide");
        

    });
    // if($("div").hasClass("hero-banner") || $("div").hasClass("error-page") || $("div").hasClass("inner-hero-section") ){
    //     $("body").addClass("transparent-header");
    //     $(".js__main-content").addClass("active");
    //   } else {
    //     $("body").removeClass("transparent-header");
    //     $(".js__main-content").removeClass("active");
    // }

    /* MEGAMENU
      active link while submenu open */
    if ($(window).width() > 980) {
    
        $('.has-sub-nav').hover(function(event) {
                event.stopPropagation(); // Stop event propagation
                // Adding a extra link to give anchor hover effect
                $(this).children(".site-nav__link").addClass("hover-submenu");
                // Give Visibility and opacity to the Sub nav menu
                $(this).children(".sub-nav").css("visibility", "visible");
                $(this).children(".sub-nav").css("opacity", "1");
                $(this).children(".sub-nav").css("z-index", "1");
                $(this).children(".sub-nav").addClass("active");
                //$("body").removeClass("transparent-header");
                // main-header").addClass("active");
                // /$("./ Remove transparent header from index page when sub menu open
                // $(".template-index").addClass("remove-transparent-header");
                if($(".js__search ").hasClass("active") == true){
                    $(".js__header-search-section").removeClass("active");
                    $(".js__search ").removeClass("active");
                    $("body .boost-pfs-search-suggestion").css("display","none");
                    $("body #boost-sd__search-widget-init-wrapper-1").css("display","none");
                    
                }
                


            },
            function(event) {
                event.stopPropagation(); // Stop event propagation
                // Remove  extra link to remove anchor hover effect
                $(this).children(".site-nav__link").removeClass("hover-submenu");
                $(".has-sub-nav").children(".site-nav__link").removeClass("hover-submenu");
                // Remove Visibility and opacity from the Sub nav menu
                $(".has-sub-nav").children(".sub-nav").css("visibility", "hidden");
                $(".has-sub-nav").children(".sub-nav").css("opacity", "0");
                $(".has-sub-nav").children(".sub-nav").removeClass("active");
                // $(this).children(".sub-nav").css("z-index", "-10");
                if($(".js__header-search-section").hasClass("active") === true){
                    $(".main-header").addClass("active");
                }
                else{
                    $(".main-header").removeClass("active");  
                }
                // $(".main-header").removeClass("active");
                // if ($("body").hasClass("fixed-header")) {
                //     $("body").removeClass("transparent-header");
                // } 
                // else{
                //     // $("body").addClass("transparent-header");
                //     // if($(".main-header").hasClass("active")){
                //     //   $("body").removeClass("transparent-header");
                //     // }else{
                //     //   if($("div").hasClass("hero-banner") || $("div").hasClass("error-page")  || $("div").hasClass("inner-hero-section") ){
                //     //     $("body").addClass("transparent-header");
                //     //   }
                //     //   else{
                //     //     if ($("div").hasClass("white-bg") === true) {
                //     //         $("body").removeClass("transparent-header");
                //     //         $("body").removeClass("template-index");
                //     //     }
                //     //     $("body").removeClass("transparent-header");
                //     //   }
                //     // }
                    
                //   }

                // $("body").removeClass("remove-transparent-header");
                // Add transparent header from index page when sub menu open
                // $(".template-index").addClass("transparent-header");

            }
        );
        $('.has-big-nav').hover(function(event) {
            event.stopPropagation(); // Stop event propagation
            // Adding a extra link to give anchor hover effect
            $(this).children(".site-nav__link").addClass("hover-submenu");
            // Give Visibility and opacity to the Big nav menu
            $(this).children(".big-nav").css("visibility", "visible");
            $(this).children(".big-nav").css("opacity", "1");
            $(this).children(".big-nav").addClass("active");
            // Remove transparent header from index page when big nav menu open
            // $("body").removeClass("transparent-header");
            $(".main-header").addClass("active");
            if($(".js__search").hasClass("active") == true){
                $(".js__header-search-section").removeClass("active");
                $(".js__search").removeClass("active");
                $("body .boost-pfs-search-suggestion").css("display","none");
                $("body #boost-sd__search-widget-init-wrapper-1").css("display","none");
            }
        }, function(event) {
            event.stopPropagation(); // Stop event propagation
            // Remove  extra link to remove anchor hover effect
            $(this).children(".site-nav__link").removeClass("hover-submenu");
            // Remove Visibility and opacity from the Big nav menu
            $(".has-big-nav .big-nav").css("visibility", "hidden");
            $(".has-big-nav .big-nav").css("opacity", "0");
            $(".has-big-nav").children(".big-nav").removeClass("active");
            if($(".js__header-search-section").hasClass("active") === true){
                $(".main-header").addClass("active");
            }
            else{
                $(".main-header").removeClass("active");  
            }
            
            // Add transparent header from index page when sub menu open
            // if ($("body").hasClass("fixed-header")) {
            //     $("body").removeClass("transparent-header");
            // } 
            // else{
            //     // $("body").addClass("transparent-header");
            //     if($(".main-header").hasClass("active")){
            //       $("body").removeClass("transparent-header");
            //     }else{
            //       if($("div").hasClass("hero-banner") || $("div").hasClass("error-page")  || $("div").hasClass("inner-hero-section") ){
            //         $("body").addClass("transparent-header");
            //       }
            //       else{
            //         if ($("div").hasClass("white-bg") === true) {
            //             $("body").removeClass("transparent-header");
            //             $("body").removeClass("template-index");
            //         }
            //         $("body").removeClass("transparent-header");
            //       }
            //     }
                
            //   }
            // $(".template-index").addClass("transparent-header");

        });
    }

    //  Sub Menu in MObile
    /* SubMenu
       Accordion JS */
    (function($) {
        $(function() {
            var navLink = false;
            $(".accordion-toggle")
                .on("mousedown", function(e) {
                    "use strict";
                    e.stopImmediatePropagation();
                    if ($(this).parent("div").hasClass("footer-links")) {
                        if ($(window).width() < 981) {
                            if ($(this).hasClass("active")) {
                                $(this).removeClass("active");
                                $(this).siblings(".accordion-content").slideUp(300);
                            } else {
                                $(".accordion-toggle").removeClass("active");
                                $(this).addClass("active");
                                $(".accordion-content").slideUp(300);
                                $(this).siblings(".accordion-content").slideDown(300);
                            }
                        }
                    } else {
                        if ($(this).hasClass("active")) {
                            $(this).removeClass("active");
                            $(this).siblings(".accordion-content").slideUp(300);
                        } else {
                            $(".accordion-toggle").removeClass("active");
                            $(this).addClass("active");
                            $(".accordion-content").slideUp(300);
                            $(this).siblings(".accordion-content").slideDown(300);
                        }
                    }
                    navLink = true;
                })
                .focus(function(e) {
                    "use strict";
                    if (navLink) {
                        navLink = false;
                    } else {
                        if ($(this).parent("div").hasClass("footer-links")) {
                            if ($(window).width() < 980) {
                                if ($(this).hasClass("active")) {
                                    $(this).removeClass("active");
                                    $(this).siblings(".accordion-content").slideUp(300);
                                } else {
                                    $(".accordion-toggle").removeClass("active");
                                    $(this).addClass("active");
                                    $(".accordion-content").slideUp(300);
                                    $(this).siblings(".accordion-content").slideDown(300);
                                }
                            }
                        } else {
                            if ($(this).hasClass("active")) {
                                $(this).removeClass("active");
                                $(this).siblings(".accordion-content").slideUp(300);
                            } else {
                                $(".accordion-toggle").removeClass("active");
                                $(this).addClass("active");
                                $(".accordion-content").slideUp(300);
                                $(this).siblings(".accordion-content").slideDown(300);
                            }
                        }
                    }
                });
        });
        
    })(jQuery);


    
    

    // sEARCH BAR
    $(document).click(function(e) {
        var container = $(".search-li");

        
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $(".js__header-search-section").removeClass("active");
                $(".js__search").removeClass("active");
                $("body .boost-pfs-search-suggestion").css("display","none");
                $("body #boost-sd__search-widget-init-wrapper-1").css("display","none");
                
                // if ($("div").hasClass("inner-hero-section")  || $("div").hasClass("error-page") || $("div").hasClass("hero-banner-slider")) {
                //     if($(".js__main-header").hasClass("active") === true){
                //         $("body").removeClass("transparent-header");
                //     }
                    
                    
                    
                // }
                // else{
                //     $("body").removeClass("transparent-header");
                // }
                
            }
        

    });
    
    $("#search-close").on("click", function(e) {
        $(".js__header-search-section").removeClass("active");
        $(".js__search").removeClass("active");
        $("body .boost-pfs-search-suggestion").css("display","none");
        $("body #boost-sd__search-widget-init-wrapper-1").css("display","none");
        $(".js__main-header").removeClass("active");
    });

    $(".js__search").on("click", function(e) {
            e.preventDefault();
            $(".js__header-search-section").toggleClass("active");
            $("#navbarNavDropdown").removeClass("active");
            // $(".announcement-bar").removeClass("active");
            $("#hamburger").removeClass("active");
            $(".search").focus();
            $(".boost-pfs-search-box").focus();
            $(this).toggleClass("active");
            $(".js__main-header").toggleClass("active");
            // $("body").toggleClass("transparent-header");
            // if ($("body").hasClass("fixed-header")) {
            //     $("body").removeClass("transparent-header");
            // }
            // if ($("div").hasClass("inner-hero-section")===false || $("div").hasClass(".hero-banner-slider")===false ){
            //     $("body").removeClass("transparent-header");
            // }
            // if ($("div").hasClass("inner-hero-section")  || $("div").hasClass("error-page") || $("div").hasClass("hero-banner-slider")) {
            //     if($(".js__main-header").hasClass("active") === true){
            //         $("body").removeClass("transparent-header");
            //     }
            //     else{
            //         if ($("body").hasClass("fixed-header")) {
            //             $("body").removeClass("transparent-header");
            //         }
            //         else{
            //             $("body").addClass("transparent-header"); 
            //         }
                    
            //     }
                
                
            //     // $("body").addClass("transparent-header");
            //     // $("body").addClass("template-index");
            // }


           
        })
    

});

/** Fix Header on Scroll **/
jQuery(function() {
var newsHeight = $('.announcement-bar').height();
$('.header-logo').css("top", '-' + (newsHeight ) + 'px');
$('.navbar-collapse').css("top",  + (newsHeight + 54 ) + 'px');

});

$(window).scroll(function() {
    var sticky = $("header"),
        scroll = $(window).scrollTop();
    if (scroll >= 30) {
        sticky.addClass("fixed");

        $("body").addClass("fixed-header");
        // $(".fixed-header").removeClass("transparent-header");
        
       

    } else {
        sticky.removeClass("fixed");
        $("body").removeClass("fixed-header");
        
        if ($("#navbarNavDropdown").hasClass("active")) {

            // $("body").removeClass("transparent-header");
            $(".main-header").addClass("active");
            $(".main-header").addClass("gradient");
            
        } 
        // else {
        //     if($("div").hasClass("hero-banner") || $("div").hasClass("error-page")  || $("div").hasClass("inner-hero-section") ){
        //         $("body").addClass("transparent-header");
        //       }
              
              
        //      else{$("body").removeClass("transparent-header");}
                
              
        // }
        
        // if($(".js__main-header").hasClass("active") === true){
        //     $("body").removeClass("transparent-header");
        // }
        // else{
        //     if($("div").hasClass("hero-banner") || $("div").hasClass("error-page") || $("div").hasClass("inner-hero-section") ){
        //         $("body").addClass("transparent-header");
        //       }
        //       else{
        //         $("body").removeClass("transparent-header");
        //       }
        //     //   $("body").removeClass("transparent-header");
        // }
        
       
    }
    
});







/** Mobile Navigation Open Close **/
(function($) {
    $(function() {
        var navLink = false;
        $("#hamburger")
            .mousedown(function(e) {
                $(this).toggleClass("active");
                $("#navbarNavDropdown").toggleClass("active");
                $(".js__mobile-menu-open-hide").toggleClass("active");
                $(".js__mobile-announcement-text").toggleClass("active");
                $(".main-header").toggleClass("active");
                $(".main-header").toggleClass("gradient");
                // $(".announcement-bar").toggleClass("active");
                // $("body").removeClass("transparent-header");


                // if ($("body").hasClass("transparent-header")) {
                //     $("body").removeClass("transparent-header");
                // }

                if ($("#navbarNavDropdown").hasClass("active")) {
                    $(".js__logo").addClass("active");
                    // $(".template-index").removeClass("transparent-header");
                    $(".main-header").addClass("active");
                    $(".main-header").addClass("gradient");
                    if ($(window).width() < 980) {
                        $("html").css("overflow", "hidden");
                        $("html").addClass("scroll-stop");
                    } else {
                        $("html").removeClass("scroll-stop");
                        $("html").css("overflow-y", "scroll");
                    }

                } else {
                    $(".js__logo").toggleClass("active");
                    $(".main-header").removeClass("active");
                    $(".main-header").removeClass("gradient");
                    // if ($("body").hasClass("fixed-header")) {
                    //     $(".template-index").removeClass("transparent-header");
                    // } else {
                    //     $(".template-index").addClass("transparent-header");
                    // }
                    $("html").css("overflow-y", "scroll");
                    $("body .boost-pfs-search-suggestion-group").css("display","none");

                }
                navLink = true;
            })
            .focus(function(e) {
                "use strict";
                if (navLink) {} else {
                    $(this).toggleClass("active");
                    $("#navbarNavDropdown").toggleClass("active");
                    $(".js__mobile-menu-open-hide").toggleClass("active");
                    $(".js__mobile-announcement-text").toggleClass("active");
                    if ($("#navbarNavDropdown").hasClass("active")) {
                        $(".js__logo").addClass("active");
                        // $(".template-index").removeClass("transparent-header");
                    } else {
                        $(".js__logo").toggleClass("active");
                        //$(".template-index").addClass("transparent-header");
                    }
                }
            });
    });



})(jQuery);

/** CART SIDEBAR
 * Close on Outside Click
 * **/
$(document).mouseup(function(e) {
    var popup = $("#CartSidebar");
    var overlay = $("#cart_overlay");
    if (!popup.is(e.target) && popup.has(e.target).length == 0) {
        popup.removeClass("active");
        overlay.removeClass("active");
    }
});
/* OPEN BIG NAV SECTION ON DESKTOP */
(function($) {
    $(function() {
        var navLink = false;
        $(".js__big-nav-link")
            .mousedown(function(e) {
                $(this).toggleClass("active");
                $(".js__big-nav").toggleClass("active");
                navLink = true;
            })
            .focus(function(e) {
                "use strict";
                if (navLink) {} else {
                    $(this).toggleClass("active");
                    $(".js__big-nav").toggleClass("active");
                }
            });
    });
  })(jQuery);
/* OPEN SUB NAV SECTION ON MOBILE */
(function($) {
    $(function() {
        var navLink = false;
        $(".js__sub-nav-link")
            .mousedown(function(e) {
                $(this).toggleClass("active");
                $(".js__sub-nav").toggleClass("active");
                navLink = true;
            })
            .focus(function(e) {
                "use strict";
                if (navLink) {} else {
                    $(this).toggleClass("active");
                    $(".js__sub-nav").toggleClass("active");
                }
            });
    });
  })(jQuery);
  
  // Close MOBILE SUB NAV ON CLICK BACK 
  (function($) {
    $(function() {
        var navLink = false;
        $(".js__sub-nav-close")
            .mousedown(function(e) {
                $(this).toggleClass("active");
                $(".js__sub-nav").toggleClass("active");
                navLink = true;
            })
            .focus(function(e) {
                "use strict";
                if (navLink) {} else {
                    $(this).toggleClass("active");
                    $(".js__sub-nav").toggleClass("active");
                }
            });
    });
  })(jQuery);
