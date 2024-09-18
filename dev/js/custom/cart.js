// tweaks these below variable if you want to show subtotal and discount
var showCartSubTotalDiscountSection = true;
var showEmptyCartIcon = false;
var showCartCountInTopNav = true;
var showProgressBar = true;
var showVendorOnCartPage = false;
// Fixed variables
var lineItemComparePrice;
var cartObject;
var cartCountEmptyValue = "0";
var boxID = "BuilderID";
var cartExtraInfo;
//extra classes for the elements
var removeExtraClass = "btn-border-black-animate";
// recharge 2020
var frequency = "";
var recurringchecked = false;
var frequency_unit = "";
//SVG icons
var removeMiniCartTextOrIcon =
    '<svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M10.485 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" fill="#fff" stroke="#3B2900" stroke-width="1.326" stroke-linecap="round" stroke-linejoin="round"/>  <path d="m13.185 7.3-5.4 5.4M7.785 7.3l5.4 5.4" stroke="#3B2900" stroke-width="1.326" stroke-linecap="round" stroke-linejoin="round"/></svg>';


var minusIcon = '<svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_2006_22860)"><path d="M0.107422 3.78121H6.96365" stroke="#3B2900" stroke-width="1.34674" stroke-linecap="round" stroke-linejoin="round"/><defs><clipPath id="clip0_2006_22860"><rect width="6.85623" height="6.89921" fill="white" transform="translate(0.107422 0.332153)"/></clipPath></defs></svg>';
var plusIcon = '<svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_942_17768)"><path d="M3.53516 0.332153V7.23136" stroke="#3B2900" stroke-width="1.34674" stroke-linecap="round" stroke-linejoin="round"/><path d="M0.107422 3.78121H6.96365" stroke="#3B2900" stroke-width="1.34674" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_942_17768"><rect width="6.85623" height="6.89921" fill="white" transform="translate(0.107422 0.332153)"/></clipPath></defs></svg>';
$(document).ready(function($) {
    reloadAjaxCartItemUsingCartAjaxObject();
    progressBar();
    quickCartTotal();
    //	window.location.href = "https://checkout.rechargeapps.com/r/checkout?myshopify_domain=XXX.myshopify.com";
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
    formData.updates[id] = newQuantity;
    // Perform the AJAX request to update the cart
    $.ajax({
        type: "POST",
        url: "/cart/update.js",
        data: formData,
        dataType: "json",
        success: function(cart) {
            // Perform any additional tasks after removing items
            $("#updates_" + id).val(newQuantity);
            getCartData(cart);
        },
        error: function(error) {
            // Handle error if the request fails
            console.error("Error updating items from the cart:", error);
        }
    });
}
/* If you need extra information like collection title, metafield etc then use this function */
function reloadAjaxCartItemUsingCartAjaxObject(data) {
    //   cartInfo(data);
    $.ajax({
        type: "GET",
        url: "/cart?view=alternate.json",
        success: function(response) {
            //extra information against the cart like collection title metafield, product title metafield, tags
            cartExtraInfo = $.parseJSON(response);
            cartInfo(data);
        },
        error: function(status) {
            console.warn("ERROR", status);
            cartInfo(data);
        },
    });
}
//RELOAD AJAX CART
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
        $(cartObject.items).each(function() {
            var imageURL = this.featured_image.url;
            //imageURL = imageURL[0] + "." + imageURL[1] + '_450x450' + "." + imageURL[2];
            var imageAlt = this.featured_image.alt;
            var itemPrice = this.original_price;
            var itemLinePriceTotal = this.line_price;
            var handle = this.handle;
            var itemID = this.id;
            var itemPriceAfterDiscount = this.discounted_price;
            var comparePrice = "";
            let disabled = "";
            let finalLineItemPrice = this.final_line_price;
            let cartBundleBoxID = "";
            let boolPromoOffer = false;
            let productTitle = this.product_title;
            let url = this.url;
            let itemProperties = "";
            let itemPropertiesElement = "";
            var boolItemBoxType = false;
            var hideElementClass = "";
            var readonly = "";
            var justifyCenter = "";
            let sellingPlayInformation = "";

            if (this.selling_plan_allocation != undefined) {
                sellingPlayInformation = this.selling_plan_allocation.selling_plan.name;
            }
            if (this.properties != null) {
                itemProperties = this.properties;
                if (Object.keys(itemProperties).length > 0) {
                    $.each(itemProperties, function(key, value) {
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
                    $.each(itemProperties, function(key, value) {
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
                                itemPropertiesElement +=
                                    "<li class='flex'><span>" +
                                    key +
                                    ": </span><span style='padding-left: 5px'>" +
                                    value +
                                    "</span>";
                                itemPropertiesElement += "</li>";
                            } else {
                                itemPropertiesElement +=
                                    "<li class='flex'><span>" +
                                    key +
                                    ": </span><span style='padding-left: 5px'>" +
                                    value +
                                    "</span>";
                                itemPropertiesElement += "</li>";
                            }
                        }
                        // Recharge - when subscription is via properties for older recharge version before November 2020
                        recharge2020(key, value);
                    });
                    // Recharge 2020, check if it's a subscription, then bind the value in the UL
                    if (recurringchecked) {
                        itemPropertiesElement +=
                            "<li class='flex'><span>Recurring Delivery every " +
                            frequency +
                            " " +
                            frequency_unit +
                            ". Change or cancel anytime</span>";
                        itemPropertiesElement += "</li>";
                    }
                    itemPropertiesElement += "</ul>";
                } else {
                    //itemPropertiesElement = "";
                }
            }

            var rechargeSelected = this.selling_plan_allocation;

            var rechargeDropdown = "";
            /* Loop through cartExtraInformation section */
            $(cartExtraInfo.items).each(function(key, value) {
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



                    productTitle =
                        "<h5> <a href='" +
                        url +
                        "' id='product-card-" +
                        this.id +
                        "' tabindex='0'>" +
                        value.product_title.split("with")[0] +
                        " </a></h5>";
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
            }
            // total compared price for the item with quantity
            var totalListItemComparePrice = formatter.format((comparePrice * this.quantity) / 100);
            // item original price
            var formattedItemPrice = formatter.format(itemPrice / 100);
            // line price
            var formattedItemLinePriceTotal = formatter.format(itemLinePriceTotal / 100);
            //final line item price
            var formattedFinalLineItemPrice = formatter.format(finalLineItemPrice / 100);
            //Price after discount
            let showPrice = "";
            let itemPriceAfterDiscountStatus = false;
            let discountedMessage = "";
            let discountedMessageElement = "";
            if (this.discounts != null) {
                discountedMessage = this.discounts;
                if (Object.keys(discountedMessage).length > 0) {
                    //console.log("DISCOUNT EXISTS");
                    discountedMessageElement = "<span class='discountedMessage'>";
                    $.each(discountedMessage, function(key, value) {
                        discountedMessageElement += value.title;
                    });
                    discountedMessageElement += "</span>";
                }
            }
            var formattedItemPriceAfterDiscount = formatter.format(itemPriceAfterDiscount / 100);
            // if itemPriceAfterDiscount > 0 then set the status to true so you can interchange the values
            if (this.discounts.length > 0) {
                itemPriceAfterDiscountStatus = true;
            }
            // if it's true; then show the compared price as the main price this.price and main price as discounted price
            if (itemPriceAfterDiscountStatus) {
                //comparePriceHtml
                showPrice =
                    '<span class="price-wrapper js__raw-line-item-price"  data-attr-compare-price="0"><s>' +
                    formattedItemPrice +
                    '</s><span class="price" data-key="' +
                    itemID +
                    '">' +
                    formattedItemPriceAfterDiscount +
                    "</span><span class='forMiniCart'>" +
                    formattedFinalLineItemPrice +
                    "</span></span>" +
                    discountedMessageElement;
            } else {
                showPrice =
                    '<span class="price-wrapper js__raw-line-item-price"  data-attr-compare-price="0">' +
                    comparePriceHtml +
                    '<span class="price" data-key="' +
                    itemID +
                    '">' +
                    formattedItemPrice +
                    "</span><span class='forMiniCart'>" +
                    formattedFinalLineItemPrice +
                    "</span></span>";
            }
            /* check if variantTitle is NULL, then don't show variant */
            var variantTitle = this.variant_title;
            if (variantTitle == null) {
                variantTitle = "";
            }
            var variantData = "";
            $.each(this.options_with_values, function(key, value) {
                //console.log("key" + key);console.log("value" + value["name"]);console.log("value" + value["value"]);
                variantData +=
                    "<li><span>" + value["name"] + ": " + value["value"].split("with")[0] + "</span></li>";
            });
            /* CUSTOM - if the product title contains "bag",  then disabled the quantity element
                To be applied for all the products with BoxID and Promo Offer
                */
            if (
                (this.product_title.toLowerCase().indexOf("bag") >= 0 &&
                    cartBundleBoxID != "") ||
                (this.product_title.toLowerCase().indexOf("bag") >= 0 && boolPromoOffer)
            ) {
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
            let removeAnchorElement =
                '<div class="remove js__cart-item-remove ' +
                removeExtraClass +
                '" data-cart-line-count="' +
                lineCount +
                '" data-variant-id="' +
                itemID +
                '"  data-cart-remove-variant="' +this.id + '">' +
                removeMiniCartTextOrIcon +
                '</div>';
            //quantity element
            var quantityElement =
                '<div class="cart-quantity-outer ' +
                disabled +
                justifyCenter +
                '"> <a  tabindex="0"  class="minus-qty ' +
                hideElementClass +
                '  font-zero" date-type="minus" onclick="updateCartQuantity(this)"   data-variant-id="' +
                itemID +
                '">' +
                minusIcon +
                '</a> <input aria-label="Quantity"  tabindex="-1"  data-limit="' +
                boolItemBoxType +
                '"  ' +
                readonly +
                '   onkeydown="return isNumeric(event);" type="text"  data-attr-raw-variant-quantity="94" data-cart-line-count="' +
                lineCount +
                '" class="cart__quantity-selector js__cart__quantity-selector" name="updates[]" id="updates_' +
                itemID +
                '" value="' +
                this.quantity +
                '" maxlength="3" size="3"> <a  tabindex="0"  class="plus-qty ' +
                hideElementClass +
                '  font-zero" date-type="plus" onclick="updateCartQuantity(this)"     data-variant-id="' +
                itemID +
                '">' +
                plusIcon +
                "</a> </div>";
            //vendor element
            let vendorElement =
                '<span class="subheading uppercase">' + this.vendor + "</span>";
            var lineItem;
            lineItem =
                '<li class="flex-wrap js__cart-table-item-row" data-cart-line-count=' +
                lineCount +
                ' data-handle="' +
                handle +
                '" data-variant-id=' +
                itemID +
                '><div class="image-section"> <a href="' +
                url +
                '"><img alt="' +
                imageAlt +
                '" src="' +
                imageURL +
                '""> </a> </div>';
            lineItem +=
                '<div class="content"><div class="title-section">' +
                productTitle +
                removeAnchorElement +
                "";
            if (sellingPlayInformation != "") {
                lineItem += '<p class="capitalize">' + sellingPlayInformation + "</p>";
            }
            if (itemPropertiesElement != "") {
                lineItem += '<p class="capitalize">' + itemPropertiesElement + "</p>";
            }
            if (variantTitle != "") {
                lineItem += "<ul>" + variantData + "</ul>";
            }
            lineItem +=
                showPrice +
                '</div><div class="flex-space-between"><p class="hide">Qty ' +
                this.quantity +
                "</p>" +
                quantityElement;
            lineItem +=
                "<span class='price'>" +
                formattedItemPriceAfterDiscount +
                comparePriceHtml +
                "</span></div>" + rechargeDropdown + "</div>";
            lineItem += "</li>";
            /* Bind the line item to the list */
            $(".js__ajax-products-bind").append(lineItem);
            /*******LINE ITEM FOR THE CART PAGE********/
            if ($(".cart-list")[0]) {
                var cartLineItem = "";
                cartLineItem =
                    '<div class="cart-list__items cart-table-body js__cart-table-item-row flex" data-cart-line-count="' +
                    lineCount +
                    '" data-attr-compare-price="" data-variant-id="' +
                    itemID +
                    '"><div class="cart-list__items__columns"><div class="image-section "><img class="img-responsive img-thumbnail item-image" src="' +
                    imageURL +
                    '" alt="' +
                    imageAlt +
                    '"></div> <div class="content">';
                // show vendor on cart page
                if (showVendorOnCartPage) {
                    cartLineItem += vendorElement;
                }
                cartLineItem += productTitle;
                cartLineItem += '<div class="cart-list__variant-properties">';
                if (sellingPlayInformation != "") {
                    cartLineItem +=
                        '<span class="capitalize">' + sellingPlayInformation + "</span>";
                }
                if (itemPropertiesElement != "") {
                    cartLineItem +=
                        '<span class="capitalize">' + itemPropertiesElement + "</span>";
                }
                if (variantTitle != "") {
                    cartLineItem += "<ul>" + variantData + "</ul>";
                }
                cartLineItem += "</div>";
                cartLineItem +=
                    '  </div>  </div>  <div class="cart-list__items__columns">';
                cartLineItem += showPrice;
                cartLineItem += "</div>";
                cartLineItem +=
                    '<div class="cart-list__items__columns quantity" data-variant-id="' +
                    itemID +
                    '"> ' +
                    quantityElement +
                    '  <span class="js__out-of-stock"></span>';
                // ** Remove action is added here too
                 cartLineItem += "</div>";
               // cartLineItem += "</div><div class='cart-list__items__columns recharge ' > " + rechargeDropdown + " </div>";
                cartLineItem +=
                    '<a class="remove" data-cart-line-count="' +
                    lineCount +
                    '" data-variant-id="' +
                    itemID +
                    '" href="javascript:;"></a><div class="cart-list__items__columns total-price " data-head="Total"> <span class="price-wrapper js__set-line-item-price" data-attr-price="' +
                    itemPrice +
                    '" data-attr-compare-price=' +
                    totalListItemComparePrice +
                    '><s class="hide">' +
                    totalListItemComparePrice +
                    '</s><span class="price" data-key="' +
                    itemID +
                    '">' +
                    formattedItemLinePriceTotal +
                    "</span> </span>";
                // ** Remove element is added here too
                cartCountEmptyValue += ' </div></div>';
                $(".cart-list").append(cartLineItem);
            }
            lineCount++;
        });
    }

}
//CALCULATE TOTAL OF THE CART
function quickCartTotal(data) {
    if (data == undefined) {
        cartObject = CartJS.cart;
    } else {
        cartObject = data;
    }
    let total = cartObject.items_subtotal_price;
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
$(document).on("click", ".remove", function() {
    var variantID = parseInt($(this).attr("data-variant-id"));
    var clickedLineItemCount = parseInt($(this).attr("data-cart-line-count"));
    var currentLoopItemCount = 1;
    // console.log(variantID);
    var boxID = "BuilderID";
    var itemsToRemove = [];
    var formData = {
        updates: {}
    };
    $.getJSON("/cart.js", function(cart) {
        var savedItemPropertyBoxID = "";
        // console.log(cart.items.length);
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
                        savedItemPropertyBoxID = currentItem.properties[boxID];
                        // console.log("Saved Item Property Box ID:", savedItemPropertyBoxID);
                        break;
                    } else {
                        // it doesn't has the BoxID, then delete the particular LineItem
                        // console.log("Current Line Item - With no BoxID")
                        itemsToRemove.push(currentItem.variant_id);
                    }
                }
            }
            currentLoopItemCount = currentLoopItemCount + 1;
        }
        // Loop through cart items to find items with matching BoxID
        for (var j = 0; j < cart.items.length; j++) {
            var currentItem = cart.items[j];
            if (currentItem.properties && currentItem.properties[boxID] === savedItemPropertyBoxID) {
                itemsToRemove.push(currentItem.variant_id);
                //console.log("Item Variant ID to Remove:", currentItem.variant_id);
            }
        }
        // console.log(itemsToRemove);
        // console.log(itemsToRemove.length);
        // Call the function to remove items from the cart
        removeItemsFromCart(itemsToRemove);
        // Remove items from the cart
    });
});

