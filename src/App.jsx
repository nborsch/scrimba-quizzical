import { useState, useEffect } from 'react'
import arrayShuffle from 'array-shuffle'
import { nanoid } from 'nanoid'
import he from 'he'
import './App.css'
import Question from './Question'

function App() {
  const [initialScreen, setInitialScreen] = useState(true)
  const [score, setScore] = useState(false)
  const [questions, setQuestions] = useState([])

  const checkAnswers = () => setScore(true)

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch('https://opentdb.com/api.php?amount=5')
      const data = await res.json()
      const newData = data.results.map((qanda) => {
        const id = nanoid()

        const answers = qanda.incorrect_answers.map((incAnswer) => {
          return {
            answer: he.decode(incAnswer),
            isRight: false,
            isSelected: false,
          }
        })
        answers.push({
          answer: he.decode(qanda.correct_answer),
          isRight: true,
          isSelected: false,
        })
        const shuffledAnswers = arrayShuffle(answers)

        return {
          question: he.decode(qanda.question),
          answers: shuffledAnswers,
          id,
        }
      })

      setQuestions(newData)
    }

    !initialScreen && !score ? getQuestions() : null
  }, [initialScreen, score])

  const newGame = () => {
    setInitialScreen(false)
    setScore(false)
    setQuestions([])
  }

  const initialScreenContent = (
    <>
      <h1>Quizzical</h1>
      <p>A game for all of us</p>
      <button onClick={newGame}>Start quiz</button>
    </>
  )

  const scoreSection = () => {
    const ongoing = (
      <button onClick={checkAnswers} className="check">
        Check answers
      </button>
    )

    const finished = (
      <>
        <p>You scored 3/5 correct answers</p>
        <button onClick={newGame} className="check">
          Play again
        </button>
      </>
    )
    // if game is ongoing or has finished
    return !initialScreen && !score
      ? ongoing
      : !initialScreen && score
      ? finished
      : null
  }

  const toggleSelectAnswer = (id, index) => {
    const newQuestions = questions.map(qAndA => {
      const qAndAId = qAndA.id
      const answers = [...qAndA.answers]

      if (qAndAId !== id) return qAndA
      // reset all answers isSelected
      const resetAnswers = answers.map(answer => ({...answer, isSelected: false}))

      // flip answers[index].isSelected for this qAndA
      resetAnswers[index].isSelected = !resetAnswers[index].isSelected

      return {
        ...qAndA,
        answers: resetAnswers
      }
    })
    setQuestions(newQuestions)
  }

  const questionsEls =
    questions &&
    questions.map((qanda) => {
      return (
        <Question
          key={qanda.id}
          id={qanda.id}
          question={qanda.question}
          answers={qanda.answers}
          score={score}
          isSelected={qanda.isSelected}
          onClick={toggleSelectAnswer}
        />
      )
    })

  return (
    <main className={initialScreen ? 'initial' : 'game'}>
      {initialScreen ? (
        initialScreenContent
      ) : (
        <>
          <section className="qs-and-as">{questionsEls}</section>

          <section className="status">{scoreSection()}</section>
        </>
      )}
    </main>
  )
}

export default App
