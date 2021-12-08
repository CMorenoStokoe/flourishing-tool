import React, { useEffect, useState } from "react";
import {question, questionnaire, results} from '../model/types';
// Import assets
import {labels} from '../assets/copywriting';
import bulb from '../assets/gfx/flourishing_bulb_petal.svg';
import petalOutline from '../assets/gfx/flourishing_outline_petal.svg';
import petalForPH from '../assets/gfx/flourishing_red_petal.svg';
import petalForSoH from '../assets/gfx/flourishing_yellow_petal.svg';
import petalForEH from '../assets/gfx/flourishing_orange_petal.svg';
import petalForCH from '../assets/gfx/flourishing_cyan_petal.svg';
import petalForSpH from '../assets/gfx/flourishing_navy_petal.svg';

function Label(props:{
    copy: {
        title:string;
        subtitle:string;
    };
    pos:{
        x:number;
        y:number;
    };
    color: string;
    score: number;
}):JSX.Element{
    return(
        <div 
            className='w-52 max-w-52 text-xs'
            style={{padding: `${props.pos.y}rem ${props.pos.x}rem`}}>
            <h1 className='font-medium' style={{display: 'inline'}}>
                {props.copy.title}
            </h1>
            <p className='p-1 m-1 rounded-full' style={{color:'white', background:'black', display:'inline'}}>
                {props.score.toFixed(1)}
            </p>
            <hr style={{borderColor: props.color}}/>
            <p className='font-light'>
                {props.copy.subtitle}
            </p>
        </div>
    )
}

// Compile graph of results
function Graph(props:{
    scores: results;
}){
    console.log('visualising:', props.scores);
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
    return(
        <div className='flex flex-col justify-center items-center'>
            <p>Your measure</p>
            <div className='flex flex-row justify-start items-start'>
                {
                    // Labels (left)
                }
                <div id='labels-left'>
                    <Label copy={labels.PhysicalHealth} pos={{x:1,y:0}} color='red' score={props.scores.PhysicalHealth}/>
                    <Label copy={labels.SocialHealth} pos={{x:2,y:2}} color='gold' score={props.scores.SocialHealth}/>
                    <Label copy={labels.SpiritualHealth} pos={{x:0,y:1}} color='navy' score={props.scores.SpiritualHealth}/>
                </div>
                {
                    // Petal graph
                }
                <div id='graph' className={`mx-8 w-56 h-${w.container*4} relative`}>
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
                    <img src={petalForEH} className='absolute h-auto' style={place(props.scores.EmotionalHealth, 342)}/>
                    <img src={petalForCH} className='absolute h-auto' style={place(props.scores.CognitiveHealth, 54)}/>
                    <img src={petalForSpH} className='absolute h-auto' style={place(props.scores.SpiritualHealth, 126)}/>
                    <img src={petalForSoH} className='absolute h-auto' style={place(props.scores.SocialHealth, 198)}/>
                </div>
                {
                    // Labels (right)
                }
                <div id='labels-right'>
                    <Label copy={labels.EmotionalHealth} pos={{x:0,y:3}} color='orange' score={props.scores.EmotionalHealth}/>
                    <Label copy={labels.CognitiveHealth} pos={{x:0,y:2}} color='turquoise' score={props.scores.CognitiveHealth}/>
                </div>
            </div>
        </div>
    )
}

// Compile list of answers
function Answers(props:{responses: questionnaire}){
    var compiledAnswers: JSX.Element[] = [];
    var count = 1;
    for(const [key, value] of Object.entries(props.responses)){
        if(count > 34){continue};
        compiledAnswers.push(
            <p className='m-2 p-2' key={key}>{count}) {value.text} - {value.score}</p>
        );
        count += 1;
    } 
    return(
        <div className='m-2 p-4 bg-white rounded-xl'>
            <h1 className='py-2 text-2xl'>Your answers</h1>
            <p className='text-left'>{compiledAnswers}</p>
        </div>
    )
}

export function Results(props:{
    scores: results;
    responses: questionnaire
}):JSX.Element {
    const [graph, showGraph] = useState<boolean>(true);
    const [responses, showResponses] = useState<boolean>(false);
    return(
        <div className='flex flex-col justify-center items-center'>
            <h1>Your results</h1>
            <button className='m-2 p-3 rounded-xl bg-gray-800 text-white' onClick={()=>{showGraph(!graph)}}>
                <h1>Graph (show/hide)</h1>
            </button>
            {graph ? <Graph scores={props.scores} /> : ''}
            <button className='m-2 p-3 rounded-xl bg-gray-800 text-white' onClick={()=>{showResponses(!responses)}}>
                <h1>Answers (show/hide)</h1>
            </button>
            {responses ? <Answers responses={props.responses} /> : ''}
        </div>
    )
}