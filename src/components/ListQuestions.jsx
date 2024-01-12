import { examen } from "../examen";
import RandomQuestions from "./RandomQuestions";
import React, { useEffect, useState } from "react";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ListQuestions() {
  const [preguntas, setPreguntas] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [preguntaRespondida, setPreguntaRespondida] = useState([]);
  const [eleccion, setEleccion] = useState([]);
  const [estadoBoton, setEstadoBoton] = useState(false);

  useEffect(() => {
    setPreguntas(obtenerPreguntasAleatorias(examen, 1));
  }, []);

  const obtenerPreguntasAleatorias = (elExamen, cantidad) => {
    const numberHistory = [];
    const preguntasAleatorias = [];

    for (let j = 0; j < cantidad; j++) {
      const randomIndex = random(0, elExamen.length - 6);
      const pregunta = elExamen[randomIndex];

      if (!numberHistory.includes(randomIndex)) {
        numberHistory.push(randomIndex);
        preguntasAleatorias.push(pregunta);
      } else {
        j--;
      }
    }

    return preguntasAleatorias;
  };

  function correcion(a, e) {
    if (a.isCorrect == true) {
      alert("Es correcta");
      setPuntos(puntos + 1);
      setPreguntas(preguntas.filter((s) => s.pregunta !== e.pregunta));
      setPreguntaRespondida([...preguntaRespondida, e]);
      setEleccion([...eleccion]);
      const real_response = e.opciones.find((e) => e.isCorrect == true);
      almacenarRespuestaUsuario_RespueReal(
        a.id,
        e.pregunta,
        a.opcion,
        real_response
      );
      console.log(real_response);

      console.log(eleccion);
    } else {
      alert("Es incorrecta");
      setPreguntas(preguntas.filter((s) => s.pregunta !== e.pregunta));
      setPreguntaRespondida([...preguntaRespondida, e]);
      const real_response = e.opciones.find((e) => e.isCorrect == true);
      almacenarRespuestaUsuario_RespueReal(
        a.id,
        e.pregunta,
        a.opcion,
        real_response
      );
    }
  }

  const almacenarRespuestaUsuario_RespueReal = (
    elvalor,
    pregunta,
    respuesta,
    real_response
  ) => {
    setEleccion([
      ...eleccion,
      {
        pregunta: pregunta,
        id: elvalor,
        respuesta: respuesta,
        respuestaReal: real_response.opcion,
      },
    ]);
  };

  const eventHandler = () => {
    setEstadoBoton(true);
  };

  const mostrarResultado = () => {
    if (preguntas.length == 0) {
      return (
        <div>
          Haz finalizado el cuestionaro , tu puntuacion es de {puntos} punto/s
          de 35
          <button onClick={() => eventHandler()}>Ver correción</button>
          {estadoBoton && (
            <div>
              {preguntaRespondida.map((e) => (
                <div key={e.pregunta}>
                  <p>{e.pregunta}</p>
                  <ul>
                    {e.opciones.map((a, index) => (
                      <li key={index}>
                        <button>{a.opcion}</button>
                      </li>
                    ))}
                  </ul>
                  <table>
                    <thead>
                      <tr>
                        <th>Correción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {eleccion.map((f) => (
                          <td key={f.id}>Correcta : {f.respuestaReal}</td>
                        ))}
                      </tr>
                      <tr>
                        {eleccion.map((f) => (
                          <td key={f.respuesta}>Selección : {f.respuesta}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <RandomQuestions correcion={correcion} preguntas={preguntas} />

      {mostrarResultado()}
    </div>
  );
}

export default ListQuestions;
