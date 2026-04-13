import pool from '../database/index.js';
import { validate as isUUID } from 'uuid';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, status } = req.body;
    const result = await pool.query(
      `INSERT INTO Products (name, description, price, status) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, description, price, status]
    );
    res.status(201).json({ message: 'Product created successfully', product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM Products`);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(400).json({ message: 'Invalid UUID' });
    const result = await pool.query(`SELECT * FROM Products WHERE id = $1`, [id]);
    if (!result.rows[0]) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(400).json({ message: 'Invalid UUID' });
    const { name, description, price, status } = req.body;
    const result = await pool.query(
      `UPDATE Products SET name = $1, description = $2, price = $3, status = $4 WHERE id = $5 RETURNING *`,
      [name, description, price, status, id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product updated successfully', product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(400).json({ message: 'Invalid UUID' });
    const result = await pool.query(`DELETE FROM Products WHERE id = $1 RETURNING id`, [id]);
    if (!result.rows[0]) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const createProductAccess = async (req, res) => {
  try {
    const { product_id, access_id } = req.body;
    if (!isUUID(product_id) || !isUUID(access_id)) return res.status(400).json({ message: 'Invalid UUID' });
    const product = await pool.query(`SELECT * FROM Products WHERE id = $1`, [product_id]);
    if (!product.rows[0]) return res.status(404).json({ message: 'Product not found' });
    const { name, description, price, status } = product.rows[0];
    const result = await pool.query(
      `INSERT INTO Product_Access (product_id, access_id, name, description, price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [product_id, access_id, name, description, price, status]
    );
    res.status(201).json({ message: 'Product access created successfully', data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(400).json({ message: 'Invalid UUID' });
    const { status } = req.body;
    const result = await pool.query(
      `UPDATE Products SET status = $1 WHERE id = $2 RETURNING *`,
      [status, id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product status updated successfully', product: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const getProductAccess = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT pa.*, a.role FROM Product_Access pa
      LEFT JOIN Access a ON pa.access_id = a.id
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const getProductAccessById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(400).json({ message: 'Invalid UUID' });
    const result = await pool.query(`
      SELECT pa.*, a.role FROM Product_Access pa
      LEFT JOIN Access a ON pa.access_id = a.id
      WHERE pa.id = $1
    `, [id]);
    if (!result.rows[0]) return res.status(404).json({ message: 'Product access not found' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
