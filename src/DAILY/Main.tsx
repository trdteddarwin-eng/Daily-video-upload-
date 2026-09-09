import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

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
  lineHeight: 1.1,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene 1: The $12 price tag ───────────────────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headerY = interpolate(frame, [0, 30], [60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const headerOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const tagScale = spring({
    frame: Math.max(0, frame - 20),
    fps: 30,
    config: { damping: 14, stiffness: 100, mass: 1 },
  });

  const pricePulse = 1 + Math.sin(frame * 0.1) * 0.03;

  const iconsOpacity = interpolate(frame, [65, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>

        <div style={{ transform: `translateY(${headerY}px)`, opacity: headerOpacity, marginBottom: 36 }}>
          <p style={headline(54, WHITE)}>YOUR IDENTITY</p>
        </div>

        <div style={{ transform: `scale(${tagScale * pricePulse})`, lineHeight: 0 }}>
          <svg width="280" height="250" viewBox="0 0 280 250">
            <line x1="140" y1="2" x2="140" y2="30" stroke={WHITE} strokeWidth="4" strokeLinecap="round" />
            <circle cx="140" cy="44" r="16" fill="none" stroke={WHITE} strokeWidth="4" />
            <rect x="28" y="55" width="224" height="162" rx="18" fill={ACCENT} />
            <text x="140" y="175" textAnchor="middle" fill={WHITE} fontFamily="Arial Black, sans-serif" fontSize="100" fontWeight="900">$12</text>
          </svg>
        </div>

        <div style={{ opacity: tagScale, marginTop: 12 }}>
          <p style={headline(30, WHITE)}>FOR SALE ONLINE</p>
        </div>

        <div style={{ display: 'flex', gap: 36, marginTop: 36, opacity: iconsOpacity, alignItems: 'center' }}>
          <svg width="80" height="56" viewBox="0 0 80 56">
            <rect width="80" height="56" rx="8" fill="#2a2a2a" />
            <text x="40" y="34" textAnchor="middle" fill={WHITE} fontSize="18" fontFamily="Arial Black, sans-serif" fontWeight="900">SSN</text>
          </svg>
          <svg width="80" height="56" viewBox="0 0 80 56">
            <rect width="80" height="56" rx="8" fill="#3a3a3a" />
            <rect y="14" width="80" height="10" fill={ACCENT} />
            <rect x="8" y="34" width="34" height="6" rx="3" fill={WHITE} opacity="0.7" />
          </svg>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <rect x="4" y="28" width="56" height="28" fill={WHITE} />
            <rect x="10" y="34" width="8" height="18" fill={BG_DARK} />
            <rect x="28" y="34" width="8" height="18" fill={BG_DARK} />
            <rect x="46" y="34" width="8" height="18" fill={BG_DARK} />
            <polygon points="32,4 0,28 64,28" fill={WHITE} />
            <rect y="56" width="64" height="4" fill={WHITE} />
          </svg>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2: $12 buys all this ──────────────────────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const doc1Scale = spring({ frame: Math.max(0, frame - 15), fps: 30, config: { damping: 14, stiffness: 100, mass: 1 } });
  const doc2Scale = spring({ frame: Math.max(0, frame - 40), fps: 30, config: { damping: 14, stiffness: 100, mass: 1 } });
  const doc3Scale = spring({ frame: Math.max(0, frame - 65), fps: 30, config: { damping: 14, stiffness: 100, mass: 1 } });

  const warnOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 56 }}>
        <div style={{ opacity: titleOpacity, marginBottom: 8 }}>
          <p style={headline(44, BLACK)}>$12 BUYS ALL THIS</p>
        </div>
        <div style={{ opacity: titleOpacity, marginBottom: 44 }}>
          <p style={headline(28, ACCENT)}>for a complete stranger</p>
        </div>

        <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start', width: '100%', justifyContent: 'center' }}>
          <div style={{ transform: `scale(${doc1Scale})`, opacity: doc1Scale }}>
            <svg width="156" height="108" viewBox="0 0 156 108">
              <rect width="156" height="108" rx="12" fill={WHITE} stroke="#ddd" strokeWidth="2" />
              <circle cx="38" cy="52" r="24" fill="#e5e5e5" />
              <circle cx="38" cy="42" r="10" fill="#bbb" />
              <ellipse cx="38" cy="64" rx="14" ry="9" fill="#bbb" />
              <rect x="72" y="30" width="68" height="7" rx="3.5" fill="#ccc" />
              <rect x="72" y="44" width="52" height="7" rx="3.5" fill="#ccc" />
              <rect x="72" y="58" width="62" height="7" rx="3.5" fill="#ccc" />
              <text x="78" y="93" fill={ACCENT} fontSize="12" fontFamily="Arial Black, sans-serif" fontWeight="900">NAME + ADDRESS</text>
            </svg>
          </div>

          <div style={{ transform: `scale(${doc2Scale})`, opacity: doc2Scale }}>
            <svg width="156" height="108" viewBox="0 0 156 108">
              <rect width="156" height="108" rx="12" fill={WHITE} stroke="#ddd" strokeWidth="2" />
              <text x="78" y="36" textAnchor="middle" fill={BLACK} fontSize="14" fontFamily="Arial Black, sans-serif" fontWeight="900">SOCIAL SECURITY</text>
              <text x="78" y="62" textAnchor="middle" fill={ACCENT} fontSize="20" fontFamily="Arial Black, sans-serif" fontWeight="900">XXX-XX-1234</text>
              <rect x="18" y="76" width="120" height="2" fill="#eee" />
              <text x="78" y="96" textAnchor="middle" fill="#888" fontSize="12" fontFamily="Arial, sans-serif">COMPLETE HISTORY</text>
            </svg>
          </div>

          <div style={{ transform: `scale(${doc3Scale})`, opacity: doc3Scale }}>
            <svg width="156" height="108" viewBox="0 0 156 108">
              <rect width="156" height="108" rx="12" fill={WHITE} stroke="#ddd" strokeWidth="2" />
              <text x="78" y="28" textAnchor="middle" fill={BLACK} fontSize="14" fontFamily="Arial Black, sans-serif" fontWeight="900">CREDIT REPORT</text>
              <rect x="14" y="38" width="128" height="7" rx="3.5" fill="#e0e0e0" />
              <rect x="14" y="52" width="98" height="7" rx="3.5" fill="#e0e0e0" />
              <rect x="14" y="66" width="112" height="7" rx="3.5" fill="#e0e0e0" />
              <text x="78" y="96" textAnchor="middle" fill={ACCENT} fontSize="12" fontFamily="Arial Black, sans-serif" fontWeight="900">ALL ACCOUNTS</text>
            </svg>
          </div>
        </div>

        <div style={{ marginTop: 44, opacity: warnOpacity, background: ACCENT, borderRadius: 14, padding: '14px 44px' }}>
          <p style={headline(32, WHITE)}>WHILE YOU SLEEP</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: The damage ──────────────────────────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bankScale = spring({ frame: Math.max(0, frame - 10), fps: 30, config: { damping: 16, stiffness: 90, mass: 1 } });

  const count = Math.floor(interpolate(frame, [30, dur - 30], [0, 8167], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  const hoursOpacity = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const c0Y = interpolate(frame, [20, 52], [66, 114], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c1Y = interpolate(frame, [36, 68], [66, 108], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c2Y = interpolate(frame, [52, 84], [66, 118], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c0Op = interpolate(frame, [20, 34], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c1Op = interpolate(frame, [36, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c2Op = interpolate(frame, [52, 66], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <div style={{ opacity: titleOpacity, marginBottom: 32 }}>
          <p style={headline(50, WHITE)}>THE DAMAGE</p>
        </div>

        <div style={{ transform: `scale(${bankScale})`, lineHeight: 0 }}>
          <svg width="260" height="200" viewBox="0 0 260 200">
            <path d="M30 115 Q12 95 22 72 Q32 50 16 38" stroke="#E8956D" strokeWidth="8" fill="none" strokeLinecap="round" />
            <ellipse cx="120" cy="125" rx="88" ry="66" fill="#F4A460" />
            <circle cx="196" cy="110" r="42" fill="#F4A460" />
            <ellipse cx="184" cy="76" rx="13" ry="17" fill="#E8956D" />
            <circle cx="202" cy="98" r="5" fill={BG_DARK} />
            <ellipse cx="222" cy="117" rx="19" ry="15" fill="#E8956D" />
            <circle cx="216" cy="116" r="4" fill="#c4745a" />
            <circle cx="228" cy="116" r="4" fill="#c4745a" />
            <rect x="92" y="63" width="40" height="6" rx="3" fill={BG_DARK} />
            <path d="M96 66 L80 94" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
            <path d="M128 66 L144 90" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
            <rect x="45" y="180" width="22" height="18" rx="6" fill="#E8956D" />
            <rect x="76" y="180" width="22" height="18" rx="6" fill="#E8956D" />
            <rect x="107" y="180" width="22" height="18" rx="6" fill="#E8956D" />
            <rect x="138" y="180" width="22" height="18" rx="6" fill="#E8956D" />
            <g opacity={c0Op}>
              <circle cx="104" cy={c0Y} r="11" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
              <text x="104" y={c0Y + 5} textAnchor="middle" fill="#8B6914" fontSize="13" fontFamily="Arial Black, sans-serif">$</text>
            </g>
            <g opacity={c1Op}>
              <circle cx="122" cy={c1Y} r="11" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
              <text x="122" y={c1Y + 5} textAnchor="middle" fill="#8B6914" fontSize="13" fontFamily="Arial Black, sans-serif">$</text>
            </g>
            <g opacity={c2Op}>
              <circle cx="140" cy={c2Y} r="11" fill="#FFD700" stroke="#DAA520" strokeWidth="2" />
              <text x="140" y={c2Y + 5} textAnchor="middle" fill="#8B6914" fontSize="13" fontFamily="Arial Black, sans-serif">$</text>
            </g>
          </svg>
        </div>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#888888', margin: '0 0 6px 0', textAlign: 'center', letterSpacing: '0.12em' }}>
            AVERAGE LOSS
          </p>
          <p style={headline(82, ACCENT)}>${count.toLocaleString()}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22, opacity: hoursOpacity }}>
          <div style={{ width: 4, height: 44, background: ACCENT, borderRadius: 2 }} />
          <p style={headline(32, WHITE)}>200+ HOURS WASTED</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: The free fix ────────────────────────────────────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const phoneScale = spring({ frame: Math.max(0, frame - 10), fps: 30, config: { damping: 16, stiffness: 90, mass: 1 } });

  const lockOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const freeScale = spring({ frame: Math.max(0, frame - 60), fps: 30, config: { damping: 14, stiffness: 110, mass: 1 } });
  const minScale = spring({ frame: Math.max(0, frame - 85), fps: 30, config: { damping: 14, stiffness: 110, mass: 1 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <div style={{ opacity: titleOpacity, marginBottom: 36 }}>
          <p style={headline(44, BLACK)}>THE FREE FIX</p>
        </div>

        <div style={{ transform: `scale(${phoneScale})` }}>
          <svg width="200" height="350" viewBox="0 0 200 350">
            <rect x="10" y="10" width="180" height="330" rx="26" fill={BLACK} />
            <rect x="20" y="35" width="160" height="275" rx="14" fill="#0d1117" />
            <circle cx="100" cy="22" r="6" fill="#333" />
            <rect x="72" y="322" width="56" height="6" rx="3" fill="#333" />
            <text x="100" y="70" textAnchor="middle" fill="#555" fontFamily="Arial, sans-serif" fontSize="11">Credit Bureau ›</text>
            <path d="M100,88 L130,100 L130,132 Q130,164 100,176 Q70,164 70,132 L70,100 Z" fill={ACCENT} opacity={lockOpacity} />
            <rect x="86" y="126" width="28" height="22" rx="5" fill={WHITE} opacity={lockOpacity} />
            <path d="M91 126 Q91 115 100 115 Q109 115 109 126" fill="none" stroke={WHITE} strokeWidth="5" strokeLinecap="round" opacity={lockOpacity} />
            <circle cx="100" cy="135" r="4" fill={ACCENT} opacity={lockOpacity} />
            <rect x="97" y="135" width="6" height="8" rx="3" fill={ACCENT} opacity={lockOpacity} />
            <text x="100" y="196" textAnchor="middle" fill={WHITE} fontFamily="Arial Black, sans-serif" fontSize="12">CREDIT FREEZE</text>
            <text x="100" y="214" textAnchor="middle" fill="#4ade80" fontFamily="Arial, sans-serif" fontSize="11">● ACTIVE</text>
          </svg>
        </div>

        <div style={{ display: 'flex', gap: 48, marginTop: 28, alignItems: 'center' }}>
          <div style={{ textAlign: 'center', transform: `scale(${freeScale})` }}>
            <p style={headline(58, GREEN)}>FREE</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '6px 0 0 0', textAlign: 'center', letterSpacing: '0.1em' }}>always</p>
          </div>
          <div style={{ width: 2, height: 80, background: '#ccc' }} />
          <div style={{ textAlign: 'center', transform: `scale(${minScale})` }}>
            <p style={headline(58, ACCENT)}>5 MIN</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '6px 0 0 0', textAlign: 'center', letterSpacing: '0.1em' }}>to complete</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: Three bureaus ───────────────────────────────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const s1Scale = spring({ frame: Math.max(0, frame - 10), fps: 30, config: { damping: 14, stiffness: 100, mass: 1 } });
  const s2Scale = spring({ frame: Math.max(0, frame - 30), fps: 30, config: { damping: 14, stiffness: 100, mass: 1 } });
  const s3Scale = spring({ frame: Math.max(0, frame - 50), fps: 30, config: { damping: 14, stiffness: 100, mass: 1 } });

  const l1Op = interpolate(frame, [65, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const l2Op = interpolate(frame, [85, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const l3Op = interpolate(frame, [105, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const personOpacity = interpolate(frame, [130, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bureaus = [
    { label: 'EQUIFAX', ss: s1Scale, lo: l1Op },
    { label: 'EXPERIAN', ss: s2Scale, lo: l2Op },
    { label: 'TRANSUNION', ss: s3Scale, lo: l3Op },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <div style={{ opacity: titleOpacity, marginBottom: 8 }}>
          <p style={headline(44, WHITE)}>CREDIT FREEZE</p>
        </div>
        <div style={{ opacity: titleOpacity, marginBottom: 44 }}>
          <p style={headline(28, ACCENT)}>lock all three bureaus</p>
        </div>

        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
          {bureaus.map(({ label, ss, lo }) => (
            <div key={label} style={{ textAlign: 'center', transform: `scale(${ss})`, opacity: ss }}>
              <svg width="128" height="148" viewBox="0 0 128 148">
                <path d="M64,6 L118,26 L118,72 Q118,126 64,148 Q10,126 10,72 L10,26 Z" fill={ACCENT} />
                <path d="M64,16 L110,33 L110,72 Q110,120 64,140 Q18,120 18,72 L18,33 Z" fill="#c0392b" />
                <rect x="48" y="82" width="32" height="24" rx="5" fill={WHITE} opacity={lo} />
                <path d="M53 82 Q53 68 64 68 Q75 68 75 82" fill="none" stroke={WHITE} strokeWidth="6" strokeLinecap="round" opacity={lo} />
                <circle cx="64" cy="94" r="4" fill={ACCENT} opacity={lo} />
              </svg>
              <p style={{ fontFamily: FONT, fontSize: 15, color: WHITE, margin: '10px 0 0 0', textAlign: 'center', letterSpacing: '0.06em' }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 44, opacity: personOpacity, textAlign: 'center' }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke={GREEN} strokeWidth="5" />
            <path d="M28 50 L45 68 L72 34" stroke={GREEN} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 26, color: GREEN, margin: '10px 0 0 0', textAlign: 'center', letterSpacing: '0.08em' }}>
            YOU'RE PROTECTED
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: CTA ────────────────────────────────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const phoneScale = spring({ frame: Math.max(0, frame - 10), fps: 30, config: { damping: 16, stiffness: 90, mass: 1 } });

  const statOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shieldOpacity = interpolate(frame, [115, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 56 }}>
        <div style={{ opacity: titleOpacity, marginBottom: 8 }}>
          <p style={headline(44, BLACK)}>DO THIS TODAY</p>
        </div>
        <div style={{ opacity: titleOpacity, marginBottom: 24 }}>
          <p style={headline(26, '#888888')}>1 in 4 adults have done this</p>
        </div>

        <div style={{ transform: `scale(${phoneScale})` }}>
          <svg width="200" height="320" viewBox="0 0 200 320">
            <rect x="10" y="10" width="180" height="300" rx="26" fill={BLACK} />
            <rect x="20" y="35" width="160" height="248" rx="14" fill="#0d1117" />
            <circle cx="100" cy="22" r="6" fill="#333" />
            <rect x="72" y="298" width="56" height="5" rx="2.5" fill="#333" />
            <rect x="28" y="48" width="144" height="26" rx="13" fill="#1a1a2e" />
            <text x="100" y="65" textAnchor="middle" fill="#666" fontFamily="Arial, sans-serif" fontSize="10">freeze credit equifax</text>
            <rect x="24" y="88" width="152" height="44" rx="12" fill={ACCENT} />
            <text x="100" y="115" textAnchor="middle" fill={WHITE} fontFamily="Arial Black, sans-serif" fontSize="13" fontWeight="900">FREEZE YOUR CREDIT</text>
            <rect x="44" y="144" width="112" height="32" rx="16" fill={GREEN} />
            <text x="100" y="165" textAnchor="middle" fill={WHITE} fontFamily="Arial Black, sans-serif" fontSize="13" fontWeight="900">100% FREE</text>
            <text x="30" y="200" fill="#888" fontFamily="Arial, sans-serif" fontSize="10">1. Equifax.com › Security Freeze</text>
            <text x="30" y="216" fill="#888" fontFamily="Arial, sans-serif" fontSize="10">2. Experian.com › Security Freeze</text>
            <text x="30" y="232" fill="#888" fontFamily="Arial, sans-serif" fontSize="10">3. TransUnion.com › Freeze</text>
            <text x="30" y="258" fill={GREEN} fontFamily="Arial Black, sans-serif" fontSize="11">Done in 5 minutes. Free forever.</text>
          </svg>
        </div>

        <div style={{ marginTop: 16, opacity: statOpacity, background: '#f0f0f0', borderRadius: 14, padding: '12px 28px', textAlign: 'center' }}>
          <p style={headline(54, ACCENT)}>75%</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '4px 0 0 0', textAlign: 'center', letterSpacing: '0.06em' }}>
            of people haven't done this
          </p>
        </div>

        <div style={{ display: 'flex', gap: 20, marginTop: 18, opacity: shieldOpacity, alignItems: 'center' }}>
          {['EQ', 'EX', 'TU'].map((lbl) => (
            <svg key={lbl} width="58" height="68" viewBox="0 0 58 68">
              <path d="M29,4 L54,14 L54,34 Q54,58 29,66 Q4,58 4,34 L4,14 Z" fill={ACCENT} />
              <rect x="17" y="32" width="24" height="18" rx="4" fill={WHITE} />
              <path d="M20 32 Q20 23 29 23 Q38 23 38 32" fill="none" stroke={WHITE} strokeWidth="4.5" strokeLinecap="round" />
              <text x="29" y="49" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black, sans-serif" fontSize="8" fontWeight="900">{lbl}</text>
            </svg>
          ))}
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Root composition ─────────────────────────────────────────────────────────

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
