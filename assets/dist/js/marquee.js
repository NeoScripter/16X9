
function initMarquee() {
    $(".marquee__slide").marquee({
        duration: 20000,
        gap: 0,
        delayBeforeStart: 0,
        direction: "right",
        duplicated: true,
        startVisible: true
    });
}

$ = jQuery.noConflict();
$(document).ready(function($) {
    initMarquee();
 })
