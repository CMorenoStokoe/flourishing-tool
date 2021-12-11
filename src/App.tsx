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

// Import encoder
var base64 = require('base-64');

const App: React.FC = () => {
  const [view, setView] = useState<'splash' | 'questionnaire' | 'results' >('splash');
  const [recordedAnswers, recordAnswers] = useState<questionnaire>(questions);
  const [progress, setProgress] = useState<number>(0);
  const [code, setCode] = useState<string>('');

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
    // Set measure in progress
    if(progress === 0){setProgress(1)};
    
    // Shuffle array and return upto 5 random objects
    //const shuffled = unansweredQuestions.sort(() => 0.5 - Math.random());
    const n = Math.min(unansweredQuestions.length, 5);
    return(unansweredQuestions.slice(0, n));
  }

  // Manage action on form continue button (continue or finish questionnaire)
  const formContinueAction = (answers: question[]) => {

    // Save answers
    var newAnswer: questionnaire = JSON.parse(JSON.stringify(recordedAnswers)); // Clone existing results
    for(const a of answers){ // Answer each question the user answered
      newAnswer[a.id] = a; 
    };
    recordAnswers(newAnswer); // Save answers

    // Update progress
    setProgress( (Object.entries(questions).length - remainingQuestions().length) / Object.entries(questions).length * 100 );

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

  // Encode scores
  const encodeResponses = ():string => { 
    var code = '1';
    var copyOfAnswers:questionnaire = JSON.parse(JSON.stringify(recordedAnswers));
    for(const [key, value] of Object.entries(copyOfAnswers)){
      if(key !== 'undefined'){
        code += value.score.toString();
      } else {continue};
    };
    var encoded = base64.encode(Number(code));
    console.log('encoded', code, 'as', encoded);
    return encoded;
  };
  const decodeResponses = (s:string):string => { 
    var code:string = Number(base64.decode(s)).toLocaleString('fullwide', {useGrouping:false});
    console.log('decoded', s, 'as', code);
    return(code);
  };
  const codeLikelyValid = (code:string) => {
    if(code.length===35){
      console.log('Validated code:', code)
      return(true);
    } else {
      console.log('Invalid code:', code)
      return(false);
    }
  };

  const getResponsesFromCode = (decoded:string):questionnaire => {
    var count = 1; // Skip leading 1
    var newResponses:questionnaire = JSON.parse(JSON.stringify(recordedAnswers));
    for(const [key, value] of Object.entries(newResponses)){
      if(key !== 'undefined'){
        value.score = Number(decoded[count]);
        count += 1;
      } else {continue};
    };
    return(newResponses);
  }

  const loadResponses = (code:string) => {
    setCode(code);
    const decoded = decodeResponses(code);
    if(codeLikelyValid( decoded )){
      const newResponses = getResponsesFromCode(decoded);
      recordAnswers(newResponses);
      setProgress(100)
      console.log('Restored responses:', newResponses, 'to current results', recordedAnswers);
    } else {
      alert(`Error fetching results with code "${code}", please try again and contact support if the problem persists`)
    }
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
          progress={ progress }
          questions={sample( remainingQuestions() )}
          onClick={{
            continue: (answers:question[]) => {formContinueAction(answers)},
            back: ()=>{setView('results')}
          }}
        />
      );
      case 'results': return(
        <Results 
          scores={scoreResponses()}
          responses={recordedAnswers}
          code={code}
          progress={progress}
          onClick={{
            viewMeasure: ()=>{setView('questionnaire')},
            loadResults: (newCode:string)=>{loadResponses(newCode)},
            generateCode: () => {setCode( encodeResponses() )}
          }}
        />
      );
      default: return(<div>Error: Contact support</div>);
    }
  }

  // Show view
  return (
    <div className="App h-full">

      {
        // Navbar
      }
      <hr id='border-theme-top' className='border-2' style={{borderColor: '#C7D64F'}}/>
      <nav className='p-2 flex flex-row justify-between items-end bg-white text-gray-500'>
        <div id='nav-brand' className='flex flex-row justify-start items-end'>
          <img src={logo} className='m-2 h-16 w-auto'/>
          <h1 className='mx-2 p-1 text-3xl'>
            FSM Online
          </h1>
        </div>
        <div id='nav-links' className='text-sm'>
          <button className='px-2 ' onClick={()=>{setView('splash')}}>Home</button>
          <button className='px-2 border-l' style={{borderColor: '#C7D64F'}} onClick={()=>{setView('questionnaire')}}>Measure</button>
          <button className='px-2 border-l' style={{borderColor: '#C7D64F'}} onClick={()=>{setView('results')}}>Results</button>
          <a className='px-2 border-l' style={{borderColor: '#C7D64F'}} href='https://flourishingeducation.co.uk/' target='_blank'>About</a>
        </div>
      </nav>
      <div id='progress-bar' 
        className='mb-4 p-2 bg-gray-100 flex flex-row justify-center items-center' 
        style={{visibility: progress>0&&progress<100 ? 'visible' : 'hidden'}}
      >
        <h1>Measure in progress:</h1>
        <div className="m-2 h-4 w-3/4 max-w-xl rounded-xl shadow bg-gray-200">
            <div 
                className="h-full rounded-xl bg-wavy transition-all duration-1000" 
                style={{width:`${progress}%`}}
            />
        </div>
      </div>

      {
        // Current view
        content()
      }
      
    </div>
  );
}

export default App;
