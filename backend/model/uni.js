// models/University.js
const pool = require('../db');
const bcrypt = require('bcryptjs');

const University = {
    async createUniversity(universityName, fullName, designation, officialEmail, contactDetails, username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await pool.query(
                `INSERT INTO university (university_name, full_name, designation, official_email, contact_details, username, password) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) 
                 RETURNING *`,
                [universityName, fullName, designation, officialEmail, contactDetails, username, hashedPassword]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Error creating university: ' + error.message);
        }
    },

    async findUniversityByEmail(officialEmail) {
        try {
            const result = await pool.query('SELECT * FROM university WHERE official_email = $1', [officialEmail]);
            return result.rows[0];
        } catch (error) {
            throw new Error('Error finding university: ' + error.message);
        }
    },

    async verifyUniversity(officialEmail, token) {
        try {
            const result = await pool.query(
                `UPDATE university 
                 SET email_verified = TRUE, verification_token = NULL 
                 WHERE official_email = $1 AND verification_token = $2 
                 RETURNING *`,
                [officialEmail, token]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Error verifying university: ' + error.message);
        }
    },

    async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    },

    // Optional: Method to generate a verification token
    async generateVerificationToken(officialEmail, token) {
        try {
            const result = await pool.query(
                `UPDATE university 
                 SET verification_token = $1 
                 WHERE official_email = $2 
                 RETURNING *`,
                [token, officialEmail]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error('Error generating verification token: ' + error.message);
        }
    }
};

module.exports = University;