var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

// Load environment variables from .env file
require('dotenv').config();

const { productQueries } = require('../queries/queries');

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as ID ' + db.threadId);
});

// Create endpoint to fetch all products
router.get('/products', (req, res) => {
  db.query(productQueries.SELECT_ALL_PRODUCTS, (err, rows) => {
    if (err) {
      console.error('Error fetching products: ' + err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

// Create endpoint to fetch a product by ID
router.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  db.query(productQueries.SELECT_PRODUCT_BY_ID, [productId], (err, rows) => {
    if (err) {
      console.error('Error fetching product by ID: ' + err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (rows.length === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(rows[0]);
  });
});

// Create endpoint to create a product
router.post('/products', (req, res) => {
  const { name, type, specification_id, price, created_by } = req.body;
  const product = {
    name,
    type,
    specification_id,
    price,
    created_by,
  };

  db.query(productQueries.INSERT_PRODUCT, product, (err, result) => {
    if (err) {
      console.error('Error creating product: ' + err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
  });
});

// Create endpoint to update a product by ID
router.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  db.query(productQueries.UPDATE_PRODUCT_BY_ID, [updatedProduct, productId], (err, result) => {
    if (err) {
      console.error('Error updating product by ID: ' + err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ message: 'Product updated successfully' });
  });
});

// Create endpoint to delete a product by ID
router.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  db.query('UPDATE product SET is_deleted = 1 WHERE id = ? AND is_deleted = 0', [productId], (err, result) => {
    if (err) {
      console.error('Error deleting product by ID: ' + err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  });
});


module.exports = router;
