import bg from '../assets/gfx/bg.svg';
import petalLogo from '../assets/gfx/logo-petal.svg'

export function Splash(props:{
    onClick: {
        start: Function;
    }
}):JSX.Element {
    return(
        <div className='w-full h-3/4 flex flex-col justify-center items-center' style={{
            background: `url(${bg})`, 
            backgroundRepeat: 'no-repeat', 
            backgroundPosition: 'fixed', 
            backgroundSize: '100% auto'
        }}>
            <div className='m-2 p-8 rounded bg-white shadow-xl'>
                <h1 className='p-2 text-3xl text-gray-500'>
                    Flourishing Online
                </h1>
                <h1 className='p-2 text-3xl'>
                    Assessment tool for wellbeing
                </h1>
                <p className='p-2 text-lg'>
                    Empower students to flourish and be well
                </p>
                <a className='m-2 p-3 rounded-xl bg-gray-600 text-white' href='https://flourishingeducation.co.uk' target='_blank' rel='noreferrer'>
                    Learn more
                </a>          
                <button className='m-4 p-3 rounded-xl bg-green-600 text-white' onClick={()=>{props.onClick.start()}}>
                    <img src={petalLogo} className='mr-2 w-8 h-auto' style={{display: 'inline'}}/>
                    Begin here
                </button>
            </div>
        </div>
    )
}