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
const BG_LIGHT = '#F8F8F8';
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
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.15,
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

// ─── SCENE 2: Animated counter → $204,240 paid, $0 kept ───────────────────────
const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame, [20, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const counterVal = Math.floor(progress * 204240);
  const formatted = '$' + counterVal.toLocaleString();

  const labelIn = spring({ frame: Math.max(0, frame - 140), fps, config: { damping: 14, stiffness: 80 } });
  const slideUp = spring({ frame, fps, config: { damping: 14, stiffness: 70 }, from: 50, to: 0 });

  // Cash stack: 6 bills, shrink as counter rises
  const billCount = Math.max(0, Math.floor(6 - progress * 6));
  const billsVisible = Math.max(0, Math.floor((1 - progress) * 6));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${slideUp}px)`,
        }}
      >
        {/* Big counter */}
        <p style={{ ...headline(44, BLACK), opacity: 0.5, marginBottom: 16 }}>10 YEARS OF RENT</p>
        <p style={{ ...headline(110, ACCENT), marginBottom: 8 }}>{formatted}</p>

        {/* Cash bill stack SVG */}
        <svg width="320" height="180" viewBox="0 0 320 180" style={{ marginBottom: 32 }}>
          {Array.from({ length: Math.max(0, Math.floor(billsVisible)) }).map((_, i) => (
            <rect
              key={i}
              x={20 + i * 4}
              y={40 - i * 12}
              width={260}
              height={100}
              rx={10}
              fill={i % 2 === 0 ? '#2D6A4F' : '#1B4332'}
              stroke="#0A3020"
              strokeWidth={2}
              opacity={0.9}
            />
          ))}
          {billsVisible === 0 && (
            <text x={160} y={100} textAnchor="middle" fill={ACCENT} fontSize={52} fontFamily={FONT}>
              $0
            </text>
          )}
        </svg>

        {/* $0 kept label */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${labelIn})`,
          }}
        >
          <p style={{ ...headline(56, BLACK), marginBottom: 4 }}>YOU KEPT</p>
          <p style={{ ...headline(140, ACCENT), marginTop: 0 }}>$0</p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 3: Split bar chart — landlord $95,900 vs you $0 ─────────────────────
const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barGrow = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 16, stiffness: 60 } });
  const labelIn = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 14, stiffness: 80 } });
  const zeroIn = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 14, stiffness: 80 } });

  const BAR_H = 520;
  const landlordH = barGrow * BAR_H;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Top headline */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <p style={{ ...headline(48, WHITE), opacity: 0.6 }}>AFTER 10 YEARS</p>
        <p style={{ ...headline(64, WHITE) }}>WHO GOT RICHER?</p>
      </div>

      {/* Bar chart */}
      <svg
        width="1080"
        height="900"
        viewBox="0 0 1080 900"
        style={{ position: 'absolute', top: 500, left: 0 }}
      >
        {/* Landlord bar */}
        <rect
          x={140}
          y={BAR_H - landlordH + 20}
          width={300}
          height={landlordH}
          rx={12}
          fill={GREEN}
          opacity={0.9}
        />
        {/* Equity label on bar */}
        {barGrow > 0.3 && (
          <text
            x={290}
            y={BAR_H - landlordH + 20 + landlordH / 2}
            textAnchor="middle"
            fill={WHITE}
            fontSize={38}
            fontFamily={FONT}
          >
            $95,900
          </text>
        )}

        {/* You bar — just the outline, empty */}
        <rect x={640} y={20} width={300} height={BAR_H} rx={12} fill="none" stroke={ACCENT} strokeWidth={4} />
        {/* $0 centered */}
        <text
          x={790}
          y={BAR_H / 2 + 20}
          textAnchor="middle"
          fill={ACCENT}
          fontSize={80}
          fontFamily={FONT}
          opacity={zeroIn}
        >
          $0
        </text>

        {/* Axis line */}
        <line x1={80} y1={BAR_H + 20} x2={1000} y2={BAR_H + 20} stroke={WHITE} strokeWidth={3} opacity={0.3} />

        {/* Labels */}
        <text x={290} y={BAR_H + 70} textAnchor="middle" fill={GREEN} fontSize={40} fontFamily={FONT} opacity={labelIn}>
          LANDLORD
        </text>
        <text x={790} y={BAR_H + 70} textAnchor="middle" fill={ACCENT} fontSize={40} fontFamily={FONT} opacity={labelIn}>
          YOU
        </text>
      </svg>

      {/* Bottom note */}
      <div style={{ position: 'absolute', bottom: 120, left: 60, right: 60, textAlign: 'center' }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 38, color: WHITE, opacity: 0.5, margin: 0 }}>
          equity after 10 years of rent
        </p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 4: Thought bubble "SOMEDAY" — 63% never buy ───────────────────────
