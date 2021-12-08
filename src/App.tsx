import React, { useEffect, useState } from "react";
import './App.css';
// Types
import {question, questionnaire, results} from './model/types';
// Assets
import {questions} from './assets/questionnaire';
import logo from './assets/gfx/logo-fe.svg';
// Views
import {Splash} from './templates/splash';
import {Questionnaire} from './templates/questionnaire';
import {Results} from './templates/results';

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

  // Calculate score
  function scoreResponses(): results{
    const totals = {
        PhysicalHealth: 0,
        CognitiveHealth: 0,
        EmotionalHealth :0,
        SocialHealth: 0,
        SpiritualHealth: 0
    }
    for(const [key, value] of Object.entries(recordedAnswers)){
        totals[value.axis] += value.score;
    }
    return ({
      PhysicalHealth: totals.PhysicalHealth / 9 ,
      CognitiveHealth: totals.CognitiveHealth / 6,
      EmotionalHealth: totals.EmotionalHealth / 4,
      SpiritualHealth: totals.SpiritualHealth / 9,
      SocialHealth: totals.SocialHealth / 6
    })
  }

  // Select view
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
          progress={1 - remainingQuestions().length / Object.entries(questions).length}
          onClick={{
            continue: (answers:question[]) => {formContinueAction(answers)}
          }}
        />
      );
      case 'results': return(
        <Results 
          scores={scoreResponses()}
          responses={recordedAnswers}
        />
      );
      default: return(<div>Error: Contact support</div>);
    }
  }

  // Show view
  return (
    <div className="App h-full">
      <hr className='border-2' style={{borderColor: '#C7D64F'}}/>
      <nav className='p-2 flex flex-row justify-between items-end bg-white text-gray-500'>
        <img src={logo} className='m-2 h-16 w-auto'/>
        <h1 className='text-xl'>FSM Online</h1>
        <div className='text-sm'>
          <button className='px-2 ' onClick={()=>{setView('questionnaire')}}>Start measure</button>
          <a className='px-2 border-l' style={{borderColor: '#C7D64F'}} href='https://flourishingeducation.co.uk/'>About</a>
        </div>
      </nav>
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
