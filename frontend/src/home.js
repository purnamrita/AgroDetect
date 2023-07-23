import React, { useState } from "react";
import "./Home.css"

const Home = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error("Error occurred during prediction:", error);
    }
  };

  return (
    <div>
      <h1>AgroDetect: Potato Leaf Disease Classifier</h1>
      <input className="upload" type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Predict</button>
      {prediction && (
        <div className="result">
          <h2>Prediction Result:</h2>
          <p>Class: {prediction.class}</p>
          <p>Confidence: {prediction.confidence}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
