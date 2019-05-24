function smoothScroll(duration,moveNext){
    var scrollWidth = document.querySelector('.horizontal-page').getBoundingClientRect().width;;
    var startPosition = window.pageXOffset;
    var distance = moveNext ? scrollWidth : -scrollWidth;
    var startTime = null;

    function animation(currentTime){
        if(startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(run, 0);
        if(timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d){
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

var nextArrow = document.querySelector('.nextArrow');
var backArrow = document.querySelector('.backArrow');

nextArrow.addEventListener('click', function(){
    smoothScroll(2000, true);
})

backArrow.addEventListener('click', function(){
    smoothScroll(2000, false);
})