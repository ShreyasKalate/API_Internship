const express = require('express');
const router = new express.Router();

const Book = require('../models/schema');

// Create a single new book
router.post('/books', async (req, res) => {
    try {
        const addingBook= new Book(req.body)
        console.log(req.body);
        const insertBook= await addingBook.save();
        res.status(201).send(insertBook)
    } catch (error) {
        res.status(400).send(error)
    }
});

//Create Multiple Books
router.post('/books', async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
            return res.status(400).send({ error: 'Request body must be an array of books' });
        }

        const books = req.body.map(book => new Book(book));
        const insertedBooks = await Book.insertMany(books);
        res.status(201).send(insertedBooks);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).send({
                error: 'Validation Error',
                details: error.errors
            });
        }
        res.status(500).send(error);
    }  

});

// Get all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).send(books);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get individual book by ID
router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).send();
        }
        res.status(200).send(book);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update a book by ID
router.patch('/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedBook) {
            return res.status(404).send();
        }
        res.status(200).send(updatedBook);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a book by ID
router.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).send();
        }
        res.status(200).send(deletedBook);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
