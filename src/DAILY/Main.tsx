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

  const headIn = spring({ frame, fps, config: { damping: 14, stiffness: 180 }, durationInFrames: 40 });
  const headY = interpolate(headIn, [0, 1], [-120, 0]);

  const cardIn = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 12, stiffness: 120 }, durationInFrames: 50 });
  const cardY = interpolate(cardIn, [0, 1], [280, 0]);

  const countProgress = interpolate(frame, [30, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const displayAmt = Math.round(1463 * countProgress);

  const hookOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center top, #2a0808 0%, #121212 60%)' }} />

      <div style={{ position: 'absolute', top: 160, left: 0, right: 0, transform: `translateY(${headY}px)`, padding: '0 60px' }}>
        <p style={headline(56, WHITE)}>THE HOLIDAY</p>
        <p style={{ ...headline(56, ACCENT), marginTop: 8 }}>DEBT TRAP</p>
      </div>

      <div style={{ position: 'absolute', top: 460, left: '50%', transform: `translate(-50%, ${cardY}px)` }}>
        <svg width="380" height="240" viewBox="0 0 380 240">
          <rect x="0" y="0" width="380" height="240" rx="20" fill="#1e1e1e" stroke={ACCENT} strokeWidth="3" />
          <rect x="0" y="52" width="380" height="52" fill="#2a2a2a" />
          <rect x="30" y="100" width="56" height="44" rx="6" fill="#c8a84b" />
          <line x1="30" y1="122" x2="86" y2="122" stroke="#a08030" strokeWidth="2" />
          <line x1="58" y1="100" x2="58" y2="144" stroke="#a08030" strokeWidth="2" />
          <text x="30" y="175" fontFamily="monospace" fontSize="26" fill={WHITE} letterSpacing="6">•••• •••• ••••</text>
          <text x="300" y="175" fontFamily="monospace" fontSize="26" fill={WHITE}>1234</text>
          <text x="30" y="215" fontFamily="Arial" fontSize="18" fill="#aaa">HOLIDAY SPENDING</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 300, left: 0, right: 0, textAlign: 'center' }}>
        <p style={{ ...headline(30, '#888'), marginBottom: 8 }}>AVERAGE JANUARY DEBT</p>
        <p style={{ ...headline(100, ACCENT), marginTop: 0 }}>${displayAmt.toLocaleString()}</p>
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 60, right: 60, opacity: hookOpacity }}>
        <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, textAlign: 'center', lineHeight: 1.4, margin: 0 }}>
          73% of Americans are still paying for Christmas in April.
        </p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const box1s = spring({ frame, fps, config: { damping: 14, stiffness: 150 }, durationInFrames: 45 });
  const box2s = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 14, stiffness: 150 }, durationInFrames: 45 });
  const box3s = spring({ frame: Math.max(0, frame - 36), fps, config: { damping: 14, stiffness: 150 }, durationInFrames: 45 });

  const box1Scale = interpolate(box1s, [0, 1], [0, 1]);
  const box2Scale = interpolate(box2s, [0, 1], [0, 1]);
  const box3Scale = interpolate(box3s, [0, 1], [0, 1]);

  const statOpacity = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 120, left: 60, right: 60 }}>
        <p style={{ ...headline(48, BLACK), margin: 0 }}>GUILT IS</p>
        <p style={{ ...headline(48, ACCENT), marginTop: 8 }}>THE PRODUCT</p>
      </div>

      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '40px', alignItems: 'flex-end' }}>
        <div style={{ transform: `scale(${box1Scale})`, transformOrigin: 'bottom center' }}>
          <svg width="130" height="150" viewBox="0 0 130 150">
            <rect x="10" y="52" width="110" height="88" rx="4" fill={ACCENT} />
            <rect x="10" y="38" width="110" height="22" rx="4" fill="#c73333" />
            <line x1="65" y1="38" x2="65" y2="140" stroke="#ff9999" strokeWidth="8" />
            <line x1="10" y1="49" x2="120" y2="49" stroke="#ff9999" strokeWidth="8" />
            <ellipse cx="45" cy="38" rx="20" ry="12" fill="#ff9999" />
            <ellipse cx="85" cy="38" rx="20" ry="12" fill="#ff9999" />
            <circle cx="65" cy="38" r="10" fill="#c73333" />
            <text x="65" y="106" textAnchor="middle" fontFamily="Arial Black" fontSize="36" fill={WHITE}>$</text>
          </svg>
        </div>
        <div style={{ transform: `scale(${box2Scale})`, transformOrigin: 'bottom center' }}>
          <svg width="160" height="192" viewBox="0 0 160 192">
            <rect x="10" y="62" width="140" height="120" rx="4" fill="#b02020" />
            <rect x="10" y="46" width="140" height="24" rx="4" fill="#891616" />
            <line x1="80" y1="46" x2="80" y2="182" stroke="#ff7777" strokeWidth="10" />
            <line x1="10" y1="58" x2="150" y2="58" stroke="#ff7777" strokeWidth="10" />
            <ellipse cx="55" cy="46" rx="25" ry="15" fill="#ff7777" />
            <ellipse cx="105" cy="46" rx="25" ry="15" fill="#ff7777" />
            <circle cx="80" cy="46" r="12" fill="#891616" />
            <text x="80" y="138" textAnchor="middle" fontFamily="Arial Black" fontSize="52" fill={WHITE}>$</text>
          </svg>
        </div>
        <div style={{ transform: `scale(${box3Scale})`, transformOrigin: 'bottom center' }}>
          <svg width="130" height="150" viewBox="0 0 130 150">
            <rect x="10" y="52" width="110" height="88" rx="4" fill="#d94040" />
            <rect x="10" y="38" width="110" height="22" rx="4" fill="#b02828" />
            <line x1="65" y1="38" x2="65" y2="140" stroke="#ffaaaa" strokeWidth="8" />
            <line x1="10" y1="49" x2="120" y2="49" stroke="#ffaaaa" strokeWidth="8" />
            <ellipse cx="45" cy="38" rx="20" ry="12" fill="#ffaaaa" />
            <ellipse cx="85" cy="38" rx="20" ry="12" fill="#ffaaaa" />
            <circle cx="65" cy="38" r="10" fill="#b02828" />
            <text x="65" y="106" textAnchor="middle" fontFamily="Arial Black" fontSize="36" fill={WHITE}>$</text>
          </svg>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 200, left: 60, right: 60, opacity: statOpacity }}>
        <p style={{ fontFamily: FONT, fontSize: 36, color: BLACK, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
          Retailers spend{' '}
          <span style={{ color: ACCENT }}>$23 billion</span>
          {' '}engineering the guilt of giving less.
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, opacity: statOpacity }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: '#555', textAlign: 'center', margin: 0 }}>
          And next scene shows what it costs you.
        </p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const statIn = spring({ frame, fps, config: { damping: 14, stiffness: 180 }, durationInFrames: 40 });
  const statScale = interpolate(statIn, [0, 1], [0.3, 1]);

  const barProgress = interpolate(frame, [30, 160], [0, 0.73], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barWidth = barProgress * 820;

  const countProgress = interpolate(frame, [40, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const displayAmt = Math.round(1463 * countProgress);

  const bridgeOpacity = interpolate(frame, [160, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #1a0505 0%, #121212 70%)' }} />

      <div style={{ position: 'absolute', top: 120, left: 0, right: 0 }}>
        <p style={{ ...headline(44, WHITE), margin: 0 }}>THE NUMBERS</p>
        <p style={{ ...headline(40, '#888'), marginTop: 8 }}>DON'T LIE</p>
      </div>

      <div style={{ position: 'absolute', top: 320, left: 0, right: 0, transform: `scale(${statScale})` }}>
        <p style={{ ...headline(140, ACCENT), margin: 0 }}>73%</p>
        <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, textAlign: 'center', margin: '8px 0 0', letterSpacing: '0.08em' }}>
          OF AMERICANS TAKE ON HOLIDAY DEBT
        </p>
      </div>

      <div style={{ position: 'absolute', top: 660, left: 80, right: 80 }}>
        <div style={{ height: 28, borderRadius: 14, background: '#333', overflow: 'hidden' }}>
          <div style={{ height: 28, width: barWidth, borderRadius: 14, background: `linear-gradient(90deg, #991111, ${ACCENT})` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <span style={{ fontFamily: FONT, fontSize: 24, color: '#666' }}>0%</span>
          <span style={{ fontFamily: FONT, fontSize: 24, color: ACCENT }}>73%</span>
          <span style={{ fontFamily: FONT, fontSize: 24, color: '#666' }}>100%</span>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 240, left: 0, right: 0, textAlign: 'center' }}>
        <p style={{ ...headline(28, '#888'), margin: 0 }}>AVERAGE HOLIDAY DEBT CARRIED</p>
        <p style={{ ...headline(96, ACCENT), marginTop: 12 }}>${displayAmt.toLocaleString()}</p>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 60, right: 60, opacity: bridgeOpacity }}>
        <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, textAlign: 'center', lineHeight: 1.4, margin: 0 }}>
          And the bill doesn't arrive until January.
        </p>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const months = ['JAN', 'FEB', 'MAR', 'APR'];
  const calColors = ['#EF4444', '#d93333', '#c82222', '#b01818'];

  const statOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 100, left: 60, right: 60 }}>
        <p style={{ ...headline(44, BLACK), margin: 0 }}>THE JANUARY</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 8 }}>HANGOVER</p>
      </div>

      <div style={{ position: 'absolute', top: 340, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '24px' }}>
        {months.map((month, i) => {
          const delay = i * 22;
          const cardIn = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 14, stiffness: 160 }, durationInFrames: 45 });
          const cardY = interpolate(cardIn, [0, 1], [200, 0]);
          const cardOpacity = interpolate(cardIn, [0, 0.3, 1], [0, 1, 1]);
          return (
            <div key={month} style={{ transform: `translateY(${cardY}px)`, opacity: cardOpacity }}>
              <svg width="176" height="208" viewBox="0 0 176 208">
                <rect x="0" y="0" width="176" height="208" rx="16" fill={WHITE} stroke={calColors[i]} strokeWidth="3" />
                <rect x="0" y="0" width="176" height="56" rx="16" fill={calColors[i]} />
                <rect x="0" y="40" width="176" height="16" fill={calColors[i]} />
                <circle cx="50" cy="4" r="10" fill="#ddd" />
                <circle cx="126" cy="4" r="10" fill="#ddd" />
                <text x="88" y="37" textAnchor="middle" fontFamily="Arial Black" fontSize="22" fill={WHITE}>{month}</text>
                <text x="88" y="145" textAnchor="middle" fontFamily="Arial Black" fontSize="58" fill={calColors[i]}>$</text>
                <text x="88" y="192" textAnchor="middle" fontFamily="Arial" fontSize="30" fill={calColors[i]}>↓</text>
              </svg>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 240, left: 60, right: 60, opacity: statOpacity }}>
        <p style={{ fontFamily: FONT, fontSize: 36, color: BLACK, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
          4 months of interest payments.
          <br />
          <span style={{ color: ACCENT }}>For Christmas gifts.</span>
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 0, right: 0, opacity: statOpacity }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: '#555', textAlign: 'center', margin: 0 }}>
          26% spend more than they earn in December.
        </p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotation = interpolate(frame, [0, dur], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const label1Opacity = interpolate(frame, [10, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label2Opacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label3Opacity = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label4Opacity = interpolate(frame, [100, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const bridgeOpacity = interpolate(frame, [160, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, #1a0505 0%, #121212 70%)' }} />

      <div style={{ position: 'absolute', top: 100, left: 0, right: 0 }}>
        <p style={{ ...headline(42, WHITE), margin: 0 }}>THE TRAP</p>
        <p style={{ ...headline(42, ACCENT), marginTop: 4 }}>REPEATS EVERY YEAR</p>
      </div>

      <div style={{ position: 'absolute', top: 390, left: '50%', transform: 'translateX(-50%)', width: 540, height: 540 }}>
        <svg width="540" height="540" viewBox="0 0 540 540">
          <circle cx="270" cy="270" r="200" fill="none" stroke="#333" strokeWidth="8" />
          <g transform={`rotate(${rotation}, 270, 270)`}>
            <circle cx="270" cy="270" r="200" fill="none" stroke={ACCENT} strokeWidth="8" strokeDasharray="80 980" strokeLinecap="round" />
            <polygon points="270,70 258,100 282,100" fill={ACCENT} />
          </g>
          <circle cx="270" cy="270" r="80" fill="#1a0505" stroke={ACCENT} strokeWidth="3" />
          <text x="270" y="263" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill={WHITE}>ANNUAL</text>
          <text x="270" y="290" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill={ACCENT}>CYCLE</text>
        </svg>

        <div style={{ position: 'absolute', top: -32, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', opacity: label1Opacity }}>
          <p style={{ ...headline(24, ACCENT), margin: 0 }}>NOV</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#ccc', margin: 0 }}>spending starts</p>
        </div>
        <div style={{ position: 'absolute', top: 220, right: -110, textAlign: 'left', opacity: label2Opacity }}>
          <p style={{ ...headline(24, ACCENT), margin: 0 }}>DEC</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#ccc', margin: 0 }}>maxed out</p>
        </div>
        <div style={{ position: 'absolute', bottom: -32, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', opacity: label3Opacity }}>
          <p style={{ ...headline(24, ACCENT), margin: 0 }}>JAN-APR</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#ccc', margin: 0 }}>paying it off</p>
        </div>
        <div style={{ position: 'absolute', top: 220, left: -110, textAlign: 'right', opacity: label4Opacity }}>
          <p style={{ ...headline(24, ACCENT), margin: 0 }}>OCT</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: '#ccc', margin: 0 }}>starts again</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 120, left: 60, right: 60, opacity: bridgeOpacity }}>
        <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, textAlign: 'center', lineHeight: 1.4, margin: 0 }}>
          But there's one move that breaks the loop for good.
        </p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyIn = spring({ frame, fps, config: { damping: 12, stiffness: 140 }, durationInFrames: 50 });
  const piggyScale = interpolate(piggyIn, [0, 1], [0.2, 1]);

  const textIn = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 14, stiffness: 180 }, durationInFrames: 40 });
  const textY = interpolate(textIn, [0, 1], [80, 0]);

  const savingsProgress = interpolate(frame, [60, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const displaySavings = Math.round(410 * savingsProgress);

  const ctaOpacity = interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 80, left: 60, right: 60, transform: `translateY(${textY}px)` }}>
        <p style={{ ...headline(48, BLACK), margin: 0 }}>BREAK THE</p>
        <p style={{ ...headline(48, ACCENT), marginTop: 8 }}>CYCLE</p>
      </div>

      <div style={{ position: 'absolute', top: 350, left: '50%', transform: `translateX(-50%) scale(${piggyScale})`, transformOrigin: 'center center' }}>
        <svg width="320" height="300" viewBox="0 0 320 300">
          <ellipse cx="150" cy="180" rx="130" ry="100" fill="#ffb5a0" />
          <circle cx="265" cy="145" r="65" fill="#ffb5a0" />
          <ellipse cx="258" cy="90" rx="22" ry="18" fill="#ff9988" />
          <ellipse cx="258" cy="90" rx="14" ry="11" fill="#ffb5a0" />
          <ellipse cx="310" cy="155" rx="24" ry="18" fill="#ff9988" />
          <circle cx="304" cy="152" r="5" fill="#cc7766" />
          <circle cx="316" cy="152" r="5" fill="#cc7766" />
          <circle cx="285" cy="128" r="8" fill={WHITE} />
          <circle cx="287" cy="128" r="5" fill={BLACK} />
          <rect x="130" y="78" width="40" height="8" rx="4" fill="#cc8870" />
          <rect x="80" y="258" width="30" height="36" rx="8" fill="#ffb5a0" />
          <rect x="128" y="260" width="30" height="36" rx="8" fill="#ffb5a0" />
          <rect x="176" y="260" width="30" height="36" rx="8" fill="#ffb5a0" />
          <rect x="222" y="258" width="30" height="36" rx="8" fill="#ffb5a0" />
          <text x="142" y="195" textAnchor="middle" fontFamily="Arial Black" fontSize="52" fill="#cc8870">$</text>
          <path d="M20,170 Q5,155 20,140 Q35,125 20,110" stroke="#ff9988" strokeWidth="8" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 300, left: 0, right: 0, textAlign: 'center' }}>
        <p style={{ ...headline(28, '#666'), margin: 0 }}>AVG SAVINGS WITH A GIFT CAP</p>
        <p style={{ ...headline(100, ACCENT), marginTop: 8 }}>${displaySavings}</p>
        <p style={{ ...headline(24, '#888'), marginTop: 4 }}>PER PERSON</p>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 60, right: 60, opacity: ctaOpacity }}>
        <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
          Set your limit <span style={{ color: ACCENT }}>BEFORE</span> you shop —{' '}
          not after.
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
