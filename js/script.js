const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
let answers;
let test;
let scrollIndex = 0;
let acerto = 0;
let quizz;
let obj = {};

//Código comentado pois estou reduzindo à uma única função, quando a função estiver pronta removerei

// //Verifica tamanho do titulo
// function tamanhoTitulo(){
//     let nomeTitulo = document.getElementById("titulo").value;
//     let n = nomeTitulo.length;
//     if(n < 20){
//         alert("O titulo deve ter no mínimo 20 caracteres. Numero de caracteres digitados: " + n);
//     }else if(n > 65){
//         alert("O nome não pode ultrapassar 65 caracteres. Numero de caracteres digitados: "+ n);
//     }
// }


// //verifica se a URL passada é válida 
// function verificaURL(){
//     let expressão = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
//     let re = new RegExp(expressão); /* ("^((http(s?):\/\/(www.)?[a-z]+.com\/)|(magnet:\?xt=urn:btih:))"); */

//     let urlImage = document.getElementById("url-image").value;

//     //Se url valida retorna tudo ok senão retorna invalid
//     if (re.test(urlImage)) {
//     alert("Tudo Ok");
//     } else {
//     alert("A url passada não é válida");
//     document.getElementById("url-image").focus();
//     }
// }

// //verifica numeros digitados
// function restricaoNumeros(){
//     const perguntasInput = document.querySelector("#num-perguntas");
//     const quizzInput = document.querySelector("#num-quizz");

//     if(perguntasInput.value < 3){
//         alert("O número de perguntas deve ser maior que: 3");
//         perguntasInput.focus();
//     }else if (quizzInput.value < 2){
//         alert("O valor dos níveis deve ser maior que: 2");
//         quizzInput.focus();
//     }
// }

// //Validação dos inputs
// function validaInput(){
//     if(document.getElementById("titulo").value == ""){
//     alert('Por favor, preencha o campo título');
//     document.getElementById("titulo").focus();
//     return false;
//     }else if(document.getElementById("url-image").value == ""){
//     alert('Por favor, preencha o campo URL da imagem');
//     document.getElementById("url-image").focus();
//     return false;
//     }else if(document.getElementById("num-perguntas").value == ""){
//     alert('Por favor, preencha quantas perguntas');
//     document.getElementById("num-perguntas").focus();
//     return false;
//     }else if(document.getElementById("num-quizz").value == ""){
//     alert('Por favor, preencha quantos níveis');
//     document.getElementById("num-quizz").focus();
//     return false;
//     }

//     tamanhoTitulo();
//     verificaURL();
//     restricaoNumeros();
// }

function verificaImage(verurlimg){
    return (verurlimg.match(/\.(jpeg|jpg|gif|png)$/) != null);
}


//Validação dos campos
function validacao(){
    const tituloQuizz = document.getElementById("titulo").value;
    const urlImageQUizz = document.getElementById("url-image").value;
    const numPerguntasQuizz = document.getElementById("num-perguntas").value;
    const niveisQuizz = document.getElementById("num-quizz").value;

    if(tituloQuizz < 20 || tituloQuizz > 65 || numPerguntasQuizz < 3 || niveisQuizz < 2 || !verificaImage(urlImageQUizz)){
        alert("Peencha os campos corretamente");
    }else{
        obj = {
            title: tituloQuizz,
            image: urlImageQUizz,
            questions: [],
            levels: []
        }
        document.querySelector(".info-quizz").classList.add("hide");
        document.querySelector(".build-quizz").classList.remove("hide");
        criarPerguntas(numPerguntasQuizz);
    }
}

