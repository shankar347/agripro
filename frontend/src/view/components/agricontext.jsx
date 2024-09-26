import { createContext, useState } from "react"


export const agricontext=createContext()




const Agricontext=({children})=>{
    const [otpcorrect,setotpcorrect]=useState(false) 

   return <agricontext.Provider value={{otpcorrect,setotpcorrect}}>
       {children}
   </agricontext.Provider>
}

export default Agricontext