import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Homepage from './view/components/homepage'
import Auth from './view/auth/auth'
import { Box } from '@chakra-ui/react'
import Navbar from './view/components/navbar'
import { useRecoilValue } from 'recoil'
import useratom from './view/atoms/useratom'
import Postpage from './view/components/postpage'
import Userprofile from './view/components/userprofile'
import Updateprofile from './view/components/updateprofile'
import Userhelp from './view/components/userhelp'
import Detailpage from './view/components/detailpage'
import Insectdetail from './view/components/insectdetail'
import Uploadcrop from './view/components/uploadcrop'
import Uploadinsect from './view/components/uploadinsect'

const App = () => {
 
  const location=useLocation()
  const checklocation=location.pathname === '/auth'
  const user=useRecoilValue(useratom)
  console.log(user)
  return (
    <Box className={`${checklocation ? 'greenbg1' : ''} `}>
       <Box 
       maxW={'400px'} 
      //  w={'500px'} 
      //  width={'full'}
       mx={'auto'}
       >
      {
       !checklocation && <Navbar/>
      }  
      <Routes>
      <Route path='/auth' element={!user ? <Auth/> : <Navigate to={'/'} />} />    
      <Route path='/' 
      element={
        user ? <Homepage/> : <Navigate to={'/auth'}/>}
        // element={<Homepage/> 
        />
        <Route 
        path='/admin-posts/:id'
        element={user?  <Postpage/> 
          : <Navigate to={'/auth'}/>
        }
        />
        <Route 
        path='/user-profile'
        element={user? <Userprofile/> :
           <Navigate to={'/auth'}/>}
        />
        <Route
        path='/user-profile/edit'
        element={user ?  <Updateprofile/>
          : <Navigate to={'/auth'}/>
        }
        />
        <Route 
        path='/user-help-contact'
        element={ user ?<Userhelp/>
          : <Navigate to={'/auth'}/>
        }
        />
        <Route 
        path='/crop-details'
        element={user ? <Detailpage/>
          : <Navigate to={'/auth'}/>
        }
        />
          <Route 
        path='/insects-details'
        element={user ? <Insectdetail/>
          : <Navigate to={'/auth'}/>
        }
        />
         <Route 
        path='/upload-crop'
        element={user ? <Uploadcrop/>
          : <Navigate to={'/auth'}/>
        }
        />
         <Route 
        path='/upload-insects'
        element={user ? <Uploadinsect/>
          : <Navigate to={'/auth'}/>
        }
        />
      </Routes>
      </Box>
    </Box>
  )
}

export default App