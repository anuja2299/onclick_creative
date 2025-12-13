export function checkGeometry({logoW, logoH, canvasW, canvasH}) {
  const issues = [];
  if ((logoW*logoH) / (canvasW*canvasH) > 0.15) issues.push('logo-too-big');
  // safe zone
  return issues;
}
