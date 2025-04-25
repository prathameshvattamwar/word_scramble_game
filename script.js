const wordList = [
    { word: "expansion", hint: "The process of increase or growth" },
    { word: "adventure", hint: "An unusual and exciting experience" },
    { word: "technology", hint: "Application of scientific knowledge" },
    { word: "knowledge", hint: "Facts, information, and skills acquired" },
    { word: "javascript", hint: "Popular scripting language for web" },
    { word: "computer", hint: "Electronic device for processing data" },
    { word: "internet", hint: "Global network connecting computers" },
    { word: "programming", hint: "Process of writing computer code" },
    { word: "learning", hint: "Acquisition of knowledge or skills" },
    { word: "creativity", hint: "Use of imagination or original ideas" },
    { word: "challenge", hint: "A demanding or stimulating task" },
    { word: "developer", hint: "Person who creates software" },
    { word: "database", hint: "Organized collection of data" },
    { word: "interface", hint: "Point where systems interact" },
    { word: "algorithm", hint: "Set of rules for calculations" },
    { word: "network", hint: "A group of interconnected computers" },
    { word: "variable", hint: "A symbol representing a value that can change" },
    { word: "function", hint: "A block of code designed to perform a task" },
    { word: "framework", hint: "A reusable set of libraries or classes" },
    { word: "library", hint: "A collection of pre-written code" },
    { word: "compiler", hint: "Translates source code to machine code" },
    { word: "debugging", hint: "Finding and fixing errors in code" },
    { word: "iteration", hint: "Repeating a process or instruction" },
    { word: "condition", hint: "A requirement for something to happen" },
    { word: "repository", hint: "Central location for storing code (e.g., Git)" },
    { word: "authentication", hint: "Verifying the identity of a user" },
    { word: "responsive", hint: "Design adapting to different screen sizes" },
    { word: "accessibility", hint: "Designing for people with disabilities" },
    { word: "optimization", hint: "Making something as effective as possible" },
    { word: "deployment", hint: "Making software available for use" },
    { word: "component", hint: "Reusable part of a user interface" },
    { word: "asynchronous", hint: "Operations running independently" },
    { word: "inheritance", hint: "Class deriving properties from another (OOP)" },
    { word: "polymorphism", hint: "Objects taking on many forms (OOP)" },
    { word: "encapsulation", hint: "Bundling data and methods together (OOP)" }
];

const wordText = document.querySelector(".scrambled-word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const messageText = document.querySelector(".message");

let correctWord, timer;
const maxTime = 30;

const initTimer = () => {
    clearInterval(timer);
    let timeLeft = maxTime;
    timeText.innerText = `${timeLeft}s`;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timeText.innerText = `${timeLeft}s`;
        } else {
            clearInterval(timer);
            messageText.innerText = `Time's up! The word was: ${correctWord.toUpperCase()}`;
            messageText.className = "message error";
            inputField.disabled = true;
            inputField.value = "";
            inputField.classList.remove('correct', 'incorrect');
        }
    }, 1000);
};

const shuffleWord = (word) => {
    let shuffled;
    do {
        shuffled = word.split('').sort(() => Math.random() - 0.5).join('');
    } while (shuffled === word && word.length > 1);
    return shuffled;
};

const initGame = () => {
    initTimer();
    const randomObj = wordList[Math.floor(Math.random() * wordList.length)];
    correctWord = randomObj.word.toLowerCase();
    const scrambled = shuffleWord(randomObj.word);

    wordText.innerText = scrambled.toUpperCase();
    hintText.innerText = randomObj.hint;
    inputField.value = "";
    inputField.disabled = false;
    inputField.setAttribute("placeholder", "Enter a valid word");
    inputField.focus();
    inputField.classList.remove('correct', 'incorrect');
    messageText.innerText = "";
    messageText.className = "message";
};

const checkWord = () => {
    const userWord = inputField.value.toLowerCase().trim();

    if (!userWord) {
        messageText.innerText = "Please enter a word to check.";
        messageText.className = "message error";
        inputField.classList.add('incorrect');
        setTimeout(() => inputField.classList.remove('incorrect'), 300);
        return;
    }

    if (userWord !== correctWord) {
        messageText.innerText = `Oops! "${userWord.toUpperCase()}" is not the correct word.`;
        messageText.className = "message error";
        inputField.classList.add('incorrect');
        setTimeout(() => {
             inputField.classList.remove('incorrect');
        }, 1500);

    } else {
        messageText.innerText = `Congrats! "${correctWord.toUpperCase()}" is the correct word.`;
        messageText.className = "message success";
        inputField.classList.add('correct');
        clearInterval(timer);
        setTimeout(() => {
            initGame();
        }, 2000);
    }
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
inputField.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && !inputField.disabled) {
        checkWord();
    }
    if (inputField.value.trim() !== '') {
         inputField.classList.remove('correct', 'incorrect');
         messageText.innerText = "";
         messageText.className = "message";
    }
});

initGame();