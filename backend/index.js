const express = require('express');
const cors = require('cors');
const Task = require("./models/task");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());//allow cross-origin requests no cors-error
app.use(express.json());

const mongoose = require("mongoose");
const user = require('./models/user');

mongoose.connect("mongodb+srv://todouser123:testuser123@cluster0.ixss3bc.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//for user signup
  app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;//taking the user input from the request body

    const existingUser = await User.findOne({ email });//checking if the user already exists in the database
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);//hashing the password for security

      // create user
  const user = await User.create({//sendind the user data to the database to create a new user
    name,
    email,
    password: hashedPassword
  });

  res.json({
    message: "Signup successful"
  });

});





//for user login
app.post("/login", async (req, res) => {//front end sends a post request to backend for comaprison of details
  const { email, password } = req.body;

  const user=await user.findOne({email});//checking if the user exists in the database
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(
    password, 
    user.password);//comparing the password entered by the user with the hashed password stored in the database

if(!isMatch){//if the password does not match
  return res.status(400).json({ message: "Invalid credentials" });
}
 // create token
  const token = jwt.sign(
    { id: user._id },
    "secretkey"
  );

  res.json({
    message: "Login successful",
    token
  });
} );//sending a response back to the frontend with a success message and a token if the login is successful. If the credentials are invalid, it sends an error message.






//get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});



//add a new task
app.post("/tasks", async (req, res) => {
  const text = req.body.text;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Task text required" });
  }

  const newTask = await Task.create({
    text: text,
    iscomplete: false
  });

  res.json(newTask);
});


//for toggling the completion status of a task
app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Not found" });
  }

  task.iscomplete = !task.iscomplete;

  await task.save();

  res.json(task);
});

//delete a task by ID
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

    app.listen(5000,()=>{
        console.log("Server running")
    });