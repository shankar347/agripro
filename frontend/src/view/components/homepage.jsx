import { Button, CloseButton, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { FaMapMarkerAlt, FaPlus } from 'react-icons/fa'
import { useRecoilValue } from 'recoil'
import {BsImageFill} from 'react-icons/bs'
import useratom from '../atoms/useratom'
import Weatherbanner from './weatherbaner'
import Downbar from './downbar'
import Postmodel from './postmodle'
import handleimage from '../hooks/handleimage'

const Homepage = () => {
  const user=useRecoilValue(useratom)
  const fileref=useRef(null)
  const [posttext,setposttext]=useState('')
  const maxval=500
  const {onOpen,onClose,isOpen} =useDisclosure()
  const [remaingchar,setremainingchar]=useState(maxval) 
  const [loading,setloading]=useState(false)
  const [posts,setposts]=useState(null)
  
  
  const handlecomment=(e)=>{
    const inputtext=e.target.value;
    if(inputtext.length > maxval)
    {
       const truncatedtext=inputtext.slice(0,500)
       setposttext(truncatedtext)
       setremainingchar(0)
    }
    else
    {
       setposttext(inputtext)
       setremainingchar(maxval - inputtext.length)
    }
}

 useEffect(()=>{
  const getfeed=async()=>{
   try{
     const res=await fetch('/api/post/feed')
     const data=await res.json()
    //  console.log(data)
    setposts(data)
   }
   catch(err)
   {
    console.log(err)
   }
  }
  getfeed()
 },[])

  // const user=useRecoilValue(useratom)
  const toast=useToast()
  const {imgurl,setimgurl,handlechangeimage} =handleimage()
  // console.log(user)
  // console.log(imgurl)
  const handlecreate=async()=>{
    try{
      setloading(true)
     const res=await fetch('/api/post/create',{
      method:'POST',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify({
        admin:user?._id,
        text:posttext,
        img:imgurl,
        district:user?.district
      })
     })
     const data=await res.json()
     console.log(data)
     if (data?.error) 
     {
      toast({
        status:"error",
        description:data?.error,
        duration:2000
      })
      return
     }
     setimgurl('')
     setposttext('')
     onClose()
     setremainingchar(500)
     toast({
      status:'success',
      description:'Post uploaded',
      duration:2000
     })
    }
    catch(err)
    {
      console.log(err)
    }
    finally{
      setloading(false)
    }
  }
  return (
    <>
    <Flex 
    // position={'relative'} 
    // overflowY={'scroll'} 
     flexDir={'column'}
     gap={''}
    >
      <Flex 
      flexDir={'column'}
      >
      <Weatherbanner/>
      <Flex flexDir={'column'}
      position={'relative'}
      height={'full'}
      mb={'10'}
      gap={'5'}
      >
        {
          posts?.map((post)=>(
            <Postmodel key={post?._id}
            post={post}
            />
          ))
        }
         <Button 
      position={'fixed'}
      // top={'10'}
      bottom={'12'}
      right={'2'}
      bg={'green.200'}
      _hover={{
        bg: 'green.1  00',
      }}
      width={'45px'}
      onClick={onOpen}
      height={'45px'}>
        <FaPlus size={'22px'}/>
      </Button> 
      </Flex> 
      </Flex>
     
       <Downbar/>
    </Flex>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
        <ModalContent>
        <ModalHeader>
            Create Post
        </ModalHeader>
        <ModalCloseButton onClick={onClose}/>
        <ModalBody pb={'3'}>
            <FormControl>
                <Textarea
                value={posttext}
                onChange={handlecomment} 
                placeholder='Write about your post'/>
                <Text fontSize={'xs'}
                fontWeight={'bold'}
                textAlign={'right'}
                m={'1'}
                color={'gray.800'}>
                    {remaingchar}/{maxval}
                </Text>
              <Input type='file' ref={fileref} hidden
              onChange={handlechangeimage} />
              <BsImageFill
               cursor={'pointer'}
               size={16} 
               style={{marginLeft:'5px'}}
               onClick={()=>fileref.current.click()}/>  
              
            </FormControl>
            <Flex my={'10px'} position={'relative'}>
            {
                imgurl && (
                    <Image border={'1px'}
                     src={imgurl} 
                    />
                )
               }
               {
                imgurl && (
                   <CloseButton 
                   position={'absolute'}
                   top={'2'}
                   bg={'gray.600'}
                   right={'2'}
                   fontSize={'10px'}
                   fontWeight={'29px'}
                   onClick={()=>
                setimgurl('')}/>
                )
               }
            </Flex>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue' mr={'3'}
           onClick={handlecreate} 
           isLoading={loading}>
                Create
            </Button>
        </ModalFooter>
        </ModalContent>  
     </Modal>
    </>
  )
}

export default Homepage