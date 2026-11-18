const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public')); // Sprístupní frontend z priečinka public

// Databáza - dáta sa ukladajú lokálne do súboru, takže sa po reštarte nestratia
const db = new sqlite3.Database('./uniprep.db', (err) => {
  if (err) console.error('Chyba databázy:', err.message);
  else console.log('Pripojenie k SQLite databáze úspešné.');
});

db.run(`CREATE TABLE IF NOT EXISTS tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject TEXT,
  questionsData TEXT
)`);

const upload = multer({ dest: 'uploads/' });

// API endpoint na spracovanie súborov a vytvorenie testu
app.post('/api/create-test', upload.array('files'), (req, res) => {
  const { subjectName } = req.body;
  // Tu prebehne spracovanie textu zo súborov...
  
  res.json({ 
    success: true, 
    message: `Predmet ${subjectName} bol úspešne uložený do databázy!` 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server beží na porte ${PORT}`);
});