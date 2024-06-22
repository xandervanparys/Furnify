// backend/src/server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express()
const cors = require('cors');
const Super = require('./src/model/SuperModel.cjs');
app.use(express.json())
app.use(cors());
require('dotenv').config({path: './.env'});
app.get('/:email', async (req, res) => {
    try {
        const {email} = req.params;
        const contact = await Super.findOne({ 'contact.email': email });
        if (!contact) {
            return res.status(404).json({message: "Contact not found"});
        }
        res.status(200).json(contact);
    } catch (error) {
        console.log("Error processing GET request to /:email", error)
        res.status(500).json({message: error.message});
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const contact = await Super.create(req.body);
        res.status(200).json(contact);
    } catch (error) {
        console.error("Error processing POST request to /api/contact:", error);
        res.status(500).json({message: error.message});
    }

})

app.put('/api/contact/:email', async (req, res) => {
    try {
        const {email} = req.params;
        const contact = await Super.findOne({ 'contact.email':email});

        if (!contact) {
            return res.status(404).json({message: "Contact not found"});
        }

        await Super.findByIdAndUpdate(contact._id, req.body);


        const updatedContact = await Super.findById(contact._id);

        res.status(200).json(updatedContact);

    } catch (error) {
        console.error("Error processing PUT request to /api/contact")
        res.status(500).json({message: error.message});
    }
})

app.delete('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const contact = await Super.findOne({ 'contact.email': email });

        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        await Super.findByIdAndDelete(contact._id);

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.error("Error processing DELETE request to /api/contact:", error);
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect(process.env.ATLAS_URI)
    .then(() => {
        console.log("Connected to database!");
        app.listen(3000, () => {
            console.log('server is running on port 3000')
        });
    }).catch(() => {
    console.log("Connection failed");
})

