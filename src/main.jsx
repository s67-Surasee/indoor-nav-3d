import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' // ลองเติม .jsx ต่อท้ายดูครับเผื่อระบบหาไม่เจอ

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)