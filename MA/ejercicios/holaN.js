for (let i = 0; i < 5; i++){
    setTimeout(function() { console.log('hola'); }, (i + 1)*1000);
}

for (let i = 0; i < 4; i++){
    setTimeout(function() { console.log(`Mundo${i}`); }, 1000);
}