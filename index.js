const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
const contacts = require("./models/contacts.js");
const USER_CONTROLLER = contacts.USER_CONTROLLER;

const app = express()
const port = 8080

app.listen(port)

/* 
    Serve static content from directory "public",
    it will be accessible under path /, 
    e.g. http://localhost:8080/index.html
*/
app.use(express.static('public'))

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public', 'templates')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

app.get('/categories', function(req, res){

    var options = {
        root: path.join(__dirname, 'public', 'templates')
    }

    res.sendFile('categories.html', options, function(err){
        
        console.log(err)
    })
})


app.get('/cart', function(req, res){

    var options = {
        root: path.join(__dirname, 'public', 'templates')
    }

    res.sendFile('cart.html', options, function(err){
        console.log(err)
    })
})

app.get("/signup" ,function(req,res){
    var options = {
        root: path.join(__dirname, 'public', 'templates')
    }

    res.sendFile('signup.html', options, function(err){
        console.log(err);
    })
})

app.post("/create-account", function(req, res) {
    let username = req.body.username;
    let pwd = req.body.password;

    if (USER_CONTROLLER.getUserFromUsername(username)){
        res.redirect("/signup")
    }
    else{
       USER_CONTROLLER.addUser(username, pwd)
       res.redirect("/") //res.redirect("back")
    }
})

app.get("/login" ,function(req,res){
    var options = {
        root: path.join(__dirname, 'public', 'templates')
    }

    res.sendFile('login.html', options, function(err){
        console.log(err);
    })
})

app.post("/check-login", function(req, res) {
    let username = req.body.username;
    let pwd = req.body.password;

    let userDatum = USER_CONTROLLER.getUserFromUsername(username)

    if (userDatum && USER_CONTROLLER.userDataIsCorrect(userDatum, username, pwd) ){
        res.redirect("/")
    }
    else{
       res.redirect("/login")//res.redirect("back")
    }
})


//FOR AJAX
app.get('/site/header', function(req, res){

    var options = {
        root: path.join(__dirname, 'public', 'templates', 'partials')
    }

    res.sendFile('header.html', options, function(err){
        console.log(err)
    })
})

app.get('/site/sidebar', function(req, res){

    var options = {
        root: path.join(__dirname, 'public', 'templates', 'partials')
    }

    res.sendFile('sidebar.html', options, function(err){
        console.log(err)
    })
})

app.get('/site/footer', function(req, res){

    var options = {
        root: path.join(__dirname, 'public', 'templates', 'partials')
    }

    res.sendFile('footer.html', options, function(err){
        console.log(err);
    })
})