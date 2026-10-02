// Banco de dados de perguntas (Conteúdo de Ciências para o 6º ano - 10 Questões)
const questions = [
  {
    question: "Qual das camadas da Terra é sólida e formada por rochas e solo, onde nós vivemos?",
    options: ["Núcleo interno", "Litosfera (Crosta)", "Manto", "Manteiga"],
    answer: 1
  },
  {
    question: "Os seres vivos que produzem seu próprio alimento através da fotossíntese são chamados de:",
    options: ["Consumidores", "Decompositores", "Produtores", "Carnívoros"],
    answer: 2
  },
  {
    question: "A passagem da água do estado líquido para o estado gasoso (vapor) pelo calor do Sol chama-se:",
    options: ["Condensação", "Evaporação", "Solidificação", "Fusão"],
    answer: 1
  },
  {
    question: "Qual elemento é essencial para a respiração da maioria dos seres vivos?",
    options: ["Gás Carbônico", "Gás Oxigênio", "Gás Hélio", "Metano"],
    answer: 1
  },
  {
    question: "Cogumelos e bactérias que transformam a matéria orgânica morta em nutrientes são:",
    options: ["Decompositores", "Produtores", "Predadores", "Herbívoros"],
    answer: 0
  },
  {
    question: "Qual é a camada de gases que envolve a Terra e protege o planeta contra radiações solares nocivas?",
    options: ["Hidrosfera", "Atmosfera", "Biosfera", "Litosfera"],
    answer: 1
  },
  {
    question: "As rochas formadas pelo resfriamento e solidificação do magma vulcânico são chamadas de:",
    options: ["Rochas Magmáticas (Ígneas)", "Rochas Sedimentares", "Rochas Metamórficas", "Rochas Plásticas"],
    answer: 0
  },
  {
    question: "Quando o vapor de água sobe para a atmosfera, esfria e forma as nuvens, ocorre o processo de:",
    options: ["Evaporação", "Fusão", "Condensação", "Transpiração"],
    answer: 2
  },
  {
    question: "Qual das opções a seguir representa um exemplo de mistura homogênea?",
    options: ["Água com areia", "Água e óleo", "Água mineral com sais dissolvidos", "Granito"],
    answer: 2
  },
  {
    question: "A lente natural do olho humano que ajusta o foco das imagens na retina é chamada de:",
    options: ["Íris", "Pupila", "Cristalino", "Córnea"],
    answer: 2
  }
];

// Estado do jogo
let currentQuestionIndex = 0;
let score = 0;

// Seleção de elementos do DOM
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const btnStart = document.getElementById("btn-start");
const btnNext = document.getElementById("btn-next");
const btnRestart = document.getElementById("btn-restart");
const themeToggle = document.getElementById("theme-toggle");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const scoreDisplay = document.getElementById("score");
const questionNumberDisplay = document.getElementById("question-number");
const feedbackDisplay = document.getElementById("feedback");
const finalMessage = document.getElementById("final-message");

// Event Listeners
btnStart.addEventListener("click", startGame);
btnNext.addEventListener("click", nextQuestion);
btnRestart.addEventListener("click", restartGame);
themeToggle.addEventListener("click", toggleTheme);

// Alternar Modo Escuro / Claro
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDarkMode ? "☀️ Modo Claro" : "🌙 Modo Escuro";
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Carregar tema salvo anteriormente
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Modo Claro";
  }
}

// Executa verificação de tema inicial
loadSavedTheme();

// Funções de Controle do Jogo
function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.textContent = score;
  
  startScreen.classList.remove("active");
  endScreen.classList.remove("active");
  gameScreen.classList.add("active");
  
  loadQuestion();
}

function loadQuestion() {
  resetState();
  const currentQ = questions[currentQuestionIndex];
  
  // Atualiza o texto do botão de acordo com a pergunta (Próxima x Finalizar)
  if (currentQuestionIndex === questions.length - 1) {
    btnNext.textContent = "Finalizar Quiz 🏁";
  } else {
    btnNext.textContent = "Próxima Pergunta ➡️";
  }

  questionNumberDisplay.textContent = `${currentQuestionIndex + 1}/${questions.length}`;
  questionText.textContent = currentQ.question;

  currentQ.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.textContent = optionText;
    button.classList.add("btn-option");
    button.addEventListener("click", () => selectOption(index, button));
    optionsContainer.appendChild(button);
  });
}

function resetState() {
  feedbackDisplay.classList.add("hidden");
  feedbackDisplay.className = "feedback hidden";
  btnNext.classList.add("hidden");
  optionsContainer.innerHTML = "";
}

function selectOption(selectedIndex, selectedButton) {
  const currentQ = questions[currentQuestionIndex];
  const buttons = optionsContainer.querySelectorAll(".btn-option");

  // Desabilita todos os botões após a escolha
  buttons.forEach(btn => btn.disabled = true);

  if (selectedIndex === currentQ.answer) {
    score += 10;
    scoreDisplay.textContent = score;
    selectedButton.classList.add("correct");
    feedbackDisplay.textContent = "Resposta Correta! Excelente! 🌟";
    feedbackDisplay.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
    buttons[currentQ.answer].classList.add("correct"); // Destaca a resposta certa
    feedbackDisplay.textContent = "Ops! Resposta incorreta. Continue tentando! 💪";
    feedbackDisplay.classList.add("wrong");
  }

  feedbackDisplay.classList.remove("hidden");
  btnNext.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showEndScreen();
  }
}

function showEndScreen() {
  gameScreen.classList.remove("active");
  endScreen.classList.add("active");
  
  const totalPossible = questions.length * 10;
  finalMessage.textContent = `Você obteve ${score} de ${totalPossible} pontos possíveis!`;
}

function restartGame() {
  startGame();
}