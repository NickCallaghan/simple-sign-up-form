function toggleSubmit() {
    const submitButton = document.querySelector('input[type="submit"]');
    if (submitButton.disabled) {
       submitButton.disabled = !submitButton.disabled
    }
}

function validateForm() {
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    function validName(input) {
        const regex = /^[a-z]+(([',. -][a-z])?[a-z]*)*$/ig
        
        if (regex.test(input.value)) {
            return true
        } else {
            return false;
        }
    }

    function validEmail(input) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;

        if (regex.test(input.value)) {
            return true;
        } else {
            return false;
        } 
    }

    function validPassword(input) {
        const regex = /^[A-Za-z]\w{7,14}$/;

        if (regex.test(input.value)) {
            return true;
        } else {
            return false;
        } 
    }

    if (validName(name) && validEmail(email) && validPassword(password)){
        toggleSubmit();
    }   
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
        xhttp.open("GET", "./../submitted.html", true);
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