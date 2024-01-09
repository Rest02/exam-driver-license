import { examen } from "../examen";
import React, { useEffect, useState } from "react";

function ListQuestions() {
  const [preguntas, setPreguntas] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [preguntaRespondida, setPreguntaRespondida] = useState([]);

  useEffect(() => {
    setPreguntas(examen);
  }, []);

  function correcion(opcion, e) {
    if (opcion.isCorrect == true) {
      alert("Es correcta");
      setPuntos(puntos + 1);
      setPreguntas(preguntas.filter((s) => s.pregunta !== e.pregunta));
    } else {
      alert("Es incorrecta");
      setPreguntas(preguntas.filter((s) => s.pregunta !== e.pregunta))
      if (puntos == 0) {
        console.log("Tiene 0 puntos");
      } else {
        setPuntos(puntos - 1);
      }
    }
  }

  return (
    <div>
      {preguntas.map((e) => (
        <div key={e.pregunta}>
          <p>{e.pregunta}</p>
          <ul>
            {e.opciones.map((a, index) => (
              <li key={index}>
                <button onClick={() => correcion(a, e)}>{a.opcion}</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ListQuestions;
