const emojis = [
  "😃",
  "😃",
  "👻",
  "👻",
  "😠",
  "😠",
  "👽",
  "👽",
  "💌",
  "💌",
  "👌",
  "👌",
  "💖",
  "💖",
  "😍",
  "😍",
];
var score = 0;
var youwin = false

// const shuffle = () => {

//     emojis.sort(() => Math.random() - 0.5);
//     for (let i = 0; i < emojis.length; i++) {
//         const card = document.createElement("div");
//         card.classList.add("card");
//         card.innerHTML = `<span>${emojis[i]}</span>`;
//         game.appendChild(card);
//         card.addEventListener("click", () => {
//             card.classList.add("flipped");
//             card.innerHTML = `<span>${emojis[i]}</span>`;
//             score++;
//             scoreBoard.textContent = score;
//         });
//     }
// }
// shuffle();

// reset.addEventListener("click", () => {
//     score = 0;
//     scoreBoard.textContent = score;
//     game.innerHTML = "";
//     shuffle();
// });

function addGameCard(emojis) {
  let shuf_emojis = emojis.sort(() => Math.random() - 0.5);
  for (let i = 0; i < emojis.length; i++) {
    const box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuf_emojis[i];
    box.classList.add("boxOpen")
    setTimeout(function () {
      box.classList.remove("boxOpen")
    }, 1500)
    box.addEventListener("click", checkCards);

    function checkCards() {
      this.classList.add("boxOpen");
      clearTimeout();
      setTimeout(function () {
        if (document.querySelectorAll(".boxOpen").length > 1) {
          if (
            document.querySelectorAll(".boxOpen")[0].innerHTML ==
            document.querySelectorAll(".boxOpen")[1].innerHTML
          ) {
            console.log(document.querySelectorAll(".boxOpen")[0]);
            console.log(document.querySelectorAll(".boxOpen")[1]);
            let boxMatchedList = document.querySelectorAll(".boxOpen");
            boxMatchedList[0].classList.remove("boxOpen");
            boxMatchedList[1].classList.remove("boxOpen");
            boxMatchedList[0].classList.add("boxMatch");
            boxMatchedList[1].classList.add("boxMatch");

            // play sound
            const sound = document.getElementById("sound");
            sound.play();
            score += 2;
            document.querySelector("#score").textContent = score;
            let allmatchedList = document.querySelectorAll(".boxMatch");
            console.log(allmatchedList.length);
            if (allmatchedList.length == emojis.length) {
              const win = document.getElementById("win");
              win.play();
              youwin = true
            }
          } else {
            document.querySelectorAll(".boxOpen").forEach((box) => {
              box.classList.remove("boxOpen");
            });
          }
        }
      }, 500);
      // score++;
      // scoreBoard.textContent = score;
    }
    document.querySelector(".game").appendChild(box);
  }
}

function startTimer() {
  var timeLimitInMinutes = 1;
  var timeLimitInSeconds = timeLimitInMinutes * 60;
  var timerElement = document.getElementById("timer");

  function startTimer() {
    timeLimitInSeconds--;
    var minutes = Math.floor(timeLimitInSeconds / 60);
    var seconds = timeLimitInSeconds % 60;

    if(youwin){
        clearInterval(timerInterval);
    }

    if (timeLimitInSeconds < 0) {
      timerElement.textContent = "00:00";
      // reset game and show score
    //   document.querySelector("#start").classList.remove("d-none");
    //   document.querySelector("#reset").classList.remove("d-none");
      document.querySelector(".timer").classList.add("d-none");
      document.querySelector(".score").classList.remove("d-none");
      document.querySelector("#score").textContent = score;
      document.querySelector(".game").classList.add("d-none");
      clearInterval(timerInterval);
      return;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    timerElement.textContent = minutes + ":" + seconds;
  }

  var timerInterval = setInterval(startTimer, 1000);
}

function startGame() {
  addGameCard(emojis);
  startTimer();
  document.querySelector("#start").classList.add("d-none");
  document.querySelector("#reset").classList.remove("d-none");
  document.querySelector(".timer").classList.remove("d-none");
  document.querySelector(".score").classList.remove("d-none");
}
