import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring } from 'remotion';

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

// Scene 1 — Dark — Person celebrating, FORGIVEN stamp, IRS warning
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 22], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personSc = spring({ frame: frame - 8, fps, config: { stiffness: 80, damping: 14 } });
  const forgSc = spring({ frame: frame - 60, fps, config: { stiffness: 70, damping: 12 } });
  const confettiOp = interpolate(frame, [25, 48, 108, 132], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const butOp = interpolate(frame, [128, 152], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const confetti = [
    { x: 65, y: 130, rot: 15, c: '#F59E0B' },
    { x: 940, y: 190, rot: -20, c: '#10B981' },
    { x: 110, y: 580, rot: 45, c: ACCENT },
    { x: 960, y: 520, rot: -35, c: '#3B82F6' },
    { x: 500, y: 90, rot: 10, c: '#F59E0B' },
    { x: 840, y: 310, rot: 55, c: ACCENT },
    { x: 85, y: 1200, rot: -15, c: '#10B981' },
    { x: 970, y: 1100, rot: 70, c: '#F59E0B' },
    { x: 220, y: 1500, rot: 30, c: '#3B82F6' },
    { x: 870, y: 1450, rot: -50, c: '#F59E0B' },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(46, WHITE), transform: `translateY(${titleY}px)`, opacity: titleOp, marginBottom: 42, lineHeight: 1.3 }}>
          AFTER<br /><span style={{ color: ACCENT }}>25 YEARS</span><br />THEY FORGIVE IT
        </div>

        <svg width="160" height="218" viewBox="0 0 160 218" style={{ transform: `scale(${personSc})` }}>
          <circle cx="80" cy="46" r="36" fill="none" stroke={WHITE} strokeWidth="3.5" />
          <path d="M 63 50 Q 80 66 97 50" fill="none" stroke={WHITE} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="67" cy="38" r="3.5" fill={WHITE} />
          <circle cx="93" cy="38" r="3.5" fill={WHITE} />
          <line x1="80" y1="82" x2="80" y2="148" stroke={WHITE} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="80" y1="100" x2="28" y2="66" stroke={WHITE} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="80" y1="100" x2="132" y2="66" stroke={WHITE} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="80" y1="148" x2="48" y2="212" stroke={WHITE} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="80" y1="148" x2="112" y2="212" stroke={WHITE} strokeWidth="3.5" strokeLinecap="round" />
        </svg>

        <div style={{ transform: `scale(${forgSc})`, marginTop: 30 }}>
          <div style={{ border: '4px solid #10B981', borderRadius: 10, padding: '12px 42px' }}>
            <div style={{ ...headline(46, '#10B981'), letterSpacing: '0.18em' }}>FORGIVEN</div>
          </div>
        </div>

        <div style={{ ...headline(24, ACCENT), marginTop: 34, opacity: butOp }}>
          BUT THE IRS DISAGREES
        </div>
      </AbsoluteFill>

      <div style={{ position: 'absolute' as const, top: 0, left: 0, width: '100%', height: '100%', opacity: confettiOp, pointerEvents: 'none' as const }}>
        {confetti.map((c, i) => (
          <div key={i} style={{
            position: 'absolute' as const,
            left: c.x,
            top: c.y,
            width: 20,
            height: 12,
            background: c.c,
            borderRadius: 2,
            transform: `rotate(${c.rot}deg)`,
          }} />
        ))}
      </div>
    </FadeScene>
  );
};

