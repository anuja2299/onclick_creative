export async function downloadCompressed(canvas, format = "jpeg") {
  if (!canvas) return;

  const MAX_SIZE = 500 * 1024; // 500 KB
  let quality = 0.9;
  let blob = null;

  do {
    blob = await new Promise((resolve) =>
      canvas.toBlob(
        resolve,
        format === "png" ? "image/png" : "image/jpeg",
        quality
      )
    );
    quality -= 0.05;
  } while (blob.size > MAX_SIZE && quality > 0.3);

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `creative.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
