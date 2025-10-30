interface AILogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'minimal';
}

export default function AILogo({ className = "w-12 h-12", variant = 'full' }: AILogoProps) {
  const showDetails = variant === 'full';
  const showMediumDetails = variant === 'full' || variant === 'compact';

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AI Chatbot Logo"
    >
      <title>AI Chatbot Company Logo</title>

      <defs>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
        </linearGradient>

        <radialGradient id="glowGradient" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="softGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }

        @keyframes neuralPulse {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes centerGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .pulse {
          animation: pulse 2.5s ease-in-out infinite;
          transform-origin: center;
        }

        .neural-pulse {
          animation: neuralPulse 2s ease-in-out infinite;
        }

        .center-glow {
          animation: centerGlow 2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .pulse, .neural-pulse, .center-glow {
            animation: none;
          }
        }
      `}</style>

      <g id="chatBubbleContainer">
        <path
          d="M 20 30 Q 20 15, 35 15 L 65 15 Q 80 15, 80 30 L 80 55 Q 80 70, 65 70 L 55 70 L 50 80 L 45 70 L 35 70 Q 20 70, 20 55 Z"
          fill="url(#chatGradient)"
          stroke="url(#brainGradient)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </g>

      {showDetails && (
        <g id="binaryBackground" opacity="0.15">
          <text x="28" y="28" fill="#06b6d4" fontSize="6" fontFamily="monospace">01</text>
          <text x="62" y="32" fill="#8b5cf6" fontSize="6" fontFamily="monospace">10</text>
          <text x="32" y="62" fill="#3b82f6" fontSize="6" fontFamily="monospace">11</text>
          <text x="58" y="58" fill="#06b6d4" fontSize="6" fontFamily="monospace">01</text>
        </g>
      )}

      {showMediumDetails && (
        <g id="circuitLines" opacity="0.4">
          <line x1="35" y1="35" x2="42" y2="35" stroke="#06b6d4" strokeWidth="1.5" />
          <line x1="42" y1="35" x2="42" y2="42" stroke="#06b6d4" strokeWidth="1.5" />
          <line x1="58" y1="35" x2="65" y2="35" stroke="#8b5cf6" strokeWidth="1.5" />
          <line x1="58" y1="35" x2="58" y2="42" stroke="#8b5cf6" strokeWidth="1.5" />
          <line x1="42" y1="50" x2="42" y2="58" stroke="#3b82f6" strokeWidth="1.5" />
          <line x1="58" y1="50" x2="58" y2="58" stroke="#3b82f6" strokeWidth="1.5" />
        </g>
      )}

      <g id="neuralNetwork">
        <line x1="50" y1="45" x2="35" y2="32" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5" />
        <line x1="50" y1="45" x2="65" y2="32" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5" />
        <line x1="50" y1="45" x2="35" y2="58" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" />
        <line x1="50" y1="45" x2="65" y2="58" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.5" />

        {showMediumDetails && (
          <>
            <line x1="35" y1="32" x2="28" y2="25" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
            <line x1="65" y1="32" x2="72" y2="25" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
            <line x1="35" y1="58" x2="30" y2="65" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
            <line x1="65" y1="58" x2="70" y2="65" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
          </>
        )}

        <circle cx="50" cy="45" r="4" fill="url(#brainGradient)" filter="url(#softGlow)" className="pulse" />
        <circle cx="35" cy="32" r="3" fill="#06b6d4" filter="url(#softGlow)" className="pulse" style={{ animationDelay: '0.3s' }} />
        <circle cx="65" cy="32" r="3" fill="#3b82f6" filter="url(#softGlow)" className="pulse" style={{ animationDelay: '0.6s' }} />
        <circle cx="35" cy="58" r="3" fill="#3b82f6" filter="url(#softGlow)" className="pulse" style={{ animationDelay: '0.9s' }} />
        <circle cx="65" cy="58" r="3" fill="#8b5cf6" filter="url(#softGlow)" className="pulse" style={{ animationDelay: '1.2s' }} />

        {showMediumDetails && (
          <>
            <circle cx="28" cy="25" r="2" fill="#06b6d4" opacity="0.6" className="pulse" style={{ animationDelay: '1.5s' }} />
            <circle cx="72" cy="25" r="2" fill="#06b6d4" opacity="0.6" className="pulse" style={{ animationDelay: '1.8s' }} />
            <circle cx="30" cy="65" r="2" fill="#3b82f6" opacity="0.6" className="pulse" style={{ animationDelay: '2.1s' }} />
            <circle cx="70" cy="65" r="2" fill="#8b5cf6" opacity="0.6" className="pulse" style={{ animationDelay: '2.4s' }} />
          </>
        )}
      </g>

      <g id="aiBrain">
        <ellipse cx="50" cy="45" rx="12" ry="14" fill="url(#brainGradient)" opacity="0.25" />

        <path
          d="M 42 40 Q 42 37, 44 37 Q 46 37, 46 40 Q 46 43, 44 43 Q 42 43, 42 40"
          fill="url(#brainGradient)"
          opacity="0.7"
        />
        <path
          d="M 54 40 Q 54 37, 56 37 Q 58 37, 58 40 Q 58 43, 56 43 Q 54 43, 54 40"
          fill="url(#brainGradient)"
          opacity="0.7"
        />

        <path
          d="M 40 48 Q 43 50, 46 48 Q 49 46, 50 48 Q 51 50, 54 48 Q 57 46, 60 48"
          stroke="url(#brainGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M 40 52 Q 43 54, 46 52 Q 49 50, 50 52 Q 51 54, 54 52 Q 57 50, 60 52"
          stroke="url(#brainGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />
      </g>

      <g id="processorCore">
        <circle cx="50" cy="45" r="8" fill="url(#glowGradient)" className="center-glow" filter="url(#glow)" opacity="0.5" />
        <circle cx="50" cy="45" r="5" fill="#06b6d4" className="pulse" filter="url(#glow)" opacity="0.9" />
        <circle cx="50" cy="45" r="3.5" fill="#ffffff" opacity="0.95" />
        <circle cx="49" cy="44" r="1.2" fill="#06b6d4" />
      </g>

      <g id="processorGrid" opacity="0.3">
        <rect x="45" y="40" width="10" height="10" fill="none" stroke="#06b6d4" strokeWidth="1" rx="1" />
        <line x1="45" y1="43" x2="55" y2="43" stroke="#06b6d4" strokeWidth="0.5" />
        <line x1="45" y1="45" x2="55" y2="45" stroke="#06b6d4" strokeWidth="0.5" />
        <line x1="45" y1="47" x2="55" y2="47" stroke="#06b6d4" strokeWidth="0.5" />
        <line x1="48" y1="40" x2="48" y2="50" stroke="#06b6d4" strokeWidth="0.5" />
        <line x1="50" y1="40" x2="50" y2="50" stroke="#06b6d4" strokeWidth="0.5" />
        <line x1="52" y1="40" x2="52" y2="50" stroke="#06b6d4" strokeWidth="0.5" />
      </g>

      {showDetails && (
        <g id="dataParticles">
          <circle cx="50" cy="45" r="1.5" fill="#06b6d4" className="neural-pulse" style={{ animationDelay: '0s' }}>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -15,-13; -15,-13"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50" cy="45" r="1.5" fill="#3b82f6" className="neural-pulse" style={{ animationDelay: '0.5s' }}>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 15,-13; 15,-13"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50" cy="45" r="1.5" fill="#8b5cf6" className="neural-pulse" style={{ animationDelay: '1s' }}>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; 15,13; 15,13"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="50" cy="45" r="1.5" fill="#06b6d4" className="neural-pulse" style={{ animationDelay: '1.5s' }}>
            <animateTransform
              attributeName="transform"
              type="translate"
              values="0,0; -15,13; -15,13"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      )}
    </svg>
  );
}
