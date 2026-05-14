import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
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

// ── Scene 2: MIT study — card users pay 2x ───────────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const cashTagIn = spring({ fps, frame: Math.max(0, frame - 22), config: { damping: 12, mass: 1.0 } });
  const cardTagIn = spring({ fps, frame: Math.max(0, frame - 44), config: { damping: 12, mass: 1.0 } });
  const vsOpacity = interpolate(frame, [44, 64], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeIn = spring({ fps, frame: Math.max(0, frame - 80), config: { damping: 10, mass: 0.8 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 36,
      }}>
        <div style={{ transform: `translateY(${interpolate(titleIn, [0, 1], [-60, 0])}px)`, opacity: titleIn, textAlign: 'center' }}>
          <p style={headline(38, BLACK)}>MIT STUDY:</p>
          <p style={headline(38, ACCENT)}>SAME ITEM, DIFFERENT PAYMENT</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'flex-end' }}>
          <div style={{ transform: `scale(${cashTagIn})`, transformOrigin: 'bottom center' }}>
            <svg viewBox="0 0 160 200" width={150} height={188}>
              <rect x={10} y={30} width={140} height={155} rx={10} fill="#E8E8E8" stroke={BLACK} strokeWidth={3} />
              <circle cx={80} cy={22} r={12} fill="none" stroke={BLACK} strokeWidth={3} />
              <line x1={80} y1={34} x2={80} y2={30} stroke={BLACK} strokeWidth={3} />
              <text x={80} y={78} textAnchor="middle" fontSize={17} fontWeight="bold" fill={BLACK} fontFamily="Arial">CASH</text>
              <text x={80} y={130} textAnchor="middle" fontSize={46} fontWeight="bold" fill="#22C55E" fontFamily="Arial Black">$20</text>
              <rect x={50} y={155} width={60} height={16} rx={4} fill="#22C55E" opacity={0.3} />
              <rect x={55} y={158} width={50} height={10} rx={3} fill="#22C55E" opacity={0.6} />
            </svg>
          </div>

          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: '0 0 80px', opacity: vsOpacity }}>VS</p>

          <div style={{ transform: `scale(${cardTagIn})`, transformOrigin: 'bottom center' }}>
            <svg viewBox="0 0 160 200" width={150} height={188}>
              <rect x={10} y={30} width={140} height={155} rx={10} fill="#FEF3C7" stroke={ACCENT} strokeWidth={3} />
              <circle cx={80} cy={22} r={12} fill="none" stroke={ACCENT} strokeWidth={3} />
              <line x1={80} y1={34} x2={80} y2={30} stroke={ACCENT} strokeWidth={3} />
              <text x={80} y={78} textAnchor="middle" fontSize={17} fontWeight="bold" fill={BLACK} fontFamily="Arial">CARD</text>
              <text x={80} y={130} textAnchor="middle" fontSize={46} fontWeight="bold" fill={RED} fontFamily="Arial Black">$40</text>
              <rect x={45} y={150} width={70} height={22} rx={5} fill={ACCENT} opacity={0.5} />
              <rect x={45} y={150} width={70} height={8} rx={3} fill={ACCENT} opacity={0.8} />
            </svg>
          </div>
        </div>

        <div style={{
          transform: `scale(${badgeIn})`, transformOrigin: 'center center',
          background: RED, borderRadius: 100, width: 160, height: 160,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          <p style={{ ...headline(58, WHITE), letterSpacing: '0.05em' }}>2X</p>
          <p style={{ fontFamily: FONT, fontSize: 15, color: WHITE, margin: 0, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>MORE PAID</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 3: Neuroscience — swiping silences the alarm ────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const walletIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 12, mass: 1.0 } });
  const billsProgress = interpolate(frame, [35, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelIn = interpolate(frame, [95, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulseOp = interpolate(frame % 35, [0, 10, 20, 35], [0.3, 1, 0.5, 0.3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const billOffsets = [0, 14, 28, 42, 56];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 30,
      }}>
        <div style={{ transform: `translateY(${interpolate(titleIn, [0, 1], [-60, 0])}px)`, opacity: titleIn, textAlign: 'center' }}>
          <p style={headline(40, WHITE)}>SWIPE = BRAIN</p>
          <p style={headline(40, ACCENT)}>FEELS NOTHING</p>
        </div>

        <div style={{ transform: `scale(${walletIn})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 300 220" width={300} height={220}>
            <rect x={40} y={80} width={220} height={120} rx={14} fill="#2A2A2A" stroke={ACCENT} strokeWidth={3} />
            <rect x={40} y={80} width={220} height={38} rx={12} fill="#333" />
            <rect x={195} y={108} width={55} height={44} rx={10} fill="#1A1A1A" stroke={ACCENT} strokeWidth={2} />
            <circle cx={222} cy={130} r={10} fill={ACCENT} opacity={0.7} />
            {billOffsets.map((offset, i) => {
              const show = billsProgress > i * 0.18;
              const bx = interpolate(billsProgress, [i * 0.18, Math.min(1, i * 0.18 + 0.3)], [130, 40 + i * 20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const by = interpolate(billsProgress, [i * 0.18, Math.min(1, i * 0.18 + 0.3)], [95, 18 + offset], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              return show ? (
                <g key={`bill-${i}`}>
                  <rect x={bx} y={by} width={72} height={32} rx={4} fill="#22C55E" opacity={0.85} />
                  <rect x={bx + 6} y={by + 4} width={60} height={24} rx={3} fill="#16A34A" opacity={0.6} />
                  <text x={bx + 36} y={by + 21} textAnchor="middle" fontSize={13} fill={WHITE} fontFamily="Arial" fontWeight="bold">$100</text>
                </g>
              ) : null;
            })}
          </svg>
        </div>

        <div style={{ opacity: labelIn, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', flexDirection: 'row', alignItems: 'center', gap: 14,
            background: '#1E1E1E', borderRadius: 12, padding: '16px 28px', border: `2px solid ${ACCENT}`,
          }}>
            <svg viewBox="0 0 40 40" width={40} height={40}>
              <circle cx={20} cy={20} r={18} fill="none" stroke={ACCENT} strokeWidth={2.5} opacity={pulseOp} />
              <circle cx={20} cy={20} r={10} fill={ACCENT} opacity={0.8} />
              <text x={20} y={25} textAnchor="middle" fontSize={12} fill={BLACK} fontFamily="Arial" fontWeight="bold">!</text>
            </svg>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 18, color: ACCENT, margin: 0, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>INSULA FIRES</p>
              <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, margin: '4px 0 0', opacity: 0.75 }}>Pain signal = spending brake</p>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 4: The math — $31,000 in 10 years ──────────────────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const bar1In = spring({ fps, frame: Math.max(0, frame - 28), config: { damping: 14, mass: 1.0 } });
  const bar2In = spring({ fps, frame: Math.max(0, frame - 52), config: { damping: 14, mass: 1.0 } });
  const piggyIn = spring({ fps, frame: Math.max(0, frame - 90), config: { damping: 10, mass: 0.8 } });

  const maxBarH = 180;
  const bar1H = interpolate(bar1In, [0, 1], [0, maxBarH]);
  const bar2H = interpolate(bar2In, [0, 1], [0, maxBarH * 0.7]);
  const arrowOp = interpolate(bar2In, [0, 1], [0, 1]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <div style={{ transform: `translateY(${interpolate(titleIn, [0, 1], [-60, 0])}px)`, opacity: titleIn, textAlign: 'center' }}>
          <p style={headline(38, BLACK)}>THE MATH</p>
          <p style={headline(38, ACCENT)}>$1,500 / MONTH SPENDING</p>
        </div>

        <svg viewBox="0 0 340 240" width={340} height={240}>
          <line x1={40} y1={210} x2={300} y2={210} stroke={BLACK} strokeWidth={2} opacity={0.3} />
          <rect x={70} y={210 - bar1H} width={72} height={bar1H} rx={6} fill={RED} opacity={0.85} />
          <text x={106} y={210 - bar1H - 10} textAnchor="middle" fontSize={15} fill={BLACK} fontFamily="Arial" fontWeight="bold">$1,500</text>
          <text x={106} y={230} textAnchor="middle" fontSize={13} fill={BLACK} fontFamily="Arial">CARD</text>
          <rect x={190} y={210 - bar2H} width={72} height={bar2H} rx={6} fill="#22C55E" opacity={0.85} />
          <text x={226} y={210 - bar2H - 10} textAnchor="middle" fontSize={15} fill={BLACK} fontFamily="Arial" fontWeight="bold">$1,050</text>
          <text x={226} y={230} textAnchor="middle" fontSize={13} fill={BLACK} fontFamily="Arial">CASH</text>
          <path d="M142,80 L188,80" stroke={ACCENT} strokeWidth={3} opacity={arrowOp} />
          <text x={165} y={72} textAnchor="middle" fontSize={13} fill={ACCENT} fontFamily="Arial" fontWeight="bold" opacity={arrowOp}>$450 FREED</text>
        </svg>

        <div style={{ transform: `scale(${piggyIn})`, transformOrigin: 'center center' }}>
          <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20,
            background: ACCENT, borderRadius: 16, padding: '18px 32px',
          }}>
            <svg viewBox="0 0 64 64" width={56} height={56}>
              <ellipse cx={32} cy={38} rx={22} ry={18} fill="#FCD34D" />
              <circle cx={32} cy={22} r={12} fill="#FCD34D" />
              <ellipse cx={44} cy={40} rx={7} ry={5} fill="#F59E0B" />
              <circle cx={42} cy={40} r={1.5} fill={BLACK} />
              <circle cx={46} cy={40} r={1.5} fill={BLACK} />
              <circle cx={28} cy={19} r={2} fill={BLACK} />
              <ellipse cx={20} cy={16} rx={5} ry={7} fill="#F59E0B" />
              <rect x={28} y={10} width={8} height={3} rx={1.5} fill={BLACK} />
              <rect x={18} y={52} width={8} height={10} rx={3} fill="#F59E0B" />
              <rect x={38} y={52} width={8} height={10} rx={3} fill="#F59E0B" />
              <path d="M10,38 Q4,30 10,24" fill="none" stroke="#F59E0B" strokeWidth={3} strokeLinecap="round" />
            </svg>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 36, color: BLACK, margin: 0, letterSpacing: '0.05em' }}>$31,000</p>
              <p style={{ fontFamily: FONT, fontSize: 14, color: BLACK, margin: '4px 0 0', textTransform: 'uppercase' as const, opacity: 0.7 }}>Invested @ 7% in 10 years</p>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 5: Cash envelopes method ───────────────────────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const env1In = spring({ fps, frame: Math.max(0, frame - 25), config: { damping: 12, mass: 0.9 } });
  const env2In = spring({ fps, frame: Math.max(0, frame - 48), config: { damping: 12, mass: 0.9 } });
  const env3In = spring({ fps, frame: Math.max(0, frame - 71), config: { damping: 12, mass: 0.9 } });
  const xIn = spring({ fps, frame: Math.max(0, frame - 115), config: { damping: 10, mass: 0.8 } });
  const captionOp = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const labels = ['GROCERIES', 'DINING', 'FUN'];
  const envSprings = [env1In, env2In, env3In];
  const envColors = [ACCENT, '#3B82F6', '#22C55E'];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 36,
      }}>
        <div style={{ transform: `translateY(${interpolate(titleIn, [0, 1], [-60, 0])}px)`, opacity: titleIn, textAlign: 'center' }}>
          <p style={headline(42, WHITE)}>THE CASH</p>
          <p style={headline(42, ACCENT)}>ENVELOPE METHOD</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'flex-end' }}>
          {labels.map((label, i) => {
            const isEmpty = i === 2;
            const spr = envSprings[i];
            return (
              <div key={label} style={{
                transform: `translateY(${interpolate(spr, [0, 1], [60, 0])}px) scale(${spr})`,
                transformOrigin: 'bottom center', textAlign: 'center',
              }}>
                <svg viewBox="0 0 120 150" width={110} height={138}>
                  <rect x={5} y={35} width={110} height={110} rx={8} fill={isEmpty ? '#2A2A2A' : '#1E1E1E'} stroke={envColors[i]} strokeWidth={3} />
                  <path d={`M5,35 L60,72 L115,35`} fill={isEmpty ? '#1A1A1A' : '#252525'} />
                  <path d={`M5,35 L60,72 L115,35`} fill="none" stroke={envColors[i]} strokeWidth={3} />
                  {!isEmpty && (
                    <>
                      <rect x={22} y={80} width={76} height={22} rx={4} fill="#22C55E" opacity={0.7} />
                      <rect x={22} y={106} width={76} height={18} rx={4} fill="#22C55E" opacity={0.45} />
                    </>
                  )}
                  <text x={60} y={160} textAnchor="middle" fontSize={11} fill={envColors[i]} fontFamily="Arial" fontWeight="bold">{label}</text>
                </svg>
                {isEmpty && (
                  <div style={{ transform: `scale(${xIn})`, transformOrigin: 'center center', marginTop: -18 }}>
                    <svg viewBox="0 0 40 40" width={40} height={40}>
                      <line x1={6} y1={6} x2={34} y2={34} stroke={RED} strokeWidth={5} strokeLinecap="round" />
                      <line x1={34} y1={6} x2={6} y2={34} stroke={RED} strokeWidth={5} strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ opacity: captionOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0, opacity: 0.85 }}>
            Empty envelope = stop spending.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, margin: '6px 0 0' }}>
            No app. No willpower. Just physics.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 6: CTA — 93% cashless, use cash for top 2 ─────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const personIn = spring({ fps, frame: Math.max(0, frame - 25), config: { damping: 12, mass: 0.9 } });
  const statIn = spring({ fps, frame: Math.max(0, frame - 60), config: { damping: 12, mass: 0.8 } });
  const ctaIn = spring({ fps, frame: Math.max(0, frame - 100), config: { damping: 10, mass: 0.7 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <div style={{ transform: `translateY(${interpolate(titleIn, [0, 1], [-60, 0])}px)`, opacity: titleIn, textAlign: 'center' }}>
          <p style={headline(40, WHITE)}>93% OF TRANSACTIONS</p>
          <p style={headline(40, ACCENT)}>ARE NOW CASHLESS</p>
        </div>

        <div style={{ transform: `scale(${personIn})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 320 200" width={320} height={200}>
            <circle cx={160} cy={40} r={26} fill={WHITE} />
            <rect x={136} y={68} width={48} height={70} rx={8} fill={WHITE} />
            <rect x={110} y={72} width={28} height={50} rx={8} fill={WHITE} />
            <rect x={182} y={72} width={28} height={50} rx={8} fill={WHITE} />
            <rect x={136} y={136} width={20} height={48} rx={8} fill={WHITE} />
            <rect x={164} y={136} width={20} height={48} rx={8} fill={WHITE} />
            <rect x={56} y={96} width={54} height={26} rx={5} fill="#22C55E" opacity={0.9} />
            <text x={83} y={114} textAnchor="middle" fontSize={13} fill={WHITE} fontFamily="Arial" fontWeight="bold">CASH</text>
            <line x1={110} y1={108} x2={112} y2={108} stroke="#22C55E" strokeWidth={3} />
            <rect x={210} y={88} width={40} height={62} rx={7} fill="#1A1A1A" stroke={ACCENT} strokeWidth={2.5} />
            <rect x={215} y={94} width={30} height={44} rx={4} fill="#2A2A2A" />
            <circle cx={230} cy={144} r={4} fill={ACCENT} opacity={0.6} />
            <text x={230} y={119} textAnchor="middle" fontSize={9} fill={ACCENT} fontFamily="Arial">TAP</text>
            <line x1={182} y1={108} x2={208} y2={108} stroke={ACCENT} strokeWidth={3} />
            <line x1={160} y1={10} x2={160} y2={190} stroke={WHITE} strokeWidth={1} strokeDasharray="6 4" opacity={0.25} />
          </svg>
        </div>

        <div style={{ transform: `scale(${statIn})`, transformOrigin: 'center center', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 16, color: WHITE, margin: 0, opacity: 0.65, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>
            Almost nobody feels the pain anymore
          </p>
        </div>

        <div style={{
          transform: `translateY(${interpolate(ctaIn, [0, 1], [50, 0])}px) scale(${ctaIn})`,
          transformOrigin: 'center center',
          background: ACCENT, borderRadius: 14, padding: '20px 36px', textAlign: 'center',
        }}>
          <p style={headline(28, BLACK)}>CASH = BUILT-IN WILLPOWER</p>
          <p style={{ fontFamily: FONT, fontSize: 15, color: BLACK, margin: '8px 0 0', opacity: 0.7 }}>
            Use cash for your top 2 spend categories
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 1: Hook — cash pain is a feature ───────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const brainIn = spring({ fps, frame: Math.max(0, frame - 20), config: { damping: 12, mass: 0.9 } });
  const statIn = spring({ fps, frame: Math.max(0, frame - 55), config: { damping: 14, mass: 0.8 } });
  const pulseR = interpolate(frame % 30, [0, 15, 30], [70, 88, 70], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulseOp = interpolate(frame % 30, [0, 15, 30], [0.6, 0, 0.6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 32,
      }}>
        <div style={{
          transform: `translateY(${interpolate(titleIn, [0, 1], [-70, 0])}px)`,
          opacity: titleIn, textAlign: 'center',
        }}>
          <p style={headline(46, WHITE)}>CASH LITERALLY</p>
          <p style={headline(46, ACCENT)}>HURTS YOUR BRAIN</p>
          <p style={headline(46, WHITE)}>— AND THAT'S GOOD</p>
        </div>

        <div style={{ transform: `scale(${brainIn})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 280 250" width={280} height={250}>
            <circle cx={140} cy={125} r={pulseR} fill="none" stroke={ACCENT} strokeWidth={3} opacity={pulseOp} />
            <ellipse cx={140} cy={120} rx={72} ry={62} fill="#1E2A1E" stroke={ACCENT} strokeWidth={3} />
            <path d="M110,88 Q95,72 98,95 Q82,100 88,115 Q78,125 88,135 Q82,148 100,148 Q105,165 120,158 Q130,170 140,160 Q150,170 160,158 Q175,165 180,148 Q198,148 192,135 Q202,125 192,115 Q198,100 182,95 Q185,72 170,88" fill="#22342A" stroke={ACCENT} strokeWidth={2} />
            <circle cx={155} cy={115} r={18} fill={ACCENT} opacity={0.35} />
            <circle cx={155} cy={115} r={10} fill={ACCENT} opacity={0.75} />
            <text x={183} y={100} fontSize={13} fill={ACCENT} fontFamily="Arial" fontWeight="bold">PAIN</text>
            <line x1={163} y1={107} x2={181} y2={102} stroke={ACCENT} strokeWidth={2} />
            <path d="M118,105 Q130,98 142,105" fill="none" stroke={ACCENT} strokeWidth={2} opacity={0.6} />
            <path d="M115,120 Q130,112 145,120" fill="none" stroke={ACCENT} strokeWidth={2} opacity={0.6} />
            <path d="M120,135 Q133,127 147,135" fill="none" stroke={ACCENT} strokeWidth={2} opacity={0.6} />
          </svg>
        </div>

        <div style={{
          transform: `scale(${statIn})`, transformOrigin: 'center center',
          background: ACCENT, borderRadius: 16, padding: '20px 40px', textAlign: 'center',
        }}>
          <p style={{ ...headline(52, BLACK), letterSpacing: '0.05em' }}>30% LESS SPENDING</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: '6px 0 0', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>
            Cash users vs. card users
          </p>
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
        <Series.Sequence durationInFrames={225}><Scene1 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene2 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene3 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene4 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene5 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene6 dur={225} /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
