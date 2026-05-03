function validateForm() {
    let noButtons = document.forms["input"]["noButtons"].value;
    if (noButtons == "") {
        alert("Field must not be empty!");
        return false;
    }
    noButtons = Number(noButtons);
    if (Number.isNaN(noButtons)){
        alert("Field must contain a number!");
        return false;
    }
    if (!Number.isInteger(noButtons) || noButtons <= 0) {
        alert("Number must be a positive integer!");
        return false;
    }
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
        alert("You found the hidden button!!!");
    } else {
        this.innerHTML = "Nope!";
        this.classList.replace("btn-secondary", "btn-danger");
        this.disabled = true;
    }
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
        let button = document.createElement("button");
        button.innerHTML = "Press me";
        button.classList.add("btn", "btn-secondary", "m-4");
        button.id = "button-id-" + i;
        button.onclick = onBtnClick.bind(button);
        buttons.appendChild(button);
    }
}

document.getElementById("input").addEventListener("submit", function(event) {
    event.preventDefault();
});