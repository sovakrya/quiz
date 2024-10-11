import "../styles/TheGame.css";

export default function TheGame() {
  let newExemple = window.game.createExample();

  function a(){
    console.log(newExemple.exemple)

    newExemple.exemple.map((val) => console.log(val))
  }

  return (
    <div className="game-main-box">
      <div className="header-box">
        <span>#</span>

        <button className="header-btn">Закончить</button>
      </div>

      <div className="game-content-box">
        <div>
          {newExemple.exemple.map((val) => {
            if (typeof val === "number") {
              return <input type="number" />;
            }

            if (typeof val === "string") {
              return <span>{val}</span>;
            }
          })
          
          }

        
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
