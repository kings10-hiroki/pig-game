/**
 * 1-6のランダムな数字を生成
 * @function
 * @return {number}} 1-6のランダムな数字を返す
 */
export const createRandomNum = () => {
  return Math.trunc(Math.random() * 6) + 1;
};

/**
 * 'player--active'classが設定していなければ除去し、設定されていなければ追加をする
 * @function
 */
export const togglePlayerActive = () => {
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
export const processRollDice = playerTurn => {
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
export const insertCurrentScore = playerTurn => {
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
export const insertPlayerScore = playerTurn => {
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
export const changePlayerTurn = playerTurn => {
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
export const judgeWin = playerTurn => {
  if (playerTurn) {
    if (nowVal1 >= 10) {
      changePlayerTurn(playerTurn);
      alert('player 1 win');
      initialize();
    }
  } else {
    if (nowVal2 >= 10) {
      changePlayerTurn(playerTurn);
      alert('player 2 win');
      initialize();
    }
  }
};

/**
 * 初期化
 * @function
 */
export const initialize = () => {
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
