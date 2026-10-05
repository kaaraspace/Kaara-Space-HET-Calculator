import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ArrowRight, i as Check, n as RotateCcw, o as Activity, r as Circle } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as Scatter, c as CartesianGrid, i as XAxis, l as ResponsiveContainer, n as LineChart, o as ZAxis, r as YAxis, s as Line, t as ScatterChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C3nRnc9H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function fmt(n, digits = 3) {
	if (!Number.isFinite(n)) return "—";
	const abs = Math.abs(n);
	if (abs !== 0 && (abs < .001 || abs >= 1e4)) return n.toExponential(2);
	return n.toLocaleString("en-US", {
		maximumFractionDigits: digits,
		minimumFractionDigits: 0
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-10 w-full rounded-sm border border-border bg-surface px-3 text-sm text-foreground tabular-nums", "placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
		...props
	});
}
function roundToStep(n, step) {
	if (!Number.isFinite(n) || !Number.isFinite(step) || step <= 0) return n;
	const d = Math.max(0, Math.round(-Math.log10(step)));
	return Number(n.toFixed(Math.min(8, d + 1)));
}
function Field({ label, unit, value, onChange, step = .01, min, max, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium tracking-wide text-muted",
					children: label
				}), unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs text-subtle",
					children: unit
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "number",
				step,
				min,
				max,
				value: Number.isFinite(value) ? String(roundToStep(value, step)) : "",
				onChange: (e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-subtle",
				children: hint
			}) : null
		]
	});
}
function Stat({ label, value, hint, tone = "default" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-md border border-border bg-surface px-4 py-3", tone === "good" && "border-good/40", tone === "warn" && "border-warn/40", tone === "bad" && "border-bad/40"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-medium tracking-wide text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-1 font-mono text-lg tabular-nums text-foreground", tone === "good" && "text-good", tone === "warn" && "text-warn", tone === "bad" && "text-bad"),
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-subtle",
				children: hint
			}) : null
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] [&_svg]:size-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			outline: "border border-border bg-transparent text-foreground hover:bg-surface",
			ghost: "text-muted hover:bg-surface hover:text-foreground",
			subtle: "bg-surface text-foreground hover:bg-surface-2"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var STAGES = [
	{
		id: "s1",
		n: 1,
		title: "Baseline assembly",
		work: "One cathode, one orifice plate, one anode geometry. Prove ignition and 1.17 A delivery.",
		establishes: "Whether the hardware runs at all.",
		items: [
			{
				id: "s1a",
				label: "Freeze keeper geometry, insert, and assembly procedure"
			},
			{
				id: "s1b",
				label: "Ignite on argon with heater + keeper, then to 1.17 A anode"
			},
			{
				id: "s1c",
				label: "Record Ia, Ik, Vac, Vkc waveforms and plate pyrometry"
			}
		]
	},
	{
		id: "s2",
		n: 2,
		title: "Electrical / flow map",
		work: "Sweep current and flow with geometry and anode distance fixed.",
		establishes: "Stable region and spot–plume / oscillation boundaries.",
		items: [
			{
				id: "s2a",
				label: "Four flows × three currents on the baseline plate"
			},
			{
				id: "s2b",
				label: "Settle thermally before logging a point; repeat once"
			},
			{
				id: "s2c",
				label: "Do not chase a single “efficiency” number yet"
			}
		]
	},
	{
		id: "s3",
		n: 3,
		title: "Orifice comparison",
		work: "Repeat a small common map on three plates. Keep length, bevel, material, thermal contact identical.",
		establishes: "Effect of diameter, not of accidental heat-path changes.",
		items: [
			{
				id: "s3a",
				label: "Machine plates 0.25 / 0.30 / 0.35 mm, l = 0.30 mm"
			},
			{
				id: "s3b",
				label: "Run the same 12-point map on each plate"
			},
			{
				id: "s3c",
				label: "Compare flow, Vac, temperature, CI — not a composite score"
			}
		]
	},
	{
		id: "s4",
		n: 4,
		title: "Keeper and heat",
		work: "On the promising plate, add keeper current and watch sheath / temperature proxies.",
		establishes: "Whether keeper-off can close, or keeper is required from the start.",
		items: [
			{
				id: "s4a",
				label: "Keeper 0 / 0.5 / 1.0 A at 1.17 A anode"
			},
			{
				id: "s4b",
				label: "Two-color pyrometry of the orifice plate"
			},
			{
				id: "s4c",
				label: "Decide keeper-off vs keeper-on before cutting more metal"
			}
		]
	},
	{
		id: "s5",
		n: 5,
		title: "Coupling sensitivity",
		work: "Change anode distance (and anode type if you must) after the plate is chosen.",
		establishes: "How much of the envelope is a fixture artifact.",
		items: [
			{
				id: "s5a",
				label: "Keep one anode type documented (plate vs cylinder)"
			},
			{
				id: "s5b",
				label: "Sweep gap only on the down-selected orifice"
			},
			{
				id: "s5c",
				label: "Do not treat bench gap as the Hall-thruster position"
			}
		]
	},
	{
		id: "s6",
		n: 6,
		title: "Thruster integration",
		work: "Wall-less HET: cathode position, angle, magnetic environment, anode coupling.",
		establishes: "System performance, not bench current delivery.",
		items: [{
			id: "s6a",
			label: "Carry the cathode operating envelope into the HET test"
		}, {
			id: "s6b",
			label: "Sweep cathode position independently of the bench gap"
		}]
	},
	{
		id: "s7",
		n: 7,
		title: "Repeatability / endurance",
		work: "Repeated starts, selected points, inspect wear.",
		establishes: "Drift, damage, and whether the orifice still is the orifice.",
		items: [{
			id: "s7a",
			label: "Cold-flow conductance check before and after hot fire"
		}, {
			id: "s7b",
			label: "Inspect orifice and insert; log parameter drift"
		}]
	}
];
var PLATES_MM = [
	.25,
	.3,
	.35
];
var CURRENTS_A = [
	.8,
	1.17,
	1.6
];
var FLOWS_SCCM = [
	.8,
	1.2,
	1.5,
	2.2
];
function matrix() {
	const rows = [];
	for (const plate of PLATES_MM) for (const I of CURRENTS_A) for (const Q of FLOWS_SCCM) rows.push({
		id: `p${plate}-I${I}-Q${Q}`,
		plate,
		I,
		Q
	});
	return rows;
}
/** Argon / LaB6 hollow-cathode 0-D models used by KAARA Bench.
*
* Orifice: compressible Hagen–Poiseuille (Goebel/Katz-style capillary).
* Viscosity: Sutherland argon, anchored to 88.658 µPa·s at 2000 K
*   (Sotiriadou 2025 value used in the calculation record).
* Sheath: corrected insert energy balance (sign of (5/2)Te convection).
* Printed Eq. 4.4-16 in Fundamentals of Electric Propulsion 2ed is
* inconsistent with 4.4-8 / 4.4-18; this file uses the corrected form.
*/
var TORR = 133.322;
var R_GAS = 8.314462618;
var K_B = 1380649e-29;
var P_ATM = 101325;
var T_STD = 273.15;
var M_AR = .039948;
var SIGMA_AR = 364e-12;
var MISSION = {
	powerW: 350,
	voltageV: 300,
	currentA: 350 / 300
};
/** Sutherland + 2000 K anchor so μ(2000 K) = 88.658 µPa·s. */
function viscosityAr(T_K) {
	const mu0 = 2125e-8;
	const T0 = 273.15;
	const S = 144.4;
	const suth = (T) => mu0 * (T / T0) ** 1.5 * 417.54999999999995 / (T + S);
	return suth(T_K) * (88658e-9 / suth(2e3));
}
function sccmToMdot(Q_sccm) {
	return Q_sccm * 1e-6 / 60 * P_ATM / (R_GAS * T_STD) * M_AR;
}
function mdotToSccm(mdot) {
	return mdot / M_AR * (R_GAS * T_STD) / P_ATM * 60 / 1e-6;
}
function orificeMdot(p) {
	const mu = viscosityAr(p.T_K);
	const d4 = p.d_m ** 4;
	const dp2 = p.P1_Pa ** 2 - p.P2_Pa ** 2;
	if (dp2 <= 0 || p.l_m <= 0) return 0;
	return Math.PI * d4 * M_AR * dp2 / (256 * mu * R_GAS * p.T_K * p.l_m);
}
function orificeDiameter(p) {
	const mu = viscosityAr(p.T_K);
	const mdot = sccmToMdot(p.Q_sccm);
	const dp2 = p.P1_Pa ** 2 - p.P2_Pa ** 2;
	if (dp2 <= 0 || p.l_m <= 0 || mdot <= 0) return NaN;
	return (mdot * 256 * mu * R_GAS * p.T_K * p.l_m / (Math.PI * M_AR * dp2)) ** .25;
}
function orificeP1(p) {
	const mu = viscosityAr(p.T_K);
	const mdot = sccmToMdot(p.Q_sccm);
	if (p.d_m <= 0 || p.l_m <= 0) return NaN;
	const term = mdot * 256 * mu * R_GAS * p.T_K * p.l_m / (Math.PI * M_AR * p.d_m ** 4);
	return Math.sqrt(p.P2_Pa ** 2 + term);
}
function reynoldsOrifice(mdot, d_m, T_K) {
	const mu = viscosityAr(T_K);
	if (d_m <= 0) return NaN;
	return 4 * mdot / (Math.PI * d_m * mu);
}
function knudsenOrifice(d_m, T_K, P_Pa) {
	if (d_m <= 0 || P_Pa <= 0) return NaN;
	return K_B * T_K / (Math.SQRT2 * Math.PI * SIGMA_AR ** 2 * P_Pa) / d_m;
}
/** Facility pumping speed (L/s) for a given sccm at chamber pressure.
* Uses 20 °C Torr·L/s conversion matching the calculation record (~2087 L/s
* at 1.5 sccm and 1e-5 Torr). */
function pumpingSpeedLs(Q_sccm, P_chamber_Torr) {
	if (P_chamber_Torr <= 0) return NaN;
	return Q_sccm * .013913 / P_chamber_Torr;
}
function phiFromI(I, Hnet, p) {
	if (I <= 0) return NaN;
	return Hnet / I + p.W_eV - I * p.R_ohm + 2.5 * p.Te_eV;
}
function IforPhi(phi, Hnet, p) {
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
function sheathBalance(p) {
	const I = p.I_anode_A + p.I_keeper_A;
	const Hnet = Math.max(0, p.H_W - p.extraHeat_W);
	const U = p.Uplus_eV ?? 15.759;
	const phiMax = phiFromI(I, Hnet, p);
	const IiMax = I > 0 && Number.isFinite(phiMax) ? (Hnet + I * p.W_eV) / (U + phiMax + p.Te_eV / 2) : NaN;
	const phiMin = phiMax - (Number.isFinite(IiMax) ? Math.min(.8, .5 * (IiMax / .697)) : .5);
	const phi = .5 * (phiMin + phiMax);
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
		sputtering20: phiMax > 20
	};
}
/** Richardson–Dushman current density, A/cm². A ≈ 29 A cm⁻² K⁻² for LaB6. */
function richardsonJ(T_K, W_eV, A = 29) {
	return A * T_K * T_K * Math.exp(-W_eV / (8617333262145e-17 * T_K));
}
function insertAreaCm2(D_mm, L_mm) {
	return Math.PI * (D_mm / 10) * (L_mm / 10);
}
function emissionJ(I_A, D_mm, L_mm) {
	const a = insertAreaCm2(D_mm, L_mm);
	return a > 0 ? I_A / a : NaN;
}
/** Invert Richardson for required T (K) given J (A/cm²). */
function TforJ(J, W_eV, A = 29) {
	if (J <= 0) return NaN;
	let T = 1800;
	for (let i = 0; i < 40; i++) {
		const Ji = richardsonJ(T, W_eV, A);
		const dln = 2 / T + W_eV / (8617333262145e-17 * T * T);
		T = T + Math.log(J / Ji) / dln;
	}
	return T;
}
function regimeNotes(opts) {
	return {
		kn: opts.Kn < .01 ? "Continuum (Kn < 0.01) — Poiseuille is applicable." : opts.Kn < .1 ? "Slip / rarefied (0.01 < Kn < 0.1) — Poiseuille overstates conductance; treat d as a bound." : "Transitional / molecular (Kn > 0.1) — do not size the orifice from continuum flow.",
		poiseuille: opts.Re < 20 ? `Laminar (Re ≈ ${opts.Re.toFixed(2)}).` : "Re is high for this capillary — check turbulence and inertial drops.",
		aspect: opts.l_d < 1.5 ? "l/d ≲ 1 — the book's long-orifice radial plasma model is not applicable." : "Orifice is long enough that a 1-D orifice plasma model is more defensible.",
		emission: opts.J > 15 ? "J > 15 A/cm² — not a hard life limit, but evaporation and ion sputtering need a supplier check." : "J is below the 15 A/cm² screening figure (that figure is not a life specification)."
	};
}
var REFERENCE = {
	d_mm_record: .2747,
	P1_20Torr_d_mm: .2742,
	P1_for_0p30: 16.71,
	Re_0p30: 2.13,
	H_ideal_W: 15.6,
	Te_Ar_eV: 2.36,
	Te_Xe_eV: 1.4,
	W_LaB6_eV: 2.66
};
var defaults = {
	tab: "proceed",
	solve: "P1",
	P_W: MISSION.powerW,
	V_V: MISSION.voltageV,
	I_anode_A: MISSION.currentA,
	I_keeper_A: 0,
	Q_sccm: 1.5,
	d_mm: .3,
	l_mm: .3,
	T_orifice_K: 2e3,
	P1_Torr: 20,
	P2_Torr: 0,
	D_insert_mm: 2,
	L_insert_mm: 4,
	H_W: REFERENCE.H_ideal_W,
	extraHeat_W: 0,
	Te_eV: REFERENCE.Te_Ar_eV,
	W_eV: REFERENCE.W_LaB6_eV,
	R_ohm: .29,
	T_emitter_K: 1900,
	shunt_ohm: .1,
	P_chamber_Torr: 1e-5,
	anode_gap_mm: 20,
	stageChecks: {}
};
var useBench = create()(persist((set) => ({
	...defaults,
	set: (key, value) => set({ [key]: value }),
	patch: (p) => set(p),
	reset: () => set({
		...defaults,
		tab: "proceed"
	}),
	toggleCheck: (id) => set((s) => ({ stageChecks: {
		...s.stageChecks,
		[id]: !s.stageChecks[id]
	} }))
}), {
	name: "kaara-bench-v1",
	skipHydration: true,
	partialize: (s) => {
		const { tab, set, patch, reset, toggleCheck, ...rest } = s;
		return rest;
	}
}));
var TABS = [
	{
		id: "proceed",
		label: "Proceed",
		hint: "Decision path"
	},
	{
		id: "orifice",
		label: "Orifice",
		hint: "Flow / diameter"
	},
	{
		id: "sheath",
		label: "Sheath",
		hint: "Heat / keeper"
	},
	{
		id: "map",
		label: "Map",
		hint: "Current × flow"
	},
	{
		id: "rig",
		label: "Rig",
		hint: "Hardware"
	},
	{
		id: "campaign",
		label: "Campaign",
		hint: "Test matrix"
	}
];
function useDerived() {
	const s = useBench();
	const I_d = s.P_W / s.V_V;
	const mdot = sccmToMdot(s.Q_sccm);
	const d_m_in = s.d_mm * .001;
	const l_m = s.l_mm * .001;
	const P2 = s.P2_Torr * TORR;
	let d_m = d_m_in;
	let P1 = s.P1_Torr * TORR;
	let Q = s.Q_sccm;
	if (s.solve === "d") d_m = orificeDiameter({
		Q_sccm: s.Q_sccm,
		l_m,
		T_K: s.T_orifice_K,
		P1_Pa: s.P1_Torr * TORR,
		P2_Pa: P2
	});
	else if (s.solve === "P1") P1 = orificeP1({
		Q_sccm: s.Q_sccm,
		d_m: d_m_in,
		l_m,
		T_K: s.T_orifice_K,
		P2_Pa: P2
	});
	else Q = mdotToSccm(orificeMdot({
		d_m: d_m_in,
		l_m,
		T_K: s.T_orifice_K,
		P1_Pa: s.P1_Torr * TORR,
		P2_Pa: P2
	}));
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
		R_ohm: s.R_ohm
	});
	const J = emissionJ(sheath.I_A, s.D_insert_mm, s.L_insert_mm);
	const Jrich = richardsonJ(s.T_emitter_K, s.W_eV);
	const Tneed = TforJ(J, s.W_eV);
	const S = pumpingSpeedLs(Q, s.P_chamber_Torr);
	const Vshunt = s.I_anode_A * s.shunt_ohm;
	const Pshunt = s.I_anode_A ** 2 * s.shunt_ohm;
	const notes = regimeNotes({
		Kn,
		Re,
		l_d,
		J
	});
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
		CI: "measure on the rig"
	};
}
function Shell() {
	const tab = useBench((s) => s.tab);
	const set = useBench((s) => s.set);
	const reset = useBench((s) => s.reset);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-border",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 py-5 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-accent uppercase",
						children: "350 W wall-less HET"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-medium tracking-tight text-fg sm:text-4xl",
						children: "KAARA Bench"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-xl text-sm text-muted",
						children: "Argon LaB₆ hollow cathode — orifice, sheath, rig, and the test campaign to run next. Not a unique diameter. A working envelope."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: reset,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), " Reset"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6",
				children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => set("tab", t.id),
					className: cn("h-10 shrink-0 rounded-sm px-3 text-sm", tab === t.id ? "bg-primary text-primary-foreground" : "text-muted hover:bg-surface hover:text-fg"),
					children: t.label
				}, t.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8",
			children: [
				tab === "proceed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Proceed, {}),
				tab === "orifice" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orifice, {}),
				tab === "sheath" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheath, {}),
				tab === "map" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, {}),
				tab === "rig" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {}),
				tab === "campaign" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Campaign, {})
			]
		})]
	});
}
function Go({ id, label }) {
	const set = useBench((s) => s.set);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "outline",
		size: "sm",
		onClick: () => set("tab", id),
		children: [
			label,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
		]
	});
}
function Proceed() {
	const d = useDerived();
	const s = useBench();
	const keeperOffBlocked = d.sheath.sputtering20 && s.I_keeper_A < .05 && s.extraHeat_W < 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Thruster current to demonstrate",
						value: `${fmt(d.I_d, 3)} A`,
						hint: `${fmt(s.P_W, 0)} W / ${fmt(s.V_V, 0)} V. Bench voltage is not 300 V.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Corrected sheath (this assembly)",
						value: `${fmt(d.sheath.phiMin_V, 1)}–${fmt(d.sheath.phiMax_V, 1)} V`,
						hint: "Printed 4.4-16 withdrawn. Argon Te makes the +5/2 Te term ~12 V.",
						tone: d.sheath.sputtering20 ? "bad" : d.sheath.sputtering15 ? "warn" : "good"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Orifice at current inputs",
						value: s.solve === "d" ? `${fmt(d.d_mm, 3)} mm` : `${fmt(d.P1_Torr, 2)} Torr`,
						hint: "Conditional. Requirements still do not fix a unique diameter."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-surface p-5 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-fg",
						children: "How we proceed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-3xl text-sm text-muted",
						children: [
							"Interchangeable orifice plates and a standalone collecting-anode rig are the established method (Potrivitu IEPC-2019-428, Becatti 2019). We are not inventing that. We are mapping ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "this" }),
							" argon / low-current / LaB₆ / wall-less combination. Two corrections change the order of work: gas P and T are mostly outcomes, and the cathode is heat-starved at 1.17 A unless keeper or extra orifice heating is planned in."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-6 grid gap-4",
						children: [
							{
								t: "Do not freeze a diameter",
								b: "The 0.2747 mm figure is a conditional example (1.5 sccm, 20 Torr, l = 0.30 mm). Machine three plates and measure.",
								go: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Go, {
									id: "orifice",
									label: "Orifice solver"
								})
							},
							{
								t: "Close heat before more arithmetic",
								b: `Keeper-off, 15 V sputtering guideline needs insert heat loss ≲ ${fmt(d.sheath.Hfor15_W, 1)} W. Idealized assembly is ${fmt(s.H_W, 1)} W. Plan keeper current (~${fmt(d.sheath.keeperFor15_A, 2)} A to hold 15 V) unless missing heating paths close the gap.`,
								go: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Go, {
									id: "sheath",
									label: "Sheath / keeper"
								})
							},
							{
								t: "Build the cathode bench, not a miniature HET",
								b: "Keeper, insulated anode, MFC, isolated I–V, pyrometer. First question: can it deliver 1.17 A stably? Langmuir probes come after that.",
								go: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Go, {
									id: "rig",
									label: "Rig & sensors"
								})
							},
							{
								t: "Stage the campaign",
								b: "Baseline → current/flow map → three plates → keeper/heat → gap sensitivity → HET integration. Three plates × three currents × four flows is 36 points, not hundreds.",
								go: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Go, {
									id: "campaign",
									label: "Open campaign"
								})
							}
						].map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-3 border-t border-border pt-4 sm:grid-cols-[2rem_1fr_auto] sm:items-start",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-sm text-accent",
									children: String(i + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-medium text-fg",
									children: row.t
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: row.b
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "sm:pt-0.5",
									children: row.go
								})
							]
						}, row.t))
					})
				]
			}),
			keeperOffBlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "rounded-md border border-bad/40 bg-surface px-4 py-3 text-sm text-fg",
				children: [
					"Verdict with current numbers: keeper-off fails the 20 V sputtering guideline (cathode fall ≈ ",
					fmt(d.sheath.fallPower_W, 0),
					" W,",
					" ",
					fmt(100 * d.sheath.fallPower_W / s.P_W, 1),
					"% of thruster power). Either add the three missing heating paths in a coupled model, or design the cathode around keeper current from the start."
				]
			})
		]
	});
}
function ControlsOrifice() {
	const s = useBench();
	const set = useBench((s) => s.set);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 sm:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium tracking-wide text-muted",
					children: "Solve for"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1",
					children: [
						"P1",
						"d",
						"Q"
					].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: s.solve === k ? "default" : "outline",
						onClick: () => set("solve", k),
						children: k === "P1" ? "Upstream P" : k === "d" ? "Diameter" : "Flow"
					}, k))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Argon flow",
				unit: "sccm",
				value: s.Q_sccm,
				step: .1,
				onChange: (n) => set("Q_sccm", n)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Orifice diameter",
				unit: "mm",
				value: s.d_mm,
				step: .01,
				onChange: (n) => set("d_mm", n)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Orifice length",
				unit: "mm",
				value: s.l_mm,
				step: .01,
				onChange: (n) => set("l_mm", n)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Gas T in orifice",
				unit: "K",
				value: s.T_orifice_K,
				step: 10,
				onChange: (n) => set("T_orifice_K", n)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Upstream P1",
				unit: "Torr",
				value: s.P1_Torr,
				step: .5,
				onChange: (n) => set("P1_Torr", n)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Downstream P2",
				unit: "Torr",
				value: s.P2_Torr,
				step: .1,
				onChange: (n) => set("P2_Torr", n)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Chamber P",
				unit: "Torr",
				value: s.P_chamber_Torr,
				step: 1e-6,
				onChange: (n) => set("P_chamber_Torr", n)
			})
		]
	});
}
function Orifice() {
	const d = useDerived();
	const s = useBench();
	const curve = [];
	for (let mm = .15; mm <= .55; mm += .01) {
		const P1 = orificeP1({
			Q_sccm: s.Q_sccm,
			d_m: mm * .001,
			l_m: s.l_mm * .001,
			T_K: s.T_orifice_K,
			P2_Pa: s.P2_Torr * TORR
		});
		curve.push({
			d: Number(mm.toFixed(2)),
			P: P1 / TORR
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-border bg-surface p-5 lg:col-span-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Orifice inputs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"Fixed plate thickness: d ∝ P1",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: "−1/2" }),
						". Fixed aspect ratio would be d ∝ P1",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", { children: "−2/3" }),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlsOrifice, {})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:col-span-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Diameter",
							value: `${fmt(d.d_mm, 3)} mm`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Insert P1",
							value: `${fmt(d.P1_Torr, 2)} Torr`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Flow",
							value: `${fmt(d.Q, 2)} sccm`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Reynolds",
							value: fmt(d.Re, 2),
							hint: "Record example Re = 2.13 at 0.30 mm."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Knudsen",
							value: fmt(d.Kn, 3),
							hint: "Record ~0.07. Continuum is already strained."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "l / d",
							value: fmt(d.l_d, 2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Pumping at chamber P",
							value: `${fmt(d.S, 0)} L/s`,
							hint: "Record: 2087 L/s at 1.5 sccm, 10⁻⁵ Torr."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-64 flex-col rounded-md border border-border bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 text-xs text-muted",
						children: "P1 versus diameter at this flow and length"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-h-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: curve,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--color-border)",
										strokeDasharray: "3 3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "d",
										stroke: "var(--color-muted)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--color-surface-2)",
										border: "1px solid var(--color-border)",
										color: "var(--color-fg)"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "P",
										stroke: "var(--color-accent)",
										dot: false,
										strokeWidth: 2
									})
								]
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "grid gap-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: d.notes.kn }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: d.notes.poiseuille }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: d.notes.aspect }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Reference check: 1.5 sccm, 20 Torr, l = 0.30 mm, 2000 K → d =",
							" ",
							fmt(REFERENCE.P1_20Torr_d_mm, 4),
							" mm here (record 0.2747 mm, 0.2%). 0.30 mm plate → P1 = ",
							fmt(REFERENCE.P1_for_0p30, 2),
							" Torr."
						] })
					]
				})
			]
		})]
	});
}
function Sheath() {
	const s = useBench();
	const set = useBench((x) => x.set);
	const d = useDerived();
	const kCurve = [];
	for (let k = 0; k <= 2.01; k += .1) {
		const r = sheathBalance({
			I_anode_A: s.I_anode_A,
			I_keeper_A: k,
			H_W: s.H_W,
			extraHeat_W: s.extraHeat_W,
			Te_eV: s.Te_eV,
			W_eV: s.W_eV,
			R_ohm: s.R_ohm
		});
		kCurve.push({
			k: Number(k.toFixed(1)),
			phi: r.phiMax_V
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8 lg:grid-cols-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-border bg-surface p-5 lg:col-span-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Energy inputs"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"φ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "s" }),
						" = H/I + W − IR + (5/2)T",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "e" }),
						". Extra heat is a stand-in for orifice conduction, e–n resistivity, and Schottky — all omitted in the simplified model and all would lower φ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "s" }),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Anode current",
							unit: "A",
							value: s.I_anode_A,
							step: .01,
							onChange: (n) => set("I_anode_A", n)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Keeper current",
							unit: "A",
							value: s.I_keeper_A,
							step: .05,
							onChange: (n) => set("I_keeper_A", n)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Insert heat loss H",
							unit: "W",
							value: s.H_W,
							step: .2,
							onChange: (n) => set("H_W", n)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Credit missing heat",
							unit: "W",
							value: s.extraHeat_W,
							step: .2,
							onChange: (n) => set("extraHeat_W", n),
							hint: "0 = simplified model. Raise only with a defensible source."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Insert Te",
							unit: "eV",
							value: s.Te_eV,
							step: .05,
							onChange: (n) => set("Te_eV", n)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Work function",
							unit: "eV",
							value: s.W_eV,
							step: .02,
							onChange: (n) => set("W_eV", n)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Spitzer R",
							unit: "Ω",
							value: s.R_ohm,
							step: .01,
							onChange: (n) => set("R_ohm", n)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Insert ID",
							unit: "mm",
							value: s.D_insert_mm,
							step: .1,
							onChange: (n) => set("D_insert_mm", n)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Insert length",
							unit: "mm",
							value: s.L_insert_mm,
							step: .1,
							onChange: (n) => set("L_insert_mm", n)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Emitter T (pyrometry target)",
							unit: "K",
							value: s.T_emitter_K,
							step: 10,
							onChange: (n) => set("T_emitter_K", n)
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:col-span-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Sheath envelope",
							value: `${fmt(d.sheath.phiMin_V, 1)}–${fmt(d.sheath.phiMax_V, 1)} V`,
							tone: d.sheath.sputtering20 ? "bad" : d.sheath.sputtering15 ? "warn" : "good",
							hint: "Ion-current bound ~0.5 V wide."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Cathode fall power",
							value: `${fmt(d.sheath.fallPower_W, 1)} W`,
							hint: `${fmt(100 * d.sheath.fallPower_W / s.P_W, 1)}% of ${fmt(s.P_W, 0)} W.`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Net cathode current",
							value: `${fmt(d.sheath.I_A, 3)} A`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "H to hold 15 V",
							value: `${fmt(d.sheath.Hfor15_W, 1)} W`,
							hint: "Record: ~8 W at 1.17 A, keeper-off."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "H to hold 20 V",
							value: `${fmt(d.sheath.Hfor20_W, 1)} W`,
							hint: "Record: ~14 W."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Keeper for 15 V",
							value: `${fmt(d.sheath.keeperFor15_A, 2)} A`,
							hint: `Keeper for 20 V: ${fmt(d.sheath.keeperFor20_A, 2)} A`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Emission J",
							value: `${fmt(d.J, 2)} A/cm²`,
							hint: d.notes.emission
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Richardson at Te",
							value: `${fmt(d.Jrich, 2)} A/cm²`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "T for required J",
							value: `${fmt(d.Tneed, 0)} K`,
							hint: "No Schottky. Field would lower this."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-64 flex-col rounded-md border border-border bg-surface p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 text-xs text-muted",
						children: "Sheath versus keeper current (anode fixed)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-h-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: kCurve,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										stroke: "var(--color-border)",
										strokeDasharray: "3 3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "k",
										stroke: "var(--color-muted)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted)",
										fontSize: 11
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--color-surface-2)",
										border: "1px solid var(--color-border)",
										color: "var(--color-fg)"
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "phi",
										stroke: "var(--color-accent)",
										dot: false,
										strokeWidth: 2
									})
								]
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"The printed book figure at 5 A / 50 W (8.56 V) inherits Eq. 4.4-16. Independent system argument: power in I(φ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "s" }),
						" + IR), power out H plus electrons leaving with W + (5/2)T",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sub", { children: "e" }),
						". Treat 21 V as “the simplified model credits too little heating,” not as a flight prediction. Direction is clear: 1.17 A on argon, LaB₆ is heat-starved unless the design adds heat."
					]
				})
			]
		})]
	});
}
function MapView() {
	const s = useBench();
	const points = [];
	for (const I of CURRENTS_A) for (const Q of FLOWS_SCCM) {
		const P1 = orificeP1({
			Q_sccm: Q,
			d_m: s.d_mm * .001,
			l_m: s.l_mm * .001,
			T_K: s.T_orifice_K,
			P2_Pa: s.P2_Torr * TORR
		});
		const sh = sheathBalance({
			I_anode_A: I,
			I_keeper_A: s.I_keeper_A,
			H_W: s.H_W,
			extraHeat_W: s.extraHeat_W,
			Te_eV: s.Te_eV,
			W_eV: s.W_eV,
			R_ohm: s.R_ohm
		});
		points.push({
			Q,
			I,
			P: P1 / TORR,
			phi: sh.phiMax_V
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Current × flow map"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: "Pressure is the outcome of orifice + flow, not a knob. Temperature is an outcome of current and heat loss. Marker size scales with computed P1. Color in the table flags sheath versus the 15 / 20 V guidelines."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-72 rounded-md border border-border bg-surface p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ScatterChart, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { stroke: "var(--color-border)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "Q",
							name: "sccm",
							stroke: "var(--color-muted)",
							fontSize: 11
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							dataKey: "I",
							name: "A",
							stroke: "var(--color-muted)",
							fontSize: 11
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZAxis, {
							dataKey: "P",
							range: [60, 280]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							cursor: { stroke: "var(--color-border)" },
							contentStyle: {
								background: "var(--color-surface-2)",
								border: "1px solid var(--color-border)",
								color: "var(--color-fg)"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scatter, {
							data: points,
							fill: "var(--color-accent)"
						})
					] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-surface text-xs tracking-wide text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "I (A)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Q (sccm)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "P1 (Torr)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "φs (V)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Guideline"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 font-mono tabular-nums",
								children: fmt(p.I, 2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 font-mono tabular-nums",
								children: fmt(p.Q, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 font-mono tabular-nums",
								children: fmt(p.P, 2)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 font-mono tabular-nums",
								children: fmt(p.phi, 1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: cn("px-3 py-2", p.phi > 20 ? "text-bad" : p.phi > 15 ? "text-warn" : "text-good"),
								children: p.phi > 20 ? "Above 20 V" : p.phi > 15 ? "15–20 V" : "≤ 15 V"
							})
						]
					}, `${p.I}-${p.Q}`)) })]
				})
			})
		]
	});
}
function Rig() {
	const s = useBench();
	const set = useBench((x) => x.set);
	const d = useDerived();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Standalone cathode rig"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								"External collecting anode. Do not put 350 W on this stand. Demonstrate ~",
								fmt(d.I_d, 3),
								" A to the anode; keeper current is separate. Bench discharge voltage is whatever the cathode requires."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 640 260",
							className: "mt-4 w-full text-accent",
							"aria-label": "Cathode test rig schematic",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "20",
									y: "20",
									width: "600",
									height: "220",
									fill: "none",
									stroke: "currentColor",
									opacity: "0.35"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: "32",
									y: "42",
									fill: "var(--color-muted)",
									fontSize: "11",
									children: "VACUUM CHAMBER"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "70",
									y: "100",
									width: "150",
									height: "44",
									fill: "none",
									stroke: "currentColor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: "90",
									y: "126",
									fill: "var(--color-fg)",
									fontSize: "12",
									children: "LaB6 insert"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "220",
									y: "112",
									width: "28",
									height: "20",
									fill: "var(--color-fg)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: "210",
									y: "96",
									fill: "var(--color-muted)",
									fontSize: "11",
									children: "orifice"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "270",
									cy: "122",
									r: "28",
									fill: "none",
									stroke: "currentColor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: "252",
									y: "126",
									fill: "var(--color-fg)",
									fontSize: "11",
									children: "K"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "298",
									y1: "122",
									x2: "430",
									y2: "122",
									stroke: "currentColor",
									strokeDasharray: "4 3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "430",
									y: "70",
									width: "18",
									height: "120",
									fill: "none",
									stroke: "currentColor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: "458",
									y: "130",
									fill: "var(--color-fg)",
									fontSize: "12",
									children: "anode"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
									x: "300",
									y: "108",
									fill: "var(--color-muted)",
									fontSize: "11",
									children: [
										"gap ",
										fmt(s.anode_gap_mm, 0),
										" mm"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M70 144 L50 180 L70 180",
									fill: "none",
									stroke: "currentColor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: "48",
									y: "198",
									fill: "var(--color-muted)",
									fontSize: "11",
									children: "Ar MFC"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Anode gap (bench only)",
							unit: "mm",
							value: s.anode_gap_mm,
							step: 1,
							onChange: (n) => set("anode_gap_mm", n),
							hint: "Hold fixed while screening plates. Final position is a HET test."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Electron current is a shunt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Not a CRT phosphor. Ia(t) = Vshunt / Rshunt. Isolated or differential measurements if the circuit floats — a scope ground clip will earth it."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Shunt",
									unit: "Ω",
									value: s.shunt_ohm,
									step: .01,
									onChange: (n) => set("shunt_ohm", n)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "V at Ia",
									value: `${fmt(d.Vshunt, 4)} V`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Shunt heat",
									value: `${fmt(d.Pshunt, 3)} W`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Net cathode",
									value: "Ia + Ik",
									hint: "Does not count all electrons leaving LaB6. Returning electrons and ions share the insert balance."
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-surface text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Quantity"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Instrument"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: "Limit"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "text-fg",
						children: [
							[
								"Delivered electron current",
								"Calibrated shunt or DC current probe",
								"Net collector current only"
							],
							[
								"Oscillations",
								"Scope / fast DAQ on Ia, Vac, Ik, Vkc",
								"Supply meters hide fluctuations"
							],
							[
								"Argon feed",
								"Calibrated MFC",
								"Gas correction factor"
							],
							[
								"Chamber P",
								"Gauge corrected for argon",
								"Not insert pressure"
							],
							[
								"Insert / upstream P",
								"CDG on a designed tap",
								"Tap location and T gradients"
							],
							[
								"Plate / emitter T",
								"Two-color pyrometer",
								"Solid T, not gas T"
							],
							[
								"Mount T",
								"Thermocouple",
								"Not the emitter"
							],
							[
								"ne, Te, plasma potential",
								"Langmuir / emissive probe",
								"After basic operation exists"
							]
						].map(([a, b, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2",
									children: a
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-muted",
									children: b
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 text-subtle",
									children: c
								})
							]
						}, a))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-border bg-surface p-5 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-medium text-fg",
					children: "Stability, not a fake efficiency"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: "At the same delivered current compare argon flow, discharge voltage, keeper/heater power, fluctuations, plate temperature, ignition, wear. Electrical input on the bench is ⟨Vac Ia⟩ + ⟨Vkc Ik⟩ + ⟨Vh Ih⟩ — that includes the external anode and is not the HET cathode penalty. CI = rms(Ia)/mean(Ia). Stay off the edge of the stable region."
				})]
			})
		]
	});
}
function Campaign() {
	const checks = useBench((s) => s.stageChecks);
	const toggle = useBench((s) => s.toggleCheck);
	const setTab = useBench((s) => s.set);
	const rows = matrix();
	const done = STAGES.reduce((n, st) => n + st.items.filter((i) => checks[i.id]).length, 0);
	const total = STAGES.reduce((n, st) => n + st.items.length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Staged campaign"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						done,
						" / ",
						total,
						" gates. Tick what is actually done. 36 plate points below are the first comparison matrix, not the whole program."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => setTab("tab", "map"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {}), " Open map"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-4",
				children: STAGES.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border bg-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-lg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-sm text-accent",
										children: ["0", st.n]
									}),
									" ",
									st.title
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: st.work
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-subtle",
							children: ["Establishes: ", st.establishes]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 grid gap-2",
							children: st.items.map((it) => {
								const on = !!checks[it.id];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => toggle(it.id),
									className: "flex w-full items-start gap-3 rounded-sm px-2 py-2 text-left hover:bg-surface-2",
									children: [on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 text-good" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "mt-0.5 size-4 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("text-sm", on ? "text-muted line-through" : "text-fg"),
										children: it.label
									})]
								}) }, it.id);
							})
						})
					]
				}, st.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: "Plate matrix"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 mb-3 text-sm text-muted",
					children: [
						"Plates ",
						PLATES_MM.join(" / "),
						" mm × currents ",
						CURRENTS_A.join(" / "),
						" A × flows ",
						FLOWS_SCCM.join(" / "),
						" sccm. Tick after the point is logged with settled temperatures and a repeat."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-md border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-surface text-xs text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Done"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "d (mm)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "I (A)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-3 py-2 font-medium",
									children: "Q (sccm)"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => {
							const on = !!checks[r.id];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => toggle(r.id),
											className: "p-1",
											children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-good" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-4 text-subtle" })
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 font-mono tabular-nums",
										children: r.plate.toFixed(2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 font-mono tabular-nums",
										children: r.I.toFixed(2)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-2 font-mono tabular-nums",
										children: r.Q.toFixed(1)
									})
								]
							}, r.id);
						}) })]
					})
				})
			] })
		]
	});
}
function Home() {
	(0, import_react.useEffect)(() => {
		useBench.persist.rehydrate();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {});
}
//#endregion
export { Home as component };
