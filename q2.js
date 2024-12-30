const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
const historyDiv = document.getElementById('history');
let currentInput = '';
let operationHistory = [];

function updateDisplay(value) {
    display.value = value;
}

function addToHistory(entry) {
    operationHistory.push(entry);
    const historyEntry = document.createElement('p');
    historyEntry.textContent = entry;
    historyDiv.appendChild(historyEntry);
    if (operationHistory.length > 10) {
        operationHistory.shift();
        historyDiv.removeChild(historyDiv.firstChild);
    }
}

function handleButtonClick(event) {
    const value = event.target.dataset.value;
    if (value === 'C') {
        currentInput = '';
        updateDisplay('');
    } else if (value === '=') {
        try {
            const result = eval(currentInput);
            addToHistory(`${currentInput} = ${result}`);
            currentInput = result.toString();
            updateDisplay(currentInput);
        } catch {
            updateDisplay('Error');
            currentInput = '';
        }
    } else {
        currentInput += value === '×' ? '*' : value === '÷' ? '/' : value;
        updateDisplay(currentInput);
    }
}

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.') {
        currentInput += key;
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        currentInput += key;
    } else if (key === 'Enter') {
        try {
            const result = eval(currentInput);
            addToHistory(`${currentInput} = ${result}`);
            currentInput = result.toString();
        } catch {
            updateDisplay('Error');
            currentInput = '';
        }
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
    } else if (key === 'Escape') {
        currentInput = '';
    }
    updateDisplay(currentInput);
});