//Criação das perguntas
function criarPerguntas(numPerguntasQuizz){
    const container = document.querySelector(".build-quizz .container");
    for (let i=1; i<=numPerguntasQuizz; i++){
        container.innerHTML += `
        <div class=".pergunta"PerguntaDOconteiner">
        <h3 class=".pergunta">Pergunta ${i}</h3>
        <input type="text" placeholder="Texto da pergunta" data-identifier="question"/>
        <input type="text" placeholder="Cor de fundo da pergunta" data-identifier="question"/>
        <h3 class="Texto-Especifica-Input Texto-Definiçao">Resposta correta</h3>
        <input type="text" placeholder="Resposta correta" data-identifier="question"/>
        <input type="text" placeholder="URL da imagem" data-identifier="question"/>
        
        <h3 class="">Respostas Incorretas</h3>
        <input type="text" placeholder="Resposta incorreta 1" data-identifier="question"/>
        <input type="text" placeholder="URL da imagem 1" data-identifier="question"/>
        <input type="text" placeholder="Resposta incorreta 2" data-identifier="question"/>
        <input type="text" placeholder="URL da imagem 2" data-identifier="question"/>
        <input type="text" placeholder="Resposta incorreta 3" data-identifier="question"/>
        <input type="text" placeholder="URL da imagem 3" data-identifier="question"/>
        </div>`;
    }
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
    quizz = response.data;
    let el;
    let str = "";
    el = document.querySelector(".titulo");
    el.innerHTML = `
    <img src="${quizz.image}" />
    <div>
        <p>${quizz.title}</p>
    </div>`;
    el = document.querySelector(".question-containers");
    el.innerHTML = "";

    for (let i = 0; i < quizz.questions.length; i++) {
        str += `
        <div class="question-container flex-center">
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
        str += `</div></div>`;
    }
    el.innerHTML = str;
}

function checkResposta(el) {
    const scrollBlock = document.querySelector(".question-containers").children;
    answers = el.parentElement.children;
    if (el.id == "true") {
        acerto++;
    }
    for (let i = 0; i < answers.length; i++) {
        answers[i].removeAttribute("onclick");
        answers[i].classList.add("opacity");
        if (answers[i].id == "true") {
            answers[i].classList.add("resposta-certa");
        } else {
            answers[i].classList.add("resposta-errada");
        }
    }
    el.classList.remove("opacity");
    scrollIndex++;
    if (scrollIndex == scrollBlock.length) {
        quizzEnd();
    }
    if (scrollIndex < scrollBlock.length)
    scrollBlock[scrollIndex].scrollIntoView();
}

function quizzEnd() {
    const porcentagem = acerto / quizz.questions.length;
    const level = getLevel(porcentagem);
    let el = document.querySelector(".end-container");
    el.innerHTML +=`
                <div class="question-container">
                    <div style="background-color:#EC362D;" class="pergunta flex-center">
                        ${(porcentagem*100).toFixed(0)}% de acerto: ${quizz.levels.at(level).title}
                    </div>
                    <div class="end">
                        <img src="${quizz.levels.at(level).image}" />
                        <h5>${quizz.levels.at(level).text}</h5>
                    </div>
                </div>
                `;
    el.innerHTML += `
    <div class="flex-center flex-collum">
    <button onCLick="quizzReset()" class="button">Reiniciar Quizz</button>
    <button onclick="home()" class="button button-quizz">Voltar para home</button>
    </div>
    `;
    document.querySelector(".end-container").scrollIntoView();
}

function getLevel(porcentagem) {
    //quizz.levels.sort();
    for (let i = 0; quizz.levels.length; i++) {
        if (porcentagem >= quizz.levels[i].minValue) {
            return (i);
        }
    }
}

function quizzReset() {
    varReset();
    const questions = document.querySelector(".question-containers").children;
    for (let i = 0; i < questions.length; i++) {
        answers = questions[i].querySelector(".respostas").children;
        for (let j = 0; j < answers.length; j++) {
            answers[j].setAttribute("onclick", "checkResposta(this)");
            answers[j].classList.remove("opacity");
            if (answers[j].id == "true") {
                answers[j].classList.remove("resposta-certa");
            } else {
                answers[j].classList.remove("resposta-errada");
            }
        }
    }
    document.querySelector(".end-container").innerHTML = "";
    document.querySelector(".titulo").scrollIntoView();
}

function randomizador() {
    return Math.random() - 0.5;
}

function home() {
    document.querySelector(".end-container").innerHTML = "";
    document.querySelector(".titulo").scrollIntoView();
    document.querySelector(".question-container").innerHTML = "";
    document.querySelector(".quizzez-list").classList.remove("hide");
    document.querySelector(".quizz-page").classList.add("hide");
    varReset()
}

function varReset() {
    acerto = 0;
    scrollIndex = 0;
}
getQuizzes();

//Avança à tela de criação do quizz
function criarQuizz(){
    document.querySelector("main").classList.add("hide");
    document.querySelector(".info-quizz").classList.remove("hide");
}
