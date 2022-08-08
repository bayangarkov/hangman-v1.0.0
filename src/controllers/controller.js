"use strict";

import { words } from "../models/model.js";
import { NewGame, Check, clearLocalStorage } from "../views/view.js";

const selectedCategory = document.querySelector(".form-select");
const btnNewGame = document.querySelector(".btn-new-game");
const btnCheck = document.querySelector(".btn-check");
const inputField = document.querySelector(".form-control");
const btnClearScore = document.querySelector(".btn-clear-score");

btnClearScore.addEventListener("click", function (e) {
  e.preventDefault();
  clearLocalStorage();
});

let randomWordArr = [];

btnNewGame.addEventListener("click", function (e) {
  e.preventDefault();

  // Get data from options
  let typeCatg = selectedCategory.value;

  // Use data from options
  const createNewGame = new NewGame();
  if (typeCatg === "Select category") return;

  let rndmWord = createNewGame.createRandomWord(words.category[typeCatg]);
  console.log(`random word: ${rndmWord}`);

  randomWordArr.length = 0;
  randomWordArr.push(rndmWord);

  createNewGame.showInputField();
  createNewGame.clearHangman();
  createNewGame.outputWordToView(rndmWord);
  createNewGame.clearGuesses();
  createNewGame.updateScore();
  createNewGame.showStarterHangman();
});

btnCheck.addEventListener("click", function (e) {
  e.preventDefault();

  if (!randomWordArr.length) return;
  let inputLetter = inputField.value.toLowerCase();

  const verify = new Check();

  verify.checkForEquality(randomWordArr[0], inputLetter);

  inputField.value = "";
});
