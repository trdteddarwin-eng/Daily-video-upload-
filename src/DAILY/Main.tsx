import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0A0A0A';
const BG_LIGHT = '#F7F7F7';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const docIn = spring({ frame: Math.max(0, frame - 15), fps, config: { damping: 13, stiffness: 150 } });
  const statIn = spring({ frame: Math.max(0, frame - 70), fps, config: { damping: 10, stiffness: 200 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 200, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(80, WHITE)}>YOUR FUND</p>
          <p style={{ ...headline(80, ACCENT), marginTop: 8 }}>LOST MONEY</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          <g transform={`translate(540,970) scale(${docIn})`}>
            <rect x="-210" y="-270" width="420" height="540" rx="14" fill="#fff" />
            <rect x="-210" y="-270" width="420" height="78" rx="14" fill={ACCENT} />
            <rect x="-210" y="-228" width="420" height="36" fill={ACCENT} />
            <text x="0" y="-234" textAnchor="middle" fontFamily="Arial Black" fontSize="28" fill="#fff">IRS NOTICE</text>
            <text x="0" y="-195" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill="#fff">CAPITAL GAINS TAX DUE</text>
            <rect x="-170" y="-158" width="340" height="10" rx="5" fill="#ddd" />
            <rect x="-170" y="-128" width="260" height="10" rx="5" fill="#ddd" />
            <rect x="-170" y="-98" width="300" height="10" rx="5" fill="#ddd" />
            <rect x="-170" y="-68" width="230" height="10" rx="5" fill="#ddd" />
            <line x1="-170" y1="-28" x2="170" y2="-28" stroke="#ccc" strokeWidth="2" />
            <text x="-168" y="22" fontFamily="Arial Black" fontSize="20" fill="#888">AMOUNT DUE:</text>
            <text x="0" y="96" textAnchor="middle" fontFamily="Arial Black" fontSize="62" fill={ACCENT}>$1,842</text>
            <polyline points="-158,186 -106,174 -54,180 2,158 58,142 110,118 155,92 170,78"
              stroke={ACCENT} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="186,66 158,96 144,78" fill={ACCENT} />
          </g>
        </svg>

        <div style={{
          position: 'absolute', bottom: 200, left: 0, right: 0, textAlign: 'center',
          opacity: statIn, transform: `scale(${statIn})`,
        }}>
          <p style={headline(44, '#777')}>IRS STILL WANTS</p>
          <p style={{ ...headline(102, ACCENT), marginTop: 4 }}>$1,842</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const managerIn = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 150 } });
  const arrow1In = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 11, stiffness: 180 } });
  const arrow2In = spring({ frame: Math.max(0, frame - 56), fps, config: { damping: 11, stiffness: 180 } });
  const arrow3In = spring({ frame: Math.max(0, frame - 72), fps, config: { damping: 11, stiffness: 180 } });
  const taglineIn = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 10, stiffness: 200 } });

  const investors = [
    { x: -280, arrowIn: arrow1In },
    { x: 0, arrowIn: arrow2In },
    { x: 280, arrowIn: arrow3In },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 200, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(76, '#111')}>HOW IT</p>
          <p style={{ ...headline(76, ACCENT), marginTop: 8 }}>WORKS</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Fund manager */}
          <g transform={`translate(540,680) scale(${managerIn * 1.5})`}>
            <circle cx="0" cy="-60" r="48" fill="#555" />
            <rect x="-52" y="-10" width="104" height="110" rx="12" fill="#555" />
            <rect x="-90" y="-72" width="180" height="30" rx="8" fill={ACCENT} />
            <text x="0" y="-50" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill="#fff">FUND MANAGER</text>
          </g>

          {investors.map((inv, i) => (
            <g key={i}>
              <line
                x1="540" y1="816"
                x2={540 + inv.x} y2="1150"
                stroke={ACCENT}
                strokeWidth={interpolate(inv.arrowIn, [0, 1], [0, 5])}
                strokeLinecap="round"
                strokeDasharray="12 8"
                opacity={inv.arrowIn}
              />
              <text
                x={540 + inv.x * 0.48}
                y={960}
                textAnchor="middle"
                fontFamily="Arial Black"
                fontSize="36"
                fill={ACCENT}
                opacity={inv.arrowIn}
              >$</text>
              <g transform={`translate(${540 + inv.x},1230) scale(${inv.arrowIn * 1.2})`}>
                <circle cx="0" cy="-40" r="30" fill="#777" />
                <rect x="-32" y="-8" width="64" height="68" rx="8" fill="#777" />
              </g>
            </g>
          ))}
        </svg>

        <div style={{
          position: 'absolute', bottom: 230, left: 0, right: 0, textAlign: 'center',
          opacity: taglineIn,
          transform: `translateY(${interpolate(taglineIn, [0, 1], [20, 0])}px)`,
        }}>
          <p style={headline(46, '#333')}>YOU DIDN'T SELL.</p>
          <p style={{ ...headline(46, ACCENT), marginTop: 8 }}>YOU STILL OWE.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const chartIn = interpolate(frame, [15, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const docIn = spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 11, stiffness: 175 } });
  const statIn = spring({ frame: Math.max(0, frame - 115), fps, config: { damping: 10, stiffness: 200 } });

  const chartXs = [160, 240, 320, 400, 480, 560, 640, 720, 800, 880];
  const chartYs = [720, 710, 740, 718, 755, 806, 872, 975, 1072, 1182];
  const visibleCount = Math.max(2, Math.floor(chartIn * chartXs.length));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 200, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(78, WHITE)}>2022: DOWN 18%</p>
          <p style={{ ...headline(78, ACCENT), marginTop: 8 }}>TAXED ANYWAY</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          <line x1="140" y1="680" x2="140" y2="1210" stroke="#444" strokeWidth="3" />
          <line x1="140" y1="1210" x2="910" y2="1210" stroke="#444" strokeWidth="3" />
          <text x="130" y="650" textAnchor="end" fontFamily="Arial" fontSize="22" fill="#666">HIGH</text>
          <text x="910" y="1250" textAnchor="middle" fontFamily="Arial" fontSize="22" fill="#666">2022</text>

          {visibleCount >= 2 && (
            <polyline
              points={chartXs.slice(0, visibleCount).map((x, i) => `${x},${chartYs[i]}`).join(' ')}
              stroke={ACCENT} strokeWidth="7" fill="none"
              strokeLinecap="round" strokeLinejoin="round"
            />
          )}

          <g transform={`translate(770,1120) scale(${docIn})`}>
            <rect x="-180" y="-130" width="360" height="260" rx="14" fill="#fff" />
            <rect x="-180" y="-130" width="360" height="62" rx="14" fill={ACCENT} />
            <rect x="-180" y="-96" width="360" height="28" fill={ACCENT} />
            <text x="0" y="-100" textAnchor="middle" fontFamily="Arial Black" fontSize="22" fill="#fff">IRS NOTICE</text>
            <text x="0" y="-66" textAnchor="middle" fontFamily="Arial Black" fontSize="17" fill="#fff">YOU OWE TAXES</text>
            <text x="0" y="34" textAnchor="middle" fontFamily="Arial Black" fontSize="48" fill={ACCENT}>$1,842</text>
          </g>
        </svg>

        <div style={{
          position: 'absolute', bottom: 200, left: 0, right: 0, textAlign: 'center',
          opacity: statIn, transform: `scale(${statIn})`,
        }}>
          <p style={headline(40, '#777')}>FUNDS DISTRIBUTED</p>
          <p style={{ ...headline(102, ACCENT), marginTop: 4 }}>$1.3T</p>
          <p style={{ ...headline(40, '#777'), marginTop: 4 }}>IN CAPITAL GAINS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const personIn = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14, stiffness: 150 } });
  const lossIn = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 11, stiffness: 175 } });
  const taxIn = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 11, stiffness: 175 } });
  const statIn = spring({ frame: Math.max(0, frame - 92), fps, config: { damping: 10, stiffness: 200 } });

  const coinCount = 4;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 200, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(78, '#111')}>YOU LOSE</p>
          <p style={{ ...headline(78, ACCENT), marginTop: 8 }}>TWICE</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          <g transform={`translate(540,760) scale(${personIn * 1.5})`}>
            <circle cx="0" cy="-80" r="52" fill="#555" />
            <rect x="-56" y="-26" width="112" height="130" rx="14" fill="#555" />
            <rect x="-24" y="-96" width="48" height="40" rx="4" fill="#888" />
          </g>

          <g opacity={lossIn}>
            <line x1="462" y1="1002" x2="228" y2="1202"
              stroke={ACCENT} strokeWidth="8" strokeLinecap="round" />
            <polygon points="206,1218 254,1186 242,1230" fill={ACCENT} />
            <rect x="78" y="1218" width="230" height="76" rx="12" fill={ACCENT} />
            <text x="193" y="1270" textAnchor="middle" fontFamily="Arial Black" fontSize="34" fill="#fff">-18% LOSS</text>
          </g>

          <g opacity={taxIn}>
            <line x1="618" y1="1002" x2="852" y2="1202"
              stroke="#222" strokeWidth="8" strokeLinecap="round" />
            <polygon points="874,1218 826,1186 838,1230" fill="#222" />
            <rect x="722" y="1218" width="250" height="76" rx="12" fill="#222" />
            <text x="847" y="1270" textAnchor="middle" fontFamily="Arial Black" fontSize="30" fill={ACCENT}>$1,842 TAX</text>
          </g>

          {Array.from({ length: Math.max(0, Math.floor(coinCount)) }).map((_, i) => {
            const df = Math.max(0, frame - (45 + i * 14));
            const coinOp = interpolate(df, [0, 8], [0, 1], { extrapolateRight: 'clamp' });
            return (
              <g key={i} opacity={coinOp}
                transform={`translate(${198 + i * 28},${1118 + i * 24})`}>
                <ellipse cx="0" cy="0" rx="22" ry="8" fill="#C8930A" />
                <text x="0" y="4" textAnchor="middle" fontFamily="Arial Black" fontSize="12" fill="#8B6914">$</text>
              </g>
            );
          })}
        </svg>

        <div style={{
          position: 'absolute', bottom: 200, left: 0, right: 0, textAlign: 'center',
          opacity: statIn, transform: `scale(${statIn})`,
        }}>
          <p style={headline(44, '#333')}>ZERO CHOICES.</p>
          <p style={{ ...headline(44, ACCENT), marginTop: 8 }}>100% YOUR PROBLEM.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const etfIn = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 13, stiffness: 160 } });
  const fundIn = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 13, stiffness: 160 } });
  const statIn = spring({ frame: Math.max(0, frame - 85), fps, config: { damping: 10, stiffness: 200 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 200, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(76, WHITE)}>THE FIX:</p>
          <p style={{ ...headline(76, ACCENT), marginTop: 8 }}>USE ETFs</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          <g transform={`translate(260,960) scale(${etfIn})`}>
            <rect x="-220" y="-300" width="440" height="560" rx="20" fill="#0a1f15" stroke="#10B981" strokeWidth="6" />
            <rect x="-220" y="-300" width="440" height="80" rx="20" fill="#10B981" />
            <rect x="-220" y="-258" width="440" height="36" fill="#10B981" />
            <text x="0" y="-266" textAnchor="middle" fontFamily="Arial Black" fontSize="38" fill="#fff">ETF</text>
            <text x="0" y="-228" textAnchor="middle" fontFamily="Arial Black" fontSize="18" fill="#fff">EXCHANGE TRADED FUND</text>
            <path d="M -58,20 L -18,72 L 68,-28" stroke="#10B981" strokeWidth="16" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="0" y="144" textAnchor="middle" fontFamily="Arial Black" fontSize="52" fill="#10B981">NEAR 0%</text>
            <text x="0" y="196" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill="#aaa">DISTRIBUTIONS</text>
          </g>

          <g transform={`translate(820,960) scale(${fundIn})`}>
            <rect x="-220" y="-300" width="440" height="560" rx="20" fill="#1f0a0a" stroke={ACCENT} strokeWidth="6" />
            <rect x="-220" y="-300" width="440" height="80" rx="20" fill={ACCENT} />
            <rect x="-220" y="-258" width="440" height="36" fill={ACCENT} />
            <text x="0" y="-266" textAnchor="middle" fontFamily="Arial Black" fontSize="28" fill="#fff">MUTUAL</text>
            <text x="0" y="-228" textAnchor="middle" fontFamily="Arial Black" fontSize="28" fill="#fff">FUND</text>
            <path d="M -50,-28 L 50,72 M 50,-28 L -50,72" stroke={ACCENT} strokeWidth="16" strokeLinecap="round" />
            <text x="0" y="144" textAnchor="middle" fontFamily="Arial Black" fontSize="52" fill={ACCENT}>80%</text>
            <text x="0" y="196" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill="#aaa">DISTRIBUTE GAINS</text>
          </g>
        </svg>

        <div style={{
          position: 'absolute', bottom: 200, left: 0, right: 0, textAlign: 'center',
          opacity: statIn,
          transform: `translateY(${interpolate(statIn, [0, 1], [20, 0])}px)`,
        }}>
          <p style={headline(44, '#888')}>SAME MARKET. WAY LESS TAX.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 140 } });
  const formIn = spring({ frame: Math.max(0, frame - 12), fps, config: { damping: 13, stiffness: 150 } });
  const highlightIn = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 11, stiffness: 180 } });
  const ctaIn = spring({ frame: Math.max(0, frame - 88), fps, config: { damping: 10, stiffness: 200 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <div style={{
          position: 'absolute', top: 200, left: 0, right: 0,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
        }}>
          <p style={headline(68, '#111')}>CHECK YOUR</p>
          <p style={{ ...headline(68, ACCENT), marginTop: 8 }}>1099-DIV</p>
        </div>

        <svg width="1080" height="1920" viewBox="0 0 1080 1920"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          <g transform={`translate(540,920) scale(${formIn})`}>
            <rect x="-300" y="-330" width="600" height="600" rx="12" fill="#fff" stroke="#ddd" strokeWidth="3" />
            <rect x="-300" y="-330" width="600" height="68" rx="12" fill="#1a365d" />
            <rect x="-300" y="-294" width="600" height="32" fill="#1a365d" />
            <text x="0" y="-296" textAnchor="middle" fontFamily="Arial Black" fontSize="22" fill="#fff">FORM 1099-DIV</text>
            <text x="0" y="-260" textAnchor="middle" fontFamily="Arial Black" fontSize="16" fill="#aaa">DIVIDENDS AND DISTRIBUTIONS</text>
            <text x="-270" y="-190" fontFamily="Arial" fontSize="18" fill="#555">1a. Total ordinary dividends</text>
            <rect x="-270" y="-172" width="540" height="38" rx="6" fill="#f5f5f5" stroke="#ddd" strokeWidth="2" />
            <text x="-248" y="-146" fontFamily="Arial" fontSize="22" fill="#999">$0.00</text>
            <text x="-270" y="-90" fontFamily="Arial" fontSize="18" fill="#555">1b. Qualified dividends</text>
            <rect x="-270" y="-72" width="540" height="38" rx="6" fill="#f5f5f5" stroke="#ddd" strokeWidth="2" />
            <text x="-248" y="-46" fontFamily="Arial" fontSize="22" fill="#999">$0.00</text>
            <text x="-270" y="12" fontFamily="Arial Black" fontSize="20" fill="#333">2a. Capital gain distributions</text>
            <rect x="-270" y="30" width="540" height="52" rx="6" fill="#fff5f5" stroke={ACCENT}
              strokeWidth={interpolate(highlightIn, [0, 1], [1, 4])} />
            <rect x="-270" y="30" width="540" height="52" rx="6" fill={ACCENT}
              opacity={interpolate(highlightIn, [0, 1], [0, 0.18])} />
            <text x="-248" y="68" fontFamily="Arial Black" fontSize="30" fill={ACCENT}>$1,842.00</text>
            <text x="250" y="68" textAnchor="end" fontFamily="Arial Black" fontSize="18" fill="#888">BOX 2a</text>
          </g>

          <g opacity={ctaIn}>
            <polyline points="160,1555 300,1482 440,1502 580,1422 720,1358 860,1278 920,1240"
              stroke="#10B981" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 920,1340 L 920,1200 L 876,1240 M 920,1200 L 964,1240"
              stroke="#10B981" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="540" y="1618" textAnchor="middle" fontFamily="Arial Black" fontSize="36" fill="#10B981">ETF: NEAR 0% TAX</text>
          </g>
        </svg>

        <div style={{
          position: 'absolute', bottom: 160, left: 0, right: 0, textAlign: 'center',
          opacity: ctaIn,
          transform: `translateY(${interpolate(ctaIn, [0, 1], [30, 0])}px)`,
        }}>
          <p style={headline(54, '#111')}>STOP PAYING</p>
          <p style={{ ...headline(54, ACCENT), marginTop: 8 }}>PHANTOM TAXES</p>
          <p style={{ ...headline(38, '#555'), marginTop: 24 }}>FOLLOW FOR MORE MONEY MOVES</p>
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
