function smoothScroll(target,duration){
    var startPosition = window.pageXOffset;
    
    var distance = 0;
    if(target == 'NEXT'){
        var scrollWidth = document.querySelector('.horizontal-page').getBoundingClientRect().width;
        distance = scrollWidth;
    } else if (target == 'BACK') {
        var scrollWidth = document.querySelector('.horizontal-page').getBoundingClientRect().width;
        distance = -scrollWidth;
    } else {
        distance = document.getElementById(target).getBoundingClientRect().x;
    }
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
var mainNav = document.querySelector('.main-nav');

nextArrow.addEventListener('click', function(){
    smoothScroll('NEXT', 2000);
})

backArrow.addEventListener('click', function(){
    smoothScroll('BACK', 2000);
})

mainNav.addEventListener('click', function(event){
    var navigateTo = '';
    if(event.target.id < 8){
        navigateTo = `page${event.target.id}`;
    } else {
        navigateTo = 'page7';
    }
    smoothScroll(navigateTo, 2000, false);

})