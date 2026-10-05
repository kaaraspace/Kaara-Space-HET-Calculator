import {
  emissionJ,
  knudsenOrifice,
  orificeDiameter,
  orificeMdot,
  orificeP1,
  pumpingSpeedLs,
  regimeNotes,
  reynoldsOrifice,
  richardsonJ,
  sccmToMdot,
  sheathBalance,
  TforJ,
  TORR,
  mdotToSccm,
} from "@/lib/physics/cathode";
import { useBench } from "@/lib/store";

export function useDerived() {
  const s = useBench();
  const I_d = s.P_W / s.V_V;
  const mdot = sccmToMdot(s.Q_sccm);
  const d_m_in = s.d_mm * 1e-3;
  const l_m = s.l_mm * 1e-3;
  const P2 = s.P2_Torr * TORR;

  let d_m = d_m_in;
  let P1 = s.P1_Torr * TORR;
  let Q = s.Q_sccm;

  if (s.solve === "d") {
    d_m = orificeDiameter({
      Q_sccm: s.Q_sccm,
      l_m,
      T_K: s.T_orifice_K,
      P1_Pa: s.P1_Torr * TORR,
      P2_Pa: P2,
    });
  } else if (s.solve === "P1") {
    P1 = orificeP1({
      Q_sccm: s.Q_sccm,
      d_m: d_m_in,
      l_m,
      T_K: s.T_orifice_K,
      P2_Pa: P2,
    });
  } else {
    const md = orificeMdot({
      d_m: d_m_in,
      l_m,
      T_K: s.T_orifice_K,
      P1_Pa: s.P1_Torr * TORR,
      P2_Pa: P2,
    });
    Q = mdotToSccm(md);
  }

  const d_mm = d_m * 1e3;
  const P1_Torr = P1 / TORR;
  const mdotUse = s.solve === "Q" ? sccmToMdot(Q) : mdot;
  const Re = reynoldsOrifice(mdotUse, d_m, s.T_orifice_K);
  const Kn = knudsenOrifice(d_m, s.T_orifice_K, P1);
  const l_d = d_m > 0 ? l_m / d_m : NaN;
  const sheath = sheathBalance({
    I_anode_A: s.I_anode_A,
    I_keeper_A: s.I_keeper_A,
    H_W: s.H_W,
    extraHeat_W: s.extraHeat_W,
    Te_eV: s.Te_eV,
    W_eV: s.W_eV,
    R_ohm: s.R_ohm,
  });
  const J = emissionJ(sheath.I_A, s.D_insert_mm, s.L_insert_mm);
  const Jrich = richardsonJ(s.T_emitter_K, s.W_eV);
  const Tneed = TforJ(J, s.W_eV);
  const S = pumpingSpeedLs(Q, s.P_chamber_Torr);
  const Vshunt = s.I_anode_A * s.shunt_ohm;
  const Pshunt = s.I_anode_A ** 2 * s.shunt_ohm;
  const notes = regimeNotes({ Kn, Re, l_d, J });
  const CI = "measure on the rig";

  return {
    I_d,
    d_mm,
    P1_Torr,
    Q,
    Re,
    Kn,
    l_d,
    sheath,
    J,
    Jrich,
    Tneed,
    S,
    Vshunt,
    Pshunt,
    notes,
    mdot: mdotUse,
    CI,
  };
}
