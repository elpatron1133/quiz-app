import preguntas from "./preguntas"
import { useState, useEffect } from "react"

function App() {

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisable, setAreDisable] = useState(false);
  const [answerShown, setAnswerShown] = useState(false);

  function handleAnswerSubmit(isCorrect, e) {
    //añadir puntaje
    if (isCorrect) setPuntuacion(puntuacion + 1);
    //añadir estilos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    // cambiar a la siguiente pregunta
    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1)
      }
    }, 200)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisable(true);
    }, 1000);
    return () => clearInterval(interval);

  }, [tiempoRestante]);



  if (isFinished) {
    return (
      <main className="app">
        <div className="juego-terminado">
          <span>Obtuviste  {puntuacion}  de {preguntas.length}
          </span>
          <button onClick={() => (window.location.href = "/quiz-app")}>
            Volver a jugar
          </button>
          <button onClick={() => {
            setIsFinished(false);
            setAnswerShown(true)
            setPreguntaActual(0);
          }}>
            Ver respuestas
          </button>
        </div>

      </main>)
  }

  if (answerShown)
    return (


      <main className="app">
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span>PREGUNTA {preguntaActual + 1} de </span> {preguntas.length}
          </div>
          <div className="titulo-pregunta">
            {preguntas[preguntaActual].titulo}
          </div>
          <div>
            {preguntas[preguntaActual].opciones.filter(
              (opcion) => opcion.isCorrect
            )[0].textoRespuesta}
          </div>
          <button
            onClick={() => {
              if (preguntaActual === preguntas.length - 1) {
                window.location.href = "/quiz-app";
              } else {
                setPreguntaActual(preguntaActual + 1)
              }
            }} >
            {preguntaActual === preguntas.length - 1 ? "Volver A jugar " : "siguiente"}

          </button>
        </div>

      </main>
    );




  return (
    <main className="app">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
          <span>PREGUNTA {preguntaActual + 1} de </span> {preguntas.length}
        </div>
        <div className="titulo-pregunta">
          {preguntas[preguntaActual].titulo}
        </div>
        <div> {!areDisable ? (
          <span className="tiempo-restante">
            tiempo restante: {tiempoRestante}{" "}
          </span>
        ) : (
          <button onClick={() => {
            setTiempoRestante(10);
            setAreDisable(false);
            setPreguntaActual(preguntaActual + 1);
          }} >Continuar</button>
        )}
        </div>
      </div>




      <div className="lado-derecho">

        {preguntas[preguntaActual].opciones.map((respuesta,) => (
          <button
            disabled={areDisable}
            key={respuesta.textoRespuesta}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
          >
            {respuesta.textoRespuesta}
          </button>
        ))}

      </div>
    </main>
  );

}

export default App
