import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import postrouter from './controller/postrouter.js'
import userouter from './controller/userrouter.js'
import {v2 as cloudinary} from 'cloudinary'
import mongoose from 'mongoose'

const app=express()

dotenv.config()

const mongoport=process.env.MONGO_URI
console.log(mongoport)
mongoose.connect(mongoport)

// console.log(process.env.MONGO_URI)


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_APIKEYSECRET  
})


app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/api/user',userouter)
app.use('/api/post',postrouter)

const port=process.env.PORT 
app.listen(port,()=>{
    console.log('Server is running on',port)
})