const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const personIn = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const bubbleIn = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 14, stiffness: 60 } });
  const statIn = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 12, stiffness: 70 } });

  // Calendar page flip — just an offset
  const calPage = Math.floor(interpolate(frame, [60, 200], [1, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      {/* Top headline */}
      <div style={{ position: 'absolute', top: 140, left: 60, right: 60, textAlign: 'center' }}>
        <p style={{ ...headline(56, BLACK) }}>THE &ldquo;SOMEDAY&rdquo; TRAP</p>
      </div>

      <svg
        width="1080"
        height="1200"
        viewBox="0 0 1080 1200"
        style={{ position: 'absolute', top: 340, left: 0 }}
      >
        {/* Person */}
        <g transform={`scale(${personIn}) translate(${(1 - personIn) * 540}, ${(1 - personIn) * 300})`}>
          {/* Head */}
          <circle cx={400} cy={280} r={70} fill={BLACK} />
          {/* Body */}
          <rect x={340} y={350} width={120} height={160} rx={16} fill={BLACK} />
          {/* Arms */}
          <rect x={240} y={360} width={100} height={24} rx={10} fill={BLACK} />
          <rect x={460} y={360} width={100} height={24} rx={10} fill={BLACK} />
          {/* Legs */}
          <rect x={352} y={510} width={36} height={120} rx={10} fill={BLACK} />
          <rect x={412} y={510} width={36} height={120} rx={10} fill={BLACK} />
        </g>

        {/* Thought bubble dots */}
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={490 + i * 30}
            cy={240 - i * 30}
            r={10 + i * 4}
            fill={WHITE}
            stroke="#CCCCCC"
            strokeWidth={2}
            opacity={bubbleIn}
          />
        ))}

        {/* Thought bubble */}
        <ellipse cx={700} cy={100} rx={200} ry={110} fill={WHITE} stroke="#CCCCCC" strokeWidth={3} opacity={bubbleIn} />

        {/* House inside bubble */}
        <g opacity={bubbleIn}>
          <polygon points="700,20 620,80 780,80" fill={ACCENT} />
          <rect x={630} y={80} width={140} height={90} rx={6} fill="#D4A5A5" />
          <rect x={672} y={120} width={36} height={50} rx={4} fill={BLACK} />
        </g>
        <text x={700} y={115} textAnchor="middle" fill={BLACK} fontSize={32} fontFamily={FONT} opacity={bubbleIn}>
          SOMEDAY
        </text>

        {/* Calendar */}
        <g transform="translate(600, 700)" opacity={statIn}>
          <rect x={0} y={0} width={200} height={180} rx={12} fill={WHITE} stroke="#CCCCCC" strokeWidth={3} />
          <rect x={0} y={0} width={200} height={50} rx={12} fill={ACCENT} />
          <rect x={0} y={30} width={200} height={20} fill={ACCENT} />
          <text x={100} y={34} textAnchor="middle" fill={WHITE} fontSize={26} fontFamily={FONT}>
            MONTH {calPage}
          </text>
          <text x={100} y={120} textAnchor="middle" fill={BLACK} fontSize={64} fontFamily={FONT}>
            {calPage}
          </text>
        </g>
      </svg>

      {/* Stat */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          left: 60,
          right: 60,
          textAlign: 'center',
          transform: `scale(${statIn})`,
        }}
      >
        <p style={{ ...headline(90, ACCENT), marginBottom: 0 }}>63%</p>
        <p style={{ ...headline(46, BLACK), marginBottom: 0 }}>PLAN TO BUY SOMEDAY</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 40, color: BLACK, opacity: 0.55, margin: '12px 0 0' }}>
          most never do
        </p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 5: Mortgage vs Rent payment bars ───────────────────────────────────
