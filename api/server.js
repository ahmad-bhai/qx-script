const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = './users.json';

// 1. users.json se data read karne ki API
app.get('/api/users', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "File read nahi ho saki" });
        res.json(JSON.parse(data || '{}'));
    });
});

// 2. Naya user add karne ya upgrade karne ki API
app.post('/api/users', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        let users = err ? {} : JSON.parse(data || '{}');
        
        // Firebase ki tarah ek unique key generate kar lete hain timestamp se
        const newKey = "user_" + Date.now();
        users[newKey] = req.body;

        fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Save karne mein error" });
            res.json({ success: true, message: "User Upgraded!" });
        });
    });
});

// 3. User delete karne ki API
app.delete('/api/users/:key', (req, res) => {
    const keyToDelete = req.params.key;
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "File read error" });
        let users = JSON.parse(data || '{}');
        
        if (users[keyToDelete]) {
            delete users[keyToDelete];
            fs.writeFile(FILE_PATH, JSON.stringify(users, null, 2), (err) => {
                if (err) return res.status(500).json({ error: "Delete error" });
                res.json({ success: true, message: "User Removed!" });
            });
        } else {
            res.status(404).json({ error: "User nahi mila" });
        }
    });
});

app.listen(3000, () => console.log('Bhai Server 3000 port par chal raha hai!'));
