var buscarPacientes = document.querySelector("#buscar-paciente");

//AJAX de busca de novos pacientes
buscarPacientes.addEventListener("click", function(){
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api-pacientes.herokuapp.com/pacientes");

    xhr.addEventListener("load", function(){
        //Condição de trazer as infromações caso a URL eja valida. O codigo de status que representa uma URL valida é a 200.
        if(xhr.status == 200){

            let resposta = xhr.responseText;
            let pacientes = JSON.parse(resposta);
            console.log(pacientes);

            pacientes.forEach(function(paciente){
                addPacienteTabela(paciente);
            });
            

        }else{

            console.log(xhr.status);
            console.log(xhr.responseText);

        }
        
        
    });

    xhr.send();

});