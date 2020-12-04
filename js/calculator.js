// basic operations

function add(a, b) {
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (op == "+") return add(a, b);
    if (op == "-") return subtract(a, b);
    if (op == "×") return multiply(a, b);
    if (op == "÷") return divide(a, b);
}

// wiring up the buttons

const displayText = document.querySelector(".display-text");
const miniText = document.querySelector(".mini-text");

let num1 = "";
let num2 = "";
let op = "";

function populateDisplay(e) {
    if (miniText.textContent.slice(-2, -1) == "=") {
        miniText.textContent = displayText.textContent;
    }

    if (displayText.textContent.length <= 13) {
        displayText.textContent += e.srcElement.innerText;
        miniText.textContent += e.srcElement.innerText;
    }
}

function prepareOperation(e) {
    if (op !== "") {
        return;
    }

    num1 = displayText.textContent;
    op = e.srcElement.innerText

    if (miniText.textContent.slice(-2, -1) == "=") {
        miniText.textContent = displayText.textContent;
    }

    displayText.textContent = "";
    miniText.textContent += ` ${op} `;
}

function calculate(e) {
    if (op && displayText.textContent) {
        num2 = displayText.textContent;
        miniText.textContent += " = ";
        let answer = (Math.round(operate(op, num1, num2)*10**5)/100000).toString();
        if (answer.length <= 13) {
            displayText.textContent = answer;
        } else {
            displayText.textContent = "Too large!"
            setTimeout(reset, 2000);
        }
        op = "";
    }
}

function backOne(e) {
    displayText.textContent = displayText.textContent.slice(0, -1);
    if (miniText.textContent.slice(-1) !== " ") {
        miniText.textContent = miniText.textContent.slice(0, -1);
    }
    if (miniText.textContent.slice(-2,-1) == "=") {
        miniText.textContent = displayText.textContent;
    }
}

function reset(e) {
    num1 = "";
    num2 = "";
    op = "";
    displayText.textContent = "";
    miniText.textContent = "";
}

const numbers = document.querySelectorAll(".button.number");
numbers.forEach(function(number) {
    number.addEventListener("click", populateDisplay);
});

const operations = document.querySelectorAll(".button.operation");
operations.forEach(function(operation) {
    operation.addEventListener("click", prepareOperation);
})

const equals = document.querySelector(".button.equals");
equals.addEventListener("click", calculate);

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", backOne);

const clear = document.querySelector("#clear");
clear.addEventListener("click", reset);
