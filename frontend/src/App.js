import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from "./components/Footer/Footer";


import { Outlet } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const queryClient = new QueryClient();

function App() {

  const authUser = useSelector((state) => state.authUser)
  useEffect(() => {
    console.log('accessToken', authUser)
    console.log("REFRESH_TOKEN", localStorage.getItem("REFRESH_TOKEN"))
  }, [authUser])

  return (
    <div className="App">
      <NavBar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Footer />
    </div>
  )
}

export default App;
