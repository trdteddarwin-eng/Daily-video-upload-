import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#10B981';
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

  const titleY = spring({ frame, fps, from: 60, to: 0, config: { damping: 12, stiffness: 100 } });
  const iconScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 10, stiffness: 80 } });
  const subtitleOpacity = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taglineOpacity = interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dialAngle = interpolate(frame, [10, 80], [0, 270], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 36, padding: '0 48px',
      }}>
        <svg width={200} height={200} viewBox="0 0 200 200" style={{ transform: `scale(${iconScale})` }}>
          <rect x={15} y={25} width={170} height={150} rx={14} fill="none" stroke={ACCENT} strokeWidth={6} />
          <circle cx={100} cy={100} r={48} fill="none" stroke={ACCENT} strokeWidth={5} />
          <g transform={`rotate(${dialAngle}, 100, 100)`}>
            {Array.from({ length: 8 }, (_, i) => {
              const a = (i * 45 * Math.PI) / 180;
              const x1 = 100 + 35 * Math.cos(a);
              const y1 = 100 + 35 * Math.sin(a);
              const x2 = 100 + 44 * Math.cos(a);
              const y2 = 100 + 44 * Math.sin(a);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ACCENT} strokeWidth={3} />;
            })}
          </g>
          <circle cx={100} cy={100} r={14} fill={ACCENT} />
          <text x={100} y={107} textAnchor="middle" fontSize={18} fill={BG_DARK} fontFamily="Arial Black" fontWeight="900">$</text>
          <rect x={163} y={52} width={22} height={14} rx={4} fill={ACCENT} opacity={0.7} />
          <rect x={163} y={134} width={22} height={14} rx={4} fill={ACCENT} opacity={0.7} />
        </svg>

        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(46, WHITE)}>YOUR RETIREMENT</p>
          <p style={headline(46, WHITE)}>HAS A SECRET</p>
          <p style={{ ...headline(72, ACCENT), marginTop: 6 }}>ENEMY</p>
        </div>

        <p style={{ ...headline(38, WHITE), opacity: subtitleOpacity }}>THE 1% FEE</p>

        <div style={{ opacity: taglineOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 27, color: WHITE, opacity: 0.75, margin: 0 }}>
            Invisible. Automatic.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 27, color: WHITE, opacity: 0.75, margin: '6px 0 0' }}>
            Costs more than a house.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const docSlide = spring({ frame, fps, from: -280, to: 0, config: { damping: 14, stiffness: 90 } });
  const textOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pillW = interpolate(frame, [70, 120], [0, 260], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const quoteOpacity = interpolate(frame, [130, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 40, padding: '0 48px',
      }}>
        <svg width={220} height={270} viewBox="0 0 220 270" style={{ transform: `translateX(${docSlide}px)` }}>
          <rect x={15} y={8} width={190} height={254} rx={10} fill="white" stroke={BLACK} strokeWidth={3} />
          <rect x={15} y={8} width={190} height={44} rx={10} fill={BLACK} />
          <text x={110} y={36} textAnchor="middle" fontSize={14} fill={WHITE} fontFamily="Arial Black">FUND PROSPECTUS</text>
          <rect x={32} y={68} width={140} height={8} rx={4} fill={BLACK} opacity={0.15} />
          <rect x={32} y={86} width={110} height={8} rx={4} fill={BLACK} opacity={0.15} />
          <rect x={32} y={104} width={125} height={8} rx={4} fill={BLACK} opacity={0.15} />
          <rect x={28} y={124} width={164} height={36} rx={7} fill={ACCENT} opacity={0.2} />
          <text x={36} y={147} fontSize={13} fill={BLACK} fontFamily="Arial Black">EXPENSE RATIO: 1.00%</text>
          <rect x={32} y={178} width={115} height={8} rx={4} fill={BLACK} opacity={0.15} />
          <rect x={32} y={196} width={135} height={8} rx={4} fill={BLACK} opacity={0.15} />
          <rect x={32} y={214} width={95} height={8} rx={4} fill={BLACK} opacity={0.15} />
          <rect x={32} y={232} width={120} height={8} rx={4} fill={BLACK} opacity={0.15} />
        </svg>

        <div style={{ textAlign: 'center', opacity: textOpacity }}>
          <p style={headline(42, BLACK)}>ACTIVELY MANAGED</p>
          <p style={headline(42, BLACK)}>FUNDS CHARGE A</p>
          <p style={{ ...headline(52, ACCENT), marginTop: 6 }}>MANAGEMENT FEE</p>
        </div>

        <div style={{
          width: pillW, height: 56, background: ACCENT, borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          <p style={{ ...headline(36, WHITE), whiteSpace: 'nowrap' }}>~1% PER YEAR</p>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, opacity: quoteOpacity * 0.7, margin: 0, textAlign: 'center' }}>
          "Sounds tiny, right?"
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yearProgress = interpolate(frame, [40, 190], [0, 40], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const currentYear = Math.floor(yearProgress);
  const cumulativeLoss = Math.round(1000 * ((Math.pow(1.07, yearProgress) - 1) / 0.07));
  const barH = interpolate(frame, [40, 190], [0, 360], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });
  const noteOpacity = interpolate(frame, [165, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 28, padding: '0 48px',
      }}>
        <div style={{ opacity: titleOpacity, textAlign: 'center' }}>
          <p style={headline(38, WHITE)}>$100K INVESTMENT</p>
          <p style={{ ...headline(36, ACCENT), marginTop: 4 }}>TOTAL FEES EATEN:</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 32 }}>
          <div style={{
            width: 110, height: 360, background: 'rgba(255,255,255,0.08)',
            borderRadius: 12, display: 'flex', flexDirection: 'column',
            justifyContent: 'flex-end', overflow: 'hidden',
          }}>
            <div style={{
              width: '100%', height: Math.max(0, barH),
              background: 'linear-gradient(to top, #EF4444, #F97316)', borderRadius: 12,
            }} />
          </div>

          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, opacity: 0.8, margin: 0 }}>YEAR</p>
            <p style={{ ...headline(66, ACCENT), marginTop: 0 }}>{currentYear}</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, opacity: 0.8, margin: '16px 0 0' }}>FEES LOST</p>
            <p style={{ ...headline(44, '#EF4444'), marginTop: 0 }}>
              ${cumulativeLoss.toLocaleString()}
            </p>
          </div>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, opacity: noteOpacity * 0.8, margin: 0, textAlign: 'center' }}>
          Compound growth you'll never see.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [20, 120], [0, 275], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const bar2H = interpolate(frame, [35, 145], [0, 360], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const diffScale = spring({ frame: Math.max(0, frame - 135), fps, config: { damping: 10, stiffness: 120 } });
  const bottomOpacity = interpolate(frame, [175, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 28, padding: '0 48px',
      }}>
        <div style={{ opacity: titleOpacity, textAlign: 'center' }}>
          <p style={headline(38, BLACK)}>AFTER 40 YEARS</p>
          <p style={{ ...headline(36, ACCENT), marginTop: 4 }}>ON $100,000</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 120, height: 360, background: 'rgba(0,0,0,0.08)', borderRadius: 12,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden',
            }}>
              <div style={{
                width: '100%', height: Math.max(0, bar1H), background: '#EF4444', borderRadius: 12,
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10,
              }}>
                {bar1H > 50 && <p style={{ ...headline(18, WHITE), whiteSpace: 'nowrap' }}>$1.03M</p>}
              </div>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 17, color: BLACK, textAlign: 'center', margin: 0, opacity: 0.7 }}>
              1% FEE FUND
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 120, height: 360, background: 'rgba(0,0,0,0.08)', borderRadius: 12,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden',
            }}>
              <div style={{
                width: '100%', height: Math.max(0, bar2H), background: ACCENT, borderRadius: 12,
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 10,
              }}>
                {bar2H > 50 && <p style={{ ...headline(18, WHITE), whiteSpace: 'nowrap' }}>$1.35M</p>}
              </div>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 17, color: BLACK, textAlign: 'center', margin: 0, opacity: 0.7 }}>
              0.04% INDEX
            </p>
          </div>
        </div>

        <div style={{
          transform: `scale(${diffScale})`, background: ACCENT,
          borderRadius: 14, padding: '16px 36px', textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0, opacity: 0.9 }}>DIFFERENCE</p>
          <p style={{ ...headline(56, WHITE), marginTop: 4 }}>$320,000</p>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, opacity: bottomOpacity * 0.7, margin: 0, textAlign: 'center' }}>
          Three hundred and twenty thousand dollars.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const trillionProgress = interpolate(frame, [30, 170], [0, 10], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const displayTrillions = trillionProgress.toFixed(1);
  const stackProgress = interpolate(frame, [20, 150], [0, 6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const punchOpacity = interpolate(frame, [175, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 32, padding: '0 48px',
      }}>
        <div style={{ opacity: titleOpacity, textAlign: 'center' }}>
          <p style={headline(38, WHITE)}>CURRENTLY LOCKED IN</p>
          <p style={{ ...headline(36, '#EF4444'), marginTop: 4 }}>HIGH-FEE FUNDS</p>
        </div>

        <svg width={360} height={200} viewBox="0 0 360 200">
          {Array.from({ length: 6 }, (_, i) => {
            const stackOpacity = interpolate(stackProgress, [i, i + 0.6], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            const x = i * 58 + 12;
            return (
              <g key={i} opacity={stackOpacity}>
                {Array.from({ length: 4 }, (__, j) => {
                  const y = 180 - j * 16;
                  const fillColor = j === 3 ? ACCENT : '#0D9668';
                  return (
                    <g key={j}>
                      <rect x={x} y={y} width={50} height={14} rx={3} fill={fillColor} />
                      <line x1={x + 6} y1={y + 4} x2={x + 44} y2={y + 4} stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
                      <line x1={x + 6} y1={y + 9} x2={x + 44} y2={y + 9} stroke="rgba(255,255,255,0.25)" strokeWidth={1} />
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>

        <div style={{ textAlign: 'center' }}>
          <p style={{ ...headline(88, ACCENT), letterSpacing: '0.05em' }}>${displayTrillions}T</p>
          <p style={headline(32, WHITE)}>TRILLION</p>
        </div>

        <p style={{ fontFamily: FONT, fontSize: 27, color: WHITE, opacity: punchOpacity * 0.8, margin: 0, textAlign: 'center' }}>
          Fund managers get rich. Do you?
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneScale = spring({ frame, fps, config: { damping: 12, stiffness: 90 } });
  const item1Opacity = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item2Opacity = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item3Opacity = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 10, stiffness: 120 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 28, padding: '0 56px',
      }}>
        <svg width={170} height={230} viewBox="0 0 170 230" style={{ transform: `scale(${phoneScale})` }}>
          <rect x={12} y={8} width={146} height={214} rx={20} fill="none" stroke={ACCENT} strokeWidth={5} />
          <rect x={22} y={30} width={126} height={172} rx={8} fill="#1A2A1A" />
          <circle cx={85} cy={20} r={6} fill={ACCENT} opacity={0.8} />
          <rect x={22} y={30} width={126} height={34} rx={8} fill={ACCENT} opacity={0.22} />
          <text x={85} y={53} textAnchor="middle" fontSize={12} fill={WHITE} fontFamily="Arial Black">MY 401(K)</text>
          <rect x={32} y={78} width={106} height={24} rx={5} fill="rgba(255,255,255,0.07)" />
          <rect x={32} y={112} width={106} height={24} rx={5} fill="rgba(255,255,255,0.07)" />
          <rect x={32} y={146} width={106} height={24} rx={5} fill="rgba(255,255,255,0.07)" />
          <text x={85} y={196} textAnchor="middle" fontSize={26} fill={ACCENT} fontFamily="Arial Black">$</text>
        </svg>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ opacity: item1Opacity, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', background: ACCENT, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <p style={{ fontFamily: FONT, fontSize: 20, color: BG_DARK, margin: 0 }}>1</p>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 25, color: WHITE, margin: 0 }}>Open your 401k app</p>
          </div>

          <div style={{ opacity: item2Opacity, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', background: ACCENT, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <p style={{ fontFamily: FONT, fontSize: 20, color: BG_DARK, margin: 0 }}>2</p>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 25, color: WHITE, margin: 0 }}>Find each fund's expense ratio</p>
          </div>

          <div style={{ opacity: item3Opacity, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', background: '#EF4444', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0 }}>!</p>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 25, color: WHITE, margin: 0 }}>Above 0.1%? Switch to index funds</p>
          </div>
        </div>

        <div style={{
          transform: `scale(${ctaScale})`, background: ACCENT,
          borderRadius: 14, padding: '18px 36px', textAlign: 'center',
        }}>
          <p style={{ ...headline(40, WHITE) }}>KEEP $320,000</p>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: '6px 0 0', opacity: 0.85 }}>
            Your future self will thank you.
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
