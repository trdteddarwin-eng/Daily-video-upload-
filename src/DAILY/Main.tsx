import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#3B82F6';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const GREEN = '#10B981';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── SCENE 1 ─────────────────────────────────────────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 40], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stubScale = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 110 } });
  const qOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const qScale = spring({ frame: frame - 100, fps, config: { damping: 10, stiffness: 140 } });
  const subOpacity = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(52, WHITE)}>YOUR SALARY</p>
        <p style={headline(52, ACCENT)}>IS A LIE</p>
      </div>

      {/* Pay stub */}
      <div style={{
        position: 'absolute', top: 540, left: '50%',
        transform: `translateX(-50%) scale(${stubScale})`,
        transformOrigin: 'center',
      }}>
        <svg width="380" height="260" viewBox="0 0 380 260">
          <rect x="0" y="0" width="380" height="260" rx="14" fill="#1a1a2e" stroke={ACCENT} strokeWidth="2.5" />
          <rect x="0" y="0" width="380" height="52" rx="14" fill={ACCENT} />
          <rect x="0" y="40" width="380" height="14" fill={ACCENT} />
          <text x="190" y="34" fontFamily="Arial Black, Arial" fontSize="18" fill={WHITE} textAnchor="middle">PAY STUB</text>
          <rect x="20" y="72" width="160" height="10" rx="3" fill="#252545" />
          <rect x="20" y="92" width="110" height="8" rx="2" fill="#1e1e3e" />
          <text x="22" y="136" fontFamily="Arial" fontSize="14" fill="#888">GROSS PAY</text>
          <text x="360" y="136" fontFamily="Arial Black" fontSize="22" fill={ACCENT} textAnchor="end">$55,000</text>
          <line x1="20" y1="148" x2="360" y2="148" stroke="#252545" strokeWidth="1" />
          <text x="22" y="178" fontFamily="Arial" fontSize="14" fill="#888">TAXES &amp; HIDDEN COSTS</text>
          <text x="360" y="178" fontFamily="Arial Black" fontSize="20" fill={RED} textAnchor="end">−???</text>
          <line x1="20" y1="190" x2="360" y2="190" stroke="#252545" strokeWidth="1" />
          <text x="22" y="222" fontFamily="Arial" fontSize="14" fill="#888">REAL HOURLY WAGE</text>
          <text x="360" y="222" fontFamily="Arial Black" fontSize="22" fill="#666" textAnchor="end">???</text>
        </svg>
      </div>

      {/* Question mark */}
      <div style={{
        position: 'absolute', top: 570, right: 50,
        opacity: qOpacity,
        transform: `scale(${qScale})`,
        transformOrigin: 'center',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 130, color: RED, margin: 0, lineHeight: 1 }}>?</p>
      </div>

      {/* Subtitle */}
      <div style={{
        position: 'absolute', bottom: 180, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: subOpacity,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#888', textAlign: 'center', margin: 0 }}>
          The real math will shock you.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 2 ─────────────────────────────────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 38], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barProgress = interpolate(frame, [40, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taxOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taxWidth = interpolate(frame, [100, 145], [0, 154], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const takeHomeScale = spring({ frame: frame - 160, fps, config: { damping: 14, stiffness: 120 } });
  const numOpacity = interpolate(frame, [155, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BAR_W = 700;
  const BAR_H = 90;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(48, BLACK)}>STEP 1:</p>
        <p style={headline(48, ACCENT)}>TAXES HIT FIRST</p>
      </div>

      {/* Bar chart */}
      <div style={{
        position: 'absolute', top: 500, left: '50%',
        transform: 'translateX(-50%)',
        width: BAR_W,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
      }}>
        <p style={{ ...headline(40, BLACK), margin: 0 }}>$55,000</p>
        <div style={{ position: 'relative', width: BAR_W, height: BAR_H, borderRadius: 12, overflow: 'hidden', background: '#ddd' }}>
          {/* Income bar */}
          <div style={{
            position: 'absolute', left: 0, top: 0,
            width: BAR_W * barProgress,
            height: BAR_H,
            background: ACCENT,
            borderRadius: 12,
          }} />
          {/* Tax chunk from right */}
          <div style={{
            position: 'absolute', right: 0, top: 0,
            width: Math.min(taxWidth, BAR_W * barProgress),
            height: BAR_H,
            background: RED,
            borderRadius: '0 12px 12px 0',
            opacity: taxOpacity,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {taxWidth > 60 && (
              <p style={{ ...headline(22, WHITE), letterSpacing: '0.06em' }}>−22%</p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: BAR_W, opacity: taxOpacity }}>
          <p style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, margin: 0 }}>YOURS</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: RED, margin: 0 }}>TAX</p>
        </div>
      </div>

      {/* Take-home reveal */}
      <div style={{
        position: 'absolute', top: 820, left: '50%',
        transform: `translateX(-50%) scale(${takeHomeScale})`,
        transformOrigin: 'center',
        opacity: numOpacity,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      }}>
        <p style={headline(32, '#666')}>TAKE-HOME PAY</p>
        <p style={{ ...headline(80, ACCENT), lineHeight: 1 }}>$42,900</p>
        <p style={{ ...headline(26, '#999'), marginTop: 8 }}>…BUT WE'RE JUST STARTING</p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 3 ─────────────────────────────────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 38], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const carX = interpolate(frame % 80, [0, 40, 80], [80, 880, 80]);
  const carFlip = (frame % 80) > 40 ? -1 : 1;

  const minuteAngle = interpolate(frame, [0, 225], [0, 720]);
  const hourAngle = interpolate(frame, [0, 225], [0, 60]);

  const hoursCount = Math.round(interpolate(frame, [80, 185], [0, 225], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const counterOpacity = interpolate(frame, [75, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const freeOpacity = interpolate(frame, [188, 212], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const clockScale = spring({ frame: frame - 15, fps, config: { damping: 16, stiffness: 100 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(48, WHITE)}>YOUR COMMUTE</p>
        <p style={headline(48, ACCENT)}>IS UNPAID WORK</p>
      </div>

      {/* Clock */}
      <div style={{
        position: 'absolute', top: 350, left: '50%',
        transform: `translateX(-50%) scale(${clockScale})`,
        transformOrigin: 'center',
      }}>
        <svg width="220" height="220" viewBox="0 0 220 220">
          <circle cx="110" cy="110" r="100" fill="#1a1a2e" stroke={ACCENT} strokeWidth="4" />
          {Array.from({ length: Math.max(0, Math.floor(12)) }).map((_, i) => {
            const ang = (i * 30 - 90) * Math.PI / 180;
            return (
              <line key={i}
                x1={110 + 78 * Math.cos(ang)} y1={110 + 78 * Math.sin(ang)}
                x2={110 + 92 * Math.cos(ang)} y2={110 + 92 * Math.sin(ang)}
                stroke={ACCENT} strokeWidth="3" strokeLinecap="round"
              />
            );
          })}
          <line
            x1="110" y1="110"
            x2={110 + 50 * Math.cos((hourAngle - 90) * Math.PI / 180)}
            y2={110 + 50 * Math.sin((hourAngle - 90) * Math.PI / 180)}
            stroke={WHITE} strokeWidth="6" strokeLinecap="round"
          />
          <line
            x1="110" y1="110"
            x2={110 + 72 * Math.cos((minuteAngle - 90) * Math.PI / 180)}
            y2={110 + 72 * Math.sin((minuteAngle - 90) * Math.PI / 180)}
            stroke={ACCENT} strokeWidth="4" strokeLinecap="round"
          />
          <circle cx="110" cy="110" r="7" fill={ACCENT} />
        </svg>
      </div>

      {/* Road */}
      <div style={{ position: 'absolute', top: 790, left: 0, right: 0 }}>
        <svg width="1080" height="70" viewBox="0 0 1080 70">
          <rect x="0" y="8" width="1080" height="46" fill="#2a2a2a" />
          {Array.from({ length: Math.max(0, Math.floor(10)) }).map((_, i) => (
            <rect key={i} x={i * 120 + 10} y="28" width="60" height="6" fill="#F59E0B" opacity="0.65" />
          ))}
          <rect x="0" y="6" width="1080" height="4" fill="#444" />
          <rect x="0" y="54" width="1080" height="4" fill="#444" />
        </svg>
      </div>

      {/* Car */}
      <div style={{
        position: 'absolute', top: 720, left: carX,
        transform: `scaleX(${carFlip})`,
        transformOrigin: 'center',
      }}>
        <svg width="160" height="90" viewBox="0 0 160 90">
          <rect x="10" y="34" width="140" height="42" rx="8" fill="#1a3a6e" stroke={ACCENT} strokeWidth="2.5" />
          <path d="M34 34 Q44 8 74 8 Q106 8 122 34 Z" fill="#1a3a6e" stroke={ACCENT} strokeWidth="2.5" />
          <path d="M41 32 Q49 14 72 14 Q96 14 108 32 Z" fill="#5a8ec8" opacity="0.7" />
          <ellipse cx="146" cy="52" rx="8" ry="6" fill="#FBBF24" opacity="0.9" />
          <ellipse cx="14" cy="52" rx="6" ry="5" fill={RED} opacity="0.8" />
          <circle cx="40" cy="76" r="14" fill="#222" stroke="#555" strokeWidth="3" />
          <circle cx="40" cy="76" r="5" fill="#444" />
          <circle cx="118" cy="76" r="14" fill="#222" stroke="#555" strokeWidth="3" />
          <circle cx="118" cy="76" r="5" fill="#444" />
        </svg>
      </div>

      {/* Hours counter */}
      <div style={{
        position: 'absolute', top: 960, left: '50%', transform: 'translateX(-50%)',
        opacity: counterOpacity,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <p style={{ ...headline(96, ACCENT), lineHeight: 1, margin: 0 }}>{hoursCount}</p>
        <p style={headline(28, WHITE)}>HOURS LOST PER YEAR</p>
      </div>

      {/* Unpaid badge */}
      <div style={{
        position: 'absolute', bottom: 120, left: '50%', transform: 'translateX(-50%)',
        opacity: freeOpacity,
      }}>
        <div style={{ background: RED, borderRadius: 12, padding: '12px 44px' }}>
          <p style={headline(30, WHITE)}>UNPAID &amp; INVISIBLE</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 4 ─────────────────────────────────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 38], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const i1Scale = spring({ frame: frame - 45, fps, config: { damping: 14, stiffness: 130 } });
  const i2Scale = spring({ frame: frame - 80, fps, config: { damping: 14, stiffness: 130 } });
  const i3Scale = spring({ frame: frame - 115, fps, config: { damping: 14, stiffness: 130 } });
  const i4Scale = spring({ frame: frame - 150, fps, config: { damping: 14, stiffness: 130 } });
  const totalOpacity = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalCount = Math.round(interpolate(frame, [162, 218], [0, 5000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const itemStyle = (sc: number): React.CSSProperties => ({
    transform: `scale(${sc})`,
    transformOrigin: 'center',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(46, BLACK)}>THEN THERE'S</p>
        <p style={headline(46, ACCENT)}>WORK EXPENSES</p>
      </div>

      <div style={{
        position: 'absolute', top: 380, left: '50%', transform: 'translateX(-50%)',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, width: 640,
      }}>
        {/* Work clothes */}
        <div style={itemStyle(i1Scale)}>
          <svg width="100" height="110" viewBox="0 0 100 110">
            <path d="M50 10 L20 26 L10 52 L22 52 L22 100 L78 100 L78 52 L90 52 L80 26 Z" fill="#1a3a6e" stroke={ACCENT} strokeWidth="2" />
            <path d="M50 10 L36 29 L50 23 L64 29 Z" fill={WHITE} />
            <circle cx="50" cy="44" r="3.5" fill={WHITE} />
            <circle cx="50" cy="60" r="3.5" fill={WHITE} />
            <circle cx="50" cy="76" r="3.5" fill={WHITE} />
            <rect x="26" y="56" width="18" height="16" rx="2" fill="#2a4a7e" stroke={ACCENT} strokeWidth="1" />
          </svg>
          <p style={headline(18, BLACK)}>WORK CLOTHES</p>
          <p style={{ ...headline(26, RED), margin: 0 }}>$1,200</p>
        </div>

        {/* Lunches */}
        <div style={itemStyle(i2Scale)}>
          <svg width="100" height="110" viewBox="0 0 100 110">
            <path d="M26 36 L33 96 L67 96 L74 36 Z" fill="#7B3F00" stroke="#5a2d0c" strokeWidth="2" />
            <ellipse cx="50" cy="36" rx="24" ry="8" fill="#5a2d0c" />
            <path d="M36 18 Q40 8 36 2" fill="none" stroke="#aaa" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 20 Q54 10 50 4" fill="none" stroke="#aaa" strokeWidth="3" strokeLinecap="round" />
            <path d="M64 18 Q68 8 64 2" fill="none" stroke="#aaa" strokeWidth="3" strokeLinecap="round" />
            <path d="M74 54 Q94 54 94 68 Q94 82 74 82" fill="none" stroke="#7B3F00" strokeWidth="6" strokeLinecap="round" />
            <text x="50" y="70" fontFamily="Arial Black" fontSize="11" fill={WHITE} textAnchor="middle">LUNCH</text>
          </svg>
          <p style={headline(18, BLACK)}>WORK LUNCHES</p>
          <p style={{ ...headline(26, RED), margin: 0 }}>$1,800</p>
        </div>

        {/* Gas pump */}
        <div style={itemStyle(i3Scale)}>
          <svg width="100" height="110" viewBox="0 0 100 110">
            <rect x="14" y="24" width="56" height="72" rx="6" fill="#2a2a2a" stroke="#555" strokeWidth="2" />
            <rect x="22" y="32" width="40" height="28" rx="4" fill="#1a3a6e" />
            <text x="42" y="52" fontFamily="Arial Black" fontSize="13" fill={ACCENT} textAnchor="middle">$4.29</text>
            {Array.from({ length: Math.max(0, Math.floor(9)) }).map((_, idx) => (
              <rect key={idx} x={24 + (idx % 3) * 12} y={68 + Math.floor(idx / 3) * 8} width="8" height="5" rx="1" fill="#444" />
            ))}
            <rect x="70" y="34" width="18" height="6" rx="3" fill="#555" />
            <rect x="82" y="34" width="6" height="26" rx="3" fill="#444" />
          </svg>
          <p style={headline(18, BLACK)}>COMMUTE GAS</p>
          <p style={{ ...headline(26, RED), margin: 0 }}>$1,200</p>
        </div>

        {/* Wine glass (stress) */}
        <div style={itemStyle(i4Scale)}>
          <svg width="100" height="110" viewBox="0 0 100 110">
            <line x1="50" y1="84" x2="50" y2="100" stroke="#8B0000" strokeWidth="6" strokeLinecap="round" />
            <rect x="28" y="98" width="44" height="8" rx="4" fill="#8B0000" />
            <path d="M24 28 Q19 64 34 80 Q50 88 66 80 Q81 64 76 28 Z" fill="#8B0000" opacity="0.85" />
            <path d="M27 60 Q27 76 34 80 Q50 87 66 80 Q73 76 73 60 Z" fill="#c0392b" opacity="0.9" />
            <ellipse cx="50" cy="28" rx="26" ry="8" fill="none" stroke="#8B0000" strokeWidth="3" />
            <text x="50" y="54" fontFamily="Arial" fontSize="20" textAnchor="middle" fill={WHITE} opacity="0.7">~</text>
          </svg>
          <p style={headline(18, BLACK)}>STRESS SPENDING</p>
          <p style={{ ...headline(26, RED), margin: 0 }}>$800</p>
        </div>
      </div>

      {/* Total */}
      <div style={{
        position: 'absolute', bottom: 130, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
        opacity: totalOpacity,
      }}>
        <div style={{ background: RED, borderRadius: 16, padding: '18px 64px' }}>
          <p style={{ ...headline(26, WHITE), margin: 0, marginBottom: 4 }}>TOTAL WORK COSTS</p>
          <p style={{ ...headline(58, WHITE), margin: 0 }}>${totalCount.toLocaleString()}</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 5 ─────────────────────────────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 38], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1Op = interpolate(frame, [45, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card2Op = interpolate(frame, [88, 112], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card3Scale = spring({ frame: frame - 130, fps, config: { damping: 10, stiffness: 100 } });
  const card3Op = interpolate(frame, [125, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const compareOp = interpolate(frame, [175, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cardBase: React.CSSProperties = {
    background: '#1a1a2e', borderRadius: 16, padding: '22px 32px',
    border: '2px solid #2a2a4e',
    display: 'flex', flexDirection: 'column', gap: 8,
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'nowrap',
  };

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 120, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(50, WHITE)}>THE REAL</p>
        <p style={headline(50, ACCENT)}>MATH</p>
      </div>

      <div style={{
        position: 'absolute', top: 360, left: 70, right: 70,
        display: 'flex', flexDirection: 'column', gap: 36,
      }}>
        {/* Card 1 */}
        <div style={{ ...cardBase, opacity: card1Op }}>
          <p style={{ fontFamily: FONT, fontSize: 17, color: '#888', margin: 0, letterSpacing: '0.1em' }}>STEP 1 — REAL TAKE-HOME</p>
          <div style={rowStyle}>
            <p style={{ ...headline(32, ACCENT), margin: 0 }}>$42,900</p>
            <p style={{ ...headline(32, '#555'), margin: 0 }}>−</p>
            <p style={{ ...headline(32, RED), margin: 0 }}>$5,000</p>
            <p style={{ ...headline(32, '#555'), margin: 0 }}>=</p>
            <p style={{ ...headline(32, GREEN), margin: 0 }}>$37,900</p>
          </div>
        </div>

        {/* Card 2 */}
        <div style={{ ...cardBase, opacity: card2Op }}>
          <p style={{ fontFamily: FONT, fontSize: 17, color: '#888', margin: 0, letterSpacing: '0.1em' }}>STEP 2 — REAL HOURS WORKED</p>
          <div style={rowStyle}>
            <p style={{ ...headline(32, ACCENT), margin: 0 }}>2,000</p>
            <p style={{ ...headline(32, '#555'), margin: 0 }}>+</p>
            <p style={{ ...headline(32, RED), margin: 0 }}>225</p>
            <p style={{ ...headline(32, '#555'), margin: 0 }}>=</p>
            <p style={{ ...headline(32, GREEN), margin: 0 }}>2,225 HRS</p>
          </div>
        </div>

        {/* Card 3 — result */}
        <div style={{
          opacity: card3Op,
          transform: `scale(${card3Scale})`,
          transformOrigin: 'center',
          background: '#071a0e', borderRadius: 16, padding: '26px 32px',
          border: `3px solid ${GREEN}`,
          display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 17, color: '#888', margin: 0, letterSpacing: '0.1em' }}>STEP 3 — TRUE HOURLY WAGE</p>
          <div style={rowStyle}>
            <p style={{ ...headline(28, GREEN), margin: 0 }}>$37,900 ÷ 2,225 =</p>
            <p style={{ ...headline(58, GREEN), margin: 0 }}>$17/HR</p>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div style={{
        position: 'absolute', bottom: 110, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 36,
        opacity: compareOp,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#666', margin: 0 }}>STATED WAGE</p>
          <p style={{ ...headline(46, '#555'), margin: 0, textDecoration: 'line-through' }}>$27.50/HR</p>
        </div>
        <p style={{ ...headline(36, ACCENT), margin: 0 }}>→</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: ACCENT, margin: 0 }}>TRUE WAGE</p>
          <p style={{ ...headline(46, ACCENT), margin: 0 }}>$17.04/HR</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 6 ─────────────────────────────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [10, 38], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [10, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagScale = spring({ frame: frame - 40, fps, config: { damping: 14, stiffness: 110 } });
  const tagOpacity = interpolate(frame, [36, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowProgress = interpolate(frame, [85, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const hoursScale = spring({ frame: frame - 122, fps, config: { damping: 12, stiffness: 120 } });
  const hoursOpacity = interpolate(frame, [118, 142], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ex1Op = interpolate(frame, [148, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ex2Op = interpolate(frame, [163, 183], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ex3Op = interpolate(frame, [178, 198], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [202, 222], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rowStyle: React.CSSProperties = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: '#e8e8e8', borderRadius: 12, padding: '14px 28px',
  };

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 100, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: titleOpacity, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(44, BLACK)}>NOW PRICE THINGS</p>
        <p style={headline(44, ACCENT)}>IN REAL HOURS</p>
      </div>

      {/* $40 price tag */}
      <div style={{
        position: 'absolute', top: 360, left: 110,
        opacity: tagOpacity,
        transform: `scale(${tagScale})`,
        transformOrigin: 'center',
      }}>
        <svg width="185" height="210" viewBox="0 0 185 210">
          <path d="M18 18 L167 18 L167 175 L92 210 L18 175 Z" fill={WHITE} stroke="#ccc" strokeWidth="2.5" />
          <circle cx="92" cy="36" r="11" fill="none" stroke={ACCENT} strokeWidth="3" />
          <text x="92" y="115" fontFamily="Arial Black" fontSize="56" fill={BLACK} textAnchor="middle">$40</text>
          <text x="92" y="150" fontFamily="Arial" fontSize="18" fill="#888" textAnchor="middle">dinner out</text>
        </svg>
      </div>

      {/* Arrow */}
      <div style={{ position: 'absolute', top: 448, left: '50%', transform: 'translateX(-50%)' }}>
        <svg width="200" height="60" viewBox="0 0 200 60">
          <line x1="10" y1="30" x2={10 + 160 * arrowProgress} y2="30"
            stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          {arrowProgress > 0.88 && (
            <>
              <line x1="170" y1="30" x2="148" y2="12" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
              <line x1="170" y1="30" x2="148" y2="48" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            </>
          )}
        </svg>
      </div>

      {/* 2.3 hours */}
      <div style={{
        position: 'absolute', top: 356, right: 90,
        opacity: hoursOpacity,
        transform: `scale(${hoursScale})`,
        transformOrigin: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <p style={{ ...headline(92, ACCENT), lineHeight: 1, margin: 0 }}>2.3</p>
        <p style={headline(28, BLACK)}>REAL HOURS</p>
        <p style={{ fontFamily: FONT, fontSize: 17, color: '#888', textAlign: 'center', margin: '4px 0 0' }}>at $17/hr true wage</p>
      </div>

      {/* Price rows */}
      <div style={{
        position: 'absolute', top: 780, left: 60, right: 60,
        display: 'flex', flexDirection: 'column', gap: 18,
      }}>
        <div style={{ ...rowStyle, opacity: ex1Op }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0 }}>$200 SHOES</p>
          <p style={{ ...headline(24, ACCENT), margin: 0 }}>= 11.8 HRS</p>
        </div>
        <div style={{ ...rowStyle, opacity: ex2Op }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0 }}>$500 PHONE</p>
          <p style={{ ...headline(24, ACCENT), margin: 0 }}>= 29.4 HRS</p>
        </div>
        <div style={{ ...rowStyle, opacity: ex3Op }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0 }}>$30K CAR</p>
          <p style={{ ...headline(24, RED), margin: 0 }}>= 1,765 HRS</p>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute', bottom: 80, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: ctaOpacity,
      }}>
        <div style={{ background: ACCENT, borderRadius: 14, padding: '16px 50px' }}>
          <p style={headline(28, WHITE)}>FOLLOW FOR MORE MONEY MATH</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── EXPORT ──────────────────────────────────────────────────────────────────
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
