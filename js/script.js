const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
let test;

//Verifica tamanho do titulo
function tamanhoTitulo() {
    let nomeTitulo = document.getElementById("titulo").value;
    let n = nomeTitulo.length;
    if (n < 20) {
        alert("O titulo deve ter no mínimo 20 caracteres. Numero de caracteres digitados: " + n);
    } else if (n > 65) {
        alert("O nome não pode ultrapassar 65 caracteres. Numero de caracteres digitados: " + n);
    }
}


//verifica URL
function verificaURL() {
    let re = new RegExp("^((http(s?):\/\/(www.)?[a-z]+.com\/)|(magnet:\?xt=urn:btih:))")

    let urlImage = document.getElementById("url-image").value;

    //Se url valida retorna tudo ok senão retorna invalid
    if (re.test(urlImage)) {
        alert("Tudo Ok");
    } else {
        alert("A url passada não é válida");
        document.getElementById("url-image").focus();
    }
}

//verifica numeros digitados
function restricaoNumeros() {
    const perguntasInput = document.querySelector("#num-perguntas");
    const quizzInput = document.querySelector("#num-quizz");

    if (perguntasInput.value < 3) {
        alert("O número de perguntas deve ser maior que: 3");
        perguntasInput.focus();
    } else if (quizzInput.value < 2) {
        alert("O valor dos níveis deve ser maior que: 2");
        quizzInput.focus();
    }
}

//Validação dos inputs
function validaInput() {
    if (document.getElementById("titulo").value == "") {
        alert('Por favor, preencha o campo título');
        document.getElementById("titulo").focus();
        return false;
    } else if (document.getElementById("url-image").value == "") {
        alert('Por favor, preencha o campo URL da imagem');
        document.getElementById("url-image").focus();
        return false;
    } else if (document.getElementById("num-perguntas").value == "") {
        alert('Por favor, preencha quantas perguntas');
        document.getElementById("num-perguntas").focus();
        return false;
    } else if (document.getElementById("num-quizz").value == "") {
        alert('Por favor, preencha quantos níveis');
        document.getElementById("num-quizz").focus();
        return false;
    }

    tamanhoTitulo();
    restricaoNumeros();
    verificaURL();
}


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
    //document.getElementById('remove-onclick').removeAttribute("onclick");
}

function randomizador() {
    return Math.random() - 0.5;
}

function home() {
    document.querySelector(".quizzez-list").classList.remove("hide");
    document.querySelector(".quizz-page").classList.add("hide");
}

getQuizzes();
