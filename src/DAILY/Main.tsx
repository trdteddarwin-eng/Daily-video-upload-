import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
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

  const carX = interpolate(frame, [0, 45], [-350, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const cashVal = interpolate(frame, [55, 185], [0, 4824], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dealerScale = spring({ frame: frame - 55, fps, config: { damping: 12, stiffness: 100 } });

  const subOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <div style={{ ...headline(50, ACCENT), marginBottom: 36, opacity: titleOpacity }}>
          THE HIDDEN KICKBACK
        </div>

        {/* Car SVG */}
        <div style={{ transform: `translateX(${carX}px)` }}>
          <svg width="520" height="200" viewBox="0 0 520 200">
            {/* Body */}
            <rect x="60" y="110" width="400" height="70" rx="16" fill="#2a2a2a" stroke={ACCENT} strokeWidth="3" />
            {/* Roof */}
            <path d="M 120 110 L 165 58 L 355 58 L 400 110 Z" fill="#333" stroke={ACCENT} strokeWidth="3" />
            {/* Windows */}
            <path d="M 170 105 L 198 68 L 248 68 L 248 105 Z" fill="#1a5f9e" opacity="0.8" />
            <path d="M 254 105 L 254 68 L 348 68 L 374 105 Z" fill="#1a5f9e" opacity="0.8" />
            {/* Wheels */}
            <circle cx="155" cy="183" r="32" fill="#1a1a1a" stroke={ACCENT} strokeWidth="4" />
            <circle cx="155" cy="183" r="14" fill="#2a2a2a" />
            <circle cx="365" cy="183" r="32" fill="#1a1a1a" stroke={ACCENT} strokeWidth="4" />
            <circle cx="365" cy="183" r="14" fill="#2a2a2a" />
            {/* Headlights */}
            <rect x="54" y="122" width="22" height="12" rx="4" fill={ACCENT} />
            <rect x="444" y="122" width="22" height="12" rx="4" fill="#ef4444" />
          </svg>
        </div>

        {/* Finance Office sign */}
        <div
          style={{
            marginTop: 20,
            background: '#1c1c1c',
            border: `2px solid ${ACCENT}`,
            borderRadius: 14,
            padding: '14px 44px',
            transform: `scale(${dealerScale})`,
            transformOrigin: 'center',
          }}
        >
          <div style={{ ...headline(40, WHITE) }}>FINANCE OFFICE</div>
        </div>

        {/* Counter */}
        <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ ...headline(28, '#888') }}>DEALER BONUS:</div>
          <div style={{ ...headline(58, ACCENT) }}>${Math.floor(cashVal).toLocaleString()}</div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 28,
            fontFamily: FONT,
            fontSize: 26,
            color: '#aaa',
            textAlign: 'center',
            lineHeight: 1.5,
            opacity: subOpacity,
          }}
        >
          Paid from your loan the day<br />you drove home
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrow1W = interpolate(frame, [20, 65], [0, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arrow2W = interpolate(frame, [65, 110], [0, 160], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label1Op = interpolate(frame, [55, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const label2Op = interpolate(frame, [95, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: frame - 135, fps, config: { damping: 10, stiffness: 80 } });
  const badgeOp = interpolate(frame, [135, 155], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <div style={{ ...headline(46, BLACK), marginBottom: 56, opacity: titleOpacity }}>HOW IT WORKS</div>

        {/* Flow: Bank → Dealer → Buyer */}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
          {/* Bank */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg width="100" height="96" viewBox="0 0 100 96">
              <rect x="10" y="44" width="80" height="46" fill="#1a5fa0" />
              <rect x="5" y="38" width="90" height="10" fill="#144d85" />
              <polygon points="50,4 5,38 95,38" fill="#0d3d6b" />
              <rect x="19" y="50" width="10" height="36" fill="#fff" opacity="0.35" />
              <rect x="45" y="50" width="10" height="36" fill="#fff" opacity="0.35" />
              <rect x="71" y="50" width="10" height="36" fill="#fff" opacity="0.35" />
            </svg>
            <div style={{ ...headline(22, BLACK) }}>LENDER</div>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#1a5fa0', fontWeight: 700 }}>5.5% RATE</div>
          </div>

          {/* Arrow 1 */}
          <div style={{ position: 'relative', width: 160, height: 36, flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, height: 4, background: ACCENT, width: arrow1W, transform: 'translateY(-50%)' }} />
            {arrow1W > 140 && <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', color: ACCENT, fontSize: 26 }}>▶</div>}
          </div>

          {/* Dealer */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg width="100" height="96" viewBox="0 0 100 96">
              <circle cx="50" cy="24" r="20" fill="#333" />
              <path d="M 18 96 Q 18 58 50 58 Q 82 58 82 96 Z" fill="#333" />
              <polygon points="50,58 44,76 50,92 56,76" fill={ACCENT} />
            </svg>
            <div style={{ ...headline(22, BLACK) }}>DEALER</div>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#e53e3e', fontWeight: 700 }}>8.0% RATE</div>
          </div>

          {/* Arrow 2 */}
          <div style={{ position: 'relative', width: 160, height: 36, flexShrink: 0 }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, height: 4, background: '#e53e3e', width: arrow2W, transform: 'translateY(-50%)' }} />
            {arrow2W > 140 && <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', color: '#e53e3e', fontSize: 26 }}>▶</div>}
          </div>

          {/* Buyer */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <svg width="100" height="96" viewBox="0 0 100 96">
              <circle cx="50" cy="24" r="20" fill="#666" />
              <path d="M 18 96 Q 18 58 50 58 Q 82 58 82 96 Z" fill="#666" />
              <rect x="34" y="65" width="32" height="20" rx="5" fill="#999" />
            </svg>
            <div style={{ ...headline(22, BLACK) }}>YOU</div>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#e53e3e', fontWeight: 700 }}>PAY 8.0%</div>
          </div>
        </div>

        {/* Rate labels */}
        <div style={{ marginTop: 28, opacity: label1Op }}>
          <div style={{ fontFamily: FONT, fontSize: 26, color: '#444', textAlign: 'center' }}>
            Lender charges dealer: <strong>5.5%</strong>
          </div>
        </div>
        <div style={{ marginTop: 8, opacity: label2Op }}>
          <div style={{ fontFamily: FONT, fontSize: 26, color: '#444', textAlign: 'center' }}>
            Dealer charges you: <strong style={{ color: '#e53e3e' }}>8.0%</strong>
          </div>
        </div>

        {/* Badge */}
        <div
          style={{
            marginTop: 36,
            opacity: badgeOp,
            transform: `scale(${badgeScale})`,
            background: ACCENT,
            borderRadius: 16,
            padding: '16px 40px',
          }}
        >
          <div style={{ ...headline(32, BLACK) }}>DEALER KEEPS 2.5% — LEGALLY</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = interpolate(frame, [20, 75], [0, 260], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2H = interpolate(frame, [35, 95], [0, 380], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const extraCost = interpolate(frame, [100, 185], [0, 4824], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const countBadgeScale = spring({ frame: frame - 145, fps, config: { damping: 12, stiffness: 90 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <div style={{ ...headline(44, ACCENT), marginBottom: 12, opacity: titleOpacity }}>THE REAL COST</div>
        <div style={{ fontFamily: FONT, fontSize: 24, color: '#aaa', textAlign: 'center', marginBottom: 36 }}>
          $35,000 car · 5-year loan · 2.5% dealer markup
        </div>

        {/* Bar comparison */}
        <div style={{ display: 'flex', gap: 64, alignItems: 'flex-end', height: 400 }}>
          {/* Credit union bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#10b981', textAlign: 'center', opacity: labelOp }}>CREDIT<br />UNION</div>
            <div
              style={{
                width: 160,
                height: bar1H,
                background: '#10b981',
                borderRadius: '8px 8px 0 0',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: 10,
              }}
            >
              {bar1H > 50 && <div style={{ ...headline(24, WHITE) }}>$40,419</div>}
            </div>
            <div style={{ fontFamily: FONT, fontSize: 20, color: '#10b981' }}>5.5% rate</div>
          </div>

          {/* Dealer bar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#ef4444', textAlign: 'center', opacity: labelOp }}>DEALER<br />FINANCED</div>
            <div style={{ position: 'relative', width: 160, height: bar2H, background: '#ef4444', borderRadius: '8px 8px 0 0' }}>
              {bar2H > 60 && (
                <div style={{ position: 'absolute', top: 10, left: 0, right: 0, textAlign: 'center', ...headline(24, WHITE) }}>$45,243</div>
              )}
              {bar2H > 120 && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 110,
                    background: ACCENT,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <div style={{ ...headline(20, BLACK) }}>+$4,824</div>
                  <div style={{ ...headline(18, BLACK) }}>EXTRA</div>
                </div>
              )}
            </div>
            <div style={{ fontFamily: FONT, fontSize: 20, color: '#ef4444' }}>8.0% rate</div>
          </div>
        </div>

        {/* Counter badge */}
        <div style={{ marginTop: 40, transform: `scale(${countBadgeScale})`, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ ...headline(32, WHITE) }}>YOU OVERPAY:</div>
          <div style={{ ...headline(62, ACCENT) }}>${Math.floor(extraCost).toLocaleString()}</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barW = interpolate(frame, [20, 100], [0, 85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const carCount = Math.max(0, Math.floor(interpolate(frame, [30, 125], [0, 10], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })));
  const billions = interpolate(frame, [100, 185], [0, 14], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOp = interpolate(frame, [100, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <div style={{ ...headline(46, BLACK), marginBottom: 10, opacity: titleOpacity }}>THE SCALE</div>
        <div style={{ fontFamily: FONT, fontSize: 26, color: '#555', marginBottom: 44, textAlign: 'center' }}>
          This isn't rare — it's the standard.
        </div>

        {/* 85% bar */}
        <div style={{ width: '100%', marginBottom: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontFamily: FONT, fontSize: 26, color: BLACK }}>New cars financed at dealer</div>
            <div style={{ fontFamily: FONT, fontSize: 26, color: ACCENT, fontWeight: 700 }}>{Math.floor(barW)}%</div>
          </div>
          <div style={{ height: 42, background: '#ddd', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${barW}%`, background: ACCENT, borderRadius: 8 }} />
          </div>
        </div>

        {/* Car icons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 28 }}>
          {Array.from({ length: Math.max(0, Math.floor(carCount)) }).map((_, i) => (
            <svg key={i} width="74" height="46" viewBox="0 0 74 46">
              <rect x="6" y="22" width="62" height="17" rx="5" fill={i < 8 ? ACCENT : '#bbb'} />
              <path d="M 16 22 L 22 8 L 52 8 L 58 22 Z" fill={i < 8 ? '#d97706' : '#aaa'} />
              <circle cx="20" cy="41" r="6" fill={i < 8 ? BLACK : '#888'} />
              <circle cx="54" cy="41" r="6" fill={i < 8 ? BLACK : '#888'} />
            </svg>
          ))}
        </div>

        {/* 8 of 10 label */}
        <div style={{ fontFamily: FONT, fontSize: 24, color: '#555', textAlign: 'center', marginBottom: 28 }}>
          8 out of 10 cars = dealer-financed <span style={{ color: ACCENT }}>↑</span>
        </div>

        {/* Billions badge */}
        <div style={{ background: BLACK, borderRadius: 16, padding: '22px 48px', opacity: badgeOp }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, justifyContent: 'center' }}>
            <div style={{ ...headline(62, ACCENT) }}>${billions.toFixed(1)}B</div>
            <div style={{ ...headline(28, WHITE) }}>/ YEAR</div>
          </div>
          <div style={{ fontFamily: FONT, fontSize: 22, color: '#aaa', textAlign: 'center', marginTop: 8 }}>
            dealer reserve extracted from Americans
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step1Scale = spring({ frame: frame - 20, fps, config: { damping: 14, stiffness: 100 } });
  const step2Scale = spring({ frame: frame - 70, fps, config: { damping: 14, stiffness: 100 } });
  const step3Scale = spring({ frame: frame - 120, fps, config: { damping: 14, stiffness: 100 } });
  const badgeOp = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const stepStyle = (scale: number): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 24,
    marginBottom: 28,
    transform: `scale(${scale})`,
    transformOrigin: 'left center',
    width: '100%',
  });

  const numStyle: React.CSSProperties = {
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: ACCENT,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <div style={{ ...headline(48, ACCENT), marginBottom: 44, opacity: titleOpacity }}>THE FIX</div>

        <div style={stepStyle(step1Scale)}>
          <div style={numStyle}><div style={{ ...headline(30, BLACK) }}>1</div></div>
          <div>
            <div style={{ ...headline(28, WHITE) }}>Visit a credit union FIRST</div>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#aaa', marginTop: 6 }}>Get pre-approved before stepping on the lot</div>
          </div>
        </div>

        <div style={stepStyle(step2Scale)}>
          <div style={numStyle}><div style={{ ...headline(30, BLACK) }}>2</div></div>
          <div>
            <div style={{ ...headline(28, WHITE) }}>Negotiate price — not payment</div>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#aaa', marginTop: 6 }}>Get the total out-the-door price in writing</div>
          </div>
        </div>

        <div style={stepStyle(step3Scale)}>
          <div style={numStyle}><div style={{ ...headline(30, BLACK) }}>3</div></div>
          <div>
            <div style={{ ...headline(28, WHITE) }}>Let the dealer beat your rate</div>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#aaa', marginTop: 6 }}>They rarely can — use yours and save $4,800</div>
          </div>
        </div>

        <div style={{ background: '#10b981', borderRadius: 16, padding: '16px 40px', opacity: badgeOp }}>
          <div style={{ ...headline(26, WHITE) }}>CREDIT UNIONS AVG 1.9% LOWER THAN DEALERS</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const piggyScale = spring({ frame: frame - 15, fps, config: { damping: 10, stiffness: 70 } });
  const savings = interpolate(frame, [60, 165], [0, 4824], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [145, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = interpolate(
    frame,
    [155, 170, 185, 200, 215],
    [1, 1.055, 1, 1.055, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <div style={{ ...headline(50, BLACK), marginBottom: 36, opacity: titleOpacity }}>YOUR MOVE</div>

        {/* Piggy bank */}
        <div style={{ transform: `scale(${piggyScale})`, marginBottom: 28 }}>
          <svg width="200" height="190" viewBox="0 0 200 190">
            {/* Body */}
            <ellipse cx="108" cy="118" rx="76" ry="64" fill="#f9a8d4" />
            {/* Head */}
            <circle cx="46" cy="98" r="40" fill="#f9a8d4" />
            {/* Snout */}
            <ellipse cx="20" cy="106" rx="17" ry="12" fill="#f472b6" />
            <circle cx="14" cy="106" r="4" fill="#9d174d" />
            <circle cx="26" cy="106" r="4" fill="#9d174d" />
            {/* Eye */}
            <circle cx="40" cy="84" r="6" fill="#1a1a1a" />
            <circle cx="42" cy="82" r="2" fill={WHITE} />
            {/* Ear */}
            <ellipse cx="58" cy="63" rx="12" ry="16" fill="#f472b6" transform="rotate(-20 58 63)" />
            {/* Coin slot */}
            <rect x="90" y="54" width="30" height="6" rx="3" fill="#9d174d" />
            {/* Legs */}
            <rect x="76" y="168" width="20" height="22" rx="8" fill="#f472b6" />
            <rect x="106" y="168" width="20" height="22" rx="8" fill="#f472b6" />
            <rect x="136" y="168" width="20" height="22" rx="8" fill="#f472b6" />
            {/* Tail */}
            <path d="M 182 118 Q 202 106 198 128 Q 194 148 182 138" stroke="#f472b6" strokeWidth="6" fill="none" />
            {/* Shield */}
            <path d="M 152 82 L 184 82 L 184 108 Q 184 124 168 132 Q 152 124 152 108 Z" fill={ACCENT} />
            <path d="M 161 104 L 167 111 L 177 96" stroke={WHITE} strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Savings counter */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: FONT, fontSize: 26, color: '#555', marginBottom: 6 }}>
            10-minute credit union check = save
          </div>
          <div style={{ ...headline(82, ACCENT) }}>${Math.floor(savings).toLocaleString()}</div>
        </div>

        {/* CTA button */}
        <div style={{ opacity: ctaOp, transform: `scale(${ctaScale})` }}>
          <div
            style={{
              background: BLACK,
              borderRadius: 20,
              padding: '20px 56px',
              border: `3px solid ${ACCENT}`,
            }}
          >
            <div style={{ ...headline(32, WHITE) }}>CHECK YOUR CREDIT UNION RATE</div>
            <div style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, textAlign: 'center', marginTop: 10 }}>
              Before your next car purchase →
            </div>
          </div>
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
