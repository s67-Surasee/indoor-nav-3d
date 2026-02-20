import React, { useEffect } from 'react';
import SearchBox from './components/SearchBox';
import StateDebugger from './components/StateDebugger'; // ดึงแผง Debug มา
import { useStore } from './system-state/global-store';
import { getGuestId } from './system-state/guest-id';

function App() {
  const setGuestId = useStore((state) => state.setGuestId);

  // 🟢 ทำงาน 1 ครั้งตอนเปิดเว็บ: ให้ไปดึง Guest ID มายัดใส่ State
  useEffect(() => {
    const id = getGuestId(); // ไปดึงหรือสร้าง ID จาก localStorage
    setGuestId(id);          // เอา ID ที่ได้ไปเก็บใน State กลาง
  }, []); // [] แปลว่าให้ทำแค่ตอนเปิดเว็บครั้งแรกเท่านั้น

  return (
    <div style={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. ช่องค้นหาของออมสิน */}
      <SearchBox />

      {/* 2. แผง Debug ของเอิร์ธ (เอาไว้ดูข้อมูล) */}
      <StateDebugger />

      {/* 3. ตรงนี้เว้นไว้รอแผนที่ 3D ของไนท์/เพชร */}
      <div style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
        <p>[ พื้นที่สำหรับ 3D Map View ]</p>
      </div>
      
    </div>
  );
}

export default App;