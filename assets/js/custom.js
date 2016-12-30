//Run First

$(document).ready(function () {

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
            cash = new Audio('http://localhost:9888/audio/money.mp3');
            cash.play();
        }
    }

    var moneyStack = document.getElementsByClassName('money_stack');

    for (var i = 0; i < moneyStack.length; i++) {
        moneyStack[i].addEventListener('click', function () {
            moneyStackClick(this);
        });
    }

    var question1 = document.getElementById('question1'),
        question2 = document.getElementById('question2'),
        question3 = document.getElementById('question3'),
        question4 = document.getElementById('question4'),
        question5 = document.getElementById('question5');

    //Resizes divs with the class "panel" to be full width and heighth
    resizeDiv();
    //Resizes the Question panels to be full width and heighth
    resizeQuestion();

    document.getElementById('start').addEventListener('click', getStarted);

    //Advances to Question 2

    document.getElementById('question1Next').addEventListener('click', function () {
        TweenLite.to(question1, .33, {
            x: '-100%'
        });

        TweenLite.to(question2, .33, {
            x: '0%'
        });

        //Sets the number of the question
        theQuestion = 2;
        //Adjusts progress bar
        setProgress();
    });

    document.getElementById('question2Next').addEventListener('click', function () {
        //Slides Question 2 to the far left

        TweenLite.to(question2, .33, {
            x: '-100%'
        });

        TweenLite.to(question3, .33, {
            x: '0%'
        });

        //Sets the number of the question for navigation
        theQuestion = 3;
        //Updates progress bar
        setProgress();
    });

    //Advances to Question 4

    document.getElementById('question3Next').addEventListener('click', function () {
        //Slides question 3 to the far left
        TweenLite.to(question3, .33, {
            x: '-100%'
        });

        TweenLite.to(question4, .33, {
            x: '0%'
        });

        //Sets the number of the question for navigation
        theQuestion = 4;
        //Updates the progress bar
        setProgress();
    });

    //Advances to Question 5

    document.getElementById('question4Next').addEventListener('click', function () {
        //Slides question 4 to the far left

        TweenLite.to(question4, .33, {
            x: '-100%'
        });

        TweenLite.to(question5, .33, {
            x: '0%'
        });

        //Updates the number of the question for navigation
        theQuestion = 5;
        //Updates the progress bar
        setProgress();
        finishAssessment();
    })

    //Toggles the question back one number

    var prevQuestion = document.getElementsByClassName('previousQuestion');

    for (var i = 0; i < prevQuestion.length; i++) {
        prevQuestion[i].addEventListener('click', function () {
            currentQuestion = '#question' + theQuestion;
            //Creates a variable for what the previous question is
            lastQuestion = '#question' + (theQuestion - 1);

            var currentQuestion1 = document.getElementById('question' + theQuestion),
                lastQuestion1 = document.getElementById('question' + (theQuestion - 1));

            TweenLite.to(currentQuestion1, .33, {
                x: '100%'
            });

            TweenLite.to(lastQuestion1, .33, {
                x: '0%'
            });

            //Sets the current question number to the correct number for navigation
            theQuestion = theQuestion - 1;
            //Updates the progress bar
            setProgress();
        });
    }


    //Fades in the next question button when a value is set with the slider

    slider1.noUiSlider.on('set', function () {
        var question1Next = document.getElementById('question1Next');

        question1Next.style.opacity = 1;
        question1Next.style.visibility = 'visible'

    });

    //Finishes the quiz and fades in the Peer Validation

    document.getElementById('question5Finish').addEventListener('click', function () {
        var shareValidation = document.getElementById('shareValidation'),
            questions = document.getElementById('questions');

        //        TweenLite.to(question5, .33, {x: '-100%'});

        TweenLite.to(questions, .33, {
            opacity: 0
        });

        shareValidation.style.display = 'block';

        //Sets the values on the score card based on the user's selections
        setValues();

        setTimeout(function () {
            TweenLite.to(shareValidation, .33, {
                x: '0%'
            });
            document.getElementById('questions').style.display = 'none';
        }, 500);
    });

    //Fires the Send to Friends function when clicked and slides the panel out to the left. Fades in the score card.

    document.getElementById('friendSubmit').addEventListener('click', sendFriends);

    //When Opt Out is clicked, email sending is skipped and score card fades in

    document.getElementById('optOut').addEventListener('click', function () {
        var shareValidate = document.getElementById('shareValidation'),
            scoreCard = document.getElementById('scoreCard');
        TweenLite.to(shareValidate, .33, {
            x: '-100%'
        });
        scoreCard.style.opacity = 0;
        setTimeout(function () {
            shareValidate.style.display = 'none';
            scoreCard.style.display = 'block';
            TweenLite.to(scoreCard, .5, {
                opacity: 1
            });
        }, 500);
    });

    //Fires the Email Submit function when the submit button is clicked

    //    document.getElementById('emailSubmit').addEventListener('click', function() {
    //       sendEmail(); 
    //    });

    //    emailSubmit.addEventListener('click', function() {
    //       sendEmail(); 
    //    });

    //Fades the email box back to white. Used after the error function has been triggered. 

    document.getElementById('gsEmail').addEventListener('focusin', function () {
        document.getElementById('gsEmail').style.borderBottomColor = '#ffffff';
        document.getElementById('gsEmail').style.color = '#ffffff';
        document.getElementById('gsEmailLabel').style.color = '#ffffff';
    });

    //Fades the Friend Email input fields to default. Used with Email Error

    document.getElementById('friendEmail1').addEventListener('focusin', function () {
        document.getElementById('friendEmail1').style.borderBottomColor = '#ffffff';
        document.getElementById('friendEmail1').style.color = '#ffffff';
        document.getElementById('friendEmailLabel1').style.color = '#ffffff';
    });

    document.getElementById('friendEmail2').addEventListener('focusin', function () {
        document.getElementById('friendEmail2').style.borderBottomColor = '#ffffff';
        document.getElementById('friendEmail2').style.color = '#ffffff';
        document.getElementById('friendEmailLabel2').style.color = "#ffffff";
    });

    document.getElementById('friendEmail3').addEventListener('focusin', function () {
        document.getElementById('friendEmail3').style.borderBottomColor = '#ffffff';
        document.getElementById('friendEmail3').style.color = '#ffffff';
        document.getElementById('friendEmailLabel3').style.color = '#ffffff';
    });

    slider5.noUiSlider.on('set', function () {
        finishAssessment();
    });

});

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

