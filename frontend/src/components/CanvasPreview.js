import React, { useEffect, useRef, useCallback } from "react";
import templates from "../utils/templates";

function CanvasPreview({
  productImage,
  logoImage,
  headline,
  templateId,
  logoPosition,
  outputSize,
  canDownload
}) {
  const canvasRef = useRef(null);

  /* ------------------ CANVAS SIZE ------------------ */
  const getCanvasSize = useCallback(() => {
    switch (outputSize) {
      case "story":
        return { width: 1080, height: 1920 };
      case "fb":
        return { width: 1200, height: 628 };
      default:
        return { width: 1080, height: 1080 };
    }
  }, [outputSize]);

  /* ------------------ DRAW LOGIC ------------------ */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { width, height } = getCanvasSize();

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(0, 0, width, height);

    if (!productImage) return;

    const template = templates[templateId];
    const product = new Image();
    product.src = URL.createObjectURL(productImage);

    product.onload = () => {
      ctx.drawImage(
        product,
        template.product.x,
        template.product.y,
        template.product.w,
        template.product.h
      );

      // Headline
      if (headline) {
        ctx.fillStyle = "#000";
        ctx.font = "bold 48px Arial";
        ctx.textAlign = "left";
        ctx.fillText(
          headline,
          template.headline.x,
          template.headline.y
        );
      }

      // Logo
      if (logoImage) {
        const logo = new Image();
        logo.src = URL.createObjectURL(logoImage);

        logo.onload = () => {
          let x = 0, y = 0;
          const size = 120;

          switch (logoPosition) {
            case "top-left":
              x = 30; y = 30;
              break;
            case "top-right":
              x = width - size - 30; y = 30;
              break;
            case "bottom-left":
              x = 30; y = height - size - 30;
              break;
            case "bottom-right":
              x = width - size - 30; y = height - size - 30;
              break;
            default:
              x = width / 2 - size / 2;
              y = 30;
          }

          ctx.drawImage(logo, x, y, size, size);
        };
      }
    };
  }, [
    productImage,
    logoImage,
    headline,
    templateId,
    logoPosition,
    getCanvasSize
  ]);

  /* ------------------ DOWNLOAD HANDLERS ------------------ */
  const downloadPNG = () => {
    if (!productImage) {
      alert("Please upload a product image before downloading.");
      return;
    }

    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "creative.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadJPEG = () => {
    if (!productImage) {
      alert("Please upload a product image before downloading.");
      return;
    }

    const canvas = canvasRef.current;

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.download = "creative.jpg";
        link.href = URL.createObjectURL(blob);
        link.click();
      },
      "image/jpeg",
      0.8
    );
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="preview-box">
      <h3>Preview</h3>

      <canvas ref={canvasRef} />

      <div className="download-bar">
        <button disabled={!canDownload} onClick={downloadPNG}>
          Download PNG
        </button>
        <button disabled={!canDownload} onClick={downloadJPEG}>
          Download JPEG (&lt;500KB)
        </button>
      </div>
    </div>
  );
}

export default CanvasPreview;
