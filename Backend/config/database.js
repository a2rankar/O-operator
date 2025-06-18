const {Pool} = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE
});


const connectDb = async ( ) => {
    await pool.query(`
        create table of not exists users (
        id serial praimery key,
        username text unique not null,
        password text not null,
        role text check (role in ('operator', 'supervisor')) not null);
        
        
        CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMAERY KEY,
        title TEXT NOY NULL,
        descripition TEXT,
        status TEXT CHECK (status IN('open', 'in_progress', 'closed')) DEFAULT 'open',
        
        CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMAERY KEY,
        ticket_id INTEGER REFERENCES ticket(id),
        author_id INTEGER REFRENCES users(id),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        );
        )`
    );
}

module.exports = {
    pool, 
    connectDb,
};
