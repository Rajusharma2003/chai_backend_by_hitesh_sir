import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'

// create app by express
const app  = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true   
}))
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended : true  , limit : '16kb'}))
app.use(cookieParser())


// import router form router.js file.
import userRouter from './routes/router.js'
app.use('/api/v1/user' , userRouter)



export {app}