const page = window.location.pathname.toLowerCase();
let category = "science"; // default

if (page.includes("sports")) category = "sports";
else if (page.includes("science")) category = "science";
else if (page.includes("entertainment")) category = "entertainment"; 
else if (page.includes("art")) category = "art";
else if (page.includes("history")) category = "history";
else if (page.includes("geography")) category = "geography";

const sportsQuestions = [
  {
    question: "Which country won the FIFA World Cup 2018?",
    options: ["Brazil", "Germany", "France", "Argentina"],
    correct: 2
  },
  {
    question: "Which sport uses a bat, ball, and wickets?",
    options: ["Baseball", "Tennis", "Cricket", "Golf"],
    correct: 2
  },
  {
    question: "Who holds the record for most Olympic gold medals?",
    options: ["Usain Bolt", "Michael Phelps", "Simone Biles", "Carl Lewis"],
    correct: 1
  },
  {
    question: "In football, how many players should each team have on the field?",
    options: ["9", "10", "11", "12"],
    correct: 2
  }
];

const scienceQuestions = [
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    correct: 1
  },
  {
    question: "How many planets are in the Solar System?",
    options: ["7", "8", "9", "10"],
    correct: 1
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Hydrogen", "Carbon Dioxide", "Nitrogen"],
    correct: 2
  },
  {
    question: "Which part of the plant conducts photosynthesis?",
    options: ["Root", "Stem", "Leaf", "Flower"],
    correct: 2
  }
];

const entertainmentQuestions = [
  {
    question: "Who played Iron Man in the Marvel Cinematic Universe?",
    options: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"],
    correct: 1
  },
  {
    question: "Which movie won Best Picture at the Oscars in 2020?",
    options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
    correct: 2
  },
  {
    question: "Which TV show features characters named Ross, Rachel, and Monica?",
    options: ["Friends", "How I Met Your Mother", "The Office", "Seinfeld"],
    correct: 0
  },
  {
    question: "What is the highest-grossing film of all time (worldwide)?",
    options: ["Titanic", "Avengers: Endgame", "Avatar", "Star Wars: The Force Awakens"],
    correct: 2
  }
];

const artQuestions = [
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correct: 2
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: 1
  },
  {
    question: "The 'Starry Night' is a famous painting by which artist?",
    options: ["Edvard Munch", "Salvador Dalí", "Vincent van Gogh", "Paul Cézanne"],
    correct: 2
  },
  {
    question: "Which novel begins with the line 'Call me Ishmael'?",
    options: ["Dracula", "Moby-Dick", "Frankenstein", "Great Expectations"],
    correct: 1
  }
];

const historyQuestions = [
  {
    question: "Who was the first President of the United States?",
    options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
    correct: 1
  },
  {
    question: "In which year did World War II end?",
    options: ["1942", "1945", "1939", "1950"],
    correct: 1
  },
  {
    question: "Which ancient civilization built the pyramids?",
    options: ["Romans", "Greeks", "Egyptians", "Mayans"],
    correct: 2
  },
  {
    question: "What wall came down in 1989, symbolizing the end of the Cold War?",
    options: ["Great Wall of China", "Berlin Wall", "Iron Curtain", "Western Wall"],
    correct: 1
  }
];

const geographyQuestions = [
  {
    question: "Which is the largest continent by area?",
    options: ["Africa", "Asia", "North America", "Europe"],
    correct: 1
  },
  {
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correct: 2
  },
  {
    question: "Which ocean lies between Africa and Australia?",
    options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    correct: 2
  },
  {
    question: "Mount Everest lies on the border of which two countries?",
    options: ["China and India", "India and Nepal", "China and Nepal", "Bhutan and Nepal"],
    correct: 2
  }
];




let questions = [];

if (category === "science") questions = scienceQuestions;
else if (category === "sports") questions = sportsQuestions;
else if (category === "entertainment") questions = entertainmentQuestions;
else if (category === "art") questions = artQuestions;
else if (category === "history") questions = historyQuestions;
else if (category === "geography") questions = geographyQuestions;

let currentQuestionIndex = 0;
let score = 0;
let timer = 0;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById("time").innerText = timer;
  }, 1000);
}

function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
}

function loadNextQuestion() {
  if (currentQuestionIndex >= questions.length) {
    showFinalScore();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById("question").innerText = currentQuestion.question;
  const options = document.querySelectorAll(".option-btn");

  options.forEach((button, index) => {
    button.innerText = currentQuestion.options[index];
    button.disabled = false;
    button.style.backgroundColor = "#a441b5";
    button.style.color = "white";
  });

  document.getElementById("feedback").innerText = "";
  document.getElementById("feedback").className = "";
  document.getElementById("next-btn").style.display = "none";
}

function selectAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === currentQuestion.correct;
  const options = document.querySelectorAll(".option-btn");

  options.forEach((button, index) => {
    button.disabled = true;
    if (index === currentQuestion.correct) {
      button.style.backgroundColor = "#02ba2c";
      button.style.color = "black";
    } else if (index === selectedIndex) {
      button.style.backgroundColor = "#f0051b";
      button.style.color = "black";
    }
  });

  if (isCorrect) {
    score++;
    document.getElementById("feedback").innerText = "Correct!🥳";
    document.getElementById("feedback").className = "correct";
  } else {
    document.getElementById("feedback").innerText = "Incorrect!☹️";
    document.getElementById("feedback").className = "incorrect";
  }

  document.getElementById("score").innerText = score;
  currentQuestionIndex++;
  document.getElementById("next-btn").style.display = "inline-block";
}

function showFinalScore() {
  clearInterval(timerInterval);
  document.getElementById("question-container").style.display = "none";
  document.getElementById("feedback").innerText = `Quiz Completed! Final Score: ${score}/${questions.length}`;
  document.getElementById("next-btn").style.display = "none";

  const restartBtn = document.createElement("button");
  restartBtn.innerText = "Restart Quiz";
  restartBtn.className = "btn btn-primary mt-3";
  restartBtn.onclick = restartQuiz;
  document.querySelector(".quiz-container").appendChild(restartBtn);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timer = 0;
  document.getElementById("score").innerText = score;
  document.getElementById("time").innerText = timer;
  document.getElementById("question-container").style.display = "block";
  document.getElementById("feedback").innerText = "";
  const restartBtn = document.querySelector(".btn-primary.mt-3");
  if (restartBtn) restartBtn.remove();
  shuffleQuestions();
  loadNextQuestion();
  startTimer();
}

// Init
shuffleQuestions();
loadNextQuestion();
startTimer();
