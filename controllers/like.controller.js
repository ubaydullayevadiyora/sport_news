const getAllLikes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM like');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getLikeById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM like WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createLike = async (req, res) => {
    try {
        const { user_id, news_id } = req.body;
        const result = await db.query(
            'INSERT INTO like (user_id, news_id) VALUES ($1, $2) RETURNING *',
            [user_id, news_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateLikes = async (req, res) => {
    try {
        const { id } = req.params;
        const { url, type } = req.body;
        const result = await db.query(
            'UPDATE likes SET url = $1, type = $2 WHERE id = $3 RETURNING *',
            [url, type, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteLikes = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM likes WHERE id = $1', [id]);
        res.json({ message: 'Media deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllLikes,
    createLike,
    getLikeById, 
    updateLikes, 
    deleteLikes
};