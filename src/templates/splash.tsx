export function Splash(props:{
    onClick: {
        start: Function;
    }
}):JSX.Element {
    return(
        <div>
            <h1>headline</h1>
            <button onClick={()=>{props.onClick.start()}}>Start measure</button>
        </div>
    )
}