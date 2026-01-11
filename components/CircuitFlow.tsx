
import React from 'react';
import { Terminal, Activity as PulseIcon } from 'lucide-react';

interface CircuitFlowProps {
  className?: string;
}

const DiagnosticOverlayCard: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  items: { label: string; value: string; color?: string }[]; 
  titleColor?: string;
  positionClass: string;
}> = ({ title, icon, items, titleColor, positionClass }) => (
  <div className={`absolute ${positionClass} bg-[#0a0f1e]/98 p-2.5 rounded-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] w-40 flex flex-col gap-2 opacity-0 group-hover/circuit:opacity-100 translate-y-4 group-hover/circuit:translate-y-0 transition-all duration-500 pointer-events-none z-30`}>
    <div className={`flex items-center gap-2 border-b border-white/5 pb-2 mono font-black uppercase text-[9px] tracking-[0.1em] ${titleColor || 'text-sky-400'}`}>
      {icon} {title}
    </div>
    <div className="space-y-0.5">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between items-center mono text-[10px]">
          <span className="text-slate-500 font-bold uppercase tracking-tighter">{item.label}</span>
          <span className={`font-black ${item.color || 'text-white'}`}>{item.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const CircuitFlow: React.FC<CircuitFlowProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center group/circuit ${className}`}>
      {/* Diagnostic Cards as Overlays */}
      <DiagnosticOverlayCard 
        title="BUS_ANALYZER" 
        titleColor="text-[#818cf8]"
        icon={<Terminal size={11} />} 
        positionClass="top-[-60px] right-[0px] lg:top-[-70px] lg:right-[0px]"
        items={[
          { label: 'I2C_ST', value: 'SYNC', color: 'text-[#818cf8]' },
          { label: 'U_ERR', value: '0.0%', color: 'text-white' },
          { label: 'HEAP', value: '12.8K', color: 'text-[#38bdf8]' }
        ]}
      />

      <DiagnosticOverlayCard 
        title="SYS_POWER_RAIL" 
        titleColor="text-[#38bdf8]"
        icon={<PulseIcon size={11} />} 
        positionClass="bottom-[-10px] left-[0px] lg:bottom-[-20px] lg:left-[0px]"
        items={[
          { label: 'INPUT', value: '3.92 V', color: 'text-[#ef4444]' },
          { label: 'DRAW', value: '42.8 mA', color: 'text-[#38bdf8]' },
          { label: 'BATT', value: '89 %', color: 'text-[#22c55e]' }
        ]}
      />

      {/* Circuit Container with Hover Transition */}
      <div className="relative w-full h-full max-w-[500px] lg:max-w-none opacity-25 grayscale-[0.9] group-hover/circuit:opacity-100 group-hover/circuit:grayscale-0 group-hover/circuit:scale-105 transition-all duration-700 ease-out">
        <svg
          viewBox="-120 -80 1050 750"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_40px_rgba(56,189,248,0.15)]"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="ledGlow">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feFlood floodColor="#22c55e" floodOpacity="0.9" result="color"/>
              <feComposite in="color" in2="blur" operator="in" result="glow"/>
              <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3">
              <circle cx="5" cy="5" r="5" fill="#475569" />
            </marker>
          </defs>

          <g className="mono text-[10px] fill-slate-600 uppercase tracking-widest font-bold">
            <text x="100" y="215">VCC_RAIL: 3.9V</text>
            <text x="100" y="385">GND_PLANE: 0V</text>
            <text x="500" y="80" className="fill-sky-400">I2C_BUS (ADDR: 0x76)</text>
            <text x="500" y="520" className="fill-indigo-400">UART_BUS (115200bps)</text>
            <text x="350" y="160" className="fill-slate-500 tracking-[0.3em]">CLK: 168MHZ (INTERNAL)</text>
          </g>

          <g transform="translate(10, 240)">
            <rect x="0" y="0" width="70" height="120" rx="8" fill="#020617" stroke="#334155" strokeWidth="2.5" />
            <rect x="20" y="-12" width="30" height="12" rx="2" fill="#334155" />
            <text x="35" y="40" fill="#ef4444" fontSize="22" fontWeight="bold" textAnchor="middle" className="mono">+</text>
            <text x="35" y="100" fill="#38bdf8" fontSize="22" fontWeight="bold" textAnchor="middle" className="mono">-</text>
            <path d="M70 30 H110" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#dot)" />
            <path d="M70 90 H110" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#dot)" />
          </g>

          {/* Heartbeat LED Circuit */}
          <g transform="translate(400, 335)">
            <path d="M0 0 V115 H20" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.6" />
            
            <g transform="translate(20, 115)">
              <polygon points="0,-10 15,0 0,10" fill="#22c55e" opacity="0.2">
                <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
                <animate attributeName="filter" values="none;url(#ledGlow);none" dur="2s" repeatCount="indefinite" />
              </polygon>
              <rect x="15" y="-10" width="2" height="20" fill="#22c55e" opacity="0.4" />
              
              <path d="M15 0 H25 V30" stroke="#334155" strokeWidth="2" fill="none" />
              
              <g transform="translate(15, 30)">
                <path d="M0 0 H20" stroke="#475569" strokeWidth="1.5" />
                <path d="M4 4 H16" stroke="#475569" strokeWidth="1.5" />
                <path d="M8 8 H12" stroke="#475569" strokeWidth="1.5" />
              </g>
              <text x="35" y="15" fill="#22c55e" fontSize="9" className="mono font-black tracking-widest opacity-40 uppercase">Heartbeat_uP</text>
            </g>

            <circle r="3.5" fill="#22c55e" filter="url(#ledGlow)">
              <animateMotion dur="2s" repeatCount="indefinite" path="M0 0 V115 H20" />
            </circle>
          </g>

          <g transform="translate(325, 185)">
            {[...Array(8)].map((_, i) => (
              <React.Fragment key={i}>
                <rect x="-20" y={25 + i * 18} width="20" height="5" fill="#475569" />
                <rect x="150" y={25 + i * 18} width="20" height="5" fill="#475569" />
                <rect x={25 + i * 18} y="-20" width="5" height="20" fill="#475569" />
                <rect x={25 + i * 18} y="150" width="5" height="20" fill="#475569" />
              </React.Fragment>
            ))}
            <rect x="0" y="0" width="150" height="150" rx="10" fill="#020617" stroke="#38bdf8" strokeWidth="3" filter="url(#glow)" />
            <text x="75" y="70" fill="#38bdf8" fontSize="18" fontWeight="black" textAnchor="middle" className="mono uppercase tracking-[0.2em]">STM32F4</text>
            <text x="75" y="95" fill="#475569" fontSize="10" textAnchor="middle" className="mono tracking-tighter">OS_KERNEL: ACTIVE</text>
            <circle cx="25" cy="25" r="4" fill="#38bdf8" className="animate-pulse" />
          </g>

          <path d="M120 270 H220 V210 H305" stroke="#ef4444" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M120 330 H220 V336 H305" stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.6" />

          {/* Bi-directional I2C Bus Tracks */}
          <g className="i2c-track">
            {/* Track 1: Master to Peripheral (SDA/SCL Out) */}
            <path id="i2c-out" d="M475 205 C550 205 580 75 670 75" stroke="#1e293b" strokeWidth="2" fill="none" />
            {/* Track 2: Peripheral to Master (SDA/ACK In) */}
            <path id="i2c-in" d="M670 85 C580 85 550 215 475 215" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.4" />
            
            {/* Outgoing I2C Signal */}
            <circle r="2" fill="#38bdf8" filter="url(#glow)">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M475 205 C550 205 580 75 670 75" />
            </circle>
            {/* Incoming I2C Signal */}
            <circle r="2" fill="#818cf8" filter="url(#glow)" opacity="0.7">
              <animateMotion dur="3s" repeatCount="indefinite" path="M670 85 C580 85 550 215 475 215" />
            </circle>
          </g>

          {/* Bi-directional UART Bus Tracks */}
          <g className="uart-track">
            {/* Track 1: TX (Out) */}
            <path id="uart-tx" d="M475 285 C550 285 580 435 670 435" stroke="#1e293b" strokeWidth="2" fill="none" />
            {/* Track 2: RX (In) */}
            <path id="uart-rx" d="M670 445 C580 445 550 295 475 295" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" fill="none" opacity="0.4" />
            
            {/* Outgoing UART Packet */}
            <rect width="6" height="3" rx="1" fill="#818cf8" filter="url(#glow)">
              <animateMotion dur="3.5s" repeatCount="indefinite" path="M475 285 C550 285 580 435 670 435" />
            </rect>
            {/* Incoming UART Packet */}
            <rect width="6" height="3" rx="1" fill="#38bdf8" filter="url(#glow)" opacity="0.6">
              <animateMotion dur="4s" repeatCount="indefinite" path="M670 445 C580 445 550 295 475 295" />
            </rect>
          </g>

          <g transform="translate(670, 40)">
            <rect width="100" height="90" rx="8" fill="#020617" stroke="#334155" strokeWidth="2" />
            <text x="50" y="45" fill="#475569" fontSize="11" textAnchor="middle" className="mono font-bold">BMP280</text>
          </g>
          <g transform="translate(670, 410)">
            <rect width="100" height="90" rx="8" fill="#020617" stroke="#334155" strokeWidth="2" />
            <text x="50" y="45" fill="#475569" fontSize="11" textAnchor="middle" className="mono font-bold">BG95-M3</text>
          </g>

          <circle r="4" fill="#ef4444" filter="url(#glow)">
            <animateMotion dur="2s" repeatCount="indefinite" path="M120 270 H220 V210 H305" />
          </circle>
          <circle r="4" fill="#38bdf8" filter="url(#glow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M305 336 H220 V330 H120" />
          </circle>
        </svg>
      </div>
    </div>
  );
};

export default CircuitFlow;
