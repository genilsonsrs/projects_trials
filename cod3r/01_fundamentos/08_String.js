const escola = 'cod3r'
const desenvolvimento = 'sem matematica não mais'

console.log(escola.charAt(4)); // mostra o caracter da 4º posicao da string

console.log(escola.substring(1)); //pega a string a partir da posicao 1. Como não tem a posicao fim, pega todo o resto
console.log(escola.substring(0,3)); //pega a string da posicao 0 ate a 3 imprimindo 'cod'

console.log('Escola '.concat(escola).concat("!"))
console.log('Escola ' + escola + "!")
console.log(escola.replace(3, 'e'))

console.log(desenvolvimento.replace(/\m/g, 'OO')) 
// a notação /\m/g faz com que seja substituido todas as expressões da string
// nesse caso vai substituir todas as letras 'm' por 'OO'

console.log('Ana,Maria,Pedro'.split(','))
// Cria um array quebrando a string a partir do separador definido


