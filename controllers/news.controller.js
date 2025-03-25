const db = require('../config/db')

const getAllNews = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM news');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getNewsById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM news WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'News not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createNews = async (req, res) => {
    try {
        const { title, content, category_id } = req.body;
        const result = await db.query('INSERT INTO news (title, content, category_id) VALUES ($1, $2, $3) RETURNING *', [title, content, category_id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateNews = async (req, res) => {
    try {
        const { title, content, category_id } = req.body;
        const result = await db.query('UPDATE news SET title = $1, content = $2, category_id = $3 WHERE id = $4 RETURNING *', [title, content, category_id, req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'News not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteNews = async (req, res) => {
    try {
        const result = await db.query('DELETE FROM news WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'News not found' });
        res.json({ message: 'News deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
}