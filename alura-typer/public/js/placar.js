//Ao finalizar a contagem, insere os valores de nome, data e hora e palavras digitadas no placar
function inserePlacar(){
    let now = new Date;
    let agora = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()

    let corpoTabela = $(".tabela-placar").find("tbody");
    let numPalavras = $("#contador-palavras").text();
    let nomeJogador = $("#nome-digitador").val();

    let linha = novaLinha(nomeJogador,numPalavras,agora);
    linha.find("#botao-remover").click(removeLinha);
    
    corpoTabela.prepend(linha);

    //O bloco de codigo abaixo faz com que a pagina faca scroll direto para o fim, mostrando o placar automaticamente
    $(".placar").slideDown(500);
    scrollPlacar();
 };

 //Move automaticamente para mostrar o placar inteiro
 function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("html, body").animate(
    {
        scrollTop: posicaoPlacar
    }, 1000);
}

//Ao finalziar a digitação, insere uma linha no placar de pontuação com os dados do jogo.
function novaLinha(usuario,palavras,agora) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaAgora = $("<td>").text(agora);
    var colunaRemover = $("<td>");

    var link = $("<a>").attr("href","#").attr("id","botao-remover").addClass("btn-floating btn-large waves-effect waves-light red lighten-1 btn-small");
    var icone = $("<i>").addClass("material-icons").text("delete");

    // Ícone dentro do <a>
    link.append(icone);

    // <a> dentro do <td>
    colunaRemover.append(link);

    // Os três <td> dentro do <tr>
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaAgora);
    linha.append(colunaRemover);
    return linha;
}

//Remove uma linha do placar com animação
function removeLinha(event) {
    event.preventDefault();
    let linha = $(this).parent().parent();
    linha.fadeOut();
    
    setTimeout(function(){
        linha.remove();
    }, 1500);
}

//Mostra e esconde o placar
function abreFechaPlacar(){
    //A função toggle do jquery faz a alternancia de mostrar e esconder o elemento selecionado
    $(".placar").stop().slideToggle(600);        
    scrollPlacar();
}

function sincronizaPlacar(){
    $("#spinner").toggle();

    let placar = [];
    let linhas = $("tbody>tr");

    linhas.each(function(){
        //nth-child é o seletor que faz com que achamos o primeiro filho ou a posicao de acordo como declarado no ()
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();
        let dataHora = $(this).find("td:nth-child(3)").text();

        var score = {
            usuario: usuario,
            pontos: palavras,
            executado: dataHora
        }

        placar.push(score);        
    });

    let dados = {
        placar: placar
    }

    $.post("http://localhost:3000/placar", dados, function(){
        M.toast({
            html: 'Resultados enviados com sucesso ao servidor!',
            classes: 'rounded blue darken-2',
            inDuration: 500,
            outDuration: 500,
            displayLength: 2000
        })
    })   

    $("#spinner").toggle();    
}

function atualizaResultados(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            let linha = novaLinha(this.usuario, this.pontos, this.executado);
            linha.find("#botao-remover").click(removeLinha);
    
            $("tbody").prepend(linha);
        });
    });
};
