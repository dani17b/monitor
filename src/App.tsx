import React from 'react';
import './tailwind-dist.css';
import './app.css';
import { Home } from './modules/home';
import { NextUIProvider } from '@nextui-org/react';

function App() {
  return (
    <NextUIProvider>
      <div className='app'>
        <Home />
      </div>
    </NextUIProvider>
  );
}

export default App;
