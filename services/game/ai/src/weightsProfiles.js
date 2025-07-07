export const weightsProfiles = [
  // Profile 0: Precision Blocker — exact alignment, low angle, center-weighted
  { h1: 0.6, h2: 0.3, h3: 0.25, h4: 0.0, h5: 0.0 },

  // Profile 1: Curved Edge Attacker — maximum curve, wall-skimming, low stability
  { h1: 0.1, h2: 0.0, h3: 0.0, h4: 0.6, h5: 0.3 },

  // Profile 2: Conservative Anchor — prefers center, straightness, avoids wall play
  { h1: 0.2, h2: 0.3, h3: 0.4, h4: 0.0, h5: 0.1 }
];
