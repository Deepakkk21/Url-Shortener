const mongoose = require('mongoose');
const mongodb = require('mongodb');

 const dbURL="mongodb+srv://dk135781:2E3i8yFjSFYFyHwl@urlshortener.a2lwqn9.mongodb.net/?retryWrites=true&w=majority"
// const dbURL ="mongodb://127.0.0.1:27017/GuruCool";

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

