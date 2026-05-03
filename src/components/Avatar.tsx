import { initials as toInitials } from "@/lib/format";

const SIZES = {
  xs: "size-5 text-[9px]",
  sm: "size-6 text-[10px]",
  md: "size-7 text-[11px]",
  lg: "size-9 text-[12.5px]",
  xl: "size-12 text-[15px]",
};

const palette = [
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-orange-100 text-orange-700",
  "bg-teal-100 text-teal-700",
  "bg-fuchsia-100 text-fuchsia-700",
];

const colorFor = (seed: string) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return palette[Math.abs(h) % palette.length];
};

export function Avatar({
  name,
  size = "md",
  className = "",
}: {
  name: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const ini = toInitials(name);
  const c = colorFor(name);
  return (
    <span
      className={[
        "inline-grid place-items-center rounded-full font-medium select-none",
        SIZES[size],
        c,
        className,
      ].join(" ")}
      aria-label={name}
    >
      {ini}
    </span>
  );
}
