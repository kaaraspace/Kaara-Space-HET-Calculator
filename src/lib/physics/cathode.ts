/** Argon / LaB6 hollow-cathode 0-D models used by KAARA Bench.
 *
 * Orifice: compressible Hagen–Poiseuille (Goebel/Katz-style capillary).
 * Viscosity: Sutherland argon, anchored to 88.658 µPa·s at 2000 K
 *   (Sotiriadou 2025 value used in the calculation record).
 * Sheath: corrected insert energy balance (sign of (5/2)Te convection).
 * Printed Eq. 4.4-16 in Fundamentals of Electric Propulsion 2ed is
 * inconsistent with 4.4-8 / 4.4-18; this file uses the corrected form.
 */

export const TORR = 133.322; // Pa
export const R_GAS = 8.314462618; // J / (mol K)
export const K_B = 1.380649e-23;
export const SIGMA_SB = 5.670374419e-8;
export const P_ATM = 101325;
export const T_STD = 273.15; // sccm reference (0 °C)
export const M_AR = 0.039948; // kg / mol
export const U_PLUS_AR = 15.759; // eV
export const SIGMA_AR = 3.64e-10; // m, hard-sphere
export const E_CHARGE = 1.602176634e-19;

export const MISSION = {
  powerW: 350,
  voltageV: 300,
  currentA: 350 / 300,
} as const;

/** Sutherland + 2000 K anchor so μ(2000 K) = 88.658 µPa·s. */
export function viscosityAr(T_K: number): number {
  const mu0 = 2.125e-5;
  const T0 = 273.15;
  const S = 144.4;
  const suth = (T: number) => mu0 * (T / T0) ** 1.5 * (T0 + S) / (T + S);
  return suth(T_K) * (88.658e-6 / suth(2000));
}

export function sccmToMdot(Q_sccm: number): number {
  const nDot = (Q_sccm * 1e-6) / 60 * P_ATM / (R_GAS * T_STD);
  return nDot * M_AR;
}

export function mdotToSccm(mdot: number): number {
  const nDot = mdot / M_AR;
  return nDot * (R_GAS * T_STD) / P_ATM * 60 / 1e-6;
}

export type OrificeInput = {
  Q_sccm: number;
  d_m: number;
  l_m: number;
  T_K: number;
  P1_Pa: number;
  P2_Pa: number;
};

export function orificeMdot(p: Omit<OrificeInput, "Q_sccm">): number {
  const mu = viscosityAr(p.T_K);
  const d4 = p.d_m ** 4;
  const dp2 = p.P1_Pa ** 2 - p.P2_Pa ** 2;
  if (dp2 <= 0 || p.l_m <= 0) return 0;
  return (Math.PI * d4 * M_AR * dp2) / (256 * mu * R_GAS * p.T_K * p.l_m);
}

export function orificeDiameter(p: Omit<OrificeInput, "d_m">): number {
  const mu = viscosityAr(p.T_K);
  const mdot = sccmToMdot(p.Q_sccm);
  const dp2 = p.P1_Pa ** 2 - p.P2_Pa ** 2;
  if (dp2 <= 0 || p.l_m <= 0 || mdot <= 0) return NaN;
  const d4 =
    (mdot * 256 * mu * R_GAS * p.T_K * p.l_m) / (Math.PI * M_AR * dp2);
  return d4 ** 0.25;
}

export function orificeP1(p: Omit<OrificeInput, "P1_Pa">): number {
  const mu = viscosityAr(p.T_K);
  const mdot = sccmToMdot(p.Q_sccm);
  if (p.d_m <= 0 || p.l_m <= 0) return NaN;
  const term =
    (mdot * 256 * mu * R_GAS * p.T_K * p.l_m) / (Math.PI * M_AR * p.d_m ** 4);
  return Math.sqrt(p.P2_Pa ** 2 + term);
}

export function reynoldsOrifice(mdot: number, d_m: number, T_K: number): number {
  const mu = viscosityAr(T_K);
  if (d_m <= 0) return NaN;
  return (4 * mdot) / (Math.PI * d_m * mu);
}

export function knudsenOrifice(d_m: number, T_K: number, P_Pa: number): number {
  if (d_m <= 0 || P_Pa <= 0) return NaN;
  const lambda =
    (K_B * T_K) / (Math.SQRT2 * Math.PI * SIGMA_AR ** 2 * P_Pa);
  return lambda / d_m;
}

/** Facility pumping speed (L/s) for a given sccm at chamber pressure.
 * Uses 20 °C Torr·L/s conversion matching the calculation record (~2087 L/s
 * at 1.5 sccm and 1e-5 Torr). */
export function pumpingSpeedLs(Q_sccm: number, P_chamber_Torr: number): number {
  if (P_chamber_Torr <= 0) return NaN;
  const torrLsPerSccm = 0.013913;
  return (Q_sccm * torrLsPerSccm) / P_chamber_Torr;
}

export type SheathInput = {
  I_anode_A: number;
  I_keeper_A: number;
  H_W: number;
  extraHeat_W: number;
  Te_eV: number;
  W_eV: number;
  R_ohm: number;
  Uplus_eV?: number;
};

export type SheathResult = {
  I_A: number;
  phiMin_V: number;
  phiMax_V: number;
  phi_V: number;
  IiMax_A: number;
  fallPower_W: number;
  Hstar_W: number;
  Hfor15_W: number;
  Hfor20_W: number;
  keeperFor15_A: number;
  keeperFor20_A: number;
  sputtering15: boolean;
  sputtering20: boolean;
};

