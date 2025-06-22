import dotenv from 'dotenv';
dotenv.config();
import  {Pool} from 'pg';


const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME
});


const connectDb = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT CHECK (role IN ('operator', 'supervisor')) NOT NULL,
        name TEXT 
    );
        
        CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT CHECK (status IN('open', 'in_progress', 'closed')) DEFAULT 'open',
         created_by INTEGER REFERENCES users(id),
      assigned_to INTEGER REFERENCES users(id)
        );
        
        CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        ticket_id INTEGER REFERENCES tickets(id),
        author_id INTEGER REFERENCES users(id),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
        );

    `);
}

export {
    pool, 
    connectDb,
};
