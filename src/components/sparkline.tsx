type Props = {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  className?: string;
};

export function Sparkline({
  data,
  color = "oklch(0.85 0.18 200)",
  width = 100,
  height = 28,
  className,
}: Props) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${height - ((v - min) / range) * height}`);
  const path = `M${pts.join(" L")}`;
  const area = `${path} L${width},${height} L0,${height} Z`;
  const gid = `sl-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg width={width} height={height} className={className} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={path} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
