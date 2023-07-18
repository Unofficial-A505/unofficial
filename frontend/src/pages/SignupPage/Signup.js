// import { Routes, Route } from 'react-router-dom'
// import Signup1 from './Signup1'
// import Signup2 from './Signup2'
// import Signup3 from './Signup3'


// export default function Signup(){
//   return (
//     <Routes>
//       <Route path='/signup' element={ <Signup1 /> } />
//       <Route path='/register' element={ <Signup2 /> } />
//       <Route path='/conplete' element={ <Signup3 /> } />
//     </Routes>
//   )
// }
import React from 'react';
// import logo from './logo.svg';
// import '../App.css';
import { Routes, Route } from 'react-router-dom'
// import Signup from './pages/SignupPage/Signup.js'
import Login from '@/src/components/Login/Login.js'

import { useState } from 'react';
import Signup2 from './SignupPage/Signup2';

import { Outlet } from 'react-router-dom';

function Signup() {

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () => {
      setModalOpen(true);
  }

  return (
    <div className="App">
      <div>
        <button onClick={showModal}>모달 띄우기</button>
        {modalOpen && <Login setModalOpen={setModalOpen} />}
      </div>
      <Outlet />
    </div>
  )
}

export default Signup;