const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barIn = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 60 } });
  const equityIn = spring({ frame: Math.max(0, frame - 80), fps, config: { damping: 14, stiffness: 70 } });
  const labelIn = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 14, stiffness: 80 } });

  const TOTAL_H = 480;
  const EQUITY_FRAC = 0.38; // ~38% of mortgage payment goes to equity/principal in first decade
  const equityH = EQUITY_FRAC * TOTAL_H * equityIn;
  const interestH = (1 - EQUITY_FRAC) * TOTAL_H * barIn;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      {/* Top headline */}
      <div style={{ position: 'absolute', top: 140, left: 60, right: 60, textAlign: 'center' }}>
        <p style={{ ...headline(52, WHITE), opacity: 0.6 }}>SAME MONTHLY PAYMENT</p>
        <p style={{ ...headline(68, WHITE) }}>VERY DIFFERENT OUTCOME</p>
      </div>

      <svg
        width="1080"
        height="900"
        viewBox="0 0 1080 900"
        style={{ position: 'absolute', top: 420, left: 0 }}
      >
        {/* MORTGAGE bar */}
        {/* Interest/costs portion */}
        <rect x={100} y={TOTAL_H - interestH + 20} width={320} height={interestH} rx={12} fill="#374151" />
        {/* Equity portion (green, on top) */}
        <rect
          x={100}
          y={TOTAL_H - interestH - equityH + 20}
          width={320}
          height={equityH}
          rx={12}
          fill={GREEN}
        />
        {/* Equity label */}
        {equityIn > 0.2 && (
          <text
            x={260}
            y={TOTAL_H - interestH - equityH / 2 + 20}
            textAnchor="middle"
            fill={WHITE}
            fontSize={34}
            fontFamily={FONT}
          >
            EQUITY ↑
          </text>
        )}

        {/* RENT bar — entirely dark */}
        <rect x={660} y={20} width={320} height={TOTAL_H} rx={12} fill="#374151" opacity={barIn} />
        {/* $0 back label */}
        <text
          x={820}
          y={TOTAL_H / 2 + 30}
          textAnchor="middle"
          fill={ACCENT}
          fontSize={56}
          fontFamily={FONT}
          opacity={labelIn}
        >
          $0 BACK
        </text>

        {/* Axis */}
        <line x1={60} y1={TOTAL_H + 20} x2={1020} y2={TOTAL_H + 20} stroke={WHITE} strokeWidth={2} opacity={0.25} />

        {/* Bar labels */}
        <text x={260} y={TOTAL_H + 70} textAnchor="middle" fill={GREEN} fontSize={42} fontFamily={FONT} opacity={labelIn}>
          MORTGAGE
        </text>
        <text x={820} y={TOTAL_H + 70} textAnchor="middle" fill={ACCENT} fontSize={42} fontFamily={FONT} opacity={labelIn}>
          RENT
        </text>
      </svg>

      {/* Bottom note */}
      <div style={{ position: 'absolute', bottom: 140, left: 60, right: 60, textAlign: 'center' }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 38, color: WHITE, opacity: 0.5, margin: 0 }}>
          after 10 years: ~$95K in equity vs $0
        </p>
      </div>
    </FadeScene>
  );
};

