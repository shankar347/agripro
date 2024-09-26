import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import img from '../../assets/prakash.jpg'

const Insectdetailcomp = () => {
  return (
    <Flex flexDir={'column'}>
    <Flex width={'full'}
    px={'1'} gap={'2'}>
     <Image src={img}
     width={'100px'}
     height={'auto'}
     borderRadius={'5px'}
     />
     <Text width={'100px'}
     fontWeight={'550'}>
        Plant-Bug
     </Text>
     <Flex flexDir={'column'}>
      <Text fontWeight={'550'}>
      Cons
      </Text>
      <Flex flexDir={'column'}>
       harm to plants health and check it's
      </Flex>
      <Flex flexDir={'column'}>
       harm to plants health and to danger 
      </Flex>
     </Flex>
    </Flex>
    <Flex 
   mt={'1'}
   width={'90%'}
    mx={'auto'} 
    h={'0.1px'}
    bg={'gray.400'}
    >
    
   </Flex>
    </Flex>
  )
}

export default Insectdetailcomp