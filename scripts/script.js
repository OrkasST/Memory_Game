const buttons = document.getElementById("numpad").childNodes;
const screen = document.getElementById("screen");
const result = document.getElementById("result");
const check = document.getElementById("check");

let correctAnswer = 0;
let numbers = [];
let userAnswer = 0;
let task = "";

const countAnswer = () => {
  let isSimplified = false;
  let multiply = -1,
    divide = -1,
    plus = -1,
    minus = -1;
  let counter = 10;
  while (numbers.length > 1 && counter > 0) {
    counter--;

    if (isSimplified || (multiply < 0 && divide < 0)) {
      plus = numbers.indexOf("+");
      minus = numbers.indexOf("-");
    } else if (!isSimplified) {
      multiply = numbers.indexOf("*");
      divide = numbers.indexOf("*");
    }


    if (multiply > 0 && multiply < divide) {
      numbers.splice(
        multiply - 1,
        3,
        numbers[multiply - 1] * numbers[multiply + 1]
      );
    } else if (divide > 0) {
      numbers.splice(divide - 1, 3, numbers[divide - 1] / numbers[divide + 1]);
    } else if (plus > 0 && plus < minus) {
      numbers.splice(plus - 1, 3, numbers[plus - 1] + numbers[plus + 1]);
    } else if (minus > 0) {
      numbers.splice(minus - 1, 3, numbers[minus - 1] - numbers[minus + 1]);
    }

  }
  correctAnswer = numbers[0];
};

const chooseNumbers = (level = 1) => {
  task = "";
  screen.innerText = "";
  let max = Math.ceil(Math.random() * 3 + 1);
  for (let i = 0; i < max; i++) {
    let number = Math.floor(Math.random() * (Math.pow(10, level) - 1) + 1);
    if (i === 0) {
      //correctAnswer = number;
      numbers = [number];
    } else {
      let sign = Math.floor(Math.random() * 2);
      switch (sign) {
        case 0:
          //correctAnswer += number;
          numbers.push("+", number);
          task += " + " + number;
          break;
        case 1:
          //correctAnswer -= number;
          numbers.push("-", number);
          task += " - " + number;
          break;
        case 2:
          //correctAnswer *= number;
          numbers.push("*", number);
          task += " * " + number;
          break;
        case 3:
          //correctAnswer /= number;
          numbers.push("/", number);
          task += " / " + number;
          break;
        default:
          break;
      }
      continue;
    }
    task += number;
  }
  countAnswer();
  task += " =";
  screen.innerText = task;
};
chooseNumbers();
const press = (button) => {
  if (button.innerText === "erase") {
    result.innerText = result.innerText.substring(
      0,
      result.innerText.length - 1
    );
  } else if (button.innerText === "clear") {
    result.innerText = "Result";
  } else {
    if (result.innerText === "Result") result.innerText = "";
    result.innerText += button.innerText;
  }
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("mousedown", () => {
    buttons[i].classList.remove("_btn-shadow");
  });
  buttons[i].addEventListener("touchstart", () => {
    buttons[i].classList.remove("_btn-shadow");
  });
  buttons[i].addEventListener("mouseup", () => {
    buttons[i].classList.add("_btn-shadow");
    press(buttons[i]);
  });
  buttons[i].addEventListener("touchend", () => {
    buttons[i].classList.add("_btn-shadow");
  });
}

check.addEventListener("click", () => {
  userAnswer = parseInt(result.innerText);
  if (userAnswer === correctAnswer) {
    result.innerText = "Result";
    chooseNumbers();
  } else {
    alert("Wrong!");
  }
});

document.addEventListener("keyup", (e) => {
    console.log(e.code);
})
