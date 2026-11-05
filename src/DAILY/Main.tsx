import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GRAY = '#888888';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.15em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  padding: 0,
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

  const personScale = spring({ frame, fps, config: { damping: 14 } });
  const letterY = interpolate(frame, [5, 35], [-280, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const chainOpacity = interpolate(frame, [45, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const anchorScale = spring({ frame: frame - 55, fps, config: { damping: 10 } });
  const textOpacity = interpolate(frame, [75, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [75, 105], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 60 }}>
        <div style={{ transform: `scale(${personScale})` }}>
          <svg width="110" height="160" viewBox="0 0 110 160">
            <circle cx="55" cy="30" r="30" fill={WHITE} />
            <rect x="18" y="62" width="74" height="62" rx="14" fill={WHITE} />
            <rect x="20" y="118" width="24" height="34" rx="8" fill={WHITE} />
            <rect x="66" y="118" width="24" height="34" rx="8" fill={WHITE} />
          </svg>
        </div>
        <div style={{ transform: `translateY(${letterY}px)`, marginTop: 20 }}>
          <svg width="200" height="130" viewBox="0 0 200 130">
            <rect x="4" y="4" width="192" height="122" rx="12" fill={ACCENT} />
            <rect x="22" y="28" width="156" height="10" rx="5" fill="rgba(0,0,0,0.25)" />
            <rect x="22" y="50" width="110" height="10" rx="5" fill="rgba(0,0,0,0.25)" />
            <rect x="22" y="72" width="130" height="10" rx="5" fill="rgba(0,0,0,0.25)" />
            <text x="100" y="108" textAnchor="middle" fontFamily={FONT} fontSize="13" fill={BLACK} fontWeight="bold" letterSpacing="2">OFFER LETTER</text>
          </svg>
        </div>
        <div style={{ opacity: chainOpacity, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, marginTop: 2 }}>
          {Array.from({ length: Math.max(0, Math.floor(5)) }).map((_, i) => (
            <div key={i} style={{ width: 12, height: 16, border: `4px solid ${GRAY}`, borderRadius: 8 }} />
          ))}
        </div>
        <div style={{ transform: `scale(${Math.max(0, anchorScale)})`, marginTop: 4 }}>
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="16" r="12" fill="none" stroke={GRAY} strokeWidth="5" />
            <line x1="45" y1="28" x2="45" y2="78" stroke={GRAY} strokeWidth="5" strokeLinecap="round" />
            <line x1="20" y1="52" x2="70" y2="52" stroke={GRAY} strokeWidth="5" strokeLinecap="round" />
            <path d="M20,52 Q6,68 20,76" stroke={GRAY} strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M70,52 Q84,68 70,76" stroke={GRAY} strokeWidth="5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ opacity: textOpacity, transform: `translateY(${textY}px)`, marginTop: 32, paddingLeft: 80, paddingRight: 80 }}>
          <p style={headline(34, ACCENT)}>THE SALARY ANCHOR</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, textAlign: 'center' as const, marginTop: 16, letterSpacing: '0.04em', fontWeight: 'normal', lineHeight: 1.4 }}>
            Your first &ldquo;yes&rdquo; will follow every paycheck you ever earn.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barProgress = spring({ frame: frame - 15, fps, config: { damping: 18 } });
  const gapOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const groups = [
    { label: 'YR 1', market: 65, under: 60 },
    { label: 'YR 10', market: 90, under: 83 },
    { label: 'YR 20', market: 125, under: 112 },
  ];
  const maxVal = 130;
  const maxH = 300;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 120, paddingLeft: 60, paddingRight: 60 }}>
        <div style={{ opacity: titleOpacity }}>
          <p style={headline(32, BLACK)}>RAISES ARE % BASED.</p>
          <p style={{ ...headline(32, BLACK), marginTop: 8 }}>LOW BASE = LOW FOREVER.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 60, marginTop: 60, height: maxH + 60 }}>
          {groups.map((g, gi) => {
            const mH = Math.max(0, Math.round((g.market / maxVal) * maxH * barProgress));
            const uH = Math.max(0, Math.round((g.under / maxVal) * maxH * barProgress));
            return (
              <div key={gi} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 10 }}>
                  <div style={{ width: 70, height: mH, background: ACCENT, borderRadius: '8px 8px 0 0' }} />
                  <div style={{ width: 70, height: uH, background: GRAY, borderRadius: '8px 8px 0 0' }} />
                </div>
                <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: 0, letterSpacing: '0.08em' }}>{g.label}</p>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 40, marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 24, height: 24, background: ACCENT, borderRadius: 4 }} />
            <span style={{ fontFamily: FONT, fontSize: 16, color: BLACK, letterSpacing: '0.05em' }}>MARKET RATE</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 24, height: 24, background: GRAY, borderRadius: 4 }} />
            <span style={{ fontFamily: FONT, fontSize: 16, color: BLACK, letterSpacing: '0.05em' }}>UNDERPAID</span>
          </div>
        </div>
        <div style={{ opacity: gapOpacity, marginTop: 48, paddingLeft: 60, paddingRight: 60 }}>
          <p style={headline(28, '#EF4444')}>THE GAP NEVER CLOSES.</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#555', textAlign: 'center' as const, marginTop: 14, letterSpacing: '0.04em' }}>
            It compounds every single year.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterProgress = spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 60 } });
  const counterValue = Math.round(347000 * counterProgress);
  const timelineOpacity = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const timelineWidth = interpolate(frame, [65, 150], [0, 860], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: 60, paddingRight: 60 }}>
        <div style={{ opacity: titleOpacity }}>
          <p style={headline(26, WHITE)}>START $5K BELOW MARKET AT 22...</p>
        </div>
        <div style={{ marginTop: 40 }}>
          <p style={{ fontFamily: FONT, fontSize: 108, color: ACCENT, margin: 0, letterSpacing: '-0.02em', textAlign: 'center' as const, lineHeight: 1 }}>
            ${counterValue.toLocaleString()}
          </p>
          <p style={{ ...headline(22, WHITE), marginTop: 14, letterSpacing: '0.08em' }}>LOST BY RETIREMENT</p>
        </div>
        <div style={{ opacity: timelineOpacity, marginTop: 64, width: 920, position: 'relative' as const, height: 80 }}>
          <div style={{ position: 'absolute' as const, top: 24, left: 20, width: 880, height: 8, background: '#333', borderRadius: 4 }} />
          <div style={{ position: 'absolute' as const, top: 24, left: 20, width: Math.max(0, timelineWidth), height: 8, background: ACCENT, borderRadius: 4 }} />
          {[22, 30, 40, 50, 60].map((age, i) => {
            const leftPx = 20 + (i / 4) * 880;
            return (
              <div key={age} style={{ position: 'absolute' as const, left: leftPx - 20, top: 0, width: 40, textAlign: 'center' as const }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: ACCENT, margin: '0 auto', marginTop: 20 }} />
                <p style={{ fontFamily: FONT, fontSize: 15, color: WHITE, margin: '6px 0 0', letterSpacing: '0.05em' }}>{age}</p>
              </div>
            );
          })}
        </div>
        <div style={{ opacity: subOpacity, marginTop: 72, paddingLeft: 60, paddingRight: 60 }}>
          <p style={{ fontFamily: FONT, fontSize: 20, color: WHITE, textAlign: 'center' as const, letterSpacing: '0.04em', lineHeight: 1.5 }}>
            One underpaid first offer. Thirty years of compounding cost.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const deskScale = spring({ frame, fps, config: { damping: 16 } });
  const textOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const anchorIn = spring({ frame: frame - 50, fps, config: { damping: 12 } });
  const pctOpacity = interpolate(frame, [65, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: 60, paddingRight: 60 }}>
        <div style={{ opacity: textOpacity, marginBottom: 36 }}>
          <p style={headline(29, BLACK)}>72% OF EMPLOYERS BASE YOUR</p>
          <p style={{ ...headline(29, BLACK), marginTop: 8 }}>NEW OFFER ON CURRENT PAY.</p>
        </div>
        <div style={{ transform: `scale(${deskScale})` }}>
          <svg width="740" height="300" viewBox="0 0 740 300">
            <rect x="40" y="210" width="660" height="22" rx="6" fill="#8B6914" />
            <rect x="60" y="232" width="22" height="68" rx="5" fill="#8B6914" />
            <rect x="658" y="232" width="22" height="68" rx="5" fill="#8B6914" />
            <circle cx="150" cy="118" r="38" fill={BLACK} />
            <rect x="112" y="158" width="76" height="52" rx="10" fill="#1a1a2e" />
            <rect x="286" y="140" width="168" height="104" rx="10" fill={ACCENT} />
            <rect x="302" y="158" width="136" height="10" rx="5" fill="rgba(0,0,0,0.25)" />
            <rect x="302" y="178" width="96" height="10" rx="5" fill="rgba(0,0,0,0.25)" />
            <text x="370" y="232" textAnchor="middle" fontFamily={FONT} fontSize="12" fill={BLACK} fontWeight="bold" letterSpacing="1">OFFER: $60K</text>
            <path d="M452,192 L498,192" stroke={BLACK} strokeWidth="4" strokeLinecap="round" />
            <path d="M490,182 L502,192 L490,202" stroke={BLACK} strokeWidth="4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx="590" cy="118" r="38" fill="#cccccc" />
            <rect x="552" y="158" width="76" height="52" rx="10" fill="#e0e0e0" />
          </svg>
        </div>
        <div style={{ transform: `scale(${Math.max(0, anchorIn)})`, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {Array.from({ length: Math.max(0, Math.floor(3)) }).map((_, i) => (
              <div key={i} style={{ width: 8, height: 12, border: `3px solid ${GRAY}`, borderRadius: 6 }} />
            ))}
          </div>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="10" r="8" fill="none" stroke={GRAY} strokeWidth="4" />
            <line x1="30" y1="18" x2="30" y2="52" stroke={GRAY} strokeWidth="4" strokeLinecap="round" />
            <line x1="12" y1="36" x2="48" y2="36" stroke={GRAY} strokeWidth="4" strokeLinecap="round" />
            <path d="M12,36 Q4,46 12,52" stroke={GRAY} strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M48,36 Q56,46 48,52" stroke={GRAY} strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ opacity: pctOpacity, marginTop: 24 }}>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#555', textAlign: 'center' as const, letterSpacing: '0.04em', lineHeight: 1.5 }}>
            Underpaid now? Your next offer will be underpaid too.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buildProgress = spring({ frame: frame - 5, fps, config: { damping: 18 } });
  const personX = interpolate(frame, [30, 160], [100, 740], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personY = interpolate(
    frame,
    [30, 65, 70, 110, 115, 155],
    [380, 290, 240, 160, 110, 110],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const pctOpacity = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const buildings = [
    { cx: 160, h: 160, salary: '$60K' },
    { cx: 420, h: 260, salary: '$78K' },
    { cx: 680, h: 360, salary: '$95K' },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 100, paddingLeft: 40, paddingRight: 40 }}>
        <p style={headline(30, WHITE)}>JOB-HOPPERS EARN 50% MORE</p>
        <div style={{ marginTop: 32 }}>
          <svg width="860" height="520" viewBox="0 0 860 520">
            <line x1="20" y1="490" x2="840" y2="490" stroke={GRAY} strokeWidth="3" />
            {buildings.map((b, i) => {
              const h = Math.max(0, Math.round(b.h * buildProgress));
              const y = 490 - h;
              const wins = Array.from({ length: Math.max(0, Math.floor(h / 50)) });
              return (
                <g key={i}>
                  <rect x={b.cx - 65} y={y} width="130" height={h} rx="6" fill={i === 2 ? ACCENT : '#2a2a2a'} />
                  {wins.map((_, wi) => (
                    <rect key={wi} x={b.cx - 48} y={y + 18 + wi * 46} width="96" height="24" rx="4"
                      fill={i === 2 ? 'rgba(0,0,0,0.3)' : ACCENT} />
                  ))}
                  <text x={b.cx} y={y - 14} textAnchor="middle" fontFamily={FONT} fontSize="15" fill={ACCENT} fontWeight="bold" letterSpacing="1">{b.salary}</text>
                </g>
              );
            })}
            <g transform={`translate(${personX},${personY})`}>
              <circle cx="0" cy="-36" r="18" fill={WHITE} />
              <rect x="-14" y="-16" width="28" height="34" rx="6" fill={WHITE} />
              <rect x="-14" y="14" width="12" height="18" rx="4" fill={WHITE} />
              <rect x="2" y="14" width="12" height="18" rx="4" fill={WHITE} />
            </g>
            <path d="M820,460 L820,60" stroke={ACCENT} strokeWidth="3" strokeDasharray="10,7" opacity="0.5" />
            <path d="M806,76 L820,56 L834,76" stroke={ACCENT} strokeWidth="3" fill="none" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ opacity: pctOpacity, marginTop: 16 }}>
          <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, textAlign: 'center' as const, letterSpacing: '0.05em', lineHeight: 1.5 }}>
            Each switch resets your anchor to market rate.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shakeScale = spring({ frame, fps, config: { damping: 12 } });
  const bag1Scale = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  const bag2Scale = spring({ frame: frame - 35, fps, config: { damping: 14 } });
  const textOpacity = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: frame - 90, fps, config: { damping: 10 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: 60, paddingRight: 60 }}>
        <div style={{ transform: `scale(${shakeScale})` }}>
          <svg width="320" height="180" viewBox="0 0 320 180">
            <rect x="8" y="84" width="110" height="36" rx="18" fill="#8B6914" />
            <circle cx="128" cy="102" r="28" fill="#8B6914" />
            <rect x="108" y="64" width="20" height="40" rx="10" fill="#8B6914" />
            <rect x="130" y="60" width="20" height="40" rx="10" fill="#8B6914" />
            <rect x="202" y="84" width="110" height="36" rx="18" fill={BLACK} />
            <circle cx="192" cy="102" r="28" fill={BLACK} />
            <rect x="170" y="64" width="20" height="40" rx="10" fill={BLACK} />
            <rect x="192" y="60" width="20" height="40" rx="10" fill={BLACK} />
            <circle cx="160" cy="102" r="10" fill={ACCENT} />
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 60, marginTop: 32, alignItems: 'flex-end' }}>
          <div style={{ transform: `scale(${Math.max(0, bag1Scale)})`, textAlign: 'center' as const }}>
            <svg width="90" height="110" viewBox="0 0 90 110">
              <ellipse cx="45" cy="78" rx="38" ry="30" fill={GRAY} />
              <rect x="30" y="22" width="30" height="30" rx="8" fill={GRAY} />
              <text x="45" y="84" textAnchor="middle" fontFamily={FONT} fontSize="13" fill={WHITE} fontWeight="bold">$</text>
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 15, color: '#888', margin: 0 }}>BEFORE</p>
          </div>
          <div style={{ transform: `scale(${Math.max(0, bag2Scale)})`, textAlign: 'center' as const }}>
            <svg width="130" height="155" viewBox="0 0 130 155">
              <ellipse cx="65" cy="110" rx="56" ry="44" fill={ACCENT} />
              <rect x="43" y="26" width="44" height="44" rx="12" fill={ACCENT} />
              <text x="65" y="118" textAnchor="middle" fontFamily={FONT} fontSize="17" fill={BLACK} fontWeight="bold">$$</text>
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 15, color: BLACK, margin: 0, fontWeight: 'bold' }}>AFTER</p>
          </div>
        </div>
        <div style={{ opacity: textOpacity, marginTop: 44, paddingLeft: 20, paddingRight: 20 }}>
          <p style={headline(26, BLACK)}>ONLY 37% NEGOTIATE FIRST.</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#333', textAlign: 'center' as const, marginTop: 16, letterSpacing: '0.03em', lineHeight: 1.5 }}>
            Ask once and recover $5K–$10K. That gap takes 30 years to close otherwise.
          </p>
        </div>
        <div style={{ transform: `scale(${Math.max(0, ctaScale)})`, marginTop: 44, background: ACCENT, borderRadius: 16, paddingTop: 20, paddingBottom: 20, paddingLeft: 48, paddingRight: 48 }}>
          <p style={headline(28, BLACK)}>ASK ONCE = $347K</p>
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
