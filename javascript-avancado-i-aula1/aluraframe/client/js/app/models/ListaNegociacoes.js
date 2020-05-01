class ListaNegociacoes{

    constructor(){

        this._negociacoes = [];

    }

    adcionaNecociacao(negociacao){

        this._negociacoes.push(negociacao);

    }

    get negociacoes(){

        return [].concat(this._negociacoes);

    }

}