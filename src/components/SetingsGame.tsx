import { useState } from "react";

export default function SetingsGame() {
  const [complexity, setComplexity] = useState(2);
  return (
    <div>
      <h2>Настройки:</h2>

      <div>
        <h2>Допустимые знаки:</h2>
        <div>
          <span>+</span>
        </div>
        <div>
          <span>-</span>
        </div>
        <div>
          <span>*</span>
          <button>✔</button>
        </div>
        <div>
          <span>/</span>
          <button>✔</button>
        </div>
        <div>
          <span>^^</span>
          <button>✔</button>
        </div>
      </div>


      <div>
        <span>Сложность: </span>
        <span>{` ${complexity}`}</span>
        <button>Изменить сложность</button>
      </div>
    </div>
  );
}
