function toggleSubmit() {
    const submitButton = document.querySelector('input[type="submit"]');

    if (submitButton.getAttribute('disabled') !== true) {
        submitButton.setAttribute("disabled", "true");
    } else {
        submitButton.setAttribute("disabled", "false");
    }
}

function validateInput(e) {
    const input = e.target;
    const errorDiv = input.previousElementSibling;

    function validName(input, errorDiv) {
        const regex = /^[a-z]+(([',. -][a-z])?[a-z]*)*$/ig
        if (input.value.length === 0) {
            errorDiv.innerHTML = "";
            return false
        }
        if (!regex.test(input.value)) {
            errorDiv.innerHTML = "Your name may only a-z,.'- and must not end in a space";
            return false
        } else {
            errorDiv.innerHTML = "";
            return true
        }

    }

    function validEmail(input, errorDiv) {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
        console.log(input.value.length);
        if (!regex.test(input.value)) {
            errorDiv.innerHTML = "Your email address is invalid";
        } else {
            errorDiv.innerHTML = "";
        }
        if (input.value.length === 0) {
            errorDiv.innerHTML = "";
        }
    }

    function validPassword(input, errorDiv) {
        const regex = /^[A-Za-z]\w{7,14}$/;
        if (!regex.test(input.value)) {
            errorDiv.innerHTML = "Your password must be between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter";
        } else {
            errorDiv.innerHTML = "";
        }
        if (input.value.length === 0) {
            errorDiv.innerHTML = "";
        }
    }

    if (input.name === 'name') {
        validName(input, errorDiv);
    }
    if (input.name === 'email') {
        validEmail(input, errorDiv);
    }
    if (input.name === 'password') {
        validPassword(input, errorDiv);
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
toggleSubmit();

inputsElements.forEach(input => {
    if (input.type === "text" | input.type === "email" | input.type === "password") {
        input.addEventListener('change', validateInput);
    };
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formSubmitted(e);
});