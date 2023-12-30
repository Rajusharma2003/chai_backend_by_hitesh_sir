import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'

// create app by express
const app  = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true   
}))
app.use(express.json( {limit : '16k'}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended : true  , limit : '16kb'}))
app.use(cookieParser())


export {app}