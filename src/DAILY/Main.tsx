import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
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

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buildingScale = spring({ frame, fps, config: { damping: 14 } });
  const textOpacity = interpolate(frame, [20, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statsOpacity = interpolate(frame, [65, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={{ ...headline(44, WHITE), opacity: textOpacity, marginBottom: 40 }}>THE BANK SECRET</p>

        <svg width={320} height={240} viewBox="0 0 320 240" style={{ transform: `scale(${buildingScale})`, transformOrigin: 'center' }}>
          <polygon points="160,10 20,70 300,70" fill={ACCENT} />
          <rect x="28" y="70" width="264" height="150" fill="#1E293B" />
          <rect x="52" y="70" width="16" height="150" fill="#334155" />
          <rect x="96" y="70" width="16" height="150" fill="#334155" />
          <rect x="144" y="70" width="16" height="150" fill="#334155" />
          <rect x="192" y="70" width="16" height="150" fill="#334155" />
          <rect x="236" y="70" width="16" height="150" fill="#334155" />
          <rect x="128" y="170" width="64" height="50" fill={BG_DARK} rx="4" />
          <rect x="48" y="95" width="36" height="28" fill="#3B82F6" rx="2" />
          <rect x="142" y="95" width="36" height="28" fill="#3B82F6" rx="2" />
          <rect x="236" y="95" width="36" height="28" fill="#3B82F6" rx="2" />
          <rect x="10" y="220" width="300" height="8" fill={ACCENT} rx="4" />
        </svg>

        <div style={{ display: 'flex', gap: 48, marginTop: 44, opacity: statsOpacity, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ ...headline(24, '#94A3B8'), margin: 0 }}>YOU EARN</p>
            <p style={{ ...headline(68, WHITE), margin: '8px 0' }}>0.03%</p>
            <p style={{ ...headline(26, '#94A3B8'), margin: 0 }}>$12 / YEAR</p>
          </div>
          <p style={{ ...headline(48, ACCENT), margin: 0 }}>VS</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ ...headline(24, ACCENT), margin: 0 }}>BANK EARNS</p>
            <p style={{ ...headline(68, ACCENT), margin: '8px 0' }}>7%+</p>
            <p style={{ ...headline(26, ACCENT), margin: 0 }}>$3,400 / YR</p>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const piggyScale = spring({ frame, fps, config: { damping: 12 } });
  const counterProgress = interpolate(frame, [25, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const earningsOpacity = interpolate(frame, [110, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const balance = Math.round(41600 * counterProgress);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={{ ...headline(38, BLACK), marginBottom: 40 }}>YOUR SAVINGS BALANCE</p>

        <svg width={340} height={200} viewBox="0 0 340 200" style={{ transform: `scale(${piggyScale})`, transformOrigin: 'center' }}>
          {/* Person silhouette */}
          <circle cx="70" cy="42" r="30" fill="#475569" />
          <rect x="44" y="82" width="52" height="72" fill="#475569" rx="8" />
          <rect x="18" y="84" width="26" height="10" fill="#475569" rx="5" />
          <rect x="96" y="84" width="26" height="10" fill="#475569" rx="5" />
          <rect x="46" y="150" width="20" height="42" fill="#475569" rx="5" />
          <rect x="74" y="150" width="20" height="42" fill="#475569" rx="5" />
          {/* Piggy bank */}
          <ellipse cx="230" cy="118" rx="68" ry="56" fill="#F9A8D4" />
          <ellipse cx="186" cy="72" rx="16" ry="13" fill="#F9A8D4" />
          <ellipse cx="274" cy="72" rx="16" ry="13" fill="#F9A8D4" />
          <ellipse cx="290" cy="122" rx="22" ry="17" fill="#FBCFE8" />
          <circle cx="283" cy="117" r="5" fill="#BE185D" />
          <circle cx="297" cy="117" r="5" fill="#BE185D" />
          <circle cx="250" cy="96" r="8" fill={BLACK} />
          <circle cx="253" cy="93" r="3" fill={WHITE} />
          <rect x="215" y="60" width="30" height="7" fill="#BE185D" rx="3" />
          <rect x="186" y="166" width="18" height="28" fill="#F9A8D4" rx="4" />
          <rect x="212" y="166" width="18" height="28" fill="#F9A8D4" rx="4" />
          <rect x="240" y="166" width="18" height="28" fill="#F9A8D4" rx="4" />
          <rect x="266" y="166" width="18" height="28" fill="#F9A8D4" rx="4" />
        </svg>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ ...headline(30, '#475569'), margin: 0 }}>AVERAGE AMERICAN BALANCE</p>
          <p style={{ fontFamily: FONT, fontSize: 96, color: '#1E293B', margin: '8px 0 0', fontWeight: 900, letterSpacing: '-0.02em' }}>
            ${balance.toLocaleString()}
          </p>
        </div>

        <div style={{ marginTop: 32, opacity: earningsOpacity, background: '#FEE2E2', padding: '20px 56px', borderRadius: 20, textAlign: 'center' }}>
          <p style={{ ...headline(26, '#475569'), margin: 0 }}>EARNING YOU AT 0.03%</p>
          <p style={{ ...headline(80, ACCENT), margin: '8px 0' }}>$12.48</p>
          <p style={{ ...headline(26, '#475569'), margin: 0 }}>PER YEAR</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const smallScale = spring({ frame, fps, config: { damping: 14 } });
  const bigScale = spring({ frame: Math.max(0, frame - 28), fps, config: { damping: 11 } });
  const labelOpacity = interpolate(frame, [55, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={{ ...headline(38, WHITE), marginBottom: 56 }}>WHERE YOUR MONEY GOES</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 72, opacity: labelOpacity }}>
          {/* Small bag — YOU */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width={90} height={110} viewBox="0 0 90 110" style={{ transform: `scale(${smallScale})`, transformOrigin: 'bottom center' }}>
              <ellipse cx="45" cy="22" rx="13" ry="11" fill="#64748B" />
              <rect x="37" y="12" width="16" height="18" fill="#64748B" />
              <ellipse cx="45" cy="72" rx="38" ry="34" fill="#475569" />
              <text x="45" y="82" textAnchor="middle" fill={WHITE} fontSize="30" fontFamily={FONT} fontWeight="900">$</text>
            </svg>
            <p style={{ ...headline(24, '#94A3B8'), margin: '12px 0 4px' }}>YOUR SHARE</p>
            <p style={{ ...headline(44, WHITE), margin: 0 }}>$12</p>
            <p style={{ ...headline(20, '#64748B'), margin: '4px 0 0' }}>PER YEAR</p>
          </div>

          {/* Large bag — BANK */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width={210} height={250} viewBox="0 0 210 250" style={{ transform: `scale(${bigScale})`, transformOrigin: 'bottom center' }}>
              <ellipse cx="105" cy="42" rx="30" ry="24" fill="#B91C1C" />
              <rect x="88" y="22" width="34" height="30" fill="#B91C1C" />
              <ellipse cx="105" cy="162" rx="85" ry="78" fill="#B91C1C" />
              <ellipse cx="105" cy="162" rx="72" ry="66" fill="#DC2626" />
              <text x="105" y="183" textAnchor="middle" fill={WHITE} fontSize="82" fontFamily={FONT} fontWeight="900">$</text>
            </svg>
            <p style={{ ...headline(24, ACCENT), margin: '12px 0 4px' }}>BANK'S SHARE</p>
            <p style={{ ...headline(44, ACCENT), margin: 0 }}>$1,373</p>
            <p style={{ ...headline(20, '#94A3B8'), margin: '4px 0 0' }}>PER YEAR</p>
          </div>
        </div>

        <p style={{ ...headline(26, '#94A3B8'), marginTop: 48, opacity: labelOpacity }}>FROM THE SAME $41,600 DEPOSIT</p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const barProgress = interpolate(frame, [18, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const calloutOpacity = interpolate(frame, [100, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const maxBarH = 300;
  const youBarH = Math.max(4, Math.round((12 / 1373) * maxBarH * barProgress));
  const bankBarH = Math.max(4, Math.round(maxBarH * barProgress));
  const youAmt = Math.round(12 * barProgress);
  const bankAmt = Math.round(1373 * barProgress);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={{ ...headline(36, BLACK), marginBottom: 48 }}>NET INTEREST MARGIN</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 72, height: 360 }}>
          {/* YOU bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <p style={{ ...headline(32, '#475569'), margin: '0 0 10px' }}>${youAmt}</p>
            <div style={{ width: 110, height: youBarH, background: '#94A3B8', borderRadius: '8px 8px 0 0' }} />
            <p style={{ ...headline(26, '#64748B'), margin: '14px 0 4px' }}>YOU</p>
            <p style={{ ...headline(22, '#94A3B8'), margin: 0 }}>0.03%</p>
          </div>

          {/* BANK bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <p style={{ ...headline(32, ACCENT), margin: '0 0 10px' }}>${bankAmt.toLocaleString()}</p>
            <div style={{ width: 110, height: bankBarH, background: ACCENT, borderRadius: '8px 8px 0 0' }} />
            <p style={{ ...headline(26, ACCENT), margin: '14px 0 4px' }}>BANK</p>
            <p style={{ ...headline(22, ACCENT), margin: 0 }}>3.3%</p>
          </div>
        </div>

        <div style={{ marginTop: 40, opacity: calloutOpacity, background: '#FEE2E2', padding: '20px 48px', borderRadius: 18, textAlign: 'center' }}>
          <p style={{ ...headline(26, BLACK), margin: 0 }}>NET INTEREST MARGIN</p>
          <p style={{ ...headline(22, '#64748B'), margin: '8px 0 0' }}>ON YOUR SAME $41,600 DEPOSIT</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const barProgress = interpolate(frame, [18, 115], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigNumOpacity = interpolate(frame, [110, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const maxBarH = 290;
  const bigBankH = Math.max(4, Math.round((12 / 1872) * maxBarH * barProgress));
  const hysaH = Math.max(4, Math.round(maxBarH * barProgress));
  const bigBankAmt = Math.round(12 * barProgress);
  const hysaAmt = Math.round(1872 * barProgress);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={{ ...headline(36, WHITE), marginBottom: 12 }}>THE FIX: HIGH-YIELD SAVINGS</p>
        <p style={{ ...headline(24, '#94A3B8'), marginBottom: 44 }}>SAME FDIC PROTECTION · SAME ACCESS</p>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 72, height: 340 }}>
          {/* Big bank bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <p style={{ ...headline(28, '#94A3B8'), margin: '0 0 10px' }}>${bigBankAmt}/yr</p>
            <div style={{ width: 110, height: bigBankH, background: '#334155', borderRadius: '8px 8px 0 0' }} />
            <p style={{ ...headline(24, '#64748B'), margin: '14px 0 4px' }}>BIG BANK</p>
            <p style={{ ...headline(26, '#94A3B8'), margin: 0 }}>0.03%</p>
          </div>

          {/* HYSA bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <p style={{ ...headline(28, '#10B981'), margin: '0 0 10px' }}>${hysaAmt.toLocaleString()}/yr</p>
            <div style={{ width: 110, height: hysaH, background: '#10B981', borderRadius: '8px 8px 0 0' }} />
            <p style={{ ...headline(24, '#10B981'), margin: '14px 0 4px' }}>HYSA</p>
            <p style={{ ...headline(26, '#10B981'), margin: 0 }}>4.5%</p>
          </div>
        </div>

        <div style={{ marginTop: 44, opacity: bigNumOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(28, WHITE), margin: 0 }}>10-YEAR DIFFERENCE:</p>
          <p style={{ ...headline(84, '#10B981'), margin: '8px 0 0' }}>$22,000</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const svgScale = spring({ frame, fps, config: { damping: 12 } });
  const textOpacity = interpolate(frame, [30, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOpacity = interpolate(frame, [75, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <p style={{ ...headline(44, WHITE), opacity: textOpacity, marginBottom: 44 }}>TAKE YOUR MONEY BACK</p>

        {/* Bank → Arrow → Piggy bank */}
        <svg width={520} height={210} viewBox="0 0 520 210" style={{ transform: `scale(${svgScale})`, transformOrigin: 'center' }}>
          {/* Faded bank */}
          <g opacity="0.35">
            <polygon points="80,15 15,65 145,65" fill="#64748B" />
            <rect x="22" y="65" width="116" height="120" fill="#334155" />
            <rect x="36" y="65" width="12" height="120" fill="#475569" />
            <rect x="60" y="65" width="12" height="120" fill="#475569" />
            <rect x="88" y="65" width="12" height="120" fill="#475569" />
            <rect x="116" y="65" width="12" height="120" fill="#475569" />
            <rect x="52" y="150" width="36" height="35" fill="#121212" rx="2" />
          </g>
          {/* Arrow */}
          <line x1="162" y1="105" x2="308" y2="105" stroke={ACCENT} strokeWidth="10" strokeLinecap="round" />
          <polygon points="313,88 348,105 313,122" fill={ACCENT} />
          {/* Piggy bank (bright) */}
          <ellipse cx="435" cy="115" rx="66" ry="58" fill="#F9A8D4" />
          <ellipse cx="377" cy="68" rx="16" ry="13" fill="#F9A8D4" />
          <ellipse cx="493" cy="68" rx="16" ry="13" fill="#F9A8D4" />
          <ellipse cx="496" cy="119" rx="22" ry="17" fill="#FBCFE8" />
          <circle cx="489" cy="114" r="5" fill="#BE185D" />
          <circle cx="503" cy="114" r="5" fill="#BE185D" />
          <circle cx="455" cy="92" r="8" fill={BLACK} />
          <circle cx="458" cy="89" r="3" fill={WHITE} />
          <rect x="420" y="55" width="30" height="7" fill="#BE185D" rx="3" />
          <rect x="398" y="165" width="18" height="30" fill="#F9A8D4" rx="4" />
          <rect x="424" y="165" width="18" height="30" fill="#F9A8D4" rx="4" />
          <rect x="452" y="165" width="18" height="30" fill="#F9A8D4" rx="4" />
          <rect x="478" y="165" width="18" height="30" fill="#F9A8D4" rx="4" />
          <text x="435" y="128" textAnchor="middle" fill={BLACK} fontSize="32" fontFamily={FONT} fontWeight="900">4.5%</text>
        </svg>

        <div style={{ marginTop: 44, opacity: ctaOpacity, textAlign: 'center' }}>
          <p style={{ ...headline(32, ACCENT), margin: 0 }}>OPEN A HIGH-YIELD SAVINGS TODAY</p>
          <p style={{ ...headline(26, WHITE), margin: '16px 0' }}>IT TAKES ABOUT 5 MINUTES</p>
          <p style={{ ...headline(22, '#94A3B8'), margin: 0 }}>ALLY · MARCUS · SoFi · DISCOVER</p>
        </div>

        <div style={{ marginTop: 32, opacity: ctaOpacity, background: '#1E293B', padding: '16px 52px', borderRadius: 16 }}>
          <p style={{ ...headline(28, ACCENT), margin: 0 }}>FOLLOW FOR MORE MONEY SECRETS</p>
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
