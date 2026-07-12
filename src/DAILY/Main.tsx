import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#3B82F6';
const GREEN = '#10B981';
const RED = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  textAlign: 'center',
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

// Person silhouette SVG — circle head + body + arms + legs
const PersonSVG: React.FC<{ fill: string; flip?: boolean }> = ({ fill, flip }) => (
  <svg width="90" height="160" viewBox="0 0 90 160" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
    <circle cx="45" cy="28" r="22" fill={fill} />
    <rect x="18" y="56" width="54" height="64" rx="8" fill={fill} />
    <rect x="0" y="60" width="18" height="44" rx="7" fill={fill} />
    <rect x="72" y="60" width="18" height="44" rx="7" fill={fill} />
    <rect x="20" y="116" width="20" height="30" rx="6" fill={fill} />
    <rect x="50" y="116" width="20" height="30" rx="6" fill={fill} />
  </svg>
);

// ── Scene definitions ──────────────────────────────────────────────────────

// Scene 1 – Dark – #1 cause of divorce: two people facing off over money
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const leftX = interpolate(frame, [0, 35], [-220, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightX = interpolate(frame, [0, 35], [220, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dollarSp = spring({ frame: Math.max(0, frame - 20), fps: 30, config: { damping: 10, stiffness: 90 } });
  const titleOp = interpolate(frame, [50, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subtitleSp = spring({ frame: Math.max(0, frame - 85), fps: 30, config: { damping: 14, stiffness: 100 } });
  const subtitleY = interpolate(subtitleSp, [0, 1], [40, 0]);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>

        <div style={{ ...headline(30, ACCENT), letterSpacing: '0.3em', marginBottom: 60 }}>THE SILENT WEALTH KILLER</div>

        {/* Two people + dollar sign between */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 50 }}>
          <div style={{ transform: `translateX(${leftX}px)` }}>
            <PersonSVG fill={ACCENT} />
          </div>

          <div style={{ transform: `scale(${dollarSp})` }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke={RED} strokeWidth="5" />
              <text x="50" y="68" textAnchor="middle" fontFamily={FONT} fontSize="54" fill={RED} fontWeight="900">$</text>
            </svg>
          </div>

          <div style={{ transform: `translateX(${rightX}px)` }}>
            <PersonSVG fill="#9CA3AF" flip />
          </div>
        </div>

        {/* Headline */}
        <div style={{ opacity: titleOp, textAlign: 'center' }}>
          <div style={{ ...headline(40, WHITE), lineHeight: 1.25, marginBottom: 10 }}>MONEY IS THE</div>
          <div style={{ ...headline(56, RED), lineHeight: 1.1, marginBottom: 10 }}>#1 CAUSE</div>
          <div style={{ ...headline(40, WHITE), lineHeight: 1.25 }}>OF DIVORCE</div>
        </div>

        <div style={{ opacity: titleOp, transform: `translateY(${subtitleY}px)`, marginTop: 40 }}>
          <div style={{ ...headline(26, '#9CA3AF') }}>IN AMERICA</div>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2 – Light – 70% of couples fight about money
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const leftBubbleX = interpolate(frame, [5, 40], [-200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightBubbleX = interpolate(frame, [5, 40], [200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.round(interpolate(frame, [20, 90], [0, 70], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const pctSp = spring({ frame: Math.max(0, frame - 55), fps: 30, config: { damping: 10, stiffness: 80 } });
  const subtitleOp = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>

        {/* Speech bubbles */}
        <div style={{ display: 'flex', gap: 40, marginBottom: 50, width: '100%', justifyContent: 'center' }}>
          <div style={{ transform: `translateX(${leftBubbleX}px)` }}>
            <svg width="170" height="110" viewBox="0 0 170 110">
              <rect x="0" y="0" width="150" height="80" rx="16" fill={ACCENT} />
              <polygon points="20,80 44,80 22,108" fill={ACCENT} />
              <text x="75" y="42" textAnchor="middle" fontFamily={FONT} fontSize="28" fill={WHITE}>SPEND</text>
              <text x="75" y="70" textAnchor="middle" fontFamily={FONT} fontSize="22" fill="#BFDBFE">NOW</text>
            </svg>
          </div>

          <div style={{ transform: `translateX(${rightBubbleX}px)` }}>
            <svg width="170" height="110" viewBox="0 0 170 110">
              <rect x="20" y="0" width="150" height="80" rx="16" fill={RED} />
              <polygon points="126,80 150,80 148,108" fill={RED} />
              <text x="95" y="42" textAnchor="middle" fontFamily={FONT} fontSize="28" fill={WHITE}>SAVE</text>
              <text x="95" y="70" textAnchor="middle" fontFamily={FONT} fontSize="22" fill="#FECACA">IT</text>
            </svg>
          </div>
        </div>

        {/* Counter */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 160, color: BLACK, fontWeight: 900, lineHeight: 1 }}>{counterVal}</span>
          <div style={{ transform: `scale(${pctSp})`, transformOrigin: 'bottom left', marginLeft: 6 }}>
            <span style={{ fontFamily: FONT, fontSize: 100, color: ACCENT, fontWeight: 900, lineHeight: 1 }}>%</span>
          </div>
        </div>

        <div style={{ opacity: subtitleOp, textAlign: 'center', marginTop: 20 }}>
          <div style={{ ...headline(36, BLACK), lineHeight: 1.3 }}>OF COUPLES</div>
          <div style={{ ...headline(36, BLACK), lineHeight: 1.3 }}>FIGHT ABOUT MONEY</div>
          <div style={{ ...headline(26, '#6B7280'), lineHeight: 1.4, marginTop: 14 }}>REGULARLY</div>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3 – Dark – Competing purchases, money flying away
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const itemsY = interpolate(frame, [0, 40], [200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const moneyOp = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill1Y = interpolate(frame, [55, 160], [0, -280], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill1X = interpolate(frame, [55, 160], [0, -180], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill2Y = interpolate(frame, [65, 165], [0, -260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill2X = interpolate(frame, [65, 165], [0, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill3Y = interpolate(frame, [75, 170], [0, -300], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bill3X = interpolate(frame, [75, 170], [0, -40], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const Bill: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <div style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, opacity: moneyOp }}>
      <svg width="70" height="34" viewBox="0 0 70 34">
        <rect x="0" y="0" width="70" height="34" rx="5" fill={GREEN} />
        <rect x="4" y="4" width="62" height="26" rx="3" fill="none" stroke="#34D399" strokeWidth="1.5" />
        <text x="35" y="22" textAnchor="middle" fontFamily={FONT} fontSize="14" fill={WHITE}>$100</text>
      </svg>
    </div>
  );

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>

        <div style={{ ...headline(38, WHITE), marginBottom: 60 }}>MISALIGNED SPENDING</div>

        {/* Two people with competing items */}
        <div style={{ display: 'flex', gap: 50, alignItems: 'flex-end', transform: `translateY(${itemsY}px)`, marginBottom: 20 }}>
          {/* Spender side */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <svg width="90" height="90" viewBox="0 0 90 90">
              <rect x="12" y="30" width="66" height="56" rx="8" fill={ACCENT} />
              <path d="M26 30 Q26 8 45 8 Q64 8 64 30" stroke={ACCENT} strokeWidth="9" fill="none" strokeLinecap="round" />
              <line x1="45" y1="30" x2="45" y2="72" stroke={WHITE} strokeWidth="3" opacity="0.5" />
            </svg>
            <div style={{ ...headline(24, ACCENT) }}>WANTS TO SPEND</div>
          </div>

          {/* VS */}
          <div style={{ paddingBottom: 60 }}>
            <div style={{ ...headline(46, RED) }}>VS</div>
          </div>

          {/* Saver side — piggy bank */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <svg width="100" height="90" viewBox="0 0 100 90">
              <ellipse cx="50" cy="58" rx="36" ry="28" fill={GREEN} />
              <ellipse cx="84" cy="62" rx="12" ry="10" fill={GREEN} />
              <circle cx="81" cy="60" r="3" fill="#065F46" />
              <circle cx="87" cy="60" r="3" fill="#065F46" />
              <circle cx="68" cy="46" r="4" fill="#065F46" />
              <ellipse cx="38" cy="30" rx="10" ry="14" fill={GREEN} />
              <rect x="43" y="28" width="16" height="5" rx="2" fill="#065F46" />
              <rect x="26" y="82" width="14" height="12" rx="4" fill={GREEN} />
              <rect x="46" y="84" width="14" height="10" rx="4" fill={GREEN} />
            </svg>
            <div style={{ ...headline(24, GREEN) }}>WANTS TO SAVE</div>
          </div>
        </div>

        {/* Flying bills */}
        <div style={{ position: 'relative', height: 60, width: '100%' }}>
          <Bill x={bill1X} y={bill1Y} />
          <Bill x={bill2X} y={bill2Y} />
          <Bill x={bill3X} y={bill3Y} />
        </div>

        <div style={{ opacity: labelOp, textAlign: 'center', marginTop: 30 }}>
          <div style={{ ...headline(38, RED), lineHeight: 1.3 }}>THOUSANDS LOST</div>
          <div style={{ ...headline(38, RED), lineHeight: 1.3 }}>EVERY YEAR</div>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4 – Light – 37% divorce stat + gavel + $30K cost
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const gavelRot = interpolate(frame, [5, 35], [-35, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat37Op = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const costVal = Math.round(interpolate(frame, [70, 150], [0, 30000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const costOp = interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const costLabelOp = interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>

        {/* Gavel */}
        <div style={{ transform: `rotate(${gavelRot}deg)`, transformOrigin: '70% 70%', marginBottom: 40 }}>
          <svg width="160" height="160" viewBox="0 0 160 160">
            <rect x="58" y="16" width="82" height="42" rx="9" fill={BLACK} />
            <rect x="58" y="24" width="82" height="10" fill="#374151" />
            <rect x="58" y="40" width="82" height="10" fill="#374151" />
            <rect x="18" y="54" width="96" height="17" rx="8" fill="#92400E" transform="rotate(38 66 62)" />
            <rect x="24" y="124" width="112" height="28" rx="7" fill="#4B5563" />
          </svg>
        </div>

        {/* 37% stat */}
        <div style={{ opacity: stat37Op, textAlign: 'center', marginBottom: 40 }}>
          <div style={{ ...headline(32, '#6B7280') }}>MONEY FIGHTERS ARE</div>
          <div style={{ fontFamily: FONT, fontSize: 110, color: RED, fontWeight: 900, lineHeight: 1 }}>37%</div>
          <div style={{ ...headline(32, '#6B7280') }}>MORE LIKELY TO DIVORCE</div>
        </div>

        {/* Cost box */}
        <div style={{ opacity: costOp, background: BLACK, borderRadius: 20, padding: '24px 44px', textAlign: 'center' }}>
          <div style={{ ...headline(26, WHITE), marginBottom: 10 }}>AVERAGE DIVORCE COST</div>
          <div style={{ fontFamily: FONT, fontSize: 72, color: RED, fontWeight: 900, lineHeight: 1 }}>
            ${costVal.toLocaleString()}
          </div>
          <div style={{ opacity: costLabelOp }}>
            <div style={{ ...headline(24, '#9CA3AF'), marginTop: 8 }}>IN LEGAL FEES ALONE</div>
          </div>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5 – Dark – Bar chart: aligned $1.2M vs misaligned $440K → $760K gap
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const maxH = 380;
  const alignedH = interpolate(frame, [15, 115], [0, maxH], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const misalignedH = interpolate(frame, [15, 115], [0, Math.round(maxH * 0.41)], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapSp = spring({ frame: Math.max(0, frame - 120), fps: 30, config: { damping: 11, stiffness: 100 } });
  const labelOp = interpolate(frame, [15, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const alignedValTop = maxH - alignedH + 60;
  const misalignedValTop = maxH - misalignedH + 60;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>

        <div style={{ opacity: labelOp }}>
          <div style={{ ...headline(36, WHITE), marginBottom: 40 }}>RETIREMENT SAVINGS GAP</div>
        </div>

        {/* Chart area */}
        <div style={{ position: 'relative', width: '80%', height: maxH + 100 }}>
          {/* Floor */}
          <div style={{ position: 'absolute', bottom: 56, left: 0, right: 0, height: 2, background: '#374151' }} />

          {/* Aligned bar */}
          <div style={{ position: 'absolute', bottom: 58, left: '8%', width: '34%' }}>
            <div style={{ position: 'absolute', top: alignedValTop - 44, left: 0, right: 0, textAlign: 'center' }}>
              <span style={{ fontFamily: FONT, fontSize: 30, color: GREEN, fontWeight: 900 }}>$1.2M</span>
            </div>
            <div style={{ width: '100%', height: alignedH, background: 'linear-gradient(to top, #10B981, #34D399)', borderRadius: '10px 10px 0 0' }} />
          </div>

          {/* Aligned label */}
          <div style={{ position: 'absolute', bottom: 0, left: '8%', width: '34%', textAlign: 'center' }}>
            <div style={{ ...headline(22, GREEN) }}>ALIGNED</div>
          </div>

          {/* Misaligned bar */}
          <div style={{ position: 'absolute', bottom: 58, right: '8%', width: '34%' }}>
            <div style={{ position: 'absolute', top: misalignedValTop - 44, left: 0, right: 0, textAlign: 'center' }}>
              <span style={{ fontFamily: FONT, fontSize: 30, color: RED, fontWeight: 900 }}>$440K</span>
            </div>
            <div style={{ width: '100%', height: misalignedH, background: 'linear-gradient(to top, #EF4444, #F87171)', borderRadius: '10px 10px 0 0' }} />
          </div>

          {/* Misaligned label */}
          <div style={{ position: 'absolute', bottom: 0, right: '8%', width: '34%', textAlign: 'center' }}>
            <div style={{ ...headline(22, RED) }}>MISALIGNED</div>
          </div>
        </div>

        {/* Gap badge */}
        <div style={{ transform: `scale(${gapSp})`, background: RED, borderRadius: 18, padding: '18px 36px', marginTop: 20 }}>
          <div style={{ ...headline(44, WHITE) }}>$760,000 GAP</div>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6 – Light – Calendar heart + money date CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const calY = interpolate(frame, [0, 40], [200, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const heartSp = spring({ frame: Math.max(0, frame - 50), fps: 30, config: { damping: 7, stiffness: 120 } });
  const textOp = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaSp = spring({ frame: Math.max(0, frame - 130), fps: 30, config: { damping: 12, stiffness: 100 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 40px' }}>

        {/* Calendar */}
        <div style={{ transform: `translateY(${calY}px)`, marginBottom: 36 }}>
          <svg width="220" height="230" viewBox="0 0 220 230">
            {/* Body */}
            <rect x="10" y="44" width="200" height="176" rx="14" fill={ACCENT} />
            {/* Header strip */}
            <rect x="10" y="44" width="200" height="54" rx="14" fill="#1D4ED8" />
            <rect x="10" y="78" width="200" height="20" fill="#1D4ED8" />
            {/* Month label */}
            <text x="110" y="76" textAnchor="middle" fontFamily={FONT} fontSize="19" fill={WHITE}>MONEY DATE</text>
            {/* Rings */}
            <rect x="58" y="26" width="14" height="36" rx="7" fill="#9CA3AF" />
            <rect x="148" y="26" width="14" height="36" rx="7" fill="#9CA3AF" />
            {/* Grid lines */}
            <line x1="10" y1="118" x2="210" y2="118" stroke="#93C5FD" strokeWidth="1" opacity="0.4" />
            <line x1="10" y1="152" x2="210" y2="152" stroke="#93C5FD" strokeWidth="1" opacity="0.4" />
            <line x1="10" y1="186" x2="210" y2="186" stroke="#93C5FD" strokeWidth="1" opacity="0.4" />
            {/* Heart on a date cell */}
            <g transform={`translate(110, 155) scale(${heartSp})`}>
              <path d="M0 -14 C0 -14 -28 -30 -28 -8 C-28 10 0 28 0 28 C0 28 28 10 28 -8 C28 -30 0 -14 0 -14Z" fill={RED} />
            </g>
          </svg>
        </div>

        {/* Two aligned people */}
        <div style={{ display: 'flex', gap: 30, marginBottom: 36 }}>
          <PersonSVG fill={ACCENT} />
          <PersonSVG fill="#10B981" />
        </div>

        <div style={{ opacity: textOp, textAlign: 'center', marginBottom: 32 }}>
          <div style={{ ...headline(42, BLACK), lineHeight: 1.2 }}>SCHEDULE YOUR</div>
          <div style={{ ...headline(42, ACCENT), lineHeight: 1.2 }}>MONEY DATE</div>
          <div style={{ ...headline(28, '#6B7280'), lineHeight: 1.5, marginTop: 14 }}>30 MIN · SHARED GOALS · $760K SAVED</div>
        </div>

        {/* CTA button */}
        <div style={{ transform: `scale(${ctaSp})`, background: ACCENT, borderRadius: 18, padding: '20px 44px' }}>
          <div style={{ ...headline(40, WHITE) }}>START TONIGHT →</div>
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
