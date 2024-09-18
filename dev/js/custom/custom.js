jQuery(function() {
   
    if(navigator.userAgent.indexOf('Mac') > 0){
        $('body').addClass('mac-os');
    }
       
    $(window).scroll(function() {
        // var targetScroll = $('.product__actions').position().top;
        try{
            var targetScroll = $('.product__actions').offset().top - $('.product__actions').outerHeight() + 20;
            if($(window).scrollTop() > targetScroll ) {
                $(".top-banner").addClass("active");
            } 
            else{
                $(".top-banner").removeClass("active");
            }
        }
        catch{
            
        }
       
    });
    var productSectionSlider = new Swiper(".js__product-slider", {
        slidesPerView: 3,
        spaceBetween: 39,
        // centeredSlides: true,
        // resistance: false,
        threshold:5,
        // loop:true,
        resistance: false,
        shortSwipes: true,
        longSwipes: false,
        // scrollOverflowOptions: null,
        // loopedSlidesLimit: false,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            769: {
                slidesPerView: 2,
            },
            1025: {
                slidesPerView: 3,
               
            },
        },
        navigation: {
            nextEl: ".swiper-button-next-product-slider",
            prevEl: ".swiper-button-prev-product-slider"
        }
        
    });

//RElated Article slider
var productSectionSlider = new Swiper(".js__article-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    // centeredSlides: true,
    // resistance: false,
    threshold:5,
    loop:true,
    resistance: false,
    shortSwipes: true,
    longSwipes: false,
    // scrollOverflowOptions: null,
    // loopedSlidesLimit: false,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        601: {
            slidesPerView: 2,
        },
        1025: {
            slidesPerView: 3,
           
        },
    },
    navigation: {
        nextEl: ".swiper-button-next-article-section",
        prevEl: ".swiper-button-prev-article-section",
    }
    
});



    var reviewSectionSlider = new Swiper(".js__review-slider", {
        slidesPerView: 2,
        spaceBetween: 14,
        // centeredSlides: true,
        // resistance: false,
        
        loop:true,
        resistance: false,
        shortSwipes: true,
        longSwipes: false,
        // scrollOverflowOptions: null,
        // loopedSlidesLimit: false,
        navigation: {
            nextEl: ".swiper-button-next-review-slider",
            prevEl: ".swiper-button-prev-review-slider",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            376: {
                slidesPerView: 1,
            },
            481: {
                slidesPerView: 1,
                
            },
            769: {
                slidesPerView: 2,
            },
            981: {
                slidesPerView: 1,
            },
            1100: {
                slidesPerView: 1,
            },
            1440: {
                slidesPerView: 2,
                spaceBetween: 14,
            },
        },
    });

    
    /* Hero Banner SLider */
    // var heroSlider = new Swiper(".js__hero-banner-slider", {
    //     slidesPerView: 1,

    //     resistance: false,

    //     loop: true,
    //     // autoplay: {
    //     //     delay: 10000,
    //     // },
    //     // Navigation arrows
    //     navigation: {
    //         nextEl: ".swiper-button-next-hero-banner",
    //         prevEl: ".swiper-button-prev-hero-banner",
    //     },
    // });

    // logo Slider
    var logoSlider = new Swiper('.js_logo-slider', {
        slidesPerView: "auto",
        spaceBetween: 148,
        freeMode: true,
        watchSlidesProgress: true,
        clickable: true,
        resistance: false,
        shortSwipes: false,
        loop: true,
        grabCursor: false,
        slidesPerView: 5,
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 90
            },
            601: {
                slidesPerView: 3,
                spaceBetween: 90
            },
            900: {
                slidesPerView: 4
            },
            1100: {
                slidesPerView: 5,
                spaceBetween: 148
            }
        }

        // threshold: 1,
       // speed: 4000,
       // autoplay: {
          //  delay: 1,
           // disableOnInteraction: false,
            // reverseDirection: true,
      //  },

        /* breakpoints: {
             0: {
                 slidesPerView: 2,
                 spaceBetween: 20,
             },
             350: {
                 slidesPerView: 2,
                 spaceBetween: 20,
             },
             480: {
                 slidesPerView: 4,
                 spaceBetween: 20,
             },
             600: {
                 slidesPerView: 4,
                 spaceBetween: 20,
             },
             980: {
                 slidesPerView: 5,
                 spaceBetween: 20,
             },
             1024: {
                 slidesPerView: 6,
                 spaceBetween: 20,
             },
             1200: {
                 slidesPerView: 7,
                 spaceBetween: 20,
             },
             1280: {
                 slidesPerView: 8,
                 spaceBetween: 20,
             },
         },*/
    });

    //    embed slider
 


    var halfcontentSlider = new Swiper(".js_half-content-half-image-slider", {
        slidesPerView: 1,

        resistance: false,
        threshold:5,
        loop: true,
        spaceBetween: 30,
        // autoplay: {
        //     delay: 10000,
        // },
        // Navigation arrows
        navigation: {
            nextEl: ".swiper-button-next-content-slider",
            prevEl: ".swiper-button-prev-content-slider",
        },
    });

  

    var blogSlider = new Swiper(".js__blog-slider", {
        slidesPerView: "auto",
        spaceBetween: 20,
        threshold: 1,
        loop: true,
        threshold:5,
        breakpoints: {

            1920: {
                slidesPerView: "auto",

            },
        },
        navigation: {
            nextEl: ".swiper-button-next-blog-slider",
            prevEl: ".swiper-button-prev-blog-slider ",
        },
    });

    var productSlider = new Swiper(".js__small-product-slider", {
        slidesPerView: 3,
        spaceBetween: 25,
        loop: true,
        threshold:5,
        threshold: 1,
        breakpoints: {
            '1025': {
                slidesPerView: 3,
                spaceBetween: 25,
            },
            '981': {
                slidesPerView: 2,
                spaceBetween: 25,
            },

            '480': {
                slidesPerView: 3,
                spaceBetween: 25,
            },
            '0': {
                slidesPerView: 2,
                spaceBetween: 25,
            },
        },

        navigation: {
            nextEl: ".swiper-button-next-small-product-slider",
            prevEl: ".swiper-button-prev-small-product-slider ",
        },
    });


    if (window.location.href.indexOf("article&") > -1) {
      
        $(".search-item").val("article");
        $(".js__search-blog").addClass("active")
       
    } else {
        
        $(".search-item").val("product");
        $(".js__search-product").addClass("active")
    }


    $(".js__search-type a").on("click", function() {
    
        if ($(this).html().trim() == "Blog") {
            $(".search-item").val("article");
            $(".js__search-submit").click();
        } else

        {
            $(".search-item").val("product");
            $(".js__search-submit").click();
        }

    })










    /* Collection selected*/
    $(document).ready(function($) {
        $(".js__collections-select").change(function() {
            window.location = $(this).val();
        });

        /*Dropdown selected*/
        $(".js__collection-content li").each(function(index) {
            var value = $(this).attr("data-url").toLowerCase();
            if (window.location.href.toLowerCase().indexOf(value) > -1) {
                $(this).addClass("active");
                $(".js__collections-select").val($(this).attr("data-url"));
            }
        });
        if (!("ontouchstart" in document.documentElement)) {
            document.documentElement.className += " no-touch";
        }


    });

    try {
        var pageTotal = parseInt($(".js__total-page").val());
        var currentPage = parseInt($(".js__current-page").val());
        var itemTotal = parseInt($(".js__items-count").val());
        var perPageItem = parseInt($(".js__perpage-item").val());
        var itemStart = 1;
        var itemEnd = 0;
        if (currentPage > 1) {
            itemStart = perPageItem * (currentPage - 1) + 1;
        }
        itemEnd = itemStart + perPageItem - 1;
        if (pageTotal == currentPage) {
            itemEnd = itemTotal;
        }
        $(".js__page-range").html(itemStart + " - " + itemEnd);
    } catch {}






    /* PDP
    Tab working */
    $(".tab-link").on("click", function() {
        var dataId = $(this).attr("data-attr");
        var i, tabcontent, tablink;
        
        tabcontent = document.getElementsByClassName("tab-content");
        
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            

        }
        tablink = document.getElementsByClassName("tab-link");
        for (i = 0; i < tablink.length; i++) {
            tablink[i].className = tablink[i].className.replace(" active", "");
        }

        document.getElementById(dataId).style.display = "block";
        
        event.currentTarget.className += " active";
      $(this).addClass("active");
      
        /*PDP select*/
        $(".js__pdp-tab-select").val(dataId);
        $(".js__faq-search-section").addClass("hide");
        $(".js__faq-tab").removeClass("hide");
        $(".js__no-data-found").addClass("hide");
        $("#txt-faq-search").val("");
    });
    $(document).on("click", ".pdp-tab-link", function(e) {

        var dataId = $(this).attr("data-attr");
        var i, tabcontent, tablink;

        tabcontent = document.getElementsByClassName("pdp-tab-content");
        $(this).parent("li").parent("ul").parent(".pdp-tab-small__wrapper__head").parent(".pdp-tab-small__wrapper").children(".pdp-tab-small__wrapper__content").children(".pdp-tab-content").hide();
        $(this).parent("li").parent("ul").parent(".pdp-tab-small__wrapper__head").parent(".pdp-tab-small__wrapper__head-outer").parent(".pdp-tab-small__wrapper").children(".pdp-tab-small__wrapper__content").children(".pdp-tab-content").hide();

        $(this).parent("li").parent("ul").children("li").children(".pdp-tab-link").removeClass("active");
        tablink = document.getElementsByClassName("pdp-tab-link");


        document.getElementById(dataId).style.display = "block";
        event.currentTarget.className += " active";
        $(this).addClass("active");

        /*PDP select*/
        $(".js__pdp-tab-select").val(dataId);
    });
    /* GLOBAL
    Scroll to particular Div with # value */
    // $('a[href^="#"]').on("click", function(event) {
    //     var target = $(this.getAttribute("href"));
    //     if (target.length) {
    //         event.preventDefault();
    //         $(".tab-head").hide();
    //         $("html, body")
    //             .stop()
    //             .animate({
    //                     scrollTop: target.offset().top - 150,
    //                 },
    //                 1000
    //             );
    //     }
    // });

    /* accordion working about content in small screen*/
    $(".js__accordian")
        .children("li")
        .children("h2,h4,h5,h3")
        .click(function(e) {
            if ($(this).parent("li").children(".content").css("display") == "none") {
                $(this)
                    .parent("li")
                    .parent(".js__accordian")
                    .children("li")
                    .children(".content")
                    .hide();
                $(this)
                    .parent("li")
                    .parent(".js__accordian")
                    .children("li")
                    .removeClass("active");
                $(this).parent("li").children(".content").slideDown();
                $(this).parent("li").addClass("active");

            } else {
                $(this).parent("li").children(".content").slideUp();
                $(this).parent("li").removeClass("active");
            }
        });

    /* Accordion working when we have multiple content*/

    $(".js__accordians")
        .children("li").attr("aria-expanded", false);
    $(".js__accordians")
        .children("li")
        .children("h5,h6,h3,h4").attr("role", "button");
    $(".js__accordians")
        .children("li")
        .children("h5,h6,h3,h4").attr("tabindex", "0");
    $(".js__accordians")
        .children("li")
        .children("h5,h6,h3,h4")
        .click(function(e) {
            var type = $(this).parent("li").attr("data-attr");
            if ($("." + type).css("display") == "none") {
                $(this).attr("aria-expanded", true);
                $(this).parent("li").parent(".js__accordians").children(".content").hide();
                $(this)
                    .parent("li")
                    .parent(".js__accordians")
                    .children("li")
                    .removeClass("active");
                $("." + type).slideDown();
                $(this).parent("li").addClass("active");
                $(this).addClass("active");
            } else {
                $(this).attr("aria-expanded", false);
                $(this).parent("li").removeClass("active");
                $("." + type).slideUp();
                $(this).removeClass("active");
            }

        });

    $(".js__accordians")
        .children("li")
        .children("h5,h6,h3,h4")
        .keypress(function(e) {
            if (e.which == 13) {
                var type = $(this).parent("li").attr("data-attr");
                if ($("." + type).css("display") == "none") {
                    $(this).attr("aria-expanded", true);
                    $(this).parent("li").parent(".js__accordians").children(".content").hide();
                    $(this)
                        .parent("li")
                        .parent(".js__accordians")
                        .children("li")
                        .removeClass("active");
                    $("." + type).slideDown();
                    $(this).parent("li").addClass("active");
                    $(this).addClass("active");
                } else {
                    $(this).attr("aria-expanded", false);
                    $(this).parent("li").removeClass("active");
                    $("." + type).slideUp();
                    $(this).removeClass("active");
                }
            }

        });







});

