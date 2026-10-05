export type Stage = {
  id: string;
  n: number;
  title: string;
  work: string;
  establishes: string;
  items: { id: string; label: string }[];
};

export const STAGES: Stage[] = [
  {
    id: "s1",
    n: 1,
    title: "Baseline assembly",
    work: "One cathode, one orifice plate, one anode geometry. Prove ignition and 1.17 A delivery.",
    establishes: "Whether the hardware runs at all.",
    items: [
      { id: "s1a", label: "Freeze keeper geometry, insert, and assembly procedure" },
      { id: "s1b", label: "Ignite on argon with heater + keeper, then to 1.17 A anode" },
      { id: "s1c", label: "Record Ia, Ik, Vac, Vkc waveforms and plate pyrometry" },
    ],
  },
  {
    id: "s2",
    n: 2,
    title: "Electrical / flow map",
    work: "Sweep current and flow with geometry and anode distance fixed.",
    establishes: "Stable region and spot–plume / oscillation boundaries.",
    items: [
      { id: "s2a", label: "Four flows × three currents on the baseline plate" },
      { id: "s2b", label: "Settle thermally before logging a point; repeat once" },
      { id: "s2c", label: "Do not chase a single “efficiency” number yet" },
    ],
  },
  {
    id: "s3",
    n: 3,
    title: "Orifice comparison",
    work: "Repeat a small common map on three plates. Keep length, bevel, material, thermal contact identical.",
    establishes: "Effect of diameter, not of accidental heat-path changes.",
    items: [
      { id: "s3a", label: "Machine plates 0.25 / 0.30 / 0.35 mm, l = 0.30 mm" },
      { id: "s3b", label: "Run the same 12-point map on each plate" },
      { id: "s3c", label: "Compare flow, Vac, temperature, CI — not a composite score" },
    ],
  },
  {
    id: "s4",
    n: 4,
    title: "Keeper and heat",
    work: "On the promising plate, add keeper current and watch sheath / temperature proxies.",
    establishes: "Whether keeper-off can close, or keeper is required from the start.",
    items: [
      { id: "s4a", label: "Keeper 0 / 0.5 / 1.0 A at 1.17 A anode" },
      { id: "s4b", label: "Two-color pyrometry of the orifice plate" },
      { id: "s4c", label: "Decide keeper-off vs keeper-on before cutting more metal" },
    ],
  },
  {
    id: "s5",
    n: 5,
    title: "Coupling sensitivity",
    work: "Change anode distance (and anode type if you must) after the plate is chosen.",
    establishes: "How much of the envelope is a fixture artifact.",
    items: [
      { id: "s5a", label: "Keep one anode type documented (plate vs cylinder)" },
      { id: "s5b", label: "Sweep gap only on the down-selected orifice" },
      { id: "s5c", label: "Do not treat bench gap as the Hall-thruster position" },
    ],
  },
  {
    id: "s6",
    n: 6,
    title: "Thruster integration",
    work: "Wall-less HET: cathode position, angle, magnetic environment, anode coupling.",
    establishes: "System performance, not bench current delivery.",
    items: [
      { id: "s6a", label: "Carry the cathode operating envelope into the HET test" },
      { id: "s6b", label: "Sweep cathode position independently of the bench gap" },
    ],
  },
  {
    id: "s7",
    n: 7,
    title: "Repeatability / endurance",
    work: "Repeated starts, selected points, inspect wear.",
    establishes: "Drift, damage, and whether the orifice still is the orifice.",
    items: [
      { id: "s7a", label: "Cold-flow conductance check before and after hot fire" },
      { id: "s7b", label: "Inspect orifice and insert; log parameter drift" },
    ],
  },
];

export const PLATES_MM = [0.25, 0.3, 0.35];
export const CURRENTS_A = [0.8, 1.17, 1.6];
export const FLOWS_SCCM = [0.8, 1.2, 1.5, 2.2];

export function matrix() {
  const rows: {
    id: string;
    plate: number;
    I: number;
    Q: number;
  }[] = [];
  for (const plate of PLATES_MM) {
    for (const I of CURRENTS_A) {
      for (const Q of FLOWS_SCCM) {
        rows.push({
          id: `p${plate}-I${I}-Q${Q}`,
          plate,
          I,
          Q,
        });
      }
    }
  }
  return rows;
}
