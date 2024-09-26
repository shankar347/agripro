import { useToast } from "@chakra-ui/react"
import { useState } from "react"

const handleimage=()=>{
   const [imgurl,setimgurl]=useState()
   const toast=useToast()

   const handlechangeimage=(e)=>{
    const file=e.target.files[0]

    if (file && file.type.startsWith('image/'))
    {
        const reader=new FileReader()

        reader.onloadend=(e)=>{
            setimgurl(reader.result)
        }
        reader.readAsDataURL(file)
    }
    else
    {
        toast({
            status:"error",
            description:"Invalid file type",
            duration:2000
        })
        setimgurl(null)
    }
   }

    return {imgurl,setimgurl,handlechangeimage}
}

export default handleimage