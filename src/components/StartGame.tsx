import { useState } from "react"
import SetingsGame from "./SetingsGame"

export default function StartGame (){
    const [date, setDate] = useState(null)
    const [countTask, setCountTask] = useState(0)

    
   
    return(
        <div>
          <h2>Статистика:</h2>
        <span>{date} {countTask}/10</span>

        <SetingsGame />

        <button>Начать игру!</button>
        </div>
    )
}