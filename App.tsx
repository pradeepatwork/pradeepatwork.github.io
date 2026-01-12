
import React, { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Section from './components/Section';
import Navbar from './components/Navbar';
import CircuitFlow from './components/CircuitFlow';
import LogicCircuit from './components/LogicCircuit';
import { 
  Plane, 
  Terminal, 
  Layers, 
  Github, 
  Linkedin, 
  Microchip,
  Fingerprint,
  Zap,
  Activity as PulseIcon
} from 'lucide-react';
import { ExperienceItem, Project, Skill } from './types';

const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Proxgy",
    role: "Embedded Software Engineer",
    period: "2024 - PRESENT",
    description: [
      "Pioneering firmware for next-gen safety wearables and AI-integrated industrial IoT units.",
      "Developing deterministic real-time processing pipelines for multi-sensor data streams.",
      "Optimizing edge computing footprints to enable complex ML inference on resource-constrained MCUs."
    ]
  },
  {
    company: "TDMS Private Limited",
    role: "Embedded Software Engineer",
    period: "2023",
    description: [
      "Engineered full-stack firmware for smart power infrastructure and monitoring sensors.",
      "Built custom peripheral drivers for Raspberry Pi Pico and STM32 ecosystems.",
      "Architected reliable MQTT telemetry protocols with local buffering for offline resilience."
    ]
  },
  {
    company: "Garudaire",
    role: "Embedded Software Engineer",
    period: "2022 - 2023",
    description: [
      "Core developer for autonomous drone avionics (VTOL, Quad, Fixed-wing).",
      "Integrated Pixhawk 6C systems with custom payload logic using PX4 and ArduPilot.",
      "System validation via SITL and high-fidelity flight log forensics."
    ]
  },
  {
    company: "Flexmotiv",
    role: "Embedded System Designer",
    period: "2021 - 2022",
    description: [
      "End-to-end design of wearable GPS/GSM trackers using ESP32 and SIM808L.",
      "Implemented low-level I2C/SPI driver stacks and watchdog-guarded system logic.",
      "Hardware engineering including 4-layer PCB layout using Altium Designer."
    ]
  }
];

const SKILLS: Skill[] = [
  { name: 'C / C++', category: 'FIRMWARE' },
  { name: 'Bare-metal & RTOS firmware', category: 'FIRMWARE' },
  { name: 'Deterministic state machines', category: 'FIRMWARE' },
  { name: 'Memory-constrained design', category: 'FIRMWARE' },
  { name: 'STM32 / ESP32', category: 'HARDWARE' },
  { name: 'ARM Cortex-M', category: 'HARDWARE' },
  { name: 'Peripheral & sensor integration', category: 'HARDWARE' },
  { name: 'Low-power systems', category: 'HARDWARE' },
  { name: 'FreeRTOS / Zephyr', category: 'RTOS & REAL-TIME' },
  { name: 'Task scheduling & ISR design', category: 'RTOS & REAL-TIME' },
  { name: 'Concurrency & synchronization', category: 'RTOS & REAL-TIME' },
  { name: 'Watchdog & fault recovery', category: 'RTOS & REAL-TIME' },
  { name: 'MAVLink / CAN', category: 'CONNECTIVITY' },
  { name: 'MQTT / TCP-IP', category: 'CONNECTIVITY' },
  { name: 'UART / SPI / I2C', category: 'CONNECTIVITY' },
  { name: 'Cellular (LTE / GSM)', category: 'CONNECTIVITY' },
  { name: 'Secure boot concepts', category: 'SECURITY & RELIABILITY' },
  { name: 'Firmware integrity', category: 'SECURITY & RELIABILITY' },
  { name: 'Fail-safe system design', category: 'SECURITY & RELIABILITY' },
  { name: 'OTA & rollback awareness', category: 'SECURITY & RELIABILITY' },
  { name: 'Altium Designer', category: 'TOOLS & VALIDATION' },
  { name: 'JTAG / SWD / GDB', category: 'TOOLS & VALIDATION' },
  { name: 'Logic Analyzer / Oscilloscope', category: 'TOOLS & VALIDATION' },
  { name: 'SITL / HIL testing', category: 'TOOLS & VALIDATION' },
];

const PROJECTS: Project[] = [
  {
    title: "EdgeSight AI",
    description: "Real-time crop disease classification using an edge-optimized CNN. Deployable on low-power Raspberry Pi nodes for autonomous agriculture.",
    tags: ["CV", "Python", "EdgeAI"]
  },
  {
    title: "Centurion Telemetry",
    description: "Advanced telemetry bridge for MAVLink-enabled swarms. Synchronizes multi-agent gimbal data with <10ms jitter.",
    tags: ["RTOS", "C++", "Drones"]
  },
  {
    title: "NanoGate Industrial",
    description: "Hardware-hardened IoT gateway with cellular auto-failover and TPM-based secure boot.",
    tags: ["ESP32", "IoT", "Security"]
  }
];

