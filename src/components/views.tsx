import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { Field, Stat } from "@/components/field";
import { Button } from "@/components/ui/button";
import { FLOWS_SCCM, CURRENTS_A, PLATES_MM, STAGES, matrix } from "@/lib/campaign";
import { useDerived } from "@/lib/derived";
import {
  MISSION,
  REFERENCE,
  TORR,
  orificeP1,
  sheathBalance,
} from "@/lib/physics/cathode";
import { TABS, useBench, type TabId } from "@/lib/store";
import { cn, fmt } from "@/lib/utils";
import {
  Activity,
  ArrowRight,
  Check,
  Circle,
  RotateCcw,
} from "lucide-react";

export function Shell() {
  const tab = useBench((s) => s.tab);
  const set = useBench((s) => s.set);
  const reset = useBench((s) => s.reset);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">
              350 W wall-less HET
            </p>
            <h1 className="font-display text-3xl font-medium tracking-tight text-fg sm:text-4xl">
              KAARA Bench
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted">
              Argon LaB₆ hollow cathode — orifice, sheath, rig, and the test
              campaign to run next. Not a unique diameter. A working envelope.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw /> Reset
          </Button>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => set("tab", t.id)}
              className={cn(
                "h-10 shrink-0 rounded-sm px-3 text-sm",
                tab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted hover:bg-surface hover:text-fg",
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {tab === "proceed" && <Proceed />}
        {tab === "orifice" && <Orifice />}
        {tab === "sheath" && <Sheath />}
        {tab === "map" && <MapView />}
        {tab === "rig" && <Rig />}
        {tab === "campaign" && <Campaign />}
      </main>
    </div>
  );
}

function Go({ id, label }: { id: TabId; label: string }) {
  const set = useBench((s) => s.set);
  return (
    <Button variant="outline" size="sm" onClick={() => set("tab", id)}>
      {label} <ArrowRight />
    </Button>
  );
}

