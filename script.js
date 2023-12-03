'use strict';

(function monsterSlayerGame() {
  let playerHealth = 100;
  let monsterHealth = 100;
  let turnCount = 1;
  let points = 0;
  const playerBar = document.getElementById('p-health');
  const monsterBar = document.getElementById('m-health');
  const controls = document.getElementById('controls');
  const ul = document.getElementById('logList');

  document.getElementById('attack').addEventListener('click', function () {
    turnCount += 1;
    points = getRandom(5, 12);
    monsterHealth -= points;
    log(`Player attacks and deals ${points}`);
    checkWinner();
    monsterAttack();
  });

  document.getElementById('special').addEventListener('click', function () {
    if (turnCount % 3 === 0) {
      turnCount += 1;
      points = getRandom(10, 25);
      monsterHealth -= points;
      log(`Player special attacks and deals ${points}`);
      checkWinner();
      monsterAttack();
    } else {
      log(`Player can special attack each 3rd turn!`);
    }
  });

  document.getElementById('heal').addEventListener('click', function () {
    turnCount += 1;
    points = getRandom(8, 20);
    playerHealth += points;
    if (playerHealth > 100) {
      playerHealth = 100;
    }
    log(`Player heals himself for ${points}`);
    checkWinner();
    monsterAttack();
  });

  document.getElementById('surrender').addEventListener('click', function () {
    playerHealth -= 101;
    log(`Player surrenders...`);
    checkWinner();
  });

  function getRandom(min, max) {
    let points = Math.floor(Math.random() * (max - min + 1)) + min;
    return points;
  }

  function monsterAttack() {
    setTimeout(function () {
      points = getRandom(8, 15);
      playerHealth -= points;
      log(`Monster attacks and deals ${points}`);
      checkWinner();
    }, 1000);
  }

  function declareWinner(winner) {
    controls.classList.add('hide');
    document.getElementById('win').classList.remove('hide');
    document.querySelector('h2').textContent = `${winner} the winner !!!`;
  }

  function checkWinner() {
    if (playerHealth < 0) {
      playerBar.style.width = `0%`;
      let winner = 'Monster is';
      declareWinner(winner);
    } else if (monsterHealth < 0) {
      monsterBar.style.width = `0%`;
      let winner = 'You are';
      declareWinner(winner);
    }
    monsterBar.style.width = `${monsterHealth}%`;
    playerBar.style.width = `${playerHealth}%`;
  }

  function log(text) {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
  }

  function playAgain() {
    controls.classList.remove('hide');
    document.getElementById('win').classList.add('hide');
    ul.innerHTML = '';
    monsterHealth = 100;
    playerHealth = 100;
    turnCount = 1;
    points = 0;
    checkWinner();
  }

  document.getElementById('play').addEventListener('click', playAgain);
})();
