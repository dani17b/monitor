import React from 'react';
import './tailwind-dist.css';
import { Home } from './modules/home';
import { NextUIProvider } from '@nextui-org/react';

function App() {
  return (
    <NextUIProvider>
      <Home />
    </NextUIProvider>
  );
}

export default App;