function Proceed() {
  const d = useDerived();
  const s = useBench();
  const keeperOffBlocked = d.sheath.sputtering20 && s.I_keeper_A < 0.05 && s.extraHeat_W < 2;

  return (
    <div className="grid gap-8">
      <section className="grid gap-4 lg:grid-cols-3">
        <Stat
          label="Thruster current to demonstrate"
          value={`${fmt(d.I_d, 3)} A`}
          hint={`${fmt(s.P_W, 0)} W / ${fmt(s.V_V, 0)} V. Bench voltage is not 300 V.`}
        />
        <Stat
          label="Corrected sheath (this assembly)"
          value={`${fmt(d.sheath.phiMin_V, 1)}–${fmt(d.sheath.phiMax_V, 1)} V`}
          hint="Printed 4.4-16 withdrawn. Argon Te makes the +5/2 Te term ~12 V."
          tone={d.sheath.sputtering20 ? "bad" : d.sheath.sputtering15 ? "warn" : "good"}
        />
        <Stat
          label="Orifice at current inputs"
          value={s.solve === "d" ? `${fmt(d.d_mm, 3)} mm` : `${fmt(d.P1_Torr, 2)} Torr`}
          hint="Conditional. Requirements still do not fix a unique diameter."
        />
      </section>

      <section className="rounded-lg border border-border bg-surface p-5 sm:p-6">
        <h2 className="font-display text-2xl text-fg">How we proceed</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          Interchangeable orifice plates and a standalone collecting-anode rig
          are the established method (Potrivitu IEPC-2019-428, Becatti 2019).
          We are not inventing that. We are mapping <em>this</em> argon / low-current
          / LaB₆ / wall-less combination. Two corrections change the order of work:
          gas P and T are mostly outcomes, and the cathode is heat-starved at 1.17 A
          unless keeper or extra orifice heating is planned in.
        </p>
        <ol className="mt-6 grid gap-4">
          {[
            {
              t: "Do not freeze a diameter",
              b: "The 0.2747 mm figure is a conditional example (1.5 sccm, 20 Torr, l = 0.30 mm). Machine three plates and measure.",
              go: <Go id="orifice" label="Orifice solver" />,
            },
            {
              t: "Close heat before more arithmetic",
              b: `Keeper-off, 15 V sputtering guideline needs insert heat loss ≲ ${fmt(d.sheath.Hfor15_W, 1)} W. Idealized assembly is ${fmt(s.H_W, 1)} W. Plan keeper current (~${fmt(d.sheath.keeperFor15_A, 2)} A to hold 15 V) unless missing heating paths close the gap.`,
              go: <Go id="sheath" label="Sheath / keeper" />,
            },
            {
              t: "Build the cathode bench, not a miniature HET",
              b: "Keeper, insulated anode, MFC, isolated I–V, pyrometer. First question: can it deliver 1.17 A stably? Langmuir probes come after that.",
              go: <Go id="rig" label="Rig & sensors" />,
            },
            {
              t: "Stage the campaign",
              b: "Baseline → current/flow map → three plates → keeper/heat → gap sensitivity → HET integration. Three plates × three currents × four flows is 36 points, not hundreds.",
              go: <Go id="campaign" label="Open campaign" />,
            },
          ].map((row, i) => (
            <li
              key={row.t}
              className="grid gap-3 border-t border-border pt-4 sm:grid-cols-[2rem_1fr_auto] sm:items-start"
            >
              <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-medium text-fg">{row.t}</h3>
                <p className="mt-1 text-sm text-muted">{row.b}</p>
              </div>
              <div className="sm:pt-0.5">{row.go}</div>
            </li>
          ))}
        </ol>
      </section>

      {keeperOffBlocked && (
        <aside className="rounded-md border border-bad/40 bg-surface px-4 py-3 text-sm text-fg">
          Verdict with current numbers: keeper-off fails the 20 V sputtering
          guideline (cathode fall ≈ {fmt(d.sheath.fallPower_W, 0)} W,{" "}
          {fmt((100 * d.sheath.fallPower_W) / s.P_W, 1)}% of thruster power).
          Either add the three missing heating paths in a coupled model, or
          design the cathode around keeper current from the start.
        </aside>
      )}
    </div>
  );
}

function ControlsOrifice() {
  const s = useBench();
  const set = useBench((s) => s.set);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="grid gap-2">
        <span className="text-xs font-medium tracking-wide text-muted">Solve for</span>
        <div className="flex flex-wrap gap-1">
          {(["P1", "d", "Q"] as const).map((k) => (
            <Button
              key={k}
              size="sm"
              variant={s.solve === k ? "default" : "outline"}
              onClick={() => set("solve", k)}
            >
              {k === "P1" ? "Upstream P" : k === "d" ? "Diameter" : "Flow"}
            </Button>
          ))}
        </div>
      </div>
      <Field label="Argon flow" unit="sccm" value={s.Q_sccm} step={0.1} onChange={(n) => set("Q_sccm", n)} />
      <Field label="Orifice diameter" unit="mm" value={s.d_mm} step={0.01} onChange={(n) => set("d_mm", n)} />
      <Field label="Orifice length" unit="mm" value={s.l_mm} step={0.01} onChange={(n) => set("l_mm", n)} />
      <Field label="Gas T in orifice" unit="K" value={s.T_orifice_K} step={10} onChange={(n) => set("T_orifice_K", n)} />
      <Field label="Upstream P1" unit="Torr" value={s.P1_Torr} step={0.5} onChange={(n) => set("P1_Torr", n)} />
      <Field label="Downstream P2" unit="Torr" value={s.P2_Torr} step={0.1} onChange={(n) => set("P2_Torr", n)} />
      <Field
        label="Chamber P"
        unit="Torr"
        value={s.P_chamber_Torr}
        step={1e-6}
        onChange={(n) => set("P_chamber_Torr", n)}
      />
    </div>
  );
}

