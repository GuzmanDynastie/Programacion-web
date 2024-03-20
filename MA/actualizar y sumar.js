function processData(input) {
    const parts = input.split('\n');

    const firstValue = JSON.parse(parts[0]);
    const secondValue = parts[1].split(' ');

    const firstObject = firstValue[0];
    const secondObject = firstValue[1];

    const suma = firstObject.a + firstObject.b;

    console.log(suma);
}

const input = `[{"a":5,"b":6},{"a":9,"c":3, "d":"txt"}]
a 1`;

processData(input);