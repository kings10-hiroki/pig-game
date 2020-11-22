'use strict';

// DOM
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');
const playerScore1 = document.getElementById('score--0');
const playerScore2 = document.getElementById('score--1');
const playerCur1 = document.getElementById('current--0');
const playerCur2 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Variable
let diceNum;
let diceImg;
let curVal = 0;
let playerTurn1 = true;
let playerTurn2 = false;
let scoreVal1 = 0;
let scoreVal2 = 0;
let nowVal1 = 0;
let nowVal2 = 0;
// 勝利確定スコア
const winScore = 10;

// Function
/**
 * 1-6のランダムな数字を生成
 * @function
 * @return {number}} 1-6のランダムな数字を返す
 */
const createRandomNum = () => {
  return Math.trunc(Math.random() * 6) + 1;
};

/**
 * 'player--active'classが設定していなければ除去し、設定されていなければ追加をする
 * @function
 */
const togglePlayerActive = () => {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

/**
 * サイコロを振ったときの処理
 * - サイコロに出た数字を'current'に得点を合計していく
 * - player 交代
 * @function
 * @param {boolean} playerTurn true: player1, false: player2
 */
const processRollDice = playerTurn => {
  if (diceNum !== 1) {
    curVal += diceNum;
    // 得点を画面上に出力
    insertCurrentScore(playerTurn);
  } else {
    // player 交代
    changePlayerTurn(playerTurn);
  }
};

/**
 * 得点をcurrent scoreに挿入する
 * - サイコロに出た数字を'current'に得点を合計していく
 * @function
 * @param {boolean} playerTurn true: player1, false: player2
 */
const insertCurrentScore = playerTurn => {
  if (playerTurn) {
    playerCur1.textContent = curVal;
  } else {
    playerCur2.textContent = curVal;
  }
};

/**
 * 得点をplayer scoreに挿入する
 * - サイコロに出た数字を'player'に得点を合計していく
 * @function
 * @param {boolean} playerTurn true: player1, false: player2
 */
const insertPlayerScore = playerTurn => {
  if (playerTurn) {
    scoreVal1 = Number(playerCur1.textContent);
    nowVal1 = Number(playerScore1.textContent);
    nowVal1 += scoreVal1;
    playerScore1.textContent = nowVal1;
    playerCur1.textContent = 0;
  } else {
    scoreVal2 = Number(playerCur2.textContent);
    nowVal2 = Number(playerScore2.textContent);
    nowVal2 += scoreVal2;
    playerScore2.textContent = nowVal2;
    playerCur2.textContent = 0;
  }
};

/**
 * Playerが交代したときの処理
 * - player要素に'player--active'class付け替え
 * - playerTurn1,2に対してtrue or falseの入れ替え
 * @function
 * @param {boolean} playerTurn true: player1, false: player2
 */
const changePlayerTurn = playerTurn => {
  if (playerTurn) {
    player1.classList.contains('player--active')
      ? togglePlayerActive()
      : togglePlayerActive();
    playerTurn1 = false;
    playerTurn2 = true;
    curVal = 0;
    playerCur1.textContent = curVal;
  } else {
    player2.classList.contains('player--active')
      ? togglePlayerActive()
      : togglePlayerActive();
    playerTurn2 = false;
    playerTurn1 = true;
    curVal = 0;
    playerCur2.textContent = curVal;
  }
};

/**
 * どちらのplayerが勝利したか判定する
 * @function
 * @param {boolean} playerTurn true: player1, false: player2
 */
const judgeWin = playerTurn => {
  if (playerTurn) {
    if (nowVal1 >= winScore) {
      changePlayerTurn(playerTurn);
      alert('player 1 win');
      initialize();
      return;
    }
  }
  if (nowVal2 >= winScore) {
    changePlayerTurn(playerTurn);
    alert('player 2 win');
    initialize();
  }
};

/**
 * 初期化
 * @function
 */
const initialize = () => {
  dice.classList.add('hidden');

  nowVal1 = 0;
  nowVal2 = 0;
  scoreVal1 = 0;
  scoreVal2 = 0;
  playerScore1.textContent = 0;
  playerScore2.textContent = 0;
  playerCur1.textContent = 0;
  playerCur2.textContent = 0;
};

// NEW GAME Click Event
btnNew.addEventListener('click', () => {
  initialize();

  if (player2.classList.contains('player--active')) {
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
  }
});

// ROLL DICE Click Event
btnRoll.addEventListener('click', () => {
  diceNum = createRandomNum();
  diceImg = `dice-${diceNum}.png`;
  dice.classList.remove('hidden');
  dice.src = diceImg;

  if (playerTurn1) {
    processRollDice(true);
  } else {
    processRollDice(false);
  }
});

// HOLD Click Event
btnHold.addEventListener('click', () => {
  insertPlayerScore(playerTurn1);
  judgeWin(playerTurn1);
  changePlayerTurn(playerTurn1);
});
