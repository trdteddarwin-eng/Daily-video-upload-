import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
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

// ─── SCENES ────────────────────────────────────────────────────────────────

// Scene 1 — Dark — Person & advisor, money flies to advisor's pocket
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personSlide = interpolate(frame, [0, 26], [-280, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const advisorSlide = interpolate(frame, [0, 26], [280, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const moneyX = interpolate(frame, [38, 82], [0, 196], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const moneyY = interpolate(frame, [38, 60, 82], [0, -52, -14], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const moneyOp = interpolate(frame, [76, 96], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnScale = spring({ frame: frame - 108, fps, config: { stiffness: 80, damping: 13 } });
  const subtitleOp = interpolate(frame, [128, 152], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 64px' }}>
        <div style={{ opacity: titleOp, lineHeight: 1.15, marginBottom: 64, ...headline(54, WHITE) }}>
          YOU TRUST<br />YOUR ADVISOR
        </div>

        {/* Characters row */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 36, width: '100%', marginBottom: 64 }}>
          {/* Person (client) */}
          <div style={{ transform: `translateX(${personSlide}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg width="88" height="116" viewBox="0 0 88 116">
              <circle cx="44" cy="26" r="24" fill={WHITE} />
              <rect x="16" y="56" width="56" height="56" rx="8" fill={WHITE} />
              <rect x="0" y="62" width="16" height="10" rx="5" fill={WHITE} />
              <rect x="72" y="62" width="16" height="10" rx="5" fill={WHITE} />
            </svg>
            <span style={{ fontFamily: FONT, fontSize: 19, color: WHITE, letterSpacing: '0.1em' }}>YOU</span>
          </div>

          {/* Flying dollar bill */}
          <div style={{ transform: `translate(${moneyX}px, ${moneyY}px)`, opacity: moneyOp, marginBottom: 38 }}>
            <svg width="86" height="48" viewBox="0 0 86 48">
              <rect width="86" height="48" rx="7" fill="#16A34A" />
              <rect x="5" y="5" width="76" height="38" rx="4" fill="none" stroke="#166534" strokeWidth="2" />
              <circle cx="43" cy="24" r="11" fill="#166534" />
              <text x="43" y="30" textAnchor="middle" fontSize="16" fontFamily="Arial Black" fontWeight="bold" fill="#F5F5F5">$</text>
            </svg>
          </div>

          {/* Advisor in suit */}
          <div style={{ transform: `translateX(${advisorSlide}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg width="88" height="116" viewBox="0 0 88 116">
              <circle cx="44" cy="24" r="22" fill="#D4A574" />
              <path d="M10,60 L28,52 L44,64 L60,52 L78,60 L78,114 L10,114 Z" fill="#1E40AF" />
              <path d="M28,52 L44,64 L44,84 L32,58 Z" fill="#F5F5F5" />
              <path d="M60,52 L44,64 L44,84 L56,58 Z" fill="#F5F5F5" />
              <path d="M41,64 L44,86 L47,64 L45.5,57 L42.5,57 Z" fill={ACCENT} />
              <rect x="50" y="76" width="18" height="14" rx="3" fill="#1B3A82" />
            </svg>
            <span style={{ fontFamily: FONT, fontSize: 19, color: WHITE, letterSpacing: '0.1em' }}>ADVISOR</span>
          </div>
        </div>

        {/* Warning */}
        <div style={{ transform: `scale(${warnScale})`, textAlign: 'center' as const, marginBottom: 14 }}>
          <div style={{ fontFamily: FONT, fontSize: 40, color: ACCENT, letterSpacing: '0.1em' }}>
            ZERO LEGAL DUTY
          </div>
        </div>
        <div style={{ opacity: subtitleOp, textAlign: 'center' as const }}>
          <div style={{ fontFamily: FONT, fontSize: 24, color: WHITE, opacity: 0.72, letterSpacing: '0.06em', fontWeight: 'normal' as const }}>
            to protect your money
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2 — Light — Fiduciary vs Suitability comparison
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftSlide = interpolate(frame, [0, 28], [-420, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightSlide = interpolate(frame, [0, 28], [420, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const checkScale = spring({ frame: frame - 50, fps, config: { stiffness: 80, damping: 12 } });
  const xScale = spring({ frame: frame - 65, fps, config: { stiffness: 80, damping: 12 } });
  const labelOp = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 48px' }}>
        <div style={{ opacity: titleOp, marginBottom: 48, ...headline(40, BLACK) }}>
          TWO TYPES OF<br />ADVISORS
        </div>

        <div style={{ display: 'flex', width: '100%', gap: 0 }}>
          {/* Fiduciary side */}
          <div style={{
            flex: 1,
            transform: `translateX(${leftSlide}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            padding: '32px 20px',
            background: '#DCFCE7',
            borderRadius: '20px 0 0 20px',
          }}>
            <div style={{ fontFamily: FONT, fontSize: 24, color: '#15803D', letterSpacing: '0.1em', textAlign: 'center' as const }}>FIDUCIARY</div>
            <div style={{ transform: `scale(${checkScale})` }}>
              <svg width="76" height="76" viewBox="0 0 76 76">
                <circle cx="38" cy="38" r="34" fill="#16A34A" />
                <path d="M20,38 L32,50 L56,24" stroke="#F5F5F5" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div style={{ fontFamily: FONT, fontSize: 17, color: '#15803D', textAlign: 'center' as const, letterSpacing: '0.05em', fontWeight: 'normal' as const, lineHeight: 1.5 }}>
              LEGALLY MUST<br />PUT YOU FIRST
            </div>
            <div style={{ opacity: labelOp, fontFamily: FONT, fontSize: 20, color: '#15803D', letterSpacing: '0.08em', textAlign: 'center' as const }}>
              ONLY 15%
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, background: '#E5E7EB' }}>
            <div style={{ fontFamily: FONT, fontSize: 20, color: '#9CA3AF', letterSpacing: '0.1em' }}>VS</div>
          </div>

          {/* Suitability side */}
          <div style={{
            flex: 1,
            transform: `translateX(${rightSlide}px)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            padding: '32px 20px',
            background: '#FEE2E2',
            borderRadius: '0 20px 20px 0',
          }}>
            <div style={{ fontFamily: FONT, fontSize: 24, color: '#DC2626', letterSpacing: '0.1em', textAlign: 'center' as const }}>SUITABILITY</div>
            <div style={{ transform: `scale(${xScale})` }}>
              <svg width="76" height="76" viewBox="0 0 76 76">
                <circle cx="38" cy="38" r="34" fill={ACCENT} />
                <path d="M24,24 L52,52 M52,24 L24,52" stroke="#F5F5F5" strokeWidth="6" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <div style={{ fontFamily: FONT, fontSize: 17, color: '#DC2626', textAlign: 'center' as const, letterSpacing: '0.05em', fontWeight: 'normal' as const, lineHeight: 1.5 }}>
              JUST CAN'T BE<br />"WRONG FOR YOU"
            </div>
            <div style={{ opacity: labelOp, fontFamily: FONT, fontSize: 20, color: '#DC2626', letterSpacing: '0.08em', textAlign: 'center' as const }}>
              85% OF ADVISORS
            </div>
          </div>
        </div>

        <div style={{ opacity: labelOp, marginTop: 36, fontFamily: FONT, fontSize: 22, color: '#6B7280', textAlign: 'center' as const, letterSpacing: '0.06em', fontWeight: 'normal' as const }}>
          Ask before you sign.
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3 — Dark — Annuity contract, 7% commission counter
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const docScale = spring({ frame, fps, config: { stiffness: 60, damping: 14 } });
  const arrowScale = spring({ frame: frame - 80, fps, config: { stiffness: 90, damping: 13 } });
  const counterVal = interpolate(frame, [105, 175], [0, 7000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOp = interpolate(frame, [100, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 64px' }}>
        <div style={{ opacity: titleOp, marginBottom: 44, lineHeight: 1.2, ...headline(42, WHITE) }}>
          THE ANNUITY<br />COMMISSION TRICK
        </div>

        {/* Contract document */}
        <div style={{ transform: `scale(${docScale})`, marginBottom: 28 }}>
          <svg width="230" height="280" viewBox="0 0 230 280">
            <rect x="8" y="0" width="214" height="272" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="2" />
            <rect x="28" y="22" width="174" height="14" rx="4" fill="#334155" />
            <rect x="28" y="48" width="130" height="9" rx="4" fill="#334155" />
            <rect x="28" y="66" width="150" height="9" rx="4" fill="#334155" />
            <rect x="28" y="84" width="110" height="9" rx="4" fill="#334155" />
            <rect x="28" y="110" width="174" height="2" rx="1" fill="#475569" />
            <text x="115" y="160" textAnchor="middle" fontSize="44" fontFamily="Arial Black" fontWeight="bold" fill={ACCENT}>7%</text>
            <text x="115" y="186" textAnchor="middle" fontSize="13" fontFamily="Arial" fill="#94A3B8">COMMISSION UPFRONT</text>
            <rect x="28" y="210" width="90" height="32" rx="6" fill={ACCENT} />
            <text x="73" y="231" textAnchor="middle" fontSize="12" fontFamily="Arial Black" fontWeight="bold" fill="#F5F5F5">SIGN HERE</text>
            <path d="M140,226 Q158,216 172,226" stroke="#94A3B8" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Downward arrow */}
        <div style={{ transform: `scale(${arrowScale})`, marginBottom: 20 }}>
          <svg width="36" height="46" viewBox="0 0 36 46">
            <path d="M18,0 L18,36 M6,24 L18,40 L30,24" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        {/* Dollar counter */}
        <div style={{ opacity: counterOp, textAlign: 'center' as const }}>
          <div style={{ fontFamily: FONT, fontSize: 64, color: ACCENT, letterSpacing: '0.04em', lineHeight: 1 }}>
            ${Math.floor(counterVal).toLocaleString()}
          </div>
          <div style={{ fontFamily: FONT, fontSize: 20, color: WHITE, opacity: 0.72, letterSpacing: '0.08em', fontWeight: 'normal' as const, marginTop: 10 }}>
            INTO THEIR POCKET
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4 — Light — $17 Billion stat from DOL study
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinsScale = spring({ frame: frame - 10, fps, config: { stiffness: 55, damping: 14 } });
  const bigNumScale = spring({ frame: frame - 45, fps, config: { stiffness: 60, damping: 13 } });
  const lostOp = interpolate(frame, [65, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sourceOp = interpolate(frame, [105, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coinRows = [0, 1, 2, 3, 4];
  const coinRowsB = [0, 1, 2, 3];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 64px' }}>
        <div style={{ opacity: titleOp, marginBottom: 40, lineHeight: 1.2, ...headline(38, BLACK) }}>
          WHAT CONFLICTED<br />ADVICE COSTS YOU
        </div>

        {/* Coin stacks */}
        <div style={{ transform: `scale(${coinsScale})`, marginBottom: 28 }}>
          <svg width="280" height="130" viewBox="0 0 280 130">
            {coinRows.map((i) => (
              <g key={i} transform={`translate(0,${96 - i * 17})`}>
                <ellipse cx="65" cy="10" rx="52" ry="11" fill={i === 4 ? '#FCD34D' : '#D97706'} />
                <rect x="13" y="0" width="104" height="10" fill={i === 4 ? '#FDE68A' : '#B45309'} />
                <ellipse cx="65" cy="0" rx="52" ry="11" fill={i === 4 ? '#FDE68A' : '#FCD34D'} />
              </g>
            ))}
            {coinRowsB.map((i) => (
              <g key={`b${i}`} transform={`translate(148,${102 - i * 17})`}>
                <ellipse cx="65" cy="10" rx="52" ry="11" fill={i === 3 ? '#FCD34D' : '#D97706'} />
                <rect x="13" y="0" width="104" height="10" fill={i === 3 ? '#FDE68A' : '#B45309'} />
                <ellipse cx="65" cy="0" rx="52" ry="11" fill={i === 3 ? '#FDE68A' : '#FCD34D'} />
              </g>
            ))}
          </svg>
        </div>

        {/* Big number */}
        <div style={{ transform: `scale(${bigNumScale})`, textAlign: 'center' as const, marginBottom: 12 }}>
          <div style={{ fontFamily: FONT, fontSize: 92, color: ACCENT, letterSpacing: '0.04em', lineHeight: 1 }}>$17B</div>
        </div>

        <div style={{ opacity: lostOp, textAlign: 'center' as const, marginBottom: 36 }}>
          <div style={{ fontFamily: FONT, fontSize: 26, color: BLACK, letterSpacing: '0.1em' }}>LOST EVERY YEAR</div>
        </div>

        {/* Source badge */}
        <div style={{ opacity: sourceOp, padding: '14px 28px', background: '#F1F5F9', borderRadius: 12 }}>
          <div style={{ fontFamily: FONT, fontSize: 15, color: '#64748B', letterSpacing: '0.06em', fontWeight: 'normal' as const, textAlign: 'center' as const }}>
            U.S. DEPARTMENT OF LABOR STUDY
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5 — Dark — How to find a fiduciary
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const magScale = spring({ frame: frame - 5, fps, config: { stiffness: 60, damping: 14 } });
  const item1Op = interpolate(frame, [42, 66], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item2Op = interpolate(frame, [64, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item3Op = interpolate(frame, [86, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: frame - 128, fps, config: { stiffness: 80, damping: 12 } });

  const items = [
    { label: 'FEE-ONLY ADVISOR', detail: 'Zero commissions', op: item1Op },
    { label: 'CFP OR RIA TITLE', detail: 'Highest legal standard', op: item2Op },
    { label: 'ASK: "ARE YOU A FIDUCIARY?"', detail: 'They must answer yes', op: item3Op },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ opacity: titleOp, marginBottom: 44, lineHeight: 1.2, ...headline(44, WHITE) }}>
          HOW TO FIND<br />THE RIGHT ONE
        </div>

        {/* Magnifying glass */}
        <div style={{ transform: `scale(${magScale})`, marginBottom: 36 }}>
          <svg width="120" height="132" viewBox="0 0 120 132">
            <circle cx="50" cy="50" r="43" fill="none" stroke={ACCENT} strokeWidth="8" />
            <circle cx="50" cy="50" r="33" fill="#1E293B" />
            <text x="50" y="45" textAnchor="middle" fontSize="13" fontFamily="Arial Black" fontWeight="bold" fill={ACCENT}>CFP</text>
            <text x="50" y="62" textAnchor="middle" fontSize="13" fontFamily="Arial Black" fontWeight="bold" fill="#F5F5F5">RIA</text>
            <line x1="84" y1="84" x2="115" y2="120" stroke={ACCENT} strokeWidth="8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Checklist */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 36 }}>
          {items.map((item) => (
            <div key={item.label} style={{
              opacity: item.op,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 22px',
              background: '#1E293B',
              borderRadius: 14,
              borderLeft: `5px solid ${ACCENT}`,
            }}>
              <svg width="26" height="26" viewBox="0 0 26 26">
                <circle cx="13" cy="13" r="12" fill={ACCENT} />
                <path d="M6,13 L11,18 L20,8" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <div>
                <div style={{ fontFamily: FONT, fontSize: 19, color: WHITE, letterSpacing: '0.07em' }}>{item.label}</div>
                <div style={{ fontFamily: FONT, fontSize: 15, color: '#94A3B8', letterSpacing: '0.05em', fontWeight: 'normal' as const }}>{item.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Badge */}
        <div style={{ transform: `scale(${badgeScale})`, padding: '12px 30px', background: ACCENT, borderRadius: 50 }}>
          <div style={{ fontFamily: FONT, fontSize: 20, color: WHITE, letterSpacing: '0.1em' }}>ONLY 15% QUALIFY</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6 — Light — Bar chart: fee drag cost + CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  // Bars grow: max height 280px. $761K bar = 280, $574K bar = (574/761)*280 ≈ 211
  const bar1H = interpolate(frame, [10, 70], [0, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [22, 82], [0, 211], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const diffOp = interpolate(frame, [88, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - 148, fps, config: { stiffness: 70, damping: 12 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ opacity: titleOp, marginBottom: 36, lineHeight: 1.2, ...headline(36, BLACK) }}>
          THE REAL COST<br />OF HIDDEN FEES
        </div>

        {/* Bar chart */}
        <div style={{ display: 'flex', gap: 52, alignItems: 'flex-end', height: 300, justifyContent: 'center', marginBottom: 14 }}>
          {/* Green bar — fiduciary */}
          <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 130, height: bar1H, background: '#16A34A', borderRadius: '10px 10px 0 0' }} />
            <div style={{ fontFamily: FONT, fontSize: 20, color: '#15803D', letterSpacing: '0.06em' }}>$761K</div>
          </div>
          {/* Red bar — with 1% drag */}
          <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 130, height: bar2H, background: ACCENT, borderRadius: '10px 10px 0 0' }} />
            <div style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, letterSpacing: '0.06em' }}>$574K</div>
          </div>
        </div>

        {/* Bar labels */}
        <div style={{ display: 'flex', gap: 52, justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 130, textAlign: 'center' as const, fontFamily: FONT, fontSize: 15, color: '#374151', fontWeight: 'normal' as const, letterSpacing: '0.05em' }}>
            FIDUCIARY<br />7% RETURN
          </div>
          <div style={{ width: 130, textAlign: 'center' as const, fontFamily: FONT, fontSize: 15, color: '#374151', fontWeight: 'normal' as const, letterSpacing: '0.05em' }}>
            WITH 1%<br />FEE DRAG
          </div>
        </div>

        {/* Difference callout */}
        <div style={{ opacity: diffOp, width: '100%', padding: '16px 24px', background: '#FEE2E2', borderRadius: 14, borderLeft: `5px solid ${ACCENT}`, marginBottom: 32 }}>
          <div style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, letterSpacing: '0.08em' }}>$187,000 DIFFERENCE</div>
          <div style={{ fontFamily: FONT, fontSize: 17, color: '#DC2626', letterSpacing: '0.04em', fontWeight: 'normal' as const, marginTop: 4 }}>
            on $100K invested over 30 years
          </div>
        </div>

        {/* CTA */}
        <div style={{ transform: `scale(${ctaScale})`, width: '100%', padding: '22px 28px', background: BLACK, borderRadius: 18, textAlign: 'center' as const }}>
          <div style={{ fontFamily: FONT, fontSize: 18, color: WHITE, letterSpacing: '0.08em', lineHeight: 1.5 }}>
            ASK YOUR ADVISOR RIGHT NOW:
          </div>
          <div style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, letterSpacing: '0.08em', marginTop: 6 }}>
            "ARE YOU A FIDUCIARY?"
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
