class Product {
    constructor(uid, title, description, imageUrl, piece, stock, pricePerPiece, category){
        this.setUID(uid);
        this.setTitle(title);
        this.setDescription(description);
        this.setImageUrl(imageUrl);
        this.setPiece(piece);
        this.setStock(stock);
        this.setPricePerPiece(pricePerPiece);
        this.setCategory(category);
    }

    // Getters
    getUID() { return this.uid; }

    getTitle() { return this.title; }

    getDescription() { return this.description; }

    getImageUrl() { return this.imageUrl; }

    getPiece() { return this.piece; }
    
    getStock() { return this.stock; }

    getPricePerPiece() { return this.pricePerPiece; }

    getCategory() { return this.category; }

    // Setters
    setUID(uid) {
        if (!uid || typeof uid !== 'string' || uid.trim() === '') {
            throw new ProductException('UID no puede estar vacio.');
        }
        this.uid = uid;
    }

    setTitle(title ) {
        if(!title || typeof uid !== 'string' || uid.trim() === '') {
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
        if (typeof imageUrl !== 'string' || imageUrl.trim() === ''){
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
        if (!product || typeof product !== 'object'){
            throw new ProductException('El producto proporcionado no es valido.');
        }
    }
}

class ProductException extends Error {
    constructor(message){
        super(message);
        this.name = 'ProductException';
    }
}