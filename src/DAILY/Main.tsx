import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F172A';
const BG_LIGHT = '#F1F5F9';
const ACCENT = '#3B82F6';
const WHITE = '#F1F5F9';
const DANGER = '#EF4444';
const SUCCESS = '#10B981';
const MID = '#94A3B8';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Arial", "Helvetica Neue", Arial, sans-serif';

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

// ─── Scene 2: Bank Pricing Tiers ────────────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const bankSpring = spring({ frame, fps, config: { damping: 18, stiffness: 70 } });
  const bankY = interpolate(bankSpring, [0, 1], [80, 0]);

  const tiers = [
    { label: '760+', rate: 'BEST RATE', color: SUCCESS, delay: 40 },
    { label: '720–759', rate: 'HIGHER RATE', color: '#F59E0B', delay: 72 },
    { label: '580–719', rate: 'HIGHEST RATE', color: DANGER, delay: 104 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        <p style={{ ...headline(38, '#1E293B'), opacity: titleOpacity, marginBottom: 24 }}>BANK PRICING TIERS</p>

        <div style={{ transform: `translateY(${bankY}px)`, opacity: bankSpring, marginBottom: 36 }}>
          <svg width="120" height="110" viewBox="0 0 120 110">
            <rect x="10" y="46" width="100" height="60" fill="#1E293B" rx="4" />
            <polygon points="60,10 5,46 115,46" fill="#1E293B" />
            <rect x="20" y="56" width="12" height="44" fill="#F1F5F9" rx="2" />
            <rect x="40" y="56" width="12" height="44" fill="#F1F5F9" rx="2" />
            <rect x="68" y="56" width="12" height="44" fill="#F1F5F9" rx="2" />
            <rect x="88" y="56" width="12" height="44" fill="#F1F5F9" rx="2" />
            <rect x="48" y="79" width="24" height="27" fill={ACCENT} rx="3" />
            <circle cx="60" cy="28" r="6" fill="#F59E0B" />
          </svg>
        </div>

        {tiers.map((tier, i) => {
          const rowOpacity = interpolate(frame, [tier.delay, tier.delay + 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const rowX = interpolate(frame, [tier.delay, tier.delay + 26], [-50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const isFirst = i === 0;
          return (
            <div key={tier.label} style={{
              opacity: rowOpacity,
              transform: `translateX(${rowX}px)`,
              width: 860,
              display: 'flex',
              alignItems: 'center',
              background: isFirst ? '#DBEAFE' : '#F8FAFC',
              borderRadius: 16,
              padding: '18px 28px',
              marginBottom: 14,
              border: isFirst ? `3px solid ${ACCENT}` : '3px solid #E2E8F0',
            }}>
              <div style={{ width: 140, padding: '8px 12px', background: tier.color, borderRadius: 10, textAlign: 'center' }}>
                <p style={{ ...headline(30, '#fff'), letterSpacing: '0.04em' }}>{tier.label}</p>
              </div>
              <div style={{ flex: 1, paddingLeft: 22 }}>
                <p style={{ ...headline(32, '#1E293B'), textAlign: 'left', letterSpacing: '0.08em' }}>{tier.rate}</p>
              </div>
              {isFirst && (
                <div style={{ background: ACCENT, borderRadius: 8, padding: '6px 14px' }}>
                  <p style={{ ...headline(22, '#fff'), letterSpacing: '0.08em' }}>YOU WANT THIS</p>
                </div>
              )}
            </div>
          );
        })}
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: The $23,000 Gap ────────────────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const houseSpring = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const houseScale = interpolate(houseSpring, [0, 1], [0.3, 1]);

  const bar1H = interpolate(frame, [55, 130], [0, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [78, 155], [0, 320], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapOpacity = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapSpring = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 16, stiffness: 100 } });
  const gapScale = interpolate(gapSpring, [0, 1], [0.5, 1]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        <p style={{ ...headline(36, WHITE), opacity: titleOpacity, marginBottom: 18 }}>$400,000 HOME LOAN</p>

        <div style={{ transform: `scale(${houseScale})`, marginBottom: 24 }}>
          <svg width="140" height="120" viewBox="0 0 140 120">
            <polygon points="70,5 5,60 135,60" fill={ACCENT} />
            <rect x="15" y="58" width="110" height="60" fill="#1E40AF" rx="4" />
            <rect x="55" y="82" width="30" height="36" fill="#93C5FD" rx="3" />
            <rect x="22" y="68" width="24" height="22" fill="#93C5FD" rx="2" />
            <rect x="94" y="68" width="24" height="22" fill="#93C5FD" rx="2" />
          </svg>
        </div>

        <div style={{ display: 'flex', gap: 60, alignItems: 'flex-end', height: 360 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={{ ...headline(30, SUCCESS) }}>760+</p>
            <div style={{ width: 175, height: bar1H, background: SUCCESS, borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10 }}>
              {bar1H > 55 && <p style={{ ...headline(26, '#fff') }}>$265K</p>}
            </div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 25, color: MID, textAlign: 'center' }}>total interest</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <p style={{ ...headline(30, DANGER) }}>759</p>
            <div style={{ width: 175, height: bar2H, background: DANGER, borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10 }}>
              {bar2H > 55 && <p style={{ ...headline(26, '#fff') }}>$288K</p>}
            </div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 25, color: MID, textAlign: 'center' }}>total interest</p>
          </div>
        </div>

        <div style={{ opacity: gapOpacity, transform: `scale(${gapScale})`, background: DANGER, borderRadius: 16, padding: '16px 44px', marginTop: 16 }}>
          <p style={{ ...headline(44, '#fff') }}>$23,000 GAP</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: 31% Are In the Wrong Tier ─────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const chartProgress = interpolate(frame, [28, 118], [0, 0.31], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const r = 148;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - chartProgress);

  const pctOpacity = interpolate(frame, [55, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctSpring = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 20, stiffness: 80 } });
  const pctScale = interpolate(pctSpring, [0, 1], [0.5, 1]);

  const statOpacity = interpolate(frame, [128, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const peopleCount = Math.max(0, Math.floor(5));
  const people = Array.from({ length: peopleCount }, (_, i) => i);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        <p style={{ ...headline(36, '#1E293B'), opacity: titleOpacity, marginBottom: 28 }}>
          WHO'S STUCK BELOW 760?
        </p>

        <div style={{ position: 'relative', width: 336, height: 336 }}>
          <svg width="336" height="336" viewBox="0 0 336 336">
            <circle cx="168" cy="168" r={r} fill="none" stroke="#E2E8F0" strokeWidth="38" />
            <circle
              cx="168"
              cy="168"
              r={r}
              fill="none"
              stroke={ACCENT}
              strokeWidth="38"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 168 168)"
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pctOpacity,
            transform: `scale(${pctScale})`,
          }}>
            <p style={{ ...headline(92, ACCENT), lineHeight: 1 }}>31%</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#475569', textAlign: 'center', marginTop: 4 }}>of Americans</p>
          </div>
        </div>

        <p style={{ ...headline(34, '#1E293B'), marginTop: 22, opacity: statOpacity }}>SCORE 700–759</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 29, color: '#475569', textAlign: 'center', marginTop: 8, opacity: statOpacity }}>
          one tier below the best rates
        </p>

        <div style={{ display: 'flex', gap: 18, marginTop: 28, opacity: personOpacity }}>
          {people.map((i) => {
            const col = i === 1 ? ACCENT : '#CBD5E1';
            return (
              <svg key={i} width="46" height="66" viewBox="0 0 46 66">
                <circle cx="23" cy="14" r="10" fill={col} />
                <rect x="11" y="28" width="24" height="30" fill={col} rx="6" />
                <rect x="4" y="30" width="10" height="22" fill={col} rx="4" />
                <rect x="32" y="30" width="10" height="22" fill={col} rx="4" />
              </svg>
            );
          })}
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: Two Fastest Moves ──────────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const cardSpring = spring({ frame, fps, config: { damping: 18, stiffness: 70 } });
  const cardScale = interpolate(cardSpring, [0, 1], [0.4, 1]);

  const utilizationPct = Math.round(interpolate(frame, [28, 122], [30, 6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const barColor = utilizationPct <= 10 ? SUCCESS : '#F59E0B';

  const move2Opacity = interpolate(frame, [132, 162], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const move2X = interpolate(frame, [132, 162], [44, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        <p style={{ ...headline(38, WHITE), opacity: titleOpacity, marginBottom: 28 }}>HOW TO CROSS THE LINE</p>

        <div style={{ width: 860, background: '#1E293B', borderRadius: 20, padding: '28px 36px', marginBottom: 22, transform: `scale(${cardScale})` }}>
          <p style={{ ...headline(27, ACCENT), textAlign: 'left', letterSpacing: '0.14em', marginBottom: 14 }}>NUMBER ONE</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <svg width="108" height="72" viewBox="0 0 108 72">
              <rect x="0" y="0" width="108" height="72" rx="8" fill={ACCENT} />
              <rect x="0" y="22" width="108" height="18" fill="#1D4ED8" />
              <rect x="8" y="8" width="28" height="20" rx="3" fill="#93C5FD" />
              <rect x="8" y="50" width="64" height="6" rx="2" fill="#93C5FD" opacity="0.7" />
            </svg>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: WHITE, marginBottom: 10 }}>
                Credit utilization below 6%
              </p>
              <div style={{ background: '#334155', borderRadius: 8, height: 20, overflow: 'hidden' }}>
                <div style={{ width: `${utilizationPct}%`, height: '100%', background: barColor, borderRadius: 8 }} />
              </div>
              <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: MID, marginTop: 6 }}>{utilizationPct}% utilization</p>
            </div>
          </div>
        </div>

        <div style={{ width: 860, background: '#1E293B', borderRadius: 20, padding: '28px 36px', opacity: move2Opacity, transform: `translateX(${move2X}px)` }}>
          <p style={{ ...headline(27, ACCENT), textAlign: 'left', letterSpacing: '0.14em', marginBottom: 14 }}>NUMBER TWO</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <svg width="64" height="106" viewBox="0 0 64 106">
              <rect x="2" y="2" width="60" height="102" rx="10" fill="#334155" />
              <rect x="8" y="14" width="48" height="66" rx="4" fill={ACCENT} />
              <circle cx="32" cy="92" r="5" fill="#475569" />
              <text x="32" y="40" textAnchor="middle" fill="white" fontSize="10" fontFamily="Arial" fontWeight="bold">LIMIT</text>
              <text x="32" y="56" textAnchor="middle" fill="white" fontSize="14" fontFamily="Arial" fontWeight="bold">&#8593;</text>
            </svg>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: WHITE }}>Request a credit limit increase</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: MID, marginTop: 8 }}>No new accounts — just call and ask</p>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: CTA — Pull Your Score ─────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const scoreVal = Math.round(interpolate(frame, [18, 105], [750, 760], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const crossed = scoreVal >= 760;
  const scoreColor = crossed ? SUCCESS : DANGER;

  const boxSpring = spring({ frame, fps, config: { damping: 20, stiffness: 70 } });
  const boxScale = interpolate(boxSpring, [0, 1], [0.5, 1]);

  const badgeSpring = spring({ frame: Math.max(0, frame - 98), fps, config: { damping: 14, stiffness: 100 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.3, 1]);
  const badgeOpacity = interpolate(frame, [98, 128], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ctaOpacity = interpolate(frame, [145, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [145, 175], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const lineOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        <p style={{ ...headline(38, '#1E293B'), opacity: titleOpacity, marginBottom: 24 }}>CHECK YOUR SCORE</p>

        <div style={{ transform: `scale(${boxScale})`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 540, height: 220 }}>
          <div style={{
            position: 'absolute',
            width: 480,
            height: 190,
            borderRadius: 28,
            background: crossed ? 'rgba(16,185,129,0.10)' : 'rgba(239,68,68,0.10)',
            border: `4px solid ${scoreColor}`,
          }} />
          <p style={{ ...headline(200, scoreColor), lineHeight: 1, position: 'relative' }}>{scoreVal}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8, opacity: lineOpacity }}>
          <div style={{ width: 80, height: 3, background: '#CBD5E1', borderRadius: 2 }} />
          <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#64748B' }}>760 threshold</p>
          <div style={{ width: 80, height: 3, background: '#CBD5E1', borderRadius: 2 }} />
        </div>

        <div style={{ opacity: badgeOpacity, transform: `scale(${badgeScale})`, marginTop: 26 }}>
          <div style={{ background: SUCCESS, borderRadius: 20, padding: '18px 48px' }}>
            <p style={{ ...headline(50, '#fff') }}>$23,000 SAVED</p>
          </div>
        </div>

        <div style={{ opacity: ctaOpacity, transform: `translateY(${ctaY}px)`, marginTop: 28, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 31, color: '#1E293B', lineHeight: 1.4 }}>
            If you're between 700–759, you're leaving
          </p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 31, color: ACCENT, fontWeight: 'bold', lineHeight: 1.4 }}>
            $23,000 on the table. Go get it.
          </p>
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

// Scene 1: "750 vs 760" — The Hook
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: 'clamp' });
  const transitionProg = interpolate(frame, [80, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const underlineW = interpolate(frame, [18, 72], [0, 460], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(frame, [58, 90], [0, 1], { extrapolateRight: 'clamp' });
  const subBodyOpacity = interpolate(frame, [105, 135], [0, 1], { extrapolateRight: 'clamp' });

  const num750Scale = interpolate(transitionProg, [0, 0.5, 1], [1, 1.25, 0.05]);
  const num750Opacity = 1 - transitionProg;
  const num760Scale = interpolate(transitionProg, [0, 0.5, 1], [0.05, 0.75, 1]);
  const num760Opacity = transitionProg;

  const slideSpring = spring({ frame, fps, config: { damping: 20, stiffness: 60 } });
  const topY = interpolate(slideSpring, [0, 1], [50, 0]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        <div style={{ transform: `translateY(${topY}px)`, opacity: labelOpacity, marginBottom: 28 }}>
          <p style={{ ...headline(36, MID), letterSpacing: '0.18em' }}>THE MAGIC NUMBER ISN'T</p>
        </div>

        <div style={{ position: 'relative', width: 520, height: 270, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', transform: `scale(${num750Scale})`, opacity: num750Opacity }}>
            <p style={{ ...headline(230, DANGER), lineHeight: 1 }}>750</p>
          </div>
          <div style={{ position: 'absolute', transform: `scale(${num760Scale})`, opacity: num760Opacity }}>
            <p style={{ ...headline(230, ACCENT), lineHeight: 1 }}>760</p>
          </div>
        </div>

        <div style={{ width: underlineW, height: 6, background: ACCENT, borderRadius: 3, marginTop: 8 }} />

        <p style={{ ...headline(40, WHITE), marginTop: 48, opacity: subtitleOpacity }}>
          BANKS USE A DIFFERENT CUTOFF
        </p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 33, color: MID, textAlign: 'center', marginTop: 18, opacity: subBodyOpacity }}>
          that 10-point gap costs you $23,000
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};
