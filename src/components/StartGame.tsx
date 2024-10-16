import { useState } from "react"
import SetingsGame from "./SetingsGame"
import "../styles/StartGame.css"
import { useNavigate } from "react-router-dom"

export default function StartGame (){
    const [date, setDate] = useState(window.game.date)
    const [countTask, setCountTask] = useState(window.game.currentTask)

    const navigate = useNavigate()

    function goToGame(){
      navigate("/game")
    }
    
   
    return(
        <div className="start-main-box">
          <h2>Статистика:</h2>
          <div className="statistics-box">
        <span>{date} </span>
        <span>{countTask}/10</span>
        </div>

        <SetingsGame />

        <button onClick={goToGame}>Начать игру!</button>
        </div>
    )
}