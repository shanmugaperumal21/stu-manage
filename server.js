
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect("mongodb+srv://shanmugaperumal_db_user:perumal4561@cluster0.glsed8u.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const Student = mongoose.model("Student", {
  name: String,
  regNo: String,
  department: String
});

// Add student
app.post("/api/students", async (req, res) => {
  const student = await Student.create(req.body);
  res.json(student);
});

// View students
app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
