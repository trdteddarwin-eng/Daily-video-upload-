import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#0F1117';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const GREEN = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Arial", "Helvetica Neue", Arial, sans-serif';

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

// ── SCENE 1 — Hook: 401k balance + IRS co-ownership reveal ───────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 300 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  const counterVal = interpolate(frame, [10, 140], [0, 300000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const irsBarWidth = interpolate(frame, [160, 230], [0, 22], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const badgeIn = spring({ frame: Math.max(0, frame - 225), fps, config: { damping: 10, stiffness: 120 } });

  const formattedCounter = '$' + Math.floor(counterVal).toLocaleString();

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 70px', gap: 0 }}>
        <p style={{ ...headline(44, WHITE), transform: `translateY(${(1 - titleIn) * 40}px)`, marginBottom: 8 }}>YOUR 401K</p>
        <p style={{ ...headline(44, ACCENT), transform: `translateY(${(1 - titleIn) * 40}px)`, marginBottom: 36 }}>BALANCE</p>

        {/* Big animated counter */}
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 104, color: WHITE, margin: 0, lineHeight: 1 }}>{formattedCounter}</p>
        </div>

        {/* Split bar */}
        <div style={{ width: 820, height: 72, background: '#333', borderRadius: 10, overflow: 'hidden', position: 'relative', marginBottom: 16 }}>
          {/* Yours portion */}
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${100 - irsBarWidth}%`, background: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0, letterSpacing: '0.06em' }}>YOURS</p>
          </div>
          {/* IRS portion */}
          <div style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: `${irsBarWidth}%`, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, margin: 0 }}>IRS</p>
          </div>
        </div>

        {/* IRS badge */}
        <div style={{ opacity: badgeIn, transform: `scale(${badgeIn})`, background: ACCENT, borderRadius: 14, padding: '16px 36px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0 }}>22% = $66,000</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: WHITE, margin: '6px 0 0 0' }}>belongs to the IRS — not you</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 3 — The math: $300K split ──────────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 300 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const barHeight = interpolate(frame, [20, 130], [0, 480], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const irsReveal = interpolate(frame, [140, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labelIn = spring({ frame: Math.max(0, frame - 200), fps, config: { damping: 12, stiffness: 100 } });

  const yoursH = barHeight * 0.78;
  const irsH = barHeight * 0.22 * irsReveal;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 70px', gap: 0 }}>
        <p style={{ ...headline(44, WHITE), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 4 }}>THE MATH ON</p>
        <p style={{ ...headline(44, ACCENT), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 36 }}>$300,000</p>

        {/* Stacked bar */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 40, marginBottom: 28 }}>
          {/* Bar */}
          <div style={{ width: 140, height: 500, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRadius: 10, overflow: 'hidden', border: '2px solid #333' }}>
            {/* IRS section — top */}
            <div style={{ width: '100%', height: irsH, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {irsReveal > 0.5 && <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, margin: 0 }}>IRS</p>}
            </div>
            {/* Yours section — bottom */}
            <div style={{ width: '100%', height: yoursH, background: WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {barHeight > 80 && <p style={{ fontFamily: FONT, fontSize: 18, color: BLACK, margin: 0 }}>YOU</p>}
            </div>
          </div>

          {/* Labels */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 16, height: 500, paddingBottom: 8 }}>
            <div style={{ opacity: irsReveal, marginBottom: `${irsH - 52}px` }}>
              <p style={{ fontFamily: FONT, fontSize: 30, color: ACCENT, margin: 0 }}>$66,000</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#AAA', margin: '2px 0 0 0' }}>belongs to IRS</p>
            </div>
            <div style={{ opacity: barHeight > 40 ? 1 : 0 }}>
              <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0 }}>$234,000</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#AAA', margin: '2px 0 0 0' }}>actually yours</p>
            </div>
          </div>
        </div>

        <div style={{ opacity: labelIn, transform: `scale(${labelIn})`, background: '#1F2937', borderRadius: 14, padding: '14px 32px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: WHITE, margin: 0 }}>TOTAL: $300,000</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: '#AAA', margin: '6px 0 0 0' }}>but your real number is $234,000</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 4 — RMD trap at age 73 ─────────────────────────────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 300 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  const ages = [60, 65, 70, 72, 73];
  const timelineWidth = interpolate(frame, [20, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const warningIn = spring({ frame: Math.max(0, frame - 145), fps, config: { damping: 8, stiffness: 100 } });
  const textIn = spring({ frame: Math.max(0, frame - 185), fps, config: { damping: 12, stiffness: 100 } });
  const fixIn = spring({ frame: Math.max(0, frame - 240), fps, config: { damping: 10, stiffness: 120 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '70px 65px', gap: 0 }}>
        <p style={{ ...headline(40, BLACK), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 4 }}>HERE'S WHERE IT</p>
        <p style={{ ...headline(40, ACCENT), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 36 }}>GETS WORSE</p>

        {/* Age timeline */}
        <div style={{ width: 820, position: 'relative', marginBottom: 24 }}>
          {/* Track */}
          <div style={{ height: 10, background: '#DDD', borderRadius: 5, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${timelineWidth * 100}%`, background: '#9CA3AF', borderRadius: 5 }} />
          </div>
          {/* Age markers */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
            {ages.map((age, i) => {
              const isRmd = age === 73;
              const dotOpacity = interpolate(frame, [20 + i * 20, 50 + i * 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: dotOpacity }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: isRmd ? ACCENT : '#9CA3AF', border: isRmd ? `3px solid ${ACCENT}` : '3px solid #CCC', marginTop: -25 }} />
                  <p style={{ fontFamily: FONT, fontSize: 22, color: isRmd ? ACCENT : BLACK, margin: 0 }}>{age}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Warning triangle at 73 */}
        <div style={{ opacity: warningIn, transform: `scale(${warningIn})`, marginBottom: 18 }}>
          <svg width="100" height="88" viewBox="0 0 100 88">
            <polygon points="50,8 96,80 4,80" fill={ACCENT} />
            <text x="50" y="68" fontSize="40" fill={WHITE} textAnchor="middle" fontFamily="Arial Black">!</text>
          </svg>
        </div>

        <div style={{ opacity: textIn, transform: `translateY(${(1 - textIn) * 20}px)`, marginBottom: 18, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 32, color: BLACK, margin: 0 }}>RMD KICKS IN</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: '#555', margin: '8px 0 0 0', textAlign: 'center', lineHeight: 1.4 }}>
            Required Minimum Distributions force<br />withdrawals whether you need them or not
          </p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: ACCENT, margin: '10px 0 0 0', textAlign: 'center' }}>
            → can push you into a higher bracket
          </p>
        </div>

        <div style={{ opacity: fixIn, transform: `scale(${fixIn})`, background: BLACK, borderRadius: 14, padding: '12px 30px' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: GREEN, margin: 0 }}>BUT THERE IS A FIX →</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 2 — Pre-tax contribution flow ──────────────────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 300 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const coinIn = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, delay: 30 });
  const arrow1In = spring({ frame, fps, config: { damping: 12, stiffness: 100 }, delay: 75 });
  const vaultIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 100 });
  const arrow2In = spring({ frame, fps, config: { damping: 12, stiffness: 100 }, delay: 155 });
  const personIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 185 });
  const tagIn = spring({ frame: Math.max(0, frame - 230), fps, config: { damping: 10, stiffness: 120 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '70px 65px', gap: 0 }}>
        <p style={{ ...headline(40, BLACK), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 4 }}>PRE-TAX</p>
        <p style={{ ...headline(40, ACCENT), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 30 }}>MEANS LATER TAX</p>

        {/* Paycheck coin */}
        <div style={{ opacity: coinIn, transform: `scale(${coinIn})`, marginBottom: 10, textAlign: 'center' }}>
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="#F59E0B" stroke="#D97706" strokeWidth="3" />
            <text x="50" y="42" fontSize="28" fill={WHITE} textAnchor="middle" fontFamily="Arial Black">$</text>
            <text x="50" y="65" fontSize="14" fill={WHITE} textAnchor="middle" fontFamily="Arial">PAYCHECK</text>
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '8px 0 0 0', letterSpacing: '0.06em' }}>BEFORE TAXES</p>
        </div>

        {/* Arrow down */}
        <div style={{ opacity: arrow1In }}>
          <svg width="40" height="48" viewBox="0 0 40 48">
            <line x1="20" y1="4" x2="20" y2="36" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
            <polyline points="8,26 20,40 32,26" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Vault */}
        <div style={{ opacity: vaultIn, transform: `scale(${vaultIn})`, marginBottom: 10, textAlign: 'center' }}>
          <svg width="120" height="100" viewBox="0 0 120 100">
            <rect x="8" y="10" width="104" height="82" rx="10" fill="#374151" />
            <rect x="18" y="20" width="84" height="62" rx="6" fill="#1F2937" />
            <circle cx="60" cy="51" r="20" fill="none" stroke="#6B7280" strokeWidth="3" />
            <circle cx="60" cy="51" r="10" fill="#4B5563" />
            <line x1="60" y1="31" x2="60" y2="40" stroke="#6B7280" strokeWidth="2.5" />
            <line x1="60" y1="62" x2="60" y2="71" stroke="#6B7280" strokeWidth="2.5" />
            <line x1="40" y1="51" x2="49" y2="51" stroke="#6B7280" strokeWidth="2.5" />
            <line x1="71" y1="51" x2="80" y2="51" stroke="#6B7280" strokeWidth="2.5" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: '8px 0 0 0', letterSpacing: '0.06em' }}>401K VAULT</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#666', margin: '4px 0 0 0' }}>money grows — untaxed for now</p>
        </div>

        {/* Arrow down */}
        <div style={{ opacity: arrow2In }}>
          <svg width="40" height="48" viewBox="0 0 40 48">
            <line x1="20" y1="4" x2="20" y2="36" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
            <polyline points="8,26 20,40 32,26" fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Future person - taxed */}
        <div style={{ opacity: personIn, textAlign: 'center', marginBottom: 14 }}>
          <svg width="70" height="100" viewBox="0 0 70 100">
            <circle cx="35" cy="20" r="16" fill="#9CA3AF" />
            <rect x="21" y="40" width="28" height="36" rx="7" fill="#9CA3AF" />
            <rect x="5" y="44" width="18" height="9" rx="4" fill="#9CA3AF" />
            <rect x="47" y="44" width="18" height="9" rx="4" fill="#9CA3AF" />
            <rect x="23" y="73" width="9" height="26" rx="4" fill="#9CA3AF" />
            <rect x="38" y="73" width="9" height="26" rx="4" fill="#9CA3AF" />
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '6px 0 0 0', letterSpacing: '0.06em' }}>RETIREMENT YOU</p>
        </div>

        <div style={{ opacity: tagIn, transform: `scale(${tagIn})`, background: ACCENT, borderRadius: 14, padding: '12px 30px' }}>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: 0 }}>TAXED AS INCOME</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: WHITE, margin: '4px 0 0 0', textAlign: 'center' }}>every dollar you withdraw</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 5 — Roth IRA: pay tax on seed not harvest ──────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 300 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const leftIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 30 });
  const rightIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 60 });
  const vsIn = spring({ frame, fps, config: { damping: 10, stiffness: 120 }, delay: 50 });
  const leftArrow = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, delay: 100 });
  const rightArrow = spring({ frame, fps, config: { damping: 12, stiffness: 90 }, delay: 120 });
  const leftOut = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 160 });
  const rightOut = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 180 });
  const tagIn = spring({ frame: Math.max(0, frame - 235), fps, config: { damping: 10, stiffness: 120 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 55px', gap: 0 }}>
        <p style={{ ...headline(40, WHITE), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 4 }}>THE ROTH IRA</p>
        <p style={{ ...headline(40, GREEN), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 26 }}>FLIPS THE SCRIPT</p>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, width: '100%', marginBottom: 20 }}>
          {/* Traditional column */}
          <div style={{ flex: 1, opacity: leftIn, transform: `translateX(${(1 - leftIn) * -30}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ background: '#1F2937', borderRadius: 10, padding: '10px 16px', width: '100%', textAlign: 'center' }}>
              <p style={{ fontFamily: FONT, fontSize: 20, color: '#9CA3AF', margin: 0 }}>TRADITIONAL</p>
            </div>
            {/* Coin in — full size */}
            <svg width="72" height="72" viewBox="0 0 72 72">
              <circle cx="36" cy="36" r="33" fill="#F59E0B" />
              <text x="36" y="44" fontSize="28" fill={WHITE} textAnchor="middle" fontFamily="Arial Black">$</text>
            </svg>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: '#9CA3AF', margin: 0, textAlign: 'center' }}>goes in tax-free</p>
            {/* Arrow */}
            <div style={{ opacity: leftArrow }}>
              <svg width="30" height="36" viewBox="0 0 30 36">
                <line x1="15" y1="2" x2="15" y2="26" stroke="#6B7280" strokeWidth="3" strokeLinecap="round" />
                <polyline points="6,19 15,29 24,19" fill="none" stroke="#6B7280" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {/* Output: split coin */}
            <div style={{ opacity: leftOut, display: 'flex', gap: 6, alignItems: 'center' }}>
              <svg width="54" height="54" viewBox="0 0 54 54">
                <circle cx="27" cy="27" r="24" fill={WHITE} />
                <text x="27" y="34" fontSize="20" fill={BLACK} textAnchor="middle" fontFamily="Arial Black">$</text>
              </svg>
              <p style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, margin: 0 }}>+IRS</p>
            </div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: ACCENT, margin: 0, textAlign: 'center' }}>taxed at withdrawal</p>
          </div>

          {/* VS divider */}
          <div style={{ opacity: vsIn, transform: `scale(${vsIn})`, paddingTop: 60 }}>
            <div style={{ background: '#374151', borderRadius: 8, padding: '8px 12px' }}>
              <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0 }}>VS</p>
            </div>
          </div>

          {/* Roth column */}
          <div style={{ flex: 1, opacity: rightIn, transform: `translateX(${(1 - rightIn) * 30}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ background: '#064E3B', borderRadius: 10, padding: '10px 16px', width: '100%', textAlign: 'center' }}>
              <p style={{ fontFamily: FONT, fontSize: 20, color: GREEN, margin: 0 }}>ROTH</p>
            </div>
            {/* Coin in — slightly smaller (tax paid) */}
            <svg width="60" height="60" viewBox="0 0 60 60">
              <circle cx="30" cy="30" r="27" fill="#F59E0B" />
              <text x="30" y="38" fontSize="22" fill={WHITE} textAnchor="middle" fontFamily="Arial Black">$</text>
            </svg>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: '#9CA3AF', margin: 0, textAlign: 'center' }}>goes in after tax</p>
            {/* Arrow */}
            <div style={{ opacity: rightArrow }}>
              <svg width="30" height="36" viewBox="0 0 30 36">
                <line x1="15" y1="2" x2="15" y2="26" stroke={GREEN} strokeWidth="3" strokeLinecap="round" />
                <polyline points="6,19 15,29 24,19" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {/* Output: bigger coin, all yours */}
            <div style={{ opacity: rightOut }}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" fill={GREEN} />
                <text x="40" y="52" fontSize="34" fill={WHITE} textAnchor="middle" fontFamily="Arial Black">$</text>
              </svg>
            </div>
            <p style={{ fontFamily: FONT_BODY, fontSize: 16, color: GREEN, margin: 0, textAlign: 'center' }}>100% tax-free forever</p>
          </div>
        </div>

        <div style={{ opacity: tagIn, transform: `scale(${tagIn})`, background: '#064E3B', borderRadius: 14, padding: '12px 28px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 24, color: GREEN, margin: 0 }}>NO RMDs AT 73 EITHER</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#6EE7B7', margin: '4px 0 0 0' }}>Roth accounts have zero forced withdrawals</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── SCENE 6 — CTA: Roth conversion window 60-72 ──────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 300 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const barIn = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, delay: 30 });
  const greenIn = spring({ frame, fps, config: { damping: 10, stiffness: 100 }, delay: 85 });
  const redIn = spring({ frame, fps, config: { damping: 10, stiffness: 100 }, delay: 130 });
  const ctaIn = spring({ frame, fps, config: { damping: 10, stiffness: 120 }, delay: 175 });
  const checkIn = spring({ frame: Math.max(0, frame - 235), fps, config: { damping: 8, stiffness: 150 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '70px 65px', gap: 0 }}>
        <p style={{ ...headline(38, BLACK), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 4 }}>YOUR CONVERSION</p>
        <p style={{ ...headline(38, GREEN), transform: `translateY(${(1 - titleIn) * 30}px)`, marginBottom: 30 }}>WINDOW</p>

        {/* Age timeline bar */}
        <div style={{ opacity: barIn, width: '100%', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, height: 64, borderRadius: 10, overflow: 'hidden', border: '2px solid #E5E7EB' }}>
            {/* Before 60 — grey */}
            <div style={{ width: '22%', height: '100%', background: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontFamily: FONT, fontSize: 18, color: '#9CA3AF', margin: 0 }}>55–59</p>
            </div>
            {/* 60-72 window — green */}
            <div style={{ width: '52%', height: '100%', background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: greenIn }}>
              <p style={{ fontFamily: FONT, fontSize: 22, color: WHITE, margin: 0 }}>60–72 ✓</p>
            </div>
            {/* 73+ — red */}
            <div style={{ width: '26%', height: '100%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: redIn }}>
              <p style={{ fontFamily: FONT, fontSize: 18, color: WHITE, margin: 0 }}>73+ RMD</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#9CA3AF', margin: 0 }}>too early</p>
            <p style={{ fontFamily: FONT, fontSize: 18, color: GREEN, margin: 0 }}>YOUR WINDOW</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: ACCENT, margin: 0 }}>too late</p>
          </div>
        </div>

        {/* CTA Badge */}
        <div style={{ opacity: ctaIn, transform: `scale(${ctaIn})`, background: BLACK, borderRadius: 18, padding: '20px 44px', marginBottom: 20, textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: 0 }}>CONVERT BEFORE 73</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 20, color: '#AAA', margin: '8px 0 0 0' }}>
            lower bracket now = tax-free forever
          </p>
        </div>

        {/* Checkmark + note */}
        <div style={{ opacity: checkIn, transform: `scale(${checkIn})`, display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="20" fill={GREEN} />
            <polyline points="10,22 18,30 34,14" fill="none" stroke={WHITE} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: '#555', margin: 0 }}>talk to a tax advisor about your bracket</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ── COMPOSITION ───────────────────────────────────────────────────────────────
export default function DAILY() {
  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      <Series>
        <Series.Sequence durationInFrames={300}><Scene1 /></Series.Sequence>
        <Series.Sequence durationInFrames={300}><Scene2 /></Series.Sequence>
        <Series.Sequence durationInFrames={300}><Scene3 /></Series.Sequence>
        <Series.Sequence durationInFrames={300}><Scene4 /></Series.Sequence>
        <Series.Sequence durationInFrames={300}><Scene5 /></Series.Sequence>
        <Series.Sequence durationInFrames={300}><Scene6 /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
