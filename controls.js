// Identify and make groups of buttons for questions
// Adapted from www.morenostok.io/mirana data visualisation tool
function createOptions(questions, domObjID, varsToChange){
	var qCount = 1; // Count number of questions groups for IDs

	for(const q of questions){
			
		// Wrap group in div
		var div = document.createElement("DIV");
		document.getElementById(domObjID).appendChild(div);

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
                btn.onchange = () => {varsToChange[q.axis] = i; console.log(varsToChange)};
                btn.name = `q-${qCount}`;
        
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