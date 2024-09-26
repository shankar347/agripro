import { Flex } from '@chakra-ui/react'
import React from 'react'
import Insectdetailcomp from './insectdetailcomp'

const Insectdetail = () => {
  return (
<Flex flexDir={'column'}>
  <Flex fontWeight={'600'}
  ml={'2'}
  mt={'2'}>
    Insects Details
  </Flex>
 <Flex flexDir={'column'}
 mt={'4'}
 gap={'4'}
 >
 <Insectdetailcomp/>
 <Insectdetailcomp/>
 <Insectdetailcomp/>
 <Insectdetailcomp/>
 <Insectdetailcomp/>
 <Insectdetailcomp/>
 
 </Flex>
</Flex>
)
}

export default Insectdetail