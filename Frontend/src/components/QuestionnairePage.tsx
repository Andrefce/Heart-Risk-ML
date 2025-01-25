import React, { useState, useEffect } from "react";
import "../styles/QuestionnairePage.css";
import { useNavigate } from "react-router-dom";

interface QuestionType {
  id: string;
  text: string;
  type: "text" | "number" | "radio" | "checkbox";
  options?: string[];
}

const QuestionnairePage: React.FC = () => {
  const [answers, setAnswers] = useState<{
    [key: string]: string | string[] | number;
  }>({});
  const [missingQuestions, setMissingQuestions] = useState<string[]>([]);

  const questions: QuestionType[] = [
    {
      id: "General_Health",
      text: "What is your general health?",
      type: "radio",
      options: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
    },
    {
      id: "Checkup",
      text: "When was your last medical checkup?",
      type: "radio",
      options: [
        "Within the past year",
        "Within the past 2 years",
        "Within the past 5 years",
        "5 or more years ago",
        "Never",
      ],
    },
    {
      id: "Exercise",
      text: "Do you engage in regular exercise?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: "Skin_Cancer",
      text: "Do you have skin cancer?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: "Other_Cancer",
      text: "Do you have any other type of cancer?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: "Depression",
      text: "Do you have depression?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: "Diabetes",
      text: "Do you have diabetes?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: "Arthritis",
      text: "Do you have arthritis?",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      id: "Sex",
      text: "What is your biological sex?",
      type: "radio",
      options: ["Female", "Male"],
    },
    {
      id: "Age_Category",
      text: "What is your age category?",
      type: "radio",
      options: [
        "18-24",
        "25-29",
        "30-34",
        "35-39",
        "40-44",
        "45-49",
        "50-54",
        "55-59",
        "60-64",
        "65-69",
        "70-74",
        "75-79",
        "80+",
      ],
    },
    {
      id: "Smoking_History",
      text: "Do you smoke?",
      type: "radio",
      options: ["Yes", "No"],
    },
    { id: "Height_(cm)", text: "What is your height (cm)?", type: "number" },
    { id: "Weight_(kg)", text: "What is your weight (kg)?", type: "number" },
    { id: "BMI", text: "What is your Body Mass Index (BMI)?", type: "number" },
    {
      id: "Alcohol_Consumption",
      text: "How often do you consume alcohol (per week)?",
      type: "number",
    },
    {
      id: "Fruit_Consumption",
      text: "How many servings of fruit do you consume weekly?",
      type: "number",
    },
    {
      id: "Green_Vegetables_Consumption",
      text: "How many servings of green vegetables do you consume weekly?",
      type: "number",
    },
    {
      id: "FriedPotato_Consumption",
      text: "How many servings of fried potatoes do you consume weekly?",
      type: "number",
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    // Initialize random answers
    const initialAnswers: { [key: string]: string | string[] | number } = {};
    questions.forEach((question) => {
      if (question.type === "radio" && question.options) {
        // Randomly select an option for radio questions
        initialAnswers[question.id] =
          question.options[Math.floor(Math.random() * question.options.length)];
      } else if (question.type === "number") {
        if (question.id === "BMI") {
          // Generate a random float for BMI (realistic range: 18.5 to 40)
          initialAnswers[question.id] = parseFloat(
            (18.5 + Math.random() * (40 - 18.5)).toFixed(1)
          );
        } else {
          // Generate a random integer for other numeric fields
          initialAnswers[question.id] = Math.floor(Math.random() * 100); // Adjust range as needed
        }
      } else {
        // Set empty string for text and checkbox questions
        initialAnswers[question.id] = "";
      }
    });
    setAnswers(initialAnswers);
  }, []);

  const handleAnswerChange = (
    questionId: string,
    value: string | string[] | number
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form from reloading the page

    // Check for unanswered questions
    const unanswered = questions
      .filter(
        (question) => !answers[question.id] || answers[question.id] === ""
      )
      .map((question) => question.id);

    if (unanswered.length > 0) {
      setMissingQuestions(unanswered); // Show missing questions if any
    } else {
      setMissingQuestions([]); // Clear missing questions
      console.log("Submitted Answers:", answers);

      try {
        // Navigate to the Loading page first
        navigate("/loading", { state: { answers } }); // Pass answers to the Loading page

        // Send answers to the backend
        const response = await fetch("https://bedbug-thorough-terminally.ngrok-free.app", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Ensure correct content type
          },
          body: JSON.stringify(answers), // Send answers as JSON body
        });
  
        if (response.ok) {
          const data = await response.json(); // Handle successful response
          console.log("Backend Response:", data);

          // The Loading page will handle navigation to the Result page
        } else {
          const errorText = await response.text();
          console.error("Error sending answers to backend:", errorText); // Handle error in response
        }
      } catch (error) {
        console.error("Error sending request:", error); // Catch network or other errors
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Heart Disease Risk Assessment
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((question) => (
              <div
                key={question.id}
                className="p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition"
              >
                <h2
                  className={`text-lg font-semibold mb-4 ${
                    missingQuestions.includes(question.id)
                      ? "text-red-600"
                      : "text-gray-800"
                  }`}
                >
                  {question.text}
                </h2>
                <div className="space-y-3">
                  {question.type === "radio" &&
                    question.options?.map((option) => (
                      <div
                        key={option}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          id={`${question.id}-${option}`}
                          name={`question-${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={() =>
                            handleAnswerChange(question.id, option)
                          }
                          className="form-radio text-blue-500"
                        />
                        <label
                          htmlFor={`${question.id}-${option}`}
                          className="text-gray-700 hover:text-blue-600 transition"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  {question.type === "checkbox" &&
                    question.options?.map((option) => (
                      <div
                        key={option}
                        className="flex items-center space-x-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={`${question.id}-${option}`}
                          value={option}
                          checked={
                            // Ensure answers[question.id] is treated as an array of strings
                            (Array.isArray(answers[question.id])
                              ? (answers[question.id] as string[])
                              : []
                            ).includes(option)
                          }
                          onChange={() => {
                            // Ensure answers[question.id] is treated as an array of strings
                            const currentAnswers = Array.isArray(
                              answers[question.id]
                            )
                              ? (answers[question.id] as string[])
                              : [];
                            const newAnswers = currentAnswers.includes(option)
                              ? currentAnswers.filter((o) => o !== option)
                              : [...currentAnswers, option];
                            handleAnswerChange(question.id, newAnswers);
                          }}
                          className="form-checkbox text-green-500"
                        />
                        <label
                          htmlFor={`${question.id}-${option}`}
                          className="text-gray-700 hover:text-green-600 transition"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  {question.type === "text" && (
                    <input
                      type="text"
                      placeholder="Type your answer here..."
                      value={answers[question.id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                  )}
                  {question.type === "number" && (
                    <input
                      type="number"
                      min="0"
                      step={question.id === "BMI" ? "0.1" : "1"} // Allow decimals only for BMI
                      placeholder="Enter a number..."
                      value={answers[question.id] || ""}
                      onChange={(e) =>
                        handleAnswerChange(
                          question.id,
                          question.id === "BMI"
                            ? parseFloat(e.target.value) // Parse as float for BMI
                            : parseInt(e.target.value, 10) // Parse as integer for others
                        )
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                    />
                  )}
                </div>
              </div>
            ))}
            {missingQuestions.length > 0 && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow">
                <p>Please answer the following questions:</p>
                <ul className="list-disc list-inside">
                  {missingQuestions.map((id) => {
                    const question = questions.find((q) => q.id === id);
                    return question ? <li key={id}>{question.text}</li> : null;
                  })}
                </ul>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 px-6 text-lg font-bold bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;
