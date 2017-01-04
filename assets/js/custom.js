window.load = main();

window.onresize = function () {
    resizeIntro();
    resizeQuestions();
}


function main() {

    var advanceButtons = document.getElementsByClassName('advance_button'),
        moneyStack = document.getElementsByClassName('money_stack'),
        backButton = document.getElementsByClassName('back_button'),
        i;

    for (i = 0; i < advanceButtons.length; i++) {
        advanceButtons[i].addEventListener('click', function () {
            advancePanel(this);
        });
    }
    
    for (i = 0; i < moneyStack.length; i++) {
        moneyStack[i].addEventListener('click', function() {
            moneyStackClick(this);
        });
    }
    
    for (i = 0; i<backButton.length; i++) {
        backButton[i].addEventListener('click', function() {
            reversePanel(this);
        });
    }

    resizeIntro();
    resizeQuestions();
    setTimeout(function () {
        document.getElementById('questions').style.display = 'none';
    }, 50);
    slider1.noUiSlider.on('set', function () {
        var question1Next = document.getElementById('q1Next');

        question1Next.style.opacity = 1;

    });
}

function resizeIntro() {

    var panel = document.getElementsByClassName('panel'),
        panelContent = document.getElementsByClassName('panel_content'),
        viewPortH = window.innerHeight,
        panelHeight,
        i;
    for (i = 0; i < panel.length; i++) {
        panel[i].style.minHeight = viewPortH + 'px';
        if (panelHeight > viewPortH) {
            console.log('test');
        }
    }
    console.log('Panels resized to ' + viewPortH);
    for (i = 0; i < panelContent.length; i++) {
        panelHeight = panelContent[i].clientHeight;
        if (panelHeight > viewPortH) {
            panelContent[i].style.position = "static";
            panelContent[i].style.top = "initial";
            panelContent[i].style.transform = "initial";
        }
    }
}

function resizeQuestions() {
    var theQuestions = document.getElementsByClassName('question'),
        questionContent = document.getElementsByClassName('question_content'),
        questionHeight,
        viewPortH = window.innerHeight,
        i;
    document.getElementById('questions').style.minHeight = viewPortH + 'px';
    for (i = 0; i < theQuestions.length; i++) {
        theQuestions[i].style.minHeight = viewPortH + 'px';
    }
    for (i = 0; i < questionContent.length; i++) {
        questionHeight = questionContent[i].clientHeight;
        if (questionHeight > viewPortH) {
            questionContent[i].style.position = "static";
            questionContent[i].style.top = "initial";
            questionContent[i].style.transform = "initial";
        } else if (questionHeight <= viewPortH) {
            questionContent[i].style.position = 'absolute';
            questionContent[i].style.top = '50%';
            questionContent[i].style.transform = 'translateY(-50%)';
            
        }
    }
}

function getStarted(e) {
    var introduction = document.getElementById('intro'),
        questions = document.getElementById('questions');
    $(introduction).fadeOut(350);
    setTimeout(function () {
        questions.style.display = 'block';
        setTimeout(function () {
            TweenLite.to(questions, .33, {
                x: '0%'
            });
        }, 50)

    }, 450)
    return false;
}

function advancePanel(e) {
    var element = e,
        elementId = element.id,
        thisQuestion = elementId.charAt(1),
        thisQuestionId = 'question' + thisQuestion,
        thisQuestionObject = document.getElementById(thisQuestionId),
        nextQuestion = parseInt(thisQuestion) + 1,
        nextQuestionId = 'question' + nextQuestion,
        nextQuestionObject = document.getElementById(nextQuestionId);
        TweenLite.to(thisQuestionObject, .33, {
            x: '-100%'
        });
        TweenLite.to(nextQuestionObject, .33, {
            x: '0%'
        });
}

function reversePanel(e) {
    var elementId = e.id,
        thisQuestion = elementId.charAt(1),
        thisQuestionId = 'question' + thisQuestion,
        thisQuestionObject = document.getElementById(thisQuestionId),
        lastQuestion = parseInt(thisQuestion) - 1,
        lastQuestionId = 'question' + lastQuestion,
        lastQuestionObject = document.getElementById(lastQuestionId);
    TweenLite.to(thisQuestionObject, .33, {
        x: '100%'
    });
    TweenLite.to(lastQuestionObject, .33, {
        x: '0%'
    });
}

function moneyStackClick(e) {
    var value = e.id,
        theNumber, 
        questionSlider,
        cash;
    theNumber = value.substr(value.length - 1);
    questionSlider = value.charAt(1);
    
    theNumber = parseInt(theNumber);
    questionSlider = parseInt(questionSlider);
    
    switch (questionSlider) {
        case 1:
            slider1.noUiSlider.set(theNumber);
            break;
        case 2:
            slider2.noUiSlider.set(theNumber);
            break;
        case 3:
            slider3.noUiSlider.set(theNumber);
            break;
        case 4:
            slider4.noUiSlider.set(theNumber);
            break;
        case 5:
            slider5.noUiSlider.set(theNumber);
            break;
    }
    if (theNumber === 5) {
        cash = new Audio('./assets/audio/money.mp3');
        cash.play();
    }
}

$(function () {
    $('a[href*=\\#]:not([href=\\#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 600);
                return false;
            }
        }
    });
});