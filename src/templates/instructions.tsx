import flowerGIF from '../assets/gfx/petal-flower-lg.gif';
import snapshotGIF from '../assets/gfx/petal-snapshot-lg.gif';
import wellbeingAxesImage from '../assets/gfx/petal_axes.svg';
import petalLogo from '../assets/gfx/logo-petal.svg'
import { ThemeButton } from './components';

export function Instructions (props:{
    onClick:{
        start: Function;
    }
}){
    return(
        <div className='p-4 flex justify-center animate__animated animate__fadeIn'>
            <div className='p-2 flex flex-col items-center bg-white rounded shadow text-left'>
                <h1 className='p-2 pb-0 text-4xl text-gray-400 text-center lg:text-left'>What should I expect?</h1>
                <div className='m-2 mt-0 p-2 pt-0 flex flex-row items-center'>
                    <img className='h-24' src={snapshotGIF}/>
                    <h1 className='pt-12 max-w-sm'>This measure will give you a <strong>snapshot</strong> of your wellbeing at this moment in time.</h1>
                </div>
                <p className='p-2 max-w-md'>You will be able to identify <strong>areas for growth</strong> by understanding how well you take care of your body and mind, maintain healthy emotional and social habits, as well as your general outlook on life (which we call "spiritual wellbeing").</p>
                <img src={wellbeingAxesImage} className='p-2 max-w-md'/>
                <div className='m-2 p-2 flex flex-row items-center'>
                    <img src={flowerGIF} className='h-24'/>
                    <h1 className='max-w-sm'>Be <strong>honest</strong> with yourself, the aim is not to make you feel bad or guilty, but to better understand yourself and see where you can introduce healthy habits in your life!</h1>
                </div>
                <ThemeButton value='Take your measure!' animateAfter='5s' onClick={()=>{props.onClick.start()}} />
            </div>
        </div>        
    )
}