const express = require('express')
const path = require('path')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const PublicDirectoryPath= path.join(__dirname, '../public')
const viwesPath= path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.use(express.static(PublicDirectoryPath))
app.set('views', viwesPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        tital: 'weather ',
        name : 'vaibhav rathore'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'this is some helpful for you',
        tital: 'help',
        name: 'vaibhav rahthore'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        tital: 'about',
        name : 'vaibav rathore'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provid an address!!!!!'
        })
    }


geocode(req.query.address,(error,{longitude,latitude,location})=>{
    if(error){
        res.send({error})
    }
    forecast(latitude,longitude, (error,forecastdata)=>{
        if(error){
            res.send({error})
        }
        res.send({
            forecast: forecastdata,
            location,
            address: req.query.address
        })
    })

})




    // res.send({
    //     forecast: 'it is raining',
    //     location: 'mandasur',
    //     address: req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        tital: '404 page not exist',
        name : 'vaibhav rathore',
        errorMessage: ' Help artical not found'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        tital: '404',
        name: 'vaibhav rathore',
        errorMessage: 'page not found..'
    })
})



app.listen(port,()=>{
    console.log('serve is on port'+ port)
})