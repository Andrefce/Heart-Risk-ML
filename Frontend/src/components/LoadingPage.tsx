import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Loading.css";

const Loading: React.FC = () => {
  const [thinking, setThinking] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { answers } = location.state || { answers: {} }; // Retrieve answers from state

  useEffect(() => {
    // Simulate a thinking process, and after 3 seconds, stop thinking
    const thinkingTimer = setTimeout(() => {
      setThinking(false);
    }, 3000); // Simulate a delay of 3 seconds

    // Send answers to the backend after navigating to the Loading page
    const sendData = async () => {
      try {
        const response = await fetch("https://bedbug-thorough-terminally.ngrok-free.app/api/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers), // Send answers to the backend
        });

        if (response.ok) {
          const data = await response.json(); // Get the prediction from the backend
          console.log("Backend Response:", data);

          // Navigate to the Result page after 1 second of showing the "completed" message
          const navigationTimer = setTimeout(() => {
            navigate("/result", { state: { prediction: data.prediction } }); // Pass prediction to ResultPage
          }, 1000); // Wait 1 second before navigating

          return () => clearTimeout(navigationTimer); // Clean up the timer
        } else {
          const errorText = await response.text();
          console.error("Error sending answers to backend:", errorText);
        }
      } catch (error) {
        console.error("Error sending request:", error);
      }
    };

    sendData();

    return () => clearTimeout(thinkingTimer); // Clean up the timer on unmount
  }, [navigate, answers]);

  return (
    <div className="loading-container">
      <h1 className="loading-title">Analyzing Your Health Data...</h1>

      {thinking ? (
        <div className="thinking-animation">
          <div className="medical-loader">
            <div className="pulse"></div>
            <div className="stethoscope-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
          <p className="processing-text">Processing your health assessment...</p>
        </div>
      ) : (
        <div className="completed">
          <h2>Analysis Complete!</h2>
          <p>Your results are ready. Redirecting you now...</p>
        </div>
      )}
    </div>
  );
};

export default Loading;
