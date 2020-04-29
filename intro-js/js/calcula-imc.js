function calculaImcFunc(peso, altura){
    let imc = 0;
    imc = peso / (altura * altura);
    return imc.toFixed(2);
}

//O eventListener é como se eu fosse programar um stand by para a ação do usuarios. No exemplos abaixo, o JS aguarda um clique dos botões para executar a função
//elemento.addEventListener(acao, função)
let calculaImcClick = document.querySelector("#calcula-imc");
calculaImcClick.addEventListener("click", calculaImc);

function calculaImc(){

    //Sempre que um botão é clicado e uma função/evento é acionado, por padrão, o JS recarrega a pagina e apaga o form, excluindo tudo que fi digitado. Para que isso não aconteça, deve-se iniciar a função com o event.prevetDefault()
    event.preventDefault();

    //QuerySelectorAll traz o array de dados de acordo com a classe, id ou tag
    let pacientes = document.querySelectorAll(".paciente");

    for(i = 0; i < pacientes.length; i++){

        let paciente = pacientes[i];

        let peso = paciente.querySelector(".info-peso").textContent;
        let altura = paciente.querySelector(".info-altura").textContent;
        let nome = paciente.querySelector(".info-nome").textContent;

        if(peso < 10 || peso > 250){
            let imc = "Dados de PESO Inválidos";
            console.log(imc);
            paciente.querySelector(".info-imc").textContent = imc;
            paciente.style.color = "white";
            //Quando alguma propriedade tem um traço no meio, tal como background-color, deve declarar como backgroundColor
            paciente.style.backgroundColor = "red";
        }else if(altura < 0.5 || altura > 2.5){
            let imc = "Dados de ALTURA Inválidos";
            console.log(imc);
            paciente.querySelector(".info-imc").textContent = imc;
            paciente.style.color = "white";
            //Quando alguma propriedade tem um traço no meio, tal como background-color, deve declarar como backgroundColor
            paciente.style.backgroundColor = "blue";
        }else{
            let imc = calculaImcFunc(peso, altura);
            console.log(nome + " tem " + peso + "kg e " + altura + "mt de altura. Seu IMC é de: " + imc);
            paciente.querySelector(".info-imc").textContent = imc;
        }
    }

    alert("Calculos REALIZADOS com sucesso!");
}

