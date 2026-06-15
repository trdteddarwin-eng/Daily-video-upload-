import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
const RED = '#EF4444';
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

// ─── Scene 1: Hook — 92% of pros can't beat this ──────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const personIn = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 25, stiffness: 60 } });
  const badgeIn = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 30, stiffness: 80 } });
  const captionIn = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 28, stiffness: 70 } });

  const titleY = interpolate(titleIn, [0, 1], [30, 0]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{
        position: 'absolute', top: 115, left: 40, right: 40, textAlign: 'center',
        opacity: titleIn, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(52, WHITE)}>92% OF PROS</p>
        <p style={{ ...headline(52, RED), marginTop: 8 }}>CAN'T BEAT</p>
        <p style={{ ...headline(52, ACCENT), marginTop: 8 }}>THIS MOVE</p>
      </div>

      {/* Fund manager: suit, tie, briefcase */}
      <div style={{
        position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center',
        opacity: personIn, transform: `scale(${personIn})`, transformOrigin: 'center bottom',
      }}>
        <svg width="160" height="255" viewBox="0 0 160 255">
          <circle cx="80" cy="38" r="32" fill={WHITE} />
          <rect x="70" y="64" width="20" height="14" fill={WHITE} />
          <path d="M28 82 Q28 74 80 74 Q132 74 132 82 L140 202 Q140 212 130 212 L30 212 Q20 212 20 202 Z" fill="#888" />
          <polygon points="80,80 72,104 80,164 88,104" fill={RED} />
          <polygon points="80,82 48,98 54,84" fill="#aaa" />
          <polygon points="80,82 112,98 106,84" fill="#aaa" />
          <rect x="8" y="84" width="22" height="78" rx="10" fill="#888" />
          <rect x="130" y="84" width="22" height="78" rx="10" fill="#888" />
          <rect x="120" y="158" width="52" height="36" rx="6" fill="#c8a04a" />
          <rect x="134" y="146" width="24" height="16" rx="5" fill="none" stroke="#c8a04a" strokeWidth="4" />
          <rect x="120" y="174" width="52" height="4" rx="2" fill="#a07030" />
          <circle cx="146" cy="176" r="5" fill="#a07030" />
          <rect x="44" y="210" width="26" height="40" rx="10" fill="#666" />
          <rect x="90" y="210" width="26" height="40" rx="10" fill="#666" />
        </svg>
      </div>

      {/* 92% fail badge */}
      <div style={{
        position: 'absolute', top: 650, left: 0, right: 0, display: 'flex', justifyContent: 'center',
        opacity: badgeIn, transform: `scale(${badgeIn})`,
      }}>
        <div style={{
          background: RED, borderRadius: 18, paddingTop: 16, paddingBottom: 16,
          paddingLeft: 34, paddingRight: 34,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 72, color: WHITE, margin: 0, lineHeight: 1 }}>92%</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0 }}>UNDERPERFORM</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 118, left: 50, right: 50, textAlign: 'center',
        opacity: captionIn,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, lineHeight: 1.45, margin: 0 }}>
          And the fees they charge? That's the real crime. Let's run the math.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 2: SPIVA 15-year report — two bars ─────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const barProg = interpolate(frame, [25, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeIn = spring({ frame: Math.max(0, frame - 142), fps, config: { damping: 28, stiffness: 70 } });

  const MAX_H = 390;
  const failH = Math.max(8, Math.floor(barProg * MAX_H));
  const winH = Math.max(8, Math.floor(barProg * MAX_H * 0.087));
  const failPct = Math.round(barProg * 92);
  const winPct = Math.round(barProg * 8);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 95, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(40, BLACK)}>S&P SPIVA</p>
        <p style={{ ...headline(40, RED), marginTop: 10 }}>15-YEAR REPORT</p>
      </div>

      <div style={{
        position: 'absolute', top: 285, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end',
        paddingLeft: 65, paddingRight: 65,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <p style={{ fontFamily: FONT, fontSize: 52, color: RED, margin: 0 }}>{failPct}%</p>
          <div style={{ width: 188, height: failH, background: RED, borderRadius: '14px 14px 0 0' }} />
          <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: 0, textAlign: 'center', lineHeight: 1.3 }}>
            ACTIVE FUNDS{'\n'}UNDERPERFORM
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <p style={{ fontFamily: FONT, fontSize: 52, color: ACCENT, margin: 0 }}>{winPct}%</p>
          <div style={{ width: 188, height: winH, background: ACCENT, borderRadius: '14px 14px 0 0' }} />
          <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: 0, textAlign: 'center', lineHeight: 1.3 }}>
            BEAT THE{'\n'}INDEX
          </p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 105, left: 50, right: 50, textAlign: 'center',
        opacity: badgeIn, transform: `scale(${badgeIn})`,
      }}>
        <div style={{ padding: '16px 24px', background: RED, borderRadius: 16, marginBottom: 14 }}>
          <p style={{ ...headline(28, WHITE) }}>OVER 15 YEARS</p>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, lineHeight: 1.45, margin: 0 }}>
          That's not a bad year — that's the industry. Here's the hidden reason why.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 3: Fee comparison — 1.2% vs 0.03% ──────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const barProg = interpolate(frame, [22, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapIn = spring({ frame: Math.max(0, frame - 132), fps, config: { damping: 26, stiffness: 65 } });

  const MAX_H = 295;
  const h1 = Math.max(8, Math.floor(barProg * MAX_H));
  const h2 = Math.max(8, Math.floor(barProg * MAX_H * 0.025));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 95, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(40, WHITE)}>THE FEE</p>
        <p style={{ ...headline(40, RED), marginTop: 8 }}>EATING YOUR</p>
        <p style={{ ...headline(40, WHITE), marginTop: 8 }}>WEALTH</p>
      </div>

      <div style={{
        position: 'absolute', top: 320, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end',
        paddingLeft: 55, paddingRight: 55,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 40, color: RED, margin: 0 }}>1.2%</p>
          <div style={{ width: 178, height: h1, background: RED, borderRadius: '12px 12px 0 0' }} />
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, textAlign: 'center' }}>
            ACTIVE FUND
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 40, color: ACCENT, margin: 0 }}>0.03%</p>
          <div style={{ width: 178, height: h2, background: ACCENT, borderRadius: '12px 12px 0 0' }} />
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, textAlign: 'center' }}>
            INDEX FUND
          </p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 100, left: 40, right: 40, textAlign: 'center',
        opacity: gapIn, transform: `scale(${gapIn})`,
      }}>
        <div style={{ padding: '18px 28px', border: `3px solid ${ACCENT}`, borderRadius: 18, marginBottom: 16 }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, margin: 0 }}>$180,000 difference</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: '8px 0 0' }}>
            on $100,000 over 30 years — just from fees.
          </p>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, lineHeight: 1.4, margin: 0 }}>
          But does that show up in your actual returns?
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 4: Only 1-in-4 top funds repeat — piggy banks ─────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const pig0 = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 28, stiffness: 75 } });
  const pig1 = spring({ frame: Math.max(0, frame - 34), fps, config: { damping: 28, stiffness: 75 } });
  const pig2 = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 28, stiffness: 75 } });
  const pig3 = spring({ frame: Math.max(0, frame - 66), fps, config: { damping: 28, stiffness: 75 } });
  const fadeOut = interpolate(frame, [108, 138], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const revealIn = interpolate(frame, [138, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const captionIn = spring({ frame: Math.max(0, frame - 172), fps, config: { damping: 28, stiffness: 70 } });

  const pigs = [pig0, pig1, pig2, pig3];

  const PigSVG: React.FC<{ fill: string; accent: string }> = ({ fill, accent }) => (
    <svg width="118" height="108" viewBox="0 0 118 108">
      <ellipse cx="54" cy="66" rx="40" ry="34" fill={fill} />
      <circle cx="88" cy="52" r="18" fill={fill} />
      <ellipse cx="100" cy="58" rx="8" ry="6" fill={accent} />
      <circle cx="97" cy="57" r="2.5" fill={BLACK} />
      <circle cx="103" cy="57" r="2.5" fill={BLACK} />
      <circle cx="87" cy="47" r="3.5" fill={BLACK} />
      <ellipse cx="83" cy="36" rx="6" ry="9" fill={fill} />
      <rect x="46" y="20" width="14" height="5" rx="2.5" fill={accent} />
      <rect x="24" y="96" width="12" height="10" rx="4" fill={accent} />
      <rect x="40" y="96" width="12" height="10" rx="4" fill={accent} />
      <rect x="56" y="96" width="12" height="10" rx="4" fill={accent} />
      <rect x="72" y="96" width="12" height="10" rx="4" fill={accent} />
      <path d="M16 60 Q4 50 8 38 Q12 26 22 36" fill="none" stroke={fill} strokeWidth="9" strokeLinecap="round" />
    </svg>
  );

  const cols = [ACCENT, '#bbb', '#bbb', '#bbb'];
  const accents = ['#7dd3c0', '#ddd', '#ddd', '#ddd'];
  const labels = ['STAYS TOP', 'DROPS OUT', 'DROPS OUT', 'DROPS OUT'];
  const labelCols = [ACCENT, RED, RED, RED];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 95, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(42, BLACK)}>TOP FUND</p>
        <p style={{ ...headline(42, RED), marginTop: 8 }}>NEXT YEAR?</p>
      </div>

      {/* Phase 1: all 4 pigs green */}
      <div style={{
        position: 'absolute', top: 310, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around', paddingLeft: 18, paddingRight: 18,
        opacity: fadeOut,
      }}>
        {pigs.map((sp, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            opacity: sp, transform: `scale(${sp})`,
          }}>
            <PigSVG fill={ACCENT} accent="#7dd3c0" />
            <p style={{ fontFamily: FONT, fontSize: 18, color: ACCENT, margin: 0 }}>TOP</p>
          </div>
        ))}
      </div>

      {/* Phase 2: only 1 stays green */}
      <div style={{
        position: 'absolute', top: 310, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around', paddingLeft: 18, paddingRight: 18,
        opacity: revealIn,
      }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <PigSVG fill={cols[i]} accent={accents[i]} />
            <p style={{ fontFamily: FONT, fontSize: 16, color: labelCols[i], margin: 0, textAlign: 'center' }}>
              {labels[i]}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 105, left: 50, right: 50, textAlign: 'center',
        opacity: captionIn,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, lineHeight: 1.45, margin: 0 }}>
          Only 1 in 4 top funds repeat. That's a coin flip. Now see what this costs your actual portfolio.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 5: $10K → $57K active vs $76K index ────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const barProg = interpolate(frame, [22, 162], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapIn = spring({ frame: Math.max(0, frame - 152), fps, config: { damping: 26, stiffness: 65 } });

  const MAX_H = 375;
  const h1 = Math.max(8, Math.floor(barProg * MAX_H * 0.75));
  const h2 = Math.max(8, Math.floor(barProg * MAX_H));
  const amt1 = Math.round(barProg * 57000);
  const amt2 = Math.round(barProg * 76000);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 95, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(40, WHITE)}>$10,000</p>
        <p style={{ ...headline(40, WHITE), marginTop: 8 }}>OVER 30 YEARS</p>
      </div>

      <div style={{
        position: 'absolute', top: 275, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end',
        paddingLeft: 55, paddingRight: 55,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: RED, margin: 0 }}>${amt1.toLocaleString()}</p>
          <div style={{
            width: 178, height: h1, background: RED, borderRadius: '12px 12px 0 0',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          }}>
            {h1 > 45 && (
              <p style={{ fontFamily: FONT, fontSize: 16, color: WHITE, margin: '12px 0 0' }}>1.2% FEE</p>
            )}
          </div>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, textAlign: 'center' }}>
            ACTIVE FUND
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: ACCENT, margin: 0 }}>${amt2.toLocaleString()}</p>
          <div style={{
            width: 178, height: h2, background: ACCENT, borderRadius: '12px 12px 0 0',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          }}>
            {h2 > 45 && (
              <p style={{ fontFamily: FONT, fontSize: 16, color: WHITE, margin: '12px 0 0' }}>0.03% FEE</p>
            )}
          </div>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, textAlign: 'center' }}>
            INDEX FUND
          </p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 98, left: 40, right: 40, textAlign: 'center',
        opacity: gapIn, transform: `scale(${gapIn})`,
      }}>
        <div style={{ padding: '16px 24px', background: ACCENT, borderRadius: 16, marginBottom: 14 }}>
          <p style={{ ...headline(30, WHITE) }}>+$19,000 EXTRA</p>
        </div>
        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, lineHeight: 1.45, margin: 0 }}>
          That's the fee gap made visible. Here's what to actually do about it.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 6: Three-fund portfolio CTA ────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 30, stiffness: 80 } });
  const jar0 = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 26, stiffness: 65 } });
  const jar1 = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 26, stiffness: 65 } });
  const jar2 = spring({ frame: Math.max(0, frame - 88), fps, config: { damping: 26, stiffness: 65 } });
  const badgeIn = spring({ frame: Math.max(0, frame - 136), fps, config: { damping: 28, stiffness: 72 } });
  const ctaIn = spring({ frame: Math.max(0, frame - 170), fps, config: { damping: 28, stiffness: 70 } });

  const jarSprings = [jar0, jar1, jar2];
  const jarLabels = ['US\nSTOCKS', "INT'L\nSTOCKS", 'BONDS'];
  const jarPcts = ['60%', '30%', '10%'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 95, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(44, BLACK)}>THE SIMPLE</p>
        <p style={{ ...headline(44, ACCENT), marginTop: 10 }}>PLAY</p>
      </div>

      <div style={{
        position: 'absolute', top: 280, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around', paddingLeft: 16, paddingRight: 16,
      }}>
        {jarSprings.map((sp, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
            opacity: sp, transform: `scale(${sp})`,
          }}>
            <svg width="148" height="172" viewBox="0 0 148 172">
              <rect x="16" y="32" width="116" height="126" rx="18" fill={ACCENT} opacity="0.15" stroke={ACCENT} strokeWidth="4" />
              <rect x="10" y="14" width="128" height="26" rx="10" fill={ACCENT} />
              <rect x="20" y="80" width="108" height="74" rx="14" fill={ACCENT} opacity="0.35" />
              <text x="74" y="132" textAnchor="middle" fill={ACCENT} fontSize="44" fontFamily="Arial Black">$</text>
              <rect x="28" y="38" width="92" height="32" rx="9" fill={ACCENT} />
              <text x="74" y="62" textAnchor="middle" fill={WHITE} fontSize="22" fontFamily="Arial Black">
                {jarPcts[i]}
              </text>
            </svg>
            <p style={{
              fontFamily: FONT, fontSize: 20, color: BLACK, margin: 0,
              textAlign: 'center', lineHeight: 1.3, whiteSpace: 'pre-line',
            }}>
              {jarLabels[i]}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        position: 'absolute', top: 672, left: 52, right: 52,
        opacity: badgeIn, transform: `scale(${badgeIn})`,
      }}>
        <div style={{ padding: '18px 28px', background: ACCENT, borderRadius: 18 }}>
          <p style={{ ...headline(26, WHITE) }}>LOW FEE. SET IT &amp; FORGET IT.</p>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 92, left: 50, right: 50, textAlign: 'center',
        opacity: ctaIn,
      }}>
        <p style={{ ...headline(28, BLACK), lineHeight: 1.5, margin: 0 }}>
          You don't need an expert — you need a low-cost index.
        </p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: '#555', margin: '16px 0 0' }}>
          Follow for more wealth math.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Root composition ──────────────────────────────────────────────────────────
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
