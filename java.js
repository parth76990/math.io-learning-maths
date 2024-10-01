let correctAnswer = 0;
let score = 0;

// Function to generate random numbers between two values
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate random math questions
function generateQuestion() {
    const questionTypes = [
        () => {
            const a = getRandomInt(1, 20);
            const b = getRandomInt(1, 20);
            correctAnswer = a + b;
            return `${a} + ${b}`;
        },
        () => {
            const a = getRandomInt(1, 20);
            const b = getRandomInt(1, 20);
            correctAnswer = a - b;
            return `${a} - ${b}`;
        }
    ];

    // Select a random type of question
    const randomType = getRandomInt(0, questionTypes.length - 1);
    const question = questionTypes[randomType]();

    // Display the generated question
    document.getElementById("question").innerText = `Solve: ${question}`;
    document.getElementById("feedback").innerText = ""; // Clear feedback
    document.getElementById("answer-box").value = ""; // Clear basic answer input
}

// Function to check the user's answer
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("answer-box").value);
    const feedback = document.getElementById("feedback");

    if (isNaN(userAnswer)) {
        feedback.innerText = "Please enter a valid number.";
        return;
    }

    if (userAnswer === correctAnswer) {
        score++;  // Increment score
        document.getElementById("score").innerText = `Score: ${score}`;  // Update score display

        const positiveFeedback = [
            "Great job! You're mastering these questions!",
            "Well done! Keep up the great work!",
            "Nice! Your math skills are getting better and better!",
            "Excellent! You're solving these like a pro!",
            "Correct! You're doing an amazing job!"
        ];

        // Randomly select one feedback sentence
        const randomFeedback = positiveFeedback[getRandomInt(0, positiveFeedback.length - 1)];
        feedback.innerText = randomFeedback;
        feedback.style.color = "green";
    } else {
        feedback.innerText = `Incorrect. The correct answer is ${correctAnswer}.`;
        feedback.style.color = "red";
    }

    // Automatically generate a new question after 2 seconds or transition to case-based questions
    if (score < 10) {
        setTimeout(generateQuestion, 2000);
    } else {
        transitionToCaseQuestions();
    }
}

// Function to transition to case-based questions
function transitionToCaseQuestions() {
    document.getElementById("question").innerText = ""; // Clear question
    document.getElementById("answer-box").style.display = "none"; // Hide basic answer box
    document.getElementById("caseQuestions").style.display = "block"; // Show case questions
    document.getElementById("next-button").style.display = "block"; // Show next button
    document.getElementById("speak-button").style.display = "block"; // Show speak button
    document.getElementById("feedback").innerText = ""; // Clear feedback
    displayCaseQuestion(); // Load the first case question
}

// Function to display a case question
let caseQuestions = [
    {
        question: "You have $50, and you buy 3 books for $12 each. How much money will you have left?",
        answer: 14
    },
    {
        question: "You have a garden that is 10 meters long and 5 meters wide. What is the area of the garden?",
        answer: 50
    },
    {
        question: "If you run 5 kilometers every day for a week, how many kilometers do you run in total?",
        answer: 35
    },
    {
        question: "A car travels 60 kilometers in 1 hour. How far will it travel in 4 hours?",
        answer: 240
    },
    {
        question: "You buy 2 packs of pens for $3 each. If you sell them for $5 each, what is your profit?",
        answer: 16
    }
    // Add more case questions as needed
];

let currentCaseIndex = 0;

// Function to display the case question
function displayCaseQuestion() {
    if (currentCaseIndex < caseQuestions.length) {
        const caseQuestion = caseQuestions[currentCaseIndex];
        document.getElementById("case-question").innerText = caseQuestion.question;
        document.getElementById("case-answer-box").value = ""; // Clear case answer input
        document.getElementById("case-feedback").innerText = ""; // Clear feedback
    } else {
        document.getElementById("case-question").innerText = "You've completed all the case questions!";
        document.getElementById("case-answer-box").style.display = "none"; // Hide answer box
        document.getElementById("case-submit-button").style.display = "none"; // Hide submit button
    }
}

// Function to check the answer for the case question
function checkCaseAnswer() {
    const userCaseAnswer = parseInt(document.getElementById("case-answer-box").value);
    const caseFeedback = document.getElementById("case-feedback");
    const caseQuestion = caseQuestions[currentCaseIndex];

    if (userCaseAnswer === caseQuestion.answer) {
        caseFeedback.innerText = "Correct! Well done!";
        caseFeedback.style.color = "green";
        currentCaseIndex++; // Move to the next case question
        setTimeout(displayCaseQuestion, 2000); // Automatically load the next question after 2 seconds
    } else {
        caseFeedback.innerText = `Incorrect. The correct answer is ${caseQuestion.answer}.`;
        caseFeedback.style.color = "red";
    }
}

// Function to speak the case question
function speakQuestion() {
    const caseQuestion = caseQuestions[currentCaseIndex];
    if (caseQuestion) {
        const utterance = new SpeechSynthesisUtterance(caseQuestion.question);
        speechSynthesis.speak(utterance);
    }
}

// Initial question generation
generateQuestion();
