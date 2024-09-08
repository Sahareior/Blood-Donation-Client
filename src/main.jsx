import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Home from './Component/MainLayout';
import About from './Component/About';
import MainLayout from './Component/MainLayout';
import App from './App';
import { MyProvider } from './Provider/Myprovider';



createRoot(document.getElementById('root')).render(
  <StrictMode>
<MyProvider>
   <App />
</MyProvider>
  </StrictMode>
);
