import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
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

// Scene 1: Hook — 401k bar chart growing, red warning stamp
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 22], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [15, 75], [0, 220], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [30, 100], [0, 350], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3H = interpolate(frame, [50, 130], [0, 480], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stampProgress = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 10, stiffness: 100 } });
  const stampOpacity = interpolate(frame, [155, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bars = [
    { label: '40s', height: bar1H, color: '#EF444450' },
    { label: '50s', height: bar2H, color: '#EF444480' },
    { label: '60s', height: bar3H, color: ACCENT },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%', paddingTop: 140, paddingLeft: 60, paddingRight: 60 }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(34, ACCENT), marginBottom: 16 }}>RETIREMENT TRAP</p>
          <p style={{ ...headline(96, WHITE), lineHeight: 1.0, marginBottom: 8 }}>THE RMD</p>
          <p style={{ ...headline(96, ACCENT), lineHeight: 1.0, marginBottom: 70 }}>TAX BOMB</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 40, marginBottom: 50 }}>
          {bars.map(({ label, height, color }, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 100, height, background: color, borderRadius: '6px 6px 0 0' }} />
              <p style={{ ...headline(26, WHITE) }}>{label}</p>
            </div>
          ))}
        </div>
        <div style={{
          opacity: stampOpacity,
          transform: `scale(${stampProgress}) rotate(-8deg)`,
          border: `8px solid ${ACCENT}`,
          borderRadius: 16,
          padding: '18px 48px',
        }}>
          <p style={{ ...headline(44, ACCENT) }}>$400K HIDDEN TAX</p>
        </div>
      </div>
    </FadeScene>
  );
};

