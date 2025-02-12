import React from "react";
import { useNavigate } from "react-router-dom"; // Removed unused `useLocation`
import "../styles/Result.css";

// Medical-themed icons (you can use an icon library like Heroicons or Font Awesome)
const WarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-red-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-16 w-16 text-green-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const ResultPage: React.FC = () => {
  const navigate = useNavigate();

  // Explicitly type `predictionValue` as `number` to allow for other values
  const predictionValue: number = 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Heart Disease Risk Assessment
          </h1>
          <div className="space-y-6">
            <div className="text-lg text-gray-700">
              Based on your responses, the assessment result is:
            </div>
            <div className="text-2xl font-semibold">
              {predictionValue === 1 ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <WarningIcon />
                  <p className="text-red-600 mt-4">
                    High Risk: The assessment indicates a potential risk of heart
                    disease. Please consult a healthcare professional for further
                    evaluation.
                  </p>
                </div>
              ) : predictionValue === 0 ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <SuccessIcon />
                  <p className="text-green-600 mt-4">
                    Low Risk: The assessment indicates a low risk of heart
                    disease. Maintain a healthy lifestyle and regular check-ups.
                  </p>
                </div>
              ) : (
                <p className="text-yellow-600 text-center">
                  Unable to determine risk. Please ensure all inputs are correct
                  and try again.
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-8 w-full py-3 px-6 text-lg font-bold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
