function atualizaTamanhoFrase(){
    let frase = $(".frase").text();
    let qtdepalavras = frase.split(" ").length;
    let tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(qtdepalavras);
};

$("#troca-frase").click(trocaFraseAleatoria);

function trocaFraseAleatoria(){
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoriaExec)
    //Caso dê um erro na requiição, o .fail é um catch para tratar a exceção
    .fail(function(){
        $("#erro").show();
        //Mensagem que aparece no lado direito superior da tela
        M.toast({
            html: 'Erro na conexão. Frase não atualizada.',
            classes: 'rounded red darken-1',
            inDuration: 500,
            outDuration: 500,
            displayLength: 3000
        })

        setTimeout(function(){
            $("#erro").toggle();
        }, 3000);
    })
    //O always obriga que o bloco de codigo dentro da função seja executado, independente do resultado da condição anterior
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFraseAleatoriaExec(data){
    let frase = $(".frase");
    let tempo = $("#tempo-digitacao");
    //Math.floor arredonda sempre pra baixo e math.random gera um numero aleatorio entre 0 e 1
    let numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto);
    tempo.text(data[numeroAleatorio].tempo);
    tempoInicial = data[numeroAleatorio].tempo;
    atualizaTamanhoFrase();

    M.toast({
        html: 'A frase foi atualizada. Tente novamente!!',
        classes: 'rounded teal',
        inDuration: 500,
        outDuration: 500,
        displayLength: 2000
    })
}

function buscaFraseId(){
        $("#spinner").toggle();

        var fraseId = $("#seleciona-id-num").val();
        var dados = {id: fraseId};
        $.get("http://localhost:3000/frases", dados, trocaFraseManual)

        .fail(function(){
            $("#erro").show();
            //Mensagem que aparece no lado direito superior da tela
            M.toast({
                html: 'Erro na conexão. Frase não atualizada.',
                classes: 'rounded red darken-1',
                inDuration: 500,
                outDuration: 500,
                displayLength: 3000
            })
    
            setTimeout(function(){
                $("#erro").toggle();
            }, 3000);
        })
        .always(function(){
            $("#spinner").toggle();
        });
};

function trocaFraseManual(data){
    let frase = $(".frase");
    let tempo = $("#tempo-digitacao");

    frase.text(data.texto);
    tempo.text(data.tempo);
    tempoInicial = data.tempo;
    atualizaTamanhoFrase();

    M.toast({
        html: 'A frase foi atualizada. Tente novamente!!',
        classes: 'rounded teal',
        inDuration: 500,
        outDuration: 500,
        displayLength: 2000
    })

}