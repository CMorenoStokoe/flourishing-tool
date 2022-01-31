import React, { useEffect, useState } from "react";
import './App.css';
// Types
import {question, questionnaire, results} from './model/types';
// Assets
import {questions} from './assets/questionnaire';
import logo from './assets/gfx/logo-fe.svg';
// Views
import {Splash} from './templates/splash';
import {Instructions} from './templates/instructions';
import {Questionnaire} from './templates/questionnaire';
import {Results} from './templates/results';

const App: React.FC = () => {
  const [view, setView] = useState<'splash' | 'instructions' | 'questionnaire' | 'results' >('splash');
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

    // Update progress
    setProgress( (Object.entries(questions).length - remainingQuestions().length) / Object.entries(questions).length * 100 );

    // Continue to results once finished
    if(remainingQuestions().length === 0){
      const generatedCode = encodeResponses();
      setCode(generatedCode);
      setView('results');
    };
  }

  // Calculate score
  function scoreResponses(): results{
    const calcAve = (thisAxis:question["axis"]) => {
      let n=0;
      let score=0;
      for(const [key, value] of Object.entries(recordedAnswers)){
        if(value.axis === thisAxis){
          n+=1;
          score+=value.score;
        }
      }
      return score/n;
    }
    return({
      PhysicalHealth: calcAve('PhysicalHealth'),
      CognitiveHealth: calcAve('CognitiveHealth'),
      EmotionalHealth: calcAve('EmotionalHealth'),
      SocialHealth: calcAve('SocialHealth'),
      SpiritualHealth: calcAve('SpiritualHealth')
   });
  }

  // Encode scores
  const leadingLetter = 'W';
  const encodeResponses = ():string => { 
    var codeString = leadingLetter;
    var copyOfAnswers:questionnaire = JSON.parse(JSON.stringify(recordedAnswers));
    for(const [key, value] of Object.entries(copyOfAnswers)){
      if(key !== 'undefined'){
        codeString += value.score.toString();
      } else {continue};
    };
    return codeString;
  };
  const codeLikelyValid = (codeString:string) => {
    const lengthOfQuestionnaire = Object.entries(questions).length;
    if(codeString.length!==(lengthOfQuestionnaire+1)){
      alert(`Your code "${codeString}" was not ${lengthOfQuestionnaire} digits long. Valid codes are ${lengthOfQuestionnaire} digits long and are a series of numbers (0-5) starting with the character ${leadingLetter}. Please try again and contact support if the problem persists`)
      return(false);
    }
    if(codeString[0]!==leadingLetter){
      alert(`Your code "${codeString}" did not start with ${leadingLetter}. Valid codes are 35 digits long and are a series of numbers (0-5) starting with the character ${leadingLetter}. Please try again and contact support if the problem persists`)
      return(false);
    }
    return(true)
  }
  const getResponsesFromCode = (codeString:string):questionnaire => {
    var copyOfAnswers:questionnaire = JSON.parse(JSON.stringify(recordedAnswers));
    for(let i = 1; i < codeString.length; i++){  // Skip leading character W
      copyOfAnswers[`q${i}`].score = Number(codeString[i]);
    }
    return(copyOfAnswers);
  }

  const loadResponses = (codeString:string) => {
    setCode(codeString);
    if(codeLikelyValid(codeString)){
      const newResponses = getResponsesFromCode(codeString);
      recordAnswers(newResponses);
      setProgress(100);
      console.log('Restored responses from code:', codeString, 'to current results', recordedAnswers);
    }
  }

  // Select view
  const content = (): JSX.Element => {
    switch(view){
      case 'splash': return(
        <Splash onClick={{start: ()=>{ setView('instructions') }}}/>
      );
      case 'instructions': return(
        <Instructions onClick={{start: ()=>{ setView('questionnaire') }}}/>
      )
      case 'questionnaire': return(
        <Questionnaire 
          progress={progress}
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
          }}
        />
      );
      default: return(<div>Error: Contact support</div>);
    }
  }

  // Show view
  return (
    <div className="App h-full">
      <hr id='border-theme-top' className='border-2' style={{borderColor: '#C7D64F'}}/>
      <nav className='p-2 flex flex-row justify-between items-end bg-green-100 text-green-600'>
        
        <div id='Branding' className='flex flex-row lg:justify-start items-end'>
          <img src={logo} className='m-2 h-12 md:h-16 w-auto'/>
          <h1 className='mx-2 p-1 text-lg hidden text-3xl md:flex '>
            Flourishing Online
          </h1>
        </div>

        <div id='Links' className='p-2 text-sm lg:text-right'>
          <button className='px-2 ' onClick={()=>{setView('splash')}}>Home</button>
          <button className='px-2 border-l border-green-200' onClick={()=>{setView('instructions')}}>About</button>
          <button className='px-2 border-l border-green-200' onClick={()=>{setView('questionnaire')}}>Measure</button>
          <button className='px-2 border-l border-green-200' onClick={()=>{setView('results')}}>Results</button>
        </div>
      </nav>

      <div id='Progress'
        className='mb-4 p-2 bg-gray-100 flex flex-row justify-center items-center' 
        style={{display: progress>0&&progress<100 ? 'flex' : 'none'}}
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
