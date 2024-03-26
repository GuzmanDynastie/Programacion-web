import { generateUUID } from './utils.js';

class Product {
    constructor(title, description, imageUrl, piece, stock, pricePerPiece, category) {
        this._uid = generateUUID();
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.piece = piece;
        this.stock = stock;
        this.pricePerPiece = pricePerPiece;
        this.category = category;
    }

    // Getters
    getUID() { return this._uid }

    getTitle() { return this.title; }

    getDescription() { return this.description; }

    getImageUrl() { return this.imageUrl; }

    getPiece() { return this.piece; }

    getStock() { return this.stock; }

    getPricePerPiece() { return this.pricePerPiece; }

    getCategory() { return this.category; }

    // Setters
    setTitle(title) {
        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new ProductException('Titulo no puede estar vacio.');
        }
        this.title = title;
    }

    setDescription(description) {
        if (typeof description !== 'string') {
            throw new ProductException('La descripcion debe ser una cadena.');
        }
        this.description = description;
    }

    setImageUrl(imageUrl) {
        if (typeof imageUrl !== 'string' || imageUrl.trim() === '') {
            throw new ProductException('La URL de la imagen debe ser una cadena no vacia.');
        }
        this.imageUrl = imageUrl;
    }

    setPiece(piece) {
        if (!piece || typeof piece !== 'string' || piece.trim() === '') {
            throw new ProductException('Pieza no puede estar vacia.');
        }
        this.piece = piece;
    }

    setStock(stock) {
        if (stock === undefined || !Number.isInteger(stock) || stock < 0) {
            throw new ProductException('Stock debe ser un numero entero positivo.');
        }
        this.stock = stock;
    }

    setPricePerPiece(pricePerPiece) {
        if (pricePerPiece === undefined || typeof pricePerPiece !== 'number' || pricePerPiece <= 0) {
            throw new ProductException('El precio por unidad debe ser un numero positivo.');
        }
        this.pricePerPiece = pricePerPiece;
    }

    setCategory(category) {
        if (!category || typeof category !== 'string' || category.trim() === '') {
            throw new ProductException('La categoría debe ser una cadena no vacía.');
        }
        this.category = category;
    }

    static validateProduct(product) {
        if (!product || typeof product !== 'object') {
            throw new ProductException('El producto proporcionado no es valido.');
        }
        const requiredFields = ['title', 'description', 'imageUrl', 'piece', 'stock', 'pricePerPiece', 'category'];
        for (const field of requiredFields) {
            if (!product.hasOwnProperty(field)) {
                throw new ProductException(`Falta el campo ${field} en el producto.`);
            }
        }
    }

    static createFromJson(jsonValue) {
        try {
            const productData = JSON.parse(jsonValue);

            return new Product(
                productData.title,
                productData.description,
                productData.imageUrl,
                productData.piece,
                productData.stock,
                productData.pricePerPiece,
                productData.category
            );
        } catch (error) {
            throw new ProductException('Error al crear el producto desde JSON: ' + error.message);
        }
    }

    static createFromObject(obj) {
        if (obj instanceof Object && !(obj instanceof Product)) {
            const { title, description, imageUrl, piece, stock, pricePerPiece, category } = obj;
            return new Product(title, description, imageUrl, piece, stock, pricePerPiece, category);
        } else {
            throw new ProductException('Formato de Objeto invalido');
        }
    }

    static cleanObject(obj) {
        if (obj instanceof Object) {
            const validPropierties = ['title', 'description', 'imageUrl', 'piece', 'stock', 'pricePerPiece', 'category'];
            const cleanedObject = {};
            for (const prop of validPropierties) {
                if (obj.hasOwnProperty(prop)) {
                    cleanedObject[prop] = obj[prop];
                }
            }
            return cleanedObject;
        } else {
            throw new ProductException('Formato de Objeto invalido');
        }
    }
}

class ProductException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ProductException';
    }
}

export { Product };