"use client";

import { useMemo } from "react";

export type TrendSeries = {
  key: string;
  label: string;
  color: string;
  data: number[];
};

export function TrendChart({
  series,
  labels,
  yDomain,
}: {
  series: TrendSeries[];
  labels: string[];
  yDomain?: [number, number];
}) {
  const width = 720;
  const height = 220;
  const padding = { top: 16, right: 16, bottom: 28, left: 32 };

  const domain = useMemo<[number, number]>(() => {
    if (yDomain) return yDomain;
    const all = series.flatMap((s) => s.data);
    const min = Math.min(...all);
    const max = Math.max(...all);
    const pad = (max - min) * 0.15 || 1;
    return [Math.floor(min - pad), Math.ceil(max + pad)];
  }, [series, yDomain]);

  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;

  const x = (i: number) =>
    padding.left + (i / (labels.length - 1)) * innerW;
  const y = (v: number) => {
    const t = (v - domain[0]) / (domain[1] - domain[0] || 1);
    return padding.top + innerH - t * innerH;
  };

  const yTicks = 4;
  const tickValues = Array.from({ length: yTicks + 1 }, (_, i) => {
    return domain[0] + (i * (domain[1] - domain[0])) / yTicks;
  });

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {tickValues.map((v, i) => (
          <g key={i}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={y(v)}
              y2={y(v)}
              stroke="var(--border)"
              strokeDasharray={i === 0 ? "0" : "2 4"}
            />
            <text
              x={padding.left - 6}
              y={y(v) + 3}
              textAnchor="end"
              fontSize="9"
              fill="var(--text-faint)"
              fontFamily="ui-monospace, monospace"
            >
              {Math.round(v)}
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {labels.map((label, i) => (
          <text
            key={i}
            x={x(i)}
            y={height - padding.bottom + 14}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--text-faint)"
            fontFamily="ui-monospace, monospace"
          >
            {label}
          </text>
        ))}

        {/* Series */}
        {series.map((s) => {
          const path = s.data
            .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`)
            .join(" ");
          const areaPath = `${path} L ${x(s.data.length - 1)} ${y(domain[0])} L ${x(0)} ${y(domain[0])} Z`;
          const isPrimary = s.key === series[0].key;
          return (
            <g key={s.key}>
              {isPrimary && (
                <path
                  d={areaPath}
                  fill={s.color}
                  fillOpacity={0.08}
                />
              )}
              <path
                d={path}
                fill="none"
                stroke={s.color}
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {s.data.map((v, i) => (
                <circle
                  key={i}
                  cx={x(i)}
                  cy={y(v)}
                  r={i === s.data.length - 1 ? 3 : 1.5}
                  fill={s.color}
                  stroke="var(--bg-elev)"
                  strokeWidth={i === s.data.length - 1 ? 1.5 : 0}
                />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
