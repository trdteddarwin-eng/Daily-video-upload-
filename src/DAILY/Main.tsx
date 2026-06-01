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

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const cardY = interpolate(frame, [20, 55], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardOp = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const timerOp = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const timerVal = Math.max(0, Math.floor(14 - interpolate(frame, [90, dur - 20], [0, 14], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 60px' }}>
        <p style={{ ...headline(64, ACCENT), transform: `scale(${titleS})` }}>FREE TRIAL</p>

        <svg width="340" height="220" viewBox="0 0 340 220">
          <rect x="30" y="8" width="280" height="172" rx="10" fill="#1a1a2e" stroke="#333" strokeWidth="3" />
          <rect x="44" y="22" width="252" height="145" rx="6" fill="#0D1117" />
          <text x="115" y="50" fill={WHITE} fontSize="12" fontFamily="Arial" fontWeight="bold">Start Your Free Trial</text>
          <rect x="58" y="58" width="224" height="18" rx="4" fill="#1e293b" />
          <text x="64" y="71" fill="#64748b" fontSize="9" fontFamily="Arial">Email address</text>
          <rect x="58" y="82" width="224" height="18" rx="4" fill="#1e293b" stroke={ACCENT} strokeWidth="1.5" />
          <text x="64" y="95" fill="#94a3b8" fontSize="9" fontFamily="Arial">Credit card required *</text>
          <text x="64" y="118" fill="#475569" fontSize="8" fontFamily="Arial">* You will be charged after trial ends</text>
          <rect x="100" y="128" width="140" height="26" rx="6" fill={ACCENT} />
          <text x="170" y="146" textAnchor="middle" fill={WHITE} fontSize="11" fontFamily="Arial" fontWeight="bold">START FREE</text>
          <rect x="10" y="178" width="320" height="18" rx="6" fill="#2a2a2a" />
          <rect x="115" y="178" width="110" height="8" rx="4" fill="#1a1a1a" />
        </svg>

        <div style={{ position: 'absolute', top: '47%', right: '5%', opacity: cardOp, transform: `translateY(${cardY}px)` }}>
          <svg width="148" height="94" viewBox="0 0 148 94">
            <rect x="0" y="0" width="148" height="94" rx="11" fill={ACCENT} />
            <rect x="0" y="24" width="148" height="17" fill="rgba(0,0,0,0.25)" />
            <rect x="12" y="50" width="38" height="26" rx="5" fill="#D4AF37" />
            <rect x="16" y="54" width="14" height="22" rx="2" fill="#B8960C" opacity="0.5" />
            <text x="58" y="67" fill={WHITE} fontSize="10" fontFamily="Arial" letterSpacing="2">**** 4892</text>
            <text x="14" y="88" fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="Arial">REQUIRED FOR FREE TRIAL</text>
          </svg>
        </div>

        <div style={{ opacity: timerOp, textAlign: 'center' }}>
          <p style={{ ...headline(22, '#888') }}>TRIAL ENDS IN</p>
          <p style={{ ...headline(100, ACCENT), lineHeight: 1 }}>{timerVal}</p>
          <p style={{ ...headline(22, '#888') }}>DAYS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row1Op = interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2Op = interpolate(frame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerOp = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const week1 = [1, 2, 3, 4, 5, 6, 7];
  const week2 = [8, 9, 10, 11, 12, 13, 14];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 50px' }}>
        <p style={{ ...headline(44, BLACK), opacity: titleOp }}>THE FORGETTING WINDOW</p>

        <div style={{ opacity: row1Op }}>
          <p style={{ ...headline(16, '#9CA3AF') }}>WEEK 1 — SAFE ZONE</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            {week1.map((d) => (
              <div key={d} style={{ width: 62, height: 62, borderRadius: 10, background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 20, color: BLACK }}>
                {d}
              </div>
            ))}
          </div>
        </div>

        <div style={{ opacity: row2Op }}>
          <p style={{ ...headline(16, ACCENT) }}>WEEK 2 — DANGER ZONE</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            {week2.map((d) => (
              <div key={d} style={{ width: 62, height: 62, borderRadius: 10, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 20, color: WHITE }}>
                {d}
              </div>
            ))}
          </div>
        </div>

        <div style={{ opacity: labelOp, textAlign: 'center' }}>
          <p style={{ ...headline(34, BLACK) }}>7–14 DAYS</p>
          <p style={{ ...headline(18, '#6B7280') }}>SET ON PURPOSE — NOT COINCIDENCE</p>
        </div>

        <div style={{ opacity: bannerOp, background: ACCENT, borderRadius: 12, padding: '14px 28px' }}>
          <p style={{ ...headline(20, WHITE) }}>COMPANIES BANK ON YOU FORGETTING</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const statOp = interpolate(frame, [120, 148], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flashAlpha = interpolate(frame, [95, 112, 132, 152, 168, 185], [0, 0.35, 0.05, 0.35, 0.05, 0.35], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const rows = [
    { label: 'NETFLIX', amount: '$15.99', dotColor: '#E50914', known: true },
    { label: 'SPOTIFY', amount: '$9.99', dotColor: '#1DB954', known: true },
    { label: 'AMAZON PRIME', amount: '$14.99', dotColor: '#FF9900', known: true },
    { label: 'APP TRIAL CHARGE', amount: '$8.99', dotColor: ACCENT, known: false },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: '0 60px' }}>
        <p style={{ ...headline(48, WHITE), transform: `scale(${titleS})` }}>SILENT CHARGE</p>

        <div style={{ width: '100%', maxWidth: 500, borderRadius: 18, overflow: 'hidden', background: '#1E1E1E' }}>
          <div style={{ background: '#262626', padding: '12px 24px' }}>
            <p style={{ ...headline(13, '#9CA3AF') }}>BANK STATEMENT — THIS MONTH</p>
          </div>
          {rows.map((row, i) => {
            const rowOp = interpolate(frame, [i * 18 + 22, i * 18 + 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const rowBg = row.known ? 'transparent' : `rgba(239,68,68,${flashAlpha})`;
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', opacity: rowOp, background: rowBg, borderTop: i > 0 ? '1px solid #2a2a2a' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: row.dotColor }} />
                  <span style={{ fontFamily: FONT, fontSize: 14, color: row.known ? WHITE : ACCENT, letterSpacing: '0.05em' }}>{row.label}</span>
                </div>
                <span style={{ fontFamily: FONT, fontSize: 17, color: row.known ? '#10B981' : ACCENT, fontWeight: 'bold' }}>{row.amount}</span>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: statOp, textAlign: 'center' }}>
          <p style={{ ...headline(96, ACCENT) }}>48%</p>
          <p style={{ ...headline(22, WHITE) }}>NEVER RECOGNIZED THE CHARGE</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bannerOp = interpolate(frame, [160, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const signupSteps = ['Enter email', 'Choose plan', 'Confirm'];
  const cancelSteps = ['Account settings', 'Subscription tab', 'Manage plans', 'Cancel option', 'Confirm reason', 'Pause instead?', 'Final confirm'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, padding: '0 40px' }}>
        <p style={{ ...headline(40, BLACK), opacity: titleOp }}>CANCEL MAZE</p>

        <div style={{ display: 'flex', width: '100%', gap: 20 }}>
          <div style={{ flex: 1, background: '#ECFDF5', borderRadius: 18, padding: '22px 18px' }}>
            <p style={{ ...headline(20, '#10B981') }}>SIGN UP</p>
            <p style={{ ...headline(56, '#10B981') }}>3</p>
            <p style={{ ...headline(14, '#9CA3AF') }}>CLICKS</p>
            <div style={{ marginTop: 16 }}>
              {signupSteps.map((step, i) => {
                const stepOp = interpolate(frame, [30 + i * 14, 50 + i * 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, opacity: stepOp }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: WHITE, fontSize: 13, fontWeight: 'bold' }}>✓</span>
                    </div>
                    <span style={{ fontFamily: FONT, fontSize: 12, color: '#374151' }}>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ flex: 1, background: '#FEF2F2', borderRadius: 18, padding: '22px 18px' }}>
            <p style={{ ...headline(20, ACCENT) }}>CANCEL</p>
            <p style={{ ...headline(56, ACCENT) }}>7</p>
            <p style={{ ...headline(14, '#9CA3AF') }}>SCREENS</p>
            <div style={{ marginTop: 16 }}>
              {cancelSteps.map((step, i) => {
                const stepOp = interpolate(frame, [60 + i * 11, 78 + i * 11], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7, opacity: stepOp }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: WHITE, fontSize: 11 }}>✗</span>
                    </div>
                    <span style={{ fontFamily: FONT, fontSize: 10, color: '#6B7280' }}>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ opacity: bannerOp, background: BLACK, borderRadius: 12, padding: '12px 24px' }}>
          <p style={{ ...headline(20, ACCENT) }}>THIS IS INTENTIONAL FRICTION</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const totalOp = interpolate(frame, [95, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const totalAmount = interpolate(frame, [100, 205], [0, 1183], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cards = [
    { label: 'TRIAL #1', bg: '#8B5CF6' },
    { label: 'TRIAL #2', bg: '#3B82F6' },
    { label: 'TRIAL #3', bg: '#F59E0B' },
    { label: 'TRIAL #4', bg: ACCENT },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: '0 50px' }}>
        <p style={{ ...headline(48, WHITE), transform: `scale(${titleS})` }}>COMPOUND COST</p>

        <div style={{ display: 'flex', gap: 16 }}>
          {cards.map((card, i) => {
            const cardS = spring({ frame: frame - (20 + i * 18), fps, config: { damping: 14, stiffness: 120 }, from: 0, to: 1 });
            return (
              <div key={i} style={{ width: 158, height: 118, borderRadius: 16, background: card.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: `scale(${cardS})` }}>
                <span style={{ fontFamily: FONT, fontSize: 13, color: WHITE, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>{card.label}</span>
                <span style={{ fontFamily: FONT, fontSize: 24, color: WHITE, fontWeight: 'bold', display: 'block' }}>$29/mo</span>
                <span style={{ fontFamily: FONT, fontSize: 10, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginTop: 4 }}>FORGOTTEN</span>
              </div>
            );
          })}
        </div>

        <div style={{ opacity: totalOp, textAlign: 'center' }}>
          <p style={{ ...headline(26, '#9CA3AF') }}>TOTAL DRAINED / YEAR</p>
          <p style={{ ...headline(104, ACCENT), lineHeight: 1 }}>${Math.floor(totalAmount).toLocaleString()}</p>
          <p style={{ ...headline(24, WHITE) }}>3.4 FORGOTTEN SUBSCRIPTIONS</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 100 }, from: 0, to: 1 });
  const phoneOp = interpolate(frame, [20, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const flashAlpha = interpolate(frame, [80, 96, 116, 136, 156, 176], [0, 0.4, 0.05, 0.4, 0.05, 0.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const charges = [
    { label: 'SPOTIFY', amount: '$9.99', known: true },
    { label: 'NETFLIX', amount: '$15.99', known: true },
    { label: 'MYSTERY APP', amount: '$12.99', known: false },
    { label: 'TRIAL CHARGE', amount: '$7.99', known: false },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 60px' }}>
        <p style={{ ...headline(40, BLACK), transform: `scale(${titleS})` }}>CHECK RIGHT NOW</p>

        <div style={{ opacity: phoneOp }}>
          <svg width="260" height="370" viewBox="0 0 260 370">
            <rect x="4" y="4" width="252" height="362" rx="32" fill="#1C1C1E" stroke="#444" strokeWidth="3" />
            <rect x="16" y="26" width="228" height="310" rx="22" fill="#0F172A" />
            <rect x="100" y="13" width="60" height="16" rx="8" fill="#1C1C1E" />
            <rect x="16" y="26" width="228" height="48" rx="10" fill="#1E293B" />
            <text x="130" y="57" textAnchor="middle" fill={WHITE} fontSize="13" fontFamily="Arial" fontWeight="bold">Bank Statement</text>
            {charges.map((charge, i) => {
              const rowOp = interpolate(frame, [38 + i * 14, 58 + i * 14], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const rowFlash = charge.known ? 0 : flashAlpha;
              return (
                <g key={i} opacity={rowOp}>
                  <rect x="16" y={84 + i * 60} width="228" height="52" fill={charge.known ? 'transparent' : `rgba(239,68,68,${rowFlash})`} />
                  <circle cx="42" cy={110 + i * 60} r="12" fill={charge.known ? '#334155' : ACCENT} />
                  <text x="62" y={106 + i * 60} fill={charge.known ? WHITE : ACCENT} fontSize="10" fontFamily="Arial" fontWeight="bold">{charge.label}</text>
                  <text x="62" y={120 + i * 60} fill="#64748B" fontSize="8" fontFamily="Arial">Monthly subscription</text>
                  <text x="228" y={113 + i * 60} textAnchor="end" fill={charge.known ? '#10B981' : ACCENT} fontSize="12" fontFamily="Arial" fontWeight="bold">{charge.amount}</text>
                </g>
              );
            })}
          </svg>
        </div>

        <div style={{ opacity: ctaOp, textAlign: 'center' }}>
          <div style={{ background: ACCENT, borderRadius: 14, padding: '14px 32px', marginBottom: 12 }}>
            <p style={{ ...headline(28, WHITE) }}>FOUND ONE? CANCEL IT NOW</p>
          </div>
          <p style={{ ...headline(18, '#6B7280') }}>FOLLOW FOR MORE TRAPS LIKE THIS</p>
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
