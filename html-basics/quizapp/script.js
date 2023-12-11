let currentQuestion = 0;
let rightAnswers = [];

function render() {
    showQuestion();
}


function showQuestion() {
    if ((currentQuestion + 1) <= questions.length) {
        clearHtml();
        document.getElementById('question-field').innerHTML = questions[currentQuestion]['question'];
        for (let i = 0; i < questions[currentQuestion]['answers'].length; i++) {
            let currAnswear = questions[currentQuestion]['answers'][i];
            generateBtnHtml(i, currAnswear, currentQuestion);
        }
        let percent = Math.floor(((currentQuestion + 1) / questions.length) * 100);
        generateProgressBar(percent);
        generateQuestionFooter(currentQuestion, questions.length);
    } else {
        document.getElementById('card-body-container').innerHTML = '';
        generateEndScreen(rightAnswers.length, questions.length);
        document.getElementById('quiz-img').src = './img/endScreen.jpg';
    }
}


function clearHtml() {
    document.getElementById('question-field').innerHTML = '';
    document.getElementById('question-answears').innerHTML = '';
    document.getElementById('question-footer-field').innerHTML = '';
    document.getElementById('progress-container').innerHTML = '';
}


function checkAnswer(indexAnswear, indexQuestion) {
    let currAnswear = questions[indexQuestion]['answers'][indexAnswear];
    let btn = document.getElementById(`question-answear${indexAnswear}`);
    if (currAnswear.isCorrect === true) {
        rightAnswer(currAnswear, btn, indexQuestion);
    } else {
        wrongAnswer(btn, indexQuestion)
    }
    if (indexQuestion < questions.length) {
        document.getElementById('next-btn').disabled = false;
    }
}


function rightAnswer(currAnswear, btn, indexQuestion) {
    rightAnswers.push(currAnswear);
    btn.style.backgroundColor = '#198754';
    btn.style.color = '#000';
    disableAllAnswersBtn(indexQuestion);
}


function wrongAnswer(btn, indexQuestion) {
    btn.style.backgroundColor = '#dc3545';
    btn.style.color = '#000';
    disableAllAnswersBtn(indexQuestion);
}


function disableAllAnswersBtn(indexQuestion) {
    for (let i = 0; i < questions[indexQuestion]['answers'].length; i++) {
        let currBtn = document.getElementById(`question-answear${i}`);
        currBtn.disabled = true;
    }
}


function nextQuestion() {
    currentQuestion++;
    showQuestion();
}


function endQuiz() {

}