import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

const BG_DARK = '#0A1628';
const BG_LIGHT = '#F0FDF4';
const ACCENT = '#10B981';
const WHITE = '#F9FAFB';
const BLACK = '#111827';
const RED = '#EF4444';
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
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleIn = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barReveal = interpolate(frame, [30, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelIn = interpolate(frame, [135, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrowIn = interpolate(frame, [160, 190], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const noH = 190 * barReveal;
  const fullH = 266 * barReveal;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
        <div style={{ opacity: titleIn, textAlign: 'center' }}>
          <p style={{ ...headline(36, BLACK), marginBottom: 4 }}>THE IRONY</p>
          <p style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, textAlign: 'center', letterSpacing: '0.06em', margin: '0 0 30px' }}>
            VACATION = MORE PRODUCTIVITY
          </p>
        </div>

        <svg width="560" height="360" viewBox="0 0 560 360">
          <line x1="40" y1="310" x2="520" y2="310" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="40" y1="30" x2="40" y2="310" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="38" y1="216" x2="520" y2="216" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="6,4" />
          <line x1="38" y1="122" x2="520" y2="122" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="6,4" />
          <text x="30" y="314" textAnchor="end" fontSize="13" fill="#94A3B8" fontFamily="Arial">0%</text>
          <text x="30" y="220" textAnchor="end" fontSize="13" fill="#94A3B8" fontFamily="Arial">50%</text>
          <text x="30" y="126" textAnchor="end" fontSize="13" fill="#94A3B8" fontFamily="Arial">100%</text>

          {/* No PTO bar */}
          <rect x="100" y={310 - noH} width="130" height={noH} rx="8" fill={RED} opacity={0.85} />

          {/* Full PTO bar */}
          <rect x="330" y={310 - fullH} width="130" height={fullH} rx="8" fill={ACCENT} opacity={0.9} />

          {/* +40% annotation */}
          <g opacity={arrowIn}>
            <line x1="396" y1={310 - fullH - 8} x2="396" y2={310 - noH - 8} stroke="#374151" strokeWidth="2" strokeDasharray="5,3" />
            <text x="436" y={310 - (fullH + noH) / 2 + 6} textAnchor="start" fontSize="24" fill={ACCENT} fontFamily="Arial Black">+40%</text>
          </g>

          {/* Labels */}
          <g opacity={labelIn}>
            <text x="165" y="334" textAnchor="middle" fontSize="18" fill={RED} fontFamily="Arial Black">NO PTO</text>
            <text x="395" y="334" textAnchor="middle" fontSize="18" fill={ACCENT} fontFamily="Arial Black">FULL PTO</text>
          </g>
        </svg>

        <div style={{ opacity: labelIn, marginTop: 8 }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, textAlign: 'center', margin: 0 }}>
            Skipping PTO makes you <span style={{ color: RED }}>burnt out</span> — not more valuable.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const heartIn = spring({ frame, fps: 30, config: { damping: 14 } });
  const pulse = 1 + interpolate(frame % 20, [0, 10, 20], [0, 0.06, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barProgress = interpolate(frame, [40, 140], [0, 0.7], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statIn = interpolate(frame, [150, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const yearCount = Math.floor(interpolate(frame, [60, 160], [0, 30], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const s = heartIn * pulse;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '70px 50px' }}>
        <p style={{ ...headline(36, WHITE), marginBottom: 6 }}>THE HEALTH</p>
        <p style={{ ...headline(36, RED), marginBottom: 30 }}>PRICE TAG</p>

        <svg width="540" height="310" viewBox="0 0 540 310">
          {/* Heart centered at 270, 118 */}
          <g transform={`translate(270, 118) scale(${s})`}>
            <path
              d="M0,30 C5,55 -55,55 -55,0 C-55,-40 -25,-65 0,-35 C25,-65 55,-40 55,0 C55,55 -5,55 0,30 Z"
              fill={RED}
              opacity={0.9}
            />
            <polyline
              points="-38,-5 -24,-5 -17,-25 -10,20 -3,-35 4,20 11,-5 38,-5"
              fill="none"
              stroke={WHITE}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.8}
            />
          </g>

          {/* Risk bar */}
          <rect x="60" y="228" width="420" height="22" rx="11" fill="#1F2937" />
          <rect x="60" y="228" width={420 * barProgress} height="22" rx="11" fill={RED} />
          <text x="60" y="268" textAnchor="start" fontSize="14" fill="#9CA3AF" fontFamily="Arial Black">LOW RISK</text>
          <text x="480" y="268" textAnchor="end" fontSize="14" fill={RED} fontFamily="Arial Black">HIGH RISK</text>

          {/* Year counter */}
          <text x="270" y="298" textAnchor="middle" fontSize="14" fill="#6B7280" fontFamily="Arial Black">
            {yearCount} YRS WITHOUT VACATION
          </text>
        </svg>

        <div style={{ opacity: statIn, marginTop: 14, textAlign: 'center' }}>
          <div style={{ background: RED, borderRadius: 14, padding: '14px 32px' }}>
            <p style={{ ...headline(38, WHITE), margin: '0 0 4px' }}>30% HIGHER</p>
            <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, margin: 0, letterSpacing: '0.06em' }}>HEART DISEASE RISK FOR MEN</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleIn = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const countProgress = interpolate(frame, [20, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const count = Math.floor(countProgress * 768);
  const calIn = spring({ frame: Math.max(0, frame - 140), fps: 30, config: { damping: 14 } });
  const subIn = interpolate(frame, [175, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '70px 50px' }}>
        <div style={{ opacity: titleIn, textAlign: 'center' }}>
          <p style={{ ...headline(36, BLACK), marginBottom: 4 }}>LAST YEAR AMERICANS LEFT:</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 30, marginBottom: 10 }}>
          <p style={{ fontFamily: FONT, fontSize: 112, color: ACCENT, margin: 0, lineHeight: 1, letterSpacing: '-0.02em' }}>
            {count}M
          </p>
          <p style={{ ...headline(30, BLACK), marginTop: 8, marginBottom: 0 }}>VACATION DAYS UNUSED</p>
        </div>

        {/* Calendar icons with X */}
        <svg width="480" height="120" viewBox="0 0 480 120" style={{ marginTop: 24, opacity: calIn }}>
          {[0, 1, 2].map((i) => {
            const cx = 80 + i * 160;
            return (
              <g key={i}>
                <rect x={cx - 46} y={12} width={92} height={88} rx="12" fill={ACCENT} opacity={0.12} />
                <rect x={cx - 46} y={12} width={92} height={88} rx="12" fill="none" stroke={ACCENT} strokeWidth="3" />
                <rect x={cx - 46} y={12} width={92} height={28} rx="12" fill={ACCENT} opacity={0.75} />
                <rect x={cx - 46} y={30} width={92} height={10} fill={ACCENT} opacity={0.75} />
                <rect x={cx - 16} y={6} width={8} height={18} rx="4" fill="#64748B" />
                <rect x={cx + 8} y={6} width={8} height={18} rx="4" fill="#64748B" />
                <text x={cx} y={86} textAnchor="middle" fontSize="36" fill={RED} fontFamily="Arial Black">✕</text>
              </g>
            );
          })}
        </svg>

        <div style={{ opacity: subIn, marginTop: 16 }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: BLACK, textAlign: 'center', margin: 0 }}>
            A culture that convinced you <span style={{ color: RED }}>rest = weakness.</span>
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const personIn = spring({ frame, fps: 30, config: { damping: 18 } });
  const thoughtIn = interpolate(frame, [60, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bossIn = interpolate(frame, [110, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statIn = interpolate(frame, [165, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 40px' }}>
        <p style={{ ...headline(36, WHITE), marginBottom: 6 }}>THE #1 REASON YOU SKIP</p>
        <p style={{ ...headline(36, RED), marginBottom: 36 }}>ISN'T WORKLOAD</p>

        <svg width="600" height="300" viewBox="0 0 600 300">
          {/* Desk */}
          <g opacity={personIn}>
            <rect x="60" y="218" width="268" height="14" rx="4" fill="#374151" />
            <rect x="78" y="232" width="12" height="50" rx="3" fill="#374151" />
            <rect x="306" y="232" width="12" height="50" rx="3" fill="#374151" />
            {/* Laptop */}
            <rect x="110" y="188" width="140" height="28" rx="5" fill="#1F2937" />
            <rect x="106" y="216" width="148" height="6" rx="3" fill="#374151" />
          </g>

          {/* Person at desk - worried */}
          <g opacity={personIn} transform={`translate(0, ${(1 - personIn) * 30})`}>
            <circle cx="194" cy="148" r="32" fill={ACCENT} />
            <rect x="172" y="180" width="44" height="36" rx="8" fill={ACCENT} opacity={0.85} />
            {/* Worried face */}
            <circle cx="182" cy="144" r="5" fill={BLACK} />
            <circle cx="206" cy="144" r="5" fill={BLACK} />
            <path d="M182,164 Q194,157 206,164" stroke={BLACK} strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Sweat drop */}
            <ellipse cx="226" cy="140" rx="5" ry="8" fill="#60A5FA" opacity={0.8} />
          </g>

          {/* Thought bubble */}
          <g opacity={thoughtIn}>
            <circle cx="244" cy="108" r="8" fill="#374151" />
            <circle cx="276" cy="82" r="12" fill="#374151" />
            <ellipse cx="360" cy="52" rx="90" ry="44" fill="#374151" />
            <text x="360" y="45" textAnchor="middle" fontSize="18" fill={RED} fontFamily="Arial Black">LOOK</text>
            <text x="360" y="68" textAnchor="middle" fontSize="18" fill={RED} fontFamily="Arial Black">REPLACEABLE?</text>
          </g>

          {/* Boss background */}
          <g opacity={bossIn}>
            <circle cx="508" cy="112" r="38" fill="#4B5563" />
            <rect x="482" y="150" width="52" height="68" rx="10" fill="#374151" />
            {/* Arms crossed */}
            <line x1="482" y1="178" x2="534" y2="188" stroke="#4B5563" strokeWidth="12" strokeLinecap="round" />
            <line x1="534" y1="178" x2="482" y2="188" stroke="#4B5563" strokeWidth="12" strokeLinecap="round" />
            <path d="M494,124 Q508,114 522,124" stroke="#9CA3AF" strokeWidth="3" fill="none" strokeLinecap="round" />
            <text x="508" y="238" textAnchor="middle" fontSize="15" fill="#9CA3AF" fontFamily="Arial Black">YOUR BOSS</text>
          </g>
        </svg>

        <div style={{ opacity: statIn, marginTop: 12 }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, textAlign: 'center', margin: 0 }}>
            You pay <span style={{ color: RED }}>$4,200/year</span> to feel secure in a job you already have.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const workerIn = spring({ frame, fps: 30, config: { damping: 18, stiffness: 100 } });
  const bossIn = spring({ frame: Math.max(0, frame - 50), fps: 30, config: { damping: 18, stiffness: 100 } });
  const arrowPulse = interpolate(frame % 30, [0, 15, 30], [0.5, 1.0, 0.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeIn = interpolate(frame, [140, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 50px' }}>
        <p style={{ ...headline(40, WHITE), marginBottom: 6 }}>55% OF WORKERS</p>
        <p style={{ ...headline(40, ACCENT), marginBottom: 50 }}>GIVE VACATION BACK</p>

        <svg width="600" height="240" viewBox="0 0 600 240">
          {/* Worker silhouette on left */}
          <g transform={`translate(${(1 - workerIn) * -70}, 0)`} opacity={workerIn}>
            <circle cx="110" cy="75" r="32" fill={ACCENT} />
            <rect x="88" y="107" width="44" height="50" rx="8" fill={ACCENT} opacity={0.85} />
            {/* Arm extended right holding money */}
            <line x1="132" y1="125" x2="192" y2="132" stroke={ACCENT} strokeWidth="12" strokeLinecap="round" />
            {/* Money stack */}
            <rect x="192" y="118" width="68" height="22" rx="4" fill="#15803D" />
            <rect x="192" y="110" width="68" height="22" rx="4" fill="#16A34A" />
            <rect x="192" y="102" width="68" height="22" rx="4" fill="#22C55E" />
            <text x="226" y="118" textAnchor="middle" fontSize="13" fill={WHITE} fontFamily="Arial Black">$$$</text>
            <text x="110" y="180" textAnchor="middle" fontSize="17" fill={ACCENT} fontFamily="Arial Black">YOU</text>
          </g>

          {/* Arrow */}
          <text x="294" y="130" textAnchor="middle" fontSize="42" fill={ACCENT} fontFamily="Arial Black" opacity={arrowPulse}>→</text>

          {/* Boss silhouette on right */}
          <g transform={`translate(${(1 - bossIn) * 70}, 0)`} opacity={bossIn}>
            <circle cx="488" cy="72" r="38" fill="#374151" />
            <rect x="463" y="110" width="50" height="56" rx="10" fill="#1F2937" />
            {/* Tie */}
            <polygon points="488,112 481,136 488,131 495,136" fill="#4B5563" />
            {/* Smile */}
            <path d="M476,84 Q488,96 500,84" stroke={WHITE} strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="478" cy="74" r="4" fill={WHITE} opacity={0.6} />
            <circle cx="498" cy="74" r="4" fill={WHITE} opacity={0.6} />
            {/* Receiving arm */}
            <line x1="463" y1="132" x2="398" y2="136" stroke="#374151" strokeWidth="12" strokeLinecap="round" />
            <text x="488" y="185" textAnchor="middle" fontSize="17" fill="#9CA3AF" fontFamily="Arial Black">YOUR BOSS</text>
          </g>
        </svg>

        <div style={{ opacity: badgeIn, marginTop: 20, textAlign: 'center' }}>
          <div style={{ background: RED, borderRadius: 14, padding: '16px 44px', display: 'inline-block' }}>
            <p style={{ ...headline(50, WHITE), margin: 0 }}>$4,200 / YEAR</p>
            <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: '6px 0 0', letterSpacing: '0.06em' }}>HANDED OVER FOR FREE</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const titleIn = spring({ frame, fps: 30, config: { damping: 16 } });
  const calIn = spring({ frame: Math.max(0, frame - 35), fps: 30, config: { damping: 15 } });
  const step1In = spring({ frame: Math.max(0, frame - 90), fps: 30, config: { damping: 15 } });
  const step2In = spring({ frame: Math.max(0, frame - 130), fps: 30, config: { damping: 15 } });
  const ctaIn = interpolate(frame, [168, 192], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const sunRays = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI) / 4;
    return {
      x1: Math.cos(angle) * 20,
      y1: Math.sin(angle) * 20,
      x2: Math.cos(angle) * 30,
      y2: Math.sin(angle) * 30,
    };
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '70px 50px' }}>
        <div style={{ opacity: titleIn, marginBottom: 28, textAlign: 'center' }}>
          <p style={{ ...headline(40, ACCENT), margin: '0 0 4px' }}>THE MOVE</p>
          <p style={{ ...headline(40, BLACK), margin: 0 }}>IS SIMPLE</p>
        </div>

        <svg width="520" height="186" viewBox="0 0 520 186" style={{ opacity: calIn }}>
          <rect x="20" y="20" width="310" height="152" rx="14" fill={WHITE} stroke="#CBD5E1" strokeWidth="2" />
          <rect x="20" y="20" width="310" height="40" rx="14" fill={ACCENT} />
          <rect x="20" y="47" width="310" height="13" fill={ACCENT} />
          <text x="175" y="46" textAnchor="middle" fontSize="20" fill={WHITE} fontFamily="Arial Black">SEPTEMBER 2026</text>
          <rect x="80" y="12" width="9" height="20" rx="4" fill="#64748B" />
          <rect x="240" y="12" width="9" height="20" rx="4" fill="#64748B" />
          {Array.from({ length: 15 }, (_, i) => {
            const col = i % 5;
            const row = Math.floor(i / 5);
            const x = 46 + col * 58;
            const y = 90 + row * 36;
            const highlighted = row === 1;
            return (
              <g key={i}>
                <rect x={x - 20} y={y - 18} width={40} height={30} rx="6"
                  fill={highlighted ? ACCENT : 'transparent'}
                  stroke={highlighted ? ACCENT : '#CBD5E1'}
                  strokeWidth="1.5" />
                <text x={x} y={y} textAnchor="middle" fontSize="16"
                  fill={highlighted ? WHITE : '#374151'} fontFamily="Arial Black">
                  {i + 8}
                </text>
              </g>
            );
          })}
          <g transform="translate(410, 95)">
            <ellipse cx="0" cy="0" rx="52" ry="60" fill={ACCENT} opacity={0.85} />
            <path d="M-30,-40 Q0,-70 30,-40" stroke={ACCENT} strokeWidth="10" fill="none" strokeLinecap="round" />
            <circle cx="0" cy="4" r="18" fill="#FDE68A" />
            {sunRays.map((r, i) => (
              <line key={i} x1={r.x1} y1={r.y1 + 4} x2={r.x2} y2={r.y2 + 4} stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" />
            ))}
          </g>
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', marginTop: 22, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: step1In, transform: `translateX(${(1 - step1In) * -50}px)` }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: FONT, fontSize: 20, color: WHITE, lineHeight: 1 }}>1</span>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0 }}>Block one week — before Sept 30th</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: step2In, transform: `translateX(${(1 - step2In) * -50}px)` }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: FONT, fontSize: 20, color: WHITE, lineHeight: 1 }}>2</span>
            </div>
            <p style={{ fontFamily: FONT, fontSize: 24, color: BLACK, margin: 0 }}>You earned that pay — stop giving it back</p>
          </div>
        </div>

        <div style={{ opacity: ctaIn, background: ACCENT, borderRadius: 20, padding: '24px 40px', textAlign: 'center', width: '100%' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0, letterSpacing: '0.08em', fontWeight: 900 }}>
            FOLLOW FOR MORE MONEY TRUTHS
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
