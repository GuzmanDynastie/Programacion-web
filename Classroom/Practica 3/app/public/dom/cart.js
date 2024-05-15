class ShoppingCart {
    constructor() {
        this.loadCart();
    }

    loadCart() {
        const cart = sessionStorage.getItem('cart');
        this.products = cart ? JSON.parse(cart) : [];
    }

    saveCart() {
        sessionStorage.setItem('cart', JSON.stringify(this.products));
    }

    addItem(productId, productURL, productName, productPrice, quantity) {
        const existingProductIndex = this.products.findIndex(item => item.productId === productId);
        if (existingProductIndex !== -1) {
            this.products[existingProductIndex].quantity += quantity;
        } else {
            this.products.push({ productId, productURL, productName, productPrice, quantity });
        }
        this.saveCart();
    }

    updateItem(productId, newQuantity) {
        const existingProductIndex = this.products.findIndex(item => item.productId === productId);
        if (existingProductIndex !== -1) {
            if (newQuantity === 0) {
                this.products.splice(existingProductIndex, 1);
            } else {
                this.products[existingProductIndex].quantity = newQuantity;
            }
            this.saveCart();
        } else {
            throw new ShoppingCartException("Producto no encontrado en el carrito");
        }
    }

    removeItem(productId) {
        this.products = this.products.filter(item => item.productId !== productId);
        this.saveCart();
    }

    calculateTotal() {
        let total = 0;
        for (const item of this.products) {
            // Aquí puedes calcular el total basado en los precios de los productos en tu tienda
        }
        return total;
    }
}

class ShoppingCartException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ShoppingCartException';
    }
}

// Función para cargar los productos del carrito en la página shopping_cart.html
function cargarProductosCarrito() {
    const cartItemsContainer = document.getElementById('cart-items');

    // Verifica si se encontró el contenedor de productos del carrito
    if (!cartItemsContainer) {
        // console.error("No se encontró el contenedor de productos del carrito.");
        return;
    }

    // Verifica si hay productos en el carrito en sessionStorage
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    console.log(cart)

    // Limpia el contenido previo del contenedor de productos del carrito
    cartItemsContainer.innerHTML = '';

    // Muestra cada producto del carrito en la página
    cart.forEach(producto => {
        const productoHTML = `
            <div class="media">
                <div class="media-body">
                    <h5 class="mt-0 mb-1">${producto.productName}
                        <span class="trash">
                            <i class="fa-solid fa-trash icon-trash"></i>
                        </span>
                    </h5>
                    <div>
                        <label class="cantidad-producto" for="">Cantidad:</label>
                        <input class="input-cantidad" type="text" value="${producto.quantity}">
                        <span class="editar-cantidad">
                            <i class="fa-solid fa-pencil icon-pencil"></i>
                        </span>
                    </div>
                    <div>
                        <label class="cantidad-precio" for="">Precio:</label>
                        <input class="input-precio" type="text" value="${producto.productPrice}">
                        <label class="pesos" for="">$ m.n</label>
                    </div>
                </div>
                <div class="media-right">
                    <img class="ml-3" src="${producto.productURL}" alt="${producto.productName}">
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += productoHTML;
    });
}

window.addEventListener('load', cargarProductosCarrito);

const shoppingCart = new ShoppingCart();

document.addEventListener('click', function (event) {
    const button = event.target;
    if (button.classList.contains('btn-add-product')) {
        const productId = button.getAttribute('data-product-id');
        const productURL = button.getAttribute('data-product-url');
        const productName = button.getAttribute('data-product-name');
        const productPrice = parseFloat(button.getAttribute('data-product-price'));

        document.getElementById('btnAgregar').addEventListener('click', function () {
            const cantidadInput = document.getElementById('cantidadInput');
            const quantity = parseInt(cantidadInput.value);

            if (quantity > 0) {
                shoppingCart.addItem(productId, productURL, productName, productPrice, quantity);
                // console.log('Producto añadido al carrito:', productId);
            } else {
                console.log('La cantidad ingresada no es válida.');
            }
        });
    }
});