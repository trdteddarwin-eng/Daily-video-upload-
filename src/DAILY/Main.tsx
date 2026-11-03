import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0D1117';
const BG_MID = '#111827';
const BG_LIGHT = '#F0FDF4';
const ACCENT = '#10B981';
const RED = '#EF4444';
const GRAY = '#6B7280';
const WHITE = '#F9FAFB';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.10em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.2,
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

  const pigScale = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const counterProgress = interpolate(frame, [40, 170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const counterValue = Math.round(30000 * counterProgress);
  const badgeOp = interpolate(frame, [135, 168], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        padding: '0 60px',
      }}>
        <p style={headline(56, WHITE)}>THE EMERGENCY{'\n'}FUND LIE</p>

        <div style={{ transform: `scale(${pigScale})`, transformOrigin: 'center', marginTop: 8, marginBottom: 8 }}>
          <svg width="300" height="270" viewBox="0 0 300 270">
            <ellipse cx="145" cy="155" rx="125" ry="98" fill="#F9A8D4" />
            <circle cx="250" cy="125" r="68" fill="#F9A8D4" />
            <ellipse cx="255" cy="63" rx="19" ry="25" fill="#F472B6" />
            <ellipse cx="298" cy="140" rx="25" ry="21" fill="#F472B6" />
            <circle cx="290" cy="138" r="5" fill="#BE185D" />
            <circle cx="305" cy="138" r="5" fill="#BE185D" />
            <circle cx="268" cy="103" r="8" fill={BG_DARK} />
            <circle cx="270" cy="101" r="3" fill={WHITE} />
            <rect x="112" y="60" width="50" height="11" rx="5" fill="#BE185D" />
            <path d="M 22 152 Q 2 132 12 108 Q 22 88 8 75" stroke="#F472B6" strokeWidth="7" fill="none" strokeLinecap="round" />
            <rect x="62" y="240" width="28" height="42" rx="11" fill="#F9A8D4" />
            <rect x="102" y="243" width="28" height="40" rx="11" fill="#F9A8D4" />
            <rect x="160" y="243" width="28" height="40" rx="11" fill="#F9A8D4" />
            <rect x="200" y="240" width="28" height="42" rx="11" fill="#F9A8D4" />
            <ellipse cx="108" cy="112" rx="20" ry="12" fill={WHITE} opacity="0.28" />
          </svg>
        </div>

        <p style={{
          fontFamily: FONT,
          fontSize: 96,
          color: ACCENT,
          margin: 0,
          letterSpacing: '0.04em',
          textAlign: 'center' as const,
        }}>
          ${counterValue.toLocaleString()}
        </p>
        <p style={headline(34, WHITE)}>SITTING IN YOUR SAVINGS</p>

        <div style={{ opacity: badgeOp, background: RED, borderRadius: 18, padding: '16px 40px', marginTop: 4 }}>
          <p style={{ ...headline(38, WHITE), margin: 0 }}>EARNING 0.5% A YEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const barProg = interpolate(frame, [20, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bankH = Math.max(4, Math.round(72 * barProg));
  const mktH = Math.max(4, Math.round(432 * barProg));
  const labOp = interpolate(frame, [100, 145], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: '0 80px',
      }}>
        <p style={headline(50, BG_DARK)}>WHAT $30K EARNS{'\n'}PER YEAR</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 80, marginTop: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <p style={{ ...headline(38, RED), opacity: labOp }}>$150</p>
            <div style={{ width: 156, height: bankH, background: RED, borderRadius: '12px 12px 0 0' }} />
            <p style={headline(28, BG_DARK)}>BIG BANK</p>
            <svg width="88" height="68" viewBox="0 0 88 68">
              <rect x="10" y="28" width="68" height="34" rx="4" fill={GRAY} />
              <rect x="5" y="23" width="78" height="9" rx="3" fill={GRAY} />
              <polygon points="44,4 4,23 84,23" fill={GRAY} />
              <rect x="18" y="36" width="12" height="20" fill={BG_LIGHT} />
              <rect x="38" y="36" width="12" height="20" fill={BG_LIGHT} />
              <rect x="58" y="36" width="12" height="20" fill={BG_LIGHT} />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <p style={{ ...headline(38, ACCENT), opacity: labOp }}>$2,400</p>
            <div style={{ width: 156, height: mktH, background: ACCENT, borderRadius: '12px 12px 0 0' }} />
            <p style={headline(28, BG_DARK)}>MARKET</p>
            <svg width="88" height="68" viewBox="0 0 88 68">
              <polyline points="4,58 22,38 42,48 74,14" stroke={ACCENT} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <polygon points="71,4 84,18 58,18" fill={ACCENT} />
            </svg>
          </div>
        </div>

        <p style={{ ...headline(28, GRAY), marginTop: 20 }}>BOTH STARTING WITH $30,000</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const barProg = interpolate(frame, [20, 170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bankH = Math.max(4, Math.round(72 * barProg));
  const mktH = Math.max(4, Math.round(432 * barProg));
  const gapOp = interpolate(frame, [140, 175], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_MID} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: '0 80px',
      }}>
        <p style={headline(52, WHITE)}>AFTER 20 YEARS</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 80, marginTop: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <p style={headline(32, WHITE)}>$33,148</p>
            <div style={{ width: 156, height: bankH, background: GRAY, borderRadius: '12px 12px 0 0' }} />
            <p style={headline(26, GRAY)}>SAVINGS</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <p style={headline(32, ACCENT)}>$139,828</p>
            <div style={{ width: 156, height: mktH, background: ACCENT, borderRadius: '12px 12px 0 0' }} />
            <p style={headline(26, ACCENT)}>MARKET</p>
          </div>
        </div>

        <div style={{ opacity: gapOp, background: RED, borderRadius: 18, padding: '18px 44px', marginTop: 16 }}>
          <p style={{ ...headline(46, WHITE), margin: 0 }}>$106,618 GAP</p>
          <p style={{ ...headline(26, WHITE), margin: '8px 0 0' }}>FROM PLAYING IT SAFE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lockScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const stat1Op = interpolate(frame, [60, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Op = interpolate(frame, [100, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat3Op = interpolate(frame, [140, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        padding: '0 60px',
      }}>
        <p style={headline(52, BG_DARK)}>BUT DO YOU{'\n'}EVEN NEED IT?</p>

        <div style={{ transform: `scale(${lockScale})`, transformOrigin: 'center' }}>
          <svg width="260" height="240" viewBox="0 0 260 240">
            <ellipse cx="125" cy="148" rx="112" ry="88" fill="#F9A8D4" opacity="0.5" />
            <circle cx="222" cy="118" r="60" fill="#F9A8D4" opacity="0.5" />
            <ellipse cx="227" cy="60" rx="17" ry="22" fill="#F472B6" opacity="0.5" />
            <ellipse cx="265" cy="132" rx="22" ry="18" fill="#F472B6" opacity="0.5" />
            <circle cx="238" cy="96" r="7" fill={GRAY} />
            <rect x="100" y="58" width="44" height="10" rx="5" fill={GRAY} />
            <rect x="56" y="220" width="25" height="36" rx="10" fill="#F9A8D4" opacity="0.5" />
            <rect x="92" y="223" width="25" height="34" rx="10" fill="#F9A8D4" opacity="0.5" />
            <rect x="143" y="223" width="25" height="34" rx="10" fill="#F9A8D4" opacity="0.5" />
            <rect x="179" y="220" width="25" height="36" rx="10" fill="#F9A8D4" opacity="0.5" />
            <rect x="100" y="110" width="56" height="48" rx="8" fill={RED} />
            <path d="M 112 110 L 112 96 Q 128 80 144 96 L 144 110" stroke={RED} strokeWidth="9" fill="none" strokeLinecap="round" />
            <circle cx="128" cy="130" r="7" fill={BG_LIGHT} />
            <rect x="125" y="134" width="6" height="13" rx="2" fill={BG_LIGHT} />
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }}>
          <div style={{ opacity: stat1Op, background: WHITE, borderRadius: 16, padding: '18px 28px', boxShadow: '0 2px 14px rgba(0,0,0,0.07)' }}>
            <p style={{ ...headline(32, BG_DARK), margin: 0 }}>1 IN 4 NEVER TOUCH THEIRS</p>
          </div>
          <div style={{ opacity: stat2Op, background: WHITE, borderRadius: 16, padding: '18px 28px', boxShadow: '0 2px 14px rgba(0,0,0,0.07)' }}>
            <p style={{ ...headline(32, ACCENT), margin: 0 }}>AVG EMERGENCY: $1,400</p>
          </div>
          <div style={{ opacity: stat3Op, background: WHITE, borderRadius: 16, padding: '18px 28px', boxShadow: '0 2px 14px rgba(0,0,0,0.07)' }}>
            <p style={{ ...headline(32, RED), margin: 0 }}>YOUR FUND: $30,000</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const tier1W = interpolate(frame, [20, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tier2W = interpolate(frame, [70, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tier3W = interpolate(frame, [120, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const tiers: Array<{ label: string; sub: string; color: string; maxW: number; prog: number }> = [
    { label: '1 MONTH', sub: 'HYSA — 4-5%', color: ACCENT, maxW: 460, prog: tier1W },
    { label: '2-3 MONTHS', sub: 'T-BILLS — 5%+', color: '#3B82F6', maxW: 660, prog: tier2W },
    { label: '3+ MONTHS', sub: 'INDEX FUND — 8% AVG', color: '#8B5CF6', maxW: 860, prog: tier3W },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
        padding: '0 60px',
      }}>
        <p style={headline(52, WHITE)}>THE SMARTER{'\n'}SYSTEM</p>
        <p style={headline(28, GRAY)}>TIERED EMERGENCY FUND</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28, width: '100%', alignItems: 'center' }}>
          {tiers.map((t) => (
            <div
              key={t.label}
              style={{
                width: Math.max(60, Math.round(t.maxW * t.prog)),
                background: t.color,
                borderRadius: 14,
                padding: '18px 24px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <p style={{ ...headline(32, WHITE), margin: 0, whiteSpace: 'nowrap' as const }}>{t.label}</p>
              <p style={{
                fontFamily: FONT,
                fontSize: 22,
                color: WHITE,
                margin: '6px 0 0',
                opacity: 0.88,
                textAlign: 'center' as const,
                whiteSpace: 'nowrap' as const,
              }}>{t.sub}</p>
            </div>
          ))}
        </div>

        <p style={{ ...headline(28, GRAY), marginTop: 18 }}>STAY SAFE. EARN MORE.</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const coinProg = interpolate(frame, [30, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaOp = interpolate(frame, [140, 175], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const numCoins = Math.max(0, Math.floor(8 * coinProg));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: '0 60px',
      }}>
        <p style={headline(54, BG_DARK)}>MAKE YOUR{'\n'}MONEY WORK</p>

        <div style={{ transform: `scale(${personScale})`, transformOrigin: 'center' }}>
          <svg width="340" height="360" viewBox="0 0 340 360">
            <circle cx="170" cy="72" r="46" fill={GRAY} />
            <rect x="132" y="126" width="76" height="104" rx="16" fill={GRAY} />
            <rect x="62" y="136" width="72" height="20" rx="10" fill={GRAY} transform="rotate(18,98,146)" />
            <rect x="208" y="136" width="72" height="20" rx="10" fill={GRAY} transform="rotate(-18,244,146)" />
            <rect x="132" y="226" width="28" height="84" rx="12" fill={GRAY} />
            <rect x="180" y="226" width="28" height="84" rx="12" fill={GRAY} />
            {Array.from({ length: numCoins }).map((_, i) => (
              <ellipse
                key={i}
                cx="80"
                cy={330 - i * 22}
                rx="42"
                ry="13"
                fill={ACCENT}
                stroke="#059669"
                strokeWidth="2"
              />
            ))}
            <line x1="258" y1="300" x2="258" y2="170" stroke={ACCENT} strokeWidth="5" strokeDasharray="10 6" strokeLinecap="round" />
            <polygon points="258,155 246,175 270,175" fill={ACCENT} />
          </svg>
        </div>

        <div style={{ opacity: ctaOp, background: ACCENT, borderRadius: 20, padding: '20px 44px' }}>
          <p style={{ ...headline(38, WHITE), margin: 0 }}>OPTIMIZE YOUR{'\n'}EMERGENCY FUND</p>
        </div>

        <p style={headline(28, GRAY)}>MOVE THE EXCESS. START EARNING.</p>
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
