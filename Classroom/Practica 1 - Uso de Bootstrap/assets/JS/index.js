import { getProducts, getProductById, createProduct, updatedProduct, deleteProduct, findProduct } from './data_handler.js';

const productsToAdd = [
    { title: 'CACHORRO', description: 'BALANCE NUTRICIONAL ADECUADO PARA EL ÓPTIMO DESARROLLO DE TU CACHORRO', imageUrl: 'https://nupec.com/wp-content/uploads/2018/12/npc-empaque-cachorro.png', piece: '1', stock: 100, pricePerPiece: 799, category: 'NUTRICIÓN CANINA CIENTÍFICA' },
    { title: 'ADULTO', description: 'MÁXIMO APROVECHAMIENTO NUTRICIONAL PARA UNA MEJOR SALUD Y CALIDAD DE VIDA', imageUrl: 'https://nupec.com/wp-content/uploads/2018/12/npc-empaque-adulto.png', piece: '1', stock: 100, pricePerPiece: 459, category: 'NUTRICIÓN CANINA CIENTÍFICA' },
    { title: '1ST CARE', description: 'FORTALECEMOS EL SISTEMA INMUNE DE TU CACHORRO CON UNA FÓRMULA EXCLUSIVA', imageUrl: 'https://nupec.com/wp-content/uploads/2019/02/npc-empaque-1st-care.png', piece: '1', stock: 100, pricePerPiece: 799, category: 'NUTRICIÓN CANINA ESPECIALIZADA' },
    { title: 'RENAL CARE', description: 'NUTRICIÓN ESPECIALIZADA AUXILIAR EN EL CUIDADO RENAL DE LOS CANINOS', imageUrl: 'https://nupec.com/wp-content/uploads/2022/09/CAN_renal_rndr.png', piece: '1', stock: 100, pricePerPiece: 699, category: 'NUTRICIÓN CANINA ESPECIALIZADA' },
    { title: 'FELINO KITTEN', description: 'NUTRICIÓN ESPECIALIZADA PARA GATITOS DE TEMPRANA EDAD', imageUrl: 'https://nupec.com/wp-content/uploads/2020/09/img_saco_kitten.png', piece: '1', stock: 100, pricePerPiece: 499, category: 'NUTRICIÓN FELINA CIENTÍFICA' },
    { title: 'FELINO ADULT INDOOR', description: 'NUTRICIÓN ESPECIALIZADA PARA GATOS ADULTOS DE INTERIOR', imageUrl: 'https://nupec.com/wp-content/uploads/2020/09/img_saco_indoor.png', piece: '1', stock: 100, pricePerPiece: 999, category: 'NUTRICIÓN FELINA CIENTÍFICA' },
    { title: 'FELINO WEIGHT CARE', description: 'REDUCCIÓN Y MANTENIMIENTO DE PESO', imageUrl: 'https://nupec.com/wp-content/uploads/2022/12/IMG_WeightCare.png', piece: '1', stock: 100, pricePerPiece: 449, category: 'NUTRICIÓN FELINA ESPECIALIZADA' },
    { title: 'FELINO HAIRBALL', description: 'NUTRICIÓN ESPECIALIZADA PARA GATOS ADULTOS DE PELAJE LARGO', imageUrl: 'https://nupec.com/wp-content/uploads/2022/12/IMG_Hairball.png', piece: '1', stock: 100, pricePerPiece: 799, category: 'NUTRICIÓN FELINA ESPECIALIZADA' }
];

function addProducts() {
    productsToAdd.forEach(product => {
        createProduct(product);
    });
}

const updatedProductData = { _uid: '', title: 'FELINO SENIOR', description: 'NUTRICIÓN ESPECIALIZADA PARA GATOS DE EDAD AVANZADA', imageUrl: 'https://nupec.com/wp-content/uploads/2022/12/IMG_Senior.png', piece: '1', stock: 500, pricePerPiece: 569, category: 'NUTRICIÓN FELINA ESPECIALIZADA' };

function executeSearchQuery(formato) {
    const query = formato;
    if (!query) {
        console.log('Consulta invalida');
        return;
    }
    const searchResult = findProduct(query);
    console.table('Resultado de la búsqueda:', searchResult);
}

addProducts();

// window.addProducts = addProducts;
window.getProducts = getProducts;
window.getProductById = getProductById;
window.updatedProduct = updatedProduct;
window.deleteProduct = deleteProduct;
window.executeSearchQuery = executeSearchQuery;
window.updatedProductData = updatedProductData;