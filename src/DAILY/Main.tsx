import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F0F0F';
const BG_LIGHT = '#FFF7ED';
const ACCENT = '#F97316';
const GREEN = '#10B981';
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

// ─── Scene 1: Social feed phone + flying dollars ──────────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-80, 0]);

  const phoneSpring = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 12, stiffness: 70 } });
  const phoneScale = interpolate(phoneSpring, [0, 1], [0.5, 1]);

  const count = Math.floor(
    interpolate(frame, [70, 180], [0, 2100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const countOpacity = interpolate(frame, [65, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const dollarCount = Math.max(0, Math.floor(6));
  const xOffsets = [-80, -30, 30, 80, -55, 55];
  const startFrames = [30, 42, 55, 68, 80, 92];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(52, WHITE), marginBottom: 6 }}>TIKTOK MADE</p>
          <p style={{ ...headline(68, ACCENT) }}>YOU BUY IT</p>
        </div>

        <div style={{ position: 'relative', transform: `scale(${phoneScale})` }}>
          <svg width={220} height={360} viewBox="0 0 220 360">
            <rect x={10} y={10} width={200} height={340} rx={28} fill={'#1a1a2e'} stroke={ACCENT} strokeWidth={3} />
            <rect x={22} y={34} width={176} height={280} rx={8} fill={'#0d0d1a'} />
            <rect x={80} y={14} width={60} height={14} rx={7} fill={'#0a0a15'} />
            {/* Feed card 1 */}
            <rect x={28} y={42} width={164} height={66} rx={6} fill={'#2d1f5e'} />
            <rect x={34} y={48} width={46} height={46} rx={5} fill={ACCENT} opacity={0.8} />
            <rect x={88} y={54} width={88} height={10} rx={4} fill={'#ffffff'} opacity={0.7} />
            <rect x={88} y={70} width={58} height={8} rx={4} fill={ACCENT} opacity={0.9} />
            <rect x={88} y={84} width={72} height={8} rx={4} fill={'#ffffff'} opacity={0.4} />
            {/* Feed card 2 */}
            <rect x={28} y={116} width={164} height={66} rx={6} fill={'#1f3d2e'} />
            <rect x={34} y={122} width={46} height={46} rx={5} fill={GREEN} opacity={0.8} />
            <rect x={88} y={128} width={88} height={10} rx={4} fill={'#ffffff'} opacity={0.7} />
            <rect x={88} y={144} width={58} height={8} rx={4} fill={GREEN} opacity={0.9} />
            <rect x={88} y={158} width={72} height={8} rx={4} fill={'#ffffff'} opacity={0.4} />
            {/* Feed card 3 */}
            <rect x={28} y={190} width={164} height={66} rx={6} fill={'#3d1f1f'} />
            <rect x={34} y={196} width={46} height={46} rx={5} fill={'#EF4444'} opacity={0.8} />
            <rect x={88} y={202} width={88} height={10} rx={4} fill={'#ffffff'} opacity={0.7} />
            <rect x={88} y={218} width={58} height={8} rx={4} fill={'#EF4444'} opacity={0.9} />
            <rect x={88} y={232} width={72} height={8} rx={4} fill={'#ffffff'} opacity={0.4} />
            <rect x={78} y={328} width={64} height={8} rx={4} fill={'#333'} />
          </svg>

          {Array(dollarCount).fill(0).map((_u, i) => {
            const sf = startFrames[i];
            const op = interpolate(frame, [sf, sf + 12, sf + 50, sf + 65], [0, 1, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const yOff = interpolate(frame, [sf, sf + 65], [0, -160], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: 100,
                  left: 110 + xOffsets[i],
                  opacity: op,
                  transform: `translateY(${yOff}px)`,
                  fontFamily: FONT,
                  fontSize: 36,
                  color: ACCENT,
                  pointerEvents: 'none',
                }}
              >
                $
              </div>
            );
          })}
        </div>

        <div style={{ opacity: countOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(26, 'rgba(255,255,255,0.5)'), marginBottom: 8 }}>DRAINS THE AVERAGE AMERICAN</p>
          <p style={{ fontFamily: FONT, fontSize: 88, color: ACCENT, margin: 0, lineHeight: 1 }}>${count}</p>
          <p style={{ ...headline(22, 'rgba(255,255,255,0.4)'), marginTop: 8 }}>PER YEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 2: Algorithm eye watching the phone ───────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const phoneSpring = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 12, stiffness: 70 } });
  const phoneX = interpolate(phoneSpring, [0, 1], [-280, 0]);

  const eyeSpring = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 10, stiffness: 60 } });
  const eyeScale = interpolate(eyeSpring, [0, 1], [0, 1]);

  const badgeOpacity = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(48, BLACK), marginBottom: 6 }}>#1: THE ALGORITHM</p>
          <p style={{ ...headline(30, ACCENT) }}>NEVER FORGETS</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 48 }}>
          {/* Phone */}
          <div style={{ transform: `translateX(${phoneX}px)` }}>
            <svg width={140} height={240} viewBox="0 0 140 240">
              <rect x={6} y={6} width={128} height={228} rx={20} fill={'#1a1a2e'} stroke={ACCENT} strokeWidth={2} />
              <rect x={16} y={24} width={108} height={188} rx={5} fill={'#0d0d1a'} />
              <rect x={48} y={10} width={44} height={12} rx={6} fill={'#0a0a15'} />
              {[30, 68, 106, 144, 182].map((y, idx) => (
                <rect key={idx} x={22} y={y} width={96} height={26} rx={4} fill={idx % 2 === 0 ? '#1f2d4a' : '#2d1f3a'} />
              ))}
              <rect x={48} y={226} width={44} height={6} rx={3} fill={'#333'} />
            </svg>
          </div>

          {/* Algorithm eye */}
          <div style={{ transform: `scale(${eyeScale})` }}>
            <svg width={190} height={190} viewBox="0 0 190 190">
              <ellipse cx={95} cy={75} rx={75} ry={46} fill="none" stroke={ACCENT} strokeWidth={4} />
              <circle cx={95} cy={75} r={28} fill={ACCENT} />
              <circle cx={95} cy={75} r={14} fill={BLACK} />
              <circle cx={102} cy={69} r={5} fill={WHITE} />
              <line x1={95} y1={121} x2={38} y2={168} stroke={ACCENT} strokeWidth={2} strokeDasharray="6 4" opacity={0.7} />
              <line x1={95} y1={121} x2={95} y2={175} stroke={ACCENT} strokeWidth={2} strokeDasharray="6 4" opacity={0.7} />
              <line x1={95} y1={121} x2={152} y2={168} stroke={ACCENT} strokeWidth={2} strokeDasharray="6 4" opacity={0.7} />
              <circle cx={38} cy={172} r={9} fill={ACCENT} opacity={0.8} />
              <circle cx={95} cy={178} r={9} fill={ACCENT} opacity={0.8} />
              <circle cx={152} cy={172} r={9} fill={ACCENT} opacity={0.8} />
            </svg>
          </div>
        </div>

        <div style={{ opacity: badgeOpacity, background: ACCENT, borderRadius: 14, padding: '14px 32px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>TRACKS EVERY PAUSE + LIKE</p>
          <p style={{ ...headline(20, 'rgba(255,255,255,0.8)'), marginTop: 8 }}>UNLIMITED TIME TO STUDY YOU</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 3: Social proof — 847 bought, 73% crowd ───────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const badgeSpring = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 12, stiffness: 80 } });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0.5, 1]);

  const badgeCount = Math.floor(
    interpolate(frame, [35, 145], [0, 847], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const pctOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctWidth = interpolate(frame, [120, 195], [0, 73], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const personCount = Math.max(0, Math.floor(10));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(48, WHITE), marginBottom: 6 }}>#2: SOCIAL PROOF</p>
          <p style={{ ...headline(30, ACCENT) }}>IS THE WEAPON</p>
        </div>

        <div
          style={{
            transform: `scale(${badgeScale})`,
            background: ACCENT,
            borderRadius: 20,
            padding: '18px 40px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>{badgeCount} BOUGHT IN THE LAST HOUR</p>
          <p style={{ fontFamily: FONT, fontSize: 18, color: 'rgba(255,255,255,0.8)', margin: '6px 0 0 0' }}>LIMITED STOCK REMAINING</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {Array(personCount).fill(0).map((_u, i) => {
            const pSpring = spring({ frame: Math.max(0, frame - 20 - i * 7), fps, config: { damping: 14, stiffness: 80 } });
            const pColor = i < 7 ? ACCENT : '#444';
            return (
              <svg key={i} width={44} height={76} viewBox="0 0 44 76" opacity={pSpring}>
                <circle cx={22} cy={16} r={12} fill={pColor} />
                <rect x={13} y={32} width={18} height={26} rx={4} fill={pColor} />
                <line x1={13} y1={40} x2={4} y2={56} stroke={pColor} strokeWidth={4} strokeLinecap="round" />
                <line x1={31} y1={40} x2={40} y2={56} stroke={pColor} strokeWidth={4} strokeLinecap="round" />
                <line x1={16} y1={58} x2={12} y2={72} stroke={pColor} strokeWidth={4} strokeLinecap="round" />
                <line x1={28} y1={58} x2={32} y2={72} stroke={pColor} strokeWidth={4} strokeLinecap="round" />
              </svg>
            );
          })}
        </div>

        <div style={{ opacity: pctOpacity, width: '100%' }}>
          <p style={{ ...headline(22, 'rgba(255,255,255,0.6)'), marginBottom: 10 }}>GEN Z BOUGHT FROM A SOCIAL POST</p>
          <div style={{ background: '#333', borderRadius: 10, height: 52, overflow: 'hidden' }}>
            <div
              style={{
                width: `${pctWidth}%`,
                height: '100%',
                background: ACCENT,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 12,
              }}
            >
              <span style={{ fontFamily: FONT, fontSize: 30, color: WHITE }}>73%</span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 4: Credit card + one-tap checkout ─────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const cardSpring = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 12, stiffness: 70 } });
  const cardScale = interpolate(cardSpring, [0, 1], [0.6, 1]);

  const pctCount = Math.floor(
    interpolate(frame, [80, 170], [0, 35], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const pctOpacity = interpolate(frame, [75, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const buttonSpring = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 6, stiffness: 120 } });
  const buttonScale = interpolate(buttonSpring, [0, 1], [0.9, 1]);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(48, BLACK), marginBottom: 6 }}>#3: ONE-TAP CHECKOUT</p>
          <p style={{ ...headline(30, ACCENT) }}>THE KILL SHOT</p>
        </div>

        <div style={{ transform: `scale(${cardScale})` }}>
          <svg width={320} height={196} viewBox="0 0 320 196">
            <rect x={0} y={0} width={320} height={196} rx={20} fill={'#1a1a2e'} />
            <rect x={0} y={0} width={320} height={196} rx={20} fill="none" stroke={ACCENT} strokeWidth={2} />
            <rect x={0} y={64} width={320} height={48} fill={'#111827'} />
            {/* Chip */}
            <rect x={24} y={22} width={50} height={38} rx={6} fill={'#D4AF37'} />
            <line x1={34} y1={22} x2={34} y2={60} stroke={'#B8960C'} strokeWidth={1} />
            <line x1={44} y1={22} x2={44} y2={60} stroke={'#B8960C'} strokeWidth={1} />
            <line x1={54} y1={22} x2={54} y2={60} stroke={'#B8960C'} strokeWidth={1} />
            <line x1={24} y1={36} x2={74} y2={36} stroke={'#B8960C'} strokeWidth={1} />
            <line x1={24} y1={48} x2={74} y2={48} stroke={'#B8960C'} strokeWidth={1} />
            {/* Card number */}
            <text x={24} y={138} fill={WHITE} fontFamily={FONT} fontSize={20} letterSpacing="5" opacity={0.7}>**** **** **** 4823</text>
            {/* Name + expiry */}
            <text x={24} y={168} fill={WHITE} fontFamily={FONT} fontSize={14} opacity={0.6}>CARDHOLDER</text>
            <text x={260} y={168} fill={WHITE} fontFamily={FONT} fontSize={14} opacity={0.6}>12/28</text>
            {/* Contactless symbol */}
            <path d="M 280 28 Q 294 40 280 52" fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" />
            <path d="M 272 21 Q 292 40 272 59" fill="none" stroke={ACCENT} strokeWidth={3} strokeLinecap="round" opacity={0.6} />
          </svg>
        </div>

        <div
          style={{
            transform: `scale(${buttonScale})`,
            background: ACCENT,
            borderRadius: 50,
            padding: '18px 60px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0 }}>BUY NOW — 1 TAP</p>
          <p style={{ ...headline(18, 'rgba(255,255,255,0.8)'), marginTop: 6 }}>NO WALLET NEEDED</p>
        </div>

        <div style={{ opacity: pctOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(22, '#555'), marginBottom: 8 }}>REMOVING FRICTION INCREASES SPENDING</p>
          <p style={{ fontFamily: FONT, fontSize: 80, color: ACCENT, margin: 0, lineHeight: 1 }}>+{pctCount}%</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 5: Two diverging bar charts — spent vs invested ───────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const spentBarH = interpolate(frame, [30, 110], [0, 180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const investBarH = interpolate(frame, [50, 195], [0, 310], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const investOpacity = interpolate(frame, [45, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const labelCount = Math.floor(
    interpolate(frame, [100, 195], [0, 315000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  const starTop = 310 - investBarH - 30;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(44, WHITE), marginBottom: 6 }}>THE REAL COST</p>
          <p style={{ ...headline(26, ACCENT) }}>$2,100/YEAR INVESTED INSTEAD</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 60 }}>
          {/* Spent bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ height: 310, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ width: 120, height: spentBarH, background: ACCENT, borderRadius: '10px 10px 0 0' }} />
            </div>
            <p style={{ ...headline(24, WHITE), margin: 0 }}>SPENT</p>
            <p style={{ ...headline(28, ACCENT), margin: 0 }}>$2,100</p>
            <p style={{ ...headline(16, 'rgba(255,255,255,0.4)'), margin: 0 }}>GONE FOREVER</p>
          </div>

          {/* Invested bar */}
          <div style={{ opacity: investOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative', height: 310, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <div style={{ width: 120, height: investBarH, background: GREEN, borderRadius: '10px 10px 0 0' }} />
              <div
                style={{
                  position: 'absolute',
                  top: starTop,
                  left: 35,
                  width: 50,
                  height: 50,
                  background: GREEN,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width={26} height={26} viewBox="0 0 26 26">
                  <polygon points="13,2 16,9 24,9 18,14 20,22 13,17 6,22 8,14 2,9 10,9" fill={WHITE} />
                </svg>
              </div>
            </div>
            <p style={{ ...headline(24, WHITE), margin: 0 }}>INVESTED</p>
            <p style={{ fontFamily: FONT, fontSize: 30, color: GREEN, margin: 0, lineHeight: 1 }}>${labelCount.toLocaleString()}</p>
            <p style={{ ...headline(16, 'rgba(255,255,255,0.4)'), margin: 0 }}>AT RETIREMENT</p>
          </div>
        </div>

        <p style={{ ...headline(20, 'rgba(255,255,255,0.35)'), margin: 0 }}>8% ANNUAL RETURN OVER 35 YEARS</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── Scene 6: Phone toggles OFF + CTA ──────────────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSpring, [0, 1], [-60, 0]);

  const phoneSpring = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 12, stiffness: 70 } });
  const phoneY = interpolate(phoneSpring, [0, 1], [200, 0]);

  const ctaSpring = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 14, stiffness: 80 } });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.8, 1]);

  const toggle1 = interpolate(frame, [40, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const toggle2 = interpolate(frame, [65, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const toggle3 = interpolate(frame, [90, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Toggle knob cx: 231=ON (right), 209=OFF (left)
  const knob1x = interpolate(toggle1, [0, 1], [231, 209], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const knob2x = interpolate(toggle2, [0, 1], [231, 209], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const knob3x = interpolate(toggle3, [0, 1], [231, 209], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const knob1fill = toggle1 > 0.5 ? '#666' : ACCENT;
  const knob2fill = toggle2 > 0.5 ? '#666' : ACCENT;
  const knob3fill = toggle3 > 0.5 ? '#666' : ACCENT;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
          padding: '60px 48px',
        }}
      >
        <div style={{ transform: `translateY(${titleY}px)`, textAlign: 'center' }}>
          <p style={{ ...headline(48, BLACK), marginBottom: 6 }}>ADD FRICTION</p>
          <p style={{ ...headline(34, ACCENT) }}>PROTECT YOUR FUTURE</p>
        </div>

        <div style={{ transform: `translateY(${phoneY}px)` }}>
          <svg width={290} height={270} viewBox="0 0 290 270">
            <rect x={8} y={8} width={274} height={254} rx={24} fill={'#1a1a2e'} stroke={'#2a2a3e'} strokeWidth={2} />
            {/* Row 1: One-tap checkout */}
            <rect x={22} y={28} width={246} height={62} rx={10} fill={'#0d0d1a'} />
            <text x={36} y={52} fill={WHITE} fontFamily={FONT} fontSize={17}>ONE-TAP CHECKOUT</text>
            <text x={36} y={72} fill={'#666'} fontFamily={FONT} fontSize={13}>TURN THIS OFF</text>
            <rect x={196} y={40} width={56} height={28} rx={14} fill={'#222'} />
            <circle cx={knob1x} cy={54} r={11} fill={knob1fill} />
            {/* Row 2: Saved payment */}
            <rect x={22} y={102} width={246} height={62} rx={10} fill={'#0d0d1a'} />
            <text x={36} y={126} fill={WHITE} fontFamily={FONT} fontSize={17}>SAVED PAYMENT METHOD</text>
            <text x={36} y={146} fill={'#666'} fontFamily={FONT} fontSize={13}>UNLINK YOUR CARD</text>
            <rect x={196} y={114} width={56} height={28} rx={14} fill={'#222'} />
            <circle cx={knob2x} cy={128} r={11} fill={knob2fill} />
            {/* Row 3: Auto-buy alerts */}
            <rect x={22} y={176} width={246} height={62} rx={10} fill={'#0d0d1a'} />
            <text x={36} y={200} fill={WHITE} fontFamily={FONT} fontSize={17}>AUTO-BUY ALERTS</text>
            <text x={36} y={220} fill={'#666'} fontFamily={FONT} fontSize={13}>DISABLE NOTIFICATIONS</text>
            <rect x={196} y={188} width={56} height={28} rx={14} fill={'#222'} />
            <circle cx={knob3x} cy={202} r={11} fill={knob3fill} />
          </svg>
        </div>

        <div
          style={{
            transform: `scale(${ctaScale})`,
            opacity: ctaSpring,
            background: ACCENT,
            borderRadius: 50,
            padding: '18px 50px',
          }}
        >
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, margin: 0, letterSpacing: '0.1em' }}>FOLLOW FOR MORE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── COMPOSITION ──────────────────────────────────────────────────────────────

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