/** Dropdown **/
jQuery(function($) {
/*FAQ Drop down*/
$(".drop-down-outer select option").each(function() {
    if (this.value === path) {
        this.setAttribute("selected", true);
    }
});

$(".js__faq-dropdown").change(function() {
    var sectionID = this.value;
    var target = $(sectionID);
    $("html, body").animate({
            scrollTop: target.offset().top - 200,
        },
        500
    );
});





    $(".js__cate-accordian .togglebtn h3").on("click", function() {

        if ($(".js__cate-accordian").children(".rem").css("display") == "none") {

            $(".rem").slideDown(300);

            $(this).parent(".togglebtn").toggleClass("active");

        } else {
            $(".rem").slideUp(300);


            $(".togglebtn").removeClass("active");
        }
    });
    $(".js__dropdown_result").on("click", function() {
        if ($(".js__dropdown").css("display") == "none") {
            $(".js__dropdown").slideDown(300);
        } else {
            $(".js__dropdown").slideUp(300);
        }
        $(this).toggleClass("active");
    });
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $(".js__dropdown li a").each(function() {
        if (this.href === path) {
            $(this).addClass("active");

            if ($(this).html() != "view all") {
                $(".js__dropdown_result").html($(this).html());
            }
            $(".js__dropdown").slideUp(300);
            $(".js__dropdown_result").removeClass("active");
        }
    });
    $(".js__active-class li a").each(function() {
        if (this.href === path) {
            $(".js__active-class li a").removeClass("active");
            $(this).addClass("active");
        }
    });
});
/* Mini cart - Checkout Button visiblity fix for IOS Mobile */
var lastScroll = 0;
jQuery(document).ready(function($) {
    $(".cart-sidebar__middle").addClass("safari-mobile");

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > lastScroll) {
            $(".cart-sidebar__middle").removeClass("safari-mobile");
        } else if (scroll < lastScroll) {
            $(".cart-sidebar__middle").addClass("safari-mobile");
        }
        lastScroll = scroll;
    });
});

