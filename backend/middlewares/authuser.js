
import jwt from 'jsonwebtoken'
import User from '../model/userschema.js'

const Authuser =async (req,res,next) => {
   try{
         
      const token=req?.cookies?.token
      // console.log(token) 
      if (!token)
      {
        return res.json({error:"User token is not found"})
      }

      const checked=jwt.verify(token,process.env.JWT_SECRET)
      // console.log(checked)
      const user= await User.findById(checked.userid).select('-password')
      
      req.user=user

      next()
      
   }
   catch(err)
   {
    console.log(err)
   }
}

export default Authuser