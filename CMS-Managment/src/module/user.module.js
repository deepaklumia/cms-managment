import pool from '../database/index.js';
import bcrypt from 'bcrypt';
import { validate as isUUID } from 'uuid';

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO Users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at`,
      [name, email, hashedPassword, role]
    );
    res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(`SELECT id, name, email, role, created_at FROM Users`);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(400).json({ message: 'Invalid UUID' });
    const user = await pool.query(`SELECT id, name, email, role, created_at FROM Users WHERE id = $1`, [id]);
    if (!user.rows[0]) return res.status(404).json({ message: 'User not found' });
    const roles = await pool.query(`SELECT * FROM Access WHERE role = $1`, [user.rows[0].role]);
    res.status(200).json({ data: { ...user.rows[0], roles: roles.rows } });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(400).json({ message: 'Invalid UUID' });
    const { name, email, role } = req.body;
    const result = await pool.query(
      `UPDATE Users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING id, name, email, role, created_at`,
      [name, email, role, id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User updated successfully', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(400).json({ message: 'Invalid UUID' });
    const result = await pool.query(`DELETE FROM Users WHERE id = $1 RETURNING id`, [id]);
    if (!result.rows[0]) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(`SELECT * FROM Users WHERE email = $1`, [email]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });
    const { password: _, ...userData } = user;
    const roles = await pool.query(`SELECT * FROM Access WHERE id = $1`, [userData.role]);
    console.log('User data:', userData,roles.rows);
    res.status(200).json({ message: 'Login successful', user:{ ...userData, role: roles.rows[0]?.role } });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};