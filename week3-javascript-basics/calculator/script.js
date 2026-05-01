const display    = document.getElementById('result');
const expression = document.getElementById('expression');
const OP_SYMBOLS = { add: '+', subtract: '−', multiply: '×', divide: '÷' };

let currentValue = '0', previousValue = '', operator = null, shouldReset = false;

const updateDisplay = val => { display.textContent = val; };

function handleNumber(val) {
    currentValue = shouldReset ? val : (currentValue === '0' ? val : currentValue + val);
    shouldReset = false;
    updateDisplay(currentValue);
}
function handleDecimal() {
    if (shouldReset) { currentValue = '0.'; shouldReset = false; }
    else if (!currentValue.includes('.')) currentValue += '.';
    updateDisplay(currentValue);
}
function handleOperator(op) {
    if (operator && !shouldReset) calculate();
    previousValue = currentValue; operator = op; shouldReset = true;
    expression.textContent = `${previousValue} ${OP_SYMBOLS[op]}`;
    document.querySelectorAll('.btn-operator').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-action="${op}"]`).classList.add('active');
}
function calculate() {
    if (!operator || !previousValue) return;
    const prev = parseFloat(previousValue), curr = parseFloat(currentValue);
    let result;
    if (operator === 'add')      result = prev + curr;
    if (operator === 'subtract') result = prev - curr;
    if (operator === 'multiply') result = prev * curr;
    if (operator === 'divide') {
        if (curr === 0) { currentValue = '오류'; updateDisplay(currentValue); expression.textContent = ''; operator = null; return; }
        result = prev / curr;
    }
    expression.textContent = `${previousValue} ${OP_SYMBOLS[operator]} ${currentValue} =`;
    currentValue = String(parseFloat(result.toFixed(10)));
    updateDisplay(currentValue); operator = null; shouldReset = true;
    document.querySelectorAll('.btn-operator').forEach(b => b.classList.remove('active'));
}
function handleClear() {
    currentValue = '0'; previousValue = ''; operator = null; shouldReset = false;
    expression.textContent = ''; updateDisplay('0');
    document.querySelectorAll('.btn-operator').forEach(b => b.classList.remove('active'));
}

document.querySelectorAll('.btn').forEach(btn => btn.addEventListener('click', () => {
    const v = btn.dataset.value, a = btn.dataset.action;
    if (v !== undefined) handleNumber(v);
    else if (a === 'decimal') handleDecimal();
    else if (['add','subtract','multiply','divide'].includes(a)) handleOperator(a);
    else if (a === 'equals')  calculate();
    else if (a === 'clear')   handleClear();
    else if (a === 'sign')    { currentValue = String(parseFloat(currentValue) * -1); updateDisplay(currentValue); }
    else if (a === 'percent') { currentValue = String(parseFloat(currentValue) / 100); updateDisplay(currentValue); }
}));
document.addEventListener('keydown', e => {
    if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
    else if (e.key === '.')  handleDecimal();
    else if (e.key === '+')  handleOperator('add');
    else if (e.key === '-')  handleOperator('subtract');
    else if (e.key === '*')  handleOperator('multiply');
    else if (e.key === '/') { e.preventDefault(); handleOperator('divide'); }
    else if (e.key === 'Enter' || e.key === '=') calculate();
    else if (e.key === 'Escape')     handleClear();
    else if (e.key === 'Backspace') { currentValue = currentValue.length > 1 ? currentValue.slice(0,-1) : '0'; updateDisplay(currentValue); }
});
