export default function AILogo({ className = "w-48 h-48" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
        </linearGradient>

        <radialGradient id="glowGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="strongGlow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        @keyframes neuralPulse {
          0% { opacity: 0; transform: translateX(0) translateY(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateX(var(--tx)) translateY(var(--ty)); }
        }

        @keyframes circuitFlow {
          0% { stroke-dashoffset: 100; opacity: 0.3; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0.3; }
        }

        @keyframes binaryFlow {
          0% { opacity: 0.1; transform: translateY(0); }
          100% { opacity: 0.3; transform: translateY(20px); }
        }

        @keyframes centerGlow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .neural-pulse-1 {
          animation: neuralPulse 2s ease-in-out infinite;
          --tx: 30px;
          --ty: -20px;
        }

        .neural-pulse-2 {
          animation: neuralPulse 2s ease-in-out 0.3s infinite;
          --tx: -25px;
          --ty: 25px;
        }

        .neural-pulse-3 {
          animation: neuralPulse 2s ease-in-out 0.6s infinite;
          --tx: 35px;
          --ty: 30px;
        }

        .neural-pulse-4 {
          animation: neuralPulse 2s ease-in-out 0.9s infinite;
          --tx: -30px;
          --ty: -25px;
        }

        .circuit-flow {
          animation: circuitFlow 3s linear infinite;
          stroke-dasharray: 10 5;
        }

        .binary-flow {
          animation: binaryFlow 4s linear infinite;
        }

        .center-glow {
          animation: centerGlow 2s ease-in-out infinite;
        }
      `}</style>

      <g id="chatBubble">
        <path
          d="M 100 80 Q 100 50, 130 50 L 270 50 Q 300 50, 300 80 L 300 180 Q 300 210, 270 210 L 180 210 L 150 240 L 150 210 L 130 210 Q 100 210, 100 180 Z"
          fill="url(#chatGradient)"
          stroke="url(#brainGradient)"
          strokeWidth="3"
          opacity="0.4"
        />
      </g>

      <g id="binaryBackground">
        <text x="110" y="70" fill="#3b82f6" opacity="0.15" fontSize="12" fontFamily="monospace" className="binary-flow">01010</text>
        <text x="250" y="90" fill="#8b5cf6" opacity="0.15" fontSize="12" fontFamily="monospace" className="binary-flow" style={{ animationDelay: '0.5s' }}>10101</text>
        <text x="130" y="190" fill="#00f0ff" opacity="0.15" fontSize="12" fontFamily="monospace" className="binary-flow" style={{ animationDelay: '1s' }}>11001</text>
        <text x="240" y="170" fill="#3b82f6" opacity="0.15" fontSize="12" fontFamily="monospace" className="binary-flow" style={{ animationDelay: '1.5s' }}>01101</text>
      </g>

      <g id="circuitBoard">
        <line x1="130" y1="100" x2="160" y2="100" stroke="#3b82f6" strokeWidth="2" className="circuit-flow" opacity="0.5" />
        <line x1="160" y1="100" x2="160" y2="130" stroke="#3b82f6" strokeWidth="2" className="circuit-flow" opacity="0.5" style={{ animationDelay: '0.2s' }} />
        <line x1="240" y1="100" x2="270" y2="100" stroke="#8b5cf6" strokeWidth="2" className="circuit-flow" opacity="0.5" style={{ animationDelay: '0.4s' }} />
        <line x1="240" y1="100" x2="240" y2="130" stroke="#8b5cf6" strokeWidth="2" className="circuit-flow" opacity="0.5" style={{ animationDelay: '0.6s' }} />
        <line x1="160" y1="160" x2="160" y2="190" stroke="#00f0ff" strokeWidth="2" className="circuit-flow" opacity="0.5" style={{ animationDelay: '0.8s' }} />
        <line x1="240" y1="160" x2="240" y2="190" stroke="#00f0ff" strokeWidth="2" className="circuit-flow" opacity="0.5" style={{ animationDelay: '1s' }} />
      </g>

      <g id="neuralNetwork">
        <line x1="200" y1="130" x2="160" y2="100" stroke="#3b82f6" strokeWidth="1.5" opacity="0.4" />
        <line x1="200" y1="130" x2="240" y2="100" stroke="#3b82f6" strokeWidth="1.5" opacity="0.4" />
        <line x1="200" y1="130" x2="160" y2="160" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.4" />
        <line x1="200" y1="130" x2="240" y2="160" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.4" />
        <line x1="160" y1="100" x2="130" y2="80" stroke="#00f0ff" strokeWidth="1.5" opacity="0.3" />
        <line x1="240" y1="100" x2="270" y2="80" stroke="#00f0ff" strokeWidth="1.5" opacity="0.3" />
        <line x1="160" y1="160" x2="140" y2="190" stroke="#00f0ff" strokeWidth="1.5" opacity="0.3" />
        <line x1="240" y1="160" x2="260" y2="190" stroke="#00f0ff" strokeWidth="1.5" opacity="0.3" />

        <circle cx="130" cy="80" r="5" fill="#3b82f6" filter="url(#glow)" className="pulse" />
        <circle cx="270" cy="80" r="5" fill="#3b82f6" filter="url(#glow)" className="pulse" style={{ animationDelay: '0.3s' }} />
        <circle cx="160" cy="100" r="6" fill="#8b5cf6" filter="url(#glow)" className="pulse" style={{ animationDelay: '0.6s' }} />
        <circle cx="240" cy="100" r="6" fill="#8b5cf6" filter="url(#glow)" className="pulse" style={{ animationDelay: '0.9s' }} />
        <circle cx="160" cy="160" r="6" fill="#00f0ff" filter="url(#glow)" className="pulse" style={{ animationDelay: '1.2s' }} />
        <circle cx="240" cy="160" r="6" fill="#00f0ff" filter="url(#glow)" className="pulse" style={{ animationDelay: '1.5s' }} />
        <circle cx="140" cy="190" r="5" fill="#3b82f6" filter="url(#glow)" className="pulse" style={{ animationDelay: '1.8s' }} />
        <circle cx="260" cy="190" r="5" fill="#3b82f6" filter="url(#glow)" className="pulse" style={{ animationDelay: '2.1s' }} />
      </g>

      <g id="neuralPulses">
        <circle cx="200" cy="130" r="3" fill="#00f0ff" className="neural-pulse-1" filter="url(#glow)" />
        <circle cx="200" cy="130" r="3" fill="#00f0ff" className="neural-pulse-2" filter="url(#glow)" />
        <circle cx="200" cy="130" r="3" fill="#00f0ff" className="neural-pulse-3" filter="url(#glow)" />
        <circle cx="200" cy="130" r="3" fill="#00f0ff" className="neural-pulse-4" filter="url(#glow)" />
      </g>

      <g id="aiBrain">
        <ellipse cx="200" cy="130" rx="25" ry="28" fill="url(#brainGradient)" opacity="0.3" />

        <path
          d="M 185 120 Q 185 115, 190 115 Q 195 115, 195 120 Q 195 125, 190 125 Q 185 125, 185 120"
          fill="url(#brainGradient)"
          opacity="0.8"
        />
        <path
          d="M 205 120 Q 205 115, 210 115 Q 215 115, 215 120 Q 215 125, 210 125 Q 205 125, 205 120"
          fill="url(#brainGradient)"
          opacity="0.8"
        />

        <path
          d="M 180 135 Q 185 138, 190 135 Q 195 132, 200 135 Q 205 138, 210 135 Q 215 132, 220 135"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 180 142 Q 185 145, 190 142 Q 195 139, 200 142 Q 205 145, 210 142 Q 215 139, 220 142"
          stroke="url(#brainGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
      </g>

      <g id="processorCore">
        <circle cx="200" cy="130" r="12" fill="url(#glowGradient)" className="center-glow" filter="url(#strongGlow)" opacity="0.6" />
        <circle cx="200" cy="130" r="8" fill="#00f0ff" className="pulse" filter="url(#strongGlow)" />

        <circle cx="200" cy="130" r="6" fill="#ffffff" opacity="0.9" />
        <circle cx="198" cy="128" r="2" fill="#00f0ff" className="pulse" />
      </g>

      <g id="processorSquare">
        <rect x="190" y="120" width="20" height="20" fill="none" stroke="#00f0ff" strokeWidth="1.5" opacity="0.4" rx="2" />
        <line x1="190" y1="125" x2="210" y2="125" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
        <line x1="190" y1="130" x2="210" y2="130" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
        <line x1="190" y1="135" x2="210" y2="135" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
        <line x1="195" y1="120" x2="195" y2="140" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
        <line x1="200" y1="120" x2="200" y2="140" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
        <line x1="205" y1="120" x2="205" y2="140" stroke="#00f0ff" strokeWidth="0.5" opacity="0.3" />
      </g>

      <g id="typography">
        <text
          x="200"
          y="270"
          fontFamily="Arial, sans-serif"
          fontSize="32"
          fontWeight="800"
          fill="#1e293b"
          textAnchor="middle"
          letterSpacing="1"
        >
          CHATFORGE
        </text>
        <text
          x="290"
          y="270"
          fontFamily="Arial, sans-serif"
          fontSize="28"
          fontWeight="800"
          fill="url(#brainGradient)"
          textAnchor="start"
          letterSpacing="1"
        >
          AI
        </text>

        <text
          x="200"
          y="295"
          fontFamily="Arial, sans-serif"
          fontSize="10"
          fontWeight="600"
          fill="#64748b"
          textAnchor="middle"
          letterSpacing="3"
        >
          NEURAL CHAT INTELLIGENCE
        </text>
      </g>

      <g id="additionalCircuits">
        <circle cx="135" cy="95" r="2" fill="#3b82f6" opacity="0.4" />
        <circle cx="265" cy="95" r="2" fill="#8b5cf6" opacity="0.4" />
        <circle cx="145" cy="175" r="2" fill="#00f0ff" opacity="0.4" />
        <circle cx="255" cy="175" r="2" fill="#00f0ff" opacity="0.4" />
      </g>
    </svg>
  );
}
