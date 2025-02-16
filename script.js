let level = 0;
let gameseq = [];
let userseq = [];
let started = false;
let buttons = ["red", "yellow", "green", "purple"];
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  if (btn) {
    btn.classList.add("flash");
    setTimeout(function () {
      btn.classList.remove("flash");
    }, 150);
  } else {
    console.error("Invalid button passed to gameFlash.");
  }
}

function userFlash(btn) {
  if (btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
      btn.classList.remove("userflash");
    }, 250);
  }
}

function levelUp() {
  userseq = [];
  level++;
  if (h2) {
    h2.innerText = `Level ${level}`;
  }

  let randomind = Math.floor(Math.random() * buttons.length);
  let randcolor = buttons[randomind];
  let randbtn = document.querySelector(`.${randcolor}`);

  if (randbtn) {
    gameseq.push(randcolor);
    console.log(gameseq);
    gameFlash(randbtn);
  } else {
    console.error(`Button with class ${randcolor} not found.`);
  }
}

function checkAns(index) {
  if (userseq[index] === gameseq[index]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (h2) {
      h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to start`;
    }
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 250);
    reset();
  }
}

function btnpress() {
  let btn = this;
  userFlash(btn);
  let UserColor = btn.getAttribute("id");
  userseq.push(UserColor);
  checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
  btn.addEventListener("click", btnpress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}
