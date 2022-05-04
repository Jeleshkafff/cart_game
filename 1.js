"use strict";
let x_position;
let y_position;
let cardsArray = [
  {
    name: "shell",
    img: "img/Paimon1.jpg",
  },
  {
    name: "star",
    img: "img/Paimon2.jpg",
  },
  {
    name: "bobomb",
    img: "img/Chongyun.jpg",
  },
  {
    name: "mario",
    img: "img/Albedo.jpg",
  },
  {
    name: "luigi",
    img: "img/Diona.jpg",
  },
  {
    name: "peach",
    img: "img/Ganyu.jpg",
  },
  {
    name: "1up",
    img: "img/Keqing.jpg",
  },
  {
    name: "mushroom",
    img: "img/Raiden.jpg",
  },
  {
    name: "thwomp",
    img: "img/Scaramouche.jpg",
  },
  {
    name: "bulletbill",
    img: "img/Sucrose.jpg",
  },
  {
    name: "coin",
    img: "img/Venti.jpg",
  },
  {
    name: "goomba",
    img: "img/Xiao.jpg",
  },
];

let gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

let firstGuess = "";
let secondGuess = "";
let count = 0;
let previousTarget = null;
let delay = 1200;

let game = document.getElementById("game");
let grid = document.createElement("section");
grid.setAttribute("class", "grid");
game.appendChild(grid);

gameGrid.forEach(function (item) {
  let name = item.name,
    img = item.img;

  let card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = name;

  let front = document.createElement("div");
  front.classList.add("front");

  let back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = "url(" + img + ")";

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

let match = function match() {
  let selected = document.querySelectorAll(".selected");
  selected.forEach(function (card) {
    card.classList.add("match");
  });
};

let resetGuesses = function resetGuesses() {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  previousTarget = null;

  let selected = document.querySelectorAll(".selected");
  selected.forEach(function (card) {
    card.classList.remove("selected");
  });
};

grid.addEventListener("click", function (event) {
  let clicked = event.target;

  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("match")
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add("selected");
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});
