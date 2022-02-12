const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const public = path.resolve(__dirname, '../public')

//Routers
const mainRoute = require('./routes/main');
const characterRoute = require('./routes/characterRoute');
const movieRoute = require('./routes/moviesRoute')
const movieSerieRoute = require('./routes/movieSerieRoute')
const serieRoute = require('./routes/seriesRoute')
const userRoute = require('./routes/userRoute')

//Static Files

app.use(express.static(public))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(session({ secret : 'bloodstream'}))
app.use(cookieParser())


//Set Views
app.engine('.html', require('ejs').__express);
app.set('views', './src/views')
app.set('css', '/css')
app.set('view engine', 'ejs')

//Port
app.listen(process.env.PORT||4000, ()=>{
    console.log('Esto anda http://localhost:4000')
})

//Routes
app.use('/', mainRoute)
app.use('/characters', characterRoute);
app.use('/movieSerie', movieSerieRoute);
app.use('/movies', movieRoute);
app.use('/series', serieRoute);
app.use('/user',userRoute)