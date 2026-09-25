import type { ArtworkKind } from '@/lib/work';

// Original vector studies: abstract interpretations, not product screenshots.
export function ProjectArt({ kind }: { kind: ArtworkKind }) {
  return (
    <div className={`project-art art-${kind}`} aria-hidden="true">
      <svg viewBox="0 0 680 480" fill="none" focusable="false">
        <g stroke="currentColor" opacity=".13">
          {Array.from({ length: 12 }, (_, i) => (
            <path key={`v${i}`} d={`M${40 + i * 55} 28V452`} />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <path key={`h${i}`} d={`M28 ${40 + i * 55}H652`} />
          ))}
        </g>
        <g stroke="currentColor" opacity=".5">
          <path d="M24 40V24H40M640 24H656V40M24 440V456H40M640 456H656V440" />
          <path d="M330 24H350M340 14V34M330 456H350M340 446V466" />
        </g>
        {kind === 'learning' && (
          <>
            <g stroke="currentColor">
              {Array.from({ length: 13 }, (_, i) => (
                <path
                  key={i}
                  opacity={0.18 + i * 0.035}
                  d={`M70 ${115 + i * 9} C200 ${35 + i * 12}, 240 ${380 - i * 9}, 350 240 S490 ${110 + i * 9},610 ${154 + i * 9}`}
                />
              ))}
              {Array.from({ length: 9 }, (_, i) => (
                <path
                  key={i}
                  opacity=".35"
                  d={`M70 ${330 + i * 5}C200 ${410 - i * 4},260 ${130 + i * 10},350 240S490 ${320 - i * 7},610 ${258 + i * 9}`}
                />
              ))}
            </g>
            <path
              d="M70 169C200 107 240 326 350 240S490 164 610 208"
              stroke="#e9ecff"
              strokeWidth="2"
            />
            <g fill="#111521" stroke="#a5b8ff" strokeWidth="2">
              <circle cx="108" cy="160" r="7" />
              <circle cx="247" cy="247" r="7" />
              <circle cx="350" cy="240" r="12" />
              <circle cx="477" cy="192" r="7" />
              <circle cx="577" cy="201" r="7" />
            </g>
            <circle
              cx="350"
              cy="240"
              r="27"
              stroke="currentColor"
              strokeDasharray="2 6"
            />
            <path
              d="M350 267V373H535M108 167V373H145"
              stroke="currentColor"
              opacity=".5"
            />
            <text x="148" y="378">
              01 / DIALOGUE
            </text>
            <text x="450" y="397">
              02 / DIRECTION
            </text>
          </>
        )}
        {kind === 'retrieval' && (
          <>
            {Array.from({ length: 9 }, (_, i) => (
              <g
                key={i}
                transform={`translate(${100 + i * 21} ${70 + i * 15})`}
              >
                <path
                  d="M0 65L205 0L352 115L145 180Z"
                  fill={i === 8 ? '#202e50' : '#101521'}
                  stroke="currentColor"
                  opacity={0.3 + i * 0.07}
                />
                <path
                  d="M55 67L197 23M78 84L220 40M101 101L198 70"
                  stroke="currentColor"
                  opacity=".4"
                />
              </g>
            ))}
            <path
              d="M155 372L345 310L540 373"
              stroke="#e9ecff"
              strokeWidth="2"
            />
            <circle cx="345" cy="310" r="9" fill="#bdcdff" />
            <circle
              cx="155"
              cy="372"
              r="5"
              fill="#111521"
              stroke="currentColor"
            />
            <circle
              cx="540"
              cy="373"
              r="5"
              fill="#111521"
              stroke="currentColor"
            />
            <path d="M345 310V86H519" stroke="#bdcdff" strokeDasharray="3 6" />
            <text x="422" y="70">
              RELEVANCE / 01
            </text>
            <text x="75" y="420">
              ARCHIVE → EVIDENCE
            </text>
          </>
        )}
        {kind === 'signals' && (
          <>
            {Array.from({ length: 15 }, (_, i) => {
              const points = Array.from(
                { length: 45 },
                (_, j) =>
                  `${65 + j * 12.5},${95 + i * 20 + Math.sin(j * 0.33 + i * 0.7) * (j < 24 ? 25 : 9)}`
              ).join(' ');
              return (
                <polyline
                  key={i}
                  points={points}
                  stroke={i === 7 ? '#edf0ff' : 'currentColor'}
                  strokeWidth={i === 7 ? 2 : 1}
                  opacity={i === 7 ? 1 : 0.25 + i * 0.035}
                />
              );
            })}
            <path d="M368 55V422" stroke="currentColor" strokeDasharray="2 6" />
            <circle cx="368" cy="225" r="10" fill="#cad6ff" />
            <path d="M368 225H560V65" stroke="currentColor" opacity=".65" />
            <text x="67" y="57">
              SOURCES / N
            </text>
            <text x="429" y="440">
              SYNTHESIS / 01
            </text>
          </>
        )}
        {kind === 'conversation' && (
          <>
            <rect
              x="226"
              y="66"
              width="228"
              height="348"
              rx="35"
              fill="#101521"
              stroke="currentColor"
              opacity=".8"
            />
            <path
              d="M308 86H372M315 393H365"
              stroke="currentColor"
              opacity=".6"
            />
            {Array.from({ length: 9 }, (_, i) => (
              <g key={i} stroke="currentColor" opacity={0.2 + i * 0.065}>
                <path
                  d={`M60 ${136 + i * 12}H${250 + i * 7}Q${310 + i * 7} ${136 + i * 12},${310 + i * 7} ${196 + i * 12}V${235 + i * 8}Q${310 + i * 7} ${295 + i * 8},${370 + i * 7} ${295 + i * 8}H620`}
                />
                <path
                  d={`M620 ${108 + i * 12}H${413 - i * 7}Q${353 - i * 7} ${108 + i * 12},${353 - i * 7} ${168 + i * 12}V${264 + i * 8}Q${353 - i * 7} ${324 + i * 8},${293 - i * 7} ${324 + i * 8}H60`}
                />
              </g>
            ))}
            <circle cx="340" cy="240" r="27" fill="#1a2542" stroke="#d1dbff" />
            <circle cx="340" cy="240" r="6" fill="#d1dbff" />
            <text x="70" y="420">
              CONTEXT
            </text>
            <text x="501" y="420">
              RESPONSE
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
