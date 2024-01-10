import React from "react";

function RandomQuestions({correcion, preguntas}) {
  return (
    <div>
      {" "}
      {preguntas.length > 0 && (
        <div key={preguntas[0].pregunta}>
          <p>{preguntas[0].pregunta}</p>
          <ul>
            {preguntas[0].opciones.map((a, index) => (
              <li key={index}>
                <button onClick={() => correcion(a, preguntas[0])}>
                  {a.opcion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RandomQuestions;
