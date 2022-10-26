const express = require('express');
const passport = require('passport');
const router = express.Router()

//@route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

//@route GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    })

//Logout 
// @route /auth/logout
router.get('/logout',(req, res) => {
    req.logout((err) => {
            if (err) { 
                console.log(err) 
            }else{
                res.redirect('/');
            }
        });
})



module.exports = router