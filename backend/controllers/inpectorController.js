const Inspector = require("../models/inspector");
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Signup function
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newInspector = new Inspector({ email, password: hashedPassword });
        await newInspector.save();
        res.status(201).json({ message: "Inspector registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering inspector", error });
    }
};

// Signin function
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const inspector = await Inspector.findOne({ email });
        if (!inspector || !(await inspector.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Inspector signed in successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error signing in inspector", error });
    }
};