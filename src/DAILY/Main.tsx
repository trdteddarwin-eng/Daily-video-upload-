import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

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

  const houseS = spring({ frame, fps, config: { damping: 18, stiffness: 60 }, from: 0, to: 1 });
  const coin1Y = interpolate(frame, [28, 52], [-50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin1Op = interpolate(frame, [28, 44, 60, 76], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin2Y = interpolate(frame, [52, 76], [-50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin2Op = interpolate(frame, [52, 68, 84, 100], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin3Y = interpolate(frame, [76, 100], [-50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin3Op = interpolate(frame, [76, 92, 108, 124], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [40, 64], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [40, 64], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [130, 152], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 70px' }}>
        <div style={{ position: 'relative', transform: `scale(${houseS})` }}>
          <svg width="200" height="180" viewBox="0 0 200 180">
            <rect x="30" y="90" width="140" height="90" rx="4" fill="#1E1E1E" stroke={ACCENT} strokeWidth="3" />
            <polygon points="15,90 100,20 185,90" fill={ACCENT} />
            <rect x="80" y="130" width="40" height="50" rx="4" fill="#374151" />
            <circle cx="115" cy="157" r="4" fill={ACCENT} />
            <rect x="88" y="52" width="24" height="5" rx="2.5" fill={BLACK} />
          </svg>
          <div style={{ position: 'absolute', left: 86, top: 18 + coin1Y, opacity: coin1Op }}>
            <svg width="28" height="28" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="13" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
              <text x="14" y="19" textAnchor="middle" fontSize="14" fill="#92400E" fontFamily="Arial Black">$</text>
            </svg>
          </div>
          <div style={{ position: 'absolute', left: 100, top: 18 + coin2Y, opacity: coin2Op }}>
            <svg width="28" height="28" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="13" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
              <text x="14" y="19" textAnchor="middle" fontSize="14" fill="#92400E" fontFamily="Arial Black">$</text>
            </svg>
          </div>
          <div style={{ position: 'absolute', left: 72, top: 18 + coin3Y, opacity: coin3Op }}>
            <svg width="28" height="28" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="13" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
              <text x="14" y="19" textAnchor="middle" fontSize="14" fill="#92400E" fontFamily="Arial Black">$</text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(50, WHITE)}>THE</p>
          <p style={{ ...headline(68, ACCENT), lineHeight: 1 }}>$1,000,000</p>
          <p style={headline(50, WHITE)}>MISTAKE</p>
        </div>

        <p style={{ ...headline(19, '#9CA3AF'), opacity: titleOp }}>MOST HOMEOWNERS GET THIS WRONG</p>

        <div style={{ opacity: tagOp, background: ACCENT, borderRadius: 12, padding: '12px 28px' }}>
          <p style={headline(19, BLACK)}>THE MATH WILL SHOCK YOU</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const docS = spring({ frame, fps, config: { damping: 16, stiffness: 90 }, from: 0, to: 1 });
  const highlightOp = interpolate(frame, [30, 54], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personS = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const qS = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 10, stiffness: 130 }, from: 0, to: 1 });
  const labelOp = interpolate(frame, [110, 134], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 70px' }}>
        <p style={{ ...headline(40, BLACK), transform: `scale(${docS})` }}>YOUR MORTGAGE</p>
        <p style={{ ...headline(20, '#6B7280'), transform: `scale(${docS})` }}>FEELS LIKE A GUARANTEED WIN</p>

        <div style={{ position: 'relative', transform: `scale(${docS})` }}>
          <svg width="260" height="160" viewBox="0 0 260 160">
            <rect x="10" y="10" width="240" height="140" rx="10" fill="white" stroke="#D1D5DB" strokeWidth="2" />
            <rect x="10" y="10" width="240" height="32" rx="10" fill="#E5E7EB" />
            <rect x="10" y="30" width="240" height="12" fill="#E5E7EB" />
            <text x="130" y="30" textAnchor="middle" fontSize="14" fill="#374151" fontFamily="Arial Black">MORTGAGE AGREEMENT</text>
            <line x1="30" y1="62" x2="230" y2="62" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="30" y1="82" x2="230" y2="82" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="30" y1="102" x2="230" y2="102" stroke="#E5E7EB" strokeWidth="1" />
            <line x1="30" y1="122" x2="230" y2="122" stroke="#E5E7EB" strokeWidth="1" />
            <text x="40" y="76" fontSize="13" fill="#9CA3AF" fontFamily="Arial">LOAN AMOUNT: $400,000</text>
            <text x="40" y="96" fontSize="13" fill="#9CA3AF" fontFamily="Arial">TERM: 30 YEARS</text>
            <text x="40" y="116" fontSize="14" fill="#374151" fontFamily="Arial Black">INTEREST RATE: 7.0%</text>
            <text x="40" y="136" fontSize="13" fill="#9CA3AF" fontFamily="Arial">MONTHLY PAYMENT: $2,661</text>
          </svg>
          <div style={{ position: 'absolute', left: 28, top: 102, opacity: highlightOp }}>
            <svg width="196" height="24" viewBox="0 0 196 24">
              <rect x="0" y="0" width="196" height="24" rx="4" fill={ACCENT} opacity={0.3} />
              <rect x="0" y="0" width="196" height="24" rx="4" fill="none" stroke={ACCENT} strokeWidth="2" />
            </svg>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ transform: `scale(${personS})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg width="80" height="100" viewBox="0 0 80 100">
              <circle cx="40" cy="22" r="18" fill="#374151" />
              <path d="M8 68 Q8 44 40 44 Q72 44 72 68 L72 95 L8 95 Z" fill="#374151" />
              <text x="40" y="78" textAnchor="middle" fontSize="12" fill={ACCENT} fontFamily="Arial Black">I'M</text>
              <text x="40" y="91" textAnchor="middle" fontSize="12" fill={ACCENT} fontFamily="Arial Black">SMART!</text>
            </svg>
          </div>
          <div style={{ transform: `scale(${qS})` }}>
            <svg width="80" height="100" viewBox="0 0 80 100">
              <circle cx="40" cy="44" r="36" fill={ACCENT} opacity={0.15} stroke={ACCENT} strokeWidth="3" />
              <text x="40" y="60" textAnchor="middle" fontSize="52" fill={ACCENT} fontFamily="Arial Black">?</text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: labelOp, background: '#FEF3C7', border: `2px solid ${ACCENT}`, borderRadius: 14, padding: '14px 28px', textAlign: 'center' }}>
          <p style={headline(20, '#92400E')}>7% RETURN FEELS GUARANTEED</p>
          <p style={{ ...headline(18, '#B45309'), marginTop: 4 }}>BUT HERE'S THE HIDDEN COST...</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const subOp = interpolate(frame, [14, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [28, 100], [0, 140], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [42, 120], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapOp = interpolate(frame, [124, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapS = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 10, stiffness: 120 }, from: 0, to: 1 });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 70px' }}>
        <p style={{ ...headline(44, WHITE), transform: `scale(${titleS})` }}>THE MATH</p>
        <p style={{ ...headline(19, '#9CA3AF'), opacity: subOp }}>OVER 100+ YEARS OF DATA</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 48, marginTop: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={headline(18, '#9CA3AF')}>MORTGAGE</p>
            <div style={{ width: 110, height: Math.max(0, bar1H), background: '#4B5563', borderRadius: '10px 10px 0 0', position: 'relative' }}>
              {bar1H > 50 ? (
                <div style={{ position: 'absolute', top: 8, left: 0, right: 0, textAlign: 'center' }}>
                  <p style={headline(24, WHITE)}>7%</p>
                </div>
              ) : null}
            </div>
            <div style={{ width: 110, height: 4, background: '#4B5563', borderRadius: 2 }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={headline(18, ACCENT)}>MARKET</p>
            <div style={{ width: 110, height: Math.max(0, bar2H), background: ACCENT, borderRadius: '10px 10px 0 0', position: 'relative' }}>
              {bar2H > 50 ? (
                <div style={{ position: 'absolute', top: 8, left: 0, right: 0, textAlign: 'center' }}>
                  <p style={headline(24, BLACK)}>10%</p>
                </div>
              ) : null}
            </div>
            <div style={{ width: 110, height: 4, background: ACCENT, borderRadius: 2 }} />
          </div>
        </div>

        <div style={{ opacity: gapOp, transform: `scale(${gapS})`, textAlign: 'center' }}>
          <p style={headline(22, '#9CA3AF')}>THE GAP THAT MATTERS</p>
          <p style={{ ...headline(88, ACCENT), lineHeight: 1 }}>+3%</p>
          <p style={headline(20, WHITE)}>EVERY YEAR, COMPOUNDING</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const leftS = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 16, stiffness: 80 }, from: 0, to: 1 });
  const rightS = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 16, stiffness: 80 }, from: 0, to: 1 });
  const leftAmtOp = interpolate(frame, [60, 84], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightAmtOp = interpolate(frame, [90, 114], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapOp = interpolate(frame, [140, 164], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 70px' }}>
        <p style={{ ...headline(40, BLACK), transform: `scale(${titleS})` }}>$500/MO EXTRA</p>
        <p style={{ ...headline(20, '#6B7280'), transform: `scale(${titleS})` }}>HERE'S WHAT ACTUALLY HAPPENS</p>

        <div style={{ display: 'flex', gap: 24, width: '100%' }}>
          <div style={{ flex: 1, transform: `scale(${leftS})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, background: '#F9FAFB', border: '2px solid #D1D5DB', borderRadius: 16, padding: '18px 12px' }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <rect x="10" y="32" width="44" height="30" rx="3" fill="#D1D5DB" />
              <polygon points="4,32 32,8 60,32" fill="#9CA3AF" />
              <rect x="24" y="44" width="16" height="18" rx="2" fill="#E5E7EB" />
              <circle cx="37" cy="53" r="2" fill="#9CA3AF" />
            </svg>
            <p style={headline(15, '#6B7280')}>EXTRA TO MORTGAGE</p>
            <div style={{ opacity: leftAmtOp, textAlign: 'center' }}>
              <p style={{ ...headline(42, '#374151'), lineHeight: 1 }}>$128K</p>
              <p style={headline(13, '#9CA3AF')}>INTEREST SAVED</p>
            </div>
          </div>

          <div style={{ flex: 1, transform: `scale(${rightS})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, background: '#FFFBEB', border: `2px solid ${ACCENT}`, borderRadius: 16, padding: '18px 12px' }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <line x1="6" y1="58" x2="6" y2="6" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="6" y1="58" x2="60" y2="58" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
              <path d="M6,52 C20,46 30,36 42,24 S56,10 58,10" fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
              <polygon points="58,4 52,12 64,12" fill={ACCENT} />
            </svg>
            <p style={headline(15, ACCENT)}>SAME $500 INVESTED</p>
            <div style={{ opacity: rightAmtOp, textAlign: 'center' }}>
              <p style={{ ...headline(42, ACCENT), lineHeight: 1 }}>$1.13M</p>
              <p style={headline(13, '#B45309')}>INVESTED BALANCE</p>
            </div>
          </div>
        </div>

        <div style={{ opacity: gapOp, background: ACCENT, borderRadius: 14, padding: '14px 28px', textAlign: 'center', width: '100%' }}>
          <p style={headline(20, BLACK)}>THAT'S A $1,000,000+ GAP</p>
          <p style={{ ...headline(18, BLACK), marginTop: 4 }}>ON THE SAME $500/MONTH</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const check1S = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 120 }, from: 0, to: 1 });
  const check2S = spring({ frame: Math.max(0, frame - 46), fps, config: { damping: 12, stiffness: 120 }, from: 0, to: 1 });
  const statS = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 10, stiffness: 90 }, from: 0, to: 1 });
  const crowdOp = interpolate(frame, [96, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const personCount = Math.max(0, Math.floor(7));
  const filledCount = Math.max(0, Math.floor(5));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 70px' }}>
        <p style={{ ...headline(36, WHITE), transform: `scale(${titleS})` }}>WHEN TO PAY EARLY</p>
        <p style={{ ...headline(20, '#9CA3AF'), transform: `scale(${titleS})` }}>ONLY 2 VALID REASONS</p>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ transform: `scale(${check1S})`, display: 'flex', alignItems: 'center', gap: 18, background: '#1E1E1E', borderRadius: 14, padding: '16px 22px', border: `2px solid ${ACCENT}` }}>
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill={ACCENT} />
              <path d="M10 20 L17 27 L30 13" fill="none" stroke={BLACK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p style={headline(18, ACCENT)}>RATE IS ABOVE 8%</p>
              <p style={{ fontFamily: FONT, fontSize: 14, color: '#9CA3AF', margin: 0, letterSpacing: '0.05em' }}>Market edge shrinks at high rates</p>
            </div>
          </div>

          <div style={{ transform: `scale(${check2S})`, display: 'flex', alignItems: 'center', gap: 18, background: '#1E1E1E', borderRadius: 14, padding: '16px 22px', border: `2px solid ${ACCENT}` }}>
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill={ACCENT} />
              <path d="M10 20 L17 27 L30 13" fill="none" stroke={BLACK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <p style={headline(18, ACCENT)}>CAN'T SLEEP WITH DEBT</p>
              <p style={{ fontFamily: FONT, fontSize: 14, color: '#9CA3AF', margin: 0, letterSpacing: '0.05em' }}>Emotional peace has real value</p>
            </div>
          </div>
        </div>

        <div style={{ transform: `scale(${statS})`, textAlign: 'center', background: '#EF4444', borderRadius: 16, padding: '14px 44px' }}>
          <p style={headline(20, WHITE)}>BUT RIGHT NOW</p>
          <p style={{ ...headline(88, WHITE), lineHeight: 1 }}>71%</p>
          <p style={headline(20, WHITE)}>LEAVING MILLIONS BEHIND</p>
        </div>

        <div style={{ opacity: crowdOp, display: 'flex', gap: 8, justifyContent: 'center' }}>
          {Array.from({ length: personCount }, (_, i) => (
            <svg key={i} width="30" height="44" viewBox="0 0 30 44">
              <circle cx="15" cy="10" r="8" fill={i < filledCount ? '#EF4444' : '#374151'} />
              <path d="M4 30 Q4 20 15 20 Q26 20 26 30 L26 44 L4 44 Z" fill={i < filledCount ? '#EF4444' : '#374151'} />
            </svg>
          ))}
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const leftCardOp = interpolate(frame, [14, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightCardS = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });
  const personS = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 12, stiffness: 100 }, from: 0, to: 1 });
  const card1Op = interpolate(frame, [110, 134], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [164, 186], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const chartBarH = interpolate(frame, [50, 160], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bar1H = Math.max(0, chartBarH * 0.28);
  const bar2H = Math.max(0, chartBarH * 0.42);
  const bar3H = Math.max(0, chartBarH * 0.58);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 70px' }}>
        <p style={{ ...headline(40, BLACK), transform: `scale(${titleS})` }}>THE RIGHT MOVE</p>
        <p style={{ ...headline(20, '#6B7280'), transform: `scale(${titleS})` }}>IF YOUR RATE IS UNDER 7%</p>

        <div style={{ display: 'flex', gap: 20, width: '100%', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, opacity: leftCardOp, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, background: '#F3F4F6', border: '2px solid #D1D5DB', borderRadius: 14, padding: '16px 10px' }}>
            <svg width="60" height="66" viewBox="0 0 60 66">
              <rect x="8" y="30" width="44" height="34" rx="3" fill="#D1D5DB" />
              <polygon points="2,30 30,6 58,30" fill="#9CA3AF" />
              <rect x="22" y="44" width="16" height="18" rx="2" fill="#E5E7EB" />
            </svg>
            <p style={headline(13, '#9CA3AF')}>PAY OFF HOUSE</p>
            <p style={{ ...headline(26, '#6B7280'), lineHeight: 1 }}>$128K</p>
            <p style={headline(11, '#9CA3AF')}>SAVED</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transform: `scale(${personS})` }}>
            <svg width="48" height="72" viewBox="0 0 48 72">
              <circle cx="24" cy="16" r="13" fill="#374151" />
              <path d="M6 48 Q6 32 24 32 Q42 32 42 48 L42 70 L6 70 Z" fill="#374151" />
            </svg>
            <svg width="38" height="26" viewBox="0 0 38 26">
              <polygon points="19,0 38,26 0,26" fill={ACCENT} />
            </svg>
          </div>

          <div style={{ flex: 1, transform: `scale(${rightCardS})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, background: '#FFFBEB', border: `3px solid ${ACCENT}`, borderRadius: 14, padding: '16px 10px' }}>
            <svg width="60" height="66" viewBox="0 0 60 66">
              <line x1="6" y1="60" x2="6" y2="6" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="6" y1="60" x2="56" y2="60" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
              <rect x="12" y={Math.max(6, 60 - bar1H)} width="11" height={bar1H} rx="2" fill={ACCENT} opacity={0.5} />
              <rect x="27" y={Math.max(6, 60 - bar2H)} width="11" height={bar2H} rx="2" fill={ACCENT} opacity={0.75} />
              <rect x="42" y={Math.max(6, 60 - bar3H)} width="11" height={bar3H} rx="2" fill={ACCENT} />
            </svg>
            <p style={headline(13, ACCENT)}>INVEST INSTEAD</p>
            <p style={{ ...headline(26, ACCENT), lineHeight: 1 }}>$1.13M</p>
            <p style={headline(11, '#B45309')}>BUILT UP</p>
          </div>
        </div>

        <div style={{ opacity: card1Op, background: ACCENT, borderRadius: 14, padding: '14px 28px', textAlign: 'center', width: '100%' }}>
          <p style={headline(20, BLACK)}>CHEAP DEBT IS A TOOL</p>
          <p style={{ ...headline(18, BLACK), marginTop: 4 }}>INVEST THE DIFFERENCE</p>
        </div>

        <div style={{ opacity: ctaOp, background: BLACK, borderRadius: 14, padding: '14px 36px' }}>
          <p style={headline(22, ACCENT)}>FOLLOW FOR MORE MONEY MATH</p>
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
