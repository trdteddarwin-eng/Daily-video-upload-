import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.3,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const BankAccountCard: React.FC<{ balance: string; label: string; x: number; glow: boolean }> = ({ balance, label, x, glow }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const slideIn = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  
  const translateY = interpolate(slideIn, [0, 1], [100, 0]);
  
  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: '50%',
      transform: `translate(-50%, -50%) translateY(${translateY}px)`,
      width: 420,
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%)',
        borderRadius: 24,
        padding: 40,
        boxShadow: glow ? `0 0 60px ${ACCENT}80` : '0 20px 40px rgba(0,0,0,0.5)',
        border: glow ? `3px solid ${ACCENT}` : '3px solid #333',
      }}>
        <svg width="80" height="60" style={{ marginBottom: 20 }}>
          <rect x="0" y="0" width="80" height="60" rx="8" fill="#444" />
          <rect x="10" y="10" width="25" height="20" rx="3" fill="#FFD700" />
          <circle cx="15" cy="45" r="3" fill="#666" />
          <circle cx="25" cy="45" r="3" fill="#666" />
          <circle cx="35" cy="45" r="3" fill="#666" />
          <circle cx="45" cy="45" r="3" fill="#666" />
        </svg>
        <div style={{
          ...headline(18, '#888'),
          marginBottom: 10,
          fontSize: 14,
        }}>
          {label}
        </div>
        <div style={{
          ...headline(48, glow ? ACCENT : WHITE),
          fontWeight: 900,
        }}>
          {balance}
        </div>
      </div>
    </div>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ 
          position: 'absolute', 
          top: 180, 
          width: '90%',
          opacity: titleOpacity,
        }}>
          <h1 style={{
            ...headline(52, WHITE),
            marginBottom: 20,
            padding: '0 40px',
          }}>
            $2,467
          </h1>
          <p style={{
            ...headline(24, ACCENT),
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '0.05em',
            padding: '0 60px',
          }}>
            THE EXACT AMOUNT MILLIONAIRES KEEP IN CHECKING
          </p>
        </div>
        
        <BankAccountCard 
          balance="$8,234"
          label="Your Checking"
          x={270}
          glow={false}
        />
        
        <BankAccountCard 
          balance="$2,467"
          label="Millionaire Checking"
          x={810}
          glow={true}
        />
        
        <div style={{
          position: 'absolute',
          bottom: 200,
          width: '100%',
          textAlign: 'center',
        }}>
          <div style={{
            ...headline(20, WHITE),
            fontSize: 18,
            opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}>
            THEY'RE DOING THE OPPOSITE
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const billsAppear = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 60 },
  });
  
  const dustAppear = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const webAppear = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  const counterValue = Math.floor(interpolate(frame, [140, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  
  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: 150, width: '90%' }}>
          <h2 style={{
            ...headline(42, BLACK),
            padding: '0 40px',
            marginBottom: 10,
          }}>
            DEAD MONEY
          </h2>
          <p style={{
            ...headline(20, ACCENT),
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '0.05em',
            padding: '0 60px',
          }}>
            3.2 MONTHS EXPENSES EARNING NOTHING
          </p>
        </div>
        
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${billsAppear})`,
          width: 500,
          height: 400,
          background: 'rgba(255,255,255,0.9)',
          border: '4px solid #333',
          borderRadius: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute',
            top: 20,
            ...headline(16, '#666'),
            fontSize: 14,
          }}>
            CHECKING ACCOUNT
          </div>
          
          <div style={{
            position: 'absolute',
            top: 60,
            ...headline(32, ACCENT),
            fontWeight: 900,
          }}>
            0.01%
          </div>
          
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} width="120" height="60" style={{ 
              position: 'absolute',
              top: 140 + i * 15,
              left: 190 - i * 5,
              opacity: billsAppear,
            }}>
              <rect x="0" y="0" width="120" height="60" rx="4" fill="#85BB65" stroke="#5A8A45" strokeWidth="2" />
              <circle cx="20" cy="30" r="8" fill="#5A8A45" />
              <rect x="40" y="20" width="60" height="8" rx="2" fill="#5A8A45" />
              <rect x="40" y="32" width="40" height="6" rx="2" fill="#5A8A45" />
            </svg>
          ))}
          
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{
              position: 'absolute',
              left: 80 + (i % 4) * 100,
              top: 150 + Math.floor(i / 4) * 80,
              fontSize: 32,
              opacity: dustAppear * 0.3,
            }}>
              •
            </div>
          ))}
          
          <svg width="200" height="80" style={{
            position: 'absolute',
            bottom: 20,
            opacity: webAppear * 0.4,
          }}>
            <path d="M 20 20 Q 40 10 60 20 Q 80 30 100 20 Q 120 10 140 20" stroke="#999" strokeWidth="1" fill="none" />
            <path d="M 30 40 Q 50 30 70 40 Q 90 50 110 40 Q 130 30 150 40" stroke="#999" strokeWidth="1" fill="none" />
            <circle cx="20" cy="20" r="2" fill="#999" />
            <circle cx="60" cy="20" r="2" fill="#999" />
            <circle cx="100" cy="20" r="2" fill="#999" />
            <circle cx="140" cy="20" r="2" fill="#999" />
          </svg>
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: 200,
          width: 600,
          background: 'rgba(0,0,0,0.85)',
          padding: 30,
          borderRadius: 16,
          opacity: interpolate(frame, [140, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}>
          <div style={{
            ...headline(16, '#999'),
            fontSize: 14,
            marginBottom: 10,
          }}>
            YEARLY INTEREST ON $10,000
          </div>
          <div style={{
            ...headline(56, ACCENT),
            fontWeight: 900,
          }}>
            ${counterValue}
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const beltProgress = interpolate(frame, [30, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  const checkingScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  
  const savingsScale = spring({
    frame: frame - 100,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  
  const investScale = spring({
    frame: frame - 140,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  
  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: 140, width: '90%' }}>
          <h2 style={{
            ...headline(44, WHITE),
            padding: '0 40px',
          }}>
            THE MILLIONAIRE SYSTEM
          </h2>
          <p style={{
            ...headline(20, ACCENT),
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '0.05em',
            padding: '0 60px',
            marginTop: 10,
          }}>
            KEEP MOVING, KEEP EARNING
          </p>
        </div>
        
        <svg width="900" height="200" style={{ position: 'absolute', top: 700 }}>
          <rect x="50" y="95" width={800 * beltProgress} height="10" fill="#444" />
          <rect x="50" y="95" width="800" height="10" fill="none" stroke="#666" strokeWidth="2" strokeDasharray="10,5" />
        </svg>
        
        {[0, 1, 2].map((i) => {
          const billX = interpolate(beltProgress, [0, 0.3], [50, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <svg key={`small-${i}`} width="60" height="30" style={{ 
              position: 'absolute',
              left: billX - i * 15,
              top: 780,
              opacity: beltProgress > 0.05 ? 1 : 0,
            }}>
              <rect x="0" y="0" width="60" height="30" rx="3" fill="#85BB65" stroke="#5A8A45" strokeWidth="2" />
              <text x="30" y="20" textAnchor="middle" fill="#5A8A45" fontSize="14" fontWeight="bold">$</text>
            </svg>
          );
        })}
        
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const billX = interpolate(beltProgress, [0.3, 1], [200, 850], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <svg key={`large-${i}`} width="60" height="30" style={{ 
              position: 'absolute',
              left: billX - i * 15,
              top: 780,
              opacity: beltProgress > 0.3 ? 1 : 0,
            }}>
              <rect x="0" y="0" width="60" height="30" rx="3" fill="#85BB65" stroke="#5A8A45" strokeWidth="2" />
              <text x="30" y="20" textAnchor="middle" fill="#5A8A45" fontSize="14" fontWeight="bold">$</text>
            </svg>
          );
        })}
        
        <div style={{
          position: 'absolute',
          left: 120,
          top: 1000,
          transform: `scale(${checkingScale})`,
        }}>
          <svg width="120" height="120">
            <rect x="10" y="30" width="100" height="70" rx="8" fill="#333" stroke={WHITE} strokeWidth="3" />
            <rect x="30" y="50" width="60" height="30" rx="4" fill={WHITE} />
            <text x="60" y="72" textAnchor="middle" fill="#333" fontSize="16" fontWeight="bold">CHK</text>
          </svg>
          <div style={{
            ...headline(14, WHITE),
            marginTop: 10,
            fontSize: 12,
          }}>
            CHECKING
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          left: 480,
          top: 1000,
          transform: `scale(${savingsScale})`,
        }}>
          <svg width="120" height="120">
            <circle cx="60" cy="60" r="45" fill={ACCENT} opacity="0.2" />
            <circle cx="60" cy="60" r="35" fill={ACCENT} opacity="0.4" />
            <circle cx="60" cy="60" r="25" fill={ACCENT} />
            <text x="60" y="70" textAnchor="middle" fill={BLACK} fontSize="24" fontWeight="bold">%</text>
          </svg>
          <div style={{
            ...headline(14, ACCENT),
            marginTop: 10,
            fontSize: 12,
          }}>
            HIGH-YIELD
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          left: 840,
          top: 1000,
          transform: `scale(${investScale})`,
        }}>
          <svg width="120" height="120">
            <path d="M 20 90 L 35 70 L 50 75 L 65 50 L 80 55 L 95 25" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="35" cy="70" r="6" fill={ACCENT} />
            <circle cx="50" cy="75" r="6" fill={ACCENT} />
            <circle cx="65" cy="50" r="6" fill={ACCENT} />
            <circle cx="80" cy="55" r="6" fill={ACCENT} />
            <circle cx="95" cy="25" r="6" fill={ACCENT} />
          </svg>
          <div style={{
            ...headline(14, ACCENT),
            marginTop: 10,
            fontSize: 12,
          }}>
            INVESTED
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const sadPiggyScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 70 },
  });
  
  const happyPiggyScale = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 70 },
  });
  
  const sadAmount = Math.floor(interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const happyAmount = Math.floor(interpolate(frame, [100, 140], [0, 530], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  
  const floatAnimation = Math.sin(frame / 15) * 10;
  
  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: 140, width: '90%' }}>
          <h2 style={{
            ...headline(48, BLACK),
            padding: '0 40px',
          }}>
            5.3% VS 0.01%
          </h2>
          <p style={{
            ...headline(22, ACCENT),
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '0.05em',
            padding: '0 60px',
            marginTop: 10,
          }}>
            ON $10,000 PER YEAR
          </p>
        </div>
        
        <div style={{
          position: 'absolute',
          left: 200,
          top: 650,
          transform: `scale(${sadPiggyScale})`,
        }}>
          <svg width="200" height="180">
            <ellipse cx="100" cy="120" rx="80" ry="60" fill="#FFB6C1" />
            <ellipse cx="100" cy="110" rx="70" ry="50" fill="#FFC0CB" />
            <circle cx="75" cy="100" r="8" fill="#333" />
            <circle cx="125" cy="100" r="8" fill="#333" />
            <ellipse cx="50" cy="90" rx="25" ry="20" fill="#FFB6C1" />
            <ellipse cx="150" cy="90" rx="25" ry="20" fill="#FFB6C1" />
            <ellipse cx="100" cy="125" rx="15" ry="10" fill="#FF69B4" />
            <circle cx="90" cy="120" r="3" fill="#333" />
            <circle cx="110" cy="120" r="3" fill="#333" />
            <path d="M 85 135 Q 100 130 115 135" stroke="#333" strokeWidth="3" fill="none" />
            <rect x="70" y="50" width="60" height="8" rx="4" fill="#DAA520" />
          </svg>
          <div style={{
            position: 'absolute',
            top: -60 + floatAnimation,
            left: '50%',
            transform: 'translateX(-50%)',
            ...headline(32, '#666'),
            fontWeight: 900,
          }}>
            ${sadAmount}
          </div>
          <div style={{
            ...headline(16, '#666'),
            marginTop: 10,
            fontSize: 14,
          }}>
            REGULAR CHECKING
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          left: 680,
          top: 650,
          transform: `scale(${happyPiggyScale})`,
        }}>
          <svg width="200" height="180">
            <ellipse cx="100" cy="120" rx="80" ry="60" fill={ACCENT} opacity="0.3" />
            <ellipse cx="100" cy="110" rx="70" ry="50" fill={ACCENT} opacity="0.5" />
            <ellipse cx="100" cy="110" rx="60" ry="45" fill={ACCENT} />
            <circle cx="75" cy="100" r="8" fill="#333" />
            <circle cx="125" cy="100" r="8" fill="#333" />
            <ellipse cx="50" cy="90" rx="25" ry="20" fill={ACCENT} opacity="0.8" />
            <ellipse cx="150" cy="90" rx="25" ry="20" fill={ACCENT} opacity="0.8" />
            <ellipse cx="100" cy="125" rx="15" ry="10" fill="#D97706" />
            <circle cx="90" cy="120" r="3" fill="#333" />
            <circle cx="110" cy="120" r="3" fill="#333" />
            <path d="M 80 135 Q 100 145 120 135" stroke="#333" strokeWidth="3" fill="none" />
            <rect x="70" y="50" width="60" height="8" rx="4" fill="#FFD700" />
          </svg>
          <div style={{
            position: 'absolute',
            top: -60 - floatAnimation,
            left: '50%',
            transform: 'translateX(-50%)',
            ...headline(56, ACCENT),
            fontWeight: 900,
          }}>
            ${happyAmount}
          </div>
          <div style={{
            ...headline(16, ACCENT),
            marginTop: 10,
            fontSize: 14,
          }}>
            HIGH-YIELD 5.3%
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: 180,
          width: '80%',
          background: 'rgba(0,0,0,0.9)',
          padding: 30,
          borderRadius: 16,
          opacity: interpolate(frame, [160, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}>
          <div style={{
            ...headline(28, ACCENT),
            fontWeight: 900,
          }}>
            529X MORE INTEREST
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const bucket1Fill = interpolate(frame, [30, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bucket2Fill = interpolate(frame, [80, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bucket3Fill = interpolate(frame, [140, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  const bucket1Scale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  
  const bucket2Scale = spring({
    frame: frame - 70,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  
  const bucket3Scale = spring({
    frame: frame - 130,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  
  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: 120, width: '90%' }}>
          <h2 style={{
            ...headline(46, WHITE),
            padding: '0 40px',
          }}>
            THE WEALTH FORMULA
          </h2>
          <p style={{
            ...headline(20, ACCENT),
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '0.05em',
            padding: '0 60px',
            marginTop: 10,
          }}>
            THREE BUCKETS TO FINANCIAL FREEDOM
          </p>
        </div>
        
        <div style={{
          position: 'absolute',
          left: 120,
          top: 600,
          transform: `scale(${bucket1Scale})`,
        }}>
          <svg width="220" height="280">
            <path d="M 60 80 L 40 240 L 180 240 L 160 80 Z" fill="#2A2A2A" stroke={WHITE} strokeWidth="3" />
            <rect x="40" y={240 - (bucket1Fill * 160)} width="140" height={bucket1Fill * 160} fill={ACCENT} opacity="0.6" />
            <ellipse cx="110" cy="80" rx="55" ry="15" fill="#1A1A1A" stroke={WHITE} strokeWidth="3" />
          </svg>
          <div style={{
            ...headline(18, WHITE),
            marginTop: 10,
            fontSize: 14,
            width: 220,
          }}>
            1 MONTH
          </div>
          <div style={{
            ...headline(14, '#999'),
            marginTop: 5,
            fontSize: 12,
            width: 220,
          }}>
            CHECKING
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          left: 420,
          top: 540,
          transform: `scale(${bucket2Scale})`,
        }}>
          <svg width="260" height="340">
            <path d="M 60 80 L 30 320 L 230 320 L 200 80 Z" fill="#2A2A2A" stroke={ACCENT} strokeWidth="3" />
            <rect x="30" y={320 - (bucket2Fill * 240)} width="200" height={bucket2Fill * 240} fill={ACCENT} opacity="0.8" />
            <ellipse cx="130" cy="80" rx="75" ry="18" fill="#1A1A1A" stroke={ACCENT} strokeWidth="3" />
          </svg>
          <div style={{
            ...headline(18, ACCENT),
            marginTop: 10,
            fontSize: 14,
            width: 260,
          }}>
            3-6 MONTHS
          </div>
          <div style={{
            ...headline(14, ACCENT),
            marginTop: 5,
            fontSize: 12,
            width: 260,
          }}>
            HIGH-YIELD 5.3%
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          left: 760,
          top: 480,
          transform: `scale(${bucket3Scale})`,
        }}>
          <svg width="280" height="400">
            <path d="M 70 80 L 20 400 L 260 400 L 210 80 Z" fill="#2A2A2A" stroke={ACCENT} strokeWidth="4" />
            <defs>
              <linearGradient id="investGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="1" />
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <rect x="20" y={400 - (bucket3Fill * 320)} width="240" height={bucket3Fill * 320} fill="url(#investGradient)" />
            <ellipse cx="140" cy="80" rx="75" ry="20" fill="#1A1A1A" stroke={ACCENT} strokeWidth="4" />
          </svg>
          <div style={{
            ...headline(18, ACCENT),
            marginTop: 10,
            fontSize: 14,
            width: 280,
          }}>
            EVERYTHING ELSE
          </div>
          <div style={{
            ...headline(14, ACCENT),
            marginTop: 5,
            fontSize: 12,
            width: 280,
          }}>
            INVESTED
          </div>
        </div>
        
        {[...Array(8)].map((_, i) => {
          const coinDelay = 30 + i * 5;
          const coinY = interpolate(frame, [coinDelay, coinDelay + 40], [-50, 240], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <svg key={`coin1-${i}`} width="30" height="30" style={{
              position: 'absolute',
              left: 170 + (i % 3) * 20,
              top: 600 + coinY,
              opacity: frame > coinDelay ? 1 : 0,
            }}>
              <circle cx="15" cy="15" r="14" fill={ACCENT} stroke="#D97706" strokeWidth="2" />
              <text x="15" y="20" textAnchor="middle" fill={BLACK} fontSize="16" fontWeight="bold">$</text>
            </svg>
          );
        })}
        
        {[...Array(12)].map((_, i) => {
          const coinDelay = 80 + i * 4;
          const coinY = interpolate(frame, [coinDelay, coinDelay + 50], [-50, 320], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <svg key={`coin2-${i}`} width="30" height="30" style={{
              position: 'absolute',
              left: 480 + (i % 4) * 25,
              top: 540 + coinY,
              opacity: frame > coinDelay ? 1 : 0,
            }}>
              <circle cx="15" cy="15" r="14" fill={ACCENT} stroke="#D97706" strokeWidth="2" />
              <text x="15" y="20" textAnchor="middle" fill={BLACK} fontSize="16" fontWeight="bold">$</text>
            </svg>
          );
        })}
        
        {[...Array(20)].map((_, i) => {
          const coinDelay = 140 + i * 3;
          const coinY = interpolate(frame, [coinDelay, coinDelay + 60], [-50, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          return (
            <svg key={`coin3-${i}`} width="30" height="30" style={{
              position: 'absolute',
              left: 820 + (i % 5) * 25,
              top: 480 + coinY,
              opacity: frame > coinDelay ? 1 : 0,
            }}>
              <circle cx="15" cy="15" r="14" fill={ACCENT} stroke="#D97706" strokeWidth="2" />
              <text x="15" y="20" textAnchor="middle" fill={BLACK} fontSize="16" fontWeight="bold">$</text>
            </svg>
          );
        })}
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const bankScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 70 },
  });
  
  const personScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 70 },
  });
  
  const moneyFlow = interpolate(frame, [40, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  const transformScale = spring({
    frame: frame - 110,
    fps,
    config: { damping: 10, stiffness: 60 },
  });
  
  const empoweredPersonScale = spring({
    frame: frame - 130,
    fps,
    config: { damping: 10, stiffness: 70 },
  });
  
  const ctaOpacity = interpolate(frame, [170, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({
    frame: frame - 170,
    fps,
    config: { damping: 8, stiffness: 60 },
  });
  
  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: 120, width: '90%' }}>
          <h2 style={{
            ...headline(48, BLACK),
            padding: '0 40px',
          }}>
            STOP LETTING BANKS WIN
          </h2>
        </div>
        
        <div style={{
          position: 'absolute',
          left: 150,
          top: 400,
          transform: `scale(${bankScale})`,
          opacity: interpolate(frame, [0, 110], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}>
          <svg width="200" height="180">
            <rect x="20" y="80" width="160" height="100" fill="#333" />
            <rect x="40" y="100" width="40" height="50" fill="#555" stroke="#777" strokeWidth="2" />
            <rect x="120" y="100" width="40" height="50" fill="#555" stroke="#777" strokeWidth="2" />
            <polygon points="100,20 10,80 190,80" fill="#444" />
            <rect x="85" y="120" width="30" height="40" fill="#222" />
            <circle cx="100" cy="50" r="15" fill="#FFD700" />
            <text x="100" y="58" textAnchor="middle" fill="#333" fontSize="20" fontWeight="bold">$</text>
          </svg>
          <div style={{
            ...headline(14, '#333'),
            marginTop: 10,
            fontSize: 12,
          }}>
            YOUR BANK
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          left: 700,
          top: 420,
          transform: `scale(${personScale})`,
          opacity: interpolate(frame, [0, 110], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}>
          <svg width="140" height="200">
            <circle cx="70" cy="40" r="30" fill="#666" />
            <path d="M 70 70 L 40 120 L 40 160" stroke="#666" strokeWidth="20" strokeLinecap="round" />
            <path d="M 70 70 L 100 120 L 100 160" stroke="#666" strokeWidth="20" strokeLinecap="round" />
            <ellipse cx="70" cy="95" rx="45" ry="55" fill="#888" />
            <path d="M 50 55 Q 70 65 90 55" stroke="#333" strokeWidth="3" fill="none" />
          </svg>
          <div style={{
            ...headline(14, '#666'),
            marginTop: 10,
            fontSize: 12,
          }}>
            YOU
          </div>
        </div>
        
        {[0, 1, 2, 3, 4].map((i) => {
          const billX = interpolate(moneyFlow, [0, 1], [700, 150], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const billDelay = i * 0.1;
          const adjustedProgress = Math.max(0, moneyFlow - billDelay);
          return (
            <svg key={i} width="50" height="25" style={{
              position: 'absolute',
              left: interpolate(adjustedProgress, [0, 1], [700, 150], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              top: 520 - i * 8,
              opacity: moneyFlow > billDelay ? 1 : 0,
            }}>
              <rect x="0" y="0" width="50" height="25" rx="3" fill="#85BB65" stroke="#5A8A45" strokeWidth="2" />
              <text x="25" y="17" textAnchor="middle" fill="#5A8A45" fontSize="12" fontWeight="bold">$</text>
            </svg>
          );
        })}
        
        <div style={{
          position: 'absolute',
          left: 200,
          top: 700,
          transform: `scale(${empoweredPersonScale})`,
          opacity: transformScale,
        }}>
          <svg width="200" height="220">
            <circle cx="100" cy="50" r="35" fill={ACCENT} />
            <path d="M 100 85 L 60 140 L 60 190" stroke={ACCENT} strokeWidth="25" strokeLinecap="round" />
            <path d="M 100 85 L 140 140 L 140 190" stroke={ACCENT} strokeWidth="25" strokeLinecap="round" />
            <ellipse cx="100" cy="115" rx="55" ry="65" fill={ACCENT} opacity="0.8" />
            <circle cx="85" cy="45" r="5" fill={BLACK} />
            <circle cx="115" cy="45" r="5" fill={BLACK} />
            <path d="M 80 60 Q 100 70 120 60" stroke={BLACK} strokeWidth="3" fill="none" />
            <path d="M 60 100 L 30 110 L 35 140" stroke={ACCENT} strokeWidth="20" strokeLinecap="round" />
            <circle cx="25" cy="145" r="12" fill="#FFD700" />
            <text x="25" y="152" textAnchor="middle" fill={BLACK} fontSize="16" fontWeight="bold">$</text>
          </svg>
          <div style={{
            ...headline(16, ACCENT),
            marginTop: 10,
            fontSize: 14,
          }}>
            EMPOWERED YOU
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          left: 600,
          top: 750,
          transform: `scale(${empoweredPersonScale})`,
          opacity: transformScale,
        }}>
          <svg width="300" height="140">
            <rect x="20" y="20" width="260" height="100" rx="12" fill={ACCENT} opacity="0.2" />
            <rect x="30" y="30" width="240" height="80" rx="8" fill={ACCENT} opacity="0.4" />
            <text x="150" y="80" textAnchor="middle" fill={BLACK} fontSize="32" fontWeight="bold">5.3%</text>
          </svg>
          <div style={{
            ...headline(14, ACCENT),
            marginTop: 10,
            fontSize: 12,
          }}>
            HIGH-YIELD ACCOUNT
          </div>
        </div>
        
        <div style={{
          position: 'absolute',
          bottom: 150,
          width: '85%',
          background: ACCENT,
          padding: 40,
          borderRadius: 20,
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
        }}>
          <div style={{
            ...headline(44, BLACK),
            fontWeight: 900,
          }}>
            MAKE YOUR MONEY WORK
          </div>
          <div style={{
            ...headline(18, BLACK),
            marginTop: 15,
            fontSize: 16,
            fontFamily: 'Arial, sans-serif',
            letterSpacing: '0.08em',
          }}>
            MOVE IT TODAY • THINK LIKE THE WEALTHY
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}>
          <Scene1 dur={225} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene2 dur={225} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene3 dur={225} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene4 dur={225} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene5 dur={225} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene6 dur={225} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}