import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

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
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardScale = spring({ fps, frame, config: { damping: 12, stiffness: 80 }, durationInFrames: 30 });
  const warnScale = spring({ fps, frame: Math.max(0, frame - 30), config: { damping: 10, stiffness: 100 }, durationInFrames: 25 });
  const dollarY = interpolate(frame, [50, 80], [-80, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const dollarOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pulse = interpolate(frame % 45, [0, 22, 44], [0.7, 1.0, 0.7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute',
        top: 120,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
      }}>
        <p style={{ ...headline(52, WHITE), lineHeight: 1.2, padding: '0 60px' }}>THE HIDDEN</p>
        <p style={{ ...headline(52, ACCENT), lineHeight: 1.2, padding: '0 60px' }}>MEDICARE TRAP</p>
      </div>

      {/* Medicare card */}
      <div style={{
        position: 'absolute',
        top: 310,
        left: '50%',
        transform: `translateX(-50%) scale(${cardScale})`,
      }}>
        <svg width="460" height="290" viewBox="0 0 460 290">
          <rect x="0" y="0" width="460" height="290" rx="20" fill="#1565C0" />
          <rect x="0" y="0" width="460" height="110" rx="20" fill="rgba(255,255,255,0.08)" />
          <rect x="0" y="68" width="460" height="44" fill="rgba(0,0,0,0.22)" />
          <text x="28" y="52" fontFamily="Arial Black, Arial" fontSize="30" fill="white" fontWeight="bold">MEDICARE</text>
          <rect x="398" y="18" width="38" height="11" rx="4" fill="white" opacity="0.9" />
          <rect x="412" y="8" width="11" height="31" rx="4" fill="white" opacity="0.9" />
          <text x="28" y="165" fontFamily="Arial, sans-serif" fontSize="21" fill="white" opacity="0.8">NAME: JOHN AMERICAN</text>
          <text x="28" y="198" fontFamily="Arial, sans-serif" fontSize="21" fill="white" opacity="0.8">MEDICARE #: 1EG4-TE5-MK72</text>
          <text x="28" y="254" fontFamily="Arial, sans-serif" fontSize="19" fill="white" opacity="0.6">PART A  06-2025</text>
          <text x="218" y="254" fontFamily="Arial, sans-serif" fontSize="19" fill="white" opacity="0.6">PART B  06-2025</text>
        </svg>
      </div>

      {/* Warning badge */}
      <div style={{
        position: 'absolute',
        top: 480,
        left: '50%',
        transform: `translateX(70px) scale(${warnScale})`,
        opacity: pulse,
      }}>
        <svg width="110" height="110" viewBox="0 0 110 110">
          <polygon points="55,6 106,100 4,100" fill={ACCENT} />
          <text x="55" y="82" textAnchor="middle" fontFamily="Arial Black" fontSize="50" fill="white">!</text>
        </svg>
      </div>

      {/* Dollar amount */}
      <div style={{
        position: 'absolute',
        top: 670,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: dollarOpacity,
        transform: `translateY(${dollarY}px)`,
      }}>
        <p style={{ ...headline(100, ACCENT), lineHeight: 1 }}>$3,400</p>
        <p style={{ ...headline(32, WHITE), letterSpacing: '0.1em', marginTop: 8 }}>MORE PER YEAR</p>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 155,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
      }}>
        <p style={{ fontFamily: FONT, fontSize: 33, color: WHITE, opacity: 0.7, textAlign: 'center', padding: '0 60px', margin: 0 }}>
          Most people never see it coming.
        </p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barHeight = interpolate(frame, [10, 65], [0, 290], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const barColor = frame < 62 ? '#3B82F6' : ACCENT;
  const warningOpacity = interpolate(frame, [62, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const threshLineOpacity = interpolate(frame, [5, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOpacity = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  void fps;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute',
        top: 95,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: labelOpacity,
      }}>
        <p style={{ ...headline(46, BLACK), lineHeight: 1.2, padding: '0 60px' }}>EARN OVER</p>
        <p style={{ ...headline(82, ACCENT), lineHeight: 1.1 }}>$103,000</p>
        <p style={{ ...headline(46, BLACK), lineHeight: 1.2, padding: '0 60px' }}>AS A RETIREE</p>
      </div>

      {/* Bar chart */}
      <div style={{ position: 'absolute', top: 410, left: '50%', transform: 'translateX(-50%)' }}>
        <svg width="320" height="380" viewBox="0 0 320 380">
          {/* Axes */}
          <line x1="70" y1="330" x2="290" y2="330" stroke={BLACK} strokeWidth="3" />
          <line x1="70" y1="30" x2="70" y2="330" stroke={BLACK} strokeWidth="3" />
          {/* Threshold line */}
          <g opacity={threshLineOpacity}>
            <line x1="65" y1="160" x2="290" y2="160" stroke={ACCENT} strokeWidth="3" strokeDasharray="10,6" />
            <text x="72" y="150" fontFamily="Arial Black, Arial" fontSize="18" fill={ACCENT}>$103K THRESHOLD</text>
          </g>
          {/* Income bar */}
          <rect x="130" y={330 - barHeight} width="100" height={barHeight} fill={barColor} rx="6" />
          <text x="180" y="352" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="19" fill={BLACK}>INCOME</text>
          {/* Warning icon above bar */}
          <text
            x="180"
            y={Math.max(10, 330 - barHeight - 18)}
            textAnchor="middle"
            fontFamily="Arial Black"
            fontSize="32"
            fill={ACCENT}
            opacity={warningOpacity}
          >⚠</text>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 115,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity: bottomOpacity,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, textAlign: 'center', padding: '0 60px', margin: 0 }}>
          The penalty kicks in immediately.
        </p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const icon1Scale = spring({ fps, frame: Math.max(0, frame - 18), config: { damping: 12, stiffness: 90 }, durationInFrames: 25 });
  const icon2Scale = spring({ fps, frame: Math.max(0, frame - 52), config: { damping: 12, stiffness: 90 }, durationInFrames: 25 });
  const icon3Scale = spring({ fps, frame: Math.max(0, frame - 86), config: { damping: 12, stiffness: 90 }, durationInFrames: 25 });
  const warnOpacity = interpolate(frame, [105, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const iconStyle = (scale: number, dx: number): React.CSSProperties => ({
    position: 'absolute' as const,
    top: 345,
    left: '50%',
    transform: `translateX(${dx}px) scale(${scale})`,
    transformOrigin: 'center top',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    width: 180,
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute',
        top: 105,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: titleOpacity,
      }}>
        <p style={{ ...headline(44, WHITE), lineHeight: 1.2, padding: '0 60px' }}>YOU TRIGGER IT</p>
        <p style={{ ...headline(44, ACCENT), lineHeight: 1.2, padding: '0 60px' }}>BY ACCIDENT</p>
      </div>

      {/* House icon */}
      <div style={iconStyle(icon1Scale, -280)}>
        <svg width="140" height="150" viewBox="0 0 140 150">
          <polygon points="70,12 128,64 12,64" fill={ACCENT} />
          <rect x="22" y="59" width="96" height="75" rx="6" fill="#1a1a2e" stroke={ACCENT} strokeWidth="3" />
          <rect x="52" y="88" width="36" height="46" rx="4" fill={ACCENT} opacity="0.7" />
          <circle cx="108" cy="30" r="22" fill="#F59E0B" />
          <text x="108" y="39" textAnchor="middle" fontFamily="Arial Black" fontSize="24" fill="white">$</text>
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, textAlign: 'center', margin: '10px 0 0', letterSpacing: '0.08em' }}>
          SELLING{'\n'}YOUR HOME
        </p>
      </div>

      {/* IRA / RMD icon */}
      <div style={iconStyle(icon2Scale, -90)}>
        <svg width="140" height="150" viewBox="0 0 140 150">
          <ellipse cx="68" cy="95" rx="54" ry="48" fill="#1a1a2e" stroke={ACCENT} strokeWidth="3" />
          <rect x="48" y="38" width="40" height="13" rx="4" fill={ACCENT} />
          <text x="68" y="108" textAnchor="middle" fontFamily="Arial Black" fontSize="26" fill={ACCENT}>IRA</text>
          <line x1="108" y1="90" x2="133" y2="62" stroke={ACCENT} strokeWidth="4" />
          <polygon points="133,62 117,67 126,79" fill={ACCENT} />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, textAlign: 'center', margin: '10px 0 0', letterSpacing: '0.08em' }}>
          REQUIRED{'\n'}WITHDRAWALS
        </p>
      </div>

      {/* Roth conversion icon */}
      <div style={iconStyle(icon3Scale, 120)}>
        <svg width="140" height="150" viewBox="0 0 140 150">
          <rect x="4" y="58" width="48" height="48" rx="8" fill="#1a1a2e" stroke="#555" strokeWidth="2" />
          <text x="28" y="90" textAnchor="middle" fontFamily="Arial Black" fontSize="18" fill="#888">IRA</text>
          <line x1="56" y1="82" x2="82" y2="82" stroke={ACCENT} strokeWidth="4" />
          <polygon points="82,82 70,73 70,91" fill={ACCENT} />
          <rect x="86" y="58" width="50" height="48" rx="8" fill={ACCENT} />
          <text x="111" y="90" textAnchor="middle" fontFamily="Arial Black" fontSize="17" fill="white">ROTH</text>
          <polygon points="118,8 138,44 98,44" fill="#F59E0B" />
          <text x="118" y="38" textAnchor="middle" fontFamily="Arial Black" fontSize="22" fill="white">!</text>
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, textAlign: 'center', margin: '10px 0 0', letterSpacing: '0.08em' }}>
          ROTH{'\n'}CONVERSION
        </p>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 125,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity: warnOpacity,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 34, color: ACCENT, textAlign: 'center', padding: '0 60px', margin: 0, letterSpacing: '0.04em' }}>
          Any one can push you over the line.
        </p>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barBWidth = interpolate(frame, [20, 72], [0, 540], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const barDWidth = interpolate(frame, [82, 134], [0, 310], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const totalOpacity = interpolate(frame, [145, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalScale = spring({ fps, frame: Math.max(0, frame - 145), config: { damping: 10, stiffness: 100 }, durationInFrames: 20 });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute',
        top: 95,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: titleOpacity,
      }}>
        <p style={{ ...headline(46, BLACK), lineHeight: 1.2, padding: '0 60px' }}>IT HITS YOU</p>
        <p style={{ ...headline(46, ACCENT), lineHeight: 1.2, padding: '0 60px' }}>TWO PLACES AT ONCE</p>
      </div>

      {/* Part B bar */}
      <div style={{ position: 'absolute', top: 370, left: 70, right: 70 }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, letterSpacing: '0.08em', margin: '0 0 10px' }}>MEDICARE PART B</p>
        <div style={{ background: '#ddd', height: 62, borderRadius: 8, overflow: 'hidden' }}>
          <div style={{
            width: barBWidth,
            height: '100%',
            background: ACCENT,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 14,
            boxSizing: 'border-box',
          }}>
            {barBWidth > 80 && (
              <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE }}>$2,800/yr</span>
            )}
          </div>
        </div>
      </div>

      {/* Part D bar */}
      <div style={{ position: 'absolute', top: 520, left: 70, right: 70 }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, letterSpacing: '0.08em', margin: '0 0 10px' }}>MEDICARE PART D</p>
        <div style={{ background: '#ddd', height: 62, borderRadius: 8, overflow: 'hidden' }}>
          <div style={{
            width: barDWidth,
            height: '100%',
            background: '#B91C1C',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 14,
            boxSizing: 'border-box',
          }}>
            {barDWidth > 80 && (
              <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE }}>$612/yr</span>
            )}
          </div>
        </div>
      </div>

      {/* Total box */}
      <div style={{
        position: 'absolute',
        bottom: 110,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity: totalOpacity,
        transform: `scale(${totalScale})`,
      }}>
        <div style={{
          background: ACCENT,
          borderRadius: 18,
          padding: '22px 56px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <p style={{ ...headline(34, WHITE), margin: 0, letterSpacing: '0.08em' }}>TOTAL EXTRA COST</p>
          <p style={{ ...headline(80, WHITE), margin: 0 }}>$3,412/yr</p>
        </div>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cal1Scale = spring({ fps, frame: Math.max(0, frame - 15), config: { damping: 12, stiffness: 80 }, durationInFrames: 25 });
  const arrowWidth = interpolate(frame, [52, 82], [0, 160], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const cal2Scale = spring({ fps, frame: Math.max(0, frame - 88), config: { damping: 12, stiffness: 80 }, durationInFrames: 25 });
  const lateOpacity = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute',
        top: 95,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: titleOpacity,
      }}>
        <p style={{ ...headline(42, WHITE), lineHeight: 1.2, padding: '0 60px' }}>THE IRS USES YOUR</p>
        <p style={{ ...headline(42, ACCENT), lineHeight: 1.2, padding: '0 60px' }}>INCOME FROM 2 YEARS AGO</p>
      </div>

      {/* Timeline */}
      <div style={{
        position: 'absolute',
        top: 410,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* 2024 calendar */}
        <div style={{ transform: `scale(${cal1Scale})`, transformOrigin: 'center center' }}>
          <svg width="220" height="220" viewBox="0 0 220 220">
            <rect x="5" y="5" width="210" height="210" rx="14" fill="#0f2040" stroke="#3B82F6" strokeWidth="3" />
            <rect x="5" y="5" width="210" height="56" rx="14" fill="#3B82F6" />
            <rect x="5" y="42" width="210" height="20" fill="#3B82F6" />
            <text x="110" y="42" textAnchor="middle" fontFamily="Arial Black" fontSize="28" fill="white">2024</text>
            <text x="110" y="82" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="19" fill="#aaa">INCOME YEAR</text>
            <text x="110" y="130" textAnchor="middle" fontFamily="Arial Black" fontSize="40" fill="#3B82F6">$</text>
            <text x="110" y="170" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fill="#999">Roth conversion</text>
            <text x="110" y="194" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fill="#999">bumps income</text>
          </svg>
        </div>

        {/* Arrow */}
        <div style={{ overflow: 'hidden', width: arrowWidth, height: 44, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <svg width="160" height="44" viewBox="0 0 160 44">
            <line x1="0" y1="22" x2="140" y2="22" stroke={ACCENT} strokeWidth="4" />
            <polygon points="140,22 122,10 122,34" fill={ACCENT} />
            <text x="68" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fill={ACCENT}>2 YEARS</text>
          </svg>
        </div>

        {/* 2026 calendar */}
        <div style={{ transform: `scale(${cal2Scale})`, transformOrigin: 'center center' }}>
          <svg width="220" height="220" viewBox="0 0 220 220">
            <rect x="5" y="5" width="210" height="210" rx="14" fill="#2a0808" stroke={ACCENT} strokeWidth="3" />
            <rect x="5" y="5" width="210" height="56" rx="14" fill={ACCENT} />
            <rect x="5" y="42" width="210" height="20" fill={ACCENT} />
            <text x="110" y="42" textAnchor="middle" fontFamily="Arial Black" fontSize="28" fill="white">2026</text>
            <text x="110" y="82" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="19" fill="#aaa">MEDICARE YEAR</text>
            <text x="110" y="130" textAnchor="middle" fontFamily="Arial Black" fontSize="40" fill={ACCENT}>!</text>
            <text x="110" y="170" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fill="#999">$3,400 surcharge</text>
            <text x="110" y="194" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fill="#999">hits you NOW</text>
          </svg>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 130,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity: lateOpacity,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 36, color: ACCENT, textAlign: 'center', padding: '0 60px', margin: 0 }}>
          By then, it's too late to undo it.
        </p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personScale = spring({ fps, frame: Math.max(0, frame - 18), config: { damping: 10, stiffness: 80 }, durationInFrames: 25 });
  const calcScale = spring({ fps, frame: Math.max(0, frame - 52), config: { damping: 10, stiffness: 80 }, durationInFrames: 25 });
  const piggyScale = spring({ fps, frame: Math.max(0, frame - 86), config: { damping: 10, stiffness: 80 }, durationInFrames: 25 });
  const ctaOpacity = interpolate(frame, [110, 138], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ fps, frame: Math.max(0, frame - 110), config: { damping: 12, stiffness: 100 }, durationInFrames: 20 });
  const pulse = interpolate(frame % 30, [0, 15, 29], [1, 1.03, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const iconWrap = (scale: number, dx: number): React.CSSProperties => ({
    position: 'absolute' as const,
    top: 330,
    left: '50%',
    transform: `translateX(${dx}px) scale(${scale})`,
    transformOrigin: 'center top',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    width: 180,
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute',
        top: 95,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: titleOpacity,
      }}>
        <p style={{ ...headline(44, WHITE), lineHeight: 1.2, padding: '0 60px' }}>THE FIX:</p>
        <p style={{ ...headline(44, ACCENT), lineHeight: 1.2, padding: '0 60px' }}>PLAN YOUR INCOME FIRST</p>
      </div>

      {/* CPA person */}
      <div style={iconWrap(personScale, -282)}>
        <svg width="130" height="165" viewBox="0 0 130 165">
          <circle cx="65" cy="38" r="30" fill="#F59E0B" />
          <rect x="28" y="76" width="74" height="76" rx="10" fill="#1565C0" />
          <rect x="4" y="76" width="28" height="14" rx="7" fill="#1565C0" />
          <rect x="98" y="76" width="28" height="14" rx="7" fill="#1565C0" />
          <rect x="34" y="96" width="42" height="28" rx="5" fill="#F59E0B" />
          <rect x="46" y="91" width="18" height="10" rx="4" fill="#F59E0B" />
          <polygon points="65,76 59,98 65,114 71,98" fill={ACCENT} />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, textAlign: 'center', margin: '10px 0 0', letterSpacing: '0.1em' }}>CPA</p>
      </div>

      {/* Calculator */}
      <div style={iconWrap(calcScale, -90)}>
        <svg width="130" height="165" viewBox="0 0 130 165">
          <rect x="14" y="8" width="102" height="154" rx="14" fill="#1a1a2e" stroke={ACCENT} strokeWidth="3" />
          <rect x="24" y="20" width="82" height="40" rx="6" fill="#0f3460" />
          <text x="100" y="50" textAnchor="end" fontFamily="Arial, sans-serif" fontSize="24" fill="#10B981">103K</text>
          <rect x="26" y="76" width="20" height="18" rx="4" fill="#2a2a3a" />
          <rect x="55" y="76" width="20" height="18" rx="4" fill="#2a2a3a" />
          <rect x="84" y="76" width="20" height="18" rx="4" fill={ACCENT} />
          <rect x="26" y="103" width="20" height="18" rx="4" fill="#2a2a3a" />
          <rect x="55" y="103" width="20" height="18" rx="4" fill="#2a2a3a" />
          <rect x="84" y="103" width="20" height="18" rx="4" fill="#2a2a3a" />
          <rect x="26" y="130" width="20" height="18" rx="4" fill="#2a2a3a" />
          <rect x="55" y="130" width="20" height="18" rx="4" fill="#2a2a3a" />
          <rect x="84" y="130" width="20" height="18" rx="4" fill="#2a2a3a" />
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, textAlign: 'center', margin: '10px 0 0', letterSpacing: '0.1em' }}>PLAN INCOME</p>
      </div>

      {/* Piggy bank */}
      <div style={iconWrap(piggyScale, 102)}>
        <svg width="130" height="165" viewBox="0 0 130 165">
          <ellipse cx="62" cy="100" rx="50" ry="46" fill="#ec4899" />
          <circle cx="103" cy="76" r="24" fill="#ec4899" />
          <ellipse cx="116" cy="84" rx="11" ry="8" fill="#f9a8d4" />
          <circle cx="113" cy="83" r="3" fill="#be185d" />
          <circle cx="119" cy="83" r="3" fill="#be185d" />
          <circle cx="97" cy="66" r="4" fill="white" />
          <circle cx="98" cy="67" r="2" fill="#1a1a2e" />
          <ellipse cx="96" cy="55" rx="8" ry="11" fill="#f9a8d4" />
          <rect x="50" y="54" width="24" height="6" rx="3" fill="#be185d" />
          <ellipse cx="62" cy="52" rx="10" ry="5" fill="#F59E0B" />
          <rect x="28" y="142" width="16" height="20" rx="8" fill="#be185d" />
          <rect x="50" y="142" width="16" height="20" rx="8" fill="#be185d" />
          <rect x="72" y="142" width="16" height="20" rx="8" fill="#be185d" />
          <text x="58" y="114" fontFamily="Arial Black" fontSize="28" fill="white">$</text>
        </svg>
        <p style={{ fontFamily: FONT, fontSize: 24, color: '#10B981', textAlign: 'center', margin: '10px 0 0', letterSpacing: '0.1em' }}>SAVE THOUSANDS</p>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute',
        bottom: 155,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity: ctaOpacity,
        transform: `scale(${ctaScale * pulse})`,
      }}>
        <div style={{
          background: ACCENT,
          borderRadius: 24,
          padding: '24px 56px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <p style={{ ...headline(38, WHITE), margin: 0 }}>FOLLOW FOR MORE</p>
          <p style={{ ...headline(28, WHITE), margin: '8px 0 0', opacity: 0.88 }}>MONEY TRAPS LIKE THIS</p>
        </div>
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
