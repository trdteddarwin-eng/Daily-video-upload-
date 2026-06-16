import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const RED = '#EF4444';
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

// ─── Scene 1: Hook — money disappearing from piggy bank ───────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const titleY = interpolate(titleIn, [0, 1], [30, 0]);

  const pigIn = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 22, stiffness: 55 } });

  // Three bills float up at staggered frames
  const b1Y = interpolate(frame, [30, 120], [0, -320], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b1Op = interpolate(frame, [30, 55, 110, 130], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b2Y = interpolate(frame, [55, 145], [0, -300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b2Op = interpolate(frame, [55, 80, 130, 150], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b3Y = interpolate(frame, [75, 165], [0, -280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const b3Op = interpolate(frame, [75, 100, 150, 170], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const subIn = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 26, stiffness: 65 } });
  const subX = interpolate(subIn, [0, 1], [-200, 0]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 110, left: 40, right: 40, textAlign: 'center',
        opacity: titleIn, transform: `translateY(${titleY}px)`,
      }}>
        <p style={headline(80, ACCENT)}>YOUR</p>
        <p style={{ ...headline(80, WHITE), marginTop: 4 }}>MONEY</p>
      </div>

      {/* Piggy bank + floating bills */}
      <div style={{
        position: 'absolute', top: 380, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: pigIn, transform: `scale(${pigIn})`,
      }}>
        <div style={{ position: 'relative', width: 260, height: 220 }}>
          {/* Bill 1 */}
          <div style={{
            position: 'absolute', top: 40, left: 20,
            transform: `translateY(${b1Y}px)`, opacity: b1Op,
          }}>
            <svg width="64" height="38" viewBox="0 0 64 38">
              <rect width="64" height="38" rx="5" fill={GREEN} />
              <rect x="4" y="4" width="56" height="30" rx="3" fill="none" stroke="#0D9268" strokeWidth="1.5" />
              <text x="32" y="26" textAnchor="middle" fontSize="22" fill={WHITE} fontFamily="Arial Black">$</text>
            </svg>
          </div>
          {/* Bill 2 */}
          <div style={{
            position: 'absolute', top: 20, left: 100,
            transform: `translateY(${b2Y}px)`, opacity: b2Op,
          }}>
            <svg width="64" height="38" viewBox="0 0 64 38">
              <rect width="64" height="38" rx="5" fill={GREEN} />
              <rect x="4" y="4" width="56" height="30" rx="3" fill="none" stroke="#0D9268" strokeWidth="1.5" />
              <text x="32" y="26" textAnchor="middle" fontSize="22" fill={WHITE} fontFamily="Arial Black">$</text>
            </svg>
          </div>
          {/* Bill 3 */}
          <div style={{
            position: 'absolute', top: 30, left: 180,
            transform: `translateY(${b3Y}px)`, opacity: b3Op,
          }}>
            <svg width="64" height="38" viewBox="0 0 64 38">
              <rect width="64" height="38" rx="5" fill={GREEN} />
              <rect x="4" y="4" width="56" height="30" rx="3" fill="none" stroke="#0D9268" strokeWidth="1.5" />
              <text x="32" y="26" textAnchor="middle" fontSize="22" fill={WHITE} fontFamily="Arial Black">$</text>
            </svg>
          </div>

          {/* Piggy bank SVG */}
          <svg width="260" height="220" viewBox="0 0 260 220">
            {/* Body */}
            <ellipse cx="118" cy="138" rx="95" ry="74" fill={ACCENT} />
            {/* Head */}
            <circle cx="200" cy="105" r="52" fill={ACCENT} />
            {/* Snout */}
            <ellipse cx="238" cy="118" rx="24" ry="17" fill="#D97706" />
            <circle cx="231" cy="115" r="5" fill={BLACK} />
            <circle cx="245" cy="115" r="5" fill={BLACK} />
            {/* Eye */}
            <circle cx="196" cy="88" r="7" fill={BLACK} />
            <circle cx="194" cy="86" r="2" fill={WHITE} />
            {/* Ear */}
            <ellipse cx="192" cy="62" rx="14" ry="19" fill="#D97706" />
            {/* Coin slot */}
            <rect x="102" y="56" width="32" height="7" rx="3.5" fill={BLACK} />
            {/* Legs */}
            <rect x="48" y="196" width="28" height="24" rx="6" fill="#D97706" />
            <rect x="88" y="196" width="28" height="24" rx="6" fill="#D97706" />
            <rect x="132" y="196" width="28" height="24" rx="6" fill="#D97706" />
            <rect x="172" y="196" width="28" height="24" rx="6" fill="#D97706" />
            {/* Tail */}
            <path d="M 26 118 Q 6 96 22 76 Q 38 56 24 40" stroke="#D97706" strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* "IS DISAPPEARING" subtitle */}
      <div style={{
        position: 'absolute', bottom: 160, left: 40, right: 40, textAlign: 'center',
        opacity: subIn, transform: `translateX(${subX}px)`,
      }}>
        <p style={headline(62, WHITE)}>IS</p>
        <p style={{ ...headline(62, RED), marginTop: 4 }}>DISAPPEARING</p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 2: FSA explainer — medical cross + savings bar ────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const crossIn = spring({ frame: Math.max(0, frame - 22), fps, config: { damping: 20, stiffness: 180 } });
  const dollarIn = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 22, stiffness: 140 } });
  const barProg = interpolate(frame, [60, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const catchOp = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const barW = Math.floor(barProg * 520);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 100, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(48, BLACK)}>FLEXIBLE</p>
        <p style={{ ...headline(48, ACCENT), marginTop: 6 }}>SPENDING ACCOUNT</p>
      </div>

      {/* Medical cross + dollar sign icons */}
      <div style={{
        position: 'absolute', top: 330, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40,
      }}>
        <div style={{ opacity: crossIn, transform: `scale(${crossIn})` }}>
          <svg width="110" height="110" viewBox="0 0 110 110">
            <rect x="38" y="8" width="34" height="94" rx="8" fill={RED} />
            <rect x="8" y="38" width="94" height="34" rx="8" fill={RED} />
          </svg>
        </div>

        <div style={{ opacity: crossIn }}>
          <svg width="50" height="50" viewBox="0 0 50 50">
            <text x="25" y="38" textAnchor="middle" fontSize="44" fill={BLACK} fontFamily="Arial Black">+</text>
          </svg>
        </div>

        <div style={{ opacity: dollarIn, transform: `scale(${dollarIn})` }}>
          <svg width="110" height="110" viewBox="0 0 110 110">
            <circle cx="55" cy="55" r="52" fill={GREEN} />
            <text x="55" y="74" textAnchor="middle" fontSize="66" fill={WHITE} fontFamily="Arial Black">$</text>
          </svg>
        </div>
      </div>

      {/* Savings bar */}
      <div style={{ position: 'absolute', top: 560, left: 35, right: 35 }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, textAlign: 'center', margin: '0 0 14px' }}>
          INSTANT TAX SAVINGS
        </p>
        <div style={{ width: '100%', height: 58, background: '#DDD', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{
            width: barW, height: 58, background: ACCENT, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 14,
          }}>
            {barW > 80 && (
              <span style={{ fontFamily: FONT, fontSize: 26, color: WHITE }}>30%</span>
            )}
          </div>
        </div>
      </div>

      {/* Catch reveal */}
      <div style={{ position: 'absolute', bottom: 130, left: 40, right: 40, textAlign: 'center', opacity: catchOp }}>
        <p style={headline(54, RED)}>BUT THERE&apos;S</p>
        <p style={{ ...headline(54, RED), marginTop: 4 }}>A CATCH...</p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 3: Use-it-or-lose-it deadline ─────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 26, stiffness: 65 } });
  const calDrop = spring({ frame: Math.max(0, frame - 15), fps, from: -1, to: 0, config: { damping: 18, stiffness: 80 } });
  const calY = interpolate(calDrop, [-1, 0], [-400, 0]);

  const billY = interpolate(frame, [80, 175], [0, 360], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) });
  const billRot = interpolate(frame, [80, 175], [0, 35], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const billOp = interpolate(frame, [80, 110, 165, 185], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const captionIn = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 28, stiffness: 70 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 105, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(70, ACCENT)}>USE IT</p>
        <p style={{ ...headline(70, WHITE), marginTop: 6 }}>OR LOSE IT</p>
      </div>

      {/* Calendar */}
      <div style={{
        position: 'absolute', top: 340, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        transform: `translateY(${calY}px)`,
      }}>
        <svg width="300" height="268" viewBox="0 0 300 268">
          <rect x="0" y="36" width="300" height="232" rx="14" fill={WHITE} />
          <rect x="0" y="36" width="300" height="62" rx="14" fill={RED} />
          <rect x="0" y="74" width="300" height="24" fill={RED} />
          <rect x="78" y="18" width="22" height="38" rx="8" fill="#888" />
          <rect x="200" y="18" width="22" height="38" rx="8" fill="#888" />
          <text x="150" y="76" textAnchor="middle" fontSize="28" fill={WHITE} fontFamily="Arial Black">DECEMBER</text>
          <text x="150" y="195" textAnchor="middle" fontSize="110" fill={BLACK} fontFamily="Arial Black">31</text>
          <text x="150" y="252" textAnchor="middle" fontSize="28" fill={RED} fontFamily="Arial Black">DEADLINE</text>
        </svg>
      </div>

      {/* Falling dollar bill */}
      <div style={{
        position: 'absolute', top: 530, left: 120,
        transform: `translateY(${billY}px) rotate(${billRot}deg)`,
        opacity: billOp,
      }}>
        <svg width="80" height="48" viewBox="0 0 80 48">
          <rect width="80" height="48" rx="5" fill={GREEN} />
          <rect x="4" y="4" width="72" height="40" rx="3" fill="none" stroke="#0D9268" strokeWidth="1.5" />
          <text x="40" y="33" textAnchor="middle" fontSize="28" fill={WHITE} fontFamily="Arial Black">$</text>
        </svg>
      </div>

      {/* Trash can */}
      <div style={{
        position: 'absolute', bottom: 120, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
      }}>
        <svg width="120" height="115" viewBox="0 0 120 115">
          <rect x="14" y="34" width="92" height="78" rx="9" fill="#555" />
          <rect x="4" y="20" width="112" height="18" rx="6" fill="#777" />
          <rect x="38" y="8" width="44" height="16" rx="6" fill="#777" />
          <line x1="38" y1="54" x2="38" y2="100" stroke="#444" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="54" x2="60" y2="100" stroke="#444" strokeWidth="3" strokeLinecap="round" />
          <line x1="82" y1="54" x2="82" y2="100" stroke="#444" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 52, left: 40, right: 40, textAlign: 'center', opacity: captionIn }}>
        <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, lineHeight: 1.4, margin: 0 }}>
          Your employer legally keeps whatever you didn&apos;t spend. Let&apos;s see how much that costs you.
        </p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 4: $408 counter + $1.6B bar ───────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const numScale = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 22, stiffness: 120 } });

  const counter = interpolate(frame, [25, 160], [0, 408], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad),
  });

  const barProg = interpolate(frame, [105, 185], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const barW = Math.floor(barProg * 560);

  const goneOp = interpolate(frame, [175, 205], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 100, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(40, BLACK)}>AVERAGE AMERICAN</p>
        <p style={{ ...headline(40, BLACK), marginTop: 6 }}>FORFEITS</p>
      </div>

      {/* Big $408 counter */}
      <div style={{
        position: 'absolute', top: 280, left: 0, right: 0, textAlign: 'center',
        opacity: numScale, transform: `scale(${numScale})`,
      }}>
        <p style={{ fontFamily: FONT, fontSize: 160, color: ACCENT, margin: 0, lineHeight: 1 }}>
          ${Math.floor(counter)}
        </p>
        <p style={{ ...headline(38, BLACK), marginTop: 8 }}>PER YEAR</p>
      </div>

      {/* Divider */}
      <div style={{ position: 'absolute', top: 580, left: 100, right: 100, height: 4, background: ACCENT, borderRadius: 2 }} />

      {/* $1.6B bar */}
      <div style={{ position: 'absolute', top: 620, left: 35, right: 35 }}>
        <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, textAlign: 'center', margin: '0 0 14px' }}>
          INDUSTRY-WIDE LOSS
        </p>
        <div style={{ width: '100%', height: 64, background: '#DDD', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{
            width: barW, height: 64, background: RED, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {barW > 140 && (
              <span style={{ fontFamily: FONT, fontSize: 28, color: WHITE }}>$1.6 BILLION</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 100, left: 40, right: 40, textAlign: 'center', opacity: goneOp }}>
        <p style={headline(46, RED)}>GONE EVERY YEAR</p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 5: FSA covers more — 4 item grid ──────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const i1 = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 22, stiffness: 160 } });
  const i2 = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 22, stiffness: 160 } });
  const i3 = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 22, stiffness: 160 } });
  const i4 = spring({ frame: Math.max(0, frame - 135), fps, config: { damping: 22, stiffness: 160 } });
  const ctaOp = interpolate(frame, [160, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const itemSprings = [i1, i2, i3, i4];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 95, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(44, ACCENT)}>FSA COVERS MORE</p>
        <p style={{ ...headline(44, WHITE), marginTop: 6 }}>THAN YOU THINK</p>
      </div>

      {/* 2×2 grid */}
      <div style={{
        position: 'absolute', top: 310, left: 60, right: 60,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32,
      }}>
        {/* Glasses */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          opacity: itemSprings[0], transform: `scale(${itemSprings[0]})`,
        }}>
          <svg width="130" height="72" viewBox="0 0 130 72">
            <circle cx="32" cy="44" r="28" fill="none" stroke={ACCENT} strokeWidth="7" />
            <circle cx="98" cy="44" r="28" fill="none" stroke={ACCENT} strokeWidth="7" />
            <line x1="60" y1="44" x2="70" y2="44" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" />
            <line x1="4" y1="44" x2="4" y2="12" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
            <line x1="126" y1="44" x2="126" y2="12" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
          </svg>
          <p style={headline(26, WHITE)}>GLASSES</p>
        </div>

        {/* Sunscreen bottle */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          opacity: itemSprings[1], transform: `scale(${itemSprings[1]})`,
        }}>
          <svg width="76" height="128" viewBox="0 0 76 128">
            <rect x="14" y="36" width="48" height="84" rx="10" fill={ACCENT} />
            <rect x="20" y="16" width="36" height="28" rx="6" fill="#D97706" />
            <rect x="26" y="6" width="24" height="14" rx="5" fill="#B45309" />
            <rect x="18" y="60" width="40" height="38" rx="5" fill={WHITE} />
            <text x="38" y="84" textAnchor="middle" fontSize="15" fill={BLACK} fontFamily="Arial Black">SPF</text>
          </svg>
          <p style={headline(26, WHITE)}>SUNSCREEN</p>
        </div>

        {/* Bandage */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          opacity: itemSprings[2], transform: `scale(${itemSprings[2]})`,
        }}>
          <svg width="130" height="62" viewBox="0 0 130 62">
            <rect x="4" y="16" width="122" height="30" rx="7" fill="#F9A8D4" />
            <rect x="42" y="8" width="46" height="46" rx="5" fill={WHITE} />
            <circle cx="18" cy="24" r="4" fill="#FBCFE8" />
            <circle cx="18" cy="38" r="4" fill="#FBCFE8" />
            <circle cx="112" cy="24" r="4" fill="#FBCFE8" />
            <circle cx="112" cy="38" r="4" fill="#FBCFE8" />
            <rect x="62" y="16" width="6" height="30" rx="3" fill={RED} />
            <rect x="50" y="26" width="30" height="6" rx="3" fill={RED} />
          </svg>
          <p style={headline(26, WHITE)}>BANDAGES</p>
        </div>

        {/* Baby bottle */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          opacity: itemSprings[3], transform: `scale(${itemSprings[3]})`,
        }}>
          <svg width="72" height="128" viewBox="0 0 72 128">
            <path d="M18 52 Q12 64 12 84 Q12 114 36 116 Q60 114 60 84 Q60 64 54 52 Z" fill={WHITE} />
            <rect x="22" y="28" width="28" height="30" rx="5" fill={WHITE} />
            <ellipse cx="36" cy="22" rx="20" ry="10" fill="#93C5FD" />
            <ellipse cx="36" cy="14" rx="9" ry="11" fill="#BFDBFE" />
            <path d="M14 86 Q12 102 14 112 Q36 120 58 112 Q60 102 58 86 Z" fill="#BFDBFE" />
            <line x1="14" y1="72" x2="24" y2="72" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="14" y1="86" x2="24" y2="86" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="14" y1="100" x2="24" y2="100" stroke="#9CA3AF" strokeWidth="2" />
          </svg>
          <p style={headline(26, WHITE)}>BABY GEAR</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 108, left: 40, right: 40, textAlign: 'center', opacity: ctaOp }}>
        <p style={{ ...headline(38, ACCENT) }}>SPEND IT BEFORE</p>
        <p style={{ ...headline(38, WHITE), marginTop: 4 }}>YOU LOSE IT</p>
      </div>
    </FadeScene>
  );
};

