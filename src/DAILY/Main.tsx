import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F172A';
const BG_LIGHT = '#F8FAFC';
const ACCENT = '#3B82F6';
const WHITE = '#F8FAFC';
const BLACK = '#0F172A';
const RED = '#EF4444';
const GREEN = '#10B981';
const AMBER = '#F59E0B';
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
  const spr = (d: number) => spring({ frame: Math.max(0, frame - d), fps, config: { damping: 18, stiffness: 70 } });

  const titleIn = spr(0);
  const figureIn = spr(30);
  const stingIn = spr(130);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 120 }}>
        <div style={{
          ...headline(54, WHITE),
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [40, 0])}px)`,
          marginBottom: 24,
          lineHeight: 1.2,
        }}>
          YOUR BOSS<br />KNOWS A<br />SECRET
        </div>

        <svg width={520} height={400} viewBox="0 0 520 400" style={{ opacity: figureIn }}>
          {/* Worker figure (left) */}
          <circle cx={110} cy={90} r={40} fill={WHITE} />
          <rect x={82} y={138} width={56} height={80} rx={10} fill={WHITE} />
          <line x1={138} y1={158} x2={180} y2={182} stroke={WHITE} strokeWidth={11} strokeLinecap="round" />
          <line x1={82} y1={158} x2={50} y2={178} stroke={WHITE} strokeWidth={11} strokeLinecap="round" />
          <line x1={95} y1={218} x2={88} y2={290} stroke={WHITE} strokeWidth={11} strokeLinecap="round" />
          <line x1={125} y1={218} x2={132} y2={290} stroke={WHITE} strokeWidth={11} strokeLinecap="round" />
          {/* Question mark above worker */}
          <text x={110} y={55} fontSize={36} fill={WHITE} fontFamily="Arial Black" textAnchor="middle" opacity={0.55}>?</text>

          {/* Boss figure (right) */}
          <circle cx={370} cy={90} r={44} fill={ACCENT} />
          <rect x={338} y={142} width={64} height={84} rx={10} fill={ACCENT} />
          <line x1={338} y1={162} x2={295} y2={186} stroke={ACCENT} strokeWidth={12} strokeLinecap="round" />
          <line x1={402} y1={162} x2={430} y2={148} stroke={ACCENT} strokeWidth={12} strokeLinecap="round" />
          <line x1={351} y1={226} x2={344} y2={300} stroke={ACCENT} strokeWidth={12} strokeLinecap="round" />
          <line x1={381} y1={226} x2={388} y2={300} stroke={ACCENT} strokeWidth={12} strokeLinecap="round" />

          {/* Hidden document behind boss (right arm) */}
          <rect x={415} y={118} width={82} height={104} rx={6} fill={AMBER} opacity={0.88} />
          <rect x={425} y={130} width={62} height={11} rx={3} fill={BLACK} opacity={0.7} />
          <rect x={425} y={147} width={62} height={11} rx={3} fill={BLACK} opacity={0.7} />
          <rect x={425} y={164} width={62} height={11} rx={3} fill={RED} />
          <text x={456} y={204} fontSize={12} fill={AMBER} fontFamily="Arial Black" textAnchor="middle">SALARY</text>
          <text x={456} y={218} fontSize={12} fill={AMBER} fontFamily="Arial Black" textAnchor="middle">BANDS</text>
        </svg>

        <div style={{ opacity: stingIn, textAlign: 'center' }}>
          <div style={{ fontFamily: FONT, fontSize: 28, color: AMBER }}>
            YOU'RE $14,000 BELOW YOUR CEILING
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spr = (d: number) => spring({ frame: Math.max(0, frame - d), fps, config: { damping: 16, stiffness: 60 } });

  const titleIn = spr(0);
  const barIn = spr(30);
  const markerIn = spr(95);
  const spanIn = spr(145);

  const barW = interpolate(barIn, [0, 1], [0, 700]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 110 }}>
        <div style={{ ...headline(44, BLACK), opacity: titleIn, marginBottom: 14, lineHeight: 1.2 }}>
          EVERY JOB<br />HAS A SECRET RANGE
        </div>
        <div style={{ fontFamily: FONT, fontSize: 22, color: '#64748B', textAlign: 'center', marginBottom: 60 }}>
          FLOOR → MIDPOINT → CEILING
        </div>

        <svg width={760} height={400} viewBox="0 0 760 400">
          {/* Band bar */}
          <rect x={30} y={150} width={barW} height={56} rx={10} fill={ACCENT} opacity={0.18} />
          <rect x={30} y={150} width={barW} height={56} rx={10} fill="none" stroke={ACCENT} strokeWidth={3} />

          {/* Divider lines */}
          <line x1={30 + barW / 3} y1={128} x2={30 + barW / 3} y2={222} stroke={ACCENT} strokeWidth={2} strokeDasharray="6,4" opacity={barIn} />
          <line x1={30 + (2 * barW) / 3} y1={128} x2={30 + (2 * barW) / 3} y2={222} stroke={ACCENT} strokeWidth={2} strokeDasharray="6,4" opacity={barIn} />

          {/* Section labels */}
          <text x={30 + barW / 6} y={120} fontSize={17} fill="#64748B" fontFamily="Arial" textAnchor="middle" fontWeight="bold" opacity={barIn}>FLOOR</text>
          <text x={30 + barW / 2} y={120} fontSize={17} fill="#64748B" fontFamily="Arial" textAnchor="middle" fontWeight="bold" opacity={barIn}>MIDPOINT</text>
          <text x={30 + (5 * barW) / 6} y={120} fontSize={17} fill="#64748B" fontFamily="Arial" textAnchor="middle" fontWeight="bold" opacity={barIn}>CEILING</text>

          {/* Dollar values */}
          <text x={30 + barW / 6} y={240} fontSize={22} fill={BLACK} fontFamily="Arial Black" textAnchor="middle" opacity={barIn}>$60K</text>
          <text x={30 + barW / 2} y={240} fontSize={22} fill={BLACK} fontFamily="Arial Black" textAnchor="middle" opacity={barIn}>$84K</text>
          <text x={30 + (5 * barW) / 6} y={240} fontSize={22} fill={BLACK} fontFamily="Arial Black" textAnchor="middle" opacity={barIn}>$108K</text>

          {/* YOU marker near floor */}
          <g opacity={markerIn} transform={`translate(${30 + interpolate(markerIn, [0, 1], [0, 105])}, 0)`}>
            <circle cx={0} cy={162} r={14} fill={RED} />
            <text x={0} y={167} fontSize={13} fill={WHITE} fontFamily="Arial Black" textAnchor="middle">YOU</text>
            <polygon points="-10,176 10,176 0,192" fill={RED} />
            <rect x={-50} y={196} width={100} height={34} rx={6} fill={RED} />
            <text x={0} y={218} fontSize={13} fill={WHITE} fontFamily="Arial Black" textAnchor="middle">$14K BELOW</text>
          </g>

          {/* Span arrow */}
          <g opacity={spanIn}>
            <line x1={30} y1={290} x2={730} y2={290} stroke={ACCENT} strokeWidth={3} />
            <polygon points="30,283 44,290 30,297" fill={ACCENT} />
            <polygon points="730,283 716,290 730,297" fill={ACCENT} />
            <text x={380} y={326} fontSize={20} fill={ACCENT} fontFamily="Arial Black" textAnchor="middle">SPANS 40–80% BETWEEN FLOOR &amp; CEILING</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spr = (d: number) => spring({ frame: Math.max(0, frame - d), fps, config: { damping: 20, stiffness: 65 } });

  const titleIn = spr(0);
  const gridIn = spr(25);
  const highlightIn = spr(80);
  const labelIn = spr(145);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 90 }}>
        <div style={{ ...headline(46, WHITE), opacity: titleIn, marginBottom: 12, lineHeight: 1.2 }}>
          60 OUT OF 100<br />ARE LIKE YOU
        </div>
        <div style={{ fontFamily: FONT, fontSize: 21, color: '#94A3B8', textAlign: 'center', marginBottom: 40 }}>
          PAID BELOW THEIR SALARY BAND MIDPOINT
        </div>

        <svg width={600} height={530} viewBox="0 0 600 530" style={{ opacity: gridIn }}>
          {Array.from({ length: Math.max(0, Math.floor(100)) }, (_, i) => {
            const col = i % 10;
            const row = Math.floor(i / 10);
            const cx = 30 + col * 54;
            const cy = 18 + row * 50;
            const below = i < 60;
            const op = below
              ? interpolate(highlightIn, [0, 1], [0.3, 1])
              : interpolate(highlightIn, [0, 1], [1, 0.25]);
            const fill = below ? RED : GREEN;
            return (
              <g key={i} opacity={op}>
                <circle cx={cx} cy={cy + 8} r={9} fill={fill} />
                <line x1={cx} y1={cy + 17} x2={cx} y2={cy + 37} stroke={fill} strokeWidth={5} strokeLinecap="round" />
                <line x1={cx} y1={cy + 24} x2={cx - 10} y2={cy + 33} stroke={fill} strokeWidth={4} strokeLinecap="round" />
                <line x1={cx} y1={cy + 24} x2={cx + 10} y2={cy + 33} stroke={fill} strokeWidth={4} strokeLinecap="round" />
                <line x1={cx} y1={cy + 37} x2={cx - 8} y2={cy + 48} stroke={fill} strokeWidth={4} strokeLinecap="round" />
                <line x1={cx} y1={cy + 37} x2={cx + 8} y2={cy + 48} stroke={fill} strokeWidth={4} strokeLinecap="round" />
              </g>
            );
          })}
        </svg>

        <div style={{ opacity: labelIn, textAlign: 'center', marginTop: 8 }}>
          <span style={{ fontFamily: FONT, fontSize: 32, color: RED }}>60%</span>
          <span style={{ fontFamily: FONT, fontSize: 22, color: WHITE }}> BELOW · </span>
          <span style={{ fontFamily: FONT, fontSize: 32, color: GREEN }}>40%</span>
          <span style={{ fontFamily: FONT, fontSize: 22, color: WHITE }}> AT OR ABOVE</span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spr = (d: number) => spring({ frame: Math.max(0, frame - d), fps, config: { damping: 18, stiffness: 65 } });

  const titleIn = spr(0);
  const dollarIn = spr(130);

  const states = ['CA', 'CO', 'CT', 'HI', 'IL', 'MD', 'NV', 'NY', 'WA', 'DC'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '110px 60px 0' }}>
        <div style={{ ...headline(42, BLACK), opacity: titleIn, marginBottom: 12, lineHeight: 1.2 }}>
          10 STATES MADE<br />IT LAW
        </div>
        <div style={{ fontFamily: FONT, fontSize: 20, color: '#64748B', textAlign: 'center', marginBottom: 44 }}>
          EMPLOYERS MUST POST SALARY RANGES
        </div>

        {/* State badges */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap' as const,
          justifyContent: 'center',
          gap: '14px',
          width: 860,
          marginBottom: 44,
        }}>
          {states.map((state, i) => {
            const itemIn = spring({ frame: Math.max(0, frame - 25 - i * 9), fps, config: { damping: 18, stiffness: 80 } });
            return (
              <div key={state} style={{
                background: ACCENT,
                color: WHITE,
                fontFamily: FONT,
                fontSize: 26,
                padding: '10px 18px',
                borderRadius: 10,
                opacity: itemIn,
                transform: `translateY(${interpolate(itemIn, [0, 1], [18, 0])}px)`,
              }}>
                {state}
              </div>
            );
          })}
        </div>

        <div style={{ opacity: dollarIn, textAlign: 'center' }}>
          <div style={{ ...headline(96, ACCENT), lineHeight: 1 }}>+$14K</div>
          <div style={{ ...headline(24, BLACK), marginTop: 10 }}>MORE PER YEAR ON AVERAGE</div>
          <div style={{ fontFamily: FONT, fontSize: 20, color: '#64748B', marginTop: 6 }}>IN PAY-TRANSPARENT STATES</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spr = (d: number) => spring({ frame: Math.max(0, frame - d), fps, config: { damping: 16, stiffness: 60 } });

  const titleIn = spr(0);
  const figureIn = spr(25);
  const bubbleIn = spr(70);
  const counterIn = spr(140);

  const dollarCount = Math.round(
    interpolate(frame, [140, 200], [0, 5500], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 90 }}>
        <div style={{ ...headline(44, WHITE), opacity: titleIn, marginBottom: 44, lineHeight: 1.2 }}>
          ASKING IS FREE.<br />NOT ASKING ISN'T.
        </div>

        <svg width={540} height={360} viewBox="0 0 540 360" style={{ opacity: figureIn }}>
          {/* Worker figure (left) */}
          <circle cx={110} cy={80} r={38} fill={WHITE} />
          <rect x={84} y={126} width={52} height={76} rx={10} fill={WHITE} />
          <line x1={136} y1={146} x2={180} y2={168} stroke={WHITE} strokeWidth={10} strokeLinecap="round" />
          <line x1={84} y1={146} x2={56} y2={164} stroke={WHITE} strokeWidth={10} strokeLinecap="round" />
          <line x1={97} y1={202} x2={90} y2={270} stroke={WHITE} strokeWidth={10} strokeLinecap="round" />
          <line x1={123} y1={202} x2={130} y2={270} stroke={WHITE} strokeWidth={10} strokeLinecap="round" />

          {/* Speech bubble */}
          <g opacity={bubbleIn}>
            <rect x={172} y={28} width={220} height={90} rx={14} fill={ACCENT} />
            <polygon points="172,82 150,100 190,100" fill={ACCENT} />
            <text x={282} y={64} fontSize={17} fill={WHITE} fontFamily="Arial Black" textAnchor="middle">WHAT'S THE</text>
            <text x={282} y={88} fontSize={17} fill={WHITE} fontFamily="Arial Black" textAnchor="middle">SALARY BAND?</text>
          </g>

          {/* HR figure (right) */}
          <circle cx={430} cy={80} r={38} fill={ACCENT} opacity={0.85} />
          <rect x={404} y={126} width={52} height={76} rx={10} fill={ACCENT} opacity={0.85} />
          <line x1={404} y1={146} x2={366} y2={168} stroke={ACCENT} strokeWidth={10} strokeLinecap="round" opacity={0.85} />
          <line x1={456} y1={146} x2={484} y2={164} stroke={ACCENT} strokeWidth={10} strokeLinecap="round" opacity={0.85} />
          <line x1={417} y1={202} x2={410} y2={270} stroke={ACCENT} strokeWidth={10} strokeLinecap="round" opacity={0.85} />
          <line x1={443} y1={202} x2={450} y2={270} stroke={ACCENT} strokeWidth={10} strokeLinecap="round" opacity={0.85} />
          <text x={430} y={320} fontSize={16} fill="#94A3B8" fontFamily="Arial" textAnchor="middle">HR / MANAGER</text>
        </svg>

        <div style={{ opacity: counterIn, textAlign: 'center', marginTop: 16 }}>
          <div style={{ fontFamily: FONT, fontSize: 22, color: '#94A3B8' }}>AVERAGE GAIN FROM ASKING:</div>
          <div style={{ ...headline(80, GREEN), lineHeight: 1 }}>
            +${dollarCount.toLocaleString('en-US')}
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const spr = (d: number) => spring({ frame: Math.max(0, frame - d), fps, config: { damping: 18, stiffness: 65 } });

  const titleIn = spr(0);
  const questionIn = spr(35);
  const checkItems = [
    { label: 'Ask HR before your review', delay: 100 },
    { label: 'Know your band ceiling', delay: 128 },
    { label: 'Negotiate to midpoint', delay: 156 },
  ];
  const ctaIn = spr(185);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '110px 70px 0' }}>
        <div style={{ ...headline(40, BLACK), opacity: titleIn, marginBottom: 40, lineHeight: 1.3 }}>
          BEFORE YOUR<br />NEXT REVIEW
        </div>

        <div style={{
          opacity: questionIn,
          background: ACCENT,
          borderRadius: 20,
          padding: '32px 44px',
          marginBottom: 36,
          transform: `scale(${interpolate(questionIn, [0, 1], [0.85, 1])})`,
          width: '100%',
        }}>
          <div style={{ fontFamily: FONT, fontSize: 26, color: WHITE, textAlign: 'center', lineHeight: 1.5 }}>
            "WHAT'S THE SALARY BAND<br />FOR MY ROLE?"
          </div>
        </div>

        <div style={{ width: '100%', marginBottom: 36 }}>
          {checkItems.map(({ label, delay }) => {
            const itemIn = spr(delay);
            return (
              <div key={label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: 18,
                opacity: itemIn,
                transform: `translateX(${interpolate(itemIn, [0, 1], [-30, 0])}px)`,
              }}>
                <svg width={30} height={30} viewBox="0 0 30 30">
                  <circle cx={15} cy={15} r={14} fill={GREEN} />
                  <line x1={8} y1={15} x2={13} y2={21} stroke={WHITE} strokeWidth={3} strokeLinecap="round" />
                  <line x1={13} y1={21} x2={22} y2={9} stroke={WHITE} strokeWidth={3} strokeLinecap="round" />
                </svg>
                <div style={{ fontFamily: FONT, fontSize: 24, color: BLACK }}>{label}</div>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: ctaIn, textAlign: 'center' }}>
          <div style={{ ...headline(30, ACCENT) }}>FOLLOW FOR MORE</div>
          <div style={{ ...headline(30, ACCENT) }}>HIDDEN MONEY MOVES</div>
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
