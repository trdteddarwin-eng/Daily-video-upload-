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

  const cardY = interpolate(frame, [0, 20], [200, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const warnScale = interpolate(
    Math.sin((frame / fps) * Math.PI * 2.5),
    [-1, 1],
    [0.9, 1.1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const textOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const hookOpacity = interpolate(frame, [50, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 48,
      }}>
        <div style={{ textAlign: 'center', padding: '0 80px', opacity: textOpacity }}>
          <p style={{ ...headline(68, ACCENT), marginBottom: 8 }}>WAIT.</p>
          <p style={{ ...headline(44, WHITE), marginBottom: 0 }}>YOUR DEBIT CARD</p>
          <p style={{ ...headline(44, WHITE) }}>HAS A DANGEROUS SECRET</p>
        </div>

        <div style={{ position: 'relative', transform: `translateY(${cardY}px)` }}>
          <svg width="460" height="290" viewBox="0 0 460 290">
            <rect x="5" y="5" width="450" height="280" rx="22" fill="#1E293B" stroke={ACCENT} strokeWidth="3" />
            <rect x="5" y="80" width="450" height="52" fill="#0F172A" />
            <rect x="40" y="110" width="58" height="44" rx="8" fill="#F59E0B" />
            <rect x="50" y="118" width="38" height="11" rx="2" fill="#D97706" />
            <rect x="50" y="134" width="38" height="11" rx="2" fill="#D97706" />
            {Array.from({ length: 16 }, (_, i) => {
              const group = Math.floor(i / 4);
              const dot = i % 4;
              return (
                <circle
                  key={`s1-${i}`}
                  cx={130 + group * 90 + dot * 16}
                  cy={190}
                  r={6}
                  fill={WHITE}
                />
              );
            })}
            <text x="230" y="255" textAnchor="middle" fontFamily={FONT} fontSize="28" fill={WHITE} letterSpacing="8">DEBIT</text>
          </svg>

          <div style={{
            position: 'absolute',
            top: -50,
            right: -35,
            transform: `scale(${warnScale})`,
          }}>
            <svg width="80" height="70" viewBox="0 0 80 70">
              <polygon points="40,5 76,66 4,66" fill={ACCENT} />
              <text x="40" y="53" textAnchor="middle" fontSize="30" fontWeight="bold" fill={BG_DARK} fontFamily={FONT}>!</text>
            </svg>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '0 70px', opacity: hookOpacity }}>
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, textAlign: 'center', lineHeight: 1.35, margin: 0 }}>
            IF SOMEONE DRAINS YOUR ACCOUNT
          </p>
          <p style={{ fontFamily: FONT, fontSize: 34, color: WHITE, textAlign: 'center', lineHeight: 1.35, margin: '8px 0 0' }}>
            TONIGHT...
          </p>
          <p style={{ fontFamily: FONT, fontSize: 38, color: ACCENT, textAlign: 'center', fontWeight: 'bold', lineHeight: 1.35, marginTop: 16 }}>
            YOU MIGHT GET NOTHING BACK
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};
// SCENE1_END

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 180, mass: 1 },
  });

  const liabilityAmt = interpolate(frame, [30, 70], [0, 50], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 40,
      }}>
        <div style={{ textAlign: 'center', padding: '0 70px', opacity: textOpacity }}>
          <p style={{ ...headline(48, BLACK), marginBottom: 8 }}>CREDIT CARD</p>
          <p style={{ ...headline(48, '#10B981') }}>PROTECTS YOU</p>
        </div>

        <div style={{ position: 'relative' }}>
          <svg width="460" height="290" viewBox="0 0 460 290">
            <rect x="5" y="5" width="450" height="280" rx="22" fill="#1E3A5F" stroke="#3B82F6" strokeWidth="3" />
            <rect x="5" y="5" width="450" height="80" rx="22" fill="#2D4F7F" />
            <rect x="5" y="60" width="450" height="20" fill="#2D4F7F" />
            <rect x="40" y="100" width="58" height="44" rx="8" fill="#F59E0B" />
            <rect x="50" y="108" width="38" height="11" rx="2" fill="#D97706" />
            <rect x="50" y="123" width="38" height="11" rx="2" fill="#D97706" />
            {Array.from({ length: 16 }, (_, i) => {
              const group = Math.floor(i / 4);
              const dot = i % 4;
              return (
                <circle
                  key={`s2-${i}`}
                  cx={130 + group * 90 + dot * 16}
                  cy={188}
                  r={6}
                  fill="rgba(255,255,255,0.8)"
                />
              );
            })}
            <text x="230" y="255" textAnchor="middle" fontFamily={FONT} fontSize="26" fill="rgba(255,255,255,0.9)" letterSpacing="6">CREDIT</text>
          </svg>
          <div style={{
            position: 'absolute',
            top: -45,
            right: -40,
            transform: `scale(${shieldScale})`,
          }}>
            <svg width="90" height="100" viewBox="0 0 90 100">
              <path d="M45 5 L80 20 L80 56 Q80 84 45 94 Q10 84 10 56 L10 20 Z" fill="#10B981" />
              <path d="M26 50 L38 62 L64 36" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div style={{ textAlign: 'center', opacity: textOpacity }}>
          <p style={{ ...headline(100, '#10B981'), margin: 0 }}>${Math.round(liabilityAmt)}</p>
          <p style={{ ...headline(32, BLACK), marginTop: 6 }}>MAX LIABILITY</p>
          <p style={{ fontFamily: FONT, fontSize: 24, color: '#6B7280', textAlign: 'center', marginTop: 10, letterSpacing: '0.08em' }}>
            FEDERAL LAW · ZERO ON MOST CARDS
          </p>
        </div>

        <div style={{
          backgroundColor: '#E0F7F0',
          borderRadius: 20,
          padding: '24px 50px',
          margin: '0 60px',
          opacity: textOpacity,
        }}>
          <p style={{ fontFamily: FONT, fontSize: 28, color: BLACK, textAlign: 'center', lineHeight: 1.4, margin: 0 }}>
            It&apos;s not your money yet —<br />
            so thieves can&apos;t take it.
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};
// SCENE2_END

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const drainProgress = interpolate(frame, [30, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const stage1 = interpolate(frame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stage2 = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stage3 = interpolate(frame, [110, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const piggyR = Math.round(interpolate(drainProgress, [0, 1], [249, 148]));
  const piggyG = Math.round(interpolate(drainProgress, [0, 1], [115, 163]));
  const piggyB = Math.round(interpolate(drainProgress, [0, 1], [22, 175]));
  const piggyColor = `rgb(${piggyR},${piggyG},${piggyB})`;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 32,
      }}>
        <div style={{ textAlign: 'center', padding: '0 70px', opacity: textOpacity }}>
          <p style={{ ...headline(48, WHITE), marginBottom: 8 }}>DEBIT CARD</p>
          <p style={{ ...headline(48, ACCENT) }}>LIABILITY RULES</p>
        </div>

        <svg width="260" height="220" viewBox="0 0 260 220">
          <path d="M42 108 Q22 120 26 145 Q30 165 46 158" stroke={piggyColor} strokeWidth="8" fill="none" strokeLinecap="round" />
          <ellipse cx="140" cy="130" rx="96" ry="84" fill={piggyColor} />
          <ellipse cx="225" cy="118" rx="44" ry="40" fill={piggyColor} />
          <ellipse cx="218" cy="84" rx="16" ry="20" fill={piggyColor} />
          <ellipse cx="218" cy="84" rx="9" ry="12" fill="#FB923C" />
          <ellipse cx="250" cy="124" rx="20" ry="16" fill="#FB923C" />
          <circle cx="244" cy="119" r="5" fill="#C2410C" />
          <circle cx="256" cy="119" r="5" fill="#C2410C" />
          <circle cx="232" cy="104" r="7" fill={BG_DARK} />
          <circle cx="234" cy="102" r="3" fill={WHITE} />
          <rect x="112" y="48" width="62" height="11" rx="5" fill="#C2410C" />
          <rect x="84" y="198" width="34" height="18" rx="6" fill={piggyColor} />
          <rect x="128" y="198" width="34" height="18" rx="6" fill={piggyColor} />
          <rect x="174" y="198" width="34" height="18" rx="6" fill={piggyColor} />
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 880 }}>
          <div style={{
            opacity: stage1,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            borderRadius: 16,
            padding: '16px 28px',
            border: '2px solid #10B981',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#10B981', flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: FONT, fontSize: 22, color: '#10B981', margin: 0, letterSpacing: '0.08em' }}>WITHIN 2 DAYS</p>
              <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, fontWeight: 'bold' }}>$50 MAX LIABILITY</p>
            </div>
          </div>

          <div style={{
            opacity: stage2,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            backgroundColor: 'rgba(245, 158, 11, 0.12)',
            borderRadius: 16,
            padding: '16px 28px',
            border: '2px solid #F59E0B',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F59E0B', flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: FONT, fontSize: 22, color: '#F59E0B', margin: 0, letterSpacing: '0.08em' }}>2 TO 60 DAYS</p>
              <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, fontWeight: 'bold' }}>$500 LIABILITY</p>
            </div>
          </div>

          <div style={{
            opacity: stage3,
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            borderRadius: 16,
            padding: '16px 28px',
            border: `2px solid ${ACCENT}`,
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: ACCENT, flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: FONT, fontSize: 22, color: ACCENT, margin: 0, letterSpacing: '0.08em' }}>AFTER 60 DAYS</p>
              <p style={{ fontFamily: FONT, fontSize: 30, color: WHITE, margin: 0, fontWeight: 'bold' }}>UNLIMITED LIABILITY</p>
            </div>
          </div>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};
