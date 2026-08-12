import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

const BG_DARK = '#0A0F1E';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#3B82F6';
const WHITE = '#F5F5F5';
const BLACK = '#0A0F1E';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.15,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children,
  bg,
  dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── Scene 1: Hook ───────────────────────────────────────────────────────────

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseY = interpolate(frame, [0, 35], [220, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const titleOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const tagScale = spring({ frame: frame - 75, fps, config: { stiffness: 100, damping: 14 } });
  const tagOpacity = interpolate(frame, [75, 100], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 60px',
        }}
      >
        {/* House SVG */}
        <div style={{ transform: `translateY(${houseY}px)` }}>
          <svg width="290" height="255" viewBox="0 0 290 255">
            {/* Roof */}
            <polygon points="145,18 278,128 12,128" fill={ACCENT} />
            {/* Body */}
            <rect x="28" y="126" width="234" height="110" fill={WHITE} rx="4" />
            {/* Door */}
            <rect x="110" y="168" width="70" height="68" fill={ACCENT} rx="6" />
            {/* Door knob */}
            <circle cx="173" cy="205" r="5" fill={BG_DARK} />
            {/* Left window */}
            <rect x="44" y="146" width="55" height="42" fill={ACCENT} opacity={0.45} rx="4" />
            {/* Right window */}
            <rect x="191" y="146" width="55" height="42" fill={ACCENT} opacity={0.45} rx="4" />
            {/* Chimney */}
            <rect x="196" y="32" width="26" height="68" fill="#1E3A5F" />
            {/* Ground shadow */}
            <rect x="4" y="235" width="282" height="14" fill={ACCENT} opacity={0.18} rx="7" />
          </svg>
        </div>

        {/* Title */}
        <div style={{ opacity: titleOpacity, textAlign: 'center', marginTop: 28 }}>
          <div style={headline(34, WHITE)}>Think you know</div>
          <div style={{ ...headline(60, ACCENT), marginTop: 8 }}>what your</div>
          <div style={{ ...headline(60, WHITE), marginTop: 4 }}>house costs?</div>
        </div>

        {/* Tag line */}
        <div
          style={{
            opacity: tagOpacity,
            transform: `scale(${tagScale})`,
            marginTop: 38,
            background: ACCENT,
            borderRadius: 50,
            padding: '16px 34px',
          }}
        >
          <span style={headline(22, WHITE)}>the mortgage is just the start</span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2: The 1% Rule ─────────────────────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconScale = spring({ frame: frame - 10, fps, config: { stiffness: 80, damping: 15 } });

  const barW = interpolate(frame, [30, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const dollarAmt = interpolate(frame, [70, 170], [0, 12000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [0, 25], [-60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 60px',
        }}
      >
        {/* Header */}
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <div style={headline(30, BLACK)}>THE 1% RULE</div>
          <div style={{ ...headline(20, ACCENT), marginTop: 8 }}>your agent never mentioned</div>
        </div>

        {/* House + wrench icon */}
        <div style={{ transform: `scale(${iconScale})`, marginTop: 44 }}>
          <svg width="160" height="155" viewBox="0 0 160 155">
            {/* House outline */}
            <polygon points="80,10 148,64 12,64" fill="none" stroke={BLACK} strokeWidth="5" />
            <rect x="22" y="62" width="116" height="78" fill="none" stroke={BLACK} strokeWidth="5" rx="3" />
            <rect x="56" y="94" width="48" height="46" fill="none" stroke={BLACK} strokeWidth="4" rx="3" />
            {/* Wrench */}
            <g transform="translate(94, 70) rotate(-40)">
              <rect x="-7" y="-24" width="14" height="48" rx="5" fill={ACCENT} />
              <ellipse cx="0" cy="-24" rx="13" ry="9" fill={ACCENT} />
              <ellipse cx="0" cy="24" rx="11" ry="7" fill={ACCENT} />
            </g>
          </svg>
        </div>

        {/* Rule text */}
        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <div style={headline(20, BLACK)}>spend</div>
          <div style={{ ...headline(76, ACCENT), marginTop: 6 }}>1–3%</div>
          <div style={{ ...headline(20, BLACK), marginTop: 6 }}>of home value per year</div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 38, width: '88%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={headline(18, BLACK)}>$400K home</div>
            <div style={headline(20, ACCENT)}>
              ${Math.round(dollarAmt).toLocaleString()}
            </div>
          </div>
          <div
            style={{
              width: '100%',
              height: 26,
              background: '#D1D5DB',
              borderRadius: 13,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${barW * 100}%`,
                height: '100%',
                background: ACCENT,
                borderRadius: 13,
              }}
            />
          </div>
          <div style={{ ...headline(16, '#6B7280'), marginTop: 10 }}>= up to $12,000 every year</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: Property Tax + Insurance ───────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const taxAmt = interpolate(frame, [30, 120], [0, 3700], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const insAmt = interpolate(frame, [50, 140], [0, 1800], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const leftX = interpolate(frame, [0, 30], [-140, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const rightX = interpolate(frame, [15, 45], [140, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const totalOpacity = interpolate(frame, [148, 178], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 50px',
        }}
      >
        <div style={headline(28, WHITE)}>TWO MORE HIDDEN COSTS</div>
        <div style={{ ...headline(18, ACCENT), marginTop: 10 }}>before you pay for groceries</div>

        {/* Cards row */}
        <div style={{ display: 'flex', gap: 24, marginTop: 52, width: '100%' }}>
          {/* Property Tax card */}
          <div
            style={{
              transform: `translateX(${leftX}px)`,
              flex: 1,
              background: '#1E293B',
              borderRadius: 18,
              padding: '28px 18px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: `2.5px solid ${ACCENT}`,
            }}
          >
            {/* Government building */}
            <svg width="78" height="78" viewBox="0 0 78 78">
              <rect x="9" y="30" width="60" height="40" fill={ACCENT} rx="3" />
              <polygon points="39,5 71,30 7,30" fill={ACCENT} opacity={0.65} />
              <rect x="20" y="40" width="12" height="16" fill={WHITE} rx="2" />
              <rect x="46" y="40" width="12" height="16" fill={WHITE} rx="2" />
              <rect x="31" y="50" width="16" height="20" fill={BG_DARK} rx="2" />
              <rect x="12" y="69" width="54" height="6" fill={ACCENT} />
            </svg>
            <div style={{ ...headline(15, WHITE), marginTop: 14 }}>Property Tax</div>
            <div style={{ ...headline(38, ACCENT), marginTop: 10 }}>
              ${Math.round(taxAmt).toLocaleString()}
            </div>
            <div style={{ ...headline(13, '#94A3B8'), marginTop: 6 }}>per year</div>
          </div>

          {/* Insurance card */}
          <div
            style={{
              transform: `translateX(${rightX}px)`,
              flex: 1,
              background: '#1E293B',
              borderRadius: 18,
              padding: '28px 18px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: `2.5px solid ${ACCENT}`,
            }}
          >
            {/* Shield */}
            <svg width="78" height="78" viewBox="0 0 78 78">
              <path d="M39 6 L67 19 L67 42 Q67 60 39 72 Q11 60 11 42 L11 19 Z" fill={ACCENT} />
              <path d="M39 17 L57 27 L57 42 Q57 54 39 63 Q21 54 21 42 L21 27 Z" fill="#1E293B" />
              <polyline
                points="29,41 36,49 51,30"
                stroke={ACCENT}
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div style={{ ...headline(15, WHITE), marginTop: 14 }}>Insurance</div>
            <div style={{ ...headline(38, ACCENT), marginTop: 10 }}>
              ${Math.round(insAmt).toLocaleString()}
            </div>
            <div style={{ ...headline(13, '#94A3B8'), marginTop: 6 }}>per year</div>
          </div>
        </div>

        {/* Combined total */}
        <div style={{ opacity: totalOpacity, textAlign: 'center', marginTop: 40 }}>
          <div style={headline(18, '#94A3B8')}>combined, that's another</div>
          <div style={{ ...headline(58, WHITE), marginTop: 8 }}>$5,500+</div>
          <div style={{ ...headline(18, ACCENT), marginTop: 8 }}>every single year</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: Year-One Surprise Repair ───────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = interpolate(frame, [0, 25], [-55, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const alertShake = interpolate(
    frame,
    [28, 31, 34, 37, 40, 43, 46],
    [0, -10, 10, -7, 7, -3, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const repairAmt = interpolate(frame, [50, 175], [0, 5400], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const statScale = spring({ frame: frame - 55, fps, config: { stiffness: 90, damping: 13 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 60px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <div style={headline(28, BLACK)}>YEAR ONE</div>
          <div style={{ ...headline(46, '#EF4444'), marginTop: 6 }}>SURPRISE REPAIR</div>
        </div>

        {/* House with crack */}
        <div style={{ transform: `translateX(${alertShake}px)`, marginTop: 36 }}>
          <svg width="240" height="204" viewBox="0 0 240 204">
            {/* Roof */}
            <polygon points="120,14 222,90 18,90" fill={ACCENT} opacity={0.85} />
            {/* Body */}
            <rect x="28" y="88" width="184" height="100" fill={BLACK} rx="4" />
            {/* Door */}
            <rect x="88" y="130" width="64" height="58" fill={ACCENT} opacity={0.5} rx="4" />
            {/* Left window */}
            <rect x="40" y="102" width="44" height="34" fill={ACCENT} opacity={0.4} rx="3" />
            {/* Right window */}
            <rect x="156" y="102" width="44" height="34" fill={ACCENT} opacity={0.4} rx="3" />
            {/* Crack running down left wall */}
            <polyline
              points="72,90 60,112 76,126 58,148 68,166 60,184"
              stroke="#EF4444"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Water drops */}
            <ellipse cx="64" cy="190" rx="5" ry="7" fill="#3B82F6" opacity={0.85} />
            <ellipse cx="55" cy="197" rx="4" ry="5" fill="#3B82F6" opacity={0.65} />
            <ellipse cx="73" cy="195" rx="3.5" ry="5" fill="#3B82F6" opacity={0.7} />
            {/* Alert circle */}
            <circle cx="196" cy="28" r="26" fill="#EF4444" />
            {/* Exclamation mark - bar */}
            <rect x="191" y="15" width="10" height="16" rx="4" fill={WHITE} />
            {/* Exclamation mark - dot */}
            <circle cx="196" cy="38" r="4.5" fill={WHITE} />
          </svg>
        </div>

        {/* Stats */}
        <div style={{ textAlign: 'center', transform: `scale(${statScale})`, marginTop: 24 }}>
          <div style={headline(20, BLACK)}>77% of first-year homeowners</div>
          <div style={{ ...headline(18, '#6B7280'), marginTop: 6 }}>face an unexpected repair</div>
          <div style={{ ...headline(72, '#EF4444'), marginTop: 14 }}>
            ${Math.round(repairAmt).toLocaleString()}
          </div>
          <div style={{ ...headline(18, BLACK), marginTop: 4 }}>average first-year bill</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: Real Monthly Cost ───────────────────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bar1W = interpolate(frame, [20, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const bar2W = interpolate(frame, [50, 155], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const labelOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const badgeScale = spring({ frame: frame - 155, fps, config: { stiffness: 120, damping: 11 } });
  const badgeOpacity = interpolate(frame, [155, 185], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 50px',
        }}
      >
        <div style={headline(28, WHITE)}>$400K HOUSE</div>
        <div style={{ ...headline(20, ACCENT), marginTop: 8 }}>MONTHLY REALITY CHECK</div>

        {/* Horizontal bars */}
        <div style={{ width: '100%', marginTop: 54, display: 'flex', flexDirection: 'column', gap: 30 }}>
          {/* Mortgage bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={headline(17, '#94A3B8')}>MORTGAGE PAYMENT</div>
              <div style={{ ...headline(18, WHITE), opacity: labelOpacity }}>$2,100/mo</div>
            </div>
            <div
              style={{
                width: '100%',
                height: 54,
                background: '#1E293B',
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${bar1W * 60}%`,
                  height: '100%',
                  background: '#475569',
                  borderRadius: 10,
                }}
              />
            </div>
          </div>

          {/* Real cost bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={headline(17, ACCENT)}>REAL MONTHLY COST</div>
              <div style={{ ...headline(18, ACCENT), opacity: labelOpacity }}>$3,500/mo</div>
            </div>
            <div
              style={{
                width: '100%',
                height: 54,
                background: '#1E293B',
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${bar2W * 100}%`,
                  height: '100%',
                  background: ACCENT,
                  borderRadius: 10,
                }}
              />
            </div>
          </div>
        </div>

        {/* Badge */}
        <div
          style={{
            opacity: badgeOpacity,
            transform: `scale(${badgeScale})`,
            marginTop: 44,
            textAlign: 'center',
            background: '#1E293B',
            borderRadius: 16,
            padding: '20px 36px',
          }}
        >
          <div style={headline(18, '#94A3B8')}>that's</div>
          <div style={{ ...headline(58, WHITE), marginTop: 6 }}>66% MORE</div>
          <div style={{ ...headline(18, ACCENT), marginTop: 6 }}>than the sticker payment</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: CTA ─────────────────────────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyScale = spring({ frame: frame - 8, fps, config: { stiffness: 70, damping: 13 } });

  const line1Opacity = interpolate(frame, [35, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line2Opacity = interpolate(frame, [60, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line3Opacity = interpolate(frame, [85, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ctaScale = spring({ frame: frame - 148, fps, config: { stiffness: 100, damping: 12 } });
  const ctaOpacity = interpolate(frame, [148, 178], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 60px',
        }}
      >
        {/* Piggy bank SVG */}
        <div style={{ transform: `scale(${piggyScale})` }}>
          <svg width="210" height="185" viewBox="0 0 210 185">
            {/* Body */}
            <ellipse cx="105" cy="112" rx="80" ry="58" fill={ACCENT} />
            {/* Head */}
            <ellipse cx="176" cy="82" rx="36" ry="32" fill={ACCENT} />
            {/* Snout */}
            <ellipse cx="204" cy="90" rx="15" ry="11" fill="#2563EB" />
            {/* Nostril left */}
            <ellipse cx="199" cy="89" rx="4" ry="3.5" fill={BG_DARK} />
            {/* Nostril right */}
            <ellipse cx="209" cy="89" rx="4" ry="3.5" fill={BG_DARK} />
            {/* Eye */}
            <circle cx="182" cy="71" r="6" fill={WHITE} />
            <circle cx="183" cy="71" r="3" fill={BG_DARK} />
            {/* Ear */}
            <ellipse cx="166" cy="54" rx="11" ry="8" fill="#2563EB" />
            {/* Coin slot */}
            <rect x="95" y="56" width="20" height="6" rx="3" fill="#2563EB" />
            {/* Legs */}
            <rect x="44" y="158" width="24" height="22" rx="7" fill="#2563EB" />
            <rect x="78" y="162" width="24" height="18" rx="7" fill="#2563EB" />
            <rect x="114" y="162" width="24" height="18" rx="7" fill="#2563EB" />
            <rect x="148" y="158" width="24" height="22" rx="7" fill="#2563EB" />
            {/* Tail curl */}
            <path
              d="M25,105 Q13,84 25,73 Q37,62 25,51"
              stroke="#2563EB"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            {/* Coin above slot */}
            <circle cx="96" cy="44" r="16" fill="#F59E0B" />
            <rect x="91" y="36" width="10" height="3" rx="1.5" fill={WHITE} />
            <rect x="91" y="45" width="10" height="3" rx="1.5" fill={WHITE} />
            <rect x="91" y="39" width="4" height="9" rx="1.5" fill={WHITE} />
            <rect x="97" y="39" width="4" height="9" rx="1.5" fill={WHITE} />
          </svg>
        </div>

        {/* Advice lines */}
        <div style={{ marginTop: 30, textAlign: 'center' }}>
          <div style={{ opacity: line1Opacity }}>
            <div style={headline(24, BLACK)}>before you buy,</div>
          </div>
          <div style={{ opacity: line2Opacity, marginTop: 8 }}>
            <div style={{ ...headline(52, ACCENT) }}>save $15,000</div>
          </div>
          <div style={{ opacity: line3Opacity, marginTop: 6 }}>
            <div style={headline(22, BLACK)}>beyond your down payment</div>
            <div style={{ ...headline(17, '#6B7280'), marginTop: 8 }}>for year-one hidden costs</div>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            marginTop: 42,
            background: ACCENT,
            borderRadius: 50,
            padding: '20px 48px',
          }}
        >
          <div style={headline(24, WHITE)}>follow for more $$$ truth</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Root composition ─────────────────────────────────────────────────────────
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
