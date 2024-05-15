// Constantes
const productsPerPage = 4;
const maxVisibleButtons = 3;

// Función para cargar la lista de productos desde el servidor y mostrarlos en la página
function loadProductsFromServer(pageNumber) {
    const container = document.querySelector('.container-1');

    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            // Filtrar los productos para la página actual
            const startIndex = (pageNumber - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const displayedProducts = products.slice(startIndex, endIndex);

            // Limpiar el contenedor antes de agregar nuevos productos
            container.innerHTML = '';

            // Mostrar los productos en la página
            displayedProducts.forEach(product => {
                container.innerHTML += createProductCard(product);
            });

            // Generar los números de página
            generatePageNumbers(products.length, pageNumber);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

// Función para crear una tarjeta de producto
function createProductCard(product) {
    return `
    <div class="card">
    <a class="link-product" href="${product._uid}">
        <div class="product">
            <div class="product-c">
                <img class="card-img-top" src="${product.imageUrl}" alt="${product.title}" />
            </div>
            <div class="card-body">
                <h4 class="card-title">${product.title}</h4>
                <p class="card-text" >2 kg (paquete de 1) x $${product.pricePerPiece}</p>
            </div>
        </div>
    </a>

    <div class="box-btn-add-product">
        <input class="btn-add-product" type="submit" value="Agregar al carrito" data-product-id="${product._uid}" data-product-url="${product.imageUrl}" data-product-name="${product.title}" data-product-price="${product.pricePerPiece}" data-bs-toggle="modal" data-bs-target="#modalId" id="uid_producto">  
    </div>
</div>
    `;
}

// Función para generar los números de página
function generatePageNumbers(totalProducts, currentPage) {
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    // Agregar botón "Anterior"
    const previousButton = document.createElement('li');
    previousButton.classList.add('page-item');
    const previousLink = document.createElement('a');
    previousLink.classList.add('page-link');
    previousLink.href = '#';
    previousLink.setAttribute('aria-label', 'Previous');
    previousLink.innerHTML = '&laquo; Anterior';
    previousButton.appendChild(previousLink);
    paginationContainer.appendChild(previousButton);

    // Evento de clic para el botón "Anterior"
    previousLink.addEventListener('click', () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            loadProductsFromServer(prevPage);
        }
    });

    // Agregar botones de números de página
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('li');
        pageButton.classList.add('page-item');
        const pageLink = document.createElement('a');
        pageLink.classList.add('page-link');
        pageLink.href = '#';
        pageLink.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.appendChild(pageLink);
        paginationContainer.appendChild(pageButton);

        // Evento de clic para los botones de números de página
        pageLink.addEventListener('click', () => {
            if (i !== currentPage) {
                loadProductsFromServer(i);
            }
        });
    }

    // Agregar botón "Siguiente"
    const nextButton = document.createElement('li');
    nextButton.classList.add('page-item');
    const nextLink = document.createElement('a');
    nextLink.classList.add('page-link');
    nextLink.href = '#';
    nextLink.setAttribute('aria-label', 'Next');
    nextLink.innerHTML = 'Siguiente &raquo;';
    nextButton.appendChild(nextLink);
    paginationContainer.appendChild(nextButton);

    // Evento de clic para el botón "Siguiente"
    nextLink.addEventListener('click', () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            loadProductsFromServer(nextPage);
        }
    });
}

// Cargar la primera página de productos al cargar la página
window.onload = function () {
    loadProductsFromServer(1);
};

document.getElementById('btnAgregar').addEventListener('click', function () {
    window.location.href = '/shopping_cart';
});
