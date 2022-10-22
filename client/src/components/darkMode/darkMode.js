import React from "react";
import './modeStyles.css'
import bulbIcon from '../../images/light-bulb.png'

function handleClick() {
    alert("Hola betta")
}

export default function DarkMode() {
    return(
        <div>
            <button onClick={handleClick}>
            <img src={bulbIcon} alt="" width='32px' height='32px' />
            </button>   
        </div>
    )
}