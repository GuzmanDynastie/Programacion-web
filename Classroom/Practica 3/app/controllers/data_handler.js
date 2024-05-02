const Product = require('./product');
const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/products.json');

// Función para guardar los productos en el archivo products.json
function saveProducts(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 4));
}

// Función para agregar un nuevo producto al archivo products.json
function addProduct(product) {
    try {
        let products = JSON.parse(fs.readFileSync(productsFilePath));
        const newProduct = Product.createFromObject(product);
        products.push(newProduct);
        saveProducts(products);
    } catch (error) {
        console.error('Error al agregar el producto:', error);
    }
};


const products = JSON.parse(fs.readFileSync(productsFilePath));
// const products = [];

function getProducts() {
    return products;
};

function getProductById(uuid) {
    return products.find(product => product._uid === uuid);
};

function createProduct(product) {
    const newProduct = Product.createFromObject(product);
    products.push(newProduct);
    saveProducts(products);
    return newProduct;
};

function updatedProduct(uuid, updateProduct) {
    const index = products.findIndex(product => product._uid === uuid);
    if (index !== -1) {
        updateProduct._uid = uuid;
        products[index] = updateProduct;
        return updateProduct;
    }
};

function deleteProduct(uuid) {
    const index = products.findIndex(product => product._uid === uuid);
    if (index !== -1) {
        const deletedProduct = products[index];
        products.splice(index, 1);
        return deletedProduct;
    }
};

function findProduct(query) {
    const [category, title] = query.split(':');
    if (category && title) {
        return products.filter(product => product.category.includes(category) && product.title.includes(title));
    } else if (category) {
        return products.filter(product => product.category.includes(category));
    } else if (title) {
        return products.filter(product => product.title.includes(title));
    }
    return [];
};

module.exports = { getProducts, getProductById, createProduct, updatedProduct, deleteProduct, findProduct, addProduct };