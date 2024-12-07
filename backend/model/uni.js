const supabase = require('../supabaseClient');
const bcrypt = require('bcryptjs');

const University = {
    async createUniversity(universityName, fullName, designation, officialEmail, contactDetails, username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const { data, error } = await supabase
                .from('university')
                .insert([
                    {
                        university_name: universityName,
                        full_name: fullName,
                        designation,
                        official_email: officialEmail,
                        contact_details: contactDetails,
                        username,
                        password: hashedPassword,
                    },
                ]);

            if (error) throw new Error(error.message);
            return data[0];
        } catch (error) {
            throw new Error('Error creating university: ' + error.message);
        }
    },

    async findUniversityByEmail(officialEmail) {
        try {
            const { data, error } = await supabase
                .from('university')
                .select('*')
                .eq('official_email', officialEmail)
                .single();

            if (error) throw new Error(error.message);
            return data;
        } catch (error) {
            throw new Error('Error finding university: ' + error.message);
        }
    },

    async verifyUniversity(officialEmail, token) {
        try {
            const { data, error } = await supabase
                .from('university')
                .update({ email_verified: true, verification_token: null })
                .eq('official_email', officialEmail)
                .eq('verification_token', token)
                .single();

            if (error) throw new Error(error.message);
            return data;
        } catch (error) {
            throw new Error('Error verifying university: ' + error.message);
        }
    },

    async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    },

    async generateVerificationToken(officialEmail, token) {
        try {
            const { data, error } = await supabase
                .from('university')
                .update({ verification_token: token })
                .eq('official_email', officialEmail)
                .single();

            if (error) throw new Error(error.message);
            return data;
        } catch (error) {
            throw new Error('Error generating verification token: ' + error.message);
        }
    },
};

module.exports = University;