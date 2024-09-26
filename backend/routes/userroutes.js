import User from "../model/userschema.js"
import bcrypt from 'bcryptjs'
import Gemeragejwt from "../middlewares/generagejwt.js"
import nodemailer from 'nodemailer'



const registeruser=async(req,res)=>{

    try{
      const {name,email,phoneno,password,district,taluk} =req.body
     
    //   const user =await User.findOne({$or:[email,phoneno]})
    const user=await User.findOne({email:email})
      if (user)
      {
        return res.status(400).json({error:"User already exists"})
      }
      const hashsalt=bcrypt.genSaltSync(10)
      const hashedpassword=bcrypt.hashSync(password,hashsalt)
      const newuser=new User({
       name,
       email,
       phoneno,
       password:hashedpassword,
       district,
       taluk
       })

       Gemeragejwt(res,newuser._id)
      await newuser.save()
    res.json(newuser)

    }
    catch(err)
    {
        console.log(err)
    }
}


const loginuser=async(req,res)=>{
    try{
       const {email,password} = req.body
       console.log(email)
       const user=await User.findOne({email:email})
       
       if (!user)
       {
        return res.json({error:"User is not found"})
       }

       const checkeduser=bcrypt.compareSync(password,user.password)

       if (!checkeduser)
        {
            return res.json({error:'Password is not correct'})
        }  
       Gemeragejwt(res,user._id)
       
       res.json(user)
    }
    catch(err)
    {
        console.log(err)
    }
}

const logoutuser=async(req,res)=>{
  try{
    res.clearCookie('token')
    return res.json('User loggedout successfully')
  }
  catch(err)
  {
    console.log(err)
  }
}


const updateuser=async(req,res)=>{
    try{
      const {email,password,phoneno,name} =req.body

      const userid=req.user._id
      const user = await User.findById(userid)

      if (!user)
      {
        return res.json({error:"User is not found"})
      }
      
      if (email) user.email = email
      if (phoneno) user.phoneno =phoneno
      if (name) user.name = name
      if (password)
      {
        let hashsalt=bcrypt.genSaltSync(10)
        let hashedpassword=bcrypt.hashSync(password,hashsalt)
        user.password = hashedpassword
      }

      await user.save()
      res.json(user)
    }
    catch(err)
    {
        console.log(err)
    }
}

const updatepassword=async(req,res)=>{
    try{
      let {email,passwd} = req.body

      const user=await User.findOne({email:email})

      if (!user)
      {
        return res.json({error:'User is not found'})
      }
      
      if (passwd)
      {
      let hassalt=bcrypt.genSaltSync(10)
      let hashedpassword=bcrypt.hashSync(passwd,hassalt)
      user.password = hashedpassword
      }
      
      await user.save()
       res.json(user)
    }
    catch(err)
    {
        console.log(err)
    }
}



const generateotp=async(req,res)=>{
  let {phoneno} =req.body
  try{
 
  
  
  let otp= Math.floor(10000+ Math.random() * 900000).toString()
  
  const transporter=  nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:'sivaaadi96@gmail.com',
      pass:'xxmm tuxw jzml hlgs'
    }
  })
  
  const mailoptions={
    from:'sivaaadi96@gmail.com',
    to:phoneno,
    subject:'Your OTP code ',
    text:`Your OTP code for reset your password in Agrpro  is 
    ${otp}`
  }
  // await  client.messages.create({
  //  body:`Your OTP is ${otp}`,
  //  from:'9363360016',
  //  to:`+91${phoneno}`
  // })

     transporter.sendMail(mailoptions,(error,info)=>{
      if (error) {
        console.log('Error: ', error);
      } else {
        console.log('Email sent: ', info.response);
      }
    })

  res.json(otp)

}
  catch(err)
  {
    console.log(err)
  }
}

export{
    registeruser,
    loginuser,
    logoutuser,
    updateuser,
    updatepassword,
    generateotp
}
