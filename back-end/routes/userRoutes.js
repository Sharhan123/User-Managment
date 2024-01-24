const express = require('express');
const router = express.Router(); // Use express.Router() instead of express()
const adminController = require('../controllers/adminController')
const userController = require('../controllers/userController');
const auth = require('../middlewares/jwtAuthentication');

router.post('/signup', userController.register);
router.post('/signin', userController.login);
router.post('/signout',userController.logout)
router.post('/edit',userController.editProfile)
router.post('/admin',adminController.login)
router.get('/dashboard',adminController.dashboard)
router.post('/delete',adminController.delete)
router.get('/editGet',adminController.editGet)
router.post('/editAdmin',adminController.edit)
router.post('/add',adminController.add)
router.get('/search',adminController.search)
module.exports = router;
