
function initMarquee() {
    const slides = $(".marquee__slide");
    const totalLines = slides.length;
    
    const centerIndex = Math.floor(totalLines / 2);

    const fastestDuration = 30000; 
    const slowestDuration = 60000; 

    const step = (slowestDuration - fastestDuration) / centerIndex;

    slides.each(function(index) {
        const distanceFromCenter = Math.abs(centerIndex - index);
        const lineDuration = fastestDuration + (distanceFromCenter * step);

        $(this).marquee({
            duration: lineDuration,
            gap: 0,
            delayBeforeStart: 0,
            direction: "left",
            duplicated: true,
            startVisible: true
        });
    });
}

$ = jQuery.noConflict();
$(document).ready(function($) {
    initMarquee();
 })
