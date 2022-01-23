export function Instructions(props:{
    className: string
}):JSX.Element{
    return(
        <p className={props.className}>
            This questionnaire encourages you to reflect on and become aware of your habits. <br/>
            It asks simple questions to reflect on your life experience and feelings over the last week/few days. <br/>
            The aim is not to make you feel bad or guilty but to really encourage you to understand yourself better and most importantly to see where you can start making changes in your daily routine to introduce more healthier activities and habits in your life.<br/><br/>
            Now you have a go:<br/>
            Please be as honest as possible when answering these questions. <br/>
            On a scale of one to five (one being never or very rarely and five being always or almost always) answer the following questions on your experience over the last week. <br/>
            This is to give you a snapshot in time and to show that your wellbeing is a continuum that is constantly in movement and changing depending on your thoughts, emotions, external environment and life circumstances. <br/>
            The exciting part is that you can get to understand these better and alter your response to them. <br/>
        </p>
    )
}