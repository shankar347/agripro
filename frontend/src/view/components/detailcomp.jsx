import React from 'react'
import img from '../../assets/prakash.jpg'
import { Flex, Image, Text } from '@chakra-ui/react'

const Detailcomp = () => {
  return (
    <Flex flexDir={'column'}>
    <Flex width={'full'}
    px={'1'} gap={'2'}>
     <Image src={img}
     width={'100px'}
     height={'100px'}
     borderRadius={'5px'}
     />
     <Text width={'100px'}
     fontWeight={'550'}>
        Babatla
     </Text>
     <Flex flexDir={'column'}>
      <Text fontWeight={'550'}>
       Features
      </Text>
        <Flex flexDir={'column'}>
       It is a high brand crop 
      </Flex> 
      <Flex flexDir={'column'}>
       The rate of this plant is high
      </Flex>
     </Flex>
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

export default Detailcomp