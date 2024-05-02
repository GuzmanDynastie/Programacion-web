class ShoppingCart {
    constructor() {
        this.proxies = [];
        this.products = [];
    }

    _findProxyByUUID(productUUID) {
        return this.proxies.find(proxy => proxy.productUUID === productUUID);
    }

    addItem(productUUID, amount) {
        const existingProxy = this._findProxyByUUID(productUUID);
        if (existingProxy) {
            existingProxy.amount += amount;
        } else {
            const newProxy = new ProductProxy(productUUID, amount);
            this.proxies.push(newProxy);
        }
    }

    updateItem(productUUID, newAmount) {
        if (typeof newAmount !== 'number' || isNaN(newAmount)) {
            throw new ShoppingCartException("La nueva cantidad debe ser numero.")
        }

        if (newAmount < 0) {
            throw new ShoppingCartException("La nueva cantidad no puede ser negativa");
        }

        const existingProxy = this._findProxyByUUID(productUUID);
        if (existingProxy) {
            if (newAmount === 0) {
                this.removeItem(productUUID);
            } else {
                existingProxy.amount = newAmount;
            }
        } else {
            throw new ShoppingCartException("Producto no encontrado en el carrito");
        }
    }

    removeItem(productUUID) {
        this.proxies = this.proxies.filter(proxy => proxy.productUUID !== productUUID);
    }

    calculateTotal() {
        let total = 0;
        for (const proxy of this.proxies) {
            const product = this.products.find(prod => prod.getUID() === proxy.productUUID);
            if (product) {
                total += product.getPricePerPiece() * proxy.amount;
            }
        }
        return total;
    }
}

class ProductProxy {
    constructor(productUUID, amount) {
        this.productUUID = productUUID;
        this.amount = amount;
    }
}

class ShoppingCartException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ShoppingCartException';
    }
}

module.exports = ShoppingCart;