import bg from '../assets/gfx/bg.svg';
import {ThemeButton} from '../templates/components';
import flowerGIF from '../assets/gfx/petal-flower.gif';

export function Splash(props:{
    onClick: {
        start: Function;
    }
}):JSX.Element {
    return(
        <div className='w-full h-3/4 relative flex flex-col justify-center items-center '>
            
            <div className='absolute top-1/2 animate__animated animate__fadeOut animate__delay-2s'>
                <img className='h-12 inline' src={flowerGIF} />
            </div>

            <div className='absolute top-0 w-full h-full flex flex-col justify-center items-center transition-all animate__animated animate__fadeIn animate__delay-2s' style={{
                background: `url(${bg})`, 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'fixed', 
                backgroundSize: '100% auto'
            }}>
                <div className='m-2 p-8 rounded bg-green-600 text-white shadow-xl'>
                    <h1 className='p-2 text-3xl text-green-400'>
                        Flourishing Online
                    </h1>
                    <h1 className='p-2 text-3xl'>
                        Assessment tool for wellbeing
                    </h1>
                    <p className='p-2 text-lg'>
                        Empower ALL students and staff to flourish and be well
                    </p>

                    <ThemeButton value='Begin here' variant='default' animateAfter='0ms' onClick={props.onClick.start}/>
                </div>
            </div>
        </div>
    )
}