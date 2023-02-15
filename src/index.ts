import './styles.css';

let compScore: number = 0;
let playerScore: number = 0;

interface Elements {
  rockButton: HTMLButtonElement;
  paperButton: HTMLButtonElement;
  scissorsButton: HTMLButtonElement;
  outcomeDiv: HTMLDivElement;
  playerScoreSpan: HTMLSpanElement;
  compScoreSpan: HTMLSpanElement;
}

const elements: Elements = {
  rockButton: document.querySelector('.rockButton'),
  paperButton: document.querySelector('.paperButton'),
  scissorsButton: document.querySelector('.scissorsButton'),
  outcomeDiv: document.querySelector('.outcome'),
  playerScoreSpan: document.querySelector('.player-score'),
  compScoreSpan: document.querySelector('.comp-score'),
};

elements.playerScoreSpan.innerText = `Player Score: ${playerScore}`;
elements.compScoreSpan.innerText = `Computer Score: ${compScore}`;

const computerPlay = (): string => {
  const arrOfChoices: string[] = ['rock', 'paper', 'scissors'];
  const randomNum: number = Math.floor(Math.random() * 3);
  const compChoice: string = arrOfChoices[randomNum];
  return compChoice;
};

const outcomes = {
  rock: {
    rock: 'You tied! You both picked rock.',
    paper: 'You lose! Paper beats rock!',
    scissors: 'You win! Rock beats scissors!',
  },
  paper: {
    rock: 'You win! Paper beats rock!',
    paper: 'You tied! You both picked paper.',
    scissors: 'You lose! Scissors beats paper!',
  },
  scissors: {
    rock: 'You lose! Rock beats scissors!',
    paper: 'You win! Scissors beats paper!',
    scissors: 'You tied! You both picked scissors.',
  },
};

const playRound = (
  playerSelection: string,
  computerSelection: string
): void => {
  const result = outcomes[playerSelection][computerSelection];

  if (result) {
    elements.outcomeDiv.innerHTML = '';
    elements.outcomeDiv.innerHTML += `<p>${result}</p>`;

    if (result.includes('win')) {
      playerScore++;
    } else if (result.includes('lose')) {
      compScore++;
    }
  }
};

const updateScores = (playerScore: number, compScore: number): void => {
  elements.playerScoreSpan.innerText = `Player Score: ${playerScore}`;
  elements.compScoreSpan.innerText = `Computer Score: ${compScore}`;
};

const checkForWinner = (
  playerScore: number,
  compScore: number
): [number, number] => {
  if (playerScore === 5) {
    const h1 = document.createElement('h1');
    h1.innerText = 'You won!';
    h1.classList.add('win-outcome');
    elements.outcomeDiv.append(h1);
    return [0, 0];
  }

  if (compScore === 5) {
    const h1 = document.createElement('h1');
    h1.innerText = 'You lost!';
    h1.classList.add('loss-outcome');
    elements.outcomeDiv.append(h1);
    return [0, 0];
  }

  return [playerScore, compScore];
};

type PlayerSelection = 'rock' | 'paper' | 'scissors';

elements.rockButton.addEventListener('click', (): void => {
  const computerSelection = computerPlay();
  const playerSelection: PlayerSelection = 'rock';
  playRound(playerSelection, computerSelection);
  [playerScore, compScore] = checkForWinner(playerScore, compScore);
  updateScores(playerScore, compScore);
});

elements.paperButton.addEventListener('click', (): void => {
  const computerSelection = computerPlay();
  const playerSelection: PlayerSelection = 'paper';
  playRound(playerSelection, computerSelection);
  [playerScore, compScore] = checkForWinner(playerScore, compScore);
  updateScores(playerScore, compScore);
});

elements.scissorsButton.addEventListener('click', (): void => {
  const computerSelection = computerPlay();
  const playerSelection: PlayerSelection = 'scissors';
  playRound(playerSelection, computerSelection);
  [playerScore, compScore] = checkForWinner(playerScore, compScore);
  updateScores(playerScore, compScore);
});
