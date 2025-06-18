// require('dotenv').config();
const express = require('express');
const cors = require('cors')


const app = express();
const PORT = process.env.PORT || 4002;
app.use(express.json());
app.use(cors())
app.use('/api/auth', auth);
app.use('/api/tickets', tickets);

connectDb().then(() => {
    app.listen(PORT, () => console.log(`Server runnin in ${PORT}`));
});