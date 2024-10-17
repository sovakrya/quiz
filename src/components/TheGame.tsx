import { useEffect, useRef, useState } from "react";
import "../styles/TheGame.css";
import { useNavigate } from "react-router-dom";
import { Game } from "../game";

declare global {
  interface Window {
    game: Game;
  }
}

window.game = new Game();

let example = window.game.createExample();
let result = window.game.countExample(example);

export default function TheGame() {
  const [exampleDone, setExampleDone] = useState(false);
  const [exampleCorrect, setExampleCorrect] = useState(false);
  const [countTask, setCountTask] = useState(window.game.currentTask);
  const [exampleState, setExampleState] = useState(example);
  const [timerState, setTimerState] = useState(window.game.timer);
  const exampleElements = useRef<HTMLDivElement | null>(null);
  const interval = useRef<null | ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (timerState >= 0) {
      interval.current = setTimeout(() => {
        setTimerState((timerState) => timerState - 1000);
        window.game.saveTimer(timerState);
      }, 1000);
    }

    if (timerState <= 0) {
      window.game.restartGame();
      clearInterval(interval.current!);
      alert("time is up!");
    }
  }, [timerState]);

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

  function completedGame() {
    alert("you completed the game!");
    window.game.saveDate();
    window.game.restartGame();
    clearInterval(interval.current!);
    navigate("/");
  }

  function createNewTask() {
    example = window.game.createExample();
    result = window.game.countExample(example);
    if (countTask >= 10) {
      completedGame();
    } else {
      window.game.incrementCurrentTask();
      setCountTask((countTask) => countTask + 1);
      setExampleState(example);
      setExampleDone(false);
    }
  }

  function focusBack() {
    const selectedElIdx = Array.from(
      exampleElements.current?.children!
    ).indexOf(document.activeElement!);
    const arrEl = Array.from(exampleElements.current?.children!) as (
      | HTMLInputElement
      | HTMLSpanElement
    )[];

    if (selectedElIdx === -1 || selectedElIdx === 0) {
      arrEl[arrEl.length - 1].focus();
    } else {
      arrEl[selectedElIdx - 2].focus();
    }
  }

  function focusForward() {
    let selectedElIdx = Array.from(exampleElements.current?.children!).indexOf(
      document.activeElement!
    );
    const arrEl = Array.from(exampleElements.current?.children!) as (
      | HTMLInputElement
      | HTMLSpanElement
    )[];

    if (selectedElIdx === arrEl.length - 1 || selectedElIdx === -1) {
      arrEl[0].focus();
    } else {
      arrEl[selectedElIdx + 2].focus();
    }
  }

  function writeToInput(numb: number) {
    const selectedInput = document.activeElement as HTMLInputElement;
    selectedInput.value += String(numb);
  }

  return (
    <div className="game-main-box">
      <div className="header-box">
        <div className="timer-box">
          <span>{Math.floor(timerState / 1000 / 60)}:</span>
          <span>{Math.floor((timerState / 1000) % 60)}</span>
        </div>
        <span>#{countTask}</span>

        <button className="header-btn" onClick={goBack}>
          Закончить
        </button>
      </div>

      <div className="game-content-box">
        <div className="example-box">
          <div className="example-wrapper" ref={exampleElements}>
            {exampleState.map((val, idx) => {
              if (typeof val === "number") {
                if (idx === 0) {
                  return (
                    <input type="number" className="example-input" autoFocus />
                  );
                }
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

      <div className="onscreen-keyboard-box">
        <div className="onscreen-keyboard-btn-box">
          <button
            onClick={() => writeToInput(7)}
            onMouseDown={(e) => e.preventDefault()}
          >
            7
          </button>
          <button
            onClick={() => writeToInput(8)}
            onMouseDown={(e) => e.preventDefault()}
          >
            8
          </button>
          <button
            onClick={() => writeToInput(9)}
            onMouseDown={(e) => e.preventDefault()}
          >
            9
          </button>
        </div>
        <div className="onscreen-keyboard-btn-box">
          <button
            onClick={() => writeToInput(4)}
            onMouseDown={(e) => e.preventDefault()}
          >
            4
          </button>
          <button
            onClick={() => writeToInput(5)}
            onMouseDown={(e) => e.preventDefault()}
          >
            5
          </button>
          <button
            onClick={() => writeToInput(6)}
            onMouseDown={(e) => e.preventDefault()}
          >
            6
          </button>
        </div>
        <div className="onscreen-keyboard-btn-box">
          <button
            onClick={() => writeToInput(1)}
            onMouseDown={(e) => e.preventDefault()}
          >
            1
          </button>
          <button
            onClick={() => writeToInput(2)}
            onMouseDown={(e) => e.preventDefault()}
          >
            2
          </button>
          <button
            onClick={() => writeToInput(3)}
            onMouseDown={(e) => e.preventDefault()}
          >
            3
          </button>
        </div>
        <div className="onscreen-keyboard-btn-box">
          <button
            onClick={() => writeToInput(0)}
            onMouseDown={(e) => e.preventDefault()}
          >
            0
          </button>
          <button onMouseDown={(e) => e.preventDefault()} onClick={focusBack}>
            ←
          </button>
          <button
            onMouseDown={(e) => e.preventDefault()}
            onClick={focusForward}
            autoFocus={false}
          >
            →
          </button>
          <button>Х</button>
        </div>
      </div>
    </div>
  );
}
