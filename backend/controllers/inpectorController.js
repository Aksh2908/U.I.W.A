const Inspector = require("../models/Inspector");

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newInspector = new Inspector({ email, password });
        await newInspector.save();
        res.status(201).json({ message: "Inspector registered successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering inspector", error });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const inspector = await Inspector.findOne({ email });
        if (!inspector || !(await inspector.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({ message: "Inspector signed in successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error signing in inspector", error });
    }
};