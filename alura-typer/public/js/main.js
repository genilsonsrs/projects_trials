let tempoInicial = $("#tempo-digitacao").text();
let campoDigitado = $("#campo-digitacao");
let nomeJogador = $("#nome");

//Inicializa todas as funções ao carregar a página. É a mesma coisa que escrever $(document).ready()
$(function(){
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#troca-frase-id").click(buscaFraseId);
    $("#botao-placar").click(abreFechaPlacar);
    $("#reiniciar").click(reinicializaJogo);
    console.log("Pagina Carregada");
    $("#envia-resultado").click(sincronizaPlacar);
    atualizaResultados();
    $('#seleciona-id-num').not('.disabled').formSelect();
    $('#seleciona-nome-input').not('.disabled').formSelect();
    $('.tooltipped').tooltip();
});

function inicializaContadores(){
    campoDigitado.on("input", function () { 

        let conteudo = campoDigitado.val();
        let qtdepalavras = conteudo.split(/\S+/).length - 1;
        let qtdeCaracteres = conteudo.length;
    
        $("#contador-caracteres").text(qtdeCaracteres);
        $("#contador-palavras").text(qtdepalavras);
    
     });
 };

//Compara o valor digitado pelo usuario e pinta a bora de vermelho caso esteja escrevendo errado
function inicializaMarcadores(){
    campoDigitado.on("input", function () {
        let frase = $(".frase").text(); 
        let digitado = campoDigitado.val();
        let comparavel = frase.substr(0, digitado.length);
        let iconeDigitado = $("#iconeDigitado")

        if(digitado == comparavel){
            campoDigitado.removeClass("borda-vermelha");
        }else{
            campoDigitado.addClass("borda-vermelha");
        }
        
     });
 }

 //Quando o usuario clicar no textarea e comecar a digitar, a função faz com que o cronometro comece a contar
 function inicializaCronometro(){
    //A função one trava para que a instrução após a declaração seja executada uma unica vez, ela escuta somente uma vez o evento
    //Diferente da função on, o usuaario (no caso do focus), poderia ficar entrando e saindo do campo, a instrução reiniciava
    campoDigitado.one("focus", function(){
    let tempoDigitacao = $("#tempo-digitacao").text();
    let cronometro = setInterval(function(){

        tempoDigitacao --;
        $("#tempo-digitacao").text(tempoDigitacao);

        //attr mexe com atributos dos elementos
        if(tempoDigitacao == 0){
            
            clearInterval(cronometro);
            finalizaJogo();
        }

    },1000);

    });
};

function finalizaJogo(){
    campoDigitado.attr("disabled", true);
    inserePlacar(); 
 }

 function reinicializaJogo(){
    campoDigitado.attr("disabled", false);
    campoDigitado.val("");
    $("#nome-digitador").val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campoDigitado.removeClass("borda-vermelha");
};







