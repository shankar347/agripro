import React from 'react'
import { useRecoilValue } from 'recoil'
import authatom from '../atoms/authatom'
import Login from './login'
import Register from './regester'

const Auth = () => {
  const auth=useRecoilValue(authatom)

  return (
    <div>{
        auth === "Login" ? <Login/>:
        <Register/>}
        </div>
  )
}

export default Auth