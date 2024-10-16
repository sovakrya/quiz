import { useRef, useState } from "react";
import "../styles/TheGame.css";
import { useNavigate } from "react-router-dom";

let example = window.game.createExample();
let result = window.game.countExample(example);
export default function TheGame() {
  const [exampleDone, setExampleDone] = useState(false);
  const [exampleCorrect, setExampleCorrect] = useState(false);
  const [countTask, setCountTask] = useState(window.game.currentTask);
  const exampleElements = useRef<HTMLDivElement | null>(null);
  const [exampleState, setExampleState] = useState(example);

  const navigate = useNavigate();

  function goBack() {
    window.game.saveDate();
    navigate("/");
  }

  function checkResult() {
    const elements = exampleElements.current?.children;

    const currentExample: Element[] = Array.from(elements!);

    const userExample = currentExample.map((elem, idx) => {
      if (elem instanceof HTMLInputElement) {
        if (isNaN(Number(elem.value))) {
          alert(
            `There is no number in the input field the number: ${
              idx + 1
            }! You can only enter numbers`
          );
        } else {
          return Number(elem.value);
        }
      }

      if (elem instanceof HTMLSpanElement) {
        return elem.textContent!;
      }
    });

    const res = eval(userExample.join(""));
    if (res === result) {
      setExampleDone(true);
      setExampleCorrect(true);
    } else {
      setExampleDone(true);
      setExampleCorrect(false);
    }

    currentExample.forEach((val) => {
      if (val instanceof HTMLInputElement) {
        val.value = "";
      }
    });

    window.game.saveDate();
  }

  function completedGame(){
    alert("you completed the game!")
    window.game.saveDate();
    navigate("/");
  }

  function createNewTask() {
    example = window.game.createExample();
    result = window.game.countExample(example);
    if(countTask >= 10){
      alert("you completed the game!")
      window.game.saveDate();
      navigate("/");
    }
    window.game.incrementCurrentTask();
    setCountTask((countTask) => countTask + 1);
    setExampleState(example);
    setExampleDone(false);
  }

  return (
    <div className="game-main-box">
      <div className="header-box">
        <span>#{countTask}</span>

        <button className="header-btn" onClick={goBack}>
          Закончить
        </button>
      </div>

      <div className="game-content-box">
        <div className="example-box">
          <div className="example-wrapper" ref={exampleElements}>
            {exampleState.map((val) => {
              if (typeof val === "number") {
                return <input type="number" className="example-input" />;
              }

              if (typeof val === "string") {
                return <span className="example-sign">{val}</span>;
              }
            })}
          </div>

          <div className="example-result-box">
            <span>=</span>
            <span>{result}</span>
          </div>
        </div>
        {!exampleDone ? (
          <button onClick={checkResult}>Ответить</button>
        ) : (
          <button onClick={createNewTask}>Следующий</button>
        )}
        {exampleDone ? (
          <div>
            {exampleCorrect ? <span>Правильно</span> : <span>Неправильно</span>}
            <div className="example-">
              <span>{"Можно так:"}</span>
              <span>{exampleState}</span>
              <span>{`= ${result}`}</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
