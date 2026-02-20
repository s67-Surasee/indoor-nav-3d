import React from 'react';
import { useStore } from '../system-state/global-store'; 

export default function StateDebugger() {
    // 🟢 ดึงข้อมูล "ทั้งหมด" ออกมาจากกระดาน State
    const state = useStore(); 

    return (
        <div style={{ 
            margin: '20px auto', maxWidth: '600px', padding: '15px', 
            backgroundColor: '#1e1e1e', color: '#00ff00', 
            borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
            <h3 style={{ color: '#ffcc00', marginTop: 0 }}>System State Debugger</h3>
 
            {/* --- แสดงข้อมูล State ทั้งหมดออกมาเป็นตัวหนังสือ --- */}
            <strong style={{ color: '#fff' }}>ข้อมูลใน State ปัจจุบัน:</strong>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', margin: '10px 0 0 0' }}>
                {JSON.stringify({
                    guestId: state.guestId,
                    currentFloor: state.currentFloor,
                    userPosition: state.userPosition,
                    targetLocation: state.targetLocation,
                    selectedAvatar: state.selectedAvatar
                }, null, 2)}
            </pre>
        </div>
    );
}