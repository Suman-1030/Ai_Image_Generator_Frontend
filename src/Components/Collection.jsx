import React, { useEffect, useState } from 'react';
import { Api } from '../../Pages/Data_path';

function Collection() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('UserId');

  useEffect(() => {
    if (userId) {
      console.log("✅ User ID found:", userId);
      fetchImages();
    } else {
      console.warn("❌ User ID not found in localStorage");
      alert("❌ User ID not found. Please log in again.");
    }
  }, []);

  const fetchImages = async () => {
    try {
      console.log("📤 Sending request to fetch metadata...");

      // Step 1: Fetch image metadata
      const response = await fetch(`${Api}/User/getcollection`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      console.log("📥 Raw response:", response);
      const result = await response.json();
      console.log("📦 Parsed response JSON:", result);

      if (!response.ok) {
        console.error("❌ Server returned error:", result.msg);
        throw new Error(result.msg || "Failed to get image metadata");
      }

      const metadataList = result.retrievedData || []; // ✅ Ensure correct key
      console.log("🧠 Metadata list:", metadataList);

      // Step 2: Fetch actual image blobs
      const completeImages = await Promise.all(
        metadataList.map(async (meta) => {
          try {
            console.log(`🌐 Fetching image blob for ID: ${meta._id}`);
            const imgRes = await fetch(`${Api}/User/getimage/${meta._id}`);
            if (!imgRes.ok) throw new Error('Image fetch failed');

            const blob = await imgRes.blob();
            const blobUrl = URL.createObjectURL(blob);

            console.log(`✅ Created blob URL for image ID: ${meta._id}`);
            return {
              ...meta,
              image: blobUrl,
            };
          } catch (err) {
            console.error(`⚠️ Error fetching image with ID ${meta._id}:`, err);
            return null;
          }
        })
      );

      const filteredImages = completeImages.filter(Boolean);
      console.log("📊 Total valid images fetched:", filteredImages.length);
      setImages(filteredImages);
    } catch (err) {
      console.error("❌ Error during fetchImages:", err);
      alert("Failed to load image collection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='collection-Section'>
    <div className='imgcoll'>
      <h2>🖼️ Previously Generated Images</h2>

      {loading ? (
        <p>⏳ Loading images...</p>
      ) : (
        <div className='img'>
          {images.length === 0 ? (
            <p>No images found in your collection.</p>
          ) : (
            images.map((e, index) => (
              <div className='img-box' key={e._id || index}>
                <img
                  src={e.image}
                  alt={e.prompt || `Image ${index}`}
                
                />
                <p><strong>Prompt:</strong> {e.prompt}</p>
                <a className="download-btn" href={e.image} download={`image_${index}.jpg`}>
                  ⬇️ Download
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </div>
  );
}

export default Collection;
