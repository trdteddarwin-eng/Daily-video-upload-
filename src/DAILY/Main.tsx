import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#3B82F6';
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

  const buildingS = spring({ frame, fps, from: 0, to: 1, config: { damping: 14 } });
  const statS = spring({ frame: Math.max(0, frame - 20), fps, from: 0, to: 1, config: { damping: 10, stiffness: 80 } });
  const strikeW = interpolate(frame, [80, 118], [0, 700], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [100, 130], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 70px', gap: 44 }}>

        {/* Apartment building */}
        <div style={{ transformOrigin: 'center bottom', transform: `scale(${buildingS})` }}>
          <svg width="300" height="340" viewBox="0 0 300 340">
            <rect x="20" y="80" width="260" height="260" fill="#1A2438" stroke={ACCENT} strokeWidth="3" rx="2" />
            <polygon points="5,80 150,8 295,80" fill={ACCENT} />
            <rect x="40" y="100" width="50" height="36" fill="#FFD700" rx="3" />
            <rect x="125" y="100" width="50" height="36" fill="#1A1A3A" rx="3" />
            <rect x="210" y="100" width="50" height="36" fill="#FFD700" rx="3" />
            <rect x="40" y="152" width="50" height="36" fill="#1A1A3A" rx="3" />
            <rect x="125" y="152" width="50" height="36" fill="#FFD700" rx="3" />
            <rect x="210" y="152" width="50" height="36" fill="#1A1A3A" rx="3" />
            <rect x="40" y="204" width="50" height="36" fill="#FFD700" rx="3" />
            <rect x="125" y="204" width="50" height="36" fill="#1A1A3A" rx="3" />
            <rect x="210" y="204" width="50" height="36" fill="#FFD700" rx="3" />
            <rect x="112" y="260" width="76" height="80" fill="#0D1827" rx="4" />
            <circle cx="178" cy="300" r="6" fill={ACCENT} />
            <rect x="72" y="242" width="156" height="20" fill="#EF4444" rx="4" />
            <text x="150" y="257" textAnchor="middle" fill="white" fontSize="13" fontFamily="Arial" fontWeight="bold">FOR RENT</text>
          </svg>
        </div>

        {/* 73% stat */}
        <div style={{ transform: `scale(${statS})`, textAlign: 'center' }}>
          <div style={{ ...headline(168, ACCENT), lineHeight: 1 }}>73%</div>
          <div style={{ ...headline(34, WHITE), marginTop: 10, letterSpacing: '0.22em' }}>OF RENTERS BELIEVE</div>
        </div>

        {/* NEED 20% DOWN with animated strikethrough */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ ...headline(62, WHITE) }}>NEED 20% DOWN</div>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              height: 10,
              width: strikeW,
              background: '#EF4444',
              borderRadius: 5,
              transform: `translateY(-50%) translateX(${-strikeW / 2}px)`,
            }} />
          </div>
        </div>

        {/* Bottom message */}
        <div style={{ opacity: textOp, transform: `translateY(${textY}px)`, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 38, color: WHITE, lineHeight: 1.5, margin: 0, letterSpacing: '0.02em' }}>
            That myth is keeping millions<br />locked out for 14 extra years.
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bankS = spring({ frame, fps, from: 0, to: 1, config: { damping: 14 } });
  const titleOp = interpolate(frame, [18, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pill1Op = interpolate(frame, [48, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pill2Op = interpolate(frame, [78, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pill3Op = interpolate(frame, [108, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOp = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 70px', gap: 38 }}>

        {/* Bank building */}
        <div style={{ transformOrigin: 'center bottom', transform: `scale(${bankS})` }}>
          <svg width="300" height="260" viewBox="0 0 300 260">
            <polygon points="0,70 150,5 300,70" fill={ACCENT} />
            <rect x="0" y="70" width="300" height="190" fill="#1E3A5F" />
            <rect x="-8" y="248" width="316" height="12" fill="#152A45" />
            {[18, 62, 106, 150, 194, 238].map((cx, i) => (
              <rect key={i} x={cx} y="70" width="18" height="178" fill="#253F60" />
            ))}
            <rect x="118" y="175" width="64" height="85" fill="#0A1C30" rx="2" />
            <text x="150" y="48" textAnchor="middle" fontSize="28" fill="white" fontFamily="Arial Black">$</text>
          </svg>
        </div>

        {/* Title */}
        <div style={{ opacity: titleOp, textAlign: 'center' }}>
          <div style={{ ...headline(58, BLACK) }}>THE 20% RULE</div>
        </div>

        {/* Info pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: '100%' }}>
          <div style={{ opacity: pill1Op, background: '#1E3A5F', borderRadius: 16, padding: '20px 32px', textAlign: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 30, color: WHITE, letterSpacing: '0.1em' }}>CREATED IN 1934</span>
          </div>
          <div style={{ opacity: pill2Op, background: ACCENT, borderRadius: 16, padding: '20px 32px', textAlign: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 28, color: WHITE, letterSpacing: '0.08em' }}>TO PROTECT BANKS</span>
          </div>
          <div style={{ opacity: pill3Op, background: '#EF4444', borderRadius: 16, padding: '22px 32px', textAlign: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 38, color: WHITE, letterSpacing: '0.18em' }}>NOT YOU</span>
          </div>
        </div>

        {/* Bottom narration */}
        <div style={{ opacity: bottomOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: BLACK, lineHeight: 1.5, margin: 0, letterSpacing: '0.02em' }}>
            It's been outdated for decades,<br />but nobody told renters.
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1S = spring({ frame: Math.max(0, frame - 20), fps, from: 0, to: 1, config: { damping: 12, stiffness: 80 } });
  const card2S = spring({ frame: Math.max(0, frame - 62), fps, from: 0, to: 1, config: { damping: 12, stiffness: 80 } });
  const card3S = spring({ frame: Math.max(0, frame - 104), fps, from: 0, to: 1, config: { damping: 12, stiffness: 80 } });
  const bottomOp = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 70px', gap: 46 }}>

        {/* Title */}
        <div style={{ opacity: titleOp, textAlign: 'center' }}>
          <div style={{ ...headline(46, WHITE), lineHeight: 1.2 }}>THE REAL<br />REQUIREMENTS</div>
          <div style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, marginTop: 14, letterSpacing: '0.15em' }}>PROGRAMS AVAILABLE NOW</div>
        </div>

        {/* Loan cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: '100%' }}>

          {/* FHA */}
          <div style={{ transform: `scale(${card1S})`, background: '#0F2A4A', border: `4px solid ${ACCENT}`, borderRadius: 22, padding: '26px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: FONT, fontSize: 30, color: WHITE, letterSpacing: '0.08em' }}>FHA LOAN</div>
              <div style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, marginTop: 6, letterSpacing: '0.12em' }}>MIN. DOWN PAYMENT</div>
            </div>
            <div style={{ fontFamily: FONT, fontSize: 78, color: ACCENT, lineHeight: 1 }}>3.5%</div>
          </div>

          {/* VA */}
          <div style={{ transform: `scale(${card2S})`, background: '#0A2A1A', border: '4px solid #10B981', borderRadius: 22, padding: '26px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: FONT, fontSize: 30, color: WHITE, letterSpacing: '0.08em' }}>VA LOAN</div>
              <div style={{ fontFamily: FONT, fontSize: 20, color: '#10B981', marginTop: 6, letterSpacing: '0.12em' }}>FOR VETERANS</div>
            </div>
            <div style={{ fontFamily: FONT, fontSize: 78, color: '#10B981', lineHeight: 1 }}>0%</div>
          </div>

          {/* USDA */}
          <div style={{ transform: `scale(${card3S})`, background: '#2A1A00', border: '4px solid #F59E0B', borderRadius: 22, padding: '26px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: FONT, fontSize: 30, color: WHITE, letterSpacing: '0.08em' }}>USDA LOAN</div>
              <div style={{ fontFamily: FONT, fontSize: 20, color: '#F59E0B', marginTop: 6, letterSpacing: '0.12em' }}>RURAL AREAS</div>
            </div>
            <div style={{ fontFamily: FONT, fontSize: 78, color: '#F59E0B', lineHeight: 1 }}>0%</div>
          </div>

        </div>

        {/* Bottom narration */}
        <div style={{ opacity: bottomOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, lineHeight: 1.5, margin: 0, letterSpacing: '0.02em' }}>
            FHA needs just 3.5% down. VA<br />and USDA buyers? Zero dollars.
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, from: 0, to: 1, config: { damping: 14 } });
  const yearsN = interpolate(frame, [22, 130], [0, 14], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rentAmt = interpolate(frame, [40, 185], [0, 252000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOp = interpolate(frame, [38, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const equityOp = interpolate(frame, [140, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOp = interpolate(frame, [170, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 70px', gap: 34 }}>

        {/* Title */}
        <div style={{ transform: `scale(${titleS})`, textAlign: 'center' }}>
          <div style={{ ...headline(52, BLACK) }}>THE COST OF WAITING</div>
          <div style={{ fontFamily: FONT, fontSize: 34, color: '#EF4444', marginTop: 10, letterSpacing: '0.2em' }}>14 EXTRA YEARS</div>
        </div>

        {/* Year grid */}
        <svg width="612" height="240" viewBox="0 0 612 240">
          {Array.from({ length: 14 }, (_, i) => {
            const col = i % 7;
            const row = Math.floor(i / 7);
            const x = col * 86 + 6;
            const y = row * 114 + 6;
            const filled = i < Math.floor(yearsN);
            return (
              <g key={i}>
                <rect x={x} y={y} width="74" height="98" rx="10"
                  fill={filled ? '#EF4444' : '#E5E7EB'}
                  stroke={filled ? '#DC2626' : '#D1D5DB'}
                  strokeWidth="2"
                />
                <text x={x + 37} y={y + 35} textAnchor="middle" fill={filled ? 'white' : '#9CA3AF'} fontSize="13" fontFamily="Arial" fontWeight="bold">YEAR</text>
                <text x={x + 37} y={y + 67} textAnchor="middle" fill={filled ? 'white' : '#9CA3AF'} fontSize="24" fontFamily="Arial" fontWeight="bold">{i + 1}</text>
              </g>
            );
          })}
        </svg>

        {/* Rent counter */}
        <div style={{ opacity: counterOp, textAlign: 'center' }}>
          <div style={{ fontFamily: FONT, fontSize: 28, color: '#6B7280', letterSpacing: '0.12em' }}>RENT PAID TO LANDLORD</div>
          <div style={{ fontFamily: FONT, fontSize: 104, color: '#EF4444', lineHeight: 1.05 }}>
            ${Math.floor(rentAmt).toLocaleString()}
          </div>
          <div style={{ fontFamily: FONT, fontSize: 26, color: '#9CA3AF', letterSpacing: '0.1em' }}>$1,500 / MO × 14 YRS</div>
        </div>

        {/* Equity warning */}
        <div style={{ opacity: equityOp, background: '#FEE2E2', border: '3px solid #EF4444', borderRadius: 18, padding: '18px 36px', width: '100%', textAlign: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 30, color: '#EF4444', letterSpacing: '0.1em' }}>YOUR EQUITY BUILT: $0</span>
        </div>

        {/* Bottom */}
        <div style={{ opacity: bottomOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: BLACK, lineHeight: 1.5, margin: 0, letterSpacing: '0.02em' }}>
            Every month you wait, your<br />landlord's net worth grows.
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pmiS = spring({ frame: Math.max(0, frame - 15), fps, from: 0, to: 1, config: { damping: 12, stiffness: 80 } });
  const equityPct = interpolate(frame, [30, 160], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pmiBadgeOp = interpolate(frame, [56, 90], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pmiCancelOp = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const compareOp = interpolate(frame, [120, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOp = interpolate(frame, [165, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 70px', gap: 38 }}>

        {/* Title */}
        <div style={{ opacity: titleOp, textAlign: 'center' }}>
          <div style={{ ...headline(56, WHITE) }}>PMI IS NOT</div>
          <div style={{ ...headline(56, ACCENT) }}>THE MONSTER</div>
        </div>

        {/* PMI badge and cancelled badge overlaid */}
        <div style={{ position: 'relative', width: '100%', height: 190, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${pmiS})`,
            opacity: pmiBadgeOp,
            background: '#7F1D1D',
            border: '3px solid #EF4444',
            borderRadius: 24,
            padding: '22px 56px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}>
            <div style={{ fontFamily: FONT, fontSize: 24, color: '#FCA5A5', letterSpacing: '0.1em' }}>MONTHLY PMI</div>
            <div style={{ fontFamily: FONT, fontSize: 80, color: WHITE, lineHeight: 1.05 }}>$150</div>
          </div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: pmiCancelOp,
            background: '#064E3B',
            border: '3px solid #10B981',
            borderRadius: 24,
            padding: '22px 56px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}>
            <div style={{ fontFamily: FONT, fontSize: 24, color: '#6EE7B7', letterSpacing: '0.1em' }}>PMI STATUS</div>
            <div style={{ fontFamily: FONT, fontSize: 56, color: '#10B981', lineHeight: 1.1 }}>CANCELLED</div>
            <div style={{ fontFamily: FONT, fontSize: 20, color: '#6EE7B7', letterSpacing: '0.1em' }}>AT 20% EQUITY</div>
          </div>
        </div>

        {/* Equity progress bar */}
        <div style={{ width: '100%' }}>
          <div style={{ fontFamily: FONT, fontSize: 24, color: WHITE, letterSpacing: '0.12em', textAlign: 'center', marginBottom: 12 }}>EQUITY BUILDING</div>
          <div style={{ background: '#1E2A3A', borderRadius: 16, height: 60, overflow: 'hidden', border: `2px solid ${ACCENT}` }}>
            <div style={{ width: `${equityPct}%`, height: '100%', background: ACCENT, borderRadius: 14, display: 'flex', alignItems: 'center', paddingLeft: 16 }}>
              {equityPct >= 6 && (
                <span style={{ fontFamily: FONT, fontSize: 24, color: WHITE }}>{Math.floor(equityPct)}%</span>
              )}
            </div>
          </div>
          <div style={{ marginTop: 8, paddingLeft: '20%', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 2, height: 22, background: '#F59E0B' }} />
            <span style={{ fontFamily: FONT, fontSize: 20, color: '#F59E0B', letterSpacing: '0.1em' }}>PMI CANCELS HERE</span>
          </div>
        </div>

        {/* Comparison */}
        <div style={{ opacity: compareOp, display: 'flex', gap: 22, width: '100%' }}>
          <div style={{ flex: 1, background: '#1E1020', border: '2px solid #EF4444', borderRadius: 20, padding: '18px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#EF4444', letterSpacing: '0.06em' }}>PMI / YEAR</div>
            <div style={{ fontFamily: FONT, fontSize: 46, color: WHITE }}>$1,800</div>
          </div>
          <div style={{ flex: 1, background: '#1A0A0A', border: '2px solid #EF4444', borderRadius: 20, padding: '18px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#EF4444', letterSpacing: '0.06em' }}>RENT / YEAR</div>
            <div style={{ fontFamily: FONT, fontSize: 46, color: WHITE }}>$18,000</div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ opacity: bottomOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 35, color: WHITE, lineHeight: 1.5, margin: 0, letterSpacing: '0.02em' }}>
            PMI disappears at 20% equity.<br />Your rent never goes down.
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseS = spring({ frame, fps, from: 0, to: 1, config: { damping: 12 } });
  const keySlide = interpolate(frame, [22, 52], [-80, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const keyOp = interpolate(frame, [22, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const reqOp = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaS = spring({ frame: Math.max(0, frame - 100), fps, from: 0, to: 1, config: { damping: 10, stiffness: 80 } });
  const bottomOp = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 70px', gap: 34 }}>

        {/* House + key row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
          {/* House */}
          <div style={{ transformOrigin: 'center bottom', transform: `scale(${houseS})` }}>
            <svg width="220" height="200" viewBox="0 0 220 200">
              <rect x="158" y="15" width="22" height="55" fill="#374151" />
              <polygon points="0,96 110,10 220,96" fill={ACCENT} />
              <rect x="14" y="96" width="192" height="104" fill="#DBEAFE" stroke={ACCENT} strokeWidth="3" />
              <rect x="84" y="136" width="52" height="64" fill={ACCENT} rx="4" />
              <circle cx="128" cy="167" r="5" fill="white" />
              <rect x="24" y="108" width="50" height="40" fill="white" stroke={ACCENT} strokeWidth="2" rx="3" />
              <line x1="49" y1="108" x2="49" y2="148" stroke={ACCENT} strokeWidth="2" />
              <line x1="24" y1="128" x2="74" y2="128" stroke={ACCENT} strokeWidth="2" />
              <rect x="146" y="108" width="50" height="40" fill="white" stroke={ACCENT} strokeWidth="2" rx="3" />
              <line x1="171" y1="108" x2="171" y2="148" stroke={ACCENT} strokeWidth="2" />
              <line x1="146" y1="128" x2="196" y2="128" stroke={ACCENT} strokeWidth="2" />
              <circle cx="193" cy="42" r="28" fill="#10B981" />
              <polyline points="180,42 190,53 207,30" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Key */}
          <div style={{ transform: `translateX(${keySlide}px)`, opacity: keyOp }}>
            <svg width="160" height="70" viewBox="0 0 160 70">
              <circle cx="28" cy="35" r="24" fill="none" stroke={ACCENT} strokeWidth="9" />
              <circle cx="28" cy="35" r="10" fill="none" stroke={ACCENT} strokeWidth="6" />
              <rect x="50" y="29" width="104" height="12" fill={ACCENT} rx="6" />
              <rect x="95" y="41" width="12" height="18" fill={ACCENT} rx="3" />
              <rect x="118" y="41" width="12" height="13" fill={ACCENT} rx="3" />
              <rect x="138" y="41" width="10" height="16" fill={ACCENT} rx="3" />
            </svg>
          </div>
        </div>

        {/* Requirements */}
        <div style={{ opacity: reqOp, display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
          <div style={{ background: BLACK, borderRadius: 18, padding: '20px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE, letterSpacing: '0.06em' }}>CREDIT SCORE</span>
            <span style={{ fontFamily: FONT, fontSize: 52, color: ACCENT }}>580+</span>
          </div>
          <div style={{ background: BLACK, borderRadius: 18, padding: '20px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE, letterSpacing: '0.06em' }}>DOWN PAYMENT</span>
            <span style={{ fontFamily: FONT, fontSize: 52, color: '#10B981' }}>3.5%</span>
          </div>
          <div style={{ background: BLACK, borderRadius: 18, padding: '20px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE, letterSpacing: '0.06em' }}>INCOME PROOF</span>
            <span style={{ fontFamily: FONT, fontSize: 52, color: '#10B981' }}>✓</span>
          </div>
        </div>

        {/* CTA button */}
        <div style={{ transform: `scale(${ctaS})`, background: ACCENT, borderRadius: 24, padding: '26px 36px', width: '100%', textAlign: 'center' }}>
          <div style={{ fontFamily: FONT, fontSize: 36, color: WHITE, letterSpacing: '0.06em', lineHeight: 1.3 }}>
            THE DOOR IS OPEN.<br />CHECK YOUR ELIGIBILITY.
          </div>
        </div>

        {/* Bottom narration */}
        <div style={{ opacity: bottomOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, lineHeight: 1.5, margin: 0, letterSpacing: '0.02em' }}>
            A 580 score and 3.5% down might<br />be all you need. Stop waiting.
          </p>
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
