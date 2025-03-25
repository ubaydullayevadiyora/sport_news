const db = require('../config/db');

const getAllCategories = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM categories');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Category not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await db.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await db.query('UPDATE categories SET name = $1 WHERE id = $2 RETURNING *', [name, req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Category not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const result = await db.query('DELETE FROM categories WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory
}