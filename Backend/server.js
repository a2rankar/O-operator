require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const ticketsRoutes = require('./routes/ticketsRoutes');
const cors = require('cors');
const {connectDb} = require('./config/database');

const app = express();
const PORT = process.env.PORT || 4002;
app.use(express.json());
app.use(cors())
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketsRoutes);

connectDb().then(() => {
    app.listen(PORT, () => console.log(`Server runnin in ${PORT}`));
});