// ─── SCENE 6: CTA — run your numbers, piggy bank filling ─────────────────────
const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideUp = spring({ frame, fps, config: { damping: 14, stiffness: 70 }, from: 60, to: 0 });
  const piggyFill = interpolate(frame, [30, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaIn = spring({ frame: Math.max(0, frame - 100), fps, config: { damping: 12, stiffness: 80 } });

  // House spring
  const houseIn = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 60 } });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `translateY(${slideUp}px)`,
        }}
      >
        <svg width="700" height="520" viewBox="0 0 700 520">
          {/* House */}
          <g transform={`scale(${houseIn}) translate(${(1 - houseIn) * 175}, ${(1 - houseIn) * 130})`}>
            {/* Roof */}
            <polygon points="350,40 170,170 530,170" fill={ACCENT} />
            {/* Body */}
            <rect x={190} y={170} width={320} height={220} rx={10} fill={BLACK} />
            {/* Door */}
            <rect x={318} y={270} width={64} height={120} rx={8} fill={BG_DARK} />
            {/* Windows */}
            <rect x={212} y={210} width={80} height={70} rx={6} fill={ACCENT} opacity={0.4} />
            <rect x={408} y={210} width={80} height={70} rx={6} fill={ACCENT} opacity={0.4} />
            {/* Chimney */}
            <rect x={450} y={80} width={40} height={100} rx={4} fill={BLACK} />
          </g>

          {/* Piggy bank (right side) */}
          <g transform="translate(420, 240)">
            {/* Body */}
            <ellipse cx={100} cy={80} rx={90} ry={75} fill="#F9A8D4" />
            {/* Snout */}
            <ellipse cx={168} cy={85} rx={30} ry={22} fill="#FBCFE8" />
            <circle cx={162} cy={82} r={6} fill={BLACK} />
            <circle cx={175} cy={82} r={6} fill={BLACK} />
            {/* Eye */}
            <circle cx={130} cy={50} r={8} fill={BLACK} />
            {/* Ear */}
            <ellipse cx={72} cy={22} rx={18} ry={24} fill="#FBCFE8" />
            {/* Leg */}
            <rect x={60} y={140} width={24} height={36} rx={8} fill="#F9A8D4" />
            <rect x={116} y={140} width={24} height={36} rx={8} fill="#F9A8D4" />
            {/* Coin slot — fill with green to show filling */}
            <rect x={80} y={10} width={40} height={8} rx={4} fill={BLACK} />
            {/* Fill overlay */}
            <ellipse
              cx={100}
              cy={80}
              rx={90}
              ry={75}
              fill={GREEN}
              opacity={piggyFill * 0.55}
              clipPath="url(#piggyClip)"
            />
            <defs>
              <clipPath id="piggyClip">
                <rect x={10} y={80 + (1 - piggyFill) * 75} width={180} height={piggyFill * 80} />
              </clipPath>
            </defs>
            {/* Coin going in */}
            {piggyFill > 0.1 && (
              <ellipse
                cx={100}
                cy={interpolate(piggyFill, [0.1, 0.9], [-30, 10])}
                rx={14}
                ry={8}
                fill={GREEN}
                opacity={0.9}
              />
            )}
          </g>

          {/* Arrow up */}
          <g transform="translate(340, 300)" opacity={ctaIn}>
            <line x1={0} y1={80} x2={0} y2={10} stroke={GREEN} strokeWidth={6} strokeLinecap="round" />
            <polygon points="0,0 -12,22 12,22" fill={GREEN} />
          </g>
        </svg>

        {/* CTA text */}
        <div
          style={{
            textAlign: 'center',
            transform: `scale(${ctaIn})`,
            marginTop: 24,
          }}
        >
          <p style={{ ...headline(80, BLACK), marginBottom: 8 }}>RUN YOUR</p>
          <p style={{ ...headline(80, BLACK), marginBottom: 24 }}>NUMBERS</p>
          <div
            style={{
              width: 300,
              height: 8,
              background: ACCENT,
              borderRadius: 4,
              margin: '0 auto 28px',
            }}
          />
          <p
            style={{
              fontFamily: FONT_BODY,
              fontSize: 40,
              color: BLACK,
              opacity: 0.6,
              margin: 0,
              textAlign: 'center',
            }}
          >
            renting is a choice — know the price
          </p>
        </div>
      </div>
    </FadeScene>
  );
};

// ─── ROOT COMPOSITION ─────────────────────────────────────────────────────────

