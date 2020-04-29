//Função sem retorno
function imprimirSoma(a, b){
    console.log(a + b);
}
imprimirSoma(4,6);

//Função com retorno
//POdemos declarar um valor default, no caso abaixo o valor de b é o padrão.
function soma(a, b=3){
    return a + b;
};
console.log(soma(2,9));
console.log(soma(2));

//Armazenar uma função em uma variavel
const imprimirSomaVariavel = function(a,b){
    console.log(a + b);
}
imprimirSomaVariavel(88,97);

//Armazenando uma função arrow (=>) em uma variavel
//o => substitui o termo function
const somaArrow = (a,b) =>{
    return  a + b;
}
console.log(somaArrow(65754,88));

//Retorno implicito
const subtracao = (a,b) => a-b;
console.log(subtracao(34,10));

//Retonro implicito com um parametro
const imprimir2 = a => console.log(a);
imprimir2("Banacaaaaaaaa!!");