

import React, { useState } from "react";
import { generateHeadlines, generateVariants, checkCompliance } from "../utils/api";

function UploadSection({
  productImage,
  setProductImage,
  logoImage,
  setLogoImage,
  headline,
  setHeadline,
  templateId,
  setTemplateId,
  logoPosition,
  setLogoPosition,
  outputSize,
  setOutputSize
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [variants, setVariants] = useState([]);
  const [compliance, setCompliance] = useState(null);

  const handleProductUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProductImage(file);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoImage(file);
  };

  const fetchHeadlines = async () => {
    const data = await generateHeadlines(headline);
    setSuggestions(data);
  };

  const fetchVariants = async () => {
    const data = await generateVariants(headline);
    setVariants(data);
  };

  const runComplianceCheck = async () => {
    const result = await checkCompliance(headline);
    setCompliance(result);
  };





  return (
    <div className="upload-panel">
      <h2>Create Your Ad</h2>

      <label>Upload Product Image</label>
      <input type="file" onChange={handleProductUpload} />

      <label>Upload Logo (optional)</label>
      <input type="file" onChange={handleLogoUpload} />

      <label>Headline</label>
      <input
        type="text"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
        placeholder="Eg: New Coffee Powder"
      />

      <button onClick={fetchHeadlines}>Suggest Headlines (AI)</button>

      {suggestions.length > 0 && (
        <div className="suggestion-box">
          <h4>AI Suggestions:</h4>
          {suggestions.map((s, i) => (
            <p key={i} onClick={() => setHeadline(s)}>{s}</p>
          ))}
        </div>
      )}

      <label>Template</label>
      <select value={templateId} onChange={(e) => setTemplateId(Number(e.target.value))}>
        <option value={0}>Left Product - Right Text</option>
        <option value={1}>Right Product - Left Text</option>
        <option value={2}>Centered Layout</option>
      </select>

      <label>Logo Position</label>
      <select value={logoPosition} onChange={(e) => setLogoPosition(e.target.value)}>
        <option value="top-left">Top Left</option>
        <option value="top-right">Top Right</option>
        <option value="bottom-left">Bottom Left</option>
        <option value="bottom-right">Bottom Right</option>
        <option value="center">Center</option>
      </select>

      <label>Output Size</label>
      <select value={outputSize} onChange={(e) => setOutputSize(e.target.value)}>
        <option value="square">Instagram Square</option>
        <option value="story">Instagram Story</option>
        <option value="fb">Facebook Landscape</option>
      </select>

      <button onClick={fetchVariants}>AI Creative Variants</button>

      {variants.length > 0 && (
        <div className="variant-box">
          <h4>AI Variants:</h4>
          {variants.map((v, i) => (
            <div
              key={i}
              className="variant-item"
              onClick={() => {
                setTemplateId(v.templateId);
                setLogoPosition(v.logoPos);
              }}
            >
              <p>Template: {v.templateId}</p>
              <p>Logo: {v.logoPos}</p>
            </div>
          ))}
        </div>
      )}

      <button onClick={runComplianceCheck}>Check Compliance</button>

      {compliance && (
        <div className="compliance-box">
          <h4>Compliance Result</h4>
          <p>OK: {compliance.ok ? "Yes" : "No"}</p>
          <p>Issues: {compliance.issues.join(", ")}</p>
          <p>Suggestion: {compliance.suggestion}</p>
        </div>
      )}

      

    </div>
  );
}

export default UploadSection;
