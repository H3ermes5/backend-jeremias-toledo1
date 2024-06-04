const express = require('express');
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Rutas
const productsRouter = require('./routers/products_router');
const cartsRouter = require('./routers/carts_router');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
