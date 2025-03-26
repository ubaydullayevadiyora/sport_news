const getAllAuthors = async (req, res) => {
    const authors = await db.query('SELECT * FROM authors');
    res.json(authors.rows);
};

const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);
        if (result.rows.length === 0) return res.status(404).json({ message: "Author not found" });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createAuthor = async (req, res) => {
    const { user_id, is_approved, is_editor } = req.body;
    const newAuthor = await db.query(
        'INSERT INTO authors (user_id, is_approved, is_editor) VALUES ($1, $2, $3) RETURNING *',
        [user_id, is_approved, is_editor]
    );
    res.json(newAuthor.rows[0]);
};

const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_approved, is_editor } = req.body;
        const result = await pool.query(
            "UPDATE authors SET is_approved = $1, is_editor = $2 WHERE id = $3 RETURNING *",
            [is_approved, is_editor, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM authors WHERE id = $1", [id]);
        res.json({ message: "Author deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
}