/** Dropdown **/
jQuery(function($) {
    /*Blog dropdown*/
    $(".js__blog-select").change(function() {
        window.location = $(this).val();
    });
    /*Dropdown selected*/
    $(".js__blog-select option").each(function(index) {
        var value = $(this).val().toLowerCase();
        if (window.location.href.toLowerCase().indexOf(value) > -1) {
            $(".js__blog-select").val($(this).val());
        }
    });

});

jQuery(function($) {
    $(".js--open-rates-popup").on("click", function() {
        $(".js__rates-popup").show();
    });

    $(".js__modal-close").on("click", function() {
        $(".modal").hide();
    });
});

/*First tab link and first tab content active */
jQuery(document).ready(function($) {

    $(".tab-link").first().addClass("active");
    $(".pdp-tab-link").first().addClass("active");
    $(".shopify-section .tab-content").first().show();
    $(".pdp-tab-section .tab-content").first().show();
    $(".pdp-tab-small .tab-content").first().show();
    $(".pdp-tab-content").first().show();
    $(document).on("click", ".js__tab-small", function(e) {

        e.preventDefault()
        if ($(this).parent(".tab-content").children(".accordion-con").css("display") == "none") {

            // $(".accordion-con").slideUp();
            // $(".accordion-con").removeClass("active");
            // $(".accordion-link").removeClass("active");
            // $(".tab-content").removeClass("active");

            $(".tab-link").removeClass("active");

            $(this).parent(".tab-content").children(".accordion-con").slideDown();
            $(this).parent(".tab-content").children(".accordion-con").addClass("active");
            // $(this).parent(".tab-content").addClass("active");
            $(this).parent(".tab-content").children(".accordion-link").addClass("active");
            var dataId = $(this).parent(".tab-content").attr("data-attr");
            document.getElementById(dataId).className += " active";
            $('html,body').animate({
                scrollTop: $(this).offset().top - 120
            }, 500);

        } else {
            // $(".accordion-con").slideUp();
            // $(".accordion-con").removeClass("active");
            // $(".tab-content").removeClass("active");
            $(this).parent(".tab-content").children(".accordion-link").removeClass("active");
            // $(this).parent(".tab-content").removeClass("active");
            $(this).parent(".tab-content").children(".accordion-con").removeClass("active");

        }

    });
   
    $(document).on("click", ".js___accordion", function(e) {

        e.preventDefault()
        if ($(this).parent(".tab-content").children(".accordion-con").css("display") == "none") {


            $(".accordion-con").slideUp();
            $(".accordion-con").removeClass("active");
            $(".accordion-link").removeClass("active");
            // $(".tab-content").removeClass("active");
            $(".tab-link").removeClass("active");

            $(this).parent(".tab-content").children(".accordion-con").slideDown();
            $(this).parent(".tab-content").children(".accordion-con").addClass("active");
            // $(this).parent(".tab-content").addClass("active");
            $(this).parent(".tab-content").children(".accordion-link").addClass("active");
            var dataId = $(this).parent(".tab-content").attr("data-attr");
            document.getElementById(dataId).className += " active";
            $('html,body').animate({
                scrollTop: $(this).offset().top - 120
            }, 500);

        } else {

            $(".accordion-con").slideUp();
            $(".accordion-con").removeClass("active");
            // $(".tab-content").removeClass("active");
            $(this).parent(".tab-content").children(".accordion-link").removeClass("active");
            // $(this).parent(".tab-content").removeClass("active");
            $(this).parent(".tab-content").children(".accordion-con").removeClass("active");

        }
        if ($(this).parent(".tab-content").css("display") == "block"){
            $(this).parent(".tab-content").children(".accordion-con").css("display") == "block";
        }

    });


});

