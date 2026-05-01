const guessInput  = document.getElementById('guessInput');
const guessBtn    = document.getElementById('guessBtn');
const message     = document.getElementById('message');
const attemptCount = document.getElementById('attemptCount');
const history     = document.getElementById('history');
const resetBtn    = document.getElementById('resetBtn');

let targetNumber = generateTarget();
let attempts = 0;
let gameOver = false;

function generateTarget() { return Math.floor(Math.random() * 100) + 1; }

function showMessage(text, type) { message.textContent = text; message.className = 'message ' + type; }

function addHistory(guess, type) {
    const item = document.createElement('span');
    item.className = `history-item ${type}`;
    item.textContent = guess;
    history.appendChild(item);
}

function checkGuess() {
    if (gameOver) return;
    const guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < 1 || guess > 100) { showMessage('1에서 100 사이의 숫자를 입력하세요!', ''); return; }
    attempts++;
    attemptCount.textContent = attempts;
    if (guess > targetNumber)      { showMessage('📉 더 작은 숫자입니다!', 'high'); addHistory(guess, 'high'); }
    else if (guess < targetNumber) { showMessage('📈 더 큰 숫자입니다!', 'low');  addHistory(guess, 'low');  }
    else {
        showMessage(`🎉 정답! ${attempts}번 만에 맞췄습니다!`, 'correct');
        gameOver = true; guessBtn.disabled = true; guessInput.disabled = true;
    }
    guessInput.value = ''; guessInput.focus();
}

function resetGame() {
    targetNumber = generateTarget(); attempts = 0; gameOver = false;
    attemptCount.textContent = '0'; message.textContent = ''; message.className = 'message';
    history.innerHTML = ''; guessInput.value = ''; guessInput.disabled = false; guessBtn.disabled = false;
    guessInput.focus();
}

guessBtn.addEventListener('click', checkGuess);
resetBtn.addEventListener('click', resetGame);
guessInput.addEventListener('keydown', e => { if (e.key === 'Enter') checkGuess(); });
