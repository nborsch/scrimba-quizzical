export default function Question(props){
  const buttonsEls = props.answers.map((answer, index) => {
    let classes = 'answer '

    if (!props.score && !answer.isSelected){
      classes ='answer '
    } else if (!props.score && answer.isSelected) {
      classes += 'selected'
    } else if (answer.isRight){
      classes += 'right'
    } else if (!answer.isRight){
      classes += 'wrong'
    }

    return <button 
      key={index} 
      onClick={() => props.onClick(props.id, index)}
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