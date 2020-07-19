'use strict';

var params = process.argv.slice(2);

var num1 = parseFloat(params[0]);
var num2 = parseFloat(params[1]);

var plantilla = `
    la suma es: ${num1 + num2}
    La resta es: ${num1 - num2}
    La multiplicacion es: ${num1 * num2}
    La division es: ${num1 / num2}
`;

console.log(plantilla);
console.log('Hola mundo');

//Ejecutamos el programa por consola con los siguientes comandos: node 'nombre_archivo'.