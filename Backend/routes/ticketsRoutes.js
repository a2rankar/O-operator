const express = require('express');
const {pool} = require('../config/database');
const {tokenVerify, requireRole} = require('../middleware/auth');


const router = express.Router();

router.get('/', tokenVerify, async (req, res) => {
    const {role, id} = req.user;
    const query = role === 'supervisor'
    ? 'SELECT * FROM tickets'
    : 'SELECT * FROM tickets WHERE assigned_to = $1';

    const result = await pool.query(query, role === 'supervisor' ? [] : [id]);
    res.json(result.rows);
});
router.post('/', tokenVerify, async (req ,res) => {
    const {title, description} = req.body;
    const userId = req.user.id;

    await pool.query(
        'INSERT INTO tickets (title, description, created_by, assigned_to VALUES ($1, $2, $3, $3)' ,
        [title, description, userId]
    );

    res.status(201).json({message: 'Tickets created'});
});

router.patch('/:id/status', tokenVerify, async (req, res ) => {
    const {status} = req.body;
    await pool.query(
        'UPDATE tickets SET status = $1 WHERE id = $2', [status, req.params.id]);
        res.json({message: 'Status updated'});
});
router.patch('/:id/assign', tokenVerify, requireRole('supervisor'), async (req ,res ) => {
    const {userId} = req.body;
    await pool.query('UPDATE tickets SET assigned_to = $1 WHERE id = $2', [userId, req.params.id]);
    res.json({message: 'assigned'});
});

router.post('/:id/comment', tokenVerify, async (req, res) => {
    const {content} = req.body;
      const userId = req.user.id;
    await pool.query(
        'INSERT INTO comments (ticket_id, author_id, content) VALUES ($1, $2, $3)',
        [req.params.id, userId, content]
    );
    res.status(201).json({message: 'Comment added'});
});

module.exports = router;