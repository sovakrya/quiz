import "../styles/TheGame.css";

export default function TheGame() {
  const example = window.game.createExample()
  const newExemple = window.game.countExample(example)

  function a() {
    console.log(newExemple.example);

    newExemple.example.map((val) => console.log(val));
  }

  return (
    <div className="game-main-box">
      <div className="header-box">
        <span>#</span>

        <button className="header-btn">Закончить</button>
      </div>

      <div className="game-content-box">
        <div>
          {newExemple.example.map((val) => {
            if (typeof val === "number") {
              return <input type="number" />;
            }

            if (typeof val === "string") {
              return <span>{val}</span>;
            }
          })}

          <span>{`= ${newExemple.result}`}</span>
        </div>
        <button>Ответить</button>
        <span>Правильно/Неправильно</span>
        <span>Вариант ответа</span>
        <button onClick={a}>d</button>
      </div>
    </div>
  );
}
