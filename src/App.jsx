import { useState, useEffect } from 'react'
import arrayShuffle from 'array-shuffle'
import { nanoid } from 'nanoid'
import './App.css'
import Question from './Question'

function App() {
  const [initialScreen, setInitialScreen] = useState(true)
  const [score, setScore] = useState(false)
  const [questions, setQuestions] = useState([])

  const checkAnswers = () => setScore(true)

  useEffect(() => {
    async function getQuestions(){
      const res = await fetch('https://opentdb.com/api.php?amount=5')
      const data = await res.json()

      setQuestions(data.results)
    }

    !initialScreen && !score ? getQuestions() : null
  }, [initialScreen, score])

  const newGame = () => {
    setInitialScreen(false)
    setScore(false)
    setQuestions([])
  }

  const initialScreenContent = <>
    <h1>Quizzical</h1>
    <p>A game for all of us</p>
    <button onClick={newGame}>Start quiz</button>
  </>

  const scoreSection = () => {
    const ongoing = (
      <button onClick={checkAnswers} className='check'>
        Check answers
      </button>
    )

    const finished = (<>
        <p>You scored 3/5 correct answers</p>
        <button onClick={newGame} className='check'>
          Play again
        </button>
    </>)
    // if game is ongoing or has finished
    return !initialScreen && !score ?
      ongoing : !initialScreen && score ?
      finished : null
  }

  const questionsEls = questions.map(question => {
    const id = nanoid()
    
    let answers = question.incorrect_answers.map(answer => ({
      answer,
      isRight: false
    }))

    answers.push({
      answer: question.correct_answer,
      isRight: true
    })

    answers = arrayShuffle(answers)

    return (
      <Question 
        key={id}
        id={id}
        question={question.question}
        answers={answers}
      />
    )
  })

  return (
    <main className={initialScreen ? 'initial' : 'game'}>
      {initialScreen ? initialScreenContent : 
      <>
        <section className='qs-and-as'>
          {questionsEls}
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
