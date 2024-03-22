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
            existingProxy.quantity += amount;
        } else {
            const newProxy = new ProductProxy(productUUID, amount);
            this.proxies.push(newProxy);
        }
    }

    updateItem(productUUID, newAmount) {
        if (newAmount < 0) {
            throw new ShoppingCartException("La nueva cantidad no puede ser negativa");
        }

        const existingProxy = this._findProxyByUUID(productUUID);
        if (existingProxy) {
            if (newAmount === 0) {
                this.removeItem(productUUID);
            } else {
                existingProxy.quantity = newAmount;
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
            const product = this.products.find(prod => prod.uuid === proxy.productUUID);
            if (product) {
                total += product.price * proxy.quantity;
            }
        }
        return total;
    }
}

class ProductProxy {
    constructor(productUUID, quantity) {
        this.productUUID = productUUID;
        this.quantity = quantity;
    }
}

class ShoppingCartException extends Error {
    constructor(message) {
        this.name = 'ShoppingCartException';
    }
}