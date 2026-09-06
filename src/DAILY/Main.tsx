import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const houseOp = interpolate(frame, [12, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerOp = interpolate(frame, [48, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const billY = interpolate(frame, [85, 148], [-260, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const billOp = interpolate(frame, [85, 112], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const warnScale = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 10, stiffness: 180 } });
  const warnOp = interpolate(frame, [160, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '60px 50px' }}>
        <p style={{ ...headline(38, WHITE), transform: `scale(${titleScale})` }}>PROPERTY TAXES</p>

        <svg width="340" height="215" viewBox="0 0 340 215" opacity={houseOp}>
          {/* Chimney */}
          <rect x="234" y="38" width="24" height="52" fill="#374151" />
          {/* Roof */}
          <polygon points="40,104 170,12 300,104" fill="#4B5563" />
          {/* Wall */}
          <rect x="60" y="102" width="220" height="113" fill="#6B7280" />
          {/* Door */}
          <rect x="152" y="160" width="52" height="55" rx="5" fill="#1F2937" />
          <circle cx="197" cy="190" r="4" fill="#D1D5DB" />
          {/* Left window */}
          <rect x="78" y="122" width="50" height="40" rx="4" fill="#BFDBFE" />
          <line x1="103" y1="122" x2="103" y2="162" stroke="#93C5FD" strokeWidth="2" />
          <line x1="78" y1="142" x2="128" y2="142" stroke="#93C5FD" strokeWidth="2" />
          {/* Right window */}
          <rect x="212" y="122" width="50" height="40" rx="4" fill="#BFDBFE" />
          <line x1="237" y1="122" x2="237" y2="162" stroke="#93C5FD" strokeWidth="2" />
          <line x1="212" y1="142" x2="262" y2="142" stroke="#93C5FD" strokeWidth="2" />
          {/* Paid off banner */}
          <g opacity={bannerOp}>
            <rect x="60" y="83" width="220" height="26" rx="3" fill="#10B981" />
            <text x="170" y="101" textAnchor="middle" fill={WHITE} fontSize="14" fontFamily="Arial Black" letterSpacing="1">MORTGAGE PAID OFF</text>
          </g>
        </svg>

        {/* Falling tax bill */}
        <div style={{ transform: `translateY(${billY}px)`, opacity: billOp }}>
          <svg width="278" height="76" viewBox="0 0 278 76">
            <rect x="6" y="6" width="266" height="64" rx="8" fill={ACCENT} />
            <rect x="6" y="6" width="266" height="21" rx="5" fill="#B91C1C" />
            <text x="139" y="22" textAnchor="middle" fill={WHITE} fontSize="12" fontFamily="Arial Black" letterSpacing="1">OFFICIAL NOTICE</text>
            <text x="139" y="52" textAnchor="middle" fill={WHITE} fontSize="20" fontFamily="Arial Black">PROPERTY TAX BILL</text>
          </svg>
        </div>

        {/* Never stops warning */}
        <div style={{ opacity: warnOp, transform: `scale(${warnScale})` }}>
          <p style={{ ...headline(28, ACCENT) }}>IT NEVER STOPS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const houseScale = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 14, stiffness: 110 } });
  const rateOp = interpolate(frame, [55, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rateScale = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 12, stiffness: 130 } });
  const amountOp = interpolate(frame, [110, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [185, 215], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '60px 50px' }}>
        <p style={{ ...headline(36, BLACK), opacity: titleOp }}>1.1% PER YEAR. FOREVER.</p>

        <div style={{ transform: `scale(${houseScale})` }}>
          <svg width="320" height="200" viewBox="0 0 320 200">
            {/* Chimney */}
            <rect x="220" y="32" width="22" height="46" fill="#374151" />
            {/* Roof */}
            <polygon points="36,96 160,10 284,96" fill="#374151" />
            {/* Wall */}
            <rect x="56" y="94" width="208" height="106" fill="#6B7280" />
            {/* Door */}
            <rect x="140" y="150" width="48" height="50" rx="4" fill="#1F2937" />
            {/* Left window */}
            <rect x="72" y="114" width="48" height="38" rx="4" fill="#BFDBFE" />
            <line x1="96" y1="114" x2="96" y2="152" stroke="#93C5FD" strokeWidth="2" />
            <line x1="72" y1="133" x2="120" y2="133" stroke="#93C5FD" strokeWidth="2" />
            {/* Right window */}
            <rect x="200" y="114" width="48" height="38" rx="4" fill="#BFDBFE" />
            <line x1="224" y1="114" x2="224" y2="152" stroke="#93C5FD" strokeWidth="2" />
            <line x1="200" y1="133" x2="248" y2="133" stroke="#93C5FD" strokeWidth="2" />
            {/* Tax rate badge */}
            <g opacity={rateOp} transform={`translate(272, 48) scale(${rateScale})`}>
              <circle cx="0" cy="0" r="44" fill={ACCENT} />
              <text x="0" y="-4" textAnchor="middle" fill={WHITE} fontSize="20" fontFamily="Arial Black">1.1%</text>
              <text x="0" y="16" textAnchor="middle" fill={WHITE} fontSize="10" fontFamily="Arial">PER YEAR</text>
            </g>
          </svg>
        </div>

        <div style={{ opacity: amountOp, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 15, color: '#888', textAlign: 'center', margin: '0 0 6px', letterSpacing: '0.08em' }}>ON A $420,000 HOME =</p>
          <p style={{ ...headline(54, ACCENT) }}>$4,620/YEAR</p>
          <p style={{ fontFamily: FONT, fontSize: 13, color: '#888', textAlign: 'center', margin: '6px 0 0', letterSpacing: '0.06em' }}>MORTGAGE OR NOT — EVERY SINGLE YEAR</p>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 15, color: '#aaa', textAlign: 'center', opacity: subOp, margin: 0 }}>
          AND AS YOUR HOME GAINS VALUE, SO DOES THE BILL
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nowOp = interpolate(frame, [14, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const nowScale = spring({ frame: Math.max(0, frame - 14), fps, config: { damping: 14, stiffness: 110 } });
  const arrowOp = interpolate(frame, [62, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const futureOp = interpolate(frame, [78, 112], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const futureScale = spring({ frame: Math.max(0, frame - 78), fps, config: { damping: 14, stiffness: 110 } });
  const taxOp = interpolate(frame, [135, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '60px 50px' }}>
        <p style={{ ...headline(28, WHITE), opacity: titleOp }}>YOUR BILL GROWS WITH YOUR HOME</p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, width: '100%' }}>
          {/* NOW house — smaller */}
          <div style={{ opacity: nowOp, transform: `scale(${nowScale})`, textAlign: 'center' }}>
            <svg width="138" height="122" viewBox="0 0 138 122">
              <polygon points="8,68 69,8 130,68" fill="#6B7280" />
              <rect x="22" y="66" width="94" height="56" fill="#9CA3AF" />
              <rect x="52" y="90" width="34" height="32" rx="3" fill="#374151" />
              <rect x="28" y="76" width="28" height="22" rx="3" fill="#BFDBFE" />
              <rect x="82" y="76" width="28" height="22" rx="3" fill="#BFDBFE" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 12, color: '#9CA3AF', margin: '4px 0 2px', letterSpacing: '0.06em' }}>TODAY</p>
            <p style={{ ...headline(15, WHITE) }}>$420,000</p>
          </div>

          {/* Arrow */}
          <div style={{ opacity: arrowOp }}>
            <svg width="44" height="28" viewBox="0 0 44 28">
              <line x1="4" y1="14" x2="34" y2="14" stroke={WHITE} strokeWidth="2.5" />
              <polygon points="34,7 34,21 44,14" fill={WHITE} />
            </svg>
          </div>

          {/* YEAR 20 house — bigger */}
          <div style={{ opacity: futureOp, transform: `scale(${futureScale})`, textAlign: 'center' }}>
            <svg width="172" height="152" viewBox="0 0 172 152">
              <polygon points="8,86 86,8 164,86" fill="#4B5563" />
              <rect x="26" y="84" width="120" height="68" fill="#6B7280" />
              <rect x="66" y="114" width="40" height="38" rx="3" fill="#1F2937" />
              <rect x="34" y="95" width="36" height="28" rx="3" fill="#BFDBFE" />
              <rect x="102" y="95" width="36" height="28" rx="3" fill="#BFDBFE" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 12, color: '#9CA3AF', margin: '4px 0 2px', letterSpacing: '0.06em' }}>YEAR 20</p>
            <p style={{ ...headline(15, WHITE) }}>$800,000</p>
          </div>
        </div>

        {/* Tax comparison */}
        <div style={{ opacity: taxOp, display: 'flex', gap: 38, alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 12, color: '#9CA3AF', margin: '0 0 4px', letterSpacing: '0.05em' }}>TAX BILL</p>
            <p style={{ ...headline(32, '#9CA3AF') }}>$4,620</p>
            <p style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280', margin: '2px 0 0' }}>per year</p>
          </div>
          <div style={{ width: 2, height: 56, background: '#444' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 12, color: '#9CA3AF', margin: '0 0 4px', letterSpacing: '0.05em' }}>TAX BILL</p>
            <p style={{ ...headline(32, ACCENT) }}>$8,800</p>
            <p style={{ fontFamily: FONT, fontSize: 11, color: '#6B7280', margin: '2px 0 0' }}>per year</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyOp = interpolate(frame, [14, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.floor(interpolate(frame, [48, 192], [0, 289000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const labelOp = interpolate(frame, [48, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOp = interpolate(frame, [188, 218], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '60px 50px' }}>
        <p style={{ ...headline(26, BLACK), opacity: titleOp }}>40 YEARS. TOTAL PAID TO GOVERNMENT:</p>

        {/* Piggy bank being drained */}
        <svg width="210" height="170" viewBox="0 0 210 170" opacity={piggyOp}>
          {/* Body */}
          <ellipse cx="105" cy="108" rx="76" ry="62" fill="#F87171" />
          {/* Head */}
          <circle cx="178" cy="82" r="34" fill="#F87171" />
          {/* Snout */}
          <ellipse cx="204" cy="94" rx="15" ry="11" fill="#FCA5A5" />
          <circle cx="200" cy="93" r="3" fill="#991B1B" />
          <circle cx="208" cy="93" r="3" fill="#991B1B" />
          {/* Eye */}
          <circle cx="182" cy="70" r="5" fill={WHITE} />
          <circle cx="183" cy="70" r="2.5" fill="#1F2937" />
          {/* Ear */}
          <ellipse cx="165" cy="52" rx="11" ry="15" fill="#FCA5A5" />
          {/* Coin slot */}
          <rect x="89" y="44" width="32" height="6" rx="3" fill="#B91C1C" />
          {/* Legs */}
          <rect x="48" y="158" width="24" height="16" rx="5" fill="#FCA5A5" />
          <rect x="82" y="160" width="24" height="14" rx="5" fill="#FCA5A5" />
          <rect x="116" y="160" width="24" height="14" rx="5" fill="#FCA5A5" />
          <rect x="140" y="158" width="24" height="16" rx="5" fill="#FCA5A5" />
          {/* Tail */}
          <path d="M 30 108 Q 14 96 18 82 Q 22 68 30 74" fill="none" stroke="#FCA5A5" strokeWidth="4.5" strokeLinecap="round" />
          {/* Drain X */}
          <line x1="46" y1="66" x2="158" y2="160" stroke="#991B1B" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
          <line x1="158" y1="66" x2="46" y2="160" stroke="#991B1B" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
        </svg>

        <div style={{ opacity: labelOp, textAlign: 'center' }}>
          <p style={{ ...headline(62, ACCENT) }}>${counterVal.toLocaleString()}</p>
          <p style={{ fontFamily: FONT, fontSize: 14, color: '#888', textAlign: 'center', margin: '6px 0 0', letterSpacing: '0.08em' }}>
            IN PROPERTY TAXES — GONE
          </p>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 15, color: '#aaa', textAlign: 'center', opacity: subOp, margin: 0 }}>
          ENOUGH TO BUY A SECOND HOME OUTRIGHT
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personOp = interpolate(frame, [14, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const incomeH = interpolate(frame, [38, 92], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taxBarH = interpolate(frame, [88, 182], [12, 162], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [178, 214], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const baseline = 212;
  const incomeTopY = baseline - incomeH;
  const taxTopY = baseline - taxBarH;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '60px 50px' }}>
        <p style={{ ...headline(26, WHITE), opacity: titleOp }}>IN RETIREMENT: FIXED INCOME.</p>
        <p style={{ ...headline(26, ACCENT), opacity: titleOp, marginTop: -8 }}>EVER-RISING TAX BILL.</p>

        <svg width="380" height="264" viewBox="0 0 380 264">
          {/* Retired person in chair */}
          <g opacity={personOp}>
            {/* Chair back */}
            <rect x="22" y="124" width="8" height="80" rx="3" fill="#374151" />
            <rect x="100" y="124" width="8" height="38" rx="3" fill="#374151" />
            {/* Seat */}
            <rect x="22" y="156" width="90" height="32" rx="5" fill="#4B5563" />
            {/* Chair legs */}
            <rect x="22" y="186" width="8" height="36" rx="3" fill="#374151" />
            <rect x="96" y="186" width="8" height="36" rx="3" fill="#374151" />
            {/* Person head */}
            <circle cx="67" cy="96" r="22" fill="#9CA3AF" />
            {/* Torso */}
            <rect x="50" y="118" width="34" height="44" rx="5" fill="#9CA3AF" />
            {/* Arms */}
            <rect x="22" y="136" width="30" height="9" rx="4" fill="#9CA3AF" />
            <rect x="84" y="136" width="22" height="9" rx="4" fill="#9CA3AF" />
            {/* Legs */}
            <rect x="50" y="160" width="16" height="36" rx="4" fill="#9CA3AF" />
            <rect x="70" y="160" width="16" height="36" rx="4" fill="#9CA3AF" />
          </g>

          {/* Fixed income bar */}
          <rect x="165" y={incomeTopY} width="72" height={incomeH} rx="5" fill="#10B981" />

          {/* Rising tax bar */}
          <rect x="268" y={taxTopY} width="72" height={taxBarH} rx="5" fill={ACCENT} />

          {/* Upward arrow on tax bar */}
          <g opacity={labelOp}>
            <line x1="304" y1={taxTopY - 6} x2="304" y2={taxTopY - 26} stroke={ACCENT} strokeWidth="2.5" />
            <polygon points={`298,${taxTopY - 20} 310,${taxTopY - 20} 304,${taxTopY - 34}`} fill={ACCENT} />
          </g>

          {/* Baseline */}
          <line x1="148" y1={baseline} x2="358" y2={baseline} stroke="#444" strokeWidth="2" />

          {/* Bar labels */}
          <g opacity={labelOp}>
            <text x="201" y={baseline + 20} textAnchor="middle" fill="#10B981" fontSize="12" fontFamily="Arial Black">INCOME</text>
            <text x="201" y={baseline + 34} textAnchor="middle" fill="#10B981" fontSize="11" fontFamily="Arial">(FIXED)</text>
            <text x="304" y={baseline + 20} textAnchor="middle" fill={ACCENT} fontSize="12" fontFamily="Arial Black">TAX BILL</text>
            <text x="304" y={baseline + 34} textAnchor="middle" fill={ACCENT} fontSize="11" fontFamily="Arial">(RISING)</text>
          </g>
        </svg>

        <p style={{ fontFamily: FONT, fontSize: 15, color: '#aaa', textAlign: 'center', opacity: labelOp, margin: 0 }}>
          SOME PAY MORE IN TAXES THAN THEIR OLD MORTGAGE
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item1Scale = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 14, stiffness: 120 } });
  const item2Scale = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 14, stiffness: 120 } });
  const item3Scale = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 14, stiffness: 120 } });
  const badgeOp = interpolate(frame, [130, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: Math.max(0, frame - 130), fps, config: { damping: 12, stiffness: 130 } });
  const ctaOp = interpolate(frame, [178, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 178), fps, config: { damping: 12, stiffness: 130 } });

  const items = [
    { label: 'SENIOR EXEMPTION', sub: 'Up to 50% off for age 65+', scale: item1Scale },
    { label: 'HOMESTEAD EXEMPTION', sub: 'Avg. $1,200/year savings', scale: item2Scale },
    { label: 'PROPERTY TAX FREEZE', sub: 'Locks your rate permanently', scale: item3Scale },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '60px 50px' }}>
        <p style={{ ...headline(32, BLACK), opacity: titleOp }}>HOW TO FIGHT BACK</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                transform: `scale(${item.scale})`,
                background: '#F9FAFB',
                border: `2px solid ${ACCENT}`,
                borderRadius: 10,
                padding: '10px 16px',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="15" fill={ACCENT} />
                <polyline points="8,16 13,22 24,10" fill="none" stroke={WHITE} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 15, color: BLACK, margin: 0, letterSpacing: '0.05em' }}>{item.label}</p>
                <p style={{ fontFamily: '"Arial", sans-serif', fontSize: 13, color: '#888', margin: '2px 0 0' }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ opacity: badgeOp, transform: `scale(${badgeScale})`, textAlign: 'center', background: ACCENT, borderRadius: 12, padding: '10px 22px' }}>
          <p style={{ fontFamily: FONT, fontSize: 14, color: WHITE, margin: 0, letterSpacing: '0.07em' }}>MOST STATES OFFER THESE — MOST NEVER APPLY</p>
        </div>

        <div style={{ opacity: ctaOp, transform: `scale(${ctaScale})`, textAlign: 'center' }}>
          <p style={{ ...headline(24, BLACK), marginBottom: 6 }}>FOLLOW FOR MORE</p>
          <p style={{ fontFamily: FONT, fontSize: 14, color: '#888', textAlign: 'center', margin: 0 }}>HIDDEN COSTS NOBODY WARNS YOU ABOUT</p>
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
