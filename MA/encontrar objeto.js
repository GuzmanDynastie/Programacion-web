function processData(input) {
    const [firstObject, secondObject] = input.split('\n').map(JSON.parse);

    const isTotallyIncluded = Object.keys(secondObject).every(key =>
        key in firstObject && firstObject[key] === secondObject[key]
    );

    console.log(isTotallyIncluded ? "totally included" : "partially included");
}

let input = `{"a":"2","b":2,"c":{"d":4,"e":"5"}}
{"a":"2","c":"3"}`;

processData(input);