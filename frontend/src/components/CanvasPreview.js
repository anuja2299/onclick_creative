import React, { useEffect, useRef } from "react";
import templates from "../utils/templates";
import { downloadCompressed } from "../utils/download";

function CanvasPreview({
  productImage,
  logoImage,
  headline,
  templateId,
  logoPosition,
  outputSize
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size based on output format
    if (outputSize === "story") {
      canvas.width = 1080;
      canvas.height = 1920;
    } else if (outputSize === "fb") {
      canvas.width = 1200;
      canvas.height = 628;
    } else {
      canvas.width = 1080;
      canvas.height = 1080;
    }

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#e5e5e5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!productImage) return;

    const img = new Image();
    img.src = URL.createObjectURL(productImage);

    img.onload = () => {
      const layout = templates[templateId];

      ctx.drawImage(
        img,
        layout.product.x,
        layout.product.y,
        layout.product.w,
        layout.product.h
      );

      if (headline) {
        ctx.fillStyle = "#111";
        ctx.font = "bold 48px Arial";
        ctx.fillText(headline, layout.headline.x, layout.headline.y);
      }

      if (logoImage) {
        const logo = new Image();
        logo.src = URL.createObjectURL(logoImage);
        logo.onload = () => {
          ctx.drawImage(logo, layout.logo.x, layout.logo.y, 120, 120);
        };
      }
    };
  }, [productImage, logoImage, headline, templateId, logoPosition, outputSize]);

  return (
    <div className="preview-box">
      <h3 style={{ marginBottom: "10px" }}>Preview</h3>

      <canvas
        ref={canvasRef}
        id="creative-canvas"
        style={{
          width: "100%",
          maxHeight: "600px",
          borderRadius: "12px",
          background: "#ddd"
        }}
      />

      {/* DOWNLOAD BUTTONS BELOW IMAGE */}
      <div className="download-bar">
        <button onClick={() => downloadCompressed(canvasRef.current, "png")}>
          Download PNG
        </button>

        <button
          onClick={() => downloadCompressed(canvasRef.current, "jpeg")}
        >
          Download JPEG (&lt;500KB)
        </button>
      </div>
    </div>
  );
}

export default CanvasPreview;
