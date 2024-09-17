"use strict";

// tweaks these below variable if you want to show subtotal and discount
var showCartSubTotalDiscountSection = true;
var showEmptyCartIcon = false;
var showCartCountInTopNav = true;
var showProgressBar = true;
var showVendorOnCartPage = false; // Fixed variables

var lineItemComparePrice;
var cartObject;
var cartCountEmptyValue = "0";
var boxID = "BuilderID";
var cartExtraInfo; //extra classes for the elements

var removeExtraClass = "btn-border-black-animate"; // recharge 2020

var frequency = "";
var recurringchecked = false;
var frequency_unit = ""; //SVG icons

var removeMiniCartTextOrIcon = '<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.485 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" fill="#fff" stroke="#3B2900" stroke-width="1.326" stroke-linecap="round" stroke-linejoin="round"/>  <path d="m13.185 7.3-5.4 5.4M7.785 7.3l5.4 5.4" stroke="#3B2900" stroke-width="1.326" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var minusIcon = '<svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2006_22860)"><path d="M0.107422 3.78121H6.96365" stroke="#3B2900" stroke-width="1.34674" stroke-linecap="round" stroke-linejoin="round"/><defs><clipPath id="clip0_2006_22860"><rect width="6.85623" height="6.89921" fill="white" transform="translate(0.107422 0.332153)"/></clipPath></defs></svg>';
var plusIcon = '<svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_942_17768)"><path d="M3.53516 0.332153V7.23136" stroke="#3B2900" stroke-width="1.34674" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.107422 3.78121H6.96365" stroke="#3B2900" stroke-width="1.34674" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_942_17768"><rect width="6.85623" height="6.89921" fill="white" transform="translate(0.107422 0.332153)"/></clipPath></defs></svg>';
$(document).ready(function ($) {
  reloadAjaxCartItemUsingCartAjaxObject();
  progressBar();
  quickCartTotal(); //	window.location.href = "https://checkout.rechargeapps.com/r/checkout?myshopify_domain=XXX.myshopify.com";
  //window.location = '/checkout';
});
/*
EVENTS
1. Update quantity
2. remove item from cart
3. reload ajax cart
4. quickCartTotal
5. cart.requestComplete
*/
//QUANTITY UPDATE

function updateCartQuantity(cartThis) {
  var id = $(cartThis).attr("data-variant-id");
  var quantity = $("#updates_" + id).val();
  var type = $(cartThis).attr("date-type");
  var newQuantity = parseInt(quantity);

  if (type == "plus") {
    newQuantity = newQuantity + 1;
  } else {
    if (newQuantity > 0) {
      newQuantity = newQuantity - 1;
    }
  }

  var formData = {
    updates: {}
  };
  formData.updates[id] = newQuantity; // Perform the AJAX request to update the cart

  $.ajax({
    type: "POST",
    url: "/cart/update.js",
    data: formData,
    dataType: "json",
    success: function success(cart) {
      // Perform any additional tasks after removing items
      $("#updates_" + id).val(newQuantity);
      getCartData(cart);
    },
    error: function error(_error) {
      // Handle error if the request fails
      console.error("Error updating items from the cart:", _error);
    }
  });
}
/* If you need extra information like collection title, metafield etc then use this function */


function reloadAjaxCartItemUsingCartAjaxObject(data) {
  //   cartInfo(data);
  $.ajax({
    type: "GET",
    url: "/cart?view=alternate.json",
    success: function success(response) {
      //extra information against the cart like collection title metafield, product title metafield, tags
      cartExtraInfo = $.parseJSON(response);
      cartInfo(data);
    },
    error: function error(status) {
      console.warn("ERROR", status);
      cartInfo(data);
    }
  });
} //RELOAD AJAX CART


function cartInfo(data) {
  var lineCount = 1;
  var cartObject;

  if (data == undefined) {
    cartObject = CartJS.cart;
  } else {
    cartObject = data;
    quickCartTotal(data);
  }

  $(".js__ajax-products-bind").html("");
  $(".cart-list").html("");

  if (cartObject.items.length == 0) {
    $(".empty-cart-section").show();
    $(".js__show-cart-items-section").hide();
    $(".js__top-cart-form-actions").hide();
  } else {
    $(".js__top-cart-form-actions").show();
    $(cartObject.items).each(function () {
      var imageURL = this.featured_image.url; //imageURL = imageURL[0] + "." + imageURL[1] + '_450x450' + "." + imageURL[2];

      var imageAlt = this.featured_image.alt;
      var itemPrice = this.original_price;
      var itemLinePriceTotal = this.line_price;
      var handle = this.handle;
      var itemID = this.id;
      var itemPriceAfterDiscount = this.discounted_price;
      var comparePrice = "";
      var disabled = "";
      var finalLineItemPrice = this.final_line_price;
      var cartBundleBoxID = "";
      var boolPromoOffer = false;
      var productTitle = this.product_title;
      var url = this.url;
      var itemProperties = "";
      var itemPropertiesElement = "";
      var boolItemBoxType = false;
      var hideElementClass = "";
      var readonly = "";
      var justifyCenter = "";
      var sellingPlayInformation = "";

      if (this.selling_plan_allocation != undefined) {
        sellingPlayInformation = this.selling_plan_allocation.selling_plan.name;
      }

      if (this.properties != null) {
        itemProperties = this.properties;

        if (Object.keys(itemProperties).length > 0) {
          $.each(itemProperties, function (key, value) {
            /* If box ID exists, then remove quantity + -  working */
            if (key == boxID) {
              cartBundleBoxID = value;
            }

            if (key == "_ProductUrl") {
              url = value;
            }

            if (key == "_promoOffer") {
              boolPromoOffer = true;
            }
          });
          /* Checking the Box ID for the builder */

          itemPropertiesElement = "<ul>";
          $.each(itemProperties, function (key, value) {
            /* If box ID exists, then remove quantity + -  working */
            if (key == boxID || key == "_FreeGift") {
              hideElementClass = "hide";
              readonly = "readonly='readonly'";
              boolItemBoxType = true;
              justifyCenter = "justify-center ";
              url = "javascript:;";
            }

            if (key.indexOf("_") > -1) {} else {
              if (key != boxID) {
                itemPropertiesElement += "<li class='flex'><span>" + key + ": </span><span style='padding-left: 5px'>" + value + "</span>";
                itemPropertiesElement += "</li>";
              } else {
                itemPropertiesElement += "<li class='flex'><span>" + key + ": </span><span style='padding-left: 5px'>" + value + "</span>";
                itemPropertiesElement += "</li>";
              }
            } // Recharge - when subscription is via properties for older recharge version before November 2020


            recharge2020(key, value);
          }); // Recharge 2020, check if it's a subscription, then bind the value in the UL

          if (recurringchecked) {
            itemPropertiesElement += "<li class='flex'><span>Recurring Delivery every " + frequency + " " + frequency_unit + ". Change or cancel anytime</span>";
            itemPropertiesElement += "</li>";
          }

          itemPropertiesElement += "</ul>";
        } else {//itemPropertiesElement = "";
        }
      }

      var rechargeSelected = this.selling_plan_allocation;
      var rechargeDropdown = "";
      /* Loop through cartExtraInformation section */

      $(cartExtraInfo.items).each(function (key, value) {
        if (value.id == itemID) {
          if (value.comparePrice != null) {
            comparePrice = value.comparePrice;
          }

          var Quantity = value.quantity;

          if (value.product_recharge == "True") {
            if (rechargeSelected == undefined) {
              rechargeDropdown = "<select id='planID" + lineCount + "' data-qty=" + Quantity + " class='" + hideElementClass + " custom-dropdown-select js__cart-plan'><option value=" + value.product_rechargeID + ">" + value.product_rechargeName + "</option><option value='One Time Purchase' selected>One Time Purchase</option></select>";
            } else {
              rechargeDropdown = "<select id='planID" + lineCount + "' data-qty=" + this.quantity + " class='" + hideElementClass + " custom-dropdown-select js__cart-plan'><option value=" + value.product_rechargeID + " selected>" + value.product_rechargeName + "</option><option value='One Time Purchase'>One Time Purchase</option></select>";
            }
          }

          productTitle = "<h5> <a href='" + url + "' id='product-card-" + this.id + "' tabindex='0'>" + value.product_title.split("with")[0] + " </a></h5>";
        }
      });
      /* get compare price using cartLib object */
      // if (typeof cartLib !== "undefined") {
      //           $.each(cartLib, function(key, value) {
      //               //console.log(value);
      //               if (value["id"] == itemID) {
      //                   comparePrice = value["comparePrice"];
      //               }
      //           });
      //       }

      /* FORMATTED PRICING */

      var formattedcomparePrice = formatter.format(comparePrice / 100);
      var comparePriceHtml = "";

      if (comparePrice > parseFloat(itemPrice)) {
        comparePriceHtml = "<s>" + formattedcomparePrice + "</s>";
      } // total compared price for the item with quantity


      var totalListItemComparePrice = formatter.format(comparePrice * this.quantity / 100); // item original price

      var formattedItemPrice = formatter.format(itemPrice / 100); // line price

      var formattedItemLinePriceTotal = formatter.format(itemLinePriceTotal / 100); //final line item price

      var formattedFinalLineItemPrice = formatter.format(finalLineItemPrice / 100); //Price after discount

      var showPrice = "";
      var itemPriceAfterDiscountStatus = false;
      var discountedMessage = "";
      var discountedMessageElement = "";

      if (this.discounts != null) {
        discountedMessage = this.discounts;

        if (Object.keys(discountedMessage).length > 0) {
          //console.log("DISCOUNT EXISTS");
          discountedMessageElement = "<span class='discountedMessage'>";
          $.each(discountedMessage, function (key, value) {
            discountedMessageElement += value.title;
          });
          discountedMessageElement += "</span>";
        }
      }

      var formattedItemPriceAfterDiscount = formatter.format(itemPriceAfterDiscount / 100); // if itemPriceAfterDiscount > 0 then set the status to true so you can interchange the values

      if (this.discounts.length > 0) {
        itemPriceAfterDiscountStatus = true;
      } // if it's true; then show the compared price as the main price this.price and main price as discounted price


      if (itemPriceAfterDiscountStatus) {
        //comparePriceHtml
        showPrice = '<span class="price-wrapper js__raw-line-item-price"  data-attr-compare-price="0"><s>' + formattedItemPrice + '</s><span class="price" data-key="' + itemID + '">' + formattedItemPriceAfterDiscount + "</span><span class='forMiniCart'>" + formattedFinalLineItemPrice + "</span></span>" + discountedMessageElement;
      } else {
        showPrice = '<span class="price-wrapper js__raw-line-item-price"  data-attr-compare-price="0">' + comparePriceHtml + '<span class="price" data-key="' + itemID + '">' + formattedItemPrice + "</span><span class='forMiniCart'>" + formattedFinalLineItemPrice + "</span></span>";
      }
      /* check if variantTitle is NULL, then don't show variant */


      var variantTitle = this.variant_title;

      if (variantTitle == null) {
        variantTitle = "";
      }

      var variantData = "";
      $.each(this.options_with_values, function (key, value) {
        //console.log("key" + key);console.log("value" + value["name"]);console.log("value" + value["value"]);
        variantData += "<li><span>" + value["name"] + ": " + value["value"].split("with")[0] + "</span></li>";
      });
      /* CUSTOM - if the product title contains "bag",  then disabled the quantity element
          To be applied for all the products with BoxID and Promo Offer
          */

      if (this.product_title.toLowerCase().indexOf("bag") >= 0 && cartBundleBoxID != "" || this.product_title.toLowerCase().indexOf("bag") >= 0 && boolPromoOffer) {
        //if you want to hide the quantity + - then enable the class below
        // hideElementClass="hide"
        justifyCenter = "justify-center ";
        readonly = "readonly='readonly'";
        disabled = "disabled ";
      }
      /* 
      LINE ITEM FOR THE MINI CART
      */
      // remove anchor


      var removeAnchorElement = '<div class="remove js__cart-item-remove ' + removeExtraClass + '" data-cart-line-count="' + lineCount + '" data-variant-id="' + itemID + '"  data-cart-remove-variant="' + this.id + '">' + removeMiniCartTextOrIcon + '</div>'; //quantity element

      var quantityElement = '<div class="cart-quantity-outer ' + disabled + justifyCenter + '"> <a  tabindex="0"  class="minus-qty ' + hideElementClass + '  font-zero" date-type="minus" onclick="updateCartQuantity(this)"   data-variant-id="' + itemID + '">' + minusIcon + '</a> <input aria-label="Quantity"  tabindex="-1"  data-limit="' + boolItemBoxType + '"  ' + readonly + '   onkeydown="return isNumeric(event);" type="text"  data-attr-raw-variant-quantity="94" data-cart-line-count="' + lineCount + '" class="cart__quantity-selector js__cart__quantity-selector" name="updates[]" id="updates_' + itemID + '" value="' + this.quantity + '" maxlength="3" size="3"> <a  tabindex="0"  class="plus-qty ' + hideElementClass + '  font-zero" date-type="plus" onclick="updateCartQuantity(this)"     data-variant-id="' + itemID + '">' + plusIcon + "</a> </div>"; //vendor element

      var vendorElement = '<span class="subheading uppercase">' + this.vendor + "</span>";
      var lineItem;
      lineItem = '<li class="flex-wrap js__cart-table-item-row" data-cart-line-count=' + lineCount + ' data-handle="' + handle + '" data-variant-id=' + itemID + '><div class="image-section"> <a href="' + url + '"><img alt="' + imageAlt + '" src="' + imageURL + '""> </a> </div>';
      lineItem += '<div class="content"><div class="title-section">' + productTitle + removeAnchorElement + "";

      if (sellingPlayInformation != "") {
        lineItem += '<p class="capitalize">' + sellingPlayInformation + "</p>";
      }

      if (itemPropertiesElement != "") {
        lineItem += '<p class="capitalize">' + itemPropertiesElement + "</p>";
      }

      if (variantTitle != "") {
        lineItem += "<ul>" + variantData + "</ul>";
      }

      lineItem += showPrice + '</div><div class="flex-space-between"><p class="hide">Qty ' + this.quantity + "</p>" + quantityElement;
      lineItem += "<span class='price'>" + formattedItemPriceAfterDiscount + comparePriceHtml + "</span></div>" + rechargeDropdown + "</div>";
      lineItem += "</li>";
      /* Bind the line item to the list */

      $(".js__ajax-products-bind").append(lineItem);
      /*******LINE ITEM FOR THE CART PAGE********/

      if ($(".cart-list")[0]) {
        var cartLineItem = "";
        cartLineItem = '<div class="cart-list__items cart-table-body js__cart-table-item-row flex" data-cart-line-count="' + lineCount + '" data-attr-compare-price="" data-variant-id="' + itemID + '"><div class="cart-list__items__columns"><div class="image-section "><img class="img-responsive img-thumbnail item-image" src="' + imageURL + '" alt="' + imageAlt + '"></div> <div class="content">'; // show vendor on cart page

        if (showVendorOnCartPage) {
          cartLineItem += vendorElement;
        }

        cartLineItem += productTitle;
        cartLineItem += '<div class="cart-list__variant-properties">';

        if (sellingPlayInformation != "") {
          cartLineItem += '<span class="capitalize">' + sellingPlayInformation + "</span>";
        }

        if (itemPropertiesElement != "") {
          cartLineItem += '<span class="capitalize">' + itemPropertiesElement + "</span>";
        }

        if (variantTitle != "") {
          cartLineItem += "<ul>" + variantData + "</ul>";
        }

        cartLineItem += "</div>";
        cartLineItem += '  </div>  </div>  <div class="cart-list__items__columns">';
        cartLineItem += showPrice;
        cartLineItem += "</div>";
        cartLineItem += '<div class="cart-list__items__columns quantity" data-variant-id="' + itemID + '"> ' + quantityElement + '  <span class="js__out-of-stock"></span>'; // ** Remove action is added here too

        cartLineItem += "</div>"; // cartLineItem += "</div><div class='cart-list__items__columns recharge ' > " + rechargeDropdown + " </div>";

        cartLineItem += '<a class="remove" data-cart-line-count="' + lineCount + '" data-variant-id="' + itemID + '" href="javascript:;"></a><div class="cart-list__items__columns total-price " data-head="Total"> <span class="price-wrapper js__set-line-item-price" data-attr-price="' + itemPrice + '" data-attr-compare-price=' + totalListItemComparePrice + '><s class="hide">' + totalListItemComparePrice + '</s><span class="price" data-key="' + itemID + '">' + formattedItemLinePriceTotal + "</span> </span>"; // ** Remove element is added here too

        cartCountEmptyValue += ' </div></div>';
        $(".cart-list").append(cartLineItem);
      }

      lineCount++;
    });
  }
} //CALCULATE TOTAL OF THE CART


