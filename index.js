/* Variables */
var stage = 0;

// Questionnaire items
// copy questions is in ./questionnaire.js
var answers = questions;
var answeredQuestions = [];

/* Build graph */
const createGraph = () => {
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
    const totals = {
        PhysicalHealth: 0,
        CognitiveHealth: 0,
        EmotionalHealth: 0,
        SpiritualHealth: 0,
        SocialHealth: 0
    }
    for(const a of Object.values(answers)){
        totals[a.axis] += a.score;
    }
    const data = [[
        {axis:"Physical Health",value: totals.PhysicalHealth / 9 / 5},
        {axis:"Cognitive Health",value: totals.CognitiveHealth / 6 / 5},
        {axis:"Emotional Health",value: totals.EmotionalHealth / 4 / 5},
        {axis:"Spiritual Health",value: totals.SpiritualHealth / 9 / 5},
        {axis:"Social Health",value: totals.SocialHealth / 6 / 5}
    ]];
    console.log(data)
    
    ////////////////////////////////////////////////////////////// 
    //////////////////////// Set-Up ////////////////////////////// 
    ////////////////////////////////////////////////////////////// 

    var margin = {top: 100, right: 100, bottom: 100, left: 100},
        width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
        height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

    ////////////////////////////////////////////////////////////// 
    //////////////////// Draw the Chart ////////////////////////// 
    ////////////////////////////////////////////////////////////// 

    // Set colors
    var color = d3.scale.ordinal()
        .range(["#EDC951","#CC333F","#00A0B0"]);

    // Get min max
    const maxValue = Math.max(...data[0].map(x => x.value));
    const minValue = Math.min(...data[0].map(x => x.value));

    // Chart options
    console.log(Math.ceil(maxValue - minValue) * 5)
    
    var radarChartOptions = {
        w: width,
        h: height,
        margin: margin,
        maxValue: maxValue, // Take max value they provide
        levels: Math.ceil(maxValue - minValue) * 5,
        roundStrokes: true,
        color: color
    };
    // Call function to draw the Radar chart
    RadarChart(".radarChart", data, radarChartOptions);
}
const progress = () => {
    if ($('input:checked').length != $('.q').length) {
        alert('Please answer all questions so you can continue');
        return;
    };
    
    // Record and remove answers
    answeredQuestions.push($('#questionnaire #questionBlock')); // Move answered questions to answers div
    document.getElementById('questionnaire').innerHTML = ''; // Clear answered Qs
    
    // Progress stage
    stage ++;

    // Progress bar
    $('#progressBar')
        .css('width', `${100/6*stage}%`)
        .attr('aria-valuenow', 100/6*stage);

    // Switch
    switch(stage){
        case 1: 
            createOptions(Object.values(questions).slice(0,6), answers); 
            break;
        case 2: createOptions(Object.values(questions).slice(6,13), answers); break;
        case 3: createOptions(Object.values(questions).slice(13,20), answers); break;
        case 4: createOptions(Object.values(questions).slice(20,28), answers); break;
        case 5: createOptions(Object.values(questions).slice(28,34), answers); break;
        default:
            createGraph(); 
            $('#progressBar-div').hide();
            $('#continue-btn').hide();
            var btn = document.createElement('Button');
                btn.innerHTML = 'Show answers';
                btn.onclick = () => {
                    for(const q of answeredQuestions){
                        $('#answers').append(q);
                    };
                    $(btn).hide();
                };
                btn.className = 'btn btn-warning m-2';
                btn.id = 'continue-btn';
            document.getElementById('btn-div').append(btn);
            break;
    };
}

/* Build controls */
progress();
var btn = document.createElement('Button');
    btn.innerHTML = 'Continue';
    btn.onclick = progress;
    btn.className = 'btn btn-warning m-2';
    btn.id = 'continue-btn';
document.getElementById('btn-div').append(btn);