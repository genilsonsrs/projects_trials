const valores = [5.6, 9.0, 8.5, 5.0] //Array literal
console.log(valores);
console.log(valores[0],valores[2]);

valores[4] = 7.5
console.log(valores);

valores.push({id:3}, false, null, 'teste')
console.log(valores);

console.log(valores.pop());
delete valores[0];
console.log(valores);

console.log(typeof valores);




