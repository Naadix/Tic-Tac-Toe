const showHint = document.querySelector('input'),
    allBox = document.querySelectorAll('.box'),
    wrongAudio = new Audio ('audio/mixkit-wrong-answer-bass-buzzer-948.wav'),
    winAudio = new Audio ('audio/mixkit-achievement-bell-600.wav'),
    resetBtn = document.querySelector('button');
let currPlayer = 'X';
let gameActive = true;

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// show who player
function updateHint() {
    showHint.value = `Turn ${currPlayer}`;
}
// game start
function startGame() {
    updateHint();
    allBox.forEach(box => {
        box.addEventListener('click', () => {
            if (box.textContent === '' && gameActive) {
                box.innerText = currPlayer;
                checkWinner();

                if (gameActive) {
                    currPlayer = currPlayer === 'X' ? 'O' : 'X';
                    updateHint();
                }

            }
        });
    });
}
startGame();
resetBtn.addEventListener('click', restGame);

//check who won 
function checkWinner() {
    for (let pattern of winPattern) {
        const [a, b, c] = pattern;
        const boxA = allBox[a].textContent;
        const boxB = allBox[b].textContent;
        const boxC = allBox[c].textContent;
        if (boxA !== '' && boxA === boxB && boxB === boxC) {
            showHint.value = ` 🎉 Player ${boxA} is won! `;
            winAudio.play();
            allBox[a].style.background = '#fe4242';
            allBox[b].style.background = '#fe4242';
            allBox[c].style.background = '#fe4242';
            showHint.style.background = '#fe4242';
            gameActive = false;
            return;
        }
    }
       const allFilled = [...allBox].every(box => box.textContent !== '');
        if (allFilled && gameActive) {
            showHint.value = `🤝 It's a Draw! `;
            wrongAudio.play();
            showHint.style.background = '#fe4242';
            gameActive = false;
        }
}
checkWinner();

// function restart Game 
function restGame() {
    currPlayer = 'X';
    gameActive = true;
    allBox.forEach(box => {
        box.style.background = '';
    });
    showHint.style.background = '';
    allBox.forEach(box => {
        box.innerText = '';
    });
    updateHint();
}