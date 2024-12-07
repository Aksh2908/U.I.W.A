const supabase = require('../supabaseClient');
const bcrypt = require('bcryptjs');

const Inspector = {
    async createInspector(fullName, dateOfBirth, gender, governmentIdNumber, email, employeeId, username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const { data, error } = await supabase
                .from('inspectors')
                .insert([
                    {
                        full_name: fullName,
                        date_of_birth: dateOfBirth,
                        gender,
                        government_id_number: governmentIdNumber,
                        email,
                        employee_id: employeeId,
                        username,
                        password: hashedPassword,
                    },
                ]);

            if (error) throw new Error(error.message);
            return data[0];
        } catch (error) {
            throw new Error('Error creating inspector: ' + error.message);
        }
    },

    async findInspectorByEmail(email) {
        try {
            const { data, error } = await supabase
                .from('inspectors')
                .select('*')
                .eq('email', email)
                .single();

            if (error) throw new Error(error.message);
            return data;
        } catch (error) {
            throw new Error('Error finding inspector: ' + error.message);
        }
    },

    async verifyInspector(email, token) {
        try {
            const { data, error } = await supabase
                .from('inspectors')
                .update({ email_verified: true, verification_token: null })
                .eq('email', email)
                .eq('verification_token', token)
                .single();

            if (error) throw new Error(error.message);
            return data;
        } catch (error) {
            throw new Error('Error verifying inspector: ' + error.message);
        }
    },

    async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    },

    async generateVerificationToken(email, token) {
        try {
            const { data, error } = await supabase
                .from('inspectors')
                .update({ verification_token: token })
                .eq('email', email)
                .single();

            if (error) throw new Error(error.message);
            return data;
        } catch (error) {
            throw new Error('Error generating verification token: ' + error.message);
        }
    },
};

module.exports = Inspector;