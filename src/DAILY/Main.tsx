import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

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
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const billScale = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 100 } });
  const qOpacity = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: frame - 135, fps, config: { damping: 14, stiffness: 110 } });
  const titleOpacity = interpolate(frame, [15, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: '10%', left: 0, right: 0,
        textAlign: 'center', opacity: titleOpacity, padding: '0 80px',
      }}>
        <p style={headline(44, WHITE)}>THE REAL COST</p>
        <p style={{ ...headline(88, ACCENT), lineHeight: 0.9, margin: '8px 0' }}>OF $100</p>
        <p style={headline(44, WHITE)}>YOU NEVER KNEW</p>
      </div>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        <g transform={`translate(540, 970) scale(${billScale})`} style={{ transformOrigin: '0 0' }}>
          <rect x={-240} y={-110} width={480} height={220} rx={18} fill="#2E7D32" />
          <rect x={-225} y={-95} width={450} height={190} rx={12} fill="none" stroke="#4CAF50" strokeWidth={4} />
          <ellipse cx={0} cy={0} rx={68} ry={82} fill="#1B5E20" opacity={0.6} />
          <text x={0} y={16} textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize={64} fontWeight="bold">100</text>
          <text x={-195} y={-52} fill="#81C784" fontFamily={FONT} fontSize={28} fontWeight="bold">$</text>
          <text x={-195} y={64} fill="#81C784" fontFamily={FONT} fontSize={28} fontWeight="bold">100</text>
          <text x={172} y={-52} textAnchor="end" fill="#81C784" fontFamily={FONT} fontSize={28} fontWeight="bold">$</text>
          <text x={172} y={64} textAnchor="end" fill="#81C784" fontFamily={FONT} fontSize={28} fontWeight="bold">100</text>
        </g>
        <text x={540} y={750} textAnchor="middle" fill={ACCENT} fontFamily={FONT}
          fontSize={130} fontWeight="bold" opacity={qOpacity}>?</text>
        <g transform={`scale(${badgeScale})`} style={{ transformOrigin: '540px 1200px' }}>
          <rect x={230} y={1160} width={620} height={100} rx={18} fill={ACCENT} />
          <text x={540} y={1228} textAnchor="middle" fill={BLACK}
            fontFamily={FONT} fontSize={52} fontWeight="bold">EARN $153</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personScale = spring({ frame: frame - 5, fps, config: { damping: 12, stiffness: 100 } });
  const barH = interpolate(frame, [30, 100], [0, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const irsX = interpolate(frame, [90, 150], [1300, 720], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const taxX = interpolate(frame, [155, 200], [390, 690], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) });
  const taxOpacity = interpolate(frame, [150, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: frame - 170, fps, config: { damping: 14, stiffness: 100 } });
  const barLabelOp = interpolate(frame, [95, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const FULL_BAR = 280;
  const taxBarH = FULL_BAR * 0.22;
  const keepBarH = FULL_BAR * 0.78;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: '10%', left: 0, right: 0,
        textAlign: 'center', opacity: headerOpacity, padding: '0 60px',
      }}>
        <p style={{ ...headline(42, BLACK), marginBottom: 4 }}>LAYER ONE</p>
        <p style={headline(62, ACCENT)}>INCOME TAX</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#444', marginTop: 14 }}>
          22% — before you see a dime
        </p>
      </div>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        {/* Person silhouette */}
        <g transform={`translate(390, 1010) scale(${personScale})`} style={{ transformOrigin: '0 0' }}>
          <circle cx={0} cy={-160} r={52} fill="#555" />
          <rect x={-44} y={-104} width={88} height={130} rx={22} fill="#555" />
          <rect x={-42} y={26} width={34} height={90} rx={12} fill="#555" />
          <rect x={10} y={26} width={34} height={90} rx={12} fill="#555" />
        </g>
        {/* Income bar growing */}
        <rect x={350} y={900 + (FULL_BAR - barH)} width={80} height={barH} rx={6} fill="#4CAF50" opacity={0.9} />
        <text x={390} y={870} textAnchor="middle" fill="#4CAF50"
          fontFamily={FONT} fontSize={30} fontWeight="bold" opacity={barLabelOp}>$153</text>
        {/* IRS government building */}
        <g transform={`translate(${irsX}, 940)`}>
          <rect x={-80} y={-90} width={160} height={180} fill="#B71C1C" rx={4} />
          {[...Array(Math.max(0, Math.floor(4)))].map((_, ci) => (
            <rect key={ci} x={-58 + ci * 38} y={-70} width={12} height={140} fill="#D32F2F" rx={3} />
          ))}
          <text x={0} y={16} textAnchor="middle" fill="white"
            fontFamily={FONT} fontSize={40} fontWeight="bold">IRS</text>
          <polygon points="-88,-90 0,-148 88,-90" fill="#C62828" />
        </g>
        {/* Tax chunk flying toward IRS */}
        <rect x={taxX - 20} y={900 + keepBarH} width={80} height={taxBarH} rx={4}
          fill={ACCENT} opacity={taxOpacity} />
        {/* Badge */}
        <g transform={`scale(${badgeScale})`} style={{ transformOrigin: '540px 1355px' }}>
          <rect x={285} y={1325} width={510} height={82} rx={14} fill={ACCENT} />
          <text x={540} y={1378} textAnchor="middle" fill={BLACK}
            fontFamily={FONT} fontSize={40} fontWeight="bold">22% TAKEN FIRST</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stubScale = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 90 } });
  const line1Op = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Op = interpolate(frame, [75, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line3Op = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ficaGlow = interpolate(frame, [140, 170, 200, 220], [0, 1, 0.4, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: frame - 168, fps, config: { damping: 14, stiffness: 100 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: '10%', left: 0, right: 0,
        textAlign: 'center', opacity: headerOpacity, padding: '0 60px',
      }}>
        <p style={{ ...headline(42, WHITE), marginBottom: 4 }}>LAYER TWO</p>
        <p style={headline(62, ACCENT)}>PAYROLL TAX</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#aaa', marginTop: 14 }}>
          7.65% — every single paycheck
        </p>
      </div>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        {/* Pay stub card */}
        <g transform={`translate(540, 960) scale(${stubScale})`} style={{ transformOrigin: '0 0' }}>
          <rect x={-310} y={-260} width={620} height={480} rx={22} fill="#1E1E1E" />
          <rect x={-310} y={-260} width={620} height={480} rx={22} fill="none" stroke="#333" strokeWidth={3} />
          <text x={0} y={-210} textAnchor="middle" fill="#666"
            fontFamily={FONT} fontSize={28} fontWeight="bold">PAY STUB</text>
          <line x1={-280} y1={-188} x2={280} y2={-188} stroke="#333" strokeWidth={2} />
          {/* Gross pay */}
          <text x={-270} y={-142} fill="#aaa" fontFamily={FONT} fontSize={28} opacity={line1Op}>GROSS PAY</text>
          <text x={270} y={-142} textAnchor="end" fill="#4CAF50"
            fontFamily={FONT} fontSize={28} fontWeight="bold" opacity={line1Op}>+$153.00</text>
          <line x1={-270} y1={-116} x2={270} y2={-116} stroke="#2a2a2a" strokeWidth={1} opacity={line1Op} />
          {/* Federal tax */}
          <text x={-270} y={-72} fill="#aaa" fontFamily={FONT} fontSize={28} opacity={line2Op}>FEDERAL TAX</text>
          <text x={270} y={-72} textAnchor="end" fill="#EF4444"
            fontFamily={FONT} fontSize={28} fontWeight="bold" opacity={line2Op}>−$33.66</text>
          <line x1={-270} y1={-46} x2={270} y2={-46} stroke="#2a2a2a" strokeWidth={1} opacity={line2Op} />
          {/* FICA — highlighted */}
          <rect x={-290} y={-14} width={580} height={62} rx={10}
            fill={ACCENT} opacity={ficaGlow * line3Op * 0.25} />
          <text x={-270} y={34} fill={WHITE}
            fontFamily={FONT} fontSize={27} fontWeight="bold" opacity={line3Op}>FICA (SS + MEDICARE)</text>
          <text x={270} y={34} textAnchor="end" fill={ACCENT}
            fontFamily={FONT} fontSize={28} fontWeight="bold" opacity={line3Op}>−$11.70</text>
        </g>
        {/* Badge */}
        <g transform={`scale(${badgeScale})`} style={{ transformOrigin: '540px 1320px' }}>
          <rect x={280} y={1286} width={520} height={82} rx={14} fill={ACCENT} />
          <text x={540} y={1339} textAnchor="middle" fill={BLACK}
            fontFamily={FONT} fontSize={40} fontWeight="bold">7.65% INVISIBLE FEE</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bagScale = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 100 } });
  const receiptY = interpolate(frame, [50, 115], [400, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const line1Op = interpolate(frame, [115, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Op = interpolate(frame, [140, 163], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line3Op = interpolate(frame, [163, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taxGlow = interpolate(frame, [163, 190, 210, 225], [0, 1, 0.4, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: '10%', left: 0, right: 0,
        textAlign: 'center', opacity: headerOpacity, padding: '0 60px',
      }}>
        <p style={{ ...headline(42, BLACK), marginBottom: 4 }}>LAYER THREE</p>
        <p style={headline(62, ACCENT)}>SALES TAX</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: '#444', marginTop: 14 }}>
          7.5% average — right at checkout
        </p>
      </div>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        {/* Shopping bag */}
        <g transform={`translate(540, 820) scale(${bagScale})`} style={{ transformOrigin: '0 0' }}>
          <rect x={-95} y={-30} width={190} height={155} rx={18} fill="#90A4AE" />
          <path d="M -52,-30 Q -52,-96 0,-96 Q 52,-96 52,-30"
            fill="none" stroke="#607D8B" strokeWidth={18} strokeLinecap="round" />
          <text x={0} y={92} textAnchor="middle" fill="white"
            fontFamily={FONT} fontSize={64} fontWeight="bold">$</text>
        </g>
        {/* Receipt sliding up */}
        <g transform={`translate(540, ${960 + receiptY})`}>
          <rect x={-205} y={0} width={410} height={296} rx={14} fill="white" />
          <rect x={-205} y={0} width={410} height={296} rx={14} fill="none" stroke="#ddd" strokeWidth={2} />
          <text x={0} y={42} textAnchor="middle" fill="#bbb" fontFamily={FONT} fontSize={24}>RECEIPT</text>
          <line x1={-180} y1={58} x2={180} y2={58} stroke="#eee" strokeWidth={2} />
          {/* Subtotal */}
          <text x={-180} y={102} fill="#666" fontFamily={FONT} fontSize={28} opacity={line1Op}>SUBTOTAL</text>
          <text x={180} y={102} textAnchor="end" fill="#666"
            fontFamily={FONT} fontSize={28} opacity={line1Op}>$93.02</text>
          {/* Tax line highlighted */}
          <rect x={-190} y={110} width={380} height={54} rx={8}
            fill={ACCENT} opacity={taxGlow * line2Op * 0.2} />
          <text x={-180} y={148} fill={BLACK} fontFamily={FONT} fontSize={28} fontWeight="bold" opacity={line2Op}>TAX (7.5%)</text>
          <text x={180} y={148} textAnchor="end" fill={ACCENT}
            fontFamily={FONT} fontSize={28} fontWeight="bold" opacity={line2Op}>+$6.98</text>
          {/* Total */}
          <line x1={-180} y1={170} x2={180} y2={170} stroke="#333" strokeWidth={2} opacity={line3Op} />
          <text x={-180} y={212} fill={BLACK} fontFamily={FONT} fontSize={34} fontWeight="bold" opacity={line3Op}>TOTAL</text>
          <text x={180} y={212} textAnchor="end" fill={BLACK}
            fontFamily={FONT} fontSize={34} fontWeight="bold" opacity={line3Op}>$100.00</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Segments build bottom-to-top: yours (green), federal (red), fica (orange), state (yellow), sales (amber)
  const seg0H = interpolate(frame, [35, 80], [0, 230], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const seg1H = interpolate(frame, [80, 115], [0, 105], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const seg2H = interpolate(frame, [115, 138], [0, 42], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const seg3H = interpolate(frame, [138, 158], [0, 32], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });
  const seg4H = interpolate(frame, [158, 178], [0, 32], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) });

  const labelOpacity = interpolate(frame, [178, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalScale = spring({ frame: frame - 170, fps, config: { damping: 14, stiffness: 100 } });

  const BX = 400;
  const BW = 180;
  const BASE_Y = 1370;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: '10%', left: 0, right: 0,
        textAlign: 'center', opacity: headerOpacity, padding: '0 60px',
      }}>
        <p style={{ ...headline(42, WHITE), marginBottom: 4 }}>THE FULL MATH</p>
        <p style={{ ...headline(80, ACCENT), lineHeight: 0.9, margin: '8px 0' }}>$153</p>
        <p style={headline(42, WHITE)}>TO SPEND $100</p>
      </div>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        {/* Stacked segments, bottom-to-top */}
        <rect x={BX} y={BASE_Y - seg0H} width={BW} height={seg0H} fill="#4CAF50" />
        <rect x={BX} y={BASE_Y - seg0H - seg1H} width={BW} height={seg1H} fill="#EF4444" />
        <rect x={BX} y={BASE_Y - seg0H - seg1H - seg2H} width={BW} height={seg2H} fill="#FF6D00" />
        <rect x={BX} y={BASE_Y - seg0H - seg1H - seg2H - seg3H} width={BW} height={seg3H} fill="#FDD835" />
        <rect x={BX} y={BASE_Y - seg0H - seg1H - seg2H - seg3H - seg4H} width={BW} height={seg4H} rx={6} fill={ACCENT} />
        {/* Outline */}
        <rect x={BX} y={BASE_Y - seg0H - seg1H - seg2H - seg3H - seg4H} width={BW}
          height={seg0H + seg1H + seg2H + seg3H + seg4H}
          fill="none" stroke="#333" strokeWidth={2} rx={6} />
        {/* Labels right side */}
        <text x={BX + BW + 22} y={BASE_Y - seg0H / 2 + 10}
          fill="#4CAF50" fontFamily={FONT} fontSize={24} fontWeight="bold" opacity={labelOpacity}>YOURS $93</text>
        <text x={BX + BW + 22} y={BASE_Y - seg0H - seg1H / 2 + 10}
          fill="#EF4444" fontFamily={FONT} fontSize={24} fontWeight="bold" opacity={labelOpacity}>FED $34</text>
        <text x={BX + BW + 22} y={BASE_Y - seg0H - seg1H - seg2H / 2 + 10}
          fill="#FF6D00" fontFamily={FONT} fontSize={23} fontWeight="bold" opacity={labelOpacity}>FICA $12</text>
        <text x={BX + BW + 22} y={BASE_Y - seg0H - seg1H - seg2H - seg3H / 2 + 10}
          fill="#FDD835" fontFamily={FONT} fontSize={22} fontWeight="bold" opacity={labelOpacity}>STATE $7</text>
        <text x={BX + BW + 22} y={BASE_Y - seg0H - seg1H - seg2H - seg3H - seg4H / 2 + 10}
          fill={ACCENT} fontFamily={FONT} fontSize={22} fontWeight="bold" opacity={labelOpacity}>TAX $7.50</text>
        {/* Total badge */}
        <g transform={`scale(${totalScale})`} style={{ transformOrigin: '490px 1424px' }}>
          <rect x={BX - 10} y={1408} width={BW + 20} height={50} rx={10} fill={ACCENT} />
          <text x={490} y={1443} textAnchor="middle" fill={BLACK}
            fontFamily={FONT} fontSize={30} fontWeight="bold">$153 TOTAL</text>
        </g>
      </svg>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shield1Scale = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 110 } });
  const shield2Scale = spring({ frame: frame - 50, fps, config: { damping: 12, stiffness: 110 } });
  const shield3Scale = spring({ frame: frame - 80, fps, config: { damping: 12, stiffness: 110 } });
  const savingsBadgeScale = spring({ frame: frame - 130, fps, config: { damping: 14, stiffness: 100 } });
  const ctaOpacity = interpolate(frame, [165, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const shields = [
    { cx: 200, scale: shield1Scale, label: '401k', color: '#1976D2' },
    { cx: 540, scale: shield2Scale, label: 'HSA', color: '#388E3C' },
    { cx: 880, scale: shield3Scale, label: 'FSA', color: '#7B1FA2' },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: '10%', left: 0, right: 0,
        textAlign: 'center', opacity: headerOpacity, padding: '0 60px',
      }}>
        <p style={{ ...headline(42, BLACK), marginBottom: 4 }}>THE FIX</p>
        <p style={headline(62, ACCENT)}>PRE-TAX ACCOUNTS</p>
        <p style={{ fontFamily: FONT, fontSize: 30, color: '#444', marginTop: 14 }}>
          Spend money before income taxes hit
        </p>
      </div>
      <svg viewBox="0 0 1080 1920" width={1080} height={1920}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
        {shields.map(({ cx, scale, label, color }) => (
          <g key={label} transform={`translate(${cx}, 960) scale(${scale})`} style={{ transformOrigin: '0 0' }}>
            {/* Shield shape */}
            <path
              d="M 0,-120 L 110,-68 L 110,40 Q 110,108 0,148 Q -110,108 -110,40 L -110,-68 Z"
              fill={color}
              opacity={0.15}
            />
            <path
              d="M 0,-120 L 110,-68 L 110,40 Q 110,108 0,148 Q -110,108 -110,40 L -110,-68 Z"
              fill="none"
              stroke={color}
              strokeWidth={7}
            />
            {/* Dollar sign inside */}
            <text x={0} y={34} textAnchor="middle" fill={color}
              fontFamily={FONT} fontSize={72} fontWeight="bold">$</text>
            {/* Label below */}
            <text x={0} y={196} textAnchor="middle" fill={BLACK}
              fontFamily={FONT} fontSize={36} fontWeight="bold">{label}</text>
          </g>
        ))}
        {/* Savings badge */}
        <g transform={`scale(${savingsBadgeScale})`} style={{ transformOrigin: '540px 1310px' }}>
          <rect x={245} y={1278} width={590} height={82} rx={14} fill={BLACK} />
          <text x={540} y={1331} textAnchor="middle" fill="white"
            fontFamily={FONT} fontSize={38} fontWeight="bold">SAVE UP TO $53/EACH $100</text>
        </g>
        {/* CTA button */}
        <g opacity={ctaOpacity}>
          <rect x={175} y={1490} width={730} height={94} rx={47} fill={ACCENT} />
          <text x={540} y={1547} textAnchor="middle" fill={BLACK}
            fontFamily={FONT} fontSize={40} fontWeight="bold">FOLLOW FOR MORE</text>
        </g>
      </svg>
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
