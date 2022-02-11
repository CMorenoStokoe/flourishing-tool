import {question} from '../model/types';
import { ThemeButton } from './components';

function Question(props:{
    question: question;
    n: number;
    onClick: {
        updateAnswer: Function;
    }
}):JSX.Element{
    return(
        <div className='p-2 m-2 d-flex flex-col'>
            <p className='animate__animated animate__flipInX'  style={{animationDelay: `${props.n/4}s`}}>
                {props.question.text}
            </p>
            <div className='p-1 d-flex flex-row text-xs text-gray-500 animate__animated animate__fadeIn' style={{animationDelay: `${props.n/4+0.1}s`}}>
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
}):JSX.Element{
    // Set answers
    let answersThisPage: Record<string, question> = {};
    for(const q of props.questions){
        answersThisPage[q.id] = q;
    };

    // Validate answers
    const validateFormAndContinue = () => {
        for(const [key, value] of Object.entries(answersThisPage)){
            if(value.score===0){
                alert('Please answer all questions before continuing!');
                return;
            }
        };
        props.onClick.continue(Object.entries(answersThisPage));
    }

    // Render questions on page
    const renderQuestions = (): JSX.Element => {
        const renderedQuestions: JSX.Element[] = [];
        var count = 0;
        for(const q of props.questions){
            renderedQuestions.push(
                <Question 
                    n={count}
                    question={q}
                    key={q.id}
                    onClick={{
                        updateAnswer: (id:string, score:number) => {answersThisPage[id].score = score}
                    }}
                />
            );
            count +=1;
        }
        return(
            <div className='flex flex-col items-center'>
                <div className='p-4 rounded shadow bg-white'> 
                    {renderedQuestions}
                </div>
            </div>
        )
    };

    if(props.progress<100){
        return(
            <div>
                {renderQuestions()}
                <ThemeButton 
                    value={props.questions.length < 5 ? 'Finish' : 'Continue'}
                    animateAfter='1s'
                    onClick={validateFormAndContinue}
                />
            </div>
        )
    }else{
        return(
            <div className='h-3/4 flex flex-col justify-center items-center'>
                <div className='p-4 m-2 max-w-lg rounded bg-spring-400 text-white'>
                    <h1 className='m-2 text-2xl'>
                        All done! 
                    </h1>
                    <h1 className='m-2 text-lg'>
                        Click below to continue to see your results or refresh the web page to start again.
                    </h1>
                    <ThemeButton value='View results' onClick={()=>{props.onClick.back()}}/>
                </div>
            </div>
        )
    }
    
}