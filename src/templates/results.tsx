import React, { useEffect, useState } from "react";
import {question, questionnaire, results} from '../model/types';
import {questions} from '../assets/questionnaire';
// Import assets
import {labels, graphLabel} from '../assets/labels';
import petalLogo from '../assets/gfx/logo-petal.svg'
import bulb from '../assets/gfx/flourishing_bulb_petal.svg';
import petalOutline from '../assets/gfx/flourishing_outline_petal.svg';
import petalForPH from '../assets/gfx/flourishing_red_petal.svg';
import petalForSoH from '../assets/gfx/flourishing_yellow_petal.svg';
import petalForEH from '../assets/gfx/flourishing_orange_petal.svg';
import petalForCH from '../assets/gfx/flourishing_cyan_petal.svg';
import petalForSpH from '../assets/gfx/flourishing_navy_petal.svg';
import s1 from '../assets/gfx/petal_s1.svg';
import s2 from '../assets/gfx/petal_s2.svg';
import s3 from '../assets/gfx/petal_s3.svg';
import s4 from '../assets/gfx/petal_s4.svg';
import s5 from '../assets/gfx/petal_s5.svg';

function ToggleAnswersButton(props:{
    onClick: Function;
}):JSX.Element{
    const [pressed, setPressed] = useState<boolean>(false);
    return(
        <button 
            className={`
                m-2 p-3 rounded-xl bg-gray-800 text-white justify-self-end transition-all duration-500
                ${pressed ? "bg-red-600" : "bg-gray-800"}
            ` }
            onClick={()=>{
                props.onClick();
                setPressed(!pressed);
            }}>
            <h1>{pressed ? 'Hide' : 'Show'}</h1>
        </button>
    )
}

function Label(props:{
    label: graphLabel;
    pos:{
        x:number;
        y:number;
    };
    score: number;
}):JSX.Element{
    return(
        <div className={`p-2 xl:py-${props.pos.y*4} xl:px-${props.pos.y*4} w-52 max-w-52 text-xs`}>
            <h1 className='font-medium' style={{display: 'inline'}}>
                {props.label.title}
            </h1>
            <p className='p-1 m-1 rounded-full' style={{color:'white', background: props.label.color, display:'inline'}}>
                {props.score.toFixed(1)}
            </p>
            <hr style={{borderColor: props.label.color}}/>
            <p className='font-light'>
                {props.label.subtitle}
            </p>
        </div>
    )
}

