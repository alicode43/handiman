import express from "express";

const home = express.Router();

home.get('/dashboard', (req, res) => {

    const user = req.user;

    res.send(`Welcome ${user.name}, your email is ${user.email},`);


});
home.post('/updateProfile', (req, res) => {
    
       
})



export default home;



