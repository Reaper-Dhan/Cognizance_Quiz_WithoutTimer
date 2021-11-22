const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const stop = document.getElementById('stop-btn')
const mssg = document.getElementById('mssg')
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        stop.classList.remove('hide')
        stop.addEventListener('click', () => {
            questionContainerElement.classList.add('hide')
            stop.classList.add('hide')
            mssg.innerHTML = "Your response has been recorded!!"
            startButton.innerText = 'Restart'
            startButton.classList.remove('hide')
            startButton.addEventListener('click', () => {
                mssg.innerHTML = ""
            })

        })
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [{
        question: 'Which tag specifies input controls option list in HTML5?',
        answers: [
            { text: '<output>', correct: false },
            { text: '<input>', correct: false },
            { text: '<keygen>', correct: false },
            { text: '<datalist>', correct: true }
        ]
    },
    {
        question: 'What is the preferred way for adding a background color in HTML?',
        answers: [
            { text: '<body background="yellow">', correct: false },
            { text: '<background>yellow</background>', correct: false },
            { text: '<body style="background-color:yellow">', correct: true },
            { text: '<background color="yellow">text<background>', correct: false }
        ]
    }, {
        question: 'How can you create an e-mail link?',
        answers: [
            { text: '<mail href="a@b">', correct: false },
            { text: '<mail>a@b</mail>', correct: false },
            { text: '<a href="a@b">', correct: false },
            { text: '<a href="mailto:a@b.com">', correct: true }
        ]
    }, {
        question: 'Which is not a property of attribute Behaviour of <Marquee> tag?',
        answers: [
            { text: 'alternate', correct: false },
            { text: 'blur', correct: true },
            { text: 'scroll', correct: false },
            { text: 'slide', correct: false }
        ]
    }, {
        question: 'Which tag(s) can handle mouse events in Netscape?',
        answers: [
            { text: '<A>', correct: true },
            { text: '<IMG>', correct: false },
            { text: '<BR>', correct: false },
            { text: 'None of the above', correct: false },
        ]
    }
]