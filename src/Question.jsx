export default function Question(props){
  if(props) {

    const buttonsEls = props.answers.map((answer, index) => {
      return answer.isRight ?
        <button key={index} className='answer selected'>{answer.answer}</button> :
        <button key={index} className='answer'>{answer.answer}</button>
    })

    return (<>
        <p className='question'>{props.question}</p>
        <div className='answers'>
        {buttonsEls}
        </div>
        <hr></hr>
    </>)
  } else {
    return null
  }
}