// Scene 1: Person sending rent → house with bank icon. Dollar signs float across.
const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideUp = spring({ frame, fps, config: { damping: 14, stiffness: 80 }, from: 60, to: 0 });
  const fade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Dollar signs at fixed positions, each delayed
  const dollarOffsets = [0, 18, 36];
  const dollarProgress = dollarOffsets.map((delay) =>
    interpolate(frame - delay, [0, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  // Person SVG (left side): circle head + body
  const personX = 200;
  const personY = 900;

  // House SVG (right side)
  const houseX = 780;
  const houseY = 850;

  // Label spring
  const labelScale = spring({ frame: Math.max(0, frame - 40), fps, config: { damping: 12, stiffness: 70 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{ opacity: fade }}>
        <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{ position: 'absolute', top: 0, left: 0 }}>
          {/* Person silhouette */}
          <circle cx={personX} cy={personY - 120} r={60} fill={WHITE} />
          <rect x={personX - 45} y={personY - 60} width={90} height={130} rx={12} fill={WHITE} />
          {/* Arms */}
          <rect x={personX - 90} y={personY - 50} width={50} height={20} rx={8} fill={WHITE} />
          <rect x={personX + 40} y={personY - 50} width={50} height={20} rx={8} fill={WHITE} />
          {/* Legs */}
          <rect x={personX - 35} y={personY + 70} width={28} height={100} rx={8} fill={WHITE} />
          <rect x={personX + 7} y={personY + 70} width={28} height={100} rx={8} fill={WHITE} />

          {/* House silhouette */}
          {/* Roof triangle */}
          <polygon
            points={`${houseX},${houseY - 180} ${houseX - 180},${houseY - 20} ${houseX + 180},${houseY - 20}`}
            fill={ACCENT}
          />
          {/* House body */}
          <rect x={houseX - 150} y={houseY - 20} width={300} height={200} rx={8} fill="#8B0000" />
          {/* Door */}
          <rect x={houseX - 30} y={houseY + 80} width={60} height={100} rx={6} fill={BLACK} />
          {/* Windows */}
          <rect x={houseX - 110} y={houseY + 30} width={60} height={50} rx={4} fill={BG_DARK} />
          <rect x={houseX + 50} y={houseY + 30} width={60} height={50} rx={4} fill={BG_DARK} />
          {/* Chimney */}
          <rect x={houseX + 70} y={houseY - 210} width={36} height={100} rx={4} fill="#8B0000" />

          {/* Bank pillars above house */}
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={houseX - 60 + i * 40}
              y={houseY - 310}
              width={16}
              height={90}
              rx={4}
              fill={WHITE}
              opacity={0.7}
            />
          ))}
          <rect x={houseX - 80} y={houseY - 320} width={160} height={18} rx={4} fill={WHITE} opacity={0.7} />
          <text
            x={houseX}
            y={houseY - 340}
            textAnchor="middle"
            fill={WHITE}
            fontSize={28}
            fontFamily={FONT}
            opacity={0.9}
          >
            BANK
          </text>

          {/* Floating dollar signs */}
          {dollarProgress.map((p, i) => {
            const startX = personX + 60;
            const endX = houseX - 160;
            const midY = personY - 60 + i * 40;
            const x = interpolate(p, [0, 1], [startX, endX]);
            const yArc = midY - Math.sin(p * Math.PI) * 80;
            return (
              <text
                key={i}
                x={x}
                y={yArc}
                textAnchor="middle"
                fill={ACCENT}
                fontSize={48}
                fontFamily={FONT}
                opacity={interpolate(p, [0, 0.1, 0.85, 1], [0, 1, 1, 0])}
              >
                $
              </text>
            );
          })}

          {/* Arrow from person to house */}
          <line
            x1={personX + 60}
            y1={personY - 30}
            x2={houseX - 160}
            y2={personY - 30}
            stroke={ACCENT}
            strokeWidth={4}
            strokeDasharray="16 8"
            opacity={0.4}
          />
        </svg>

        {/* Top label */}
        <div
          style={{
            position: 'absolute',
            top: 160,
            left: 0,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `translateY(${slideUp}px)`,
          }}
        >
          <p style={{ ...headline(52, WHITE), opacity: 0.6, marginBottom: 8 }}>nobody tells you this</p>
          <p style={{ ...headline(72, ACCENT) }}>WHOSE WEALTH</p>
          <p style={{ ...headline(72, ACCENT) }}>ARE YOU</p>
          <p style={{ ...headline(72, ACCENT) }}>BUILDING?</p>
        </div>

        {/* Bottom labels */}
        <div
          style={{
            position: 'absolute',
            bottom: 280,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-around',
            transform: `scale(${labelScale})`,
          }}
        >
          <p style={{ ...headline(44, WHITE), opacity: 0.8 }}>YOU</p>
          <p style={{ ...headline(44, ACCENT) }}>LANDLORD</p>
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
