const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const DATABASE_URL = require("./connectToDB.js")
const contacts = require("./models/contacts.js");
const LoggedInUser = require("./loggedInUser.js");

const USER_CONTROLLER = contacts.USER_CONTROLLER;

const app = express()
const port = 8080

app.listen(port)

mongoose.connect(DATABASE_URL)
.then(async function() {
    let loggedIn = await LoggedInUser.find().deleteMany()
    let now = await LoggedInUser.find();
})

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

app.post("/create-account", async function(req, res) {
    let username = req.body.username;
    let pwd = req.body.password;

    let usernameUnavailable = await USER_CONTROLLER.getUserFromUsername(username)

    if (usernameUnavailable){
        res.redirect("/signup")
    }
    else{
        USER_CONTROLLER.addUser(username, pwd)
        USER_CONTROLLER.login(username)
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

app.post("/check-login", async function(req, res) {
    let username = req.body.username;
    let pwd = req.body.password;

    let userDatum = await USER_CONTROLLER.getUserFromUsername(username)
    
    if (userDatum && USER_CONTROLLER.userDataIsCorrect(userDatum, username, pwd) ){
        USER_CONTROLLER.login(username)
        res.redirect("/")
    }
    else{
       res.redirect("/login")//res.redirect("back")
    }
})

app.post('/addtocart', function(req, res){
    if(req.header('Content-type') === 'application/json'){
        let username = req.body.name
        if (username != null){
                USER_CONTROLLER.updateQuantity(username, req.body.title, req.body.cost);
                res.status(201).send();
        }
        else{
            res.status(401).send()
        }
    }
    else{
        res.status(400).send()
    }
})

app.get('/sizeOfCart', async function(req, res){
    if(req.header('Content-type') === 'application/json'){
        const username = req.header('Name');
        if (username != null){
            let cart_size = await USER_CONTROLLER.sizeOfCart(username);
            res.status(200).send(JSON.stringify(cart_size));
        }
        else{
            res.status(401).send()
        }
    }
    else{
        res.status(400).send()
    }
})

app.get('/userCart', async function(req, res){
    if(req.header('Content-type') === 'application/json'){
        const username = req.header('Name');
        if (username != null){
            // if (user.sessionId === req.body.sessionId){
            let cart = await USER_CONTROLLER.getCart(username);
            let cost = await USER_CONTROLLER.totalCostOfCart(username);

            let user_cart = {"cartItems": cart, "totalCost": cost};
            res.status(200).send(JSON.stringify(user_cart));
            // }
        }
        else{
            res.status(401).send()
        }
    }
    else{
        res.status(400).send()
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