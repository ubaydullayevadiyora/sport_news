const getAllComments = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM comment');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM comment WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createComment = async (req, res) => {
    try {
        const { text, user_id, news_id } = req.body;
        const result = await db.query(
            'INSERT INTO comment (text, user_id, news_id) VALUES ($1, $2, $3) RETURNING *',
            [text, user_id, news_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { url, type } = req.body;
        const result = await db.query(
            'UPDATE comment SET url = $1, type = $2 WHERE id = $3 RETURNING *',
            [url, type, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM comment WHERE id = $1', [id]);
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { 
    getAllComments, 
    createComment,
    getCommentById,
    updateComment, 
    deleteComment 
};
