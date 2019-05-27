var nextArrow = document.querySelector('.nextArrow');
var backArrow = document.querySelector('.backArrow');
var mainNav = document.querySelector('.main-nav');
var currentSection = 0;
var previousSection = 0;
toggleTextFromSection('page0');

nextArrow.addEventListener('click', function () {
    previousSection = currentSection;
    toggleTextFromSection(`page${previousSection}`)
    currentSection++;
    document.getElementById(previousSection).style.backgroundColor = '';
    document.getElementById(currentSection).style.backgroundColor = 'white';
    if (currentSection < 8) {
        navigateTo = `page${currentSection}`;
        smoothScroll(navigateTo, 2000);
    } else if (currentSection == 8) {
        navigateTo = `page7`;
        smoothScroll(navigateTo, 2000);
    } else {
        navigateTo = `page7`;
        smoothScroll(navigateTo, 2000);
        openNav();
    }
})

backArrow.addEventListener('click', function () {
    previousSection = currentSection;
    toggleTextFromSection(`page${previousSection}`);
    currentSection--;
    document.getElementById(previousSection).style.backgroundColor = '';
    document.getElementById(currentSection).style.backgroundColor = 'white';
    closeNav();
    if (currentSection == 7 || currentSection == 8) {
        navigateTo = `page7`;
        smoothScroll(navigateTo, 2000);
    } else {
        navigateTo = `page${currentSection}`;
        smoothScroll('BACK', 2000);
    }
})

mainNav.addEventListener('click', function (event) {
    previousSection = currentSection;
    toggleTextFromSection(`page${previousSection}`)
    currentSection = event.target.id;
    document.getElementById(previousSection).style.backgroundColor = '';
    document.getElementById(currentSection).style.backgroundColor = 'white';
    var navigateTo = '';
    closeNav();
    if (event.target.id < 8) {
        navigateTo = `page${event.target.id}`;
    } else {
        navigateTo = 'page7';
    }
    smoothScroll(navigateTo, 2000);
})

window.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            event.preventDefault();
            document.querySelector('.backArrow').click();
            break;
        case 39:
            event.preventDefault();
            document.querySelector('.nextArrow').click();
            break;
        case 48:
            event.preventDefault();
            document.getElementById('0').click();
            break;
        case 49:
            event.preventDefault();
            document.getElementById('1').click();
            break;
        case 50:
            event.preventDefault();
            document.getElementById('2').click();
            break;
        case 51:
            event.preventDefault();
            document.getElementById('3').click();
            break;
        case 52:
            event.preventDefault();
            document.getElementById('4').click();
            break;
        case 53:
            event.preventDefault();
            document.getElementById('5').click();
            break;
        case 54:
            event.preventDefault();
            document.getElementById('6').click();
            break;
        case 55:
            event.preventDefault();
            document.getElementById('7').click();
            break;
        case 56:
            event.preventDefault();
            document.getElementById('8').click();
            break;
        case 57:
            event.preventDefault();
            document.getElementById('9').click();
            break;
    }
};

//  TODO fake loader
setTimeout(() => {
    document.getElementById('loader').style.opacity = 0;
    setTimeout(() => {
        document.getElementById('loader-wrapper').style.opacity = 0;
        document.getElementById('loader-wrapper').style.visibility = 'hidden';
    }, 2000);
}, 1000);

function smoothScroll(target, duration) {
    var startPosition = window.pageXOffset;

    var distance = 0;
    if (target == 'NEXT') {
        var scrollWidth = document.querySelector('.horizontal-page').getBoundingClientRect().width;
        distance = scrollWidth;
    } else if (target == 'BACK') {
        var scrollWidth = document.querySelector('.horizontal-page').getBoundingClientRect().width;
        distance = -scrollWidth;
    } else {
        distance = document.getElementById(target).getBoundingClientRect().x;
    }
    var startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(run, 0);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            previousSection = currentSection;
            toggleTextFromSection(`page${currentSection}`);
            if (currentSection == 9) {
                openNav();
            }
        }
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

function toggleTextFromSection(section) {
    if (currentSection == 8) {
        section = 'page7';
    }
    var toggleSection = document.getElementById(section);
    var stepsFooter = document.getElementById('steps-footer');

    if (currentSection != 9) {
        if (toggleSection.style.opacity == 1) {
            toggleSection.style.opacity = 0;
            stepsFooter.style.opacity = 0;
        } else {
            if (currentSection != 0 && currentSection != 9) {
                stepsFooter.innerHTML = `Step ${currentSection} out of 8 on the path to digital enlightenment.`
            } else {
                stepsFooter.innerHTML = '';
            }
            toggleSection.style.opacity = 1;
            stepsFooter.style.opacity = 1;
        }
    }

    if (currentSection == 8) {
        document.getElementById('page7').innerHTML = `<div class="title center-left">
                                                        TEMPORARY<br>SACRIFICE BRINGS<br>LASTING RESULTS
                                                      </div>`;
    } else if (currentSection == 7) {
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
    document.getElementById("main").style.marginRight = "0";
}