import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0A0A0F';
const BG_LIGHT = '#EEF2FF';
const ACCENT = '#3B82F6';
const ACCENT2 = '#1E40AF';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
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
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 20], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phoneScale = spring({ frame: frame - 20, fps, from: 0.7, to: 1, config: { damping: 14, stiffness: 120 } });
  const warnOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const balance = Math.round(
    interpolate(frame, [25, 80], [150000, 193241], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const balanceFmt = balance.toLocaleString('en-US');

  const bars = [40, 55, 48, 65, 72, 68, 85];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 320, left: 340, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${ACCENT}18 0%, transparent 70%)` }} />

      <div style={{ position: 'absolute', top: 120, left: 60, right: 60, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <p style={headline(56, WHITE)}>YOU SET IT</p>
        <p style={{ ...headline(56, ACCENT), marginTop: 8 }}>AND FORGOT IT</p>
      </div>

      <div style={{
        position: 'absolute', top: 350, left: '50%',
        transform: `translateX(-50%) scale(${phoneScale})`,
        width: 320, height: 480, borderRadius: 32,
        background: '#1A1A2E', border: `2px solid ${ACCENT}44`,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE + '88', textAlign: 'center', margin: 0 }}>PORTFOLIO BALANCE</p>
        <p style={{ fontFamily: FONT, fontSize: 54, color: WHITE, textAlign: 'center', margin: 0 }}>${balanceFmt}</p>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginTop: 8 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ width: 28, height: h * 0.7, background: i === 6 ? ACCENT : ACCENT + '55', borderRadius: 4 }} />
          ))}
        </div>
        <p style={{ fontFamily: FONT, fontSize: 18, color: '#10B981', textAlign: 'center', margin: 0 }}>+28.4%</p>
      </div>

      <div style={{ position: 'absolute', bottom: 160, left: 60, right: 60, opacity: warnOpacity }}>
        <p style={{ ...headline(38, WHITE), lineHeight: 1.3 }}>BUT SOMETHING IS</p>
        <p style={{ ...headline(44, ACCENT) }}>WRONG INSIDE</p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1Scale = spring({ frame: frame - 10, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const bar2Scale = spring({ frame: frame - 30, fps, from: 0, to: 1, config: { damping: 14, stiffness: 100 } });
  const arrowOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BAR_H = 320;
  const stocksThen = 0.60;
  const stocksNow = 0.76;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 80, left: 60, right: 60, opacity: headerOpacity }}>
        <p style={{ ...headline(32, ACCENT2), marginBottom: 4 }}>NUMBER ONE</p>
        <p style={headline(48, BLACK)}>YOUR RISK</p>
        <p style={{ ...headline(48, BLACK), marginTop: 4 }}>QUIETLY GREW</p>
      </div>

      <div style={{ position: 'absolute', top: 320, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 48, alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 140, height: BAR_H * bar1Scale, display: 'flex', flexDirection: 'column', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ flex: stocksThen, background: ACCENT }} />
            <div style={{ flex: 1 - stocksThen, background: '#94A3B8' }} />
          </div>
          <p style={headline(26, BLACK)}>5 YEARS AGO</p>
          <p style={{ ...headline(22, ACCENT), marginTop: 2 }}>60% STOCKS</p>
          <p style={{ ...headline(22, '#64748B'), marginTop: 2 }}>40% BONDS</p>
        </div>

        <div style={{ opacity: arrowOpacity, alignSelf: 'center', marginBottom: 90 }}>
          <svg width="60" height="40" viewBox="0 0 60 40">
            <path d="M0 20 L45 20 M35 10 L50 20 L35 30" stroke={BLACK} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 140, height: BAR_H * bar2Scale, display: 'flex', flexDirection: 'column', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ flex: stocksNow, background: ACCENT }} />
            <div style={{ flex: 1 - stocksNow, background: '#94A3B8' }} />
          </div>
          <p style={headline(26, BLACK)}>TODAY</p>
          <p style={{ ...headline(22, ACCENT), marginTop: 2 }}>76% STOCKS</p>
          <p style={{ ...headline(22, '#64748B'), marginTop: 2 }}>24% BONDS</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 60, right: 60, opacity: arrowOpacity }}>
        <p style={{ ...headline(32, BLACK), lineHeight: 1.3 }}>YOU NEVER CHANGED IT —</p>
        <p style={{ ...headline(32, ACCENT), marginTop: 4 }}>THE MARKET DID</p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dropProgress = interpolate(frame, [40, 110], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const labelOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BAR_H = 260;
  const balancedH = BAR_H * (1 - 0.18 * dropProgress);
  const unbalancedH = BAR_H * (1 - 0.24 * dropProgress);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 80, left: 60, right: 60, opacity: headerOpacity }}>
        <p style={{ ...headline(32, ACCENT), marginBottom: 4 }}>NUMBER TWO</p>
        <p style={headline(48, WHITE)}>DRIFT COSTS MORE</p>
        <p style={{ ...headline(48, WHITE), marginTop: 4 }}>IN A CRASH</p>
      </div>

      <div style={{ position: 'absolute', top: 380, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 80, alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 140, height: balancedH, background: 'linear-gradient(to top, #10B981, #10B98166)', borderRadius: 12 }} />
          <p style={headline(26, WHITE)}>BALANCED</p>
          <p style={{ ...headline(32, '#10B981'), opacity: labelOpacity }}>−18%</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 140, height: unbalancedH, background: 'linear-gradient(to top, #EF4444, #EF444466)', borderRadius: 12 }} />
          <p style={headline(26, WHITE)}>DRIFTED</p>
          <p style={{ ...headline(32, '#EF4444'), opacity: labelOpacity }}>−24%</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 60, right: 60, opacity: labelOpacity }}>
        <p style={{ ...headline(34, WHITE), lineHeight: 1.3 }}>THAT EXTRA 6% LOSS</p>
        <p style={{ ...headline(34, ACCENT), marginTop: 4 }}>TAKES YEARS TO RECOVER</p>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card1Y = spring({ frame: frame - 20, fps, from: -40, to: 0, config: { damping: 12, stiffness: 100 } });
  const card1Opacity = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const card2Y = spring({ frame: frame - 50, fps, from: 40, to: 0, config: { damping: 12, stiffness: 100 } });
  const card2Opacity = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 80, left: 60, right: 60, opacity: headerOpacity }}>
        <p style={{ ...headline(32, ACCENT2), marginBottom: 4 }}>NUMBER THREE</p>
        <p style={headline(48, BLACK)}>REBALANCING IS</p>
        <p style={{ ...headline(48, BLACK), marginTop: 4 }}>FREE STRATEGY</p>
      </div>

      <div style={{ position: 'absolute', top: 380, left: 60, right: 60, opacity: card1Opacity, transform: `translateY(${card1Y}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: '#DCFCE7', borderRadius: 20, padding: '24px 28px' }}>
          <svg width="56" height="56" viewBox="0 0 56 56">
            <rect x="4" y="4" width="48" height="48" rx="8" fill="#10B981" />
            <polyline points="10,40 22,26 32,32 48,14" stroke={WHITE} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: FONT, fontSize: 28, color: '#10B981', margin: 0 }}>SELL HIGH</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#374151', margin: '4px 0 0' }}>Trim overgrown stocks</p>
          </div>
          <svg width="36" height="36" viewBox="0 0 36 36">
            <path d="M18 32 L18 4 M9 13 L18 4 L27 13" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 540, left: 60, right: 60, opacity: card2Opacity, transform: `translateY(${card2Y}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: '#DBEAFE', borderRadius: 20, padding: '24px 28px' }}>
          <svg width="56" height="56" viewBox="0 0 56 56">
            <rect x="4" y="4" width="48" height="48" rx="8" fill={ACCENT} />
            <rect x="12" y="20" width="32" height="6" rx="3" fill={WHITE} />
            <rect x="12" y="30" width="24" height="6" rx="3" fill={WHITE} />
          </svg>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: FONT, fontSize: 28, color: ACCENT, margin: 0 }}>BUY LOW</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: '#374151', margin: '4px 0 0' }}>Add underweight bonds</p>
          </div>
          <svg width="36" height="36" viewBox="0 0 36 36">
            <path d="M18 4 L18 32 M9 23 L18 32 L27 23" stroke={ACCENT} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 60, right: 60, opacity: statOpacity, textAlign: 'center' }}>
        <p style={headline(52, ACCENT2)}>+0.35%</p>
        <p style={{ ...headline(30, BLACK), marginTop: 6 }}>EXTRA RETURN PER YEAR</p>
        <p style={{ fontFamily: FONT, fontSize: 20, color: '#6B7280', textAlign: 'center', margin: '8px 0 0' }}>Source: Vanguard Research</p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterProgress = interpolate(frame, [30, 150], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const extraAmount = Math.round(counterProgress * 46000);
  const extraFmt = extraAmount.toLocaleString('en-US');
  const totalFmt = Math.round(200000 + counterProgress * 46000).toLocaleString('en-US');
  const labelOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyOpacity = interpolate(frame, [5, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 90, left: 60, right: 60, opacity: headerOpacity }}>
        <p style={headline(44, WHITE)}>ON A $200K PORTFOLIO</p>
        <p style={{ ...headline(44, WHITE), marginTop: 6 }}>OVER 30 YEARS</p>
      </div>

      <div style={{ position: 'absolute', top: 310, left: '50%', transform: 'translateX(-50%)', opacity: piggyOpacity }}>
        <svg width="200" height="180" viewBox="0 0 200 180">
          <ellipse cx="95" cy="115" rx="72" ry="58" fill={ACCENT} />
          <circle cx="156" cy="82" r="36" fill={ACCENT} />
          <ellipse cx="144" cy="54" rx="11" ry="15" fill={ACCENT2} />
          <circle cx="165" cy="74" r="6" fill={WHITE} />
          <circle cx="167" cy="74" r="3" fill={BLACK} />
          <ellipse cx="186" cy="90" rx="13" ry="10" fill={ACCENT2} />
          <circle cx="182" cy="90" r="3" fill={BLACK} />
          <circle cx="190" cy="90" r="3" fill={BLACK} />
          <rect x="82" y="58" width="28" height="6" rx="3" fill={ACCENT2} />
          <rect x="36" y="158" width="18" height="18" rx="7" fill={ACCENT2} />
          <rect x="66" y="163" width="18" height="18" rx="7" fill={ACCENT2} />
          <rect x="104" y="163" width="18" height="18" rx="7" fill={ACCENT2} />
          <rect x="134" y="158" width="18" height="18" rx="7" fill={ACCENT2} />
          <path d="M23 100 Q6 82 14 62 Q22 42 18 32" stroke={ACCENT2} strokeWidth="5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 530, left: 60, right: 60, textAlign: 'center' }}>
        <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE + 'AA', textAlign: 'center', margin: 0 }}>WITH REBALANCING</p>
        <p style={{ fontFamily: FONT, fontSize: 80, color: '#10B981', textAlign: 'center', margin: '6px 0' }}>+${extraFmt}</p>
        <p style={{ fontFamily: FONT, fontSize: 32, color: WHITE, textAlign: 'center', margin: 0 }}>= ${totalFmt}</p>
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 60, right: 60, opacity: labelOpacity, textAlign: 'center' }}>
        <p style={headline(32, WHITE)}>FOR 15 MINUTES OF WORK</p>
        <p style={{ ...headline(32, ACCENT), marginTop: 6 }}>ONCE A YEAR</p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calScale = spring({ frame: frame - 15, fps, from: 0.5, to: 1, config: { damping: 12, stiffness: 100 } });
  const phoneScale = spring({ frame: frame - 50, fps, from: 0.5, to: 1, config: { damping: 12, stiffness: 100 } });
  const ctaOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 80, left: 60, right: 60, opacity: headerOpacity }}>
        <p style={headline(44, BLACK)}>THE FIX:</p>
        <p style={{ ...headline(50, ACCENT), marginTop: 4 }}>15 MINUTES</p>
        <p style={{ ...headline(44, BLACK), marginTop: 4 }}>ONCE A YEAR</p>
      </div>

      <div style={{ position: 'absolute', top: 350, left: 90, transform: `scale(${calScale})`, transformOrigin: 'top left' }}>
        <svg width="240" height="240" viewBox="0 0 240 240">
          <rect x="8" y="36" width="224" height="196" rx="16" fill={WHITE} stroke={ACCENT} strokeWidth="4" />
          <rect x="8" y="36" width="224" height="56" rx="16" fill={ACCENT} />
          <rect x="8" y="68" width="224" height="24" fill={ACCENT} />
          <text x="120" y="70" textAnchor="middle" fill={WHITE} fontFamily="Arial" fontWeight="bold" fontSize="22">JANUARY</text>
          <circle cx="72" cy="36" r="10" fill={ACCENT2} />
          <circle cx="168" cy="36" r="10" fill={ACCENT2} />
          <circle cx="44" cy="108" r="22" fill={ACCENT} />
          <text x="44" y="115" textAnchor="middle" fill={WHITE} fontFamily="Arial" fontWeight="bold" fontSize="20">1</text>
          <rect x="20" y="145" width="30" height="26" rx="6" fill="#E2E8F0" />
          <rect x="60" y="145" width="30" height="26" rx="6" fill="#E2E8F0" />
          <rect x="100" y="145" width="30" height="26" rx="6" fill="#E2E8F0" />
          <rect x="140" y="145" width="30" height="26" rx="6" fill="#E2E8F0" />
          <rect x="180" y="145" width="30" height="26" rx="6" fill="#E2E8F0" />
          <rect x="20" y="183" width="30" height="26" rx="6" fill="#E2E8F0" />
          <rect x="60" y="183" width="30" height="26" rx="6" fill="#E2E8F0" />
          <rect x="100" y="183" width="30" height="26" rx="6" fill="#E2E8F0" />
          <rect x="140" y="183" width="30" height="26" rx="6" fill="#E2E8F0" />
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 350, right: 60, transform: `scale(${phoneScale})`, transformOrigin: 'top right' }}>
        <svg width="150" height="260" viewBox="0 0 150 260">
          <rect x="4" y="4" width="142" height="252" rx="22" fill="#1E293B" stroke={ACCENT} strokeWidth="3" />
          <rect x="14" y="28" width="122" height="196" rx="8" fill="#0F172A" />
          <text x="75" y="75" textAnchor="middle" fill={WHITE + '88'} fontFamily="Arial" fontSize="12">My Portfolio</text>
          <text x="75" y="112" textAnchor="middle" fill={WHITE} fontFamily="Arial" fontWeight="bold" fontSize="20">$193,241</text>
          <rect x="22" y="143" width="106" height="40" rx="10" fill={ACCENT} />
          <text x="75" y="168" textAnchor="middle" fill={WHITE} fontFamily="Arial" fontWeight="bold" fontSize="15">REBALANCE</text>
          <rect x="55" y="242" width="40" height="6" rx="3" fill={WHITE + '44'} />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 90, left: 60, right: 60, opacity: ctaOpacity }}>
        <p style={headline(36, BLACK)}>SET A REMINDER.</p>
        <p style={{ ...headline(36, BLACK), marginTop: 6 }}>CLICK REBALANCE.</p>
        <p style={{ ...headline(38, ACCENT), marginTop: 8 }}>CLAIM YOUR $46K.</p>
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
