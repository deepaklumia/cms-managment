import pool from '../database/index.js';
import { validate as isUUID } from 'uuid';
import { uuid } from 'uuidv4';


export const createAccess = async (req, res) => {
  try {
    const { role } = req.body;
    const id = uuid();
    const result = await pool.query(
      `INSERT INTO Access (id, role) VALUES ($1, $2) RETURNING *`,
      [id, role]
    );
    res.status(201).json({ message: 'Access created successfully', access: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const getAccess = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM Access`);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const updateAccess = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(400).json({ message: 'Invalid UUID' });
    const { role } = req.body;
    const result = await pool.query(
      `UPDATE Access SET role = $1 WHERE id = $2 RETURNING *`,
      [role, id]
    );
    if (!result.rows[0]) return res.status(404).json({ message: 'Access not found' });
    res.status(200).json({ message: 'Access updated successfully', access: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

export const deleteAccess = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUUID(id)) return res.status(400).json({ message: 'Invalid UUID' });
    const result = await pool.query(`DELETE FROM Access WHERE id = $1 RETURNING id`, [id]);
    if (!result.rows[0]) return res.status(404).json({ message: 'Access not found' });
    res.status(200).json({ message: 'Access deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
