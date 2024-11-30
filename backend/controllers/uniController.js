const University = require("../models/University");

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUniversity = new University({ email, password });
        await newUniversity.save();
        res.status(201).json({ message: "University registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering university", error });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const university = await University.findOne({ email });
        if (!university || !(await university.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "University signed in successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error signing in university", error });
    }
};