const { getProducts, createProduct, updateProduct, deleteProduct, findProduct } = require('./data_handler.js');
const { ShoppingCart } = require('./shopping_cart.js');

const productsToAdd = [
    { title: 'FELINO KITTEN', description: 'NUTRICIÓN ESPECIALIZADA PARA GATITOS DE TEMPRANA EDAD', imageUrl: 'https://nupec.com/wp-content/uploads/2020/09/img_saco_kitten.png', piece: '1', stock: 100, pricePerPiece: 400, category: 'NUTRICIÓN FELINA CIENTÍFICA' },
    { title: 'FELINO ADULT INDOOR', description: 'NUTRICIÓN ESPECIALIZADA PARA GATOS ADULTOS DE INTERIOR', imageUrl: 'https://nupec.com/wp-content/uploads/2020/09/img_saco_indoor.png', piece: '1', stock: 100, pricePerPiece: 400, category: 'NUTRICIÓN FELINA CIENTÍFICA' },
    { title: 'FELINO WEIGHT CARE', description: 'REDUCCIÓN Y MANTENIMIENTO DE PESO', imageUrl: 'https://nupec.com/wp-content/uploads/2022/12/IMG_WeightCare.png', piece: '1', stock: 100, pricePerPiece: 400, category: 'NUTRICIÓN FELINA ESPECIALIZADA' },
    { title: 'FELINO HAIRBALL', description: 'NUTRICIÓN ESPECIALIZADA PARA GATOS ADULTOS DE PELAJE LARGO', imageUrl: 'https://nupec.com/wp-content/uploads/2022/12/IMG_Hairball.png', piece: '1', stock: 100, pricePerPiece: 400, category: 'NUTRICIÓN FELINA ESPECIALIZADA' }
];

function addProducts() {
    productsToAdd.forEach(product => {
        createProduct(product);
    });
}

const updatedProduct = { title: 'FELINO SENIOR', description: 'NUTRICIÓN ESPECIALIZADA PARA GATOS DE EDAD AVANZADA', imageUrl: 'https://nupec.com/wp-content/uploads/2022/12/IMG_Senior.png', piece: '1', stock: 100, pricePerPiece: 400, category: 'NUTRICIÓN FELINA ESPECIALIZADA' };
updateProduct(productToUpdateId, updatedProduct);

deleteProduct(productToDeleteId);

function executeSearchQuery() {
    const query = prompt('Ingrese la consulta de búsqueda (en el formato <category>:<title>):');

    const searchResult = findProduct(query);

    console.log('Resultado de la búsqueda:', searchResult);
}