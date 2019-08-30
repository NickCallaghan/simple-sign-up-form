function validateForm() {
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const submitButton = document.querySelector('input[type="submit"]');

    function validName(input) {
        const regex = /^[a-z]+(([',. -][a-z])?[a-z]*)*$/ig
        const invalidMessage = "Name is not valid";

        if (regex.test(input.value)) {
            displayValidationFeedback(input, true)
            return true
        } else {
            displayValidationFeedback(input, false, invalidMessage)
            return false;
        }
    }

    function validEmail(input) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
        const invalidMessage = "Email address is not valid";

        if (regex.test(input.value)) {
            displayValidationFeedback(input, true)
            return true;
        } else {
            displayValidationFeedback(input, false, invalidMessage);
            return false;
        } 
    }

    function validPassword(input) {
        const regex = /^[A-Za-z]\w{7,14}$/;
        const invalidMessage = "Password must contain at lease 8 characters and include an uppercase letter and a number";

        if (regex.test(input.value)) {
            displayValidationFeedback(input, true)
            return true;
        } else {
            displayValidationFeedback(input, false, invalidMessage);
            return false;
        } 
    }

    function checkEnableForm(){
        if (name.valid && email.valid && password.valid){
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    function displayValidationFeedback(input, validBool, message,){
        const errorDiv = input.previousElementSibling; 
        
        if(input.value.length === 0 || validBool === true ){
            errorDiv.textContent = "";
        } else{
            errorDiv.textContent = message;
        }
    }

    name.valid = validName(name);
    email.valid = validEmail(email);
    password.valid = validPassword(password);
    checkEnableForm()
}

function formSubmitted(e) {
    e.preventDefault();
    const form = e.target.parentNode;
    const formObject = form.getBoundingClientRect();
    form.style.height = `${formObject.height}px`;

    function displaySubmitMessage(form) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                form.innerHTML = xhttp.responseText;
            }
        };
        xhttp.open("GET", "./submitted.html", true);
        xhttp.send();
    }
    displaySubmitMessage(form);
}

const inputsElements = document.querySelectorAll('input');
const form = document.querySelector('form.signup');


inputsElements.forEach(input => {
    if (input.type === "text" || input.type === "email" || input.type === "password") {
        input.addEventListener('change', validateForm);
    };
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formSubmitted(e);
});