function Orifice() {
  const d = useDerived();
  const s = useBench();

  const curve = [];
  for (let mm = 0.15; mm <= 0.55; mm += 0.01) {
    const P1 = orificeP1({
      Q_sccm: s.Q_sccm,
      d_m: mm * 1e-3,
      l_m: s.l_mm * 1e-3,
      T_K: s.T_orifice_K,
      P2_Pa: s.P2_Torr * TORR,
    });
    curve.push({ d: Number(mm.toFixed(2)), P: P1 / TORR });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="rounded-lg border border-border bg-surface p-5 lg:col-span-4">
        <h2 className="font-display text-xl">Orifice inputs</h2>
        <p className="mt-1 text-sm text-muted">
          Fixed plate thickness: d ∝ P1<sup>−1/2</sup>. Fixed aspect ratio would be
          d ∝ P1<sup>−2/3</sup>.
        </p>
        <div className="mt-4">
          <ControlsOrifice />
        </div>
      </div>
      <div className="grid gap-4 lg:col-span-8">
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label="Diameter" value={`${fmt(d.d_mm, 3)} mm`} />
          <Stat label="Insert P1" value={`${fmt(d.P1_Torr, 2)} Torr`} />
          <Stat label="Flow" value={`${fmt(d.Q, 2)} sccm`} />
          <Stat label="Reynolds" value={fmt(d.Re, 2)} hint="Record example Re = 2.13 at 0.30 mm." />
          <Stat label="Knudsen" value={fmt(d.Kn, 3)} hint="Record ~0.07. Continuum is already strained." />
          <Stat label="l / d" value={fmt(d.l_d, 2)} />
          <Stat
            label="Pumping at chamber P"
            value={`${fmt(d.S, 0)} L/s`}
            hint="Record: 2087 L/s at 1.5 sccm, 10⁻⁵ Torr."
          />
        </div>
        <div className="flex h-64 flex-col rounded-md border border-border bg-surface p-3">
          <p className="px-2 text-xs text-muted">P1 versus diameter at this flow and length</p>
          <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={curve}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis dataKey="d" stroke="var(--color-muted)" fontSize={11} />
              <YAxis stroke="var(--color-muted)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-fg)",
                }}
              />
              <Line type="monotone" dataKey="P" stroke="var(--color-accent)" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </div>
        <ul className="grid gap-2 text-sm text-muted">
          <li>{d.notes.kn}</li>
          <li>{d.notes.poiseuille}</li>
          <li>{d.notes.aspect}</li>
          <li>
            Reference check: 1.5 sccm, 20 Torr, l = 0.30 mm, 2000 K → d ={" "}
            {fmt(REFERENCE.P1_20Torr_d_mm, 4)} mm here (record 0.2747 mm, 0.2%).
            0.30 mm plate → P1 = {fmt(REFERENCE.P1_for_0p30, 2)} Torr.
          </li>
        </ul>
      </div>
    </div>
  );
}

