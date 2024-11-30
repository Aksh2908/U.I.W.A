// models/Inspector.js
const pool = require('../db');
const bcrypt = require('bcryptjs');

const Inspector = {
    async createInspector(fullName, dateOfBirth, gender, governmentIdNumber, email, employeeId, username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await pool.query(
                `INSERT INTO inspectors (full_name, date_of_birth, gender, government_id_number, email, employee_id, username, password) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                 RETURNING *`,
                [fullName, dateOfBirth, gender, governmentIdNumber, email, employeeId, username, hashedPassword]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Error creating inspector: ' + error.message);
        }
    },

    async findInspectorByEmail(email) {
        try {
            const result = await pool.query('SELECT * FROM inspectors WHERE email = $1', [email]);
            return result.rows[0];
        } catch (error) {
            throw new Error('Error finding inspector: ' + error.message);
        }
    },

    async verifyInspector(email, token) {
        try {
            const result = await pool.query(
                `UPDATE inspectors 
                 SET email_verified = TRUE, verification_token = NULL 
                 WHERE email = $1 AND verification_token = $2 
                 RETURNING *`,
                [email, token]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Error verifying inspector: ' + error.message);
        }
    },

    async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    },

    // Optional: Method to generate a verification token
    async generateVerificationToken(email, token) {
        try {
            const result = await pool.query(
                `UPDATE inspectors 
                 SET verification_token = $1 
                 WHERE email = $2 
                 RETURNING *`,
                [token, email]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Error generating verification token: ' + error.message);
        }
    }
};

module.exports = Inspector;