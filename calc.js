
const numberBtn = document.querySelectorAll("[data-number]");
const operatorBtn = document.querySelectorAll("[data-operator]");
const delBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const equalBtn = document.querySelector("[data-equals]");
const previousOperand = document.querySelector("[data-previous-operand]");
const currentOperand = document.querySelector("[data-current-operand]");


let num1 = null; 
let operatorValue = null;


function operate(num1, num2 = 0, operatorValue) {
    if (operatorValue === "+") {
        return num1 + num2;
    }
    if (operatorValue === "-") {
        return num1 - num2;
    }
    if (operatorValue === "÷") {
        if (num2 === 0) {
            return "Math error";
        } else {
            return num1 / num2;
        }
    }
    if (operatorValue === "x") {
        return num1 * num2;
    }
}

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperand.textContent === '0' && button.textContent !== '.') {
            currentOperand.textContent = button.textContent;
        } else {
            currentOperand.textContent += button.textContent;
        }
    });
});


operatorBtn.forEach(operator => {
    operator.addEventListener('click', () => {
   
        if (operatorValue !== null && currentOperand.textContent === '') {
            operatorValue = operator.textContent;
            previousOperand.textContent = `${num1} ${operatorValue}`;
            return;
        }

        if (num1 !== null) {
            const num2 = parseFloat(currentOperand.textContent);
            num1 = operate(num1, num2, operatorValue);
        } else {
            
            num1 = parseFloat(currentOperand.textContent);
        }

        
        operatorValue = operator.textContent;
        previousOperand.textContent = `${num1} ${operatorValue}`;
        currentOperand.textContent = "";
    });
});

// Equals Button Logic: Triggers the final calculation and displays the result
equalBtn.addEventListener('click', () => {
    const num2 = parseFloat(currentOperand.textContent);
    const answer = operate(num1, num2, operatorValue);

    currentOperand.textContent = answer;
    previousOperand.textContent = '';
    
    // Reset state for the next calculation
    num1 = null;
    operatorValue = null;
});


allClearBtn.addEventListener('click', () => {
    currentOperand.textContent = '0';
    previousOperand.textContent = '';
    num1 = null;
    operatorValue = null;
});


delBtn.addEventListener('click', () => {
    if (currentOperand.textContent === '' && operatorValue !== null) {
        previousOperand.textContent = '';
        currentOperand.textContent = num1;
        num1 = null;
        operatorValue = null;
    } else {
        currentOperand.textContent = currentOperand.textContent.slice(0, -1);
        if (currentOperand.textContent === '') {
            currentOperand.textContent = '0';
        }
    }    
});