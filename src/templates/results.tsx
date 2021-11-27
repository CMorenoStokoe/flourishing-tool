import {question, questionnaire} from '../model/types';
import React, { useEffect, useState } from "react";
import { ImportsNotUsedAsValues } from 'typescript';

// Analyse results
function analyseResults(answers: questionnaire){
    const totals = {
        PhysicalHealth: 0,
        CognitiveHealth: 0,
        EmotionalHealth :0,
        SocialHealth: 0,
        SpiritualHealth: 0
    }
    for(const [key, value] of Object.entries(answers)){
        totals[value.axis] += value.score;
    }
    const results = {
        PhysicalHealth: totals.PhysicalHealth / 9 / 5,
        CognitiveHealth: totals.CognitiveHealth / 6 / 5,
        EmotionalHealth: totals.EmotionalHealth / 4 / 5,
        SpiritualHealth: totals.SpiritualHealth / 9 / 5,
        SocialHealth: totals.SocialHealth / 6 / 5
    }
    return results
}

// Compile graph of results
function Graph(props:{answers: questionnaire}){
    return(
        <div>
            {analyseResults(props.answers)}
            [scale petals * results]
        </div>
    )
}

// Compile list of answers
function Answers(props:{answers: questionnaire}){
    var compiledAnswers: JSX.Element[] = [];
    for(const [key, value] of Object.entries(props.answers)){
        compiledAnswers.push(
            <p key={key}>{key}: {value.text} - {value.score}</p>
        )
    } 
    return(
        <div>
            {compiledAnswers}
        </div>
    )
}

export function Results(props:{
    answers: questionnaire;
}):JSX.Element {
    const [graph, showGraph] = useState<boolean>(true);
    const [responses, showResponses] = useState<boolean>(false);
    return(
        <div>
            <h1>results</h1>
            {graph ? <Graph answers={props.answers} /> : ''}
            <button onClick={()=>{showGraph(!graph)}}>Graph (show/hide)</button>
            {responses ? <Answers answers={props.answers} /> : ''}
            <button onClick={()=>{showResponses(!responses)}}>Answers (show/hide)</button>
        </div>
    )
}