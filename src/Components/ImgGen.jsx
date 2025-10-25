import React, { useState } from "react";
import { Api } from "../../Pages/Data_path";

function ImgGen() {
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePromptChange = (e) => setPrompt(e.target.value);

  const handleGenerate = async () => {
    if (!prompt.trim()) return alert("⚠️ Please enter a prompt!");

    setLoading(true);

    try {
      const response = await fetch(`${Api}/Ai/gen`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("API Error:", result);
        throw new Error(result.error || JSON.stringify(result));
      }

      if (!result.image) throw new Error("No image returned from backend");

      setData(result.image);

      // Upload to MongoDB
      const userId = localStorage.getItem("UserId");
      if (!userId) {
        alert("❌ User not logged in.");
        return;
      }

      const uploadRes = await fetch(`${Api}/Ai/addimg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: result.image, userId, prompt }),
      });

      const uploadResult = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadResult?.msg || "Upload failed");

      alert("✅ Image uploaded successfully");
    } catch (error) {
      console.error("❌ Error during generation or upload:", error);
      alert("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generation-section">
      <div className="main-gen">
        <div className="preview-card">
          <img
            className="genimg"
            src={data ? `data:image/png;base64,${data}` : "/nature-3082832.jpg"}
            alt="Generated"
          />
          <p className="preview-label">🔍 Generated Image Preview</p>
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="📝 Describe your image..."
            value={prompt}
            onChange={handlePromptChange}
          />
          <button onClick={handleGenerate} disabled={loading}>
            {loading ? "⏳ Generating..." : "🎨 Generate Image"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImgGen;
