import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import useratom from '../atoms/useratom'

const Userprofile = () => {

  const navigate=useNavigate()  
  const user=useRecoilValue(useratom)
  return (
    <>
 <Flex flexDir={'column'}
 position={'relative'}
 h={'92vh'}
// h={'auto'}
 >
  <Flex ml={'2'} mt={'4'}
  fontSize={'17px'}
  fontWeight={'600'}>
    Hi! {user?.name}
  </Flex>
  <Flex ml={'2'} mt={'2'} fontSize={'15px'} 
  fontWeight={'550'}>
    Welcome to AgriPro
  </Flex>
  <Flex flexDir={'column'} 
  gap={'4'}
  w={'full'} 
//   alignItems={'center'}
    ml={'16'}
   mt={'5'}>
     <Flex fontSize={'14px'} 
     gap={'10px'}>
        <Flex fontWeight={'650'}
        width={'70px'}
        >
            Name
        </Flex>
        <Flex fontWeight={'500'}>
            {user?.name}
        </Flex>
     </Flex>
     <Flex fontSize={'14px'} 
     gap={'10px'}>
        <Flex
        width={'70px'}
        
        fontWeight={'650'}>
            Email
        </Flex>
        <Flex fontWeight={'500'}>
            {user?.email}
        </Flex>
     </Flex>
     <Flex fontSize={'14px'} 
     gap={'10px'}>
        <Flex fontWeight={'650'}
        width={'70px'}
        >
            Phone no
        </Flex>
        <Flex fontWeight={'500'}>
             {user?.phoneno}
        </Flex>
     </Flex>
     <Flex fontSize={'14px'} 
     gap={'10px'}>
        <Flex fontWeight={'650'}
        width={'70px'}
        >
            District
        </Flex>
        <Flex fontWeight={'500'}>
            {user?.district}
        </Flex>
     </Flex>
     <Flex fontSize={'14px'} 
     gap={'10px'}>
        <Flex fontWeight={'650'}
        width={'70px'}
        >
            Taluk
        </Flex>
        <Flex fontWeight={'500'}>
            {user?.taluk}
        </Flex>
     </Flex>
  </Flex>   
  <Button
  mt={'5'}
  bg={'blue.400'}
  width={'120px'}
  mx={'auto'}
  borderRadius={'50px'}
  _hover={{
    bg:'blue.300'
  }}
  onClick={()=>navigate('/user-profile/edit')}
  >
    Update
  </Button>
  <Flex 
  alignItems={'end'}
   width={'full'}
   justify={'space-between'}
   position={'absolute'}
   bottom={'0'}
   left={'2'}
  >
  <Flex 
  fontSize={'15px'}
  fontWeight={'550'}
  color={'red.400'}
  _hover={{
    color: 'red.300'
  }}
 
  >
    Logout
  </Flex>
  <Flex flexDir={'column'}
  mr={'5'}
  gap={'2'}
  >
    <Button bg={'green.300'}
    _hover={{
      bg:'green.200'
    }}
    onClick={()=>navigate('/upload-crop')}
    cursor={'pointer'}
    >
      Upload crop
    </Button>
    <Button bg={'red.400'}
    _hover={{
      bg:'red.300'
    }}
    onClick={()=>navigate('/upload-insects')}

    >
      Upload Bugs
    </Button>
  </Flex>
  </Flex>
 </Flex>

</>
)
}

export default Userprofile