function quickCartTotal(data) {
  if (data == undefined) {
    cartObject = CartJS.cart;
  } else {
    cartObject = data;
  }

  var total = cartObject.items_subtotal_price;
  total = total / 100;
  total = formatter.format(total);
  $(".js__cart-total").html(total);
  $(".js__ajax-cart-total").html("" + total);
  $(".js__ajax-cart-total").show();
  $(".js__ajax-cart-count").html(cartObject.item_count);
  $(".js__top-cart-form-actions").show();
  $(".js__cart-expand ").removeClass("empty-cart");
}
/* REMOVE */


var savedItemPropertyBoxID = "";
$(document).on("click", ".remove", function () {
  var variantID = parseInt($(this).attr("data-variant-id"));
  var clickedLineItemCount = parseInt($(this).attr("data-cart-line-count"));
  var currentLoopItemCount = 1; // console.log(variantID);

  var boxID = "BuilderID";
  var itemsToRemove = [];
  var formData = {
    updates: {}
  };
  $.getJSON("/cart.js", function (cart) {
    var savedItemPropertyBoxID = ""; // console.log(cart.items.length);
    // Find the item with the matching variantID and save its BoxID property

    for (var i = 0; i < cart.items.length; i++) {
      if (clickedLineItemCount === currentLoopItemCount) {
        var currentItem = cart.items[i];

        if (currentItem.variant_id === variantID) {
          // console.log(currentItem);
          // console.log(currentItem.variant_id);
          // console.log("variant ID matches");
          // console.log(currentItem.properties);
          // console.log(currentItem.properties[boxID]);
          if (currentItem.properties && currentItem.properties[boxID]) {
            savedItemPropertyBoxID = currentItem.properties[boxID]; // console.log("Saved Item Property Box ID:", savedItemPropertyBoxID);

            break;
          } else {
            // it doesn't has the BoxID, then delete the particular LineItem
            // console.log("Current Line Item - With no BoxID")
            itemsToRemove.push(currentItem.variant_id);
          }
        }
      }

      currentLoopItemCount = currentLoopItemCount + 1;
    } // Loop through cart items to find items with matching BoxID


    for (var j = 0; j < cart.items.length; j++) {
      var currentItem = cart.items[j];

      if (currentItem.properties && currentItem.properties[boxID] === savedItemPropertyBoxID) {
        itemsToRemove.push(currentItem.variant_id); //console.log("Item Variant ID to Remove:", currentItem.variant_id);
      }
    } // console.log(itemsToRemove);
    // console.log(itemsToRemove.length);
    // Call the function to remove items from the cart


    removeItemsFromCart(itemsToRemove); // Remove items from the cart
  });
});
$(document).on("change", ".js__cart-plan", function () {
  var lineCount = $(this).attr("id").replace('planID', "");
  var lineQuantity = $(this).attr("data-qty");
  var rechargeValue = $(this).val();

  if (rechargeValue == "One Time Purchase") {
    CartJS.updateItem(lineCount, lineQuantity, {
      selling_plan: ""
    }, {
      success: function success(data, textStatus, jqXHR) {},
      error: function error(jqXHR, textStatus, errorThrown) {}
    });
  } else {
    CartJS.updateItem(lineCount, lineQuantity, {
      selling_plan: parseInt(rechargeValue)
    }, {
      success: function success(data, textStatus, jqXHR) {},
      error: function error(jqXHR, textStatus, errorThrown) {}
    });
  } // rechargeDropdown = "<select id='planID" + lineCount + "' data-qty=" + this.quantity + " class='custom-dropdown-select js__cart-plan'><option value=" + value.product_rechargeID + " selected>" + value.product_rechargeName + "</option><option value='One Time Purchase'>One Time Purchase</option></select>";

}); // Function to remove items from the cart

function removeItemsFromCart(itemsToRemove) {
  var formData = {
    updates: {}
  }; // Populate the formData with variant IDs to remove

  for (var k = 0; k < itemsToRemove.length; k++) {
    var variantID = itemsToRemove[k];
    formData.updates[variantID] = 0;
  }

  $.ajax({
    type: "POST",
    url: "/cart/update.js",
    data: formData,
    dataType: "json",
    success: function success(cart) {
      getCartData(cart);
    },
    error: function error(_error2) {
      // Handle error if the request fails
      console.error("Error removing items from the cart:", _error2);
    }
  });
}

function getCartData() {
  $.getJSON("/cart.js", function (cart) {
    cartInfo(cart);
    progressBar();
    setTimeout(function () {
      addons();
    }, 1000);
  });
}
/*
PROGRESS BAR
*/


