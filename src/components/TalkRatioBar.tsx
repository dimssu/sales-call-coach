export function TalkRatioBar({ value }: { value: number }) {
  // value is rep %.
  const prospect = 100 - value;
  return (
    <div className="flex flex-col gap-1 w-[110px]">
      <div className="flex items-center justify-between text-[10px] font-mono tabular text-text-mute">
        <span>{value}</span>
        <span className="text-text-faint">{prospect}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden bg-bg-sunk flex">
        <div
          className="h-full bg-accent"
          style={{ width: `${value}%` }}
        />
        <div
          className="h-full bg-text/30"
          style={{ width: `${prospect}%` }}
        />
      </div>
    </div>
  );
}