function phiFromI(I: number, Hnet: number, p: SheathInput): number {
  if (I <= 0) return NaN;
  return Hnet / I + p.W_eV - I * p.R_ohm + 2.5 * p.Te_eV;
}

function IforPhi(phi: number, Hnet: number, p: SheathInput): number {
  // R I^2 + K I - H = 0, K = phi - W - 2.5 Te
  const K = phi - p.W_eV - 2.5 * p.Te_eV;
  const R = p.R_ohm;
  if (R <= 1e-9) {
    if (K === 0) return NaN;
    return Hnet / K;
  }
  const disc = K * K + 4 * R * Hnet;
  if (disc < 0) return NaN;
  return (-K + Math.sqrt(disc)) / (2 * R);
}

export function sheathBalance(p: SheathInput): SheathResult {
  const I = p.I_anode_A + p.I_keeper_A;
  const Hnet = Math.max(0, p.H_W - p.extraHeat_W);
  const U = p.Uplus_eV ?? U_PLUS_AR;
  const phiMax = phiFromI(I, Hnet, p);
  const IiMax =
    I > 0 && Number.isFinite(phiMax)
      ? (Hnet + I * p.W_eV) / (U + phiMax + p.Te_eV / 2)
      : NaN;
  // Ion-current envelope: documented ~0.5 V spread at Ii ~ 0.7 A.
  const spread = Number.isFinite(IiMax) ? Math.min(0.8, 0.5 * (IiMax / 0.697)) : 0.5;
  const phiMin = phiMax - spread;
  const phi = 0.5 * (phiMin + phiMax);
  const Hfor15 = I * (15 - p.W_eV + I * p.R_ohm - 2.5 * p.Te_eV);
  const Hfor20 = I * (20 - p.W_eV + I * p.R_ohm - 2.5 * p.Te_eV);
  const I15 = IforPhi(15, Hnet, p);
  const I20 = IforPhi(20, Hnet, p);
  return {
    I_A: I,
    phiMin_V: phiMin,
    phiMax_V: phiMax,
    phi_V: phi,
    IiMax_A: IiMax,
    fallPower_W: phi * I,
    Hstar_W: Hnet,
    Hfor15_W: Hfor15,
    Hfor20_W: Hfor20,
    keeperFor15_A: Number.isFinite(I15) ? Math.max(0, I15 - p.I_anode_A) : NaN,
    keeperFor20_A: Number.isFinite(I20) ? Math.max(0, I20 - p.I_anode_A) : NaN,
    sputtering15: phiMax > 15,
    sputtering20: phiMax > 20,
  };
}

/** Richardson–Dushman current density, A/cm². A ≈ 29 A cm⁻² K⁻² for LaB6. */
export function richardsonJ(T_K: number, W_eV: number, A = 29): number {
  const k_eV = 8.617333262145e-5;
  return A * T_K * T_K * Math.exp(-W_eV / (k_eV * T_K));
}

export function insertAreaCm2(D_mm: number, L_mm: number): number {
  return Math.PI * (D_mm / 10) * (L_mm / 10);
}

export function emissionJ(I_A: number, D_mm: number, L_mm: number): number {
  const a = insertAreaCm2(D_mm, L_mm);
  return a > 0 ? I_A / a : NaN;
}

/** Invert Richardson for required T (K) given J (A/cm²). */
export function TforJ(J: number, W_eV: number, A = 29): number {
  if (J <= 0) return NaN;
  let T = 1800;
  for (let i = 0; i < 40; i++) {
    const Ji = richardsonJ(T, W_eV, A);
    const k_eV = 8.617333262145e-5;
    // d ln J / dT ≈ 2/T + W/(k T^2)
    const dln = 2 / T + W_eV / (k_eV * T * T);
    T = T + Math.log(J / Ji) / dln;
  }
  return T;
}

export type Regime = {
  kn: string;
  poiseuille: string;
  aspect: string;
  emission: string;
};

export function regimeNotes(opts: {
  Kn: number;
  Re: number;
  l_d: number;
  J: number;
}): Regime {
  const kn =
    opts.Kn < 0.01
      ? "Continuum (Kn < 0.01) — Poiseuille is applicable."
      : opts.Kn < 0.1
        ? "Slip / rarefied (0.01 < Kn < 0.1) — Poiseuille overstates conductance; treat d as a bound."
        : "Transitional / molecular (Kn > 0.1) — do not size the orifice from continuum flow.";
  const poiseuille =
    opts.Re < 20
      ? `Laminar (Re ≈ ${opts.Re.toFixed(2)}).`
      : "Re is high for this capillary — check turbulence and inertial drops.";
  const aspect =
    opts.l_d < 1.5
      ? "l/d ≲ 1 — the book's long-orifice radial plasma model is not applicable."
      : "Orifice is long enough that a 1-D orifice plasma model is more defensible.";
  const emission =
    opts.J > 15
      ? "J > 15 A/cm² — not a hard life limit, but evaporation and ion sputtering need a supplier check."
      : "J is below the 15 A/cm² screening figure (that figure is not a life specification).";
  return { kn, poiseuille, aspect, emission };
}

export const REFERENCE = {
  d_mm_record: 0.2747,
  P1_20Torr_d_mm: 0.2742, // this implementation, 0 °C sccm + anchored μ
  P1_for_0p30: 16.71,
  Re_0p30: 2.13,
  H_ideal_W: 15.6,
  Te_Ar_eV: 2.36,
  Te_Xe_eV: 1.4,
  W_LaB6_eV: 2.66,
} as const;
