import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';

import { Outlet, BrowserRouter } from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {

  return (
  <BrowserRouter>
    <div className="App">
      <NavBar />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </div>
  </BrowserRouter>
  )
}

export default App;