// Compile graph of results
function Graph(props:{
    scores: results;
}){
    // Base widths (w) and areas (a)
    const w = {container: 14, bulb: 6, petal: 2.5};
    const a = {bulb: Math.PI * w.bulb ^ 2, petal: Math.PI * w.petal ^ 2};
    const scaleFactor = 1; // How much to scale petal areas by (e.g., scaleFactor * score * a.petal = area)
    // Geometric calculations
    const centerBulb  = ():number => { // Find center of canvas
        return (w.container / 2) - (w.bulb / 2); 
    };
    const scalePetal = (score: number):{r:number, d:number, a:number} => {
        const scaledArea = a.petal * scaleFactor * score;
        const scaledRadius = Math.sqrt( scaledArea / Math.PI );
        return ({
            r: scaledRadius,
            d: scaledRadius * 2,
            a: scaledArea
        })
    }
    const pointOnCirc = (o:{c: number, r: number, rad:number}) => {
        return({
            x: o.c + o.r * Math.cos(o.rad), // Adjust centre
            y: o.c + o.r * Math.sin(o.rad)
        })
    }
    // Draw graph elements
    const place = (score:number, angle:number):{width: string, top: string, left: string, transform: string} => {
        const petal = scalePetal(score);
        const offset:{x:number, y:number} = {x: 0, y: 0};
        var coords = pointOnCirc({c:w.container/2,  r: (w.bulb/2) + (petal.r*.5), rad:angle*Math.PI/180});
            coords.x += offset.x;
            coords.y += offset.y;
        return({ // Position on canvas
            width: `${petal.d}rem`,
            left: `${coords.x}rem`,
            top: `${coords.y}rem`,
            transform: `translate(-50%, -50%) rotate(${angle-270}deg)`
        })
    }
    const write = (score:number, angle:number):{top: string, left: string, transform: string, color: string, background: string} => {
        const petal = scalePetal(score);
        const offset:{x:number, y:number} = {x: 0, y: 0};
        var coords = pointOnCirc({c:w.container/2,  r: (w.bulb/2) + (petal.r*.5), rad:angle*Math.PI/180});
            coords.x += offset.x;
            coords.y += offset.y;
        return({ // Position on canvas
            left: `${coords.x}rem`,
            top: `${coords.y}rem`,
            transform: `translate(-50%, -50%)`,
            color: 'white',
            background: 'none'
        })
    }
    return(
        <div className='flex flex-col xl:flex-row justify-center items-center'>
            {
                // Labels (left)
            }
            <div id='labels-left'>
                <Label label={labels.PhysicalHealth} pos={{x:1,y:0}} score={props.scores.PhysicalHealth}/>
                <Label label={labels.SocialHealth} pos={{x:2,y:2}} score={props.scores.SocialHealth}/>
                <Label label={labels.SpiritualHealth} pos={{x:0,y:1}} score={props.scores.SpiritualHealth}/>
            </div>
            {
                // Petal graph
            }
            <div id='graph' className={`mx-8 w-56 relative`} style={{height:'14rem'}}>
                {
                    // Central bulb
                }
                <img src={bulb} className='absolute h-auto z-10' style={{width: `${w.bulb}rem`, top:`${centerBulb()}rem`, left:`${centerBulb()}rem`}}/>
                {
                    // Petal outlines
                }
                <img src={petalOutline} className='absolute h-auto' style={place(5, 270)}/>
                <img src={petalOutline} className='absolute h-auto' style={place(5, 342)}/>
                <img src={petalOutline} className='absolute h-auto' style={place(5, 54)}/>
                <img src={petalOutline} className='absolute h-auto' style={place(5, 126)}/>
                <img src={petalOutline} className='absolute h-auto' style={place(5, 198)}/>
                {
                    // Petals showing score
                }
                <img src={petalForPH} className='absolute h-auto' style={place(props.scores.PhysicalHealth, 270)}/>
                <h1 className='p-1 absolute rounded-full' style={write(props.scores.PhysicalHealth, 270)}>{props.scores.PhysicalHealth.toFixed(1)}</h1>
                <img src={petalForEH} className='absolute h-auto' style={place(props.scores.EmotionalHealth, 342)}/>
                <h1 className='p-1 absolute rounded-full' style={write(props.scores.EmotionalHealth, 342)}>{props.scores.EmotionalHealth.toFixed(1)}</h1>
                <img src={petalForCH} className='absolute h-auto' style={place(props.scores.CognitiveHealth, 54)}/>
                <h1 className='p-1 absolute rounded-full' style={write(props.scores.CognitiveHealth, 54)}>{props.scores.CognitiveHealth.toFixed(1)}</h1>
                <img src={petalForSpH} className='absolute h-auto' style={place(props.scores.SpiritualHealth, 126)}/>
                <h1 className='p-1 absolute rounded-full' style={write(props.scores.SpiritualHealth, 126)}>{props.scores.SpiritualHealth.toFixed(1)}</h1>
                <img src={petalForSoH} className='absolute h-auto' style={place(props.scores.SocialHealth, 198)}/>
                <h1 className='p-1 absolute rounded-full' style={write(props.scores.SocialHealth, 198)}>{props.scores.SocialHealth.toFixed(1)}</h1>
            </div>
            {
                // Labels (right)
            }
            <div id='labels-right'>
                <Label label={labels.EmotionalHealth} pos={{x:0,y:2}} score={props.scores.EmotionalHealth}/>
                <Label label={labels.CognitiveHealth} pos={{x:0,y:1}} score={props.scores.CognitiveHealth}/>
            </div>
        </div>
    )
}

