import { useEffect, useState } from "react";
import "./QuizTimer.css";

const QuizTimer = ({ pause, start, setQuizTime }) => {
  const [sec, setSec] = useState("00");
  const [min, setMin] = useState("00");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!pause) {
      const intervalId = setInterval(() => {
        const secCounter = counter % 60;
        const minCounter = Math.floor(counter / 60);

        const computedSec =
          String(secCounter).length === 1
            ? `0${secCounter}`
            : secCounter;

        const computedMin =
          String(minCounter).length === 1
            ? `0${minCounter}`
            : minCounter;

        setSec(computedSec);
        setMin(computedMin);
        setCounter((counter) => counter + 1);

      }, 1000);

      setQuizTime(counter);
      return () => clearInterval(intervalId);
    }
  }, [counter, pause]);

  if (start === "start") {
    setCounter(0);
    setSec("00");
    setMin("00");
  }

  return (
    <div className="quiztimer">
      <div className="min">
        <div className="minval">{min}</div>
        <div className="mintext">MIN</div>
      </div>
      <div className="sep">:</div>
      <div className="sec">
        <div className="secval">{sec}</div>
        <div className="sectext">SEC</div>
      </div>
    </div>
  );
};

export default QuizTimer;
