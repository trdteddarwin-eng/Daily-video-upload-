import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0A120F';
const BG_LIGHT = '#F0FFF4';
const ACCENT = '#10B981';
const ACCENT2 = '#065F46';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.12em',
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

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const figureScale = spring({ frame: frame - 20, fps, from: 0.6, to: 1, config: { damping: 14, stiffness: 120 } });
  const tagScale = spring({ frame: frame - 70, fps, from: 0.5, to: 1, config: { damping: 12, stiffness: 180 } });
  const glowOpacity = interpolate(frame, [30, 70, 180, 210], [0, 0.6, 0.6, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: 480, left: '50%', transform: 'translateX(-50%)', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}22 0%, transparent 70%)`, opacity: glowOpacity }} />

      {/* Title */}
      <div style={{ position: 'absolute', top: 110, left: 60, right: 60, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={headline(52, WHITE)}>OPEN ENROLLMENT</p>
        <p style={{ ...headline(52, WHITE), marginTop: 8 }}>IS HAPPENING</p>
        <p style={{ ...headline(52, ACCENT), marginTop: 8 }}>RIGHT NOW</p>
      </div>

      {/* Parent + child SVG */}
      <div style={{ position: 'absolute', top: 390, left: '50%', transform: `translateX(-50%) scale(${figureScale})`, transformOrigin: 'top center' }}>
        <svg width="380" height="380" viewBox="0 0 380 380">
          {/* Parent body */}
          <circle cx="130" cy="60" r="44" fill={WHITE} opacity={0.9} />
          <rect x="82" y="108" width="96" height="140" rx="22" fill={WHITE} opacity={0.9} />
          <rect x="58" y="114" width="30" height="96" rx="15" fill={WHITE} opacity={0.9} />
          <rect x="172" y="114" width="30" height="96" rx="15" fill={WHITE} opacity={0.9} />
          <rect x="88" y="244" width="38" height="110" rx="16" fill={WHITE} opacity={0.9} />
          <rect x="134" y="244" width="38" height="110" rx="16" fill={WHITE} opacity={0.9} />
          {/* Child body */}
          <circle cx="254" cy="118" r="32" fill={ACCENT} />
          <rect x="216" y="152" width="76" height="100" rx="18" fill={ACCENT} />
          <rect x="196" y="158" width="24" height="70" rx="12" fill={ACCENT} />
          <rect x="288" y="158" width="24" height="70" rx="12" fill={ACCENT} />
          <rect x="222" y="248" width="30" height="80" rx="13" fill={ACCENT} />
          <rect x="260" y="248" width="30" height="80" rx="13" fill={ACCENT} />
          {/* Holding hands */}
          <line x1="202" y1="175" x2="172" y2="175" stroke={WHITE} strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>

      {/* $5,000 tag */}
      <div style={{ position: 'absolute', bottom: 110, left: '50%', transform: `translateX(-50%) scale(${tagScale})`, transformOrigin: 'center' }}>
        <div style={{ background: ACCENT, borderRadius: 22, padding: '18px 54px', textAlign: 'center' }}>
          <p style={{ ...headline(70, BLACK), margin: 0 }}>$5,000</p>
          <p style={{ ...headline(26, BLACK), margin: '8px 0 0' }}>TAX-FREE BENEFIT</p>
        </div>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const folderScale = spring({ frame: frame - 10, fps, from: 0.6, to: 1, config: { damping: 14, stiffness: 120 } });
  const bill1Opacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill2Opacity = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill3Opacity = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Header */}
      <div style={{ position: 'absolute', top: 90, left: 60, right: 60, opacity: headerOpacity }}>
        <p style={headline(44, BLACK)}>IT'S CALLED A</p>
        <p style={{ ...headline(48, ACCENT), marginTop: 8 }}>DEPENDENT CARE FSA</p>
      </div>

      {/* Folder with money inside */}
      <div style={{ position: 'absolute', top: 310, left: '50%', transform: `translateX(-50%) scale(${folderScale})`, transformOrigin: 'top center' }}>
        <svg width="360" height="340" viewBox="0 0 360 340">
          {/* Folder tab */}
          <rect x="20" y="50" width="130" height="48" rx="12" fill={ACCENT} />
          {/* Folder body */}
          <rect x="20" y="80" width="320" height="250" rx="18" fill={ACCENT} />
          {/* Inner paper */}
          <rect x="44" y="104" width="272" height="210" rx="10" fill={WHITE} />
          {/* FSA label */}
          <text x="180" y="140" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="18" fill={BLACK} opacity={0.45}>DEPENDENT CARE FSA</text>
          {/* Bill 1 */}
          <rect x="62" y="162" width="236" height="50" rx="8" fill="#059669" opacity={bill1Opacity} />
          <text x="180" y="197" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="28" fontWeight="bold" fill={WHITE} opacity={bill1Opacity}>$1,667</text>
          {/* Bill 2 */}
          <rect x="62" y="186" width="236" height="50" rx="8" fill="#059669" opacity={bill2Opacity} />
          <text x="180" y="221" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="28" fontWeight="bold" fill={WHITE} opacity={bill2Opacity}>$1,667</text>
          {/* Bill 3 */}
          <rect x="62" y="210" width="236" height="50" rx="8" fill="#059669" opacity={bill3Opacity} />
          <text x="180" y="245" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="28" fontWeight="bold" fill={WHITE} opacity={bill3Opacity}>$1,666</text>
        </svg>
      </div>

      {/* Bottom label */}
      <div style={{ position: 'absolute', bottom: 90, left: 60, right: 60, opacity: labelOpacity }}>
        <p style={headline(38, BLACK)}>PRE-TAX MONEY</p>
        <p style={{ ...headline(38, ACCENT), marginTop: 8 }}>THE GOVERNMENT</p>
        <p style={{ ...headline(38, BLACK), marginTop: 8 }}>NEVER TAKES A CUT</p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const icon1Scale = spring({ frame: frame - 10, fps, from: 0, to: 1, config: { damping: 12, stiffness: 160 } });
  const icon2Scale = spring({ frame: frame - 50, fps, from: 0, to: 1, config: { damping: 12, stiffness: 160 } });
  const icon3Scale = spring({ frame: frame - 90, fps, from: 0, to: 1, config: { damping: 12, stiffness: 160 } });
  const tagOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Header */}
      <div style={{ position: 'absolute', top: 90, left: 60, right: 60, opacity: headerOpacity }}>
        <p style={headline(48, WHITE)}>COVERS WAY MORE</p>
        <p style={{ ...headline(48, ACCENT), marginTop: 8 }}>THAN DAYCARE</p>
      </div>

      {/* Daycare house icon */}
      <div style={{ position: 'absolute', top: 380, left: 60, transform: `scale(${icon1Scale})`, transformOrigin: 'top left' }}>
        <svg width="260" height="200" viewBox="0 0 260 200">
          <polygon points="130,10 240,90 220,90 220,190 40,190 40,90 20,90" fill={ACCENT} />
          <rect x="100" y="115" width="60" height="75" rx="10" fill={WHITE} />
          <rect x="52" y="102" width="44" height="40" rx="6" fill={WHITE} opacity={0.75} />
          <rect x="164" y="102" width="44" height="40" rx="6" fill={WHITE} opacity={0.75} />
        </svg>
        <div style={{ background: ACCENT, borderRadius: 10, padding: '8px 18px', textAlign: 'center' }}>
          <p style={{ ...headline(26, BLACK), margin: 0 }}>DAYCARE</p>
        </div>
      </div>

      {/* School building icon */}
      <div style={{ position: 'absolute', top: 560, left: '50%', transform: `translateX(-50%) scale(${icon2Scale})`, transformOrigin: 'top center' }}>
        <svg width="260" height="200" viewBox="0 0 260 200">
          <rect x="20" y="80" width="220" height="120" rx="8" fill={WHITE} />
          <polygon points="130,10 240,80 20,80" fill={WHITE} opacity={0.85} />
          <rect x="102" y="140" width="56" height="60" rx="6" fill={ACCENT} />
          <rect x="38" y="96" width="46" height="36" rx="5" fill={ACCENT} opacity={0.7} />
          <rect x="176" y="96" width="46" height="36" rx="5" fill={ACCENT} opacity={0.7} />
          <line x1="130" y1="10" x2="130" y2="38" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
          <rect x="130" y="10" width="30" height="22" fill={ACCENT} />
        </svg>
        <div style={{ background: ACCENT, borderRadius: 10, padding: '8px 18px', textAlign: 'center' }}>
          <p style={{ ...headline(26, BLACK), margin: 0 }}>AFTER-SCHOOL</p>
        </div>
      </div>

      {/* Sun / summer camp icon */}
      <div style={{ position: 'absolute', top: 380, right: 60, transform: `scale(${icon3Scale})`, transformOrigin: 'top right' }}>
        <svg width="260" height="200" viewBox="0 0 260 200">
          <circle cx="130" cy="100" r="58" fill={ACCENT} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            return <line key={idx} x1={130 + 65 * Math.cos(rad)} y1={100 + 65 * Math.sin(rad)} x2={130 + 85 * Math.cos(rad)} y2={100 + 85 * Math.sin(rad)} stroke={ACCENT} strokeWidth="8" strokeLinecap="round" />;
          })}
          <circle cx="130" cy="100" r="40" fill="#F59E0B" />
          <circle cx="118" cy="92" r="7" fill={WHITE} />
          <circle cx="142" cy="92" r="7" fill={WHITE} />
          <path d="M 112 112 Q 130 128 148 112" stroke={WHITE} strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
        <div style={{ background: ACCENT, borderRadius: 10, padding: '8px 18px', textAlign: 'center' }}>
          <p style={{ ...headline(26, BLACK), margin: 0 }}>SUMMER CAMP</p>
        </div>
      </div>

      {/* Bottom tag */}
      <div style={{ position: 'absolute', bottom: 80, left: 60, right: 60, opacity: tagOpacity }}>
        <p style={{ ...headline(32, WHITE), lineHeight: 1.3 }}>ANY CHILD UNDER 13</p>
        <p style={{ ...headline(32, WHITE), marginTop: 6 }}>WHILE YOU WORK</p>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1Scale = spring({ frame: frame - 30, fps, from: 0, to: 1, config: { damping: 18, stiffness: 80 } });
  const bar2Scale = spring({ frame: frame - 50, fps, from: 0, to: 1, config: { damping: 18, stiffness: 80 } });
  const bar3Scale = spring({ frame: frame - 70, fps, from: 0, to: 1, config: { damping: 18, stiffness: 80 } });
  const label1Opacity = interpolate(frame, [60, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label2Opacity = interpolate(frame, [80, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label3Opacity = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BAR_MAX = 340;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Header */}
      <div style={{ position: 'absolute', top: 90, left: 60, right: 60, opacity: headerOpacity }}>
        <p style={headline(44, BLACK)}>$5,000 SAVES YOU</p>
      </div>

      {/* Bar chart */}
      <div style={{ position: 'absolute', top: 320, left: 0, right: 0, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-end', paddingLeft: 40, paddingRight: 40 }}>
        {/* 22% bracket */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ opacity: label1Opacity }}>
            <p style={{ ...headline(44, ACCENT), margin: 0 }}>$1,100</p>
          </div>
          <div style={{ width: 160, height: Math.max(0, Math.floor(bar1Scale * BAR_MAX * 0.49)), background: `linear-gradient(to top, ${ACCENT}, #34D399)`, borderRadius: '12px 12px 0 0' }} />
          <div style={{ background: BLACK, borderRadius: 12, padding: '10px 20px', opacity: label1Opacity }}>
            <p style={{ ...headline(30, WHITE), margin: 0 }}>22%</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, opacity: 0.65, margin: '4px 0 0', textAlign: 'center' as const }}>bracket</p>
          </div>
        </div>

        {/* 24% bracket */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ opacity: label2Opacity }}>
            <p style={{ ...headline(44, ACCENT), margin: 0 }}>$1,600</p>
          </div>
          <div style={{ width: 160, height: Math.max(0, Math.floor(bar2Scale * BAR_MAX * 0.71)), background: `linear-gradient(to top, ${ACCENT}, #34D399)`, borderRadius: '12px 12px 0 0' }} />
          <div style={{ background: BLACK, borderRadius: 12, padding: '10px 20px', opacity: label2Opacity }}>
            <p style={{ ...headline(30, WHITE), margin: 0 }}>24%</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, opacity: 0.65, margin: '4px 0 0', textAlign: 'center' as const }}>bracket</p>
          </div>
        </div>

        {/* 32% bracket */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ opacity: label3Opacity }}>
            <p style={{ ...headline(44, ACCENT), margin: 0 }}>$2,250</p>
          </div>
          <div style={{ width: 160, height: Math.max(0, Math.floor(bar3Scale * BAR_MAX)), background: `linear-gradient(to top, ${ACCENT}, #34D399)`, borderRadius: '12px 12px 0 0' }} />
          <div style={{ background: BLACK, borderRadius: 12, padding: '10px 20px', opacity: label3Opacity }}>
            <p style={{ ...headline(30, WHITE), margin: 0 }}>32%</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, opacity: 0.65, margin: '4px 0 0', textAlign: 'center' as const }}>bracket</p>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div style={{ position: 'absolute', bottom: 80, left: 60, right: 60, opacity: label3Opacity }}>
        <p style={headline(32, BLACK)}>IN REAL TAX SAVINGS</p>
        <p style={{ ...headline(32, BLACK), marginTop: 6 }}>EVERY YEAR</p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calScale = spring({ frame: frame - 10, fps, from: 0.6, to: 1, config: { damping: 14, stiffness: 120 } });
  const statScale = spring({ frame: frame - 70, fps, from: 0.5, to: 1, config: { damping: 12, stiffness: 160 } });
  const deadlineOpacity = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const clockAngle = interpolate(frame, [30, 190], [0, 360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const clockRad = ((clockAngle - 90) * Math.PI) / 180;
  const clockHandX = 70 + 42 * Math.cos(clockRad);
  const clockHandY = 70 + 42 * Math.sin(clockRad);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Header */}
      <div style={{ position: 'absolute', top: 90, left: 60, right: 60, opacity: headerOpacity }}>
        <p style={headline(48, WHITE)}>WHY DO</p>
        <p style={{ ...headline(48, '#EF4444'), marginTop: 8 }}>60% SKIP IT?</p>
        <p style={{ ...headline(38, WHITE), marginTop: 10 }}>THEY DON'T KNOW IT EXISTS</p>
      </div>

      {/* Calendar */}
      <div style={{ position: 'absolute', top: 390, left: '50%', transform: `translateX(-50%) scale(${calScale})`, transformOrigin: 'top center' }}>
        <svg width="300" height="280" viewBox="0 0 300 280">
          <rect x="10" y="40" width="280" height="230" rx="16" fill={WHITE} />
          <rect x="10" y="40" width="280" height="60" rx="16" fill="#EF4444" />
          <rect x="10" y="76" width="280" height="24" fill="#EF4444" />
          <text x="150" y="80" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="26" fontWeight="bold" fill={WHITE}>DECEMBER</text>
          <circle cx="88" cy="40" r="10" fill="#999" />
          <circle cx="212" cy="40" r="10" fill="#999" />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 28, 29, 30].map((d, idx) => {
            const col = idx % 7;
            const row = Math.floor(idx / 7);
            return <text key={d} x={42 + col * 38} y={152 + row * 48} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fill={BLACK} opacity={0.45}>{d}</text>;
          })}
          <circle cx="254" cy="230" r="34" fill="#EF4444" />
          <text x="254" y="240" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="34" fontWeight="bold" fill={WHITE}>31</text>
          <line x1="234" y1="210" x2="274" y2="250" stroke={BLACK} strokeWidth="6" strokeLinecap="round" />
          <line x1="274" y1="210" x2="234" y2="250" stroke={BLACK} strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>

      {/* Animated clock */}
      <div style={{ position: 'absolute', top: 400, right: 70 }}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="60" fill="#1A1A1A" stroke="#EF4444" strokeWidth="6" />
          <line x1="70" y1="70" x2={clockHandX} y2={clockHandY} stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
          <circle cx="70" cy="70" r="6" fill="#EF4444" />
        </svg>
      </div>

      {/* 60% stat badge */}
      <div style={{ position: 'absolute', bottom: 170, left: '50%', transform: `translateX(-50%) scale(${statScale})`, transformOrigin: 'center' }}>
        <div style={{ background: '#EF4444', borderRadius: 18, padding: '14px 44px', textAlign: 'center' }}>
          <p style={{ ...headline(60, WHITE), margin: 0 }}>60% SKIP IT</p>
        </div>
      </div>

      {/* Deadline */}
      <div style={{ position: 'absolute', bottom: 70, left: 60, right: 60, opacity: deadlineOpacity }}>
        <p style={{ ...headline(38, '#EF4444') }}>DEADLINE: DEC 31</p>
        <p style={{ ...headline(30, WHITE), marginTop: 6 }}>MISS IT — WAIT A FULL YEAR</p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneScale = spring({ frame: frame - 15, fps, from: 0.6, to: 1, config: { damping: 14, stiffness: 120 } });
  const checkScale = spring({ frame: frame - 110, fps, from: 0.4, to: 1, config: { damping: 12, stiffness: 180 } });
  const ctaOpacity = interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tapRipple = interpolate(frame, [70, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Header */}
      <div style={{ position: 'absolute', top: 90, left: 60, right: 60, opacity: headerOpacity }}>
        <p style={headline(44, BLACK)}>GO TO YOUR</p>
        <p style={{ ...headline(48, ACCENT), marginTop: 8 }}>BENEFITS PORTAL</p>
        <p style={{ ...headline(44, BLACK), marginTop: 8 }}>RIGHT NOW</p>
      </div>

      {/* Smartphone */}
      <div style={{ position: 'absolute', top: 350, left: '50%', transform: `translateX(-50%) scale(${phoneScale})`, transformOrigin: 'top center' }}>
        <svg width="300" height="490" viewBox="0 0 300 490">
          <rect x="8" y="8" width="284" height="474" rx="38" fill={BLACK} />
          <rect x="20" y="20" width="260" height="450" rx="28" fill="#0F1F17" />
          <rect x="28" y="78" width="244" height="52" rx="8" fill={ACCENT} />
          <text x="150" y="112" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="20" fontWeight="bold" fill={BLACK}>MY BENEFITS</text>
          <rect x="28" y="145" width="244" height="44" rx="8" fill="#1A2F22" />
          <text x="150" y="172" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fill={WHITE} opacity={0.6}>Health Insurance</text>
          <rect x="28" y="200" width="244" height="44" rx="8" fill="#1A2F22" />
          <text x="150" y="227" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fill={WHITE} opacity={0.6}>401(k) / 403(b)</text>
          {/* Highlighted FSA row */}
          <rect x="28" y="255" width="244" height="58" rx="8" fill={ACCENT} />
          <text x="150" y="282" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="bold" fill={BLACK}>Dependent Care FSA</text>
          <text x="150" y="304" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="16" fontWeight="bold" fill={BLACK}>ENROLL NOW →</text>
          {/* Tap ripple */}
          <circle cx="150" cy="284" r={tapRipple * 65} fill={BLACK} opacity={(1 - tapRipple) * 0.25} />
          <rect x="28" y="325" width="244" height="44" rx="8" fill="#1A2F22" />
          <text x="150" y="352" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fill={WHITE} opacity={0.6}>Dental &amp; Vision</text>
          <rect x="108" y="16" width="84" height="20" rx="10" fill={BLACK} />
          <rect x="118" y="460" width="64" height="6" rx="3" fill="#2A2A2A" />
        </svg>
      </div>

      {/* Checkmark */}
      <div style={{ position: 'absolute', top: 490, right: 60, transform: `scale(${checkScale})`, transformOrigin: 'center' }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill={ACCENT} />
          <polyline points="22,52 42,72 78,30" stroke={BLACK} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      {/* CTA */}
      <div style={{ position: 'absolute', bottom: 80, left: 60, right: 60, opacity: ctaOpacity }}>
        <p style={headline(34, BLACK)}>5 MINUTES TODAY</p>
        <p style={{ ...headline(48, ACCENT), marginTop: 8 }}>= $2,000 BACK</p>
        <p style={{ ...headline(32, BLACK), marginTop: 8 }}>DON'T BE IN THE 60%</p>
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
