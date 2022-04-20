//Verifica tamanho do titulo
function tamanhoTitulo(){
    let nomeTitulo = document.getElementById("titulo").value;
    let n = nomeTitulo.length;
    if(n < 20){
        alert("O titulo deve ter no mínimo 20 caracteres. Numero de caracteres digitados: " + n);
    }else if(n > 65){
        alert("O nome não pode ultrapassar 65 caracteres. Numero de caracteres digitados: "+ n);
    }
}


//verifica URL
function verificaURL(){
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
function restricaoNumeros(){
    const perguntasInput = document.querySelector("#num-perguntas");
    const quizzInput = document.querySelector("#num-quizz");

    if(perguntasInput.value < 3){
        alert("O número de perguntas deve ser maior que: 3");
        perguntasInput.focus();
    }else if (quizzInput.value < 2){
        alert("O valor dos níveis deve ser maior que: 2");
        quizzInput.focus();
    }
}

//Validação dos inputs
function validaInput(){
    if(document.getElementById("titulo").value == ""){
    alert('Por favor, preencha o campo título');
    document.getElementById("titulo").focus();
    return false;
    }else if(document.getElementById("url-image").value == ""){
    alert('Por favor, preencha o campo URL da imagem');
    document.getElementById("url-image").focus();
    return false;
    }else if(document.getElementById("num-perguntas").value == ""){
    alert('Por favor, preencha quantas perguntas');
    document.getElementById("num-perguntas").focus();
    return false;
    }else if(document.getElementById("num-quizz").value == ""){
    alert('Por favor, preencha quantos níveis');
    document.getElementById("num-quizz").focus();
    return false;
    }

    tamanhoTitulo();
    restricaoNumeros();
    verificaURL();
}

