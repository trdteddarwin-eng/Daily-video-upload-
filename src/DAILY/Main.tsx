import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
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

// Scene 1: Hook — money bag springs in, $4,200 ticks down to $0 in 30 days
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const sc = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const amount = interpolate(frame, [30, 160], [4200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const goneFade = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 130 }}>
        <div style={{ transform: `scale(${sc})`, transformOrigin: 'center center' }}>
          <svg width="200" height="210" viewBox="0 0 200 210" fill="none">
            <ellipse cx="100" cy="152" rx="84" ry="70" fill="#2a2a2a"/>
            <ellipse cx="100" cy="152" rx="74" ry="62" fill="#333333"/>
            <path d="M68 82 Q72 50 100 44 Q128 50 132 82" stroke={ACCENT} strokeWidth="12" fill="none" strokeLinecap="round"/>
            <rect x="83" y="36" width="34" height="16" rx="8" fill={ACCENT}/>
            <text x="100" y="172" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black" fontSize="62" fontWeight="900">$</text>
          </svg>
        </div>
        <p style={{ ...headline(44, WHITE), marginTop: 18 }}>YOU GET A $4,200 BONUS</p>
        <p style={{ ...headline(38, '#999999'), marginTop: 14 }}>30 DAYS LATER, IT'S...</p>
        <p style={{ ...headline(144, ACCENT), marginTop: 4, lineHeight: 1.0 }}>${Math.floor(amount).toLocaleString()}</p>
        <div style={{ marginTop: 18, opacity: goneFade }}>
          <p style={{ ...headline(54, '#EF4444') }}>GONE. ALL OF IT.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: The house money effect — brain SVG + explanation (light bg)
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const sc = spring({ frame, fps: 30, config: { damping: 12, stiffness: 90 } });
  const badgeFade = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row1Fade = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2Fade = interpolate(frame, [135, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 110 }}>
        <div style={{ transform: `scale(${sc})`, transformOrigin: 'center center' }}>
          <svg width="220" height="180" viewBox="0 0 220 180" fill="none">
            <ellipse cx="110" cy="98" rx="86" ry="72" fill="#e8e0d0"/>
            <ellipse cx="110" cy="98" rx="74" ry="60" fill="#d9ccbb"/>
            <path d="M46 84 Q60 62 82 72 Q96 58 110 70 Q124 58 138 72 Q160 62 174 84" stroke="#b0a090" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <path d="M38 104 Q56 118 78 108 Q92 120 110 112 Q128 120 142 108 Q164 118 182 104" stroke="#b0a090" strokeWidth="6" fill="none" strokeLinecap="round"/>
            <rect x="107" y="70" width="6" height="44" rx="3" fill="#b0a090"/>
          </svg>
        </div>
        <div style={{ marginTop: 12, opacity: badgeFade, background: ACCENT, borderRadius: 20, paddingTop: 18, paddingBottom: 18, paddingLeft: 44, paddingRight: 44 }}>
          <p style={{ ...headline(38, BLACK) }}>HOUSE MONEY EFFECT</p>
        </div>
        <p style={{ ...headline(36, BLACK), marginTop: 30, opacity: row1Fade }}>YOUR BRAIN MARKS WINDFALLS</p>
        <p style={{ ...headline(36, BLACK), marginTop: 8, opacity: row1Fade }}>AS "NOT REAL" MONEY</p>
        <p style={{ ...headline(32, '#888888'), marginTop: 16, opacity: row2Fade }}>SO YOUR SPENDING FILTER TURNS OFF</p>
        <p style={{ ...headline(32, '#888888'), marginTop: 6, opacity: row2Fade }}>AND THE CASH VANISHES</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: $4,200/year in windfall cash — three icons, animated total (dark bg)
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const sc1 = spring({ frame, fps: 30, config: { damping: 14, stiffness: 90 } });
  const sc2 = spring({ frame: Math.max(0, frame - 28), fps: 30, config: { damping: 14, stiffness: 90 } });
  const sc3 = spring({ frame: Math.max(0, frame - 56), fps: 30, config: { damping: 14, stiffness: 90 } });
  const totalVal = interpolate(frame, [80, 175], [0, 4200], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelFade = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 90 }}>
        <p style={{ ...headline(42, WHITE) }}>AVERAGE AMERICAN RECEIVES</p>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginTop: 52, gap: 52 }}>
          {/* Tax receipt */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${sc1})`, transformOrigin: 'bottom center' }}>
            <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
              <rect x="16" y="8" width="64" height="74" fill="#2a2a2a" rx="5"/>
              <path d="M16 82 L26 74 L36 82 L46 74 L56 82 L66 74 L76 82 L80 78" stroke={ACCENT} strokeWidth="4" fill="none" strokeLinecap="round"/>
              <rect x="26" y="20" width="44" height="7" rx="3" fill={ACCENT}/>
              <rect x="26" y="33" width="30" height="4" rx="2" fill="#555"/>
              <rect x="26" y="43" width="36" height="4" rx="2" fill="#555"/>
              <rect x="26" y="55" width="44" height="6" rx="3" fill={ACCENT} opacity="0.6"/>
            </svg>
            <p style={{ ...headline(20, ACCENT), marginTop: 10 }}>TAX REFUND</p>
            <p style={{ ...headline(28, WHITE), marginTop: 6 }}>$1,450</p>
          </div>
          {/* Bonus envelope */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${sc2})`, transformOrigin: 'bottom center' }}>
            <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
              <rect x="8" y="24" width="80" height="56" fill="#2a2a2a" rx="7"/>
              <path d="M8 24 L48 52 L88 24" stroke={ACCENT} strokeWidth="4" fill="none" strokeLinejoin="round"/>
              <path d="M8 80 L34 54" stroke="#444" strokeWidth="3"/>
              <path d="M88 80 L62 54" stroke="#444" strokeWidth="3"/>
              <circle cx="48" cy="14" r="12" fill={ACCENT}/>
              <text x="48" y="19" textAnchor="middle" fill={BLACK} fontFamily="Arial Black" fontSize="14" fontWeight="900">$</text>
            </svg>
            <p style={{ ...headline(20, ACCENT), marginTop: 10 }}>BONUS</p>
            <p style={{ ...headline(28, WHITE), marginTop: 6 }}>$2,150</p>
          </div>
          {/* Gift box */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: `scale(${sc3})`, transformOrigin: 'bottom center' }}>
            <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
              <rect x="12" y="44" width="72" height="46" fill="#2a2a2a" rx="5"/>
              <rect x="8" y="30" width="80" height="18" fill="#333" rx="5"/>
              <rect x="44" y="30" width="8" height="60" fill={ACCENT}/>
              <rect x="8" y="40" width="80" height="8" fill={ACCENT} opacity="0.35"/>
              <path d="M48 30 Q34 16 26 22 Q20 28 34 32" fill={ACCENT}/>
              <path d="M48 30 Q62 16 70 22 Q76 28 62 32" fill={ACCENT}/>
            </svg>
            <p style={{ ...headline(20, ACCENT), marginTop: 10 }}>GIFTS</p>
            <p style={{ ...headline(28, WHITE), marginTop: 6 }}>$600</p>
          </div>
        </div>
        <p style={{ ...headline(34, '#888888'), marginTop: 44, opacity: labelFade }}>EVERY YEAR — IN FOUND MONEY</p>
        <p style={{ ...headline(128, ACCENT), marginTop: 2, lineHeight: 1.0 }}>${Math.floor(totalVal).toLocaleString()}</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: The found money rule — gold coin split 50/50 (light bg)
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const sc = spring({ frame, fps: 30, config: { damping: 12, stiffness: 80 } });
  const investFade = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const enjoyFade = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ruleFade = interpolate(frame, [148, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 108 }}>
        <p style={{ ...headline(42, BLACK) }}>WEALTHY PEOPLE USE</p>
        <p style={{ ...headline(42, BLACK), marginTop: 8 }}>ONE RULE</p>
        <div style={{ transform: `scale(${sc})`, marginTop: 42, transformOrigin: 'center center' }}>
          <svg width="170" height="170" viewBox="0 0 170 170" fill="none">
            <circle cx="85" cy="85" r="80" fill="#f0c040"/>
            <circle cx="85" cy="85" r="68" fill="#f5d060"/>
            <circle cx="85" cy="85" r="54" fill="#f0c040"/>
            <text x="85" y="105" textAnchor="middle" fill="#c8960a" fontFamily="Arial Black" fontSize="66" fontWeight="900">$</text>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: 40, gap: 32 }}>
          <div style={{ opacity: investFade, display: 'flex', flexDirection: 'column', alignItems: 'center', background: ACCENT, borderRadius: 22, paddingTop: 24, paddingBottom: 24, paddingLeft: 40, paddingRight: 40 }}>
            <p style={{ ...headline(54, BLACK) }}>50%</p>
            <p style={{ ...headline(26, BLACK), marginTop: 8 }}>INVEST NOW</p>
          </div>
          <div style={{ opacity: enjoyFade, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#222222', borderRadius: 22, paddingTop: 24, paddingBottom: 24, paddingLeft: 40, paddingRight: 40 }}>
            <p style={{ ...headline(54, WHITE) }}>50%</p>
            <p style={{ ...headline(26, WHITE), marginTop: 8 }}>ENJOY IT</p>
          </div>
        </div>
        <div style={{ marginTop: 34, opacity: ruleFade, background: '#222222', borderRadius: 18, paddingTop: 16, paddingBottom: 16, paddingLeft: 40, paddingRight: 40 }}>
          <p style={{ ...headline(34, ACCENT) }}>THE FOUND MONEY RULE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: Animated bar chart $2,100/yr at 10% for 30 years = $340K (dark bg)
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [15, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numFade = interpolate(frame, [118, 152], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const headerFade = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bars = [
    { label: 'YR 5',  value: 12800 },
    { label: 'YR 10', value: 33500 },
    { label: 'YR 15', value: 66700 },
    { label: 'YR 20', value: 120300 },
    { label: 'YR 25', value: 206500 },
    { label: 'YR 30', value: 345000 },
  ];
  const maxVal = 345000;
  const chartH = 390;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 82 }}>
        <p style={{ ...headline(36, WHITE), opacity: headerFade }}>$2,100/YEAR @ 10% HISTORIC RETURN</p>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginTop: 36, gap: 16 }}>
          {bars.map((b, i) => {
            const barProgress = Math.max(0, Math.min(1, (progress - i * 0.10) / 0.45));
            const barH = Math.max(0, barProgress * (b.value / maxVal) * chartH);
            return (
              <div key={b.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 88, height: Math.max(0, Math.floor(barH)), background: ACCENT, borderRadius: '8px 8px 0 0' }} />
                <p style={{ fontFamily: FONT, fontSize: 22, color: '#aaaaaa', textAlign: 'center' as const, margin: 0 }}>{b.label}</p>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 32, opacity: numFade, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ ...headline(130, ACCENT), lineHeight: 1.0 }}>$340K</p>
          <p style={{ ...headline(38, WHITE), marginTop: 8 }}>YOUR FUTURE SELF KEEPS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: CTA — piggy bank + payoff numbers + follow button (light bg)
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const sc = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const textFade = interpolate(frame, [38, 68], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaFade = interpolate(frame, [118, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 118), fps: 30, config: { damping: 12, stiffness: 100 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 96 }}>
        <div style={{ transform: `scale(${sc})`, transformOrigin: 'center center' }}>
          <svg width="230" height="210" viewBox="0 0 230 210" fill="none">
            {/* Body */}
            <ellipse cx="108" cy="142" rx="88" ry="72" fill={ACCENT}/>
            {/* Head */}
            <circle cx="182" cy="110" r="40" fill={ACCENT}/>
            {/* Ear */}
            <ellipse cx="170" cy="78" rx="13" ry="9" fill="#e8940a" transform="rotate(-20 170 78)"/>
            {/* Eye */}
            <circle cx="193" cy="100" r="7" fill={BLACK}/>
            <circle cx="195" cy="98" r="2.5" fill="white"/>
            {/* Snout */}
            <ellipse cx="212" cy="118" rx="16" ry="12" fill="#e8940a"/>
            <circle cx="207" cy="118" r="4" fill="#c8740a"/>
            <circle cx="217" cy="118" r="4" fill="#c8740a"/>
            {/* Coin slot */}
            <rect x="100" y="64" width="16" height="5" rx="2.5" fill={BLACK}/>
            {/* Legs */}
            <rect x="56" y="200" width="24" height="10" rx="5" fill="#e8940a"/>
            <rect x="90" y="202" width="24" height="8" rx="4" fill="#e8940a"/>
            <rect x="126" y="202" width="24" height="8" rx="4" fill="#e8940a"/>
            <rect x="154" y="200" width="22" height="10" rx="5" fill="#e8940a"/>
            {/* Tail */}
            <path d="M22 136 Q10 118 18 102 Q26 86 38 96" stroke="#e8940a" strokeWidth="8" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ opacity: textFade, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ ...headline(44, BLACK), marginTop: 18 }}>ONE RULE.</p>
          <p style={{ ...headline(44, BLACK), marginTop: 8 }}>$2,100 A YEAR.</p>
          <p style={{ ...headline(118, ACCENT), marginTop: 4, lineHeight: 1.0 }}>$340K</p>
          <p style={{ ...headline(40, BLACK), marginTop: 4 }}>AT RETIREMENT.</p>
        </div>
        <div style={{ marginTop: 32, opacity: ctaFade, transform: `scale(${ctaScale})`, background: BLACK, borderRadius: 22, paddingTop: 22, paddingBottom: 22, paddingLeft: 48, paddingRight: 48 }}>
          <p style={{ ...headline(34, ACCENT) }}>FOLLOW FOR MONEY MOVES</p>
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
