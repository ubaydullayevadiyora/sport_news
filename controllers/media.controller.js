const db = require('../config/db');

const getAllMedia = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM media');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMediaById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM media WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createMedia = async (req, res) => {
    try {
        const { url, type, news_id } = req.body;
        const result = await db.query(
            'INSERT INTO media (url, type, news_id) VALUES ($1, $2, $3) RETURNING *',
            [url, type, news_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const { url, type } = req.body;
        const result = await db.query(
            'UPDATE media SET url = $1, type = $2 WHERE id = $3 RETURNING *',
            [url, type, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM media WHERE id = $1', [id]);
        res.json({ message: 'Media deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllMedia,
    createMedia,
    getMediaById,
    updateMedia,
    deleteMedia
};