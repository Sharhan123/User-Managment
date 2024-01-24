const express = require('express');
const router = express.Router();
const userData = require('../models/userSchema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateToken = (user) => {
  return jwt.sign(user, 'rapid-secret-key');
};
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer with custom storage to control file names
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Use the original name of the file
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });


module.exports = {
  register: async (req, res) => {
    try {
      const user = await userData.findOne({ email: req.body.email });

      if (user) {
        return res.json({ emailError: 'User already exists', nameError: '', passwordError: '', cpasswordError: '' });
      }

      if (req.body.password === req.body.cpassword) {
        const data = new userData({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });

        await data.save();
        const udata = await userData.findOne({email:req.body.email})
        const user = { id: udata._id, name: req.body.username, email: req.body.email }
        const token = jwt.sign(user, 'rapid-secret-key')
        return res.json({ success: true, token });
      }

      return res.json({ emailError: '', nameError: '', passwordError: '', cpasswordError: 'Confirm password and password do not match' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const data = await userData.findOne({ email: req.body.email });

      console.log(req.body.password);
      if (data) {
        const image = data.image?data.image:''
        if (data.password === req.body.password) {
          const user = { id: data._id, name: data.username, email: data.email,img:image};
          const token = jwt.sign(user, 'rapid-secret-key');
          return res.json({ success: true, token, name: data.username });
        } else {
          console.log(data.password);
          return res.json({ error: '', perror: 'Invalid password' });
        }
      } else {
        return res.json({ error: 'Invalid user email address', perror: '' });
      }
    } catch (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  logout: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      addToBlacklist(token);
      return res.json({ success: true })
    } catch (err) {
      res.status(500).json({ error: 'Logout failed' });

    }
  },
  editProfile: [
    upload.single('image'), // Handle the uploaded image
    async (req, res) => {
      try {
        const { id, name, email, password, npassword } = req.body;
        const file = req.file;
        console.log(file);
  
        // Fetch the user's existing data from the database
        const user = await userData.findById(id);
  
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        // Check if the provided password matches the stored password
        if (password && password !== user.password) {
          return res.status(400).json({ error: 'Password mismatch' });
        }
  
        // Update the password only if npassword is provided and not null
        if (npassword) {
          user.password = npassword;
        }
  
        user.username = name;
        user.email = email;
  
        // Process the image as needed (e.g., save it to a storage service)
        if (file) {
          console.log('File uploaded:', file);

        // Use the original name of the file when saving
        // const uploadPath = path.join(__dirname, 'uploads', file.originalname);
        // fs.writeFileSync(uploadPath, file.filename);
        user.image = `/uploads/${file.originalname}`;
        }
        const img = user.image || ''
  
        await user.save();
  
        const updatedUser = { id: user.id, name: user.username, email: user.email ,img:img};
        const newToken = generateToken(updatedUser);
  
        return res.json({
          success: true,
          message: 'Profile updated successfully',
          token: newToken,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  ],
  
  



}