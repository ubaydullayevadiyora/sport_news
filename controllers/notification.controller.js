const db = require('../db');

const getAllNotifications = async (req, res) => {
    const notifications = await db.query('SELECT * FROM notifications');
    res.json(notifications.rows);
};

const getNotificationById = async (req, res) => {
    const { id } = req.params;
    const notification = await db.query('SELECT * FROM notifications WHERE id = $1', [id]);
    res.json(notification.rows[0]);
};

const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_checked } = req.body;
        const result = await pool.query(
            "UPDATE notifications SET is_checked = $1 WHERE id = $2 RETURNING *",
            [is_checked, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: "Notification not found" });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createNotification = async (req, res) => {
    const { user_id, news_id, msg_type, is_checked } = req.body;
    const newNotification = await db.query(
        'INSERT INTO notifications (user_id, news_id, msg_type, is_checked) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, news_id, msg_type, is_checked]
    );
    res.json(newNotification.rows[0]);
};

const deleteNotification = async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM notifications WHERE id = $1', [id]);
    res.json({ message: 'Notification deleted' });
};

module.exports = {
    getAllNotifications,
    getNotificationById,
    updateNotification,
    createNotification,
    deleteNotification,
}