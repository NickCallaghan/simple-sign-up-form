function validateInput(e) {
    const input = e.target;
    const errorDiv = input.previousElementSibling;

    function validateName(input, errorDiv) {
        const regex = /^[a-z]+(([',. -][a-z])?[a-z]*)*$/ig
        if (!regex.test(input.value)) {
            errorDiv.innerHTML = "Your name may only a-z,.'- and must not end in a space";
        } else {
            errorDiv.innerHTML = "";
        }
        if (input.value.length === 0) {
            errorDiv.innerHTML = "";
        }
    }

    function validateEmail(input, errorDiv) {
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

    function validatePassword(input, errorDiv) {
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
        validateName(input, errorDiv);
    }
    if (input.name === 'email') {
        validateEmail(input, errorDiv);
    }
    if (input.name === 'password') {
        validatePassword(input, errorDiv);
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
    if (input.type === "text" | input.type === "email" | input.type === "password") {
        input.addEventListener('change', validateInput);
    };
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formSubmitted(e);
});