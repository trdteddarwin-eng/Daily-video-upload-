import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#FFF8E7';
const ACCENT = '#F59E0B';
const GREEN = '#10B981';
const RED = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.10em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.2,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const personIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const textIn = interpolate(frame, [25, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const strikeW = interpolate(frame, [80, 145], [0, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnIn = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
        <svg width={180} height={170} viewBox="0 0 180 170" style={{ transform: `scale(${personIn})`, transformOrigin: 'center' }}>
          <circle cx="90" cy="44" r="26" fill={ACCENT} />
          <rect x="64" y="74" width="52" height="50" rx="8" fill={WHITE} />
          <rect x="16" y="126" width="148" height="12" rx="4" fill="#555" />
          <rect x="46" y="102" width="22" height="28" rx="4" fill={WHITE} />
          <rect x="112" y="102" width="22" height="28" rx="4" fill={WHITE} />
          <rect x="110" y="56" width="48" height="44" rx="5" fill={ACCENT} />
          <rect x="110" y="70" width="48" height="30" rx="0" fill={WHITE} />
          <text x="134" y="92" textAnchor="middle" fontFamily="Arial Black" fontSize="18" fontWeight="900" fill={BLACK}>65</text>
          <rect x="120" y="56" width="6" height="12" rx="3" fill={BLACK} />
          <rect x="142" y="56" width="6" height="12" rx="3" fill={BLACK} />
        </svg>

        <div style={{ opacity: textIn, textAlign: 'center' as const, padding: '0 60px' }}>
          <p style={headline(48, WHITE)}>YOU THINK YOU</p>
          <p style={headline(48, WHITE)}>CONTROL WHEN</p>
          <p style={{ ...headline(68, ACCENT), marginTop: 8 }}>YOU RETIRE</p>
        </div>

        <div style={{ position: 'relative', width: 400, height: 10 }}>
          <div style={{ position: 'absolute', left: 0, height: 10, width: strikeW, background: RED, borderRadius: 5 }} />
        </div>

        <p style={{ ...headline(44, RED), opacity: warnIn }}>WRONG.</p>
      </AbsoluteFill>
    </FadeScene>
  );
};
// === END SCENE 1 ===

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const statsIn = interpolate(frame, [55, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const count = 10;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
        <p style={{ ...headline(46, BLACK), transform: `scale(${titleScale})` }}>
          1 IN 2 WORKERS
        </p>

        <svg width={520} height={200} viewBox="0 0 520 200">
          {Array.from({ length: Math.max(0, Math.floor(count)) }, (_, i) => {
            const col = i % 5;
            const row = Math.floor(i / 5);
            const cx = 52 + col * 104;
            const cy = row * 100;
            const c = i < 5 ? ACCENT : '#AAAAAA';
            const figIn = interpolate(frame, [15 + i * 7, 35 + i * 7], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <g key={i} opacity={figIn}>
                <circle cx={cx} cy={cy + 16} r={16} fill={c} />
                <rect x={cx - 12} y={cy + 36} width={24} height={28} rx={5} fill={c} />
                <line x1={cx - 12} y1={cy + 44} x2={cx - 24} y2={cy + 62} stroke={c} strokeWidth={7} strokeLinecap="round" />
                <line x1={cx + 12} y1={cy + 44} x2={cx + 24} y2={cy + 62} stroke={c} strokeWidth={7} strokeLinecap="round" />
                <line x1={cx - 6} y1={cy + 64} x2={cx - 6} y2={cy + 88} stroke={c} strokeWidth={7} strokeLinecap="round" />
                <line x1={cx + 6} y1={cy + 64} x2={cx + 6} y2={cy + 88} stroke={c} strokeWidth={7} strokeLinecap="round" />
              </g>
            );
          })}
        </svg>

        <div style={{ opacity: statsIn, textAlign: 'center' as const }}>
          <p style={headline(72, ACCENT)}>50%</p>
          <p style={headline(38, BLACK)}>RETIRE INVOLUNTARILY</p>
          <p style={{ ...headline(34, '#666'), marginTop: 10 }}>AVG 3 YEARS TOO EARLY</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardScale = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const cutIn = interpolate(frame, [75, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctScale = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 10, stiffness: 55 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        <p style={headline(40, WHITE)}>CLAIMING AT 62</p>

        <svg width={460} height={250} viewBox="0 0 460 250" style={{ transform: `scale(${cardScale})`, transformOrigin: 'center' }}>
          <rect x="0" y="0" width="460" height="250" rx="18" fill="#1a3870" />
          <rect x="0" y="0" width="460" height="68" rx="18" fill="#234faa" />
          <rect x="0" y="52" width="460" height="16" fill="#234faa" />
          <text x="230" y="46" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fontWeight="900" fill={WHITE}>Social Security</text>
          <rect x="28" y="84" width="110" height="76" rx="6" fill="#2a4a90" />
          <circle cx="83" cy="122" r="26" fill="#3a5aa0" />
          <circle cx="83" cy="112" r="11" fill={WHITE} />
          <rect x="62" y="126" width="42" height="26" rx="4" fill={WHITE} />
          <text x="270" y="120" textAnchor="middle" fontFamily="Arial" fontSize="14" fill="#99aacc">MONTHLY BENEFIT</text>
          <text x="270" y="162" textAnchor="middle" fontFamily="Arial Black" fontSize="44" fontWeight="900" fill={WHITE}>$1,800</text>
          <text x="230" y="214" textAnchor="middle" fontFamily="Arial" fontSize="12" fill="#99aacc" letterSpacing="3">FULL RETIREMENT AGE 67</text>
        </svg>

        <div style={{ opacity: cutIn, textAlign: 'center' as const }}>
          <p style={headline(32, '#888')}>EARLY CLAIM PENALTY</p>
          <p style={{ ...headline(88, RED), marginTop: 4, transform: `scale(${pctScale})`, transformOrigin: 'center' }}>-30%</p>
          <p style={{ ...headline(36, RED), marginTop: 0 }}>EVERY MONTH · FOREVER</p>
          <p style={{ ...headline(34, WHITE), marginTop: 10 }}>$1,800 → $1,260/mo</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// === END SCENE 3 ===

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pigIn = spring({ frame, fps, config: { damping: 12, stiffness: 75 } });
  const barH = interpolate(frame, [40, 130], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const forcedH = barH * 0.72;
  const amtIn = interpolate(frame, [130, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <p style={headline(44, BLACK)}>3 LOST EARNING YEARS</p>

        <svg width={200} height={190} viewBox="0 0 200 190" style={{ transform: `scale(${pigIn})`, transformOrigin: 'center' }}>
          <ellipse cx="95" cy="120" rx="72" ry="58" fill="#F9A8D4" />
          <circle cx="156" cy="96" r="30" fill="#F9A8D4" />
          <ellipse cx="172" cy="106" rx="15" ry="12" fill="#FBBCD4" />
          <circle cx="168" cy="106" r="3" fill="#ec4899" />
          <circle cx="176" cy="106" r="3" fill="#ec4899" />
          <circle cx="157" cy="86" r="5" fill={BLACK} />
          <rect x="78" y="64" width="34" height="6" rx="3" fill="#888" />
          <circle cx="95" cy="50" r="11" fill={ACCENT} />
          <text x="95" y="55" textAnchor="middle" fontFamily="Arial Black" fontSize="12" fill={BLACK}>$</text>
          <rect x="58" y="168" width="18" height="26" rx="5" fill="#F9A8D4" />
          <rect x="85" y="168" width="18" height="26" rx="5" fill="#F9A8D4" />
          <rect x="112" y="168" width="18" height="26" rx="5" fill="#F9A8D4" />
          <rect x="139" y="168" width="18" height="26" rx="5" fill="#F9A8D4" />
        </svg>

        <svg width={360} height={210} viewBox="0 0 360 210">
          <rect x="40" y={210 - barH} width="90" height={barH} rx="6" fill={ACCENT} />
          <text x="85" y={Math.max(10, 210 - barH - 10)} textAnchor="middle" fontFamily="Arial Black" fontSize="15" fill={BLACK}>PLANNED</text>
          <rect x="230" y={210 - forcedH} width="90" height={forcedH} rx="6" fill={RED} />
          <text x="275" y={Math.max(10, 210 - forcedH - 10)} textAnchor="middle" fontFamily="Arial Black" fontSize="15" fill={BLACK}>FORCED</text>
        </svg>

        <p style={{ ...headline(44, RED), opacity: amtIn }}>-$140K IN GROWTH</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const barGrow = interpolate(frame, [20, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalIn = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 10, stiffness: 60 } });
  const subIn = interpolate(frame, [145, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const lossItems = [
    { label: 'LOST SS INCOME', amount: 172, color: RED },
    { label: 'LOST INVESTMENT GROWTH', amount: 140, color: ACCENT },
  ];
  const maxAmount = 172;
  const maxBarW = 480;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32 }}>
        <p style={headline(42, WHITE)}>THE REAL PRICE TAG</p>

        <div style={{ width: 600, display: 'flex', flexDirection: 'column', gap: 28 }}>
          {lossItems.map((item, idx) => {
            const barW = (item.amount / maxAmount) * maxBarW * barGrow;
            return (
              <div key={idx}>
                <p style={{ ...headline(26, WHITE), textAlign: 'left' as const, marginBottom: 8 }}>{item.label}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: barW, height: 52, background: item.color, borderRadius: 6, minWidth: 0 }} />
                  <span style={{ ...headline(28, item.color), flexShrink: 0 }}>${item.amount}K</span>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' as const, transform: `scale(${totalIn})`, transformOrigin: 'center' }}>
          <p style={headline(34, '#888')}>TOTAL FORCED RETIREMENT COST</p>
          <p style={{ ...headline(88, WHITE), marginTop: 4 }}>$312K</p>
        </div>

        <p style={{ ...headline(34, ACCENT), opacity: subIn }}>ON AVERAGE. PER PERSON.</p>
      </AbsoluteFill>
    </FadeScene>
  );
};
// === END SCENE 5 ===

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const jarIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const fillH = interpolate(frame, [30, 140], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textIn = interpolate(frame, [75, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaIn = interpolate(frame, [150, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        <p style={headline(50, BLACK)}>THE FIX</p>

        <svg width={210} height={270} viewBox="0 0 210 270" style={{ transform: `scale(${jarIn})`, transformOrigin: 'center' }}>
          <defs>
            <clipPath id="jarClip2">
              <rect x="35" y="58" width="140" height="188" rx="14" />
            </clipPath>
          </defs>
          <rect x="35" y="58" width="140" height="188" rx="14" fill="#D0D0D0" />
          <rect x="35" y={246 - fillH} width="140" height={fillH} fill={GREEN} style={{ clipPath: 'url(#jarClip2)' }} />
          <rect x="26" y="40" width="158" height="24" rx="8" fill="#AAAAAA" />
          <rect x="46" y="30" width="118" height="16" rx="6" fill="#BBBBBB" />
          <text x="105" y="165" textAnchor="middle" fontFamily="Arial Black" fontSize="52" fontWeight="900" fill="#888">$</text>
          <rect x="50" y="190" width="110" height="34" rx="4" fill={WHITE} />
          <text x="105" y="212" textAnchor="middle" fontFamily="Arial Black" fontSize="13" fill={BLACK}>BRIDGE FUND</text>
        </svg>

        <div style={{ opacity: textIn, textAlign: 'center' as const, padding: '0 60px' }}>
          <p style={headline(40, BLACK)}>2 YEARS OF</p>
          <p style={headline(40, BLACK)}>EXPENSES IN CASH</p>
          <p style={{ ...headline(48, GREEN), marginTop: 10 }}>= POWER OVER TIMING</p>
        </div>

        <p style={{ ...headline(32, '#555'), opacity: ctaIn, textAlign: 'center' as const, padding: '0 60px' }}>
          PLAN FOR 62 · HOPE FOR 67
        </p>
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
