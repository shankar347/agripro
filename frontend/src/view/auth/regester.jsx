import React from 'react'
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
import { useState } from 'react'
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {FaEye,FaEyeSlash} from 'react-icons/fa'
import { useSetRecoilState } from 'recoil'
import authatom from '../atoms/authatom'
import useratom from '../atoms/useratom'
import { useNavigate } from 'react-router-dom'

const Register=()=> {
  
  const [showPassword, setShowPassword] = useState(false)
 
  const [actions,setactions]=useState({
    name:'',
    phoneno:'',
    email:'',
    password:'',
    district:'',
    taluk:''
  })
  const [loading,setloading]=useState(false)
  const setatomstate=useSetRecoilState(authatom)
  const setuserstate=useSetRecoilState(useratom)
  const toast=useToast()
  const navigate=useNavigate()

  const handlesignup=async(e)=>{
   e.preventDefault();
   try
   {
   
    if(actions.name === '')
    {
      return toast({
        status:'error',
        description:'Name is required',
        duration:3000
      })
      }
    
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
    const res= await 
    fetch('/api/user/register',{
      method:'POST',
      headers:
      {
        'Content-Type':'application/json'
      },
      body:JSON.stringify(actions)
    })

    const data=await res.json()

    console.log(data)

    if(data.error)
    {
      toast({
        title:'Error',
        description:data.error,
        duration:3000
      })
     return;
    }
    else{
      localStorage.setItem('token',JSON.stringify(data))
      setuserstate(data)
      navigate('/')
      toast({description:'Registeration Completed'})
    }
  }
  catch(err)
  {
    console.log(err)
    toast({
      status:'error',
      description:err.message,
      duration:3000
    })
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
      className='greenbg1'
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
          <Heading fontSize={'4xl'} 
          color={'rgb(55, 163, 25)'} textAlign={'center'}>
            Sign up
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
          
                <FormControl  isRequired>
                  <FormLabel>District</FormLabel>
                  <Select  border={'2px solid'}
                 borderColor={'gray.400'}
                  onChange={(e)=>
                    setactions({...actions,district:e.target.value})}
                  >
                     <option value=""
                      hidden disabled selected className='disable1' >
                        Select District
                      </option>
                    <option value="Chengalpet">
                        Chengalpet
                    </option>
                    <option value="Kancheepuram">
                        Kancheepuram
                    </option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Taluk</FormLabel>
                  <Select  
                  border={'2px solid'}
                 borderColor={'gray.400'}
                     onChange={(e)=>setactions({...actions,taluk:e.target.value})}>
                      <option value=""
                      hidden disabled selected className='disable1' >
                        Select Taluk
                      </option>
                  <option value="Thriukkalukundram">
                    Thirukkalukundram
                  </option>
                  <option value="Thriuporur">
                    thiruporur
                  </option>
                  <option value="Madurantagam">
                    madurantagam
                  </option>
                  </Select>
                </FormControl>
        
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                // bg={useColorModeValue('gray.600','gray.700')}
                bg={'rgb(55,163,25)'}
                color={'white'}
                _hover={{
                  bg:'rgb(55,180,25)' ,
                }}
                onClick={handlesignup}>
                {loading ? <Spinner/> :  "Submit"}
              </Button>
            </Stack>
            <Stack pt={3}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}
                onClick={()=>setatomstate('Login')}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Register