function progressBar() {
  var totalAmount = 0;
  var shippingGrandTotal = 0;

  if (showProgressBar) {
    fetch("/cart.js", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      totalAmount = data.total_price / 100;
      var freeShippingAmount = parseFloat($(".js__free-shipping-limit").html());
      $(".js__free-shipping__icon").removeClass("active");
      $(".js__free-gift-1__icon").removeClass("active");
      $(".js__free-gift-2__icon").removeClass("active");
      $(".js__gift-products").addClass("hide");
      $(".js__gift-products-1").addClass("hide");
      $(".js__gift-products-2").addClass("hide");
      shippingGrandTotal = freeShippingAmount;
      var freeShippingRemaningAmount = freeShippingAmount - totalAmount;
      var freeShippingPercentage = 100;

      if (freeShippingRemaningAmount > 0) {
        freeShippingPercentage = totalAmount * 100 / freeShippingAmount;
        $(".js__free-shipping-limit-message").show();
        $(".js__free-shipping-message").hide();
        $(".js__free-shipping").hide();
        $(".js__CartShipping").addClass("hide");
      } else {
        $(".js__CartShipping").removeClass("hide");
        $(".js__free-shipping-limit-message").hide();
        $(".js__free-shipping-message").show();
        $(".js__free-shipping").show();
      }

      $(".js__free-shipping-remaning-amount").html(formatter.format(freeShippingRemaningAmount));
      $(".js__free-shipping__progress-bar").attr("data-percentage", freeShippingPercentage);
      var boolAddProduct = true;
      var boolFreeGIft1 = true;
      var boolFreeGIft2 = true;
      var count = cartObject.items.length;
      var itemCount = 0;
      $(".js__gift-products").addClass("hide");
      $(cartObject.items).each(function () {
        if (this.properties != null) {
          var itemProperties = this.properties;

          if (Object.keys(itemProperties).length > 0) {
            $.each(itemProperties, function (key, value) {
              /* If box ID exists, then remove quantity + -  working */
              if (key == "_FreeGift") {
                if (value == 1 || value == "1") {
                  boolFreeGIft1 = false;
                }

                if (value == 2 || value == "2") {
                  boolFreeGIft2 = false;
                }
              }
            });
            /* Checking the Box ID for the builder */
          } else {//itemPropertiesElement = "";
            }
        }

        itemCount++;

        if (parseInt(count) == itemCount) {
          if (boolFreeGIft1 == false) {
            $(".js__gift-products-1").addClass("hide");
          }

          if (boolFreeGIft2 == false) {
            $(".js__gift-products-2").addClass("hide");
          }

          if (boolFreeGIft1 == false && boolFreeGIft2 == false) {
            $(".js__gift-products").addClass("hide");
          }
        }
      });
      $(".js__free-shipping__progress-bar").children("span").css("width", freeShippingPercentage + "%");
      var gifrProduct1 = $(".js__free-gift-product-1").attr("data-attr-variantid");
      var gifrProduct2 = $(".js__free-gift-product-2").attr("data-attr-variantid");
      /*Free gift 1 */

      if (freeShippingPercentage == 100) {
        $(".js__free-shipping__icon").addClass("active");

        if ($(".js__free-gift-1").html() != "") {
          var freeGift1Amount = parseFloat($(".js__free-gift-1").html());
          var freeGift1RemaningAmount = freeGift1Amount - totalAmount;
          var freeGift1Percentage = 100;

          if (freeGift1RemaningAmount > 0) {
            freeGift1Percentage = totalAmount * 100 / freeGift1Amount;
          }

          $(".js__free__gift-1__progress-bar").attr("data-percentage", freeGift1Percentage);
          $(".js__free__gift-1__progress-bar").children("span").css("width", freeGift1Percentage + "%");
          /*Free gift 2 */

          if (freeGift1Percentage == 100) {
            // addFreeGift(gifrProduct1, 1);
            if (boolFreeGIft1 == true) {
              $(".js__gift-products").removeClass("hide");
              $(".js__gift-products-1").removeClass("hide");
            }

            $(".js__free-gift-1__icon").addClass("active");

            if ($(".js__free-gift-2").html() != "") {
              var freeGift2Amount = parseFloat($(".js__free-gift-2").html());
              shippingGrandTotal = freeShippingAmount + freeGift1Amount + freeGift2Amount;
              var freeGift2RemaningAmount = freeGift2Amount - totalAmount;
              var freeGift2Percentage = 100;

              if (freeGift2RemaningAmount > 0) {
                freeGift2Percentage = totalAmount * 100 / freeGift2Amount;
              }

              $(".js__free__gift-2__progress-bar").attr("data-percentage", freeGift2Percentage);
              $(".js__free__gift-2__progress-bar").children("span").css("width", freeGift2Percentage + "%");

              if (freeGift2Percentage == 100) {
                //  addFreeGift(gifrProduct2, 2);
                if (boolFreeGIft2 == true) {
                  $(".js__gift-products").removeClass("hide");
                  $(".js__gift-products-2").removeClass("hide");
                }

                $(".js__free-gift-2__icon").addClass("active");
              } else {
                if (boolFreeGIft2 == false) {
                  removeFreeGift(gifrProduct2);
                }
              }
            }
          } else {
            if (boolFreeGIft1 == false) {
              removeFreeGift(gifrProduct1);
            }
          }
        }
      }

      if ($(".js__free-gift-1").html() != "") {
        shippingGrandTotal = parseFloat($(".js__free-gift-1").html());
      }

      if ($(".js__free-gift-2").html() != "") {
        shippingGrandTotal = parseFloat($(".js__free-gift-2").html());
      }

      var shippingGrandRemaningAmount = shippingGrandTotal - totalAmount;
      var shippingGrandPercentage = 100;

      if (shippingGrandRemaningAmount > 0) {
        shippingGrandPercentage = totalAmount * 100 / shippingGrandTotal;
      }

      $(".js__grandtotal-shipping").attr("data-percentage", shippingGrandPercentage);
      $(".js__grandtotal-shipping").css("width", shippingGrandPercentage + "%");
    });
  }
}

function removeFreeGift(variantID) {
  fetch("/cart.js", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    $(cartObject.items).each(function () {
      var itemID = this.id;

      if (itemID == variantID) {
        var formData = {
          updates: {}
        };
        formData.updates[variantID] = 0;
        $.ajax({
          type: "POST",
          url: "/cart/update.js",
          data: formData,
          dataType: "json",
          success: function success(cart) {
            getCartData(cart);
          },
          error: function error(_error3) {
            // Handle error if the request fails
            console.error("Error removing items from the cart:", _error3);
          }
        });
      }
    });
  });
}

$(document).ready(function ($) {
  $(document).on("click", ".js__freegift-add-to-cart", function (e) {
    $(this).addClass("clicked");
    var giftNumber = $(this).attr("data-gift-number");
    var variantID = $(this).attr("data-attr-variantid");
    addFreeGift(variantID, giftNumber);
  });
});

function addFreeGift(variantID, giftnumber) {
  var selectedVariantID = variantID;
  var quantity = 1;
  var items = [];
  items.push({
    id: selectedVariantID,
    quantity: quantity,
    "properties[_FreeGift]": giftnumber
  });
  CartJS.addItems(items, {
    success: function success(response, textStatus, jqXHR) {
      getCartData();
      $(".js__gift-" + selectedVariantID).addClass("hide");
      $(".js__gift-" + selectedVariantID).find(".js__freegift-add-to-cart").removeClass("clicked");
    },
    // Define an error callback to display an error message.
    error: function error(jqXHR, textStatus, errorThrown) {
      showCartErrorMessage();
    }
  });
}

$(document).ready(function ($) {
  $(".js__addon-add-to-cart").click(function () {
    var quantity = 1;
    var addonSelectedVariantID = $(this).attr("data-attr-variantid");
    cartAddItemAddon(addonSelectedVariantID, quantity);
  });
  $(".js__addon-add-to-cart").keypress(function () {
    var keycode = event.keyCode || event.which;

    if (keycode == "13") {
      event.preventDefault();
      var quantity = 1;
      var addonSelectedVariantID = $(this).attr("data-attr-variantid");
      cartAddItemAddon(addonSelectedVariantID, quantity);
    }
  });
});
/*
ADDONS
NOTE:: CONFUSING CODE FOR THE ADDONS - WILL NEED TO CLEAN IT A BIT
1. Try to get all the addon handles for the items which are in the cart
2. Create an array for item>addon
3. Loop through all the cart items and addon
4. CHECK - if addon is already there in the list, then the same 2nd addon should not be visible
*/

function cartAddItemAddon(addonSelectedVariantID, addonQuantity) {
  CartJS.addItem(addonSelectedVariantID, addonQuantity, {}, {
    success: function success(data, textStatus, jqXHR) {//console.log("success");

      /* Pending - Remove the selected addon when add to cart is clicked */
    },
    error: function error(jqXHR, textStatus, errorThrown) {//console.log("error");
    }
  });
}

function addons() {
  //console.log("addons");

  /*Hide repeating addons*/
  var cartAddons = "";
  $(".js__top-cart-addons li").each(function (index) {
    // update this with variantID
    var addoneHandle = $(this).attr("data-handler"); // if cartAddon is null,

    if (cartAddons == "") {
      // save the addonHandle
      cartAddons = addoneHandle;
    } else {
      //set bool value to see if the addons is present in the addon list or not
      // by default it's false
      var boolCartAddons = false; // going through the string and checking if the current addon handle = the addon
      //handle present in the string

      var cartAddons2 = cartAddons.split(",");

      for (var a = 0; a < cartAddons2.length; a++) {
        if ($(this).attr("data-handler") == cartAddons2[a]) {
          // if present, then hide it
          $(this).hide();
          boolCartAddons = true;
        }
      } // add the new addon handle to the string


      if (boolCartAddons == false) {
        cartAddons = cartAddons + "," + addoneHandle;
      }
    }
    /* Hide the addons from the addon list, if the addon is present in the cart */


    var boolItemCartAddon = false;
    $(".js__ajax-products-bind li").each(function (index) {
      var itemHandle = $(this).attr("data-handle");

      if (addoneHandle == itemHandle) {
        boolItemCartAddon = true;
      }
    });

    if (boolItemCartAddon == true) {
      $(this).hide();
    } else {
      $(this).show();
    }
  });
  /* Hide the complete section if there are no addons */

  var boolAddonExist = false;
  $(".js__top-cart-addons li").each(function (index) {
    if ($(this).css("display") != "none") {
      boolAddonExist = true;
    }
  }); //console.log("boolAddonExist"+boolAddonExist);

  if (boolAddonExist == false) {
    //console.log("if");
    $(".js__freq-bought-products").hide();
  } else {
    //console.log("else");
    $(".js__freq-bought-products").show();
  }
} //Addons are fetched from the schemas; Varies from theme to theme


setTimeout(function () {
  addons();
}, 1000);

function recharge2020(key, value) {
  if (key == "shipping_interval_frequency") {
    frequency = value;
    recurringchecked = "true";
  }

  if (key == "shipping_interval_unit_type") {
    if (frequency == "1") {
      if (value == "Days") {
        frequency_unit = "Day";
      } else if (value == "Months") {
        frequency_unit = "Month";
      } else if (value == "Weeks") {
        frequency_unit = "Week";
      }
    } else {
      frequency_unit = value;
    }
  }
}
/*cart numeric type*/
// $(".js__cart__quantity-selector").keypress(function (event) {
//     var keycode = event.keyCode || event.which;
//     if (keycode == "13") {
//         event.preventDefault();
//         if ($(this).val() == "0") {
//             $(this).val("1");
//         }
//         var lineCount = $(this).attr("data-cart-line-count");
//         updateQuantity(lineCount);
//         return false;
//     }
// });
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

