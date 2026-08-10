import React from 'react';
import {
  AbsoluteFill,
  Series,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

const BG_DARK = '#0D0D14';
const BG_LIGHT = '#F8F7F4';
const ACCENT = '#F59E0B'; // amber — debt urgency
const WHITE = '#F5F5F5';
const BLACK = '#1A1A1A';
const GREEN = '#10B981';
const RED = '#EF4444';
const BLUE = '#3B82F6';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Helvetica Neue", Arial, sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.2,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children,
  bg,
  dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 14, dur - 14, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

const MiniCard: React.FC<{ apr: string; accentColor: string; cardNum: string }> = ({
  apr,
  accentColor,
  cardNum,
}) => (
  <svg width="200" height="126" viewBox="0 0 200 126" style={{ display: 'block' }}>
    <rect x="0" y="0" width="200" height="126" rx="12" fill="#1A1A30" />
    <rect x="0" y="44" width="200" height="28" fill={accentColor} opacity="0.8" />
    <rect x="14" y="50" width="26" height="18" rx="3" fill="#D4A800" />
    <rect x="20" y="56" width="14" height="8" rx="2" fill="#B08800" />
    <line x1="20" y1="60" x2="34" y2="60" stroke="#D4A800" strokeWidth="1.5" />
    <line x1="27" y1="50" x2="27" y2="68" stroke="#D4A800" strokeWidth="1.5" />
    <text x="14" y="98" fontFamily="Arial" fontSize="13" fill="#CCCCCC" letterSpacing="2">
      {'●●●● ' + cardNum}
    </text>
    <text x="14" y="116" fontFamily="Arial Black" fontSize="13" fill={accentColor} letterSpacing="1">
      {apr + ' APR'}
    </text>
  </svg>
);

// ─── SCENE 1: Three cards float in — fatal flaw teaser ────────────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const card1Y = spring({ frame, fps, from: -480, to: 0, config: { damping: 14, stiffness: 80 } });
  const card2Y = spring({
    frame: Math.max(0, frame - 18),
    fps,
    from: -480,
    to: 0,
    config: { damping: 14, stiffness: 80 },
  });
  const card3Y = spring({
    frame: Math.max(0, frame - 36),
    fps,
    from: -480,
    to: 0,
    config: { damping: 14, stiffness: 80 },
  });
  const labelOp = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const flawOp = interpolate(frame, [152, 185], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const flawScale = spring({
    frame: Math.max(0, frame - 152),
    fps,
    config: { damping: 12, stiffness: 130 },
  });

  const cards = [
    { apr: '24.99%', color: RED, num: '4821' },
    { apr: '19.99%', color: ACCENT, num: '7342' },
    { apr: '14.99%', color: BLUE, num: '2156' },
  ];
  const cardYs = [card1Y, card2Y, card3Y];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 64px',
          gap: 28,
        }}
      >
        <p style={{ ...headline(46, WHITE), opacity: titleOp }}>You&apos;ve got multiple debts.</p>
        <p style={{ ...headline(34, '#AAAAAA'), opacity: titleOp }}>
          So you do the smart thing.
        </p>

        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          {cards.map((card, i) => (
            <div key={i} style={{ transform: `translateY(${cardYs[i]}px)` }}>
              <MiniCard apr={card.apr} accentColor={card.color} cardNum={card.num} />
            </div>
          ))}
        </div>

        <p style={{ ...headline(34, ACCENT), opacity: labelOp }}>
          Highest interest first.
        </p>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 24,
            color: '#888888',
            margin: 0,
            textAlign: 'center',
            opacity: labelOp,
          }}
        >
          The avalanche method. Mathematically perfect.
        </p>

        <div
          style={{
            transform: `scale(${flawScale})`,
            opacity: flawOp,
            background: '#1E1000',
            borderRadius: 18,
            padding: '20px 44px',
            borderLeft: `6px solid ${ACCENT}`,
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 28,
              color: WHITE,
              textAlign: 'center',
              margin: 0,
            }}
          >
            But researchers found a fatal flaw.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 2: Avalanche method — ordered cards, "mathematically optimal" ──────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardsX = spring({ frame, fps, from: -600, to: 0, config: { damping: 16, stiffness: 100 } });
  const badgeScale = spring({
    frame: Math.max(0, frame - 105),
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const badgeOp = interpolate(frame, [105, 132], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bottomOp = interpolate(frame, [162, 195], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rows = [
    { apr: '24.99%', color: RED, cardNum: '4821', label: 'ATTACK FIRST', highlighted: true },
    { apr: '19.99%', color: ACCENT, cardNum: '7342', label: 'next', highlighted: false },
    { apr: '14.99%', color: BLUE, cardNum: '2156', label: 'last', highlighted: false },
  ];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 64px',
          gap: 24,
        }}
      >
        <p style={{ ...headline(44, BLACK), opacity: titleOp }}>The Avalanche Method</p>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 26,
            color: '#555555',
            textAlign: 'center',
            margin: 0,
            opacity: titleOp,
          }}
        >
          Attack the highest APR first.
        </p>

        <div
          style={{
            transform: `translateX(${cardsX}px)`,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            width: '100%',
          }}
        >
          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                background: row.highlighted ? '#FFEEEE' : '#F0F0F0',
                border: `3px solid ${row.highlighted ? RED : '#DDDDDD'}`,
                borderRadius: 14,
                padding: '14px 22px',
                opacity: row.highlighted ? 1 : 0.55,
              }}
            >
              <svg width="52" height="32" viewBox="0 0 52 32">
                <rect x="0" y="0" width="52" height="32" rx="5" fill="#1A1A30" />
                <rect x="0" y="11" width="52" height="10" fill={row.color} opacity="0.8" />
                <rect x="4" y="14" width="10" height="6" rx="1" fill="#D4A800" />
              </svg>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: FONT,
                    fontSize: row.highlighted ? 28 : 22,
                    color: row.highlighted ? RED : '#888888',
                    margin: 0,
                  }}
                >
                  {row.apr} APR — {row.label}
                </p>
              </div>
              {row.highlighted && (
                <svg width="28" height="28" viewBox="0 0 28 28">
                  <polygon points="14,4 18,11 26,12 20,18 22,26 14,22 6,26 8,18 2,12 10,11" fill={RED} />
                </svg>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            transform: `scale(${badgeScale})`,
            opacity: badgeOp,
            background: GREEN,
            borderRadius: 16,
            padding: '14px 32px',
          }}
        >
          <p style={{ ...headline(26, WHITE), margin: 0 }}>Saves the most interest — on paper.</p>
        </div>

        <div
          style={{
            opacity: bottomOp,
            background: '#1E0A0A',
            borderRadius: 16,
            padding: '18px 36px',
            borderLeft: `6px solid ${RED}`,
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 26,
              color: WHITE,
              textAlign: 'center',
              margin: 0,
            }}
          >
            But &quot;on paper&quot; isn&apos;t where you live.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 3: Progress bar barely moves — sad person — most people quit ────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const monthCount = Math.floor(
    interpolate(frame, [25, 145], [1, 8], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const progressW = interpolate(frame, [25, 145], [0, 13], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const personOp = interpolate(frame, [55, 88], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const personScale = spring({
    frame: Math.max(0, frame - 55),
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const quitOp = interpolate(frame, [158, 190], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const quitScale = spring({
    frame: Math.max(0, frame - 158),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 64px',
          gap: 28,
        }}
      >
        <p style={{ ...headline(40, WHITE), opacity: titleOp }}>Month after month...</p>

        <div
          style={{
            background: '#1A1A30',
            borderRadius: 20,
            padding: '28px 36px',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 18,
            }}
          >
            <svg width="96" height="60" viewBox="0 0 96 60">
              <rect x="0" y="0" width="96" height="60" rx="8" fill="#222244" />
              <rect x="0" y="20" width="96" height="16" fill={RED} opacity="0.8" />
              <rect x="8" y="24" width="16" height="10" rx="2" fill="#D4A800" />
              <text x="8" y="52" fontFamily="Arial" fontSize="9" fill="#AAAAAA" letterSpacing="1.5">
                {'●●●● 4821'}
              </text>
            </svg>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: FONT_BODY, fontSize: 19, color: '#888888', margin: 0 }}>
                Balance owed:
              </p>
              <p style={{ fontFamily: FONT, fontSize: 40, color: RED, margin: 0 }}>$4,200</p>
            </div>
          </div>

          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 20,
              color: '#888888',
              margin: '0 0 10px',
              textAlign: 'center',
            }}
          >
            Month {monthCount} of paying this card
          </p>

          <div
            style={{
              background: '#333355',
              borderRadius: 8,
              height: 38,
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                background: RED,
                borderRadius: 8,
                height: '100%',
                width: `${progressW}%`,
              }}
            />
            <p
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: FONT,
                fontSize: 18,
                color: '#777777',
                margin: 0,
              }}
            >
              {Math.floor(progressW)}% paid off
            </p>
          </div>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 18,
              color: '#555566',
              textAlign: 'center',
              margin: '8px 0 0',
            }}
          >
            Minimum payments barely dent the principal
          </p>
        </div>

        <div
          style={{
            opacity: personOp,
            transform: `scale(${personScale})`,
          }}
        >
          <svg width="110" height="152" viewBox="0 0 110 152">
            <circle cx="55" cy="26" r="22" fill="#777788" />
            <circle cx="47" cy="22" r="3" fill="#444455" />
            <circle cx="63" cy="22" r="3" fill="#444455" />
            <path
              d="M43,36 Q55,29 67,36"
              stroke="#444455"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <rect x="30" y="54" width="50" height="52" rx="10" fill="#777788" />
            <rect x="8" y="60" width="24" height="11" rx="5" fill="#777788" transform="rotate(20,20,65)" />
            <rect x="78" y="60" width="24" height="11" rx="5" fill="#777788" transform="rotate(-20,90,65)" />
            <rect x="34" y="104" width="14" height="30" rx="7" fill="#777788" />
            <rect x="62" y="104" width="14" height="30" rx="7" fill="#777788" />
          </svg>
        </div>

        <div
          style={{
            transform: `scale(${quitScale})`,
            opacity: quitOp,
            background: '#3A0000',
            border: `3px solid ${RED}`,
            borderRadius: 18,
            padding: '20px 40px',
          }}
        >
          <p style={{ ...headline(36, RED), margin: 0 }}>Most people give up.</p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 22,
              color: '#BBAAAA',
              textAlign: 'center',
              margin: '8px 0 0',
            }}
          >
            And slide right back into debt.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 4: Snowball — smallest balance first, PAID! stamp, rolling payment ──
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardsX = spring({ frame, fps, from: 600, to: 0, config: { damping: 16, stiffness: 90 } });
  const paidScale = spring({
    frame: Math.max(0, frame - 68),
    fps,
    config: { damping: 10, stiffness: 200 },
  });
  const paidOp = interpolate(frame, [68, 92], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arrowOp = interpolate(frame, [118, 148], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const growScale = spring({
    frame: Math.max(0, frame - 158),
    fps,
    config: { damping: 12, stiffness: 110 },
  });
  const growOp = interpolate(frame, [158, 188], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardData = [
    { balance: '$800', label: 'smallest balance', color: GREEN },
    { balance: '$2,400', label: 'medium balance', color: ACCENT },
    { balance: '$4,200', label: 'largest balance', color: RED },
  ];
  const cardNums = ['1122', '3344', '5566'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 64px',
          gap: 22,
        }}
      >
        <p style={{ ...headline(44, BLACK), opacity: titleOp }}>The Snowball Method</p>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 24,
            color: '#555555',
            textAlign: 'center',
            margin: 0,
            opacity: titleOp,
          }}
        >
          Kill the smallest balance first.
        </p>

        <div
          style={{
            transform: `translateX(${cardsX}px)`,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            width: '100%',
          }}
        >
          {cardData.map((card, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                background: i === 0 ? '#EEFFEE' : '#F5F5F5',
                border: `3px solid ${card.color}`,
                borderRadius: 14,
                padding: '14px 22px',
              }}
            >
              <svg width="60" height="38" viewBox="0 0 60 38">
                <rect x="0" y="0" width="60" height="38" rx="5" fill="#1A1A2E" />
                <rect x="0" y="13" width="60" height="10" fill={card.color} opacity="0.8" />
                <rect x="4" y="16" width="10" height="6" rx="1" fill="#D4A800" />
                <text x="4" y="34" fontFamily="Arial" fontSize="8" fill="#AAAAAA">
                  {'●●●● ' + cardNums[i]}
                </text>
              </svg>
              <div style={{ flex: 1 }}>
                <p
                  style={{ fontFamily: FONT_BODY, fontSize: 19, color: '#555555', margin: 0 }}
                >
                  {card.label}
                </p>
                <p style={{ fontFamily: FONT, fontSize: 32, color: card.color, margin: 0 }}>
                  {card.balance}
                </p>
              </div>
              {i === 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 14,
                    transform: `scale(${paidScale}) rotate(-12deg)`,
                    opacity: paidOp,
                    background: GREEN,
                    borderRadius: 10,
                    padding: '8px 18px',
                  }}
                >
                  <p style={{ ...headline(28, WHITE), margin: 0 }}>PAID!</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            opacity: arrowOp,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div style={{ background: GREEN, borderRadius: 12, padding: '12px 20px' }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: WHITE, margin: 0 }}>
              $800 freed
            </p>
          </div>
          <svg width="50" height="30" viewBox="0 0 50 30">
            <line
              x1="4"
              y1="15"
              x2="38"
              y2="15"
              stroke={ACCENT}
              strokeWidth="4"
              strokeLinecap="round"
            />
            <polyline
              points="30,7 42,15 30,23"
              stroke={ACCENT}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ background: ACCENT, borderRadius: 12, padding: '12px 20px' }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: 22, color: WHITE, margin: 0 }}>
              rolls into $2,400
            </p>
          </div>
        </div>

        <div
          style={{
            transform: `scale(${growScale})`,
            opacity: growOp,
            background: BLACK,
            borderRadius: 18,
            padding: '18px 40px',
          }}
        >
          <p style={{ ...headline(30, ACCENT), margin: 0 }}>The payment snowballs.</p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 20,
              color: '#AAAAAA',
              textAlign: 'center',
              margin: '6px 0 0',
            }}
          >
            Each win builds momentum for the next.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 5: Bar chart — Avalanche 86% vs Snowball 100%, +14% badge ──────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const MAX_BAR_H = 240;
  const BASELINE_Y = 350;
  const BAR_W = 160;
  const AVAL_X = 148;
  const SNOW_X = 532;

  const avalancheH = interpolate(frame, [28, 118], [0, Math.round(MAX_BAR_H * 0.86)], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const snowballH = interpolate(frame, [48, 145], [0, MAX_BAR_H], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const badgeOp = interpolate(frame, [150, 185], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sourceOp = interpolate(frame, [178, 212], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const avalanchePct = Math.floor((avalancheH / MAX_BAR_H) * 100);
  const snowballPct = Math.floor((snowballH / MAX_BAR_H) * 100);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 64px',
          gap: 24,
        }}
      >
        <p style={{ ...headline(44, WHITE), opacity: titleOp }}>Harvard tracked real people</p>

        <svg width="840" height="400" viewBox="0 0 840 400">
          <line x1="60" y1={BASELINE_Y} x2="780" y2={BASELINE_Y} stroke="#444466" strokeWidth="2" />

          <rect
            x={AVAL_X}
            y={BASELINE_Y - avalancheH}
            width={BAR_W}
            height={avalancheH}
            rx="8"
            fill="#555577"
          />
          <text
            x={AVAL_X + BAR_W / 2}
            y={BASELINE_Y + 30}
            textAnchor="middle"
            fontFamily="Arial Black"
            fontSize="18"
            fill="#888888"
          >
            AVALANCHE
          </text>
          {avalancheH > 8 && (
            <text
              x={AVAL_X + BAR_W / 2}
              y={BASELINE_Y - avalancheH - 12}
              textAnchor="middle"
              fontFamily="Arial Black"
              fontSize="22"
              fill="#AAAAAA"
            >
              {avalanchePct}%
            </text>
          )}

          <rect
            x={SNOW_X}
            y={BASELINE_Y - snowballH}
            width={BAR_W}
            height={snowballH}
            rx="8"
            fill={ACCENT}
          />
          <text
            x={SNOW_X + BAR_W / 2}
            y={BASELINE_Y + 30}
            textAnchor="middle"
            fontFamily="Arial Black"
            fontSize="18"
            fill={ACCENT}
          >
            SNOWBALL
          </text>
          {snowballH > 8 && (
            <text
              x={SNOW_X + BAR_W / 2}
              y={BASELINE_Y - snowballH - 12}
              textAnchor="middle"
              fontFamily="Arial Black"
              fontSize="22"
              fill={ACCENT}
            >
              {snowballPct}%
            </text>
          )}

          <g
            transform={`translate(${SNOW_X + BAR_W / 2}, ${BASELINE_Y - MAX_BAR_H - 54})`}
            opacity={badgeOp}
          >
            <rect x="-52" y="-22" width="104" height="44" rx="10" fill={ACCENT} />
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fontFamily="Arial Black"
              fontSize="26"
              fill={BLACK}
            >
              +14%
            </text>
          </g>
        </svg>

        <div
          style={{
            opacity: sourceOp,
            background: '#1E1A00',
            borderRadius: 16,
            padding: '16px 36px',
            borderLeft: `6px solid ${ACCENT}`,
          }}
        >
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 24,
              color: WHITE,
              textAlign: 'center',
              margin: 0,
            }}
          >
            Snowball users paid off 14% more total debt.
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 18,
              color: '#888888',
              textAlign: 'center',
              margin: '6px 0 0',
            }}
          >
            Emotional momentum beat every dollar of interest math.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 6: Cards flip paid, person celebrates, follow CTA ─────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const paid1Scale = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const paid1Op = interpolate(frame, [22, 44], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const paid2Scale = spring({
    frame: Math.max(0, frame - 62),
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const paid2Op = interpolate(frame, [62, 84], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const paid3Scale = spring({
    frame: Math.max(0, frame - 108),
    fps,
    config: { damping: 12, stiffness: 160 },
  });
  const paid3Op = interpolate(frame, [108, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const personScale = spring({
    frame: Math.max(0, frame - 128),
    fps,
    config: { damping: 14, stiffness: 80 },
  });
  const personOp = interpolate(frame, [128, 158], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaOp = interpolate(frame, [165, 198], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const paidScales = [paid1Scale, paid2Scale, paid3Scale];
  const paidOps = [paid1Op, paid2Op, paid3Op];
  const balances = ['$800', '$2,400', '$4,200'];
  const cardNums = ['1122', '3344', '5566'];
  const cardColors = [GREEN, ACCENT, RED];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 64px',
          gap: 26,
        }}
      >
        <p style={{ ...headline(44, BLACK), opacity: titleOp }}>Find your first target.</p>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 24,
            color: '#555555',
            textAlign: 'center',
            margin: 0,
            opacity: titleOp,
          }}
        >
          The balance you can wipe out in 90 days.
        </p>

        <div style={{ display: 'flex', gap: 20 }}>
          {balances.map((bal, i) => (
            <div key={i} style={{ position: 'relative', textAlign: 'center' }}>
              <svg width="168" height="106" viewBox="0 0 168 106">
                <rect
                  x="0"
                  y="0"
                  width="168"
                  height="106"
                  rx="10"
                  fill={paidOps[i] > 0.45 ? '#0A2A1A' : '#1A1A2E'}
                />
                <rect
                  x="0"
                  y="38"
                  width="168"
                  height="24"
                  fill={paidOps[i] > 0.45 ? GREEN : cardColors[i]}
                  opacity="0.85"
                />
                <rect x="10" y="44" width="20" height="13" rx="3" fill="#D4A800" />
                <text
                  x="10"
                  y="86"
                  fontFamily="Arial Black"
                  fontSize="16"
                  fill={paidOps[i] > 0.45 ? GREEN : cardColors[i]}
                >
                  {bal}
                </text>
                <text x="10" y="100" fontFamily="Arial" fontSize="9" fill="#888888" letterSpacing="1.5">
                  {'●●●● ' + cardNums[i]}
                </text>
              </svg>
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 6,
                  transform: `scale(${paidScales[i]}) rotate(-14deg)`,
                  opacity: paidOps[i],
                  background: GREEN,
                  borderRadius: 8,
                  padding: '5px 12px',
                }}
              >
                <p style={{ fontFamily: FONT, fontSize: 16, color: WHITE, margin: 0 }}>PAID!</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ opacity: personOp, transform: `scale(${personScale})` }}>
          <svg width="138" height="178" viewBox="0 0 138 178">
            <circle cx="69" cy="28" r="24" fill={GREEN} />
            <circle cx="61" cy="23" r="3" fill="#FFFFFF" />
            <circle cx="77" cy="23" r="3" fill="#FFFFFF" />
            <path
              d="M57,37 Q69,48 81,37"
              stroke="#FFFFFF"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <rect x="42" y="58" width="54" height="54" rx="10" fill={GREEN} />
            <rect x="12" y="36" width="32" height="12" rx="6" fill={GREEN} transform="rotate(-42,28,42)" />
            <rect x="94" y="36" width="32" height="12" rx="6" fill={GREEN} transform="rotate(42,110,42)" />
            <rect x="44" y="110" width="14" height="34" rx="7" fill={GREEN} />
            <rect x="80" y="110" width="14" height="34" rx="7" fill={GREEN} />
          </svg>
        </div>

        <div
          style={{
            opacity: ctaOp,
            background: BLACK,
            borderRadius: 20,
            padding: '22px 44px',
          }}
        >
          <p style={{ ...headline(32, WHITE), margin: 0 }}>Follow for more money traps</p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 20,
              color: '#AAAAAA',
              textAlign: 'center',
              margin: '6px 0 0',
            }}
          >
            nobody explains — not even your bank.
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
        <Series.Sequence durationInFrames={225}>
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene5 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={225}>
          <Scene6 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
