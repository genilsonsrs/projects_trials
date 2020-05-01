var campos = [
    document.querySelector("#data"),
    document.querySelector("#quantidade"),
    document.querySelector("#valor")
];

let formNegociacoes = document.querySelector("#form-negociacoes");

formNegociacoes.addEventListener('submit', function(event) {
    event.preventDefault();

    var tr = document.createElement('tr');

    campos.forEach(function(campo){
        var td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);
    })

    var volume = document.createElement('td');
    volume.textContent = (campos[1].value * campos[2].value).toFixed(2);
    tr.appendChild(volume);
    document.querySelector("#tabela-negociacoes").appendChild(tr);

    console.log(tr);

    formNegociacoes.reset();

})

