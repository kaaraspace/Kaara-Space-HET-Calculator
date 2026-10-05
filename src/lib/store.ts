import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MISSION, REFERENCE } from "@/lib/physics/cathode";

export type TabId =
  | "proceed"
  | "orifice"
  | "sheath"
  | "map"
  | "rig"
  | "campaign";

export type SolveFor = "P1" | "d" | "Q";

export type Inputs = {
  tab: TabId;
  solve: SolveFor;
  P_W: number;
  V_V: number;
  I_anode_A: number;
  I_keeper_A: number;
  Q_sccm: number;
  d_mm: number;
  l_mm: number;
  T_orifice_K: number;
  P1_Torr: number;
  P2_Torr: number;
  D_insert_mm: number;
  L_insert_mm: number;
  H_W: number;
  extraHeat_W: number;
  Te_eV: number;
  W_eV: number;
  R_ohm: number;
  T_emitter_K: number;
  shunt_ohm: number;
  P_chamber_Torr: number;
  anode_gap_mm: number;
  stageChecks: Record<string, boolean>;
};

const defaults: Inputs = {
  tab: "proceed",
  solve: "P1",
  P_W: MISSION.powerW,
  V_V: MISSION.voltageV,
  I_anode_A: MISSION.currentA,
  I_keeper_A: 0,
  Q_sccm: 1.5,
  d_mm: 0.3,
  l_mm: 0.3,
  T_orifice_K: 2000,
  P1_Torr: 20,
  P2_Torr: 0,
  D_insert_mm: 2,
  L_insert_mm: 4,
  H_W: REFERENCE.H_ideal_W,
  extraHeat_W: 0,
  Te_eV: REFERENCE.Te_Ar_eV,
  W_eV: REFERENCE.W_LaB6_eV,
  R_ohm: 0.29,
  T_emitter_K: 1900,
  shunt_ohm: 0.1,
  P_chamber_Torr: 1e-5,
  anode_gap_mm: 20,
  stageChecks: {},
};

type Store = Inputs & {
  set: <K extends keyof Inputs>(key: K, value: Inputs[K]) => void;
  patch: (p: Partial<Inputs>) => void;
  reset: () => void;
  toggleCheck: (id: string) => void;
};

export const useBench = create<Store>()(
  persist(
    (set) => ({
      ...defaults,
      set: (key, value) => set({ [key]: value } as Partial<Inputs>),
      patch: (p) => set(p),
      reset: () => set({ ...defaults, tab: "proceed" }),
      toggleCheck: (id) =>
        set((s) => ({
          stageChecks: { ...s.stageChecks, [id]: !s.stageChecks[id] },
        })),
    }),
    {
      name: "kaara-bench-v1",
      skipHydration: true,
      partialize: (s) => {
        const { tab, set, patch, reset, toggleCheck, ...rest } = s;
        void tab;
        void set;
        void patch;
        void reset;
        void toggleCheck;
        return rest;
      },
    },
  ),
);

export const TABS: { id: TabId; label: string; hint: string }[] = [
  { id: "proceed", label: "Proceed", hint: "Decision path" },
  { id: "orifice", label: "Orifice", hint: "Flow / diameter" },
  { id: "sheath", label: "Sheath", hint: "Heat / keeper" },
  { id: "map", label: "Map", hint: "Current × flow" },
  { id: "rig", label: "Rig", hint: "Hardware" },
  { id: "campaign", label: "Campaign", hint: "Test matrix" },
];