// ─── Scene 6: CTA — check your FSA balance ───────────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 28, stiffness: 70 } });
  const phoneIn = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 20, stiffness: 90 } });

  const balance = interpolate(frame, [40, 160], [0, 408], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });

  const pulse = interpolate(frame % 35, [0, 17, 35], [1, 1.06, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const ctaIn = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 26, stiffness: 65 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 95, left: 40, right: 40, textAlign: 'center', opacity: titleIn }}>
        <p style={headline(54, BLACK)}>CHECK YOUR</p>
        <p style={{ ...headline(54, ACCENT), marginTop: 6 }}>FSA TODAY</p>
      </div>

      {/* Phone mock */}
      <div style={{
        position: 'absolute', top: 290, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        opacity: phoneIn, transform: `scale(${phoneIn})`,
      }}>
        <svg width="290" height="370" viewBox="0 0 290 370">
          {/* Phone shell */}
          <rect x="8" y="8" width="274" height="354" rx="32" fill={BLACK} />
          {/* Screen */}
          <rect x="18" y="28" width="254" height="314" rx="22" fill="#1A1A2E" />
          {/* Notch */}
          <rect x="104" y="16" width="82" height="20" rx="8" fill={BLACK} />
          {/* App header */}
          <rect x="18" y="28" width="254" height="58" rx="22" fill={ACCENT} />
          <rect x="18" y="64" width="254" height="22" fill={ACCENT} />
          <text x="145" y="66" textAnchor="middle" fontSize="20" fill={WHITE} fontFamily="Arial Black">FSA BALANCE</text>
          {/* Balance label */}
          <text x="145" y="128" textAnchor="middle" fontSize="18" fill="#9CA3AF" fontFamily="Arial">Available Balance</text>
          {/* Balance number */}
          <text x="60" y="198" textAnchor="start" fontSize="58" fill={ACCENT} fontFamily="Arial Black">$</text>
          <text x="100" y="198" textAnchor="start" fontSize="58" fill={ACCENT} fontFamily="Arial Black">{Math.floor(balance)}</text>
          {/* Divider */}
          <line x1="36" y1="216" x2="254" y2="216" stroke="#333" strokeWidth="1" />
          {/* Use by text */}
          <text x="145" y="248" textAnchor="middle" fontSize="17" fill={RED} fontFamily="Arial Black">USE BY DEC 31</text>
          {/* Spend button */}
          <rect x="52" y="268" width="186" height="46" rx="12" fill={ACCENT} />
          <text x="145" y="298" textAnchor="middle" fontSize="20" fill={WHITE} fontFamily="Arial Black">SPEND NOW</text>
        </svg>
      </div>

      {/* CTA text */}
      <div style={{
        position: 'absolute', bottom: 168, left: 40, right: 40, textAlign: 'center',
        opacity: ctaIn, transform: `scale(${ctaIn})`,
      }}>
        <p style={headline(40, BLACK)}>DON&apos;T GIFT YOUR</p>
        <p style={{ ...headline(40, RED), marginTop: 4 }}>EMPLOYER $408</p>
      </div>

      {/* Pulsing follow CTA */}
      <div style={{
        position: 'absolute', bottom: 74, left: 60, right: 60,
        display: 'flex', justifyContent: 'center',
        transform: `scale(${pulse})`,
      }}>
        <div style={{
          background: ACCENT, borderRadius: 14,
          paddingTop: 16, paddingBottom: 16, paddingLeft: 36, paddingRight: 36,
        }}>
          <p style={headline(30, WHITE)}>FOLLOW FOR MORE</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── Root composition ──────────────────────────────────────────────────────────
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
