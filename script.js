window.addEventListener('DOMContentLoaded', () => {
//Clock
let hour = document.getElementById('hour');
let min = document.getElementById('min');
let sec = document.getElementById('sec');

function displayTime() {
    let date = new Date();

    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    let hRotation = 30 * hh + mm/2;
    let mRotation = 6 * mm;
    let sRotation = 6 * ss;

    hour.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;
}

setInterval(displayTime, 1000);

//Quiz
let quiz = []

fetch('quiz.json')
    .then(response => response.json())
    .then(data => {
        quiz = data;
        startQuiz();
    });
  

function startQuiz() {
    let currentQuestion = 0;
    let sleepTarget = 8;

    const question = document.querySelector('.question');
    const answers = document.querySelectorAll('.answers');
    const buttons = document.querySelectorAll('.answers button');

    function loadQuestion(index) {
        const q = quiz[index];
        question.textContent = q.question;

        buttons.forEach((btn, i) => {
            const answerData = q.answers[i]
            btn.textContent = answerData.text;
            btn.onclick = () => handleAnswer(answerData);
        });
    }

    function handleAnswer(answerData) {
        //Change sleep target time
        sleepTarget += answerData.sleepEffect;
        console.log(sleepTarget);

        //Skip questions
        if (answerData.text === "I didn't sleep last night" || answerData.text == "I don't have any assignment to do today" || answerData.text == "I don't have any tests tomorrow") {
            currentQuestion += 2;
        }
        else {
           currentQuestion++; 
        }
        
        if (currentQuestion < quiz.length) {
            loadQuestion(currentQuestion);
        }
        else {
            if (sleepTarget > 10){
                sleepTarget = 10;
            }
            question.textContent = `You should sleep ${sleepTarget} hours today!`;
            answers.forEach(div => {
                div.style.display = 'none';
            });
        }
    }

    loadQuestion(currentQuestion);
}

// Audio
document.querySelectorAll('img[data-sound]').forEach(img => {
    const icon = img.parentElement;
    const soundId = img.getAttribute('data-sound');
    const audio = document.getElementById(soundId);

    img.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            icon.style.outline = "2px solid white";
        } else {
            audio.pause();
            icon.style.outline = "2px solid rgba(255, 255, 255, 0.25)";
        }
    });
});
});