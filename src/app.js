const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //to change the name of the views folder to "templates"
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs') //the only line we need to set up the handlebars
app.set('views', viewsPath) // to point express to our costume directory "templates"
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title:'weather',
        name: 'Parniyan & Audrina'
    })
})

app.get ('/about', (req, res)=> {
    res.render ('about', {
        title: 'about me',
        name: 'Parniyan Roosta'
    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'if you need help',
        menu: 'click on the menu provided!',
        name:'Parniyan'
    })
})



app.get ('/weather', (req, res)=> {
     if( ! req.query.address) {
         return res.send({    // by adding a return term, we are stopping the function execution if the condition is met, we can use else instead of this return
             error: ' You must provide an address!'
            })    
     }

        geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if ( error ) {
            return res.send( {error})
        } 
        forecast(latitude, longitude, (error, forecastData)=> {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
})
})


app.get('/products', (req, res) => {
    if ( !req.query.search ) {
       return res.send({       
           error:'you must provide a search term.'
       })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})









app.get('/help/*', (req, res)=> {
    res.render('404', {
        title:'404 help',
        name: 'Parniyan',
        errorMessage: 'Help article not found.'
    })
})


//404 handler:
// shoul be at the end of all the app.get, so that the engine will render all other commands before reaching to the wild card character * command match
app.get('*', (req, res)=> { //* means match anything
    res.render('404', {
        title: '404',
        name: 'Parniyan',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, ()=> {
    console.log( 'Server is listening on port 3000')
})

