import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function roundToStep(n: number, step: number) {
  if (!Number.isFinite(n) || !Number.isFinite(step) || step <= 0) return n;
  const d = Math.max(0, Math.round(-Math.log10(step)));
  return Number(n.toFixed(Math.min(8, d + 1)));
}

export function Field({
  label,
  unit,
  value,
  onChange,
  step = 0.01,
  min,
  max,
  hint,
}: {
  label: string;
  unit?: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
  min?: number;
  max?: number;
  hint?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium tracking-wide text-muted">{label}</span>
        {unit ? <span className="font-mono text-xs text-subtle">{unit}</span> : null}
      </span>
      <Input
        type="number"
        step={step}
        min={min}
        max={max}
        value={Number.isFinite(value) ? String(roundToStep(value, step)) : ""}
        onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
      />
      {hint ? <span className="text-xs text-subtle">{hint}</span> : null}
    </label>
  );
}

export function Stat({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "good" | "warn" | "bad";
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-surface px-4 py-3",
        tone === "good" && "border-good/40",
        tone === "warn" && "border-warn/40",
        tone === "bad" && "border-bad/40",
      )}
    >
      <div className="text-xs font-medium tracking-wide text-muted">{label}</div>
      <div
        className={cn(
          "mt-1 font-mono text-lg tabular-nums text-foreground",
          tone === "good" && "text-good",
          tone === "warn" && "text-warn",
          tone === "bad" && "text-bad",
        )}
      >
        {value}
      </div>
      {hint ? <p className="mt-1 text-xs text-subtle">{hint}</p> : null}
    </div>
  );
}
