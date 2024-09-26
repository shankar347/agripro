import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ChakraProvider} from '@chakra-ui/react'
import {RecoilRoot} from 'recoil'
import {BrowserRouter} from 'react-router-dom'
import Agricontext from './view/components/agricontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ChakraProvider>
      <RecoilRoot>
        <Agricontext>
      <App />
      </Agricontext>
      </RecoilRoot>
    </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
