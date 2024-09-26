import { Flex } from '@chakra-ui/react'
import React from 'react'
import { FaBug, FaCrop, FaCropAlt, FaUserAstronaut, FaUserTie } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Downbar = () => {

  const navigate=useNavigate()
  return (
    <Flex 
    position={'fixed'}
    // maxW={'400px'}
    maxW={'400px'}
    mx={'auto'}
    className='greenbg2' width={'full'}
    height={10} 
    color={'gray.800'}
    borderTopLeftRadius={'2px'}
    borderTopRightRadius={'2px'}
    bottom={0}
    left={'50%'}
    transform={'translateX(-50%)'}
    align={'center'}
    boxShadow={'0px 0px 3px 0px'}
    >
      <Flex 
      width={'100%'}
      // gap={'30'} ml={'4'}
      // justifyItems={}
      ml={'4'}
      mr={'4'}
      justify={'space-between'}
      >
    <FaUserAstronaut size={'18px'} 
    onClick={()=>navigate('/user-help-contact')}
    />
    <FaCropAlt  size={'18px'}
    onClick={()=>navigate('/crop-details')}
    />
    <FaBug  size={'18px'}
    onClick={()=>navigate('/insects-details')}
    />
    </Flex> 
    </Flex>
  )
}

export default Downbar