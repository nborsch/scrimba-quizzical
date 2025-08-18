export default function Question(props){
    const toggleSelectAnswer = (id) => {
    
  }



  const buttonsEls = props.answers.map((answer, index) => {
    let classes = 'answer '

    if (!props.score){
      classes ='answer'
    } else if (answer.isRight){
      classes += 'right'
    } else if (!answer.isRight){
      classes += 'wrong'
    }

    return <button 
      key={index} 
      onClick={() => toggleSelectAnswer(props.id)}
      className={classes}
    >{answer.answer}</button>
  })

  return (<>
      <p className='question'>{props.question}</p>
      <div className='answers'>
      {buttonsEls}
      </div>
      <hr></hr>
  </>)
}