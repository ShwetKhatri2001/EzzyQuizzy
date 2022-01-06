import { useEffect, useState } from "react";
import QuizCard from "../QuizCard/QuizCard";
import axios from "axios";
import "./QuizBox.css";

const QuizBox = () => {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {

    const getQuestions = async () => {
      try {
        const { data } = await axios.get("https://api.startladder.co/api/frontend/tasks");
        const ques = data.task_array;
        setQuestions(ques);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();
  }, []);

  return (
    <div className="quizbox">
      {questions?.length ? <QuizCard questions={questions} /> : null}
    </div>
  );
};

export default QuizBox;
