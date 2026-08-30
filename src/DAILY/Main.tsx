import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F0F0F';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const SUCCESS = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#111111';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.05em',
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

// ─── Scene 1: The Missing Number ─────────────────────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseSpring = spring({ frame, fps, config: { damping: 14, stiffness: 60 } });
  const houseY = interpolate(houseSpring, [0, 1], [250, 0]);

  const priceOpacity = interpolate(frame, [45, 68], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const hoaSpring = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 9, stiffness: 110 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 140 }}>
        <p style={headline(64, WHITE)}>YOUR REALTOR</p>
        <p style={headline(64, WHITE)}>NEVER SHOWED</p>
        <p style={{ ...headline(64, ACCENT), marginBottom: 44 }}>YOU THIS</p>

        <div style={{ transform: `translateY(${houseY}px)` }}>
          <svg width="340" height="290" viewBox="0 0 340 290">
            <polygon points="170,10 15,145 325,145" fill={ACCENT} />
            <rect x="240" y="52" width="30" height="68" fill="#6B7280" />
            <rect x="35" y="145" width="270" height="145" fill={WHITE} />
            <rect x="135" y="208" width="70" height="82" fill="#9CA3AF" rx="4" />
            <circle cx="197" cy="252" r="5" fill="#4B5563" />
            <rect x="55" y="163" width="64" height="50" fill="#BAE6FD" rx="4" />
            <line x1="87" y1="163" x2="87" y2="213" stroke={BG_DARK} strokeWidth="3" />
            <line x1="55" y1="188" x2="119" y2="188" stroke={BG_DARK} strokeWidth="3" />
            <rect x="221" y="163" width="64" height="50" fill="#BAE6FD" rx="4" />
            <line x1="253" y1="163" x2="253" y2="213" stroke={BG_DARK} strokeWidth="3" />
            <line x1="221" y1="188" x2="285" y2="188" stroke={BG_DARK} strokeWidth="3" />
          </svg>
        </div>

        <div style={{
          opacity: priceOpacity,
          background: WHITE,
          borderRadius: 14,
          padding: '14px 36px',
          marginTop: 18,
          marginBottom: 18,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 44, color: BLACK, margin: 0, fontWeight: 900, textAlign: 'center' }}>$450,000</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#6B7280', margin: 0, textAlign: 'center', letterSpacing: '0.08em' }}>LISTING PRICE</p>
        </div>

        <div style={{
          transform: `scale(${hoaSpring})`,
          background: ACCENT,
          borderRadius: 18,
          padding: '18px 40px',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0, fontWeight: 900, textAlign: 'center' }}>+ $330/MO HOA FEE</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0, textAlign: 'center', letterSpacing: '0.08em' }}>NOT IN THE LISTING</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2: $330/Month — Non-Optional ──────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const amount = Math.round(interpolate(frame, [18, 82], [0, 330], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  const warnSpring = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 12, stiffness: 80 } });
  const warnY = interpolate(warnSpring, [0, 1], [80, 0]);
  const warnOpacity = interpolate(frame, [110, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 120 }}>
        <p style={headline(60, BLACK)}>THE MANDATORY</p>
        <p style={{ ...headline(60, ACCENT), marginBottom: 40 }}>MONTHLY FEE</p>

        <svg width="440" height="260" viewBox="0 0 440 260">
          <rect x="20" y="10" width="400" height="250" fill={WHITE} rx="14" stroke="#E5E7EB" strokeWidth="2" />
          <rect x="20" y="10" width="400" height="64" fill={BLACK} rx="14" />
          <rect x="20" y="56" width="400" height="18" fill={BLACK} />
          <text x="220" y="50" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="26" fontWeight="900" fill={WHITE} letterSpacing="4">HOA INVOICE</text>
          <rect x="44" y="90" width="240" height="14" fill="#E5E7EB" rx="4" />
          <rect x="44" y="116" width="190" height="12" fill="#E5E7EB" rx="4" />
          <rect x="44" y="140" width="210" height="12" fill="#E5E7EB" rx="4" />
          <rect x="44" y="164" width="170" height="12" fill="#E5E7EB" rx="4" />
          <line x1="44" y1="194" x2="396" y2="194" stroke="#9CA3AF" strokeWidth="2" />
          <text x="56" y="230" fontFamily="Arial Black, sans-serif" fontSize="18" fill="#6B7280" letterSpacing="2">AMOUNT DUE</text>
        </svg>

        <p style={{ fontFamily: FONT, fontSize: 104, color: ACCENT, margin: '-20px 0 0 0', fontWeight: 900 }}>
          ${amount}
        </p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: '#6B7280', margin: '0 0 24px 0', letterSpacing: '0.08em' }}>PER MONTH</p>

        <div style={{ transform: `translateY(${warnY}px)`, opacity: warnOpacity, background: ACCENT, borderRadius: 16, padding: '18px 44px', maxWidth: 860 }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, fontWeight: 900, textAlign: 'center' }}>MISS PAYMENTS?</p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, fontWeight: 900, textAlign: 'center' }}>THEY CAN FORECLOSE.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: $118,800 Over 30 Years ─────────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barH = interpolate(frame, [18, 140], [0, 480], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const count = Math.round(interpolate(frame, [18, 140], [0, 118800], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  const noteSpring = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 12, stiffness: 80 } });
  const noteOpacity = interpolate(frame, [150, 168], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const noteY = interpolate(noteSpring, [0, 1], [36, 0]);

  const stackCount = Math.max(0, Math.floor(barH / 48));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 90 }}>
        <p style={headline(58, WHITE)}>30 YEARS OF</p>
        <p style={{ ...headline(58, ACCENT), marginBottom: 34 }}>HOA PAYMENTS</p>

        <div style={{ position: 'relative', width: 220, height: 500, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
          <div style={{ width: 160, height: barH, background: 'linear-gradient(to top, #EF4444, #FCA5A5)', borderRadius: '8px 8px 0 0', position: 'relative', overflow: 'hidden' }}>
            {Array.from({ length: stackCount }).map((_, i) => (
              <div key={i} style={{ position: 'absolute', bottom: i * 48 + 10, left: 10, right: 10, height: 2, background: 'rgba(255,255,255,0.25)' }} />
            ))}
          </div>
          <div style={{ width: 210, height: 4, background: WHITE, borderRadius: 2 }} />
          <p style={{ fontFamily: FONT, fontSize: 24, color: '#9CA3AF', margin: '8px 0 0 0' }}>30 YEARS</p>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 76, color: ACCENT, margin: '18px 0 0 0', fontWeight: 900 }}>
          ${count.toLocaleString()}
        </p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: '0 0 18px 0', letterSpacing: '0.08em' }}>TOTAL FEES PAID</p>

        <div style={{ opacity: noteOpacity, transform: `translateY(${noteY}px)`, borderTop: `3px solid ${ACCENT}`, paddingTop: 14 }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: '#9CA3AF', margin: 0, textAlign: 'center' }}>BEFORE SPECIAL ASSESSMENTS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: Special Assessments ────────────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flapOpacity = interpolate(frame, [18, 68], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const letterY = interpolate(frame, [58, 118], [0, -100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const letterOpacity = interpolate(frame, [58, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const amountSpring = spring({ frame: Math.max(0, frame - 118), fps, config: { damping: 10, stiffness: 100 } });
  const freqSpring = spring({ frame: Math.max(0, frame - 158), fps, config: { damping: 12, stiffness: 80 } });
  const freqOpacity = interpolate(frame, [158, 174], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 110 }}>
        <p style={headline(60, BLACK)}>THEN THE</p>
        <p style={{ ...headline(60, ACCENT), marginBottom: 44 }}>SURPRISE BILLS HIT</p>

        <div style={{ position: 'relative', width: 420, height: 350 }}>
          <div style={{
            position: 'absolute',
            top: 20,
            left: 72,
            width: 276,
            height: 198,
            background: WHITE,
            border: '3px solid #D1D5DB',
            borderRadius: 8,
            transform: `translateY(${letterY}px)`,
            opacity: letterOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}>
            <p style={{ fontFamily: FONT, fontSize: 18, color: ACCENT, margin: '0 0 6px 0', letterSpacing: '0.06em' }}>SPECIAL ASSESSMENT</p>
            <div style={{ width: 200, height: 2, background: '#E5E7EB', marginBottom: 10 }} />
            <p style={{ fontFamily: FONT, fontSize: 15, color: '#6B7280', margin: '0 0 3px 0' }}>Roof repair levy</p>
            <p style={{ fontFamily: FONT, fontSize: 15, color: '#6B7280', margin: '0 0 10px 0' }}>Unit allocation</p>
            <p style={{ fontFamily: FONT, fontSize: 44, color: BLACK, margin: 0, fontWeight: 900 }}>$2,300</p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: '#9CA3AF', margin: '4px 0 0 0' }}>DUE IN 30 DAYS</p>
          </div>

          <svg width="420" height="260" viewBox="0 0 420 260" style={{ position: 'absolute', bottom: 0, zIndex: 2 }}>
            <rect x="20" y="80" width="380" height="180" fill="#E5E7EB" rx="8" />
            <polygon points="20,260 210,158 400,260" fill="#D1D5DB" />
            <polygon points="20,80 20,260 210,158" fill="#C8D3DC" />
            <polygon points="400,80 400,260 210,158" fill="#BEC9D4" />
            <polygon points="20,80 210,190 400,80" fill="#9CA3AF" opacity={flapOpacity} />
            <polygon points="20,80 210,10 400,80" fill="#BDC5CF" opacity={1 - flapOpacity} />
          </svg>
        </div>

        <div style={{ transform: `scale(${amountSpring})`, marginTop: 14 }}>
          <p style={{ fontFamily: FONT, fontSize: 84, color: ACCENT, margin: 0, fontWeight: 900, textAlign: 'center' }}>$2,300</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#6B7280', margin: 0, textAlign: 'center' }}>AVG SPECIAL ASSESSMENT</p>
        </div>

        <div style={{ opacity: freqOpacity, transform: `scale(${freqSpring})`, background: ACCENT, borderRadius: 14, padding: '14px 36px', marginTop: 16 }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0, fontWeight: 900 }}>2–3 TIMES EVERY DECADE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: The $404K Opportunity Cost ─────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftBarH = interpolate(frame, [14, 98], [0, 300], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rightBarH = interpolate(frame, [28, 158], [0, 490], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rightCount = Math.round(interpolate(frame, [28, 158], [0, 404000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }));

  const vsBadge = spring({ frame: Math.max(0, frame - 48), fps, config: { damping: 14, stiffness: 100 } });

  const diffSpring = spring({ frame: Math.max(0, frame - 165), fps, config: { damping: 12, stiffness: 80 } });
  const diffOpacity = interpolate(frame, [165, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 70 }}>
        <p style={headline(58, WHITE)}>THE REAL</p>
        <p style={{ ...headline(58, ACCENT), marginBottom: 30 }}>OPPORTUNITY COST</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 50, height: 530, marginBottom: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: '0 0 8px 0', textAlign: 'center' }}>$118,800</p>
            <div style={{ width: 148, height: leftBarH, background: 'linear-gradient(to top, #EF4444, #FCA5A5)', borderRadius: '8px 8px 0 0' }} />
            <div style={{ width: 178, height: 4, background: WHITE }} />
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#9CA3AF', margin: '8px 0 0 0', textAlign: 'center', lineHeight: 1.3 }}>HOA FEES PAID</p>
          </div>

          <div style={{ transform: `scale(${vsBadge})`, background: WHITE, borderRadius: '50%', width: 58, height: 58, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
            <span style={{ fontFamily: FONT, fontSize: 20, color: BLACK, fontWeight: 900 }}>VS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: SUCCESS, margin: '0 0 8px 0', textAlign: 'center' }}>${rightCount.toLocaleString()}</p>
            <div style={{ width: 148, height: rightBarH, background: 'linear-gradient(to top, #10B981, #6EE7B7)', borderRadius: '8px 8px 0 0' }} />
            <div style={{ width: 178, height: 4, background: WHITE }} />
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#9CA3AF', margin: '8px 0 0 0', textAlign: 'center', lineHeight: 1.3 }}>INVESTED @ 7%</p>
          </div>
        </div>

        <div style={{ opacity: diffOpacity, transform: `scale(${diffSpring})`, background: SUCCESS, borderRadius: 14, padding: '16px 40px' }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0, fontWeight: 900, textAlign: 'center' }}>$404,000 DIFFERENCE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: Ask Before You Sign ────────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personSpring = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });

  const item1Opacity = interpolate(frame, [38, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item2Opacity = interpolate(frame, [78, 98], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item3Opacity = interpolate(frame, [118, 138], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaSpring = spring({ frame: Math.max(0, frame - 158), fps, config: { damping: 12, stiffness: 80 } });

  const renderItem = (text: string, opacity: number) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity, marginBottom: 22 }}>
      <div style={{ width: 46, height: 46, border: `4px solid ${ACCENT}`, borderRadius: 8, background: WHITE, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 26, color: ACCENT, fontWeight: 900 }}>&#10003;</span>
      </div>
      <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, margin: 0, lineHeight: 1.2 }}>{text}</p>
    </div>
  );

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 90 }}>
        <p style={headline(60, BLACK)}>ASK BEFORE</p>
        <p style={{ ...headline(60, ACCENT), marginBottom: 30 }}>YOU SIGN</p>

        <div style={{ transform: `scale(${personSpring})`, marginBottom: 24 }}>
          <svg width="110" height="168" viewBox="0 0 110 168">
            <circle cx="55" cy="36" r="32" fill={BLACK} />
            <rect x="18" y="74" width="74" height="84" fill={BLACK} rx="14" />
            <rect x="0" y="76" width="22" height="60" fill={BLACK} rx="8" />
            <rect x="88" y="76" width="22" height="60" fill={BLACK} rx="8" />
          </svg>
        </div>

        <div style={{ width: 890, padding: '28px 38px', background: WHITE, borderRadius: 20, border: '3px solid #E5E7EB', marginBottom: 28 }}>
          {renderItem('5 YEARS OF HOA MEETING MINUTES', item1Opacity)}
          {renderItem('RESERVE FUND BALANCE & REPORT', item2Opacity)}
          {renderItem('SPECIAL ASSESSMENT HISTORY', item3Opacity)}
        </div>

        <div style={{ transform: `scale(${ctaSpring})`, background: ACCENT, borderRadius: 18, padding: '22px 52px' }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0, fontWeight: 900, textAlign: 'center' }}>ONE QUESTION.</p>
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0, fontWeight: 900, textAlign: 'center' }}>SAVE EVERYTHING.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Composition ─────────────────────────────────────────────────────────────
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
