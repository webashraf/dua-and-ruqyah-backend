const express = require('express');
const cors = require('cors');
const db = require('../db');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Get all categories
app.get('/categories', (req, res) => {
    const query = 'SELECT * FROM category';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get subcategories by category ID
app.get('/sub-category/:id', (req, res) => {
    const categoryId = req.params.id;
    console.log(categoryId);
    const query = 'SELECT * FROM sub_category WHERE cat_id = ?';
    db.all(query, [categoryId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows); 
    });
});

// Get duas by subcategory ID
app.get('/dua/:id', (req, res) => {
    const subcategoryId = req.params.id;
    const query = 'SELECT * FROM dua WHERE subcat_id = ?';
    db.all(query, [subcategoryId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Default route
app.get('/', (req, res) => {
    res.send('Dua Backend is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
