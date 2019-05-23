function smoothScroll(target,duration){
    var target = document.querySelector(target);
    //  TODO fix this
    var targetPosition = target.getBoundingClientRect().x;
    var startPosition = window.pageXOffset;
    var distance = targetPosition - startPosition;
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


var page1 = document.querySelector('.page1');
var page2 = document.querySelector('.page2');
var nextArrow = document.querySelector('.nextArrow');
var backArrow = document.querySelector('.backArrow');
var currentSection = 0;

page1.addEventListener('click', function(){
    smoothScroll('.page2', 2000);
});

page2.addEventListener('click', function(){
    smoothScroll('.page1', 2000);
})

//  TODO reuse arrows code
nextArrow.addEventListener('click', function(currentSection){
    //  TODO remove hardcode
    var nextSection = `.page2`
    smoothScroll(nextSection, 2000);
    currentSection++;
})

backArrow.addEventListener('click', function(currentSection){
    //  TODO remove hardcode
    var nextSection = `.page1`
    smoothScroll(nextSection, 2000);
    currentSection++;
})