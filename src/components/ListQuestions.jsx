import { examen } from "../examen";
import React, { useEffect, useState } from "react";


function ListQuestions() {


  const [preguntas, setPreguntas] = useState([])
  useEffect(()=>{
    setPreguntas(examen)
  },[])


  function esCorrecta(){
    
  }



  return (
    <div>
      {preguntas.map((e) => (
        <div key={e.pregunta}>
          <p>{e.pregunta}</p>
          <li>
            <button onClick={()=>console.log("hola")}>{e.opcion_A}</button>
          </li>
          <li>
            <button>{e.opcion_B}</button>
          </li>
          <li>
            <button>{e.opcion_C}</button>
          </li>
          <li>
            <button>{e.opcion_D}</button>
          </li>
        </div>
      ))}
    </div>
  );
}

export default ListQuestions;
