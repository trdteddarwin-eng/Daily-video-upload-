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

// Scene 1 — Dark — Hook: 42% of Americans avoid financial statements
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 22], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = Math.floor(interpolate(frame, [20, 95], [0, 42], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const envSc = spring({ frame: frame - 30, fps, config: { stiffness: 90, damping: 14 } });
  const badge1Sc = spring({ frame: frame - 70, fps, config: { stiffness: 100, damping: 12 } });
  const badge2Sc = spring({ frame: frame - 85, fps, config: { stiffness: 100, damping: 12 } });
  const badge3Sc = spring({ frame: frame - 100, fps, config: { stiffness: 100, damping: 12 } });

  const badges = [
    { label: 'Credit Card Statement', color: '#FF6B6B', sc: badge1Sc },
    { label: 'Bank Alert: Low Balance', color: '#FFB347', sc: badge2Sc },
    { label: 'Overdue Payment Notice', color: ACCENT, sc: badge3Sc },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 28 }}>
          <p style={headline(34, ACCENT)}>THE AVOIDANCE TAX</p>
        </div>

        <div style={{ transform: `scale(${envSc})`, marginBottom: 28 }}>
          <svg width="260" height="190" viewBox="0 0 260 190">
            <rect x="5" y="40" width="250" height="140" rx="8" fill="#1A1A1A" stroke={ACCENT} strokeWidth="3" />
            <path d="M5 40 L130 120 L255 40" fill="none" stroke={ACCENT} strokeWidth="3" />
            <line x1="5" y1="180" x2="90" y2="120" stroke={ACCENT} strokeWidth="2" opacity="0.4" />
            <line x1="255" y1="180" x2="170" y2="120" stroke={ACCENT} strokeWidth="2" opacity="0.4" />
            <circle cx="218" cy="52" r="28" fill={ACCENT} />
            <text x="218" y="58" textAnchor="middle" fill={WHITE} fontSize={13} fontFamily="Arial Black">NEW</text>
          </svg>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
          <p style={{ fontFamily: FONT, fontSize: 128, color: ACCENT, margin: 0, lineHeight: 1 }}>{counterVal}%</p>
          <p style={{ ...headline(26, WHITE), letterSpacing: '0.08em', marginTop: 6 }}>of Americans avoid</p>
          <p style={{ ...headline(26, WHITE), letterSpacing: '0.08em' }}>their financial statements</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 520 }}>
          {badges.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', background: '#1E1E1E', borderRadius: 12, padding: '12px 18px', border: `2px solid ${b.color}`, transform: `scale(${b.sc})`, transformOrigin: 'left center' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: b.color, marginRight: 14, flexShrink: 0 }} />
              <span style={{ fontFamily: FONT, fontSize: 22, color: WHITE }}>{b.label}</span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 2 — Light — Late fees: calendar X marks, piggy bank, $40 fee badge
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const xCount = Math.floor(interpolate(frame, [22, 90], [0, 3], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const piggySc = spring({ frame: frame - 42, fps, config: { stiffness: 80, damping: 13 } });
  const feeSc = spring({ frame: frame - 100, fps, config: { stiffness: 95, damping: 14 } });
  const totalFees = Math.floor(interpolate(frame, [110, 185], [0, 120], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const calDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
  const lateDays = [7, 15, 21];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 50px' }}>
        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 22 }}>
          <p style={headline(42, ACCENT)}>LATE FEE TRAP</p>
        </div>

        <div style={{ background: WHITE, borderRadius: 14, padding: '16px 18px', marginBottom: 20, width: '100%', maxWidth: 480, border: `3px solid ${ACCENT}` }}>
          <p style={{ ...headline(22, BLACK), marginBottom: 10 }}>THIS MONTH</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {(['S','M','T','W','T','F','S'] as string[]).map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontFamily: FONT, fontSize: 15, color: '#999' }}>{d}</div>
            ))}
            {calDays.map((day) => {
              const lateIdx = lateDays.indexOf(day);
              const isLate = lateIdx !== -1 && lateIdx < xCount;
              return (
                <div key={day} style={{ textAlign: 'center', fontFamily: FONT, fontSize: isLate ? 18 : 16, color: isLate ? WHITE : BLACK, background: isLate ? ACCENT : 'transparent', borderRadius: 5, padding: '3px 0' }}>
                  {isLate ? 'X' : day}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ transform: `scale(${piggySc})`, marginBottom: 16 }}>
          <svg width="130" height="108" viewBox="0 0 130 108">
            <ellipse cx="60" cy="66" rx="48" ry="36" fill="#FFB6C1" stroke="#D4909A" strokeWidth="2" />
            <circle cx="102" cy="50" r="24" fill="#FFB6C1" stroke="#D4909A" strokeWidth="2" />
            <ellipse cx="115" cy="54" rx="8" ry="6" fill="#E89090" />
            <circle cx="112" cy="53" r="2" fill="#C06070" />
            <circle cx="118" cy="53" r="2" fill="#C06070" />
            <circle cx="99" cy="43" r="4" fill={BLACK} />
            <rect x="46" y="28" width="20" height="4" rx="2" fill="#D4909A" />
            <rect x="26" y="96" width="13" height="12" rx="3" fill="#FFB6C1" stroke="#D4909A" strokeWidth="1.5" />
            <rect x="44" y="96" width="13" height="12" rx="3" fill="#FFB6C1" stroke="#D4909A" strokeWidth="1.5" />
            <rect x="62" y="96" width="13" height="12" rx="3" fill="#FFB6C1" stroke="#D4909A" strokeWidth="1.5" />
            <rect x="80" y="96" width="13" height="12" rx="3" fill="#FFB6C1" stroke="#D4909A" strokeWidth="1.5" />
            <path d="M18 70 Q26 58 20 46" stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ transform: `scale(${feeSc})`, background: ACCENT, borderRadius: 14, padding: '14px 30px', marginBottom: 16 }}>
          <p style={{ ...headline(38, WHITE), margin: 0 }}>$40 LATE FEE</p>
          <p style={{ ...headline(20, WHITE), margin: '4px 0 0', opacity: 0.85 }}>x 3 times a year</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ ...headline(24, BLACK), marginBottom: 4 }}>ANNUAL COST:</p>
          <p style={{ ...headline(66, ACCENT), lineHeight: 1 }}>${totalFees}</p>
          <p style={{ fontFamily: FONT, fontSize: 20, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center', marginTop: 4 }}>+ 7-year credit damage</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 3 — Dark — Missed fraud: credit card, 60-day window drains, $247 gone
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardX = interpolate(frame, [12, 50], [-420, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cardOp = interpolate(frame, [12, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barW = interpolate(frame, [50, 170], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const amtSc = spring({ frame: frame - 78, fps, config: { stiffness: 80, damping: 12 } });
  const warnOp = interpolate(frame, [148, 158, 166, 176, 184, 200], [0, 1, 0, 1, 0, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ opacity: titleOp, marginBottom: 26 }}>
          <p style={headline(36, ACCENT)}>MISSED FRAUD WINDOW</p>
        </div>

        <div style={{ opacity: cardOp, transform: `translateX(${cardX}px)`, marginBottom: 28 }}>
          <svg width="340" height="210" viewBox="0 0 340 210">
            <rect x="0" y="0" width="340" height="210" rx="16" fill="#1A2A4A" />
            <rect x="0" y="0" width="340" height="210" rx="16" fill="none" stroke={ACCENT} strokeWidth="3" />
            <rect x="22" y="58" width="48" height="38" rx="6" fill="#D4AF37" />
            <line x1="22" y1="77" x2="70" y2="77" stroke="#B8962E" strokeWidth="1" />
            <line x1="46" y1="58" x2="46" y2="96" stroke="#B8962E" strokeWidth="1" />
            <text x="22" y="136" fill="#F5F5F5" fontSize={22} fontFamily="Courier New" letterSpacing={4}>**** **** **** 4821</text>
            <text x="264" y="184" fill="#F5F5F5" fontSize={28} fontFamily="Arial Black" fontStyle="italic">VISA</text>
            <text x="22" y="174" fill="#AAA" fontSize={14} fontFamily="Arial" letterSpacing={2}>CARDHOLDER</text>
            <line x1="278" y1="18" x2="320" y2="58" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
            <line x1="320" y1="18" x2="278" y2="58" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ width: '100%', maxWidth: 500, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
            <span style={{ fontFamily: FONT, fontSize: 21, color: WHITE }}>60-DAY REPORT WINDOW</span>
            <span style={{ fontFamily: FONT, fontSize: 21, color: ACCENT }}>CLOSING</span>
          </div>
          <div style={{ height: 22, background: '#2A2A2A', borderRadius: 11, overflow: 'hidden', border: `2px solid ${ACCENT}` }}>
            <div style={{ height: '100%', width: `${barW}%`, background: ACCENT, borderRadius: 11 }} />
          </div>
        </div>

        <div style={{ transform: `scale(${amtSc})`, background: '#1A1A1A', borderRadius: 18, padding: '20px 42px', border: `3px solid ${ACCENT}`, marginBottom: 14, textAlign: 'center' }}>
          <p style={{ ...headline(25, '#888'), marginBottom: 7 }}>FRAUDULENT CHARGE</p>
          <p style={{ ...headline(88, ACCENT), lineHeight: 1 }}>$247</p>
          <p style={{ ...headline(23, WHITE), marginTop: 7, letterSpacing: '0.06em' }}>GONE FOREVER</p>
        </div>

        <div style={{ opacity: warnOp }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: ACCENT, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
            WINDOW CLOSED — UNRECOVERABLE
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 4 — Light — Medical billing errors: 80% of bills have mistakes
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 20], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const docY = interpolate(frame, [14, 52], [110, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const docOp = interpolate(frame, [14, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const err1Op = interpolate(frame, [58, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const err2Op = interpolate(frame, [78, 98], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const err3Op = interpolate(frame, [98, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statVal = Math.floor(interpolate(frame, [130, 195], [0, 80], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  const errOpacities = [err1Op, err2Op, err3Op];

  const lines = [
    { desc: 'Office Visit', amt: '$180', isError: false, errIdx: -1 },
    { desc: 'Lab Work (x3 billed)', amt: '$420', isError: true, errIdx: 0 },
    { desc: 'Medication A', amt: '$95', isError: false, errIdx: -1 },
    { desc: 'Duplicate Procedure', amt: '$340', isError: true, errIdx: 1 },
    { desc: 'Admin Fee', amt: '$65', isError: false, errIdx: -1 },
    { desc: 'Insurance Error', amt: '$740', isError: true, errIdx: 2 },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 50px' }}>
        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 20 }}>
          <p style={headline(40, ACCENT)}>BILLING ERRORS</p>
        </div>

        <div style={{ opacity: docOp, transform: `translateY(${docY}px)`, marginBottom: 20, width: '100%', maxWidth: 480 }}>
          <div style={{ background: WHITE, borderRadius: 12, padding: '18px 22px', border: '2px solid #DDD' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderBottom: '2px solid #EEE', paddingBottom: 8 }}>
              <div>
                <div style={{ fontFamily: FONT, fontSize: 19, color: BLACK }}>MEDICAL BILL</div>
                <div style={{ fontFamily: 'Arial', fontSize: 13, color: '#999' }}>Invoice #MB-48291</div>
              </div>
              <div style={{ fontFamily: FONT, fontSize: 24, color: ACCENT }}>$1,840</div>
            </div>
            {lines.map((line, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid #EEE' }}>
                <span style={{ fontFamily: 'Arial', fontSize: 17, color: line.isError ? '#999' : '#444' }}>{line.desc}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontFamily: FONT, fontSize: 17, color: line.isError ? ACCENT : BLACK }}>{line.amt}</span>
                  {line.isError && line.errIdx >= 0 && (
                    <div style={{ width: 17, height: 17, background: ACCENT, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: errOpacities[line.errIdx] }}>
                      <span style={{ fontFamily: FONT, fontSize: 10, color: WHITE }}>!</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: ACCENT, borderRadius: 16, padding: '16px 32px', textAlign: 'center' }}>
          <p style={{ ...headline(76, WHITE), lineHeight: 1 }}>{statVal}%</p>
          <p style={{ ...headline(22, WHITE), marginTop: 6, letterSpacing: '0.07em' }}>of medical bills contain errors</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 5 — Dark — IRS penalties: 5% per month up to 25%, $2,000 becomes $2,500
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const docSc = spring({ frame: frame - 12, fps, config: { stiffness: 70, damping: 14 } });
  const meterW = interpolate(frame, [52, 162], [0, 100], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pctLabel = Math.floor(interpolate(frame, [52, 162], [0, 25], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const billAmt = Math.floor(interpolate(frame, [100, 188], [2000, 2500], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 60px' }}>
        <div style={{ opacity: titleOp, marginBottom: 22 }}>
          <p style={headline(40, ACCENT)}>IRS PENALTY TRAP</p>
        </div>

        <div style={{ transform: `scale(${docSc})`, background: '#1A1A1A', borderRadius: 12, padding: '18px 24px', marginBottom: 26, width: '100%', maxWidth: 500, border: `2px solid ${ACCENT}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
            <svg width="42" height="42" viewBox="0 0 42 42">
              <circle cx="21" cy="13" r="9" fill="none" stroke="#D4AF37" strokeWidth="2" />
              <path d="M7 25 Q21 39 35 25" fill="none" stroke="#D4AF37" strokeWidth="2" />
              <path d="M3 21 Q21 42 39 21" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
              <line x1="21" y1="4" x2="21" y2="25" stroke="#D4AF37" strokeWidth="2" />
            </svg>
            <div>
              <div style={{ fontFamily: FONT, fontSize: 17, color: WHITE, letterSpacing: '0.08em' }}>INTERNAL REVENUE SERVICE</div>
              <div style={{ fontFamily: 'Arial', fontSize: 13, color: '#777' }}>Notice of Late Filing Penalty</div>
            </div>
          </div>
          <div style={{ fontFamily: 'Arial', fontSize: 16, color: '#BBB', lineHeight: 1.6 }}>
            Failure-to-file penalty:{' '}
            <span style={{ color: ACCENT, fontWeight: 'bold' }}>5% per month</span>
            {', '}maximum{' '}
            <span style={{ color: ACCENT, fontWeight: 'bold' }}>25%</span> of unpaid tax.
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: 500, marginBottom: 26 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
            <span style={{ fontFamily: FONT, fontSize: 21, color: WHITE }}>PENALTY</span>
            <span style={{ fontFamily: FONT, fontSize: 21, color: ACCENT }}>{pctLabel}%</span>
          </div>
          <div style={{ height: 26, background: '#2A2A2A', borderRadius: 13, overflow: 'hidden', border: `2px solid ${ACCENT}` }}>
            <div style={{ height: '100%', width: `${meterW}%`, background: ACCENT, borderRadius: 13 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
            <span style={{ fontFamily: 'Arial', fontSize: 14, color: '#666' }}>0%</span>
            <span style={{ fontFamily: 'Arial', fontSize: 14, color: '#666' }}>MAX 25%</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ ...headline(24, '#666'), marginBottom: 5 }}>YOUR TAX BILL</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontFamily: FONT, fontSize: 32, color: '#444', textDecoration: 'line-through' }}>$2,000</span>
            <span style={{ fontFamily: FONT, fontSize: 26, color: ACCENT }}>TO</span>
            <span style={{ fontFamily: FONT, fontSize: 78, color: ACCENT, lineHeight: 1 }}>${billAmt.toLocaleString()}</span>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 21, color: WHITE, textTransform: 'uppercase', letterSpacing: '0.07em', marginTop: 5 }}>in just 6 months</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// Scene 6 — Light — $24,000 total reveal + 10-min/month CTA
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const fps = 30;

  const titleOp = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item1Op = interpolate(frame, [12, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item2Op = interpolate(frame, [28, 46], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item3Op = interpolate(frame, [44, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const item4Op = interpolate(frame, [60, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bigNum = Math.floor(interpolate(frame, [22, 148], [0, 24000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const clockSc = spring({ frame: frame - 52, fps, config: { stiffness: 80, damping: 13 } });
  const ctaY = interpolate(frame, [130, 168], [58, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [130, 164], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const items = [
    { label: 'Late fees (10 yrs)', amt: '$1,200', op: item1Op },
    { label: 'Missed fraud', amt: '$2,470', op: item2Op },
    { label: 'Billing errors uncaught', amt: '$8,400', op: item3Op },
    { label: 'IRS penalties + interest', amt: '$11,930', op: item4Op },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 50px' }}>
        <div style={{ opacity: titleOp, marginBottom: 16 }}>
          <p style={headline(32, ACCENT)}>10 YEARS OF AVOIDANCE</p>
        </div>

        <div style={{ width: '100%', maxWidth: 490, marginBottom: 16 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px', background: WHITE, borderRadius: 10, marginBottom: 7, border: '2px solid #E0E0E0', opacity: item.op }}>
              <span style={{ fontFamily: 'Arial', fontSize: 19, color: BLACK }}>{item.label}</span>
              <span style={{ fontFamily: FONT, fontSize: 19, color: ACCENT }}>{item.amt}</span>
            </div>
          ))}
        </div>

        <div style={{ background: ACCENT, borderRadius: 18, padding: '20px 42px', textAlign: 'center', marginBottom: 20 }}>
          <p style={{ ...headline(24, WHITE), marginBottom: 4 }}>TOTAL AVOIDANCE TAX</p>
          <p style={{ ...headline(94, WHITE), lineHeight: 1 }}>${bigNum.toLocaleString()}</p>
        </div>

        <div style={{ opacity: ctaOp, transform: `translateY(${ctaY}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ transform: `scale(${clockSc})` }}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="26" fill="none" stroke={ACCENT} strokeWidth="3" />
              <line x1="30" y1="10" x2="30" y2="30" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
              <line x1="30" y1="30" x2="46" y2="38" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" />
              <circle cx="30" cy="30" r="3" fill={ACCENT} />
            </svg>
          </div>
          <p style={{ ...headline(28, BLACK), marginBottom: 0 }}>THE FIX:</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>10 MINUTES</p>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>ONCE A MONTH</p>
          <p style={{ fontFamily: 'Arial', fontSize: 20, color: '#777', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2 }}>
            OPEN · REVIEW · PROTECT
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