//var mktoSubmit = document.getElementsByClassName('mktoButton');
//
//for (var i = 0; i < mktoSubmit.length; i++) {
//    mktoSubmit[i].addEventListener('click', function () {
//        getStarted();
//    });
//}

function getStarted() {

    var gsEmail = $('#gsEmail').val(),
        gsName = $('#gsName').val(),
        gsOrg = $('#gsOrg').val(),
        mktoFName = document.getElementsByName('FirstName'),
        mktoLName = document.getElementsByName('LastName'),
        mktoEmail = document.getElementsByName('Email'),
        mktoComp = document.getElementsByName('Company');

    gsName = gsName.split(" ");

    mktoFName[0].value = gsName[0];
    mktoLName[0].value = gsName[1];
    mktoEmail[0].value = gsEmail;
    mktoComp[0].value = gsOrg;

    if (validateEmail(gsEmail) === false) {
        var l = 20,
            gsEmailHolder = document.getElementById('gsEmailHolder');

        gsEmailHolder.className += ' loginShake';

        setTimeout(function () {
            gsEmailHolder.classList.remove('loginShake');
        }, 1000)

        var gsEmail = document.getElementById('gsEmail'),
            gsEmailLabel = document.getElementById('gsEmailLabel');

        gsEmail.style.borderBottomColor = '#ffb2b2';
        gsEmail.style.color = '#ffb2b2';
        gsEmailLabel.style.color = '#ffb2b2';

        return false;
    }

    setTimeout(function () {
        var question1 = document.getElementById('question1');
            

        TweenLite.to(question1, .33, {
            css: {
                x: 'translateX(0%)'
            }
        });
//        resizeQuestion();
    }, 600);

    //Fades out the into and slides Question 1 in from the far right

    $('#intro').fadeOut(400);
    //Sets the value of the question. Used for keeping track of what question has been answered for simple navigation
    theQuestion = 1;
    //Sets the progress bar along the bottom of the screen
    setProgress();
}

