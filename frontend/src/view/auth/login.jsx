import React, { useContext, useRef } from 'react'
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import { useState } from 'react'
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {FaEye,FaEyeSlash} from 'react-icons/fa'
import { useSetRecoilState } from 'recoil'
import authatom from '../atoms/authatom'
import useratom from '../atoms/useratom'
// import twilio  from 'twilio'
import Updatepassword from './updatepassword'
import { agricontext } from '../components/agricontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Login = () => {
  
    const [loading,setloading]=useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const setatomstate=useSetRecoilState(authatom)
    const setuserstate=useSetRecoilState(useratom)
    const {isOpen,onClose,onOpen}=useDisclosure()
    const {isOpen:isOpen1,onClose:onClose1,onOpen:onOpen1}=useDisclosure()
    const toast=useToast()
    const navigate=useNavigate()
    const [phoneno,setphoneno]=useState('')
    const [actions,setactions]=useState({
        email:'',
        password:''
      })
    console.log(actions.password)
    const inputref=useRef([])
    const [otp,setotp]=useState(Array(6).fill(''))
    // const [sendotp,setsendotp]=useState(Array(6).fill(''))  
    const {otpcorrect,setotpcorrect} =useContext(agricontext)
    const [sendotp,setsendotp]=useState(null)
    console.log(otp.join(''))
    console.log(sendotp)

    const generageotp=async()=>{
     try{
      if(!phoneno.length > 0){
        return toast({
          status:'error',
          description:'Enter the email',
          duration:'3000'
        })
      }
      if (!phoneno.includes('@gmail.com'))
      {
        return toast({
          status:'error',
          description:'Enter valid email address',
          duration:'3000'
        })
      }
      if(!otp.fill(''))
      {
        setotp({
          ...otp,
          fill:''
        })
      }
      const res=await fetch('/api/user/otp',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({phoneno:phoneno})
      })
      const data=await res.json()
      console.log(data)
      setsendotp(data)
      onOpen1()
      onClose()
     }
     catch(err)
     {
      console.log(err)
     }
    } 
    // console.log(otp)
    //  console.log(phoneno)

    const handlechange=(elem,index)=>{
      const value=elem.value
  
      if (/^[0-9]$/.test(value) || value === '')
      {
          const newotp=[...otp]
          newotp[index]=value
          setotp(newotp)
      }
       else{
        toast({
          status:'error',
          description:'Invalid input',
          duration:2000
        })
        return
      }
      if (value !== '' && index < otp.length -1 )
      {
          inputref.current[index+1].focus()
      }
    }

    // console.log(otpcorrect)
   
    const handlecacelotp=()=>{
      setotp(Array(6).fill(''))
       setphoneno('')
    }
    
    const otpverify=()=>{      
      
      console.log(sendotp.toString() !== otp.join('').trim())  
      if (otp.join('').trim() !== sendotp.toString())
       {
         toast({
          title: 'Error',
          description:"Enter the sended OTP",
          status:'error',
          duration:2000
         })
        setotpcorrect(false)
       }  
       else{
        // setphoneno('')
        onClose1()
        onClose()
        setotpcorrect(true)
       }
        
      
    }
    const handlelogin=async()=>{
        try{

        if(actions.email === '')
            {
                return toast({
                  status:'error',
                  description:'Email is required',
                  duration:3000
                })
                }   
        if(actions.password === '')
            {
                return toast({
                  status:'error',
                  description:'Password is required',
                  duration:3000
                })
                }          
          setloading(true)

         const res=await fetch('/api/user/login',{
            method:'POST',
            headers:
            {
              'Content-Type':'application/json'
            },
            body:JSON.stringify(actions)  
         })

         const data=await res.json()
         if (data.error)
         {
            toast({
                title:'Error',
                description:data.error,
                duration:3000
              })
             return;  
         }
         localStorage.setItem('token',JSON.stringify(data))
         setuserstate(data)
         navigate('/')
         toast({description:'Registeration Completed'})
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
    <Flex width={'full'}
    align={'center'}
    height={'100vh'}
    className={{
      md:'greenbg1',
      lg:'greenbg1',
      sm:'greenbg1',
      base:''
    }} 
    >
    <Stack spacing={8}
    mx={'auto'}
     maxW={'lg'} 
     py={4}
     pt={6} px={6}
     bg={'gray.200'}
     mt={'5px'}
     zIndex={'2'}
     rounded={'lg'}
        boxShadow={'lg'}>
      <Stack align={'center'}
      >
        <Heading fontSize={'4xl'} 
        color={'rgb(55, 163, 25)'} textAlign={'center'}>
         Login
        </Heading>
       
      </Stack>
      <Box p={5}>
        <Stack spacing={4}>
          <FormControl  isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email"
             border={'2px solid'}
             borderColor={'gray.400'} 
               onChange={(e)=>setactions({...actions,email:e.target.value})}/>
          </FormControl>
          <FormControl  isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} 
                  border={'2px solid'}
                  borderColor={'gray.400'}
                 onChange={(e)=>setactions(prevaction=>({
                  ...prevaction,
                  password:e.target.value
                 }))}/>
              <InputRightElement h={'full'}>
                <Button
                  variant={'ghost'}
                  onClick={() => setShowPassword((showPassword) => !showPassword)}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                 
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Text pl={1} mt={'-2'} fontWeight={'medium'}
          color={'blue.700'}
          _hover={{
            color:'blue.600'
          }
          }
          cursor={'pointer'}
          onClick={()=>{onOpen()
            setactions(prevaction=>(
              {
                ...prevaction,
                password:''
              }
            ))
          }}>
            Forget Password
          </Text>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              // bg={useColorModeValue('gray.600','gray.700')}
              bg={'rgb(55,163,25)'}
              color={'white'}
              _hover={{
                bg: 'rgb(55,180,25)' ,
              }}
              onClick={handlelogin}>
              {loading ? <Spinner/> :  "Login"}
            </Button>
          </Stack>
          <Stack pt={3}>
            <Text align={'center'}>
              Don't have an account? <Link color={'blue.400'}
              onClick={()=>setatomstate('Register')}>Register</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  <Modal isOpen={isOpen}  onClose={onClose}>
  <ModalOverlay/>
  <ModalContent>
   <ModalHeader fontSize={'15px'}>
    Enter your registered Email
   </ModalHeader>
  <ModalCloseButton size={'sm'}/>
  <ModalBody pb={6}>
  <FormControl>

    <Input 
     border={'2px solid'}
     borderColor={'gray.400'}
     type='email'
     placeholder='your@gmail.com' value={phoneno} 
    onChange={(e)=>setphoneno(e.target.value)} 
    />
    
  </FormControl>
  </ModalBody>  
  <ModalFooter>
    <Button colorScheme='blue'  size={'sm'} 
    onClick={generageotp}>
        Submit
    </Button>
  </ModalFooter>
  </ModalContent>
 </Modal>
 <Modal isOpen={isOpen1}  onClose={onClose1}>
  <ModalOverlay/>
  <ModalContent>
   <ModalHeader fontSize={'15px'}
   fontWeight={'600'}>
    Enter the OTP sent to {phoneno}
   </ModalHeader>
  <ModalCloseButton size={'sm'}
  onClick={handlecacelotp}/>
  <ModalBody pb={6}>
  <FormControl>
   <Flex flexDir={'row'} 
   alignItems={'center'} width={'full'}
   gap={{
    md:'8',
    lg:'8',
    sm:'8',
    base:'4'}} alignSelf={'center'}>
    {
      otp?.map((digit,index)=>(
        <Input
        color={'black'} 
        ref={el => inputref.current[index] = el}
        // size={'md'}
        height={'45px'}
        width={'45px'}
        key={index}
        value={digit}
        pl={3} 
        type='text'
        maxLength={1}
        textAlign={'center'}
        border={'2px solid'}
        borderColor={'gray.300'}
        onChange={(e) => handlechange(e.target, index)}
    /> 
    ))
    }
   </Flex>
   <Flex 
 mt={'3'}
 width={'full'}
 justifyContent={'space-between'}>
  <Flex 
  color={'red.500'}
  cursor={'pointer'}
  fontWeight={'550'}
  _hover={{
    color:'red.300'
  }}
  onClick={()=>{{handlecacelotp(),
    onClose1()
  }}}
  ml={'2'}>
    Cancel
    </Flex>
    <Flex
    color={'blue.600'}
    _hover={{
      color:'blue.300'
    }}
    fontWeight={'550'}
    fontSize={'15px'}
    cursor={'pointer'}
    mr={'2'}
    onClick={generageotp}
    >
      Resend OTP
    </Flex>
  </Flex>
  </FormControl>
  </ModalBody>  
  <ModalFooter>
    <Button colorScheme='blue'  size={'sm'} 
    onClick={otpverify}>
        Submit
    </Button>
  </ModalFooter>
  </ModalContent>
 </Modal>
   
     <Updatepassword email={phoneno}/>
  </>
  )
}

export default Login