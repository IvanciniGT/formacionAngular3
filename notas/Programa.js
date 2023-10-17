function doble(numero) {
    return numero * 2;
}

function imprimirResultadoDeOperacion(operacion, numero){
    console.log(operacion(numero));
}

let miFuncion = doble;  // Esto es un statement: Sentencia (instrucción)...
                        // De qué otras formas me refiero en Español a una frase: Oración, Sentencia, Enunciado

console.log(miFuncion(5)); // Esto es otro Statement

imprimirResultadoDeOperacion( doble, 10); // Pues otro

// Arrow function de JS? Es el nombre hortera que los de JS (que se creen que han reinventado la rueda)
// dan a las expresión lambda

// Expresión : Trozo de código que devuelve un resultado.
let numero = 7 + 9; // Pues otro statement
             /////     ESO ES UNA EXPRESION

// Expresión lambda: Es un trozo de código que devuelve una función anónima creada dentro de la expresión

let miFuncion2 = (numero) => {
    return numero * 3;
};

console.log( miFuncion2(5));
imprimirResultadoDeOperacion( miFuncion2, 10);
imprimirResultadoDeOperacion( (numero) => {
                                                return numero * 3;
                                            }, 
                              10); 

imprimirResultadoDeOperacion( numero => {
                                return numero * 3;
                            }, 
                              10);

imprimirResultadoDeOperacion( numero => numero * 3,  10); 

imprimirResultadoDeOperacion( doble, 10);
