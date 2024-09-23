/*! Lity - v2.4.1 - 2020-04-26
* http://sorgalla.com/lity/
* Copyright (c) 2015-2020 Jan Sorgalla; Licensed MIT */
!function(e,t){"function"==typeof define&&define.amd?define(["jquery"],(function(n){return t(e,n)})):"object"==typeof module&&"object"==typeof module.exports?module.exports=t(e,require("jquery")):e.lity=t(e,e.jQuery||e.Zepto)}("undefined"!=typeof window?window:this,(function(e,t){"use strict";var n=e.document,i=t(e),r=t.Deferred,o=t("html"),a=[],l="aria-hidden",s="lity-"+l,d='a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',c={esc:!0,handler:null,handlers:{image:C,inline:function(e,n){var i,r,o;try{i=t(e)}catch(e){return!1}if(!i.length)return!1;return r=t('<i style="display:none !important"></i>'),o=i.hasClass("lity-hide"),n.element().one("lity:remove",(function(){r.before(i).remove(),o&&!i.closest(".lity-content").length&&i.addClass("lity-hide")})),i.removeClass("lity-hide").after(r)},youtube:function(e){var n=f.exec(e);if(!n)return!1;return k(x(e,w("https://www.youtube"+(n[2]||"")+".com/embed/"+n[4],t.extend({autoplay:1},b(n[5]||"")))))},vimeo:function(e){var n=y.exec(e);if(!n)return!1;return k(x(e,w("https://player.vimeo.com/video/"+n[3],t.extend({autoplay:1},b(n[4]||"")))))},googlemaps:function(e){var t=v.exec(e);if(!t)return!1;return k(x(e,w("https://www.google."+t[3]+"/maps?"+t[6],{output:t[6].indexOf("layer=c")>0?"svembed":"embed"})))},facebookvideo:function(e){var n=p.exec(e);if(!n)return!1;0!==e.indexOf("http")&&(e="https:"+e);return k(x(e,w("https://www.facebook.com/plugins/video.php?href="+e,t.extend({autoplay:1},b(n[4]||"")))))},iframe:k},template:'<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'},u=/(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,f=/(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,y=/(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,v=/((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,p=/(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,m=function(){var e=n.createElement("div"),t={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in t)if(void 0!==e.style[i])return t[i];return!1}();function h(e){var t=r();return m&&e.length?(e.one(m,t.resolve),setTimeout(t.resolve,500)):t.resolve(),t.promise()}function g(e,n,i){if(1===arguments.length)return t.extend({},e);if("string"==typeof n){if(void 0===i)return void 0===e[n]?null:e[n];e[n]=i}else t.extend(e,n);return this}function b(e){for(var t,n=decodeURI(e.split("#")[0]).split("&"),i={},r=0,o=n.length;r<o;r++)n[r]&&(i[(t=n[r].split("="))[0]]=t[1]);return i}function w(e,n){return e+(e.indexOf("?")>-1?"&":"?")+t.param(n)}function x(e,t){var n=e.indexOf("#");return-1===n?t:(n>0&&(e=e.substr(n)),t+e)}function C(e,n){var i=n.opener()&&n.opener().data("lity-desc")||"Image with no description",o=t('<img src="'+e+'" alt="'+i+'"/>'),a=r(),l=function(){var e;a.reject((e="Failed loading image",t('<span class="lity-error"></span>').append(e)))};return o.on("load",(function(){if(0===this.naturalWidth)return l();a.resolve(o)})).on("error",l),a.promise()}function k(e){return'<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen allow="autoplay; fullscreen" src="'+e+'"/></div>'}function E(){return n.documentElement.clientHeight?n.documentElement.clientHeight:Math.round(i.height())}function j(e){var t=z();t&&(27===e.keyCode&&t.options("esc")&&t.close(),9===e.keyCode&&function(e,t){var i=t.element().find(d),r=i.index(n.activeElement);e.shiftKey&&r<=0?(i.get(i.length-1).focus(),e.preventDefault()):e.shiftKey||r!==i.length-1||(i.get(0).focus(),e.preventDefault())}(e,t))}function D(){t.each(a,(function(e,t){t.resize()}))}function z(){return 0===a.length?null:a[0]}function T(e,d,u,f){var y,v,p,m,b=this,w=!1,x=!1;d=t.extend({},c,d),v=t(d.template),b.element=function(){return v},b.opener=function(){return u},b.options=t.proxy(g,b,d),b.handlers=t.proxy(g,b,d.handlers),b.resize=function(){w&&!x&&p.css("max-height",E()+"px").trigger("lity:resize",[b])},b.close=function(){if(w&&!x){var e;x=!0,(e=b).element().attr(l,"true"),1===a.length&&(o.removeClass("lity-active"),i.off({resize:D,keydown:j})),((a=t.grep(a,(function(t){return e!==t}))).length?a[0].element():t(".lity-hidden")).removeClass("lity-hidden").each((function(){var e=t(this),n=e.data(s);n?e.attr(l,n):e.removeAttr(l),e.removeData(s)}));var d=r();if(f&&(n.activeElement===v[0]||t.contains(v[0],n.activeElement)))try{f.focus()}catch(e){}return p.trigger("lity:close",[b]),v.removeClass("lity-opened").addClass("lity-closed"),h(p.add(v)).always((function(){p.trigger("lity:remove",[b]),v.remove(),v=void 0,d.resolve()})),d.promise()}},y=function(e,n,i,r){var o,a="inline",l=t.extend({},i);return r&&l[r]?(o=l[r](e,n),a=r):(t.each(["inline","iframe"],(function(e,t){delete l[t],l[t]=i[t]})),t.each(l,(function(t,i){return!i||!(!i.test||i.test(e,n))||(!1!==(o=i(e,n))?(a=t,!1):void 0)}))),{handler:a,content:o||""}}(e,b,d.handlers,d.handler),v.attr(l,"false").addClass("lity-loading lity-opened lity-"+y.handler).appendTo("body").focus().on("click","[data-lity-close]",(function(e){t(e.target).is("[data-lity-close]")&&b.close()})).trigger("lity:open",[b]),m=b,1===a.unshift(m)&&(o.addClass("lity-active"),i.on({resize:D,keydown:j})),t("body > *").not(m.element()).addClass("lity-hidden").each((function(){var e=t(this);void 0===e.data(s)&&e.data(s,e.attr(l)||null)})).attr(l,"true"),t.when(y.content).always((function(e){p=t(e).css("max-height",E()+"px"),v.find(".lity-loader").each((function(){var e=t(this);h(e).always((function(){e.remove()}))})),v.removeClass("lity-loading").find(".lity-content").empty().append(p),w=!0,p.trigger("lity:ready",[b])}))}function O(e,i,r){e.preventDefault?(e.preventDefault(),e=(r=t(this)).data("lity-target")||r.attr("href")||r.attr("src")):r=t(r);var o=new T(e,t.extend({},r.data("lity-options")||r.data("lity"),i),r,n.activeElement);if(!e.preventDefault)return o}return C.test=function(e){return u.test(e)},O.version="2.4.1",O.options=t.proxy(g,O,c),O.handlers=t.proxy(g,O,c.handlers),O.current=z,t(n).on("click.lity","[data-lity]",O),O}));