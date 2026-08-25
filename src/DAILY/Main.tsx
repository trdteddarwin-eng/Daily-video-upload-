import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

const BG_DARK = '#0D1117';
const BG_LIGHT = '#EFF6FF';
const ACCENT = '#3B82F6';
const WHITE = '#F5F5F5';
const BLACK = '#111827';
const RED = '#EF4444';
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

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const curveProgress = interpolate(frame, [15, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const markerIn = spring({ frame: Math.max(0, frame - 100), fps: 30, config: { damping: 14 } });
  const textIn = interpolate(frame, [135, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const totalPts = 50;
  const pointCount = Math.max(2, Math.floor(totalPts * curveProgress + 1));
  const pts = Array.from({ length: pointCount }, (_, i) => {
    const t = i / (totalPts - 1);
    const x = 60 + t * 460;
    const y = 290 - (Math.log(1 + t * 9) / Math.log(10)) * 248;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
        <p style={{ ...headline(36, BLACK), marginBottom: 6 }}>WHARTON STUDY</p>
        <p style={{ ...headline(28, ACCENT), marginBottom: 44 }}>33,000 ADULTS TRACKED</p>
        <svg width="600" height="340" viewBox="0 0 600 340">
          <line x1="60" y1="30" x2="60" y2="300" stroke="#94A3B8" strokeWidth="2" />
          <line x1="60" y1="300" x2="560" y2="300" stroke="#94A3B8" strokeWidth="2" />
          <text x="310" y="328" textAnchor="middle" fontSize="16" fill="#6B7280" fontFamily="Arial Black">INCOME</text>
          <text x="18" y="165" textAnchor="middle" fontSize="15" fill="#6B7280" fontFamily="Arial Black" transform="rotate(-90,18,165)">HAPPINESS</text>
          <text x="60" y="316" textAnchor="middle" fontSize="13" fill="#9CA3AF" fontFamily="Arial">$0</text>
          <text x="190" y="316" textAnchor="middle" fontSize="13" fill="#9CA3AF" fontFamily="Arial">$100K</text>
          <text x="340" y="316" textAnchor="middle" fontSize="13" fill="#9CA3AF" fontFamily="Arial">$300K</text>
          <text x="500" y="316" textAnchor="middle" fontSize="13" fill="#9CA3AF" fontFamily="Arial">$500K+</text>
          {pts.length > 1 && (
            <polyline points={pts.join(' ')} fill="none" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          )}
          <line x1="500" y1="50" x2="500" y2="300" stroke={RED} strokeWidth="2" strokeDasharray="7,5" opacity={markerIn} />
          <rect x="396" y="38" width="208" height="34" rx="7" fill={RED} opacity={markerIn} />
          <text x="500" y="60" textAnchor="middle" fontSize="15" fill={WHITE} fontFamily="Arial Black" opacity={markerIn}>GAINS NEAR ZERO</text>
        </svg>
        <div style={{ opacity: textIn, marginTop: 16 }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, textAlign: 'center', margin: 0 }}>
            Above <span style={{ color: ACCENT }}>$500,000</span>, more income barely moves your happiness.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const personX = interpolate(frame, [0, dur], [120, 400], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finishX = interpolate(frame, [0, dur], [440, 820], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textIn = interpolate(frame, [130, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const legPhase = frame % 12 < 6;

  const goalLabel = frame < 75 ? 'EARN $50K' : frame < 150 ? 'EARN $100K' : 'EARN $200K';

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '70px 40px', overflow: 'hidden' }}>
        <p style={{ ...headline(42, WHITE), marginBottom: 8 }}>ARRIVAL FALLACY</p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, textAlign: 'center', letterSpacing: '0.06em', margin: '0 0 40px' }}>
          "I'LL BE HAPPY WHEN I MAKE X"
        </p>
        <svg width="1080" height="300" viewBox="0 0 1080 300" style={{ width: '100%', height: 'auto' }}>
          <line x1="0" y1="250" x2="1080" y2="250" stroke="#374151" strokeWidth="2" />
          {/* Finish line */}
          <rect x={finishX} y="90" width="10" height="160" fill={RED} />
          <rect x={finishX - 4} y="76" width="92" height="30" rx="5" fill={RED} />
          <text x={finishX + 42} y="96" textAnchor="middle" fontSize="15" fill={WHITE} fontFamily="Arial Black">FINISH</text>
          {[0,1,2,3].map(i => (
            <rect key={i} x={finishX + (i % 2) * 16} y={108 + Math.floor(i / 2) * 16} width="16" height="16"
              fill={(i % 2 === Math.floor(i / 2) % 2) ? WHITE : BLACK} opacity={0.5} />
          ))}
          {/* Running person */}
          <circle cx={personX} cy="170" r="20" fill={ACCENT} />
          <rect x={personX - 12} y="190" width="24" height="40" rx="7" fill={ACCENT} />
          {legPhase ? (
            <>
              <line x1={personX - 5} y1="230" x2={personX - 22} y2="268" stroke={ACCENT} strokeWidth="9" strokeLinecap="round" />
              <line x1={personX + 5} y1="230" x2={personX + 20} y2="255" stroke={ACCENT} strokeWidth="9" strokeLinecap="round" />
            </>
          ) : (
            <>
              <line x1={personX - 5} y1="230" x2={personX - 16} y2="268" stroke={ACCENT} strokeWidth="9" strokeLinecap="round" />
              <line x1={personX + 5} y1="230" x2={personX + 18} y2="268" stroke={ACCENT} strokeWidth="9" strokeLinecap="round" />
            </>
          )}
          <text x={personX} y="145" textAnchor="middle" fontSize="16" fill={WHITE} fontFamily="Arial Black">{goalLabel}</text>
        </svg>
        <div style={{ opacity: textIn, marginTop: 16 }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, textAlign: 'center', margin: 0 }}>
            The finish line keeps moving. <span style={{ color: RED }}>Scientists call it arrival fallacy.</span>
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const beltOffset = (frame * 8) % 60;
  const textIn = interpolate(frame, [60, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yearIn = interpolate(frame, [145, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const legPhase = frame % 14 < 7;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '70px 50px' }}>
        <p style={{ ...headline(42, BLACK), marginBottom: 8 }}>THE HEDONIC</p>
        <p style={{ ...headline(42, ACCENT), marginBottom: 50 }}>TREADMILL</p>
        <svg width="600" height="280" viewBox="0 0 600 280">
          {/* Treadmill belt */}
          <rect x="50" y="190" width="500" height="22" rx="11" fill="#CBD5E1" />
          {/* Belt tick marks */}
          {[0,1,2,3,4,5,6,7,8].map(i => {
            const x = ((i * 64) - beltOffset + 576) % 512 + 50;
            return x > 54 && x < 546 ? (
              <line key={i} x1={x} y1="190" x2={x - 18} y2="212" stroke="#94A3B8" strokeWidth="3" />
            ) : null;
          })}
          {/* Frame pillars */}
          <rect x="38" y="110" width="18" height="90" rx="4" fill="#64748B" />
          <rect x="544" y="110" width="18" height="90" rx="4" fill="#64748B" />
          {/* Handlebar */}
          <rect x="38" y="110" width="220" height="10" rx="5" fill="#64748B" />
          {/* Running person — fixed at x=290 */}
          <circle cx="290" cy="98" r="22" fill="#1D4ED8" />
          <rect x="276" y="120" width="28" height="46" rx="8" fill="#1D4ED8" />
          {legPhase ? (
            <>
              <line x1="282" y1="166" x2="260" y2="206" stroke="#1D4ED8" strokeWidth="10" strokeLinecap="round" />
              <line x1="298" y1="166" x2="318" y2="198" stroke="#1D4ED8" strokeWidth="10" strokeLinecap="round" />
              <line x1="276" y1="132" x2="250" y2="156" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" />
              <line x1="304" y1="132" x2="328" y2="150" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" />
            </>
          ) : (
            <>
              <line x1="282" y1="166" x2="268" y2="206" stroke="#1D4ED8" strokeWidth="10" strokeLinecap="round" />
              <line x1="298" y1="166" x2="312" y2="206" stroke="#1D4ED8" strokeWidth="10" strokeLinecap="round" />
              <line x1="276" y1="132" x2="254" y2="150" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" />
              <line x1="304" y1="132" x2="326" y2="154" stroke="#1D4ED8" strokeWidth="8" strokeLinecap="round" />
            </>
          )}
          {/* No-forward arrow */}
          <text x="460" y="148" textAnchor="middle" fontSize="32" fill={RED} fontFamily="Arial Black">⟶ ✗</text>
        </svg>
        <div style={{ opacity: textIn, marginTop: 20 }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, textAlign: 'center', margin: 0 }}>
            Your brain resets "normal" within <span style={{ color: ACCENT }}>1 year</span> of any upgrade.
          </p>
        </div>
        <div style={{ opacity: yearIn, marginTop: 24 }}>
          <p style={{ ...headline(36, RED), margin: 0 }}>YOU'RE BACK TO BASELINE.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const barReveal = interpolate(frame, [20, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapIn = interpolate(frame, [130, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const levels = [
    { earn: '$50K', want: '$70K', earnH: 100, wantH: 140 },
    { earn: '$100K', want: '$140K', earnH: 155, wantH: 217 },
    { earn: '$200K', want: '$280K', earnH: 200, wantH: 280 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
        <p style={{ ...headline(42, WHITE), marginBottom: 8 }}>THE 40% GAP</p>
        <p style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, textAlign: 'center', letterSpacing: '0.08em', margin: '0 0 44px' }}>
          ALWAYS NEEDS 40% MORE TO FEEL COMFORTABLE
        </p>
        <svg width="620" height="370" viewBox="0 0 620 370">
          <line x1="40" y1="320" x2="600" y2="320" stroke="#374151" strokeWidth="2" />
          <line x1="40" y1="30" x2="40" y2="320" stroke="#374151" strokeWidth="2" />
          {levels.map((lv, i) => {
            const cx = 80 + i * 180;
            const bw = 54;
            const eh = lv.earnH * barReveal;
            const wh = lv.wantH * barReveal;
            return (
              <g key={i}>
                <rect x={cx} y={320 - eh} width={bw} height={eh} rx="4" fill={ACCENT} opacity={0.85} />
                <rect x={cx + bw + 10} y={320 - wh} width={bw} height={wh} rx="4" fill={RED} opacity={0.85} />
                <text x={cx + bw / 2} y={338} textAnchor="middle" fontSize="17" fill={ACCENT} fontFamily="Arial Black">{lv.earn}</text>
                <text x={cx + bw + 10 + bw / 2} y={338} textAnchor="middle" fontSize="17" fill={RED} fontFamily="Arial Black">{lv.want}</text>
                <text x={cx + bw / 2} y={354} textAnchor="middle" fontSize="13" fill="#9CA3AF" fontFamily="Arial">HAVE</text>
                <text x={cx + bw + 10 + bw / 2} y={354} textAnchor="middle" fontSize="13" fill="#9CA3AF" fontFamily="Arial">WANT</text>
              </g>
            );
          })}
        </svg>
        <div style={{ opacity: gapIn, marginTop: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, textAlign: 'center', margin: 0 }}>
            The gap <span style={{ color: RED }}>never closes</span> — it scales with your income.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const s1 = spring({ frame, fps: 30, config: { damping: 18, stiffness: 120 } });
  const s2 = spring({ frame: Math.max(0, frame - 45), fps: 30, config: { damping: 18, stiffness: 120 } });
  const s3 = spring({ frame: Math.max(0, frame - 90), fps: 30, config: { damping: 18, stiffness: 120 } });
  const butIn = interpolate(frame, [150, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const milestones = [
    { label: 'GOT THE RAISE', sc: s1 },
    { label: 'BOUGHT THE CAR', sc: s2 },
    { label: 'UPGRADED HOME', sc: s3 },
  ];

  const icons = [
    // Dollar sign
    <svg key="dollar" width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r="34" fill={ACCENT} opacity={0.18} />
      <circle cx="36" cy="36" r="34" fill="none" stroke={ACCENT} strokeWidth="3" />
      <text x="36" y="50" textAnchor="middle" fontSize="40" fill={ACCENT} fontFamily="Arial Black" fontWeight="900">$</text>
    </svg>,
    // Car
    <svg key="car" width="72" height="72" viewBox="0 0 72 72">
      <rect x="6" y="30" width="60" height="26" rx="8" fill={ACCENT} opacity={0.85} />
      <polygon points="14,30 22,14 50,14 58,30" fill={ACCENT} />
      <rect x="22" y="16" width="28" height="12" rx="3" fill={WHITE} opacity={0.35} />
      <circle cx="20" cy="56" r="8" fill={BLACK} />
      <circle cx="20" cy="56" r="4" fill="#6B7280" />
      <circle cx="52" cy="56" r="8" fill={BLACK} />
      <circle cx="52" cy="56" r="4" fill="#6B7280" />
    </svg>,
    // House
    <svg key="house" width="72" height="72" viewBox="0 0 72 72">
      <polygon points="36,6 66,32 6,32" fill={ACCENT} opacity={0.85} />
      <rect x="14" y="32" width="44" height="32" rx="2" fill={ACCENT} opacity={0.65} />
      <rect x="30" y="44" width="12" height="20" rx="2" fill={BG_DARK} opacity={0.6} />
      <rect x="18" y="38" width="10" height="10" rx="2" fill={WHITE} opacity={0.3} />
      <rect x="44" y="38" width="10" height="10" rx="2" fill={WHITE} opacity={0.3} />
    </svg>,
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px', gap: 0 }}>
        <p style={{ ...headline(44, WHITE), marginBottom: 16 }}>YOU GOT</p>
        <p style={{ ...headline(44, ACCENT), marginBottom: 60 }}>EVERYTHING YOU WANTED</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36, width: '100%', alignItems: 'flex-start', paddingLeft: 60 }}>
          {milestones.map((m, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 28,
              opacity: m.sc,
              transform: `translateX(${(1 - m.sc) * -50}px)`,
            }}>
              {icons[i]}
              <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0, letterSpacing: '0.08em' }}>
                {m.label}
              </p>
              <span style={{ fontFamily: FONT, fontSize: 28, color: '#22C55E' }}>✓</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 64, opacity: butIn, textAlign: 'center' }}>
          <p style={{ ...headline(48, RED), margin: 0 }}>AND STILL FEEL BROKE.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleIn = spring({ frame, fps: 30, config: { damping: 16 } });
  const ctaIn = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const fixes = [
    { label: 'Spend on EXPERIENCES, not upgrades', delay: 50 },
    { label: 'Write down your "enough" number', delay: 85 },
    { label: 'Compare to past you — not neighbors', delay: 120 },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ opacity: titleIn, transform: `scale(${titleIn})`, marginBottom: 52, textAlign: 'center' }}>
          <p style={{ ...headline(40, ACCENT), margin: '0 0 8px' }}>HOW TO BREAK</p>
          <p style={{ ...headline(40, WHITE), margin: 0 }}>THE TREADMILL</p>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 34, marginBottom: 56 }}>
          {fixes.map((fix, i) => {
            const sc = spring({ frame: Math.max(0, frame - fix.delay), fps: 30, config: { damping: 15 } });
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 22,
                opacity: sc,
                transform: `translateX(${(1 - sc) * -60}px)`,
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: '50%',
                  background: ACCENT, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontFamily: FONT, fontSize: 24, color: WHITE, lineHeight: 1 }}>✓</span>
                </div>
                <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0, lineHeight: 1.2 }}>{fix.label}</p>
              </div>
            );
          })}
        </div>
        <div style={{
          opacity: ctaIn, background: ACCENT, borderRadius: 22,
          padding: '30px 50px', textAlign: 'center', width: '100%',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, letterSpacing: '0.08em', fontWeight: 900 }}>
            FOLLOW FOR MORE MONEY PSYCHOLOGY
          </p>
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
