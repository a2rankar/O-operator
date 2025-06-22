import express from 'express';
import {pool} from '../config/database.js';
import {tokenVerify} from '../middleware/auth.js';
import {controlRole} from '../middleware/guard.js'

const router = express.Router();

router.get('/', tokenVerify, async (req, res) => {
    const {role, id} = req.user;
    const query = role === 'supervisor'
        ? `SELECT tickets.*, users.name AS name
           FROM tickets
           LEFT JOIN users ON tickets.created_by = users.id`
        : `SELECT tickets.*, users.name AS name
           FROM tickets
           LEFT JOIN users ON tickets.created_by = users.id
           WHERE tickets.assigned_to = $1`;
    
    const params = role === 'supervisor' ? [] : [id];
    const result = await pool.query(query, params);
    res.json(result.rows);
});


router.post('/', tokenVerify, async (req ,res) => {
    const {title, description} = req.body;
    const userId = req.user.id;

    await pool.query(
        'INSERT INTO tickets (title, description, created_by, assigned_to) VALUES ($1, $2, $3, NULL)' ,
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
router.patch('/:id/assign', tokenVerify, controlRole('supervisor'), async (req ,res ) => {
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




router.get('/:id', tokenVerify, async (req, res) => {
  const ticketId = req.params.id;
  try {
    const result = await pool.query(
      `SELECT tickets.*, users.name AS name
       FROM tickets
       LEFT JOIN users ON tickets.created_by = users.id
       WHERE tickets.id = $1`,
      [ticketId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Ticket not found' });
    }


    const commentsRes = await pool.query(
      `SELECT * FROM comments WHERE ticket_id = $1 ORDER BY created_at DESC`,
      [ticketId]
    );

    const ticket = result.rows[0];
    ticket.comments = commentsRes.rows;

    res.json(ticket);
  } catch (err) {
    console.error('Error fetching ticket:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;