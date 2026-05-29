import { neon } from '@neondatabase/serverless';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Neon connection
const sql = neon(process.env.DATABASE_URL);

// Create an endpoint to fetch data
app.get('/api/users', async (req, res) => {
  try {
    // Make sure 'users' matches a real table in your Neon database!
    const users = await sql`SELECT * FROM users`;
    console.log("Backend fetched these users from Neon:", users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

//Category endpoint
app.get('/api/categories', async (req, res) => {
  try {
    // Make sure 'categories' matches a real table in your Neon database!
    const categories = await sql`SELECT * FROM categories`;
    console.log("Backend fetched these categories from Neon:", categories);
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});