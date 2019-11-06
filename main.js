/********
Variables
********/

var boxes = document.querySelectorAll(".box");
var buttons = document.querySelectorAll(".difficulty button");
var resetBtn = document.querySelector(".reset");
var currentLvl = "";
var answer = document.querySelector("h1");
var msg = document.querySelector(".message");

/********
Event Listeners
********/

// Difficulty
buttons.forEach(btn => {
  btn.addEventListener("click", function() {
    if (this.classList.contains("hard")) {
      difficulty("hard");
    } else {
      difficulty("easy");
    }
  });
});

// Reset
resetBtn.onclick = () => {
  if (currentLvl === "easy") {
    difficulty("easy");
  } else {
    difficulty("hard");
  }
};

boxes.forEach(box => {
  box.addEventListener("click", function() {
    if (this.style.background === answer.textContent) {
      msg.textContent = "Correct!";
      correct(this.style.background);
    } else {
      msg.textContent = "Wrong, try again";
      this.style.opacity = 0;
    }
  });
});

/********
Functions
********/

function randColor() {
  // Apply random color to boxes
  boxes.forEach(el => {
    var randomColor =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";

    el.style.background = randomColor;
  });
}

function randBox(number) {
  // Picking color answer
  var randBoxColor = boxes[Math.floor(Math.random() * number)].style.background;
  answer.textContent = randBoxColor;
}

function reset() {
  msg.textContent = "";
  document.querySelector('header').style.background = "#17a2b8";
  boxes.forEach(box => {
    box.style.opacity = 1;
    box.style.pointerEvents = "auto";
  });
}

function correct(color) {
  document.querySelector('header').style.background = color;
  boxes.forEach(box => {
    msg.style.color = color;
    box.style.background = color;
    box.style.pointerEvents = "none";
  });
}

// Difficulty
function difficulty(level) {
  if (level === "easy") {
    for (let i = 3; i < boxes.length; i++) {
      boxes[i].style.display = "none";
    }
    // toggle focus class
    buttons[0].classList.add("on");
    buttons[1].classList.remove("on");
    randColor();
    randBox(3);
    currentLvl = "easy";
    reset();
  } else if (level === "hard") {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].style.display = "block";
    }
    buttons[1].classList.add("on");
    buttons[0].classList.remove("on");
    randColor();
    randBox(6);
    currentLvl = "hard";
    reset();
  }
}

difficulty("easy");
