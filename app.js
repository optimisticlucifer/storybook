const path= require('path')
const express =require('express')
const mongoose = require('mongoose')
const dotenv =require('dotenv')
const morgan=require('morgan')
const exphbs= require('express-handlebars')
const passport=require('passport')
const session=require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')



//Load config
dotenv.config({path: './config/config.env'})

//Passport config
require('./config/passport')(passport)

connectDB()

const app =express()

//Body Parser
app.use(express.urlencoded({extended : false}))
app.use(express.json())

//Logging
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

//handlebars Helpers
const { formatDate, stripTags, truncate, editIcon} = require('./helpers/hbs')

//Handlerbars
app.engine('.hbs', exphbs.engine({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
    },
    defaultLayout:'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Sessions middleware above passport
app.use(session({
    secret: 'rohan bharti',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true },
    //session in mongodb
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
}))

//PassPort middleware
app.use(passport.initialize())
app.use(passport.session())

//Set global var
app.use(function (req,res,next){
    res.locals.user = req.user || null
    next()
})


//Static folder
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))


const PORT =process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})