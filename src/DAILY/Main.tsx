import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#3B82F6';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const GREEN = '#10B981';
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

// ── SCENE 1 — Hook: 60% of Americans have no will ───────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const statScale = spring({ frame: Math.max(0, frame - 35), fps, config: { damping: 10, stiffness: 60 } });
  const xOpacity = interpolate(frame, [50, 72], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [85, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: '0 80px' }}>
        {/* Person silhouette + X'd-out document */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, transform: `scale(${personScale})` }}>
          {/* Person */}
          <svg width="100" height="140" viewBox="0 0 100 140">
            <circle cx="50" cy="30" r="26" fill={WHITE} opacity="0.9" />
            <ellipse cx="50" cy="108" rx="34" ry="44" fill={WHITE} opacity="0.9" />
          </svg>

          {/* Document with X */}
          <div style={{ opacity: xOpacity }}>
            <svg width="130" height="96" viewBox="0 0 130 96">
              <rect x="8" y="4" width="114" height="88" rx="6" fill={WHITE} opacity="0.1" stroke={ACCENT} strokeWidth="2" />
              <line x1="22" y1="28" x2="108" y2="28" stroke={WHITE} strokeWidth="2" opacity="0.35" />
              <line x1="22" y1="44" x2="108" y2="44" stroke={WHITE} strokeWidth="2" opacity="0.35" />
              <line x1="22" y1="60" x2="80" y2="60" stroke={WHITE} strokeWidth="2" opacity="0.35" />
              <line x1="18" y1="8" x2="112" y2="88" stroke={RED} strokeWidth="7" strokeLinecap="round" />
              <line x1="112" y1="8" x2="18" y2="88" stroke={RED} strokeWidth="7" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* 60% stat */}
        <div style={{ ...headline(128, ACCENT), transform: `scale(${statScale})` }}>60%</div>

        {/* Subtitle */}
        <div style={{
          fontFamily: FONT,
          fontSize: 32,
          color: WHITE,
          opacity: subOpacity,
          letterSpacing: '0.06em',
          textAlign: 'center',
          lineHeight: 1.3,
        }}>
          of Americans will die without a will
        </div>

        <div style={{
          fontFamily: FONT,
          fontSize: 26,
          color: RED,
          opacity: subOpacity,
          letterSpacing: '0.06em',
          textAlign: 'center',
        }}>
          and it's costing their families a fortune
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 2 — Probate explained: courthouse + padlock ───────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buildingScale = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const probateOpacity = interpolate(frame, [40, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lockScale = spring({ frame: Math.max(0, frame - 65), fps, config: { damping: 10, stiffness: 100 } });
  const labelOpacity = interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 80px' }}>
        {/* Courthouse SVG */}
        <svg width="240" height="200" viewBox="0 0 240 200" style={{ transform: `scale(${buildingScale})` }}>
          <polygon points="20,82 120,18 220,82" fill={ACCENT} />
          <rect x="28" y="82" width="184" height="108" fill={BLACK} opacity="0.85" />
          {[52, 86, 120, 154, 188].map((x, i) => (
            <rect key={i} x={x} y="82" width="14" height="96" fill={BG_LIGHT} opacity="0.75" />
          ))}
          <rect x="18" y="190" width="204" height="10" rx="2" fill={BLACK} opacity="0.65" />
          <circle cx="120" cy="13" r="8" fill={WHITE} />
        </svg>

        {/* PROBATE text */}
        <div style={{ ...headline(78, RED), opacity: probateOpacity }}>PROBATE</div>

        {/* Padlock icon */}
        <svg
          width="88"
          height="96"
          viewBox="0 0 88 96"
          style={{ transform: `scale(${lockScale})` }}
        >
          <rect x="10" y="44" width="68" height="50" rx="9" fill={BLACK} opacity="0.88" />
          <path d="M22 44 L22 28 Q44 4 66 28 L66 44" fill="none" stroke={BLACK} strokeWidth="11" strokeLinecap="round" opacity="0.88" />
          <circle cx="44" cy="66" r="7" fill={BG_LIGHT} opacity="0.75" />
          <rect x="40" y="66" width="8" height="12" rx="2" fill={BG_LIGHT} opacity="0.75" />
        </svg>

        <div style={{
          fontFamily: FONT,
          fontSize: 28,
          color: BLACK,
          opacity: labelOpacity,
          letterSpacing: '0.06em',
          textAlign: 'center',
          lineHeight: 1.4,
        }}>
          your family can't touch anything
        </div>
        <div style={{
          fontFamily: FONT,
          fontSize: 22,
          color: RED,
          opacity: labelOpacity,
          letterSpacing: '0.06em',
          textAlign: 'center',
        }}>
          while lawyers get paid
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 3 — 18 months of legal limbo: calendar grid ───────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cellsLit = Math.floor(interpolate(frame, [18, 145], [0, 18], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const titleOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const monthsScale = spring({ frame: Math.max(0, frame - 150), fps, config: { damping: 10, stiffness: 80 } });
  const subOpacity = interpolate(frame, [165, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cells = Array.from({ length: 18 }, (_, i) => i);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: '0 60px' }}>
        <div style={{ ...headline(34, WHITE), opacity: titleOpacity }}>
          Average Probate Timeline
        </div>

        {/* 18-cell calendar grid: 6 cols × 3 rows */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10, width: '100%', maxWidth: 700 }}>
          {cells.map((i) => (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                borderRadius: 8,
                background: i < cellsLit ? ACCENT : 'rgba(255,255,255,0.08)',
                border: `2px solid ${i < cellsLit ? ACCENT : 'rgba(255,255,255,0.18)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONT,
                fontSize: 15,
                color: i < cellsLit ? BLACK : 'rgba(255,255,255,0.35)',
              }}
            >
              {`M${i + 1}`}
            </div>
          ))}
        </div>

        {/* 18 MONTHS */}
        <div style={{ ...headline(80, ACCENT), transform: `scale(${monthsScale})` }}>
          18 MONTHS
        </div>
        <div style={{
          fontFamily: FONT,
          fontSize: 30,
          color: WHITE,
          opacity: subOpacity,
          letterSpacing: '0.07em',
          textAlign: 'center',
        }}>
          of legal limbo
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 4 — The $47K probate fee: house + animated counter ─────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const houseScale = spring({ frame, fps, config: { damping: 12, stiffness: 70 } });
  const estateOpacity = interpolate(frame, [28, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowOpacity = interpolate(frame, [65, 88], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const feeCount = Math.round(interpolate(frame, [85, 185], [0, 47000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const feeOpacity = interpolate(frame, [85, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 80px' }}>
        {/* House SVG */}
        <svg width="180" height="165" viewBox="0 0 180 165" style={{ transform: `scale(${houseScale})` }}>
          <polygon points="10,82 90,12 170,82" fill={ACCENT} />
          <rect x="24" y="82" width="132" height="80" fill={BLACK} opacity="0.82" />
          <rect x="72" y="114" width="36" height="48" rx="4" fill={ACCENT} opacity="0.9" />
          <rect x="34" y="96" width="28" height="24" rx="3" fill={WHITE} opacity="0.72" />
          <rect x="118" y="96" width="28" height="24" rx="3" fill={WHITE} opacity="0.72" />
          <rect x="118" y="20" width="18" height="42" fill={BLACK} opacity="0.72" />
        </svg>

        {/* Estate value */}
        <div style={{ opacity: estateOpacity, textAlign: 'center' }}>
          <div style={{ ...headline(26, BLACK) }}>Estate Value</div>
          <div style={{ ...headline(60, BLACK) }}>$600,000</div>
        </div>

        {/* Arrow */}
        <div style={{ opacity: arrowOpacity }}>
          <div style={{ ...headline(34, BLACK) }}>&#9660; Probate Takes</div>
        </div>

        {/* Animated fee counter */}
        <div style={{ opacity: feeOpacity, textAlign: 'center' }}>
          <div style={{ ...headline(78, RED) }}>
            ${feeCount.toLocaleString()}
          </div>
          <div style={{ ...headline(22, BLACK), letterSpacing: '0.06em' }}>
            in attorney &amp; court fees
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 5 — $100 will vs $47K probate: side-by-side comparison ─────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const leftScale = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 10, stiffness: 60 } });
  const rightScale = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 10, stiffness: 60 } });
  const taglineOpacity = interpolate(frame, [105, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: '0 60px' }}>
        <div style={{ ...headline(36, WHITE), opacity: titleOpacity }}>
          The Cost Comparison
        </div>

        {/* Two comparison boxes */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'stretch', width: '100%', maxWidth: 840 }}>
          {/* Left — Will */}
          <div style={{
            transform: `scale(${leftScale})`,
            flex: 1,
            background: 'rgba(16,185,129,0.12)',
            border: `3px solid ${GREEN}`,
            borderRadius: 18,
            padding: '28px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}>
            <svg width="56" height="68" viewBox="0 0 56 68">
              <rect x="4" y="4" width="48" height="60" rx="5" fill={GREEN} opacity="0.25" stroke={GREEN} strokeWidth="2" />
              <line x1="12" y1="22" x2="44" y2="22" stroke={GREEN} strokeWidth="2" opacity="0.8" />
              <line x1="12" y1="32" x2="44" y2="32" stroke={GREEN} strokeWidth="2" opacity="0.8" />
              <line x1="12" y1="42" x2="34" y2="42" stroke={GREEN} strokeWidth="2" opacity="0.8" />
            </svg>
            <div style={{ ...headline(64, GREEN) }}>$100</div>
            <div style={{ fontFamily: FONT, fontSize: 20, color: GREEN, letterSpacing: '0.05em' }}>A BASIC WILL</div>
            <div style={{ fontFamily: FONT, fontSize: 17, color: WHITE, opacity: 0.7, lineHeight: 1.4 }}>30 minutes online</div>
          </div>

          {/* VS divider */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ ...headline(38, WHITE) }}>VS</div>
          </div>

          {/* Right — Probate */}
          <div style={{
            transform: `scale(${rightScale})`,
            flex: 1,
            background: 'rgba(239,68,68,0.12)',
            border: `3px solid ${RED}`,
            borderRadius: 18,
            padding: '28px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}>
            <svg width="56" height="68" viewBox="0 0 56 68">
              <line x1="28" y1="4" x2="28" y2="56" stroke={RED} strokeWidth="3" />
              <line x1="8" y1="20" x2="48" y2="20" stroke={RED} strokeWidth="3" />
              <circle cx="8" cy="20" r="10" fill="none" stroke={RED} strokeWidth="2" />
              <circle cx="48" cy="20" r="10" fill="none" stroke={RED} strokeWidth="2" />
              <line x1="24" y1="56" x2="32" y2="56" stroke={RED} strokeWidth="4" />
            </svg>
            <div style={{ ...headline(64, RED) }}>$47K</div>
            <div style={{ fontFamily: FONT, fontSize: 20, color: RED, letterSpacing: '0.05em' }}>PROBATE FEES</div>
            <div style={{ fontFamily: FONT, fontSize: 17, color: WHITE, opacity: 0.7, lineHeight: 1.4 }}>18 months of hell</div>
          </div>
        </div>

        <div style={{ opacity: taglineOpacity, textAlign: 'center' }}>
          <div style={{ ...headline(30, ACCENT) }}>Same result. Very different cost.</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 6 — CTA: family silhouette + animated checkmark ───────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const familyScale = spring({ frame, fps, config: { damping: 12, stiffness: 60 } });
  const checkProgress = interpolate(frame, [40, 105], [0, 120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [85, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, padding: '0 80px' }}>
        {/* Family silhouette */}
        <svg width="300" height="185" viewBox="0 0 300 185" style={{ transform: `scale(${familyScale})` }}>
          {/* Adult left */}
          <circle cx="72" cy="38" r="28" fill={BLACK} opacity="0.82" />
          <ellipse cx="72" cy="128" rx="36" ry="50" fill={BLACK} opacity="0.82" />
          {/* Adult right */}
          <circle cx="228" cy="38" r="28" fill={BLACK} opacity="0.82" />
          <ellipse cx="228" cy="128" rx="36" ry="50" fill={BLACK} opacity="0.82" />
          {/* Child center */}
          <circle cx="150" cy="66" r="21" fill={ACCENT} opacity="0.92" />
          <ellipse cx="150" cy="148" rx="25" ry="37" fill={ACCENT} opacity="0.92" />
          {/* Held hands */}
          <line x1="102" y1="118" x2="127" y2="132" stroke={BLACK} strokeWidth="9" strokeLinecap="round" opacity="0.72" />
          <line x1="198" y1="118" x2="173" y2="132" stroke={BLACK} strokeWidth="9" strokeLinecap="round" opacity="0.72" />
        </svg>

        {/* Animated checkmark circle */}
        <svg width="108" height="108" viewBox="0 0 108 108">
          <circle cx="54" cy="54" r="48" fill={ACCENT} opacity="0.18" />
          <circle cx="54" cy="54" r="48" fill="none" stroke={ACCENT} strokeWidth="4" />
          <polyline
            points="24,56 46,76 84,32"
            fill="none"
            stroke={ACCENT}
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="120"
            strokeDashoffset={120 - checkProgress}
          />
        </svg>

        {/* CTA text */}
        <div style={{ opacity: ctaOpacity, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ ...headline(40, BLACK) }}>Make Your Will</div>
          <div style={{ ...headline(40, ACCENT) }}>This Week.</div>
          <div style={{
            fontFamily: FONT,
            fontSize: 26,
            color: BLACK,
            opacity: 0.75,
            marginTop: 8,
            letterSpacing: '0.04em',
          }}>
            Your family is counting on you.
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── MAIN COMPOSITION ─────────────────────────────────────────────────────────
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