jQuery(function () {
  var _Swiper, _Swiper2, _Swiper3;

  if (navigator.userAgent.indexOf('Mac') > 0) {
    $('body').addClass('mac-os');
  }

  $(window).scroll(function () {
    // var targetScroll = $('.product__actions').position().top;
    var targetScroll = $('.product__actions').offset().top - $('.product__actions').outerHeight() + 20;

    if ($(window).scrollTop() > targetScroll) {
      $(".top-banner").addClass("active");
    } else {
      $(".top-banner").removeClass("active");
    }
  });
  var productSectionSlider = new Swiper(".js__product-slider", {
    slidesPerView: 3,
    spaceBetween: 39,
    // centeredSlides: true,
    // resistance: false,
    threshold: 5,
    // loop:true,
    resistance: false,
    shortSwipes: true,
    longSwipes: false,
    // scrollOverflowOptions: null,
    // loopedSlidesLimit: false,
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      769: {
        slidesPerView: 2
      },
      1025: {
        slidesPerView: 3
      }
    },
    navigation: {
      nextEl: ".swiper-button-next-product-slider",
      prevEl: ".swiper-button-prev-product-slider"
    }
  }); //RElated Article slider

  var productSectionSlider = new Swiper(".js__article-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    // centeredSlides: true,
    // resistance: false,
    threshold: 5,
    loop: true,
    resistance: false,
    shortSwipes: true,
    longSwipes: false,
    // scrollOverflowOptions: null,
    // loopedSlidesLimit: false,
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      601: {
        slidesPerView: 2
      },
      1025: {
        slidesPerView: 3
      }
    },
    navigation: {
      nextEl: ".swiper-button-next-article-section",
      prevEl: ".swiper-button-prev-article-section"
    }
  });
  var reviewSectionSlider = new Swiper(".js__review-slider", {
    slidesPerView: 2,
    spaceBetween: 14,
    // centeredSlides: true,
    // resistance: false,
    loop: true,
    resistance: false,
    shortSwipes: true,
    longSwipes: false,
    // scrollOverflowOptions: null,
    // loopedSlidesLimit: false,
    navigation: {
      nextEl: ".swiper-button-next-review-slider",
      prevEl: ".swiper-button-prev-review-slider"
    },
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      376: {
        slidesPerView: 1
      },
      481: {
        slidesPerView: 1
      },
      769: {
        slidesPerView: 2
      },
      980: {
        slidesPerView: 1
      },
      1100: {
        slidesPerView: 1
      },
      1440: {
        slidesPerView: 2,
        spaceBetween: 14
      }
    }
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

  var logoSlider = new Swiper('.js_logo-slider', (_Swiper = {
    slidesPerView: "auto",
    spaceBetween: 148,
    freeMode: true,
    watchSlidesProgress: true,
    clickable: true,
    resistance: false,
    shortSwipes: false,
    loop: true,
    grabCursor: false
  }, _defineProperty(_Swiper, "slidesPerView", 5), _defineProperty(_Swiper, "breakpoints", {
    0: {
      slidesPerView: 2
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
  }), _Swiper)); //    embed slider

  var halfcontentSlider = new Swiper(".js_half-content-half-image-slider", {
    slidesPerView: 1,
    resistance: false,
    threshold: 5,
    loop: true,
    spaceBetween: 30,
    // autoplay: {
    //     delay: 10000,
    // },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next-content-slider",
      prevEl: ".swiper-button-prev-content-slider"
    }
  });
  var blogSlider = new Swiper(".js__blog-slider", (_Swiper2 = {
    slidesPerView: "auto",
    spaceBetween: 20,
    threshold: 1,
    loop: true
  }, _defineProperty(_Swiper2, "threshold", 5), _defineProperty(_Swiper2, "breakpoints", {
    1920: {
      slidesPerView: "auto"
    }
  }), _defineProperty(_Swiper2, "navigation", {
    nextEl: ".swiper-button-next-blog-slider",
    prevEl: ".swiper-button-prev-blog-slider "
  }), _Swiper2));
  var productSlider = new Swiper(".js__small-product-slider", (_Swiper3 = {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    threshold: 5
  }, _defineProperty(_Swiper3, "threshold", 1), _defineProperty(_Swiper3, "breakpoints", {
    '1025': {
      slidesPerView: 3,
      spaceBetween: 25
    },
    '981': {
      slidesPerView: 2,
      spaceBetween: 25
    },
    '480': {
      slidesPerView: 3,
      spaceBetween: 25
    },
    '0': {
      slidesPerView: 2,
      spaceBetween: 25
    }
  }), _defineProperty(_Swiper3, "navigation", {
    nextEl: ".swiper-button-next-small-product-slider",
    prevEl: ".swiper-button-prev-small-product-slider "
  }), _Swiper3));

  if (window.location.href.indexOf("article&") > -1) {
    $(".search-item").val("article");
    $(".js__search-blog").addClass("active");
  } else {
    $(".search-item").val("product");
    $(".js__search-product").addClass("active");
  }

  $(".js__search-type a").on("click", function () {
    if ($(this).html().trim() == "Blog") {
      $(".search-item").val("article");
      $(".js__search-submit").click();
    } else {
      $(".search-item").val("product");
      $(".js__search-submit").click();
    }
  });
  /* Collection selected*/

  $(document).ready(function ($) {
    $(".js__collections-select").change(function () {
      window.location = $(this).val();
    });
    /*Dropdown selected*/

    $(".js__collection-content li").each(function (index) {
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
  } catch (_unused) {}
  /* PDP
  Tab working */


  $(".tab-link").on("click", function () {
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
  $(document).on("click", ".pdp-tab-link", function (e) {
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

  $(".js__accordian").children("li").children("h2,h4,h5,h3").click(function (e) {
    if ($(this).parent("li").children(".content").css("display") == "none") {
      $(this).parent("li").parent(".js__accordian").children("li").children(".content").hide();
      $(this).parent("li").parent(".js__accordian").children("li").removeClass("active");
      $(this).parent("li").children(".content").slideDown();
      $(this).parent("li").addClass("active");
    } else {
      $(this).parent("li").children(".content").slideUp();
      $(this).parent("li").removeClass("active");
    }
  });
  /* Accordion working when we have multiple content*/

  $(".js__accordians").children("li").attr("aria-expanded", false);
  $(".js__accordians").children("li").children("h5,h6,h3,h4").attr("role", "button");
  $(".js__accordians").children("li").children("h5,h6,h3,h4").attr("tabindex", "0");
  $(".js__accordians").children("li").children("h5,h6,h3,h4").click(function (e) {
    var type = $(this).parent("li").attr("data-attr");

    if ($("." + type).css("display") == "none") {
      $(this).attr("aria-expanded", true);
      $(this).parent("li").parent(".js__accordians").children(".content").hide();
      $(this).parent("li").parent(".js__accordians").children("li").removeClass("active");
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
  $(".js__accordians").children("li").children("h5,h6,h3,h4").keypress(function (e) {
    if (e.which == 13) {
      var type = $(this).parent("li").attr("data-attr");

      if ($("." + type).css("display") == "none") {
        $(this).attr("aria-expanded", true);
        $(this).parent("li").parent(".js__accordians").children(".content").hide();
        $(this).parent("li").parent(".js__accordians").children("li").removeClass("active");
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

jQuery(function ($) {
  /*FAQ Drop down*/
  $(".drop-down-outer select option").each(function () {
    if (this.value === path) {
      this.setAttribute("selected", true);
    }
  });
  $(".js__faq-dropdown").change(function () {
    var sectionID = this.value;
    var target = $(sectionID);
    $("html, body").animate({
      scrollTop: target.offset().top - 200
    }, 500);
  });
  $(".js__cate-accordian .togglebtn h3").on("click", function () {
    if ($(".js__cate-accordian").children(".rem").css("display") == "none") {
      $(".rem").slideDown(300);
      $(this).parent(".togglebtn").toggleClass("active");
    } else {
      $(".rem").slideUp(300);
      $(".togglebtn").removeClass("active");
    }
  });
  $(".js__dropdown_result").on("click", function () {
    if ($(".js__dropdown").css("display") == "none") {
      $(".js__dropdown").slideDown(300);
    } else {
      $(".js__dropdown").slideUp(300);
    }

    $(this).toggleClass("active");
  });
  var path = window.location.href; // because the 'href' property of the DOM element is the absolute path

  $(".js__dropdown li a").each(function () {
    if (this.href === path) {
      $(this).addClass("active");

      if ($(this).html() != "view all") {
        $(".js__dropdown_result").html($(this).html());
      }

      $(".js__dropdown").slideUp(300);
      $(".js__dropdown_result").removeClass("active");
    }
  });
  $(".js__active-class li a").each(function () {
    if (this.href === path) {
      $(".js__active-class li a").removeClass("active");
      $(this).addClass("active");
    }
  });
});
/* Mini cart - Checkout Button visiblity fix for IOS Mobile */

var lastScroll = 0;
jQuery(document).ready(function ($) {
  $(".cart-sidebar__middle").addClass("safari-mobile");
  $(window).scroll(function () {
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

jQuery(function ($) {
  /*Blog dropdown*/
  $(".js__blog-select").change(function () {
    window.location = $(this).val();
  });
  /*Dropdown selected*/

  $(".js__blog-select option").each(function (index) {
    var value = $(this).val().toLowerCase();

    if (window.location.href.toLowerCase().indexOf(value) > -1) {
      $(".js__blog-select").val($(this).val());
    }
  });
});
jQuery(function ($) {
  $(".js--open-rates-popup").on("click", function () {
    $(".js__rates-popup").show();
  });
  $(".js__modal-close").on("click", function () {
    $(".modal").hide();
  });
});
/*First tab link and first tab content active */

jQuery(document).ready(function ($) {
  $(".tab-link").first().addClass("active");
  $(".pdp-tab-link").first().addClass("active");
  $(".shopify-section .tab-content").first().show();
  $(".pdp-tab-section .tab-content").first().show();
  $(".pdp-tab-small .tab-content").first().show();
  $(".pdp-tab-content").first().show();
  $(document).on("click", ".js__tab-small", function (e) {
    e.preventDefault();

    if ($(this).parent(".tab-content").children(".accordion-con").css("display") == "none") {
      // $(".accordion-con").slideUp();
      // $(".accordion-con").removeClass("active");
      // $(".accordion-link").removeClass("active");
      // $(".tab-content").removeClass("active");
      $(".tab-link").removeClass("active");
      $(this).parent(".tab-content").children(".accordion-con").slideDown();
      $(this).parent(".tab-content").children(".accordion-con").addClass("active"); // $(this).parent(".tab-content").addClass("active");

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
      $(this).parent(".tab-content").children(".accordion-link").removeClass("active"); // $(this).parent(".tab-content").removeClass("active");

      $(this).parent(".tab-content").children(".accordion-con").removeClass("active");
    }
  });
  $(document).on("click", ".js___accordion", function (e) {
    e.preventDefault();

    if ($(this).parent(".tab-content").children(".accordion-con").css("display") == "none") {
      $(".accordion-con").slideUp();
      $(".accordion-con").removeClass("active");
      $(".accordion-link").removeClass("active"); // $(".tab-content").removeClass("active");

      $(".tab-link").removeClass("active");
      $(this).parent(".tab-content").children(".accordion-con").slideDown();
      $(this).parent(".tab-content").children(".accordion-con").addClass("active"); // $(this).parent(".tab-content").addClass("active");

      $(this).parent(".tab-content").children(".accordion-link").addClass("active");
      var dataId = $(this).parent(".tab-content").attr("data-attr");
      document.getElementById(dataId).className += " active";
      $('html,body').animate({
        scrollTop: $(this).offset().top - 120
      }, 500);
    } else {
      $(".accordion-con").slideUp();
      $(".accordion-con").removeClass("active"); // $(".tab-content").removeClass("active");

      $(this).parent(".tab-content").children(".accordion-link").removeClass("active"); // $(this).parent(".tab-content").removeClass("active");

      $(this).parent(".tab-content").children(".accordion-con").removeClass("active");
    }

    if ($(this).parent(".tab-content").css("display") == "block") {
      $(this).parent(".tab-content").children(".accordion-con").css("display") == "block";
    }
  });
});
/*Select Dropdown change wit Tab */

jQuery(function () {
  var path = window.location.href; // because the 'href' property of the DOM element is the absolute path

  $(".dropdown-select option").each(function () {
    if (this.value.toLowerCase() == path.toLowerCase()) {
      this.setAttribute("selected", true);
    }
  });
  $(".dropdown-select").change(function () {
    var dropdown = $(".dropdown-select").val();
    $(".js__faq-search-section").addClass("hide");
    $(".js__faq-tab").removeClass("hide");
    $("#txt-faq-search").val("");
    $(".js__no-data-found").addClass("hide"); //first hide all tabs again when a new option is selected

    $(".tab-content").hide(); //then show the tab content of whatever option value was selected

    $("#" + "tab-" + dropdown).show();

    if (dropdown == "all") {
      $(".js__tab-content").each(function () {
        if ($(this).find(".js__accordian").html().trim() == "<li>Sorry Data Is Not Added Yet</li>") {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    }
  });
  $(".js__tab-content").each(function () {
    if ($(this).find(".js__accordian").html().trim() == "") {
      $(this).find(".js__accordian").html('<li>Sorry Data Is Not Added Yet</li>');
    }
  });
});
/*Blog content checking if p tag has image then adding class*/

jQuery(function () {
  $(".article-content p").each(function (index) {
    if ($(this).html().indexOf("<img") > -1) {
      $(this).addClass("full-width");
    }

    if ($(this).html().indexOf("<iframe") > -1) {
      $(this).addClass("full-width");
    }
  });
}); // jQuery(document).ready(function ($) {
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

(function ($) {
  $(function () {
    var navLink = false;
    $(".accordion-toggle-footer-link").on("mousedown", function (e) {
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
    });
  });
})(jQuery);
/* quick view modal pop up */


var popupCollectionSlider;
var popupCollectionSliderThumbnail;
jQuery(function () {
  /* Product card click - open quick view pop up */
  $(document).on("click", ".js__quick-view-click", function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var id = $(this).attr("data-id"); //Executed after SWYM has loaded all necessary resources.

    $(".js__popup-variant-select-" + id + " li:first-child").click(); // show modal pop up

    $("#modal-" + id).show();
    /* Swiper/Slider */

    try {
      var sliderIMages = $(this).attr("data-slider_main").split("|");
      $(this).parent("div");
      $("#modal-" + id).find(".js__popup-collection-slider").children(".swiper-wrapper").empty();
      $("#modal-" + id).find(".js__popup-collection-slider-thumbnail").children(".swiper-wrapper").empty();

      for (var k = 0; k < sliderIMages.length - 1; k++) {
        $("#modal-" + id).find(".js__popup-collection-slider").children(".swiper-wrapper").append(' <div class="swiper-slide slide">  <a class="image-section" ><img src="' + sliderIMages[k] + '"> </a> </div>  ');
        $("#modal-" + id).find(".js__popup-collection-slider-thumbnail").children(".swiper-wrapper").append(' <div class="swiper-slide slide">  <a class="image-section" ><img src="' + sliderIMages[k] + '"> </a> </div>  ');
      }
      /* Swiper Video working */


      $(this).children(".data-var_videos").children("li").each(function (index) {
        $("#modal-" + id).find(".js__popup-collection-slider").children(".swiper-wrapper").append('<div class="swiper-slide slide">  <div class="image-section video-section" >' + $(this).html() + ' </div> </div>');
        $("#modal-" + id).find(".js__popup-collection-slider-thumbnail").children(".swiper-wrapper").append(' <div class="swiper-slide slide">  <div class="image-section video-section" > </div> </div>  ');
      });
    } catch (_unused2) {}

    try {
      if (typeof popupCollectionSliderThumbnail !== "undefined") {
        popupCollectionSliderThumbnail.destroy();
      }

      if (typeof popupCollectionSlider !== "undefined") {
        popupCollectionSlider.destroy();
      }

      popupCollectionSliderThumbnail = new Swiper(".js__popup-collection-slider-thumbnail-" + id, {
        slidesPerView: "auto",
        spaceBetween: 10,
        resistance: false,
        shortSwipes: true,
        navigation: {
          nextEl: ".swiper-button-next-popup-thumbnail",
          prevEl: ".swiper-button-prev-popup-thumbnail"
        }
      });
      popupCollectionSlider = new Swiper(".js__popup-collection-slider-" + id, {
        slidesPerView: 1,
        spaceBetween: 20
      });
    } catch (_unused3) {}
  });
  $(document).on("click", ".modal", function (e) {
    if (!($(e.target).closest(".modal-content").length > 0 || $(e.target).closest(".close").length > 0)) {
      $(this).hide();
    }
  });
  /*Quantity Plus Minus*/

  $(document).on("click", ".js__popup-quantity .js-plus-minus-qty", function (e) {
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

  $(document).on("click", ".js__popup-variant-select li", function (e) {
    $(this).parent("ul").children("li").removeClass("active");
    var option = $(this).attr("data-value");
    $(this).addClass("active");
    var pID = $(this).attr("data-id");
    console.log("pID" + pID);
    $("#product-select-" + pID + " option").each(function (index) {
      var optionName = $(this).html();
      var vID = $(this).attr("value");
      var variantSoldout = $(this).attr("data-soldout");
      var price = $(this).attr("data-price");

      if (optionName.trim() == option.trim()) {
        $(".js__price-popup-price-" + pID).hide();
        $(".js__price-popup-" + vID).show();

        if (variantSoldout == "true") {
          $(".js__modal-popup-addtocart-" + pID).attr("disabled", "disabled"); //update the text for the add to cart button to sold out

          $(".js__modal-popup-addtocart-text-" + pID).html("Soldout"); //hide the price if it's sold out
        } else {
          //update the text for the button to add to cart, if not sold out
          $(".js__modal-popup-addtocart-text-" + pID).html("Add to Cart"); // if not sold out, then remove the attr disabled

          $(".js__modal-popup-addtocart-" + pID).removeAttr("disabled");
        } // update the variant ID for the data-variant-id


        $(".js__modal-popup-addtocart-" + pID).attr("data-variant-id", vID);
        /* Not sure what are they being used for */
        // $(".discount_variant-" + pID + " span").hide();
        //$(".js__popup-variant-price-" + vID).show();
        //$(".js__rc_block__type__onetime-" + pID).find(".rc_price__onetime").html(price);
        //$(".modal-popup-price-subcription-" + pID).html($(".js__popup-variant-price-" + vID).html());
      }
    });
    /* Not being used any more */
    //$(".js__rc_radio_options-" + pID + " .rc_block__type-modal-popup.rc_block__type--active").click();
  }); // $(document).on("change", ".js__shipping_interval_frequency", function (e) {
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

  $(document).on("click", ".js__modal-popup-addtocart", function (e) {
    var pID = $(this).attr("data-id");
    var selectedVariantID = $(this).attr("data-variant-id");
    var quantity = parseInt($(".js-quantity-selector-" + pID).val());
    var recharge = $(".js__rc_radio_options-" + pID).html();
    var items = [];

    if (recharge == undefined) {
      /* For the main item */
      items.push({
        id: selectedVariantID,
        quantity: quantity
      });
    } else {
      if ($(".js__rc_radio_options-" + pID + " .rc_block__type-modal-popup.rc_block__type--active").hasClass("rc_block__type__onetime")) {
        items.push({
          id: selectedVariantID,
          quantity: quantity
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
      success: function success(response, textStatus, jqXHR) {
        $(".modal-quick-view").hide();

        if (getglobalLib("Mini_Cart") == "yes") {
          /* Show message */
          setTimeout(openMiniCart, 500);
        } else {
          window.location = "/cart";
        }
      },
      // Define an error callback to display an error message.
      error: function error(jqXHR, textStatus, errorThrown) {
        showCartErrorMessage();
      }
    });
  });
  $(document).on("click", ".js__card-add-to-cart", function (e) {
    var selectedVariantID = $(this).attr("data-variant-id");
    var quantity = 1;
    var items = [];
    /* For the main item */

    items.push({
      id: selectedVariantID,
      quantity: quantity
    });
    CartJS.addItems(items, {
      success: function success(response, textStatus, jqXHR) {
        $(".modal-quick-view").hide();

        if (getglobalLib("Mini_Cart") == "yes") {
          /* Show message */
          setTimeout(openMiniCart, 500);
        } else {
          window.location = "/cart";
        }
      },
      // Define an error callback to display an error message.
      error: function error(jqXHR, textStatus, errorThrown) {
        showCartErrorMessage();
      }
    });
  });
  $(document).on("click", ".js__popup-collection-slider-thumbnail .slide", function (e) {
    var slideno = parseInt($(this).index());
    e.preventDefault();
    e.stopPropagation();
    popupCollectionSlider.slideTo(slideno, 1000, false);
  });
  $(document).on("click", ".js__quick-view-popup-close", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(".modal-quick-view").hide();
  });
  var modal = document.getElementById('js__ingredients-popup'); // When the user clicks anywhere outside of the modal, close it

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
jQuery(document).ready(function ($) {
  // MODAL TEMPLATE
  $('.modal-quick-view .pdp__variants input').on('click', function () {
    var varId = $(this).closest('label').attr('data-variant_id'); //fire the closest variant selector

    $(this).closest('.modal').find('[sm-rc-variant-selector]').val(varId).change();
  });
  $('.modal-quick-view .pdp__recharge input').on('click', function () {
    var planId = $(this).closest('label').attr('data-plan_id');
    $(this).closest('.modal').find('[sm-rc-plan-selector]').val(planId).change();
  });
  $(document).on("click", ".modal-quick-view .pdp__recharge input", function () {
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
  }); // RECHARE WIDGET SUBSCRIPTION PLAN

  $('.modal-quick-view .frequency-select').on('change', function () {
    var planId = $(this).val();
    $(this).closest('.modal').find('[sm-rc-plan-selector]').val(planId).change();
  });
});
jQuery(document).ready(function ($) {
  $(".hero-banner-slider .content").addClass("animate");
});
$(document).ready(function ($) {
  $(".js__btn-faq-search").on('click', function () {
    var search = $("#txt-faq-search").val().toLowerCase();

    if (search != "") {
      $(".js__no-data-found").removeClass("hide");
      $(".tab-link").removeClass("active");
      $(".dropdown-select").val("all"); //Go through each list item and hide if not match search

      $(".js__faq-search-section").removeClass("hide");
      $(".js__faq-search-section").find(".tab-content").show();
      $(".js__faq-tab").addClass("hide");
      $(".js__faq-search li").each(function () {
        if ($(this).children("h3").html().toLowerCase().indexOf(search) != -1) {
          $(this).show();
          $(".js__no-data-found").addClass("hide");
        } else {
          $(this).hide();
        }
      });
    }
  });
});
jQuery(document).ready(function ($) {
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
      pauseOnMouseEnter: true
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      376: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      377: {
        slidesPerView: "auto"
      }
    }
  });
});
"use strict";

var showCartMessage = true;
jQuery(function () {
  //Nav - Open and Close Mini cart
  if (getglobalLib("Mini_Cart") == "yes") {
    $(".js__cart-expand").on("click", function () {
      $("#CartSidebar").toggleClass("active");
      $("#cart_overlay").toggleClass("active");
      $(this).addClass("active");
    });
    $("#js__cart-close").on("click", function () {
      $("#CartSidebar").removeClass("active");
      $("#cart_overlay").removeClass("active");
      $(".js__cart-expand").removeClass("active");
    });
    $(".js__cart-expand").attr("href", "javascript:void(0)");
  }
  /* Cart - Free Shipping Progress bar Visiblity */


  try {
    if (getglobalLib("Free_Shipping_progressbar") == "yes" && $(".js__free-shipping-limit").html().trim() != "" && showProgressBar == true) {
      $(".js__progressbar_visiblity").removeClass("hide");
    }
  } catch (_unused) {}
  /* Remove mini cart from the cart page */


  if ($(".cart-table-body")[0]) {
    $("#CartSidebar").remove();
    $("#cart_overlay").remove();
    $(".js__top-cart-form-actions").remove();
    $(".js__ajax-products-bind").remove();
    $(".mini-cart").removeClass("js__cart-expand");
    $(".mini-cart").attr("href", "/cart");
  }
  /* show no items in cart */


  if (CartJS.cart.item_count == 0) {
    $(".empty-cart-section").show();
    $(".js__show-cart-items-section").hide();
    $("#shopify-section-cart-recommendations").hide();
  } else {
    $(".empty-cart-section").hide();
  }
  /*Quantity Plus Minus for the textbox */


  $(".js__product-single__quantity .js__minus-qty").click(function () {
    decreaseQuantity();
  });
  $(".js__product-single__quantity .js__plus-qty").click(function () {
    increaseQuantity();
  });

  function increaseQuantity() {
    var productQuantity = $(".js__quantity-selector").val();
    productQuantity++;
    $(".js__quantity-selector").val(productQuantity);
  }

  function decreaseQuantity() {
    var productQuantity = $(".js__quantity-selector").val();

    if (productQuantity > 1) {
      productQuantity--;
    }

    $(".js__quantity-selector").val(productQuantity);
  }
});
/* 
NOTIFICATIONS SECTION
Show Noticiations On Success and Error
Note: This function isn't being used in every theme
Feel free to comment/uncomment as per the functionality
*/

function showCartSuccessMessage() {
  setTimeout(openMiniCart, 500);

  if (showCartMessage == true) {
    $("#cart-message").addClass("message-success");
    $("#cart-message").removeClass("message-error");
    $("#cart-message").html("Successfully added to cart!");
    $("#cart-message").show();
    setTimeout(function () {
      $("#cart-message").hide();
    }, 5000);
  }
}

function showCartErrorMessage() {
  if (showCartMessage == true) {
    $("#cart-message").removeClass("message-success");
    $("#cart-message").addClass("message-error");
    $("#cart-message").html("Sorry! Seems like the product is out of stock");
    $("#cart-message").show();
    setTimeout(function () {
      $("#cart-message").hide();
    }, 5000);
  }
}

function openMiniCart() {
  fetch('/cart.js', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    $("#CartSidebar").toggleClass("active");
    $("#cart_overlay").toggleClass("active");
  });
}
/* EVENT: When the cart request is completed everytime the below function is run */


$(document).on("cart.requestComplete", function (event, cart) {
  reloadAjaxCartItemUsingCartAjaxObject(cart); //Progress Bar of shipping in cart and mini cart; Varies from theme to theme

  progressBar(); //Show and hide empty cart depending upon the cart items

  setTimeout(function () {
    // calculateSubTotalWithDiscount();
    addons();
  }, 1000);
}); // $(document).on("cart.requestStarted", function (event, cart) {console.log("Request started"); });
//$(document).on("cart.ready", function (event, cart) {});

/* currency formatter */

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
"use strict";

jQuery(function () {
  /* Footer - Accordion Visiblity */
  if (getglobalLib("Footer_Accordion") == "yes") {
    $(".js__accordion-toggle-visiblity").addClass("accordion-toggle-footer");
    $(".js__accordion-content-visiblity").addClass("accordion-content-footer");
  }
  /* FAQ - Category Sidebar Visiblity */


  if (getglobalLib("FAQ_Side_Panel") == "yes") {
    $(".js__faq-category-side-panel").removeClass("hide");
  }

  if (getglobalLib("Product_Recommendation_Slider") == "on") {
    $("#js__pdp-recommendation-slider").not(".slick-initialized").slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      dots: false,
      centerMode: false,
      infinite: false,
      focusOnSelect: true,
      variableWidth: true,
      draggable: true
    });
  }
});
"use strict";

jQuery(function () {
  /* Global
  Announcement Slider */
  var announcementSlider = new Swiper(".js__announcement-slider", {
    slidesPerView: 1,
    resistance: false,
    shortSwipes: true,
    loop: true,
    autoplay: {
      delay: 3000
    } // direction: 'vertical',

  });
  /* Announcement 
  Close on Click  */

  $("#announcement-close").on("click", function (e) {
    e.preventDefault();
    $(".announcement-bar").hide();
    $("body").removeClass("announcement-visible");
    $("body").addClass("announcement-hide");
  }); // if($("div").hasClass("hero-banner") || $("div").hasClass("error-page") || $("div").hasClass("inner-hero-section") ){
  //     $("body").addClass("transparent-header");
  //     $(".js__main-content").addClass("active");
  //   } else {
  //     $("body").removeClass("transparent-header");
  //     $(".js__main-content").removeClass("active");
  // }

  /* MEGAMENU
    active link while submenu open */

  if ($(window).width() > 980) {
    $('.has-sub-nav').hover(function (event) {
      event.stopPropagation(); // Stop event propagation
      // Adding a extra link to give anchor hover effect

      $(this).children(".site-nav__link").addClass("hover-submenu"); // Give Visibility and opacity to the Sub nav menu

      $(this).children(".sub-nav").css("visibility", "visible");
      $(this).children(".sub-nav").css("opacity", "1");
      $(this).children(".sub-nav").css("z-index", "1");
      $(this).children(".sub-nav").addClass("active"); //$("body").removeClass("transparent-header");
      // main-header").addClass("active");
      // /$("./ Remove transparent header from index page when sub menu open
      // $(".template-index").addClass("remove-transparent-header");

      if ($(".js__search ").hasClass("active") == true) {
        $(".js__header-search-section").removeClass("active");
        $(".js__search ").removeClass("active");
        $("body .boost-pfs-search-suggestion").css("display", "none");
        $("body #boost-sd__search-widget-init-wrapper-1").css("display", "none");
      }
    }, function (event) {
      event.stopPropagation(); // Stop event propagation
      // Remove  extra link to remove anchor hover effect

      $(this).children(".site-nav__link").removeClass("hover-submenu");
      $(".has-sub-nav").children(".site-nav__link").removeClass("hover-submenu"); // Remove Visibility and opacity from the Sub nav menu

      $(".has-sub-nav").children(".sub-nav").css("visibility", "hidden");
      $(".has-sub-nav").children(".sub-nav").css("opacity", "0");
      $(".has-sub-nav").children(".sub-nav").removeClass("active"); // $(this).children(".sub-nav").css("z-index", "-10");

      if ($(".js__header-search-section").hasClass("active") === true) {
        $(".main-header").addClass("active");
      } else {
        $(".main-header").removeClass("active");
      } // $(".main-header").removeClass("active");
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

    });
    $('.has-big-nav').hover(function (event) {
      event.stopPropagation(); // Stop event propagation
      // Adding a extra link to give anchor hover effect

      $(this).children(".site-nav__link").addClass("hover-submenu"); // Give Visibility and opacity to the Big nav menu

      $(this).children(".big-nav").css("visibility", "visible");
      $(this).children(".big-nav").css("opacity", "1");
      $(this).children(".big-nav").addClass("active"); // Remove transparent header from index page when big nav menu open
      // $("body").removeClass("transparent-header");

      $(".main-header").addClass("active");

      if ($(".js__search").hasClass("active") == true) {
        $(".js__header-search-section").removeClass("active");
        $(".js__search").removeClass("active");
        $("body .boost-pfs-search-suggestion").css("display", "none");
        $("body #boost-sd__search-widget-init-wrapper-1").css("display", "none");
      }
    }, function (event) {
      event.stopPropagation(); // Stop event propagation
      // Remove  extra link to remove anchor hover effect

      $(this).children(".site-nav__link").removeClass("hover-submenu"); // Remove Visibility and opacity from the Big nav menu

      $(".has-big-nav .big-nav").css("visibility", "hidden");
      $(".has-big-nav .big-nav").css("opacity", "0");
      $(".has-big-nav").children(".big-nav").removeClass("active");

      if ($(".js__header-search-section").hasClass("active") === true) {
        $(".main-header").addClass("active");
      } else {
        $(".main-header").removeClass("active");
      } // Add transparent header from index page when sub menu open
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
  } //  Sub Menu in MObile

  /* SubMenu
     Accordion JS */


  (function ($) {
    $(function () {
      var navLink = false;
      $(".accordion-toggle").on("mousedown", function (e) {
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
      }).focus(function (e) {
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
  })(jQuery); // sEARCH BAR


  $(document).click(function (e) {
    var container = $(".search-li"); // if the target of the click isn't the container nor a descendant of the container

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $(".js__header-search-section").removeClass("active");
      $(".js__search").removeClass("active");
      $("body .boost-pfs-search-suggestion").css("display", "none");
      $("body #boost-sd__search-widget-init-wrapper-1").css("display", "none"); // if ($("div").hasClass("inner-hero-section")  || $("div").hasClass("error-page") || $("div").hasClass("hero-banner-slider")) {
      //     if($(".js__main-header").hasClass("active") === true){
      //         $("body").removeClass("transparent-header");
      //     }
      // }
      // else{
      //     $("body").removeClass("transparent-header");
      // }
    }
  });
  $("#search-close").on("click", function (e) {
    $(".js__header-search-section").removeClass("active");
    $(".js__search").removeClass("active");
    $("body .boost-pfs-search-suggestion").css("display", "none");
    $("body #boost-sd__search-widget-init-wrapper-1").css("display", "none");
  });
  $(".js__search").on("click", function (e) {
    e.preventDefault();
    $(".js__header-search-section").toggleClass("active");
    $("#navbarNavDropdown").removeClass("active"); // $(".announcement-bar").removeClass("active");

    $("#hamburger").removeClass("active");
    $(".search").focus();
    $(".boost-pfs-search-box").focus();
    $(this).toggleClass("active");
    $(".js__main-header").toggleClass("active"); // $("body").toggleClass("transparent-header");
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
  });
});
/** Fix Header on Scroll **/

jQuery(function () {
  var newsHeight = $('.announcement-bar').height();
  $('.header-logo').css("top", '-' + newsHeight + 'px');
  $('.navbar-collapse').css("top", +(newsHeight + 54 + 4) + 'px');
});
$(window).scroll(function () {
  var sticky = $("header"),
      scroll = $(window).scrollTop();

  if (scroll >= 30) {
    sticky.addClass("fixed");
    $("body").addClass("fixed-header"); // $(".fixed-header").removeClass("transparent-header");
  } else {
    sticky.removeClass("fixed");
    $("body").removeClass("fixed-header");

    if ($("#navbarNavDropdown").hasClass("active")) {
      // $("body").removeClass("transparent-header");
      $(".main-header").addClass("active");
    } // else {
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

(function ($) {
  $(function () {
    var navLink = false;
    $("#hamburger").mousedown(function (e) {
      $(this).toggleClass("active");
      $("#navbarNavDropdown").toggleClass("active");
      $(".js__mobile-menu-open-hide").toggleClass("active");
      $(".js__mobile-announcement-text").toggleClass("active");
      $(".main-header").toggleClass("active"); // $(".announcement-bar").toggleClass("active");
      // $("body").removeClass("transparent-header");
      // if ($("body").hasClass("transparent-header")) {
      //     $("body").removeClass("transparent-header");
      // }

      if ($("#navbarNavDropdown").hasClass("active")) {
        $(".js__logo").addClass("active"); // $(".template-index").removeClass("transparent-header");

        $(".main-header").addClass("active");

        if ($(window).width() < 980) {
          $("html").css("overflow", "hidden");
          $("html").addClass("scroll-stop");
        } else {
          $("html").removeClass("scroll-stop");
          $("html").css("overflow-y", "scroll");
        }
      } else {
        $(".js__logo").toggleClass("active");
        $(".main-header").removeClass("active"); // if ($("body").hasClass("fixed-header")) {
        //     $(".template-index").removeClass("transparent-header");
        // } else {
        //     $(".template-index").addClass("transparent-header");
        // }

        $("html").css("overflow-y", "scroll");
        $("body .boost-pfs-search-suggestion-group").css("display", "none");
      }

      navLink = true;
    }).focus(function (e) {
      "use strict";

      if (navLink) {} else {
        $(this).toggleClass("active");
        $("#navbarNavDropdown").toggleClass("active");
        $(".js__mobile-menu-open-hide").toggleClass("active");
        $(".js__mobile-announcement-text").toggleClass("active");

        if ($("#navbarNavDropdown").hasClass("active")) {
          $(".js__logo").addClass("active"); // $(".template-index").removeClass("transparent-header");
        } else {
          $(".js__logo").toggleClass("active"); //$(".template-index").addClass("transparent-header");
        }
      }
    });
  });
})(jQuery);
/** CART SIDEBAR
 * Close on Outside Click
 * **/


$(document).mouseup(function (e) {
  var popup = $("#CartSidebar");
  var overlay = $("#cart_overlay");

  if (!popup.is(e.target) && popup.has(e.target).length == 0) {
    popup.removeClass("active");
    overlay.removeClass("active");
  }
});
/* OPEN BIG NAV SECTION ON DESKTOP */

(function ($) {
  $(function () {
    var navLink = false;
    $(".js__big-nav-link").mousedown(function (e) {
      $(this).toggleClass("active");
      $(".js__big-nav").toggleClass("active");
      navLink = true;
    }).focus(function (e) {
      "use strict";

      if (navLink) {} else {
        $(this).toggleClass("active");
        $(".js__big-nav").toggleClass("active");
      }
    });
  });
})(jQuery);
/* OPEN SUB NAV SECTION ON MOBILE */


(function ($) {
  $(function () {
    var navLink = false;
    $(".js__sub-nav-link").mousedown(function (e) {
      $(this).toggleClass("active");
      $(".js__sub-nav").toggleClass("active");
      navLink = true;
    }).focus(function (e) {
      "use strict";

      if (navLink) {} else {
        $(this).toggleClass("active");
        $(".js__sub-nav").toggleClass("active");
      }
    });
  });
})(jQuery); // Close MOBILE SUB NAV ON CLICK BACK 


(function ($) {
  $(function () {
    var navLink = false;
    $(".js__sub-nav-close").mousedown(function (e) {
      $(this).toggleClass("active");
      $(".js__sub-nav").toggleClass("active");
      navLink = true;
    }).focus(function (e) {
      "use strict";

      if (navLink) {} else {
        $(this).toggleClass("active");
        $(".js__sub-nav").toggleClass("active");
      }
    });
  });
})(jQuery);
"use strict";

var pdpThumbnail;
var pdpSlider;
$(document).ready(function ($) {
  var producrSlider = new Swiper('.js__pdp-recommendation-slider', {
    slidesPerView: 3,
    autoHeight: true,
    resistance: false,
    shortSwipes: true,
    spaceBetween: 40,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next-product-recommed',
      prevEl: '.swiper-button-prev-product-recommed'
    },
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      601: {
        slidesPerView: 2
      },
      981: {
        slidesPerView: 3
      }
    }
  });
  /*Slider working Start*/

  if (getglobalLib("PDP_Slider_Thumbnail") == "vertical") {
    pdpThumbnail = new Swiper(".js__pdp-thumbnail-slider", {
      slidesPerView: 3,
      resistance: false,
      shortSwipes: false,
      clickable: true,
      grabCursor: true,
      observer: true,
      observeParents: true,
      draggable: true,
      breakpoints: {
        980: {
          slidesPerView: "auto",
          direction: "horizontal"
        },
        981: {
          slidesPerView: 6,
          direction: "vertical"
        }
      }
    });
  } else {
    pdpThumbnail = new Swiper(".js__pdp-thumbnail-slider", {
      resistance: false,
      shortSwipes: true,
      slidesPerView: 'auto',
      freeMode: true,
      watchSlidesProgress: true,
      clickable: true,
      grabCursor: true,
      mousewheel: true,
      direction: "horizontal",
      spaceBetween: 15
    });
  }

  pdpSlider = new Swiper(".js__pdp-slider", {
    slidesPerView: 1,
    grabCursor: false,
    mousewheel: false,
    clickable: false,
    resistance: false,
    shortSwipes: true,
    spaceBetween: 12,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next-pdp",
      prevEl: ".swiper-button-prev-pdp"
    },
    thumbs: {
      swiper: pdpThumbnail
    }
  });
  /*PDP tab section drop down change*/

  $(".js__pdp-tab-select").change(function () {
    $(".tab-content").removeClass("active");
    $(".tab-content").hide();
    $("#" + $(this).val()).show();
    $("#" + $(this).val()).addClass("active");
    $(".tab-link").removeClass("active");
    $("#tab-link-" + $(this).val()).addClass("active");
  });
  /* var pdpSlideCount = 0;
   $(document).on("click", ".swiper-button-next-pdp.swiper-button-disabled", function(e) {
           var ariaLabel = $(".js__pdp-slider").find(".swiper-slide-active").attr("aria-label").split("/");
           console.log(ariaLabel[0]);
           console.log(ariaLabel[1]);
           pdpSlideCount++;
           if (pdpSlideCount == 2) {
               if (ariaLabel[0].trim() == ariaLabel[1].trim()) {
                   pdpSlideCount = 0
                   pdpSlider.slideTo(0);
               }
           }
         })*/

  /* Manual click of thumbnail of slider*/

  $(document).on("click", ".pdp-thumbnail li", function (e) {
    var slideno = $(this).index();
    $(".pdp-thumbnail li").removeClass("active");
    $(this).addClass("active");
    $(".pdp-slider").slick("slickGoTo", slideno);
    setTimeout(function () {
      $(".pdp-thumbnail").slick("slickGoTo", slideno);
    }, 500);
    /* var slideno = $(this).index();
             $(".pdp-thumbnail li").removeClass("active");
             $(this).addClass("active");
             console.log("slideno"+slideno);
       
             $(".pdp-slider").slick("slickGoTo", slideno);*/
  });
  /*Write review click*/

  $(".js__write-review-btn").click(function () {
    $(".yotpo-new-review-btn").click();
  });
  /*View details*/

  $(document).on("click", ".js__pdp-view-details", function (e) {
    e.preventDefault();
    $(".tab-link").removeClass("active");
    $(".tab-head li:first-child").children(".tab-link").addClass("active");
    $(".tab-content").removeClass("active");
    $(".tab-content:first-child").addClass("active");
    $(".tab-content").hide();
    $(".tab-content:first-child").show();
    $(".js__pdp-tab-select").val($(".tab-head li:first-child").children(".tab-link").attr("data-attr"));
    setTimeout(function () {
      var target = $(".tab-content:first-child");
      $("html, body").animate({
        scrollTop: target.offset().top - 350
      }, 500);
    }, 500);
  });
  /*Review star click*/

  $(document).on("click", ".js__review-section", function (e) {
    e.preventDefault();
    $(".tab-link").removeClass("active");
    $("#tab-link-reviews").addClass("active");
    $(".tab-content").removeClass("active");
    $("#reviews").addClass("active");
    $(".tab-content").hide();
    $("#reviews").show();
    $(".js__pdp-tab-select").val("Reviews");
    setTimeout(function () {
      var target = $("#reviews");
      $("html, body").animate({
        scrollTop: target.offset().top - 350
      }, 500);
    }, 500);
  });
  /*Ninja price update */

  var targetNodes = $("#shopify-section-footer");
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
  var bundleObersrver = new MutationObserver(mutationHandler);
  var obsConfig = {
    childList: true,
    characterData: true,
    attributes: true,
    subtree: true
  }; //--- Add a target node to the observer. Can only add one node at a time.

  targetNodes.each(function () {
    bundleObersrver.observe(this, obsConfig);
  });

  function mutationHandler(mutationRecords) {
    //loop through all the mutations that just occured
    mutationRecords.forEach(function (mutation) {
      if (mutation.type == "childList") {
        //loop though the added nodes
        mutation.addedNodes.forEach(function (added_node) {
          // console.log($(".rc-container-wrapper").html())
          if ($(".cbb-frequently-bought-container").html() != undefined) {
            $(".cbb-frequently-bought-container").detach().appendTo('.js__product-frequently-bought-section');
            bundleObersrver.disconnect();
          }
        });
      }
    });
  }
  /* change frequency dropdown checking if   value not null then change button text */


  $(document).on("change", ".rc_widget__option__plans__dropdown", function (e) {
    $(".rc-option--active").click();
  });
  $(document).on("click", ".rc_widget__option", function (e) {
    //console.log("onetime ");
    var price = $(this).find(".rc-option__price").html();
    $(".pdp-add-to-cart-price").html(price);
    $(".js__pdp-variant-select li.active").click();
  });
  /*Slider working End*/

  /* Call page load functions */

  setTimeout(function () {
    setColorThumbImages();
  }, 1000);
  /* FORMATTING: Loop Through each color thumb and set the images for them through the product color library object */

  function setColorThumbImages() {
    if ($(".js-variant-color-swatch li")[0]) {
      $(".js-variant-color-swatch  li").each(function (index) {
        var color = $(this).attr("data-color");
        var colorValue = getVariantColor(color); //$(this).children("div.color").css("background-color", colorValue);

        if (colorValue == "") {
          $(this).children("img").css("opacity", "0");
        }

        $(this).children("img").attr("src", colorValue);
      });
    }
  }
});
/*PENDING Get Variant Color*/

function getVariantColor(color) {
  try {
    var variantColorValue = "";
    $.each(prodColor, function (key, value) {
      if (color.toLowerCase() == value.title.toLowerCase()) {
        variantColorValue = value.color;
      }
    });
    /* $.each(prodLib, function (key, value) {
       if (color.toLowerCase() == value.option1.toLowerCase()) {
         variantColorValue = value.image;
       }
     });*/

    return variantColorValue;
  } catch (_unused) {}
}
/* Color swatch click*/


$(document).ready(function ($) {
  $(document).on("mouseenter", ".js__product-cart-color li", function () {
    var productID = $(this).attr("data-product-id");
    var variantImage = $(this).attr("data-image");
    var featuredImage = $(this).attr("data-featured_image");

    if (variantImage.indexOf("no-image-") == -1) {
      $(".js__product-image-" + productID).attr("src", variantImage);
    } else {
      $(".js__product-image-" + productID).attr("src", featuredImage);
    }
  });
  $(document).on("mouseleave", ".js__product-cart-color li", function () {
    var productID = $(this).attr("data-product-id");
    var featuredImage = $(".js__product-image-" + productID).attr("data-src");
    $(".js__product-image-" + productID).attr("src", featuredImage);
  });
});
"use strict";

var colorSelected = "";
var secondOptionVariantValue = "";
var thirdOptionVariantValue = "";
var selectedVariantID;
$(document).ready(function ($) {
  /* if no varient then active class added in product image section*/
  if (prodLib.length == 0) {
    $(".js-pdp-media").addClass("active");
    $(".js__pdp-thumbnail-slider li:first-child").addClass("active");
  }

  var colorPosition = $("#colorPosition").val();
  var numberOfAvailableOptions = parseInt($("#optionSize").val()); // on page load check the color position, and set 2nd and 3rd options values

  checkColorPosition();

  function checkColorPosition() {
    getColorPosition();
    /* 
    if only color and no other options
    */

    if (colorPosition != undefined && numberOfAvailableOptions == 1) {
      SoldOutUnavailableOnColorSwatches(colorSelected);
    }
  }
  /*Quantity Plus Minus*/


  $(".js-product-single__quantity .js-plus-minus-qty").click(function () {
    var type = $(this).attr("data-type");
    var productQuantity = $(".js-quantity-selector").val();

    if (type == "minus") {
      if (productQuantity > 1) {
        productQuantity--;
      }
    } else {
      productQuantity++;
    }

    $(".js-quantity-selector").val(productQuantity);
  }); // On DD change, fire the form DD element and also run the soldoutColorSwatches function

  $(".js__pdp-variant-select").change(function () {
    var optionIndex = $(this).attr("data-option");
    var optionValue = $(this).val();
    $("#product .product__form .options .option.option-" + optionIndex + " .label span").text(optionValue); // button  - Sold out and add to cart

    $("#product-select-option-" + optionIndex).val(optionValue).trigger("change");
    /*Checking if this is filter type then image filter code will work*/

    var OptionType = $(this).attr("data-type");
    var FilterType = $("#variantFilterType").val();

    if (OptionType == FilterType) {
      imageFilter(optionValue);
    }

    var selectedVariant = $("#product-select :selected").text().replace("- sold out!", "");
    $(".js__product-variant-selected").html(selectedVariant);
    $(".rc-option--active").click(); //color swatch - sold out working

    SoldOutUnavailableOnColorSwatches(colorSelected);
  });
  $(document).on("click", ".js__pdp-variant-select li", function () {
    var optionIndex = $(this).attr("data-option");
    var optionValue = $(this).attr("data-value");
    var optionType = $(this).parent("ul").attr("data-type");
    $(this).parent("ul").children("li").removeClass("active");
    $(this).addClass("active");
    $("#product-select-option-" + optionIndex).val(optionValue).trigger("change");
    $("#product-select").change();
    /*Checking if this is filter type then image filter code will work*/

    try {
      var FilterType = $("#variantFilterType").val();

      if (optionType == FilterType) {
        imageFilter(optionValue);
      }
    } catch (_unused) {} // button  - Sold out and add to cart


    try {
      SoldOutUnavailableOnColorSwatches(colorSelected);
    } catch (_unused2) {} //color swatch - sold out working

  });
  $(".js__pdp-variant-select li.active").click();
  $(".js__color-swatches").click(function () {
    // remove active class - from all the li's
    $('.js__color-swatches').removeClass('active'); // add class on the one which is clicked

    $(this).addClass('active');
    var optionindex = $(this).data('option');
    var thevalue = $(this).data('value'); //show the selected value

    $('.variant-option.option-' + optionindex + ' .label span').text(thevalue); // trigger change

    $('#product-select-option-' + optionindex).val(thevalue).trigger('change');
    /*Checking if this is filter type then image filter code will work*/

    var OptionType = $(this).parent("ul").attr("data-type");
    var FilterType = $("#variantFilterType").val();

    if (OptionType == FilterType) {
      imageFilter(thevalue);
    }
  });
  /*Run this function when image change on variant click*/

  function imageFilter(selectedValue) {
    /*Slick slider filter on swatch click*/
    var thumbColorSelected = selectedValue.replace(" ", "-");
    thumbColorSelected = thumbColorSelected.replace(/[^a-zA-Z0-9 ]/g, "-");
    thumbColorSelected = thumbColorSelected.replace(/ /g, "-");
    thumbColorSelected = thumbColorSelected.replace(/--/g, "-");
    thumbColorSelected = thumbColorSelected.replace(/---/g, "-"); // $(".pdp-slider").slick("slickUnfilter");
    //   $(".js__pdp-thumbnail-slider").slick("slickUnfilter");

    $(".pdp-slider").find(".all").addClass(thumbColorSelected.toLowerCase());
    $(".js__pdp-thumbnail-slider").find(".all").addClass(thumbColorSelected.toLowerCase()); //   $(".pdp-slider").slick("slickFilter", "." + thumbColorSelected.toLowerCase());
    //  $(".js__pdp-thumbnail-slider").slick( "slickFilter","." + thumbColorSelected.toLowerCase());

    $(".js__pdp-thumbnail-slider .swiper-slide").removeClass("active"); //$(".js__pdp-thumbnail-slider").slick("refresh");

    $(".pdp-slider").find(".slide").addClass("remove-slide").removeClass("swiper-slide").removeAttr("aria-label");
    $(".js__pdp-thumbnail-slider").find(".slide").addClass("remove-slide").removeClass("swiper-slide").removeAttr("aria-label");
    $(".pdp-slider").find(".slide").children(".image-section").removeAttr("data-fancybox");
    $(".pdp-slider").find("." + thumbColorSelected.toLowerCase()).removeClass("remove-slide").addClass("swiper-slide");
    $(".js__pdp-thumbnail-slider").find("." + thumbColorSelected.toLowerCase()).removeClass("remove-slide").addClass("swiper-slide");
    $(".pdp-slider").find("." + thumbColorSelected.toLowerCase()).children(".image-section").attr("data-fancybox", "product");
    pdpThumbnail.destroy();
    pdpSlider.destroy();

    if (getglobalLib("PDP_Slider_Thumbnail") == "vertical") {
      pdpThumbnail = new Swiper(".js__pdp-thumbnail-slider", {
        slidesPerView: 3,
        resistance: false,
        shortSwipes: false,
        freeMode: true,
        watchSlidesProgress: true,
        clickable: true,
        grabCursor: true,
        observer: true,
        observeParents: true,
        draggable: true,
        breakpoints: {
          980: {
            slidesPerView: "auto",
            direction: "horizontal"
          },
          981: {
            slidesPerView: 6,
            direction: "vertical"
          }
        }
      });
    } else {
      pdpThumbnail = new Swiper(".js__pdp-thumbnail-slider", {
        resistance: false,
        shortSwipes: true,
        loop: true,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesProgress: true,
        clickable: true,
        grabCursor: true,
        mousewheel: true,
        spaceBetween: 10
      });
    }

    pdpSlider = new Swiper(".js__pdp-slider", {
      slidesPerView: 1,
      grabCursor: false,
      mousewheel: false,
      clickable: false,
      resistance: false,
      shortSwipes: true,
      loop: true,
      spaceBetween: 15,
      navigation: {
        nextEl: ".swiper-button-next-pdp",
        prevEl: ".swiper-button-prev-pdp"
      },
      thumbs: {
        swiper: pdpThumbnail
      }
    });
    /*Selected first variant image in slider which have no all class*/

    var boolVariantFirstImage = false;
    $(".js__pdp-thumbnail-slider  li").each(function () {
      if (!$(this).hasClass("all")) {
        if (boolVariantFirstImage == false) {
          $(this).click();
          $(this).addClass("active");
          boolVariantFirstImage = true;
        }
      }
    });
    /*When we dont have any variant image*/

    if (boolVariantFirstImage == false) {
      $(".js__pdp-thumbnail-slider li:first-child").addClass("active");
      $(".js__pdp-thumbnail-slider li:first-child").click();
    }

    colorSelected = selectedValue;
  } // main sold out and unavailable working


  function SoldOutUnavailableOnColorSwatches(colorSelected) {
    getColorPosition(); // Remove out of stock and unavailable from color swatches

    $(".js__color-swatches").removeClass("out-of-stock");
    $(".js__color-swatches").removeClass("unavailable");
    var colorLength = $(".js__color-swatches").length;
    var colorCount = 1;
    /*
    Loop Through each input radio for the color
    */
    // we are using color swatch working for other options when they are radio buttons

    $(".js__color-swatches").each(function (index) {
      var colorValue = $(this).attr("data-value");
      var checkColorOptionExists = false;
      /* 
       Loop through product library object for variant 
       and if variant select matches and quantity = 0 then show out of stock message
       */

      /*
      PENDING - Merge - ProdLib Each Function
      */

      $.each(prodLib, function (key, value) {
        var itemQuantity = value.quantity;
        var itemAvailable = value.available;
        var prodColorOptionValue = "";
        var prodSecondOptionValue = "";
        var prodThirdOptionValue = "";

        if (colorPosition == "1") {
          prodColorOptionValue = value.option1;
          prodSecondOptionValue = value.option2;
          prodThirdOptionValue = value.option3;
        }

        if (colorPosition == "2") {
          prodColorOptionValue = value.option2;
          prodSecondOptionValue = value.option1;
          prodThirdOptionValue = value.option3;
        }

        if (colorPosition == "3") {
          prodColorOptionValue = value.option3;
          prodSecondOptionValue = value.option1;
          prodThirdOptionValue = value.option2;
        }

        var colorOption = prodColorOptionValue.toLowerCase();
        colorOption = colorOption.replace(/[^a-zA-Z0-9 ]/g, "-");
        colorOption = colorOption.replace(/ /g, "-");
        colorOption = colorOption.replace(/--/g, "-");
        colorOption = colorOption.replace(/---/g, "-");
        /*Checking each color  size quantity and which have 0 then added out of stock class*/

        if (numberOfAvailableOptions == 3) {
          /*three matching option checking quantity if 0 then showing out of stock */
          if (secondOptionVariantValue.toLowerCase() == prodSecondOptionValue.toLowerCase() && thirdOptionVariantValue.toLowerCase() == prodThirdOptionValue.toLowerCase()) {
            {
              //check if quantity>1 then set the color swatch - Out of stock
              setColorSwatchOutofStock(colorOption, itemQuantity, itemAvailable);
            }
          }
        } else if (numberOfAvailableOptions == 2) {
          /*two matching option checking quantity if 0 then showing out of stock */
          if (prodSecondOptionValue.toLowerCase() == secondOptionVariantValue.toLowerCase()) {
            {
              //check if quantity>1 then set the color swatch - Out of stock
              setColorSwatchOutofStock(colorOption, itemQuantity, itemAvailable);
            }
          }
        } else {
          //check if quantity>1 then set the color swatch - Out of stock
          setColorSwatchOutofStock(colorOption, itemQuantity, itemAvailable);
        }

        if (prodColorOptionValue == colorValue) {
          if (numberOfAvailableOptions == 3) {
            if (prodSecondOptionValue.toLowerCase() == secondOptionVariantValue.toLowerCase() && prodThirdOptionValue.toLowerCase() == thirdOptionVariantValue.toLowerCase()) {
              checkColorOptionExists = true;
            }
          } else if (numberOfAvailableOptions == 2) {
            if (prodSecondOptionValue.toLowerCase() == secondOptionVariantValue.toLowerCase()) {
              checkColorOptionExists = true;
            }
          } else {
            checkColorOptionExists = true;
          }
        }
      });

      if (checkColorOptionExists == false) {
        var colorOption = colorValue;
        colorOption = colorOption.replace(/[^a-zA-Z0-9 ]/g, "-");
        colorOption = colorOption.replace(/ /g, "-");
        colorOption = colorOption.replace(/--/g, "-");
        colorOption = colorOption.replace(/---/g, "-");
        colorOption = colorOption.toLowerCase();
        $(".js__color-swatches[data-type-value=" + colorOption + "]").removeClass("out-of-stock");
        $(".js__color-swatches[data-type-value=" + colorOption + "]").addClass("unavailable");

        if ($(".js__color-swatches[data-type-value=" + colorOption + "]").hasClass("active")) {
          var nextColor = colorCount + 1;

          if (colorCount < colorLength) {
            $(".js__color-swatches:nth-child(" + nextColor + ")").click();
          } else {
            $(".js__color-swatches:nth-child(1)").click();
          }
        }
      }

      colorCount++;
    });
  }

  function getColorPosition() {
    if (colorPosition != undefined && numberOfAvailableOptions > 1) {
      if (colorPosition == "1") {
        secondOptionVariantValue = $(".js__pdp-variant-select1").val();

        if (numberOfAvailableOptions > 2) {
          thirdOptionVariantValue = $(".js__pdp-variant-select2").val();
        }
      }

      if (colorPosition == "2") {
        secondOptionVariantValue = $(".js__pdp-variant-select0").val();

        if (numberOfAvailableOptions > 2) {
          thirdOptionVariantValue = $(".js__pdp-variant-select2").val();
        }
      }

      if (colorPosition == "3") {
        secondOptionVariantValue = $(".js__pdp-variant-select0").val();

        if (numberOfAvailableOptions > 2) {
          thirdOptionVariantValue = $(".js__pdp-variant-select1").val();
        }
      }
    } else {
      secondOptionVariantValue = $(".js__pdp-variant-select0").val();

      if (numberOfAvailableOptions > 1) {
        thirdOptionVariantValue = $(".js__pdp-variant-select1").val();
      }
    }

    try {
      colorSelected = colorSelected.toLowerCase();
    } catch (_unused3) {}
  }

  function setColorSwatchOutofStock(prodColor, prodQuantity, prodAvailability) {
    if (prodQuantity < 1 && prodAvailability == "false") {
      $(".js__color-swatches[data-type-value=" + prodColor + "]").addClass("out-of-stock");
    }
  }

  $(window).scroll(function () {
    var sticky = $(".product__media-outer"),
        scroll = $(window).scrollTop();
    var pos = sticky.height();

    if (scroll >= 768 & scroll <= pos - 690) {
      sticky.addClass("fixed"); // $(".main-content").addClass("active");
    } else {
      sticky.removeClass("fixed"); // $(".main-content").removeClass("active");
    }
  }); // show para on click read More button

  $(".js__read-more_btn").click(function () {
    $(".js__read-less-content").addClass("hide");
    $(".js__read-more-content").removeClass("hide");
  });
  $(".js__read-less_btn").click(function () {
    $(".js__read-less-content").removeClass("hide");
    $(".js__read-more-content").addClass("hide");
  });
});