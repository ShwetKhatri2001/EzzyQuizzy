import React from "react";
import "./ResultBox.css";

const ResultBox = ({ accuracy, quizTime, resetQuiz }) => {

  console.log(accuracy, quizTime);
    
  const getNum = (num) => {
    return Number.isInteger(num) ? num : num.toFixed(2);
  };

  accuracy = getNum(accuracy * 100);
  quizTime = getNum(quizTime);

  return (
    <div className="resultbox">
      <div className="resultstats">
        <div>
          <p>{accuracy}%</p>
          <p>Accuracy</p>
        </div>
        <div>
          <p>{quizTime}s</p>
          <p>Avg Speed</p>
        </div>
      </div>
      <button onClick={resetQuiz} className="button">Play Again</button>
    </div>
  );
};

export default ResultBox;
