import mongoose from "mongoose";


console.log('Script started');
mongoose.connect('mongodb://127.0.0.1/Web');


//rajouter
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
