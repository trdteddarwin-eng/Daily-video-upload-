import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#22C55E';
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

// ── Scene 1: Hook — every $1 is secretly $7 ─────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const coinIn = spring({ fps, frame: Math.max(0, frame - 18), config: { damping: 10, mass: 0.9 } });
  const arrowIn = spring({ fps, frame: Math.max(0, frame - 48), config: { damping: 12, mass: 0.8 } });
  const badgeIn = spring({ fps, frame: Math.max(0, frame - 82), config: { damping: 10, mass: 0.7 } });
  const pulseR = interpolate(frame % 40, [0, 20, 40], [58, 76, 58], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulseOp = interpolate(frame % 40, [0, 20, 40], [0.5, 0, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 36,
      }}>
        <div style={{
          transform: `translateY(${interpolate(titleIn, [0, 1], [-70, 0])}px)`,
          opacity: titleIn, textAlign: 'center',
        }}>
          <p style={headline(48, WHITE)}>EVERY $1 YOU SPEND</p>
          <p style={headline(48, ACCENT)}>IS SECRETLY $7</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          {/* $1 coin */}
          <div style={{ transform: `scale(${coinIn})`, transformOrigin: 'center center' }}>
            <svg viewBox="0 0 130 130" width={120} height={120}>
              <circle cx={65} cy={65} r={pulseR} fill="none" stroke={ACCENT} strokeWidth={3} opacity={pulseOp} />
              <circle cx={65} cy={65} r={50} fill="#2A2A0A" stroke={ACCENT} strokeWidth={4} />
              <circle cx={65} cy={65} r={42} fill="#1A1A06" stroke={ACCENT} strokeWidth={1.5} opacity={0.5} />
              <text x={65} y={82} textAnchor="middle" fontSize={54} fontWeight="bold" fill={ACCENT} fontFamily="Arial Black">$</text>
            </svg>
          </div>

          {/* Arrow */}
          <div style={{ opacity: arrowIn, transform: `scaleX(${arrowIn})`, transformOrigin: 'left center' }}>
            <svg viewBox="0 0 80 36" width={72} height={32}>
              <line x1={4} y1={18} x2={60} y2={18} stroke={ACCENT} strokeWidth={5} strokeLinecap="round" />
              <polygon points="56,7 76,18 56,29" fill={ACCENT} />
            </svg>
          </div>

          {/* 7x coin */}
          <div style={{ transform: `scale(${arrowIn})`, transformOrigin: 'center center' }}>
            <svg viewBox="0 0 130 130" width={120} height={120}>
              <circle cx={65} cy={65} r={50} fill="#2A1800" stroke={ACCENT} strokeWidth={4} />
              <circle cx={65} cy={65} r={42} fill="#1A0F00" stroke={ACCENT} strokeWidth={1.5} opacity={0.5} />
              <text x={65} y={84} textAnchor="middle" fontSize={50} fontWeight="bold" fill={ACCENT} fontFamily="Arial Black">7×</text>
            </svg>
          </div>
        </div>

        <div style={{
          transform: `scale(${badgeIn})`, transformOrigin: 'center center',
          background: ACCENT, borderRadius: 18, padding: '22px 44px', textAlign: 'center',
        }}>
          <p style={headline(46, BLACK)}>$1 TODAY</p>
          <p style={headline(46, BLACK)}>= $7.61 LATER</p>
          <p style={{
            fontFamily: FONT, fontSize: 15, color: BLACK,
            margin: '10px 0 0', textTransform: 'uppercase' as const,
            letterSpacing: '0.1em', opacity: 0.65,
          }}>7% returns · 30 years</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 2: Compound interest bar chart ─────────────────────────────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const chartProgress = interpolate(frame, [28, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelIn = interpolate(frame, [148, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const years = [0, 5, 10, 15, 20, 25, 30];
  const maxVal = Math.pow(1.07, 30);
  const barMaxH = 200;
  const barW = 32;
  const gap = 12;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 48px', gap: 28,
      }}>
        <div style={{
          transform: `translateY(${interpolate(titleIn, [0, 1], [-60, 0])}px)`,
          opacity: titleIn, textAlign: 'center',
        }}>
          <p style={headline(40, BLACK)}>THE COMPOUND</p>
          <p style={headline(40, ACCENT)}>INTEREST MULTIPLIER</p>
        </div>

        <svg viewBox="0 0 340 280" width={340} height={280}>
          <line x1={20} y1={252} x2={320} y2={252} stroke={BLACK} strokeWidth={2} opacity={0.15} />
          {years.map((yr, i) => {
            const val = Math.pow(1.07, yr);
            const pct = Math.max(0, Math.min(1, (chartProgress - i * 0.1) / 0.45));
            const barH = (val / maxVal) * barMaxH * pct;
            const x = 22 + i * (barW + gap);
            const barColor = yr === 30 ? ACCENT : yr === 0 ? '#AAAAAA' : GREEN;
            const labelVal = yr === 0 ? '$1' : yr === 30 ? '$7.61' : null;
            return (
              <g key={`yr-${yr}`}>
                <rect x={x} y={252 - barH} width={barW} height={Math.max(0, barH)} rx={5} fill={barColor} opacity={0.9} />
                <text x={x + barW / 2} y={268} textAnchor="middle" fontSize={11} fill={BLACK} fontFamily="Arial">{yr}yr</text>
                {labelVal && pct > 0.85 && (
                  <text x={x + barW / 2} y={252 - barH - 8} textAnchor="middle" fontSize={13} fill={barColor} fontFamily="Arial" fontWeight="bold">{labelVal}</text>
                )}
              </g>
            );
          })}
        </svg>

        <div style={{
          opacity: labelIn,
          background: BLACK, borderRadius: 14, padding: '16px 30px',
          border: `2px solid ${ACCENT}`, textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 19, color: WHITE, margin: 0, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>
            Your money doubles every{' '}
            <span style={{ color: ACCENT }}>10 years</span>
          </p>
          <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, margin: '6px 0 0', opacity: 0.6 }}>
            at 7% average market return
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 3: Example 1 — the $200 dinner ─────────────────────────────────────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const iconIn = spring({ fps, frame: Math.max(0, frame - 22), config: { damping: 12, mass: 0.9 } });
  const tag1In = spring({ fps, frame: Math.max(0, frame - 55), config: { damping: 10, mass: 0.8 } });
  const arrowOp = interpolate(frame, [92, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowSX = interpolate(frame, [92, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tag2In = spring({ fps, frame: Math.max(0, frame - 112), config: { damping: 10, mass: 0.7 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 32,
      }}>
        <div style={{
          transform: `translateY(${interpolate(titleIn, [0, 1], [-60, 0])}px)`,
          opacity: titleIn, textAlign: 'center',
        }}>
          <p style={headline(36, WHITE)}>NUMBER ONE:</p>
          <p style={headline(46, ACCENT)}>THAT $200 DINNER</p>
        </div>

        <div style={{ transform: `scale(${iconIn})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 200 170" width={190} height={162}>
            <line x1={72} y1={18} x2={72} y2={155} stroke={WHITE} strokeWidth={6} strokeLinecap="round" />
            <line x1={59} y1={18} x2={59} y2={68} stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
            <line x1={85} y1={18} x2={85} y2={68} stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
            <path d="M59,68 Q72,82 85,68" fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
            <line x1={128} y1={18} x2={128} y2={155} stroke={WHITE} strokeWidth={6} strokeLinecap="round" />
            <path d="M128,18 L148,58 L128,78" fill="#555" stroke={WHITE} strokeWidth={2.5} strokeLinejoin="round" />
            <ellipse cx={100} cy={158} rx={58} ry={12} fill="none" stroke={WHITE} strokeWidth={3} opacity={0.3} />
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <div style={{
            transform: `scale(${tag1In})`, transformOrigin: 'center center',
            background: '#1E1E1E', borderRadius: 14, padding: '18px 28px',
            border: `2px solid ${WHITE}`, textAlign: 'center',
          }}>
            <p style={{ fontFamily: FONT, fontSize: 50, color: WHITE, margin: 0, letterSpacing: '0.04em' }}>$200</p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: WHITE, margin: '4px 0 0', opacity: 0.5, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>dinner price</p>
          </div>

          <div style={{ opacity: arrowOp, transform: `scaleX(${arrowSX})`, transformOrigin: 'left center' }}>
            <svg viewBox="0 0 72 36" width={72} height={36}>
              <text x={36} y={13} textAnchor="middle" fontSize={14} fill={ACCENT} fontFamily="Arial Black" fontWeight="bold">x 7</text>
              <line x1={4} y1={24} x2={58} y2={24} stroke={ACCENT} strokeWidth={4} strokeLinecap="round" />
              <polygon points="54,15 70,24 54,33" fill={ACCENT} />
            </svg>
          </div>

          <div style={{
            transform: `scale(${tag2In})`, transformOrigin: 'center center',
            background: RED, borderRadius: 14, padding: '18px 28px', textAlign: 'center',
          }}>
            <p style={{ fontFamily: FONT, fontSize: 50, color: WHITE, margin: 0, letterSpacing: '0.04em' }}>$1,400</p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: WHITE, margin: '4px 0 0', opacity: 0.85, textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>retirement cost</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 4: Example 2 — monthly non-essentials ──────────────────────────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const listProgress = interpolate(frame, [26, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalIn = spring({ fps, frame: Math.max(0, frame - 118), config: { damping: 10, mass: 0.7 } });

  const items = [
    { label: 'Dining Out', amt: '$340' },
    { label: 'Shopping', amt: '$280' },
    { label: 'Entertainment', amt: '$220' },
    { label: 'Subscriptions', amt: '$265' },
    { label: 'Impulse Buys', amt: '$392' },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 56px', gap: 22,
      }}>
        <div style={{
          transform: `translateY(${interpolate(titleIn, [0, 1], [-60, 0])}px)`,
          opacity: titleIn, textAlign: 'center',
        }}>
          <p style={headline(36, BLACK)}>NUMBER TWO:</p>
          <p style={headline(40, ACCENT)}>$1,497/MONTH GONE</p>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map((item, i) => {
            const itemOp = Math.max(0, Math.min(1, (listProgress - i * 0.16) / 0.3));
            const itemX = interpolate(listProgress, [i * 0.16, i * 0.16 + 0.3], [-44, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <div key={item.label} style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                alignItems: 'center', background: '#E8E8E8', borderRadius: 10,
                padding: '12px 20px', opacity: itemOp,
                transform: `translateX(${itemX}px)`,
              }}>
                <p style={{ fontFamily: FONT, fontSize: 17, color: BLACK, margin: 0, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>{item.label}</p>
                <p style={{ fontFamily: FONT, fontSize: 20, color: RED, margin: 0, letterSpacing: '0.04em' }}>{item.amt}</p>
              </div>
            );
          })}
        </div>

        <div style={{
          transform: `scale(${totalIn})`, transformOrigin: 'center center',
          background: RED, borderRadius: 14, padding: '16px 30px', textAlign: 'center',
        }}>
          <p style={headline(36, WHITE)}>= $125,748/YEAR</p>
          <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, margin: '6px 0 0', opacity: 0.8, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>
            In 30-year retirement value
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 5: Example 3 — the millionaire question ────────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const spenderIn = spring({ fps, frame: Math.max(0, frame - 24), config: { damping: 12, mass: 0.9 } });
  const saverIn = spring({ fps, frame: Math.max(0, frame - 52), config: { damping: 12, mass: 0.9 } });
  const questionIn = spring({ fps, frame: Math.max(0, frame - 100), config: { damping: 10, mass: 0.7 } });
  const piggyScale = interpolate(frame, [52, 185], [1.0, 1.35], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const moneyOp1 = interpolate(frame % 45, [0, 8, 20, 45], [0, 1, 0.6, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const moneyOp2 = interpolate((frame + 15) % 45, [0, 8, 20, 45], [0, 1, 0.6, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 28,
      }}>
        <div style={{
          transform: `translateY(${interpolate(titleIn, [0, 1], [-60, 0])}px)`,
          opacity: titleIn, textAlign: 'center',
        }}>
          <p style={headline(34, WHITE)}>NUMBER THREE:</p>
          <p style={headline(38, ACCENT)}>THE MILLIONAIRE QUESTION</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 48, alignItems: 'flex-end' }}>
          <div style={{ transform: `scale(${spenderIn})`, transformOrigin: 'center bottom', textAlign: 'center' }}>
            <svg viewBox="0 0 110 185" width={100} height={168}>
              <circle cx={55} cy={28} r={20} fill="#777" />
              <rect x={35} y={50} width={40} height={58} rx={9} fill="#777" />
              <rect x={18} y={54} width={20} height={40} rx={7} fill="#777" />
              <rect x={72} y={54} width={20} height={40} rx={7} fill="#777" />
              <rect x={35} y={106} width={17} height={42} rx={7} fill="#777" />
              <rect x={58} y={106} width={17} height={42} rx={7} fill="#777" />
              <text x={82} y={38} textAnchor="middle" fontSize={22} fill={RED} fontFamily="Arial Black" opacity={moneyOp1}>$</text>
              <text x={94} y={56} textAnchor="middle" fontSize={18} fill={RED} fontFamily="Arial Black" opacity={moneyOp2}>$</text>
              <text x={70} y={22} textAnchor="middle" fontSize={16} fill={RED} fontFamily="Arial Black" opacity={moneyOp2}>$</text>
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 13, color: '#888', margin: 0, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Spender</p>
          </div>

          <div style={{ transform: `scale(${saverIn})`, transformOrigin: 'center bottom', textAlign: 'center' }}>
            <svg viewBox="0 0 110 185" width={100} height={168}>
              <circle cx={55} cy={28} r={20} fill={ACCENT} />
              <rect x={35} y={50} width={40} height={58} rx={9} fill={ACCENT} />
              <rect x={18} y={54} width={20} height={40} rx={7} fill={ACCENT} />
              <rect x={72} y={54} width={20} height={40} rx={7} fill={ACCENT} />
              <rect x={35} y={106} width={17} height={42} rx={7} fill={ACCENT} />
              <rect x={58} y={106} width={17} height={42} rx={7} fill={ACCENT} />
            </svg>
            <div style={{ transform: `scale(${piggyScale})`, transformOrigin: 'center top', marginTop: -16 }}>
              <svg viewBox="0 0 70 60" width={70} height={60}>
                <ellipse cx={35} cy={42} rx={24} ry={16} fill="#FCD34D" />
                <circle cx={35} cy={26} r={13} fill="#FCD34D" />
                <ellipse cx={48} cy={44} rx={8} ry={6} fill="#F59E0B" />
                <circle cx={46} cy={44} r={1.5} fill={BLACK} />
                <circle cx={50} cy={44} r={1.5} fill={BLACK} />
                <circle cx={31} cy={23} r={2} fill={BLACK} />
                <ellipse cx={22} cy={20} rx={5} ry={7} fill="#F59E0B" />
                <rect x={30} y={13} width={8} height={3} rx={1.5} fill={BLACK} />
                <rect x={20} y={55} width={8} height={8} rx={3} fill="#F59E0B" />
                <rect x={42} y={55} width={8} height={8} rx={3} fill="#F59E0B" />
                <path d="M12,42 Q6,34 12,27" fill="none" stroke="#F59E0B" strokeWidth={3} strokeLinecap="round" />
              </svg>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 13, color: ACCENT, margin: 0, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Millionaire</p>
          </div>
        </div>

        <div style={{
          transform: `scale(${questionIn})`, transformOrigin: 'center center',
          background: '#1C1C1C', borderRadius: 16, padding: '20px 32px',
          border: `2px solid ${ACCENT}`, textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 15, color: WHITE, margin: 0, opacity: 0.6, textTransform: 'uppercase' as const, letterSpacing: '0.08em' }}>Before every purchase they ask:</p>
          <p style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, margin: '8px 0 0', letterSpacing: '0.04em', textAlign: 'center' as const }}>
            "Is this worth 7x to future me?"
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── Scene 6: CTA — multiply by 7 ─────────────────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ fps, frame, config: { damping: 14, mass: 0.8 } });
  const calcIn = spring({ fps, frame: Math.max(0, frame - 22), config: { damping: 12, mass: 0.9 } });
  const displayNum = Math.round(interpolate(frame, [55, 145], [0, 7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const ctaIn = spring({ fps, frame: Math.max(0, frame - 112), config: { damping: 10, mass: 0.7 } });
  const subIn = interpolate(frame, [148, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const btnLabels = ['7', '8', '9', '4', '5', '6', '1', '2', 'x7'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 60px', gap: 30,
      }}>
        <div style={{
          transform: `translateY(${interpolate(titleIn, [0, 1], [-60, 0])}px)`,
          opacity: titleIn, textAlign: 'center',
        }}>
          <p style={headline(40, BLACK)}>YOUR NEW RULE:</p>
          <p style={headline(48, ACCENT)}>MULTIPLY BY 7</p>
        </div>

        <div style={{ transform: `scale(${calcIn})`, transformOrigin: 'center center' }}>
          <svg viewBox="0 0 200 250" width={172} height={216}>
            <rect x={10} y={10} width={180} height={230} rx={16} fill="#1A1A1A" stroke={ACCENT} strokeWidth={3} />
            <rect x={22} y={26} width={156} height={52} rx={8} fill="#0A1A0A" />
            <text x={168} y={62} textAnchor="end" fontSize={30} fill={GREEN} fontFamily="Arial Black">x {displayNum}</text>
            {btnLabels.map((label, idx) => {
              const row = Math.floor(idx / 3);
              const col = idx % 3;
              const isAction = label === 'x7';
              const bx = 24 + col * 54;
              const by = 96 + row * 52;
              return (
                <g key={`btn-${idx}`}>
                  <rect x={bx} y={by} width={44} height={40} rx={8} fill={isAction ? ACCENT : '#2A2A2A'} />
                  <text x={bx + 22} y={by + 26} textAnchor="middle" fontSize={15} fill={isAction ? BLACK : WHITE} fontFamily="Arial" fontWeight="bold">{label}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{
          transform: `translateY(${interpolate(ctaIn, [0, 1], [50, 0])}px) scale(${ctaIn})`,
          transformOrigin: 'center center',
          background: ACCENT, borderRadius: 16, padding: '22px 36px', textAlign: 'center',
        }}>
          <p style={headline(30, BLACK)}>STILL WORTH IT?</p>
          <p style={headline(30, BLACK)}>BUY IT GUILT-FREE.</p>
        </div>

        <div style={{ opacity: subIn, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: 0, opacity: 0.65 }}>
            If not — your future self just got richer.
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
