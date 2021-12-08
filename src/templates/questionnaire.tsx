import { questions } from '../assets/questionnaire';
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
    progress: number; // Progress through total questionnaire
    onClick: {
        continue: Function;
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
        props.onClick.continue(Object.entries(answersThisPage))
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
            <div>
                [Progress: {(props.progress*100).toFixed(0)}]
                {renderedQuestions}
            </div>
        )
    };
    return(
        <div>
            {renderQuestions()}
            <button className='m-2 p-3 rounded-xl bg-gray-800 text-white' onClick={validateFormAndContinue}>
                <h1>{props.questions.length < 5 ? 'Finish measure' : 'Continue'}</h1>
            </button>
        </div>
    )
}