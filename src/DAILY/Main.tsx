import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED_CLR = '#EF4444';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const BODY_FONT = '"Arial", Helvetica, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.15,
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

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 22], [-40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s1Op = interpolate(frame, [24, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s2Op = interpolate(frame, [40, 56], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s3Op = interpolate(frame, [56, 72], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOp = interpolate(frame, [82, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowProg = spring({ frame: frame - 82, fps, config: { damping: 14, stiffness: 80 } });
  const ctaOp = interpolate(frame, [115, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stocks = [
    { sym: 'TSLA', pct: '-22%', val: '$187' },
    { sym: 'META', pct: '-8%', val: '$312' },
    { sym: 'NVDA', pct: '-15%', val: '$599' },
  ];
  const ops = [s1Op, s2Op, s3Op];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 185, left: 0, right: 0,
        opacity: titleOp, transform: `translateY(${titleY}px)`,
        padding: '0 64px', textAlign: 'center',
      }}>
        <p style={{ ...headline(52, WHITE), marginBottom: 10 }}>YOUR LOSING STOCKS</p>
        <p style={{ ...headline(52, ACCENT) }}>ARE WORTH MONEY</p>
      </div>
      {stocks.map((s, i) => (
        <div key={s.sym} style={{
          position: 'absolute', top: 430 + i * 145, left: 72, right: 72,
          opacity: ops[i],
          background: 'rgba(239,68,68,0.12)', border: `2px solid ${RED_CLR}`,
          borderRadius: 18, padding: '26px 36px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontFamily: FONT, fontSize: 38, color: WHITE }}>{s.sym}</span>
          <span style={{ fontFamily: BODY_FONT, fontSize: 32, color: 'rgba(245,245,245,0.6)' }}>{s.val}</span>
          <span style={{ fontFamily: FONT, fontSize: 42, color: RED_CLR }}>{s.pct}</span>
        </div>
      ))}
      <div style={{
        position: 'absolute', top: 880, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        opacity: arrowOp,
      }}>
        <svg width="56" height="74" viewBox="0 0 56 74">
          <line x1="28" y1="4" x2="28" y2="52" stroke={ACCENT} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={48} strokeDashoffset={48 * (1 - arrowProg)} />
          <polygon points="12,46 28,70 44,46" fill={ACCENT} opacity={arrowProg} />
        </svg>
        <div style={{
          marginTop: 8, background: ACCENT, borderRadius: 18, padding: '22px 52px',
          transform: `scale(${Math.min(1, arrowProg)})`,
        }}>
          <p style={{ ...headline(36, BLACK), margin: 0 }}>TAX SAVINGS</p>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 150, left: 64, right: 64, opacity: ctaOp }}>
        <p style={{ fontFamily: BODY_FONT, fontSize: 30, color: 'rgba(245,245,245,0.75)', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
          The IRS built a legal shortcut almost nobody uses
        </p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const loserOp = interpolate(frame, [22, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const winnerOp = interpolate(frame, [42, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taxProg = spring({ frame: frame - 75, fps, config: { damping: 12 } });
  const arrowOp = interpolate(frame, [73, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [105, 123], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, opacity: titleOp, padding: '0 56px', textAlign: 'center' }}>
        <p style={{ ...headline(50, BLACK), marginBottom: 8 }}>LOSSES</p>
        <p style={{ ...headline(50, ACCENT) }}>CANCEL YOUR GAINS</p>
      </div>
      <div style={{
        position: 'absolute', top: 380, left: 52, width: 430, opacity: loserOp,
        background: 'rgba(239,68,68,0.08)', border: `2.5px solid ${RED_CLR}`, borderRadius: 20,
        padding: '28px 24px', textAlign: 'center',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: RED_CLR, margin: '0 0 12px' }}>LOSER STOCK</p>
        <svg width="180" height="80" viewBox="0 0 180 80" style={{ display: 'block', margin: '0 auto' }}>
          <polyline points="0,10 30,15 60,30 90,45 120,58 150,65 180,75"
            fill="none" stroke={RED_CLR} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 38, color: RED_CLR, margin: '10px 0 0' }}>-$4,200</p>
      </div>
      <div style={{
        position: 'absolute', top: 380, right: 52, width: 430, opacity: winnerOp,
        background: 'rgba(16,185,129,0.08)', border: `2.5px solid ${ACCENT}`, borderRadius: 20,
        padding: '28px 24px', textAlign: 'center',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, margin: '0 0 12px' }}>WINNER STOCK</p>
        <svg width="180" height="80" viewBox="0 0 180 80" style={{ display: 'block', margin: '0 auto' }}>
          <polyline points="0,75 30,65 60,55 90,40 120,28 150,18 180,8"
            fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 38, color: ACCENT, margin: '10px 0 0' }}>+$4,200</p>
      </div>
      <div style={{
        position: 'absolute', top: 730, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: arrowOp,
      }}>
        <svg width="700" height="70" viewBox="0 0 700 70">
          <line x1="175" y1="5" x2="350" y2="60" stroke="rgba(13,17,23,0.4)" strokeWidth="4"
            strokeDasharray={80} strokeDashoffset={80 * (1 - Math.min(1, taxProg))} />
          <line x1="525" y1="5" x2="350" y2="60" stroke="rgba(13,17,23,0.4)" strokeWidth="4"
            strokeDasharray={80} strokeDashoffset={80 * (1 - Math.min(1, taxProg))} />
          <circle cx="350" cy="62" r="8" fill={ACCENT} opacity={Math.min(1, taxProg)} />
        </svg>
        <div style={{ background: ACCENT, borderRadius: 20, padding: '24px 56px', transform: `scale(${Math.min(1, taxProg)})` }}>
          <p style={{ ...headline(44, BLACK), margin: 0 }}>CAPITAL GAINS TAX = $0</p>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 155, left: 64, right: 64, opacity: textOp }}>
        <p style={{ fontFamily: BODY_FONT, fontSize: 30, color: 'rgba(13,17,23,0.7)', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
          Sell a loser and you cancel what you owe on winners — dollar for dollar
        </p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const formOp = interpolate(frame, [22, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const moneyProg = spring({ frame: frame - 50, fps, config: { damping: 12 } });
  const numOp = interpolate(frame, [68, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeProg = spring({ frame: frame - 95, fps, config: { damping: 10 } });
  const badgeOp = interpolate(frame, [93, 113], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [125, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stackLayers = [0, 1, 2, 3, 4];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 175, left: 0, right: 0, opacity: titleOp, padding: '0 64px', textAlign: 'center' }}>
        <p style={{ ...headline(48, WHITE), marginBottom: 8 }}>NO GAINS TO OFFSET?</p>
        <p style={{ ...headline(48, ACCENT) }}>STILL GET $3,000 BACK</p>
      </div>
      <div style={{ position: 'absolute', top: 400, left: 100, width: 380, opacity: formOp }}>
        <div style={{
          background: 'rgba(245,245,245,0.07)', border: '2px solid rgba(245,245,245,0.22)',
          borderRadius: 14, padding: 22,
        }}>
          <div style={{ background: ACCENT, borderRadius: 5, padding: '5px 14px', display: 'inline-block', marginBottom: 18 }}>
            <span style={{ fontFamily: FONT, fontSize: 16, color: BLACK }}>IRS FORM 1040</span>
          </div>
          {[90, 70, 90, 80, 70].map((w, i) => (
            <div key={i} style={{ height: 14, background: 'rgba(245,245,245,0.1)', borderRadius: 3, marginBottom: 14, width: `${w}%` }} />
          ))}
          <div style={{ background: 'rgba(16,185,129,0.22)', border: `2px solid ${ACCENT}`, borderRadius: 8, padding: '14px 18px', marginTop: 6 }}>
            <span style={{ fontFamily: FONT, fontSize: 22, color: ACCENT }}>DEDUCTION: -$3,000</span>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 405, right: 90, width: 255 }}>
        <svg width="255" height="200" viewBox="0 0 255 200">
          {stackLayers.map((layer) => {
            const billY = 138 - layer * 28;
            const billOp = moneyProg > layer * 0.18 ? 1 : 0;
            return (
              <g key={layer} opacity={billOp}>
                <rect x={26 - layer * 3} y={billY} width="188" height="50" rx="8"
                  fill={layer === 4 ? ACCENT : `rgba(16,185,129,${0.3 + layer * 0.14})`}
                  stroke={ACCENT} strokeWidth="1.5" />
                <rect x={42 - layer * 3} y={billY + 12} width="64" height="11" rx="4"
                  fill="rgba(0,0,0,0.35)" />
                <rect x={42 - layer * 3} y={billY + 28} width="108" height="8" rx="3"
                  fill="rgba(0,0,0,0.2)" />
              </g>
            );
          })}
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 48, color: ACCENT, margin: 0, textAlign: 'center', opacity: numOp }}>$3,000</p>
      </div>
      <div style={{
        position: 'absolute', top: 870, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', opacity: badgeOp, transform: `scale(${Math.min(1, badgeProg)})`,
      }}>
        <div style={{ background: ACCENT, borderRadius: 20, padding: '22px 52px' }}>
          <p style={{ ...headline(36, BLACK), margin: 0 }}>DEDUCT FROM YOUR SALARY</p>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 155, left: 64, right: 64, opacity: textOp }}>
        <p style={{ fontFamily: BODY_FONT, fontSize: 30, color: 'rgba(245,245,245,0.75)', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
          The IRS lets you deduct $3,000 from your taxable income every single year
        </p>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yr1Op = interpolate(frame, [22, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yr2Op = interpolate(frame, [55, 73], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yr3Op = interpolate(frame, [88, 106], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeProg = spring({ frame: frame - 118, fps, config: { damping: 10 } });
  const badgeOp = interpolate(frame, [116, 136], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const years = [
    { yr: '2024', label: 'LOST -$8,000', carry: 'Carry fwd: $5,000', isLoss: true },
    { yr: '2025', label: 'USED $3K', carry: 'Carry fwd: $2,000', isLoss: false },
    { yr: '2026', label: 'USED $2K', carry: 'Carry fwd: $0', isLoss: false },
  ];
  const yOps = [yr1Op, yr2Op, yr3Op];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 175, left: 0, right: 0, opacity: titleOp, padding: '0 56px', textAlign: 'center' }}>
        <p style={{ ...headline(48, BLACK), marginBottom: 8 }}>LOST MORE THAN $3K?</p>
        <p style={{ ...headline(48, ACCENT) }}>IT CARRIES FORWARD FOREVER</p>
      </div>
      {years.map((y, i) => (
        <div key={y.yr} style={{
          position: 'absolute', top: 420 + i * 155, left: 72, right: 72, opacity: yOps[i],
          background: y.isLoss ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
          border: `2px solid ${y.isLoss ? RED_CLR : ACCENT}`, borderRadius: 18, padding: '24px 36px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontFamily: FONT, fontSize: 34, color: BLACK }}>{y.yr}</span>
          <span style={{ fontFamily: FONT, fontSize: 28, color: y.isLoss ? RED_CLR : ACCENT }}>{y.label}</span>
          <span style={{ fontFamily: BODY_FONT, fontSize: 24, color: 'rgba(13,17,23,0.6)' }}>{y.carry}</span>
        </div>
      ))}
      <div style={{
        position: 'absolute', top: 1095, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', opacity: badgeOp, transform: `scale(${Math.min(1, badgeProg)})`,
      }}>
        <div style={{ background: ACCENT, borderRadius: 20, padding: '22px 52px' }}>
          <p style={{ ...headline(36, BLACK), margin: 0 }}>YOUR LOSSES NEVER EXPIRE</p>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 155, left: 64, right: 64, opacity: textOp }}>
        <p style={{ fontFamily: BODY_FONT, fontSize: 30, color: 'rgba(13,17,23,0.7)', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
          Losses above $3K roll forward to future years — stacking until you use every dollar
        </p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sellOp = interpolate(frame, [22, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calOp = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const day30Op = interpolate(frame, [82, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const day31Op = interpolate(frame, [108, 126], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [142, 162], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const numDays = Math.max(0, Math.floor(31));
  const calDays = Array.from({ length: numDays }, (_, di) => di + 1);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 165, left: 0, right: 0, opacity: titleOp, padding: '0 56px', textAlign: 'center' }}>
        <p style={{ ...headline(46, WHITE), marginBottom: 8 }}>ONE CATCH:</p>
        <p style={{ ...headline(46, RED_CLR) }}>THE WASH-SALE RULE</p>
      </div>
      <div style={{ position: 'absolute', top: 370, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: sellOp }}>
        <div style={{ background: 'rgba(239,68,68,0.12)', border: `2px solid ${RED_CLR}`, borderRadius: 18, padding: '24px 52px' }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0 }}>SELL LOSING STOCK</p>
          <p style={{ fontFamily: BODY_FONT, fontSize: 24, color: 'rgba(245,245,245,0.6)', margin: '8px 0 0', textAlign: 'center' }}>
            then buy the same one back...
          </p>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 548, left: 64, right: 64, opacity: calOp }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {calDays.map((d) => {
            const isDay30 = d === 30;
            const isDay31 = d === 31;
            const cellBg = isDay30 ? RED_CLR : isDay31 ? ACCENT : 'rgba(245,245,245,0.1)';
            const cellOp = isDay30 ? day30Op : isDay31 ? day31Op : 1;
            return (
              <div key={d} style={{ background: cellBg, borderRadius: 10, padding: '13px 0', textAlign: 'center', opacity: cellOp }}>
                <span style={{ fontFamily: FONT, fontSize: isDay30 || isDay31 ? 24 : 19, color: isDay30 || isDay31 ? BLACK : 'rgba(245,245,245,0.7)' }}>
                  {isDay30 ? '✗' : isDay31 ? '✓' : String(d)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: 'absolute', top: 890, left: 64, right: 64, display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ opacity: day30Op, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: RED_CLR, margin: 0 }}>DAY 30</p>
          <p style={{ fontFamily: BODY_FONT, fontSize: 24, color: 'rgba(245,245,245,0.65)', margin: '4px 0 0' }}>Deduction VOIDED</p>
        </div>
        <div style={{ opacity: day31Op, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0 }}>DAY 31+</p>
          <p style={{ fontFamily: BODY_FONT, fontSize: 24, color: 'rgba(245,245,245,0.65)', margin: '4px 0 0' }}>Deduction SAFE ✓</p>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 155, left: 64, right: 64, opacity: textOp }}>
        <p style={{ fontFamily: BODY_FONT, fontSize: 30, color: 'rgba(245,245,245,0.75)', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
          Buy the same stock back before 31 days and the IRS cancels your deduction
        </p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOp = interpolate(frame, [20, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = interpolate(frame, [22, 105], [0, 47000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const portfolioOp = interpolate(frame, [105, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaProg = spring({ frame: frame - 140, fps, config: { damping: 10 } });
  const ctaOp = interpolate(frame, [138, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [170, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const displayNum = Math.floor(counterVal);

  const positions = [
    { sym: 'TSLA', pct: '-22%' },
    { sym: 'META', pct: '-8%' },
    { sym: 'NVDA', pct: '-15%' },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 155, left: 0, right: 0, opacity: titleOp, padding: '0 64px', textAlign: 'center' }}>
        <p style={{ ...headline(44, BLACK), marginBottom: 8 }}>OVER 30 YEARS,</p>
        <p style={{ ...headline(44, BLACK) }}>THIS SAVES YOU</p>
      </div>
      <div style={{ position: 'absolute', top: 375, left: 0, right: 0, textAlign: 'center', opacity: counterOp }}>
        <p style={{ fontFamily: FONT, fontSize: 108, color: ACCENT, margin: 0, lineHeight: 1 }}>
          ${displayNum.toLocaleString()}
        </p>
        <p style={{ fontFamily: BODY_FONT, fontSize: 28, color: 'rgba(13,17,23,0.55)', margin: '8px 0 0' }}>
          in avoided taxes
        </p>
      </div>
      <div style={{ position: 'absolute', top: 645, left: 72, right: 72, opacity: portfolioOp }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, textAlign: 'center', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>
          Red Positions to Harvest
        </p>
        {positions.map((p) => (
          <div key={p.sym} style={{
            background: 'rgba(239,68,68,0.08)', border: `1.5px solid ${RED_CLR}`, borderRadius: 14,
            padding: '20px 28px', marginBottom: 14,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontFamily: FONT, fontSize: 34, color: BLACK }}>{p.sym}</span>
            <span style={{ fontFamily: FONT, fontSize: 30, color: RED_CLR }}>{p.pct}</span>
            <div style={{ background: ACCENT, borderRadius: 10, padding: '8px 20px' }}>
              <span style={{ fontFamily: FONT, fontSize: 24, color: BLACK }}>HARVEST</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute', top: 1145, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', opacity: ctaOp, transform: `scale(${Math.min(1, ctaProg)})`,
      }}>
        <div style={{ background: BLACK, borderRadius: 22, padding: '24px 52px', border: `3px solid ${ACCENT}` }}>
          <p style={{ ...headline(32, ACCENT), margin: 0 }}>CHECK YOUR PORTFOLIO NOW</p>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 145, left: 64, right: 64, opacity: textOp }}>
        <p style={{ fontFamily: BODY_FONT, fontSize: 28, color: 'rgba(13,17,23,0.7)', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
          Your red positions could save you thousands — act before year end
        </p>
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