/*Select Dropdown change wit Tab */
jQuery(function() {
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $(".dropdown-select option").each(function() {
        if (this.value.toLowerCase() == path.toLowerCase()) {
            this.setAttribute("selected", true);
        }
    });

    $(".dropdown-select").change(function() {
        var dropdown = $(".dropdown-select").val();
        $(".js__faq-search-section").addClass("hide");
        $(".js__faq-tab").removeClass("hide");
        $("#txt-faq-search").val("");
        $(".js__no-data-found").addClass("hide");
        //first hide all tabs again when a new option is selected
        $(".tab-content").hide();
        //then show the tab content of whatever option value was selected
        $("#" + "tab-" + dropdown).show();
        if (dropdown == "all") {

            $(".js__tab-content").each(function() {
                if ($(this).find(".js__accordian").html().trim() == "<li>Sorry Data Is Not Added Yet</li>") {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            })
        }
    });
    $(".js__tab-content").each(function() {
        if ($(this).find(".js__accordian").html().trim() == "") {
            $(this).find(".js__accordian").html('<li>Sorry Data Is Not Added Yet</li>')
        }
    })
});
/*Blog content checking if p tag has image then adding class*/

jQuery(function() {
    $(".article-content p").each(function(index) {



        if ($(this).html().indexOf("<img") > -1) {

            $(this).addClass("full-width");
        }

        if ($(this).html().indexOf("<iframe") > -1) {

            $(this).addClass("full-width");
        }


    })
});
// jQuery(document).ready(function ($) {
//     // Get the element
//     for (var i = 0; i < 250; i++) {
//       var marqueeFooter = document.querySelector('.js__marquee-right .repeat');
//       // Create a copy of it
//       var cloneFooter = marqueeFooter.cloneNode(true);
//       // Inject it into the DOM
//       marqueeFooter.before(cloneFooter);
//     }
//   });
// Footer dropdown
(function($) {
    $(function() {
        var navLink = false;
        $(".accordion-toggle-footer-link")
            .on("mousedown", function(e) {
                "use strict";
                e.stopImmediatePropagation();
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this).siblings(".accordion-content-footer").slideUp(300);
                } else {
                    $(".accordion-toggle-footer-link").removeClass("active");
                    $(this).addClass("active");
                    $(".accordion-content-footer").slideUp(300);
                    $(this).siblings(".accordion-content-footer").slideDown(300);
                }
                navLink = true;
            })

    });

})(jQuery);
/* quick view modal pop up */



