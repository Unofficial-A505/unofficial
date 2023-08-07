import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from "./components/Footer/Footer";
import { Outlet, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import usePageTitle from './usePageTitle';  

const queryClient = new QueryClient();

function App() {
  const location = useLocation(); 
  console.log(location.pathname)
  const title = usePageTitle(location.pathname);  

  useEffect(() => {
    document.title = title || "언오피셜"; 
  }, [title]);

  return (
    <div className="App">
      <NavBar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Footer />
    </div>
  );
}

export default App;