$(document).on("change", ".js__cart-plan", function() {

        var lineCount = $(this).attr("id").replace('planID', "");
        var lineQuantity = $(this).attr("data-qty");
        var rechargeValue = $(this).val();


        if (rechargeValue == "One Time Purchase") {

            CartJS.updateItem(
                lineCount,
                lineQuantity, {
                    selling_plan: "",
                }, {
                    success: function(data, textStatus, jqXHR) {

                    },
                    error: function(jqXHR, textStatus, errorThrown) {

                    },
                }
            );
        } else {
            CartJS.updateItem(

                lineCount,
                lineQuantity, {
                    selling_plan: parseInt(rechargeValue),
                }, {
                    success: function(data, textStatus, jqXHR) {

                    },
                    error: function(jqXHR, textStatus, errorThrown) {

                    },
                }
            );

        }
        // rechargeDropdown = "<select id='planID" + lineCount + "' data-qty=" + this.quantity + " class='custom-dropdown-select js__cart-plan'><option value=" + value.product_rechargeID + " selected>" + value.product_rechargeName + "</option><option value='One Time Purchase'>One Time Purchase</option></select>";


    })
    // Function to remove items from the cart
function removeItemsFromCart(itemsToRemove) {
    var formData = {
        updates: {}
    };
    // Populate the formData with variant IDs to remove
    for (var k = 0; k < itemsToRemove.length; k++) {
        var variantID = itemsToRemove[k];
        formData.updates[variantID] = 0;
    }
    $.ajax({
        type: "POST",
        url: "/cart/update.js",
        data: formData,
        dataType: "json",
        success: function(cart) {
            getCartData(cart);
        },
        error: function(error) {
            // Handle error if the request fails
            console.error("Error removing items from the cart:", error);
        }
    });
}





