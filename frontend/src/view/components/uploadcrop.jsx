import { Button, CloseButton, Flex, Image, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import handleimage from '../hooks/handleimage'

const Uploadcrop = () => {
   
    const maxval=80
    const [remaingchar,setremainingchar]=useState(80)
    const [remaingchar2,setremainingchar2]=useState(80)
    const [name,setname]=useState('')
    const [feature1,setfeature1]=useState('')
    const [feature2,setfeature2]=useState('')
    const {imgurl,setimgurl,handlechangeimage} =handleimage()
    const toast=useToast()
    const fileref=useRef(null)
    
    const handleupload=()=>{

    }
    
    const handlefeature=(e)=>{
        const inputvalue=e.target.value

        if (inputvalue.length > 80)
        {
            let truncatedtext=inputvalue.slice(0,80)
            setfeature1(truncatedtext)
            setremainingchar(0)
        }
        else
        {
            setfeature1(inputvalue)
            setremainingchar(maxval - inputvalue.length)
        }

    }

    const handlefeature2=(e)=>{
        const inputvalue=e.target.value

        if (inputvalue.length > 80)
        {
            let truncatedtext=inputvalue.slice(0,80)
            setfeature2(truncatedtext)
            setremainingchar2(0)
        }
        else
        {
            setfeature2(inputvalue)
            setremainingchar2(maxval - inputvalue.length)
        }

    }
    return (
    <Flex flexDir={'column'}>
     <Text fontWeight={'600'}
     fontSize={'17px'}
     color={'red.500'}
     width={'100%'}
     mx={'auto'}
     mt={'5'}
     textAlign={'center'}
     >
     Upload crop
     </Text>
 
    <Flex flexDir={'column'} mx={'10'}
    mt={'4'} gap={'3'}>
      <Flex flexDir={'column'} 
      gap={'2'}>
        <Text 
        fontWeight={'550'}
        color={'blue.600'}
        >   
            Name
        </Text>
        <Input width={'full'} 
        border={'2px solid'}
        placeholder='Enter crop name'
        borderColor={'gray.300'}
        />
      </Flex>
      <Flex flexDir={'column'} 
      gap={'2'}>
        <Text 
        fontWeight={'550'}
        color={'blue.600'}
        >   
          Feature 1
        </Text>
        <Textarea width={'full'} 
        border={'2px solid'}
        h={'20px'}
        value={feature1}
        onChange={handlefeature}
        // rows={40}
        // cols={'5'}
        placeholder='Enter features less than 80 words'
        borderColor={'gray.300'}
        />
        <Text fontSize={'13px'}
        textAlign={'end'} mt={'-2'}>
            {remaingchar}/{maxval}
        </Text>
      </Flex>
      <Flex flexDir={'column'} 
      gap={'2'}>
        <Text 
        fontWeight={'550'}
        color={'blue.600'}
        >   
          Feature 2
        </Text>
        <Textarea width={'full'} 
        border={'2px solid'}
        h={'20px'}
        value={feature2}
        onChange={handlefeature2}
        // rows={40}
        // cols={'5'}
        placeholder='Enter features less than 80 words'
        borderColor={'gray.300'}
        />
         <Text fontSize={'13px'}
        textAlign={'end'} mt={'-2'}>
            {remaingchar}/{maxval}
        </Text>
      </Flex>
    {
        !imgurl &&   <Button bg={'blue.600'}
        height={'45px'}
       width={'140px'}
       _hover={{
          bg:'blue.500'
       }}
       onClick={()=>fileref.current.click()}
      //  ml={'10px'}
      color={'white'}
       >
          Upload image
       </Button>
    }
    <Input 
    ref={fileref}
    type='file'  
    onChange={handlechangeimage}
    hidden
    />
    <Flex flexDir={'column'} position={'relative'}>
   {
    imgurl &&  <Image src={imgurl} width={'full'} 
    maxW={'300px'}
    borderRadius={'5px'} />
   }
   {
    imgurl &&  <CloseButton bg={'gray.400'} position={'absolute'} right={'7'}
    top={'2'}
    cursor={'pointer'}
    onClick={()=>setimgurl('')}
    />
   }
    </Flex>
    </Flex>

  {
    imgurl &&   <Button bg={'blue.600'}
    height={'45px'}
   width={'140px'}
   _hover={{
      bg:'blue.500'
   }}
   alignSelf={'center'}
   mt={'5'}
   mb={'5'}
   onClick={handleupload}
  //  ml={'10px'}
  color={'white'}
   >
      Upload 
   </Button>
  }

    </Flex>
  )
}

export default Uploadcrop