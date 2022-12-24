const express = require('express')
const path = require('path')
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
    console.log(__dirname);

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