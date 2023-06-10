const cells = document.querySelectorAll('.cell');
const numbers = Array.from({ length: 16 }, (_, i) => i + 1);
let shuffledNumbers = shuffleArray(numbers);
let currentIndex = 0;
let timerValue = 20;
let timerInterval;

cells.forEach((cell, index) => {
  cell.innerText = shuffledNumbers[index];
  cell.addEventListener('click', () => {
    if (currentIndex + 1 === shuffledNumbers[index]) {
      cell.classList.add('correct');
      currentIndex++;
      if (currentIndex === shuffledNumbers.length) {
        clearInterval(timerInterval);
        setTimeout(() => {
          alert('Congratulations, you won the game!');
          restartGame();
        }, 500);
      }
    } else {
      clearInterval(timerInterval);
      setTimeout(() => {
        alert('Wrong order! You lost the game!');
        restartGame();
      }, 500);
    }
  });
});

timerInterval = setInterval(updateTimer, 1000);

function updateTimer() {
  const timerElement = document.getElementById('timer');
  timerElement.innerText = timerValue;
  timerValue--;
  if (timerValue < 0) {
    clearInterval(timerInterval);
    setTimeout(() => {
      alert('Times up! You lost the game!');
      restartGame();
    }, 500);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function restartGame() {
  shuffledNumbers = shuffleArray(numbers);
  currentIndex = 0;
  timerValue = 20;
  timerInterval = setInterval(updateTimer, 1000);
  cells.forEach((cell, index) => {
    cell.innerText = shuffledNumbers[index];
    cell.classList.remove('correct');
  });
}
