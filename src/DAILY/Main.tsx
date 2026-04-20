import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const GREEN = '#10B981';
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
  lineHeight: 1.3,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({ children, bg, dur }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene 1: Phone drops in with $3,011 IRS deposit notification ───────────


const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const phoneY = interpolate(phoneSpring, [0, 1], [-420, 0]);

  const notifSpring = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 15, stiffness: 100 } });
  const notifY = interpolate(notifSpring, [0, 1], [-110, 0]);

  const counterProgress = interpolate(frame, [60, 185], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const displayAmount = Math.floor(counterProgress * 3011);

  const labelOpacity = interpolate(frame, [110, 148], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const hookOpacity = interpolate(frame, [162, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
      }}>
        <div style={{ transform: `translateY(${phoneY}px)` }}>
          <svg width="220" height="380" viewBox="0 0 220 380">
            <rect x="10" y="10" width="200" height="360" rx="28" fill="#1E1E1E" stroke={ACCENT} strokeWidth="3" />
            <rect x="20" y="40" width="180" height="300" rx="8" fill="#0A0A0A" />
            <rect x="85" y="355" width="50" height="5" rx="3" fill="#444" />
            <circle cx="110" cy="25" r="7" fill="#333" />
            <g transform={`translate(0, ${notifY})`}>
              <rect x="25" y="50" width="170" height="76" rx="12" fill={ACCENT} />
              <text x="35" y="73" fontFamily="Arial" fontSize="11" fill={BLACK} fontWeight="bold">DIRECT DEPOSIT</text>
              <text x="35" y="98" fontFamily="Arial Black" fontSize="24" fill={BLACK}>+${displayAmount.toLocaleString()}</text>
              <text x="35" y="116" fontFamily="Arial" fontSize="10" fill={BLACK}>TAX REFUND • IRS</text>
            </g>
          </svg>
        </div>

        <div style={{ opacity: labelOpacity }}>
          <p style={headline(36, ACCENT)}>FEELS LIKE FREE MONEY</p>
        </div>

        <div style={{ opacity: hookOpacity, paddingLeft: 60, paddingRight: 60 }}>
          <p style={{
            fontFamily: FONT,
            fontSize: 26,
            color: WHITE,
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.4,
          }}>
            Here's why that mindset is the trap.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2: Calendar grid — money flowing to IRS, 0% interest ──────────────

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 120 } });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const arrowOpacity = interpolate(frame, [80, 118], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const returnOpacity = interpolate(frame, [140, 178], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const zeroOpacity = interpolate(frame, [178, 212], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        gap: 30,
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(30, BLACK)}>That refund isn't a gift —</p>
          <p style={{ ...headline(36, ACCENT), marginTop: 8 }}>IT'S A LOAN YOU GAVE THE IRS</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8, justifyContent: 'center', width: 340 }}>
          {months.map((m, i) => {
            const revealOpacity = interpolate(frame, [20 + i * 6, 40 + i * 6], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div key={m} style={{
                width: 68,
                height: 48,
                background: BLACK,
                borderRadius: 8,
                opacity: revealOpacity,
                display: 'flex',
                flexDirection: 'column' as const,
                alignItems: 'center',
                justifyContent: 'center',
                border: `2px solid ${ACCENT}`,
              }}>
                <span style={{ fontFamily: FONT, fontSize: 10, color: ACCENT, letterSpacing: '0.1em' }}>{m}</span>
                <span style={{ fontFamily: FONT, fontSize: 13, color: WHITE, marginTop: 2 }}>−$251</span>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: arrowOpacity, display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="170" height="36" viewBox="0 0 170 36">
            <line x1="0" y1="18" x2="140" y2="18" stroke={ACCENT} strokeWidth="3" />
            <polygon points="140,8 162,18 140,28" fill={ACCENT} />
          </svg>
          <span style={{ fontFamily: FONT, fontSize: 17, color: BLACK }}>IRS keeps $3,011</span>
        </div>

        <div style={{ opacity: returnOpacity, display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="170" height="36" viewBox="0 0 170 36">
            <line x1="170" y1="18" x2="30" y2="18" stroke={GREEN} strokeWidth="3" />
            <polygon points="30,8 8,18 30,28" fill={GREEN} />
          </svg>
          <span style={{ fontFamily: FONT, fontSize: 17, color: GREEN }}>$3,011 back... eventually</span>
        </div>

        <div style={{ opacity: zeroOpacity, background: '#EF4444', padding: '12px 28px', borderRadius: 12 }}>
          <p style={headline(28, WHITE)}>AT 0% INTEREST</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: Shopping items spring in — electronics, vacations, impulse ──────

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const item1Spring = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 12, stiffness: 100 } });
  const item2Spring = spring({ frame: Math.max(0, frame - 82), fps, config: { damping: 12, stiffness: 100 } });
  const item3Spring = spring({ frame: Math.max(0, frame - 124), fps, config: { damping: 12, stiffness: 100 } });

  const item1Scale = interpolate(item1Spring, [0, 1], [0, 1]);
  const item2Scale = interpolate(item2Spring, [0, 1], [0, 1]);
  const item3Scale = interpolate(item3Spring, [0, 1], [0, 1]);

  const barProgress = interpolate(frame, [40, 202], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const statOpacity = interpolate(frame, [168, 206], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 50px',
        gap: 36,
      }}>
        <div style={{ opacity: titleOpacity, textAlign: 'center' }}>
          <p style={headline(30, WHITE)}>65% of people spend it all</p>
          <p style={{ ...headline(42, ACCENT), marginTop: 6 }}>WITHIN 30 DAYS</p>
        </div>

        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
          <div style={{ transform: `scale(${item1Scale})`, textAlign: 'center', transformOrigin: 'bottom center' }}>
            <svg width="88" height="80" viewBox="0 0 88 80">
              <rect x="4" y="4" width="80" height="54" rx="5" fill="#333" stroke={ACCENT} strokeWidth="2" />
              <rect x="12" y="12" width="64" height="40" rx="3" fill="#111" />
              <rect x="28" y="60" width="32" height="6" rx="2" fill="#555" />
              <rect x="18" y="66" width="52" height="5" rx="2" fill="#555" />
              <circle cx="74" cy="32" r="4" fill={ACCENT} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, margin: '6px 0 0' }}>ELECTRONICS</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: '2px 0 0' }}>#1</p>
          </div>

          <div style={{ transform: `scale(${item2Scale})`, textAlign: 'center', transformOrigin: 'bottom center' }}>
            <svg width="88" height="80" viewBox="0 0 88 80">
              <ellipse cx="44" cy="40" rx="30" ry="14" fill="#555" stroke={ACCENT} strokeWidth="2" />
              <path d="M44 16 L78 44 L44 38 Z" fill={ACCENT} />
              <path d="M44 54 L68 66 L44 60 Z" fill="#666" stroke={ACCENT} strokeWidth="1" />
              <rect x="28" y="26" width="8" height="28" rx="4" fill={ACCENT} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, margin: '6px 0 0' }}>VACATIONS</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: '2px 0 0' }}>#2</p>
          </div>

          <div style={{ transform: `scale(${item3Scale})`, textAlign: 'center', transformOrigin: 'bottom center' }}>
            <svg width="88" height="80" viewBox="0 0 88 80">
              <rect x="18" y="28" width="52" height="46" rx="6" fill="#555" stroke={ACCENT} strokeWidth="2" />
              <path d="M28 28 Q28 8 44 8 Q60 8 60 28" fill="none" stroke={ACCENT} strokeWidth="3" />
              <rect x="33" y="42" width="22" height="3" rx="1" fill={ACCENT} />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, margin: '6px 0 0' }}>IMPULSE</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: '2px 0 0' }}>#3</p>
          </div>
        </div>

        <div style={{ width: 340 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: FONT, fontSize: 13, color: WHITE }}>30-DAY WINDOW</span>
            <span style={{ fontFamily: FONT, fontSize: 13, color: ACCENT }}>{Math.round(barProgress * 100)}%</span>
          </div>
          <div style={{ height: 16, background: '#333', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${barProgress * 100}%`, background: ACCENT, borderRadius: 8 }} />
          </div>
        </div>

        <div style={{ opacity: statOpacity }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, textAlign: 'center' }}>
            Nothing that builds wealth.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: Bar chart — $3,000 compounding to $30,187 over 30 years ────────

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  const titleY = interpolate(titleSpring, [0, 1], [-50, 0]);

  const chartProgress = interpolate(frame, [20, 168], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const numProgress = interpolate(frame, [120, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const displayNum = Math.floor(3000 + numProgress * (30187 - 3000));

  const labelOpacity = interpolate(frame, [188, 218], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const years = [0, 5, 10, 15, 20, 25, 30];
  const getAmount = (yr: number) => Math.round(3000 * Math.pow(1.08, yr));
  const maxAmount = getAmount(30);
  const chartHeight = 230;
  const barWidth = 42;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 40px',
        gap: 26,
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(28, BLACK)}>Invest $3,000 at 8% and...</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          {years.map((yr, i) => {
            const amount = getAmount(yr);
            const fullH = (amount / maxAmount) * chartHeight;
            const barH = Math.max(0, fullH * chartProgress);
            const isLast = i === years.length - 1;
            return (
              <div key={yr} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: barWidth,
                  height: barH,
                  background: isLast ? ACCENT : GREEN,
                  borderRadius: '4px 4px 0 0',
                  opacity: isLast ? 1 : 0.75,
                  border: isLast ? `2px solid ${BLACK}` : 'none',
                }} />
                <span style={{ fontFamily: FONT, fontSize: 11, color: BLACK }}>yr{yr}</span>
              </div>
            );
          })}
        </div>

        <div style={{
          textAlign: 'center',
          background: WHITE,
          padding: '18px 40px',
          borderRadius: 16,
          border: `3px solid ${ACCENT}`,
          boxShadow: `0 0 0 6px ${BLACK}`,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 15, color: BLACK, margin: '0 0 4px', letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>30 YEARS LATER</p>
          <p style={{ fontFamily: FONT, fontSize: 54, color: ACCENT, margin: 0, letterSpacing: '0.04em' }}>
            ${displayNum.toLocaleString()}
          </p>
          <p style={{ fontFamily: FONT, fontSize: 14, color: GREEN, margin: '4px 0 0' }}>+907% GROWTH</p>
        </div>

        <div style={{ opacity: labelOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>
            One decision. Three decades of difference.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: W-4 form + monthly $250 investment bars ────────────────────────

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const formSpring = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const formX = interpolate(formSpring, [0, 1], [-300, 0]);

  const barProgress = interpolate(frame, [60, 195], [0, 12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const resultOpacity = interpolate(frame, [180, 215], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const monthLetters = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 50px',
        gap: 32,
      }}>
        <div style={{ opacity: titleOpacity, textAlign: 'center' }}>
          <p style={headline(26, WHITE)}>The fix: adjust your W-4</p>
          <p style={{ ...headline(40, ACCENT), marginTop: 6 }}>+$250/MONTH</p>
        </div>

        <div style={{ transform: `translateX(${formX}px)` }}>
          <svg width="280" height="158" viewBox="0 0 280 158">
            <rect x="0" y="0" width="280" height="158" rx="8" fill={WHITE} stroke={BLACK} strokeWidth="2" />
            <rect x="0" y="0" width="280" height="32" rx="8" fill={BLACK} />
            <rect x="0" y="20" width="280" height="12" fill={BLACK} />
            <text x="140" y="22" fontFamily="Arial Black" fontSize="14" fill={WHITE} textAnchor="middle">FORM W-4</text>
            <text x="10" y="52" fontFamily="Arial" fontSize="10" fill={BLACK}>Employee's Withholding Certificate</text>
            <rect x="10" y="62" width="195" height="6" rx="2" fill="#DDD" />
            <rect x="10" y="76" width="155" height="6" rx="2" fill="#DDD" />
            <rect x="10" y="90" width="175" height="6" rx="2" fill="#DDD" />
            <rect x="10" y="104" width="140" height="6" rx="2" fill="#DDD" />
            <rect x="10" y="118" width="165" height="6" rx="2" fill="#DDD" />
            <rect x="218" y="60" width="52" height="90" rx="4" fill="#FEF3C7" stroke={ACCENT} strokeWidth="2" />
            <text x="244" y="116" fontFamily="Arial Black" fontSize="32" fill={ACCENT} textAnchor="middle">✓</text>
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
          {Array.from({ length: Math.max(0, Math.floor(12)) }, (_, i) => {
            const visible = i < barProgress;
            const hPct = visible ? Math.min(1, barProgress - i) : 0;
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 24,
                  height: Math.max(0, hPct * 80),
                  background: GREEN,
                  borderRadius: '3px 3px 0 0',
                  minHeight: visible ? 4 : 0,
                }} />
                <span style={{ fontFamily: FONT, fontSize: 10, color: WHITE }}>{monthLetters[i]}</span>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: resultOpacity, background: GREEN, padding: '14px 30px', borderRadius: 12, textAlign: 'center' }}>
          <p style={headline(24, WHITE)}>INVEST MONTHLY</p>
          <p style={{
            fontFamily: FONT,
            fontSize: 15,
            color: WHITE,
            margin: '4px 0 0',
            textTransform: 'none' as const,
            letterSpacing: 'normal',
          }}>
            Don't wait for a lump-sum impulse buy
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: Piggy bank + coins + CTA ───────────────────────────────────────

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggySpring = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const piggyScale = interpolate(piggySpring, [0, 1], [0, 1]);

  const coin1Spring = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 8, stiffness: 120 } });
  const coin2Spring = spring({ frame: Math.max(0, frame - 54), fps, config: { damping: 8, stiffness: 120 } });
  const coin3Spring = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 8, stiffness: 120 } });

  const coin1Y = interpolate(coin1Spring, [0, 1], [-90, 38]);
  const coin2Y = interpolate(coin2Spring, [0, 1], [-90, 18]);
  const coin3Y = interpolate(coin3Spring, [0, 1], [-90, 48]);

  const ctaOpacity = interpolate(frame, [118, 158], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaSpring = spring({ frame: Math.max(0, frame - 118), fps, config: { damping: 10, stiffness: 90 } });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.8, 1]);

  const btnOpacity = interpolate(frame, [175, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 50px',
        gap: 36,
      }}>
        <div style={{ position: 'relative', width: 200, height: 210, transform: `scale(${piggyScale})` }}>
          <div style={{ position: 'absolute', left: 70, top: coin1Y, zIndex: 10 }}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="20" fill={ACCENT} stroke="#B45309" strokeWidth="2" />
              <text x="22" y="28" textAnchor="middle" fontFamily="Arial Black" fontSize="18" fill={BLACK}>$</text>
            </svg>
          </div>
          <div style={{ position: 'absolute', left: 48, top: coin2Y, zIndex: 10 }}>
            <svg width="36" height="36" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill={ACCENT} stroke="#B45309" strokeWidth="2" />
              <text x="18" y="23" textAnchor="middle" fontFamily="Arial Black" fontSize="14" fill={BLACK}>$</text>
            </svg>
          </div>
          <div style={{ position: 'absolute', left: 102, top: coin3Y, zIndex: 10 }}>
            <svg width="30" height="30" viewBox="0 0 30 30">
              <circle cx="15" cy="15" r="13" fill={ACCENT} stroke="#B45309" strokeWidth="2" />
              <text x="15" y="20" textAnchor="middle" fontFamily="Arial Black" fontSize="12" fill={BLACK}>$</text>
            </svg>
          </div>
          <svg width="200" height="180" viewBox="0 0 200 180" style={{ position: 'absolute', bottom: 0 }}>
            <ellipse cx="90" cy="112" rx="72" ry="58" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2" />
            <circle cx="148" cy="82" r="36" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2" />
            <ellipse cx="156" cy="50" rx="11" ry="8" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2" />
            <circle cx="155" cy="72" r="5" fill={BLACK} />
            <circle cx="157" cy="70" r="2" fill={WHITE} />
            <ellipse cx="176" cy="88" rx="13" ry="9" fill="#EC4899" />
            <circle cx="172" cy="87" r="3" fill="#9D174D" />
            <circle cx="180" cy="87" r="3" fill="#9D174D" />
            <rect x="75" y="53" width="28" height="6" rx="3" fill="#9D174D" />
            <rect x="36" y="154" width="20" height="20" rx="6" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2" />
            <rect x="64" y="158" width="20" height="16" rx="6" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2" />
            <rect x="100" y="158" width="20" height="16" rx="6" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2" />
            <rect x="128" y="154" width="20" height="20" rx="6" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2" />
            <path d="M20 108 Q4 96 7 110 Q10 124 20 114" fill="none" stroke="#EC4899" strokeWidth="3" />
          </svg>
        </div>

        <div style={{ opacity: ctaOpacity, transform: `scale(${ctaScale})`, textAlign: 'center' }}>
          <p style={headline(26, WHITE)}>Your refund isn't a bonus.</p>
          <p style={{ ...headline(26, WHITE), marginTop: 6 }}>It's your money</p>
          <p style={{ ...headline(36, ACCENT), marginTop: 6 }}>HOLDING YOU BACK.</p>
        </div>

        <div style={{ opacity: btnOpacity, background: ACCENT, padding: '18px 36px', borderRadius: 14, textAlign: 'center' }}>
          <p style={headline(24, BLACK)}>COMMENT "REFUND"</p>
          <p style={{
            fontFamily: FONT,
            fontSize: 16,
            color: BLACK,
            margin: '4px 0 0',
            textTransform: 'none' as const,
            letterSpacing: 'normal',
          }}>
            I'll show you how to fix your W-4
          </p>
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