// Scene 2 — Light — IDR 25-year grid + 8.8M borrowers counter
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gridProg = interpolate(frame, [18, 148], [0, 25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const filledCells = Math.max(0, Math.floor(gridProg));
  const borrowersTenths = Math.floor(interpolate(frame, [35, 158], [0, 88], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const captionOp = interpolate(frame, [158, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gridSc = spring({ frame: frame - 12, fps, config: { stiffness: 60, damping: 16 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(36, BLACK), opacity: titleOp, marginBottom: 36, lineHeight: 1.35 }}>
          PAY <span style={{ color: ACCENT }}>% OF INCOME</span><br />FOR 25 YEARS —<br />BALANCE WIPED
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 7, width: 410, justifyContent: 'center', marginBottom: 26, transform: `scale(${gridSc})` }}>
          {[...Array(Math.max(0, Math.floor(25)))].map((_, i) => (
            <div key={i} style={{
              width: 66,
              height: 44,
              borderRadius: 7,
              background: i < filledCells ? (i === 24 ? '#10B981' : ACCENT) : '#D1D5DB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: FONT,
                fontSize: i === 24 ? 14 : 9,
                color: i < filledCells ? WHITE : '#9CA3AF',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.01em',
              }}>
                {i === 24 ? '✓' : `YR${i + 1}`}
              </span>
            </div>
          ))}
        </div>

        <div style={{ ...headline(54, ACCENT), lineHeight: 1 }}>
          {(borrowersTenths / 10).toFixed(1)}M
        </div>
        <div style={{ ...headline(22, BLACK), marginTop: 6 }}>BORROWERS ON IDR</div>

        <div style={{ ...headline(19, BLACK), marginTop: 32, opacity: captionOp, lineHeight: 1.5 }}>
          THEN THE BALANCE IS<br /><span style={{ color: ACCENT }}>WIPED CLEAN</span> — OR SO YOU THINK
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3 — Dark — IRS Form 1099-C with TAXED stamp
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const letterSc = spring({ frame: frame - 12, fps, config: { stiffness: 68, damping: 14 } });
  const stampSc = spring({ frame: frame - 92, fps, config: { stiffness: 100, damping: 11 } });
  const subOp = interpolate(frame, [145, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(40, WHITE), opacity: titleOp, marginBottom: 34, lineHeight: 1.3 }}>
          IRS MAILS YOU<br /><span style={{ color: ACCENT }}>FORM 1099-C</span>
        </div>

        <div style={{ position: 'relative' as const, transform: `scale(${letterSc})` }}>
          <svg width="290" height="310" viewBox="0 0 290 310">
            <rect x="8" y="8" width="274" height="294" rx="10" fill={WHITE} />
            <rect x="8" y="8" width="274" height="58" rx="10" fill="#1E3A5F" />
            <rect x="8" y="40" width="274" height="26" fill="#1E3A5F" />
            <text x="145" y="45" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="22" letterSpacing="6">IRS</text>
            <text x="145" y="92" textAnchor="middle" fill="#6B7280" fontFamily="Arial, sans-serif" fontSize="11" letterSpacing="2">CANCELLATION OF DEBT INCOME</text>
            <text x="145" y="160" textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize="56" letterSpacing="1">1099-C</text>
            <line x1="28" y1="188" x2="262" y2="188" stroke="#E5E7EB" strokeWidth="1.5" />
            <text x="145" y="222" textAnchor="middle" fill="#6B7280" fontFamily="Arial, sans-serif" fontSize="13" letterSpacing="1">AMOUNT FORGIVEN</text>
            <text x="145" y="270" textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize="46" letterSpacing="1">$95,000</text>
          </svg>

          <div style={{
            position: 'absolute' as const,
            top: 95,
            left: 38,
            transform: `scale(${stampSc}) rotate(-16deg)`,
            border: `6px solid ${ACCENT}`,
            borderRadius: 10,
            padding: '10px 26px',
            background: 'rgba(239,68,68,0.08)',
          }}>
            <div style={{ ...headline(38, ACCENT), letterSpacing: '0.22em' }}>TAXED</div>
          </div>
        </div>

        <div style={{ ...headline(22, WHITE), marginTop: 22, opacity: subOp, lineHeight: 1.4 }}>
          THIS IS<br /><span style={{ color: ACCENT }}>ORDINARY INCOME</span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4 — Light — Math breakdown: $95K x 22% = $21K due
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row1Op = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2Op = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row3Op = interpolate(frame, [100, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1W = Math.max(0, Math.floor(interpolate(frame, [22, 70], [0, 380], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const bar2W = Math.max(0, Math.floor(interpolate(frame, [62, 115], [0, 84], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const totalVal = Math.floor(interpolate(frame, [102, 170], [0, 20900], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const totalSc = spring({ frame: frame - 100, fps, config: { stiffness: 55, damping: 16 } });
  const dueSc = spring({ frame: frame - 155, fps, config: { stiffness: 80, damping: 13 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(40, BLACK), opacity: titleOp, marginBottom: 38, lineHeight: 1.25 }}>
          THE MATH<br /><span style={{ color: ACCENT }}>IS BRUTAL</span>
        </div>

        <div style={{ width: 420, display: 'flex', flexDirection: 'column' as const, gap: 20 }}>
          <div style={{ opacity: row1Op }}>
            <div style={{ fontFamily: FONT, fontSize: 20, color: BLACK, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 6 }}>
              $95,000 Forgiven
            </div>
            <div style={{ width: bar1W, height: 30, background: '#D1D5DB', borderRadius: 6, overflow: 'hidden' as const }}>
              <div style={{ width: '100%', height: '100%', background: '#6B7280', borderRadius: 6 }} />
            </div>
          </div>

          <div style={{ opacity: row2Op }}>
            <div style={{ fontFamily: FONT, fontSize: 20, color: BLACK, letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 6 }}>
              × 22% Federal Tax
            </div>
            <div style={{ width: bar2W, height: 30, background: ACCENT, borderRadius: 6 }} />
          </div>

          <div style={{ opacity: row3Op, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', marginTop: 10 }}>
            <div style={{ width: '100%', height: 2, background: BLACK, marginBottom: 16 }} />
            <div style={{
              fontFamily: FONT,
              fontSize: 72,
              color: ACCENT,
              letterSpacing: '0.04em',
              transform: `scale(${totalSc})`,
              lineHeight: 1,
            }}>
              ${totalVal.toLocaleString()}
            </div>
            <div style={{ ...headline(22, BLACK), marginTop: 6 }}>IN TAXES</div>
          </div>
        </div>

        <div style={{ transform: `scale(${dueSc})`, marginTop: 30 }}>
          <div style={{ background: ACCENT, borderRadius: 12, padding: '14px 40px' }}>
            <div style={{ ...headline(28, WHITE), letterSpacing: '0.12em' }}>DUE IN CASH — THIS YEAR</div>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5 — Dark — Empty wallet vs IRS bill: phantom income
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const walletSc = spring({ frame: frame - 10, fps, config: { stiffness: 72, damping: 14 } });
  const billX = interpolate(frame, [55, 115], [320, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const phantomOp = interpolate(frame, [148, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(40, WHITE), opacity: titleOp, marginBottom: 40, lineHeight: 1.3 }}>
          YOU RECEIVED<br /><span style={{ color: '#10B981' }}>$0</span>
        </div>

        <div style={{ display: 'flex', gap: 48, alignItems: 'center', marginBottom: 30 }}>
          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 14 }}>
            <svg width="160" height="130" viewBox="0 0 160 130" style={{ transform: `scale(${walletSc})` }}>
              <rect x="10" y="30" width="140" height="90" rx="12" fill="#374151" stroke="#4B5563" strokeWidth="2.5" />
              <rect x="10" y="30" width="140" height="28" rx="10" fill="#4B5563" />
              <rect x="10" y="48" width="140" height="10" fill="#4B5563" />
              <rect x="88" y="55" width="62" height="42" rx="8" fill="#1F2937" stroke="#6B7280" strokeWidth="1.5" />
              <circle cx="119" cy="76" r="10" fill="#374151" stroke="#6B7280" strokeWidth="1.5" />
              <circle cx="119" cy="76" r="3.5" fill="#6B7280" />
              <line x1="28" y1="82" x2="78" y2="82" stroke="#6B7280" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />
              <line x1="28" y1="96" x2="62" y2="96" stroke="#6B7280" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />
            </svg>
            <div style={{ ...headline(16, '#9CA3AF') }}>YOUR WALLET</div>
          </div>

          <div style={{ fontFamily: FONT, fontSize: 52, color: '#374151' }}>VS</div>

          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 14, transform: `translateX(${billX}px)` }}>
            <svg width="160" height="130" viewBox="0 0 160 130">
              <rect x="8" y="8" width="144" height="114" rx="8" fill={WHITE} />
              <rect x="8" y="8" width="144" height="30" rx="8" fill="#1E3A5F" />
              <rect x="8" y="28" width="144" height="10" fill="#1E3A5F" />
              <text x="80" y="28" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="13" letterSpacing="3">IRS</text>
              <text x="80" y="64" textAnchor="middle" fill={ACCENT} fontFamily={FONT} fontSize="15" letterSpacing="1">AMOUNT DUE</text>
              <text x="80" y="100" textAnchor="middle" fill={BLACK} fontFamily={FONT} fontSize="26" letterSpacing="1">$20,900</text>
            </svg>
            <div style={{ ...headline(16, ACCENT) }}>IRS BILL</div>
          </div>
        </div>

        <div style={{ ...headline(26, WHITE), opacity: phantomOp, lineHeight: 1.45 }}>
          PHANTOM INCOME —<br /><span style={{ color: ACCENT }}>REAL TAX BILL</span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6 — Light — PSLF (tax-free) vs IDR (taxed) + piggy bank CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pslSc = spring({ frame: frame - 18, fps, config: { stiffness: 68, damping: 14 } });
  const idrSc = spring({ frame: frame - 42, fps, config: { stiffness: 68, damping: 14 } });
  const piggySc = spring({ frame: frame - 90, fps, config: { stiffness: 60, damping: 16 } });
  const ctaOp = interpolate(frame, [145, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinH = Math.max(0, Math.floor(interpolate(frame, [92, 185], [0, 55], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ ...headline(38, BLACK), opacity: titleOp, marginBottom: 38, lineHeight: 1.3 }}>
          TWO PATHS —<br /><span style={{ color: ACCENT }}>ONE IS TAX-FREE</span>
        </div>

        <div style={{ display: 'flex', gap: 32, marginBottom: 36 }}>
          <div style={{ transform: `scale(${pslSc})`, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 14 }}>
            <svg width="148" height="160" viewBox="0 0 148 160">
              <path d="M 74 8 L 136 36 L 136 100 Q 136 148 74 158 Q 12 148 12 100 L 12 36 Z" fill="#10B981" />
              <path d="M 74 18 L 126 42 L 126 100 Q 126 140 74 150 Q 22 140 22 100 L 22 42 Z" fill="#059669" />
              <polyline points="40,82 62,104 108,56" stroke={WHITE} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ ...headline(15, '#10B981') }}>PSLF</div>
            <div style={{ ...headline(13, '#10B981') }}>TAX FREE</div>
          </div>

          <div style={{ transform: `scale(${idrSc})`, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 14 }}>
            <svg width="148" height="160" viewBox="0 0 148 160">
              <path d="M 74 8 L 136 36 L 136 100 Q 136 148 74 158 Q 12 148 12 100 L 12 36 Z" fill={ACCENT} />
              <path d="M 74 18 L 126 42 L 126 100 Q 126 140 74 150 Q 22 140 22 100 L 22 42 Z" fill="#DC2626" />
              <text x="74" y="95" textAnchor="middle" fill={WHITE} fontFamily={FONT} fontSize="60" letterSpacing="-2">!</text>
            </svg>
            <div style={{ ...headline(15, ACCENT) }}>IDR</div>
            <div style={{ ...headline(13, ACCENT) }}>TAXED</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginBottom: 28, transform: `scale(${piggySc})` }}>
          <svg width="130" height="110" viewBox="0 0 130 110">
            <ellipse cx="60" cy="65" rx="46" ry="38" fill="#F9A8D4" />
            <circle cx="96" cy="52" r="16" fill="#F9A8D4" />
            <circle cx="102" cy="46" r="5" fill={WHITE} />
            <circle cx="104" cy="44" r="2" fill="#9CA3AF" />
            <rect x="38" y="98" width="10" height="20" rx="4" fill="#F472B6" />
            <rect x="54" y="100" width="10" height="18" rx="4" fill="#F472B6" />
            <rect x="70" y="98" width="10" height="20" rx="4" fill="#F472B6" />
            <rect x="86" y="100" width="10" height="18" rx="4" fill="#F472B6" />
            <rect x="50" y="30" width="20" height="8" rx="3" fill="#EC4899" />
            <line x1="6" y1="68" x2="22" y2="62" stroke="#F9A8D4" strokeWidth="8" strokeLinecap="round" />
          </svg>

          <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 4 }}>
            <div style={{ width: 28, height: 70, background: '#E5E7EB', borderRadius: 8, overflow: 'hidden' as const, display: 'flex', flexDirection: 'column' as const, justifyContent: 'flex-end' }}>
              <div style={{ width: '100%', height: coinH, background: '#F59E0B', borderRadius: 6 }} />
            </div>
            <div style={{ fontFamily: FONT, fontSize: 10, color: '#6B7280', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>SAVE</div>
          </div>
        </div>

        <div style={{ ...headline(26, BLACK), opacity: ctaOp, lineHeight: 1.45 }}>
          START SAVING <span style={{ color: ACCENT }}>NOW</span><br />FOR THE BOMB AT<br />THE FINISH LINE
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={225}><Scene1 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene2 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene3 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene4 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene5 dur={225} /></Series.Sequence>
        <Series.Sequence durationInFrames={225}><Scene6 dur={225} /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