function finishAssessment() {

    var govVal = slider1.noUiSlider.get(),
        caremapVal = slider2.noUiSlider.get(),
        efficiencyVal = slider3.noUiSlider.get(),
        qaVal = slider4.noUiSlider.get(),
        itVal = slider5.noUiSlider.get(),
        dataString,
        finalVal,
        mktoComments = document.getElementsByName('MktoPersonNotes');
    finalVal = parseInt(govVal) + parseInt(caremapVal) + parseInt(efficiencyVal) + parseInt(qaVal) + parseInt(itVal);
    finalVal = finalVal / 5;
    dataString = 'Question 1: ' + govVal + ', Question 2: ' + caremapVal + ', Question 3: ' + efficiencyVal + ', Question 4: ' + qaVal + ', Question 5: ' + itVal + ', Total Score: ' + finalVal;
    mktoComments[0].value = dataString;
}

//Function for updating the progress bar
function setProgress() {
    //Sets a variable which defines what the width of the bar across the bottom of the screen.
    percentage = theQuestion / 5;
    percentage = percentage * 100;

    var progressBar = document.getElementById('progressBar');

    progressBar.style.width = percentage + '%';
}
//Smooth Scroll
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

//Resize Panel to full height on window resize

window.onresize = function (event) {
    resizeDiv();
    resizeQuestion();
}

//Sets all Divs with the class "Panel" to full height
function resizeDiv() {
    //Gets the height of the window
    //    vph = $(window).height();
    vph = window.innerHeight;
    //Sets all elements with the class "Panel" to full height
    if (vph >= 900) {
        var panel = document.getElementsByClassName('panel');
        for (var i = 0; i < panel.length; i++) {
            panel[i].style.height = vph + 'px';
        }
    }
}

