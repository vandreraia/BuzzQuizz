const API = "https://mock-api.driven.com.br/api/v6/buzzquizz";
let answers;
let test;
let scrollIndex = 0;
let acerto = 0;
let quizz;
let obj = {};
let qtddLevels;
let identifier;

// Avança à tela de criação do quizz
function criarQuizz() {
    document.querySelector("main").classList.add("hide");
    document.querySelector(".info-quizz").classList.remove("hide");
}

//Verifica se a url é uma imagem válida
function verificarImage(verurlimg) {
    return (verurlimg.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

//Verifica se a cor passada é válida
function verificarCor(vercorhex) {
    return (vercorhex.match(/^#[a-f0-9]{6}$/i) != null);
}

//Validação dos campos
function validacao() {
    const tituloQuizz = document.getElementById("titulo").value;
    const urlImageQUizz = document.getElementById("url-image").value;
    const numPerguntasQuizz = document.getElementById("num-perguntas").value;
    const niveisQuizz = document.getElementById("num-quizz").value;
    qtddLevels = niveisQuizz;

    if (tituloQuizz < 20 || tituloQuizz > 65 || numPerguntasQuizz < 3 || niveisQuizz < 2 || !verificarImage(urlImageQUizz)) {
        alert("Peencha os campos corretamente");
    } else {
        obj = {
            title: tituloQuizz,
            image: urlImageQUizz,
            questions: [],
            levels: []
        }
        document.querySelector(".info-quizz").classList.add("hide");
        document.querySelector(".build-pergunta").classList.remove("hide");
        criarPerguntas(numPerguntasQuizz);
    }
}

//Criação das perguntas
function criarPerguntas(numPerguntasQuizz) {
    const container = document.querySelector(".build-pergunta .container-pergunta");
    for (let i = 1; i <= numPerguntasQuizz; i++) {
        container.innerHTML += `
        <div class="container flex-center flex-collumn perguntaContainer">
            <h3>Pergunta ${i}<ion-icon class="create" name="create-outline"></ion-icon></h3>
            <input type="text" placeholder="Texto da pergunta" data-identifier="question"/>
            <input type="text" placeholder="Cor de fundo da pergunta" data-identifier="question"/>
            <h3>Resposta correta</h3>
            <input type="text" placeholder="Resposta correta" data-identifier="question"/>
            <input type="text" placeholder="URL da imagem" data-identifier="question"/>
            
            <h3>Respostas Incorretas</h3>
            <input class="input" type="text" placeholder="Resposta incorreta 1" data-identifier="question"/>
            <input class="input" type="text" placeholder="URL da imagem 1" data-identifier="question"/>
            <input class="input" type="text" placeholder="Resposta incorreta 2" data-identifier="question"/>
            <input class="input" type="text" placeholder="URL da imagem 2" data-identifier="question"/>
            <input class="input" type="text" placeholder="Resposta incorreta 3" data-identifier="question"/>
            <input class="input" type="text" placeholder="URL da imagem 3" data-identifier="question"/>
        </div>
        `;
    }
}

//Validação das perguntas do quizz criado
function validarPerguntas() {
    const numPerguntas = document.querySelectorAll(".perguntaContainer");
    let perguntasValidadas = 0;

    for (let i = 0; i < numPerguntas.length; i++) {
        let indicePergunta = numPerguntas[i];

        if ((indicePergunta.children[1].value).length < 20 || !verificarCor(indicePergunta.children[2].value) || indicePergunta.children[2].value === ""
            || indicePergunta.children[4].value === "" || indicePergunta.children[7].value === "" ||
            !verificarImage(indicePergunta.children[5].value) || !verificarImage(indicePergunta.children[8].value) ||
            (indicePergunta.children[9].value !== "" && !verificarImage(indicePergunta.children[10].value)) ||
            (indicePergunta.children[11].value !== "" && !verificarImage(indicePergunta.children[12].value))) {
            perguntasValidadas = 0;
            alert("Por favor, preencha os dados corretamente para prosseguir.");
        } else {
            perguntasValidadas += 1;

            obj.questions.push({
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
            if (indicePergunta.children[9].value !== "") {
                obj.questions[i].answers.push({
                    text: indicePergunta.children[9].value,
                    image: indicePergunta.children[10].value,
                    isCorrectAnswer: false
                });
            }
            if (indicePergunta.children[11].value !== "") {
                obj.questions[i].answers.push({
                    text: indicePergunta.children[11].value,
                    image: indicePergunta.children[12].value,
                    isCorrectAnswer: false
                });
            }
        }
    }
    if (perguntasValidadas === numPerguntas.length) {

        const screenPerguntas = document.querySelector(".build-pergunta");
        const screenNiveis = document.querySelector(".build-level");

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
    const containerLevels = document.querySelector(".build-level .container-level");
    for (let i = 1; i <= qtddLevels; i++) {
        containerLevels.innerHTML += `
        <div class="container flex-center flex-collumn levelContainer">        
            <h3>Nível ${i}<ion-icon class="create" name="create-outline"></ion-icon></h3>
            <input type="text" placeholder="Título do nível" data-identifier="level"/>
            <input type="text" class="porcentagemAcerto" placeholder="% de acerto mínima" data-identifier="level"/>
            <input type="text" placeholder="URL da imagem do nível" data-identifier="level"/>
            <input type="text" placeholder="Descrição do nível" data-identifier="level"/>
        </div>
        `;
    }
}

function uploadQuizz() {
    const promise = axios.post(`${API}/quizzes`, obj);
    promise.then(getUserQuizz);
    promise.catch(function () {
        console.log("uploadQuizz error");
    });
}

function finalizar() {
    const numNiveis = document.querySelectorAll(".levelContainer");
    const niveisPorcentagemAcerto = document.querySelectorAll(".porcentagemAcerto");
    let niveisValidados = 0;
    let verificarPorcentagem = 0;
    for (let i = 0; i < numNiveis.length; i++) {
        if (parseInt(niveisPorcentagemAcerto[i].value) == 0) {
            verificarPorcentagem += 1;
        }
    }

    for (let i = 0; i < numNiveis.length; i++) {
        let indiceNivel = numNiveis[i];

        if ((indiceNivel.children[1].value).length < 10 || parseInt(indiceNivel.children[2].value) < 0 ||
            parseInt(indiceNivel.children[2].value) > 100 || !verificarImage(indiceNivel.children[3].value) ||
            (indiceNivel.children[4].value).length < 30 || verificarPorcentagem === 0) {
            alert("Por favor, preencha os dados corretamente.");
        } else {
            niveisValidados += 1;

            obj.levels.push({
                title: indiceNivel.children[1].value,
                image: indiceNivel.children[3].value,
                text: indiceNivel.children[4].value,
                minValue: indiceNivel.children[2].value
            })
        }
    }
    if (niveisValidados === numNiveis.length) {
        document.querySelector(".build-level").classList.add("hide");
        document.querySelector(".final").classList.remove("hide");
        niveisValidados = 0;
        verificarPorcentagem = 0;
        uploadQuizz();
    } else {
        obj.levels = [];
        niveisValidados = 0;
    }
}

function getUserQuizz (response) {
    const quizzes = response.data;
    const key = response.data.key
    const quizzNow = quizzes;
    const addHTML = document.querySelector(".final");
    addHTML.innerHTML = `
    <h3>Seu quizz está pronto!</h3>
    <div onclick="showquizz(${quizzNow.id})">
        <img src=${quizzNow.image} data-identifier="quizz-card">
        <div >${quizzNow.title}</div>
    </div>
    <div class="button-final flex-center" onclick="showquizz(${quizzNow.id})">Acessar Quizz</div>
    <a onclick="home()">Voltar pra home</a> `

    setUserQuizz(quizzNow, key);
}

function getQuizzes(func) {
    const promise = axios.get(`${API}/quizzes`);
    promise.then(func);
    promise.catch(function () {
        console.log("getQuizzes error");
    });
}

function postQuizzes(response) {
    const quizzes = response.data;
    const userId = JSON.parse(localStorage.getItem("id"));
    let element = document.querySelector(".todos-quizzes");
    //element.innerHTML = "";
    if (userId.length > 1) {
        document.querySelector(".user-quizzes-container").classList.remove("hide")
        document.querySelector(".user-quizz").classList.add("hide")
    } else {
        document.querySelector(".user-quizzes-container").classList.add("hide")
        document.querySelector(".user-quizz").classList.remove("hide")
    }
    test = quizzes;
    for (let i = 0; i < quizzes.length; i++) {
        for (let j = 0; j < userId.length; j++) {
            if (quizzes[i].id === userId[j]) {
                console.log("a")
                element = document.querySelector(".user-quizzes");
                element.innerHTML += `
                <div class="quizz">
                    <img id="${quizzes[i].id}" onclick="showquizz(this.id)" src="${quizzes[i].image}" />
                    <div>
                        <p>${quizzes[i].title}</p>
                    </div>
                    <div class="trash flex-center">
                        <ion-icon id="${quizzes[i].id}" onClick="removeQuizz(this.id)" name="trash-outline"></ion-icon>
                        <ion-icon name="create-outline"></ion-icon>
                    </div>
                </div>`;
            } else {
                element = document.querySelector(".todos-quizzes");
                element.innerHTML += `
                <div id="${quizzes[i].id}" onclick="showquizz(this.id)" class="quizz">
                    <img src="${quizzes[i].image}" />
                    <div>
                        <p>${quizzes[i].title}</p>
                    </div>
                </div>`;
            }
        }
    }
}

function showquizz(id) {
    document.querySelector(".quizzez-list").classList.add("hide");
    document.querySelector(".final").classList.add("hide");
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
    el.innerHTML += `
                <div class="question-container">
                    <div style="background-color:#EC362D;" class="pergunta flex-center">
                        ${(porcentagem * 100).toFixed(0)}% de acerto: ${quizz.levels.at(level).title}
                    </div>
                    <div class="end">
                        <img src="${quizz.levels.at(level).image}" />
                        <h5>${quizz.levels.at(level).text}</h5>
                    </div>
                </div>
                `;
    el.innerHTML += `
    <div class="flex-center flex-collumn">
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
    location.reload();
}

function varReset() {
    acerto = 0;
    scrollIndex = 0;
}

//Avança à tela de criação do quizz
function criarQuizz() {
    document.querySelector("main").classList.add("hide");
    document.querySelector(".info-quizz").classList.remove("hide");
}

function setUserQuizz(myQuizz, key) {
    const userId = JSON.parse(localStorage.getItem("id"));
    const userkey = JSON.parse(localStorage.getItem("key"));
    if (userId == null) {
        initializeLocalStorage();
    }
    userId.push(myQuizz.id);
    userkey.push(key);
    localStorage.setItem("id", JSON.stringify(userId));
    localStorage.setItem("key", JSON.stringify(userkey));
}

function initializeLocalStorage() {
    let arr = [1];
    const userId = JSON.parse(localStorage.getItem("id"));
    if (userId == null) {
        localStorage.setItem("id", JSON.stringify(arr));
        localStorage.setItem("key", JSON.stringify(arr));
    }
}

function removeQuizz(quizz) {
    const userId = JSON.parse(localStorage.getItem("id"));
    const userkey = JSON.parse(localStorage.getItem("key"));
    let mykey;
    
    for (let i = 0; i < userId.length; i++) {
        if (userId[i] == quizz) {
            mykey = userkey[i];
            console.log(mykey)
        }
    }
    axios.delete(`${API}/quizzes/${quizz}`, {
        headers: {
            "Secret-Key": mykey
        }
    });
    //home();
}
initializeLocalStorage();
getQuizzes(postQuizzes);
