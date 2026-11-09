import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0A0A0A';
const BG_LIGHT = '#F7F7F7';
const ACCENT = '#3B82F6';
const WHITE = '#F5F5F5';
const BLACK = '#111111';
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

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const cardIn = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 11, stiffness: 100 } });
  const subIn = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 12, stiffness: 150 } });

  const coinXs = [120, 230, 400, 560, 720, 880, 980];
  const coinDelays = [0, 25, 10, 35, 18, 8, 28];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 240, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [50, 0])}px)`,
        }}>
          <p style={headline(96, WHITE)}>YOU PAID IN</p>
          <p style={{ ...headline(96, ACCENT), marginTop: 8 }}>40 YEARS</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          {coinXs.map((cx, i) => {
            const d = coinDelays[i];
            const coinY = interpolate(frame, [d, d + 80], [-50, 2000], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return (
              <g key={i} transform={`translate(${cx}, ${coinY})`} opacity="0.3">
                <circle r="22" fill="#F59E0B" />
                <circle r="16" fill="none" stroke="#D97706" strokeWidth="2" />
                <text y="6" textAnchor="middle" fontFamily="Arial Black" fontSize="16" fill="#92400E">$</text>
              </g>
            );
          })}

          <g transform={`translate(540, 900) scale(${cardIn})`}>
            <rect x="-300" y="-170" width="600" height="340" rx="22" fill="#0D2744" stroke={ACCENT} strokeWidth="4" />
            <text x="0" y="-130" textAnchor="middle" fontFamily="Arial" fontSize="22" fill="#6A8DB0" letterSpacing="4">UNITED STATES OF AMERICA</text>
            <text x="0" y="-80" textAnchor="middle" fontFamily="Arial Black" fontSize="38" fill={WHITE}>SOCIAL SECURITY</text>
            <rect x="-280" y="-58" width="560" height="3" fill={ACCENT} opacity="0.4" />
            <text x="0" y="4" textAnchor="middle" fontFamily="Arial Black" fontSize="52" fill={ACCENT} letterSpacing="10">XXX-XX-XXXX</text>
            <text x="0" y="62" textAnchor="middle" fontFamily="Arial" fontSize="22" fill="#8AAAC8">YOUR NAME HERE</text>
            <text x="0" y="128" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="#4A6880">FOR SOCIAL SECURITY PURPOSES — NOT FOR IDENTIFICATION</text>
          </g>
        </svg>

        <div style={{
          position: 'absolute', bottom: 260, left: 0, right: 0,
          opacity: subIn,
          transform: `translateY(${interpolate(subIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(56, '#6B9AC4')}>THEN THE IRS</p>
          <p style={{ ...headline(56, '#EF4444'), marginTop: 8 }}>SENDS A BILL</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bigIn = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const barProgress = interpolate(frame, [30, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textIn = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 14, stiffness: 140 } });

  const barFill = Math.max(barProgress * 920 * 0.85, 0);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 320, left: 0, right: 0,
          transform: `scale(${bigIn})`,
          opacity: bigIn,
        }}>
          <p style={headline(240, ACCENT)}>85%</p>
        </div>

        <div style={{
          position: 'absolute', top: 720, left: 0, right: 0,
          opacity: bigIn,
        }}>
          <p style={headline(44, BLACK)}>OF YOUR SS BENEFITS</p>
          <p style={{ ...headline(44, BLACK), marginTop: 8 }}>CAN BE TAXED</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          <rect x="80" y="1020" width="920" height="80" rx="10" fill="#E5E7EB" />
          <rect x="80" y="1020" width={barFill} height="80" rx="10" fill={ACCENT} />
          <text x="80" y="1148" fontFamily="Arial Black" fontSize="28" fill="#9CA3AF">0%</text>
          <text x="540" y="1148" textAnchor="middle" fontFamily="Arial Black" fontSize="28" fill={ACCENT}>85% TAXABLE</text>
          <text x="1000" y="1148" textAnchor="middle" fontFamily="Arial Black" fontSize="28" fill="#9CA3AF">100%</text>
        </svg>

        <div style={{
          position: 'absolute', bottom: 300, left: 60, right: 60,
          opacity: textIn,
          transform: `translateY(${interpolate(textIn, [0, 1], [30, 0])}px)`,
        }}>
          <p style={{ ...headline(38, '#374151'), lineHeight: 1.4, textTransform: 'none' as const }}>
            Wild, right? Most retirees find out way too late to plan.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const yearIn = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const lineProgress = interpolate(frame, [30, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textIn = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 14, stiffness: 140 } });

  const lineW = lineProgress * 920;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 240, left: 0, right: 0,
          transform: `scale(${yearIn})`,
          opacity: yearIn,
        }}>
          <p style={headline(200, ACCENT)}>1983</p>
        </div>

        <div style={{
          position: 'absolute', top: 660, left: 0, right: 0,
          opacity: yearIn,
        }}>
          <p style={headline(36, WHITE)}>CONGRESS SET THE THRESHOLD AT</p>
          <p style={{ ...headline(100, '#F59E0B'), marginTop: 8 }}>$34,000</p>
          <p style={{ ...headline(32, '#6B9AC4'), marginTop: 8 }}>COMBINED INCOME FOR SINGLES</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          <line x1="80" y1="1250" x2="1000" y2="1250" stroke="#222" strokeWidth="2" />
          <line
            x1="80" y1="1250"
            x2={80 + lineW}
            y2={1250 - lineW * 0.26}
            stroke="#EF4444" strokeWidth="6" strokeLinecap="round"
          />
          <text x="380" y="1050" textAnchor="middle" fontFamily="Arial Black" fontSize="28" fill="#EF4444">INFLATION +350%</text>
          <line
            x1="80" y1="1250"
            x2={80 + lineW}
            y2="1250"
            stroke={ACCENT} strokeWidth="6" strokeLinecap="round"
          />
          <text x="540" y="1310" textAnchor="middle" fontFamily="Arial Black" fontSize="28" fill={ACCENT}>$34K THRESHOLD (NEVER MOVED)</text>
        </svg>

        <div style={{
          position: 'absolute', bottom: 240, left: 0, right: 0,
          opacity: textIn,
        }}>
          <p style={headline(52, '#EF4444')}>FROZEN FOR 40+ YEARS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const bar1P = interpolate(frame, [20, 80], [0, 10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2P = interpolate(frame, [45, 130], [0, 56], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionIn = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 14, stiffness: 140 } });

  const maxH = 580;
  const bar1H = Math.max((bar1P / 56) * maxH, 0);
  const bar2H = Math.max((bar2P / 56) * maxH, 0);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 220, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(60, BLACK)}>WHO PAYS THIS TAX</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          <rect x="160" y={1300 - bar1H} width="250" height={Math.max(bar1H, 2)} rx="10" fill="#9CA3AF" />
          <text x="285" y={Math.max(1300 - bar1H - 20, 320)} textAnchor="middle" fontFamily="Arial Black" fontSize="52" fill="#6B7280">{Math.round(bar1P)}%</text>
          <text x="285" y="1360" textAnchor="middle" fontFamily="Arial Black" fontSize="40" fill="#6B7280">1983</text>

          <rect x="670" y={1300 - bar2H} width="250" height={Math.max(bar2H, 2)} rx="10" fill={ACCENT} />
          <text x="795" y={Math.max(1300 - bar2H - 20, 320)} textAnchor="middle" fontFamily="Arial Black" fontSize="52" fill={ACCENT}>{Math.round(bar2P)}%</text>
          <text x="795" y="1360" textAnchor="middle" fontFamily="Arial Black" fontSize="40" fill={ACCENT}>TODAY</text>

          <line x1="120" y1="1300" x2="960" y2="1300" stroke="#D1D5DB" strokeWidth="3" />
        </svg>

        <div style={{
          position: 'absolute', bottom: 240, left: 60, right: 60,
          opacity: captionIn,
        }}>
          <p style={headline(44, '#374151')}>INFLATION DRAGGED EVERYONE<br />INTO THE TRAP</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyIn = spring({ frame, fps, config: { damping: 11, stiffness: 90 } });
  const counter = interpolate(frame, [20, 180], [0, 84000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subIn = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 14, stiffness: 140 } });

  const displayVal = Math.round(counter / 100) * 100;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          <g transform={`translate(540, 540) scale(${piggyIn * 2.4})`}>
            <ellipse cx="0" cy="20" rx="90" ry="70" fill="#F9A8D4" />
            <circle cx="84" cy="-18" r="42" fill="#F9A8D4" />
            <ellipse cx="116" cy="-10" rx="20" ry="14" fill="#F472B6" />
            <circle cx="111" cy="-13" r="4" fill="#BE185D" />
            <circle cx="121" cy="-13" r="4" fill="#BE185D" />
            <circle cx="96" cy="-30" r="5" fill="#1F2937" />
            <circle cx="97" cy="-31" r="2" fill={WHITE} />
            <ellipse cx="72" cy="-58" rx="12" ry="18" fill="#F472B6" />
            <rect x="-14" y="-88" width="28" height="8" rx="4" fill="#1F2937" />
            <rect x="-72" y="78" width="26" height="34" rx="10" fill="#F9A8D4" />
            <rect x="-28" y="82" width="26" height="30" rx="10" fill="#F9A8D4" />
            <rect x="18" y="82" width="26" height="30" rx="10" fill="#F9A8D4" />
            <rect x="58" y="78" width="26" height="34" rx="10" fill="#F9A8D4" />
            <line x1="-40" y1="20" x2="40" y2="20" stroke="#BE185D" strokeWidth="4" strokeDasharray="8 4" />
            <circle cx="-20" cy="68" r="12" fill="#F59E0B" opacity="0.7" />
            <circle cx="10" cy="72" r="12" fill="#F59E0B" opacity="0.7" />
            <circle cx="38" cy="66" r="12" fill="#F59E0B" opacity="0.7" />
          </g>
        </svg>

        <div style={{
          position: 'absolute', top: 900, left: 0, right: 0,
        }}>
          <p style={headline(40, '#9CA3AF')}>DOUBLE TAXED OVER 20 YEARS</p>
          <p style={{ ...headline(144, '#EF4444'), marginTop: 8 }}>${displayVal.toLocaleString()}</p>
        </div>

        <div style={{
          position: 'absolute', bottom: 260, left: 0, right: 0,
          opacity: subIn,
        }}>
          <p style={headline(44, '#6B9AC4')}>$4,200/YEAR × 20 YEARS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const jarIn = spring({ frame, fps, config: { damping: 11, stiffness: 90 } });
  const item1 = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14, stiffness: 150 } });
  const item2 = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 14, stiffness: 150 } });
  const item3 = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 14, stiffness: 150 } });
  const ctaIn = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 14, stiffness: 150 } });

  const items = [
    { label: 'ROTH CONVERSIONS IN YOUR 50S', sp: item1 },
    { label: 'LOWER YOUR COMBINED INCOME', sp: item2 },
    { label: 'KEEP BENEFITS TAX-FREE', sp: item3 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          <g transform={`translate(540, 400) scale(${jarIn * 2.2})`}>
            <rect x="-60" y="-80" width="120" height="140" rx="12" fill="none" stroke={ACCENT} strokeWidth="5" />
            <rect x="-68" y="-98" width="136" height="28" rx="8" fill={ACCENT} />
            <text x="0" y="-78" textAnchor="middle" fontFamily="Arial Black" fontSize="16" fill={WHITE}>ROTH IRA</text>
            {[0, 1, 2, 3].map((i) => (
              <ellipse key={i} cx="0" cy={30 - i * 24} rx="45" ry="10" fill="#10B981" opacity="0.75" />
            ))}
            <text x="0" y="-38" textAnchor="middle" fontFamily="Arial Black" fontSize="13" fill={ACCENT}>TAX-FREE</text>
          </g>
        </svg>

        <div style={{ position: 'absolute', top: 740, left: 0, right: 0 }}>
          <p style={headline(80, BLACK)}>THE FIX</p>
        </div>

        <div style={{ position: 'absolute', top: 900, left: 80, right: 80 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 24, marginBottom: 48,
              opacity: item.sp,
              transform: `translateX(${interpolate(item.sp, [0, 1], [-40, 0])}px)`,
            }}>
              <div style={{
                width: 60, height: 60, borderRadius: '50%',
                background: ACCENT, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: WHITE, fontFamily: FONT, fontSize: 32, fontWeight: 900 }}>{i + 1}</span>
              </div>
              <p style={{ fontFamily: FONT, fontSize: 36, color: BLACK, margin: 0, letterSpacing: '0.08em' }}>{item.label}</p>
            </div>
          ))}
        </div>

        <div style={{
          position: 'absolute', bottom: 240, left: 0, right: 0,
          opacity: ctaIn,
          transform: `scale(${ctaIn})`,
        }}>
          <p style={headline(52, ACCENT)}>START THE MATH TODAY</p>
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
