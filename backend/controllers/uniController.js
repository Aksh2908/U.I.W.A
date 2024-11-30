const University = require("../models/uni");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Signup function
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation (basic example)
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUniversity = new University({ email, password: hashedPassword });
        await newUniversity.save();
        res.status(201).json({ message: "University registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering university", error });
    }
};

// Signin function
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation (basic example)
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const university = await University.findOne({ email });
        if (!university || !(await university.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "University signed in successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error signing in university", error });
    }
};