// Scene 2: Age 73 mandatory withdrawal
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const circleScale = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const personX = interpolate(frame, [20, 120], [-220, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOpacity = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowY = interpolate(frame, [130, 155], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerScale = spring({ frame: Math.max(0, frame - 165), fps, config: { damping: 10, stiffness: 90 } });
  const bannerOpacity = interpolate(frame, [165, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 60, paddingRight: 60, gap: 36 }}>
        <p style={{ ...headline(40, BLACK) }}>AT AGE...</p>
        <div style={{ transform: `scale(${circleScale})` }}>
          <div style={{ width: 240, height: 240, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ ...headline(120, WHITE), letterSpacing: '0.04em' }}>73</p>
          </div>
        </div>
        <div style={{ transform: `translateX(${personX}px)` }}>
          <svg width="110" height="170" viewBox="0 0 110 170">
            <circle cx="55" cy="28" r="26" fill={BLACK} />
            <rect x="34" y="58" width="42" height="64" rx="8" fill={BLACK} />
            <rect x="34" y="118" width="18" height="50" rx="6" fill={BLACK} />
            <rect x="58" y="118" width="18" height="50" rx="6" fill={BLACK} />
            <rect x="14" y="62" width="18" height="46" rx="6" fill={BLACK} />
            <rect x="78" y="62" width="18" height="46" rx="6" fill={BLACK} />
          </svg>
        </div>
        <div style={{ opacity: arrowOpacity, transform: `translateY(${arrowY}px)` }}>
          <svg width="56" height="72" viewBox="0 0 56 72">
            <line x1="28" y1="0" x2="28" y2="52" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
            <polygon points="8,46 48,46 28,72" fill={ACCENT} />
          </svg>
        </div>
        <div style={{ opacity: bannerOpacity, transform: `scale(${bannerScale})` }}>
          <div style={{ background: ACCENT, borderRadius: 14, padding: '20px 50px', textAlign: 'center' }}>
            <p style={{ ...headline(34, WHITE) }}>MANDATORY</p>
            <p style={{ ...headline(34, WHITE) }}>WITHDRAWAL</p>
          </div>
        </div>
      </div>
    </FadeScene>
  );
};

// Scene 3: The $2M math — vault, forced withdrawal, bracket meter
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const balanceCount = interpolate(frame, [0, 90], [0, 2000000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOp = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const withdrawScale = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 10, stiffness: 90 } });
  const withdrawOp = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bracketFill = interpolate(frame, [150, 210], [22, 32], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bracketOp = interpolate(frame, [145, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 60, paddingRight: 60, gap: 24 }}>
        <p style={{ ...headline(34, WHITE) }}>YOU SAVED</p>
        <svg width="130" height="110" viewBox="0 0 130 110">
          <rect x="8" y="8" width="114" height="94" rx="10" fill="#2a2a2a" stroke={WHITE} strokeWidth="4" />
          <circle cx="65" cy="55" r="30" fill="none" stroke={WHITE} strokeWidth="4" />
          <circle cx="65" cy="55" r="13" fill="#444" stroke={WHITE} strokeWidth="3" />
          <line x1="65" y1="30" x2="65" y2="42" stroke={WHITE} strokeWidth="3" strokeLinecap="round" />
          <line x1="65" y1="68" x2="65" y2="80" stroke={WHITE} strokeWidth="3" strokeLinecap="round" />
          <line x1="40" y1="55" x2="52" y2="55" stroke={WHITE} strokeWidth="3" strokeLinecap="round" />
          <line x1="78" y1="55" x2="90" y2="55" stroke={WHITE} strokeWidth="3" strokeLinecap="round" />
          <rect x="112" y="46" width="14" height="18" rx="4" fill="#2a2a2a" stroke={WHITE} strokeWidth="3" />
        </svg>
        <p style={{ ...headline(64, GREEN), letterSpacing: '0.04em' }}>
          ${Math.floor(balanceCount).toLocaleString()}
        </p>
        <div style={{ opacity: arrowOp }}>
          <svg width="50" height="58" viewBox="0 0 50 58">
            <line x1="25" y1="0" x2="25" y2="42" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <polygon points="7,36 43,36 25,58" fill={ACCENT} />
          </svg>
        </div>
        <div style={{ opacity: withdrawOp, transform: `scale(${withdrawScale})` }}>
          <div style={{ background: ACCENT, borderRadius: 12, padding: '16px 36px', textAlign: 'center' }}>
            <p style={{ ...headline(28, WHITE), marginBottom: 6 }}>FORCED WITHDRAWAL</p>
            <p style={{ ...headline(60, WHITE) }}>$77,000+</p>
          </div>
        </div>
        <div style={{ opacity: bracketOp, width: '100%' }}>
          <p style={{ ...headline(28, WHITE), marginBottom: 10 }}>TAX BRACKET</p>
          <div style={{ background: '#333', borderRadius: 40, height: 40, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${((bracketFill - 10) / 37) * 100}%`, background: `linear-gradient(90deg, #F59E0B, ${ACCENT})`, borderRadius: 40 }} />
            <div style={{ position: 'absolute', top: 0, right: 16, bottom: 0, display: 'flex', alignItems: 'center' }}>
              <p style={{ ...headline(28, WHITE) }}>{Math.floor(bracketFill)}%</p>
            </div>
          </div>
        </div>
      </div>
    </FadeScene>
  );
};

// Scene 4: Medicare IRMAA surcharge
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const crossScale = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const labelOp = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelY = interpolate(frame, [40, 65], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const billScale = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 10, stiffness: 80 } });
  const billOp = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const amountCount = interpolate(frame, [130, 210], [0, 7128], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 60, paddingRight: 60, gap: 28 }}>
        <div style={{ transform: `scale(${crossScale})` }}>
          <svg width="150" height="150" viewBox="0 0 150 150">
            <rect x="0" y="0" width="150" height="150" rx="18" fill={ACCENT} />
            <rect x="56" y="18" width="38" height="114" rx="6" fill={WHITE} />
            <rect x="18" y="56" width="114" height="38" rx="6" fill={WHITE} />
          </svg>
        </div>
        <div style={{ opacity: labelOp, transform: `translateY(${labelY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(60, BLACK) }}>IRMAA</p>
          <p style={{ ...headline(28, '#555555') }}>MEDICARE SURCHARGE</p>
        </div>
        <div style={{ opacity: billOp, transform: `scale(${billScale})`, background: WHITE, border: `5px solid ${ACCENT}`, borderRadius: 18, padding: '22px 56px', textAlign: 'center' }}>
          <p style={{ ...headline(26, BLACK), marginBottom: 6 }}>EXTRA BILL PER YEAR</p>
          <p style={{ ...headline(76, ACCENT) }}>
            ${Math.floor(amountCount).toLocaleString()}
          </p>
        </div>
        <p style={{ ...headline(30, ACCENT), marginTop: 8, lineHeight: 1.3 }}>
          YOUR FRUGALITY JUST GOT EXPENSIVE
        </p>
      </div>
    </FadeScene>
  );
};

// Scene 5: Social Security 85% taxable — card fill, three hit tags
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const redFillW = interpolate(frame, [30, 110], [0, 85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tag1Scale = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 10, stiffness: 120 } });
  const tag2Scale = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 10, stiffness: 120 } });
  const tag3Scale = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 10, stiffness: 120 } });
  const footerOp = interpolate(frame, [180, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const footerScale = spring({ frame: Math.max(0, frame - 180), fps, config: { damping: 8, stiffness: 130 } });

  const hitTags = [
    { label: 'RMD', sc: tag1Scale },
    { label: 'IRMAA', sc: tag2Scale },
    { label: 'SS TAX', sc: tag3Scale },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 60, paddingRight: 60, gap: 24 }}>
        <p style={{ ...headline(36, WHITE) }}>SOCIAL SECURITY</p>
        <div style={{ opacity: cardOp, position: 'relative', width: 540, height: 320 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#1E3A5F', borderRadius: 20, border: `4px solid ${WHITE}`, overflow: 'hidden' }}>
            <div style={{ background: '#0D2137', height: 68, display: 'flex', alignItems: 'center', paddingLeft: 28 }}>
              <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0, letterSpacing: '0.1em' }}>SOCIAL SECURITY</p>
            </div>
            <div style={{ padding: '18px 28px' }}>
              <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAC4DD', margin: '0 0 8px' }}>000-00-0000</p>
              <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, margin: 0 }}>YOUR NAME HERE</p>
            </div>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: `${ACCENT}CC`, width: `${redFillW}%` }} />
          </div>
          <div style={{ position: 'absolute', top: '50%', left: '43%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <p style={{ ...headline(82, WHITE), textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>85%</p>
            <p style={{ ...headline(26, WHITE), textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}>TAXABLE</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 18 }}>
          {hitTags.map(({ label, sc }, i) => (
            <div key={i} style={{ transform: `scale(${sc})`, background: ACCENT, borderRadius: 10, padding: '10px 22px', textAlign: 'center' }}>
              <p style={{ ...headline(24, WHITE) }}>{label}</p>
            </div>
          ))}
        </div>
        <div style={{ opacity: footerOp, transform: `scale(${footerScale})` }}>
          <p style={{ ...headline(30, ACCENT) }}>3 HITS. 1 ACCOUNT. WILD, RIGHT?</p>
        </div>
      </div>
    </FadeScene>
  );
};

// Scene 6: Roth conversion fix — conversion diagram, $400K saved counter, CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftScale = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const arrowOp = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowW = interpolate(frame, [50, 90], [0, 140], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightScale = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 12, stiffness: 70 } });
  const savedCount = interpolate(frame, [120, 210], [0, 400000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOp = interpolate(frame, [115, 132], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [190, 215], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 60, paddingRight: 60, gap: 28 }}>
        <p style={{ ...headline(40, BLACK) }}>THE FIX</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ transform: `scale(${leftScale})`, background: ACCENT, borderRadius: 16, padding: '22px 30px', textAlign: 'center', minWidth: 180 }}>
            <p style={{ ...headline(20, WHITE), marginBottom: 6 }}>TRADITIONAL</p>
            <p style={{ ...headline(20, WHITE) }}>401(K)</p>
            <svg width="56" height="48" viewBox="0 0 56 48" style={{ marginTop: 10 }}>
              <rect x="2" y="2" width="52" height="44" rx="6" fill="none" stroke={WHITE} strokeWidth="3" />
              <circle cx="28" cy="24" r="12" fill="none" stroke={WHITE} strokeWidth="3" />
              <circle cx="28" cy="24" r="5" fill={WHITE} />
            </svg>
          </div>
          <div style={{ opacity: arrowOp, overflow: 'hidden', width: arrowW, display: 'flex', alignItems: 'center' }}>
            <svg width="140" height="40" viewBox="0 0 140 40">
              <line x1="0" y1="20" x2="116" y2="20" stroke={BLACK} strokeWidth="5" strokeLinecap="round" />
              <polygon points="108,8 140,20 108,32" fill={BLACK} />
            </svg>
          </div>
          <div style={{ transform: `scale(${rightScale})`, background: GREEN, borderRadius: 16, padding: '22px 30px', textAlign: 'center', minWidth: 180 }}>
            <p style={{ ...headline(20, WHITE), marginBottom: 6 }}>ROTH</p>
            <p style={{ ...headline(20, WHITE) }}>IRA</p>
            <svg width="56" height="48" viewBox="0 0 56 48" style={{ marginTop: 10 }}>
              <circle cx="28" cy="24" r="22" fill="none" stroke={WHITE} strokeWidth="3" />
              <polyline points="14,25 22,34 42,13" fill="none" stroke={WHITE} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div style={{ background: '#EBEBEB', borderRadius: 12, padding: '14px 40px', border: `3px solid ${BLACK}` }}>
          <p style={{ ...headline(28, BLACK) }}>CONVERT AGES 60 → 72</p>
        </div>
        <div style={{ opacity: counterOp }}>
          <div style={{ background: GREEN, borderRadius: 16, padding: '18px 56px', textAlign: 'center' }}>
            <p style={{ ...headline(26, WHITE), marginBottom: 8 }}>YOU SAVE</p>
            <p style={{ ...headline(72, WHITE) }}>
              ${Math.floor(savedCount / 1000)}K
            </p>
            <p style={{ ...headline(22, WHITE), marginTop: 4 }}>IN RETIREMENT TAXES</p>
          </div>
        </div>
        <div style={{ opacity: ctaOp }}>
          <p style={{ ...headline(28, BLACK) }}>SEARCH: ROTH CONVERSION LADDER</p>
        </div>
      </div>
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
