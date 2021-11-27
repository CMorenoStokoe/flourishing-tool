// Identify and make groups of buttons for questions
// Adapted from www.morenostok.io/mirana data visualisation tool

var qCount = 1; // Count number of questions groups for IDs
function createOptions(questions, varsToChange){

    // Draw Qs
    var questionBlock = document.createElement("DIV");
        questionBlock.id = 'questionBlock';
    document.getElementById('questionnaire').appendChild(questionBlock);

	for(const q of questions){
			
		// Wrap group in div
		var div = document.createElement("DIV");
            div.className = 'q p-2';
		questionBlock.appendChild(div);

		var text = document.createElement("H5");
            text.innerHTML = q.text;
		div.appendChild(text);

		var labelLo = document.createElement("P");
            labelLo.innerHTML = q.labels.low;
            labelLo.style.display = 'inline-block';
		div.appendChild(labelLo);
		
        // Create rating scale
        for(let i=1; i<6; i++){

            // Create input button
            var btn = document.createElement("INPUT");
                btn.setAttribute("type", 'radio');
                btn.onchange = () => {varsToChange[q.id].score = i; console.log(q.id, varsToChange[q.id].score)};
                btn.name = `q-${qCount}`;
                btn.className = 'm-1';
        
            // Append to DOM
            div.appendChild(btn);
        }
        
		var labelHi = document.createElement("P");
            labelHi.innerHTML = q.labels.high;
            labelHi.style.display = 'inline-block';
		div.appendChild(labelHi);
		
		qCount++; // Increment group count for IDs
	}

}