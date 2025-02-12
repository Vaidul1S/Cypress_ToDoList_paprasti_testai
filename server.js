const express = require('express');
const app = express();
const pool = require('./database');

const port = 5555;

app.use(express.json());



//-----------------------------Routes-----------------------------

app.get('/users', async (req, res) => {

    try {
        const results = await pool.query(`SELECT * FROM users`);
        res.status(200).json(results.rows);

    } catch (error) {
        res.status(400).json({ error: 'error' });
    }

});

app.get('/users/:id', async (req, res) => {

    try {
        const id = req.params.id
        const results = await pool.query(`SELECT * FROM users WHERE id=${id}`);
        res.status(200).json(results.rows);

    } catch (error) {
        res.status(400).json({ error: 'error' });
    }

});

app.post('/users', async (req, res) => {

    try {
        const { id, username, password } = req.body;

        const results = await pool.query(`INSERT INTO users (id,username, password) VALUES (${id}, '${username}', '${password}') RETURNING *`);
        res.status(201).json(results.rows[0]);

    } catch (error) {
        res.status(400).json({ error: 'error' });
    }

});

app.put('/users/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const { username, password } = req.body;
        const results = await pool.query(`UPDATE users SET username='${username}', password='${password}' WHERE id=${id} RETURNING *`);
        res.status(200).json(results.rows[0]);

    } catch (error) {
        res.status(400).json({ error: 'error' });
    }

});

app.delete('/users/:id', async (req, res) => {

    try {
        const id = req.params.id
        const results = await pool.query(`DELETE FROM users WHERE id=${id} RETURNING *`);
        res.status(200).json(results.rows);

    } catch (error) {
        res.status(400).json({ error: 'error' });
    }

});

app.get('/products', async (req, res) => {

    try {
        const results = await pool.query(`SELECT * FROM products`);
        res.status(200).json(results.rows);

    } catch (error) {
        res.status(400).json({ error: 'error' });
    }

});

app.get('/products/:id', async (req, res) => {

    try {
        const id = req.params.id
        const results = await pool.query(`SELECT * FROM products WHERE id=${id}`);
        res.status(200).json(results.rows[0]);

    } catch (error) {
        res.status(400).json({ error: 'error' });
    }

});

app.post('/products', async (req, res) => {

    try {
        const { name, price, description } = req.body;

        const results = await pool.query(`INSERT INTO products (name, price, description) VALUES ('${name}', ${price}, '${description}') RETURNING *`);
        res.status(201).json(results.rows[0]);

    } catch (error) {
        res.status(400).json({ error: 'error' });
    }

});

app.put('/products/:id', async (req, res) => {

    try {
        const id = req.params.id
        const { name, price, description } = req.body;
        const results = await pool.query(`UPDATE products SET name='${name}', price='${price}', description='${description}' WHERE id=${id} RETURNING *`);
        res.status(200).json(results.rows[0]);

    } catch (error) {
        res.status(400).json({ error: 'error' });
    }

});

app.delete('/products/:id', async (req, res) => {

    try {
        const id = req.params.id
        const results = await pool.query(`DELETE FROM products WHERE id=${id} RETURNING *`);
        res.status(200).json({message: 'Produktas ištrintas sėkmingai!'});             
    } catch (error) {
        res.status(400).json({ error: 'error' });
    }

});

app.listen(port, () => {
    console.log(`CRUD API darbui pasiruošus ant ${port} porto!`)
});