import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, interpolate, spring, Easing } from 'remotion';

const BG_DARK = '#0D1117';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#3B82F6';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const GREEN = '#10B981';
const RED = '#EF4444';
const GRAY = '#6B7280';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children, bg, dur,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{ background: bg, opacity }}>{children}</AbsoluteFill>;
};

// ─── SCENE 1 — Dark — Animated stock chart + hook headline ───────────────────
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [70, 0]);

  const subSp = spring({ frame: Math.max(0, frame - 20), fps: 30, config: { damping: 12, stiffness: 60 } });
  const subY = interpolate(subSp, [0, 1], [50, 0]);
  const subOp = interpolate(frame, [20, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const lineProgress = interpolate(frame, [15, 185], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const pts: [number, number][] = [
    [0.00, 0.50], [0.05, 0.46], [0.10, 0.40], [0.15, 0.36],
    [0.20, 0.42], [0.25, 0.56], [0.30, 0.64],
    [0.34, 0.52], [0.38, 0.36],
    [0.43, 0.30], [0.50, 0.26],
    [0.55, 0.38], [0.60, 0.58], [0.64, 0.68],
    [0.68, 0.48], [0.72, 0.28],
    [0.76, 0.22], [0.82, 0.16], [0.88, 0.12], [0.94, 0.08], [1.00, 0.06],
  ];

  const CX = 80; const CY = 850;
  const CW = 920; const CH = 490;

  const visCount = Math.max(2, Math.floor(lineProgress * pts.length));
  const visPts = pts.slice(0, visCount);
  const ptStr = visPts.map(([x, y]) => `${CX + x * CW},${CY + y * CH}`).join(' ');
  const bestIdxs = [7, 8, 14, 15];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <text x="540" y={260 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="100" fontWeight="900" fill={ACCENT}
            letterSpacing="6">JUST 10 DAYS</text>
          <text x="540" y={380 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="46" fill={WHITE} letterSpacing="2">
            could cost you
          </text>
          <text x="540" y={490 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="80" fontWeight="900" fill={WHITE} letterSpacing="3">
            HALF YOUR MONEY
          </text>
          <text x="540" y={680 + subY} textAnchor="middle"
            fontFamily={FONT} fontSize="34" fill={GRAY} letterSpacing="3"
            opacity={subOp}>
            S&amp;P 500 — 2004 to 2024
          </text>

          <line x1={CX} y1={CY} x2={CX} y2={CY + CH} stroke={GRAY} strokeWidth="2" opacity="0.4" />
          <line x1={CX} y1={CY + CH} x2={CX + CW} y2={CY + CH} stroke={GRAY} strokeWidth="2" opacity="0.4" />

          {visPts.length >= 2 && (
            <polyline points={ptStr} fill="none" stroke={ACCENT} strokeWidth="5"
              strokeLinecap="round" strokeLinejoin="round" />
          )}

          {bestIdxs.map((idx) => {
            if (idx >= visCount || idx >= pts.length) return null;
            const [px, py] = pts[idx];
            return (
              <circle key={idx} cx={CX + px * CW} cy={CY + py * CH} r="16" fill={GREEN} />
            );
          })}

          <circle cx={CX + 20} cy={CY + CH + 80} r="12" fill={GREEN} />
          <text x={CX + 44} y={CY + CH + 87} fontFamily={FONT} fontSize="30" fill={WHITE}>
            10 BEST RECOVERY DAYS
          </text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 2 — Light — Gold coin + animated counter ─────────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  const coinSp = spring({ frame: Math.max(0, frame - 15), fps: 30, config: { damping: 12, stiffness: 70 } });
  const coinScale = interpolate(coinSp, [0, 1], [0.2, 1]);

  const counter = Math.round(interpolate(frame, [40, 200], [10000, 71750], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  }));

  const numOp = interpolate(frame, [38, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <text x="540" y={180 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="54" fontWeight="900" fill={BLACK}
            letterSpacing="3">YOU INVEST $10,000</text>
          <text x="540" y={272 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="40" fill={GRAY} letterSpacing="2">
            AND LEAVE IT ALONE FOR 20 YEARS
          </text>

          <g transform={`translate(540, 800) scale(${coinScale})`}>
            <circle cx="0" cy="0" r="290" fill="#F59E0B" />
            <circle cx="0" cy="0" r="255" fill="#D97706" />
            <text x="0" y="95" textAnchor="middle"
              fontFamily={FONT} fontSize="290" fontWeight="900" fill={WHITE}>
              $
            </text>
          </g>

          <text x="540" y={1195} textAnchor="middle"
            fontFamily={FONT} fontSize="104" fontWeight="900" fill={GREEN}
            opacity={numOp} letterSpacing="2">
            {`$${counter.toLocaleString()}`}
          </text>
          <text x="540" y={1320} textAnchor="middle"
            fontFamily={FONT} fontSize="40" fill={GRAY}
            opacity={numOp} letterSpacing="4">
            STAYED IN THE MARKET
          </text>
          <text x="540" y={1530} textAnchor="middle"
            fontFamily={FONT} fontSize="36" fill={BLACK} letterSpacing="2">
            but what if you panicked during crashes?
          </text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 3 — Dark — Two bars comparison ────────────────────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  const barSp = spring({ frame: Math.max(0, frame - 25), fps: 30, config: { damping: 16, stiffness: 90 } });
  const barPct = interpolate(barSp, [0, 1], [0, 1]);

  const maxH = 560;
  const leftH = maxH * barPct;
  const rightH = maxH * (32871 / 71750) * barPct;
  const barW = 200;
  const baseY = 1480;
  const barLblOp = interpolate(barPct, [0.3, 0.55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <text x="540" y={200 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="56" fontWeight="900" fill={WHITE}
            letterSpacing="4">SAME $10,000</text>
          <text x="540" y={292 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="44" fill={GRAY} letterSpacing="2">
            COMPLETELY DIFFERENT RESULT
          </text>

          <rect x={140} y={baseY - leftH} width={barW} height={leftH} fill={GREEN} rx="14" />
          <text x={140 + barW / 2} y={baseY - leftH - 24} textAnchor="middle"
            fontFamily={FONT} fontSize="44" fontWeight="900" fill={GREEN}
            opacity={barLblOp}>
            $71,750
          </text>
          <text x={140 + barW / 2} y={baseY + 56} textAnchor="middle"
            fontFamily={FONT} fontSize="28" fill={WHITE} letterSpacing="2">
            STAYED IN
          </text>

          <rect x={740} y={baseY - rightH} width={barW} height={rightH} fill={RED} rx="14" />
          <text x={740 + barW / 2} y={baseY - rightH - 24} textAnchor="middle"
            fontFamily={FONT} fontSize="44" fontWeight="900" fill={RED}
            opacity={barLblOp}>
            $32,871
          </text>
          <text x={740 + barW / 2} y={baseY + 56} textAnchor="middle"
            fontFamily={FONT} fontSize="28" fill={WHITE} letterSpacing="2">
            MISSED
          </text>
          <text x={740 + barW / 2} y={baseY + 92} textAnchor="middle"
            fontFamily={FONT} fontSize="28" fill={WHITE} letterSpacing="2">
            10 DAYS
          </text>

          <text x="540" y={baseY - 220} textAnchor="middle"
            fontFamily={FONT} fontSize="72" fontWeight="900" fill={ACCENT}
            letterSpacing="4">VS</text>

          <text x="540" y={baseY + 172} textAnchor="middle"
            fontFamily={FONT} fontSize="38" fill={RED} letterSpacing="2">
            $38,879 DIFFERENCE
          </text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 4 — Light — Timeline showing crash/recovery clustering ─────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  const redOp = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const greenOp = interpolate(frame, [70, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [100, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const TLX = 100; const TLY = 980;
  const TLW = 880;

  const worstFracs = [0.22, 0.26, 0.30, 0.33, 0.52, 0.54, 0.73, 0.76, 0.79, 0.82];
  const bestFracs  = [0.24, 0.28, 0.32, 0.35, 0.51, 0.56, 0.72, 0.75, 0.80, 0.84];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <text x="540" y={200 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="80" fontWeight="900" fill={BLACK}
            letterSpacing="4">6 OF 10</text>
          <text x="540" y={308 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="50" fill={BLACK} letterSpacing="2">
            BEST DAYS HAPPEN
          </text>
          <text x="540" y={418 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="56" fontWeight="900" fill={RED}
            letterSpacing="2">DURING CRASHES</text>

          <text x={TLX} y={TLY + 52} fontFamily={FONT} fontSize="26" fill={GRAY}>2004</text>
          <text x={TLX + TLW / 2 - 22} y={TLY + 52} fontFamily={FONT} fontSize="26" fill={GRAY}>2014</text>
          <text x={TLX + TLW - 44} y={TLY + 52} fontFamily={FONT} fontSize="26" fill={GRAY}>2024</text>

          <line x1={TLX} y1={TLY} x2={TLX + TLW} y2={TLY}
            stroke={BLACK} strokeWidth="4" opacity="0.25" />

          {worstFracs.map((f, i) => {
            const cx = TLX + f * TLW;
            return (
              <g key={i} opacity={redOp}>
                <line x1={cx - 18} y1={TLY - 18} x2={cx + 18} y2={TLY + 18}
                  stroke={RED} strokeWidth="5" strokeLinecap="round" />
                <line x1={cx + 18} y1={TLY - 18} x2={cx - 18} y2={TLY + 18}
                  stroke={RED} strokeWidth="5" strokeLinecap="round" />
              </g>
            );
          })}

          {bestFracs.map((f, i) => {
            const cx = TLX + f * TLW;
            return (
              <circle key={i} cx={cx} cy={TLY - 60} r="20" fill={GREEN} opacity={greenOp} />
            );
          })}

          <g opacity={labelOp}>
            <line x1={290} y1={TLY + 148} x2={312} y2={TLY + 170}
              stroke={RED} strokeWidth="4" strokeLinecap="round" />
            <line x1={312} y1={TLY + 148} x2={290} y2={TLY + 170}
              stroke={RED} strokeWidth="4" strokeLinecap="round" />
            <text x={330} y={TLY + 167} fontFamily={FONT} fontSize="30" fill={BLACK}>
              WORST DAY
            </text>
            <circle cx={296} cy={TLY + 228} r="16" fill={GREEN} />
            <text x={330} y={TLY + 235} fontFamily={FONT} fontSize="30" fill={BLACK}>
              BEST DAY
            </text>
          </g>

          <text x="540" y={1600} textAnchor="middle"
            fontFamily={FONT} fontSize="36" fill={GRAY} letterSpacing="2"
            opacity={labelOp}>
            the market punishes people who run
          </text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 5 — Dark — Person running + crash arrow + cost callout ─────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  const personSp = spring({ frame: Math.max(0, frame - 10), fps: 30, config: { damping: 12, stiffness: 70 } });
  const personX = interpolate(personSp, [0, 1], [-200, 0]);

  const numSp = spring({ frame: Math.max(0, frame - 40), fps: 30, config: { damping: 14, stiffness: 80 } });
  const numY = interpolate(numSp, [0, 1], [60, 0]);
  const numOp = interpolate(frame, [40, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const crashPts: [number, number][] = [
    [0.0, 0.08], [0.1, 0.14], [0.2, 0.22], [0.3, 0.36],
    [0.4, 0.50], [0.5, 0.64], [0.6, 0.74], [0.7, 0.84],
    [0.85, 0.92], [1.0, 0.97],
  ];
  const cX = 590; const cY = 620;
  const cW = 400; const cH = 400;
  const crashStr = crashPts.map(([x, y]) => `${cX + x * cW},${cY + y * cH}`).join(' ');

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <text x="540" y={200 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="70" fontWeight="900" fill={WHITE}
            letterSpacing="4">YOUR BRAIN</text>
          <text x="540" y={300 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="50" fill={WHITE} letterSpacing="2">
            sees a crash and screams
          </text>
          <text x="540" y={408 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="80" fontWeight="900" fill={RED}
            letterSpacing="4">GET OUT!</text>

          <g transform={`translate(${personX}, 0)`}>
            <circle cx="240" cy="780" r="68" fill={WHITE} />
            <rect x="202" y="848" width="76" height="176" fill={WHITE} rx="20" />
            <line x1="235" y1="1024" x2="168" y2="1156"
              stroke={WHITE} strokeWidth="22" strokeLinecap="round" />
            <line x1="255" y1="1024" x2="318" y2="1140"
              stroke={WHITE} strokeWidth="22" strokeLinecap="round" />
            <line x1="220" y1="876" x2="142" y2="988"
              stroke={WHITE} strokeWidth="18" strokeLinecap="round" />
            <line x1="270" y1="868" x2="348" y2="948"
              stroke={WHITE} strokeWidth="18" strokeLinecap="round" />
          </g>

          <polyline points={crashStr} fill="none" stroke={RED} strokeWidth="6"
            strokeLinecap="round" strokeLinejoin="round" />
          <polygon
            points={`${cX + cW},${cY + cH * 0.97} ${cX + cW - 28},${cY + cH * 0.87} ${cX + cW + 28},${cY + cH * 0.87}`}
            fill={RED}
          />

          <text x="540" y={1250 + numY} textAnchor="middle"
            fontFamily={FONT} fontSize="96" fontWeight="900" fill={RED}
            opacity={numOp} letterSpacing="4">$38,879</text>
          <text x="540" y={1368 + numY} textAnchor="middle"
            fontFamily={FONT} fontSize="44" fill={WHITE}
            opacity={numOp} letterSpacing="3">LOST TO PANIC</text>

          <text x="540" y={1580} textAnchor="middle"
            fontFamily={FONT} fontSize="34" fill={GRAY} letterSpacing="2">
            by the time you run, recovery has started
          </text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── SCENE 6 — Light — 3-step CTA + rising chart ─────────────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleSp = spring({ frame, fps: 30, config: { damping: 14, stiffness: 80 } });
  const titleY = interpolate(titleSp, [0, 1], [60, 0]);

  const s1Op = interpolate(frame, [22, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s2Op = interpolate(frame, [52, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const s3Op = interpolate(frame, [82, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaOp = interpolate(frame, [128, 158], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaSp = spring({ frame: Math.max(0, frame - 128), fps: 30, config: { damping: 12, stiffness: 70 } });
  const ctaScale = interpolate(ctaSp, [0, 1], [0.8, 1]);

  const linePts: [number, number][] = [
    [0.0, 0.92], [0.1, 0.84], [0.2, 0.76], [0.3, 0.68],
    [0.4, 0.60], [0.5, 0.50], [0.6, 0.40], [0.7, 0.30],
    [0.8, 0.20], [0.9, 0.11], [1.0, 0.05],
  ];
  const LX = 80; const LY = 1310;
  const LW = 920; const LH = 340;
  const lineStr = linePts.map(([x, y]) => `${LX + x * LW},${LY + y * LH}`).join(' ');

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920">
          <text x="540" y={175 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="64" fontWeight="900" fill={BLACK}
            letterSpacing="4">THE WINNING MOVE</text>
          <text x="540" y={268 + titleY} textAnchor="middle"
            fontFamily={FONT} fontSize="40" fill={GRAY} letterSpacing="2">
            is boring on purpose
          </text>

          <g opacity={s1Op}>
            <circle cx="104" cy="520" r="38" fill={ACCENT} />
            <text x="104" y="533" textAnchor="middle"
              fontFamily={FONT} fontSize="34" fontWeight="900" fill={WHITE}>1</text>
            <text x="164" y="534" fontFamily={FONT} fontSize="50" fontWeight="900"
              fill={BLACK} letterSpacing="2">AUTOMATE IT</text>
          </g>

          <g opacity={s2Op}>
            <circle cx="104" cy="660" r="38" fill={ACCENT} />
            <text x="104" y="673" textAnchor="middle"
              fontFamily={FONT} fontSize="34" fontWeight="900" fill={WHITE}>2</text>
            <text x="164" y="674" fontFamily={FONT} fontSize="50" fontWeight="900"
              fill={BLACK} letterSpacing="2">STOP WATCHING</text>
          </g>

          <g opacity={s3Op}>
            <circle cx="104" cy="800" r="38" fill={ACCENT} />
            <text x="104" y="813" textAnchor="middle"
              fontFamily={FONT} fontSize="34" fontWeight="900" fill={WHITE}>3</text>
            <text x="164" y="814" fontFamily={FONT} fontSize="50" fontWeight="900"
              fill={BLACK} letterSpacing="2">NEVER PANIC-SELL</text>
          </g>

          <line x1={LX} y1={LY} x2={LX} y2={LY + LH}
            stroke={GRAY} strokeWidth="2" opacity="0.3" />
          <line x1={LX} y1={LY + LH} x2={LX + LW} y2={LY + LH}
            stroke={GRAY} strokeWidth="2" opacity="0.3" />
          <polyline points={lineStr} fill="none" stroke={GREEN} strokeWidth="6"
            strokeLinecap="round" strokeLinejoin="round" />

          <g opacity={ctaOp} transform={`translate(540, 1762) scale(${ctaScale})`}>
            <rect x="-278" y="-54" width="556" height="88" rx="44" fill={ACCENT} />
            <text x="0" y="14" textAnchor="middle"
              fontFamily={FONT} fontSize="40" fontWeight="900" fill={WHITE}
              letterSpacing="4">FOLLOW FOR MORE</text>
          </g>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

// ─── COMPOSITION ──────────────────────────────────────────────────────────────
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
