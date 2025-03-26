const getAllTags = async (req, res) => {
    const tags = await db.query('SELECT * FROM tags');
    res.json(tags.rows);
};

const createTag = async (req, res) => {
    const { tag_name, description } = req.body;
    const newTag = await db.query(
        'INSERT INTO tags (tag_name, description) VALUES ($1, $2) RETURNING *',
        [tag_name, description]
    );
    res.json(newTag.rows[0]);
};

module.exports = {
    getAllTags,
    createTag
}