var popupCollectionSlider;
var popupCollectionSliderThumbnail;
jQuery(function() {
    /* Product card click - open quick view pop up */
    $(document).on("click", ".js__quick-view-click", function(e) {

        e.preventDefault();
        e.stopImmediatePropagation();
        var id = $(this).attr("data-id");
        //Executed after SWYM has loaded all necessary resources.
      

       
        

        $(".js__popup-variant-select-" + id + " li:first-child").click();
        // show modal pop up
        $("#modal-" + id).show();
        /* Swiper/Slider */
        try {
            var sliderIMages = $(this).attr("data-slider_main").split("|");
            $(this).parent("div");
            $("#modal-" + id)
                .find(".js__popup-collection-slider")
                .children(".swiper-wrapper")
                .empty();
            $("#modal-" + id)
                .find(".js__popup-collection-slider-thumbnail")
                .children(".swiper-wrapper")
                .empty();
            for (var k = 0; k < sliderIMages.length - 1; k++) {
                $("#modal-" + id)
                    .find(".js__popup-collection-slider")
                    .children(".swiper-wrapper")
                    .append(
                        ' <div class="swiper-slide slide">  <a class="image-section" ><img src="' +
                        sliderIMages[k] +
                        '"> </a> </div>  '
                    );
                $("#modal-" + id)
                    .find(".js__popup-collection-slider-thumbnail")
                    .children(".swiper-wrapper")
                    .append(
                        ' <div class="swiper-slide slide">  <a class="image-section" ><img src="' +
                        sliderIMages[k] +
                        '"> </a> </div>  '
                    );
            }
            /* Swiper Video working */
            $(this).children(".data-var_videos").children("li").each(function(index) {


                $("#modal-" + id)
                    .find(".js__popup-collection-slider")
                    .children(".swiper-wrapper")
                    .append('<div class="swiper-slide slide">  <div class="image-section video-section" >' + $(this).html() + ' </div> </div>');
                $("#modal-" + id)
                    .find(".js__popup-collection-slider-thumbnail")
                    .children(".swiper-wrapper")
                    .append(
                        ' <div class="swiper-slide slide">  <div class="image-section video-section" > </div> </div>  '
                    );
            })
        } catch {

        }


        try {
            if (typeof(popupCollectionSliderThumbnail) !== "undefined") {
                popupCollectionSliderThumbnail.destroy();
            }
            if (typeof(popupCollectionSlider) !== "undefined") {
                popupCollectionSlider.destroy();
            }


            popupCollectionSliderThumbnail = new Swiper(".js__popup-collection-slider-thumbnail-" + id, {
                slidesPerView: "auto",
                spaceBetween: 10,
                resistance: false,
                shortSwipes: true,
                navigation: {
                    nextEl: ".swiper-button-next-popup-thumbnail",
                    prevEl: ".swiper-button-prev-popup-thumbnail",
                }
            });
            popupCollectionSlider = new Swiper(".js__popup-collection-slider-" + id, {
                slidesPerView: 1,
                spaceBetween: 20,
            });
        } catch {}

       


    });

    $(document).on("click", ".modal", function(e) {

        if (!(($(e.target).closest(".modal-content").length > 0) || ($(e.target).closest(".close").length > 0))) {
            $(this).hide();

        }
    });

    /*Quantity Plus Minus*/
    $(document).on("click", ".js__popup-quantity .js-plus-minus-qty", function(e) {

        var type = $(this).attr("data-type");
        var productQuantity = $(this).parent(".js__popup-quantity").find(".qty-val").val();
        if (type == "minus") {
            if (productQuantity > 1) {
                productQuantity--;
            }
        } else {
            productQuantity++;
        }
        $(this).parent(".js__popup-quantity").find(".qty-val").val(productQuantity);
    });


    /* Quick View - Variant Radio Button Clicks */
    $(document).on("click", ".js__popup-variant-select li", function(e) {
        $(this).parent("ul").children("li").removeClass("active");
      
        var option = $(this).attr("data-value");


     
      
        $(this).addClass("active");
        var pID = $(this).attr("data-id");
      
console.log("pID"+pID)
        $("#product-select-" + pID + " option").each(function(index) {

            var optionName = $(this).html();

            var vID = $(this).attr("value");

            var variantSoldout = $(this).attr("data-soldout");
            var price = $(this).attr("data-price");
          
          
          
            if (optionName.trim() == option.trim()) {
               
                $(".js__price-popup-price-"+pID).hide();
                $(".js__price-popup-"+vID).show();
                if (variantSoldout == "true") {
                    $(".js__modal-popup-addtocart-" + pID).attr("disabled", "disabled");
                    //update the text for the add to cart button to sold out
                    $(".js__modal-popup-addtocart-text-" + pID).html("Soldout");
                    //hide the price if it's sold out
                    
                } else {
                    //update the text for the button to add to cart, if not sold out
                    $(".js__modal-popup-addtocart-text-" + pID).html("Add to Cart");
                    // if not sold out, then remove the attr disabled
                    $(".js__modal-popup-addtocart-" + pID).removeAttr("disabled");

                }
                // update the variant ID for the data-variant-id
                $(".js__modal-popup-addtocart-" + pID).attr("data-variant-id", vID);
                /* Not sure what are they being used for */
                // $(".discount_variant-" + pID + " span").hide();
                //$(".js__popup-variant-price-" + vID).show();
                //$(".js__rc_block__type__onetime-" + pID).find(".rc_price__onetime").html(price);
                //$(".modal-popup-price-subcription-" + pID).html($(".js__popup-variant-price-" + vID).html());

            }
        })


        /* Not being used any more */
        //$(".js__rc_radio_options-" + pID + " .rc_block__type-modal-popup.rc_block__type--active").click();
    })




    // $(document).on("change", ".js__shipping_interval_frequency", function (e) {
    //     var id = $(this).attr("data-id");

    //     if ($(this).val() != "") {

    //         $(".js__modal-popup-addtocart-" + id).addClass("hide");
    //         $(".js__modal-popup-addtocart-subcription-" + id).removeClass("hide");
    //         $(".js__modal-popup-addtocart-" + id).removeAttr("disabled");
    //         $(".js__modal-popup-addtocart-text-" + id).html("Add to Cart - ");
    //         $(".modal-popup-price-" + id).css("display", "inline-block")
    //     } else {

    //         $(".js__modal-popup-addtocart-" + id).removeClass("hide");
    //         $(".js__modal-popup-addtocart-subcription-" + id).addClass("hide");
    //         $(".js__modal-popup-addtocart-" + id).attr("disabled", "disabled");
    //         $(".js__modal-popup-addtocart-text-" + id).html("Select Frequency");
    //         $(".modal-popup-price-" + id).css("display", "none")

    //     }






    // })


    // $(document).on("click", ".js__rc_block__type__onetime-modal-popup", function (e) {
    //     var id = $(this).attr("data-id");
    //     $(".js__modal-popup-addtocart-" + id).removeClass("hide");
    //     $(".js__modal-popup-addtocart-subcription-" + id).addClass("hide");
    //     $(".js__modal-popup-addtocart-" + id).removeAttr("disabled");
    //     $(".js__modal-popup-addtocart-text-" + id).html("Add to Cart - ");
    //     $(".modal-popup-price-" + id).css("display", "inline-block")
    // })

    // $(document).on("click", ".js__rc_block__type__autodeliver-modal-popup", function (e) {
    //     var id = $(this).attr("data-id");


    //     $(".js__modal-popup-addtocart-" + id).attr("disabled", "disabled");
    //     $(".js__shipping_interval_frequency-" + id).change();
    // })


    $(document).on("click", ".js__modal-popup-addtocart", function(e) {
        var pID = $(this).attr("data-id");
        var selectedVariantID = $(this).attr("data-variant-id");
        var quantity = parseInt($(".js-quantity-selector-" + pID).val());
        var recharge = $(".js__rc_radio_options-" + pID).html()
        let items = [];
        if (recharge == undefined) {
            /* For the main item */
            items.push({
                id: selectedVariantID,
                quantity: quantity,
            });
        } else {
            if ($(".js__rc_radio_options-" + pID + " .rc_block__type-modal-popup.rc_block__type--active").hasClass("rc_block__type__onetime")) {

                items.push({
                    id: selectedVariantID,
                    quantity: quantity,
                });
            } else {
                var shippingIntervalFrequency = $(".js__shipping_interval_frequency-" + pID).val();
                var shippingIntervalUnitType = $(".js__shipping_interval_unit_type-" + pID).html();
                items.push({
                    id: selectedVariantID,
                    quantity: quantity,
                    "properties[shipping_interval_frequency]": shippingIntervalFrequency,
                    "properties[shipping_interval_unit_type]": shippingIntervalUnitType
                });

            }

        }



        CartJS.addItems(items, {
            success: function(response, textStatus, jqXHR) {
               

                $(".modal-quick-view").hide();
                if (getglobalLib("Mini_Cart") == "yes") {
                    /* Show message */
                    setTimeout(openMiniCart, 500);
                } else {
                    window.location = "/cart";
                }
            },
            // Define an error callback to display an error message.
            error: function(jqXHR, textStatus, errorThrown) {
                showCartErrorMessage();
            },
        });
    })

    $(document).on("click", ".js__card-add-to-cart", function(e) {
       
        var selectedVariantID = $(this).attr("data-variant-id");
        var quantity = 1;
       
        let items = [];
      
            /* For the main item */
            items.push({
                id: selectedVariantID,
                quantity: quantity,
            });
       



        CartJS.addItems(items, {
            success: function(response, textStatus, jqXHR) {
               

                $(".modal-quick-view").hide();
                if (getglobalLib("Mini_Cart") == "yes") {
                    /* Show message */
                    setTimeout(openMiniCart, 500);
                } else {
                    window.location = "/cart";
                }
            },
            // Define an error callback to display an error message.
            error: function(jqXHR, textStatus, errorThrown) {
                showCartErrorMessage();
            },
        });
    })
    




    $(document).on("click", ".js__popup-collection-slider-thumbnail .slide", function(e) {

        var slideno = parseInt($(this).index());


        e.preventDefault();
        e.stopPropagation();
        popupCollectionSlider.slideTo(slideno, 1000, false)

    });
    $(document).on("click", ".js__quick-view-popup-close", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(".modal-quick-view").hide();
    });


    var modal = document.getElementById('js__ingredients-popup');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

});


