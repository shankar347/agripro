import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { FaHome, FaIcons, FaUser } from 'react-icons/fa'

import navbar from '../../assets/navbar.png'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate=useNavigate()
  return (
    <Flex className='greenbg2'
    height={10}
    color={'gray.800'}
    align={'center'}
    justify={'space-between'}
    boxShadow={'0px 0px 3px 0px'}>
      <Flex gap={'2'}
      ml={'2'} align={'center'}>
        <Image src={navbar} width={'20px'}
        height={'20px'}/>
        <Text fontWeight={700}>
          AgriPro
        </Text>
       </Flex>  
       <Flex mr={'3'}
       gap={'3'} align={'center'}>
        <FaUser
        onClick={()=>navigate('/user-profile')}
        cursor={'pointer'}
                size={'19px'}/>
        <FaHome 
        onClick={()=>navigate('/')}
        cursor={'pointer'}
        size={'22px'}/>
       </Flex>
    </Flex>
  )
}

export default Navbar