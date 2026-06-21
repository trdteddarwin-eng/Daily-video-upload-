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

// ── Scene 1: Hook — medical cross + 51% counter ──────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const crossScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 70 } });
  const counterVal = Math.round(
    interpolate(frame, [30, 110], [0, 51], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [100, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
        }}
      >
        <p style={{ ...headline(36, WHITE), marginBottom: 50, transform: `translateY(${titleY}px)` }}>
          OPEN ENROLLMENT
        </p>

        {/* Medical cross */}
        <svg width={160} height={160} style={{ transform: `scale(${crossScale})`, marginBottom: 36 }}>
          <rect x={60} y={10} width={40} height={140} rx={6} fill={ACCENT} />
          <rect x={10} y={60} width={140} height={40} rx={6} fill={ACCENT} />
        </svg>

        {/* Animated counter */}
        <p style={{ ...headline(140, ACCENT), lineHeight: 1, marginBottom: 0 }}>{counterVal}%</p>
        <p style={{ ...headline(30, WHITE), marginTop: 14 }}>OF WORKERS</p>
        <p style={{ ...headline(30, WHITE), marginTop: 8 }}>PICK THE WRONG PLAN</p>

        {/* Delayed warning */}
        <div style={{ marginTop: 50, opacity: subOpacity }}>
          <p style={headline(34, RED)}>COSTING $2,100 / YEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 2: Status quo bias — clipboard re-enroll loop ──────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const labelX = interpolate(frame, [60, 100], [-540, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
        }}
      >
        <p style={{ ...headline(40, BLACK), marginBottom: 50 }}>MOST WORKERS</p>

        {/* Clipboard SVG */}
        <svg
          width={260}
          height={320}
          style={{ transform: `scale(${cardScale})`, marginBottom: 44 }}
        >
          {/* Board */}
          <rect x={10} y={40} width={240} height={270} rx={10} fill="#E5E7EB" stroke="#9CA3AF" strokeWidth={2} />
          {/* Clip */}
          <rect x={90} y={18} width={80} height={36} rx={8} fill="#6B7280" />
          <rect x={100} y={26} width={60} height={20} rx={5} fill="#E5E7EB" />
          {/* Header line */}
          <rect x={40} y={80} width={180} height={10} rx={4} fill="#9CA3AF" />
          {/* Row 1 — LAST YEAR */}
          <rect x={40} y={120} width={26} height={26} rx={5} fill={ACCENT} />
          <path d="M 46 133 L 53 141 L 64 123" stroke={WHITE} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x={78} y={127} width={130} height={12} rx={4} fill="#6B7280" />
          <text x={78} y={160} fill="#6B7280" fontSize={14} fontFamily="Arial" fontWeight="bold">LAST YEAR</text>
          {/* Row 2 — THIS YEAR */}
          <rect x={40} y={180} width={26} height={26} rx={5} fill={ACCENT} />
          <path d="M 46 193 L 53 201 L 64 183" stroke={WHITE} strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x={78} y={187} width={130} height={12} rx={4} fill="#6B7280" />
          <text x={78} y={220} fill="#6B7280" fontSize={14} fontFamily="Arial" fontWeight="bold">THIS YEAR</text>
          {/* SAME PLAN label */}
          <text x={130} y={290} textAnchor="middle" fill={RED} fontSize={20} fontWeight="bold" fontFamily="Arial Black">← SAME PLAN</text>
        </svg>

        {/* Status quo bias label */}
        <div
          style={{
            transform: `translateX(${labelX}px)`,
            opacity: labelOpacity,
            textAlign: 'center',
          }}
        >
          <p style={headline(36, BLACK)}>STATUS QUO BIAS</p>
          <p style={{ ...headline(22, '#6B7280'), marginTop: 16 }}>RE-ENROLLING WITHOUT REVIEWING</p>
          <p style={{ ...headline(42, RED), marginTop: 12 }}>$2,100 / YEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 3: Two plan cards — fear of deductible ─────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftX = interpolate(frame, [10, 50], [-560, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightX = interpolate(frame, [10, 50], [560, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const xOpacity = interpolate(frame, [60, 85], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkOpacity = interpolate(frame, [75, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const revealOpacity = interpolate(frame, [110, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 50px',
        }}
      >
        <p style={{ ...headline(38, WHITE), marginBottom: 44 }}>THE WORD THAT SCARES YOU</p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 36,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {/* PPO card */}
          <div
            style={{
              background: '#1E1E1E',
              borderRadius: 20,
              padding: '36px 28px',
              width: 320,
              border: `3px solid ${RED}`,
              textAlign: 'center',
              transform: `translateX(${leftX}px)`,
            }}
          >
            <p style={headline(26, WHITE)}>PPO PLAN</p>
            <p style={{ ...headline(50, RED), marginTop: 14 }}>$320/mo</p>
            <p style={{ ...headline(18, '#9CA3AF'), marginTop: 6 }}>$3,840 / YEAR</p>
            <div style={{ marginTop: 22 }}>
              <svg width={56} height={56}>
                <circle cx={28} cy={28} r={26} fill={GREEN} />
                <path d="M 14 28 L 23 39 L 42 17" stroke={WHITE} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p style={{ ...headline(16, GREEN), marginTop: 10 }}>FEELS SAFE</p>
          </div>

          {/* HDHP card */}
          <div
            style={{
              background: '#1E1E1E',
              borderRadius: 20,
              padding: '36px 28px',
              width: 320,
              border: `3px solid ${ACCENT}`,
              textAlign: 'center',
              transform: `translateX(${rightX}px)`,
            }}
          >
            <p style={headline(26, WHITE)}>HDHP + HSA</p>
            <p style={{ ...headline(50, ACCENT), marginTop: 14 }}>$160/mo</p>
            <p style={{ ...headline(18, '#9CA3AF'), marginTop: 6 }}>$1,920 / YEAR</p>
            <div style={{ marginTop: 22, position: 'relative', height: 56 }}>
              {/* Red X fades out */}
              <div style={{ opacity: xOpacity, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                <svg width={56} height={56}>
                  <circle cx={28} cy={28} r={26} fill={RED} />
                  <path d="M 17 17 L 39 39 M 39 17 L 17 39" stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
                </svg>
              </div>
              {/* Green check fades in */}
              <div style={{ opacity: checkOpacity, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                <svg width={56} height={56}>
                  <circle cx={28} cy={28} r={26} fill={GREEN} />
                  <path d="M 14 28 L 23 39 L 42 17" stroke={WHITE} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ opacity: xOpacity }}>
                <p style={headline(16, RED)}>SCARY: DEDUCTIBLE</p>
              </div>
              <div style={{ opacity: checkOpacity }}>
                <p style={headline(16, GREEN)}>ACTUALLY WINS</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 40, opacity: revealOpacity }}>
          <p style={headline(28, WHITE)}>IF YOU'RE HEALTHY — MATH WINS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 4: HSA piggy bank — triple tax-free ─────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyScale = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 12, stiffness: 60 } });
  const label1Scale = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 10, stiffness: 80 } });
  const label2Scale = spring({ frame: Math.max(0, frame - 95), fps, config: { damping: 10, stiffness: 80 } });
  const label3Scale = spring({ frame: Math.max(0, frame - 135), fps, config: { damping: 10, stiffness: 80 } });

  const coinY = interpolate(frame, [40, 90], [-80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
        }}
      >
        <p style={{ ...headline(40, BLACK), marginBottom: 34, opacity: titleOpacity }}>THE HSA ADVANTAGE</p>

        {/* Piggy bank SVG */}
        <svg
          width={220}
          height={210}
          style={{ transform: `scale(${piggyScale})`, marginBottom: 36 }}
        >
          {/* Body */}
          <ellipse cx={108} cy={115} rx={88} ry={72} fill="#F9A8D4" />
          {/* Ear */}
          <ellipse cx={52} cy={57} rx={22} ry={18} fill="#F9A8D4" />
          <ellipse cx={52} cy={59} rx={14} ry={11} fill="#FBCFE8" />
          {/* Snout */}
          <ellipse cx={192} cy={115} rx={26} ry={21} fill="#F9A8D4" />
          <circle cx={186} cy={112} r={4} fill="#EC4899" />
          <circle cx={197} cy={112} r={4} fill="#EC4899" />
          {/* Eye */}
          <circle cx={152} cy={78} r={8} fill={WHITE} />
          <circle cx={154} cy={78} r={4} fill={BLACK} />
          {/* Coin slot */}
          <rect x={78} y={43} width={48} height={9} rx={4} fill="#9D174D" />
          {/* Legs */}
          <rect x={48} y={172} width={26} height={28} rx={5} fill="#F472B6" />
          <rect x={82} y={172} width={26} height={28} rx={5} fill="#F472B6" />
          <rect x={116} y={172} width={26} height={28} rx={5} fill="#F472B6" />
          <rect x={150} y={172} width={26} height={28} rx={5} fill="#F472B6" />
          {/* Tail */}
          <path d="M 20 105 Q 5 90 18 75 Q 30 60 18 50" stroke="#F472B6" strokeWidth={5} fill="none" strokeLinecap="round" />
          {/* Coin dropping */}
          <circle
            cx={102}
            cy={43 + coinY}
            r={13}
            fill="#FCD34D"
            opacity={coinOpacity}
          />
          <text
            x={102}
            y={48 + coinY}
            textAnchor="middle"
            fill={BLACK}
            fontSize={14}
            fontWeight="bold"
            fontFamily="Arial Black"
          >
            $
          </text>
        </svg>

        {/* Triple tax labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
          <div
            style={{
              transform: `scale(${label1Scale})`,
              background: ACCENT,
              borderRadius: 14,
              padding: '18px 48px',
            }}
          >
            <p style={headline(30, WHITE)}>TAX-FREE IN</p>
          </div>
          <div
            style={{
              transform: `scale(${label2Scale})`,
              background: ACCENT,
              borderRadius: 14,
              padding: '18px 48px',
            }}
          >
            <p style={headline(30, WHITE)}>TAX-FREE GROWTH</p>
          </div>
          <div
            style={{
              transform: `scale(${label3Scale})`,
              background: ACCENT,
              borderRadius: 14,
              padding: '18px 48px',
            }}
          >
            <p style={headline(30, WHITE)}>TAX-FREE OUT</p>
          </div>
        </div>

        <p style={{ ...headline(24, '#374151'), marginTop: 28 }}>ONLY ACCOUNT WITH ALL THREE</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 5: Bar chart — 10-year math ─────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const barProgress = interpolate(frame, [20, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [110, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Bar heights (max 260px for the tallest bar)
  const ppoH = barProgress * 260;
  const hdhdPremiumH = barProgress * 130;
  const hsaGainH = barProgress * 204;

  const ppoAmount = Math.round(barProgress * 4800);
  const hdhdAmount = Math.round(barProgress * 2400);
  const hsaTotal = Math.round(barProgress * 34000);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <p style={{ ...headline(36, WHITE), marginBottom: 24, opacity: titleOpacity }}>THE 10-YEAR MATH</p>

        {/* Bar chart */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 60,
            height: 380,
            marginBottom: 24,
          }}
        >
          {/* PPO bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
            <p style={{ ...headline(26, RED), marginBottom: 10 }}>${ppoAmount.toLocaleString()}/yr</p>
            <div
              style={{
                width: 140,
                height: Math.max(4, ppoH),
                background: RED,
                borderRadius: '8px 8px 0 0',
              }}
            />
            <p style={{ ...headline(22, WHITE), marginTop: 10 }}>PPO</p>
            <p style={{ ...headline(16, '#9CA3AF'), marginTop: 4 }}>PREMIUMS ONLY</p>
          </div>

          {/* HDHP + HSA stacked bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
            <p style={{ ...headline(26, ACCENT), marginBottom: 10, opacity: labelOpacity }}>
              ${hsaTotal.toLocaleString()} BUILT
            </p>
            <div style={{ width: 140 }}>
              {/* HSA growth on top */}
              <div
                style={{
                  width: 140,
                  height: Math.max(4, hsaGainH),
                  background: GREEN,
                  borderRadius: '8px 8px 0 0',
                }}
              />
              {/* Premium cost below */}
              <div
                style={{
                  width: 140,
                  height: Math.max(4, hdhdPremiumH),
                  background: ACCENT,
                }}
              />
            </div>
            <p style={{ ...headline(22, WHITE), marginTop: 10 }}>HDHP + HSA</p>
            <p style={{ ...headline(16, '#9CA3AF'), marginTop: 4 }}>OVER 10 YEARS</p>
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 40, opacity: labelOpacity }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 18, height: 18, background: ACCENT, borderRadius: 4 }} />
            <p style={{ ...headline(18, WHITE), letterSpacing: '0.05em' }}>HDHP PREMIUM</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 18, height: 18, background: GREEN, borderRadius: 4 }} />
            <p style={{ ...headline(18, WHITE), letterSpacing: '0.05em' }}>HSA GROWTH</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 6: CTA — calculator checklist ──────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const calcScale = spring({ frame: Math.max(0, frame - 5), fps, config: { damping: 12, stiffness: 70 } });
  const item1Opacity = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item2Opacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item3Opacity = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [165, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const items = [
    { label: 'TOTAL PREMIUMS / YEAR', opacity: item1Opacity },
    { label: 'AVG OUT-OF-POCKET', opacity: item2Opacity },
    { label: 'HSA OPTION AVAILABLE?', opacity: item3Opacity },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
        }}
      >
        <p style={{ ...headline(38, BLACK), marginBottom: 36 }}>THIS ENROLLMENT</p>

        {/* Calculator SVG */}
        <svg
          width={150}
          height={190}
          style={{ transform: `scale(${calcScale})`, marginBottom: 40 }}
        >
          {/* Body */}
          <rect x={5} y={5} width={140} height={180} rx={14} fill="#374151" />
          {/* Screen */}
          <rect x={18} y={18} width={114} height={46} rx={8} fill={GREEN} />
          <text
            x={122}
            y={51}
            textAnchor="end"
            fill={WHITE}
            fontSize={24}
            fontWeight="bold"
            fontFamily="Arial Black"
          >
            $
          </text>
          {/* Button grid: 4 rows x 3 cols */}
          {Array.from({ length: Math.max(0, Math.floor(12)) }).map((_, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            return (
              <rect
                key={i}
                x={18 + col * 40}
                y={80 + row * 26}
                width={32}
                height={18}
                rx={4}
                fill={i === 11 ? ACCENT : '#4B5563'}
              />
            );
          })}
        </svg>

        {/* Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26, width: '100%' }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{ display: 'flex', alignItems: 'center', gap: 22, opacity: item.opacity }}
            >
              <svg width={44} height={44} style={{ flexShrink: 0 }}>
                <circle cx={22} cy={22} r={20} fill={ACCENT} />
                <path
                  d="M 10 22 L 18 32 L 34 12"
                  stroke={WHITE}
                  strokeWidth={4}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p style={headline(28, BLACK)}>{item.label}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 44, opacity: ctaOpacity, textAlign: 'center' }}>
          <p style={headline(30, ACCENT)}>SHARE BEFORE OPEN ENROLLMENT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Composition ───────────────────────────────────────────────────────────────
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
