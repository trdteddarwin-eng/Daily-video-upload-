import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#1a1a1a';
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
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scenes ──────────────────────────────────────────────────────────────────
// Scene 1: Hook — hospital building + 80% animated counter
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const sc = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const pct = interpolate(frame, [24, 120], [0, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const errFade = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 110 }}>
        <div style={{ transform: `scale(${sc})`, transformOrigin: 'center center' }}>
          <svg width="260" height="220" viewBox="0 0 260 220" fill="none">
            <rect x="10" y="90" width="240" height="130" fill="#2a2a2a" rx="10"/>
            <rect x="55" y="50" width="150" height="50" fill="#2a2a2a" rx="10"/>
            <rect x="118" y="8" width="24" height="76" fill={ACCENT} rx="5"/>
            <rect x="92" y="30" width="76" height="24" fill={ACCENT} rx="5"/>
            <rect x="28" y="108" width="52" height="48" fill="#1a1a1a" rx="5"/>
            <rect x="180" y="108" width="52" height="48" fill="#1a1a1a" rx="5"/>
            <rect x="105" y="148" width="50" height="72" fill="#1a1a1a" rx="5"/>
          </svg>
        </div>
        <p style={{ ...headline(190, ACCENT), marginTop: 8 }}>{Math.floor(pct)}%</p>
        <p style={{ ...headline(40, WHITE), marginTop: -8 }}>OF MEDICAL BILLS</p>
        <p style={{ ...headline(40, WHITE), marginTop: 12 }}>HAVE AN ERROR INSIDE</p>
        <div style={{ marginTop: 44, opacity: errFade, background: ACCENT, borderRadius: 18, paddingTop: 22, paddingBottom: 22, paddingLeft: 56, paddingRight: 56 }}>
          <p style={headline(44, WHITE)}>AVG MISTAKE: $1,300</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: Summary bill — one vague line hides all the errors
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const docSc = spring({ frame, fps: 30, config: { damping: 16, stiffness: 100 } });
  const labelFade = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 100, paddingLeft: 60, paddingRight: 60 }}>
        <p style={headline(38, BLACK)}>HOSPITALS SEND YOU THIS</p>
        <div style={{
          marginTop: 40,
          width: '100%',
          background: WHITE,
          borderRadius: 20,
          paddingTop: 40,
          paddingBottom: 40,
          paddingLeft: 44,
          paddingRight: 44,
          boxShadow: '0 10px 48px rgba(0,0,0,0.14)',
          transform: `translateY(${(1 - docSc) * 60}px)`,
          opacity: docSc,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: '#999', margin: '0 0 20px', letterSpacing: '0.12em' }}>
            MEDICAL STATEMENT
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 24, borderBottom: '2px solid #EEE' }}>
            <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0 }}>Medical Services Rendered</p>
            <p style={{ fontFamily: FONT, fontSize: 42, color: BLACK, margin: 0 }}>$7,030</p>
          </div>
          <div style={{ paddingTop: 24 }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: '#AAA', margin: 0, letterSpacing: '0.08em' }}>AMOUNT DUE: $7,030.00</p>
          </div>
        </div>
        <div style={{ marginTop: 48, opacity: labelFade, textAlign: 'center' }}>
          <p style={headline(34, ACCENT)}>ONE LINE. NO BREAKDOWN.</p>
          <p style={{ ...headline(28, '#666'), marginTop: 16 }}>ERRORS HIDE IN THE VAGUENESS.</p>
          <p style={{ ...headline(28, '#666'), marginTop: 12 }}>BUT YOU CAN FIX THIS IN 5 WORDS.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: Three most common billing errors with icons
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const sc0 = spring({ frame, fps: 30, config: { damping: 14 } });
  const sc1 = spring({ frame: Math.max(0, frame - 35), fps: 30, config: { damping: 14 } });
  const sc2 = spring({ frame: Math.max(0, frame - 70), fps: 30, config: { damping: 14 } });
  const scales = [sc0, sc1, sc2];

  const errors = [
    { label: 'DUPLICATE CHARGE', sub: 'BILLED TWICE FOR ONE TEST' },
    { label: 'UPCODING', sub: 'CHARGED FOR PRICIER PROCEDURE' },
    { label: 'GHOST CHARGE', sub: 'ITEM NEVER USED ON YOU' },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 80, paddingLeft: 48, paddingRight: 48 }}>
        <p style={headline(40, WHITE)}>3 MOST COMMON ERRORS</p>
        <p style={{ ...headline(28, ACCENT), marginTop: 12 }}>ON YOUR MEDICAL BILL</p>
        {errors.map((err, i) => (
          <div key={i} style={{
            marginTop: 44,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            background: '#1e1e1e',
            borderRadius: 20,
            paddingTop: 26,
            paddingBottom: 26,
            paddingLeft: 32,
            paddingRight: 32,
            borderLeft: `8px solid ${ACCENT}`,
            transform: `scale(${scales[i]})`,
            transformOrigin: 'left center',
          }}>
            <div style={{ flexShrink: 0 }}>
              {i === 0 && (
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="0" y="10" width="40" height="50" fill="#333" rx="6"/>
                  <rect x="20" y="0" width="40" height="50" fill="#444" rx="6"/>
                  <rect x="28" y="12" width="24" height="4" fill={ACCENT} rx="2"/>
                  <rect x="28" y="22" width="18" height="4" fill={ACCENT} rx="2"/>
                  <rect x="28" y="32" width="22" height="4" fill={ACCENT} rx="2"/>
                </svg>
              )}
              {i === 1 && (
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="14" y="34" width="32" height="26" fill="#333" rx="4"/>
                  <polygon points="30,0 56,34 4,34" fill={ACCENT}/>
                </svg>
              )}
              {i === 2 && (
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="8" y="4" width="44" height="52" fill="#333" rx="6"/>
                  <line x1="10" y1="10" x2="50" y2="54" stroke={ACCENT} strokeWidth="5" strokeLinecap="round"/>
                  <line x1="50" y1="10" x2="10" y2="54" stroke={ACCENT} strokeWidth="5" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0, letterSpacing: '0.08em' }}>{err.label}</p>
              <p style={{ fontFamily: FONT, fontSize: 20, color: '#AAA', margin: '8px 0 0', letterSpacing: '0.04em' }}>{err.sub}</p>
            </div>
          </div>
        ))}
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: How to request an itemized bill — phone + speech bubble
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const phoneSc = spring({ frame, fps: 30, config: { damping: 14 } });
  const bubbleFade = interpolate(frame, [40, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const infoFade = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 80 }}>
        <p style={headline(38, BLACK)}>YOU HAVE A LEGAL RIGHT</p>
        <p style={{ ...headline(36, ACCENT), marginTop: 12 }}>TO AN ITEMIZED BILL</p>
        <div style={{ marginTop: 44, transform: `scale(${phoneSc})` }}>
          <svg width="180" height="300" viewBox="0 0 180 300" fill="none">
            <rect x="10" y="10" width="160" height="280" fill="#2a2a2a" rx="28"/>
            <rect x="22" y="26" width="136" height="234" fill="#1a1a1a" rx="14"/>
            <rect x="58" y="14" width="64" height="7" fill="#444" rx="4"/>
            <circle cx="90" cy="276" r="12" fill="#444"/>
            <rect x="60" y="86" width="60" height="72" fill="#333" rx="6"/>
            <rect x="68" y="98" width="44" height="4" fill={ACCENT} rx="2"/>
            <rect x="68" y="110" width="36" height="4" fill="#555" rx="2"/>
            <rect x="68" y="122" width="40" height="4" fill="#555" rx="2"/>
            <rect x="68" y="134" width="28" height="4" fill={ACCENT} rx="2"/>
          </svg>
        </div>
        <div style={{ marginTop: 24, opacity: bubbleFade, paddingLeft: 60, paddingRight: 60, textAlign: 'center' }}>
          <div style={{ background: ACCENT, borderRadius: 18, paddingTop: 20, paddingBottom: 20, paddingLeft: 36, paddingRight: 36 }}>
            <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0, letterSpacing: '0.08em' }}>
              "SEND ME AN ITEMIZED BILL"
            </p>
          </div>
        </div>
        <div style={{ marginTop: 44, opacity: infoFade, paddingLeft: 60, paddingRight: 60, textAlign: 'center' }}>
          <p style={headline(30, '#555')}>CALL BILLING. SAY THOSE 5 WORDS.</p>
          <p style={{ ...headline(28, '#555'), marginTop: 16 }}>THEY ARE REQUIRED TO SEND IT.</p>
          <p style={{ ...headline(30, ACCENT), marginTop: 16 }}>IT'S FEDERAL LAW.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: EOB vs hospital bill comparison — spot the mismatch
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const slideIn = spring({ frame, fps: 30, config: { damping: 18, stiffness: 90 } });
  const mismatch = interpolate(
    frame % 40,
    [0, 20, 40],
    [0.15, 0.55, 0.15],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const ctaFade = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 80, paddingLeft: 40, paddingRight: 40 }}>
        <p style={headline(36, WHITE)}>COMPARE YOUR BILL</p>
        <p style={{ ...headline(30, '#888'), marginTop: 10 }}>TO YOUR EOB (FROM YOUR INSURER)</p>
        <div style={{
          marginTop: 40,
          width: '100%',
          display: 'flex',
          gap: 20,
          transform: `translateY(${(1 - slideIn) * 60}px)`,
          opacity: slideIn,
        }}>
          <div style={{ flex: 1, background: '#1e1e1e', borderRadius: 16, paddingTop: 28, paddingBottom: 28, paddingLeft: 28, paddingRight: 28, borderTop: '4px solid #3B82F6' }}>
            <p style={{ fontFamily: FONT, fontSize: 20, color: '#3B82F6', margin: '0 0 16px', letterSpacing: '0.1em' }}>EOB (INSURER)</p>
            <div style={{ borderBottom: '1px solid #2a2a2a', paddingBottom: 14, marginBottom: 14 }}>
              <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: '0 0 4px' }}>Lab Test</p>
              <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>$320</p>
            </div>
            <div style={{ borderBottom: '1px solid #2a2a2a', paddingBottom: 14, marginBottom: 14 }}>
              <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: '0 0 4px' }}>Room</p>
              <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>$1,200</p>
            </div>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: '0 0 4px' }}>Anesthesia</p>
              <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>$800</p>
            </div>
          </div>
          <div style={{ flex: 1, background: '#1e1e1e', borderRadius: 16, paddingTop: 28, paddingBottom: 28, paddingLeft: 28, paddingRight: 28, borderTop: `4px solid ${ACCENT}` }}>
            <p style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, margin: '0 0 16px', letterSpacing: '0.1em' }}>YOUR BILL</p>
            <div style={{ background: `rgba(239,68,68,${mismatch})`, borderRadius: 10, padding: '14px 12px', marginBottom: 14 }}>
              <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: '0 0 4px' }}>Lab Test</p>
              <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0 }}>$640  !</p>
            </div>
            <div style={{ borderBottom: '1px solid #2a2a2a', paddingBottom: 14, marginBottom: 14 }}>
              <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: '0 0 4px' }}>Room</p>
              <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>$1,200</p>
            </div>
            <div>
              <p style={{ fontFamily: FONT, fontSize: 18, color: '#AAA', margin: '0 0 4px' }}>Anesthesia</p>
              <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>$800</p>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 32, opacity: ctaFade, textAlign: 'center' }}>
          <div style={{ background: ACCENT, borderRadius: 14, paddingTop: 16, paddingBottom: 16, paddingLeft: 40, paddingRight: 40 }}>
            <p style={headline(34, WHITE)}>$320 ERROR — CALL AND DISPUTE IT</p>
          </div>
          <p style={{ ...headline(24, '#888'), marginTop: 16 }}>HOSPITALS RESOLVE MOST WITHOUT A FIGHT.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: CTA — piggy bank with falling coin + call to action
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const bankSc = spring({ frame, fps: 30, config: { damping: 14 } });
  const coinY = interpolate(frame, [40, 90], [-90, 64], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinOp = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaFade = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 80 }}>
        <p style={headline(44, BLACK)}>80% CHANCE YOUR LAST</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 10 }}>BILL HAS AN ERROR</p>
        <div style={{ position: 'relative', marginTop: 50, display: 'inline-block', transform: `scale(${bankSc})`, transformOrigin: 'center bottom' }}>
          <svg width="300" height="240" viewBox="0 0 300 240" fill="none">
            <ellipse cx="140" cy="162" rx="120" ry="78" fill="#FCA5A5"/>
            <ellipse cx="258" cy="158" rx="38" ry="30" fill="#FCA5A5"/>
            <circle cx="250" cy="154" r="7" fill="#F87171"/>
            <circle cx="266" cy="154" r="7" fill="#F87171"/>
            <circle cx="222" cy="122" r="11" fill="white"/>
            <circle cx="224" cy="120" r="6" fill="#333"/>
            <ellipse cx="76" cy="88" rx="24" ry="30" fill="#FCA5A5"/>
            <ellipse cx="76" cy="88" rx="14" ry="20" fill="#F87171"/>
            <rect x="70" y="228" width="32" height="14" fill="#F87171" rx="5"/>
            <rect x="114" y="228" width="32" height="14" fill="#F87171" rx="5"/>
            <rect x="158" y="228" width="32" height="14" fill="#F87171" rx="5"/>
            <rect x="202" y="228" width="32" height="14" fill="#F87171" rx="5"/>
            <rect x="108" y="82" width="64" height="10" fill="#F87171" rx="5"/>
          </svg>
          <div style={{ position: 'absolute', top: coinY, left: 108, opacity: coinOp }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" fill="#FBBF24" stroke="#F59E0B" strokeWidth="3"/>
              <circle cx="32" cy="32" r="20" fill="#F59E0B"/>
              <text x="32" y="38" textAnchor="middle" fontSize="20" fill={WHITE} fontFamily="Arial Black">$</text>
            </svg>
          </div>
        </div>
        <div style={{ marginTop: 36, opacity: ctaFade, paddingLeft: 60, paddingRight: 60, textAlign: 'center' }}>
          <p style={headline(30, '#555')}>CALL HOSPITAL BILLING.</p>
          <p style={{ ...headline(28, '#555'), marginTop: 12 }}>SAY: "SEND ME AN ITEMIZED BILL."</p>
          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: ACCENT, borderRadius: 16, paddingTop: 22, paddingBottom: 22, paddingLeft: 52, paddingRight: 52 }}>
              <p style={headline(36, WHITE)}>$1,300 BACK IN YOUR POCKET</p>
            </div>
          </div>
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
