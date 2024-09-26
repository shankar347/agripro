import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Stack, Toast, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { agricontext } from '../components/agricontext'
import { useRecoilValue } from 'recoil'
import useratom from '../atoms/useratom'
import { useNavigate } from 'react-router-dom'

const Updatepassword = ({email}) => {
    
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [password,setpassword]=useState('')
    const [password1,setpassword1]=useState('')
    const [loading,setloading]=useState(false)
    const {otpcorrect,setotpcorrect} =useContext(agricontext)
    const user=useRecoilValue(useratom)
    const toast=useToast()
    // console.log(email)
    // console.log(password)
    const navigate=useNavigate()
    const handleupdatepassword=async()=>{
        try{
          if (password !== password1)
          {
            toast({
              status:'error',
              description:'Password did not match',
              duration:3000
            })
            return
          }
          const res=await fetch(`/api/user/passwd`,{
            method:'PUT',
            headers:{
              'Content-Type':'application/json',
            },
            body:JSON.stringify({passwd:password,
              email:email
            })
          })
          const data=await res.json()
          if(data?.error)
          {
            toast({
              description:"Invalid error",
              status:"error",
              duration:2000
            })
            return
          }
          setotpcorrect(false)
          navigate('/auth')
        }
        catch(err)
        {

        }
    }
      
  return (
//     <Flex width={'full'}
//     align={'center'}
//     height={'100vh'}
//     justify={'center'}
//     position={'relative'}
//     className='greenbg1'
//     >
   
//   </Flex>
<>
{
     otpcorrect && 
     <Stack 
     zIndex={'10'}
     position={'absolute'}
     spacing={8}
     width={{
      md:'400px',
      lg:'400px',
      sm:'400px',
      base:'92%'}}
     maxW={'lg'} 
     height={'530px'}
     top={'55'}
     bottom={'0'}
    // transform={'translateY(-50%)'}
     left={'50%'}
     transform={'translateX(-50%)'}
    //   py={4}
    //  pt={6} px={6}
     bg={'gray.200'}
    //  mt={'50px'}
     
     rounded={'lg'}
     boxShadow={'lg'}>
      <Stack align={'center'}
      >
        <Heading fontSize={'3xl'} 
        color={'rgb(55, 163, 25)'} 
        mt={'50px'} 
        textAlign={'center'}>
          Change Password
        </Heading>
       
      </Stack>
      <Box
        p={10}>
        <Stack spacing={4}>
          <FormControl  isRequired>
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? 'text' : 'password'} 
                  border={'2px solid'}
                  borderColor={'gray.400'}
                  value={password}
                  onChange={(e)=>setpassword(e.target.value)}     
                  />
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
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input type={showPassword2 ? 'text' : 'password'} 
                  border={'2px solid'}
                  borderColor={'gray.400'}
                  value={password1}
                  onChange={(e)=>setpassword1(e.target.value)}
                 />
              <InputRightElement h={'full'}>
                <Button
                 py={'5'}
                  variant={'ghost'}
                  onClick={() => setShowPassword2((showPassword) => !showPassword)}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                 
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          
          <Stack spacing={10} pt={12}>
            <Button
              loadingText="Submitting"
              size="lg"
              py={'5'}
              // bg={useColorModeValue('gray.600','gray.700')}
              bg={'rgb(55,163,25)'}
              color={'white'}
              _hover={{
                bg: 'rgb(55,180,25)' ,
              }}
              onClick={handleupdatepassword}>
              {loading ? <Spinner/> :  "Update Password"}
            </Button>
          </Stack>
          <Stack spacing={10} pt={0}>
            <Button
            //   loadingText="Submitting"
              size="lg"
              // bg={useColorModeValue('gray.600','gray.700')}
              bg={'red.400'}
              color={'white'}
              _hover={{
                bg: 'red.300' ,
              }}
              onClick={()=>setotpcorrect(false)}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
    }
</>
  )
}

export default Updatepassword