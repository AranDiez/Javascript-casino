'use strict';
//--------------------VARIABLES
const chosenNumber = document.querySelector('.js-chosenNumber');
const currentAmount = document.querySelector('.js-amount');
const playBtn = document.querySelector('.js-playBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const message = document.querySelector('.js-message');
const text = document.querySelector('.js-text');
const roulette = document.querySelector('.js-roulette');
let balance = 50;

//--------------------FUNCTIONS
function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

function resetcounter() {
  balance = 50;

  const messageStart = 'Lets play!';
  renderMessage(messageStart);
  text.innerHTML = 'Balance: 50';
  chosenNumber.value = 1;
}
function hidden() {
  playBtn.classList.remove('hidden');
  resetBtn.classList.add('hidden');
}

function finish() {
  if (balance <= 0 || balance >= 200) {
    playBtn.classList.add('hidden');
    resetBtn.classList.remove('hidden');
  } else if (balance >= 200) {
    const messageEndWin = 'You won!';
    renderMessage(messageEndWin);
  }
}

function accumulated(randomNumber, selectedvalue) {
  if (currentAmount.value > balance) {
    const messageErr = `You cant bet more than what you have`;
    renderMessage(messageErr);
  } else {
    const aggregate = currentAmount.value;
    if (selectedvalue == randomNumber) {
      balance = 2 * parseInt(aggregate) + balance;
    } else {
      balance = balance - parseInt(aggregate);
    }
    text.innerHTML = `Balance: ${balance} `;
  }
}

function compare(randomNumber, selectedvalue) {
  if (selectedvalue === randomNumber) {
    const messageWin = 'You won double';
    renderMessage(messageWin);
  } else {
    const messageLost = 'You lost!';
    renderMessage(messageLost);
  }
}

function renderMessage(value) {
  message.innerHTML = value;
}
//--------------------MAIN FUNCTION
function handleClickplayBtn(event) {
  event.preventDefault();
  roulette.classList.add('spin');
  const randomNumber = getRandomNumber(6);
  const selectedvalue = parseInt(chosenNumber.value);
  compare(randomNumber, selectedvalue);
  accumulated(randomNumber, selectedvalue);
  finish();
}
function handleClickresetBtn(event) {
  event.preventDefault();
  hidden();
  resetcounter();
}
//  roulette.classList.toggleClass('spin');
// //----------SPIN FUNCTION
// function spin(event) {
//   event.preventDefault();
//   roulette.classList.add('spin');
// }
// function spin() {
//   roulette.classList.remove('spin');
// }
//--------------------EVENT LISTENER
playBtn.addEventListener('click', handleClickplayBtn);
resetBtn.addEventListener('click', handleClickresetBtn);
