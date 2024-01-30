/*import {TodoController} from "../controllers/TodoController";
import express from "express";
import {TodoMiddleware} from "../middlewares/todoMiddleware";
import mongoose from "mongoose";

let router  = express.Router();

//router.post('/', TodoMiddleware.todoCreateValidate, TodoController.create);

// Define a mongoose schema and model for user
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);


router.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input (you might want to add more validation)
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/', TodoController.getAll)

export { router };
*/
