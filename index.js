/* Questionnaire */
// Axis variables
var axes = {
    PhysicalHealth: null,
    CognitiveHealth: null,
    EmotionalHealth: null,
    SpiritualHealth: null,
    SocialHealth: null
} 

// Questionnaire items
const questions = [
    {
        text: 'I believe I am in good physical health',
        axis: 'PhysicalHealth',
        labels: {low: 'Disagree', high: 'Agree'},
        negativelyScored: false,
    },
    {
        text: 'I believe I am in good cognitive health',
        axis: 'CognitiveHealth',
        labels: {low: 'Disagree', high: 'Agree'},
        negativelyScored: false,
    },
    {
        text: 'I believe I am in good emotional health',
        axis: 'EmotionalHealth',
        labels: {low: 'Disagree', high: 'Agree'},
        negativelyScored: false,
    },
    {
        text: 'I believe I am in good spiritual health',
        axis: 'SpiritualHealth',
        labels: {low: 'Disagree', high: 'Agree'},
        negativelyScored: false,
    },
    {
        text: 'I believe I am in good social health',
        axis: 'SocialHealth',
        labels: {low: 'Disagree', high: 'Agree'},
        negativelyScored: false,
    }
]

/* Build graph */
const notAllQuestionsAnswered = () => {
    for(const axis of [
        axes.PhysicalHealth,
        axes.CognitiveHealth,
        axes.EmotionalHealth,
        axes.SpiritualHealth,
        axes.SocialHealth
    ]){
        if(axis===null){
            return true;
        }
    }
    return false;
}
const createGraph = () => {
    if(notAllQuestionsAnswered()){
        alert('Please answer all questions so you can continue');
        return;
    }

    /* Change screen */
    document.getElementById('questionnaire').style.display = 'none';
    
    var title = document.createElement('H1');
        title.innerHTML = 'Your results';
    var description = document.createElement('P');
        description.innerHTML = 'Some explanation and description of what your results mean';
    document.getElementById('radarChart').appendChild(title);
    document.getElementById('radarChart').appendChild(description);

    /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */
    ////////////////////////////////////////////////////////////// 
    //////////////////////// Data ////////////////////////////// 
    ////////////////////////////////////////////////////////////// 
    const data = [[
        {axis:"Physical Health",value: axes.PhysicalHealth},
        {axis:"Cognitive Health",value: axes.CognitiveHealth},
        {axis:"Emotional Health",value: axes.EmotionalHealth},
        {axis:"Spiritual Health",value: axes.SpiritualHealth},
        {axis:"Social Health",value: axes.SocialHealth}
    ]];
    
    ////////////////////////////////////////////////////////////// 
    //////////////////////// Set-Up ////////////////////////////// 
    ////////////////////////////////////////////////////////////// 

    var margin = {top: 100, right: 100, bottom: 100, left: 100},
        width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
        height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

    ////////////////////////////////////////////////////////////// 
    //////////////////// Draw the Chart ////////////////////////// 
    ////////////////////////////////////////////////////////////// 

    var color = d3.scale.ordinal()
        .range(["#EDC951","#CC333F","#00A0B0"]);

    const maxValue = Math.max(
        axes.PhysicalHealth,
        axes.CognitiveHealth,
        axes.EmotionalHealth,
        axes.SpiritualHealth,
        axes.SocialHealth
    );
    const minValue = Math.min(
        axes.PhysicalHealth,
        axes.CognitiveHealth,
        axes.EmotionalHealth,
        axes.SpiritualHealth,
        axes.SocialHealth
    );
    var radarChartOptions = {
        w: width,
        h: height,
        margin: margin,
        maxValue: maxValue<6 ? maxValue+1 : maxValue, // Take max value they provide
        levels: maxValue - minValue + 2,
        roundStrokes: true,
        color: color
    };
    //Call function to draw the Radar chart
    RadarChart(".radarChart", data, radarChartOptions);
}

/* Build controls */
createOptions(questions, 'questionnaire', axes);
var btn = document.createElement('Button');
    btn.innerHTML = 'Finish';
    btn.onclick = createGraph;
document.getElementById('questionnaire').append(btn);