// Compile list of answers
function Answers(props:{responses: questionnaire; scores: results;}){
    var answers: Record<string, JSX.Element[]> = {
        PhysicalHealth: [],
        EmotionalHealth: [],
        CognitiveHealth: [],
        SpiritualHealth: [],
        SocialHealth: []
    };
    var count = 1;
    const scoreIcons = ['',s1,s2,s3,s4,s5];
    for(const [key, value] of Object.entries(props.responses)){
        console.log(value.score);
        if(count > Object.entries(questions).length){
            continue
        } else {
            answers[value.axis].push(
                <tr key={key} className='m-2 p-2'>
                    <td key={`${key}_id`} className='p-2 w-4'>{count}.</td>
                    <td key={`${key}_score`} 
                        className={`p-2 w-8 rounded-l-full  ${value.score<3 ? 'bg-gray-100' : ''}`}>
                        <img src={scoreIcons[value.score]} className='w-8 h-8'/>
                    </td>
                    <td key={`${key}_text`} 
                        className={`p-2 text-gray-800 rounded-r-full ${value.score<3 ? 'bg-gray-100' : ''}`}
                        style={{whiteSpace: 'normal'}}
                    >
                            {value.text}
                    </td>
                </tr>
            );
        }
        count += 1;
    } 
    return(
        <div key={'t_responses'} className='m-2 p-2 text-left'>

            <h1 id='PhysicalQs' className='p-2 text-lg text-white rounded' style={{background: labels.PhysicalHealth.color}}>
                Physical Health
                <span className='p-1 m-1 rounded-full' style={{color:'white', background:'black', display:'inline'}}>
                    {props.scores.PhysicalHealth.toFixed(1)}
                </span>
            </h1>
            <table className='m-2 p-4 w-full'><tbody>{answers.PhysicalHealth}</tbody></table>
            
            <h1 id='CognitiveQs' className='p-2 text-lg text-white rounded' style={{background: labels.CognitiveHealth.color}}>
                Cognitive Health
                <span className='p-1 m-1 rounded-full' style={{color:'white', background:'black', display:'inline'}}>
                    {props.scores.CognitiveHealth.toFixed(1)}
                </span>    
            </h1>
            <table className='m-2 p-4 w-full'><tbody>{answers.CognitiveHealth}</tbody></table>

            <h1 id='EmotionalQs' className='p-2 text-lg text-white rounded' style={{background: labels.EmotionalHealth.color}}>
                Emotional Health
                <span className='p-1 m-1 rounded-full' style={{color:'white', background:'black', display:'inline'}}>
                    {props.scores.EmotionalHealth.toFixed(1)}
                </span>
            </h1>
            <table className='m-2 p-4 w-full'><tbody>{answers.EmotionalHealth}</tbody></table>
            
            <h1 id='SocialQs' className='p-2 text-lg text-white rounded' style={{background: labels.SocialHealth.color}}>
                Social Health
                <span className='p-1 m-1 rounded-full' style={{color:'white', background:'black', display:'inline'}}>
                    {props.scores.SocialHealth.toFixed(1)}
                </span>
            </h1>
            <table className='m-2 p-4 w-full'><tbody>{answers.SocialHealth}</tbody></table>

            <h1 id='SpiritualQs' className='p-2 text-lg text-white rounded' style={{background: labels.SpiritualHealth.color}}>
                Spiritual Health
                <span className='p-1 m-1 rounded-full' style={{color:'white', background:'black', display:'inline'}}>
                    {props.scores.SpiritualHealth.toFixed(1)}
                </span>
            </h1>
            <table className='m-2 p-4 w-full'><tbody>{answers.SpiritualHealth}</tbody></table>
            
        </div>
    )
}

export function Results(props:{
    scores: results;
    responses: questionnaire;
    progress: number;
    code: string;
    onClick: {
        viewMeasure: Function;
        loadResults: Function;
        generateCode: Function;
    }
}):JSX.Element {
    const [graph, showGraph] = useState<boolean>(true);
    const [responses, showResponses] = useState<boolean>(false);
    const [newCode, setNewCode] = useState<string>('');

    // Show results
    if(props.progress<=1){ // If measure not finished
        return(
            <div className='flex flex-col justify-center items-center'>
                <div className='m-2 p-8 rounded bg-white shadow-xl'>
                    <h1 className='p-2 text-3xl text-gray-500'>
                        Your results will be shown here!
                    </h1>
                    <button className='m-4 p-3 rounded-xl bg-green-600 text-white' onClick={()=>{props.onClick.viewMeasure()}}>
                        <img src={petalLogo} className='mr-2 w-8 h-auto' style={{display: 'inline'}}/>
                        Take your measure now
                    </button>
                    <h1 className='text-2xl font-medium'>OR</h1>
                    <p>Enter a code to load previous results:</p>
                    <input id='codeInput' className='m-2 p-2 rounded border' type="text" name="code"
                        value = {newCode}
                        onChange={(e) => {setNewCode(e.target.value)}}
                    />
                    <button className='m-2 p-2 rounded bg-gray-600 text-white' 
                        onClick={()=>{props.onClick.loadResults(newCode)}}>
                        Load responses
                    </button>
                </div>
            </div>
        )
    } else { // If measure finished
        return(
            <div className='w-full flex flex-col justify-center items-center'>                
                {
                    // Save code
                }
                <div className='m-2 bg-white text-sm rounded-xl self-end flex flex-row justify-center align-center'>
                    <button  className='p-2 rounded-xl bg-yellow-500 text-white' 
                        onClick={()=>{props.onClick.generateCode()}}>
                        Save code
                    </button>
                    <p className='p-2'>{props.code}</p>
                </div>

                {
                    // Graph
                }    
                <h1 className='p-4 text-3xl'>Your results</h1>
                {graph ? <Graph scores={props.scores} /> : ''}

                {
                    // Answers
                }
                <div id='answers' className='m-2 p-4 bg-white rounded-xl'>
                    <div className='p-2 flex flex-row justify-between items-center'>
                        <h1 className='px-2 text-2xl'>Your answers</h1>
                        <ToggleAnswersButton onClick={()=>{showResponses(!responses)}}/>
                    </div>
                    {responses ? <Answers responses={props.responses} scores={props.scores} /> : ''}
                </div>
            </div>
        )
    }
}