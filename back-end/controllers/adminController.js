const express = require('express');
const router = express.Router();
const userData = require('../models/userSchema')
const credentials = {
    email: 'admin1212@gmail.com',
    password: '7711'
}


module.exports = {

    login: async (req, res) => {
        try {
            const { email, password } = req.body

            if (credentials.email === email) {
                if (credentials.password === password) {

                    return res.json({ success: true })
                } else {
                    return res.json({ error: '', perror: 'Invalid password' })
                }
            }
            return res.json({ error: 'Invalid email address', perror: '' })
        } catch (err) {

        }
    },
    dashboard: async (req, res) => {
        try {
            const user = await userData.find({})
            return res.json({ success: true, user })
        } catch (err) {
            return res.json({ error: err })
        }
    },
    delete: async (req, res) => {
        try {
            const userId = req.query.id;
            console.log(userId);

            // Find the user by ID
            const user = await userData.findById(userId);
            console.log(user);
            if (user) {
                // If the user is found, delete it
                await userData.findOneAndDelete({ _id: userId });
                return res.json({ success: true });
            } else {

                return res.status(404).json({ error: 'No user found' });
            }
        } catch (err) {
            // Handle other errors
            return res.status(500).json({ error: err.message || 'Internal Server Error' });
        }
    },
    editGet: async (req, res) => {
        try {
            const userId = req.query.id;
            const user = await userData.findOne({ _id: userId })
            console.log(userId);
            if (user) {
                return res.json({ success: true, user })
            }

            return res.json({ error: 'No user found' });
        } catch (err) {
            return res.json({ error: err })
        }
    },
    edit: async (req, res) => {
        try {
            const { email, name, id } = req.body
            console.log(email, name, id);
            await userData.findByIdAndUpdate(id, { email: email, username: name })

            return res.json({ success: true })
        } catch (err) {
            console.log(err);
        }
    },
    add: async (req, res) => {
        try {
            console.log('hello');
            const user = await userData.findOne({ email: req.body.email });

            if (user) {
                return res.json({ emailError: 'User already exists', nameError: '', passwordError: '', cpasswordError: '' });
            }
            console.log(req.body);

            const data = new userData({
                username: req.body.Name,
                email: req.body.Email,
                password: req.body.Password,
            })

            await data.save();
            return res.json({ success: true });
        }

        catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        }

    }
    ,search: async (req, res) => {
        try {
          const value = req.query.id; // Trim extra spaces
      
          const regex = new RegExp(value, 'i'); // Case-insensitive search
      
          // Perform the search query on the database
          const results = await userData.find({
            $or: [
              { username: regex },
              { email: regex }
            ]
          });
      
          res.json({success:true,results}); // Send the search results as a JSON response
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to perform search' });
        }
      }
}