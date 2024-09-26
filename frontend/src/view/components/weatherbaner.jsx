import { Flex, Image, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import cloudy from '../../assets/cloudy.png'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useRecoilValue } from 'recoil'
import useratom from '../atoms/useratom'
import cloud from '../../assets/cloudy.png';
import raining from '../../assets/raining.png';
import sun from '../../assets/sun.png';
import snow from '../../assets/snow.png';
import storm from '../../assets/storm.png';
// import wind from '../../assets/wind.png';
// import humidity from './humidity.png';
// import search1 from './search.png';
// import clear from './clear-sky.png';
import mint from '../../assets/fog.png';


const Weatherbanner = () => {
    const user=useRecoilValue(useratom)
    const toast=useToast()
   let appapi="7bb276584e61aae5346fa92b11d38e54"; 
   const [data1,setdata1]=useState(null)
   const [icon,seticon]=useState(cloud)
   const [humididty,sethumidity]=useState('')
   const [perception,setperception]=useState('')
   const [wind,setwind]=useState('')
   const [temperature,setemperature]=useState(0)
   const [loation,setlocation]=useState('')
   useEffect(() => {
    const getcurrentlocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
  
          try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${appapi}`);
            const data = await res.json();
            // console.log(data)
            setdata1(data);
            console.log(data1)  
            sethumidity(data?.main?.humidity 
              // || 0
            ); 
            setwind(data?.wind?.speed 
              // || 0
            ); 
            setperception(data?.rain ? data?.rain['1h'] : 0); 
            // setlocation(data?.)
            if (data?.main?.temp) {
              let roundedTemperature = Math.round(Number(data.main.temp)); 
              setemperature(roundedTemperature);
            } else {
              setemperature(0); 
            }
            setlocation(data?.name)
          if (data?.weather)
            {
              if(data.weather[0].icon==="01d" ||data.weather[0].icon==="01n" )
                {
                    seticon(sun);
                }
                else if(data.weather[0].icon==="02d" ||data.weather[0].icon==="02n" )
                {
                    seticon(clear);
                }
            
            else if(data.weather[0].icon==="03d" ||data.weather[0].icon==="03n" )
            {
                seticon(cloud);
            }
            
            else if(data.weather[0].icon==="04d" ||data.weather[0].icon==="04n" )
            {
                seticon(cloud);
            }
            
            else if(data.weather[0].icon==="09d" ||data.weather[0].icon==="09n" )
            {
                seticon(raining);
            }
            else if(data.weather[0].icon==="10d" ||data.weather[0].icon==="10n" )
            {
                seticon(raining);
            }
            else if(data.weather[0].icon==="11d" ||data.weather[0].icon==="11n" )
            
            {
                seticon(storm);
            }
            
            else if(data.weather[0].icon==="13d" ||data.weather[0].icon==="13n" )
            {
                seticon(snow);
            }
            else if(data.weather[0].icon==="50d" ||data.weather[0].icon==="50n"){
             seticon(mint);
            }
            } 
          
            else{
              seticon(cloud)
            }

          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        });
      } else {
        toast({
          title: 'Geolocation is not supported by your browser',
          status: 'error',
          duration: 2000,
        });
      }
    };
  
    getcurrentlocation();
  }, []);

    


  return (
     <Flex className='weather' 
     height={'140px'} color={'white'}
     width={'full'} justify={'space-between'}  mt={'0'}>
      <Flex flexDir={'column'} 
      ml={'3'}>
         <Flex mt={'4'} alignItems={'center'} 
      gap={'1'} ml={'1px'}>
        <FaMapMarkerAlt/>
        <Text fontWeight={500}>
           {loation}
           {/* Thirukkalukundram */}
        </Text>
      </Flex>
        <Text mt={'5'} pl={'1'} 
        fontWeight={500}>
            Now
        </Text>
        <Flex mt={'-3'}  align={'center'} gap={'2'}>
        <Flex align={'baseline'}>
        <Text fontWeight={400} 
         fontSize={'48'}>
            {temperature}°  
         </Text>
         <Text fontSize={'18'}>
            C
         </Text>
        </Flex>
          <Image src={icon}  
          width={'50px'}
          height={'50px'}
          alt='' />  
        </Flex>
      </Flex>
      <Flex flexDir={'column'} 
      mr={'2'} mt={8}>
       <Text fontWeight={500}>
        Mostly Cloudy
       </Text>
       <Text mt={'2'} fontSize={'14px'} 
       fontWeight={500}>
         Precip: {perception} %
       </Text>
       <Text fontSize={'14px'} 
       fontWeight={500}>
         Humidity: {humididty}%
       </Text>
       <Text fontSize={'14px'} 
       fontWeight={500}>
         Wind: {wind} kmph
       </Text>
      </Flex>
     </Flex>
  )
}

export default Weatherbanner