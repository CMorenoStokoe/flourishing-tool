import {question} from '../model/types';
import {Instructions} from '../assets/copy';
// Assets
import flowerGIF from '../assets/gfx/petal-flower.gif';
import snapshotGIF from '../assets/gfx/petal-snapshot.gif';
import wellbeingAxesImage from '../assets/gfx/petal_axes.svg';

function Question(props:{
    question: question;
    onClick: {
        updateAnswer: Function;
    }
}):JSX.Element{
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
    showInstructions: boolean;
    onClick: {
        dismissInstructions: Function;
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

    if(props.showInstructions){
        return(
            <div className='p-2 m-2 flex flex-col items-center justify-center'>
                <img src={snapshotGIF}/>
                <h1 className='p-2 max-w-md text-xl text-center'>This measure will give you a snapshot of your wellbeing at this moment in time.</h1>
                <p className='p-2 max-w-md text-left'>You will be able to identify areas for growth in your physical, social, emotional, cognitive and spiritual wellbeing</p>
                <img src={wellbeingAxesImage} className='p-2 max-w-md'/>
                <div className='m-2 p-2 flex flex-row items-center'>
                    <img src={flowerGIF}/>
                    <h1 className='max-w-sm text-left'>Be honest with yourself, the aim is not to make you feel bad or guilty, but to better understand yourself and see where you can introduce healthy habits in your life!</h1>
                </div>
                <button className='m-2 p-3 rounded-xl bg-green-600 text-white' onClick={()=>{props.onClick.dismissInstructions()}}>
                    <h1>Start</h1>
                </button>
            </div>
        )
    } else if(props.progress<100){
        return(
            <div>
                {renderQuestions()}
                <button className='m-2 p-3 rounded-xl bg-gray-800 text-white' onClick={validateFormAndContinue}>
                    <h1>{props.questions.length < 5 ? 'Finish' : 'Continue'}</h1>
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