const App: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));
  const [copied, setCopied] = useState(false);
  const email = 'kumarpradeep9435@gmail.com';

  const handleEmailClick = (e: React.MouseEvent) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative min-h-screen text-slate-200 selection:bg-sky-500/30">
      <ParticleBackground />
      <Navbar />

      <header className="min-h-screen flex items-center px-6 md:px-24 lg:px-32 relative overflow-hidden py-20 lg:py-0">
        <div className="max-w-7xl w-full mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Text Content */}
          <div className="lg:col-span-7 space-y-12">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_#38bdf8]"></span>
              <span className="mono text-[10px] font-black tracking-[0.4em] uppercase text-sky-400/80">
                Core System Online
              </span>
            </div>

            <div className="relative flex flex-col gap-8">
              <div className="space-y-0">
                <h1 className="text-[12vw] sm:text-[8vw] lg:text-[8rem] font-black tracking-tighter leading-[0.85] flex flex-col text-white">
                  <span>PRADEEP</span>
                  <span className="text-[#38bdf8]">KUMAR</span>
                </h1>
                <div className="h-px w-32 bg-slate-800 mt-10"></div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-2xl md:text-4xl text-slate-100 font-medium tracking-tight max-w-2xl">
                  Embedded Systems Architect
                </p>
                <p className="text-xl md:text-3xl text-slate-400 font-light tracking-tight max-w-2xl leading-tight">
                  Real-time firmware for <span className="text-white font-semibold underline decoration-sky-500/30 decoration-2">safety-critical</span> and edge systems
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mono text-[10px] md:text-xs font-black text-sky-400/60 tracking-[0.15em] uppercase bg-slate-900/40 p-3 rounded-lg border border-white/5 w-fit">
                <span className="text-slate-600 font-bold opacity-50"># STACK</span>
                <span>ARM Cortex-M</span>
                <span className="text-slate-800">|</span>
                <span>FreeRTOS</span>
                <span className="text-slate-800">|</span>
                <span>STM32</span>
                <span className="text-slate-800">|</span>
                <span>ESP32</span>
                <span className="text-slate-800">|</span>
                <span>Industrial IoT</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <a 
                href="#projects" 
                className="group flex items-center gap-4 bg-[#38bdf8] text-slate-950 px-8 py-4 rounded-xl font-bold transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(56,189,248,0.3)]"
              >
                Launch Projects
                <Zap size={20} fill="currentColor" />
              </a>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/pradeepatwork" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-14 h-14 flex items-center justify-center rounded-xl bg-slate-900/50 border border-white/5 hover:border-white/20 hover:bg-slate-800/80 transition-all text-slate-400 hover:text-white"
                >
                  <Github size={22} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/pradeep-kumar-ap/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-14 h-14 flex items-center justify-center rounded-xl bg-slate-900/50 border border-white/5 hover:border-white/20 hover:bg-slate-800/80 transition-all text-slate-400 hover:text-white"
                >
                  <Linkedin size={22} />
                </a>
              </div>
            </div>
          </div>

          <div className="flex lg:col-span-5 items-center justify-center mt-12 lg:mt-0">
            <CircuitFlow className="scale-[0.7] sm:scale-90 md:scale-100 lg:scale-110" />
          </div>
        </div>
      </header>

      <Section id="about" title="System Biography">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12 order-2 lg:order-1">
            <div className="glass p-8 md:p-10 rounded-3xl border-white/5 relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                 <Fingerprint size={120} className="text-sky-400" />
               </div>
               <div className="space-y-6 relative z-10">
                 <p className="text-xl leading-relaxed text-slate-300">
                  I am an <span className="text-sky-400 font-bold underline decoration-sky-500/30">Embedded Software Engineer</span> with a passion for bridging the gap between hardware and software. 
                  My expertise lies in designing reliable, deterministic systems that power autonomous vehicles and industrial IoT ecosystems.
                 </p>
                 <p className="text-lg leading-relaxed text-slate-400">
                  From real-time flight controllers for UAVs to low-latency edge AI on industrial wearables, I specialize in the "Hard" side of software where memory is scarce and every microsecond counts.
                 </p>
               </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="glass flex items-center gap-4 px-6 py-4 rounded-2xl border-white/5 group hover:border-sky-500/30 transition-all">
                <div className="p-3 bg-slate-800/80 rounded-xl group-hover:text-sky-400 transition-colors">
                  <Microchip size={24} />
                </div>
                <div>
                  <div className="mono text-[10px] font-black text-slate-500 uppercase tracking-widest">Architecture</div>
                  <div className="text-sm font-bold text-slate-200">ARM Cortex-M</div>
                </div>
              </div>
              <div className="glass flex items-center gap-4 px-6 py-4 rounded-2xl border-white/5 group hover:border-indigo-500/30 transition-all">
                <div className="p-3 bg-slate-800/80 rounded-xl group-hover:text-indigo-400 transition-colors">
                  <PulseIcon size={24} />
                </div>
                <div>
                  <div className="mono text-[10px] font-black text-slate-500 uppercase tracking-widest">Reliability</div>
                  <div className="text-sm font-bold text-slate-200">99.9% Uptime</div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 cursor-pointer relative lg:sticky lg:top-32">
            <LogicCircuit className="scale-100 lg:scale-110 opacity-80 hover:opacity-100 transition-all duration-500" />
          </div>
        </div>
      </Section>

      <Section id="expertise" title="System Capabilities">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Plane className="text-sky-400" />, title: "Avionics Logic", desc: "Developing failsafe flight control algorithms and custom MAVLink message handlers for drone ecosystems." },
            { icon: <Microchip className="text-indigo-400" />, title: "Firmware Core", desc: "Hard real-time systems using FreeRTOS and bare-metal C. Expert in ISR latency and concurrency management." },
            { icon: <Layers className="text-emerald-400" />, title: "PCB Design", desc: "Multi-layer PCB layout with a focus on impedance matching and thermal management for power electronics." }
          ].map((item, idx) => (
            <div key={idx} className="glass group p-10 rounded-[2.5rem] border-white/5 hover:border-sky-500/40 transition-all hover:-translate-y-2 relative overflow-hidden">
              <div className="mb-8 p-5 rounded-3xl bg-slate-800/80 w-fit border border-white/5 group-hover:bg-sky-500/10 transition-colors">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="experience" title="Deployment History" className="bg-slate-900/40 backdrop-blur-xl rounded-[4rem] border border-white/5 my-20">
        <div className="space-y-16 py-10">
          {EXPERIENCE.map((exp, idx) => (
            <div key={idx} className="group relative grid md:grid-cols-5 gap-10 px-6">
              <div className="md:text-right col-span-1">
                <span className="mono text-sky-400 font-bold text-xl tracking-tighter">{exp.period}</span>
              </div>
              <div className="md:col-span-4 border-l-2 border-slate-800/50 pl-12 pb-10 relative">
                <div className="absolute top-0 -left-[11px] w-5 h-5 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-sky-500 group-hover:bg-sky-500/20 transition-all duration-500"></div>
                <h3 className="text-4xl font-black mb-1 group-hover:text-white transition-colors">{exp.role}</h3>
                <div className="text-2xl text-sky-400/70 font-bold mb-8 uppercase tracking-wide">{exp.company}</div>
                <ul className="space-y-5">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-slate-400 leading-relaxed text-lg flex gap-4"><span className="text-sky-500 font-black mt-1.5 opacity-50">/</span>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Featured Systems">
        <div className="grid md:grid-cols-3 gap-10">
          {PROJECTS.map((p, idx) => (
            <div key={idx} className="group glass p-10 rounded-[3rem] border-white/5 hover:bg-slate-800/30 transition-all flex flex-col h-full relative overflow-hidden">
              <div className="p-5 bg-sky-500/10 rounded-2xl text-sky-400 w-fit mb-10 group-hover:rotate-12 transition-transform"><Terminal size={28} /></div>
              <h3 className="text-3xl font-bold mb-6">{p.title}</h3>
              <p className="text-slate-400 text-lg flex-grow">{p.description}</p>
              <div className="flex flex-wrap gap-3 pt-8 border-t border-white/5">
                {p.tags.map(tag => <span key={tag} className="mono text-[11px] font-black text-sky-500 border border-sky-500/20 px-4 py-1.5 rounded-full uppercase tracking-tighter bg-sky-500/5">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Technical Inventory">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {categories.map((cat) => (
            <div key={cat} className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-4 w-1 bg-sky-500 rounded-full"></div>
                <h4 className="mono text-xs font-black text-slate-500 tracking-[0.4em] uppercase">{cat}</h4>
              </div>
              <div className="grid gap-5">
                {SKILLS.filter(s => s.category === cat).map((skill, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-default">
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-700 group-hover:bg-sky-400 transition-all"></div>
                    <span className="text-lg font-bold text-slate-400 group-hover:text-slate-100 transition-colors">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <footer className="py-24 border-t border-white/5 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Social Links - Now first on mobile (order-1) and second on desktop (md:order-2) */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-[11px] font-black mono uppercase tracking-[0.2em] order-1 md:order-2">
            <a 
              href={`mailto:${email}`} 
              onClick={handleEmailClick}
              className={`transition-all duration-300 ${copied ? 'text-sky-400' : 'text-slate-400 hover:text-white'}`}
            >
              {copied ? 'Copied!' : 'Email'}
            </a>
            <a href="https://github.com/pradeepatwork" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">Github</a>
            <a href="https://www.linkedin.com/in/pradeep-kumar-ap/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">LinkedIn</a>
          </div>

          {/* Copyright Statement - Now second on mobile (order-2) and first on desktop (md:order-1) */}
          <p className="text-slate-500 text-[10px] mono tracking-[0.2em] uppercase text-center md:text-left order-2 md:order-1">
            © {new Date().getFullYear()} PRADEEP KUMAR // ALL SYSTEMS OPERATIONAL
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
