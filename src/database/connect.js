const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://shreyaskalate9:shreyas123123@databaseconnect.a4gtyyu.mongodb.net/restAPidb', {
})
.then(() => {
    console.log('Connected to database');
})
.catch((error) => {
    console.error('Error connecting to MongoDB', error);
});
