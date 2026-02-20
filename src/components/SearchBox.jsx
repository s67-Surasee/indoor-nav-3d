import React, { useState, useEffect } from 'react';
import { useStore } from '../system-state/global-store'; 
import './SearchBox.css'; 

export default function SearchBox() {
    const [locations, setLocations] = useState([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    
    // 🟢 เพิ่ม State สำหรับเปิด/ปิดเมนูเลือกชั้น
    const [showFloorMenu, setShowFloorMenu] = useState(false);

    const setTargetLocation = useStore((state) => state.setTargetLocation);
    const setFloor = useStore((state) => state.setFloor);
    const currentFloor = useStore((state) => state.currentFloor); // ดึงชั้นปัจจุบันมาดูด้วย

    useEffect(() => {
        fetch('/location.json')
            .then(res => res.json())
            .then(data => setLocations(data))
            .catch(err => console.error("Error loading locations:", err));
    }, []);

    const handleSearch = (e) => {
        const text = e.target.value;
        setQuery(text);

        if (text.trim() === '') {
            setResults([]);
            return;
        }

        const filtered = locations.filter(loc => {
            const th = loc.name_th?.toLowerCase() || '';
            const en = loc.name_en?.toLowerCase() || '';
            return th.includes(text.toLowerCase()) || en.includes(text.toLowerCase());
        });
        setResults(filtered);
    };

    const handleSelect = (loc) => {
        setQuery(loc.name_th); 
        setResults([]);        

        setTargetLocation({
            node_id: loc.node_id,
            name: loc.name_th,
            floor: loc.floor
        });
        
        setFloor(loc.floor); 
    };

    return (
        <div className="header-controls">
            {/* --- ส่วนช่องค้นหา --- */}
            <div className="search-wrapper">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                    type="text"
                    placeholder="ค้นหาตึก 81, ห้องเรียน..."
                    value={query}
                    onChange={handleSearch}
                    autoComplete="off"
                />
                
                {results.length > 0 && (
                    <div id="results-list" style={{ display: 'block' }}>
                        {results.map(loc => (
                            <div 
                                key={loc.location_id} 
                                className="result-item" 
                                onClick={() => handleSelect(loc)}
                            >
                                <strong>{loc.name_th}</strong> <small>{loc.name_en}</small>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* --- ส่วนปุ่มเลือกชั้น (ของออมสิน) ที่อัปเกรดแล้ว --- */}
            <div 
                className="filter-button" 
                onClick={() => setShowFloorMenu(!showFloorMenu)}
                style={{ position: 'relative' }} // เพิ่ม relative เพื่อให้เมนูลอยติดกับปุ่ม
            >
                <i className="fa-solid fa-layer-group"></i>

                {/* เมนูเด้ง (Dropdown) เลือกชั้น */}
                {showFloorMenu && (
                    <div style={{
                        position: 'absolute', top: '65px', right: '0',
                        backgroundColor: '#fdfdfd', borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)', padding: '8px',
                        display: 'flex', flexDirection: 'column', gap: '5px',
                        zIndex: 100, minWidth: '100px'
                    }}>
                        {/* สมมติว่าตึกนี้มี 4 ชั้น (แก้ตัวเลขได้ตามต้องการ) */}
                        {[1, 2, 3, 4].map(floor => (
                            <button 
                                key={floor}
                                onClick={(e) => {
                                    e.stopPropagation(); // กันไม่ให้เมนูปิดซ้อนกัน
                                    setFloor(floor);     // ส่งข้อมูลเข้า State ของเอิร์ธ
                                    setShowFloorMenu(false); // ปิดเมนู
                                }}
                                style={{
                                    padding: '10px', borderRadius: '8px', border: 'none',
                                    // ถ้าเป็นชั้นปัจจุบัน ให้ปุ่มเป็นสีฟ้าของออมสิน
                                    backgroundColor: currentFloor === floor ? '#347efb' : 'transparent',
                                    color: currentFloor === floor ? 'white' : '#333d52',
                                    cursor: 'pointer', fontFamily: "'Sarabun', sans-serif",
                                    fontWeight: 'bold', fontSize: '16px', textAlign: 'center'
                                }}
                            >
                                ชั้น {floor}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}