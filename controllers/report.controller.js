const getAllReports = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM report');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM report WHERE id = $1', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createReport = async (req, res) => {
    try {
        const { reason, user_id, news_id } = req.body;
        const result = await db.query(
            'INSERT INTO report (reason, user_id, news_id) VALUES ($1, $2, $3) RETURNING *',
            [reason, user_id, news_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const { url, type } = req.body;
        const result = await db.query(
            'UPDATE report SET url = $1, type = $2 WHERE id = $3 RETURNING *',
            [url, type, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteReport = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM report WHERE id = $1', [id]);
        res.json({ message: 'Report deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllReports,
    createReport, 
    getReportById, 
    updateReport, 
    deleteReport
};