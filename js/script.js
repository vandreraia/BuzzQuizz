const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
let test;

function getQuizzes() {
    const promise = axios.get(`${API}/quizzes`);
    promise.then(postQuizzes);
    promise.catch(function () {
        console.log("getQuizzes error");
    });
}

function postQuizzes(response) {
    const quizzes = response.data;
    const element = document.querySelector(".todos-quizzes");
    test = quizzes;
    //element.innerHTML = "";
    for (let i = 0; i < quizzes.length; i++) {
        element.innerHTML += `
        <div id="${quizzes[i].id}" onclick="showquizz(this.id)" class="quizz">
            <img src="${quizzes[i].image}" />
            <div>
                <p>${quizzes[i].title}</p>
            </div>
        </div>`;
    }
}

function showquizz(id) {
    document.querySelector(".quizzez-list").classList.add("hide");
    document.querySelector(".quizz-page").classList.remove("hide");
    const promise = axios.get(`${API}/quizzes/${id}`);
    promise.then(postQuizz);
    promise.catch(function () {
        console.log("showquizz error");
    });
}

function postQuizz(response) {
    const quizz = response.data;
    let el;
    let str = "";
    el = document.querySelector(".titulo");
    el.innerHTML = `
    <img src="${quizz.image}" />
    <div>
        <p>${quizz.title}</p>
    </div>`;
    test = quizz;
    el = document.querySelector(".question-container");
    el.innerHTML = "";

    for (let i = 0; i < quizz.questions.length; i++) {
        str += `
        <div style="background-color:${quizz.questions[i].color};" class="pergunta flex-center">
            ${quizz.questions[i].title}
        </div>
        <div class="respostas flex-center">
        `;
        quizz.questions[i].answers.sort(randomizador);
        for (let j = 0; j < quizz.questions[i].answers.length; j++) {
            str += `
            <div id="${quizz.questions[i].answers[j].isCorrectAnswer}" class="resposta" onclick="checkResposta(this)">
                <img src="${quizz.questions[i].answers[j].image}" />
                <p>${quizz.questions[i].answers[j].text}</p>
            </div>`;
        }
        str += `</div>`;
    }
    el.innerHTML = str;
}

function checkResposta(id) {
    test = id;
    console.log(id)
}

function randomizador() {
    return Math.random() - 0.5;
}

function home() {
    document.querySelector(".quizzez-list").classList.remove("hide");
    document.querySelector(".quizz-page").classList.add("hide");
}

getQuizzes();