jQuery(document).ready(function($) {
    // MODAL TEMPLATE
    $('.modal-quick-view .pdp__variants input').on('click', function() {
        var varId = $(this).closest('label').attr('data-variant_id');
        //fire the closest variant selector
        $(this).closest('.modal').find('[sm-rc-variant-selector]').val(varId).change();
    });

    $('.modal-quick-view .pdp__recharge input').on('click', function() {
        var planId = $(this).closest('label').attr('data-plan_id');
        $(this).closest('.modal').find('[sm-rc-plan-selector]').val(planId).change();
    });
    $(document).on("click", ".modal-quick-view .pdp__recharge input", function() {
        $(this).parent("label").parent("div").parent(".pdp__recharge").children(".variant").removeClass("active");
        $(this).parent("label").parent("div").addClass("active");
        if ($(this).val() == 'rc-yes') {
            $(this).closest('.modal').find('.form__group--rc').show();
            var planId = $(this).closest('.pdp__recharge').find('.frequency-select').val();
            $(this).closest('.modal').find('[sm-rc-plan-selector]').val(planId).change();
        } else {
            $(this).closest('.modal').find('.form__group--rc').hide();
            $(this).closest('.modal').find('[sm-rc-plan-selector]').val('false').change();
        }
    });
    // RECHARE WIDGET SUBSCRIPTION PLAN
    $('.modal-quick-view .frequency-select').on('change', function() {
        var planId = $(this).val();
        $(this).closest('.modal').find('[sm-rc-plan-selector]').val(planId).change();
    });
});
jQuery(document).ready(function($) {
    $(".hero-banner-slider .content").addClass("animate");
});


