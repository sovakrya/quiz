import { useState } from "react";
import "../styles/SetingsGame.css";

export default function SetingsGame() {
  const [complexity, setComplexity] = useState(2);
  return (
    <div className="setings-main-box">
      <h2>Настройки:</h2>

      <div className="setings-sign-box">
        <h2>Допустимые знаки:</h2>

        <span className="setings-sign">+</span>
        <span className="setings-sign">-</span>

        <div className="setings-content-box" >
          <div className="sign-content-box">
            <span className="setings-sign">*</span>
            <span className="setings-sign">/</span>
            <span className="setings-sign">^^</span>
          </div>

          <div className="sign-content-box">
            <button className="sign-btn">✔</button>
            <button className="sign-btn">✔</button>
            <button className="sign-btn">✔</button>
          </div>
        </div>
      </div>

      <div className="difficulty-box">
        <div className="difficulty-title-box">
        <span>Сложность: </span>
        <span>{` ${complexity}`}</span>
        </div>
        <button className="difficulty-btn">Изменить сложность</button>
      </div>
    </div>
  );
}
