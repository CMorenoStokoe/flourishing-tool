export function Splash(props:{
    onClick: {
        start: Function;
    }
}):JSX.Element {
    return(
        <div className='flex flex-col justify-center items-center'>
            <div className='m-2 p-2'>
                <h1 className='text-xl'>
                    FSM Online: Assessment tool
                </h1>
                <p className='text-lg'>
                    Empower students and achieve salutogenic wellbeing
                </p>
            </div>
            <a 
                className='m-2 p-2 rounded-xl bg-gray-600 text-white'
                href='https://flourishingeducation.co.uk' target='_blank' rel='noreferrer'
            >
                Learn more
            </a>          
            <button 
                className='m-4 p-2 rounded-xl bg-green-600 text-white'
                onClick={()=>{props.onClick.start()}}
            >
                Start measure
            </button>
        </div>
    )
}