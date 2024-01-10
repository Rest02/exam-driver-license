import { examen } from "../examen";
import RandomQuestions from './RandomQuestions'
import React, { useEffect, useState } from "react";

function ListQuestions() {
  const [preguntas, setPreguntas] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [preguntaRespondida, setPreguntaRespondida] = useState([]);
  const [eleccion, setEleccion] = useState([]) 

  useEffect(() => {
    setPreguntas(examen);
  }, []);

  function correcion(a, e) {
    if (a.isCorrect == true) {
      alert("Es correcta");
      setPuntos(puntos + 1);
      setPreguntas(preguntas.filter((s) => s.pregunta !== e.pregunta));
      setPreguntaRespondida([...preguntaRespondida, e])
      setEleccion([...eleccion, ])
      const real_response = e.opciones.find((e) => e.isCorrect == true)
      almacenarRespuestaUsuario_RespueReal(a.id, e.pregunta, a.opcion, real_response)
      console.log(real_response)
      
      console.log(eleccion)
    } else {
      alert("Es incorrecta");
      setPreguntas(preguntas.filter((s) => s.pregunta !== e.pregunta))
      setPreguntaRespondida([...preguntaRespondida, e])
      const real_response = e.opciones.find((e) => e.isCorrect == true)
      almacenarRespuestaUsuario_RespueReal(a.id, e.pregunta, a.opcion, real_response)

    }
  }


  const almacenarRespuestaUsuario_RespueReal = (elvalor, pregunta, respuesta, real_response) => {
    setEleccion([...eleccion, {
      pregunta: pregunta,
      id: elvalor,
      respuesta : respuesta,
      respuestaReal : real_response.opcion
    }])
  }


  const mostrarResultado = () => {
    if(preguntas.length == 0){
      return <div>Haz finalizado el cuestionaro , tu puntuacion es de {puntos} punto/s de 35
      <button>Ver correción</button>
      </div>
    }
  }


  



  return (
    <div>
      <RandomQuestions correcion = {correcion} preguntas = {preguntas}/>
  
      {mostrarResultado()}
    </div>
  );
}

export default ListQuestions;
