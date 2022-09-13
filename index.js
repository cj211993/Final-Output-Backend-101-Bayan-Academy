const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const mongoose = require('mongoose');
const Place = require('./model/place');

const expressLayouts = require('express-ejs-layouts')
const bcrypt = require('bcrypt');
const users = []



app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());



mongoose.connect('mongodb://localhost:27017/airbnb')
.then(()=>{
    console.log("Connection open");
})
.catch(err=>{
    console.log("Connection error");
    console.log(err);
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}))


app.post('/login', (req, res, next)=>{
    res.send('success!');
    next();
})



app.get('/login', (req, res)=>{
    res.render('login.ejs')
})
app.get('/home', (req, res)=>{
    res.render('home.ejs')
})
app.get('/map', (req, res)=>{
    res.render('map.ejs')
})


app.get('/register', (req, res)=>{
    res.render('register.ejs')
})

app.post('/register', async (req, res)=>{
try { 
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    res.redirect('/login')
} catch {
    res.redirect('/register')
   
}
console.log(users)
})

// app.get('/place', async (req, res)=>{
//     const place = await Place.find({});
//     console.log(place);
//     res.send("Place")
// })

app.listen(port,()=>{
    console.log('Listen to port', port)
})