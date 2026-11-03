import "./style.css";

// This is part of how we interact with the DOM (document object model).
window.onload = () => {
  const target = Math.floor(Math.random() * 100);

  // window.onload is a function that runs when the page is loaded.
  const guess_input = document.querySelector("#guess_input");
  const submit_button = document.querySelector("#submit_button");

  guess_input?.addEventListener("input", update_guess_display);
  submit_button?.addEventListener("click", (ev) => make_guess(ev, target));
};

type NumberGuess = "high" | "low" | "correct";

const update_guess_display = (ev) => {
  const guess_display = document.querySelector("#guess_display");
  if (!guess_display) {
    return;
  }

  guess_display.innerHTML = ev?.target.value;
};

const make_guess = (ev: Event, target: number) => {
  ev.preventDefault();
  const guess_display = document.querySelector("#guess_display");
  const result_display = document.querySelector("#result_display");

  if (!result_display || !guess_display) {
    return;
  }

  const guess = parseInt(guess_display.innerHTML);

  result_display.innerHTML = `Your guess is ${guess_number(guess, target)}.`;
};

function guess_number(guess: number, answer: number): NumberGuess {
  if (guess === answer) {
    return "correct";
  } else if (answer - guess > 0) {
    return "low";
  }
  return "high";
}
