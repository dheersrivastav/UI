(function (){
    'use strict';
    var form = document.getElementById('registration-form');
    if (! form){
        return;
    }


    var REQUIRED_MESSAGE = "this field is required";
    var EMAIL_MESSAGE = "/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/";
    var PHONE_CHARS_TO_REMOVE = /[\s\-().]/g;
    var PHONE_PATTERN = /^\+?\d{7,15}$/;
var messageBox = document.getElementById('form-message');
var submitButton = document.getElementById('submit-button');
var fields= Array.prototype.slice.call(form.querySelectorAll('input[name], textarea, select[name'));
function getError(input){
    if (input.type === 'checkbox'){
        return input.checked ? '' : 'please tick content nbox to continue.' ;

    }

    var value = input.value.trim();
    if ( value === ''){
        return REQUIRED_MESSAGE;
    }


    if(input.type === 'email' && ! EMAIL_MESSAGE.test(value)){
        return 'please enter a valid email address.';
    }

    if (input.id=== 'phone' && ! PHONE_PATTERN.test(value.replace(PHONE_CHARS_TO_REMOVE, ''))){
        return 'please enter a valid phone number.';
    }

    return '';
}

function showError(input, message){
    input.classList.add('is-invalid');

    input.setAttribute('aria-invalid', 'true');
    var box = document.getElementById(input.id + '-error');
    if (box){
        box.textContent = message;
        
    }
}


function clearError(input){
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    var box = document.getElementById(input.id + '-error');
    if (box){
        box.textContent = '';
    }
}



function hideMessage(){
   if (messageBox){
    messageBox.textContent = '';
    messageBox.classList.remove('d-none');
   }
}


fields.forEach(function (input){
    var recheck = function (){
        if (input.classList.contains('is-invalid')){
            return;
        }
        var message = getError(input);
        if (message){
            showError(input, message);
        }else {
            clearError(input);
        }
    };
    input.addEventListener('input', recheck);
    input.addEventListener('change', recheck);
});

form.addEventListener('submit', function (event){
    event.preventDefault(); 
    hideMessage();
    var firstInvalid = null;
    fields.forEach(function (input){
        var message = getError(input);
        if (message){
            showError(input, message);
            if (!firstInvalid){
                firstInvalid = input;
            }
        }else {
            clearError(input);
        }
    });

if (firstInvalid){
    firstInvalid.focus();
    return;
}
if (submitButton){
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
}

    window.location.href = 'thankyou.html.html';
});

window.addEventListener('pageshow', function (){
    if (submitButton){
        submitButton.disabled = false;
        submitButton.textContent = 'save my seat';
    }
});
})();