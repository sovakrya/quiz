import { useState } from "react"
import SetingsGame from "./SetingsGame"
import "../styles/StartGame.css"
import { useNavigate } from "react-router-dom"

export default function StartGame (){
    const [date, setDate] = useState(null)
    const [countTask, setCountTask] = useState(0)

    const navigate = useNavigate()

    function goToGame(){
      navigate("/game")
    }
    
   
    return(
        <div className="start-main-box">
          <h2>Статистика:</h2>
        <span>{date} {countTask}/10</span>

        <SetingsGame />

        <button onClick={goToGame}>Начать игру!</button>
        </div>
    )
}