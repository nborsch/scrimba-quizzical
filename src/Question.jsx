export default function Question(props){
    if(props) {
        return (<>
            <p className='question'>{props.question}</p>
            <div className='answers'>
            <button className='answer selected'>{props.rightAnswer}</button>
            <button className='answer'>{props.wrongAnswers[0]}</button>
            <button className='answer'>{props.wrongAnswers[1]}</button>
            <button className='answer'>{props.wrongAnswers[2]}</button>
            </div>
            <hr></hr>
        </>)
    } else {
        return null
    }
}