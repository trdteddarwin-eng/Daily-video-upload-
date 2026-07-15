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

// Scene 1 — Dark — Brain battery depletes, 35k decision counter
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 24], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const batteryFill = interpolate(frame, [20, dur - 15], [1, 0.05], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const batteryPct = Math.floor(batteryFill * 100);
  const batteryFillW = Math.max(0, Math.floor(50 * batteryFill));
  const batteryColor = batteryFill > 0.5 ? '#10B981' : batteryFill > 0.2 ? '#F59E0B' : ACCENT;

  const decisions = Math.floor(interpolate(frame, [40, 160], [0, 35000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const personSc = spring({ frame: frame - 8, fps, config: { stiffness: 80, damping: 14 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(50, WHITE), transform: `translateY(${titleY}px)`, opacity: titleOp, marginBottom: 50, lineHeight: 1.2 }}>
          YOUR BRAIN IS<br /><span style={{ color: ACCENT }}>RUNNING ON</span><br />EMPTY
        </div>

        <svg width="210" height="290" viewBox="0 0 210 290" style={{ transform: `scale(${personSc})` }}>
          <ellipse cx="105" cy="58" rx="55" ry="44" fill="none" stroke={ACCENT} strokeWidth="3.5" />
          <path d="M 60 58 Q 52 40 70 28 Q 88 16 105 32 Q 122 16 140 28 Q 158 40 150 58" fill="none" stroke={ACCENT} strokeWidth="2.5" />
          <path d="M 62 63 Q 56 74 67 81" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 148 63 Q 154 74 143 81" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 82 36 Q 93 52 105 42 Q 117 52 128 36" fill="none" stroke={ACCENT} strokeWidth="2" />
          <line x1="105" y1="102" x2="105" y2="118" stroke={WHITE} strokeWidth="2.5" strokeDasharray="4 3" />
          <rect x="76" y="118" width="58" height="27" rx="4" fill="none" stroke={WHITE} strokeWidth="2.5" />
          <rect x="134" y="126" width="6" height="11" rx="2" fill={WHITE} />
          <rect x="80" y="122" width={batteryFillW} height="19" rx="2" fill={batteryColor} />
          <text x="105" y="165" textAnchor="middle" fill={WHITE} fontFamily="Arial, sans-serif" fontSize="14" letterSpacing="1">{batteryPct}%</text>
          <text x="105" y="180" textAnchor="middle" fill={WHITE} fontFamily="Arial, sans-serif" fontSize="10" opacity="0.6" letterSpacing="0.5">DECISION FUEL</text>
          <circle cx="105" cy="212" r="22" fill={WHITE} opacity="0.9" />
          <path d="M 71 278 Q 73 248 105 243 Q 137 248 139 278" fill={WHITE} opacity="0.9" />
          <line x1="72" y1="254" x2="47" y2="272" stroke={WHITE} strokeWidth="8" strokeLinecap="round" opacity="0.9" />
          <line x1="138" y1="254" x2="163" y2="272" stroke={WHITE} strokeWidth="8" strokeLinecap="round" opacity="0.9" />
        </svg>

        <div style={{ ...headline(46, ACCENT), marginTop: 36, opacity: subOp }}>
          {decisions.toLocaleString()}
        </div>
        <div style={{ ...headline(20, WHITE), marginTop: 10, opacity: subOp }}>
          DECISIONS TODAY
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2 — Light — Clock sweeps 9AM to 4PM, energy bar drains
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 22], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const factOp = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const clockProg = interpolate(frame, [15, dur - 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const hourAngle = 270 + clockProg * 210;
  const minuteAngle = clockProg * 360 * 7;
  const hRad = (hourAngle * Math.PI) / 180;
  const mRad = (minuteAngle * Math.PI) / 180;
  const cx = 95, cy = 95;
  const hrX = cx + 40 * Math.sin(hRad);
  const hrY = cy - 40 * Math.cos(hRad);
  const mnX = cx + 62 * Math.sin(mRad);
  const mnY = cy - 62 * Math.cos(mRad);

  const energyFill = interpolate(frame, [15, dur - 15], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const energyH = Math.max(0, Math.floor(energyFill * 260));
  const eColor = energyFill > 0.5 ? '#10B981' : energyFill > 0.25 ? '#F59E0B' : ACCENT;

  const hourTicks = [...Array(Math.max(0, Math.floor(12)))].map((_, i) => {
    const ang = (i / 12) * Math.PI * 2;
    return {
      x1: cx + 72 * Math.sin(ang),
      y1: cy - 72 * Math.cos(ang),
      x2: cx + 84 * Math.sin(ang),
      y2: cy - 84 * Math.cos(ang),
    };
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(46, BLACK), transform: `translateY(${titleY}px)`, opacity: titleOp, marginBottom: 50, lineHeight: 1.2 }}>
          BY 4 PM<br /><span style={{ color: ACCENT }}>YOUR FUEL</span><br />IS GONE
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 50 }}>
          <svg width="190" height="190" viewBox="0 0 190 190">
            <circle cx={cx} cy={cy} r="88" fill="none" stroke={BLACK} strokeWidth="4" />
            {hourTicks.map((t, i) => (
              <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke={BLACK} strokeWidth="3" strokeLinecap="round" />
            ))}
            <line x1={cx} y1={cy} x2={hrX} y2={hrY} stroke={BLACK} strokeWidth="6" strokeLinecap="round" />
            <line x1={cx} y1={cy} x2={mnX} y2={mnY} stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
            <circle cx={cx} cy={cy} r="5" fill={BLACK} />
            <text x="154" y="100" textAnchor="middle" fill={ACCENT} fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold">4</text>
          </svg>

          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 8 }}>
            <div style={{ fontFamily: FONT, fontSize: 12, color: BLACK, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>ENERGY</div>
            <div style={{ width: 30, height: 260, background: '#E5E7EB', borderRadius: 15, overflow: 'hidden', display: 'flex', flexDirection: 'column' as const, justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', height: energyH, background: eColor, borderRadius: 15 }} />
            </div>
            <div style={{ fontFamily: FONT, fontSize: 14, color: eColor, letterSpacing: '0.08em' }}>{Math.floor(energyFill * 100)}%</div>
          </div>
        </div>

        <div style={{ ...headline(22, BLACK), marginTop: 44, opacity: factOp, lineHeight: 1.4 }}>
          EACH CHOICE BURNS<br /><span style={{ color: ACCENT, fontSize: 26 }}>MENTAL FUEL</span><br />AND THERE IS NO REFILL
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3 — Dark — Israeli judge study: gavel + bar chart
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gavelSc = spring({ frame: frame - 10, fps, config: { stiffness: 90, damping: 13 } });

  const bar1H = Math.max(0, Math.floor(interpolate(frame, [45, 110], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const bar2H = Math.max(0, Math.floor(interpolate(frame, [90, 155], [0, 62], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const bar1Op = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2Op = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOp = interpolate(frame, [155, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(36, WHITE), opacity: titleOp, marginBottom: 28, lineHeight: 1.3 }}>
          JUDGES PROVE<br /><span style={{ color: ACCENT }}>IT IS REAL</span>
        </div>

        <svg width="120" height="90" viewBox="0 0 120 90" style={{ transform: `scale(${gavelSc})`, marginBottom: 36 }}>
          <rect x="5" y="18" width="58" height="26" rx="6" fill={ACCENT} />
          <rect x="5" y="18" width="58" height="9" rx="5" fill="#B91C1C" />
          <rect x="5" y="35" width="58" height="9" rx="5" fill="#DC2626" opacity="0.7" />
          <line x1="58" y1="38" x2="112" y2="82" stroke="#92400E" strokeWidth="10" strokeLinecap="round" />
          <line x1="58" y1="38" x2="112" y2="82" stroke="#B45309" strokeWidth="6" strokeLinecap="round" />
        </svg>

        <div style={{ display: 'flex', gap: 55, alignItems: 'flex-end', marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 8, opacity: bar1Op }}>
            <div style={{ fontFamily: FONT, fontSize: 40, color: '#10B981', letterSpacing: '0.06em' }}>65%</div>
            <div style={{ width: 85, height: bar1H, background: '#10B981', borderRadius: '8px 8px 0 0', minHeight: 4 }} />
            <div style={{ fontFamily: FONT, fontSize: 14, color: WHITE, letterSpacing: '0.07em', textAlign: 'center' as const, textTransform: 'uppercase' as const }}>MORNING</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 8, opacity: bar2Op }}>
            <div style={{ fontFamily: FONT, fontSize: 40, color: ACCENT, letterSpacing: '0.06em' }}>20%</div>
            <div style={{ width: 85, height: bar2H, background: ACCENT, borderRadius: '8px 8px 0 0', minHeight: 4 }} />
            <div style={{ fontFamily: FONT, fontSize: 14, color: WHITE, letterSpacing: '0.07em', textAlign: 'center' as const, textTransform: 'uppercase' as const }}>PRE-LUNCH</div>
          </div>
        </div>

        <div style={{ ...headline(19, WHITE), opacity: captionOp, lineHeight: 1.6 }}>
          PAROLE APPROVED<br /><span style={{ color: ACCENT }}>SAME JUDGE · SAME CRIME · DIFFERENT HOUR</span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4 — Light — Phone showing 4PM, 5 notification banners flood in
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneY = interpolate(frame, [10, 38], [70, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionOp = interpolate(frame, [148, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const n1Op = interpolate(frame, [40, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const n2Op = interpolate(frame, [58, 76], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const n3Op = interpolate(frame, [76, 94], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const n4Op = interpolate(frame, [94, 112], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const n5Op = interpolate(frame, [112, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const notifs = [
    { text: 'SALE ENDS TONIGHT', op: n1Op, color: ACCENT },
    { text: '50% OFF — 4 HRS LEFT', op: n2Op, color: '#F59E0B' },
    { text: 'YOUR CART IS WAITING', op: n3Op, color: ACCENT },
    { text: 'FLASH DEAL: CLICK NOW', op: n4Op, color: '#DC2626' },
    { text: 'JUST FOR YOU: 40% OFF', op: n5Op, color: ACCENT },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(42, BLACK), opacity: titleOp, marginBottom: 28, lineHeight: 1.25 }}>
          RETAILERS KNOW<br /><span style={{ color: ACCENT }}>YOUR SCHEDULE</span>
        </div>

        <div style={{ transform: `translateY(${phoneY}px)` }}>
          <svg width="160" height="270" viewBox="0 0 160 270">
            <rect x="8" y="5" width="144" height="260" rx="22" fill={BLACK} />
            <rect x="16" y="18" width="128" height="234" rx="10" fill="#111827" />
            <rect x="54" y="10" width="52" height="11" rx="5.5" fill="#374151" />
            <text x="80" y="64" textAnchor="middle" fill={WHITE} fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold">4:00</text>
            <text x="80" y="82" textAnchor="middle" fill="#9CA3AF" fontFamily="Arial, sans-serif" fontSize="12">PM</text>
            <rect x="58" y="250" width="44" height="4" rx="2" fill="#374151" />
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, width: '100%', maxWidth: 430, marginTop: 16 }}>
          {notifs.map((n, i) => (
            <div key={i} style={{
              background: n.color,
              fontFamily: FONT,
              fontSize: 15,
              color: WHITE,
              letterSpacing: '0.05em',
              padding: '10px 16px',
              borderRadius: 10,
              opacity: n.op,
              textTransform: 'uppercase' as const,
            }}>
              {n.text}
            </div>
          ))}
        </div>

        <div style={{ ...headline(19, BLACK), marginTop: 24, opacity: captionOp, lineHeight: 1.5 }}>
          TIMED FOR YOUR<br /><span style={{ color: ACCENT }}>WEAKEST HOUR</span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5 — Dark — $1,400 counter, dollar bills fading
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.floor(interpolate(frame, [30, 175], [0, 1400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const counterSc = spring({ frame: frame - 22, fps, config: { stiffness: 55, damping: 16 } });
  const captionOp = interpolate(frame, [160, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const b1Op = interpolate(frame, [0, 5, 50, 70], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b2Op = interpolate(frame, [0, 5, 70, 90], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b3Op = interpolate(frame, [0, 5, 90, 110], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b4Op = interpolate(frame, [0, 5, 110, 130], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b5Op = interpolate(frame, [0, 5, 130, 150], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const billOps = [b1Op, b2Op, b3Op, b4Op, b5Op];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(40, WHITE), opacity: titleOp, marginBottom: 36, lineHeight: 1.3 }}>
          YOU SPEND<br /><span style={{ color: ACCENT }}>22% MORE</span><br />AFTER 4 PM
        </div>

        <div style={{ position: 'relative' as const, width: 202, height: 114, marginBottom: 28 }}>
          {billOps.map((op, i) => (
            <div key={i} style={{ position: 'absolute' as const, top: i * 6, left: i * 3, opacity: op }}>
              <svg width="190" height="88" viewBox="0 0 190 88">
                <rect x="1" y="1" width="188" height="86" rx="7" fill="#15803D" stroke="#166534" strokeWidth="2" />
                <rect x="9" y="9" width="172" height="70" rx="4" fill="none" stroke="#166534" strokeWidth="1.5" opacity="0.55" />
                <circle cx="95" cy="44" r="25" fill="none" stroke="#166534" strokeWidth="1.5" opacity="0.55" />
                <text x="95" y="55" textAnchor="middle" fill={WHITE} fontFamily="Arial, sans-serif" fontSize="34" fontWeight="bold">$</text>
                <text x="20" y="27" fill={WHITE} fontFamily="Arial, sans-serif" fontSize="13" opacity="0.8">100</text>
                <text x="170" y="70" textAnchor="end" fill={WHITE} fontFamily="Arial, sans-serif" fontSize="13" opacity="0.8">100</text>
              </svg>
            </div>
          ))}
        </div>

        <div style={{
          fontFamily: FONT,
          fontSize: 88,
          color: ACCENT,
          letterSpacing: '0.04em',
          textAlign: 'center' as const,
          transform: `scale(${counterSc})`,
          lineHeight: 1,
        }}>
          ${counterVal.toLocaleString()}
        </div>
        <div style={{ ...headline(24, WHITE), marginTop: 14 }}>DRAINED EVERY YEAR</div>

        <div style={{ ...headline(17, WHITE), marginTop: 24, opacity: captionOp, lineHeight: 1.5 }}>
          FROM <span style={{ color: ACCENT }}>LATE-DAY IMPULSE BUYS</span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6 — Light — Morning sun + coffee + checklist CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sunSc = spring({ frame: frame - 18, fps, config: { stiffness: 65, damping: 11 } });
  const cupOp = interpolate(frame, [40, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c1Op = interpolate(frame, [72, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c2Op = interpolate(frame, [92, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const c3Op = interpolate(frame, [112, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [148, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rayRot = interpolate(frame, [0, dur], [0, 18], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const checks = [
    'CHECK BALANCES BEFORE 9 AM',
    'BIG BUYS: MORNING ONLY',
    'NO SHOPPING APPS AFTER 4 PM',
  ];
  const checkOps = [c1Op, c2Op, c3Op];

  const sunRays = [...Array(Math.max(0, Math.floor(8)))].map((_, i) => {
    const ang = (i / 8) * Math.PI * 2;
    return {
      x1: 60 + 36 * Math.sin(ang),
      y1: 60 - 36 * Math.cos(ang),
      x2: 60 + 55 * Math.sin(ang),
      y2: 60 - 55 * Math.cos(ang),
    };
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(40, BLACK), opacity: titleOp, marginBottom: 30, lineHeight: 1.25 }}>
          HACK YOUR BRAIN<br /><span style={{ color: ACCENT }}>ONE RULE</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginBottom: 32 }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: `scale(${sunSc}) rotate(${rayRot}deg)` }}>
            {sunRays.map((r, i) => (
              <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
            ))}
            <circle cx="60" cy="60" r="28" fill="#F59E0B" />
            <circle cx="60" cy="60" r="20" fill="#FDE68A" />
          </svg>

          <svg width="88" height="105" viewBox="0 0 88 105" style={{ opacity: cupOp }}>
            <path d="M 14 28 L 20 88 Q 20 93 44 93 Q 68 93 68 88 L 74 28 Z" fill="#7C3AED" />
            <path d="M 14 28 Q 44 36 74 28" fill="none" stroke="#6D28D9" strokeWidth="2" />
            <path d="M 68 42 Q 84 42 84 57 Q 84 72 68 72" fill="none" stroke="#7C3AED" strokeWidth="7" strokeLinecap="round" />
            <path d="M 28 18 Q 32 8 28 0" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 44 16 Q 48 6 44 -2" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 60 18 Q 64 8 60 0" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="44" cy="93" rx="32" ry="7" fill="#5B21B6" />
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 18, width: '100%', maxWidth: 460 }}>
          {checks.map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: checkOps[i] }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <polyline points="3,10 8,15 17,5" stroke={WHITE} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 17, color: BLACK, letterSpacing: '0.05em', textTransform: 'uppercase' as const, lineHeight: 1.25 }}>
                {text}
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...headline(22, BLACK), marginTop: 36, opacity: ctaOp, lineHeight: 1.5 }}>
          YOUR <span style={{ color: ACCENT }}>MORNING SELF</span><br />IS YOUR <span style={{ color: '#10B981' }}>RICHEST SELF</span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

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
