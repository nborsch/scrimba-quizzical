import { useState } from 'react'
import './App.css'

function App() {
  const [initialScreen, setInitialScreen] = useState(true)
  const [score , setScore] = useState(false)

  const startGame = () => setInitialScreen(false)
  const checkAnswers = () => setScore(true)
  const newGame = () => setScore(false)

  const initialScreenContent = <>
    <h1>Quizzical</h1>
    <p>Some description if needed</p>
    <button onClick={startGame}>Start quiz</button>
  </>

  const scoreSection = () => {
    const ongoing = (
      <button onClick={checkAnswers} className='check'>
        Check answers
      </button>
    )

    const finished = (
      <>
        <p>You scored 3/5 correct answers</p>
        <button onClick={newGame} className='check'>
          Play again
        </button>
      </>
    )
    // if game is ongoing or has finished
    return !initialScreen && !score ?
      ongoing : !initialScreen && score ?
      finished : null
  }

  return (
    <main className={initialScreen ? 'initial' : 'game'}>
      {initialScreen ? initialScreenContent : 
      <>
        <section className='qs-and-as'>
          <p className='question'>How would one say goodbye in Spanish?</p>
          <div className='answers'>
            <button className='answer selected'>Adiós</button>
            <button className='answer'>Hola</button>
            <button className='answer'>Au revoir</button>
            <button className='answer'>Salir</button>
          </div>
          <hr></hr>

          <p className='question'>Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?</p>
          <div className='answers'>
            <button className='answer selected'>Adiós</button>
            <button className='answer'>Hola</button>
            <button className='answer'>Au revoir</button>
            <button className='answer'>Salir</button>
          </div>
          <hr></hr>

          <p className='question'>Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?</p>
          <div className='answers'>
            <button className='answer right'>Adiós</button>
            <button className='answer'>Hola</button>
            <button className='answer'>Au revoir</button>
            <button className='answer'>Salir</button>
          </div>
          <hr></hr>

          <p className='question'>How would one say goodbye in Spanish?</p>
          <div className='answers'>
            <button className='answer wrong'>Adiós</button>
            <button className='answer'>Hola</button>
            <button className='answer'>Au revoir</button>
            <button className='answer'>Salir</button>
          </div>
          <hr></hr>

          <p className='question'>How would one say goodbye in Spanish?</p>
          <div className='answers'>
            <button className='answer selected'>Adiós</button>
            <button className='answer'>Hola</button>
            <button className='answer'>Au revoir</button>
            <button className='answer'>Salir</button>
          </div>
          <hr></hr>     
        </section>

        <section className='status'>
          {scoreSection()}
        </section>     
      </>
      }

    </main>
  )
}

export default App
