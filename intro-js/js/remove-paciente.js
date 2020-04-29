var tabela = document.querySelector("table");

//Vamos colocar um evento de duplo clique na tabela e reconhecer o td que foi clicado
tabela.addEventListener("dblclick", function(event) {
    var alvoEvento = event.target;
    var paiDoAlvo = alvoEvento.parentNode; // TR = paciente = remover 
    
    //Animação de remoção: esmaecer e remover    
    paiDoAlvo.classList.add("fadeOut");
    //O setTimeOut é uma função que faz com que uma ação seja executada após  temppo predeterminado em milessegundos
    setTimeout(function(){
        paiDoAlvo.remove();
    }, 500);
    
});

//No caso abaixo, a remoção é por linha, mas sobrecarrega o browser por criar um evento pra cada linha de paciente
//pacientes.forEach(function(paciente){
//    paciente.addEventListener("dblclick", function(){
//        console.log("fui clicado");
//        this.remove();
//    });
//    
//})
