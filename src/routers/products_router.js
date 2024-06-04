const express = require('express');
const router = express.Router();
const productsManager = require('../managers/productsManager');

router.post('/', (req, res) => {
  const newProduct = productsManager.add(req.body);
  res.status(201).json(newProduct);
});


router.put('/:id', (req, res) => {
  const updatedProduct = productsManager.update(parseInt(req.params.id), req.body);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.delete('/:id', (req, res) => {
  productsManager.delete(parseInt(req.params.id));
  res.status(204).end();
});

module.exports = router;
