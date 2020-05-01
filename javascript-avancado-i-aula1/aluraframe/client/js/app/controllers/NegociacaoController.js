class NegociacaoController {

    constructor(){

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._form = $("#form-negociacoes");
        this._tabela = $("#tabela-negociacoes");
        this._listaNegociacoes = new ListaNegociacoes();

        this._negociacoesView = new NeociacoesView($('#negociacoesView'));
        this._negociacoesView.update(this._listaNegociacoes);

    }

    adciona(event){        

        event.preventDefault();

        let data = new Date(...this._inputData
            .value.split('-')
            .map(function(item, indice) {
                return item - indice % 2;
            }));

        let negociacao = new Negociacao(
            data,
            this._inputQuantidade.value,
            this._inputValor.value
        );
        
        this._listaNegociacoes.adcionaNecociacao(negociacao);
        this._negociacoesView.update(this._listaNegociacoes);
        //this._tabela.appendChild(this.montaTr(negociacao));

        this.reconfiguraForm();          

        console.log(this._listaNegociacoes.negociacoes);

    }

    reconfiguraForm(){
        this._form.reset();
        this._inputData.focus();
    }

    montaTr(negociacao){
        let negociacaoTr = document.createElement("tr");    
        let dataTd = document.createElement("td");
        let quantidadeTd = document.createElement("td");
        let valorTd = document.createElement("td");
        let volumeTd = document.createElement("td");
    
        //Resgata os valores de cada variavel e inclui no TD
        dataTd.textContent = negociacao._data;
        quantidadeTd.textContent = negociacao._quantidade;
        valorTd.textContent = negociacao._valor;
        volumeTd.textContent = negociacao.volume;
    
        //Cria o bloco do TR com sus devidas classes
        negociacaoTr.appendChild(dataTd);
        negociacaoTr.appendChild(quantidadeTd);
        negociacaoTr.appendChild(valorTd);
        negociacaoTr.appendChild(volumeTd);
    
        return negociacaoTr;
    }

}