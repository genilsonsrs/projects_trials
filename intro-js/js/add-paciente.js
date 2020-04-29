let addPacienteClick = document.querySelector("#adicionar-paciente");
addPacienteClick.addEventListener("click", addPaciente);

function addPaciente(){
    event.preventDefault();

    //Extrai os valores do formulario, usando uma função que traz os dados do paciente em formato de objeto
    let paciente = obtemPacientesFormulario();
    console.log(paciente);
    //Exemplo: {nome: "saasas", peso: "123", altura: "2", gordura: "12"}

    //Valida se valores digitados estão de acordo com as regras estabelecidas
    var erros = validaPaciente(paciente);
    console.log(erros);

    if (erros.length > 0){
        exibeMensagensDeErro(erros);
        return;
    }else{
        addPacienteTabela(paciente);    

        alert("Paciente adicionado com Sucesso!");

        //Limpa os campos do formulario e mensagens de erro
        //Função reset() é nativa do JS
        document.querySelector(".cadastro-paciente").reset();
        document.querySelector(".mensagens-erro").innerHTML = "";
        //limpaFormulario();
    }

}

function addPacienteTabela(paciente){
    //Cria os elementos da tabela passando parametros do objeto para a função montaTr
    var pacienteTr = montaTr(paciente);

    //Adiciona o paciente a tabela
    let tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr); 
}


function obtemPacientesFormulario(){
    //Criando um objeto para melhorar a declaração do paciente
    //Calcula o IMC de acordo com os valores obtidos

    var paciente = {
        nome: document.getElementById("nome").value,
        peso: document.getElementById("peso").value,
        altura: document.getElementById("altura").value,
        gordura: document.getElementById("gordura").value,
        imc: calculaImcFunc(document.getElementById("peso").value, document.getElementById("altura").value)
    }

    return paciente;
}

function montaTr(paciente){
    //Cria os elementos da tabela
    let pacienteTr = document.createElement("tr");

    let nomeTd = document.createElement("td");
    let pesoTd = document.createElement("td");
    let alturaTd = document.createElement("td");
    let gorduraTd = document.createElement("td");
    let imcTd = document.createElement("td");

    //Resgata os valores de cada variavel e inclui no TD
    nomeTd.textContent = paciente.nome;
    pesoTd.textContent = paciente.peso;
    alturaTd.textContent = paciente.altura;
    gorduraTd.textContent = paciente.gordura;
    imcTd.textContent = paciente.imc;

    //Cria o bloco do TR com sus devidas classes
    pacienteTr.appendChild(nomeTd);
    nomeTd.className = 'info-nome';
    pacienteTr.appendChild(pesoTd);
    pesoTd.className = 'info-peso';
    pacienteTr.appendChild(alturaTd);
    alturaTd.className = 'info-altura';
    pacienteTr.appendChild(gorduraTd);
    gorduraTd.className = 'info-gordura';
    pacienteTr.appendChild(imcTd);
    imcTd.className = 'info-imc';
    pacienteTr.className = 'paciente';

    return pacienteTr;
}

function limpaFormulario(){
    document.getElementById("nome").value = '';
    document.getElementById("peso").value = '';
    document.getElementById("altura").value = '';
    document.getElementById("gordura").value = '';
}

function validaPeso(peso){
    if (peso >= 0 && peso <= 1000) {
        return true;
    } else {
        return false;
    }
}

function validaAltura(altura) {

    if (altura >= 0 && altura <= 3.0) {
        return true;
    } else {
        return false;
    }
}

function validaPaciente(paciente){

    var erros = [];

    if (paciente.nome.length == 0){
        erros.push("O nome não pode ser em branco");
    }

    if (paciente.peso.length == 0){
        erros.push("O peso não pode ser em branco");
    }

    if (paciente.altura.length == 0){
        erros.push("A altura não pode ser em branco");
    }

    if (paciente.gordura.length == 0){
        erros.push("A gordura não pode ser em branco");
    }

    if (!validaPeso(paciente.peso)) {
        erros.push("Peso é inválido");
    }

    if (!validaAltura(paciente.altura)) {
        erros.push("Altura é inválida");
    }

    return erros;
}

function exibeMensagensDeErro(erros){
    var ul = document.querySelector(".mensagens-erro");
    //Limpa mensagens de erro
    ul.innerHTML = "";

    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}