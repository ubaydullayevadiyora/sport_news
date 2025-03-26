const getAllNewsTags = async (req, res) => {
    const newsTags = await db.query('SELECT * FROM news_tags');
    res.json(newsTags.rows);
};

const createNewsTag = async (req, res) => {
    const { news_id, tag_id } = req.body;
    const newNewsTag = await db.query(
        'INSERT INTO news_tags (news_id, tag_id) VALUES ($1, $2) RETURNING *',
        [news_id, tag_id]
    );
    res.json(newNewsTag.rows[0]);
};

module.exports = {
    getAllNewsTags,
    createNewsTag
}