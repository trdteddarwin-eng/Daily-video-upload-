import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0D1117';
const BG_LIGHT = '#F5F5F5';
const ORANGE = '#F97316';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
const RED = '#EF4444';
const GRAY = '#6B7280';
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

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children, bg, dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// Scene 1: Two person silhouettes — dollar bills fly from YOU to SOCIAL LIFE, counter to $3,200
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [80, 0]);

  const personSp = spring({ frame: Math.max(0, frame - 22), fps: 30, config: { damping: 14, stiffness: 70 } });
  const personScale = interpolate(personSp, [0, 1], [0.3, 1]);

  const bill1X = interpolate(frame, [55, 145], [0, 310], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const bill2X = interpolate(frame, [72, 158], [0, 290], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
  const bill3X = interpolate(frame, [90, 168], [0, 270], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const counterProg = interpolate(frame, [120, 210], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const counterVal = Math.round(counterProg * 3200);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 36, padding: '0 60px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(54, ORANGE)}>FRIENDSHIP</p>
          <p style={headline(54, WHITE)}>HAS A PRICE TAG</p>
        </div>

        <div style={{ transform: `scale(${personScale})` }}>
          <svg width="680" height="260" viewBox="0 0 680 260">
            {/* Left person: YOU */}
            <circle cx="88" cy="62" r="42" fill={WHITE} opacity={0.9}/>
            <rect x="48" y="104" width="80" height="110" rx="16" fill={WHITE} opacity={0.9}/>
            {/* Wallet in left hand */}
            <rect x="120" y="148" width="48" height="32" rx="6" fill={ORANGE}/>
            <rect x="122" y="152" width="44" height="24" rx="4" fill="#7C3D00"/>
            {/* Dollar bills flying right */}
            <g transform={`translate(${bill1X}, 0)`}>
              <rect x="162" y="140" width="66" height="36" rx="6" fill={GREEN} opacity={0.9}/>
              <text x="195" y="164" textAnchor="middle" fontFamily="Arial Black" fontSize="22" fill={WHITE} fontWeight="bold">$</text>
            </g>
            <g transform={`translate(${bill2X}, 0)`}>
              <rect x="162" y="182" width="66" height="36" rx="6" fill={GREEN} opacity={0.8}/>
              <text x="195" y="206" textAnchor="middle" fontFamily="Arial Black" fontSize="22" fill={WHITE} fontWeight="bold">$</text>
            </g>
            <g transform={`translate(${bill3X}, 0)`}>
              <rect x="162" y="100" width="66" height="36" rx="6" fill={GREEN} opacity={0.85}/>
              <text x="195" y="124" textAnchor="middle" fontFamily="Arial Black" fontSize="22" fill={WHITE} fontWeight="bold">$</text>
            </g>
            {/* Right person: SOCIAL LIFE */}
            <circle cx="592" cy="62" r="42" fill={ORANGE} opacity={0.85}/>
            <rect x="552" y="104" width="80" height="110" rx="16" fill={ORANGE} opacity={0.85}/>
            {/* Labels */}
            <text x="88" y="242" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill={WHITE}>YOU</text>
            <text x="592" y="242" textAnchor="middle" fontFamily="Arial Black" fontSize="18" fill={ORANGE}>SOCIAL LIFE</text>
          </svg>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={headline(30, WHITE)}>THAT COSTS YOU</p>
          <p style={{ fontFamily: FONT, fontSize: 104, color: ORANGE, margin: 0, lineHeight: 1 }}>
            ${counterVal.toLocaleString()}
          </p>
          <p style={headline(30, WHITE)}>A YEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2: Wedding rings + suitcase — $800+ per wedding
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  const ringSp = spring({ frame: Math.max(0, frame - 20), fps: 30, config: { damping: 12, stiffness: 70 } });
  const ringScale = interpolate(ringSp, [0, 1], [0, 1]);

  const caseSp = spring({ frame: Math.max(0, frame - 60), fps: 30, config: { damping: 12, stiffness: 70 } });
  const caseScale = interpolate(caseSp, [0, 1], [0, 1]);

  const badgeSp = spring({ frame: Math.max(0, frame - 105), fps: 30, config: { damping: 14, stiffness: 80 } });
  const badgeScale = interpolate(badgeSp, [0, 1], [0.2, 1]);

  const subOp = interpolate(frame, [158, 192], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 48, padding: '0 60px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(50, BLACK)}>WEDDINGS</p>
          <p style={headline(50, ORANGE)}>COST YOU $800+</p>
        </div>

        <div style={{ display: 'flex', gap: 64, alignItems: 'center', justifyContent: 'center' }}>
          {/* Interlocked wedding rings */}
          <div style={{ transform: `scale(${ringScale})`, textAlign: 'center' }}>
            <svg width="210" height="170" viewBox="0 0 210 170">
              <circle cx="88" cy="88" r="56" fill="none" stroke="#D4AF37" strokeWidth="18"/>
              <circle cx="122" cy="88" r="56" fill="none" stroke="#C0C0C0" strokeWidth="18"/>
              <polygon points="88,24 78,40 88,48 98,40" fill="#A7D8F0"/>
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 24, color: GRAY, margin: 0, letterSpacing: '0.06em' }}>GIFT: $200</p>
          </div>

          {/* Suitcase */}
          <div style={{ transform: `scale(${caseScale})`, textAlign: 'center' }}>
            <svg width="160" height="158" viewBox="0 0 160 158">
              <rect x="18" y="54" width="124" height="88" rx="10" fill="#4B5563" stroke={BLACK} strokeWidth="4"/>
              <path d="M52 54 L52 34 Q52 22 80 22 Q108 22 108 34 L108 54" fill="none" stroke={BLACK} strokeWidth="6" strokeLinecap="round"/>
              <rect x="76" y="54" width="8" height="88" fill="#374151"/>
              <rect x="18" y="96" width="124" height="5" fill="#374151"/>
              <circle cx="38" cy="144" r="8" fill="#9CA3AF"/>
              <circle cx="122" cy="144" r="8" fill="#9CA3AF"/>
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 24, color: GRAY, margin: 0, letterSpacing: '0.06em' }}>TRAVEL + HOTEL: $450</p>
          </div>
        </div>

        {/* Orange total badge */}
        <div style={{ transform: `scale(${badgeScale})`, textAlign: 'center' }}>
          <div style={{ background: ORANGE, borderRadius: 22, padding: '22px 60px' }}>
            <p style={headline(40, WHITE)}>TOTAL PER WEDDING</p>
            <p style={{ fontFamily: FONT, fontSize: 82, color: WHITE, margin: 0, lineHeight: 1 }}>$800+</p>
          </div>
        </div>

        <p style={{ ...headline(28, BLACK), opacity: subOp }}>
          GOING TO 3–4 THIS YEAR? THAT'S $3,200 GONE
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3: Airplane slides in — group trip $1,500, FOMO overlay
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  const planeSp = spring({ frame: Math.max(0, frame - 18), fps: 30, config: { damping: 14, stiffness: 60 } });
  const planeX = interpolate(planeSp, [0, 1], [-520, 0]);

  const tagSp = spring({ frame: Math.max(0, frame - 80), fps: 30, config: { damping: 14, stiffness: 75 } });
  const tagScale = interpolate(tagSp, [0, 1], [0.2, 1]);

  const fomoOp = interpolate(frame, [132, 165], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const subOp = interpolate(frame, [178, 208], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 38, padding: '0 60px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(50, WHITE)}>THE GROUP TRIP</p>
          <p style={headline(50, ORANGE)}>YOU CAN'T SAY NO TO</p>
        </div>

        {/* Airplane sliding in */}
        <div style={{ transform: `translateX(${planeX}px)` }}>
          <svg width="340" height="160" viewBox="0 0 340 160">
            {/* Fuselage */}
            <ellipse cx="160" cy="80" rx="148" ry="30" fill={WHITE} opacity={0.95}/>
            {/* Nose */}
            <path d="M298 80 L330 70 L330 90 Z" fill={WHITE} opacity={0.95}/>
            {/* Main wing */}
            <path d="M120 80 L80 128 L128 122 L155 84" fill={WHITE} opacity={0.88}/>
            {/* Upper wing flap */}
            <path d="M120 80 L95 36 L118 40 L148 76" fill={WHITE} opacity={0.88}/>
            {/* Tail fin */}
            <path d="M22 80 L10 50 L36 68" fill={WHITE} opacity={0.88}/>
            {/* Engine pod */}
            <ellipse cx="138" cy="110" rx="26" ry="12" fill={GRAY} opacity={0.7}/>
            {/* Windows */}
            <circle cx="148" cy="76" r="11" fill="#87CEEB" opacity={0.85}/>
            <circle cx="178" cy="76" r="11" fill="#87CEEB" opacity={0.85}/>
            <circle cx="208" cy="76" r="11" fill="#87CEEB" opacity={0.85}/>
          </svg>
        </div>

        {/* Price tag */}
        <div style={{ transform: `scale(${tagScale})` }}>
          <div style={{ background: ORANGE, borderRadius: 20, padding: '20px 56px', textAlign: 'center' }}>
            <p style={headline(42, WHITE)}>GROUP TRIP</p>
            <p style={{ fontFamily: FONT, fontSize: 86, color: WHITE, margin: 0, lineHeight: 1 }}>$1,500</p>
          </div>
        </div>

        <p style={{ ...headline(32, WHITE), opacity: fomoOp }}>
          YOUR BRAIN: "I CAN'T MISS OUT"
        </p>

        <p style={{ ...headline(26, GRAY), opacity: subOp }}>
          FOMO IS YOUR MOST EXPENSIVE PERSONALITY TRAIT
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4: Birthday cake + 3 event cards sliding in
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  const cakeSp = spring({ frame: Math.max(0, frame - 18), fps: 30, config: { damping: 12, stiffness: 70 } });
  const cakeScale = interpolate(cakeSp, [0, 1], [0, 1]);

  const ev1Sp = spring({ frame: Math.max(0, frame - 58), fps: 30, config: { damping: 14, stiffness: 72 } });
  const ev2Sp = spring({ frame: Math.max(0, frame - 96), fps: 30, config: { damping: 14, stiffness: 72 } });
  const ev3Sp = spring({ frame: Math.max(0, frame - 134), fps: 30, config: { damping: 14, stiffness: 72 } });

  const ev1X = interpolate(ev1Sp, [0, 1], [-420, 0]);
  const ev2X = interpolate(ev2Sp, [0, 1], [-420, 0]);
  const ev3X = interpolate(ev3Sp, [0, 1], [-420, 0]);

  const totalOp = interpolate(frame, [172, 205], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const evItems = [
    { label: 'BIRTHDAY DINNERS', cost: '~$80 / EACH', xVal: ev1X },
    { label: 'BABY SHOWERS', cost: '~$120 / EACH', xVal: ev2X },
    { label: 'GOING-AWAY PARTIES', cost: '~$100 / EACH', xVal: ev3X },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 32, padding: '0 60px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(46, BLACK)}>THEN THE</p>
          <p style={headline(46, ORANGE)}>SMALL STUFF</p>
        </div>

        {/* Birthday cake */}
        <div style={{ transform: `scale(${cakeScale})` }}>
          <svg width="200" height="168" viewBox="0 0 200 168">
            <rect x="28" y="88" width="144" height="68" rx="10" fill="#F9A8D4" stroke={BLACK} strokeWidth="4"/>
            <rect x="28" y="64" width="144" height="30" rx="8" fill="#FBBF24" stroke={BLACK} strokeWidth="3"/>
            <path d="M28 70 Q48 82 68 70 Q88 58 108 70 Q128 82 148 70 Q164 62 172 70 L172 64 L28 64 Z" fill={WHITE} opacity={0.82}/>
            <rect x="70" y="42" width="12" height="24" rx="3" fill="#EC4899"/>
            <rect x="98" y="42" width="12" height="24" rx="3" fill="#8B5CF6"/>
            <rect x="126" y="42" width="12" height="24" rx="3" fill="#3B82F6"/>
            <ellipse cx="76" cy="38" rx="7" ry="10" fill="#FCD34D"/>
            <ellipse cx="104" cy="38" rx="7" ry="10" fill="#FCD34D"/>
            <ellipse cx="132" cy="38" rx="7" ry="10" fill="#FCD34D"/>
            <ellipse cx="100" cy="156" rx="76" ry="10" fill={GRAY} opacity={0.25}/>
          </svg>
        </div>

        {/* Event cards */}
        {evItems.map((item, i) => (
          <div key={i} style={{
            transform: `translateX(${item.xVal}px)`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            width: '100%', maxWidth: 860, background: WHITE, borderRadius: 14,
            padding: '14px 32px', boxShadow: '0 3px 14px rgba(0,0,0,0.07)',
          }}>
            <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0, letterSpacing: '0.06em' }}>
              {item.label}
            </p>
            <p style={{ fontFamily: FONT, fontSize: 26, color: ORANGE, margin: 0, letterSpacing: '0.06em' }}>
              {item.cost}
            </p>
          </div>
        ))}

        <p style={{ ...headline(34, BLACK), opacity: totalOp }}>
          10 SMALL EVENTS = $1,000 / YEAR
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5: Animated breakdown card — lines reveal, counter to $3,200
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [80, 0]);

  const line1Op = interpolate(frame, [28, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Op = interpolate(frame, [78, 112], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line3Op = interpolate(frame, [125, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const totalProg = interpolate(frame, [162, 210], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const totalVal = Math.round(totalProg * 3200);

  const subOp = interpolate(frame, [210, 222], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 34, padding: '0 70px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(44, WHITE)}>YOUR ANNUAL</p>
          <p style={headline(44, ORANGE)}>FRIENDSHIP TAX</p>
        </div>

        <div style={{
          width: '100%', maxWidth: 900, background: '#1A1F2E',
          borderRadius: 24, padding: '38px 52px',
          display: 'flex', flexDirection: 'column', gap: 26,
        }}>
          <div style={{ opacity: line1Op, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={headline(28, WHITE)}>2 WEDDINGS</p>
            <p style={{ fontFamily: FONT, fontSize: 38, color: ORANGE, margin: 0 }}>$1,300</p>
          </div>
          <div style={{ opacity: line2Op, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={headline(28, WHITE)}>1 GROUP TRIP</p>
            <p style={{ fontFamily: FONT, fontSize: 38, color: ORANGE, margin: 0 }}>$900</p>
          </div>
          <div style={{ opacity: line3Op, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={headline(28, WHITE)}>10 SMALL EVENTS</p>
            <p style={{ fontFamily: FONT, fontSize: 38, color: ORANGE, margin: 0 }}>$1,000</p>
          </div>
          <div style={{ borderTop: `3px solid ${GRAY}`, paddingTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={headline(32, WHITE)}>TOTAL</p>
            <p style={{ fontFamily: FONT, fontSize: 60, color: RED, margin: 0, lineHeight: 1 }}>
              ${totalVal.toLocaleString()}
            </p>
          </div>
        </div>

        <p style={{ ...headline(26, GRAY), opacity: subOp }}>
          MORE THAN MOST AMERICANS HAVE IN SAVINGS
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6: Piggy bank + $250/month social budget CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [80, 0]);

  const piggySp = spring({ frame: Math.max(0, frame - 25), fps: 30, config: { damping: 12, stiffness: 65 } });
  const piggyScale = interpolate(piggySp, [0, 1], [0.2, 1]);

  const badgeSp = spring({ frame: Math.max(0, frame - 88), fps: 30, config: { damping: 14, stiffness: 80 } });
  const badgeScale = interpolate(badgeSp, [0, 1], [0, 1]);

  const ctaOp = interpolate(frame, [148, 182], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const followOp = interpolate(frame, [190, 218], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 40, padding: '0 60px',
      }}>
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={headline(48, BLACK)}>THE FIX:</p>
          <p style={headline(48, ORANGE)}>A SOCIAL BUDGET</p>
        </div>

        {/* Piggy bank */}
        <div style={{ transform: `scale(${piggyScale})` }}>
          <svg width="270" height="220" viewBox="0 0 270 220">
            {/* Body */}
            <ellipse cx="130" cy="130" rx="102" ry="78" fill="#FCA5A5" stroke={BLACK} strokeWidth="5"/>
            {/* Head */}
            <circle cx="222" cy="108" r="44" fill="#FCA5A5" stroke={BLACK} strokeWidth="5"/>
            {/* Snout */}
            <ellipse cx="254" cy="116" rx="18" ry="13" fill="#F87171" stroke={BLACK} strokeWidth="3"/>
            <circle cx="248" cy="114" r="4" fill={BLACK}/>
            <circle cx="260" cy="114" r="4" fill={BLACK}/>
            {/* Eye */}
            <circle cx="228" cy="96" r="6" fill={BLACK}/>
            <circle cx="229" cy="94" r="2" fill={WHITE}/>
            {/* Ear */}
            <ellipse cx="213" cy="72" rx="14" ry="18" fill="#FCA5A5" stroke={BLACK} strokeWidth="4"/>
            <ellipse cx="213" cy="72" rx="8" ry="12" fill="#F87171"/>
            {/* Coin slot */}
            <rect x="112" y="52" width="40" height="8" rx="4" fill={BLACK}/>
            {/* Legs */}
            <rect x="60" y="192" width="28" height="22" rx="8" fill="#FCA5A5" stroke={BLACK} strokeWidth="4"/>
            <rect x="104" y="196" width="28" height="20" rx="8" fill="#FCA5A5" stroke={BLACK} strokeWidth="4"/>
            <rect x="146" y="196" width="28" height="20" rx="8" fill="#FCA5A5" stroke={BLACK} strokeWidth="4"/>
            <rect x="190" y="192" width="28" height="22" rx="8" fill="#FCA5A5" stroke={BLACK} strokeWidth="4"/>
            {/* Tail */}
            <path d="M28 118 Q8 100 16 84 Q24 68 28 84" fill="none" stroke={BLACK} strokeWidth="5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Budget badge */}
        <div style={{ transform: `scale(${badgeScale})` }}>
          <div style={{ background: ORANGE, borderRadius: 22, padding: '20px 56px', textAlign: 'center' }}>
            <p style={headline(34, WHITE)}>SET YOUR SOCIAL BUDGET</p>
            <p style={{ fontFamily: FONT, fontSize: 90, color: WHITE, margin: 0, lineHeight: 1 }}>$250</p>
            <p style={headline(28, WHITE)}>PER MONTH — STICK TO IT</p>
          </div>
        </div>

        <p style={{ ...headline(30, RED), opacity: ctaOp }}>
          WHEN IT'S GONE, IT'S GONE
        </p>

        <p style={{ ...headline(28, BLACK), opacity: followOp }}>
          FOLLOW FOR MORE MONEY TRAPS
        </p>
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
