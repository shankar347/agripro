import { Flex } from '@chakra-ui/react'
import React from 'react'
import Detailcomp from './detailcomp'

const Detailpage = () => {
  return (
  <Flex flexDir={'column'}>
   <Flex fontWeight={'600'}
  ml={'2'}
  mt={'2'}>
    Crops Details
  </Flex>
  <Flex flexDir={'column'}
 mt={'4'}
 gap={'4'}
 >
  <Detailcomp/>
  <Detailcomp/>
  <Detailcomp/>
  <Detailcomp/>
  <Detailcomp/>
  <Detailcomp/>
  <Detailcomp/>
  <Detailcomp/>
  <Detailcomp/>
  </Flex>
  </Flex>
  )
}

export default Detailpage