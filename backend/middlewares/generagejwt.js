// import React from 'react'
import jwt from 'jsonwebtoken'

const Gemeragejwt = (res,userid) => {
   
  try{
    const token=jwt.sign({userid},process.env.JWT_SECRET,
     {expiresIn:'12 days'}
    )   
    
    res.cookie('token',token,{
     maxAge:12*24*60*60*1000,
     httpOnly:true,
     sameSite:'strict'
    })
    return token
  }
  catch(err)
  {
    console.log(err)
    res.json(err)
  }
   
}

export default Gemeragejwt