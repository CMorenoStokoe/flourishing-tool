import {question} from '../model/types';

function Question(props:{
    question: question;
    onClick: {
        updateAnswer: Function;
    }
}){
    return(
        <div className='p-2 m-2 d-flex flex-col'>
            <p>{props.question.text}</p>
            <div className='p-1 d-flex flex-row text-xs'>
                Strongly disagree
                <input className='m-1' type="radio" key={`${props.question.id}_1`} name={props.question.id} onClick={()=>{props.onClick.updateAnswer(props.question.id, 1)}}/>
                <input className='m-1' type="radio" key={`${props.question.id}_2`} name={props.question.id} onClick={()=>{props.onClick.updateAnswer(props.question.id, 2)}}/> 
                <input className='m-1' type="radio" key={`${props.question.id}_3`} name={props.question.id} onClick={()=>{props.onClick.updateAnswer(props.question.id, 3)}}/> 
                <input className='m-1' type="radio" key={`${props.question.id}_4`} name={props.question.id} onClick={()=>{props.onClick.updateAnswer(props.question.id, 4)}}/> 
                <input className='m-1' type="radio" key={`${props.question.id}_5`} name={props.question.id} onClick={()=>{props.onClick.updateAnswer(props.question.id, 5)}}/> 
                Strongly agree
            </div>
        </div>
    )
}

export function Questionnaire(props:{
    questions: question[]; // Five questions
    progress: number;
    onClick: {
        continue: Function;
        back: Function;
    }
}):JSX.Element {
    let answersThisPage: Record<string, question> = {};
    for(const q of props.questions){
        answersThisPage[q.id] = q;
    };

    const validateFormAndContinue = () => {
        for(const [key, value] of Object.entries(answersThisPage)){
            if(value.score===0){
                alert('Please answer all questions before continuing!');
                return;
            }
        };
        props.onClick.continue(Object.entries(answersThisPage));
    }

    const renderQuestions = (): JSX.Element => {
        const renderedQuestions: JSX.Element[] = [];
        for(const q of props.questions){
            renderedQuestions.push(
                <Question 
                    question={q}
                    key={q.id}
                    onClick={{
                        updateAnswer: (id:string, score:number) => {answersThisPage[id].score = score}
                    }}
                />
            );
        }
        return(
            <div className='flex flex-col items-center'> 
                {renderedQuestions}
            </div>
        )
    };

    if(props.progress<100){
        return(
            <div>
                {renderQuestions()}
                <button className='m-2 p-3 rounded-xl bg-gray-800 text-white' onClick={validateFormAndContinue}>
                    <h1>{props.questions.length < 5 ? 'Finish measure' : 'Continue'}</h1>
                </button>
            </div>
        )
    }else{
        return(
            <div className='flex flex-ow justify-center items-center'>
                <div className='p-4 m-2 max-w-lg rounded bg-white'>
                    <h1 className='m-2 text-2xl'>
                        All done! 
                    </h1>
                    <h1 className='m-2 text-lg'>
                        Click below to continue to see your results or refresh the web page to start again.
                    </h1>
                    <button className='m-2 p-3 rounded-xl bg-gray-800 text-white' 
                        onClick={()=>{props.onClick.back()}}>
                        <h1>View results</h1>
                    </button>
                </div>
            </div>
        )
    }
    
}