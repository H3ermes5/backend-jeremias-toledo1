const fs = require('fs');
const path = require('path');

const cartsPath = path.join(__dirname, '../files/carts.json');

const readCarts = () => {
  if (!fs.existsSync(cartsPath)) return [];
  const data = fs.readFileSync(cartsPath);
  return JSON.parse(data);
};

const writeCarts = (carts) => {
  fs.writeFileSync(cartsPath, JSON.stringify(carts, null, 2));
};

const generateId = (carts) => {
  return carts.length ? Math.max(...carts.map(c => c.id)) + 1 : 1;
};

class CartsManager {
  getAll() {
    return readCarts();
  }

  getById(id) {
    return readCarts().find(c => c.id === id);
  }

  add() {
    const carts = readCarts();
    const newCart = { id: generateId(carts), products: [] };
    carts.push(newCart);
    writeCarts(carts);
    return newCart;
  }

  addProduct(cartId, productId, quantity) {
    const carts = readCarts();
    const cart = carts.find(c => c.id === cartId);
    if (cart) {
      const productInCart = cart.products.find(p => p.productId === productId);
      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      writeCarts(carts);
      return cart;
    }
    return null;
  }
}

module.exports = new CartsManager();
