// src/App.tsx
import { useEffect } from 'react';
import { getGuestId } from './system-state/guest-id';
import { useStore } from './system-state/global-store';

function App() {
  const { currentFloor } = useStore();

  useEffect(() => {
    // เริ่มระบบ Guest ID ทันทีที่เปิดแอป
    const id = getGuestId();
    console.log('System Active | Guest ID:', id);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Indoor Navigation 3D</h1>
      <div style={{ border: '2px solid #333', padding: '15px', borderRadius: '8px', maxWidth: '400px' }}>
        <h3>System Status (Earth)</h3>
        <p>Current Floor: <strong>{currentFloor}</strong></p>
        <p>Status: <span style={{ color: 'green', fontWeight: 'bold' }}>Running</span></p>
      </div>
    </div>
  );
}

export default App;