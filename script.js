function validateForm() {
    let noButtons = document.forms["input"]["noButtons"].value;
    if (noButtons == "") {
        document.getElementById("invalid-text").innerHTML = "Field must not be empty!";
        return false;
    }
    noButtons = Number(noButtons);
    if (Number.isNaN(noButtons)){
        document.getElementById("invalid-text").innerHTML = "Field must contain a number!";
        return false;
    }
    if (!Number.isInteger(noButtons) || noButtons <= 0) {
        document.getElementById("invalid-text").innerHTML = "Number must be a positive integer!";
        return false;
    }
    document.getElementById("invalid-text").innerHTML = "";
    return noButtons;
}

function onBtnClick() {
    let id = Number(this.id.slice(10));
    if (id == hiddenId) {
        this.innerHTML = "Good Job!";
        this.classList.replace("btn-secondary", "btn-success");
        this.parentElement.childNodes.forEach(
            function(button) {
                button.disabled = true;
            }
        );
        document.getElementById("success-text").innerHTML = "You found the hidden button!!!";
    } else {
        this.innerHTML = "Nope!";
        this.classList.replace("btn-secondary", "btn-danger");
        this.disabled = true;
    }
}

function generateButton(parent) {
    document.getElementById("success-text").innerHTML = "";
    let button = document.createElement("button");
    button.innerHTML = "Press me";
    button.classList.add("btn", "btn-secondary", "m-4");
    button.id = "button-id-" + parent.childNodes.length;
    button.onclick = onBtnClick.bind(button);
    parent.appendChild(button);
}

function generateButtons() {
    let noButtons = validateForm();
    hiddenId = Math.floor(Math.random() * noButtons);
    if (!noButtons) {
        return false;
    }
    if (document.getElementById("buttons"))
        document.body.removeChild(document.getElementById("buttons"));
    let buttons = document.createElement("div");
    buttons.id = "buttons";
    buttons.classList.add("text-center")
    document.body.appendChild(buttons);
    for (let i = 0; i < noButtons; ++i) {
        generateButton(buttons);
    }
}

document.getElementById("input").addEventListener("submit", function(event) {
    event.preventDefault();
});