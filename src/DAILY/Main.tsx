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
const ACCENT = '#EF4444';
const WHITE = '#F5F5F5';
const BLACK = '#1A1A1A';
const GREEN = '#10B981';
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

const DebitCardSVG: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <svg
    width={340 * scale}
    height={215 * scale}
    viewBox="0 0 340 215"
    style={{ display: 'block' }}
  >
    <rect x="0" y="0" width="340" height="215" rx="18" fill="#1C1C38" />
    <rect x="0" y="72" width="340" height="52" fill="#EF4444" opacity="0.85" />
    <rect x="28" y="86" width="44" height="36" rx="6" fill="#D4A800" />
    <rect x="37" y="94" width="27" height="20" rx="3" fill="#B08800" />
    <line x1="37" y1="104" x2="64" y2="104" stroke="#D4A800" strokeWidth="2" />
    <line x1="50" y1="94" x2="50" y2="114" stroke="#D4A800" strokeWidth="2" />
    <text x="28" y="158" fontFamily="Arial" fontSize="21" fill="#CCCCCC" letterSpacing="3">
      {'●●●●  4821'}
    </text>
    <text x="28" y="196" fontFamily="Arial Black" fontSize="17" fill="#FFFFFF" letterSpacing="4">
      DEBIT
    </text>
    <circle cx="296" cy="188" r="17" fill="#CC2222" opacity="0.9" />
    <circle cx="316" cy="188" r="17" fill="#FF7700" opacity="0.85" />
  </svg>
);

const CreditCardSVG: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <svg
    width={340 * scale}
    height={215 * scale}
    viewBox="0 0 340 215"
    style={{ display: 'block' }}
  >
    <rect x="0" y="0" width="340" height="215" rx="18" fill="#0A2A1A" />
    <rect x="0" y="72" width="340" height="52" fill="#10B981" opacity="0.85" />
    <rect x="28" y="86" width="44" height="36" rx="6" fill="#D4A800" />
    <rect x="37" y="94" width="27" height="20" rx="3" fill="#B08800" />
    <line x1="37" y1="104" x2="64" y2="104" stroke="#D4A800" strokeWidth="2" />
    <line x1="50" y1="94" x2="50" y2="114" stroke="#D4A800" strokeWidth="2" />
    <text x="28" y="158" fontFamily="Arial" fontSize="21" fill="#CCCCCC" letterSpacing="3">
      {'●●●●  7742'}
    </text>
    <text x="28" y="196" fontFamily="Arial Black" fontSize="17" fill="#FFFFFF" letterSpacing="4">
      CREDIT
    </text>
    <circle cx="296" cy="188" r="17" fill="#0D9966" opacity="0.9" />
    <circle cx="316" cy="188" r="17" fill="#0A7A50" opacity="0.85" />
  </svg>
);

