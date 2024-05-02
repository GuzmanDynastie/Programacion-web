const router = require('express').Router();
const dataHandler = require('../controllers/data_handler');

// Consultar productos
router.get('/products', (req, res) => {
    const filteredProducts = req.query.query ? dataHandler.filterProducts(req.query.query) : dataHandler.getProducts();
    res.json(filteredProducts);
});

// Agregar productos al carrito
router.post('/products/cart', (req, res) => {
    try {
        // Verificar que el cuerpo de la solicitud sea un arreglo de objetos
        if (!Array.isArray(req.body)) {
            throw new Error("El cuerpo de la solicitud debe ser un arreglo");
        }

        // Verificar que cada elemento del arreglo tenga los atributos productUuid y amount
        const invalidItems = req.body.some(item => !item.productUuid || !item.amount);
        if (invalidItems) {
            throw new Error("Cada elemento en el cuerpo de la solicitud debe tener los atributos 'productUuid' y 'amount'");
        }

        // Verificar que los productUuid correspondan a productos existentes
        const products = req.body.map(item => dataHandler.getProductById(item.productUuid));
        const invalidProducts = products.some(product => !product);
        if (invalidProducts) {
            throw new Error("Uno o más 'productUuid' no corresponden a productos existentes");
        }

        const productsInCart = req.body.map(item => {
            const product = dataHandler.getProductById(item.productUuid);
            return {
                productUuid: product._uid,
                productName: product.title,
                productDescription: product.description,
                productImage: product.imageUrl,
                productCategory: product.category,
                amount: item.amount
            };
        });
        res.status(200).json(productsInCart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Consultar producto por ID
router.get('/products/:id', (req, res) => {
    const product = dataHandler.getProductById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

module.exports = router;