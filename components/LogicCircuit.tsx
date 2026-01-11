
import React from 'react';

interface LogicCircuitProps {
  className?: string;
}

const LogicCircuit: React.FC<LogicCircuitProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center group/circuit ${className}`}>
      
      {/* State Status Card - Top Right. Moved 50px up on mobile (top-4 = 16px, 16-50 = -34px) */}
      <div className="absolute top-[-34px] lg:top-4 right-4 p-4 glass rounded-2xl border-sky-500/20 translate-x-4 opacity-0 group-hover/circuit:translate-x-0 group-hover/circuit:opacity-100 transition-all duration-700 z-10">
        <div className="text-[10px] mono text-slate-400 font-black uppercase tracking-[0.3em] mb-2">State: Synced</div>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-sky-500 w-[92%] animate-[pulse_2s_infinite]"></div>
          </div>
          <span className="mono text-[10px] font-bold text-sky-400">92%</span>
        </div>
      </div>

      {/* Main Circuit SVG with Standby Effect */}
      <div className="relative w-full h-full opacity-25 grayscale-[0.9] group-hover/circuit:opacity-100 group-hover/circuit:grayscale-0 group-hover/circuit:scale-105 transition-all duration-700 ease-out">
        <svg
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <filter id="logicGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="busGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Background Labels */}
          <g className="mono text-[10px] font-black fill-slate-600 uppercase tracking-widest">
            <text x="50" y="130">ACCEL_Z</text>
            <text x="50" y="215">GYRO_PHI</text>
            <text x="50" y="390">CRC_IN</text>
            <text x="50" y="475">BIT_SYNC</text>
          </g>

          {/* Cycle Frequency Indicator - Moved 5px up (120 -> 115) */}
          <g transform="translate(410, 115)" className="mono text-center">
            <text x="0" y="0" fill="#475569" fontSize="10" textAnchor="middle" className="font-black tracking-[0.2em] uppercase">Cycle Frequency</text>
            <text x="0" y="30" fill="#f8fafc" fontSize="28" fontWeight="black" textAnchor="middle">168.0 <tspan fontSize="12" fill="#475569" dx="4">MHz</tspan></text>
          </g>

          {/* Top Logic Gate (&) */}
          <g transform="translate(100, 150)">
            <path d="M-15 -15 H30 C50 -15 50 35 30 35 H-15 V-15Z" fill="#020617" stroke="#334155" strokeWidth="2.5" />
            <text x="7" y="17" fill="#475569" fontSize="18" fontWeight="bold" className="mono" textAnchor="middle">&</text>
            {/* Input Lines */}
            <path d="M-40 -10 H-15" stroke="#334155" strokeWidth="2" />
            <path d="M-40 30 H-15" stroke="#334155" strokeWidth="2" />
          </g>

          {/* Bottom Logic Gate (XOR) */}
          <g transform="translate(100, 410)">
            <path d="M-20 -15 C-10 -15 -10 35 -20 35 M-10 -15 H20 C40 -15 40 35 20 35 H-10 C0 35 0 -15 -10 -15Z" fill="#020617" stroke="#334155" strokeWidth="2.5" />
            <text x="6" y="15" fill="#475569" fontSize="12" fontWeight="bold" className="mono" textAnchor="middle">^</text>
            {/* Input Lines */}
            <path d="M-45 -10 H-15" stroke="#334155" strokeWidth="2" />
            <path d="M-45 30 H-15" stroke="#334155" strokeWidth="2" />
          </g>

          {/* Logic Core Box */}
          <g transform="translate(350, 250)">
            <rect x="0" y="0" width="130" height="130" rx="14" fill="#020617" stroke="#38bdf8" strokeWidth="3" filter="url(#logicGlow)" />
            {/* Diagonal Cross Lines Inside Core */}
            <path d="M20 20 L110 110 M110 20 L20 110" stroke="#1e293b" strokeWidth="1" />
            <text x="65" y="65" fill="#38bdf8" fontSize="12" fontWeight="black" textAnchor="middle" className="mono tracking-[0.2em] uppercase">Logic_Core</text>
            <circle cx="65" cy="85" r="4" fill="#38bdf8" className="animate-pulse" />
          </g>

          {/* Bus Lines */}
          <path d="M150 170 H350" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
          <path d="M150 430 H350" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
          
          {/* Output Bus to TX_BUFFER */}
          <path id="outputBus" d="M480 315 H650" stroke="#1e293b" strokeWidth="14" strokeLinecap="round" />
          
          {/* Bit Flow Animation - Binary Data */}
          <g className="mono font-black text-[11px] fill-sky-400">
            {[0, 1, 2, 3, 4].map((i) => (
              <text key={i} dy="4">
                <textPath href="#outputBus" startOffset={`${i * 20}%`}>
                  {i % 2 === 0 ? '1' : '0'}
                  <animate attributeName="startOffset" from={`${i * 20}%`} to={`${(i * 20) + 100}%`} dur="3s" repeatCount="indefinite" />
                </textPath>
              </text>
            ))}
          </g>

          {/* Sinusoidal Wave - Bottom Right */}
          <g transform="translate(500, 520)">
            <path 
              d="M 0,0 C 20,-40 40,40 60,0 C 80,-40 100,40 120,0 C 140,-40 160,40 180,0" 
              stroke="#1e293b" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round"
            />
            <path 
              d="M 0,0 C 20,-40 40,40 60,0 C 80,-40 100,40 120,0 C 140,-40 160,40 180,0" 
              stroke="#818cf8" 
              strokeWidth="2" 
              fill="none" 
              strokeLinecap="round"
              strokeDasharray="40 140"
            >
              <animate attributeName="stroke-dashoffset" from="180" to="0" dur="2s" repeatCount="indefinite" />
            </path>
          </g>

          {/* TX_BUFFER Box */}
          <g transform="translate(650, 270)">
            <rect width="110" height="90" rx="12" fill="#020617" stroke="#475569" strokeWidth="2.5" />
            <text x="55" y="35" fill="#475569" fontSize="10" textAnchor="middle" className="mono font-black uppercase tracking-widest">TX_Buffer</text>
            {/* Tiny Progress Bar in Buffer */}
            <rect x="15" y="55" width="80" height="15" rx="2" fill="#1e293b" />
            <rect x="15" y="55" width="55" height="15" rx="2" fill="#38bdf8" opacity="0.6">
              <animate attributeName="width" values="40;70;40" dur="4s" repeatCount="indefinite" />
            </rect>
          </g>

          {/* Moving Signal Particles on Input Rails */}
          <rect width="8" height="3" rx="1" fill="#38bdf8" filter="url(#logicGlow)">
            <animateMotion dur="1s" repeatCount="indefinite" path="M150 170 H350" />
          </rect>
          <circle r="3" fill="#818cf8" filter="url(#logicGlow)">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M150 430 H350" />
          </circle>

        </svg>
      </div>
    </div>
  );
};

export default LogicCircuit;
