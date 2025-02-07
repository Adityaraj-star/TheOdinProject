const digit_btn = document.querySelectorAll(".digit");
const operator_btn = document.querySelectorAll(".operator");
const decimal_btn = document.querySelector("#dot");
const del_btn = document.querySelector("#clear");
const clr_btn = document.querySelector("#all-clear");
const equal_btn = document.querySelector("#equal-to");
const display = document.querySelector("#screen");
const history = document.querySelector("#history-container");


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0){
        return "Undefined"
    }
    return a / b;
}
const exponent = (a, b) => a ** b;
const percentage = (a, b) => (a *b) / 100;


const operate = (num1, num2, operator) => {
    let result;
    switch (operator) {
        case "+":
            result =  add(num1, num2);
        break;
        case "-":
            result =  subtract(num1, num2);
        break;
        case "*":
            result =  multiply(num1, num2);
        break;
        case "/":
            result =  divide(num1, num2);
        break;
        case "**":
            result =  exponent(num1, num2);
        break;
        case "%":
            result =  percentage(num1, num2);
        break;
    }

    return Number.isFinite(result) ? parseFloat(result.toFixed(6)) : "Error";
}

let storedNum = ""; //Holds the first number before an operation
let currentNum = ""; //Holds the number being entered
let operator = "";
let shouldResetScreen = false;
let MAX_DIGITS = 10;
let historyList = []; // Store history


const updateDisplay = (num) => {
    display.textContent = num || "0";
}

const updateHistory = () => {
    history.innerHTML = historyList
    .map(item => `<p>${item}</p>`)
    .join("");
    history.scrollTop = history.scrollHeight;
}


digit_btn.forEach((digit) => {
    digit.addEventListener("click", () => {
        if (shouldResetScreen){
            currentNum = "";
            shouldResetScreen = false;
        } // clean screen after pressing "="

        if (currentNum.length > MAX_DIGITS) return;


        if (currentNum === "0"){
            currentNum = ""; // prevent leading zero
        }


        currentNum += digit.textContent;
        updateDisplay(currentNum);
    })
})

operator_btn.forEach((op) => {
    op.addEventListener("click", () => {
        if (currentNum === "" && storedNum !== "") return; //Prevent multiple operators

        if (currentNum === "") return; //ignore if no number entered

        if (storedNum !== "") equal_btn.click();

        storedNum = currentNum;
        operator = op.textContent;
        currentNum = "";
        shouldResetScreen = true;
    })
})

equal_btn.addEventListener("click", () => {
    if (storedNum === "" || currentNum === "") return; //ensure both numbers exists

    let num1 = parseFloat(storedNum);
    let num2 = parseFloat(currentNum);
    
    let result = operate(num1, num2, operator);
    updateDisplay(result);

    historyList.push(`${num1} ${operator} ${num2} = ${result}`)
    if (historyList.length > 5) historyList.shift();
    updateHistory();

    storedNum = result.toString();
    currentNum = "";
    operator = "";
    shouldResetScreen = true;
})

del_btn.addEventListener("click", () => {
    currentNum = currentNum.slice(0, -1);
    updateDisplay(currentNum || "0");
})

clr_btn.addEventListener("click", () => {
    currentNum = "";
    storedNum = "";
    operator = "";
    updateDisplay("0");
    historyList = [];
    updateHistory();

})

decimal_btn.addEventListener("click", () => {
    if (!currentNum.includes(".")) {
        currentNum += ".";
        updateDisplay(currentNum);
    }
})


// using keyboard to use calculator
document.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9"){
        if (shouldResetScreen) {
            currentNum = "";
            shouldResetScreen = false;
        }

        if (currentNum.length > MAX_DIGITS) return;

        currentNum += e.key;
        updateDisplay(currentNum);
    } 
    
    
    if (["+", "-", "*", "/", "%"].includes(e.key)){
        if (currentNum === "" && storedNum !== ""){
            operator = e.key;
            return;
        }
        if (storedNum !== "") equal_btn.click();
        storedNum = currentNum;
        currentNum = "";
        operator = e.key;

    }

    if (e.key === "Enter") {
        equal_btn.click();
    }
    if (e.key === "Backspace") {
        del_btn.click();
    }
    if (e.key === "Escape") {
        clr_btn.click();
    }

    if (e.key === "." && !currentNum.includes(".")){
        currentNum += ".";
        updateDisplay(currentNum);
    }
})