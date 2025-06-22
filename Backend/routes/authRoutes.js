import express from 'express';
import { pool } from '../config/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();


console.log('Auth routes loaded');


router.post('/login', async (req, res) => {
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
    console.log('Registration data:', req.body);
});


router.post('/registration', async (req,res) => {
      console.log(req.body);
    const { username, password, role, name } = req.body;
    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1',
            [username]
        );
        if (!role) {
            return res.status(400).json({error: "role is required"});
        }

        if (existingUser.rows.length > 0) {
            return res.status(400).json({error: 'Username already exists'})
        }
        const hash = await bcrypt.hash(password, 10)
        
        const newCharacter = await pool.query('INSERT INTO users (username, password, role, name ) VALUES ($1,$2, $3, $4) RETURNING id, username, role, name ',
        [username, hash, role, name]
    );
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    const token = jwt.sign(
        {id: newCharacter.rows[0].id},
        process.env.JWT_SECRET
    );

    res.status(201).json({
        message: 'User registrerd succsfly',
        token,
    });
    } catch (error) {
        console.error('Registration error: ', error);
        res.status(500).json({error: 'Server error'})
    }

    
    
});

export default router;