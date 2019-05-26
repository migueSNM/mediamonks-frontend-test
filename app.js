var nextArrow = document.querySelector('.nextArrow');
var backArrow = document.querySelector('.backArrow');
var mainNav = document.querySelector('.main-nav');
var currentSection = 0;
var previousSection = 0;
toggleTextFromSection('page0');

nextArrow.addEventListener('click', function(){
    previousSection = currentSection;
    currentSection++;
    toggleTextFromSection(`page${previousSection}`)
    if(currentSection < 9) {
        smoothScroll('NEXT', 2000);
    } else {
        navigateTo = `page${currentSection}`;
        smoothScroll(navigateTo, 2000);
        openNav();
    }
})

backArrow.addEventListener('click', function(){
    previousSection = currentSection;
    currentSection--;
    toggleTextFromSection(`page${previousSection}`)
    closeNav();
    smoothScroll('BACK', 2000);
})

mainNav.addEventListener('click', function(event){
    previousSection = currentSection;
    toggleTextFromSection(`page${previousSection}`)
    currentSection = event.target.id;
    var navigateTo = '';
    closeNav();
    if(event.target.id < 8){
        navigateTo = `page${event.target.id}`;
    } else {
        navigateTo = 'page7';
    }
    smoothScroll(navigateTo, 2000);
})

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
        if(timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            previousSection = currentSection;
            toggleTextFromSection(`page${currentSection}`);
            if(currentSection == 9){
                openNav();
            }
        }
    }

    function ease(t, b, c, d){
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

function toggleTextFromSection(section){
    if(currentSection == 8){
        section = 'page7';
    }
    var toggleSection = document.getElementById(section);
    
    if(currentSection != 9){
        if(toggleSection.style.opacity == 1) {
            toggleSection.style.opacity = 0;
        } else {
            toggleSection.style.opacity = 1;
        }
    }

    if(currentSection == 8){
        document.getElementById('page7').innerHTML = `<div class="title center-left">
                                                        TEMPORARY<br>SACRIFICE BRINGS<br>LASTING RESULTS
                                                      </div>`;
    } else if (currentSection == 7){
        document.getElementById('page7').innerHTML = `<div class="title center-left">
                                                        TAKE PRIDE IN YOUR WORK<br>BUT DO NOT<br>SEEK PRAISE
                                                      </div>`;
    }
}

function openNav() {
    document.getElementById("page9").style.width = "90%";
    document.getElementById("main").style.marginRight = "90%";
}

function closeNav() {
    document.getElementById("page9").style.width = "0";
    document.getElementById("main").style.marginRight= "0";
}