import { useRef, useState } from "react";
import "../styles/TheGame.css";
import { useNavigate } from "react-router-dom";

let example = window.game.createExample();
let result = window.game.countExample(example);
export default function TheGame() {
  const [exampleDone, setExampleDone] = useState(false);
  const [exampleCorrect, setExampleCorrect] = useState(false);
  const [countTask, setCountTask] = useState(
    Number(window.game.gameStorage.getItem("currentTask"))
  );
  const exampleElements = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  function goBack() {
    navigate("/");
  }

  function checkResult() {
    const userExample: Array<number | string> = [];
    const elements = exampleElements.current?.children;

    const currentExample: Element[] = Array.from(elements!);

    currentExample.forEach((elem, idx) => {
      if (elem instanceof HTMLInputElement) {
        if (isNaN(Number(elem.value))) {
          alert(
            `There is no number in the input field the number: ${
              idx + 1
            }! You can only enter numbers`
          );
        } else {
          userExample.push(Number(elem.value));
        }
      }

      if (elem instanceof HTMLSpanElement) {
        userExample.push(elem.textContent!);
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
  }

  function createNewTask() {
    example = window.game.createExample();
    result = window.game.countExample(example);

    setExampleDone(false);
    window.game.gameStorage.setItem("currentTask", `${countTask + 1}`);
    setCountTask((countTask) => countTask + 1);
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
            {example.map((val) => {
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
              <span>{example}</span>
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
