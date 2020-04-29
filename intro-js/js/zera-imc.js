//O eventListener é como se eu fosse programar um stand by para a ação do usuarios. No exemplos abaixo, o JS aguarda um clique dos botões para executar a função
//elemento.addEventListener(acao, função)
let zeraImcClick = document.querySelector("#zera-imc");
zeraImcClick.addEventListener("click", zeraImc);

function zeraImc(){
    //Sempre que um botão é clicado e uma função/evento é acionado, por padrão, o JS recarrega a pagina e apaga o form, excluindo tudo que fi digitado. Para que isso não aconteça, deve-se iniciar a função com o event.prevetDefault()
    event.preventDefault();
    let pacientes = document.querySelectorAll(".paciente");

    for(i = 0; i < pacientes.length; i++){

        let paciente = pacientes[i];

        paciente.querySelector(".info-imc").textContent = 0;
        paciente.style.backgroundColor = "white";
        paciente.style.color = "black";
    }

    alert("Calculos REINICIADOS com sucesso!");
}