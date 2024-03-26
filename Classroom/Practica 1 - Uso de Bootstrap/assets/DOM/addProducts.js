import { getProducts } from '../JS/data_handler.js';

function createProductCard(product) {
    return `
        <div class="card">
            <div class="product">
                <img class="card-img-top" src="${product.imageUrl}"
                    alt="${product.title}" />
                <div class="card-body">
                    <h4 class="card-title">${product.category}</h4>
                    <p class="card-text">2 kg (paquete de 1) x $${product.pricePerPiece}</p>
                </div>
            </div>
        </div>
    `;
}

function loadProductsInContainer() {
    const container = document.getElementsByClassName('container-1')[0];
    const products = getProducts();
    let htmlTargets = '';
    products.forEach(product => {
        htmlTargets += createProductCard(product);
    });
    container.innerHTML = htmlTargets;
    // container.insertAdjacentHTML('beforeend', htmlTargets);
}

document.addEventListener("DOMContentLoaded", () => {
    loadProductsInContainer();
});