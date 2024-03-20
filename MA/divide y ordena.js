function processData(input) {
    const data = JSON.parse(input);
    const propValue = "id 1".split(' ')[1];
    const index = data.findIndex(obj => obj.id === propValue); // Comparar con la cadena completa

    const arr1 = data.slice(0, index + 1);
    const arr2 = data.slice(index + 1);

    data.splice(index + 1);

    arr1.sort((a, b) => a.id - b.id);
    arr2.sort((a, b) => b.id - a.id); 

    console.log(JSON.stringify(arr1));
    console.log(JSON.stringify(arr2));
}

const input = `[{"a":23,"id":4},{"id":2,"a":"c"},{"id":1,"b":"asc"},{"id":5,"c":4}]
id 1`

processData(input);