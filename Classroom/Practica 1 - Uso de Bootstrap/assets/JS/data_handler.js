import { Product } from "./product.js";

const products = [];

function getProducts() {
    return products;
}

function getProductById(uuid) {
    return products.find(product => product._uid === uuid);
}

function createProduct(product) {
    products.push(Product.createFromObject(product));
}

function updatedProduct(uuid, updateProduct) {
    const index = products.findIndex(product => product._uid === uuid);
    if (index !== -1) {
        updateProduct._uid = uuid;
        products[index] = updateProduct;
    }
}

function deleteProduct(uuid) {
    const index = products.findIndex(product => product._uid === uuid);
    if (index !== -1) {
        products.splice(index, 1);
    }
}

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
}

export { getProducts, getProductById, createProduct, updatedProduct, deleteProduct, findProduct };