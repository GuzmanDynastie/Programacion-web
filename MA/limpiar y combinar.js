function processData(input) {
    let inputArray = input.trim().split('\n').map(line => JSON.parse(line));
    let count = {};

    inputArray.forEach(obj => {
        Object.keys(obj).forEach(key => {
            let value = parseFloat(obj[key]);
            if (!isNaN(value) && value <= 10000 && value >= 0) {
                if (!count[key]) {
                    count[key] = { count: 1, sum: value };
                } else {
                    count[key].count++;
                    count[key].sum += value;
                }
            }
        });
    });

    let result = {};
    for (let key in count) {
        let avg = (count[key].sum / count[key].count).toFixed(2);
        result[key] = avg;
    }

    let output = '{';
    let first = true;
    for (let key in result) {
        if (!first) {
            output += ',';
        }
        output += `"${key}":"${result[key]}"`;
        first = false;
    }
    output += '}';
    console.log(output);
    return output;
    
}

// Entrada de ejemplo
let input = `
    {"a": 1, "b": " 2" }
    {"a": 2, "x": "asdf"}
    {"a": 7, "b": null, "y": 10}`


processData(input);