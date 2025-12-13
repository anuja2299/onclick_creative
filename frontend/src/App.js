import React, { useState } from "react";
import UploadSection from "./components/UploadSection";
import CanvasPreview from "./components/CanvasPreview";
import "./App.css";


function App() {
  const [productImage, setProductImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [headline, setHeadline] = useState("");
  const [templateId, setTemplateId] = useState(0);
  const [logoPosition, setLogoPosition] = useState("top-right");
  const [outputSize, setOutputSize] = useState("square");
  const canDownload = !!productImage;

  return (
    <div className="app-container">
      <header className="top-header">
        <h1>On-Click Creative Builder</h1>
        <p>Create professional, retailer-compliant ads using Generative AI</p>
      </header>

      <div className="main-layout">
        <UploadSection
          productImage={productImage}
          setProductImage={setProductImage}
          logoImage={logoImage}
          setLogoImage={setLogoImage}
          headline={headline}
          setHeadline={setHeadline}
          templateId={templateId}
          setTemplateId={setTemplateId}
          logoPosition={logoPosition}
          setLogoPosition={setLogoPosition}
          outputSize={outputSize}
          setOutputSize={setOutputSize}
        />

        <CanvasPreview
          productImage={productImage}
          logoImage={logoImage}
          headline={headline}
          templateId={templateId}
          logoPosition={logoPosition}
          outputSize={outputSize}
          canDownload={canDownload}
        />
      </div>
    </div>
  );
}

export default App;
