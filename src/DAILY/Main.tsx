import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#3B82F6';
const GREEN = '#10B981';
const RED = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  textAlign: 'center',
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

// Scene 1 – Dark – YOU pay 22% vs ULTRA-RICH pay 8.2%
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const labelOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const workerPct = Math.round(
    interpolate(frame, [15, 75], [0, 22], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const richRaw = interpolate(frame, [40, 100], [0, 8.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const richPct = richRaw.toFixed(1);
  const subtitleOp = interpolate(frame, [95, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subtitleSp = spring({ frame: Math.max(0, frame - 80), fps: 30, config: { damping: 14, stiffness: 100 } });
  const subtitleY = interpolate(subtitleSp, [0, 1], [50, 0]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
        <div style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: 50, opacity: labelOp }}>
          THE LOOPHOLE
        </div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'flex-start' }}>
          {/* YOU column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '44%' }}>
            <svg width="100" height="128" viewBox="0 0 100 128">
              <circle cx="50" cy="24" r="20" fill="#9CA3AF" />
              <rect x="26" y="50" width="48" height="50" rx="8" fill="#4B5563" />
              <rect x="6" y="54" width="20" height="10" rx="5" fill="#4B5563" />
              <rect x="74" y="54" width="20" height="10" rx="5" fill="#4B5563" />
              <rect x="30" y="96" width="16" height="30" rx="5" fill="#374151" />
              <rect x="54" y="96" width="16" height="30" rx="5" fill="#374151" />
            </svg>
            <div style={{ ...headline(20, WHITE), marginTop: 14, marginBottom: 10 }}>YOU</div>
            <div style={{ fontFamily: FONT, fontSize: 78, color: RED, fontWeight: 900, lineHeight: 1 }}>{workerPct}%</div>
            <div style={{ fontFamily: FONT, fontSize: 18, color: '#9CA3AF', marginTop: 8, textAlign: 'center' }}>income tax</div>
          </div>

          {/* Divider */}
          <div style={{ width: 2, height: 210, background: '#2D3748', alignSelf: 'center' }} />

          {/* ULTRA-RICH column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '44%' }}>
            <svg width="100" height="128" viewBox="0 0 100 128">
              <circle cx="50" cy="24" r="20" fill="#F5F5F5" />
              <rect x="26" y="50" width="48" height="50" rx="4" fill="#1E3A5F" />
              <polygon points="50,52 26,50 34,80" fill="#1D4ED8" />
              <polygon points="50,52 74,50 66,80" fill="#1D4ED8" />
              <polygon points="50,54 45,66 50,82 55,66" fill={ACCENT} />
              <rect x="6" y="54" width="20" height="10" rx="5" fill="#1E3A5F" />
              <rect x="74" y="54" width="20" height="10" rx="5" fill="#1E3A5F" />
              <rect x="30" y="96" width="16" height="30" rx="5" fill="#111827" />
              <rect x="54" y="96" width="16" height="30" rx="5" fill="#111827" />
            </svg>
            <div style={{ ...headline(20, WHITE), marginTop: 14, marginBottom: 10 }}>ULTRA-RICH</div>
            <div style={{ fontFamily: FONT, fontSize: 78, color: GREEN, fontWeight: 900, lineHeight: 1 }}>{richPct}%</div>
            <div style={{ fontFamily: FONT, fontSize: 18, color: '#9CA3AF', marginTop: 8, textAlign: 'center' }}>income tax</div>
          </div>
        </div>

        <div style={{ ...headline(34, WHITE), marginTop: 60, opacity: subtitleOp, transform: `translateY(${subtitleY}px)`, lineHeight: 1.4 }}>
          SAME COUNTRY.<br />DIFFERENT RULES.
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2 – Light – Buy, Borrow, Die cycle
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const c1 = spring({ frame, fps: 30, config: { damping: 12, stiffness: 140 } });
  const c2 = spring({ frame: Math.max(0, frame - 40), fps: 30, config: { damping: 12, stiffness: 140 } });
  const c3 = spring({ frame: Math.max(0, frame - 80), fps: 30, config: { damping: 12, stiffness: 140 } });
  const arr1Op = interpolate(frame, [28, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arr2Op = interpolate(frame, [68, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{ ...headline(28, BLACK), letterSpacing: '0.3em', marginBottom: 70 }}>THE STRATEGY</div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
          {/* BUY */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${c1})` }}>
            <div style={{ width: 130, height: 130, borderRadius: 65, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="74" height="66" viewBox="0 0 74 66">
                <rect x="2" y="46" width="12" height="20" fill={WHITE} />
                <rect x="20" y="30" width="12" height="36" fill={WHITE} />
                <rect x="38" y="18" width="12" height="48" fill={WHITE} />
                <rect x="56" y="6" width="12" height="60" fill={WHITE} />
                <polyline points="8,56 26,40 44,28 62,16" stroke="#F59E0B" strokeWidth="3" fill="none" />
              </svg>
            </div>
            <div style={{ ...headline(22, BLACK), marginTop: 18 }}>BUY</div>
            <div style={{ fontFamily: FONT, fontSize: 15, color: '#6B7280', marginTop: 5 }}>assets, never sell</div>
          </div>

          {/* Arrow 1 */}
          <div style={{ opacity: arr1Op }}>
            <svg width="44" height="28" viewBox="0 0 44 28">
              <line x1="0" y1="14" x2="32" y2="14" stroke={ACCENT} strokeWidth="3" />
              <polygon points="32,7 44,14 32,21" fill={ACCENT} />
            </svg>
          </div>

          {/* BORROW */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${c2})` }}>
            <div style={{ width: 130, height: 130, borderRadius: 65, background: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="76" height="76" viewBox="0 0 76 76">
                <polygon points="38,6 6,26 70,26" fill={WHITE} />
                <rect x="12" y="28" width="8" height="28" fill={WHITE} />
                <rect x="26" y="28" width="8" height="28" fill={WHITE} />
                <rect x="42" y="28" width="8" height="28" fill={WHITE} />
                <rect x="56" y="28" width="8" height="28" fill={WHITE} />
                <rect x="6" y="58" width="64" height="8" fill={WHITE} />
                <rect x="2" y="66" width="72" height="6" rx="2" fill={WHITE} />
              </svg>
            </div>
            <div style={{ ...headline(22, BLACK), marginTop: 18 }}>BORROW</div>
            <div style={{ fontFamily: FONT, fontSize: 15, color: '#6B7280', marginTop: 5 }}>cash, tax-free</div>
          </div>

          {/* Arrow 2 */}
          <div style={{ opacity: arr2Op }}>
            <svg width="44" height="28" viewBox="0 0 44 28">
              <line x1="0" y1="14" x2="32" y2="14" stroke="#6B7280" strokeWidth="3" />
              <polygon points="32,7 44,14 32,21" fill="#6B7280" />
            </svg>
          </div>

          {/* DIE */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${c3})` }}>
            <div style={{ width: 130, height: 130, borderRadius: 65, background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="56" height="76" viewBox="0 0 56 76">
                <path d="M 10 40 L 10 62 L 46 62 L 46 40 Q 46 12 28 12 Q 10 12 10 40 Z" fill={WHITE} />
                <rect x="2" y="60" width="52" height="8" rx="2" fill={WHITE} />
                <line x1="28" y1="24" x2="28" y2="50" stroke="#374151" strokeWidth="4" />
                <line x1="18" y1="36" x2="38" y2="36" stroke="#374151" strokeWidth="4" />
              </svg>
            </div>
            <div style={{ ...headline(22, BLACK), marginTop: 18 }}>DIE</div>
            <div style={{ fontFamily: FONT, fontSize: 15, color: '#6B7280', marginTop: 5 }}>gains wiped clean</div>
          </div>
        </div>

        <div style={{ ...headline(32, ACCENT), marginTop: 70, opacity: tagOp }}>NO SALE = NO TAX</div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3 – Dark – The math: salary vs borrow
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const leftSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 120 } });
  const leftX = interpolate(leftSp, [0, 1], [-110, 0]);
  const rightSp = spring({ frame: Math.max(0, frame - 50), fps: 30, config: { damping: 14, stiffness: 120 } });
  const rightX = interpolate(rightSp, [0, 1], [110, 0]);
  const savingsOp = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 30px' }}>
        <div style={{ ...headline(26, ACCENT), letterSpacing: '0.3em', marginBottom: 50 }}>THE MATH</div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'flex-start' }}>
          {/* Left: Salary path */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '42%', transform: `translateX(${leftX}px)` }}>
            <svg width="80" height="88" viewBox="0 0 80 88">
              <ellipse cx="40" cy="56" rx="34" ry="28" fill="#4B5563" />
              <rect x="28" y="20" width="24" height="26" rx="6" fill="#4B5563" />
              <rect x="34" y="10" width="12" height="14" rx="4" fill="#6B7280" />
              <text x="40" y="61" textAnchor="middle" fill={WHITE} fontSize={20} fontFamily="Arial Black" fontWeight={900}>$</text>
            </svg>
            <div style={{ ...headline(18, WHITE), marginTop: 12 }}>TAKE SALARY</div>
            <div style={{ ...headline(20, WHITE), marginTop: 4 }}>$100M</div>
            <div style={{ width: '90%', height: 2, background: '#374151', marginTop: 18, marginBottom: 18 }} />
            <div style={{ fontFamily: FONT, fontSize: 16, color: '#9CA3AF', marginBottom: 6 }}>IRS takes</div>
            <div style={{ ...headline(48, RED), lineHeight: 1 }}>$37M</div>
            <div style={{ fontFamily: FONT, fontSize: 16, color: '#9CA3AF', marginTop: 10 }}>net: $63M</div>
          </div>

          {/* VS */}
          <div style={{ ...headline(30, '#6B7280'), alignSelf: 'center' }}>VS</div>

          {/* Right: Borrow path */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '42%', transform: `translateX(${rightX}px)` }}>
            <svg width="80" height="88" viewBox="0 0 80 88">
              <polygon points="40,6 8,26 72,26" fill={ACCENT} />
              <rect x="14" y="28" width="8" height="30" fill={ACCENT} />
              <rect x="28" y="28" width="8" height="30" fill={ACCENT} />
              <rect x="44" y="28" width="8" height="30" fill={ACCENT} />
              <rect x="58" y="28" width="8" height="30" fill={ACCENT} />
              <rect x="6" y="60" width="68" height="8" fill={ACCENT} />
              <rect x="2" y="68" width="76" height="6" rx="2" fill={ACCENT} />
            </svg>
            <div style={{ ...headline(18, WHITE), marginTop: 12 }}>BORROW INSTEAD</div>
            <div style={{ ...headline(20, WHITE), marginTop: 4 }}>$50M LOAN</div>
            <div style={{ width: '90%', height: 2, background: '#374151', marginTop: 18, marginBottom: 18 }} />
            <div style={{ fontFamily: FONT, fontSize: 16, color: '#9CA3AF', marginBottom: 6 }}>interest only</div>
            <div style={{ ...headline(48, GREEN), lineHeight: 1 }}>$2M</div>
            <div style={{ fontFamily: FONT, fontSize: 16, color: '#9CA3AF', marginTop: 10 }}>net: $48M</div>
          </div>
        </div>

        <div style={{ opacity: savingsOp, marginTop: 40, textAlign: 'center' }}>
          <div style={{ ...headline(22, WHITE), marginBottom: 6 }}>TAX SAVINGS:</div>
          <div style={{ ...headline(54, GREEN) }}>$35,000,000</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Arrow helper used in Scene 5
const ArrowRight: React.FC<{ op: number }> = ({ op }) => (
  <div style={{ alignSelf: 'center', opacity: op }}>
    <svg width="36" height="18" viewBox="0 0 36 18">
      <line x1="0" y1="9" x2="24" y2="9" stroke="#6B7280" strokeWidth="2" />
      <polygon points="24,4 36,9 24,14" fill="#6B7280" />
    </svg>
  </div>
);

// Scene 4 – Light – Bar chart: YOU 22% vs TOP 400 at 8.2%
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const prog = interpolate(frame, [20, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const workerH = interpolate(prog, [0, 1], [0, 440]);
  const richH = interpolate(prog, [0, 1], [0, 164]);
  const workerPct = Math.round(prog * 22);
  const richPct = (prog * 8.2).toFixed(1);
  const labelOp = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
        <div style={{ ...headline(26, BLACK), letterSpacing: '0.2em', marginBottom: 10 }}>EFFECTIVE TAX RATE</div>
        <div style={{ fontFamily: FONT, fontSize: 17, color: '#6B7280', marginBottom: 50, textAlign: 'center' }}>
          Source: ProPublica / IRS Data
        </div>

        <div style={{ display: 'flex', width: '80%', justifyContent: 'space-around', alignItems: 'flex-end', height: 480 }}>
          {/* YOU bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <div style={{ fontFamily: FONT, fontSize: 52, color: RED, fontWeight: 900, marginBottom: 8 }}>{workerPct}%</div>
            <div style={{ width: 160, height: workerH, background: RED, borderRadius: '8px 8px 0 0' }} />
            <div style={{ ...headline(22, BLACK), marginTop: 16 }}>YOU</div>
          </div>

          {/* TOP 400 bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <div style={{ fontFamily: FONT, fontSize: 52, color: ACCENT, fontWeight: 900, marginBottom: 8 }}>{richPct}%</div>
            <div style={{ width: 160, height: richH, background: ACCENT, borderRadius: '8px 8px 0 0' }} />
            <div style={{ ...headline(22, BLACK), marginTop: 16 }}>TOP 400</div>
          </div>
        </div>

        <div style={{ ...headline(20, '#6B7280'), marginTop: 30, opacity: labelOp }}>
          THEY PAY LESS THAN A TEACHER
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5 – Dark – Step-up in basis inheritance diagram
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const s1 = spring({ frame, fps: 30, config: { damping: 14, stiffness: 110 } });
  const s2 = spring({ frame: Math.max(0, frame - 45), fps: 30, config: { damping: 14, stiffness: 110 } });
  const s3 = spring({ frame: Math.max(0, frame - 90), fps: 30, config: { damping: 14, stiffness: 110 } });
  const s4 = spring({ frame: Math.max(0, frame - 135), fps: 30, config: { damping: 14, stiffness: 110 } });
  const a1Op = interpolate(frame, [28, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const a2Op = interpolate(frame, [73, 93], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const a3Op = interpolate(frame, [118, 138], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const zeroOp = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div style={{ ...headline(26, ACCENT), marginBottom: 60, opacity: titleOp }}>THE FINAL TRICK</div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: 10, paddingRight: 10 }}>
          {/* Step 1: Buy at $1M */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${s1})`, width: '20%' }}>
            <svg width="64" height="72" viewBox="0 0 64 72">
              <rect x="2" y="52" width="10" height="20" fill={ACCENT} />
              <rect x="17" y="36" width="10" height="36" fill={ACCENT} />
              <rect x="32" y="22" width="10" height="50" fill={ACCENT} />
              <rect x="47" y="10" width="10" height="62" fill={ACCENT} />
              <polyline points="7,54 22,38 37,24 52,12" stroke={WHITE} strokeWidth="2" fill="none" />
            </svg>
            <div style={{ ...headline(13, WHITE), marginTop: 10, textAlign: 'center' }}>BUY AT</div>
            <div style={{ fontFamily: FONT, fontSize: 13, color: '#9CA3AF', textAlign: 'center', marginTop: 3 }}>$1M</div>
          </div>

          <ArrowRight op={a1Op} />

          {/* Step 2: Grows to $100M */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${s2})`, width: '20%' }}>
            <svg width="64" height="72" viewBox="0 0 64 72">
              <rect x="2" y="44" width="10" height="28" fill={GREEN} />
              <rect x="17" y="28" width="10" height="44" fill={GREEN} />
              <rect x="32" y="14" width="10" height="58" fill={GREEN} />
              <rect x="47" y="4" width="10" height="68" fill={GREEN} />
              <polyline points="7,46 22,30 37,16 52,6" stroke={WHITE} strokeWidth="2" fill="none" />
            </svg>
            <div style={{ ...headline(13, WHITE), marginTop: 10, textAlign: 'center' }}>GROWS TO</div>
            <div style={{ fontFamily: FONT, fontSize: 13, color: GREEN, textAlign: 'center', marginTop: 3 }}>$100M</div>
          </div>

          <ArrowRight op={a2Op} />

          {/* Step 3: Die */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${s3})`, width: '20%' }}>
            <svg width="52" height="72" viewBox="0 0 52 72">
              <path d="M 8 40 L 8 62 L 44 62 L 44 40 Q 44 12 26 12 Q 8 12 8 40 Z" fill="#9CA3AF" />
              <rect x="2" y="60" width="48" height="8" rx="2" fill="#9CA3AF" />
              <line x1="26" y1="24" x2="26" y2="52" stroke="#374151" strokeWidth="4" />
              <line x1="16" y1="38" x2="36" y2="38" stroke="#374151" strokeWidth="4" />
            </svg>
            <div style={{ ...headline(13, WHITE), marginTop: 10, textAlign: 'center' }}>OWNER</div>
            <div style={{ fontFamily: FONT, fontSize: 13, color: '#9CA3AF', textAlign: 'center', marginTop: 3 }}>DIES</div>
          </div>

          <ArrowRight op={a3Op} />

          {/* Step 4: Heir inherits */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${s4})`, width: '20%' }}>
            <svg width="64" height="72" viewBox="0 0 64 72">
              <circle cx="32" cy="18" r="16" fill="#F5F5F5" />
              <rect x="16" y="38" width="32" height="34" rx="7" fill="#4B5563" />
              <rect x="4" y="42" width="12" height="8" rx="4" fill="#4B5563" />
              <rect x="48" y="42" width="12" height="8" rx="4" fill="#4B5563" />
            </svg>
            <div style={{ ...headline(13, WHITE), marginTop: 10, textAlign: 'center' }}>HEIR GETS</div>
            <div style={{ fontFamily: FONT, fontSize: 13, color: GREEN, textAlign: 'center', marginTop: 3 }}>$100M</div>
          </div>
        </div>

        <div style={{ marginTop: 50, opacity: zeroOp, textAlign: 'center' }}>
          <div style={{ ...headline(20, WHITE), marginBottom: 8 }}>BASIS "STEPS UP" TO $100M</div>
          <div style={{ ...headline(48, GREEN) }}>ZERO TAX OWED</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6 – Light – CTA: Think like the ultra-rich
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 100 } });
  const titleY = interpolate(titleSp, [0, 1], [50, 0]);
  const t1 = spring({ frame: Math.max(0, frame - 25), fps: 30, config: { damping: 12, stiffness: 130 } });
  const t2 = spring({ frame: Math.max(0, frame - 65), fps: 30, config: { damping: 12, stiffness: 130 } });
  const t3 = spring({ frame: Math.max(0, frame - 105), fps: 30, config: { damping: 12, stiffness: 130 } });
  const ctaOp = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
        <div style={{ ...headline(30, BLACK), transform: `translateY(${titleY}px)`, marginBottom: 60, lineHeight: 1.3 }}>
          THINK LIKE<br />THE ULTRA-RICH
        </div>

        {/* Tip 1: Max Roth IRA */}
        <div style={{ display: 'flex', alignItems: 'center', width: '90%', marginBottom: 36, transform: `scale(${t1})` }}>
          <div style={{ width: 80, height: 80, borderRadius: 40, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="44" height="48" viewBox="0 0 44 48">
              <rect x="4" y="14" width="36" height="30" rx="4" fill={WHITE} />
              <rect x="8" y="8" width="28" height="10" rx="4" fill={WHITE} />
              <rect x="13" y="3" width="18" height="7" rx="3" fill="#E5E7EB" />
              <text x="22" y="34" textAnchor="middle" fill={ACCENT} fontSize={12} fontFamily="Arial Black" fontWeight={900}>IRA</text>
            </svg>
          </div>
          <div style={{ marginLeft: 22 }}>
            <div style={{ ...headline(21, BLACK) }}>MAX YOUR ROTH IRA</div>
            <div style={{ fontFamily: FONT, fontSize: 15, color: '#6B7280', marginTop: 4 }}>Tax-free growth, forever</div>
          </div>
        </div>

        {/* Tip 2: Harvest Losses */}
        <div style={{ display: 'flex', alignItems: 'center', width: '90%', marginBottom: 36, transform: `scale(${t2})` }}>
          <div style={{ width: 80, height: 80, borderRadius: 40, background: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="46" height="46" viewBox="0 0 46 46">
              <polyline points="4,6 16,26 28,16 40,32" stroke={WHITE} strokeWidth="3" fill="none" />
              <polygon points="34,40 42,32 46,42" fill={WHITE} />
              <line x1="4" y1="42" x2="42" y2="42" stroke={WHITE} strokeWidth="2" strokeDasharray="4,3" />
            </svg>
          </div>
          <div style={{ marginLeft: 22 }}>
            <div style={{ ...headline(21, BLACK) }}>HARVEST TAX LOSSES</div>
            <div style={{ fontFamily: FONT, fontSize: 15, color: '#6B7280', marginTop: 4 }}>Offset gains strategically</div>
          </div>
        </div>

        {/* Tip 3: Hold Assets */}
        <div style={{ display: 'flex', alignItems: 'center', width: '90%', marginBottom: 36, transform: `scale(${t3})` }}>
          <div style={{ width: 80, height: 80, borderRadius: 40, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="50" height="48" viewBox="0 0 50 48">
              <polygon points="25,4 4,22 46,22" fill={WHITE} />
              <rect x="10" y="22" width="30" height="22" fill={WHITE} />
              <rect x="19" y="30" width="12" height="14" rx="2" fill={GREEN} />
            </svg>
          </div>
          <div style={{ marginLeft: 22 }}>
            <div style={{ ...headline(21, BLACK) }}>HOLD APPRECIATING ASSETS</div>
            <div style={{ fontFamily: FONT, fontSize: 15, color: '#6B7280', marginTop: 4 }}>Realize gains on your terms</div>
          </div>
        </div>

        <div style={{ opacity: ctaOp, textAlign: 'center', marginTop: 8 }}>
          <div style={{ ...headline(26, ACCENT) }}>FOLLOW FOR MORE →</div>
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



