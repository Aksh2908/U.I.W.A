// models/Inspector.js
const pool = require('../db');
const bcrypt = require('bcryptjs');

const Inspector = {
    async createInspector(fullName, dateOfBirth, gender, governmentIdNumber, email, employeeId, username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            `INSERT INTO inspectors (full_name, date_of_birth, gender, government_id_number, email, employee_id, username, password) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
             RETURNING *`,
            [fullName, dateOfBirth, gender, governmentIdNumber, email, employeeId, username, hashedPassword]
        );
        return result.rows[0];
    },

    async findInspectorByEmail(email) {
        const result = await pool.query('SELECT * FROM inspectors WHERE email = $1', [email]);
        return result.rows[0];
    },

    async verifyInspector(email, token) {
        const result = await pool.query(
            `UPDATE inspectors 
             SET email_verified = TRUE, verification_token = NULL 
             WHERE email = $1 AND verification_token = $2 
             RETURNING *`,
            [email, token]
        );
        return result.rows[0];
    }
};

module.exports = Inspector;