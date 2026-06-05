import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
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

  const calS = spring({ frame, fps, config: { damping: 18, stiffness: 70 }, from: 0, to: 1 });
  const coin1Y = interpolate(frame, [30, 55], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin1Op = interpolate(frame, [30, 48, 65, 80], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin2Y = interpolate(frame, [56, 80], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin2Op = interpolate(frame, [56, 74, 90, 105], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin3Y = interpolate(frame, [82, 106], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin3Op = interpolate(frame, [82, 100, 116, 131], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const chartH = interpolate(frame, [60, 140], [0, 110], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [42, 66], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [42, 66], [32, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [132, 152], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 70px' }}>
        <div style={{ position: 'relative', transform: `scale(${calS})` }}>
          <svg width="220" height="180" viewBox="0 0 220 180">
            <rect x="10" y="30" width="200" height="140" rx="10" fill="#1E1E1E" stroke={ACCENT} strokeWidth="2" />
            <rect x="10" y="30" width="200" height="38" rx="10" fill={ACCENT} />
            <rect x="10" y="56" width="200" height="12" fill={ACCENT} />
            <text x="110" y="52" textAnchor="middle" fontSize="15" fill={BLACK} fontFamily="Arial Black" fontWeight="bold">MONTHLY INVESTING</text>
            <line x1="10" y1="98" x2="210" y2="98" stroke="#2A2A2A" strokeWidth="1" />
            <line x1="10" y1="128" x2="210" y2="128" stroke="#2A2A2A" strokeWidth="1" />
            <line x1="10" y1="158" x2="210" y2="158" stroke="#2A2A2A" strokeWidth="1" />
            {['JAN','FEB','MAR','APR'].map((m, i) => (
              <text key={m} x={38 + i * 50} y={90} textAnchor="middle" fontSize="13" fill="#6B7280" fontFamily="Arial Black">{m}</text>
            ))}
            {['MAY','JUN','JUL','AUG'].map((m, i) => (
              <text key={m} x={38 + i * 50} y={120} textAnchor="middle" fontSize="13" fill="#6B7280" fontFamily="Arial Black">{m}</text>
            ))}
            <circle cx="110" cy="15" r="11" fill={ACCENT} />
            <path d="M95 30 Q95 19 110 19 Q125 19 125 30 Z" fill={ACCENT} />
          </svg>
          <div style={{ position: 'absolute', left: 88, top: 28 + coin1Y, opacity: coin1Op }}>
            <svg width="26" height="26" viewBox="0 0 26 26">
              <circle cx="13" cy="13" r="12" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
              <text x="13" y="18" textAnchor="middle" fontSize="13" fill="#92400E" fontFamily="Arial Black">$</text>
            </svg>
          </div>
          <div style={{ position: 'absolute', left: 108, top: 28 + coin2Y, opacity: coin2Op }}>
            <svg width="26" height="26" viewBox="0 0 26 26">
              <circle cx="13" cy="13" r="12" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
              <text x="13" y="18" textAnchor="middle" fontSize="13" fill="#92400E" fontFamily="Arial Black">$</text>
            </svg>
          </div>
          <div style={{ position: 'absolute', left: 68, top: 28 + coin3Y, opacity: coin3Op }}>
            <svg width="26" height="26" viewBox="0 0 26 26">
              <circle cx="13" cy="13" r="12" fill="#FCD34D" stroke="#D97706" strokeWidth="2" />
              <text x="13" y="18" textAnchor="middle" fontSize="13" fill="#92400E" fontFamily="Arial Black">$</text>
            </svg>
          </div>
          <div style={{ position: 'absolute', right: -65, bottom: 0 }}>
            <svg width="56" height="130" viewBox="0 0 56 130">
              <rect x="16" y={Math.max(0, 130 - chartH)} width="24" height={Math.max(0, chartH)} rx="4" fill={ACCENT} />
              {chartH > 90 ? <polygon points="0,16 28,0 56,16" fill={ACCENT} /> : null}
            </svg>
          </div>
        </div>

        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(50, WHITE)}>THE</p>
          <p style={{ ...headline(72, ACCENT), lineHeight: 1 }}>$23,000</p>
          <p style={headline(50, WHITE)}>MISTAKE</p>
        </div>

        <p style={{ ...headline(19, '#9CA3AF'), opacity: titleOp }}>DOLLAR COST AVERAGING TRAP</p>

        <div style={{ opacity: tagOp, background: ACCENT, borderRadius: 12, padding: '12px 28px' }}>
          <p style={headline(19, BLACK)}>100 YEARS OF DATA SAYS SO</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const globe1S = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 120 }, from: 0, to: 1 });
  const globe2S = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 12, stiffness: 120 }, from: 0, to: 1 });
  const globe3S = spring({ frame: Math.max(0, frame - 46), fps, config: { damping: 12, stiffness: 120 }, from: 0, to: 1 });
  const statS = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 10, stiffness: 90 }, from: 0, to: 1 });
  const bar1W = interpolate(frame, [110, 170], [0, 68], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2W = interpolate(frame, [120, 180], [0, 32], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [160, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const globeScales = [globe1S, globe2S, globe3S];
  const globeLabels = ['🇺🇸 US', '🇬🇧 UK', '🇦🇺 AUS'];
  const globeColors = [ACCENT, '#059669', '#34D399'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 70px' }}>
        <p style={{ ...headline(40, BLACK), transform: `scale(${titleS})` }}>VANGUARD STUDIED</p>
        <p style={{ ...headline(20, '#6B7280'), transform: `scale(${titleS})` }}>EVERY 12-MONTH WINDOW SINCE 1926</p>

        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 4 }}>
          {globeLabels.map((label, i) => (
            <div key={i} style={{ transform: `scale(${globeScales[i]})`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <svg width="72" height="72" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="33" fill={globeColors[i]} opacity={0.15} stroke={globeColors[i]} strokeWidth="3" />
                <ellipse cx="36" cy="36" rx="14" ry="33" fill="none" stroke={globeColors[i]} strokeWidth="2" />
                <line x1="3" y1="36" x2="69" y2="36" stroke={globeColors[i]} strokeWidth="2" />
                <line x1="9" y1="20" x2="63" y2="20" stroke={globeColors[i]} strokeWidth="1.5" opacity={0.5} />
                <line x1="9" y1="52" x2="63" y2="52" stroke={globeColors[i]} strokeWidth="1.5" opacity={0.5} />
              </svg>
              <p style={{ fontFamily: FONT, fontSize: 15, color: BLACK, margin: 0, letterSpacing: '0.05em' }}>{label}</p>
            </div>
          ))}
        </div>

        <div style={{ transform: `scale(${statS})`, textAlign: 'center', background: ACCENT, borderRadius: 16, padding: '16px 44px' }}>
          <p style={headline(22, BLACK)}>LUMP SUM WINS</p>
          <p style={{ ...headline(96, BLACK), lineHeight: 1 }}>68%</p>
          <p style={headline(20, BLACK)}>OF THE TIME</p>
        </div>

        <div style={{ opacity: labelOp, width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <p style={{ ...headline(16, BLACK), width: 110, textAlign: 'right' }}>LUMP SUM</p>
            <div style={{ flex: 1, height: 28, background: '#E5E7EB', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ width: `${Math.max(0, bar1W)}%`, height: '100%', background: ACCENT, borderRadius: 6 }} />
            </div>
            <p style={{ ...headline(16, ACCENT), width: 44 }}>68%</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <p style={{ ...headline(16, BLACK), width: 110, textAlign: 'right' }}>DCA</p>
            <div style={{ flex: 1, height: 28, background: '#E5E7EB', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ width: `${Math.max(0, bar2W)}%`, height: '100%', background: '#9CA3AF', borderRadius: 6 }} />
            </div>
            <p style={{ ...headline(16, '#9CA3AF'), width: 44 }}>32%</p>
          </div>
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
  const lumpH = interpolate(frame, [24, 100], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dcaH = interpolate(frame, [38, 114], [0, 140], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const diffOp = interpolate(frame, [120, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinS = spring({ frame: Math.max(0, frame - 125), fps, config: { damping: 10, stiffness: 180 }, from: 0, to: 1 });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 70px' }}>
        <p style={{ ...headline(44, WHITE), transform: `scale(${titleS})` }}>THE MATH</p>
        <p style={{ ...headline(19, '#9CA3AF'), opacity: subOp }}>ON A $50,000 INVESTMENT</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 52, marginTop: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={headline(20, ACCENT)}>LUMP SUM</p>
            <div style={{ width: 110, height: Math.max(0, lumpH), background: ACCENT, borderRadius: '10px 10px 0 0', position: 'relative' }}>
              {lumpH > 60 ? (
                <div style={{ position: 'absolute', top: 8, left: 0, right: 0, textAlign: 'center' }}>
                  <p style={headline(18, BLACK)}>$53,400</p>
                </div>
              ) : null}
            </div>
            <div style={{ width: 110, height: 4, background: ACCENT, borderRadius: 2 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={headline(20, '#9CA3AF')}>DCA</p>
            <div style={{ width: 110, height: Math.max(0, dcaH), background: '#4B5563', borderRadius: '10px 10px 0 0', position: 'relative' }}>
              {dcaH > 50 ? (
                <div style={{ position: 'absolute', top: 8, left: 0, right: 0, textAlign: 'center' }}>
                  <p style={headline(18, WHITE)}>$50,000</p>
                </div>
              ) : null}
            </div>
            <div style={{ width: 110, height: 4, background: '#4B5563', borderRadius: 2 }} />
          </div>
        </div>

        <div style={{ opacity: diffOp, textAlign: 'center' }}>
          <p style={headline(22, '#9CA3AF')}>AVERAGE DIFFERENCE</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 6 }}>
            <div style={{ transform: `scale(${coinS})` }}>
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="24" fill="#FCD34D" stroke="#D97706" strokeWidth="3" />
                <text x="26" y="33" textAnchor="middle" fontSize="26" fill="#92400E" fontFamily="Arial Black" fontWeight="bold">$</text>
              </svg>
            </div>
            <p style={{ ...headline(76, ACCENT), lineHeight: 1 }}>+$3,400</p>
          </div>
          <p style={headline(20, WHITE)}>MORE WITH LUMP SUM</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const subOp = interpolate(frame, [14, 36], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const fearOp = interpolate(frame, [148, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dayCount = Math.max(0, Math.floor(20));
  const upDays = [0,1,2,3,5,6,7,8,9,10,11,12,14,15,17];
  const days = Array.from({ length: dayCount }, (_, i) => i);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 70px' }}>
        <p style={{ ...headline(42, BLACK), transform: `scale(${titleS})` }}>MARKETS GO UP</p>
        <p style={{ ...headline(72, ACCENT), transform: `scale(${titleS})`, lineHeight: 1 }}>75%</p>
        <p style={{ ...headline(22, '#6B7280'), opacity: subOp }}>OF ALL TRADING DAYS</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', width: '100%', marginTop: 4 }}>
          {days.map((i) => {
            const isUp = upDays.includes(i);
            const cellOp = interpolate(frame, [28 + i * 5, 46 + i * 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const cellColor = isUp ? ACCENT : '#EF4444';
            const cellBg = isUp ? '#D1FAE5' : '#FEE2E2';
            return (
              <div key={i} style={{ opacity: cellOp, width: 56, height: 56, background: cellBg, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${cellColor}` }}>
                <svg width="28" height="28" viewBox="0 0 28 28">
                  {isUp ? (
                    <>
                      <polygon points="14,4 24,20 4,20" fill={cellColor} />
                    </>
                  ) : (
                    <>
                      <polygon points="14,24 24,8 4,8" fill={cellColor} />
                    </>
                  )}
                </svg>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: fearOp, background: '#EF4444', borderRadius: 14, padding: '14px 32px', textAlign: 'center' }}>
          <p style={headline(20, WHITE)}>EVERY MONTH YOU WAIT =</p>
          <p style={{ ...headline(44, WHITE), lineHeight: 1 }}>MISSED GAIN</p>
          <p style={headline(20, WHITE)}>FEAR HAS A $23,000 PRICE TAG</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const piggyS = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 18, stiffness: 80 }, from: 0, to: 1 });
  const xOp = interpolate(frame, [60, 84], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [42, 66], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const chartS = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });
  const chartLineW = interpolate(frame, [88, 160], [0, 200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerOp = interpolate(frame, [158, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: '0 70px' }}>
        <p style={{ ...headline(40, WHITE), transform: `scale(${titleS})` }}>THE REAL TRAP</p>

        <div style={{ display: 'flex', gap: 40, alignItems: 'center', width: '100%', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, position: 'relative' }}>
            <div style={{ transform: `scale(${piggyS})`, position: 'relative' }}>
              <svg width="130" height="130" viewBox="0 0 130 130">
                <ellipse cx="60" cy="80" rx="50" ry="42" fill="#4B5563" />
                <circle cx="105" cy="62" r="24" fill="#4B5563" />
                <ellipse cx="116" cy="72" rx="10" ry="7" fill="#374151" />
                <circle cx="112" cy="71" r="2.5" fill="#1F2937" />
                <circle cx="120" cy="71" r="2.5" fill="#1F2937" />
                <circle cx="103" cy="56" r="3" fill="#9CA3AF" />
                <rect x="48" y="32" width="22" height="5" rx="2.5" fill="#374151" />
                <rect x="28" y="114" width="14" height="20" rx="7" fill="#374151" />
                <rect x="48" y="114" width="14" height="20" rx="7" fill="#374151" />
                <rect x="68" y="114" width="14" height="20" rx="7" fill="#374151" />
                <rect x="88" y="114" width="14" height="20" rx="7" fill="#374151" />
                <text x="55" y="76" textAnchor="middle" fontSize="12" fill="#9CA3AF" fontFamily="Arial Black">WAITING</text>
                <text x="55" y="90" textAnchor="middle" fontSize="12" fill="#9CA3AF" fontFamily="Arial Black">FOR DIP</text>
              </svg>
              <div style={{ position: 'absolute', inset: 0, opacity: xOp }}>
                <svg width="130" height="130" viewBox="0 0 130 130">
                  <line x1="20" y1="20" x2="110" y2="110" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
                  <line x1="110" y1="20" x2="20" y2="110" stroke="#EF4444" strokeWidth="10" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <p style={{ ...headline(15, '#EF4444'), opacity: xOp }}>CASH SITTING IDLE</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ transform: `scale(${chartS})` }}>
              <svg width="150" height="130" viewBox="0 0 150 130">
                <line x1="10" y1="120" x2="10" y2="10" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
                <line x1="10" y1="120" x2={Math.max(10, chartLineW)} y2="120" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
                <path d={`M10,110 C40,100 60,80 80,60 S110,30 ${Math.max(10, Math.min(chartLineW, 145))},20`} fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
                {chartLineW > 130 ? <polygon points="145,10 135,22 155,22" fill={ACCENT} /> : null}
              </svg>
            </div>
            <p style={{ ...headline(15, ACCENT), opacity: labelOp }}>INVESTED NOW</p>
          </div>
        </div>

        <div style={{ opacity: bannerOp, background: ACCENT, borderRadius: 14, padding: '14px 28px', textAlign: 'center' }}>
          <p style={headline(20, BLACK)}>IF YOU DON'T HAVE A LUMP SUM —</p>
          <p style={headline(22, BLACK)}>PAYCHECK INVESTING IS GREAT</p>
          <p style={{ ...headline(18, BLACK), marginTop: 6 }}>THE TRAP IS HOARDING CASH OUT OF FEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personS = spring({ frame, fps, config: { damping: 18, stiffness: 70 }, from: 0, to: 1 });
  const chartLineW = interpolate(frame, [20, 120], [0, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personX = interpolate(frame, [30, 110], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const title1Op = interpolate(frame, [14, 38], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const title2Op = interpolate(frame, [38, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1Op = interpolate(frame, [80, 104], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card2Op = interpolate(frame, [104, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [158, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 70px' }}>
        <p style={{ ...headline(42, BLACK), opacity: title1Op }}>STOP WAITING.</p>
        <p style={{ ...headline(42, ACCENT), opacity: title2Op }}>START INVESTING.</p>

        <div style={{ transform: `scale(${personS})`, position: 'relative', width: '100%', height: 180 }}>
          <svg width="100%" height="180" viewBox="0 0 540 180">
            <line x1="30" y1="170" x2="30" y2="10" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
            <line x1="30" y1="170" x2="520" y2="170" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
            <path
              d={`M30,160 C80,150 120,130 160,100 S220,60 270,40 S340,20 ${Math.max(30, Math.min(chartLineW + 30, 510))},15`}
              fill="none"
              stroke={ACCENT}
              strokeWidth="5"
              strokeLinecap="round"
            />
            {chartLineW > 240 ? <polygon points="510,5 498,18 522,18" fill={ACCENT} /> : null}
            <g transform={`translate(${Math.max(0, 480 - personX)}, 70)`}>
              <circle cx="20" cy="12" r="11" fill="#374151" />
              <path d="M4 40 Q4 23 20 23 Q36 23 36 40 Z" fill="#374151" />
              <rect x="36" y="34" width="28" height="8" rx="4" fill="#FCD34D" />
              <circle cx="52" cy="38" r="6" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" />
              <text x="52" y="42" textAnchor="middle" fontSize="9" fill="#92400E" fontFamily="Arial Black">$</text>
            </g>
          </svg>
        </div>

        <div style={{ opacity: card1Op, background: ACCENT, borderRadius: 14, padding: '14px 28px', textAlign: 'center', width: '100%' }}>
          <p style={headline(21, BLACK)}>TIME IN THE MARKET</p>
          <p style={headline(21, BLACK)}>BEATS TIMING THE MARKET</p>
        </div>

        <div style={{ opacity: card2Op, background: '#F0FDF4', border: `2px solid ${ACCENT}`, borderRadius: 14, padding: '12px 24px', width: '100%', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 17, color: '#065F46', letterSpacing: '0.04em', margin: 0 }}>
            Cash sitting in savings? That's the most expensive hesitation of your life.
          </p>
        </div>

        <div style={{ opacity: ctaOp, background: BLACK, borderRadius: 14, padding: '14px 36px' }}>
          <p style={headline(22, ACCENT)}>FOLLOW FOR MORE MONEY TRAPS</p>
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
