// import { useToast } from '@chakra-ui/react'
// import React from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Spinner,
  Select,
} from '@chakra-ui/react'
import React, { act, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useratom from '../atoms/useratom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import authatom from '../atoms/authatom'
import {FaEye,FaEyeSlash} from 'react-icons/fa'

const Updateprofile = () => {
  
    const [showPassword, setShowPassword] = useState(false)
 
  const [actions,setactions]=useState({
    name:'',
    phoneno:'',
    email:'',
    password:'',
  })
  const [loading,setloading]=useState(false)
  const setatomstate=useSetRecoilState(authatom)
  const [user,setuserstate]=useRecoilState(useratom)
  const toast=useToast()
  const navigate=useNavigate()


  const handleupdate=async()=>{
    try{
       if(!actions.name && !actions.password && !actions.email 
        && !actions.phoneno
       )
       {
        toast({
            status:'error',
            description:'Enter any field to update',
            duration:2000
        })
        return
       }
        setloading(true)
       const res=await fetch('/api/user',{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(actions)
       })
       const data=await res.json()
       console.log(data)
       if(data?.error)
       {
        toast({
            status:'error',
            description:data?.error,
            duration:2000
        })
        return
       }
        setuserstate(data)
        localStorage.setItem('token',JSON.stringify(data))
        toast({
         status: 'success',
         duration:2000,
         description:"Profile updated successfully"
        })
        navigate('/user-profile')
    }
    catch(err){
        console.log(err)
    }
    finally{
        setloading(false)
    }
  }

  return (
    <Flex width={'full'}
    align={'center'}
    height={'full'}
    justify={'center'}
    // className='greenbg1'
    >
    <Stack spacing={8} 
    mx={'1'}
     maxW={{md:'380px',
      lg:'380px',
      sm:'380px',
      base:'full'
     }} py={3}
     pt={6} px={8}
     bg={'gray.200'}
     mt={'50px'}
     rounded={'lg'}
        boxShadow={'lg'}>
      <Stack align={'center'}
      >
        <Heading fontSize={'2xl'} 
        color={'rgb(55, 163, 25)'} textAlign={'center'}>
         Update profile
        </Heading>
       
      </Stack>
      <Box
        p={{
          md:'4',
          lg:'4',
          sm:'4',
          base:'1'
        }}
        >
        <Stack spacing={4}>
        <FormControl  isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" 
               border={'2px solid'}
               borderColor={'gray.400'}
               onChange={(e)=>setactions({...actions,name:e.target.value})}/>
          </FormControl>  
          <FormControl  isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email"
             border={'2px solid'}
             borderColor={'gray.400'} 
               onChange={(e)=>setactions({...actions,email:e.target.value})}/>
          </FormControl>
          <FormControl isRequired>
          <FormLabel>Phoneno</FormLabel>
            <Input type="text" 
             border={'2px solid'}
             borderColor={'gray.400'}
               onChange={(e)=>setactions({...actions,phoneno:e.target.value})}/>
          </FormControl>  
          <FormControl  isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} 
                  border={'2px solid'}
                  borderColor={'gray.400'}
                 onChange={(e)=>setactions({...actions,password:e.target.value})}/>
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                 
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        
           
          <Stack spacing={2} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              // bg={useColorModeValue('gray.600','gray.700')}
              bg={'rgb(55,193,85)'}
              color={'white'}
              _hover={{
                bg:'rgb(55,180,25)' ,
              }}
              onClick={handleupdate}>
              {loading ? <Spinner/> :  "Update"}
            </Button>
            <Button 
            size={'lg'}
            color={'white'}
            _hover={{
                bg:'red.300'
            }}  
            onClick={()=>navigate('/user-profile')}
            bg={'red.400'}>
                Cancel
            </Button>
          </Stack>
          <Stack pt={3}>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  )
}

export default Updateprofile