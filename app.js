const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
// Body parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: 'vani123', // your MySQL password
  database: 'application_db' // your database name
});

// Connect to the database
db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Route to serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/application-form.html');
});

// Handle form submission
app.post('/submit-application', (req, res) => {
  const { first_name, last_name, dob, age, gender, email, position, languages, password, confirm_password } = req.body;
  app.post('/submit-application', (req, res) => {
    console.log(req.body); // This should print out all the form data to the console

    // Handle form data here
    const formData = req.body;
    console.log(formData); // Check if you're receiving the form data
    res.send('Form submitted successfully!');
  });
  
  // Ensure passwords match
  if (password !== confirm_password) {
    return res.send('Passwords do not match');
  }

  const sql = 'INSERT INTO applicants (first_name, last_name, dob, age, gender, email, position, languages, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const languagesString = Array.isArray(languages) ? languages.join(', ') : languages;

  db.query(sql, [first_name, last_name, dob, age, gender, email, position, languagesString, password], (err, result) => {
    if (err) throw err;
    console.log('Application submitted');
    res.send('Application submitted successfully!');
  });
});

// Start the server
app.listen(3007, () => {
  console.log('http://localhost:3007');
});
