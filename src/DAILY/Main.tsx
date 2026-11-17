import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#3B82F6';
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

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 180 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-100, 0]);

  const billIn = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 120 }, durationInFrames: 50 });
  const billY = interpolate(billIn, [0, 1], [260, 0]);

  const countProg = interpolate(frame, [30, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const displayAmt = Math.round(6900 * countProg);

  const stampOpacity = interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stampRot = interpolate(frame, [140, 170], [-20, -10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center top, #061428 0%, #121212 65%)' }} />

      <div style={{ position: 'absolute', top: 140, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(52, WHITE)}>HOSPITAL BILL</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 8 }}>NOT WHAT YOU THINK</p>
      </div>

      <div style={{ position: 'absolute', top: 420, left: '50%', transform: `translate(-50%, ${billY}px)` }}>
        <svg width="380" height="300" viewBox="0 0 380 300">
          <rect x="0" y="0" width="380" height="300" rx="14" fill="#0d1b35" stroke={ACCENT} strokeWidth="2.5" />
          <rect x="0" y="0" width="380" height="52" rx="14" fill="#081020" />
          <rect x="0" y="40" width="380" height="12" fill="#081020" />
          <text x="190" y="34" fontFamily="Arial, sans-serif" fontSize="18" fill={WHITE} textAnchor="middle" fontWeight="bold">MEDICAL SERVICES BILL</text>
          <text x="24" y="82" fontFamily="Arial, sans-serif" fontSize="14" fill="#aaa">Emergency Room</text>
          <text x="356" y="82" fontFamily="Arial, sans-serif" fontSize="14" fill="#ddd" textAnchor="end">$3,200</text>
          <text x="24" y="114" fontFamily="Arial, sans-serif" fontSize="14" fill="#aaa">Diagnostic Tests</text>
          <text x="356" y="114" fontFamily="Arial, sans-serif" fontSize="14" fill="#ddd" textAnchor="end">$1,840</text>
          <text x="24" y="146" fontFamily="Arial, sans-serif" fontSize="14" fill="#aaa">Medications</text>
          <text x="356" y="146" fontFamily="Arial, sans-serif" fontSize="14" fill="#ddd" textAnchor="end">$860</text>
          <text x="24" y="178" fontFamily="Arial, sans-serif" fontSize="14" fill="#aaa">Supplies</text>
          <text x="356" y="178" fontFamily="Arial, sans-serif" fontSize="14" fill="#ddd" textAnchor="end">$1,000</text>
          <line x1="24" y1="196" x2="356" y2="196" stroke="#334" strokeWidth="1.5" />
          <text x="24" y="232" fontFamily="Arial Black, sans-serif" fontSize="18" fill={WHITE} fontWeight="bold">TOTAL DUE</text>
          <text x="356" y="232" fontFamily="Arial Black, sans-serif" fontSize="24" fill={ACCENT} textAnchor="end" fontWeight="bold">${displayAmt.toLocaleString()}</text>
          <text x="24" y="272" fontFamily="Arial, sans-serif" fontSize="12" fill="#555">PLEASE REMIT WITHIN 30 DAYS</text>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        top: 465,
        right: 55,
        opacity: stampOpacity,
        transform: `rotate(${stampRot}deg)`,
        border: `4px solid ${ACCENT}`,
        borderRadius: 10,
        padding: '10px 22px',
      }}>
        <p style={{ ...headline(30, ACCENT), letterSpacing: '0.3em', margin: 0 }}>NEGOTIABLE</p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 180 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-100, 0]);

  const err1 = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const err2 = interpolate(frame, [72, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const err3 = interpolate(frame, [104, 124], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const statIn = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 12, stiffness: 130 }, durationInFrames: 40 });
  const statScale = interpolate(statIn, [0, 1], [0.5, 1]);
  const statOpacity = interpolate(frame, [140, 162], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(44, BLACK)}>NUMBER ONE</p>
        <p style={{ ...headline(38, ACCENT), marginTop: 8 }}>80% HAVE ERRORS</p>
      </div>

      <div style={{ position: 'absolute', top: 340, left: '50%', transform: 'translate(-50%, 0)' }}>
        <svg width="400" height="320" viewBox="0 0 400 320">
          <rect x="2" y="6" width="400" height="316" rx="12" fill="#0000000d" />
          <rect x="0" y="0" width="400" height="316" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
          <rect x="0" y="0" width="400" height="48" rx="12" fill="#f3f4f6" />
          <rect x="0" y="36" width="400" height="12" fill="#f3f4f6" />
          <text x="200" y="30" fontFamily="Arial Black, sans-serif" fontSize="16" fill="#333" textAnchor="middle">ITEMIZED BILL</text>

          <text x="20" y="78" fontFamily="Arial, sans-serif" fontSize="15" fill="#333">Emergency Room Visit</text>
          <text x="380" y="78" fontFamily="Arial, sans-serif" fontSize="15" fill="#444" textAnchor="end">$3,200</text>

          <text x="20" y="126" fontFamily="Arial, sans-serif" fontSize="15" fill="#333">Lab Work (x3)</text>
          <text x="380" y="126" fontFamily="Arial, sans-serif" fontSize="15" fill="#444" textAnchor="end">$2,400</text>

          <text x="20" y="174" fontFamily="Arial, sans-serif" fontSize="15" fill="#333">Medications</text>
          <text x="380" y="174" fontFamily="Arial, sans-serif" fontSize="15" fill="#444" textAnchor="end">$860</text>

          <text x="20" y="222" fontFamily="Arial, sans-serif" fontSize="15" fill="#333">Room &amp; Board</text>
          <text x="380" y="222" fontFamily="Arial, sans-serif" fontSize="15" fill="#444" textAnchor="end">$1,840</text>

          <text x="20" y="270" fontFamily="Arial, sans-serif" fontSize="15" fill="#333">Supplies (misc)</text>
          <text x="380" y="270" fontFamily="Arial, sans-serif" fontSize="15" fill="#444" textAnchor="end">$1,200</text>

          <circle cx="390" cy="121" r="18" fill="none" stroke="#EF4444" strokeWidth="3" opacity={err1} />
          <text x="390" y="128" fontFamily="Arial Black, sans-serif" fontSize="20" fill="#EF4444" textAnchor="middle" opacity={err1}>!</text>

          <circle cx="390" cy="169" r="18" fill="none" stroke="#EF4444" strokeWidth="3" opacity={err2} />
          <text x="390" y="176" fontFamily="Arial Black, sans-serif" fontSize="20" fill="#EF4444" textAnchor="middle" opacity={err2}>!</text>

          <circle cx="390" cy="265" r="18" fill="none" stroke="#EF4444" strokeWidth="3" opacity={err3} />
          <text x="390" y="272" fontFamily="Arial Black, sans-serif" fontSize="20" fill="#EF4444" textAnchor="middle" opacity={err3}>!</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 150, left: 0, right: 0, textAlign: 'center', opacity: statOpacity, transform: `scale(${statScale})` }}>
        <p style={{ ...headline(28, '#888'), margin: 0 }}>AVG BILLING ERROR</p>
        <p style={{ ...headline(80, '#EF4444'), margin: 0 }}>$1,300</p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 180 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-100, 0]);

  const buildIn = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 12, stiffness: 100 }, durationInFrames: 55 });
  const buildY = interpolate(buildIn, [0, 1], [280, 0]);

  const personX = interpolate(frame, [30, 120], [-80, 185], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bubbleOpacity = interpolate(frame, [125, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bubbleIn = spring({ frame: Math.max(0, frame - 125), fps, config: { damping: 10, stiffness: 180 }, durationInFrames: 30 });
  const bubbleScale = interpolate(bubbleIn, [0, 1], [0.6, 1]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at bottom center, #061428 0%, #121212 60%)' }} />

      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(44, WHITE)}>NUMBER TWO</p>
        <p style={{ ...headline(36, ACCENT), marginTop: 8 }}>CHARITY CARE EXISTS</p>
      </div>

      <div style={{ position: 'absolute', top: 380, left: '50%', transform: `translate(-50%, ${buildY}px)` }}>
        <svg width="500" height="420" viewBox="0 0 500 420">
          <rect x="115" y="82" width="270" height="310" fill="#1a2a4a" stroke={ACCENT} strokeWidth="2" />
          <rect x="95" y="60" width="310" height="42" rx="6" fill="#0d1b35" stroke={ACCENT} strokeWidth="1.5" />
          <text x="250" y="88" fontFamily="Arial Black, sans-serif" fontSize="20" fill={WHITE} textAnchor="middle">HOSPITAL</text>
          <rect x="232" y="20" width="36" height="12" rx="4" fill={ACCENT} />
          <rect x="241" y="10" width="18" height="32" rx="4" fill={ACCENT} />
          <rect x="140" y="112" width="52" height="52" rx="4" fill="#2a3f5f" stroke="#3a5f8a" strokeWidth="1" />
          <rect x="224" y="112" width="52" height="52" rx="4" fill="#2a3f5f" stroke="#3a5f8a" strokeWidth="1" />
          <rect x="308" y="112" width="52" height="52" rx="4" fill="#2a3f5f" stroke="#3a5f8a" strokeWidth="1" />
          <rect x="140" y="184" width="52" height="52" rx="4" fill="#2a3f5f" stroke="#3a5f8a" strokeWidth="1" />
          <rect x="224" y="184" width="52" height="52" rx="4" fill="#2a3f5f" stroke="#3a5f8a" strokeWidth="1" />
          <rect x="308" y="184" width="52" height="52" rx="4" fill="#2a3f5f" stroke="#3a5f8a" strokeWidth="1" />
          <rect x="208" y="316" width="84" height="76" rx="6" fill="#0d1b35" stroke={ACCENT} strokeWidth="2" />
          <circle cx="284" cy="357" r="4" fill={ACCENT} />
          <rect x="0" y="392" width="500" height="28" rx="4" fill="#1a1a1a" />
          <g transform={`translate(${personX}, 300)`}>
            <circle cx="0" cy="-52" r="18" fill="#f0d0a0" />
            <rect x="-14" y="-34" width="28" height="40" rx="6" fill="#4a7fff" />
            <rect x="-14" y="6" width="12" height="38" rx="4" fill="#2a2a5a" />
            <rect x="2" y="6" width="12" height="38" rx="4" fill="#2a2a5a" />
          </g>
        </svg>
      </div>

      <div style={{
        position: 'absolute',
        top: 600,
        left: 100,
        opacity: bubbleOpacity,
        transform: `scale(${bubbleScale})`,
        transformOrigin: 'bottom left',
        background: WHITE,
        borderRadius: 16,
        padding: '14px 26px',
        maxWidth: 500,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0, lineHeight: 1.3 }}>
          "Can I apply for financial assistance?"
        </p>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 180 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-100, 0]);

  const item1 = interpolate(frame, [28, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item2 = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item3 = interpolate(frame, [92, 112], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const shockIn = spring({ frame: Math.max(0, frame - 136), fps, config: { damping: 10, stiffness: 180 }, durationInFrames: 36 });
  const shockScale = interpolate(shockIn, [0, 1], [0.5, 1]);
  const shockOpacity = interpolate(frame, [136, 156], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(44, BLACK)}>NUMBER THREE</p>
        <p style={{ ...headline(36, ACCENT), marginTop: 8 }}>DEMAND ITEMIZED</p>
      </div>

      <div style={{ position: 'absolute', top: 330, left: '50%', transform: 'translate(-50%, 0)' }}>
        <svg width="430" height="340" viewBox="0 0 430 340">
          <rect x="2" y="6" width="430" height="336" rx="14" fill="#0000000d" />
          <rect x="0" y="0" width="430" height="336" rx="14" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
          <rect x="0" y="0" width="430" height="52" rx="14" fill="#f3f4f6" />
          <rect x="0" y="40" width="430" height="12" fill="#f3f4f6" />
          <text x="215" y="32" fontFamily="Arial Black, sans-serif" fontSize="17" fill="#333" textAnchor="middle">ITEMIZED BILL — SUPPLIES</text>

          <g opacity={item1}>
            <ellipse cx="44" cy="102" rx="18" ry="10" fill="#ff6666" transform="rotate(-30 44 102)" />
            <ellipse cx="62" cy="88" rx="18" ry="10" fill="white" stroke="#ff6666" strokeWidth="2" transform="rotate(-30 62 88)" />
            <line x1="42" y1="84" x2="64" y2="106" stroke="#ff6666" strokeWidth="2" />
            <text x="96" y="102" fontFamily="Arial, sans-serif" fontSize="17" fill="#333">Acetaminophen (Tylenol)</text>
            <text x="412" y="102" fontFamily="Arial Black, sans-serif" fontSize="19" fill={ACCENT} textAnchor="end">$47</text>
          </g>

          <g opacity={item2}>
            <rect x="30" y="150" width="10" height="52" rx="5" fill="#5588ff" />
            <rect x="22" y="145" width="26" height="22" rx="4" fill="#3366dd" />
            <rect x="23" y="147" width="7" height="13" rx="2" fill="white" />
            <rect x="32" y="147" width="7" height="13" rx="2" fill="white" />
            <text x="96" y="180" fontFamily="Arial, sans-serif" fontSize="17" fill="#333">Basic Toothbrush</text>
            <text x="412" y="180" fontFamily="Arial Black, sans-serif" fontSize="19" fill={ACCENT} textAnchor="end">$286</text>
          </g>

          <g opacity={item3}>
            <rect x="22" y="240" width="48" height="22" rx="11" fill="#f4c08a" stroke="#e0a060" strokeWidth="2" />
            <rect x="36" y="240" width="20" height="22" fill="#f9e4c8" />
            <line x1="46" y1="243" x2="46" y2="258" stroke="#f0d0a0" strokeWidth="1.5" />
            <line x1="38" y1="251" x2="54" y2="251" stroke="#f0d0a0" strokeWidth="1.5" />
            <text x="96" y="256" fontFamily="Arial, sans-serif" fontSize="17" fill="#333">Adhesive Bandage (x1)</text>
            <text x="412" y="256" fontFamily="Arial Black, sans-serif" fontSize="19" fill={ACCENT} textAnchor="end">$129</text>
          </g>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: 0, right: 0, textAlign: 'center', opacity: shockOpacity, transform: `scale(${shockScale})` }}>
        <p style={{ ...headline(32, '#EF4444'), margin: 0 }}>THAT'S REAL. ASK TO SEE IT.</p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 180 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-100, 0]);

  const bar1H = interpolate(frame, [30, 110], [0, 460], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [60, 140], [0, 285], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bar1LabelOp = interpolate(frame, [30, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2LabelOp = interpolate(frame, [60, 82], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const savingsIn = spring({ frame: Math.max(0, frame - 148), fps, config: { damping: 10, stiffness: 150 }, durationInFrames: 40 });
  const savingsScale = interpolate(savingsIn, [0, 1], [0.5, 1]);
  const savingsOpacity = interpolate(frame, [148, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const baselineY = 490;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top, #061428 0%, #121212 55%)' }} />

      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(44, WHITE)}>NEGOTIATING SAVES</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 8 }}>30–40%</p>
      </div>

      <svg style={{ position: 'absolute', top: 320, left: 60, width: 960, height: 560 }} viewBox="0 0 960 560">
        <rect x="100" y={baselineY - bar1H} width="230" height={bar1H} rx="10" fill="#EF4444" />
        <text x="215" y={baselineY - bar1H - 18} fontFamily="Arial Black, sans-serif" fontSize="38" fill="#EF4444" textAnchor="middle" opacity={bar1LabelOp}>$6,900</text>
        <text x="215" y={baselineY + 46} fontFamily="Arial, sans-serif" fontSize="24" fill="#aaa" textAnchor="middle">NO ASK</text>

        <rect x="630" y={baselineY - bar2H} width="230" height={bar2H} rx="10" fill={ACCENT} />
        <text x="745" y={baselineY - bar2H - 18} fontFamily="Arial Black, sans-serif" fontSize="38" fill={ACCENT} textAnchor="middle" opacity={bar2LabelOp}>$4,500</text>
        <text x="745" y={baselineY + 46} fontFamily="Arial, sans-serif" fontSize="24" fill="#aaa" textAnchor="middle">NEGOTIATED</text>

        <line x1="40" y1={baselineY} x2="920" y2={baselineY} stroke="#444" strokeWidth="2" />
      </svg>

      <div style={{ position: 'absolute', bottom: 140, left: 0, right: 0, textAlign: 'center', opacity: savingsOpacity, transform: `scale(${savingsScale})` }}>
        <p style={{ ...headline(30, '#888'), margin: 0 }}>YOU KEEP</p>
        <p style={{ ...headline(88, WHITE), margin: 0 }}>$2,400</p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 180 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-100, 0]);

  const phoneIn = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 12, stiffness: 120 }, durationInFrames: 50 });
  const phoneScale = interpolate(phoneIn, [0, 1], [0.3, 1]);

  const arrowOp = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const piggyIn = spring({ frame: Math.max(0, frame - 85), fps, config: { damping: 12, stiffness: 120 }, durationInFrames: 50 });
  const piggyScale = interpolate(piggyIn, [0, 1], [0.3, 1]);

  const ctaIn = spring({ frame: Math.max(0, frame - 136), fps, config: { damping: 10, stiffness: 180 }, durationInFrames: 40 });
  const ctaScale = interpolate(ctaIn, [0, 1], [0.5, 1]);
  const ctaOpacity = interpolate(frame, [136, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(40, BLACK)}>ONE CALL.</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 8 }}>$2,400 BACK.</p>
      </div>

      <div style={{ position: 'absolute', top: 380, left: '50%', transform: 'translate(-50%, 0)', display: 'flex', alignItems: 'center', gap: 36 }}>
        <div style={{ transform: `scale(${phoneScale})` }}>
          <svg width="130" height="210" viewBox="0 0 130 210">
            <rect x="5" y="5" width="120" height="200" rx="20" fill="#1a1a3a" stroke={ACCENT} strokeWidth="3" />
            <rect x="14" y="22" width="102" height="152" rx="10" fill="#0a1428" />
            <rect x="46" y="10" width="38" height="8" rx="4" fill="#2a2a4a" />
            <circle cx="65" cy="193" r="10" fill="#2a2a4a" />
            <circle cx="65" cy="98" r="34" fill={ACCENT} opacity="0.18" />
            <circle cx="65" cy="98" r="26" fill={ACCENT} opacity="0.3" />
            <circle cx="65" cy="98" r="18" fill={ACCENT} />
            <ellipse cx="65" cy="90" rx="8" ry="5" fill="white" transform="rotate(-15 65 90)" />
            <ellipse cx="65" cy="108" rx="8" ry="5" fill="white" transform="rotate(-15 65 108)" />
            <rect x="57" y="88" width="7" height="22" rx="3.5" fill="white" transform="rotate(-15 60 99)" />
          </svg>
        </div>

        <svg width="90" height="40" viewBox="0 0 90 40" style={{ opacity: arrowOp }}>
          <line x1="0" y1="20" x2="68" y2="20" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
          <polygon points="68,8 90,20 68,32" fill={ACCENT} />
        </svg>

        <div style={{ transform: `scale(${piggyScale})` }}>
          <svg width="170" height="170" viewBox="0 0 170 170">
            <ellipse cx="82" cy="102" rx="66" ry="56" fill="#ff9966" />
            <circle cx="136" cy="82" r="30" fill="#ff9966" />
            <ellipse cx="158" cy="92" rx="14" ry="11" fill="#ff7744" />
            <circle cx="153" cy="89" r="3.5" fill="#cc4422" />
            <circle cx="163" cy="89" r="3.5" fill="#cc4422" />
            <circle cx="142" cy="71" r="5" fill="white" />
            <circle cx="143" cy="71" r="3" fill="#222" />
            <ellipse cx="126" cy="56" rx="10" ry="15" fill="#ff7744" />
            <rect x="66" y="45" width="30" height="8" rx="4" fill="#cc6644" />
            <rect x="36" y="148" width="24" height="26" rx="8" fill="#ff7744" />
            <rect x="66" y="148" width="24" height="26" rx="8" fill="#ff7744" />
            <rect x="96" y="148" width="24" height="26" rx="8" fill="#ff7744" />
            <path d="M14 98 Q4 82 14 72" stroke="#ff7744" strokeWidth="5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 230, left: 0, right: 0, textAlign: 'center', opacity: ctaOpacity, transform: `scale(${ctaScale})` }}>
        <p style={{ ...headline(44, BLACK), margin: 0 }}>ASK. EVERY. TIME.</p>
        <p style={{ fontFamily: FONT, fontSize: 26, color: '#555', margin: '18px 0 0', textAlign: 'center', lineHeight: 1.4, padding: '0 60px' }}>
          "Can I see the itemized bill?<br/>What can you do about the balance?"
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
