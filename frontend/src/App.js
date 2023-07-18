import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login.js'

import { useState } from 'react';

function App() {
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
    </div>
  )
}

export default App;
