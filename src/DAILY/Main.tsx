import React from 'react';
import {
  AbsoluteFill, Series, useCurrentFrame, useVideoConfig,
  interpolate, spring, Easing,
} from 'remotion';

const BG_DARK = '#0a120a';
const BG_LIGHT = '#f0faf3';
const ACCENT = '#10B981';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = 'Arial, "Helvetica Neue", sans-serif';

const headline = (size: number, color: string): React.CSSProperties => ({
  fontFamily: FONT,
  fontSize: size,
  color,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
  margin: 0,
  lineHeight: 1.1,
});

const FadeScene: React.FC<{ children: React.ReactNode; bg: string; dur: number }> = ({
  children, bg, dur,
}) => {
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

  const bigScale = spring({ frame, fps, config: { damping: 20, stiffness: 80 } });
  const subOp = interpolate(frame, [28, 50], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const subY = interpolate(frame, [28, 50], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const docOp = interpolate(frame, [52, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const err1 = interpolate(frame, [82, 97], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const err2 = interpolate(frame, [102, 117], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const err3 = interpolate(frame, [122, 137], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOp = interpolate(frame, [148, 168], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 140,
        paddingLeft: 64,
        paddingRight: 64,
        paddingBottom: 80,
      }}>
        <div style={{ ...headline(36, ACCENT), marginBottom: 18 }}>
          Credit Reports
        </div>

        <div style={{ transform: `scale(${bigScale})`, textAlign: 'center', lineHeight: 0.85 }}>
          <span style={{ fontFamily: FONT, fontSize: 186, color: WHITE, letterSpacing: '-0.01em' }}>
            1 IN 5
          </span>
        </div>

        <div style={{ opacity: subOp, transform: `translateY(${subY}px)`, marginTop: 22 }}>
          <span style={{ ...headline(48, ACCENT) }}>AMERICANS</span>
        </div>

        <div style={{ opacity: docOp, marginTop: 46 }}>
          <svg width="320" height="266" viewBox="0 0 320 266">
            <rect x="10" y="10" width="300" height="246" rx="10" fill="#142014" stroke={ACCENT} strokeWidth="2" />
            <rect x="10" y="10" width="300" height="44" rx="10" fill={ACCENT} opacity="0.18" />
            <text x="160" y="38" textAnchor="middle" fill={ACCENT} fontSize="18" fontFamily={FONT} letterSpacing="3">CREDIT REPORT</text>

            <rect x="40" y="78" width="152" height="11" rx="3" fill="#1e3d22" />
            <rect x="202" y="78" width="68" height="11" rx="3" fill="#162a18" />

            <rect x="40" y="116" width="172" height="11" rx="3" fill="#1e3d22" />
            <rect x="222" y="116" width="52" height="11" rx="3" fill="#162a18" />

            <rect x="40" y="154" width="138" height="11" rx="3" fill="#1e3d22" />
            <rect x="188" y="154" width="82" height="11" rx="3" fill="#162a18" />

            <rect x="40" y="192" width="180" height="11" rx="3" fill="#1e3d22" />
            <rect x="230" y="192" width="50" height="11" rx="3" fill="#162a18" />

            <g opacity={err1}>
              <circle cx="294" cy="84" r="13" fill="#EF4444" />
              <line x1="287" y1="77" x2="301" y2="91" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="301" y1="77" x2="287" y2="91" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <g opacity={err2}>
              <circle cx="294" cy="122" r="13" fill="#EF4444" />
              <line x1="287" y1="115" x2="301" y2="129" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="301" y1="115" x2="287" y2="129" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <g opacity={err3}>
              <circle cx="294" cy="160" r="13" fill="#EF4444" />
              <line x1="287" y1="153" x2="301" y2="167" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="301" y1="153" x2="287" y2="167" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>

        <div style={{ opacity: bottomOp, marginTop: 28, textAlign: 'center' }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: 34, color: '#aaaaaa', letterSpacing: '0.02em' }}>
            have at least one error
          </span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 16, stiffness: 85 } });
  const row1Op = interpolate(frame, [22, 42], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row1Y = interpolate(frame, [22, 42], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const row2Op = interpolate(frame, [58, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row2Y = interpolate(frame, [58, 78], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const row3Op = interpolate(frame, [94, 114], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row3Y = interpolate(frame, [94, 114], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const taglineOp = interpolate(frame, [150, 172], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const cardStyle = (op: number, ty: number): React.CSSProperties => ({
    opacity: op,
    transform: `translateY(${ty}px)`,
    background: 'white',
    borderRadius: 18,
    padding: '26px 32px',
    marginBottom: 22,
    display: 'flex',
    alignItems: 'center',
    gap: 22,
    boxShadow: '0 3px 14px rgba(0,0,0,0.09)',
  });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 148,
        paddingLeft: 56,
        paddingRight: 56,
      }}>
        <div style={{ transform: `scale(${titleScale})`, marginBottom: 52, textAlign: 'center' }}>
          <div style={{ ...headline(44, BLACK) }}>HOW ERRORS</div>
          <div style={{ ...headline(44, ACCENT) }}>SNEAK IN</div>
        </div>

        <div style={cardStyle(row1Op, row1Y)}>
          <div style={{ background: '#FEE2E2', borderRadius: 12, width: 54, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="30" height="30" viewBox="0 0 30 30">
              <rect x="3" y="5" width="24" height="20" rx="3" fill="none" stroke="#EF4444" strokeWidth="2.5" />
              <line x1="7" y1="11" x2="23" y2="11" stroke="#EF4444" strokeWidth="2" />
              <line x1="7" y1="16" x2="17" y2="16" stroke="#EF4444" strokeWidth="2" />
              <line x1="7" y1="21" x2="13" y2="21" stroke="#EF4444" strokeWidth="2" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>Wrong Balance</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#777', margin: 0 }}>Creditor reports wrong amount</div>
          </div>
        </div>

        <div style={cardStyle(row2Op, row2Y)}>
          <div style={{ background: '#FEE2E2', borderRadius: 12, width: 54, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="30" height="30" viewBox="0 0 30 30">
              <circle cx="10" cy="15" r="6" fill="none" stroke="#EF4444" strokeWidth="2.5" />
              <circle cx="20" cy="15" r="6" fill="none" stroke="#EF4444" strokeWidth="2.5" />
              <line x1="14" y1="12" x2="17" y2="18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>Account Mix-Up</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#777', margin: 0 }}>Someone else's debt on yours</div>
          </div>
        </div>

        <div style={cardStyle(row3Op, row3Y)}>
          <div style={{ background: '#FEE2E2', borderRadius: 12, width: 54, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="30" height="30" viewBox="0 0 30 30">
              <circle cx="15" cy="15" r="11" fill="none" stroke="#EF4444" strokeWidth="2.5" />
              <line x1="15" y1="8" x2="15" y2="16" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="15" cy="20" r="1.5" fill="#EF4444" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: FONT, fontSize: 26, color: BLACK, margin: 0 }}>Paid Debt Still Active</div>
            <div style={{ fontFamily: FONT_BODY, fontSize: 18, color: '#777', margin: 0 }}>Never updated as paid off</div>
          </div>
        </div>

        <div style={{ opacity: taglineOp, marginTop: 12, textAlign: 'center' }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: 28, color: '#999' }}>
            Nobody tells you when it happens
          </span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const houseOp = interpolate(frame, [22, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const houseY = interpolate(frame, [22, 48], [40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const counterOp = interpolate(frame, [56, 74], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const counterVal = interpolate(frame, [62, 158], [0, 47000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const badgeScale = spring({ frame: Math.max(0, frame - 162), fps, config: { damping: 12, stiffness: 100 } });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 132,
        paddingLeft: 64,
        paddingRight: 64,
      }}>
        <div style={{ transform: `scale(${titleIn})`, textAlign: 'center', marginBottom: 44 }}>
          <div style={{ ...headline(40, WHITE) }}>THE REAL</div>
          <div style={{ ...headline(40, ACCENT) }}>PRICE TAG</div>
        </div>

        <div style={{ opacity: houseOp, transform: `translateY(${houseY}px)` }}>
          <svg width="290" height="250" viewBox="0 0 290 250">
            <rect x="44" y="118" width="202" height="122" fill="#142014" stroke={ACCENT} strokeWidth="2.5" />
            <polygon points="145,28 28,118 262,118" fill={ACCENT} opacity="0.85" />
            <rect x="112" y="183" width="66" height="57" rx="4" fill="#0a120a" stroke={ACCENT} strokeWidth="2" />
            <circle cx="163" cy="212" r="4" fill={ACCENT} />
            <rect x="60" y="140" width="54" height="44" rx="4" fill="#0a120a" stroke={ACCENT} strokeWidth="1.5" />
            <rect x="176" y="140" width="54" height="44" rx="4" fill="#0a120a" stroke={ACCENT} strokeWidth="1.5" />
            <line x1="87" y1="140" x2="87" y2="184" stroke={ACCENT} strokeWidth="1" opacity="0.5" />
            <line x1="60" y1="162" x2="114" y2="162" stroke={ACCENT} strokeWidth="1" opacity="0.5" />
            <line x1="203" y1="140" x2="203" y2="184" stroke={ACCENT} strokeWidth="1" opacity="0.5" />
            <line x1="176" y1="162" x2="230" y2="162" stroke={ACCENT} strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        <div style={{ opacity: counterOp, textAlign: 'center', marginTop: 20 }}>
          <div style={{ fontFamily: FONT_BODY, fontSize: 28, color: '#aaaaaa', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Extra You Pay
          </div>
          <div style={{ fontFamily: FONT, fontSize: 106, color: '#EF4444', letterSpacing: '-0.01em', lineHeight: 1 }}>
            ${Math.round(counterVal).toLocaleString()}
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 24, color: '#888888', marginTop: 6 }}>
            on a 30-year mortgage
          </div>
        </div>

        <div style={{ transform: `scale(${badgeScale})`, background: '#1a0808', border: '2px solid #EF4444', borderRadius: 12, paddingTop: 14, paddingBottom: 14, paddingLeft: 32, paddingRight: 32, marginTop: 24, textAlign: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 24, color: '#EF4444' }}>
            For a 100-point score drop
          </span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const cal1Op = interpolate(frame, [30, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cal2Op = interpolate(frame, [65, 87], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cal3Op = interpolate(frame, [100, 122], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const freeScale = spring({ frame: Math.max(0, frame - 132), fps, config: { damping: 12, stiffness: 100 } });
  const tagOp = interpolate(frame, [172, 194], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const calOps = [cal1Op, cal2Op, cal3Op];
  const months = ['JAN', 'MAY', 'SEP'];
  const checkNums = ['1', '2', '3'];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 136,
        paddingLeft: 56,
        paddingRight: 56,
      }}>
        <div style={{ transform: `scale(${titleIn})`, textAlign: 'center', marginBottom: 56 }}>
          <div style={{ ...headline(46, BLACK) }}>BY LAW:</div>
          <div style={{ ...headline(62, ACCENT), marginTop: 4 }}>3 FREE</div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 34, color: '#666', marginTop: 8 }}>checks every year</div>
        </div>

        <div style={{ display: 'flex', gap: 28, marginBottom: 48 }}>
          {calOps.map((op, idx) => (
            <div key={idx} style={{ opacity: op, textAlign: 'center' }}>
              <svg width="138" height="148" viewBox="0 0 138 148">
                <rect x="4" y="18" width="130" height="122" rx="10" fill="white" stroke={ACCENT} strokeWidth="2.5" />
                <rect x="4" y="18" width="130" height="40" rx="10" fill={ACCENT} />
                <rect x="4" y="44" width="130" height="14" fill={ACCENT} />
                <line x1="24" y1="8" x2="24" y2="32" stroke={ACCENT} strokeWidth="3.5" strokeLinecap="round" />
                <line x1="114" y1="8" x2="114" y2="32" stroke={ACCENT} strokeWidth="3.5" strokeLinecap="round" />
                <text x="69" y="41" textAnchor="middle" fill="white" fontSize="15" fontFamily={FONT} letterSpacing="2">{months[idx]}</text>
                <polyline points="32,92 56,116 106,66" fill="none" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ fontFamily: FONT, fontSize: 20, color: BLACK, marginTop: 6 }}>
                Check {checkNums[idx]}
              </div>
            </div>
          ))}
        </div>

        <div style={{ transform: `scale(${freeScale})`, background: ACCENT, borderRadius: 20, paddingTop: 20, paddingBottom: 20, paddingLeft: 48, paddingRight: 48, textAlign: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 54, color: 'white', letterSpacing: '0.06em' }}>
            100% FREE
          </span>
        </div>

        <div style={{ opacity: tagOp, marginTop: 28, textAlign: 'center' }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: 28, color: '#999999' }}>
            Most Americans use zero of them
          </span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const personOp = interpolate(frame, [0, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gaugeOp = interpolate(frame, [42, 62], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const score = interpolate(frame, [52, 162], [620, 720], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const barFill = interpolate(frame, [52, 162], [37, 75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const daysOp = interpolate(frame, [148, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tagOp = interpolate(frame, [175, 198], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 118,
        paddingLeft: 64,
        paddingRight: 64,
      }}>
        <div style={{ transform: `scale(${titleIn})`, textAlign: 'center', marginBottom: 34 }}>
          <div style={{ ...headline(42, WHITE) }}>DISPUTE IT.</div>
          <div style={{ ...headline(42, ACCENT) }}>IT'S FREE.</div>
        </div>

        <div style={{ opacity: personOp }}>
          <svg width="274" height="218" viewBox="0 0 274 218">
            <rect x="57" y="18" width="160" height="108" rx="8" fill="#142014" stroke={ACCENT} strokeWidth="2.5" />
            <rect x="65" y="26" width="144" height="92" rx="4" fill="#0d1a0d" />
            <rect x="118" y="126" width="38" height="18" fill="#142014" />
            <rect x="88" y="142" width="98" height="12" rx="4" fill="#142014" stroke={ACCENT} strokeWidth="1.5" />
            <rect x="78" y="36" width="118" height="72" rx="3" fill="#162a16" />
            <line x1="88" y1="50" x2="168" y2="50" stroke={ACCENT} strokeWidth="1.8" opacity="0.5" />
            <line x1="88" y1="60" x2="158" y2="60" stroke={ACCENT} strokeWidth="1.8" opacity="0.5" />
            <line x1="88" y1="70" x2="152" y2="70" stroke={ACCENT} strokeWidth="1.8" opacity="0.5" />
            <polyline points="98,85 113,100 142,74" fill="none" stroke={ACCENT} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="137" cy="184" r="17" fill="#142014" stroke={ACCENT} strokeWidth="2" />
            <path d="M106,218 C106,202 120,195 137,195 C154,195 168,202 168,218" fill="#142014" stroke={ACCENT} strokeWidth="2" />
          </svg>
        </div>

        <div style={{ opacity: gaugeOp, width: '100%', marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: 24, color: '#888' }}>CREDIT SCORE</span>
            <span style={{ fontFamily: FONT, fontSize: 42, color: ACCENT }}>{Math.round(score)}</span>
          </div>
          <div style={{ background: '#142014', borderRadius: 8, height: 26, width: '100%', overflow: 'hidden' }}>
            <div style={{ background: ACCENT, height: '100%', width: `${barFill}%`, borderRadius: 8 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontFamily: FONT_BODY, fontSize: 20, color: '#666' }}>300</span>
            <span style={{ fontFamily: FONT_BODY, fontSize: 20, color: '#666' }}>850</span>
          </div>
        </div>

        <div style={{ opacity: daysOp, marginTop: 26, background: '#0d1a0d', borderRadius: 14, paddingTop: 15, paddingBottom: 15, paddingLeft: 34, paddingRight: 34, textAlign: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 28, color: ACCENT }}>Bureaus respond in 30 days</span>
        </div>

        <div style={{ opacity: tagOp, marginTop: 18, textAlign: 'center' }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: 26, color: '#aaaaaa' }}>
            Score can jump 50–100 points fast
          </span>
        </div>
      </AbsoluteFill>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phoneIn = spring({ frame, fps, config: { damping: 16, stiffness: 70 } });
  const titleOp = interpolate(frame, [28, 52], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [28, 52], [28, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
  const step1Op = interpolate(frame, [58, 78], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step2Op = interpolate(frame, [88, 108], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const step3Op = interpolate(frame, [118, 138], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaScale = spring({ frame: Math.max(0, frame - 152), fps, config: { damping: 12, stiffness: 100 } });

  const stepLabels = [
    'AnnualCreditReport.com',
    'Pull your free report',
    'Scan for anything wrong',
  ];
  const stepOps = [step1Op, step2Op, step3Op];

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 96,
        paddingLeft: 58,
        paddingRight: 58,
      }}>
        <div style={{ transform: `scale(${phoneIn})` }}>
          <svg width="192" height="196" viewBox="0 0 192 196">
            <rect x="46" y="10" width="100" height="176" rx="18" fill={BLACK} stroke={ACCENT} strokeWidth="3" />
            <rect x="54" y="26" width="84" height="144" rx="6" fill="#0d1a0d" />
            <circle cx="96" cy="178" r="6" fill="#222" stroke={ACCENT} strokeWidth="1.5" />
            <rect x="74" y="17" width="44" height="5" rx="2.5" fill="#333" />
            <rect x="58" y="30" width="76" height="16" rx="4" fill="#162a16" />
            <text x="96" y="42" textAnchor="middle" fill={ACCENT} fontSize="8" fontFamily={FONT}>annualcreditreport</text>
            <rect x="62" y="54" width="68" height="10" rx="3" fill="#1e3d22" />
            <rect x="62" y="70" width="52" height="8" rx="3" fill="#1e3d22" />
            <rect x="62" y="84" width="60" height="8" rx="3" fill="#1e3d22" />
            <rect x="62" y="100" width="68" height="24" rx="6" fill={ACCENT} />
            <text x="96" y="116" textAnchor="middle" fill="white" fontSize="9" fontFamily={FONT}>GET FREE REPORT</text>
          </svg>
        </div>

        <div style={{ opacity: titleOp, transform: `translateY(${titleY}px)`, textAlign: 'center', marginTop: 18, marginBottom: 34 }}>
          <div style={{ ...headline(42, BLACK) }}>Your 3-Minute Move</div>
        </div>

        <div style={{ width: '100%', marginBottom: 8 }}>
          {stepOps.map((op, idx) => (
            <div key={idx} style={{ opacity: op, display: 'flex', alignItems: 'center', gap: 20, marginBottom: 22 }}>
              <div style={{ background: ACCENT, borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: FONT, fontSize: 22, color: 'white' }}>{idx + 1}</span>
              </div>
              <span style={{ fontFamily: FONT, fontSize: 27, color: BLACK }}>{stepLabels[idx]}</span>
            </div>
          ))}
        </div>

        <div style={{ transform: `scale(${ctaScale})`, background: ACCENT, borderRadius: 18, paddingTop: 22, paddingBottom: 22, paddingLeft: 38, paddingRight: 38, textAlign: 'center' }}>
          <span style={{ fontFamily: FONT, fontSize: 32, color: 'white', letterSpacing: '0.04em' }}>
            Could save you $47,000
          </span>
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
