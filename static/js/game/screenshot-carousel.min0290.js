"use strict";var ScreenshotCarousel={init:function(){var a="",b="";$(".screen-list").each(function(){var c=$(this).closest(".screen-wrapper");a=c.find(".thumbnail-large").outerWidth(true);if(c.find(".screen-list a").length>1){c.find(".screen-list").css({left:-a});c.find(".screen-list a:first").before(c.find(".screen-list a:last"));}});$(".screen-wrapper .next").click(function(){b=$(this).closest(".screen-wrapper");var c=parseInt($(".screen-list").css("left"))-a;b.find(".screen-list:not(:animated)").animate({left:c},300,function(){b.find(".screen-list a:last").after(b.find(".screen-list a:first"));b.find(".screen-list").css({left:-a});});});$(".screen-wrapper .prev").click(function(){b=$(this).closest(".screen-wrapper");var c=parseInt($(".screen-list").css("left"))+a;b.find(".screen-list:not(:animated)").animate({left:c},300,function(){b.find(".screen-list a:first").before(b.find(".screen-list a:last"));b.find(".screen-list").css({left:-a});});});}};$(function(){ScreenshotCarousel.init();});