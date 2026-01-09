const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let students = [
    { id: 1, name: "Alice Johnson", major: "Computer Science" },
    { id: 2, name: "Bob Smith", major: "Mathematics" }
];

// --- ROUTES ---

// GET operation
app.get('/students', (req, res) => {
    res.json(students);
});

// GET: Fetch a single student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
});

// POST operation
app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        major: req.body.major
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT operation
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student not found');

    student.name = req.body.name || student.name;
    student.major = req.body.major || student.major;
    res.json(student);
});

// DELETE: Remove a student
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Student not found');

    const deletedStudent = students.splice(index, 1);
    res.json(deletedStudent);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});