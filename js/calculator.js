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

let num1;
let num2;
let op;

function populateDisplay(e) {
    if (displayText.textContent.length <= 14) {
        displayText.textContent += e.srcElement.innerText;
    } 
}

function prepareOperation(e) {
    num1 = displayText.textContent;
    op = e.srcElement.innerText
    displayText.textContent = "";
}

function calculate(e) {
    if (op && displayText.textContent) {
        num2 = displayText.textContent;
        let answer = (Math.round(operate(op, num1, num2)*10**5)/100000).toString();
        if (answer.length <= 14) {
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
}

function reset(e) {
    num1 = ""
    num2 = ""
    op = ""
    displayText.textContent = ""
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