function getCartData() {
    $.getJSON("/cart.js", function(cart) {
        cartInfo(cart);
        progressBar();
        setTimeout(function() {
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
                    "Content-Type": "application/json",
                },
            })
            .then((res) => res.json())
            .then((data) => {
                totalAmount = data.total_price / 100;
                var freeShippingAmount = parseFloat(
                    $(".js__free-shipping-limit").html()
                );
               
                $(".js__free-shipping__icon").removeClass("active");
                $(".js__free-gift-1__icon").removeClass("active");
                $(".js__free-gift-2__icon").removeClass("active");
                $(".js__gift-products").addClass("hide")
                $(".js__gift-products-1").addClass("hide")
                $(".js__gift-products-2").addClass("hide")
                shippingGrandTotal = freeShippingAmount;
                var freeShippingRemaningAmount = freeShippingAmount - totalAmount;
                var freeShippingPercentage = 100;
                if (freeShippingRemaningAmount > 0) {
                    freeShippingPercentage = (totalAmount * 100) / freeShippingAmount;
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
                $(".js__free-shipping-remaning-amount").html(
                    formatter.format(freeShippingRemaningAmount)
                );
                $(".js__free-shipping__progress-bar").attr(
                    "data-percentage",
                    freeShippingPercentage
                );

                
               
                
                /*Free gift 1 */
                if (freeShippingPercentage == 100) {

                    $(".js__free-shipping__icon").addClass("active");
                   
                }



              

                var shippingGrandRemaningAmount = shippingGrandTotal - totalAmount;
                var shippingGrandPercentage = 100;
                if (shippingGrandRemaningAmount > 0) {

                    shippingGrandPercentage = (totalAmount * 100) / shippingGrandTotal;


                }
                $(".js__grandtotal-shipping").attr(
                    "data-percentage",
                    shippingGrandPercentage
                );
                $(".js__grandtotal-shipping").css("width", shippingGrandPercentage + "%");

            });
    }
}

function removeFreeGift(variantID) {

    fetch("/cart.js", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            $(cartObject.items).each(function() {
                var itemID = this.id;
                if (itemID == variantID) {
                    var formData = {
                        updates: {}
                    }



                    formData.updates[variantID] = 0;





                    $.ajax({
                        type: "POST",
                        url: "/cart/update.js",
                        data: formData,
                        dataType: "json",
                        success: function(cart) {
                            getCartData(cart);
                        },
                        error: function(error) {
                            // Handle error if the request fails
                            console.error("Error removing items from the cart:", error);
                        }
                    });
                }

            })
        })

}
$(document).ready(function($) {
    $(document).on("click", ".js__freegift-add-to-cart", function(e) {

        $(this).addClass("clicked");
        var giftNumber = $(this).attr("data-gift-number");
        var variantID = $(this).attr("data-attr-variantid");
        addFreeGift(variantID, giftNumber)
    })
})