//Sets all divs with the class "Question" to full height and full width
function resizeQuestion() {
    //Gets window hight
    //    questionH = $(window).height();

    questionH = window.innerHeight;

    //Gets window width
    //    questionW = $(window).width();

    questionW = window.outerWidth;

    //Sets all elements with the class "question" to full height and width
    $('.question').css({
        'height': questionH + 'px'
    });
}
//Used to set the values on the score card
function setValues() {
    //Gets the set values from each of the sliders
    govVal = slider1.noUiSlider.get();
    caremapVal = slider2.noUiSlider.get();
    efficiencyVal = slider3.noUiSlider.get();
    qaVal = slider4.noUiSlider.get();
    itVal = slider5.noUiSlider.get();
    //Sets color of the background circle based on the value of the sliders
    switch (govVal) {
    case '1':
        document.getElementById('govCircle').style.backgroundColor = '#de3131';
        break;
    case '2':
        document.getElementById('govCircle').style.backgroundColor = '#ff9600';
        break;
    case '3':
        document.getElementById('govCircle').style.backgroundColor = '#ffd800';
        break;
    case '4':
        document.getElementById('govCircle').style.backgroundColor = '#00db15';
        break;
    case '5':
        document.getElementById('govCircle').style.backgroundColor = '#00db15';
        break;
    }
    switch (caremapVal) {
    case '1':
        document.getElementById('careCircle').style.backgroundColor = '#de3131';
        break;
    case '2':
        document.getElementById('careCircle').style.backgroundColor = '#ff9600';
        break;
    case '3':
        document.getElementById('careCircle').style.backgroundColor = '#ffd800';
        break;
    case '4':
        document.getElementById('careCircle').style.backgroundColor = '#00db15';
        break;
    case '5':
        document.getElementById('careCircle').style.backgroundColor = '#00db15';
        break;
    }
    switch (efficiencyVal) {
    case '1':
        document.getElementById('efficiencyCircle').style.backgroundColor = '#de3131';
        break;
    case '2':
        document.getElementById('efficiencyCircle').style.backgroundColor = '#ff9600';
        break;
    case '3':
        document.getElementById('efficiencyCircle').style.backgroundColor = '#ffd800';
        break;
    case '4':
        document.getElementById('efficiencyCircle').style.backgroundColor = '#00db15';
        break;
    case '5':
        document.getElementById('efficiencyCircle').style.backgroundColor = '#00db15';
        break;
    }
    switch (qaVal) {
    case '1':
        document.getElementById('qaCircle').style.backgroundColor = '#de3131';
        break;
    case '2':
        document.getElementById('qaCircle').style.backgroundColor = '#ff9600';
        break;
    case '3':
        document.getElementById('qaCircle').style.backgroundColor = '#ffd800';
        break;
    case '4':
        document.getElementById('qaCircle').style.backgroundColor = '#00db15';
        break;
    case '5':
        document.getElementById('qaCircle').style.backgroundColor = '#00db15';
        break;
    }
    switch (itVal) {
    case '1':
        document.getElementById('itCircle').style.backgroundColor = '#de3131';
        break;
    case '2':
        document.getElementById('itCircle').style.backgroundColor = '#ff9600';
        break;
    case '3':
        document.getElementById('itCircle').style.backgroundColor = '#ffd800';
        break;
    case '4':
        document.getElementById('itCircle').style.backgroundColor = '#00db15';
        break;
    case '5':
        document.getElementById('itCircle').style.backgroundColor = '#00db15';
        break;
    }
    //Sets the numbers on the score card
    document.getElementById('govNumber').innerHTML = govVal;
    document.getElementById('careNumber').innerHTML = caremapVal;
    document.getElementById('efficiencyNumber').innerHTML = efficiencyVal;
    document.getElementById('qaNumber').innerHTML = qaVal;
    document.getElementById('itNumber').innerHTML = itVal;
    //Sets the overall value based on an average of the other values
    overall = (parseInt(govVal) + parseInt(caremapVal) + parseInt(efficiencyVal) + parseInt(qaVal) + parseInt(itVal)) / 5;
    //Overall number back to a real number
    overall = parseInt(overall);
    //Sets background color of the circle based on the value of overall
    switch (overall) {
    case 1:
        document.getElementById('overallCircle').style.backgroundColor = '#de3131';
        break;
    case 2:
        document.getElementById('overallCircle').style.backgroundColor = '#ff9600';
        break;
    case 3:
        document.getElementById('overallCircle').style.backgroundColor = '#ffd800';
        break;
    case 4:
        document.getElementById('overallCircle').style.backgroundColor = '#00db15';
        break;
    case 5:
        document.getElementById('overallCircle').style.backgroundColor = '#00db15';
        break;
    }
    //Sets the Overall number on the score card
    document.getElementById('overallNumber').innerHTML = overall;
}
//Used to send the scorecard to the users email inputed email address.
function sendEmail() {
    //Gets the email address from the form field
    email = $('#gsemail').val();
    //Sets the values from the score card for transfer via query string
    var gv = document.getElementById('govNumber').textContent,
        cmv = document.getElementById('careNumber').textContent,
        ev = document.getElementById('efficiencyNumber').textContent,
        qv = document.getElementById('qaNumber').textContent,
        iv = document.getElementById('itNumber').textContent;
    //checks if the email address entered is a real email
    if (validateEmail(email) === false) {
        //Fires an error if it is a bad email
        emailError();
        //Eugune stop the track
        return false;
    }
    //Sets the Query Sting
    formData = 'email=' + email + '&govval=' + gv + '&caremapval=' + cmv + '&efficiencyval=' + ev + '&qaval=' + qv + '&itval=' + iv;
    //Fires the email via Ajax. No page reloads.
    $.ajax({
            type: 'POST',
            url: 'mailer.php',
            data: formData,
            cache: false,
            success: function () {
                $('.emailSubmitHolder').slideUp('fast');
                $('.emailThankYou').slideDown('fast');
            }
        })
        //
    return false;
}
//Fires if the email is not correct. Changes the background of the Email field to light red.
function emailError() {
    var l = 20;
    for (var i = 0; i < 10; i++) {
        $('#emailCopyHolder').animate({
            'margin-left': '+=' + (l = -l) + 'px',
            'margin-right': '-=' + l + 'px'
        }, 70);
    }
    $('#email').css({
        'border-bottom-color': '#ffb2b2',
        'color': '#ffb2b2'
    });
    $('#emailCopyLabel').css({
        'color': '#ffb2b2'
    });
}
//Sends an invitation email to user specified email addresses 
function sendFriends() {
    //sets the variable of the value entered in the field friendName1
    var friendName1 = $('#friendName1').val();
    //sets the variable of the value entered in the field friendEmail1
    var friendEmail1 = $('#friendEmail1').val();
    //Sets the query string to be sent to friends.php
    var friendFormData = 'name1=' + friendName1 + '&email1=' + friendEmail1;
    //Validates email. Sets the field to red if there is an error
    if (validateEmail(friendEmail1) === false) {
        var l = 20;
        for (var i = 0; i < 10; i++) {
            $('#friendEmailHolder1').animate({
                'margin-left': '+=' + (l = -l) + 'px',
                'margin-right': '-=' + l + 'px'
            }, 70);
        }
        $('#friendEmail1').css({
            'border-bottom-color': '#ffb2b2',
            'color': '#ffb2b2'
        });
        $('#friendEmailLabel1').css({
            'color': '#ffb2b2'
        });
        //Stops the whole function from sending to friends.php
        return false;
    }

    //First checks if friend2 has been created
    if ($('#friend2').length) {
        //Sets the variables from the friend2 input fields
        var friendName2 = $('#friendName2').val();
        var friendEmail2 = $('#friendEmail2').val();
        //Validates the email. Sets field to red if there is an error
        if (validateEmail(friendEmail2) === false) {
            var l = 20;
            for (var i = 0; i < 10; i++) {
                $('#friendEmailHolder2').animate({
                    'margin-left': '+=' + (l = -l) + 'px',
                    'margin-right': '-=' + l + 'px'
                }, 70);
            }
            $('#friendEmail2').css({
                'border-bottom-color': '#ffb2b2',
                'color': '#ffb2b2'
            });
            $('#friendEmailLabel2').css({
                'color': '#ffb2b2'
            });
            return false;
        }
        //Adds friend2 data to the query string going to friends.php
        friendFormData += '&name2=' + friendName2 + '&email2=' + friendEmail2;
    }
    //Checks if friend3 has been created
    if ($('#friend3').length) {
        //Sets the variables from the friend3 input fields
        var friendName3 = $('#friendName3').val();
        var friendEmail3 = $('#friendEmail3').val();
        //Validates the email. Sets field to red if there is an error
        if (validateEmail(friendEmail3) === false) {
            var l = 20;
            for (var i = 0; i < 10; i++) {
                $('#friendEmailHolder3').animate({
                    'margin-left': '+=' + (l = -l) + 'px',
                    'margin-right': '-=' + l + 'px'
                }, 70);
            }
            $('#friendEmail3').css({
                'border-bottom-color': '#ffb2b2',
                'color': '#ffb2b2'
            });
            $('#friendEmailLabel3').css({
                'color': '#ffb2b2'
            });
            return false;
        }
        //Adds friend3 data to the query sting going to friends.php
        friendFormData += '&name3=' + friendName3 + '&email3=' + friendEmail3;
    }
    //Makes the ajax call to send the emails
    $.ajax({
        type: 'POST',
        url: 'friends.php',
        data: friendFormData,
        cache: false,
        success: function () {
            //Slides up the fields and button
            $('#shareValidation').css({
                'transform': 'translateX(-100%)'
            });
            //Score Card fades in
            $('#shareValidation').delay(500).fadeOut(400, function () {
                $('#scoreCard').fadeIn(400);
            });
        }
    })
}