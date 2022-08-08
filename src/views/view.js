"use strict";

const outputWord = document.querySelector(".outputWord");
const modalTitleEl = document.querySelector(".modal-title");
const modalBodyEl = document.querySelector(".modal-body");
const currScoreEl = document.querySelector(".curr-score");
const totalScoreEl = document.querySelector(".total-score");
const inputField = document.querySelector(".form-control");

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let correctGuesses = 0;
let wrongGuesses = 0;
let correctGuessesArr = [];

totalScoreEl.textContent = localStorage.getItem("totalScore");
currScoreEl.textContent = localStorage.getItem("currScore");

let cScore = 0;
let tScore = 0;

$("#myModal").modal({ show: false });
// $("#exampleModalCenter").modal("show");

export class NewGame {
  createRandomWord(wordArr) {
    return wordArr[Math.floor(Math.random() * wordArr.length)];
  }

  outputWordToView(word) {
    outputWord.innerHTML = "";
    return [...word].forEach((_wd, i) =>
      outputWord.insertAdjacentHTML(
        "beforeend",
        `<div class="tile" data-type="${+i}">?</div>`
      )
    );
  }

  clearGuesses() {
    correctGuesses = 0;
    wrongGuesses = 0;
    correctGuessesArr = [];
  }

  showStarterHangman() {
    ctx.fillRect(70, 130, 160, 10);
    ctx.fillRect(70, 25, 5, 110);
    ctx.fillRect(70, 25, 120, 5);
  }

  clearHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  updateScore() {
    cScore = 0;

    localStorage.setItem("currScore", cScore);
    currScoreEl.textContent = localStorage.getItem("currScore");
  }
  hideInputField() {
    inputField.setAttribute("readonly", "readonly");
  }
  showInputField() {
    inputField.removeAttribute("readonly");
  }
}

export class Check {
  checkForEquality(word, inputLetter) {
    const ouputLetter = document.querySelectorAll(".tile");

    if (correctGuessesArr.includes(inputLetter)) {
      this.alreadyGuessed();
    }

    if (word.search(inputLetter) === -1) {
      wrongGuesses++;

      if (cScore >= 1) cScore -= 1;
      // currScoreEl.textContent = cScore;
      localStorage.setItem("currScore", cScore);
      currScoreEl.textContent = localStorage.getItem("currScore");
    }

    [...word].forEach((ltr, i) => {
      if (inputLetter === ltr) {
        if (!correctGuessesArr.includes(inputLetter)) {
          correctGuessesArr.push(inputLetter);
          cScore += 2;
          correctGuesses++;
          // currScoreEl.textContent = cScore;
          localStorage.setItem("currScore", cScore);
          currScoreEl.textContent = localStorage.getItem("currScore");
        }
        ouputLetter[i].textContent = `${ltr}`;
      }
    });

    let questionMarks = word.length;
    ouputLetter.forEach((x) => {
      if (x.textContent !== "?") {
        questionMarks -= 1;
      }
    });

    if (questionMarks === 0) {
      this.successModal();
    }

    this.createHangman(wrongGuesses);
  }

  successModal() {
    modalTitleEl.textContent = "🏆 Congrats!";
    modalBodyEl.textContent = "You guessed the word! Create another one!";
    $("#exampleModalCenter").modal("show");

    tScore = tScore + cScore;

    localStorage.setItem("totalScore", tScore);
    totalScoreEl.textContent = localStorage.getItem("totalScore");

    const reset = new NewGame();
    reset.clearGuesses();
    reset.updateScore();
    reset.hideInputField();
  }

  alreadyGuessed() {
    modalTitleEl.textContent = "🤔 Oops!";
    modalBodyEl.textContent = "You already guessed that letter!";
    $("#exampleModalCenter").modal("show");
  }

  gameOverMsg() {
    modalTitleEl.textContent = "☠ Game Over!";
    modalBodyEl.textContent = "You are dead...You lost your current score!";
    $("#exampleModalCenter").modal("show");
    cScore = 0;
    currScoreEl.textContent = cScore;
    const reset = new NewGame();
    reset.hideInputField();
  }

  createHangman(wrongGuesses) {
    switch (wrongGuesses) {
      case 1:
        ctx.fillRect(190, 25, 5, 25);
        break;
      case 2:
        ctx.beginPath();
        ctx.arc(192, 60, 10, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 3:
        ctx.fillRect(191, 70, 2, 45);
        break;
      case 4:
        ctx.fillRect(167, 80, 25, 2);
        break;
      case 5:
        ctx.fillRect(193, 80, 25, 2);
        break;
      case 6:
        ctx.fillRect(167, 113, 25, 2);
        break;
      case 7:
        ctx.fillRect(193, 113, 25, 2);
        break;
      default:
        ctx.fillRect(70, 130, 160, 10);
        ctx.fillRect(70, 25, 5, 110);
        ctx.fillRect(70, 25, 120, 5);
        break;
    }
    if (wrongGuesses === 7) {
      // 1 Show modal with game over msg
      this.gameOverMsg();
    }
  }
}

export const clearLocalStorage = function () {
  localStorage.clear();
  totalScoreEl.textContent = 0;
  currScoreEl.textContent = 0;
};
