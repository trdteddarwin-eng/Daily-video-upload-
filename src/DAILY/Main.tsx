import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0A0A0A';
const BG_LIGHT = '#F7F7F7';
const ACCENT = '#10B981';
const WHITE = '#F5F5F5';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.1,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneIn = spring({ frame, fps, config: { damping: 14, stiffness: 160 } });
  const titleIn = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 140 } });
  const statIn = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 10, stiffness: 200 } });

  const dollars = [
    { x: 430, delay: 20 },
    { x: 540, delay: 38 },
    { x: 650, delay: 54 },
    { x: 490, delay: 12 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 220, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [50, 0])}px)`,
        }}>
          <p style={headline(84, ACCENT)}>THE 2-MINUTE</p>
          <p style={{ ...headline(84, WHITE), marginTop: 10 }}>MONEY TRICK</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          <g transform={`translate(540,960) scale(${phoneIn * 2.8})`}>
            <rect x="-55" y="-100" width="110" height="200" rx="14" ry="14" fill={ACCENT} />
            <rect x="-46" y="-88" width="92" height="168" rx="9" ry="9" fill="#0a1628" />
            <circle cx="0" cy="86" r="10" fill={ACCENT} opacity="0.5" />
            <rect x="-18" y="-96" width="36" height="5" rx="2" fill="#000" opacity="0.3" />
            <text x="0" y="12" textAnchor="middle" fontFamily="Arial Black" fontSize="52" fill={ACCENT}>$</text>
          </g>
          {dollars.map((d, i) => {
            const df = Math.max(0, frame - d.delay);
            const yPos = interpolate(df, [0, 85], [1080, 720], { extrapolateRight: 'clamp' });
            const op = interpolate(df, [0, 12, 65, 85], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
            return (
              <text key={i} x={d.x} y={yPos} textAnchor="middle"
                fontFamily="Arial Black" fontSize="56" fill={ACCENT} opacity={op}>$</text>
            );
          })}
        </svg>

        <div style={{
          position: 'absolute', bottom: 300, left: 0, right: 0, textAlign: 'center',
          opacity: statIn, transform: `scale(${statIn})`,
        }}>
          <p style={headline(128, WHITE)}>$1,400</p>
          <p style={{ ...headline(48, ACCENT), marginTop: 8 }}>SAVED PER YEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const personIn = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 150 } });
  const badgeIn = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 11, stiffness: 190 } });
  const statIn = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 10, stiffness: 200 } });

  const pct = Math.round(interpolate(frame, [55, 115], [0, 40], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  }));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 220, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(72, '#111')}>SECRET</p>
          <p style={{ ...headline(72, ACCENT), marginTop: 8 }}>RETENTION DEPT</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          <g transform={`translate(540,920) scale(${personIn * 1.7})`}>
            <circle cx="0" cy="-110" r="52" fill="#666" />
            <rect x="-58" y="-54" width="116" height="130" rx="12" fill="#666" />
            <path d="M -54,-110 Q 0,-178 54,-110" stroke={ACCENT} strokeWidth="8" fill="none" />
            <circle cx="-56" cy="-108" r="13" fill={ACCENT} />
            <circle cx="56" cy="-108" r="13" fill={ACCENT} />
            <path d="M -56,-95 L -70,-58 L -58,-58" stroke={ACCENT} strokeWidth="6" fill="none" />
            <circle cx="-58" cy="-56" r="9" fill={ACCENT} />
            <rect x="-120" y="78" width="240" height="10" rx="4" fill="#999" />
          </g>
          <g transform={`translate(760,740) scale(${badgeIn})`}>
            <rect x="-100" y="-52" width="200" height="104" rx="16" fill={ACCENT} />
            <text x="0" y="-12" textAnchor="middle" fontFamily="Arial Black" fontSize="22" fill="#fff">YOUR BILL</text>
            <text x="0" y="24" textAnchor="middle" fontFamily="Arial Black" fontSize="28" fill="#fff">-{pct}% OFF</text>
          </g>
        </svg>

        <div style={{
          position: 'absolute', bottom: 290, left: 0, right: 0, textAlign: 'center',
          opacity: statIn, transform: `scale(${statIn})`,
        }}>
          <p style={headline(120, '#111')}>40%</p>
          <p style={{ ...headline(44, ACCENT), marginTop: 4 }}>DISCOUNT AVAILABLE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });

  const items = [
    { label: 'CABLE & INTERNET', amount: '$340/YR', delay: 20 },
    { label: 'INSURANCE', amount: '$280/YR', delay: 55 },
    { label: 'GYM', amount: '$180/YR', delay: 90 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 200, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(78, WHITE)}>3 BILLS TO</p>
          <p style={{ ...headline(78, ACCENT), marginTop: 8 }}>NEGOTIATE NOW</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          {items.map((item, i) => {
            const itemIn = spring({ frame: Math.max(0, frame - item.delay), fps, config: { damping: 13, stiffness: 160 } });
            const yPos = 640 + i * 320;
            return (
              <g key={i} transform={`translate(540,${yPos}) scale(${itemIn})`}>
                <rect x="-400" y="-75" width="800" height="150" rx="20" fill="#1a1a1a" />
                <rect x="-400" y="-75" width="8" height="150" rx="4" fill={ACCENT} />
                {i === 0 && (
                  <g transform="translate(-300,0)">
                    <rect x="-40" y="-28" width="80" height="56" rx="6" fill={ACCENT} />
                    <rect x="-28" y="-20" width="12" height="12" rx="2" fill="#000" opacity="0.5" />
                    <rect x="-8" y="-20" width="12" height="12" rx="2" fill="#000" opacity="0.5" />
                    <rect x="12" y="-20" width="12" height="12" rx="2" fill="#000" opacity="0.5" />
                    <circle cx="0" cy="12" r="8" fill="#000" opacity="0.4" />
                  </g>
                )}
                {i === 1 && (
                  <g transform="translate(-300,0)">
                    <path d="M 0,-42 L 36,-20 L 36,16 Q 36,46 0,58 Q -36,46 -36,16 L -36,-20 Z" fill={ACCENT} />
                    <path d="M -13,2 L -4,14 L 15,-10" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
                  </g>
                )}
                {i === 2 && (
                  <g transform="translate(-300,0)">
                    <rect x="-46" y="-8" width="92" height="16" rx="8" fill={ACCENT} />
                    <rect x="-52" y="-24" width="16" height="48" rx="6" fill={ACCENT} />
                    <rect x="36" y="-24" width="16" height="48" rx="6" fill={ACCENT} />
                  </g>
                )}
                <text x="-160" y="-14" fontFamily="Arial Black" fontSize="32" fill={WHITE}>{item.label}</text>
                <text x="-160" y="32" fontFamily="Arial Black" fontSize="46" fill={ACCENT}>{item.amount}</text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const bubbleIn = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 12, stiffness: 150 } });
  const badgeIn = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 10, stiffness: 220 } });
  const ctaIn = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 14, stiffness: 140 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 200, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(68, '#111')}>THE MAGIC</p>
          <p style={{ ...headline(68, ACCENT), marginTop: 8 }}>SCRIPT</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          <g transform={`translate(540,900) scale(${bubbleIn})`}>
            <rect x="-440" y="-180" width="880" height="360" rx="40" fill={ACCENT} />
            <polygon points="60,180 160,180 110,260" fill={ACCENT} />
            <text x="0" y="-90" textAnchor="middle" fontFamily="Arial Black" fontSize="38" fill="#fff">"I LOVE THE SERVICE,</text>
            <text x="0" y="-36" textAnchor="middle" fontFamily="Arial Black" fontSize="38" fill="#fff">BUT I NEED TO LOWER</text>
            <text x="0" y="18" textAnchor="middle" fontFamily="Arial Black" fontSize="38" fill="#fff">MY BILLS..."</text>
          </g>
          <g transform={`translate(380,1150) scale(${badgeIn * 1.3})`}>
            <rect x="-30" y="-80" width="60" height="140" rx="30" fill="#444" />
            <rect x="-24" y="-68" width="48" height="20" rx="8" fill="#666" />
            <rect x="-24" y="30" width="48" height="20" rx="8" fill="#666" />
          </g>
          <g transform={`translate(720,1140) scale(${badgeIn})`}>
            <circle cx="0" cy="0" r="88" fill={ACCENT} />
            <text x="0" y="-16" textAnchor="middle" fontFamily="Arial Black" fontSize="30" fill="#fff">9 OUT</text>
            <text x="0" y="22" textAnchor="middle" fontFamily="Arial Black" fontSize="30" fill="#fff">OF 10</text>
          </g>
        </svg>

        <div style={{
          position: 'absolute', bottom: 240, left: 0, right: 0, textAlign: 'center',
          opacity: ctaIn,
          transform: `translateY(${interpolate(ctaIn, [0, 1], [30, 0])}px)`,
        }}>
          <p style={headline(44, '#333')}>TRIGGERS A DISCOUNT EVERY TIME</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const billIn = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 13, stiffness: 150 } });
  const statIn = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 10, stiffness: 200 } });

  const marks = [
    { x: 490, y: 740, delay: 60, good: false },
    { x: 590, y: 800, delay: 76, good: true },
    { x: 510, y: 860, delay: 92, good: false },
    { x: 620, y: 920, delay: 108, good: true },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 200, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(68, WHITE)}>MEDICAL BILLS:</p>
          <p style={{ ...headline(68, ACCENT), marginTop: 8 }}>YOUR BIGGEST WIN</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          <g transform={`translate(540,900) scale(${billIn})`}>
            <rect x="-220" y="-300" width="440" height="560" rx="12" fill="#fff" />
            <polygon points="220,-300 220,-258 178,-300" fill="#ddd" />
            <text x="0" y="-266" textAnchor="middle" fontFamily="Arial Black" fontSize="26" fill="#444">HOSPITAL BILL</text>
            <rect x="-180" y="-238" width="360" height="10" rx="5" fill="#ddd" />
            <rect x="-180" y="-198" width="280" height="10" rx="5" fill="#ddd" />
            <rect x="-180" y="-158" width="320" height="10" rx="5" fill="#ddd" />
            <rect x="-180" y="-118" width="260" height="10" rx="5" fill="#ddd" />
            <rect x="-180" y="-78" width="300" height="10" rx="5" fill="#ddd" />
            <rect x="-180" y="-38" width="240" height="10" rx="5" fill="#ddd" />
            <text x="60" y="160" fontFamily="Arial Black" fontSize="34" fill="#333">$2,847.00</text>
          </g>
          {marks.map((m, i) => {
            const df = Math.max(0, frame - m.delay);
            const markOp = interpolate(df, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
            const markScale = interpolate(df, [0, 10], [0.4, 1], { extrapolateRight: 'clamp' });
            const color = m.good ? '#10B981' : '#EF4444';
            return (
              <g key={i} opacity={markOp} transform={`translate(${m.x},${m.y}) scale(${markScale})`}>
                {m.good
                  ? <path d="M -18,0 L -6,14 L 20,-14" stroke={color} strokeWidth="7" fill="none" strokeLinecap="round" />
                  : <path d="M -14,-14 L 14,14 M 14,-14 L -14,14" stroke={color} strokeWidth="7" strokeLinecap="round" />
                }
              </g>
            );
          })}
        </svg>

        <div style={{
          position: 'absolute', bottom: 270, left: 0, right: 0, textAlign: 'center',
          opacity: statIn, transform: `scale(${statIn})`,
        }}>
          <p style={headline(120, '#EF4444')}>80%</p>
          <p style={{ ...headline(44, WHITE), marginTop: 4 }}>HAVE BILLING ERRORS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const calIn = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 12, stiffness: 150 } });
  const ctaIn = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 10, stiffness: 200 } });

  const coinDelays = [40, 56, 72, 88, 104];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 200, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(80, '#111')}>TRY IT</p>
          <p style={{ ...headline(80, ACCENT), marginTop: 8 }}>TODAY</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          <g transform={`translate(360,900) scale(${calIn})`}>
            <rect x="-150" y="-160" width="300" height="320" rx="18" fill="#fff" stroke={ACCENT} strokeWidth="6" />
            <rect x="-150" y="-160" width="300" height="68" rx="18" fill={ACCENT} />
            <rect x="-150" y="-120" width="300" height="28" fill={ACCENT} />
            <text x="0" y="-116" textAnchor="middle" fontFamily="Arial Black" fontSize="24" fill="#fff">NOVEMBER</text>
            <circle cx="-60" cy="-162" r="13" fill="#fff" stroke={ACCENT} strokeWidth="4" />
            <circle cx="60" cy="-162" r="13" fill="#fff" stroke={ACCENT} strokeWidth="4" />
            {(['S','M','T','W','T','F','S'] as const).map((d, col) => (
              <text key={col} x={-114 + col * 40} y="-72"
                textAnchor="middle" fontFamily="Arial" fontSize="18" fill="#fff" opacity="0.9">{d}</text>
            ))}
            {[1,2,3,4,5,6,7].map((day) => (
              <text key={day} x={-114 + (day - 1) * 40} y="-28"
                textAnchor="middle" fontFamily="Arial" fontSize="22" fill="#555">{day}</text>
            ))}
            {[8,9,10,11,12,13,14].map((day) => (
              <text key={day} x={-114 + (day - 8) * 40} y="18"
                textAnchor="middle" fontFamily="Arial" fontSize="22"
                fill={day === 7 ? '#fff' : '#555'}>{day}</text>
            ))}
            <circle cx="34" cy="4" r="24" fill={ACCENT} />
            <text x="34" y="12" textAnchor="middle" fontFamily="Arial Black" fontSize="22" fill="#fff">7</text>
          </g>

          {coinDelays.map((delay, i) => {
            const df = Math.max(0, frame - delay);
            const coinOp = interpolate(df, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
            const coinY = 1180 - i * 26;
            return (
              <g key={i} opacity={coinOp}>
                <ellipse cx="750" cy={coinY} rx="62" ry="16" fill="#C8930A" />
                <rect x="688" y={coinY - 12} width="124" height="12" fill="#D4A017" />
                <ellipse cx="750" cy={coinY - 12} rx="62" ry="16" fill="#FFD700" />
                <text x="750" y={coinY - 6} textAnchor="middle" fontFamily="Arial Black" fontSize="14" fill="#8B6914">$</text>
              </g>
            );
          })}
        </svg>

        <div style={{
          position: 'absolute', bottom: 230, left: 0, right: 0, textAlign: 'center',
          opacity: ctaIn,
          transform: `translateY(${interpolate(ctaIn, [0, 1], [30, 0])}px)`,
        }}>
          <p style={headline(60, '#111')}>2 MINUTES.</p>
          <p style={{ ...headline(60, ACCENT), marginTop: 8 }}>$1,400 BACK.</p>
          <p style={{ ...headline(40, '#555'), marginTop: 24 }}>FOLLOW FOR MORE MONEY MOVES</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}><Scene1 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene2 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene3 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene4 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene5 /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene6 /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
