import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const GREEN = '#10B981';
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
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// Scene 1: House + "Your bank never showed you this chart"
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseY = interpolate(frame, [0, 40], [120, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const houseOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [45, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const qScale = spring({ frame: Math.max(0, frame - 55), fps, from: 0, to: 1, config: { damping: 12, stiffness: 120 } });
  const subtitleOpacity = interpolate(frame, [110, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        {/* House SVG */}
        <svg
          width="300"
          height="260"
          viewBox="0 0 300 260"
          style={{ opacity: houseOpacity, transform: `translateY(${houseY}px)`, marginBottom: 20 }}
        >
          <rect x="45" y="128" width="210" height="132" rx="4" fill="none" stroke={ACCENT} strokeWidth="6" />
          <polygon points="22,128 150,24 278,128" fill="none" stroke={ACCENT} strokeWidth="6" strokeLinejoin="round" />
          <rect x="112" y="192" width="76" height="68" rx="3" fill="none" stroke={ACCENT} strokeWidth="4" />
          <circle cx="175" cy="228" r="5" fill={ACCENT} />
          <rect x="62" y="150" width="54" height="46" rx="2" fill="none" stroke={ACCENT} strokeWidth="3.5" />
          <rect x="184" y="150" width="54" height="46" rx="2" fill="none" stroke={ACCENT} strokeWidth="3.5" />
          {/* Question mark */}
          <text
            x="232"
            y="80"
            fontSize="68"
            fill={ACCENT}
            fontFamily={FONT}
            fontWeight="bold"
            style={{ transformOrigin: '240px 55px', transform: `scale(${qScale})` }}
          >?</text>
        </svg>

        <div style={{ opacity: textOpacity, textAlign: 'center', marginBottom: 24 }}>
          <p style={{ ...headline(42, WHITE), lineHeight: 1.25, marginBottom: 14 }}>YOUR BANK HAS</p>
          <p style={{ ...headline(42, WHITE), lineHeight: 1.25, marginBottom: 14 }}>NEVER SHOWN YOU</p>
          <p style={{ ...headline(72, ACCENT), lineHeight: 1.1 }}>THIS CHART</p>
        </div>

        <div style={{ opacity: subtitleOpacity, position: 'absolute', bottom: 130 }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, textAlign: 'center', letterSpacing: '0.08em', opacity: 0.65, margin: 0 }}>
            AND IT CHANGES EVERYTHING
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: 86% interest vs 14% principal bar chart
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, from: -60, to: 0, config: { damping: 20, stiffness: 70 } });
  const barProgress = interpolate(frame, [30, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOpacity = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shockOpacity = interpolate(frame, [120, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 72px' }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center', marginBottom: 56 }}>
          <p style={{ ...headline(38, BLACK), lineHeight: 1.2, marginBottom: 10 }}>WHERE YOUR PAYMENT GOES</p>
          <p style={{ ...headline(38, BLACK), lineHeight: 1.2 }}>IN YEAR ONE</p>
        </div>

        {/* Bank bar — 86% */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: 24 }}>
          <div style={{ width: 100, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
            <svg width="58" height="52" viewBox="0 0 58 52">
              <rect x="4" y="20" width="50" height="30" fill="none" stroke={RED} strokeWidth="3.5" />
              <rect x="10" y="26" width="8" height="24" fill="none" stroke={RED} strokeWidth="2.5" />
              <rect x="25" y="26" width="8" height="24" fill="none" stroke={RED} strokeWidth="2.5" />
              <rect x="40" y="26" width="8" height="24" fill="none" stroke={RED} strokeWidth="2.5" />
              <polygon points="1,20 29,3 57,20" fill="none" stroke={RED} strokeWidth="3.5" />
            </svg>
          </div>
          <div style={{ flex: 1, background: '#DDD', borderRadius: 10, height: 60, overflow: 'hidden' }}>
            <div style={{
              width: `${86 * barProgress}%`,
              height: '100%',
              background: RED,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 14,
              boxSizing: 'border-box' as const,
            }}>
              <span style={{ ...headline(32, WHITE), opacity: labelOpacity }}>86%</span>
            </div>
          </div>
        </div>

        {/* House bar — 14% */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div style={{ width: 100, flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
            <svg width="58" height="52" viewBox="0 0 58 52">
              <rect x="9" y="24" width="40" height="28" fill="none" stroke={ACCENT} strokeWidth="3.5" />
              <polygon points="3,24 29,5 55,24" fill="none" stroke={ACCENT} strokeWidth="3.5" />
              <rect x="20" y="38" width="18" height="14" fill="none" stroke={ACCENT} strokeWidth="2.5" />
            </svg>
          </div>
          <div style={{ flex: 1, background: '#DDD', borderRadius: 10, height: 60, overflow: 'hidden' }}>
            <div style={{
              width: `${14 * barProgress}%`,
              height: '100%',
              background: ACCENT,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 14,
              boxSizing: 'border-box' as const,
            }}>
              <span style={{ ...headline(32, BLACK), opacity: labelOpacity }}>14%</span>
            </div>
          </div>
        </div>

        <div style={{ opacity: shockOpacity, textAlign: 'center', marginTop: 48 }}>
          <p style={{ ...headline(42, BLACK), lineHeight: 1.25, marginBottom: 10 }}>86 CENTS OF EVERY DOLLAR</p>
          <p style={{ ...headline(48, RED), lineHeight: 1.2, marginBottom: 10 }}>GOES TO YOUR BANK</p>
          <p style={{ fontFamily: FONT, fontSize: 30, color: BLACK, letterSpacing: '0.08em', opacity: 0.55, margin: 0 }}>NOT YOUR HOME</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: 5-year payment vs equity bar chart with animated counters
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 20, stiffness: 60 } });
  const countProgress = interpolate(frame, [40, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const paidBarH = interpolate(frame, [30, 140], [0, 320], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const equityBarH = interpolate(frame, [30, 140], [0, 48], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taglineOpacity = interpolate(frame, [160, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const paidNum = Math.floor(countProgress * 136000);
  const equityNum = Math.floor(countProgress * 20500);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        <div style={{ transform: `scale(${headerIn})`, textAlign: 'center', marginBottom: 44 }}>
          <p style={{ ...headline(36, WHITE), marginBottom: 8 }}>AFTER 5 YEARS ON A</p>
          <p style={{ ...headline(56, ACCENT) }}>$350,000 LOAN</p>
        </div>

        {/* Bar chart side by side */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 80, height: 380, marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ ...headline(32, WHITE), marginBottom: 10 }}>${paidNum.toLocaleString()}</p>
            <div style={{ width: 140, height: paidBarH, background: RED, borderRadius: '8px 8px 0 0' }} />
            <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, letterSpacing: '0.08em', opacity: 0.75, marginTop: 10 }}>PAID</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ ...headline(32, ACCENT), marginBottom: 10 }}>${equityNum.toLocaleString()}</p>
            <div style={{ width: 140, height: equityBarH, background: ACCENT, borderRadius: '8px 8px 0 0' }} />
            <p style={{ fontFamily: FONT, fontSize: 24, color: WHITE, letterSpacing: '0.08em', opacity: 0.75, marginTop: 10 }}>EQUITY</p>
          </div>
        </div>

        <div style={{ opacity: taglineOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(38, WHITE), lineHeight: 1.25, marginBottom: 8 }}>YOU KEPT LESS THAN</p>
          <p style={{ ...headline(72, ACCENT) }}>15%</p>
          <p style={{ ...headline(38, WHITE), lineHeight: 1.25 }}>OF WHAT YOU PAID</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: Banks front-load interest on purpose — money flowing to bank
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, from: -70, to: 0, config: { damping: 18, stiffness: 70 } });
  const iconScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 15, stiffness: 50 } });
  const moneyX = interpolate(frame, [60, 160], [0, 290], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [70, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        <div style={{ transform: `translateY(${titleIn}px)`, textAlign: 'center', marginBottom: 48 }}>
          <p style={{ ...headline(44, BLACK), lineHeight: 1.2, marginBottom: 8 }}>THIS ISN'T AN</p>
          <p style={{ ...headline(56, RED), lineHeight: 1.2 }}>ACCIDENT</p>
        </div>

        {/* House → money → Bank animation */}
        <svg width="740" height="300" viewBox="0 0 740 300" style={{ transform: `scale(${iconScale})` }}>
          {/* House on left */}
          <rect x="30" y="122" width="110" height="118" rx="4" fill="none" stroke={ACCENT} strokeWidth="5" />
          <polygon points="14,122 85,46 156,122" fill="none" stroke={ACCENT} strokeWidth="5" strokeLinejoin="round" />
          <rect x="52" y="192" width="66" height="48" rx="3" fill="none" stroke={ACCENT} strokeWidth="3.5" />
          <circle cx="104" cy="216" r="5" fill={ACCENT} />

          {/* Dashed arrow */}
          <line x1="166" y1="186" x2={166 + moneyX} y2="186" stroke={RED} strokeWidth="6" strokeDasharray="22 11" />
          {/* Arrowhead */}
          <polygon
            points={`${151 + moneyX},170 ${181 + moneyX},186 ${151 + moneyX},202`}
            fill={RED}
          />
          {/* Dollar signs */}
          <text x={190 + moneyX * 0.25} y="162" fontSize="38" fill={RED} fontFamily={FONT} opacity={0.9}>$</text>
          <text x={210 + moneyX * 0.55} y="214" fontSize="38" fill={RED} fontFamily={FONT} opacity={0.9}>$</text>

          {/* Bank on right */}
          <rect x="556" y="96" width="164" height="180" fill="none" stroke={RED} strokeWidth="5" />
          <rect x="574" y="118" width="22" height="52" fill="none" stroke={RED} strokeWidth="3" />
          <rect x="613" y="118" width="22" height="52" fill="none" stroke={RED} strokeWidth="3" />
          <rect x="652" y="118" width="22" height="52" fill="none" stroke={RED} strokeWidth="3" />
          <rect x="574" y="196" width="128" height="80" fill="none" stroke={RED} strokeWidth="3" />
          <polygon points="542,96 638,38 734,96" fill="none" stroke={RED} strokeWidth="5" />
          <text x="582" y="84" fontSize="22" fill={RED} fontFamily="Arial">BANK</text>
        </svg>

        <div style={{ opacity: textOpacity, textAlign: 'center', marginTop: 32 }}>
          <p style={{ ...headline(34, BLACK), lineHeight: 1.3, marginBottom: 10 }}>BANKS FRONT-LOAD INTEREST</p>
          <p style={{ ...headline(34, BLACK), lineHeight: 1.3, marginBottom: 16 }}>SO THEY GET PAID FIRST</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: '#555', textAlign: 'center', letterSpacing: '0.06em', margin: 0 }}>
            BETTING YOU'LL SELL BEFORE THE MATH FLIPS
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: $200 extra/month saves $51K — flip side reveal
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, from: 0, to: 1, config: { damping: 20, stiffness: 70 } });
  const savingsCount = interpolate(frame, [50, 165], [0, 51000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yearsOff = interpolate(frame, [50, 145], [0, 6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const taglineOpacity = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const savingsStr = Math.floor(savingsCount).toLocaleString();

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        <div style={{ transform: `scale(${titleIn})`, textAlign: 'center', marginBottom: 56 }}>
          <p style={{ ...headline(38, WHITE), marginBottom: 8 }}>BUT HERE'S THE</p>
          <p style={{ ...headline(68, ACCENT) }}>FLIP SIDE</p>
        </div>

        {/* Card with extra payment info */}
        <div style={{
          background: '#1E1E1E',
          borderRadius: 24,
          paddingTop: 40,
          paddingBottom: 40,
          paddingLeft: 56,
          paddingRight: 56,
          width: '100%',
          boxSizing: 'border-box' as const,
          marginBottom: 44,
        }}>
          {/* Calculator icon + extra label */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 36, justifyContent: 'center' }}>
            <svg width="76" height="76" viewBox="0 0 76 76">
              <rect x="5" y="5" width="66" height="66" rx="8" fill="none" stroke={ACCENT} strokeWidth="4" />
              <rect x="14" y="13" width="48" height="17" rx="3" fill={ACCENT} opacity="0.3" />
              <circle cx="22" cy="45" r="5" fill={ACCENT} />
              <circle cx="38" cy="45" r="5" fill={ACCENT} />
              <circle cx="54" cy="45" r="5" fill={ACCENT} />
              <circle cx="22" cy="61" r="5" fill={ACCENT} />
              <circle cx="38" cy="61" r="5" fill={ACCENT} />
              <rect x="49" y="56" width="10" height="10" rx="2" fill={RED} />
            </svg>
            <div style={{ marginLeft: 28 }}>
              <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, letterSpacing: '0.08em', margin: 0, opacity: 0.65 }}>EXTRA PER MONTH</p>
              <p style={{ ...headline(68, ACCENT), margin: 0 }}>+$200</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ ...headline(48, GREEN), margin: 0 }}>${savingsStr}</p>
              <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, letterSpacing: '0.08em', opacity: 0.65, marginTop: 8, marginBottom: 0 }}>INTEREST SAVED</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ ...headline(48, GREEN), margin: 0 }}>{Math.floor(yearsOff)} YRS</p>
              <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, letterSpacing: '0.08em', opacity: 0.65, marginTop: 8, marginBottom: 0 }}>PAID OFF SOONER</p>
            </div>
          </div>
        </div>

        <div style={{ opacity: taglineOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(36, WHITE), lineHeight: 1.3, marginBottom: 8 }}>THE MATH WORKS IN</p>
          <p style={{ ...headline(44, ACCENT) }}>REVERSE TOO</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: CTA — pull up your amortization table
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneY = spring({ frame, fps, from: 100, to: 0, config: { damping: 20, stiffness: 70 } });
  const textOpacity = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 140), fps, from: 0.8, to: 1, config: { damping: 15, stiffness: 100 } });

  const rows = [
    { mo: '1', principal: '$246', interest: '$1,750' },
    { mo: '2', principal: '$247', interest: '$1,749' },
    { mo: '3', principal: '$249', interest: '$1,747' },
    { mo: '4', principal: '$250', interest: '$1,746' },
    { mo: '5', principal: '$251', interest: '$1,745' },
    { mo: '6', principal: '$253', interest: '$1,743' },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>
        {/* Phone showing amortization schedule */}
        <div style={{ transform: `translateY(${phoneY}px)`, marginBottom: 44 }}>
          <svg width="300" height="380" viewBox="0 0 300 380">
            <rect x="10" y="5" width="280" height="370" rx="28" fill="#2A2A2A" stroke={ACCENT} strokeWidth="5" />
            <rect x="20" y="52" width="260" height="288" fill="#1A1A1A" />
            <circle cx="150" cy="358" r="12" fill="none" stroke={ACCENT} strokeWidth="3" />
            <text x="30" y="78" fontSize="13" fill={ACCENT} fontFamily={FONT}>AMORTIZATION SCHEDULE</text>
            {/* Header */}
            <rect x="20" y="84" width="260" height="24" fill="#333" />
            <text x="28" y="101" fontSize="12" fill={WHITE} fontFamily="Arial, sans-serif">MO</text>
            <text x="80" y="101" fontSize="12" fill={WHITE} fontFamily="Arial, sans-serif">PRINCIPAL</text>
            <text x="186" y="101" fontSize="12" fill={RED} fontFamily="Arial, sans-serif">INTEREST</text>
            {/* Data rows */}
            {rows.map((r, i) => (
              <g key={r.mo}>
                <text x="28" y={124 + i * 30} fontSize="12" fill={WHITE} fontFamily="Arial, sans-serif">{r.mo}</text>
                <text x="80" y={124 + i * 30} fontSize="12" fill={ACCENT} fontFamily="Arial, sans-serif">{r.principal}</text>
                <text x="186" y={124 + i * 30} fontSize="12" fill={RED} fontFamily="Arial, sans-serif">{r.interest}</text>
              </g>
            ))}
          </svg>
        </div>

        <div style={{ opacity: textOpacity, textAlign: 'center', marginBottom: 32 }}>
          <p style={{ ...headline(42, BLACK), lineHeight: 1.2, marginBottom: 8 }}>PULL UP YOUR</p>
          <p style={{ ...headline(42, BLACK), lineHeight: 1.2, marginBottom: 8 }}>MORTGAGE STATEMENT</p>
          <p style={{ ...headline(48, RED), lineHeight: 1.2 }}>RIGHT NOW</p>
        </div>

        <div style={{
          transform: `scale(${ctaScale})`,
          background: BLACK,
          borderRadius: 16,
          paddingTop: 22,
          paddingBottom: 22,
          paddingLeft: 44,
          paddingRight: 44,
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, letterSpacing: '0.08em', margin: 0 }}>
            DEMAND THE AMORTIZATION TABLE
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
