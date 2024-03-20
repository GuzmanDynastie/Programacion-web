function processData(input) {
    let numeros = '';
    let cadena = '';

    input.split(' ').forEach(valores => {
        if (!isNaN(parseFloat(valores))) {
            numeros += valores + '\n';
        } else {
            cadena += valores + '\n';
        }
    });

    console.log(numeros.trim());
    console.log(cadena.trim());
} 

input = '1 2 34 hola texto2 texto3 1.34'

processData(input)