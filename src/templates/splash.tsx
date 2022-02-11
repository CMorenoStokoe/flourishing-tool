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
            
            <div className='absolute top-1/2 animate__animated animate__fadeOut animate__delay-1s'>
                <img className='h-12 inline' src={flowerGIF} />
            </div>

            <div className='absolute top-0 w-full h-full flex flex-col justify-center items-center transition-all animate__animated animate__fadeIn animate__delay-1s' style={{
                background: `url(${bg})`, 
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'fixed', 
                backgroundSize: '100% auto'
            }}>
                <div className='m-2 p-8 rounded bg-spring-400 text-white shadow-xl'>
                    <h1 className='p-2 text-3xl'>
                        Flourish!
                    </h1>
                    <p className='p-2 text-lg'>
                        Improve your wellbeing with a quick quiz.
                        <br/>Designed for everyone.
                    </p>

                    <ThemeButton value='Begin here' variant='default' animateAfter='0ms' onClick={props.onClick.start}/>
                </div>
            </div>
        </div>
    )
}