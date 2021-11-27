import React, { useEffect, useState } from "react";
import './App.css';
// Types
import {question, questionnaire} from './model/types';
// Assets
import {questions} from './assets/questionnaire';
// Views
import {Splash} from './templates/splash';
import {Questionnaire} from './templates/questionnaire';
import {Results} from './templates/results';
//import logo from './logo.svg';

const App: React.FC = () => {
  const [view, setView] = useState<'splash' | 'questionnaire' | 'results' >('splash');
  const [recordedAnswers, recordAnswers] = useState<questionnaire>(questions);

  const remainingQuestions = (): question[] => {
    // Get array of unanswered questions
    var unansweredQuestions: question[] = [];
    for(const [key, value] of Object.entries(recordedAnswers)){
      if(value.score===0){
        unansweredQuestions.push(value);
      }
    }
    return(unansweredQuestions);
  }

  const sample = (unansweredQuestions: question[]): question[] => {
    // Shuffle array and return upto 5 random objects
    const shuffled = unansweredQuestions.sort(() => 0.5 - Math.random());
    const n = Math.min(unansweredQuestions.length, 5);
    return(shuffled.slice(0, n));
  }

  // Manage action on form continue button (continue or finish questionnaire)
  const formContinueAction = (answers: question[]) => {

    // Save answers
    var newAnswer: questionnaire = JSON.parse(JSON.stringify(recordedAnswers)); // Clone existing results
    for(const a of answers){ // Answer each question the user answered
      newAnswer[a.id] = a; 
    };
    recordAnswers(newAnswer); // Save answers

    // Continue to results once finished
    if(remainingQuestions().length === 0){
      setView('results');
    };
  }

  const content = (): JSX.Element => {
    switch(view){
      case 'splash': return(
        <Splash 
          onClick={{
            start: ()=>{setView('questionnaire')}
          }}
        />
      );
      case 'questionnaire': return(
        <Questionnaire 
          questions={sample( remainingQuestions() )}
          onClick={{
            continue: (answers:question[]) => {formContinueAction(answers)}
          }}
        />
      );
      case 'results': return(
        <Results answers={recordedAnswers}/>
      );
      default: return(<div>Error: Contact support</div>);
    }
  }

  return (
    <div className="App">
      <div className='bg-black text-white'>
        Developer console 
        <p className='text-red-400'>| Current view: {view}</p>
        <p className='text-green-400'>
          | Force view: 
          <button className='m-2' onClick={()=>{setView('splash')}}>splash</button>
          <button className='m-2' onClick={()=>{setView('questionnaire')}}>questionnaire</button>
          <button className='m-2' onClick={()=>{setView('results')}}>results</button>
        </p>
      </div>
      {content()}
    </div>
  );
}

export default App;
