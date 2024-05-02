const express = require('express');
const app = express();
const fs = require('fs').promises;

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/food-requests', async (req, res) => {
    try {
        const data = await fs.readFile('data.json', 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.json([]);
    }
});

app.post('/food-requests', async (req, res) => {
    const newData = req.body;

    try {
        await fs.writeFile('data.json', JSON.stringify(newData));
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Serve static files
app.use(express.static('public'));

// Handle the index route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});