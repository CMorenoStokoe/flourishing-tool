import bg from '../assets/gfx/bg.svg';
import {ThemeButton} from './components';
import flowerGIF from '../assets/gfx/petal-flower.gif';

export function Welcome(props:{
    onClick: {
        start: Function;
        demo: Function;
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
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundSize: 'auto 75%'
            }}>
                <div className='m-2 p-8 rounded bg-spring-400 text-white shadow-xl'>
                    <h1 className='p-2 text-3xl'>
                        Flourish!
                    </h1>
                    <p className='p-2 text-lg'>
                        Improve your wellbeing with this 5 minute quiz.
                        <br/>Designed to empower <strong>all</strong> young people and adults to flourish.
                    </p>

                    <ThemeButton value='Begin here' variant='default' animateAfter='0ms' onClick={props.onClick.start}/>
                    <br/>
                    <button className='text-spring-200 hover:text-spring-100' onClick={()=>{props.onClick.demo()}}>
                        ...or click here to load the demo!
                    </button>
                </div>
            </div>
        </div>
    )
}