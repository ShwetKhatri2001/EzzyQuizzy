import { useEffect, useRef, useState } from "react"
import Lottie from "react-lottie";
import QuizTimer from "../QuizTimer/QuizTimer";
import ResultBox from "../ResultBox/ResultBox";
import Right from "../../assets/lottie/right.json";
import Wrong from "../../assets/lottie/wrong.json";
import "./QuizCard.css";

const QuizCard = ({ questions }) => {
  const [start, setStart] = useState("start");
  const [queno, setQueNo] = useState(0);
  const [currQue, setCurrQue] = useState(questions[queno]);
  const [answer, setAnswer] = useState("");
  const [animating, setAnimating] = useState(false);
  const [lottieText, setLottieText] = useState("");
  const [pause, setPause] = useState(false);
  const [quizTime, setQuizTime] = useState(0);
  const [score, setScore] = useState(0);
  const [viewSolution, setViewSolution] = useState(false);
  const input = useRef();
  const animDiv = useRef();

  const focusInput = () => {
    input?.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, [start]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnimating(true);
    setPause(true);

    if (answer
        ?.replace(/^\s+|\s+$/g, "")
        .replace(/\s+/g, " ")
        .toLowerCase() === currQue.answer.toLowerCase()
    ) {
      setLottieText("Right");
      if (!viewSolution) {
        setScore((prevScore) => prevScore + 1);
      }
    } else {
      setLottieText("Wrong");
    }

    setTimeout(() => {
      setAnimating(false);
      setLottieText("");
      setAnswer("");

      const nextQueNo = queno + 1;

      setQueNo(nextQueNo);
      if (nextQueNo < questions.length) {
        setCurrQue(questions[nextQueNo]);
        setPause(false);
      } else {
        setStart("end");
      }
    }, 1500);

    setViewSolution(false);
  };

  useEffect(() => {

    if (start !== "game") return;
    input.current.disabled = true;
    animDiv.current.style.transform = `translate(-${queno * 100}%)`;

    const id = setTimeout(() => {
      input.current.disabled = false;
      focusInput();
    }, 800);

    return () => clearTimeout(id);

  }, [currQue]);

  const resetQuiz = () => {
    setStart("start");
    setQueNo(0);
    setCurrQue(questions[0]);
    setScore(0);
    setAnimating(false);
    setAnswer("");
    setLottieText("");
    setPause(false);
    setViewSolution(false);
  };

  let lottieBg = {
    background: "linear-gradient(91.23deg, #20622A 0%, #48B566 131.71%)",
  };

  if (lottieText === "Right") {
    lottieBg.background =
      "linear-gradient(91.23deg, #20622A 0%, #48B566 131.71%)";
  } else if (lottieText === "Wrong") {
    lottieBg.background =
      "linear-gradient(91.23deg, #F35325 0%, #F3AD25 131.71%)";
  } else {
    lottieBg.background =
      "linear-gradient(91.23deg, #6776ff 0%, #80ffdb 131.71%)";
  }

  const lottie = lottieText === "Right" ? Right : lottieText === "Wrong" ? Wrong : "";

  const defaultOptions = {
    loop: false,
    animationData: lottie,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="quizcard">
       {start === "start" && 
          <div className="startbox">
              <button onClick={() => setStart("game")} className="button">Start Quiz</button>
          </div>
       }
       {start === "game" && (
        <>
          <div className="topic">
            <div>
              <p className="heading">Topic</p>
              <p>{currQue?.category}</p>
            </div>
            <QuizTimer pause={pause} setQuizTime={setQuizTime} start={start} />
          </div>
          <div className="question">
            <p className="heading"> Question {queno + 1} of {questions.length} </p>
            <div className="quecontainer">
              <div
                className="quediv"
                ref={animDiv}
                style={{
                  gridTemplateColumns: `repeat(${questions.length}, 100%)`,
                }}
              >
                {questions.map((ques, index) => (
                  <p className="quetext" key={index}>{ques.question}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="result" style={{ ...lottieBg }}>
            {!animating ? (
              <>
                <p className="answer"> TYPE ANSWER </p>
                <div className="soldiv">
                  <form onSubmit={handleSubmit} className="form">
                    <input
                      type="text"
                      className="input"
                      placeholder="Type here..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      ref={input}
                      required
                    />
                  </form>
                  {!viewSolution ? (
                    <div className="revealbtn">
                      <>
                        <p>Stuck ?</p>
                        <button  onClick={() => setViewSolution(true)} className="button">See Solution</button>
                      </>
                    </div>
                  ) : (
                    <p className="answertext"> {currQue.answer} </p>
                  )}
                </div>
              </>
            ) : (
              <div className="lottiediv">
                {
                  <Lottie
                    options={defaultOptions}
                    height="100%"
                    width="25%"
                  />
                }
              </div>
            )}
          </div>
        </>
      )}
      {start === "end" && (
        <ResultBox
          accuracy={score / questions?.length}
          quizTime={quizTime / questions?.length}
          resetQuiz={resetQuiz}
        />
      )}
    </div>
  );
};

export default QuizCard;
