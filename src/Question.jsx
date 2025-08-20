export default function Question(props){
  const buttonsEls = props.answers.map((answer, index) => {
    let classes = 'answer '

    if (!props.score){
      // if game is ongoing and answer is selected
      if (answer.isSelected) classes += "selected"

    } else if (props.score){
      // if game is finished, answer is right and selected
      if (answer.isRight){ 
        classes += 'right'
      } else {
        if (answer.isSelected) classes += 'wrong'
        if (!answer.isSelected) classes += 'disabled'
      }
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