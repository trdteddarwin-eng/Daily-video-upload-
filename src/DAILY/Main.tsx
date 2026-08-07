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
const GRAY = '#888888';
const GREEN = '#10B981';
const YELLOW = '#FBBF24';
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
  const opacity = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ background: bg, opacity }}>
      {children}
    </AbsoluteFill>
  );
};

const Scene1: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const paperY = spring({ frame, fps, from: 340, to: 0, config: { damping: 14, mass: 1, stiffness: 90 } });
  const paperOp = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });

  const lineOps = [0, 1, 2, 3].map((i) =>
    interpolate(frame, [28 + i * 18, 50 + i * 18], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const headS = spring({ frame: Math.max(0, frame - 95), fps, from: 0, to: 1, config: { damping: 12, stiffness: 80 } });
  const eyeR = interpolate(frame, [125, 158], [5, 15], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const mouthOp = interpolate(frame, [150, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleOp = interpolate(frame, [15, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ROWS = [
    { label: 'FOOD', amt: '$400' },
    { label: 'GAS', amt: '$200' },
    { label: 'FUN', amt: '$150' },
    { label: 'CLOTHES', amt: '$100' },
  ];

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 40,
        }}
      >
        <div style={{ opacity: titleOp, textAlign: 'center' }}>
          <p style={headline(50, WHITE)}>THE BUDGET</p>
          <p style={{ ...headline(50, ACCENT), marginTop: 8 }}>THAT BACKFIRES</p>
        </div>

        <div
          style={{
            opacity: paperOp,
            transform: `translateY(${paperY}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 52,
          }}
        >
          {/* Budget paper */}
          <svg width={310} height={370} viewBox="0 0 310 370">
            {/* Paper */}
            <rect x={6} y={6} width={298} height={358} rx={18} fill="#F5F5F5" stroke={ACCENT} strokeWidth={4} />
            {/* Header bar */}
            <rect x={6} y={6} width={298} height={62} rx={18} fill={ACCENT} />
            <rect x={6} y={44} width={298} height={24} fill={ACCENT} />
            <text
              x={155} y={50}
              textAnchor="middle"
              fontFamily={`"Arial Black", sans-serif`}
              fontSize={26}
              fill={WHITE}
            >
              MY BUDGET
            </text>
            {/* Rows */}
            {ROWS.map((row, i) => (
              <g key={i} opacity={lineOps[i]}>
                <text
                  x={30} y={108 + i * 64}
                  fontFamily={`"Arial Black", sans-serif`}
                  fontSize={22}
                  fill={BLACK}
                >
                  {row.label}
                </text>
                <text
                  x={278} y={108 + i * 64}
                  textAnchor="end"
                  fontFamily={`"Arial Black", sans-serif`}
                  fontSize={22}
                  fill={ACCENT}
                >
                  {row.amt}
                </text>
                <line
                  x1={26} y1={116 + i * 64}
                  x2={284} y2={116 + i * 64}
                  stroke="#CCC"
                  strokeWidth={1.5}
                />
              </g>
            ))}
            {/* Total */}
            <g opacity={lineOps[3]}>
              <rect x={18} y={322} width={274} height={34} rx={8} fill={ACCENT} opacity={0.14} />
              <text
                x={30} y={346}
                fontFamily={`"Arial Black", sans-serif`}
                fontSize={20}
                fill={BLACK}
              >
                TOTAL
              </text>
              <text
                x={278} y={346}
                textAnchor="end"
                fontFamily={`"Arial Black", sans-serif`}
                fontSize={20}
                fill={ACCENT}
              >
                $850
              </text>
            </g>
          </svg>

          {/* Shocked person head */}
          <svg
            width={176}
            height={200}
            viewBox="0 0 176 200"
            style={{ transform: `scale(${headS})` }}
          >
            <circle cx={88} cy={88} r={76} fill="none" stroke={WHITE} strokeWidth={5} />
            {/* Eyes */}
            <circle cx={62} cy={74} r={eyeR} fill={WHITE} />
            <circle cx={114} cy={74} r={eyeR} fill={WHITE} />
            <circle cx={65} cy={77} r={Math.max(2, eyeR - 6)} fill={BLACK} />
            <circle cx={117} cy={77} r={Math.max(2, eyeR - 6)} fill={BLACK} />
            {/* Mouth — shocked O */}
            <ellipse cx={88} cy={116} rx={16} ry={20} fill="none" stroke={WHITE} strokeWidth={4} opacity={mouthOp} />
            {/* Sweat drop */}
            <ellipse cx={140} cy={42} rx={7} ry={11} fill={ACCENT} opacity={mouthOp} />
          </svg>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();

  const titleS = interpolate(frame, [0, 28], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const spending = Math.floor(
    interpolate(frame, [28, 165], [0, 480], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );
  const stampOp = interpolate(frame, [175, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const stampScale = interpolate(frame, [175, 210], [1.4, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const TRACK_W = 640;
  const limitFrac = 400 / 480;
  const limitX = limitFrac * TRACK_W;
  const filledFrac = spending / 480;
  const filledW = Math.min(filledFrac * TRACK_W, TRACK_W);
  const isOver = spending > 400;
  const barColor = isOver ? ACCENT : GREEN;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 36,
        }}
      >
        <div style={{ transform: `scale(${titleS})`, textAlign: 'center' }}>
          <p style={headline(44, BLACK)}>YOUR BUDGET IS</p>
          <p style={{ ...headline(44, ACCENT), marginTop: 8 }}>A PERMISSION SLIP</p>
        </div>

        {/* Fork + knife icon */}
        <svg width={240} height={110} viewBox="0 0 240 110">
          {/* Fork */}
          <line x1={46} y1={18} x2={46} y2={56} stroke={BLACK} strokeWidth={5} strokeLinecap="round" />
          <line x1={60} y1={18} x2={60} y2={56} stroke={BLACK} strokeWidth={5} strokeLinecap="round" />
          <line x1={74} y1={18} x2={74} y2={56} stroke={BLACK} strokeWidth={5} strokeLinecap="round" />
          <path d="M 46,56 Q 60,74 74,56" fill="none" stroke={BLACK} strokeWidth={5} strokeLinecap="round" />
          <line x1={60} y1={74} x2={60} y2={102} stroke={BLACK} strokeWidth={5} strokeLinecap="round" />
          {/* Knife */}
          <line x1={120} y1={18} x2={120} y2={102} stroke={BLACK} strokeWidth={5} strokeLinecap="round" />
          <path d="M 120,18 C 148,22 150,54 120,68" fill={BLACK} opacity={0.7} />
          {/* Label */}
          <text
            x={176}
            y={66}
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={34}
            fill={BLACK}
          >
            EAT
          </text>
        </svg>

        {/* Spending counter */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: 24, color: GRAY, margin: 0 }}>
            RESTAURANT BUDGET: $400
          </p>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 96,
              color: isOver ? ACCENT : BLACK,
              margin: 0,
              lineHeight: 1,
            }}
          >
            ${spending}
          </p>
        </div>

        {/* Progress bar */}
        <svg width={700} height={72} viewBox="0 0 700 72">
          {/* Track */}
          <rect x={28} y={18} width={TRACK_W} height={36} rx={18} fill="#DEDEDE" />
          {/* Fill */}
          <rect x={28} y={18} width={filledW} height={36} rx={18} fill={barColor} />
          {/* Budget limit line */}
          <line
            x1={28 + limitX} y1={8}
            x2={28 + limitX} y2={62}
            stroke="#555"
            strokeWidth={3}
            strokeDasharray="7,4"
          />
          <text
            x={28 + limitX}
            y={6}
            textAnchor="middle"
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={15}
            fill="#555"
          >
            LIMIT $400
          </text>
          {/* End label */}
          <text
            x={672}
            y={42}
            textAnchor="middle"
            fontFamily="Arial"
            fontSize={15}
            fill={GRAY}
          >
            $480
          </text>
        </svg>

        {/* Stamp */}
        <div
          style={{
            opacity: stampOp,
            transform: `scale(${stampScale})`,
            borderWidth: 6,
            borderStyle: 'solid',
            borderColor: ACCENT,
            borderRadius: 14,
            paddingTop: 14,
            paddingBottom: 14,
            paddingLeft: 36,
            paddingRight: 36,
            textAlign: 'center',
          }}
        >
          <p style={headline(32, ACCENT)}>PERMISSION GRANTED</p>
          <p style={{ fontFamily: FONT_BODY, fontSize: 18, color: BLACK, margin: '6px 0 0' }}>
            +20% OVER BUDGET ON AVERAGE
          </p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 28], [0, 1], { extrapolateRight: 'clamp' });
  const m1S = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 90 } });
  const m2S = spring({ frame: Math.max(0, frame - 52), fps, from: 0, to: 1, config: { damping: 14, stiffness: 90 } });
  const m3S = spring({ frame: Math.max(0, frame - 104), fps, from: 0, to: 1, config: { damping: 14, stiffness: 90 } });
  const xOp = interpolate(frame, [138, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const statOp = interpolate(frame, [168, 202], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const DOT_COLS = 5;
  const DOT_ROWS = 4;
  const DOT_TOTAL = DOT_COLS * DOT_ROWS;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 44,
        }}
      >
        <div style={{ opacity: titleOp, textAlign: 'center' }}>
          <p style={headline(48, WHITE)}>80% QUIT</p>
          <p style={{ ...headline(48, ACCENT), marginTop: 8 }}>IN 3 MONTHS</p>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          {/* Month 1 — green */}
          <div style={{ transform: `scale(${m1S})` }}>
            <svg width={216} height={276} viewBox="0 0 216 276">
              <rect x={4} y={4} width={208} height={268} rx={18} fill="#0A1A14" stroke={GREEN} strokeWidth={5} />
              <rect x={4} y={4} width={208} height={62} rx={18} fill={GREEN} />
              <rect x={4} y={42} width={208} height={24} fill={GREEN} />
              <text
                x={108} y={46}
                textAnchor="middle"
                fontFamily={`"Arial Black", sans-serif`}
                fontSize={22}
                fill={WHITE}
              >
                MONTH 1
              </text>
              {Array.from({ length: Math.max(0, Math.floor(DOT_TOTAL)) }).map((_, idx) => {
                const col = idx % DOT_COLS;
                const row = Math.floor(idx / DOT_COLS);
                return (
                  <rect
                    key={idx}
                    x={22 + col * 34}
                    y={86 + row * 36}
                    width={22}
                    height={22}
                    rx={4}
                    fill={GREEN}
                    opacity={0.65}
                  />
                );
              })}
              <text
                x={108} y={252}
                textAnchor="middle"
                fontFamily={`"Arial Black", sans-serif`}
                fontSize={20}
                fill={GREEN}
              >
                ON TRACK
              </text>
            </svg>
          </div>

          {/* Month 2 — yellow */}
          <div style={{ transform: `scale(${m2S})` }}>
            <svg width={216} height={276} viewBox="0 0 216 276">
              <rect x={4} y={4} width={208} height={268} rx={18} fill="#1A1500" stroke={YELLOW} strokeWidth={5} />
              <rect x={4} y={4} width={208} height={62} rx={18} fill={YELLOW} />
              <rect x={4} y={42} width={208} height={24} fill={YELLOW} />
              <text
                x={108} y={46}
                textAnchor="middle"
                fontFamily={`"Arial Black", sans-serif`}
                fontSize={22}
                fill={WHITE}
              >
                MONTH 2
              </text>
              {Array.from({ length: Math.max(0, Math.floor(DOT_TOTAL / 2)) }).map((_, idx) => {
                const col = idx % DOT_COLS;
                const row = Math.floor(idx / DOT_COLS);
                return (
                  <rect
                    key={idx}
                    x={22 + col * 34}
                    y={86 + row * 36}
                    width={22}
                    height={22}
                    rx={4}
                    fill={YELLOW}
                    opacity={0.5}
                  />
                );
              })}
              <text
                x={108} y={252}
                textAnchor="middle"
                fontFamily={`"Arial Black", sans-serif`}
                fontSize={20}
                fill={YELLOW}
              >
                SLIPPING
              </text>
            </svg>
          </div>

          {/* Month 3 — red / abandoned */}
          <div style={{ transform: `scale(${m3S})` }}>
            <svg width={216} height={276} viewBox="0 0 216 276">
              <rect x={4} y={4} width={208} height={268} rx={18} fill="#1A0A0A" stroke={ACCENT} strokeWidth={5} />
              <rect x={4} y={4} width={208} height={62} rx={18} fill={ACCENT} />
              <rect x={4} y={42} width={208} height={24} fill={ACCENT} />
              <text
                x={108} y={46}
                textAnchor="middle"
                fontFamily={`"Arial Black", sans-serif`}
                fontSize={22}
                fill={WHITE}
              >
                MONTH 3
              </text>
              <g opacity={xOp}>
                <line x1={36} y1={88} x2={180} y2={228} stroke={ACCENT} strokeWidth={14} strokeLinecap="round" />
                <line x1={180} y1={88} x2={36} y2={228} stroke={ACCENT} strokeWidth={14} strokeLinecap="round" />
              </g>
              <text
                x={108} y={252}
                textAnchor="middle"
                fontFamily={`"Arial Black", sans-serif`}
                fontSize={20}
                fill={ACCENT}
                opacity={xOp}
              >
                ABANDONED
              </text>
            </svg>
          </div>
        </div>

        <div style={{ opacity: statOp, textAlign: 'center' }}>
          <p style={headline(28, WHITE)}>NOT LAZINESS.</p>
          <p style={{ ...headline(28, GRAY), marginTop: 8 }}>PSYCHOLOGICAL BURNOUT.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, from: 0, to: 1, config: { damping: 14, stiffness: 80 } });
  const barP = interpolate(frame, [22, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const annotOp = interpolate(frame, [168, 204], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const BASE_Y = 460;
  const BAR_W = 148;

  // Heights proportional to monthly spend: before=280, during=336, after=308
  const beforeH = Math.max(0, barP * 280);
  const duringH = Math.max(0, barP * 336);
  const afterH = Math.max(0, barP * 308);

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 18,
        }}
      >
        <div style={{ transform: `scale(${titleS})`, textAlign: 'center' }}>
          <p style={headline(40, BLACK)}>THE GUILT CYCLE</p>
          <p style={{ ...headline(24, GRAY), marginTop: 10 }}>AVERAGE MONTHLY SPENDING</p>
        </div>

        <svg width={740} height={540} viewBox="0 0 740 540">
          {/* Baseline */}
          <line x1={28} y1={BASE_Y} x2={712} y2={BASE_Y} stroke="#CCC" strokeWidth={2} />

          {/* BEFORE bar — green */}
          <rect x={70} y={BASE_Y - beforeH} width={BAR_W} height={beforeH} fill={GREEN} rx={8} />
          <text
            x={70 + BAR_W / 2} y={BASE_Y + 36}
            textAnchor="middle"
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={19}
            fill={BLACK}
          >
            BEFORE
          </text>
          <text
            x={70 + BAR_W / 2} y={BASE_Y - beforeH - 14}
            textAnchor="middle"
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={22}
            fill={GREEN}
            opacity={barP > 0.06 ? 1 : 0}
          >
            $2,800
          </text>

          {/* DURING bar — yellow */}
          <rect x={296} y={BASE_Y - duringH} width={BAR_W} height={duringH} fill={YELLOW} rx={8} />
          <text
            x={296 + BAR_W / 2} y={BASE_Y + 36}
            textAnchor="middle"
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={19}
            fill={BLACK}
          >
            DURING
          </text>
          <text
            x={296 + BAR_W / 2} y={BASE_Y - duringH - 14}
            textAnchor="middle"
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={22}
            fill={YELLOW}
            opacity={barP > 0.06 ? 1 : 0}
          >
            $3,360
          </text>

          {/* AFTER QUIT bar — red */}
          <rect x={522} y={BASE_Y - afterH} width={BAR_W} height={afterH} fill={ACCENT} rx={8} />
          <text
            x={522 + BAR_W / 2} y={BASE_Y + 36}
            textAnchor="middle"
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={19}
            fill={BLACK}
          >
            AFTER QUIT
          </text>
          <text
            x={522 + BAR_W / 2} y={BASE_Y - afterH - 14}
            textAnchor="middle"
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={22}
            fill={ACCENT}
            opacity={barP > 0.06 ? 1 : 0}
          >
            $3,080
          </text>

          {/* Annotation: $3,360/yr extra vs. before */}
          <g opacity={annotOp}>
            <line x1={218} y1={BASE_Y - 280} x2={522} y2={BASE_Y - 280} stroke={GRAY} strokeWidth={2} strokeDasharray="6,4" />
            <line x1={218} y1={BASE_Y - 308} x2={522} y2={BASE_Y - 308} stroke={ACCENT} strokeWidth={2} strokeDasharray="6,4" />
            <line x1={370} y1={BASE_Y - 284} x2={370} y2={BASE_Y - 304} stroke={ACCENT} strokeWidth={4} />
            <polygon points={`370,${BASE_Y - 308} 362,${BASE_Y - 294} 378,${BASE_Y - 294}`} fill={ACCENT} />
            <text
              x={396} y={BASE_Y - 290}
              fontFamily={`"Arial Black", sans-serif`}
              fontSize={22}
              fill={ACCENT}
            >
              $3,360/YR EXTRA
            </text>
          </g>

          {/* Sub-labels */}
          <text x={70 + BAR_W / 2} y={BASE_Y + 60} textAnchor="middle" fontFamily="Arial" fontSize={16} fill={GRAY}>no budget</text>
          <text x={296 + BAR_W / 2} y={BASE_Y + 60} textAnchor="middle" fontFamily="Arial" fontSize={16} fill={GRAY}>permission slip</text>
          <text x={522 + BAR_W / 2} y={BASE_Y + 60} textAnchor="middle" fontFamily="Arial" fontSize={16} fill={GRAY}>still above baseline</text>
        </svg>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 28], [0, 1], { extrapolateRight: 'clamp' });
  const payOp = interpolate(frame, [22, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arr1Op = interpolate(frame, [55, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const pigOp = interpolate(frame, [78, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinY = interpolate(frame, [102, 158], [88, 118], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coinOp = interpolate(frame, [102, 132], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const arr2Op = interpolate(frame, [142, 178], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const personOp = interpolate(frame, [162, 198], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const labelOp = interpolate(frame, [185, 215], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 40,
        }}
      >
        <div style={{ opacity: titleOp, textAlign: 'center' }}>
          <p style={headline(46, WHITE)}>REVERSE BUDGETING</p>
          <p style={{ ...headline(30, ACCENT), marginTop: 8 }}>PAY YOURSELF FIRST</p>
        </div>

        <svg width={860} height={340} viewBox="0 0 860 340">
          {/* PAYCHECK circle */}
          <g opacity={payOp}>
            <circle cx={90} cy={155} r={72} fill="none" stroke={WHITE} strokeWidth={4} />
            <text
              x={90} y={140}
              textAnchor="middle"
              fontFamily={`"Arial Black", sans-serif`}
              fontSize={18}
              fill={WHITE}
            >
              PAY
            </text>
            <text
              x={90} y={182}
              textAnchor="middle"
              fontFamily={`"Arial Black", sans-serif`}
              fontSize={44}
              fill={GREEN}
            >
              $
            </text>
          </g>

          {/* Arrow 1: paycheck to pig */}
          <g opacity={arr1Op}>
            <line x1={164} y1={150} x2={242} y2={150} stroke={ACCENT} strokeWidth={6} />
            <polygon points="242,140 268,150 242,160" fill={ACCENT} />
            <text
              x={215} y={130}
              textAnchor="middle"
              fontFamily={`"Arial Black", sans-serif`}
              fontSize={18}
              fill={ACCENT}
            >
              FIRST
            </text>
          </g>

          {/* Piggy bank */}
          <g opacity={pigOp}>
            {/* Body */}
            <ellipse cx={392} cy={162} rx={66} ry={48} fill="none" stroke={ACCENT} strokeWidth={4} />
            {/* Head */}
            <circle cx={450} cy={150} r={32} fill="none" stroke={ACCENT} strokeWidth={4} />
            {/* Ear */}
            <ellipse cx={441} cy={120} rx={10} ry={13} fill={ACCENT} />
            {/* Snout */}
            <ellipse cx={473} cy={157} rx={13} ry={10} fill="none" stroke={ACCENT} strokeWidth={3} />
            <circle cx={468} cy={157} r={2.5} fill={ACCENT} />
            <circle cx={478} cy={157} r={2.5} fill={ACCENT} />
            {/* Eye */}
            <circle cx={457} cy={138} r={4} fill={ACCENT} />
            {/* Coin slot */}
            <rect x={374} y={116} width={34} height={8} rx={4} fill={ACCENT} />
            {/* Legs */}
            <rect x={336} y={202} width={14} height={18} rx={4} fill="none" stroke={ACCENT} strokeWidth={3} />
            <rect x={360} y={202} width={14} height={18} rx={4} fill="none" stroke={ACCENT} strokeWidth={3} />
            <rect x={396} y={202} width={14} height={18} rx={4} fill="none" stroke={ACCENT} strokeWidth={3} />
            <rect x={420} y={202} width={14} height={18} rx={4} fill="none" stroke={ACCENT} strokeWidth={3} />
            {/* Tail */}
            <path d="M 328,155 Q 308,135 326,112 Q 342,90 330,78" fill="none" stroke={ACCENT} strokeWidth={3} />
            {/* Label */}
            <text
              x={392} y={248}
              textAnchor="middle"
              fontFamily={`"Arial Black", sans-serif`}
              fontSize={20}
              fill={ACCENT}
            >
              SAVINGS
            </text>
            {/* Falling coin */}
            <circle cx={391} cy={coinY} r={12} fill={YELLOW} opacity={coinOp} />
            <text
              x={391} y={coinY + 5}
              textAnchor="middle"
              fontFamily={`"Arial Black", sans-serif`}
              fontSize={12}
              fill={BLACK}
              opacity={coinOp}
            >
              $
            </text>
          </g>

          {/* Arrow 2: pig to free person */}
          <g opacity={arr2Op}>
            <line x1={512} y1={150} x2={588} y2={150} stroke={GREEN} strokeWidth={6} />
            <polygon points="588,140 614,150 588,160" fill={GREEN} />
            <text
              x={562} y={130}
              textAnchor="middle"
              fontFamily={`"Arial Black", sans-serif`}
              fontSize={18}
              fill={GREEN}
            >
              REST
            </text>
            <text
              x={562} y={196}
              textAnchor="middle"
              fontFamily={`"Arial Black", sans-serif`}
              fontSize={18}
              fill={GREEN}
            >
              FREELY
            </text>
          </g>

          {/* Smiling person */}
          <g opacity={personOp}>
            <circle cx={748} cy={110} r={50} fill="none" stroke={WHITE} strokeWidth={4} />
            {/* Smile */}
            <path d="M 724,126 Q 748,152 772,126" fill="none" stroke={WHITE} strokeWidth={4} strokeLinecap="round" />
            {/* Eyes */}
            <circle cx={733} cy={96} r={7} fill={WHITE} />
            <circle cx={763} cy={96} r={7} fill={WHITE} />
            {/* Body */}
            <line x1={748} y1={160} x2={748} y2={232} stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
            <line x1={718} y1={184} x2={778} y2={184} stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
            <line x1={748} y1={232} x2={726} y2={272} stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
            <line x1={748} y1={232} x2={770} y2={272} stroke={WHITE} strokeWidth={5} strokeLinecap="round" />
            <text
              x={748} y={308}
              textAnchor="middle"
              fontFamily={`"Arial Black", sans-serif`}
              fontSize={18}
              fill={WHITE}
            >
              GUILT-FREE
            </text>
          </g>
        </svg>

        <div style={{ opacity: labelOp, textAlign: 'center' }}>
          <p style={headline(28, WHITE)}>NO TRACKING. NO CATEGORIES. NO GUILT.</p>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 28], [0, 1], { extrapolateRight: 'clamp' });
  const barP = interpolate(frame, [22, 162], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dotOp = interpolate(frame, [162, 184], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaS = spring({ frame: Math.max(0, frame - 164), fps, from: 0, to: 1, config: { damping: 11, stiffness: 100 } });

  const BASE_Y = 400;
  const BAR_W = 90;
  const YEARS = [
    { label: 'YR 1', finalH: 68, amount: '$3.4K' },
    { label: 'YR 2', finalH: 122, amount: '$6.1K' },
    { label: 'YR 3', finalH: 186, amount: '$9.3K' },
    { label: 'YR 4', finalH: 260, amount: '$12.7K' },
    { label: 'YR 5', finalH: 350, amount: '$16.8K' },
  ];
  const SPACING = 118;

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 22,
        }}
      >
        <div style={{ opacity: titleOp, textAlign: 'center' }}>
          <p style={headline(40, BLACK)}>REVERSE BUDGETERS</p>
          <p style={{ ...headline(40, ACCENT), marginTop: 8 }}>SAVE 34% MORE</p>
          <p style={{ ...headline(22, GRAY), marginTop: 10 }}>EXTRA SAVINGS VS. CATEGORY BUDGETS</p>
        </div>

        <svg width={720} height={480} viewBox="0 0 720 480">
          {/* Grid lines */}
          {[1, 2, 3].map((i) => (
            <line
              key={i}
              x1={30} y1={BASE_Y - i * 100}
              x2={690} y2={BASE_Y - i * 100}
              stroke="#EEEEEE"
              strokeWidth={1}
            />
          ))}
          {/* Baseline */}
          <line x1={30} y1={BASE_Y} x2={690} y2={BASE_Y} stroke="#CCCCCC" strokeWidth={2} />

          {/* Bars */}
          {YEARS.map((y, i) => {
            const h = Math.max(0, barP * y.finalH);
            const bx = 58 + i * SPACING;
            return (
              <g key={i}>
                <rect x={bx} y={BASE_Y - h} width={BAR_W} height={h} fill={ACCENT} rx={6} />
                <text
                  x={bx + BAR_W / 2} y={BASE_Y + 30}
                  textAnchor="middle"
                  fontFamily={`"Arial Black", sans-serif`}
                  fontSize={18}
                  fill={BLACK}
                >
                  {y.label}
                </text>
                <text
                  x={bx + BAR_W / 2} y={BASE_Y - h - 12}
                  textAnchor="middle"
                  fontFamily={`"Arial Black", sans-serif`}
                  fontSize={18}
                  fill={ACCENT}
                  opacity={barP > 0.12 ? 1 : 0}
                >
                  {y.amount}
                </text>
              </g>
            );
          })}

          {/* Final callout dot + label */}
          <circle
            cx={58 + 4 * SPACING + BAR_W / 2}
            cy={BASE_Y - 350}
            r={10}
            fill={ACCENT}
            opacity={dotOp}
          />
          <text
            x={58 + 4 * SPACING + BAR_W / 2 + 18}
            y={BASE_Y - 345}
            fontFamily={`"Arial Black", sans-serif`}
            fontSize={20}
            fill={ACCENT}
            opacity={dotOp}
          >
            $16,800 EXTRA
          </text>
        </svg>

        {/* CTA button */}
        <div style={{ transform: `scale(${ctaS})` }}>
          <div
            style={{
              background: ACCENT,
              borderRadius: 50,
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 52,
              paddingRight: 52,
            }}
          >
            <p style={headline(28, WHITE)}>FOLLOW FOR MONEY TRUTHS THAT WORK</p>
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



