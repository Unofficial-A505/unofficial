import { Routes, Route } from 'react-router-dom'
import Signup1 from './Signup1'
import Signup2 from './Signup2'
import Signup3 from './Signup3'


export default function Signup(){
  return (
    <Routes>
      <Route path='/signup' element={ <Signup1 /> } />
      <Route path='/register' element={ <Signup2 /> } />
      <Route path='/conplete' element={ <Signup3 /> } />
    </Routes>
  )
}