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
const ACCENT = '#F59E0B'; // amber — urgency, wealth
const WHITE = '#F5F5F5';
const BLACK = '#1A1A1A';
const GREEN = '#10B981';
const RED = '#EF4444';
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

// ─── SCENE 1: Briefcase + $1.65T counter — did you take your 401k? ───────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const briefScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 }, from: 0, to: 1 });
  const counterVal = interpolate(frame, [30, 165], [0, 1.65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const topOp = interpolate(frame, [5, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bottomOp = interpolate(frame, [80, 115], [0, 1], {
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
          gap: 28,
        }}
      >
        <p style={{ ...headline(38, WHITE), opacity: topOp }}>
          Did you take your 401k?
        </p>

        {/* Briefcase SVG */}
        <div style={{ transform: `scale(${briefScale})` }}>
          <svg width="240" height="218" viewBox="0 0 240 218">
            {/* body */}
            <rect x="18" y="80" width="204" height="130" rx="14" fill={ACCENT} />
            {/* handle outer */}
            <path
              d="M80 80 L80 50 Q80 26 102 26 L138 26 Q160 26 160 50 L160 80"
              fill="none"
              stroke={ACCENT}
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* handle inner cutout */}
            <path
              d="M88 80 L88 53 Q88 38 102 38 L138 38 Q152 38 152 53 L152 80"
              fill="none"
              stroke={BG_DARK}
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* clasp housing */}
            <rect x="98" y="128" width="44" height="28" rx="6" fill={BG_DARK} />
            {/* clasp bar */}
            <rect x="108" y="138" width="24" height="10" rx="3" fill={ACCENT} />
            {/* horizontal divide */}
            <line x1="18" y1="145" x2="222" y2="145" stroke={BG_DARK} strokeWidth="2" strokeOpacity="0.25" />
          </svg>
        </div>

        {/* Animated counter */}
        <p style={{ ...headline(96, ACCENT), opacity: topOp, letterSpacing: '0.04em' }}>
          ${counterVal.toFixed(2)}T
        </p>
        <p style={{ ...headline(26, WHITE), opacity: bottomOp }}>
          In Abandoned 401ks
        </p>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 28,
            color: '#AAAAAA',
            textAlign: 'center',
            margin: 0,
            opacity: bottomOp,
          }}
        >
          When you switched jobs, did you bring yours?
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 2: Piggy bank + padlock — orphan account, high fees ───────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const piggyScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });
  const lockScale = spring({
    frame: Math.max(0, frame - 48),
    fps,
    config: { damping: 10, stiffness: 140 },
    from: 0,
    to: 1,
  });
  const textOp = interpolate(frame, [78, 112], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 64px',
          gap: 30,
        }}
      >
        <p style={{ ...headline(38, RED), opacity: tagOp }}>Orphan Account</p>

        {/* Piggy bank + padlock overlay */}
        <div style={{ position: 'relative', transform: `scale(${piggyScale})` }}>
          <svg width="270" height="224" viewBox="0 0 270 224">
            {/* piggy body */}
            <ellipse cx="118" cy="152" rx="100" ry="68" fill={ACCENT} />
            {/* piggy head */}
            <circle cx="206" cy="128" r="46" fill={ACCENT} />
            {/* ear */}
            <ellipse cx="197" cy="86" rx="14" ry="19" fill={ACCENT} />
            <ellipse cx="197" cy="88" rx="8" ry="12" fill="#FDE68A" />
            {/* snout */}
            <ellipse cx="238" cy="138" rx="22" ry="15" fill="#FDE68A" />
            <circle cx="230" cy="136" r="5" fill="#D97706" />
            <circle cx="246" cy="136" r="5" fill="#D97706" />
            {/* eye */}
            <circle cx="212" cy="113" r="6" fill={BLACK} />
            <circle cx="214" cy="111" r="2" fill={WHITE} />
            {/* coin slot */}
            <rect x="94" y="86" width="34" height="10" rx="5" fill="#D97706" />
            {/* legs */}
            <rect x="50" y="200" width="24" height="24" rx="6" fill="#D97706" />
            <rect x="90" y="200" width="24" height="24" rx="6" fill="#D97706" />
            <rect x="128" y="200" width="24" height="24" rx="6" fill="#D97706" />
            <rect x="168" y="200" width="24" height="24" rx="6" fill="#D97706" />
            {/* tail */}
            <path d="M18 155 Q3 138 17 116 Q31 94 14 76" fill="none" stroke="#D97706" strokeWidth="7" strokeLinecap="round" />
          </svg>
          {/* padlock overlay */}
          <div style={{ position: 'absolute', top: -12, right: -18, transform: `scale(${lockScale})` }}>
            <svg width="90" height="100" viewBox="0 0 90 100">
              {/* lock body */}
              <rect x="8" y="46" width="74" height="54" rx="10" fill={RED} />
              {/* shackle outer */}
              <path
                d="M22 46 L22 24 Q22 5 45 5 Q68 5 68 24 L68 46"
                fill="none"
                stroke={RED}
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* shackle inner cutout */}
              <path
                d="M26 46 L26 25 Q26 12 45 12 Q64 12 64 25 L64 46"
                fill="none"
                stroke={BG_LIGHT}
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* keyhole */}
              <circle cx="45" cy="67" r="9" fill={BLACK} />
              <rect x="41" y="71" width="8" height="15" rx="3" fill={BLACK} />
            </svg>
          </div>
        </div>

        <p style={{ ...headline(32, RED), opacity: textOp }}>Stuck in High-Fee Funds</p>
        <p
          style={{
            fontFamily: FONT_BODY,
            fontSize: 26,
            color: '#555555',
            textAlign: 'center',
            margin: 0,
            opacity: textOp,
          }}
        >
          You can&apos;t switch funds. You can&apos;t negotiate.<br />
          You just keep paying their fees.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 3: Bar chart — Forgotten $150K vs Rolled Over $266K, +$116K gap ───
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const MAX_BAR_H = 256;
  const BASELINE_Y = 368;
  const BAR_W = 172;
  const LEFT_X = 108;
  const RIGHT_X = 520;

  const barProg = interpolate(frame, [25, 138], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const forgottenH = barProg * MAX_BAR_H * 0.564;
  const rolledH = barProg * MAX_BAR_H;

  const forgottenVal = Math.round(barProg * 150000);
  const rolledVal = Math.round(barProg * 266000);
  const fmt = (v: number) => '$' + Math.round(v / 1000) + 'K';

  const badgeOp = interpolate(frame, [148, 182], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const sourceOp = interpolate(frame, [185, 215], [0, 1], {
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
          gap: 18,
        }}
      >
        <p style={{ ...headline(40, WHITE), opacity: titleOp }}>Over 20 Years on $150K</p>

        <svg width="800" height="408" viewBox="0 0 800 408">
          <line x1="48" y1={BASELINE_Y} x2="752" y2={BASELINE_Y} stroke="#333355" strokeWidth="2" />

          {/* Forgotten 401k bar */}
          <rect
            x={LEFT_X}
            y={BASELINE_Y - forgottenH}
            width={BAR_W}
            height={forgottenH}
            rx="8"
            fill={RED}
          />
          <text
            x={LEFT_X + BAR_W / 2}
            y={BASELINE_Y + 28}
            textAnchor="middle"
            fontFamily="Arial Black"
            fontSize="18"
            fill={RED}
          >
            FORGOTTEN
          </text>
          {forgottenH > 10 && (
            <text
              x={LEFT_X + BAR_W / 2}
              y={BASELINE_Y - forgottenH - 12}
              textAnchor="middle"
              fontFamily="Arial Black"
              fontSize="22"
              fill="#DDAAAA"
            >
              {fmt(forgottenVal)}
            </text>
          )}

          {/* Rolled over bar */}
          <rect
            x={RIGHT_X}
            y={BASELINE_Y - rolledH}
            width={BAR_W}
            height={rolledH}
            rx="8"
            fill={GREEN}
          />
          <text
            x={RIGHT_X + BAR_W / 2}
            y={BASELINE_Y + 28}
            textAnchor="middle"
            fontFamily="Arial Black"
            fontSize="18"
            fill={GREEN}
          >
            ROLLED OVER
          </text>
          {rolledH > 10 && (
            <text
              x={RIGHT_X + BAR_W / 2}
              y={BASELINE_Y - rolledH - 12}
              textAnchor="middle"
              fontFamily="Arial Black"
              fontSize="22"
              fill="#AADDCC"
            >
              {fmt(rolledVal)}
            </text>
          )}

          {/* +$116K badge above rolled over bar */}
          <g
            transform={`translate(${RIGHT_X + BAR_W / 2}, ${BASELINE_Y - MAX_BAR_H - 52})`}
            opacity={badgeOp}
          >
            <rect x="-72" y="-22" width="144" height="44" rx="10" fill={ACCENT} />
            <text
              x="0"
              y="8"
              textAnchor="middle"
              fontFamily="Arial Black"
              fontSize="26"
              fill={BLACK}
            >
              +$116K MORE
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
            $116,000 lost to excess fees over two decades.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 4: Person + calendar flipping — 24M accounts stay forgotten ────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const personScale = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });
  const calOp = interpolate(frame, [32, 62], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const monthIdx = Math.min(
    5,
    Math.floor(
      interpolate(frame, [48, 188], [0, 6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    ),
  );
  const months = ['JAN', 'APR', 'JUL', 'OCT', 'DEC', 'YR 2'];
  const textOp = interpolate(frame, [78, 112], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
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
        <p style={{ ...headline(36, RED), opacity: tagOp }}>24 Million Abandoned</p>

        <div style={{ display: 'flex', gap: 52, alignItems: 'center' }}>
          {/* Person silhouette — relaxed, not concerned */}
          <div style={{ transform: `scale(${personScale})` }}>
            <svg width="144" height="196" viewBox="0 0 144 196">
              {/* head */}
              <circle cx="72" cy="32" r="28" fill="#777788" />
              {/* eyes */}
              <circle cx="62" cy="28" r="4" fill="#444455" />
              <circle cx="82" cy="28" r="4" fill="#444455" />
              {/* neutral-to-slight-frown mouth */}
              <path d="M59,44 Q72,40 85,44" stroke="#444455" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* body */}
              <rect x="36" y="66" width="72" height="72" rx="12" fill="#777788" />
              {/* left arm */}
              <rect x="10" y="72" width="28" height="13" rx="6" fill="#777788" transform="rotate(14,24,79)" />
              {/* right arm */}
              <rect x="106" y="72" width="28" height="13" rx="6" fill="#777788" transform="rotate(-14,120,79)" />
              {/* legs */}
              <rect x="40" y="134" width="18" height="44" rx="8" fill="#777788" />
              <rect x="86" y="134" width="18" height="44" rx="8" fill="#777788" />
            </svg>
          </div>

          {/* Calendar flipping months */}
          <div style={{ opacity: calOp }}>
            <svg width="156" height="174" viewBox="0 0 156 174">
              {/* body */}
              <rect x="5" y="22" width="146" height="150" rx="10" fill={WHITE} stroke="#DDDDDD" strokeWidth="2" />
              {/* header */}
              <rect x="5" y="22" width="146" height="44" rx="10" fill={ACCENT} />
              <rect x="5" y="52" width="146" height="14" fill={ACCENT} />
              {/* month label */}
              <text
                x="78"
                y="49"
                textAnchor="middle"
                fontFamily="Arial Black"
                fontSize="19"
                fill={BLACK}
              >
                {months[monthIdx]}
              </text>
              {/* ring pegs */}
              <rect x="44" y="12" width="12" height="22" rx="6" fill="#888888" />
              <rect x="100" y="12" width="12" height="22" rx="6" fill="#888888" />
              {/* date grid dots */}
              {Array.from({ length: Math.max(0, Math.floor(20)) }).map((_, i) => (
                <circle
                  key={i}
                  cx={26 + (i % 5) * 26}
                  cy={88 + Math.floor(i / 5) * 28}
                  r="6"
                  fill="#DDDDDD"
                />
              ))}
              {/* a few check marks on first row */}
              <text x="26" y="95" textAnchor="middle" fontFamily="Arial" fontSize="14" fill="#AAAAAA">✓</text>
              <text x="52" y="95" textAnchor="middle" fontFamily="Arial" fontSize="14" fill="#AAAAAA">✓</text>
              <text x="78" y="95" textAnchor="middle" fontFamily="Arial" fontSize="14" fill="#AAAAAA">✓</text>
            </svg>
          </div>
        </div>

        <p style={{ ...headline(30, BLACK), opacity: textOp }}>Statements Still Arrive...</p>
        <div
          style={{
            opacity: textOp,
            background: '#1E0A0A',
            borderRadius: 16,
            padding: '16px 36px',
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
            &quot;Looks fine to me.&quot;
          </p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 20,
              color: '#BBAAAA',
              textAlign: 'center',
              margin: '6px 0 0',
            }}
          >
            That&apos;s how 24 million accounts stay forgotten for years.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 5: Arrow animation — old 401k → IRA, 15-minute rollover fix ────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagOp = interpolate(frame, [5, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const box1Scale = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 0, to: 1 });
  const arrowProg = interpolate(frame, [42, 106], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const box2Scale = spring({
    frame: Math.max(0, frame - 66),
    fps,
    config: { damping: 14, stiffness: 80 },
    from: 0,
    to: 1,
  });
  const timerOp = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bottomOp = interpolate(frame, [165, 198], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arrowTipOp = arrowProg > 0.72 ? 1 : 0;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 64px',
          gap: 36,
        }}
      >
        <p style={{ ...headline(40, ACCENT), opacity: tagOp }}>The Fix Takes 15 Minutes</p>

        {/* Transfer diagram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Old 401k box */}
          <div style={{ transform: `scale(${box1Scale})` }}>
            <svg width="184" height="152" viewBox="0 0 184 152">
              <rect x="6" y="6" width="172" height="140" rx="14" fill="#1A1A30" stroke={RED} strokeWidth="3" />
              {/* briefcase icon */}
              <rect x="58" y="48" width="68" height="56" rx="8" fill={RED} opacity="0.8" />
              <path
                d="M74 48 L74 36 Q74 26 83 26 L101 26 Q110 26 110 36 L110 48"
                fill="none"
                stroke={RED}
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.8"
              />
              <text
                x="92"
                y="128"
                textAnchor="middle"
                fontFamily="Arial Black"
                fontSize="14"
                fill={RED}
              >
                OLD 401K
              </text>
            </svg>
          </div>

          {/* Animated arrow */}
          <svg width="122" height="50" viewBox="0 0 122 50">
            <line
              x1="4"
              y1="25"
              x2={4 + arrowProg * 86}
              y2="25"
              stroke={ACCENT}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <polygon
              points="94,14 118,25 94,36"
              fill={ACCENT}
              opacity={arrowTipOp}
            />
          </svg>

          {/* IRA box */}
          <div style={{ transform: `scale(${box2Scale})` }}>
            <svg width="184" height="152" viewBox="0 0 184 152">
              <rect x="6" y="6" width="172" height="140" rx="14" fill="#1A1A30" stroke={GREEN} strokeWidth="3" />
              {/* piggy bank icon */}
              <ellipse cx="92" cy="76" rx="42" ry="30" fill={GREEN} opacity="0.8" />
              <circle cx="124" cy="66" r="20" fill={GREEN} opacity="0.8" />
              <ellipse cx="138" cy="70" r="9" fill="#6EE7B7" opacity="0.8" />
              <text
                x="92"
                y="128"
                textAnchor="middle"
                fontFamily="Arial Black"
                fontSize="14"
                fill={GREEN}
              >
                YOUR IRA
              </text>
            </svg>
          </div>
        </div>

        {/* Timer */}
        <div style={{ opacity: timerOp, textAlign: 'center' }}>
          <p style={{ ...headline(82, ACCENT), lineHeight: 1 }}>15 MIN</p>
          <p style={{ ...headline(26, WHITE), marginTop: 8 }}>Direct Rollover</p>
        </div>

        <div
          style={{
            opacity: bottomOp,
            background: '#003322',
            borderRadius: 16,
            padding: '16px 36px',
            borderLeft: `6px solid ${GREEN}`,
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
            Zero taxes. Zero penalties. Zero fees.
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 6: Checklist CTA — 3 steps, $116K waiting for you ─────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [5, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const item1Op = interpolate(frame, [25, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const item2Op = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const item3Op = interpolate(frame, [95, 125], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const amountScale = spring({
    frame: Math.max(0, frame - 145),
    fps,
    config: { damping: 12, stiffness: 140 },
    from: 0,
    to: 1,
  });
  const amountOp = interpolate(frame, [145, 175], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ctaOp = interpolate(frame, [178, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const CheckIcon = () => (
    <svg width="46" height="46" viewBox="0 0 46 46" style={{ flexShrink: 0 }}>
      <circle cx="23" cy="23" r="22" fill={ACCENT} />
      <polyline
        points="12,23 20,31 34,15"
        fill="none"
        stroke={WHITE}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const items = [
    '1. List Your Old Jobs',
    '2. Call Old HR / Plan',
    '3. Request Rollover',
  ];
  const itemOps = [item1Op, item2Op, item3Op];

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
        <p style={{ ...headline(42, BLACK), opacity: titleOp }}>Do This Right Now</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: itemOps[i] }}
            >
              <CheckIcon />
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 30,
                  color: BLACK,
                  margin: 0,
                  letterSpacing: '0.04em',
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>

        <div style={{ transform: `scale(${amountScale})`, opacity: amountOp, textAlign: 'center' }}>
          <p style={{ ...headline(72, ACCENT) }}>$116,000</p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 26,
              color: '#555555',
              textAlign: 'center',
              margin: '6px 0 0',
            }}
          >
            could be waiting for you
          </p>
        </div>

        <div
          style={{
            opacity: ctaOp,
            background: BLACK,
            borderRadius: 20,
            padding: '20px 44px',
          }}
        >
          <p style={{ ...headline(30, WHITE), margin: 0 }}>Follow for more money traps</p>
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 20,
              color: '#AAAAAA',
              textAlign: 'center',
              margin: '6px 0 0',
            }}
          >
            nobody explains — not even your employer.
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
