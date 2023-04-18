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
      divide = numbers.indexOf("/");
    }
    console.group("MG");
    console.log("plus: ", plus, ", minus: ", minus, ", multiply: ", multiply, ", divide: ", divide);
    console.log(numbers);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    if (multiply > 0 && (multiply < divide || divide < 0)) {
      numbers.splice(
        multiply - 1,
        3,
        numbers[multiply - 1] * numbers[multiply + 1]
      );
      console.log("numbers: ", numbers);
    } else if (divide > 0) {
      numbers.splice(divide - 1, 3, numbers[divide - 1] / numbers[divide + 1]);
      console.log("numbers: ", numbers);
    } else if (plus > 0 && (plus < minus || minus < 0)) {
      numbers.splice(plus - 1, 3, numbers[plus - 1] + numbers[plus + 1]);
      console.log("numbers: ", numbers);
    } else if (minus > 0) {
      numbers.splice(minus - 1, 3, numbers[minus - 1] - numbers[minus + 1]);
      console.log("numbers: ", numbers);
    }
    console.groupEnd();
  }
  correctAnswer = numbers[0];
  console.log('correctAnswer: ', correctAnswer);

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

const checkResult = () => {
  userAnswer = parseInt(result.innerText);
  if (userAnswer === correctAnswer) {
    result.innerText = "Result";
    chooseNumbers();
  } else {
    alert("Wrong!");
  }
};

check.addEventListener("click", checkResult);

document.addEventListener("keyup", (e) => {
  console.log(e.code);
  const reg = /[0-9]/gi;
  let last = e.code.substring(e.code.length - 1, e.code.length);
  if (reg.test(last)) {
    if (result.innerText === "Result") result.innerText = "";
    result.innerText += last;
  } else if (e.code === "Backspace") {
    result.innerText = result.innerText.substring(
      0,
      result.innerText.length - 1
    );
  } else if (e.code === "NumpadEnter" || e.code === "Enter") checkResult();
  else if (e.code === "NumpadSubtract" || e.code === "Minus") {
    if (result.innerText === "Result") result.innerText = "";
    result.innerText += "-";
  }
  console.log("last : ", last);
});
