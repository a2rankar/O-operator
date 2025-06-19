const express = require('express');
const router = express.Router();
const {pool} = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { error } = require('console');


router.post('/login', async(req,res) => {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) 
        return res.status(401).json({ error: 'user not found'});
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return res.status(401).json({error: 'Wrong password'});

    const token = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET);
    res.json({token});
});
module.exports = router;