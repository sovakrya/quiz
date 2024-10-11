import { useState } from "react";
import "../styles/SetingsGame.css";
import { Game } from "../game";
declare global {
  interface Window {
    game: Game;
  }
}

window.game = new Game();

export default function SetingsGame() {
  const [complexity, setComplexity] = useState(2);
  const [isChangeDifficulty, setIsChangeDifficulty] = useState(false);

  function changeDifficulty() {
    window.game.setDifficulty(complexity);
    setIsChangeDifficulty(false);
  }

  return (
    <div className="setings-main-box">
      <h2>Настройки:</h2>

      <div className="setings-sign-box">
        <h2>Допустимые знаки:</h2>

        <span className="setings-sign">+</span>
        <span className="setings-sign">-</span>

        <div className="setings-content-box">
          <div className="sign-content-box">
            <span className="setings-sign">*</span>
            <span className="setings-sign">/</span>
            <span className="setings-sign">^^</span>
          </div>

          <div className="sign-content-box">
            <button className="sign-btn" onClick={() => window.game.addOperator("*")}>✔</button>
            <button className="sign-btn" onClick={() => window.game.addOperator("/")}>✔</button>
            <button className="sign-btn" onClick={() => window.game.addOperator("^^")}>✔</button>
          </div>
        </div>
      </div>

      <div className="difficulty-box">
        <div className="difficulty-title-box">
          <span>Сложность: </span>
          {!isChangeDifficulty ? (
            <span>{` ${complexity}`}</span>
          ) : (
            <input
              type="number"
              onChange={(e) => {
                setComplexity(Number(e.target.value));
              }}
            />
          )}
        </div>
        {!isChangeDifficulty ? (
          <button
            className="difficulty-btn"
            onClick={() => setIsChangeDifficulty(true)}
          >
            Изменить
          </button>
        ) : (
          <button className="difficulty-btn" onClick={changeDifficulty}>
            Сохранить
          </button>
        )}
      </div>
    </div>
  );
}
