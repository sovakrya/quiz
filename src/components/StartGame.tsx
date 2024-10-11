import { useState } from "react"
import SetingsGame from "./SetingsGame"
import "../styles/StartGame.css"

export default function StartGame (){
    const [date, setDate] = useState(null)
    const [countTask, setCountTask] = useState(0)

    
   
    return(
        <div className="start-main-box">
          <h2>Статистика:</h2>
        <span>{date} {countTask}/10</span>

        <SetingsGame />

        <button>Начать игру!</button>
        </div>
    )
}