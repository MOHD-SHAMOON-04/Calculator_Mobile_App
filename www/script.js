// class Calculator
class Calculator {
    constructor(previousInput, currentInput) {
        this.previousInput = previousInput;
        this.currentInput = currentInput;
        this.clear();
    }
    clear() {
        this.previousNum = '';
        this.currentNum = '';
        this.operation = undefined;
    }
    delete() {
        this.currentNum = this.currentNum.toString().slice(0, -1);
    }
    // appendNumber(number){}
    appendNumber(number) {
        if (number === '.' && this.currentNum.includes('.')) return;
        this.currentNum = this.currentNum.toString() + number.toString();
    }
    // appendOperator(operation){}
    chooseOperator(operation) {
        if (this.currentNum === '') return;
        if (this.previousNum !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousNum = this.currentNum;
        this.currentNum = '';
    }
    // calculate(){}
    compute() {
        let calculation;
        const prev = parseFloat(this.previousNum);
        const current = parseFloat(this.currentNum);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                calculation = prev + current;
                break;
            case '-':
                calculation = prev - current;
                break;
            case '×':
                calculation = prev * current;
                break;
            case '÷':
                calculation = prev / current;
                break;
            default:
                return;
        }
        // this.currentNum = calculation;
        this.currentNum = parseFloat(calculation.toFixed(3));
        this.operation = undefined;
        this.previousNum = '';
    }
    // formatNumber(number){}
    formatNumber(number) {
        const stringNum = number.toString();
        const intDigits = parseFloat(stringNum.split('.')[0]);
        const decimalDigits = stringNum.split('.')[1]; // no need to be a number
        let intDisplay;
        // for integer digits
        if (isNaN(intDigits)) {
            intDisplay = '';
        }
        else {
            intDisplay = intDigits.toLocaleString('en', { maximumFractionDigits: 0 });
            // { maximumFractionDigits: 0 }
            // to remove decimal points after the integer intDisplay
        }
        // for decimal digits
        if (decimalDigits != null) {
            return `${intDisplay}.${decimalDigits}`;
        }
        else {
            return intDisplay;
        }
    }

    // updateDisplay(){}
    updateDisplay() {
        this.currentInput.innerText = this.formatNumber(this.currentNum);
        if (this.operation != null) {
            this.previousInput.innerText = `${this.formatNumber(this.previousNum)} ${this.operation}`;
        }
        else {
            this.previousInput.innerText = '';
        }
    }
}
// class ends

// Theme toggle
const toggleMode = document.getElementById('toggleMode');

function toggleDarkMode() {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        toggleMode.innerText = '☀️ Light Mode';
    } else {
        toggleMode.innerText = '🌙 Dark Mode';
    }
}
// Theme toggle ends

// DOM elements
const previousInput = document.getElementById('previousInput');
const currentInput = document.getElementById('currentInput');

const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');

const operatorButtons = document.querySelectorAll('.operator');
const numberButtons = document.querySelectorAll('.number');

const equalButton = document.querySelector('.equals');
// DOM elements ends

// Event listeners and function calls
const calc = new Calculator(previousInput, currentInput);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperator(button.innerText);
        calc.updateDisplay();
    });
});

equalButton.addEventListener('click', () => {
    calc.compute();
    calc.updateDisplay();
});

clearButton.addEventListener('click', () => {
    calc.clear();
    calc.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calc.delete();
    calc.updateDisplay();
});
// Event listeners and function calls ends