$(document).ready(function($) {
    $(".js__btn-faq-search").on('click', function() {
        var search = $("#txt-faq-search").val().toLowerCase();
        if (search != "") {
            $(".js__no-data-found").removeClass("hide");
            $(".tab-link").removeClass("active");
            $(".dropdown-select").val("all");
            //Go through each list item and hide if not match search
            $(".js__faq-search-section").removeClass("hide");
            $(".js__faq-search-section").find(".tab-content").show();
            $(".js__faq-tab").addClass("hide");
            $(".js__faq-search li").each(function() {
                if ($(this).children("h3").html().toLowerCase().indexOf(search) != -1) {
                    $(this).show();
                    $(".js__no-data-found").addClass("hide");
                } else {
                    $(this).hide();
                }

            });
        }

    });


})

jQuery(document).ready(function($) {

    var cardSliders = new Swiper('.js_three-column-card-slider1', {
        slidesPerView: "auto",
        spaceBetween: 20,
        freeMode: true,
        watchSlidesProgress: true,
        // clickable: true,
        resistance: false,
        shortSwipes: false,
        loop: true,
        // grabCursor: false,
        // threshold: 1,
        speed: 4000,
        autoplay: {
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,

        },

        breakpoints: {
            0: {

                slidesPerView: 1,
                spaceBetween: 10,
            },
            376: {

                slidesPerView: 2,
                spaceBetween: 10,
            },

            377: {
                slidesPerView: "auto",

            },
        },
    });



});

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
