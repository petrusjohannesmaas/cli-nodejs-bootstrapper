Here are my **Standard Operating Procedures (SOP)** for my workflow when developing JavaScript projects, starting with the general steps, and then we’ll dive into specific instructions for each starter project as I use them.

---

### **General Steps for All Starters**
1. **Create Project Planning Diagram in Draw.io
   - Create a new `.drawio` file
   - Sketch out your project architecture, workflow, or relationships, depending on the starter you're working on. Use arrows, shapes, and text boxes for clarity.
   - Save the document in your project directory, e.g., `project-diagram.drawio`.

2. Run `new-project` in the terminal to execute your starter project GUI

---

### **1. Full Stack Starter SOP (Express, Mongoose, EJS)**

**Folder structure:**
```
FullStackStarter/
├── views/
│   └── index.ejs
├── app.js
└── .env
```

**Code for `app.js`:**
```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Full Stack Starter' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

**Code for `.env`:**
```env
MONGO_URI=mongodb://localhost:27017/fullstackstarter
PORT=3000
```

**Code for `views/index.ejs`:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title><%= title %></title>
</head>
<body>
    <h1>Welcome to the Full Stack Starter</h1>
</body>
</html>
```

---

### **2. API Starter SOP (JSON-Server)**

**Folder structure:**
```
APIStarter/
└── db.json
```

**Code for `db.json`:**
```json
{
    "data": [
        { "id": 1, "name": "Alice", "email": "alice@example.com" },
        { "id": 2, "name": "Bob", "email": "bob@example.com" }
    ]
}
```

**Command to run the server:**
```bash
npx json-server db.json --port 3000
```

**Add an `index.html` file to a `/public` folder:**
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Starter Template</title>
</head>

<body>
    <h1>This is the homepage for JSON-server API</h1>
    <p>Click this button to get all data</p>
    <button id="myBtn">Click me</button>

    <div class="box" style="margin-top: 50px;">
        <div><strong>Data:</strong></div>
        <div class="data"><i>Don't be scared now... click it</i></div>
    </div>

</body>
<script>
    async function getData() {
        const url = "http://localhost:3000/data";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const json = await response.json();

            // Replace the div content with raw JSON data
            document.querySelector(".data").textContent = JSON.stringify(json, null, 2);

        } catch (error) {
            console.error(error.message);
        }
    }

    document.getElementById("myBtn").addEventListener("click", getData);


</script>

</html>
```

**Test and Modify**
   - Use tools like Postman or `curl` to test API endpoints.
   - Update `db.json` as your requirements evolve.

---

### **3. CLI Starter SOP (Inquirer)**

**Folder structure:**
```
CLIStarter/
└── cli.js
```

**Code for `cli.js`:**
```javascript
const inquirer = require('inquirer').default;

inquirer.prompt([
    { type: 'input', name: 'name', message: 'What is your name?' },
    { type: 'list', name: 'role', message: 'Choose a role:', choices: ['Admin', 'User', 'Guest'] }
]).then((answers) => {
    console.log(`Hello, ${answers.name}. You are a ${answers.role}.`);
}).catch((error) => {
    console.error('Error:', error.message);
});
```

**Enhance CLI**
   - Add additional prompts or incorporate new functionalities over time.

---

### **4. Relational Starter SOP (Express, Postgres, EJS)**

**Start Podman PostgreSQL Container**
- Pull and start the PostgreSQL container:
 ```bash
 podman run --name postgres-container -e POSTGRES_USER=user -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=your-database -p 5432:5432 -d postgres
 ```

**Folder structure:**
```
RelationalStarter/
├── views/
│   └── index.ejs
├── app.js
└── .env
```

**Code for `app.js`:**
```javascript
require('dotenv').config();
const express = require('express');
const postgres = require('postgres');
const app = express();

// Connect to PostgreSQL
const sql = postgres({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
});

sql`SELECT 1` // Test connection
    .then(() => console.log('PostgreSQL connected'))
    .catch((err) => console.error('PostgreSQL connection error:', err));

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.get('/', async (req, res) => {
    try {
        const result = await sql`SELECT NOW() AS current_time`;
        res.render('index', { title: 'Relational Starter', currentTime: result[0].current_time });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```

**Code for `.env`:**
```env
POSTGRES_HOST=localhost
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
POSTGRES_DB=your-database
POSTGRES_PORT=5432
PORT=3000
```

**Code for `views/index.ejs`:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title><%= title %></title>
</head>
<body>
    <h1>Welcome to the Relational Starter</h1>
    <p>Current time from database: <%= currentTime %></p>
</body>
</html>
```

---

This boilerplate should get you rolling quickly for each starter!