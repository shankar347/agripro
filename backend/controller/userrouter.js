import express from 'express'
import { generateotp, loginuser, logoutuser, registeruser, updatepassword, updateuser } from '../routes/userroutes.js'
import Authuser from '../middlewares/authuser.js'

const router=express.Router()


router.post('/register',registeruser)
router.post('/login',loginuser)
router.get('/',logoutuser)
router.post('/otp',generateotp)
router.put('/',Authuser, updateuser)
router.put('/passwd',updatepassword)
export default router