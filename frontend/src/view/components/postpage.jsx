import { Avatar, Box, Button, Divider, Flex, Image, Input, Spinner, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {CgMore} from 'react-icons/cg'
// import myimage from '../assets/my image.jpg'
// import bluetick from '../assets/correct.png'
// import post from '../assets/avengers.jpg'
// import Useractions from '../user/useractions'
import Usercomments from './usercomments'
// import getUserInfo from '../hooks/handleuser'
// import { formatDistanceToNow } from 'date-fns'
import { useNavigate, useParams } from 'react-router-dom'
import Postcomment from './postcomment'
import { AiFillDelete, AiOutlineDelete, AiOutlineDeleteRow } from 'react-icons/ai'
import { useRecoilState, useRecoilValue } from 'recoil'
import useratom from '../atoms/useratom'
import Timecomponent from '../hooks/timecomponent'
// import { searchcontext } from './searchcontext'
const Postpage = () => {

  const [like,setlike]=useState(false)
//   const {user,loading}=getUserInfo() 
  const currentuser=useRecoilValue(useratom)
  const [post,setpost]=useState(null)
  const {id:postid}=useParams()
  const [likecount,setlikecount]=useState(0)
  const [reviewcount,setreviewcount]=useState(0)
  const [replies,setreplies]=useState([])
  const [updatecomment,setupdatecomment]=useState('')
  const [edit,setedit]=useState(false)
//   const { profileloading,setprofileloading}=useContext(searchcontext)
  const [loading1,setloading1]=useState(false)
  const navigate=useNavigate()
  console.log(replies)
  
  

  useEffect(()=>{
   const getpost=async()=>{
     try
     {
     setloading1(true)
      const res= await fetch(`/api/post/${postid}`)
      const data= await res.json()
      setpost(data)
     }
    catch(e)
    {
      console.log(e)
    }
    finally{
      setloading1(false)
    }
   }

  const getreplies=async()=>{
    try
    {
     const res=await fetch(`/api/post/reply/${postid}`)
     const data= await res.json()
     setreplies(data)
    }
    catch(e)
    {
      console.log(e)
    }
  } 


   getpost();
   getreplies();

  },[postid])
 
  useEffect(()=>{
    if(post)
      {
        setlikecount(post?.likes?.length)
        setreviewcount(post?.replies?.length)
      } 
  },[post])


  const handledeletereply=async(e)=>{
    e.preventDefault()
    try
    {
    const res=await fetch(`/api/post/reply/${post._id}`,
      {
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({reviewid:currentuser._id})
      }
    )
    if(res.ok)
      {
        const res2=await fetch(`/api/post/reply/${post._id}`)
        const data=await res2.json()
        setreplies(data)
        console.log(data)
        setreviewcount((prev)=>prev - 1)
      }
    }
    catch(e)
    {
      console.log(e)
    }
  }

  const handleditreply=async()=>{
    try
    {
     const res= await fetch(`/api/post/reply/${post._id}`,
      {
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          userid:currentuser._id,
          comment:updatecomment})
      }
     )

     if(res.ok)
      {
        const res2=await fetch(`/api/post/reply/${post._id}`)
        const data2= await res2.json()
        setreplies(data2)
        setedit(false)
        setupdatecomment('')   
      } 
    }
    catch(e)
    {
    console.log(e)
    }
  }
  
  if(loading1 && !post)
    {
        return (
     <Flex w={'full'} justifyContent={'center'}>
     <Spinner size={'xl'}/>
     </Flex>
        )
    }    

    // if(profileloading)
    //   {
    //       return (
    //    <Flex w={'full'} justifyContent={'center'}>
    //    <Spinner size={'xl'}/>
    //    </Flex>
    //       )
    //   }    
  return (
    <>
  
    <Flex fontFamily='sans-serif' 
    px={'0'} mt={'6'}
    width={'100%'}
    ml={'2'} 
    alignItems={'center'}>
      <Flex w={'full'}  gap={'3'} alignItems={'center'}>
     <Flex gap={'1'}>
    {/* <Image src={bluetick} mt={'5px'} w={'15px'} h={'15px'} 
    borderRadius={'50%'}/> */}
     <Text 
    //  mt={'8px'}
     fontSize={'md'} 
    fontFamily={'sans-serif'}>{post?.text}</Text>
     </Flex>
      </Flex>
      <Flex alignItems={'center'} width={'60px'} gap={'5px'}>
        <Timecomponent time={post?.createdAt}/>
      </Flex>
    </Flex>
   
     { post?.img &&
    <Box  
    width={'95%'} 
   mx={'auto'}
    mt={'10px'}
    // minH={'300px'}
    h={'auto'}
    overflow={'hidden'}
     border={"2px solid "}
     borderColor={'gray.300 '} 
     borderRadius={'5px'} >
      <Image src={post?.img}
      h={'full'}
      />
     </Box>
    }<Flex my={'10px'}
    width={'95%'} 
    ml={'5'}
    >
   <Postcomment post={post} 
    replies={replies}
    setreplies={setreplies}
    likecount={likecount} 
   reviewcount={reviewcount}
   setlikecount={setlikecount}
   setreviewcount={setreviewcount} />
    </Flex>
   
    <Divider my={'4'} w={'full'} h={'0.3px'} bg={'gray.light'}/>
    <Flex justifyContent={'space-between'} 
    alignItems={'center'}
    width={'95%'}
    mx={'auto'}
    >
     <Flex gap={'10px'}>
     <Text fontFamily={'sans-serif'} fontSize={'sm'}>
      Get the app to like,reply and post
     </Text>
     </Flex>
     <Button>
      Get
     </Button>
    </Flex>
    <Divider my={'4'} w={'full'} h={'0.3px'} bg={'gray.light'}/>
    <Flex flexDir={'column'}
    width={'95%'}
    mx={'auto'}
    >

    {
      
      replies?.map((reply)=>( 
        <Usercomments 
        key={reply._id}
        updatecomment={updatecomment}
        setupdatecomment={setupdatecomment}
        edit={edit}
        setedit={setedit}
        handledeletereply={handledeletereply}
        handleditreply={handleditreply}
     replyid={reply.user}
    usercomment={reply.comment}
    username={reply.name} 
    agaodate={reply.createdAt}/>
      ))
    }
    </Flex>

    </>
  )
}

export default Postpage