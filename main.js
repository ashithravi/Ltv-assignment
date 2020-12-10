const url = "https://ltv-data-api.herokuapp.com/api/v1/records.json?email=";

const response = {
    "email":"doesmith@example.com",
    "first_name":"Dow",
    "last_name":"Smith",
    "description":"Lorem Ipsum Dolor",
    "address":"123 Chocolate Ave",
    "phone_numbers":["2125551234","2125551235","2125551236"],
    "relatives":["Jane Smith","Jon Smith"]}

$(document).ready(function(){
    removeValidationError();
});

function validateEmail() {
    const email = document.getElementById('email').value;
    if (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            removeValidationError();
            getUserDetails(email);
        } else {
            handleValidationError(false);
        }
    } else {
        handleValidationError(false);
    }
}

function validateResultEmail() {
    const email = document.getElementById('email-result').value;
    if (email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase())) {
            removeValidationError();
            getUserDetails(email);
        } else {
            handleValidationError(true);
        }
    } else {
        handleValidationError(true);
    }
}

function getUserDetails(email) {
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    $('#search-section').hide();
    $('.main-section').hide();
    $('#loader').show();
    $.ajax({
        url: proxy + url + email,
        type: 'GET',
        success: function(data) {
            $('#loader').hide();
            setData(data);
            $('.result-section').show();
            $('#search-result-section').show();
        },
        error: function(data) {
            $('#loader').hide();
            $('#search-section').show();
            $('.main-section').show();
            $('.result-section').hide();
        }
    });
   /* $.get(proxy + url + email, function(data) {
        $('#loader').hide();
        setData(data);
        $('.result-section').show();
    }, error() {

    });*/

}

function setData(data) {
    $('#first-name').html(data.first_name);
    $('#last-name').text(data.last_name);
    $('#description').text(data.description);
    $('#address').text(data.address);
    $('#email-text').text(data.email);
    $('#phone-numbers').html(data.phone_numbers.join('<br/>'));
    $('#relatives').html(data.relatives.join('<br/>'));
}

function handleValidationError(isResult) {
    if (isResult) {
        $('#email-error-result').show();
        $('#email-result').addClass('error-input');
    } else {
        $('#email-error').show();
        $('#email').addClass('error-input');
    }
    
}

function removeValidationError() {
    $('#email-error').hide();
    $('#email').removeClass('error-input');
}