const db = require('../config/db');

const User = {
    create: async (data) => {
        try {
            const sql = `INSERT INTO user_login(user_name, email_id, pass_word) VALUES (?,?,?)`;
            const [result] = await db.query(sql, [data.user_name, data.email_id, data.pass_word]);
            return result;
        } catch (err) {
            throw new Error("Failed to insert data into the database.", err);
        }
    },

    findByEmail: async (email_id) => {
        try {
            const sql = `SELECT * FROM user_login WHERE email_id = ? AND is_deleted = 0`;
            const [rows] = await db.query(sql, [email_id]);
            return rows[0];
        } catch (err) {
            throw new Error("Failed to fetch data into the database.", err);
        }
    },

    findById: async (user_login_id) => {
        try {
            const sql = `SELECT * FROM user_login WHERE user_login_id = ? AND is_deleted = 0`;
            const [rows] = await db.query(sql, [user_login_id]);
            return rows[0];
        } catch (err) {
            throw new Error("Failed to fetch data into the database.", err);
        }
    }
}

module.exports = User;