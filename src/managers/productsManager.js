const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../files/products.json');

const readProducts = () => {
  if (!fs.existsSync(productsPath)) return [];
  const data = fs.readFileSync(productsPath);
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
};

const generateId = (products) => {
  return products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
};

class ProductsManager {
  getAll() {
    return readProducts();
  }

  getById(id) {
    return readProducts().find(p => p.id === id);
  }

  add(product) {
    const products = readProducts();
    const newProduct = { id: generateId(products), ...product, status: product.status ?? true };
    products.push(newProduct);
    writeProducts(products);
    return newProduct;
  }

  update(id, updatedProduct) {
    const products = readProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      writeProducts(products);
      return products[index];
    }
    return null;
  }

  delete(id) {
    const products = readProducts();
    const newProducts = products.filter(p => p.id !== id);
    writeProducts(newProducts);
  }
}

module.exports = new ProductsManager();
