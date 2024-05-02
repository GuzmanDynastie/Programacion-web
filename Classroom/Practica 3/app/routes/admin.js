const router = require('express').Router();
const dataHandler = require('../controllers/data_handler');

// Middleware para validar los headers
const validateXAuth = (req, res, next) => {
    const secretKey = 'WEB';
    const xAuthHeader = req.headers['x-auth'];

    if (!xAuthHeader || xAuthHeader !== secretKey) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Si el encabezado X-Auth es válido, continuar con el siguiente middleware
    next();
};

// Crear nuevo producto
router.post('/admin/products', validateXAuth, (req, res) => {
    try {
        const { title, description, imageUrl, piece, stock, pricePerPiece, category } = req.body;
        const missingFields = [];

        // Verificar campos requeridos
        if (!title) missingFields.push('title');
        if (!description) missingFields.push('description');
        if (!imageUrl) missingFields.push('imageUrl');
        if (!piece) missingFields.push('piece');
        if (!stock) missingFields.push('stock');
        if (!pricePerPiece) missingFields.push('pricePerPiece');
        if (!category) missingFields.push('category');

        if (missingFields.length > 0) {
            throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
        }

        const newProduct = dataHandler.createProduct(req.body);
        res.status(201).json({ message: 'Producto creado exitosamente', productName: newProduct.title });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar producto
router.put('/admin/products/:id', validateXAuth, (req, res) => {
    try {
        const existingProduct = dataHandler.getProductById(req.params.id);
        if (!existingProduct) {
            throw new Error('Producto no encontrado');
        }

        const { title, description, imageUrl, piece, stock, pricePerPiece, category } = req.body;

        if (!title || !description || !imageUrl || !piece || !stock || !pricePerPiece || !category) {
            throw new Error('No se proporcionaron campos para actualizar');
        }

        const updatedProduct = dataHandler.updatedProduct(req.params.id, req.body);
        res.status(200).json({ message: `Producto '${updatedProduct.title}' actualizado correctamente` });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Eliminar producto
router.delete('/admin/products/:id', validateXAuth, (req, res) => {
    try {
        const deletedProduct = dataHandler.deleteProduct(req.params.id);
        if (!deletedProduct) {
            throw new Error("Producto no encontrado");
        }

        res.status(200).json({ message: `Producto '${deletedProduct.title}' eliminado correctamente` });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;