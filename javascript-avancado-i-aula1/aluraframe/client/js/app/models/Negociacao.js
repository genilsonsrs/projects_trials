class Negociacao{

    constructor(data, quantidade, valor){

        this._data = data.toLocaleDateString('pt-BR');
        this._quantidade = quantidade;
        this._valor = valor;

    }

    get volume(){

        return (parseFloat(this._quantidade) * parseFloat(this._valor)).toFixed(2);

    }

    //Getters

    get data(){

        return this._data;

    }

    get quantidade(){

        return this._Quantidade;

    }

    get valor(){

        return this._data;

    }

}