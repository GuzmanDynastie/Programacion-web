function processData(input) {
    let numeros = [];
    let cadena = [];
    let palabra = '';

    let partes = input.split('\n');
    numeros = partes[1].split(' ');
    cadena = partes[0].split(' ');

    if (cadena[cadena.length - 1] === '') {
        cadena.pop();
    }

    for (let x = 0; x < numeros.length; x++) {
        palabra += cadena[parseInt(numeros[x])];
    }

    console.log(palabra);
}

input = 'O N R T Y V W I E D B A C D G P Q S O\n6 8 10'

processData(input)