import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

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
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children,
  bg,
  dur,
}) => {
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

  const cartY = interpolate(frame, [0, 35], [200, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const badgeScale = spring({ frame: frame - 50, fps, config: { damping: 12, stiffness: 180 } });
  const badgeOp = interpolate(frame, [50, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const strikeOp = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

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
        <p style={{ ...headline(48, ACCENT), marginBottom: 32 }}>THE BULK BUYER TRAP</p>

        <div style={{ transform: `translateY(${cartY}px)` }}>
          <svg width="300" height="260" viewBox="0 0 300 260" style={{ display: 'block' }}>
            <path
              d="M22 38 L52 38 L72 78"
              fill="none"
              stroke={WHITE}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M72 78 L260 78 L242 188 L90 188 Z"
              fill="none"
              stroke={WHITE}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <line x1="88" y1="188" x2="244" y2="188" stroke={WHITE} strokeWidth="6" strokeLinecap="round" />
            <circle cx="118" cy="222" r="22" fill="none" stroke={WHITE} strokeWidth="6" />
            <circle cx="218" cy="222" r="22" fill="none" stroke={WHITE} strokeWidth="6" />
            <rect x="88" y="92" width="68" height="56" rx="4" fill={ACCENT} />
            <text x="122" y="126" fontFamily="Arial, sans-serif" fontSize="20" fill={BLACK} textAnchor="middle" fontWeight="bold">BULK</text>
            <rect x="164" y="96" width="36" height="52" rx="8" fill="#60a5fa" />
            <rect x="173" y="84" width="18" height="14" rx="4" fill="#60a5fa" />
            <rect x="208" y="112" width="42" height="60" rx="4" fill="#34d399" />
            <text x="229" y="148" fontFamily="Arial, sans-serif" fontSize="14" fill={BLACK} textAnchor="middle" fontWeight="bold">x24</text>
          </svg>
        </div>

        <div
          style={{
            transform: `scale(${badgeScale})`,
            opacity: badgeOp,
            background: '#EF4444',
            borderRadius: 16,
            padding: '18px 40px',
            marginTop: 20,
          }}
        >
          <p style={{ ...headline(70, WHITE), margin: 0 }}>$1,800 MORE</p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 28,
              color: WHITE,
              textAlign: 'center' as const,
              margin: '6px 0 0',
            }}
          >
            per year — not less
          </p>
        </div>

        <div style={{ marginTop: 22, opacity: strikeOp }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 34,
              color: WHITE,
              opacity: 0.6,
              textAlign: 'center' as const,
              margin: 0,
              textDecoration: 'line-through',
            }}
          >
            Feels Like Saving
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shelfIn = spring({ frame, fps, config: { damping: 14, stiffness: 160 } });
  const counterProg = interpolate(frame, [50, 175], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pctVal = Math.round(counterProg * 30);
  const subOp = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <p style={{ ...headline(44, BLACK), marginBottom: 32 }}>Your Brain on a Full Pantry</p>

        <div style={{ transform: `scale(${shelfIn})` }}>
          <svg width="380" height="220" viewBox="0 0 380 220" style={{ display: 'block' }}>
            <rect x="0" y="90" width="380" height="12" rx="3" fill="#8B4513" />
            <rect x="0" y="178" width="380" height="12" rx="3" fill="#8B4513" />
            <rect x="0" y="0" width="10" height="190" fill="#6b3410" />
            <rect x="370" y="0" width="10" height="190" fill="#6b3410" />
            <rect x="20" y="28" width="48" height="64" rx="3" fill={ACCENT} />
            <rect x="26" y="36" width="36" height="20" rx="2" fill={WHITE} opacity="0.7" />
            <rect x="80" y="22" width="32" height="70" rx="8" fill="#60a5fa" />
            <rect x="88" y="12" width="16" height="12" rx="4" fill="#60a5fa" />
            <rect x="124" y="38" width="36" height="54" rx="12" fill="#ef4444" />
            <rect x="173" y="30" width="44" height="62" rx="3" fill="#34d399" />
            <rect x="230" y="36" width="36" height="56" rx="12" fill="#f472b6" />
            <rect x="279" y="26" width="40" height="66" rx="8" fill="#a78bfa" />
            <rect x="287" y="16" width="24" height="12" rx="4" fill="#a78bfa" />
            <rect x="332" y="34" width="38" height="58" rx="3" fill="#fb923c" />
            <rect x="14" y="120" width="58" height="60" rx="3" fill="#F59E0B" />
            <rect x="84" y="130" width="30" height="50" rx="10" fill="#ef4444" />
            <rect x="125" y="130" width="30" height="50" rx="10" fill="#10B981" />
            <path d="M168 190 Q175 118 188 120 Q201 118 208 190 Z" fill="#60a5fa" opacity="0.9" />
            <rect x="222" y="148" width="34" height="34" rx="10" fill="#ef4444" />
            <rect x="222" y="120" width="34" height="30" rx="8" fill="#f87171" />
            <rect x="268" y="126" width="44" height="56" rx="3" fill="#34d399" />
            <rect x="325" y="130" width="42" height="52" rx="3" fill={ACCENT} opacity="0.9" />
          </svg>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' as const, opacity: subOp }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#4b5563', margin: '0 0 2px', textAlign: 'center' as const }}>
            Wharton study: you consume
          </p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 104,
              color: '#EF4444',
              fontWeight: 'bold',
              margin: 0,
              lineHeight: 1,
              textAlign: 'center' as const,
            }}
          >
            {pctVal}%
          </p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#4b5563', margin: '2px 0 0', textAlign: 'center' as const }}>
            faster when shelves are full
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const canIn = spring({ frame, fps, config: { damping: 14, stiffness: 160 } });

  const f1Y = interpolate(frame, [15, 65], [-110, 65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });
  const f1Op = interpolate(frame, [15, 25, 60, 68], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const f2Y = interpolate(frame, [55, 105], [-110, 65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });
  const f2Op = interpolate(frame, [55, 65, 100, 108], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const f3Y = interpolate(frame, [95, 145], [-110, 65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.in(Easing.quad),
  });
  const f3Op = interpolate(frame, [95, 105, 140, 148], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const counterProg = interpolate(frame, [30, 175], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dollarVal = Math.round(counterProg * 2080);

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
        <p style={{ ...headline(44, '#EF4444'), marginBottom: 24 }}>40% More Food Waste</p>

        <div style={{ position: 'relative', width: 280, height: 290 }}>
          <div style={{ position: 'absolute', left: 60, top: f1Y, opacity: f1Op }}>
            <svg width="58" height="38" viewBox="0 0 58 38">
              <rect x="3" y="5" width="52" height="28" rx="12" fill="#d97706" />
              <circle cx="20" cy="17" r="6" fill="#6d28d9" opacity="0.7" />
              <circle cx="36" cy="13" r="5" fill="#6d28d9" opacity="0.7" />
            </svg>
          </div>
          <div style={{ position: 'absolute', left: 140, top: f2Y, opacity: f2Op }}>
            <svg width="38" height="50" viewBox="0 0 38 50">
              <path d="M19 46 Q8 28 12 8 Q19 16 19 46Z" fill="#6b7280" />
              <path d="M19 46 Q30 28 26 8 Q19 16 19 46Z" fill="#9ca3af" />
            </svg>
          </div>
          <div style={{ position: 'absolute', left: 194, top: f3Y, opacity: f3Op }}>
            <svg width="38" height="48" viewBox="0 0 38 48">
              <rect x="4" y="4" width="30" height="40" rx="8" fill="#4b5563" />
              <line x1="4" y1="22" x2="34" y2="22" stroke="#6b7280" strokeWidth="2" />
              <text x="19" y="37" fontFamily="Arial, sans-serif" fontSize="9" fill="#9ca3af" textAnchor="middle">EXP</text>
            </svg>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: `translateX(-50%) scale(${canIn})`,
            }}
          >
            <svg width="200" height="178" viewBox="0 0 200 178" style={{ display: 'block' }}>
              <rect x="10" y="20" width="180" height="20" rx="6" fill="#9ca3af" />
              <rect x="70" y="6" width="60" height="16" rx="6" fill="#9ca3af" />
              <path d="M24 40 L16 168 L184 168 L176 40 Z" fill="#6b7280" />
              <line x1="68" y1="40" x2="64" y2="168" stroke="#4b5563" strokeWidth="3" />
              <line x1="100" y1="40" x2="100" y2="168" stroke="#4b5563" strokeWidth="3" />
              <line x1="132" y1="40" x2="136" y2="168" stroke="#4b5563" strokeWidth="3" />
              <rect x="16" y="162" width="168" height="12" rx="4" fill="#4b5563" />
            </svg>
          </div>
        </div>

        <div style={{ marginTop: 20, textAlign: 'center' as const }}>
          <p style={{ fontFamily: FONT, fontSize: 90, color: '#EF4444', margin: 0, textAlign: 'center' as const }}>
            ${dollarVal.toLocaleString()}
          </p>
          <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, margin: '4px 0 0', textAlign: 'center' as const }}>
            tossed every single year
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const row1Op = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2Op = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row3Op = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalScale = spring({ frame: frame - 140, fps, config: { damping: 12, stiffness: 200 } });
  const totalOp = interpolate(frame, [140, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
    fontFamily: FONT,
    fontSize: 38,
    color: BLACK,
  };

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
        <p style={{ ...headline(44, BLACK), marginBottom: 40 }}>The Real Cost of "Saving"</p>

        <div
          style={{
            background: WHITE,
            borderRadius: 20,
            padding: '40px 50px',
            width: '100%',
            boxShadow: '0 4px 30px rgba(0,0,0,0.12)',
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 26,
              color: '#6b7280',
              textAlign: 'center' as const,
              margin: '0 0 20px',
              letterSpacing: '0.1em',
            }}
          >
            ANNUAL BULK-BUY COST
          </p>
          <div style={{ height: 2, background: '#e5e7eb', marginBottom: 24 }} />

          <div style={{ ...rowStyle, opacity: row1Op }}>
            <span>Club Membership</span>
            <span style={{ color: ACCENT }}>$147</span>
          </div>

          <div style={{ ...rowStyle, opacity: row2Op }}>
            <span>In-Store Impulse Buys</span>
            <span style={{ color: '#EF4444' }}>$800</span>
          </div>

          <div style={{ ...rowStyle, opacity: row3Op, marginBottom: 0 }}>
            <span>Food Wasted</span>
            <span style={{ color: '#EF4444' }}>$853</span>
          </div>

          <div style={{ height: 2, background: '#e5e7eb', margin: '24px 0' }} />

          <div style={{ transform: `scale(${totalScale})`, opacity: totalOp }}>
            <div style={{ ...rowStyle, fontSize: 50, marginBottom: 0 }}>
              <span style={{ color: BLACK }}>TOTAL DAMAGE</span>
              <span style={{ color: '#EF4444' }}>$1,800</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftScale = spring({ frame, fps, config: { damping: 14, stiffness: 160 } });
  const rightScale = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 160 } });
  const vsOp = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOp = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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
        <p style={{ ...headline(46, WHITE), marginBottom: 50 }}>Brain vs Wallet</p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 36,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${leftScale})`,
            }}
          >
            <svg width="160" height="160" viewBox="0 0 160 160">
              <ellipse cx="80" cy="95" rx="62" ry="52" fill="#ec4899" opacity="0.9" />
              <ellipse cx="56" cy="78" rx="26" ry="20" fill="#f472b6" opacity="0.9" />
              <ellipse cx="104" cy="78" rx="26" ry="20" fill="#f472b6" opacity="0.9" />
              <path d="M44 104 Q80 84 116 104" fill="none" stroke="#be185d" strokeWidth="3" />
              <path d="M50 118 Q80 104 110 118" fill="none" stroke="#be185d" strokeWidth="3" />
              <circle cx="132" cy="28" r="24" fill={ACCENT} />
              <text x="132" y="36" fontFamily="Arial, sans-serif" fontSize="24" textAnchor="middle" fill={BLACK}>★</text>
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: '10px 0 0', textAlign: 'center' as const }}>
              Smart Saver!
            </p>
          </div>

          <div style={{ opacity: vsOp }}>
            <p style={{ fontFamily: FONT, fontSize: 46, color: WHITE, margin: 0 }}>VS</p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${rightScale})`,
            }}
          >
            <svg width="160" height="160" viewBox="0 0 160 160">
              <rect x="14" y="50" width="132" height="86" rx="12" fill="#6b7280" />
              <rect x="14" y="50" width="132" height="28" rx="12" fill="#4b5563" />
              <rect x="96" y="60" width="40" height="24" rx="10" fill="#374151" />
              <circle cx="116" cy="72" r="8" fill="#9ca3af" />
              <rect x="4" y="24" width="28" height="14" rx="3" fill="#34d399" transform="rotate(-18 18 31)" />
              <text x="9" y="34" fontFamily="Arial, sans-serif" fontSize="8" fill={BLACK} fontWeight="bold" transform="rotate(-18 9 31)">$$$</text>
              <rect x="118" y="14" width="28" height="14" rx="3" fill="#34d399" transform="rotate(12 132 21)" />
              <text x="122" y="24" fontFamily="Arial, sans-serif" fontSize="8" fill={BLACK} fontWeight="bold" transform="rotate(12 122 21)">$$$</text>
              <rect x="58" y="6" width="28" height="14" rx="3" fill="#34d399" transform="rotate(-4 72 13)" />
              <text x="62" y="16" fontFamily="Arial, sans-serif" fontSize="8" fill={BLACK} fontWeight="bold" transform="rotate(-4 62 16)">$$$</text>
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 28, color: '#EF4444', margin: '10px 0 0', textAlign: 'center' as const }}>
              Running Empty
            </p>
          </div>
        </div>

        <div style={{ marginTop: 44, opacity: captionOp }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0, textAlign: 'center' as const }}>
            That's the trap.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 32, color: '#9ca3af', margin: '8px 0 0', textAlign: 'center' as const }}>
            The good feeling is real.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 32, color: '#EF4444', margin: '8px 0 0', textAlign: 'center' as const }}>
            The savings aren't.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check1Scale = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 200 } });
  const check1Op = interpolate(frame, [20, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const check2Scale = spring({ frame: frame - 65, fps, config: { damping: 12, stiffness: 200 } });
  const check2Op = interpolate(frame, [65, 83], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame: frame - 110, fps, config: { damping: 10, stiffness: 150 } });
  const piggyOp = interpolate(frame, [110, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: frame - 155, fps, config: { damping: 12, stiffness: 220 } });
  const badgeOp = interpolate(frame, [155, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const checkBox: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 24,
    background: '#f0fdf4',
    borderRadius: 14,
    padding: '18px 24px',
    border: '2px solid #10B981',
    width: '100%',
  };

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
        <p style={{ ...headline(44, BLACK), marginBottom: 36, opacity: titleOp }}>
          How to Actually Save
        </p>

        <div style={{ ...checkBox, transform: `scale(${check1Scale})`, opacity: check1Op }}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" fill="#10B981" />
            <path d="M12 22 L19 29 L32 14" fill="none" stroke={WHITE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 32, color: '#1a1a1a', margin: 0, letterSpacing: '0.04em' }}>
            NON-PERISHABLES ONLY
          </p>
        </div>

        <div style={{ ...checkBox, transform: `scale(${check2Scale})`, opacity: check2Op }}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" fill="#10B981" />
            <path d="M12 22 L19 29 L32 14" fill="none" stroke={WHITE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 32, color: '#1a1a1a', margin: 0, letterSpacing: '0.04em' }}>
            ALWAYS USE A LIST
          </p>
        </div>

        <div style={{ opacity: piggyOp, transform: `scale(${piggyScale})`, marginTop: 10 }}>
          <svg width="180" height="142" viewBox="0 0 180 142">
            <ellipse cx="86" cy="86" rx="68" ry="52" fill="#10B981" />
            <circle cx="146" cy="72" r="30" fill="#10B981" />
            <ellipse cx="162" cy="82" rx="14" ry="10" fill="#a7f3d0" />
            <circle cx="157" cy="81" r="3" fill="#065f46" />
            <circle cx="165" cy="81" r="3" fill="#065f46" />
            <circle cx="150" cy="62" r="5" fill={WHITE} />
            <circle cx="152" cy="62" r="3" fill={BLACK} />
            <ellipse cx="139" cy="44" rx="10" ry="14" fill="#34d399" />
            <rect x="74" y="30" width="24" height="6" rx="3" fill="#065f46" />
            <rect x="34" y="122" width="20" height="16" rx="6" fill="#059669" />
            <rect x="64" y="122" width="20" height="16" rx="6" fill="#059669" />
            <rect x="94" y="122" width="20" height="16" rx="6" fill="#059669" />
            <rect x="124" y="122" width="20" height="16" rx="6" fill="#059669" />
            <path d="M20 76 Q8 62 16 52 Q24 42 16 32" fill="none" stroke="#34d399" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        <div
          style={{
            opacity: badgeOp,
            transform: `scale(${badgeScale})`,
            background: '#10B981',
            borderRadius: 16,
            padding: '14px 34px',
            marginTop: 14,
          }}
        >
          <p style={{ ...headline(58, WHITE), margin: 0 }}>$1,800 SAVED</p>
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
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene5 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene6 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
