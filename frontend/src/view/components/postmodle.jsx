import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import img from '../../assets/clear-sky.png'
import Useractions from './useractions'
import { useNavigate } from 'react-router-dom'
import Timecomponent from '../hooks/timecomponent'

const Postmodel = ({post}) => {
  const navigate=useNavigate()
    return (
     <Flex  flexDir={'column'} width={'full'}>
     <Flex width={'100%'} justify={'space-between'}
     flexDir={'row'}>
   <Flex 
   ml={'1'}
   >
   {post?.text}
   </Flex>
    <Flex color={'gray.500'} fontSize={'15px'} 
    mr={'2'}
    >
     <Timecomponent time={post?.createdAt} />
    </Flex>
     </Flex>
     <Flex flexDir={'column'} width={'full'}
     alignItems={'center'}
     justifyContent={'center'}>
   {
    post?.img &&   <Box 
    maxW={'99%'}
    mt={'2'} 
    minH={'200px'}
    width={'full'}
    justifySelf={'center'}
   //  alignSelf={'center'}
     maxH={'200px'} borderRadius={'5px'} 
    border={'2px solid '}
    borderColor={'gray.300'}>
       <Image src={post?.img} h={'full'} maxH={'200px'} w={'full'}
       onClick={()=>navigate(`/admin-posts/${post._id}`)}/>
    </Box>
   }
     </Flex>
   <Flex ml={'3'}
   mt={'1'}>
   <Useractions post={post}/>
   </Flex>
   <Flex 
   mt={'2'}
   width={'90%'}
    mx={'auto'} 
    h={'0.1px'}
    bg={'gray.400'}
    >

   </Flex>
     </Flex>
  )
}

export default Postmodel