// SCENE3_END

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const textOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const daysRevealed = Math.min(10, Math.floor(interpolate(frame, [15, 115], [0, 10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })));

  const frozenScale = spring({
    frame: frame - 110,
    fps,
    config: { damping: 10, stiffness: 200, mass: 1 },
  });

  const frozenOpacity = interpolate(frame, [110, 128], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 36,
      }}>
        <div style={{ textAlign: 'center', padding: '0 70px', opacity: textOpacity }}>
          <p style={{ ...headline(44, BLACK), marginBottom: 8 }}>EVEN IF YOU REPORT</p>
          <p style={{ ...headline(44, BLACK) }}>IT RIGHT AWAY</p>
        </div>

        <div style={{ position: 'relative' }}>
          <svg width="680" height="440" viewBox="0 0 680 440">
            <rect x="10" y="10" width="660" height="420" rx="24" fill="white" stroke="#E5E7EB" strokeWidth="3" />
            <rect x="10" y="10" width="660" height="75" rx="24" fill={ACCENT} />
            <rect x="10" y="66" width="660" height="19" fill={ACCENT} />
            <text x="340" y="57" textAnchor="middle" fontFamily={FONT} fontSize="28" fill="white" letterSpacing="4">10 BUSINESS DAYS</text>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <text key={`hd-${i}`} x={76 + i * 82} y={116} textAnchor="middle" fontFamily={FONT} fontSize="20" fill="#9CA3AF">{d}</text>
            ))}
            {Array.from({ length: 10 }, (_, idx) => {
              const col = idx % 5;
              const row = Math.floor(idx / 5);
              const cx = 96 + col * 108;
              const cy = 170 + row * 108;
              const isRevealed = idx < daysRevealed;
              return (
                <g key={`day-${idx}`}>
                  <rect
                    x={cx - 40} y={cy - 36} width={80} height={72} rx={12}
                    fill={isRevealed ? ACCENT : '#F3F4F6'}
                    stroke={isRevealed ? ACCENT : '#E5E7EB'}
                    strokeWidth={2}
                  />
                  <text
                    x={cx} y={cy + 10} textAnchor="middle" fontFamily={FONT} fontSize="28"
                    fill={isRevealed ? 'white' : '#9CA3AF'} fontWeight="bold"
                  >{idx + 1}</text>
                </g>
              );
            })}
          </svg>

          <div style={{
            position: 'absolute',
            bottom: -30,
            left: '50%',
            transform: `translateX(-50%) scale(${frozenScale})`,
            opacity: frozenOpacity,
            backgroundColor: '#1E293B',
            borderRadius: 50,
            padding: '14px 48px',
            border: `3px solid ${ACCENT}`,
            whiteSpace: 'nowrap',
          }}>
            <p style={{ fontFamily: FONT, fontSize: 34, color: ACCENT, margin: 0, letterSpacing: '0.12em' }}>
              YOUR CASH: FROZEN
            </p>
          </div>
        </div>

        <div style={{ marginTop: 50, opacity: textOpacity, padding: '0 60px', textAlign: 'center' }}>
          <p style={{ fontFamily: FONT, fontSize: 30, color: '#374151', lineHeight: 1.4, margin: 0 }}>
            Can&apos;t pay rent. Can&apos;t buy groceries.
          </p>
          <p style={{ fontFamily: FONT, fontSize: 32, color: ACCENT, fontWeight: 'bold', marginTop: 10, lineHeight: 1.4 }}>
            That&apos;s your real money — just gone.
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};
// SCENE4_END

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const creditBarH = interpolate(frame, [15, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const debitBarH = interpolate(frame, [60, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const statOpacity = interpolate(frame, [140, 165], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const creditH = creditBarH * 55;
  const debitH = debitBarH * 420;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 24,
      }}>
        <div style={{ textAlign: 'center', padding: '0 70px', opacity: textOpacity }}>
          <p style={{ ...headline(44, WHITE), marginBottom: 8 }}>WHAT YOU&apos;RE</p>
          <p style={{ ...headline(44, ACCENT) }}>ACTUALLY EXPOSED TO</p>
        </div>

        <svg width="880" height="540" viewBox="0 0 880 540">
          <line x1="80" y1="480" x2="800" y2="480" stroke="#374151" strokeWidth="2" />

          <rect x={190} y={480 - creditH} width={160} height={creditH} fill="#10B981" rx={8} />
          {creditBarH > 0.1 && (
            <text x={270} y={Math.max(20, 475 - creditH)} textAnchor="middle" fontFamily={FONT} fontSize="28" fill="#10B981">$50</text>
          )}
          <text x={270} y={510} textAnchor="middle" fontFamily={FONT} fontSize="22" fill="#9CA3AF">CREDIT</text>
          <text x={270} y={530} textAnchor="middle" fontFamily={FONT} fontSize="17" fill="#6B7280">MAX LIABILITY</text>

          <rect x={530} y={480 - debitH} width={160} height={debitH} fill={ACCENT} rx={8} />
          {debitBarH > 0.25 && (
            <text x={610} y={Math.max(20, 475 - debitH)} textAnchor="middle" fontFamily={FONT} fontSize="28" fill={ACCENT}>$4,900</text>
          )}
          <text x={610} y={510} textAnchor="middle" fontFamily={FONT} fontSize="22" fill="#9CA3AF">DEBIT</text>
          <text x={610} y={530} textAnchor="middle" fontFamily={FONT} fontSize="17" fill="#6B7280">AVG FRAUD LOSS</text>
        </svg>

        <div style={{
          opacity: statOpacity,
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          borderRadius: 20,
          padding: '20px 50px',
          margin: '0 60px',
          border: `2px solid ${ACCENT}`,
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: FONT, fontSize: 60, color: ACCENT, margin: 0, lineHeight: 1 }}>65%</p>
          <p style={{ fontFamily: FONT, fontSize: 26, color: WHITE, margin: '10px 0 0', lineHeight: 1.3 }}>
            OF AMERICANS USE DEBIT<br />AS THEIR PRIMARY CARD
          </p>
        </div>

      </AbsoluteFill>
    </FadeScene>
  );
};
// SCENE5_END

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 160, mass: 1 },
  });

  const icon1 = spring({ frame: frame - 50, fps, config: { damping: 12, stiffness: 200, mass: 1 } });
  const icon2 = spring({ frame: frame - 70, fps, config: { damping: 12, stiffness: 200, mass: 1 } });
  const icon3 = spring({ frame: frame - 90, fps, config: { damping: 12, stiffness: 200, mass: 1 } });

  const ctaOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textOpacity = interpolate(frame, [5, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 36,
      }}>
        <div style={{ textAlign: 'center', padding: '0 70px', opacity: textOpacity }}>
          <p style={{ ...headline(44, BLACK), marginBottom: 8 }}>THE FIX IS</p>
          <p style={{ ...headline(54, '#10B981') }}>COMPLETELY FREE</p>
        </div>

        <div style={{ transform: `scale(${cardScale})` }}>
          <svg width="460" height="290" viewBox="0 0 460 290">
            <rect x="5" y="5" width="450" height="280" rx="22" fill="#10B981" />
            <rect x="5" y="5" width="450" height="78" rx="22" fill="#059669" />
            <rect x="5" y="60" width="450" height="18" fill="#059669" />
            <rect x="40" y="100" width="58" height="44" rx="8" fill="#F59E0B" />
            <rect x="50" y="108" width="38" height="11" rx="2" fill="#D97706" />
            <rect x="50" y="123" width="38" height="11" rx="2" fill="#D97706" />
            {Array.from({ length: 16 }, (_, i) => {
              const group = Math.floor(i / 4);
              const dot = i % 4;
              return (
                <circle
                  key={`s6-${i}`}
                  cx={130 + group * 90 + dot * 16}
                  cy={188}
                  r={6}
                  fill="rgba(255,255,255,0.8)"
                />
              );
            })}
            <text x="230" y="255" textAnchor="middle" fontFamily={FONT} fontSize="26" fill="white" letterSpacing="6">CREDIT</text>
            <circle cx="376" cy="62" r="36" fill="white" fillOpacity="0.95" />
            <path d="M358 62 L370 74 L396 48" stroke="#10B981" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div style={{ display: 'flex', gap: 36, padding: '0 60px' }}>
          <div style={{ flex: 1, textAlign: 'center', transform: `scale(${icon1})` }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <path d="M40 5 L70 18 L70 50 Q70 70 40 76 Q10 70 10 50 L10 18 Z" fill="#10B981" />
              <path d="M24 42 L35 52 L57 30" stroke="white" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '10px 0 0', textAlign: 'center', lineHeight: 1.3 }}>FRAUD<br />PROTECTED</p>
          </div>
          <div style={{ flex: 1, textAlign: 'center', transform: `scale(${icon2})` }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <rect x="5" y="5" width="70" height="70" rx="8" fill="#3B82F6" />
              <polyline points="14,54 28,42 44,46 66,22" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="66" cy="22" r="5" fill="white" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '10px 0 0', textAlign: 'center', lineHeight: 1.3 }}>BUILD<br />CREDIT</p>
          </div>
          <div style={{ flex: 1, textAlign: 'center', transform: `scale(${icon3})` }}>
            <svg width="80" height="80" viewBox="0 0 80 80">
              <ellipse cx="40" cy="50" rx="28" ry="22" fill="#F97316" />
              <ellipse cx="62" cy="48" rx="12" ry="10" fill="#FB923C" />
              <circle cx="66" cy="45" r="4" fill="#C2410C" />
              <circle cx="59" cy="45" r="4" fill="#C2410C" />
              <circle cx="52" cy="40" r="4" fill={BG_DARK} />
              <circle cx="54" cy="38" r="1.5" fill={WHITE} />
              <rect x="34" y="30" width="16" height="6" rx="3" fill="#C2410C" />
              <rect x="20" y="66" width="12" height="10" rx="4" fill="#F97316" />
              <rect x="38" y="66" width="12" height="10" rx="4" fill="#F97316" />
              <rect x="56" y="66" width="12" height="10" rx="4" fill="#F97316" />
            </svg>
            <p style={{ fontFamily: FONT, fontSize: 20, color: BLACK, margin: '10px 0 0', textAlign: 'center', lineHeight: 1.3 }}>CASH<br />STAYS SAFE</p>
          </div>
        </div>

        <div style={{ opacity: ctaOpacity, textAlign: 'center', padding: '0 60px' }}>
          <div style={{ backgroundColor: '#10B981', borderRadius: 50, padding: '20px 55px', marginBottom: 20 }}>
            <p style={{ fontFamily: FONT, fontSize: 34, color: 'white', margin: 0, letterSpacing: '0.08em' }}>
              USE CREDIT. PAY IT OFF.
            </p>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 28, color: '#6B7280', margin: 0 }}>
            Follow for more money moves →
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
