import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/router.tsx';
import "./App.css";

export function App() {
  return (
    <BrowserRouter> 
      <Router />
    </BrowserRouter>
  )
}