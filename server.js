require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const siswaRoute = require('./routes/siswaRoute');

app.use(cors());
app.use(express.json());

app.use('/api/datasiswa', siswaRoute);

app.get('/', (req, res) => {
    res.send('API berjalan - gunakan /api/datasiswa');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`)
});