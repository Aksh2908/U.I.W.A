// models/University.js
const pool = require('../db');
const bcrypt = require('bcryptjs');

const University = {
    async createUniversity(universityName, fullName, designation, officialEmail, contactDetails, username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            `INSERT INTO university (university_name, full_name, designation, official_email, contact_details, username, password) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) 
             RETURNING *`,
            [universityName, fullName, designation, officialEmail, contactDetails, username, hashedPassword]
        );
        return result.rows[0];
    },

    async findUniversityByEmail(officialEmail) {
        const result = await pool.query('SELECT * FROM university WHERE official_email = $1', [officialEmail]);
        return result.rows[0];
    },

    async verifyUniversity(officialEmail, token) {
        const result = await pool.query(
            `UPDATE university 
             SET email_verified = TRUE, verification_token = NULL 
             WHERE official_email = $1 AND verification_token = $2 
             RETURNING *`,
            [officialEmail, token]
        );
        return result.rows[0];
    }
};

module.exports = University;