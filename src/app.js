const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')  

//setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'weather app',
        name: 'Akshay Kumar'
    })
})



app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Akshay Kumar'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help',
        name: 'Akshay Kumar',
        
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        error_message: 'Help article does not exist'
        
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'please provide address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecast_data) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location: place,
                forecast: forecast_data,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(res, req) =>{
    if (!req.query.search) {
        return res.send({
            error: ''
        })
    }
    console.log(req.query)
    res.send({
        product: {}
    })
})
app.get('*',(req, res) =>{
    res.render('404',{
        error_message: 'Page not found'
    })
})


app.listen(port, () =>{
    console.log('server is up on port ' + port)
})