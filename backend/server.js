// server.js
const express = require('express');
const bodyParser = require('body-parser');
const inspectorRoutes = require('./routes/inspectorRoutes');
const universityRoutes = require('./routes/uniRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/inspectors', inspectorRoutes);
app.use('/api/universities', universityRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});