// ─── SCENE 1: Debit card slides in → "Your bank has a secret" ─────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const topOp = interpolate(frame, [8, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardY = spring({ frame, fps, from: 500, to: 0, config: { damping: 16, stiffness: 90 } });
  const warnScale = spring({
    frame: Math.max(0, frame - 110),
    fps,
    config: { damping: 14, stiffness: 130 },
  });
  const warnOp = interpolate(frame, [110, 135], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
        }}
      >
        <p style={{ ...headline(46, WHITE), opacity: topOp, marginBottom: 8 }}>
          You use your
        </p>
        <p style={{ ...headline(62, ACCENT), opacity: topOp, marginBottom: 36 }}>
          debit card
        </p>
        <p style={{ ...headline(34, '#888888'), opacity: topOp, marginBottom: 44 }}>
          for everything
        </p>

        <div style={{ transform: `translateY(${cardY}px)`, marginBottom: 44 }}>
          <DebitCardSVG scale={1.3} />
        </div>

        <p style={{ ...headline(30, '#666666'), opacity: topOp, marginBottom: 44 }}>
          Groceries. Gas. Amazon.
        </p>

        <div
          style={{
            opacity: warnOp,
            transform: `scale(${warnScale})`,
            background: ACCENT,
            borderRadius: 20,
            padding: '22px 48px',
          }}
        >
          <p style={{ ...headline(38, WHITE), margin: 0 }}>
            Your bank has a secret
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 2: Credit vs Debit — side-by-side law comparison ───────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const creditX = spring({ frame, fps, from: -600, to: 0, config: { damping: 16, stiffness: 100 } });
  const debitX = spring({
    frame: Math.max(0, frame - 15),
    fps,
    from: 600,
    to: 0,
    config: { damping: 16, stiffness: 100 },
  });
  const labelOp = interpolate(frame, [80, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const badgeScale = spring({
    frame: Math.max(0, frame - 120),
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 48px',
          gap: 36,
        }}
      >
        <p style={{ ...headline(44, BLACK), opacity: titleOp }}>
          Federal law says:
        </p>

        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
          {/* Credit side */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              transform: `translateX(${creditX}px)`,
            }}
          >
            <CreditCardSVG scale={0.88} />
            <div
              style={{
                background: GREEN,
                borderRadius: 14,
                padding: '16px 30px',
                opacity: labelOp,
                textAlign: 'center',
              }}
            >
              <p style={{ ...headline(46, WHITE), margin: 0 }}>$0</p>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 21,
                  color: WHITE,
                  textAlign: 'center',
                  margin: '4px 0 0',
                }}
              >
                max fraud liability
              </p>
            </div>
          </div>

          {/* Debit side */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              transform: `translateX(${debitX}px)`,
            }}
          >
            <DebitCardSVG scale={0.88} />
            <div
              style={{
                background: ACCENT,
                borderRadius: 14,
                padding: '16px 30px',
                opacity: labelOp,
                textAlign: 'center',
              }}
            >
              <p style={{ ...headline(46, WHITE), margin: 0 }}>$500+</p>
              <p
                style={{
                  fontFamily: FONT_BODY,
                  fontSize: 21,
                  color: WHITE,
                  textAlign: 'center',
                  margin: '4px 0 0',
                }}
              >
                you could lose
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            transform: `scale(${badgeScale})`,
            background: BLACK,
            borderRadius: 18,
            padding: '20px 40px',
            borderLeft: `6px solid ${ACCENT}`,
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
            These aren&apos;t the same law — not even close.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 3: Fraud reporting timeline — day 2, day 60, after 60 ──────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const greenW = interpolate(frame, [25, 80], [0, 175], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const yellowW = interpolate(frame, [80, 140], [0, 335], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const redW = interpolate(frame, [140, 190], [0, 350], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const label1Op = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const label2Op = interpolate(frame, [100, 130], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const label3Op = interpolate(frame, [150, 180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bottomOp = interpolate(frame, [180, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const SX = 40;
  const D2X = 215;
  const D60X = 550;
  const EX = 900;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
          gap: 40,
        }}
      >
        <p style={{ ...headline(44, WHITE), opacity: titleOp }}>
          Debit fraud deadline
        </p>

        <svg width="960" height="320" viewBox="0 0 960 320">
          {/* Base track */}
          <rect x={SX} y="132" width="860" height="12" rx="6" fill="#333344" />
          {/* Green fill — day 0 to day 2 */}
          <rect x={SX} y="132" width={Math.min(greenW, D2X - SX)} height="12" rx="6" fill={GREEN} />
          {/* Yellow fill — day 2 to day 60 */}
          <rect x={D2X} y="132" width={Math.min(yellowW, D60X - D2X)} height="12" fill="#F59E0B" />
          {/* Red fill — day 60+ */}
          <rect x={D60X} y="132" width={Math.min(redW, EX - D60X)} height="12" fill={ACCENT} />

          {/* Day 0 marker */}
          <circle cx={SX} cy="138" r="12" fill="#555566" />
          <text x={SX} y="100" textAnchor="middle" fontFamily="Arial Black" fontSize="18" fill="#888888">
            DAY 0
          </text>
          <text x={SX} y="116" textAnchor="middle" fontFamily="Arial" fontSize="14" fill="#666666">
            fraud hits
          </text>

          {/* Day 2 marker + labels */}
          <circle cx={D2X} cy="138" r="12" fill={GREEN} opacity={label1Op} />
          <text x={D2X} y="100" textAnchor="middle" fontFamily="Arial Black" fontSize="18" fill={GREEN} opacity={label1Op}>
            2 DAYS
          </text>
          <text x={D2X} y="116" textAnchor="middle" fontFamily="Arial" fontSize="14" fill={GREEN} opacity={label1Op}>
            report by here
          </text>
          <text x={D2X} y="190" textAnchor="middle" fontFamily="Arial Black" fontSize="38" fill={GREEN} opacity={label1Op}>
            $50
          </text>
          <text x={D2X} y="215" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="#888888" opacity={label1Op}>
            MAX LOSS
          </text>

          {/* Day 60 marker + labels */}
          <circle cx={D60X} cy="138" r="12" fill="#F59E0B" opacity={label2Op} />
          <text x={D60X} y="100" textAnchor="middle" fontFamily="Arial Black" fontSize="18" fill="#F59E0B" opacity={label2Op}>
            60 DAYS
          </text>
          <text x={D60X} y="116" textAnchor="middle" fontFamily="Arial" fontSize="14" fill="#F59E0B" opacity={label2Op}>
            last chance
          </text>
          <text x={D60X} y="190" textAnchor="middle" fontFamily="Arial Black" fontSize="38" fill="#F59E0B" opacity={label2Op}>
            $500
          </text>
          <text x={D60X} y="215" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="#888888" opacity={label2Op}>
            MAX LOSS
          </text>

          {/* 60+ endpoint */}
          <circle cx={EX} cy="138" r="12" fill={ACCENT} opacity={label3Op} />
          <text x={EX} y="100" textAnchor="middle" fontFamily="Arial Black" fontSize="18" fill={ACCENT} opacity={label3Op}>
            60+ DAYS
          </text>
          <text x={EX} y="116" textAnchor="middle" fontFamily="Arial" fontSize="14" fill={ACCENT} opacity={label3Op}>
            too late
          </text>
          <text x={EX} y="190" textAnchor="middle" fontFamily="Arial Black" fontSize="38" fill={ACCENT} opacity={label3Op}>
            ALL GONE
          </text>
          <text x={EX} y="215" textAnchor="middle" fontFamily="Arial" fontSize="16" fill="#888888" opacity={label3Op}>
            UNLIMITED LOSS
          </text>
        </svg>

        <div
          style={{
            background: '#1E0A0A',
            borderRadius: 16,
            padding: '18px 40px',
            borderLeft: `6px solid ${ACCENT}`,
            opacity: bottomOp,
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
            Miss 60 days — your bank keeps every penny.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 4: Frozen bank account — 10-day investigation wait ─────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bankY = spring({ frame, fps, from: 300, to: 0, config: { damping: 14, stiffness: 90 } });
  const frozenScale = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: { damping: 12, stiffness: 180 },
  });
  const frozenOp = interpolate(frame, [60, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dayCount = Math.floor(
    interpolate(frame, [100, 185], [1, 10], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const billsOp = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const billLabels = ['RENT', 'FOOD', 'UTILITIES'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 64px',
          gap: 32,
        }}
      >
        <p style={{ ...headline(44, BLACK), opacity: titleOp }}>
          Your bank investigates.
        </p>
        <p style={{ ...headline(36, '#555555'), opacity: titleOp }}>
          Your money? Gone.
        </p>

        {/* Bank building with FROZEN overlay */}
        <div style={{ position: 'relative', transform: `translateY(${bankY}px)` }}>
          <svg width="260" height="210" viewBox="0 0 260 210">
            <rect x="30" y="60" width="200" height="142" fill="#CCCCDD" />
            <polygon points="10,60 130,10 250,60" fill="#AAAACC" />
            <rect x="50" y="72" width="18" height="122" fill="#EEEEEE" />
            <rect x="88" y="72" width="18" height="122" fill="#EEEEEE" />
            <rect x="154" y="72" width="18" height="122" fill="#EEEEEE" />
            <rect x="192" y="72" width="18" height="122" fill="#EEEEEE" />
            <rect x="106" y="150" width="48" height="52" rx="4" fill="#7777AA" />
            <text x="130" y="42" textAnchor="middle" fontFamily="Arial Black" fontSize="14" fill="#FFFFFF">
              BANK
            </text>
          </svg>
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${frozenScale})`,
              background: '#1144AA',
              borderRadius: 12,
              padding: '10px 22px',
              opacity: frozenOp,
              whiteSpace: 'nowrap',
            }}
          >
            <p style={{ ...headline(32, WHITE), margin: 0 }}>FROZEN</p>
          </div>
        </div>

        {/* Calendar day counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <rect x="0" y="8" width="80" height="72" rx="10" fill={BLACK} />
            <rect x="0" y="8" width="80" height="24" rx="10" fill={ACCENT} />
            <rect x="0" y="24" width="80" height="8" fill={ACCENT} />
            <text x="40" y="66" textAnchor="middle" fontFamily="Arial Black" fontSize="34" fill={WHITE}>
              {dayCount}
            </text>
            <text x="40" y="22" textAnchor="middle" fontFamily="Arial Black" fontSize="12" fill={WHITE}>
              DAY
            </text>
          </svg>
          <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: BLACK, margin: 0 }}>
            of 10 business days
          </p>
        </div>

        {/* Bills due */}
        <div style={{ display: 'flex', gap: 18, opacity: billsOp }}>
          {billLabels.map((label, i) => (
            <div
              key={i}
              style={{
                background: '#FFEEEE',
                border: `3px solid ${ACCENT}`,
                borderRadius: 12,
                padding: '12px 18px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontFamily: FONT, fontSize: 20, color: ACCENT, margin: 0 }}>{label}</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: 15, color: BLACK, margin: '4px 0 0' }}>
                due now
              </p>
            </div>
          ))}
        </div>

        <p style={{ ...headline(28, ACCENT), opacity: billsOp }}>
          Bills don&apos;t pause for bank timelines
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 5: Scale stats — $16B fraud, 68% use debit ─────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bilCount = interpolate(frame, [20, 105], [0, 16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const statReveal = spring({ frame, fps, config: { damping: 14, stiffness: 80 } });
  const pctW = interpolate(frame, [85, 170], [0, 68], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOp = interpolate(frame, [165, 195], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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
          gap: 48,
        }}
      >
        <p style={{ ...headline(42, WHITE), opacity: titleOp }}>
          The scale of this problem
        </p>

        {/* $16B animated counter */}
        <div style={{ textAlign: 'center', opacity: statReveal }}>
          <p style={{ ...headline(110, ACCENT), margin: 0, lineHeight: 1 }}>
            {`$${Math.floor(bilCount)}B`}
          </p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#AAAAAA', margin: '6px 0 0' }}>
            in debit card fraud every single year
          </p>
        </div>

        {/* 68% progress bar */}
        <div style={{ width: '100%' }}>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 24,
              color: WHITE,
              textAlign: 'center',
              margin: '0 0 14px',
            }}
          >
            Americans who primarily use debit:
          </p>
          <div
            style={{
              background: '#333344',
              borderRadius: 12,
              height: 56,
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: ACCENT,
                borderRadius: 12,
                height: '100%',
                width: `${pctW}%`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 16,
              }}
            >
              <p style={{ ...headline(28, WHITE), margin: 0 }}>
                {Math.floor(pctW)}%
              </p>
            </div>
          </div>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 20,
              color: '#888888',
              textAlign: 'center',
              margin: '10px 0 0',
            }}
          >
            — the card with the LEAST protection
          </p>
        </div>

        <div
          style={{
            background: '#1E0A0A',
            borderRadius: 16,
            padding: '18px 36px',
            borderLeft: `6px solid ${ACCENT}`,
            opacity: subOp,
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
            Most of us chose vulnerability — without knowing it.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 6: The fix — credit for purchases, debit for ATM only ──────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const item1Scale = spring({
    frame: Math.max(0, frame - 30),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const item2Scale = spring({
    frame: Math.max(0, frame - 75),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const item3Scale = spring({
    frame: Math.max(0, frame - 115),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const ctaOp = interpolate(frame, [165, 190], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const CheckMark: React.FC<{ color: string }> = ({ color }) => (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="18" fill={color} />
      <polyline
        points="8,18 15,25 28,11"
        stroke="white"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 64px',
          gap: 32,
        }}
      >
        <p style={{ ...headline(48, BLACK), opacity: titleOp }}>
          The fix is simple
        </p>

        {/* Rule 1: Credit for all purchases */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            background: '#EEFFEE',
            border: `3px solid ${GREEN}`,
            borderRadius: 18,
            padding: '20px 28px',
            width: '100%',
            transform: `scale(${item1Scale})`,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56">
            <rect x="2" y="10" width="52" height="36" rx="6" fill="#0A2A1A" />
            <rect x="2" y="20" width="52" height="14" fill={GREEN} opacity="0.85" />
            <rect x="10" y="24" width="14" height="10" rx="3" fill="#D4A800" />
            <text x="44" y="43" textAnchor="middle" fontFamily="Arial Black" fontSize="9" fill={WHITE}>
              CREDIT
            </text>
          </svg>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>
              Credit card for purchases
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#444444', margin: '4px 0 0' }}>
              $0 fraud liability — legally protected
            </p>
          </div>
          <CheckMark color={GREEN} />
        </div>

        {/* Rule 2: Debit for ATM only */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            background: '#EEF2FF',
            border: '3px solid #3B82F6',
            borderRadius: 18,
            padding: '20px 28px',
            width: '100%',
            transform: `scale(${item2Scale})`,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56">
            <rect x="8" y="4" width="40" height="50" rx="5" fill="#223344" />
            <rect x="13" y="10" width="30" height="16" rx="3" fill="#AACCEE" />
            <rect x="18" y="32" width="20" height="5" rx="2" fill="#556677" />
            <rect x="16" y="41" width="24" height="5" rx="2" fill="#FFDD88" />
            <rect x="22" y="41" width="12" height="8" fill="#FFDD88" />
          </svg>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>
              Debit for ATM cash only
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#444444', margin: '4px 0 0' }}>
              nothing else — ever
            </p>
          </div>
          <CheckMark color="#3B82F6" />
        </div>

        {/* Rule 3: Pay in full */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            background: '#FFFBEE',
            border: '3px solid #F59E0B',
            borderRadius: 18,
            padding: '20px 28px',
            width: '100%',
            transform: `scale(${item3Scale})`,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56">
            <rect x="4" y="8" width="48" height="44" rx="6" fill={BLACK} />
            <rect x="4" y="8" width="48" height="18" rx="6" fill="#F59E0B" />
            <rect x="4" y="20" width="48" height="6" fill="#F59E0B" />
            <text x="28" y="44" textAnchor="middle" fontFamily="Arial Black" fontSize="18" fill={WHITE}>
              $0
            </text>
          </svg>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: FONT, fontSize: 22, color: BLACK, margin: 0 }}>
              Pay in full each month
            </p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#444444', margin: '4px 0 0' }}>
              same money, full legal shield
            </p>
          </div>
          <CheckMark color="#F59E0B" />
        </div>

        {/* CTA */}
        <div
          style={{
            background: BLACK,
            borderRadius: 20,
            padding: '22px 44px',
            opacity: ctaOp,
          }}
        >
          <p style={{ ...headline(32, WHITE), margin: 0 }}>
            Follow for money traps
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 20,
              color: '#AAAAAA',
              textAlign: 'center',
              margin: '6px 0 0',
            }}
          >
            your bank doesn&apos;t want you to know
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
