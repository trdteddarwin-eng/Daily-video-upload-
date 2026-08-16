import React from 'react';
import { AbsoluteFill, Series, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const BG_DARK = '#121212';
const BG_LIGHT = '#F5F5F5';
const ACCENT = '#F59E0B';
const WHITE = '#F5F5F5';
const BLACK = '#121212';
const RED = '#EF4444';
const GREEN = '#10B981';
const GRAY = '#888888';
const FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const FONT_BODY = '"Arial", "Helvetica Neue", Arial, sans-serif';

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

  const bigScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const taglineOpacity = interpolate(frame, [35, 65], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const age25Opacity = interpolate(frame, [70, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const vsOpacity = interpolate(frame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const age35Opacity = interpolate(frame, [105, 135], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bottomOpacity = interpolate(frame, [145, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 100, width: '100%', textAlign: 'center' }}>
        <p style={headline(42, ACCENT)}>THE TIMING TRAP</p>
      </div>

      <div style={{ position: 'absolute', top: 200, width: '100%', textAlign: 'center' }}>
        <span style={{
          fontFamily: FONT,
          fontSize: 200,
          color: WHITE,
          display: 'inline-block',
          transform: `scale(${bigScale})`,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>$418K</span>
      </div>

      <div style={{ position: 'absolute', top: 490, width: '100%', textAlign: 'center', opacity: taglineOpacity }}>
        <p style={headline(44, RED)}>THAT'S WHAT WAITING COSTS</p>
      </div>

      <div style={{
        position: 'absolute',
        top: 660,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 60,
      }}>
        <div style={{ textAlign: 'center', opacity: age25Opacity }}>
          <svg width="148" height="148" viewBox="0 0 148 148">
            <rect x="4" y="18" width="140" height="126" rx="14" fill="none" stroke={GREEN} strokeWidth="6"/>
            <rect x="4" y="18" width="140" height="46" rx="14" fill={GREEN}/>
            <rect x="4" y="50" width="140" height="14" fill={GREEN}/>
            <text x="74" y="49" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill={WHITE}>START</text>
            <text x="74" y="116" textAnchor="middle" fontFamily="Arial Black" fontSize="52" fill={BLACK}>25</text>
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 28, color: GREEN, margin: '6px 0 0', letterSpacing: '0.1em' }}>AGE 25</p>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: '4px 0 0' }}>$798K</p>
        </div>

        <div style={{ opacity: vsOpacity }}>
          <p style={{ fontFamily: FONT, fontSize: 60, color: RED, margin: 0 }}>VS</p>
        </div>

        <div style={{ textAlign: 'center', opacity: age35Opacity }}>
          <svg width="148" height="148" viewBox="0 0 148 148">
            <rect x="4" y="18" width="140" height="126" rx="14" fill="none" stroke={RED} strokeWidth="6"/>
            <rect x="4" y="18" width="140" height="46" rx="14" fill={RED}/>
            <rect x="4" y="50" width="140" height="14" fill={RED}/>
            <text x="74" y="49" textAnchor="middle" fontFamily="Arial Black" fontSize="20" fill={WHITE}>START</text>
            <text x="74" y="116" textAnchor="middle" fontFamily="Arial Black" fontSize="52" fill={WHITE}>35</text>
          </svg>
          <p style={{ fontFamily: FONT, fontSize: 28, color: RED, margin: '6px 0 0', letterSpacing: '0.1em' }}>AGE 35</p>
          <p style={{ fontFamily: FONT, fontSize: 36, color: WHITE, margin: '4px 0 0' }}>$380K</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 200, width: '100%', textAlign: 'center', opacity: bottomOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 32, color: GRAY, margin: 0 }}>same $300/month · same 7% return</p>
      </div>
    </FadeScene>
  );
};

