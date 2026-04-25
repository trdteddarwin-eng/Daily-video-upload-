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
  lineHeight: 1.3,
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

  const cardScale = spring({ frame, fps, config: { stiffness: 60, damping: 12 } });
  const billY = interpolate(frame, [25, 55], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const billOpacity = interpolate(frame, [25, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const headlineOpacity = interpolate(frame, [65, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Credit card springs in */}
      <div style={{ position: 'absolute', top: 220, left: '50%', transform: `translateX(-50%) scale(${cardScale})` }}>
        <svg width="340" height="210" viewBox="0 0 340 210">
          <rect x="0" y="0" width="340" height="210" rx="18" fill="#1A1A2E" stroke={ACCENT} strokeWidth="3"/>
          <rect x="0" y="58" width="340" height="52" fill="#252540"/>
          <rect x="24" y="76" width="50" height="38" rx="4" fill="#C8A800" stroke="#A07800" strokeWidth="1"/>
          <line x1="49" y1="76" x2="49" y2="114" stroke="#A07800" strokeWidth="1"/>
          <line x1="24" y1="95" x2="74" y2="95" stroke="#A07800" strokeWidth="1"/>
          {[0, 1, 2, 3].map((grp) => (
            <g key={grp}>
              {[0, 1, 2, 3].map((dot) => (
                <circle key={dot} cx={100 + grp * 62 + dot * 10} cy="152" r="4" fill="#666"/>
              ))}
            </g>
          ))}
          <text x="248" y="163" fontFamily={FONT} fontSize="18" fill={WHITE} letterSpacing="3">4582</text>
          <text x="24" y="192" fontFamily={FONT} fontSize="12" fill="#777">FIRST NATIONAL BANK</text>
          <text x="288" y="192" fontFamily={FONT} fontSize="20" fill={WHITE} fontStyle="italic">VISA</text>
        </svg>
      </div>

      {/* Statement box slides up */}
      <div style={{
        position: 'absolute',
        top: 490,
        left: '50%',
        transform: `translateX(-50%) translateY(${billY}px)`,
        opacity: billOpacity,
        background: '#1A1A2E',
        border: `2px solid ${ACCENT}`,
        borderRadius: 14,
        padding: '20px 28px',
        width: 320,
        boxSizing: 'border-box' as const,
      }}>
        <div style={{ fontFamily: FONT, fontSize: 11, color: '#777', letterSpacing: '0.15em', textAlign: 'center', marginBottom: 6 }}>STATEMENT BALANCE</div>
        <div style={{ ...headline(42, WHITE), marginBottom: 16 }}>$5,000.00</div>
        <div style={{ height: 1, background: '#333', marginBottom: 16 }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: FONT, fontSize: 12, color: '#888', letterSpacing: '0.08em' }}>MINIMUM DUE</div>
          <div style={headline(34, ACCENT)}>$104</div>
        </div>
      </div>

      {/* Headline fades in */}
      <div style={{ position: 'absolute', top: 760, left: 60, right: 60, opacity: headlineOpacity, textAlign: 'center' }}>
        <div style={headline(26, '#AAA')}>THAT NUMBER WAS</div>
        <div style={{ ...headline(56, ACCENT), marginTop: 6 }}>ENGINEERED</div>
        <div style={{ ...headline(28, WHITE), marginTop: 6 }}>TO TRAP YOU</div>
        <div style={{ ...headline(20, '#666'), marginTop: 10 }}>FOR 16 YEARS</div>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, config: { stiffness: 80, damping: 14 }, from: -60, to: 0 });
  const barPct = interpolate(frame, [20, 150], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yearsVal = interpolate(frame, [20, 150], [0, 16], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const interestVal = interpolate(frame, [50, 180], [0, 7400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const boxesOpacity = interpolate(frame, [160, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title slides down */}
      <div style={{ position: 'absolute', top: 180, left: 60, right: 60, transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
        <div style={headline(20, '#999')}>IF YOU PAY ONLY THE MINIMUM</div>
        <div style={{ ...headline(60, BLACK), marginTop: 8 }}>$5,000</div>
        <div style={{ ...headline(22, ACCENT), marginTop: 4 }}>AT 24% APR</div>
      </div>

      {/* Years bar + counter */}
      <div style={{ position: 'absolute', top: 440, left: 60, right: 60 }}>
        <div style={{ fontFamily: FONT, fontSize: 12, color: '#999', letterSpacing: '0.1em', marginBottom: 8 }}>YEARS TO PAY OFF</div>
        <div style={{ height: 26, background: '#DDD', borderRadius: 13, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${barPct}%`, background: ACCENT, borderRadius: 13 }}/>
        </div>
        <div style={{ ...headline(72, BLACK), marginTop: 12 }}>{Math.round(yearsVal)} YRS</div>
      </div>

      {/* Interest counter */}
      <div style={{ position: 'absolute', top: 720, left: 60, right: 60, textAlign: 'center' }}>
        <div style={{ fontFamily: FONT, fontSize: 13, color: '#999', letterSpacing: '0.1em', marginBottom: 8 }}>TOTAL INTEREST PAID</div>
        <div style={headline(80, ACCENT)}>${Math.round(interestVal).toLocaleString()}</div>
      </div>

      {/* Comparison boxes */}
      <div style={{ position: 'absolute', top: 940, left: 60, right: 60, display: 'flex', gap: 16, opacity: boxesOpacity }}>
        <div style={{ flex: 1, background: '#EEE', borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
          <div style={{ fontFamily: FONT, fontSize: 10, color: '#999', letterSpacing: '0.1em', marginBottom: 4 }}>YOU BORROWED</div>
          <div style={headline(28, BLACK)}>$5,000</div>
        </div>
        <div style={{ flex: 1, background: ACCENT, borderRadius: 12, padding: '16px 12px', textAlign: 'center' }}>
          <div style={{ fontFamily: FONT, fontSize: 10, color: 'rgba(0,0,0,0.6)', letterSpacing: '0.1em', marginBottom: 4 }}>YOU PAY BACK</div>
          <div style={headline(28, BLACK)}>$12,400</div>
        </div>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buildingScale = spring({ frame, fps, config: { stiffness: 55, damping: 12 } });
  const formulaOpacity = interpolate(frame, [25, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shrinkProgress = interpolate(frame, [80, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const balancePct = interpolate(shrinkProgress, [0, 1], [100, 65]);
  const minPct = interpolate(shrinkProgress, [0, 1], [20, 13]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Bank building SVG */}
      <div style={{ position: 'absolute', top: 160, left: '50%', transform: `translateX(-50%) scale(${buildingScale})` }}>
        <svg width="200" height="190" viewBox="0 0 200 190">
          <polygon points="10,80 100,18 190,80" fill={ACCENT}/>
          <rect x="20" y="80" width="160" height="100" fill="#1A1A2E" stroke="#333" strokeWidth="2"/>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={30 + i * 38} y="82" width="16" height="98" rx="2" fill="#2A2A3E" stroke="#444" strokeWidth="1"/>
          ))}
          <rect x="10" y="180" width="180" height="8" rx="2" fill="#333"/>
          <rect x="55" y="98" width="90" height="26" rx="3" fill="#252540"/>
          <text x="100" y="116" fontFamily={FONT} fontSize="10" fill={ACCENT} textAnchor="middle" letterSpacing="2">BANK</text>
        </svg>
      </div>

      {/* Formula box */}
      <div style={{ position: 'absolute', top: 420, left: 60, right: 60, opacity: formulaOpacity }}>
        <div style={{ ...headline(18, '#888'), marginBottom: 14 }}>MINIMUM PAYMENT FORMULA</div>
        <div style={{ background: '#1A1A2E', border: `2px solid ${ACCENT}`, borderRadius: 12, padding: '20px 28px', textAlign: 'center' }}>
          <div style={headline(30, ACCENT)}>2% OF BALANCE</div>
          <div style={{ fontFamily: FONT, fontSize: 18, color: '#666', margin: '10px 0' }}>OR</div>
          <div style={headline(30, WHITE)}>$25 MINIMUM</div>
          <div style={{ fontFamily: FONT, fontSize: 13, color: '#555', marginTop: 10, letterSpacing: '0.08em' }}>WHICHEVER IS HIGHER</div>
        </div>
      </div>

      {/* Shrinking trap — both bars shrink in sync */}
      <div style={{ position: 'absolute', top: 740, left: 60, right: 60 }}>
        <div style={{ fontFamily: FONT, fontSize: 11, color: '#777', letterSpacing: '0.08em', marginBottom: 14, textAlign: 'center' }}>
          AS BALANCE DROPS, MINIMUM SHRINKS TOO
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: FONT, fontSize: 11, color: '#888', letterSpacing: '0.1em', marginBottom: 6 }}>YOUR BALANCE</div>
          <div style={{ height: 22, background: '#222', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${balancePct}%`, background: '#555', borderRadius: 8 }}/>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: FONT, fontSize: 11, color: ACCENT, letterSpacing: '0.1em', marginBottom: 6 }}>MINIMUM PAYMENT (ALSO SHRINKS)</div>
          <div style={{ height: 22, background: '#222', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${minPct}%`, background: ACCENT, borderRadius: 8 }}/>
          </div>
        </div>
      </div>

      {/* Bottom label */}
      <div style={{ position: 'absolute', top: 1020, left: 60, right: 60, textAlign: 'center' }}>
        <div style={headline(26, WHITE)}>A SELF-TIGHTENING</div>
        <div style={{ ...headline(40, ACCENT), marginTop: 6 }}>DEBT TRAP</div>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1Pct = interpolate(frame, [15, 120], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2Pct = interpolate(frame, [35, 120], [0, 30], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savingsScale = spring({ frame: Math.max(0, frame - 120), fps, config: { stiffness: 80, damping: 10 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Title */}
      <div style={{ position: 'absolute', top: 180, left: 60, right: 60, opacity: titleOpacity, textAlign: 'center' }}>
        <div style={headline(20, '#999')}>SAME $5,000 DEBT</div>
        <div style={{ ...headline(52, BLACK), marginTop: 8 }}>TWO CHOICES</div>
      </div>

      {/* Option A — minimum payment, long bar */}
      <div style={{ position: 'absolute', top: 380, left: 60, right: 60 }}>
        <div style={{ fontFamily: FONT, fontSize: 13, color: '#999', letterSpacing: '0.1em', marginBottom: 10 }}>OPTION A: PAY $104/MONTH</div>
        <div style={{ height: 28, background: '#EEE', borderRadius: 10, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ height: '100%', width: `${bar1Pct}%`, background: '#EF4444', borderRadius: 10 }}/>
        </div>
        <div style={headline(30, '#EF4444')}>16 YEARS · $7,400 INTEREST</div>
      </div>

      {/* Option B — $250/month, short bar */}
      <div style={{ position: 'absolute', top: 580, left: 60, right: 60 }}>
        <div style={{ fontFamily: FONT, fontSize: 13, color: '#999', letterSpacing: '0.1em', marginBottom: 10 }}>OPTION B: PAY $250/MONTH</div>
        <div style={{ height: 28, background: '#EEE', borderRadius: 10, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ height: '100%', width: `${bar2Pct}%`, background: '#10B981', borderRadius: 10 }}/>
        </div>
        <div style={headline(30, '#10B981')}>2.4 YEARS · $1,200 INTEREST</div>
      </div>

      {/* Savings box springs in */}
      <div style={{
        position: 'absolute',
        top: 820,
        left: 60,
        right: 60,
        transform: `scale(${savingsScale})`,
        background: '#10B981',
        borderRadius: 16,
        padding: '24px 20px',
        textAlign: 'center',
      }}>
        <div style={{ fontFamily: FONT, fontSize: 13, color: 'rgba(0,0,0,0.6)', letterSpacing: '0.1em', marginBottom: 8 }}>YOU SAVE</div>
        <div style={headline(76, BLACK)}>$6,200</div>
        <div style={{ fontFamily: FONT, fontSize: 13, color: 'rgba(0,0,0,0.6)', letterSpacing: '0.1em', marginTop: 8 }}>WITH THE SAME INCOME</div>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainScale = spring({ frame, fps, config: { stiffness: 55, damping: 12 } });
  const checkOpacity = interpolate(frame, [35, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const debtOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const debtScale = interpolate(frame, [90, 190], [0.7, 1.15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const factOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Brain SVG */}
      <div style={{ position: 'absolute', top: 200, left: '50%', transform: `translateX(-50%) scale(${brainScale})` }}>
        <svg width="200" height="180" viewBox="0 0 200 180">
          <ellipse cx="100" cy="90" rx="82" ry="72" fill="none" stroke={ACCENT} strokeWidth="4"/>
          <line x1="100" y1="18" x2="100" y2="162" stroke={ACCENT} strokeWidth="2.5" strokeDasharray="6,5"/>
          <path d="M 28 68 Q 12 48 28 32 Q 48 18 68 38" fill="none" stroke={ACCENT} strokeWidth="2.5"/>
          <path d="M 22 108 Q 8 88 18 72" fill="none" stroke={ACCENT} strokeWidth="2.5"/>
          <path d="M 172 68 Q 188 48 172 32 Q 152 18 132 38" fill="none" stroke={ACCENT} strokeWidth="2.5"/>
          <path d="M 178 108 Q 192 88 182 72" fill="none" stroke={ACCENT} strokeWidth="2.5"/>
          <path d="M 48 158 Q 68 170 100 167 Q 132 170 152 158" fill="none" stroke={ACCENT} strokeWidth="2.5"/>
        </svg>
      </div>

      {/* Checkmark — false sense of satisfaction */}
      <div style={{ position: 'absolute', top: 430, left: '50%', transform: 'translateX(-50%)', opacity: checkOpacity, textAlign: 'center' }}>
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="32" fill="#10B981"/>
          <polyline points="18,38 30,52 56,22" fill="none" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div style={{ ...headline(22, '#10B981'), marginTop: 8 }}>BILL PAID</div>
        <div style={{ fontFamily: FONT, fontSize: 13, color: '#666', marginTop: 4 }}>YOUR BRAIN RELAXES</div>
      </div>

      {/* Debt growing */}
      <div style={{ position: 'absolute', top: 670, left: 60, right: 60, opacity: debtOpacity, transform: `scale(${debtScale})`, textAlign: 'center' }}>
        <div style={headline(18, '#777')}>BUT THE DEBT KEEPS GROWING</div>
        <div style={{ ...headline(64, ACCENT), marginTop: 8 }}>$7,400</div>
        <div style={headline(16, '#777')}>IN INTEREST CHARGES</div>
      </div>

      {/* 148% fact */}
      <div style={{ position: 'absolute', top: 930, left: 60, right: 60, opacity: factOpacity }}>
        <div style={{ background: ACCENT, borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
          <div style={{ fontFamily: FONT, fontSize: 12, color: 'rgba(0,0,0,0.65)', letterSpacing: '0.1em', marginBottom: 6 }}>YOU AGREED TO PAY</div>
          <div style={headline(56, BLACK)}>148%</div>
          <div style={{ fontFamily: FONT, fontSize: 12, color: 'rgba(0,0,0,0.65)', letterSpacing: '0.1em', marginTop: 6 }}>OF WHAT YOU BORROWED</div>
        </div>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const statementY = spring({ frame, fps, config: { stiffness: 55, damping: 12 }, from: 80, to: 0 });
  const arrowOpacity = interpolate(frame, [35, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 80), fps, config: { stiffness: 80, damping: 10 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Statement mockup slides up */}
      <div style={{ position: 'absolute', top: 200, left: 60, right: 60, transform: `translateY(${statementY}px)` }}>
        <div style={{ background: WHITE, border: '2px solid #DDD', borderRadius: 14, padding: '20px 24px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ fontFamily: FONT, fontSize: 11, color: '#999', letterSpacing: '0.12em', marginBottom: 14 }}>CREDIT CARD STATEMENT</div>
          {['Balance: $5,000.00', 'Due Date:  May 10', 'Minimum Due:  $104'].map((row, i) => (
            <div key={i} style={{ borderBottom: '1px solid #EEE', padding: '8px 0', fontFamily: FONT, fontSize: 14, color: BLACK }}>
              {row}
            </div>
          ))}
          {/* Legally required minimum payment warning box */}
          <div style={{ marginTop: 16, border: `3px solid ${ACCENT}`, borderRadius: 10, padding: '12px 14px', background: '#FFF5F5' }}>
            <div style={{ fontFamily: FONT, fontSize: 10, color: ACCENT, letterSpacing: '0.1em', marginBottom: 6 }}>IF YOU MAKE ONLY MINIMUM PAYMENTS:</div>
            <div style={{ fontFamily: FONT, fontSize: 13, color: BLACK, lineHeight: 1.6 }}>
              You will pay off this balance in <strong>16 years</strong> and pay an estimated{' '}
              <strong style={{ color: ACCENT }}>$7,400</strong> in interest charges.
            </div>
          </div>
        </div>
      </div>

      {/* Arrow pointing up at the warning box */}
      <div style={{ position: 'absolute', top: 640, left: '50%', transform: 'translateX(-50%)', opacity: arrowOpacity, textAlign: 'center' }}>
        <svg width="56" height="56" viewBox="0 0 56 56">
          <line x1="28" y1="48" x2="28" y2="10" stroke={ACCENT} strokeWidth="5" strokeLinecap="round"/>
          <polyline points="12,26 28,8 44,26" fill="none" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div style={{ ...headline(16, ACCENT), marginTop: 6 }}>THIS BOX IS REQUIRED BY LAW</div>
      </div>

      {/* CTA springs in */}
      <div style={{ position: 'absolute', top: 800, left: 60, right: 60, transform: `scale(${ctaScale})`, textAlign: 'center' }}>
        <div style={headline(20, '#888')}>TONIGHT, OPEN YOUR STATEMENT</div>
        <div style={{ ...headline(52, BLACK), marginTop: 10 }}>FIND THIS BOX</div>
        <div style={{ ...headline(28, ACCENT), marginTop: 10 }}>NOW GO RUIN IT</div>
      </div>

      {/* Follow prompt */}
      <div style={{ position: 'absolute', top: 1090, left: 60, right: 60, textAlign: 'center' }}>
        <div style={{ fontFamily: FONT, fontSize: 13, color: '#BBB', letterSpacing: '0.1em', marginBottom: 12 }}>FOLLOW FOR DAILY MONEY FACTS</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          {['#DEBT', '#CREDITCARD', '#FINANCE'].map((tag, i) => (
            <div key={i} style={{ fontFamily: FONT, fontSize: 10, color: ACCENT, background: '#FFF0F0', padding: '4px 10px', borderRadius: 20, border: `1px solid ${ACCENT}` }}>
              {tag}
            </div>
          ))}
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