function addFreeGift(variantID, giftnumber) {
    var selectedVariantID = variantID;
    var quantity = 1;
    let items = [];
    items.push({
        id: selectedVariantID,
        quantity: quantity,
        "properties[_FreeGift]": giftnumber,
    });




    CartJS.addItems(items, {
        success: function(response, textStatus, jqXHR) {
            getCartData()


            $(".js__gift-" + selectedVariantID).addClass("hide");
            $(".js__gift-" + selectedVariantID).find(".js__freegift-add-to-cart").removeClass("clicked");
        },
        // Define an error callback to display an error message.
        error: function(jqXHR, textStatus, errorThrown) {
            showCartErrorMessage();
        },
    });



}
$(document).ready(function($) {


    $(".js__addon-add-to-cart").click(function() {
        let quantity = 1;
        let addonSelectedVariantID = $(this).attr("data-attr-variantid");
        cartAddItemAddon(addonSelectedVariantID, quantity);
    });
    $(".js__addon-add-to-cart").keypress(function() {
        var keycode = event.keyCode || event.which;
        if (keycode == "13") {
            event.preventDefault();
            let quantity = 1;
            let addonSelectedVariantID = $(this).attr("data-attr-variantid");
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
    CartJS.addItem(
        addonSelectedVariantID,
        addonQuantity, {}, {
            success: function(data, textStatus, jqXHR) {
                //console.log("success");
                /* Pending - Remove the selected addon when add to cart is clicked */
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.log("error");
            },
        }
    );
}

function addons() {
    //console.log("addons");
    /*Hide repeating addons*/
    var cartAddons = "";
    $(".js__top-cart-addons li").each(function(index) {
        // update this with variantID
        var addoneHandle = $(this).attr("data-handler");
        // if cartAddon is null,
        if (cartAddons == "") {
            // save the addonHandle
            cartAddons = addoneHandle;
        } else {
            //set bool value to see if the addons is present in the addon list or not
            // by default it's false
            var boolCartAddons = false;
            // going through the string and checking if the current addon handle = the addon
            //handle present in the string
            var cartAddons2 = cartAddons.split(",");
            for (var a = 0; a < cartAddons2.length; a++) {
                if ($(this).attr("data-handler") == cartAddons2[a]) {
                    // if present, then hide it
                    $(this).hide();
                    boolCartAddons = true;
                }
            }
            // add the new addon handle to the string
            if (boolCartAddons == false) {
                cartAddons = cartAddons + "," + addoneHandle;
            }
        }

        /* Hide the addons from the addon list, if the addon is present in the cart */
        var boolItemCartAddon = false;
        $(".js__ajax-products-bind li").each(function(index) {
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
    $(".js__top-cart-addons li").each(function(index) {
        if ($(this).css("display") != "none") {
            boolAddonExist = true;
        }
    });
    //console.log("boolAddonExist"+boolAddonExist);
    if (boolAddonExist == false) {
        //console.log("if");
        $(".js__freq-bought-products").hide();
    } else {
        //console.log("else");
        $(".js__freq-bought-products").show();
    }
}
//Addons are fetched from the schemas; Varies from theme to theme
setTimeout(function() {
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