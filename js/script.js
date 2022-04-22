const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
let test;
let obj = {};
let qtddLevels;

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

//Avança à tela de criação do quizz
function criarQuizz(){
    document.querySelector("main").classList.add("hide");
    document.querySelector(".info-quizz").classList.remove("hide");
}

//Verifica se a url é uma imagem válida
function verificarImage(verurlimg){
    return (verurlimg.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

//Verifica se a cor passada é válida
function verificarCor(vercorhex) {
    return (vercorhex.match(/^#[a-f0-9]{6}$/i) != null);
}

//Validação dos campos
function validacao(){
    const tituloQuizz = document.getElementById("titulo").value;
    const urlImageQUizz = document.getElementById("url-image").value;
    const numPerguntasQuizz = document.getElementById("num-perguntas").value;
    const niveisQuizz = document.getElementById("num-quizz").value;
    qtddLevels = niveisQuizz;

    if(tituloQuizz < 20 || tituloQuizz > 65 || numPerguntasQuizz < 3 || niveisQuizz < 2 || !verificarImage(urlImageQUizz)){
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
        <div class="info-quizz perguntaContainer container-pergunta">
            <span class="flex-center"><h3>Pergunta ${i}</h3><ion-icon class="create" onclick="ocultar(this)" name="create-outline"></ion-icon></span>
            <div class="check hide">
                <input type="text" placeholder="Texto da pergunta" data-identifier="question"/>
                <input type="text" placeholder="Cor de fundo da pergunta" data-identifier="question"/>
                <h3 class="">Resposta correta</h3>
                <input type="text" placeholder="Resposta correta" data-identifier="question"/>
                <input type="text" placeholder="URL da imagem" data-identifier="question"/>
                
                <h3 class="">Respostas Incorretas</h3>
                <input class="input" type="text" placeholder="Resposta incorreta 1" data-identifier="question"/>
                <input class="input" type="text" placeholder="URL da imagem 1" data-identifier="question"/>
                <input class="input" type="text" placeholder="Resposta incorreta 3" data-identifier="question"/>
                <input class="input" type="text" placeholder="Resposta incorreta 2" data-identifier="question"/>
                <input class="input" type="text" placeholder="URL da imagem 2" data-identifier="question"/>
                <input class="input" type="text" placeholder="URL da imagem 3" data-identifier="question"/>
            </div>
        </div>`;
    }
}

//Validação das perguntas do quizz criado
function validarPerguntas(){
    const numPerguntas = document.querySelectorAll(".perguntaContainer");
    let perguntasValidadas = 0;

    for(let i=0; i<numPerguntas.length; i++){
        let indicePergunta = numPerguntas[i];

        if((indicePergunta.children[1].value).length <c20 || !verificarCor(indicePergunta.children[2].value) || indicePergunta.children[2].value===""
         || indicePergunta.children[4].value==="" || indicePergunta.children[7].value==="" || 
        !verificarImage(indicePergunta.children[5].value) || !verificarImage(indicePergunta.children[8].value) || 
        (indicePergunta.children[9].value!=="" && !verificarImage(indicePergunta.children[10].value)) || 
        (indicePergunta.children[11].value!=="" && !verificarImage(indicePergunta.children[12].value))){
            perguntasValidadas = 0;
            alert("Por favor, preencha os dados corretamente para prosseguir.");
        } else {
            perguntasValidadas +=1;

            obj.questions.push ({
                title: indicePergunta.children[1].value,
                color: indicePergunta.children[2].value,
                answers: []
            });
            obj.questions[i].answers.push({
                text: indicePergunta.children[4].value,
                image: indicePergunta.children[5].value,
                isCorrectAnswer: true
            },
            {
                text: indicePergunta.children[7].value,
                image: indicePergunta.children[8].value,
                isCorrectAnswer: false
            });
            if(indicePergunta.children[9].value!==""){
                obj.questions[i].answers.push({
                    text: indicePergunta.children[9].value,
                    image: indicePergunta.children[10].value,
                    isCorrectAnswer: false
                });
            }
            if(indicePergunta.children[11].value!==""){
                obj.questions[i].answers.push({
                    text: indicePergunta.children[11].value,
                    image: indicePergunta.children[12].value,
                    isCorrectAnswer: false
                });
            }
        }
    }
    if (perguntasValidadas === numPerguntas.length){

        const screenPerguntas = document.querySelector(".build-quizz");
        const screenNiveis = document.querySelector(".build-levels");

        screenPerguntas.classList.add("hide");
        screenNiveis.classList.remove("hide");
        criarNiveis(qtddLevels);
        perguntasValidadas = 0;
    } else {
        obj.questions = [];
        perguntasValidadas = 0;
    }
}

//Valida os niveis do quizz
function criarNiveis(qtddLevels) {
    const containerLevels = document.querySelector(".build-levels .container");
    for (let i=1; i<=qtddLevels; i++){
        containerLevels.innerHTML += `
        <div class="levelQuizz container-level input">        
            <h3>Nível ${i}</h3>
            <input type="text" placeholder="Título do nível" data-identifier="level"/>
            <input type="text" class="PorcentagemdeAcerto" placeholder="% de acerto mínima" data-identifier="level"/>
            <input type="text" placeholder="URL da imagem do nível" data-identifier="level"/>
            <input type="text" placeholder="Descrição do nível" data-identifier="level"/>
        </div>`;
    }
}

//ocultar divs de perguntas
function ocultar(){
    // const icon = document.querySelector("create");
    const div = document.querySelector(".check");

    if(div.style.display === "none"){
        div.style.display = "block";
    }else{
        div.style.display = "none";
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


