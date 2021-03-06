const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use( (req, res, next) => {
    var now = new Date().toString()
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) 
        console.log('Unable to append to server.log')
    })
    next()
})

// app.use( (req, res, next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear() + 1
});

hbs.registerHelper('screamIt', (s) => {
    return s.toUpperCase()
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Something bad'
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))