function generateBtnHtml(i, currAnswear, currentQuestion) {
    return document.getElementById('question-answears').innerHTML += /*html*/`
    <button id="question-answear${i}" class="btn btn-outline-secondary p-3" onclick="checkAnswer(${i}, ${currentQuestion})">
        ${currAnswear.option}
    </button>
    `;
}


function generateQuestionFooter(currentQuestion, allQuestionsNum) {
    return document.getElementById('question-footer-field').innerHTML += /*html*/`
    <div><b>${currentQuestion + 1}</b> von <b>${allQuestionsNum}</b> Fragen</div>
    <button id="next-btn" onclick="nextQuestion()" class="btn btn-outline-dark" disabled>${((currentQuestion + 1) === allQuestionsNum) ? 'Quiz Beenden' : 'Nexte Frage'}</button>
    `;
}


function generateEndScreen(rightAnswers, allQuestionsNum) {
    return document.getElementById('card-body-container').innerHTML += /*html*/`
    <div class="mb-4 text-center">
        <h4 id="question-field">Quiz beendet!</h4>
    </div>
    <div class="pb-3 text-center">Du hast ${rightAnswers} Fragen von ${allQuestionsNum} richtig beantwortet.</div>
    <div class="d-flex justify-content-center">
    <a href="" class="btn btn-outline-success">Wiederholen</a>
    </div>
    `;
}


function generateProgressBar(percent) {
    return document.getElementById('progress-container').innerHTML += /*html*/`
    <div class="progress-bar bg-success" style="width: ${percent}%">${percent}%</div>
    `;
}