const Scene2: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const piggyScale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 100 } });
  const barProg = interpolate(frame, [60, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barHeight = Math.max(0, Math.floor(barProg * 340));
  const labelOpacity = interpolate(frame, [165, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const investedVal = Math.floor(interpolate(frame, [60, 195], [0, 144000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', textAlign: 'center' }}>
        <p style={{ ...headline(44, BLACK), transform: `scale(${titleScale})`, display: 'inline-block' }}>
          SARAH STARTS AT 25
        </p>
      </div>

      <div style={{ position: 'absolute', top: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <svg width="210" height="210" viewBox="0 0 220 220" style={{ transform: `scale(${piggyScale})` }}>
          <ellipse cx="110" cy="140" rx="80" ry="65" fill={GREEN}/>
          <circle cx="175" cy="105" r="38" fill={GREEN}/>
          <ellipse cx="168" cy="73" rx="12" ry="16" fill="#0d9268"/>
          <circle cx="185" cy="100" r="6" fill={WHITE}/>
          <circle cx="187" cy="100" r="3" fill={BLACK}/>
          <ellipse cx="205" cy="115" rx="14" ry="10" fill="#0d9268"/>
          <circle cx="200" cy="114" r="3" fill={BLACK}/>
          <circle cx="210" cy="114" r="3" fill={BLACK}/>
          <rect x="60" y="195" width="24" height="28" rx="8" fill="#0d9268"/>
          <rect x="100" y="195" width="24" height="28" rx="8" fill="#0d9268"/>
          <rect x="140" y="195" width="24" height="28" rx="8" fill="#0d9268"/>
          <rect x="97" y="80" width="26" height="8" rx="4" fill={BLACK}/>
          <path d="M 32 140 Q 10 130 18 115 Q 26 100 14 88" stroke="#0d9268" strokeWidth="7" fill="none" strokeLinecap="round"/>
          <text x="97" y="160" textAnchor="middle" fontFamily="Arial Black" fontSize="38" fill={WHITE}>$</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 415, width: '100%', textAlign: 'center' }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 34, color: GRAY, margin: 0 }}>$300/month × 40 years</p>
        <p style={{ fontFamily: FONT, fontSize: 48, color: BLACK, margin: '14px 0 0' }}>
          ${investedVal.toLocaleString()} invested
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <div style={{ opacity: labelOpacity, marginBottom: 10 }}>
          <p style={{ fontFamily: FONT, fontSize: 64, color: GREEN, margin: 0 }}>$798,000</p>
        </div>
        <div style={{ width: 160, height: barHeight, background: GREEN, borderRadius: '10px 10px 0 0', margin: '0 auto' }}/>
        <p style={{ fontFamily: FONT_BODY, fontSize: 30, color: GRAY, margin: '10px 0 0' }}>AT RETIREMENT · 7% RETURN</p>
      </div>
    </FadeScene>
  );
};

const Scene3: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const piggyScale = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 100 } });
  const barProg = interpolate(frame, [60, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const barHeight = Math.max(0, Math.floor(barProg * 162));
  const labelOpacity = interpolate(frame, [165, 195], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const investedVal = Math.floor(interpolate(frame, [60, 195], [0, 108000], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', textAlign: 'center' }}>
        <p style={{ ...headline(44, WHITE), transform: `scale(${titleScale})`, display: 'inline-block' }}>
          MIKE STARTS AT 35
        </p>
      </div>

      <div style={{ position: 'absolute', top: 180, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <svg width="210" height="210" viewBox="0 0 220 220" style={{ transform: `scale(${piggyScale})` }}>
          <ellipse cx="110" cy="140" rx="80" ry="65" fill={RED}/>
          <circle cx="175" cy="105" r="38" fill={RED}/>
          <ellipse cx="168" cy="73" rx="12" ry="16" fill="#b91c1c"/>
          <circle cx="185" cy="100" r="6" fill={WHITE}/>
          <circle cx="187" cy="100" r="3" fill={BLACK}/>
          <ellipse cx="205" cy="115" rx="14" ry="10" fill="#b91c1c"/>
          <circle cx="200" cy="114" r="3" fill={BLACK}/>
          <circle cx="210" cy="114" r="3" fill={BLACK}/>
          <rect x="60" y="195" width="24" height="28" rx="8" fill="#b91c1c"/>
          <rect x="100" y="195" width="24" height="28" rx="8" fill="#b91c1c"/>
          <rect x="140" y="195" width="24" height="28" rx="8" fill="#b91c1c"/>
          <rect x="97" y="80" width="26" height="8" rx="4" fill={BLACK}/>
          <path d="M 32 140 Q 10 130 18 115 Q 26 100 14 88" stroke="#b91c1c" strokeWidth="7" fill="none" strokeLinecap="round"/>
          <text x="97" y="160" textAnchor="middle" fontFamily="Arial Black" fontSize="38" fill={WHITE}>$</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 415, width: '100%', textAlign: 'center' }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 34, color: GRAY, margin: 0 }}>$300/month × 30 years</p>
        <p style={{ fontFamily: FONT, fontSize: 48, color: WHITE, margin: '14px 0 0' }}>
          ${investedVal.toLocaleString()} invested
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 130, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
        <div style={{ opacity: labelOpacity, marginBottom: 10 }}>
          <p style={{ fontFamily: FONT, fontSize: 64, color: RED, margin: 0 }}>$380,000</p>
        </div>
        <div style={{ width: 160, height: barHeight, background: RED, borderRadius: '10px 10px 0 0', margin: '0 auto' }}/>
        <p style={{ fontFamily: FONT_BODY, fontSize: 30, color: GRAY, margin: '10px 0 0' }}>AT RETIREMENT · 7% RETURN</p>
      </div>
    </FadeScene>
  );
};

const Scene4: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1Prog = interpolate(frame, [10, 105], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar2Prog = interpolate(frame, [30, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const bar1H = Math.max(0, Math.floor(bar1Prog * 360));
  const bar2H = Math.max(0, Math.floor(bar2Prog * 170));
  const labelOpacity = interpolate(frame, [95, 125], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const gapScale = spring({ frame: Math.max(0, frame - 135), fps, config: { damping: 10, stiffness: 80 } });
  const bottomOpacity = interpolate(frame, [170, 200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
        <p style={headline(40, BLACK)}>SAME MONEY. DIFFERENT TIMING.</p>
      </div>

      <div style={{
        position: 'absolute',
        top: 260,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 80,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ opacity: labelOpacity, marginBottom: 10 }}>
            <p style={{ fontFamily: FONT, fontSize: 48, color: GREEN, margin: 0 }}>$798K</p>
          </div>
          <div style={{ width: 150, height: bar1H, background: GREEN, borderRadius: '10px 10px 0 0' }}/>
          <p style={{ fontFamily: FONT_BODY, fontSize: 30, color: GRAY, margin: '10px 0 0' }}>AGE 25</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ opacity: labelOpacity, marginBottom: 10 }}>
            <p style={{ fontFamily: FONT, fontSize: 48, color: RED, margin: 0 }}>$380K</p>
          </div>
          <div style={{ width: 150, height: bar2H, background: RED, borderRadius: '10px 10px 0 0' }}/>
          <p style={{ fontFamily: FONT_BODY, fontSize: 30, color: GRAY, margin: '10px 0 0' }}>AGE 35</p>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 270,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${gapScale})`,
      }}>
        <div style={{ background: RED, borderRadius: 18, padding: '22px 52px' }}>
          <p style={{ fontFamily: FONT, fontSize: 54, color: WHITE, margin: 0 }}>$418K DIFFERENCE</p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 155, width: '100%', textAlign: 'center', opacity: bottomOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 32, color: GRAY, margin: 0 }}>the price of "I'll start next year"</p>
      </div>
    </FadeScene>
  );
};

const Scene5: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const curveProgress = interpolate(frame, [20, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dotScale = spring({ frame: Math.max(0, frame - 155), fps, config: { damping: 12, stiffness: 120 } });
  const textOpacity = interpolate(frame, [150, 185], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const numPoints = Math.max(2, Math.floor(curveProgress * 80));
  const chartW = 680;
  const chartH = 480;

  const points = Array.from({ length: numPoints }, (_: unknown, i: number) => {
    const t = i / 79;
    const x = 60 + t * (chartW - 80);
    const y = (chartH - 60) - Math.pow(t, 2.4) * (chartH - 120);
    return `${x},${Math.max(60, Math.floor(y))}`;
  });

  const pathD = numPoints >= 2 ? `M ${points.join(' L ')}` : `M 60,${chartH - 60}`;

  return (
    <FadeScene bg={BG_DARK} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', textAlign: 'center', opacity: titleOpacity }}>
        <p style={headline(44, ACCENT)}>THE SNOWBALL EFFECT</p>
      </div>

      <div style={{ position: 'absolute', top: 200, left: '50%', transform: 'translateX(-50%)' }}>
        <svg width="680" height="480" viewBox={`0 0 ${chartW} ${chartH}`}>
          <line x1="60" y1={chartH - 60} x2={chartW - 20} y2={chartH - 60} stroke={GRAY} strokeWidth="2" opacity="0.5"/>
          <line x1="60" y1="60" x2="60" y2={chartH - 60} stroke={GRAY} strokeWidth="2" opacity="0.5"/>
          <text x="60" y={chartH - 30} textAnchor="middle" fontFamily="Arial" fontSize="22" fill={GRAY}>25</text>
          <text x="370" y={chartH - 30} textAnchor="middle" fontFamily="Arial" fontSize="22" fill={GRAY}>45</text>
          <text x={chartW - 20} y={chartH - 30} textAnchor="middle" fontFamily="Arial" fontSize="22" fill={GRAY}>65</text>
          <text x="48" y={chartH - 56} textAnchor="end" fontFamily="Arial" fontSize="18" fill={GRAY}>$0</text>
          <text x="48" y="68" textAnchor="end" fontFamily="Arial" fontSize="18" fill={GRAY}>$800K</text>
          <path d={pathD} stroke={ACCENT} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="370" y1="60" x2="370" y2={chartH - 60} stroke={RED} strokeWidth="3" strokeDasharray="12,8" opacity="0.8"/>
          <text x="386" y="190" fontFamily="Arial Black" fontSize="22" fill={RED}>START</text>
          <text x="386" y="218" fontFamily="Arial Black" fontSize="22" fill={RED}>AT 35</text>
          <circle cx={chartW - 20} cy="64" r={Math.max(0, Math.floor(18 * dotScale))} fill={GREEN}/>
        </svg>
      </div>

      <div style={{ position: 'absolute', bottom: 240, width: '100%', textAlign: 'center', opacity: textOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 36, color: WHITE, margin: 0 }}>
          That gap isn't missed contributions.
        </p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 36, color: ACCENT, margin: '10px 0 0' }}>
          It's compound interest on compound interest.
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 140, width: '100%', textAlign: 'center', opacity: textOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 28, color: GRAY, margin: 0 }}>those 10 extra years of compounding change everything</p>
      </div>
    </FadeScene>
  );
};

const Scene6: React.FC<{ dur?: number }> = ({ dur = 225 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const calScale = spring({ frame, fps, config: { damping: 12, stiffness: 100 } });
  const textOpacity = interpolate(frame, [40, 72], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const btnScale = spring({ frame: Math.max(0, frame - 85), fps, config: { damping: 10, stiffness: 80 } });
  const smallOpacity = interpolate(frame, [135, 165], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <FadeScene bg={BG_LIGHT} dur={dur}>
      <div style={{ position: 'absolute', top: 80, width: '100%', textAlign: 'center' }}>
        <p style={headline(48, BLACK)}>THE BEST TIME IS NOW</p>
      </div>

      <div style={{ position: 'absolute', top: 210, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <svg width="210" height="210" viewBox="0 0 210 210" style={{ transform: `scale(${calScale})` }}>
          <rect x="8" y="28" width="194" height="174" rx="16" fill="none" stroke={BLACK} strokeWidth="6"/>
          <rect x="8" y="28" width="194" height="52" rx="16" fill={ACCENT}/>
          <rect x="8" y="64" width="194" height="16" fill={ACCENT}/>
          <text x="105" y="62" textAnchor="middle" fontFamily="Arial Black" fontSize="24" fill={WHITE}>TODAY</text>
          <rect x="58" y="14" width="16" height="30" rx="6" fill={BLACK}/>
          <rect x="136" y="14" width="16" height="30" rx="6" fill={BLACK}/>
          <circle cx="105" cy="155" r="38" fill={ACCENT} opacity="0.18"/>
          <circle cx="105" cy="155" r="36" fill="none" stroke={ACCENT} strokeWidth="5"/>
          <text x="105" y="169" textAnchor="middle" fontFamily="Arial Black" fontSize="40" fill={ACCENT}>16</text>
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 460, width: '100%', textAlign: 'center', opacity: textOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 38, color: BLACK, margin: 0 }}>
          Best time to start?
        </p>
        <p style={{ fontFamily: FONT, fontSize: 48, color: BLACK, margin: '6px 0' }}>
          TEN YEARS AGO.
        </p>
        <p style={{ fontFamily: FONT_BODY, fontSize: 38, color: BLACK, margin: '6px 0' }}>
          Second best time?
        </p>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 280,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        transform: `scale(${btnScale})`,
      }}>
        <div style={{ background: ACCENT, borderRadius: 24, padding: '26px 68px' }}>
          <p style={{ fontFamily: FONT, fontSize: 58, color: WHITE, margin: 0, letterSpacing: '0.08em' }}>
            START TODAY
          </p>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 170, width: '100%', textAlign: 'center', opacity: smallOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 34, color: GRAY, margin: 0 }}>
          $50/month today beats waiting for "perfect."
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: 100, width: '100%', textAlign: 'center', opacity: smallOpacity }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: 26, color: GRAY, margin: 0 }}>
          Follow for more money moves they don't teach in school.
        </p>
      </div>
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
