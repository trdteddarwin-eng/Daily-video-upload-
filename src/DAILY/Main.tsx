import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

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
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ticketS = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const ticketY = interpolate(ticketS, [0, 1], [280, 0]);
  const pct = Math.floor(
    interpolate(frame, [20, 90], [0, 70], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const subOp = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barW = interpolate(frame, [0, 40], [0, 1080], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const nums = [7, 14, 23, 31, 42, 8];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 80, left: 0, width: barW, height: 8, background: ACCENT }} />
      <div style={{ position: 'absolute', bottom: 80, left: 0, width: barW, height: 8, background: ACCENT }} />

      <div style={{
        position: 'absolute', top: 260, left: '50%',
        transform: `translateX(-50%) translateY(${ticketY}px) scale(${ticketS})`,
      }}>
        <svg width="580" height="280" viewBox="0 0 580 280">
          <rect x="8" y="8" width="564" height="264" rx="20" fill="#1E1E1E" stroke={ACCENT} strokeWidth="5" />
          {[80, 165, 250, 335, 420, 505].map((x, i) => (
            <text key={i} x={x} y="56" fontSize="30" fill={ACCENT} textAnchor="middle">★</text>
          ))}
          <text x="290" y="128" fontSize="56" fill={WHITE} textAnchor="middle" fontFamily="Arial Black" letterSpacing="6">LOTTERY</text>
          {nums.map((n, i) => (
            <g key={i} transform={`translate(${56 + i * 88}, 214)`}>
              <circle r="30" fill={ACCENT} />
              <text x="0" y="10" fontSize="26" fill={BLACK} textAnchor="middle" fontFamily="Arial Black">{n}</text>
            </g>
          ))}
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 648, left: 0, right: 0, textAlign: 'center' }}>
        <span style={{ ...headline(200, ACCENT), display: 'block', lineHeight: 1 }}>{pct}%</span>
        <span style={{ ...headline(44, WHITE), display: 'block', marginTop: 12, opacity: subOp }}>
          GO BROKE IN 5 YEARS
        </span>
      </div>

      <div style={{
        position: 'absolute', bottom: 160, left: 60, right: 60, opacity: subOp,
        fontFamily: FONT, fontSize: 36, color: WHITE, textAlign: 'center', lineHeight: 1.5,
      }}>
        Here's the psychology no one tells you.
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const coffeeS = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const mansionS = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 100 } });
  const tagOp = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 60, right: 60, textAlign: 'center' }}>
        <p style={{ ...headline(50, BLACK) }}>BRAIN RECALIBRATES</p>
        <p style={{ ...headline(50, ACCENT), marginTop: 8 }}>WHAT'S "NORMAL"</p>
      </div>

      <div style={{
        position: 'absolute', top: 390, left: 80,
        transform: `scale(${coffeeS})`,
        transformOrigin: 'center center',
      }}>
        <svg width="200" height="240" viewBox="0 0 200 240">
          <rect x="35" y="90" width="110" height="120" rx="10" fill="#6B4226" />
          <rect x="25" y="78" width="130" height="22" rx="6" fill="#8B5E3C" />
          <path d="M 145 108 Q 186 108 186 144 Q 186 178 145 178" fill="none" stroke="#6B4226" strokeWidth="14" strokeLinecap="round" />
          <path d="M 72 74 Q 80 50 72 26" fill="none" stroke="#AAA" strokeWidth="3" strokeLinecap="round" />
          <path d="M 93 74 Q 101 46 93 18" fill="none" stroke="#AAA" strokeWidth="3" strokeLinecap="round" />
          <path d="M 114 74 Q 122 50 114 26" fill="none" stroke="#AAA" strokeWidth="3" strokeLinecap="round" />
          <text x="90" y="158" fontSize="18" fill={WHITE} textAnchor="middle" fontFamily="Arial Black">COFFEE</text>
        </svg>
        <div style={{
          marginTop: 10, background: ACCENT, color: BLACK,
          fontFamily: FONT, fontSize: 28, fontWeight: 900,
          padding: '8px 16px', borderRadius: 10, textAlign: 'center', opacity: tagOp,
        }}>$6 — CHEAP?</div>
      </div>

      <div style={{
        position: 'absolute', top: 330, right: 60,
        transform: `scale(${mansionS})`,
        transformOrigin: 'center center',
      }}>
        <svg width="280" height="300" viewBox="0 0 280 300">
          <rect x="30" y="148" width="220" height="148" fill="#D4A97A" stroke={BLACK} strokeWidth="3" />
          <polygon points="10,150 140,36 270,150" fill="#8B3A3A" stroke={BLACK} strokeWidth="3" />
          <rect x="105" y="236" width="70" height="60" rx="4" fill="#5C3D1E" />
          <circle cx="116" cy="268" r="5" fill={ACCENT} />
          <rect x="48" y="176" width="60" height="50" rx="4" fill="#87CEEB" stroke={BLACK} strokeWidth="2" />
          <rect x="172" y="176" width="60" height="50" rx="4" fill="#87CEEB" stroke={BLACK} strokeWidth="2" />
          <rect x="183" y="56" width="28" height="58" fill="#8B3A3A" />
        </svg>
        <div style={{
          marginTop: 10, background: BLACK, color: ACCENT,
          fontFamily: FONT, fontSize: 26, fontWeight: 900,
          padding: '8px 16px', borderRadius: 10, textAlign: 'center', opacity: tagOp,
        }}>$4M — REASONABLE?</div>
      </div>

      <div style={{
        position: 'absolute', bottom: 170, left: 60, right: 60, opacity: textOp,
        fontFamily: FONT, fontSize: 36, color: BLACK, textAlign: 'center', lineHeight: 1.5,
      }}>
        Millions rewire your brain's price anchors — and that's where the spending begins.
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const centerS = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const count = Math.floor(
    interpolate(frame, [30, 110], [0, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const textOp = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 110, left: 60, right: 60, textAlign: 'center' }}>
        <p style={{ ...headline(50, ACCENT) }}>THE SOCIAL TAX</p>
        <p style={{ ...headline(44, WHITE), marginTop: 8 }}>YEAR ONE</p>
      </div>

      <div style={{
        position: 'absolute', top: 460, left: '50%',
        transform: `translateX(-50%) translateY(-50%) scale(${centerS})`,
      }}>
        <svg width="520" height="520" viewBox="-260 -260 520 520">
          <circle cx="0" cy="-28" r="38" fill={ACCENT} />
          <rect x="-24" y="10" width="48" height="68" rx="10" fill={ACCENT} />
          <text x="0" y="94" fontSize="20" fill={ACCENT} textAnchor="middle" fontFamily="Arial Black">WINNER</text>
          {angles.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const px = Math.cos(rad) * 185;
            const py = Math.sin(rad) * 185;
            const revOp = interpolate(frame, [15 + i * 5, 35 + i * 5], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return (
              <g key={i} transform={`translate(${px}, ${py})`} opacity={revOp}>
                <circle cx="0" cy="-18" r="22" fill="#666" />
                <rect x="-14" y="4" width="28" height="42" rx="6" fill="#666" />
                <text x="0" y="-46" fontSize="22" fill={ACCENT} textAnchor="middle" fontFamily="Arial">$$$</text>
              </g>
            );
          })}
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 910, left: 0, right: 0, textAlign: 'center' }}>
        <span style={{ ...headline(130, ACCENT), display: 'block', lineHeight: 1 }}>{count}+</span>
        <span style={{ ...headline(36, WHITE), display: 'block', marginTop: 8 }}>REQUESTS IN YEAR ONE</span>
      </div>

      <div style={{
        position: 'absolute', bottom: 150, left: 60, right: 60, opacity: textOp,
        fontFamily: FONT, fontSize: 34, color: WHITE, textAlign: 'center', lineHeight: 1.5,
      }}>
        Most can't say no — giving away tens of thousands. Then the IRS takes its cut.
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const bar1W = interpolate(frame, [20, 65], [0, 900], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2W = interpolate(frame, [75, 115], [0, 540], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar3W = interpolate(frame, [125, 165], [0, 306], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label1Op = interpolate(frame, [65, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label2Op = interpolate(frame, [115, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label3Op = interpolate(frame, [165, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [185, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{
        position: 'absolute', top: 110, left: 60, right: 60, textAlign: 'center',
        transform: `scale(${titleS})`, transformOrigin: 'top center',
      }}>
        <p style={{ ...headline(52, BLACK) }}>WHAT YOU</p>
        <p style={{ ...headline(52, ACCENT), marginTop: 8 }}>ACTUALLY KEEP</p>
      </div>

      <div style={{ position: 'absolute', top: 380, left: 90, right: 90 }}>
        <div style={{ marginBottom: 44 }}>
          <div style={{ fontFamily: FONT, fontSize: 28, color: BLACK, marginBottom: 10 }}>JACKPOT</div>
          <div style={{ position: 'relative', height: 72, background: '#DDD', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: bar1W, height: '100%', background: ACCENT, borderRadius: 8 }} />
            <div style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              fontFamily: FONT, fontSize: 30, fontWeight: 900, color: BLACK, opacity: label1Op,
            }}>$50M</div>
          </div>
        </div>

        <div style={{ marginBottom: 44 }}>
          <div style={{ fontFamily: FONT, fontSize: 28, color: BLACK, marginBottom: 10 }}>LUMP SUM (−40%)</div>
          <div style={{ position: 'relative', height: 72, background: '#DDD', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: bar2W, height: '100%', background: '#F97316', borderRadius: 8 }} />
            <div style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              fontFamily: FONT, fontSize: 30, fontWeight: 900, color: BLACK, opacity: label2Op,
            }}>$30M</div>
          </div>
        </div>

        <div style={{ marginBottom: 44 }}>
          <div style={{ fontFamily: FONT, fontSize: 28, color: BLACK, marginBottom: 10 }}>AFTER 42% TAX</div>
          <div style={{ position: 'relative', height: 72, background: '#DDD', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, width: bar3W, height: '100%', background: '#EF4444', borderRadius: 8 }} />
            <div style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              fontFamily: FONT, fontSize: 30, fontWeight: 900, color: WHITE, opacity: label3Op,
            }}>~$17M</div>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 170, left: 60, right: 60, opacity: textOp,
        fontFamily: FONT, fontSize: 36, color: BLACK, textAlign: 'center', lineHeight: 1.5,
      }}>
        A $50M jackpot becomes $17M — and most winners blow through that in years two and three.
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const lineProgress = interpolate(frame, [20, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOp = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dashOffset = interpolate(lineProgress, [0, 1], [1300, 0]);
  const markerX = interpolate(lineProgress, [0, 1], [60, 820]);
  const peakT = 0.14;
  const markerY = lineProgress < peakT
    ? interpolate(lineProgress, [0, peakT], [280, 40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : interpolate(lineProgress, [peakT, 1], [40, 280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const months = ['WIN', 'M3', 'M6', 'M9', 'M12'];
  const mxs = [120, 280, 440, 600, 760];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 110, left: 60, right: 60, textAlign: 'center',
        transform: `scale(${titleS})`, transformOrigin: 'top center',
      }}>
        <p style={{ ...headline(48, WHITE) }}>HAPPINESS</p>
        <p style={{ ...headline(48, ACCENT), marginTop: 8 }}>RESETS IN 12 MONTHS</p>
      </div>

      <div style={{ position: 'absolute', top: 390, left: 80, right: 80 }}>
        <svg width="920" height="380" viewBox="0 0 920 380">
          <text x="8" y="44" fontSize="18" fill="#666" fontFamily="Arial">HIGH</text>
          <text x="8" y="164" fontSize="18" fill="#666" fontFamily="Arial">MID</text>
          <text x="8" y="284" fontSize="18" fill="#666" fontFamily="Arial">BASE</text>
          <line x1="55" y1="40" x2="880" y2="40" stroke="#333" strokeWidth="1" strokeDasharray="6,4" />
          <line x1="55" y1="160" x2="880" y2="160" stroke="#333" strokeWidth="1" strokeDasharray="6,4" />
          <line x1="55" y1="280" x2="880" y2="280" stroke="#444" strokeWidth="2" />
          {months.map((m, i) => (
            <text key={i} x={mxs[i]} y="330" fontSize="18" fill={m === 'WIN' ? ACCENT : '#666'} fontFamily="Arial Black" textAnchor="middle">{m}</text>
          ))}
          <line x1="120" y1="40" x2="120" y2="280" stroke={ACCENT} strokeWidth="2" strokeDasharray="4,4" />
          <path
            d="M 60 280 C 80 280 100 40 160 40 C 300 40 480 280 820 280"
            fill="none"
            stroke={ACCENT}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="1300"
            strokeDashoffset={dashOffset}
          />
          <circle cx={markerX} cy={markerY} r="14" fill={ACCENT} />
          <circle cx={markerX} cy={markerY} r="22" fill="none" stroke={ACCENT} strokeWidth="3" opacity="0.4" />
        </svg>
      </div>

      <div style={{
        position: 'absolute', bottom: 150, left: 60, right: 60, opacity: textOp,
        fontFamily: FONT, fontSize: 34, color: WHITE, textAlign: 'center', lineHeight: 1.5,
      }}>
        The mansion feels ordinary in six months. Happiness resets — but the spending never stops.
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bankS = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const rule1Op = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rule2Op = interpolate(frame, [75, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rule3Op = interpolate(frame, [110, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const coinY1 = interpolate(frame, [10, 55], [20, 72], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin1Op = interpolate(frame, [53, 62], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinY2 = interpolate(frame, [90, 135], [20, 72], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coin2Op = interpolate(frame, [133, 142], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rules = [
    { num: '01', text: 'Wait 6 months before spending', op: rule1Op },
    { num: '02', text: 'Invest 80% in index funds', op: rule2Op },
    { num: '03', text: 'Tell as few people as possible', op: rule3Op },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 100, left: 60, right: 60, textAlign: 'center' }}>
        <p style={{ ...headline(52, BLACK) }}>WINDFALL RULES</p>
        <p style={{ ...headline(52, ACCENT), marginTop: 8 }}>PROTECT YOURSELF</p>
      </div>

      <div style={{
        position: 'absolute', top: 300, left: '50%',
        transform: `translateX(-50%) scale(${bankS})`,
      }}>
        <svg width="280" height="230" viewBox="0 0 280 230">
          <ellipse cx="126" cy="148" rx="104" ry="76" fill="#F9A8D4" stroke="#C084FC" strokeWidth="4" />
          <circle cx="216" cy="112" r="46" fill="#F9A8D4" stroke="#C084FC" strokeWidth="4" />
          <ellipse cx="205" cy="72" rx="14" ry="10" fill="#C084FC" />
          <circle cx="229" cy="102" r="5" fill={BLACK} />
          <ellipse cx="255" cy="122" rx="17" ry="12" fill="#F472B6" stroke="#C084FC" strokeWidth="2" />
          <circle cx="249" cy="122" r="3" fill={BLACK} />
          <circle cx="260" cy="122" r="3" fill={BLACK} />
          <rect x="108" y="74" width="36" height="8" rx="4" fill="#C084FC" />
          <rect x="108" y={coinY1} width="16" height="10" rx="5" fill={ACCENT} opacity={coin1Op} />
          <rect x="120" y={coinY2} width="16" height="10" rx="5" fill={ACCENT} opacity={coin2Op} />
          {[40, 80, 138, 178].map((lx, i) => (
            <rect key={i} x={lx} y="212" width="22" height="14" rx="4" fill="#F9A8D4" stroke="#C084FC" strokeWidth="2" />
          ))}
          <path d="M 22 148 Q 4 128 12 108 Q 22 88 10 76" fill="none" stroke="#C084FC" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 620, left: 80, right: 80 }}>
        {rules.map(({ num, text, op }) => (
          <div key={num} style={{ display: 'flex', alignItems: 'center', marginBottom: 28, opacity: op }}>
            <span style={{ ...headline(52, ACCENT), minWidth: 88, textAlign: 'left' }}>{num}</span>
            <span style={{ fontFamily: FONT, fontSize: 34, color: BLACK, lineHeight: 1.3, marginLeft: 18 }}>{text}</span>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 100, left: 60, right: 60, opacity: ctaOp, textAlign: 'center',
        background: ACCENT, borderRadius: 24, padding: '26px 0',
        fontFamily: FONT, fontSize: 42, color: BLACK, fontWeight: 900, letterSpacing: '0.1em',
      }}>
        FOLLOW FOR MORE
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
