import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0F0F0F';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
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
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const slideL = interpolate(frame, [10, 55], [-420, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const slideR = interpolate(frame, [10, 55], [420, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const titleOp = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeOp = interpolate(frame, [85, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const badgeScale = spring({ frame: frame - 85, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px' }}>
        <div style={{ ...headline(54, WHITE), opacity: titleOp, marginBottom: 6, lineHeight: 1.1 }}>
          YOU PAY MORE
        </div>
        <div style={{ ...headline(44, ACCENT), opacity: titleOp, marginBottom: 64, lineHeight: 1.1 }}>
          FOR THE SAME ITEM
        </div>

        <div style={{ display: 'flex', gap: 52, alignItems: 'flex-start' }}>
          {/* iPhone — expensive */}
          <div style={{ transform: `translateX(${slideL}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <svg width="148" height="284" viewBox="0 0 148 284">
              <rect x="4" y="0" width="140" height="280" rx="22" fill="#252525" stroke="#555" strokeWidth="2" />
              <rect x="13" y="18" width="122" height="234" rx="6" fill="#0D0D0D" />
              <rect x="49" y="7" width="50" height="12" rx="6" fill="#1A1A1A" />
              <rect x="17" y="76" width="114" height="92" rx="6" fill="#1C1C3A" />
              <text x="74" y="101" textAnchor="middle" fill="#888" fontFamily="Arial, sans-serif" fontSize="10">HOTEL TONIGHT</text>
              <text x="74" y="133" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black, Arial" fontSize="30" fontWeight="bold">$234</text>
              <text x="74" y="155" textAnchor="middle" fill="#555" fontFamily="Arial, sans-serif" fontSize="9">per night</text>
              <rect x="53" y="262" width="42" height="4" rx="2" fill="#444" />
            </svg>
            <div style={{ color: '#777', fontFamily: FONT, fontSize: 26, letterSpacing: '0.1em' }}>iPHONE</div>
            <div style={{ color: ACCENT, fontFamily: FONT, fontSize: 40, letterSpacing: '0.05em' }}>$234</div>
          </div>

          {/* Android — cheaper */}
          <div style={{ transform: `translateX(${slideR}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <svg width="148" height="284" viewBox="0 0 148 284">
              <rect x="4" y="0" width="140" height="280" rx="12" fill="#252525" stroke="#555" strokeWidth="2" />
              <rect x="13" y="8" width="122" height="254" rx="4" fill="#0D0D0D" />
              <circle cx="74" cy="14" r="5" fill="#333" />
              <rect x="17" y="66" width="114" height="92" rx="6" fill="#1C1C3A" />
              <text x="74" y="91" textAnchor="middle" fill="#888" fontFamily="Arial, sans-serif" fontSize="10">HOTEL TONIGHT</text>
              <text x="74" y="123" textAnchor="middle" fill={GREEN} fontFamily="Arial Black, Arial" fontSize="30" fontWeight="bold">$189</text>
              <text x="74" y="145" textAnchor="middle" fill="#555" fontFamily="Arial, sans-serif" fontSize="9">per night</text>
              <rect x="28" y="256" width="18" height="3" rx="1.5" fill="#444" />
              <circle cx="74" cy="258" r="5" fill="none" stroke="#444" strokeWidth="2" />
              <polygon points="108,255 120,258 108,261" fill="#444" />
            </svg>
            <div style={{ color: '#777', fontFamily: FONT, fontSize: 26, letterSpacing: '0.1em' }}>ANDROID</div>
            <div style={{ color: GREEN, fontFamily: FONT, fontSize: 40, letterSpacing: '0.05em' }}>$189</div>
          </div>
        </div>

        <div style={{
          opacity: badgeOp,
          transform: `scale(${badgeScale})`,
          marginTop: 52,
          background: ACCENT,
          borderRadius: 14,
          padding: '18px 36px',
        }}>
          <div style={{ ...headline(32, WHITE) }}>SAME ROOM. SAME NIGHT.</div>
        </div>
        <div style={{ ...headline(24, '#555'), marginTop: 18, opacity: badgeOp }}>
          100% LEGAL
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const countVal = interpolate(frame, [10, 160], [0, 2500000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const displayCount = Math.floor(countVal);

  const bars = [82, 95, 71, 103, 89, 112, 65, 108, 78, 96];
  const barReveal = interpolate(frame, [30, 130], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const infoOp = interpolate(frame, [145, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 50px' }}>
        <div style={{ ...headline(42, BLACK), opacity: titleOp, marginBottom: 4 }}>AMAZON CHANGES</div>
        <div style={{ ...headline(42, BLACK), opacity: titleOp, marginBottom: 30 }}>ITS PRICES</div>

        <div style={{ background: BLACK, borderRadius: 20, padding: '28px 50px', marginBottom: 10 }}>
          <div style={{ ...headline(74, ACCENT) }}>
            {displayCount.toLocaleString()}
          </div>
        </div>
        <div style={{ ...headline(32, BLACK), marginBottom: 44, opacity: titleOp }}>
          TIMES TODAY
        </div>

        <svg width="660" height="140" viewBox="0 0 660 140">
          {bars.map((h, i) => {
            const idx = Math.max(0, Math.floor(i));
            const barH = h * barReveal;
            const x = idx * 66 + 3;
            const isHigh = h > 95;
            return (
              <rect
                key={idx}
                x={x} y={130 - barH} width={52} height={barH}
                fill={isHigh ? ACCENT : GREEN}
                rx={6}
              />
            );
          })}
          <line x1="0" y1="130" x2="660" y2="130" stroke="#ccc" strokeWidth="2" />
        </svg>
        <div style={{ ...headline(20, '#888'), marginTop: 6, opacity: titleOp }}>
          PRICE HISTORY — ONE SINGLE ITEM
        </div>

        <div style={{
          opacity: infoOp,
          marginTop: 36,
          background: '#E5E7EB',
          borderRadius: 12,
          padding: '16px 28px',
          maxWidth: 760,
        }}>
          <div style={{ fontFamily: FONT, fontSize: 26, color: BLACK, textAlign: 'center', lineHeight: 1.3 }}>
            YOUR DEVICE + HISTORY<br />
            <span style={{ color: ACCENT }}>DETERMINE YOUR PRICE</span>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 25], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const pctSpring = spring({ frame: frame - 20, fps: 30, from: 0, to: 30, config: { damping: 16, stiffness: 60 } });

  const factOp = interpolate(frame, [110, 145], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const factY = interpolate(frame, [110, 145], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 50px' }}>
        <div style={{ ...headline(44, WHITE), opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 10, lineHeight: 1.2 }}>
          MAC + iPHONE USERS
        </div>
        <div style={{ ...headline(38, ACCENT), opacity: titleOp, transform: `translateY(${titleY}px)`, marginBottom: 20, lineHeight: 1.1 }}>
          PAY UP TO
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
          <div style={{ ...headline(170, ACCENT) }}>{Math.round(pctSpring)}</div>
          <div style={{ ...headline(80, ACCENT) }}>%</div>
        </div>
        <div style={{ ...headline(46, WHITE), marginBottom: 52 }}>
          MORE
        </div>

        <div style={{ ...headline(30, '#888'), marginBottom: 36, opacity: titleOp }}>
          ON HOTELS AND FLIGHTS
        </div>

        <div style={{
          opacity: factOp,
          transform: `translateY(${factY}px)`,
          background: '#1C1C1C',
          borderRadius: 14,
          padding: '22px 32px',
          borderLeft: `6px solid ${ACCENT}`,
          maxWidth: 820,
        }}>
          <div style={{ fontFamily: FONT, fontSize: 26, color: WHITE, textAlign: 'left', lineHeight: 1.45, letterSpacing: '0.05em' }}>
            <span style={{ color: ACCENT }}>ORBITZ</span> WAS CAUGHT HIDING<br />
            CHEAPER ROOMS FROM<br />
            APPLE USERS — IN 2012
          </div>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 18, color: '#666', marginTop: 10 }}>
            — Wall Street Journal investigation
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const v1Op = interpolate(frame, [20, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arr1Op = interpolate(frame, [48, 68], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const v2Op = interpolate(frame, [68, 96], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arr2Op = interpolate(frame, [96, 116], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const v3Op = interpolate(frame, [116, 144], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cookieOp = interpolate(frame, [155, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cookieScale = spring({ frame: frame - 155, fps: 30, from: 0, to: 1, config: { damping: 12, stiffness: 100 } });

  const BrowserCard: React.FC<{ visitNum: number; price: string; label: string; op: number }> = ({ visitNum, price, label, op }) => (
    <div style={{ opacity: op, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width="168" height="128" viewBox="0 0 168 128">
        <rect x="0" y="0" width="168" height="128" rx="10" fill="#E9ECEF" stroke="#CBD5E1" strokeWidth="2" />
        <rect x="0" y="0" width="168" height="28" rx="10" fill="#D1D5DB" />
        <rect x="0" y="20" width="168" height="8" fill="#D1D5DB" />
        <circle cx="14" cy="14" r="5" fill="#EF4444" />
        <circle cx="28" cy="14" r="5" fill="#F59E0B" />
        <circle cx="42" cy="14" r="5" fill="#10B981" />
        <rect x="52" y="7" width="102" height="14" rx="4" fill="#F9FAFB" />
        <text x="84" y="72" textAnchor="middle" fill={BLACK} fontFamily="Arial Black, Arial" fontSize="13">VISIT #{visitNum}</text>
        <text x="84" y="106" textAnchor="middle" fill={ACCENT} fontFamily="Arial Black, Arial" fontSize="28" fontWeight="bold">{price}</text>
      </svg>
      <div style={{ fontFamily: FONT, fontSize: 18, color: '#888', letterSpacing: '0.06em' }}>{label}</div>
    </div>
  );

  const ArrowRight: React.FC<{ op: number }> = ({ op }) => (
    <svg width="36" height="28" viewBox="0 0 36 28" style={{ opacity: op, marginTop: -30 }}>
      <polygon points="0,8 26,8 26,0 36,14 26,28 26,20 0,20" fill={ACCENT} />
    </svg>
  );

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 30px' }}>
        <div style={{ ...headline(44, BLACK), opacity: titleOp, marginBottom: 6 }}>
          VISIT 3 TIMES?
        </div>
        <div style={{ ...headline(44, ACCENT), opacity: titleOp, marginBottom: 52 }}>
          YOU GET FLAGGED.
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <BrowserCard visitNum={1} price="$287" label="FIRST LOOK" op={v1Op} />
          <ArrowRight op={arr1Op} />
          <BrowserCard visitNum={2} price="$304" label="CAME BACK" op={v2Op} />
          <ArrowRight op={arr2Op} />
          <BrowserCard visitNum={3} price="$329" label="THEY KNOW" op={v3Op} />
        </div>

        <div style={{
          opacity: cookieOp,
          transform: `scale(${cookieScale})`,
          marginTop: 52,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          background: '#F3F4F6',
          borderRadius: 14,
          padding: '18px 32px',
          border: `2px solid ${ACCENT}`,
        }}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="#FCD34D" opacity="0.6" />
            <circle cx="24" cy="24" r="22" fill="none" stroke={ACCENT} strokeWidth="2.5" />
            <line x1="13" y1="13" x2="35" y2="35" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
            <line x1="35" y1="13" x2="13" y2="35" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div style={{ fontFamily: FONT, fontSize: 26, color: BLACK, lineHeight: 1.3 }}>
            +15% MARKUP FROM<br />
            <span style={{ color: ACCENT }}>YOUR COOKIES</span>
          </div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const item1Scale = spring({ frame: frame - 20, fps: 30, from: 0, to: 1, config: { damping: 14 } });
  const item2Scale = spring({ frame: frame - 60, fps: 30, from: 0, to: 1, config: { damping: 14 } });
  const item3Scale = spring({ frame: frame - 100, fps: 30, from: 0, to: 1, config: { damping: 14 } });

  const savingsOp = interpolate(frame, [148, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const savingsScale = spring({ frame: frame - 148, fps: 30, from: 0.6, to: 1, config: { damping: 12, stiffness: 90 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 50px' }}>
        <div style={{ ...headline(52, WHITE), opacity: titleOp, marginBottom: 6 }}>THE FIX IS</div>
        <div style={{ ...headline(52, GREEN), opacity: titleOp, marginBottom: 56 }}>DEAD SIMPLE</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26, width: '100%', maxWidth: 740 }}>
          {/* Incognito */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 24,
            transform: `scale(${item1Scale})`, opacity: item1Scale,
            background: '#1A1A1A', borderRadius: 14, padding: '18px 24px',
            borderLeft: `6px solid ${GREEN}`,
          }}>
            <svg width="52" height="52" viewBox="0 0 52 52">
              <path d="M10 26 Q26 6 42 26" fill="#2A2A2A" stroke={GREEN} strokeWidth="2.5" />
              <rect x="6" y="24" width="40" height="8" rx="4" fill="#333" stroke={GREEN} strokeWidth="2" />
              <circle cx="17" cy="38" r="8" fill="none" stroke={GREEN} strokeWidth="2.5" />
              <circle cx="35" cy="38" r="8" fill="none" stroke={GREEN} strokeWidth="2.5" />
              <line x1="25" y1="38" x2="27" y2="38" stroke={GREEN} strokeWidth="2" />
            </svg>
            <div style={{ fontFamily: FONT, fontSize: 28, color: WHITE, letterSpacing: '0.05em' }}>
              OPEN INCOGNITO MODE
            </div>
          </div>

          {/* Clear cookies */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 24,
            transform: `scale(${item2Scale})`, opacity: item2Scale,
            background: '#1A1A1A', borderRadius: 14, padding: '18px 24px',
            borderLeft: `6px solid ${GREEN}`,
          }}>
            <svg width="52" height="52" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="22" fill="#92400E" opacity="0.35" />
              <circle cx="26" cy="26" r="22" fill="none" stroke={GREEN} strokeWidth="2.5" />
              <line x1="14" y1="14" x2="38" y2="38" stroke={GREEN} strokeWidth="4" strokeLinecap="round" />
              <line x1="38" y1="14" x2="14" y2="38" stroke={GREEN} strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div style={{ fontFamily: FONT, fontSize: 28, color: WHITE, letterSpacing: '0.05em' }}>
              CLEAR YOUR COOKIES
            </div>
          </div>

          {/* VPN */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 24,
            transform: `scale(${item3Scale})`, opacity: item3Scale,
            background: '#1A1A1A', borderRadius: 14, padding: '18px 24px',
            borderLeft: `6px solid ${GREEN}`,
          }}>
            <svg width="52" height="52" viewBox="0 0 52 52">
              <path d="M26 4 L46 14 L46 30 Q46 42 26 50 Q6 42 6 30 L6 14 Z" fill="none" stroke={GREEN} strokeWidth="2.5" />
              <path d="M26 12 L40 20 L40 30 Q40 38 26 44 Q12 38 12 30 L12 20 Z" fill="#10B98120" />
              <text x="26" y="32" textAnchor="middle" fill={GREEN} fontFamily="Arial Black, Arial" fontSize="13" fontWeight="bold">VPN</text>
            </svg>
            <div style={{ fontFamily: FONT, fontSize: 28, color: WHITE, letterSpacing: '0.05em' }}>
              USE A VPN
            </div>
          </div>
        </div>

        <div style={{
          opacity: savingsOp,
          transform: `scale(${savingsScale})`,
          marginTop: 46,
          background: GREEN,
          borderRadius: 14,
          padding: '18px 40px',
        }}>
          <div style={{ ...headline(38, WHITE) }}>SAVES $200–$800 / YEAR</div>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 25], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  const stat1Op = interpolate(frame, [35, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat2Op = interpolate(frame, [68, 93], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stat3Op = interpolate(frame, [101, 126], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const btnScale = spring({ frame: frame - 145, fps: 30, from: 0, to: 1, config: { damping: 10, stiffness: 90 } });
  const btnOp = interpolate(frame, [145, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 50px' }}>
        <div style={{
          ...headline(52, BLACK),
          opacity: titleOp,
          transform: `translateY(${titleY}px)`,
          marginBottom: 6,
          lineHeight: 1.1,
        }}>
          THE ALGORITHM
        </div>
        <div style={{
          ...headline(52, ACCENT),
          opacity: titleOp,
          transform: `translateY(${titleY}px)`,
          marginBottom: 52,
          lineHeight: 1.1,
        }}>
          KNOWS YOUR HABITS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 760 }}>
          <div style={{ opacity: stat1Op, background: BLACK, borderRadius: 12, padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#888', letterSpacing: '0.05em' }}>DAILY PRICE CHANGES</div>
            <div style={{ fontFamily: FONT, fontSize: 32, color: ACCENT }}>2.5M</div>
          </div>
          <div style={{ opacity: stat2Op, background: BLACK, borderRadius: 12, padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#888', letterSpacing: '0.05em' }}>APPLE USER MARKUP</div>
            <div style={{ fontFamily: FONT, fontSize: 32, color: ACCENT }}>UP TO 30%</div>
          </div>
          <div style={{ opacity: stat3Op, background: BLACK, borderRadius: 12, padding: '18px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: FONT, fontSize: 22, color: '#888', letterSpacing: '0.05em' }}>SAVED W/ INCOGNITO</div>
            <div style={{ fontFamily: FONT, fontSize: 32, color: GREEN }}>$200–$800</div>
          </div>
        </div>

        <div style={{
          transform: `scale(${btnScale})`,
          opacity: btnOp,
          marginTop: 56,
          background: ACCENT,
          borderRadius: 50,
          padding: '22px 74px',
        }}>
          <div style={{ ...headline(46, WHITE) }}>FOLLOW</div>
        </div>
        <div style={{ ...headline(22, '#888'), marginTop: 18, opacity: btnOp }}>
          MORE TRAPS THEY DON'T WANT YOU TO FIND
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
