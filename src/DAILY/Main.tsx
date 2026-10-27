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

  const ringsScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, durationInFrames: 45 });
  const titleOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [30, 55], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [55, 80], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const glowOpacity = interpolate(frame, [60, 110], [0, 0.25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarOpacity = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          gap: '30px',
        }}
      >
        <svg width={500} height={300} style={{ overflow: 'visible' }}>
          {/* Glow behind rings */}
          <circle cx={210} cy={130} r={100} fill={ACCENT} opacity={glowOpacity} />
          <circle cx={290} cy={130} r={100} fill={WHITE} opacity={glowOpacity * 0.4} />
          {/* Wedding Ring 1 */}
          <circle
            cx={210}
            cy={130}
            r={90 * ringsScale}
            fill="none"
            stroke={ACCENT}
            strokeWidth={22}
          />
          {/* Wedding Ring 2 */}
          <circle
            cx={290}
            cy={130}
            r={90 * ringsScale}
            fill="none"
            stroke={WHITE}
            strokeWidth={22}
          />
          {/* Dollar tag */}
          <text
            x={250}
            y={270}
            textAnchor="middle"
            fontSize={50}
            fill={ACCENT}
            fontFamily={FONT}
            opacity={dollarOpacity}
            fontWeight="bold"
          >
            $400K HIDDEN
          </text>
        </svg>

        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: 'center',
          }}
        >
          <p style={headline(84, WHITE)}>SPOUSAL</p>
          <p style={headline(84, ACCENT)}>BENEFIT</p>
        </div>

        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: FONT,
              fontSize: 34,
              color: WHITE,
              opacity: 0.75,
              margin: 0,
              textAlign: 'center',
              letterSpacing: '0.05em',
            }}
          >
            The $400K secret nobody tells you
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// APPEND_B

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, durationInFrames: 40 });
  const amount = interpolate(frame, [50, 140], [0, 1900], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const amountOpacity = interpolate(frame, [50, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: frame - 90, fps, config: { damping: 10, stiffness: 120 }, durationInFrames: 30 });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          gap: '36px',
        }}
      >
        {/* Social Security Card */}
        <svg
          width={560}
          height={320}
          style={{ overflow: 'visible', transform: `scale(${cardScale})` }}
        >
          {/* Card body */}
          <rect x={10} y={10} width={540} height={300} rx={18} fill={BLACK} />
          {/* Card header */}
          <rect x={10} y={10} width={540} height={78} rx={18} fill={ACCENT} />
          <rect x={10} y={66} width={540} height={22} fill={ACCENT} />
          <text
            x={30}
            y={57}
            fontSize={30}
            fill={BLACK}
            fontFamily={FONT}
            fontWeight="bold"
            letterSpacing={2}
          >
            SOCIAL SECURITY
          </text>
          {/* Card detail lines */}
          <text
            x={30}
            y={130}
            fontSize={22}
            fill={WHITE}
            fontFamily="Arial, sans-serif"
            opacity={0.55}
          >
            SPOUSAL BENEFIT
          </text>
          <text
            x={30}
            y={175}
            fontSize={34}
            fill={WHITE}
            fontFamily="'Courier New', monospace"
            letterSpacing={4}
          >
            XXX - XX - XXXX
          </text>
          {/* 50% badge */}
          <g opacity={badgeOpacity} transform={`translate(480, 220) scale(${Math.max(0, badgeScale)})`}>
            <circle cx={0} cy={0} r={52} fill={ACCENT} />
            <text x={0} y={-6} textAnchor="middle" fontSize={26} fill={BLACK} fontFamily={FONT} fontWeight="bold">50%</text>
            <text x={0} y={18} textAnchor="middle" fontSize={14} fill={BLACK} fontFamily={FONT}>OF SPOUSE</text>
          </g>
        </svg>

        {/* Amount counter */}
        <div style={{ opacity: amountOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 96, color: BLACK, margin: 0, textAlign: 'center', letterSpacing: '0.1em' }}>
            ${Math.floor(amount).toLocaleString()}
            <span style={{ fontSize: 44, letterSpacing: '0.05em' }}>/mo</span>
          </p>
        </div>

        {/* Subtext */}
        <div style={{ opacity: subOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: BLACK, margin: 0, textAlign: 'center', letterSpacing: '0.08em' }}>
            EVEN IF YOU NEVER WORKED
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const calScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, durationInFrames: 45 });
  const scissorX = interpolate(frame, [40, 90], [-220, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bulletOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          gap: '36px',
        }}
      >
        {/* Calendar + Scissors */}
        <svg width={580} height={300} style={{ overflow: 'visible' }}>
          {/* Calendar — scales from center */}
          <g transform={`translate(290, 150) scale(${calScale}) translate(-290, -150)`}>
            <rect x={90} y={20} width={400} height={260} rx={16} fill={WHITE} />
            <rect x={90} y={20} width={400} height={72} rx={16} fill={ACCENT} />
            <rect x={90} y={68} width={400} height={24} fill={ACCENT} />
            <text x={290} y={62} textAnchor="middle" fontSize={38} fill={BLACK} fontFamily={FONT} fontWeight="bold">
              10 YEARS
            </text>
            <text x={290} y={140} textAnchor="middle" fontSize={24} fill={BLACK} fontFamily="Arial, sans-serif" opacity={0.55}>
              MARRIED
            </text>
            <line x1={110} y1={170} x2={470} y2={170} stroke={BLACK} strokeOpacity={0.12} strokeWidth={1} />
            <text x={290} y={205} textAnchor="middle" fontSize={22} fill={BLACK} fontFamily="Arial, sans-serif" opacity={0.55}>
              = LIFETIME CLAIM
            </text>
            <line x1={110} y1={225} x2={470} y2={225} stroke={BLACK} strokeOpacity={0.12} strokeWidth={1} />
          </g>

          {/* Scissors — slide in from left */}
          <g transform={`translate(${scissorX}, 0)`}>
            <line x1={40} y1={90} x2={175} y2={155} stroke={WHITE} strokeWidth={13} strokeLinecap="round" />
            <circle cx={30} cy={83} r={22} fill="none" stroke={WHITE} strokeWidth={10} />
            <line x1={40} y1={220} x2={175} y2={155} stroke={WHITE} strokeWidth={13} strokeLinecap="round" />
            <circle cx={30} cy={227} r={22} fill="none" stroke={WHITE} strokeWidth={10} />
          </g>
        </svg>

        {/* Main label */}
        <div style={{ opacity: textOpacity, textAlign: 'center' }}>
          <p style={headline(64, ACCENT)}>DIVORCED?</p>
          <p style={headline(54, WHITE)}>YOU STILL QUALIFY</p>
        </div>

        {/* Bullets */}
        <div style={{ opacity: bulletOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0, opacity: 0.78, textAlign: 'center' }}>
            Your ex is never notified
          </p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: '10px 0 0', opacity: 0.78, textAlign: 'center' }}>
            Their benefit doesn't shrink
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// APPEND_C

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const countValue = interpolate(frame, [40, 160], [0, 400000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const figureOpacity = interpolate(frame, [20, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const numFigures = 10;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          gap: '36px',
        }}
      >
        {/* Title */}
        <div style={{ opacity: titleOpacity, textAlign: 'center' }}>
          <p style={headline(66, BLACK)}>40% NEVER</p>
          <p style={headline(66, '#EF4444')}>CLAIM IT</p>
        </div>

        {/* 10 stick figures */}
        <svg width={560} height={190} style={{ overflow: 'visible' }}>
          {Array.from({ length: Math.max(0, Math.floor(numFigures)) }).map((_, i) => {
            const isGray = i < 4;
            const figColor = isGray ? '#BBBBBB' : ACCENT;
            const xPos = 28 + i * 52;
            const figDelay = 12 + i * 7;
            const figScale = spring({
              frame: frame - figDelay,
              fps,
              config: { damping: 14, stiffness: 110 },
              durationInFrames: 28,
            });
            return (
              <g key={i} transform={`translate(${xPos}, 95) scale(${Math.max(0, figScale)})`} opacity={figureOpacity}>
                {/* Head */}
                <circle cx={0} cy={-52} r={17} fill={figColor} />
                {/* Body */}
                <line x1={0} y1={-35} x2={0} y2={18} stroke={figColor} strokeWidth={9} strokeLinecap="round" />
                {/* Arms */}
                <line x1={-23} y1={-18} x2={23} y2={-18} stroke={figColor} strokeWidth={7} strokeLinecap="round" />
                {/* Legs */}
                <line x1={0} y1={18} x2={-18} y2={58} stroke={figColor} strokeWidth={7} strokeLinecap="round" />
                <line x1={0} y1={18} x2={18} y2={58} stroke={figColor} strokeWidth={7} strokeLinecap="round" />
                {/* X mark on grayed figures */}
                {isGray && (
                  <g>
                    <line x1={-14} y1={-14} x2={14} y2={14} stroke="#EF4444" strokeWidth={5} strokeLinecap="round" />
                    <line x1={14} y1={-14} x2={-14} y2={14} stroke="#EF4444" strokeWidth={5} strokeLinecap="round" />
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Counter */}
        <div style={{ opacity: counterOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 96, color: '#EF4444', margin: 0, textAlign: 'center', letterSpacing: '0.08em' }}>
            ${Math.floor(countValue / 1000)}K
          </p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, margin: '8px 0 0', opacity: 0.65, textAlign: 'center' }}>
            LEFT ON THE TABLE
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [10, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barWidth = interpolate(frame, [35, 160], [0, 500], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctValue = interpolate(frame, [35, 160], [32.5, 50], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ageOpacity = interpolate(frame, [25, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [140, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeX = 30 + Math.min(barWidth, 500);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          gap: '40px',
        }}
      >
        {/* Title */}
        <div style={{ opacity: titleOpacity, textAlign: 'center' }}>
          <p style={headline(66, WHITE)}>TIMING</p>
          <p style={headline(66, ACCENT)}>MATTERS</p>
        </div>

        {/* Age timeline */}
        <svg width={560} height={240} style={{ overflow: 'visible' }}>
          {/* Track background */}
          <rect x={30} y={108} width={500} height={20} rx={10} fill={WHITE} opacity={0.18} />
          {/* Fill bar */}
          <rect x={30} y={108} width={Math.min(barWidth, 500)} height={20} rx={10} fill={ACCENT} />

          {/* Age labels */}
          <g opacity={ageOpacity}>
            <text x={30} y={158} textAnchor="middle" fontSize={28} fill={WHITE} fontFamily={FONT}>62</text>
            <text x={155} y={155} textAnchor="middle" fontSize={20} fill={WHITE} fontFamily={FONT} opacity={0.42}>63</text>
            <text x={280} y={155} textAnchor="middle" fontSize={20} fill={WHITE} fontFamily={FONT} opacity={0.42}>64–66</text>
            <text x={405} y={155} textAnchor="middle" fontSize={20} fill={WHITE} fontFamily={FONT} opacity={0.42}>66</text>
            <text x={530} y={158} textAnchor="middle" fontSize={28} fill={ACCENT} fontFamily={FONT}>67</text>
          </g>

          {/* Extreme labels */}
          <text x={30} y={88} textAnchor="middle" fontSize={22} fill={WHITE} fontFamily={FONT} opacity={0.55}>32.5%</text>
          <text x={530} y={88} textAnchor="middle" fontSize={22} fill={ACCENT} fontFamily={FONT}>50%</text>
          <text x={30} y={62} textAnchor="middle" fontSize={17} fill={WHITE} fontFamily="Arial, sans-serif" opacity={0.45}>EARLY</text>
          <text x={530} y={62} textAnchor="middle" fontSize={17} fill={ACCENT} fontFamily="Arial, sans-serif">FULL</text>

          {/* Moving badge */}
          <circle cx={badgeX} cy={118} r={34} fill={BG_DARK} stroke={ACCENT} strokeWidth={4} />
          <text x={badgeX} y={114} textAnchor="middle" fontSize={19} fill={ACCENT} fontFamily={FONT} fontWeight="bold">
            {pctValue.toFixed(1)}
          </text>
          <text x={badgeX} y={131} textAnchor="middle" fontSize={12} fill={ACCENT} fontFamily={FONT}>%</text>
        </svg>

        {/* CTA line */}
        <div style={{ opacity: ctaOpacity, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: ACCENT, margin: 0, textAlign: 'center' }}>
            WAIT UNTIL 67
          </p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: '10px 0 0', opacity: 0.78, textAlign: 'center' }}>
            Get the full 50% — $200K difference
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};
// APPEND_D

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, durationInFrames: 42 });
  const textOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [40, 65], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - 80, fps, config: { damping: 10, stiffness: 120 }, durationInFrames: 32 });
  const checkScale = spring({ frame: frame - 100, fps, config: { damping: 12, stiffness: 130 }, durationInFrames: 28 });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          gap: '30px',
        }}
      >
        {/* Phone SVG */}
        <svg
          width={260}
          height={320}
          style={{ overflow: 'visible', transform: `scale(${Math.max(0, phoneScale)})` }}
        >
          {/* Phone body */}
          <rect x={30} y={10} width={200} height={300} rx={26} fill={BLACK} />
          {/* Screen */}
          <rect x={42} y={34} width={176} height={252} rx={10} fill="#1E293B" />
          {/* Browser bar */}
          <rect x={52} y={46} width={156} height={28} rx={6} fill="#2563EB" />
          <text x={130} y={65} textAnchor="middle" fontSize={15} fill={WHITE} fontFamily="Arial, sans-serif">ssa.gov</text>
          {/* Page content */}
          <text x={130} y={112} textAnchor="middle" fontSize={17} fill={ACCENT} fontFamily={FONT} fontWeight="bold">YOUR BENEFIT</text>
          <text x={130} y={142} textAnchor="middle" fontSize={28} fill={WHITE} fontFamily={FONT} fontWeight="bold">$1,847</text>
          <text x={130} y={164} textAnchor="middle" fontSize={13} fill={WHITE} fontFamily="Arial, sans-serif" opacity={0.55}>per month available</text>
          {/* Divider */}
          <line x1={52} y1={180} x2={218} y2={180} stroke={WHITE} strokeOpacity={0.12} strokeWidth={1} />
          {/* Green check */}
          <g transform={`translate(130, 220) scale(${Math.max(0, checkScale)})`}>
            <circle cx={0} cy={0} r={26} fill="#10B981" />
            <polyline points="-12,0 -2,12 14,-10" fill="none" stroke={WHITE} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          </g>
          {/* Home button area */}
          <circle cx={130} cy={286} r={13} fill={WHITE} opacity={0.14} />
        </svg>

        {/* Check your benefit */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            textAlign: 'center',
          }}
        >
          <p style={headline(58, BLACK)}>CHECK YOUR</p>
          <p style={headline(58, ACCENT)}>BENEFIT NOW</p>
        </div>

        {/* CTA button */}
        <div
          style={{
            transform: `scale(${Math.max(0, ctaScale)})`,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              background: ACCENT,
              borderRadius: '50px',
              padding: '18px 52px',
              display: 'inline-block',
            }}
          >
            <p
              style={{
                fontFamily: FONT,
                fontSize: 30,
                color: BLACK,
                margin: 0,
                letterSpacing: '0.08em',
              }}
            >
              FREE AT SSA.GOV
            </p>
          </div>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 24,
              color: BLACK,
              margin: '18px 0 0',
              opacity: 0.58,
              textAlign: 'center',
            }}
          >
            Follow for more money moves the system won't tell you
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
