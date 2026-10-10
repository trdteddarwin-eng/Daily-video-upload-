import React from 'react';
import {
  AbsoluteFill, Series, useCurrentFrame, useVideoConfig,
  interpolate, spring, Easing,
} from 'remotion';

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

  const figuresY = interpolate(frame, [0, 35], [70, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const docOpacity = interpolate(frame, [38, 78], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const titleScale = spring({ frame, fps, from: 0.5, to: 1, config: { damping: 12, stiffness: 80 } });
  const subOpacity = interpolate(frame, [68, 108], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: 60,
      }}>
        {/* Two person silhouettes shaking hands */}
        <svg width={360} height={185} viewBox="0 0 360 185"
          style={{ transform: `translateY(${figuresY}px)`, marginBottom: 28 }}>
          {/* Left person (white) */}
          <circle cx={65} cy={30} r={24} fill={WHITE} />
          <rect x={48} y={60} width={34} height={56} rx={8} fill={WHITE} />
          <rect x={48} y={110} width={13} height={46} rx={6} fill={WHITE} />
          <rect x={69} y={110} width={13} height={46} rx={6} fill={WHITE} />
          {/* Left arm */}
          <rect x={82} y={80} width={60} height={16} rx={8} fill={WHITE} />
          {/* Right person (red) */}
          <circle cx={295} cy={30} r={24} fill={ACCENT} />
          <rect x={278} y={60} width={34} height={56} rx={8} fill={ACCENT} />
          <rect x={278} y={110} width={13} height={46} rx={6} fill={ACCENT} />
          <rect x={299} y={110} width={13} height={46} rx={6} fill={ACCENT} />
          {/* Right arm */}
          <rect x={218} y={80} width={60} height={16} rx={8} fill={ACCENT} />
          {/* Clasped hands */}
          <rect x={138} y={72} width={84} height={32} rx={14} fill="#F59E0B" />
          {/* Labels */}
          <text x={65} y={178} textAnchor="middle" fill={WHITE}
            fontSize={17} fontFamily="Arial Black,Arial,sans-serif" fontWeight="bold">YOU</text>
          <text x={295} y={178} textAnchor="middle" fill={ACCENT}
            fontSize={17} fontFamily="Arial Black,Arial,sans-serif" fontWeight="bold">THEM</text>
        </svg>

        {/* Contract document */}
        <svg width={260} height={136} viewBox="0 0 260 136"
          style={{ opacity: docOpacity, marginBottom: 32 }}>
          <rect x={6} y={6} width={248} height={124} rx={10} fill={WHITE} />
          <rect x={6} y={6} width={248} height={36} rx={10} fill={ACCENT} />
          <rect x={6} y={30} width={248} height={12} fill={ACCENT} />
          <text x={130} y={28} textAnchor="middle" fill={WHITE}
            fontSize={13} fontFamily="Arial Black,Arial,sans-serif" fontWeight="bold">CO-SIGN AGREEMENT</text>
          <line x1={26} y1={58} x2={234} y2={58} stroke="#CCCCCC" strokeWidth={2} />
          <line x1={26} y1={74} x2={234} y2={74} stroke="#CCCCCC" strokeWidth={2} />
          <line x1={26} y1={90} x2={180} y2={90} stroke="#CCCCCC" strokeWidth={2} />
          <line x1={26} y1={118} x2={148} y2={118} stroke={BLACK} strokeWidth={2} />
          <text x={87} y={115} textAnchor="middle" fill={ACCENT}
            fontSize={20} fontFamily="Arial Black,Arial,sans-serif">✗</text>
        </svg>

        {/* Title */}
        <p style={{ ...headline(56, WHITE), transform: `scale(${titleScale})`, lineHeight: 1.1, marginBottom: 8 }}>
          THE CO-SIGN
        </p>
        <p style={{ ...headline(56, ACCENT), transform: `scale(${titleScale})`, lineHeight: 1.1, marginBottom: 26 }}>
          TRAP
        </p>
        <p style={{
          fontFamily: FONT, fontSize: 28, color: WHITE, textAlign: 'center',
          opacity: subOpacity, fontWeight: 'normal', letterSpacing: '0.04em',
          lineHeight: 1.4, maxWidth: 840, margin: 0,
        }}>
          One signature. Someone else's debt.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleIn = spring({ frame, fps, from: 0.4, to: 1, config: { damping: 14, stiffness: 70 } });
  const labelOpacity = interpolate(frame, [45, 85], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const arrowOpacity = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: 60,
      }}>
        {/* Balance scale */}
        <svg width={480} height={290} viewBox="0 0 480 290"
          style={{ transform: `scale(${scaleIn})`, marginBottom: 30 }}>
          {/* Fulcrum pole */}
          <rect x={233} y={56} width={14} height={180} rx={4} fill={BLACK} />
          {/* Triangle base */}
          <polygon points="240,244 210,286 270,286" fill={BLACK} />
          {/* Beam */}
          <rect x={56} y={52} width={368} height={14} rx={7} fill={BLACK} />
          {/* Left pan suspension */}
          <line x1={90} y1={66} x2={90} y2={138} stroke={BLACK} strokeWidth={4} />
          <line x1={58} y1={138} x2={122} y2={138} stroke={BLACK} strokeWidth={4} />
          {/* Left pan */}
          <rect x={48} y={136} width={84} height={42} rx={8} fill={ACCENT} />
          {/* Right pan suspension */}
          <line x1={390} y1={66} x2={390} y2={138} stroke={BLACK} strokeWidth={4} />
          <line x1={358} y1={138} x2={422} y2={138} stroke={BLACK} strokeWidth={4} />
          {/* Right pan */}
          <rect x={348} y={136} width={84} height={42} rx={8} fill={ACCENT} />
          {/* Pan labels */}
          <text x={90} y={162} textAnchor="middle" fill={WHITE}
            fontSize={13} fontFamily="Arial Black,Arial,sans-serif" fontWeight="bold">BORROWER</text>
          <text x={390} y={162} textAnchor="middle" fill={WHITE}
            fontSize={13} fontFamily="Arial Black,Arial,sans-serif" fontWeight="bold">YOU</text>
          {/* $21K above each pan */}
          <text x={90} y={124} textAnchor="middle" fill={ACCENT}
            fontSize={20} fontFamily="Arial Black,Arial,sans-serif" fontWeight="bold">$21K</text>
          <text x={390} y={124} textAnchor="middle" fill={ACCENT}
            fontSize={20} fontFamily="Arial Black,Arial,sans-serif" fontWeight="bold">$21K</text>
        </svg>

        <p style={{ ...headline(62, BLACK), transform: `scale(${scaleIn})`, lineHeight: 1.1, marginBottom: 10 }}>
          EQUALLY
        </p>
        <p style={{ ...headline(62, ACCENT), transform: `scale(${scaleIn})`, lineHeight: 1.1, marginBottom: 28 }}>
          LIABLE
        </p>
        <p style={{
          fontFamily: FONT, fontSize: 28, color: BLACK, textAlign: 'center',
          opacity: labelOpacity, fontWeight: 'normal', letterSpacing: '0.05em',
          lineHeight: 1.35, maxWidth: 840, margin: 0,
        }}>
          You're 100% on the hook — not as a backup, but from day one.
        </p>
        <p style={{
          fontFamily: FONT, fontSize: 32, color: ACCENT, textAlign: 'center',
          opacity: arrowOpacity, fontWeight: 'bold', letterSpacing: '0.08em',
          lineHeight: 1.2, maxWidth: 840, margin: '18px 0 0 0',
        }}>
          MISS ONE PAYMENT → YOUR CREDIT PAYS
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const counter = Math.round(interpolate(frame, [18, 105], [0, 28], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  }));
  const figureOpacity = interpolate(frame, [0, 38], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const textOpacity = interpolate(frame, [95, 135], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const people = Array(Math.max(0, Math.floor(10))).fill(0);

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: 60,
      }}>
        <p style={{ ...headline(126, ACCENT), lineHeight: 1, marginBottom: 6 }}>
          {counter}%
        </p>
        <p style={{ ...headline(34, WHITE), lineHeight: 1.1, marginBottom: 40 }}>
          OF CO-SIGNERS PAY THE DEBT
        </p>

        {/* 10 person silhouettes — first 3 highlighted in red */}
        <svg width={480} height={150} viewBox="0 0 480 150"
          style={{ opacity: figureOpacity, marginBottom: 36 }}>
          {people.map((_, i) => {
            const x = 28 + i * 46;
            const isRed = i < 3;
            const col = isRed ? ACCENT : WHITE;
            return (
              <g key={i}>
                <circle cx={x} cy={22} r={18} fill={col} />
                <rect x={x - 13} y={46} width={26} height={50} rx={6} fill={col} />
                <rect x={x - 13} y={90} width={11} height={40} rx={5} fill={col} />
                <rect x={x + 2} y={90} width={11} height={40} rx={5} fill={col} />
                {isRed && (
                  <text x={x} y={20} textAnchor="middle" fill={WHITE}
                    fontSize={18} fontFamily="Arial Black,Arial,sans-serif" fontWeight="bold">$</text>
                )}
              </g>
            );
          })}
        </svg>

        <p style={{
          fontFamily: FONT, fontSize: 28, color: WHITE, textAlign: 'center',
          opacity: textOpacity, fontWeight: 'normal', letterSpacing: '0.04em',
          lineHeight: 1.4, maxWidth: 840, margin: 0,
        }}>
          Nearly one in three — and most of them never saw it coming.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const score = Math.round(interpolate(frame, [28, 118], [750, 670], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  }));
  const gaugeAngle = interpolate(frame, [28, 118], [-58, -28], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.in(Easing.cubic),
  });
  const notifScale = spring({ frame: Math.max(0, frame - 42), fps, from: 0, to: 1, config: { damping: 10, stiffness: 100 } });
  const stampOpacity = interpolate(frame, [100, 140], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const stampScale = spring({ frame: Math.max(0, frame - 100), fps, from: 0.4, to: 1, config: { damping: 8, stiffness: 120 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: 60,
      }}>
        {/* Credit score gauge */}
        <svg width={440} height={260} viewBox="0 0 440 260" style={{ marginBottom: 20 }}>
          {/* Background arc */}
          <path d="M 60 220 A 160 160 0 0 1 380 220" fill="none" stroke="#DDDDDD" strokeWidth={28} strokeLinecap="round" />
          {/* Red zone */}
          <path d="M 60 220 A 160 160 0 0 1 165 88" fill="none" stroke={ACCENT} strokeWidth={28} strokeLinecap="round" />
          {/* Yellow zone */}
          <path d="M 165 88 A 160 160 0 0 1 275 88" fill="none" stroke="#F59E0B" strokeWidth={28} strokeLinecap="round" />
          {/* Green zone */}
          <path d="M 275 88 A 160 160 0 0 1 380 220" fill="none" stroke="#10B981" strokeWidth={28} strokeLinecap="round" />
          {/* Needle */}
          <g transform={`rotate(${gaugeAngle}, 220, 220)`}>
            <rect x={216} y={76} width={8} height={144} rx={4} fill={BLACK} />
            <circle cx={220} cy={220} r={16} fill={BLACK} />
          </g>
          {/* Score labels */}
          <text x={55} y={248} textAnchor="middle" fill={ACCENT}
            fontSize={15} fontFamily="Arial Black,Arial,sans-serif">300</text>
          <text x={220} y={68} textAnchor="middle" fill="#F59E0B"
            fontSize={15} fontFamily="Arial Black,Arial,sans-serif">580</text>
          <text x={385} y={248} textAnchor="middle" fill="#10B981"
            fontSize={15} fontFamily="Arial Black,Arial,sans-serif">850</text>
          {/* Score value */}
          <text x={220} y={200} textAnchor="middle" fill={ACCENT}
            fontSize={66} fontFamily="Arial Black,Arial,sans-serif" fontWeight="bold">{score}</text>
          <text x={220} y={234} textAnchor="middle" fill="#888888"
            fontSize={17} fontFamily="Arial Black,Arial,sans-serif">CREDIT SCORE</text>
        </svg>

        {/* Alert notification */}
        <div style={{
          background: WHITE, border: `3px solid ${ACCENT}`, borderRadius: 16,
          padding: '12px 26px', marginBottom: 20,
          transform: `scale(${notifScale})`, opacity: notifScale,
          boxShadow: `0 4px 24px rgba(239,68,68,0.28)`,
        }}>
          <p style={{
            fontFamily: FONT, fontSize: 22, color: ACCENT,
            margin: 0, textAlign: 'center', fontWeight: 'bold',
          }}>
            LATE PAYMENT REPORTED
          </p>
          <p style={{
            fontFamily: FONT, fontSize: 17, color: BLACK,
            margin: '5px 0 0', textAlign: 'center',
          }}>
            Not your payment. But your score.
          </p>
        </div>

        {/* -80 stamp */}
        <p style={{
          ...headline(68, ACCENT),
          opacity: stampOpacity,
          transform: `scale(${stampScale})`,
          lineHeight: 1,
          border: `6px solid ${ACCENT}`,
          padding: '10px 28px',
        }}>
          -80 PTS
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const separation = interpolate(frame, [18, 105], [0, 150], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const riftOpacity = interpolate(frame, [18, 70], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const pctScale = spring({ frame: Math.max(0, frame - 52), fps, from: 0, to: 1, config: { damping: 12, stiffness: 80 } });
  const textOpacity = interpolate(frame, [105, 145], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: 60,
      }}>
        {/* Two figures drifting apart */}
        <svg width={520} height={200} viewBox="0 0 520 200" style={{ marginBottom: 28 }}>
          {/* Left person drifting left */}
          <g transform={`translate(${-separation * 0.48}, 0)`}>
            <circle cx={175} cy={36} r={30} fill={WHITE} />
            <rect x={153} y={72} width={44} height={72} rx={10} fill={WHITE} />
            <rect x={153} y={138} width={17} height={52} rx={7} fill={WHITE} />
            <rect x={178} y={138} width={17} height={52} rx={7} fill={WHITE} />
          </g>
          {/* Right person drifting right */}
          <g transform={`translate(${separation * 0.48}, 0)`}>
            <circle cx={345} cy={36} r={30} fill={ACCENT} />
            <rect x={323} y={72} width={44} height={72} rx={10} fill={ACCENT} />
            <rect x={323} y={138} width={17} height={52} rx={7} fill={ACCENT} />
            <rect x={348} y={138} width={17} height={52} rx={7} fill={ACCENT} />
          </g>
          {/* Jagged rift line */}
          <polyline
            points="258,8 264,48 250,82 266,114 252,148 260,180 258,200"
            fill="none" stroke={ACCENT} strokeWidth={4} strokeDasharray="10,5"
            opacity={riftOpacity}
          />
        </svg>

        <p style={{
          ...headline(106, ACCENT),
          transform: `scale(${pctScale})`,
          lineHeight: 1,
          marginBottom: 8,
        }}>
          38%
        </p>
        <p style={{ ...headline(30, WHITE), lineHeight: 1.1, marginBottom: 28 }}>
          SAY IT DAMAGED THE RELATIONSHIP
        </p>

        <p style={{
          fontFamily: FONT, fontSize: 28, color: WHITE, textAlign: 'center',
          opacity: textOpacity, fontWeight: 'normal', letterSpacing: '0.04em',
          lineHeight: 1.4, maxWidth: 840, margin: 0,
        }}>
          The money damage is one thing — the friendship cost is often permanent.
        </p>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const giftScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });
  const contractScale = spring({ frame: Math.max(0, frame - 18), fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });
  const vsOpacity = interpolate(frame, [28, 58], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const ctaOpacity = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: 60,
      }}>
        {/* Two options side by side */}
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          justifyContent: 'center', gap: 18, marginBottom: 34, width: '100%',
        }}>
          {/* Gift option (good) */}
          <div style={{
            background: '#D1FAE5', border: `4px solid #10B981`, borderRadius: 20,
            padding: '28px 20px', flex: 1, maxWidth: 290,
            transform: `scale(${giftScale})`, textAlign: 'center' as const,
          }}>
            <svg width={96} height={96} viewBox="0 0 96 96"
              style={{ display: 'block', margin: '0 auto 10px' }}>
              {/* Gift box */}
              <rect x={10} y={44} width={76} height={46} rx={6} fill="#10B981" />
              <rect x={10} y={28} width={76} height={20} rx={5} fill="#059669" />
              {/* Ribbon vertical */}
              <rect x={42} y={8} width={12} height={78} rx={4} fill="#F59E0B" />
              {/* Ribbon horizontal */}
              <rect x={10} y={32} width={76} height={10} fill="#F59E0B" />
              {/* Bow loops */}
              <ellipse cx={30} cy={24} rx={16} ry={9} fill="none" stroke="#F59E0B" strokeWidth={4} />
              <ellipse cx={66} cy={24} rx={16} ry={9} fill="none" stroke="#F59E0B" strokeWidth={4} />
              <text x={48} y={80} textAnchor="middle" fill={WHITE}
                fontSize={22} fontFamily="Arial Black,Arial,sans-serif" fontWeight="bold">✓</text>
            </svg>
            <p style={{
              fontFamily: FONT, fontSize: 24, color: '#059669',
              fontWeight: 'bold', margin: '0 0 4px', letterSpacing: '0.08em',
            }}>GIVE $500</p>
            <p style={{
              fontFamily: FONT, fontSize: 15, color: '#065F46',
              margin: 0, lineHeight: 1.3,
            }}>You lose $500 max</p>
          </div>

          {/* VS divider */}
          <p style={{
            fontFamily: FONT, fontSize: 32, color: BLACK, fontWeight: 'bold',
            opacity: vsOpacity, letterSpacing: '0.1em', margin: 0, flexShrink: 0,
          }}>VS</p>

          {/* Co-sign option (bad) */}
          <div style={{
            background: '#FEE2E2', border: `4px solid ${ACCENT}`, borderRadius: 20,
            padding: '28px 20px', flex: 1, maxWidth: 290,
            transform: `scale(${contractScale})`, textAlign: 'center' as const,
          }}>
            <svg width={96} height={96} viewBox="0 0 96 96"
              style={{ display: 'block', margin: '0 auto 10px' }}>
              {/* Contract */}
              <rect x={14} y={4} width={68} height={88} rx={8} fill={WHITE} stroke={ACCENT} strokeWidth={4} />
              <rect x={14} y={4} width={68} height={24} rx={8} fill={ACCENT} />
              <rect x={14} y={18} width={68} height={10} fill={ACCENT} />
              <line x1={26} y1={44} x2={70} y2={44} stroke="#CCCCCC" strokeWidth={3} />
              <line x1={26} y1={58} x2={70} y2={58} stroke="#CCCCCC" strokeWidth={3} />
              <line x1={26} y1={72} x2={58} y2={72} stroke="#CCCCCC" strokeWidth={3} />
              {/* X mark */}
              <line x1={30} y1={20} x2={66} y2={56} stroke={ACCENT} strokeWidth={5} strokeLinecap="round" />
              <line x1={66} y1={20} x2={30} y2={56} stroke={ACCENT} strokeWidth={5} strokeLinecap="round" />
            </svg>
            <p style={{
              fontFamily: FONT, fontSize: 24, color: ACCENT,
              fontWeight: 'bold', margin: '0 0 4px', letterSpacing: '0.08em',
            }}>CO-SIGN $21K</p>
            <p style={{
              fontFamily: FONT, fontSize: 15, color: '#7F1D1D',
              margin: 0, lineHeight: 1.3,
            }}>You're on the hook for everything</p>
          </div>
        </div>

        {/* CTA */}
        <p style={{ ...headline(44, BLACK), opacity: ctaOpacity, lineHeight: 1.1, marginBottom: 10 }}>
          HELP WITHOUT
        </p>
        <p style={{ ...headline(44, ACCENT), opacity: ctaOpacity, lineHeight: 1.1, marginBottom: 22 }}>
          RISKING YOUR CREDIT
        </p>
        <p style={{
          fontFamily: FONT, fontSize: 26, color: BLACK, textAlign: 'center',
          opacity: ctaOpacity, fontWeight: 'normal', letterSpacing: '0.04em',
          lineHeight: 1.4, maxWidth: 840, margin: 0,
        }}>
          Follow for more money traps they never taught you.
        </p>
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
