const express = require('express');
const router = express.Router();
const cartsManager = require('../managers/cartsManager');

router.post('/', (req, res) => {
  const newCart = cartsManager.add();
  res.status(201).json(newCart);
});

router.get('/:id', (req, res) => {
  const cart = cartsManager.getById(parseInt(req.params.id));
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

router.post('/:id/product/:productId', (req, res) => {
  const { quantity } = req.body;
  const cart = cartsManager.addProduct(parseInt(req.params.id), parseInt(req.params.productId), quantity);
  if (cart) {
    res.status(201).json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

module.exports = router;