function Sheath() {
  const s = useBench();
  const set = useBench((x) => x.set);
  const d = useDerived();

  const kCurve = [];
  for (let k = 0; k <= 2.01; k += 0.1) {
    const r = sheathBalance({
      I_anode_A: s.I_anode_A,
      I_keeper_A: k,
      H_W: s.H_W,
      extraHeat_W: s.extraHeat_W,
      Te_eV: s.Te_eV,
      W_eV: s.W_eV,
      R_ohm: s.R_ohm,
    });
    kCurve.push({ k: Number(k.toFixed(1)), phi: r.phiMax_V });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="rounded-lg border border-border bg-surface p-5 lg:col-span-4">
        <h2 className="font-display text-xl">Energy inputs</h2>
        <p className="mt-1 text-sm text-muted">
          φ<sub>s</sub> = H/I + W − IR + (5/2)T<sub>e</sub>. Extra heat is a
          stand-in for orifice conduction, e–n resistivity, and Schottky — all
          omitted in the simplified model and all would lower φ<sub>s</sub>.
        </p>
        <div className="mt-4 grid gap-4">
          <Field label="Anode current" unit="A" value={s.I_anode_A} step={0.01} onChange={(n) => set("I_anode_A", n)} />
          <Field label="Keeper current" unit="A" value={s.I_keeper_A} step={0.05} onChange={(n) => set("I_keeper_A", n)} />
          <Field label="Insert heat loss H" unit="W" value={s.H_W} step={0.2} onChange={(n) => set("H_W", n)} />
          <Field
            label="Credit missing heat"
            unit="W"
            value={s.extraHeat_W}
            step={0.2}
            onChange={(n) => set("extraHeat_W", n)}
            hint="0 = simplified model. Raise only with a defensible source."
          />
          <Field label="Insert Te" unit="eV" value={s.Te_eV} step={0.05} onChange={(n) => set("Te_eV", n)} />
          <Field label="Work function" unit="eV" value={s.W_eV} step={0.02} onChange={(n) => set("W_eV", n)} />
          <Field label="Spitzer R" unit="Ω" value={s.R_ohm} step={0.01} onChange={(n) => set("R_ohm", n)} />
          <Field label="Insert ID" unit="mm" value={s.D_insert_mm} step={0.1} onChange={(n) => set("D_insert_mm", n)} />
          <Field label="Insert length" unit="mm" value={s.L_insert_mm} step={0.1} onChange={(n) => set("L_insert_mm", n)} />
          <Field
            label="Emitter T (pyrometry target)"
            unit="K"
            value={s.T_emitter_K}
            step={10}
            onChange={(n) => set("T_emitter_K", n)}
          />
        </div>
      </div>
      <div className="grid gap-4 lg:col-span-8">
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat
            label="Sheath envelope"
            value={`${fmt(d.sheath.phiMin_V, 1)}–${fmt(d.sheath.phiMax_V, 1)} V`}
            tone={d.sheath.sputtering20 ? "bad" : d.sheath.sputtering15 ? "warn" : "good"}
            hint="Ion-current bound ~0.5 V wide."
          />
          <Stat
            label="Cathode fall power"
            value={`${fmt(d.sheath.fallPower_W, 1)} W`}
            hint={`${fmt((100 * d.sheath.fallPower_W) / s.P_W, 1)}% of ${fmt(s.P_W, 0)} W.`}
          />
          <Stat label="Net cathode current" value={`${fmt(d.sheath.I_A, 3)} A`} />
          <Stat
            label="H to hold 15 V"
            value={`${fmt(d.sheath.Hfor15_W, 1)} W`}
            hint="Record: ~8 W at 1.17 A, keeper-off."
          />
          <Stat label="H to hold 20 V" value={`${fmt(d.sheath.Hfor20_W, 1)} W`} hint="Record: ~14 W." />
          <Stat
            label="Keeper for 15 V"
            value={`${fmt(d.sheath.keeperFor15_A, 2)} A`}
            hint={`Keeper for 20 V: ${fmt(d.sheath.keeperFor20_A, 2)} A`}
          />
          <Stat
            label="Emission J"
            value={`${fmt(d.J, 2)} A/cm²`}
            hint={d.notes.emission}
          />
          <Stat
            label="Richardson at Te"
            value={`${fmt(d.Jrich, 2)} A/cm²`}
          />
          <Stat
            label="T for required J"
            value={`${fmt(d.Tneed, 0)} K`}
            hint="No Schottky. Field would lower this."
          />
        </div>
        <div className="flex h-64 flex-col rounded-md border border-border bg-surface p-3">
          <p className="px-2 text-xs text-muted">Sheath versus keeper current (anode fixed)</p>
          <div className="min-h-0 flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={kCurve}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis dataKey="k" stroke="var(--color-muted)" fontSize={11} />
              <YAxis stroke="var(--color-muted)" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface-2)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-fg)",
                }}
              />
              <Line type="monotone" dataKey="phi" stroke="var(--color-accent)" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          </div>
        </div>
        <p className="text-sm text-muted">
          The printed book figure at 5 A / 50 W (8.56 V) inherits Eq. 4.4-16.
          Independent system argument: power in I(φ<sub>s</sub> + IR), power out H
          plus electrons leaving with W + (5/2)T<sub>e</sub>. Treat 21 V as “the
          simplified model credits too little heating,” not as a flight prediction.
          Direction is clear: 1.17 A on argon, LaB₆ is heat-starved unless the
          design adds heat.
        </p>
      </div>
    </div>
  );
}

