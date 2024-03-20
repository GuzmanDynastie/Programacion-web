function processData(input) {
    const data = input.trim().split('\n').map(line => line.split(','));
    const numStudents = parseInt(data[0][0]);
    const numFilters = parseInt(data[0][1]);
    const properties = data[1];

    const students = data.slice(2, 2 + numStudents).map(student => {
        const obj = {};
        for (let i = 0; i < properties.length; i++) {
            obj[properties[i]] = student[i];
        }
        obj.aprobado = parseFloat(obj.calificacion) >= 6.0;
        return obj;
    });

    function filterByProperty(property, value, students) {
        return students.filter(student => student[property] === value);
    }

    let filteredStudents = students;
    for (let i = 0; i < numFilters; i++) {
        const filterData = data[2 + numStudents + i];
        filteredStudents = filterByProperty(filterData[0], filterData[1], filteredStudents); // Pasar el array filtrado como argumento
    }

    const expedientes = filteredStudents.map(student => student.expediente);
    console.log(expedientes.join(','));
}

const input = `5,3
nombre,ciudad,calificacion,sexo,expediente
Juan Pérez,Zapopan,9.4,H,123
María López,Guadalajara,9.7,M,234
Mar Doe,Zapopan,5.9,M,353
Jorge Zrt,Zapopan,5.4,H,158
John Loo,Zapopan,7.4,H,134
sexo,H
ciudad,Zapopan
aprobado,true`;

processData(input);