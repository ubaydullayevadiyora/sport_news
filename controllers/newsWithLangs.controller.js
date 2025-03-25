const db = require("../config/db")

const getAllNewsWithLangs = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM news_with_langs');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createNewsWithLang = async (req, res) => {
    try {
        const { news_id, lang_id, translated_title, translated_content } = req.body;
        const result = await db.query('INSERT INTO news_with_langs (news_id, lang_id, translated_title, translated_content) VALUES ($1, $2, $3, $4) RETURNING *', [news_id, lang_id, translated_title, translated_content]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteNewsWithLang = async (req, res) => {
    try {
        const result = await db.query('DELETE FROM news_with_langs WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'News with Lang not found' });
        res.json({ message: 'News with Lang deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    getAllNewsWithLangs,
    createNewsWithLang,
    deleteNewsWithLang,
}