function MapView() {
  const s = useBench();
  const points = [];
  for (const I of CURRENTS_A) {
    for (const Q of FLOWS_SCCM) {
      const P1 = orificeP1({
        Q_sccm: Q,
        d_m: s.d_mm * 1e-3,
        l_m: s.l_mm * 1e-3,
        T_K: s.T_orifice_K,
        P2_Pa: s.P2_Torr * TORR,
      });
      const sh = sheathBalance({
        I_anode_A: I,
        I_keeper_A: s.I_keeper_A,
        H_W: s.H_W,
        extraHeat_W: s.extraHeat_W,
        Te_eV: s.Te_eV,
        W_eV: s.W_eV,
        R_ohm: s.R_ohm,
      });
      points.push({
        Q,
        I,
        P: P1 / TORR,
        phi: sh.phiMax_V,
      });
    }
  }

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="font-display text-2xl">Current × flow map</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Pressure is the outcome of orifice + flow, not a knob. Temperature is
          an outcome of current and heat loss. Marker size scales with computed
          P1. Color in the table flags sheath versus the 15 / 20 V guidelines.
        </p>
      </div>
      <div className="h-72 rounded-md border border-border bg-surface p-3">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid stroke="var(--color-border)" />
            <XAxis dataKey="Q" name="sccm" stroke="var(--color-muted)" fontSize={11} />
            <YAxis dataKey="I" name="A" stroke="var(--color-muted)" fontSize={11} />
            <ZAxis dataKey="P" range={[60, 280]} />
            <Tooltip
              cursor={{ stroke: "var(--color-border)" }}
              contentStyle={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                color: "var(--color-fg)",
              }}
            />
            <Scatter data={points} fill="var(--color-accent)" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2 font-medium">I (A)</th>
              <th className="px-3 py-2 font-medium">Q (sccm)</th>
              <th className="px-3 py-2 font-medium">P1 (Torr)</th>
              <th className="px-3 py-2 font-medium">φs (V)</th>
              <th className="px-3 py-2 font-medium">Guideline</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={`${p.I}-${p.Q}`} className="border-t border-border">
                <td className="px-3 py-2 font-mono tabular-nums">{fmt(p.I, 2)}</td>
                <td className="px-3 py-2 font-mono tabular-nums">{fmt(p.Q, 1)}</td>
                <td className="px-3 py-2 font-mono tabular-nums">{fmt(p.P, 2)}</td>
                <td className="px-3 py-2 font-mono tabular-nums">{fmt(p.phi, 1)}</td>
                <td
                  className={cn(
                    "px-3 py-2",
                    p.phi > 20 ? "text-bad" : p.phi > 15 ? "text-warn" : "text-good",
                  )}
                >
                  {p.phi > 20 ? "Above 20 V" : p.phi > 15 ? "15–20 V" : "≤ 15 V"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Rig() {
  const s = useBench();
  const set = useBench((x) => x.set);
  const d = useDerived();

  return (
    <div className="grid gap-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-5">
          <h2 className="font-display text-xl">Standalone cathode rig</h2>
          <p className="mt-1 text-sm text-muted">
            External collecting anode. Do not put 350 W on this stand. Demonstrate
            ~{fmt(d.I_d, 3)} A to the anode; keeper current is separate. Bench
            discharge voltage is whatever the cathode requires.
          </p>
          <svg viewBox="0 0 640 260" className="mt-4 w-full text-accent" aria-label="Cathode test rig schematic">
            <rect x="20" y="20" width="600" height="220" fill="none" stroke="currentColor" opacity="0.35" />
            <text x="32" y="42" fill="var(--color-muted)" fontSize="11">
              VACUUM CHAMBER
            </text>
            <rect x="70" y="100" width="150" height="44" fill="none" stroke="currentColor" />
            <text x="90" y="126" fill="var(--color-fg)" fontSize="12">
              LaB6 insert
            </text>
            <rect x="220" y="112" width="28" height="20" fill="var(--color-fg)" />
            <text x="210" y="96" fill="var(--color-muted)" fontSize="11">
              orifice
            </text>
            <circle cx="270" cy="122" r="28" fill="none" stroke="currentColor" />
            <text x="252" y="126" fill="var(--color-fg)" fontSize="11">
              K
            </text>
            <line x1="298" y1="122" x2="430" y2="122" stroke="currentColor" strokeDasharray="4 3" />
            <rect x="430" y="70" width="18" height="120" fill="none" stroke="currentColor" />
            <text x="458" y="130" fill="var(--color-fg)" fontSize="12">
              anode
            </text>
            <text x="300" y="108" fill="var(--color-muted)" fontSize="11">
              gap {fmt(s.anode_gap_mm, 0)} mm
            </text>
            <path d="M70 144 L50 180 L70 180" fill="none" stroke="currentColor" />
            <text x="48" y="198" fill="var(--color-muted)" fontSize="11">
              Ar MFC
            </text>
          </svg>
          <Field
            label="Anode gap (bench only)"
            unit="mm"
            value={s.anode_gap_mm}
            step={1}
            onChange={(n) => set("anode_gap_mm", n)}
            hint="Hold fixed while screening plates. Final position is a HET test."
          />
        </div>
        <div className="rounded-lg border border-border bg-surface p-5">
          <h2 className="font-display text-xl">Electron current is a shunt</h2>
          <p className="mt-1 text-sm text-muted">
            Not a CRT phosphor. Ia(t) = Vshunt / Rshunt. Isolated or differential
            measurements if the circuit floats — a scope ground clip will earth it.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field
              label="Shunt"
              unit="Ω"
              value={s.shunt_ohm}
              step={0.01}
              onChange={(n) => set("shunt_ohm", n)}
            />
            <Stat label="V at Ia" value={`${fmt(d.Vshunt, 4)} V`} />
            <Stat label="Shunt heat" value={`${fmt(d.Pshunt, 3)} W`} />
            <Stat
              label="Net cathode"
              value="Ia + Ik"
              hint="Does not count all electrons leaving LaB6. Returning electrons and ions share the insert balance."
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-xs text-muted">
            <tr>
              <th className="px-3 py-2 font-medium">Quantity</th>
              <th className="px-3 py-2 font-medium">Instrument</th>
              <th className="px-3 py-2 font-medium">Limit</th>
            </tr>
          </thead>
          <tbody className="text-fg">
            {[
              ["Delivered electron current", "Calibrated shunt or DC current probe", "Net collector current only"],
              ["Oscillations", "Scope / fast DAQ on Ia, Vac, Ik, Vkc", "Supply meters hide fluctuations"],
              ["Argon feed", "Calibrated MFC", "Gas correction factor"],
              ["Chamber P", "Gauge corrected for argon", "Not insert pressure"],
              ["Insert / upstream P", "CDG on a designed tap", "Tap location and T gradients"],
              ["Plate / emitter T", "Two-color pyrometer", "Solid T, not gas T"],
              ["Mount T", "Thermocouple", "Not the emitter"],
              ["ne, Te, plasma potential", "Langmuir / emissive probe", "After basic operation exists"],
            ].map(([a, b, c]) => (
              <tr key={a} className="border-t border-border">
                <td className="px-3 py-2">{a}</td>
                <td className="px-3 py-2 text-muted">{b}</td>
                <td className="px-3 py-2 text-subtle">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-md border border-border bg-surface p-5 text-sm text-muted">
        <h3 className="font-medium text-fg">Stability, not a fake efficiency</h3>
        <p className="mt-2">
          At the same delivered current compare argon flow, discharge voltage,
          keeper/heater power, fluctuations, plate temperature, ignition, wear.
          Electrical input on the bench is ⟨Vac Ia⟩ + ⟨Vkc Ik⟩ + ⟨Vh Ih⟩ — that
          includes the external anode and is not the HET cathode penalty.
          CI = rms(Ia)/mean(Ia). Stay off the edge of the stable region.
        </p>
      </div>
    </div>
  );
}

function Campaign() {
  const checks = useBench((s) => s.stageChecks);
  const toggle = useBench((s) => s.toggleCheck);
  const setTab = useBench((s) => s.set);
  const rows = matrix();
  const done = STAGES.reduce(
    (n, st) => n + st.items.filter((i) => checks[i.id]).length,
    0,
  );
  const total = STAGES.reduce((n, st) => n + st.items.length, 0);

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl">Staged campaign</h2>
          <p className="mt-1 text-sm text-muted">
            {done} / {total} gates. Tick what is actually done. 36 plate points
            below are the first comparison matrix, not the whole program.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setTab("tab", "map")}>
          <Activity /> Open map
        </Button>
      </div>
      <ol className="grid gap-4">
        {STAGES.map((st) => (
          <li key={st.id} className="rounded-lg border border-border bg-surface p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg">
                <span className="font-mono text-sm text-accent">0{st.n}</span> {st.title}
              </h3>
            </div>
            <p className="mt-1 text-sm text-muted">{st.work}</p>
            <p className="mt-1 text-xs text-subtle">Establishes: {st.establishes}</p>
            <ul className="mt-3 grid gap-2">
              {st.items.map((it) => {
                const on = !!checks[it.id];
                return (
                  <li key={it.id}>
                    <button
                      type="button"
                      onClick={() => toggle(it.id)}
                      className="flex w-full items-start gap-3 rounded-sm px-2 py-2 text-left hover:bg-surface-2"
                    >
                      {on ? (
                        <Check className="mt-0.5 size-4 text-good" />
                      ) : (
                        <Circle className="mt-0.5 size-4 text-subtle" />
                      )}
                      <span className={cn("text-sm", on ? "text-muted line-through" : "text-fg")}>
                        {it.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
      <div>
        <h3 className="font-display text-xl">Plate matrix</h3>
        <p className="mt-1 mb-3 text-sm text-muted">
          Plates {PLATES_MM.join(" / ")} mm × currents {CURRENTS_A.join(" / ")} A ×
          flows {FLOWS_SCCM.join(" / ")} sccm. Tick after the point is logged with
          settled temperatures and a repeat.
        </p>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs text-muted">
              <tr>
                <th className="px-3 py-2 font-medium">Done</th>
                <th className="px-3 py-2 font-medium">d (mm)</th>
                <th className="px-3 py-2 font-medium">I (A)</th>
                <th className="px-3 py-2 font-medium">Q (sccm)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const on = !!checks[r.id];
                return (
                  <tr key={r.id} className="border-t border-border">
                    <td className="px-3 py-2">
                      <button type="button" onClick={() => toggle(r.id)} className="p-1">
                        {on ? (
                          <Check className="size-4 text-good" />
                        ) : (
                          <Circle className="size-4 text-subtle" />
                        )}
                      </button>
                    </td>
                    <td className="px-3 py-2 font-mono tabular-nums">{r.plate.toFixed(2)}</td>
                    <td className="px-3 py-2 font-mono tabular-nums">{r.I.toFixed(2)}</td>
                    <td className="px-3 py-2 font-mono tabular-nums">{r.Q.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
