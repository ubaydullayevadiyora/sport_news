const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler")

const addNewLang = async (req, res) => {
    try {
        const { name, code } = req.body;
        const newLang = await pool.query(`INSERT INTO language(name, code)
            VALUES($1, $2) RETURNING *`, [name, code])
        console.log(newLang);
        console.log(newLang.rows[0]);
        res.status(201).send({ message: "yangi til qo'shildi", lang: newLang.rows[0] })

    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllLangs = async (req, res) => {
    try {
        const lang = await pool.query(`SELECT * FROM language`)

        res.status(201).send({ message: "hamma til ma'lumotlari", lang: lang.rows })
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteLangById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteLang = await pool.query(`DELETE FROM language WHERE id = $1 RETURNING *`, [id])

        if (deleteLang.rowCount === 0) {
            return res.status(404).json({ error: "foydalanuvchi topilmadi." });
        }

        res.json({ message: "foydalanuvchi o'chirildi", user: deleteLang.rows[0] });

    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = {
    addNewLang,
    getAllLangs,
    deleteLangById
}