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
            <div className='flex flex-col items-center bg-spring-100 rounded shadow text-left'>
                <h1 className='m-2 mb-0 p-2 pb-0 text-4xl text-spring-300 text-center lg:text-left'>What should I expect?</h1>
                <div className='m-2 mt-0 mb-4 p-2 pt-0 flex flex-row items-center'>
                    <img className='h-24' src={snapshotGIF}/>
                    <h1 className='pt-12 max-w-sm'><strong>This five minute quiz will give you a snapshot of your current wellbeing.</strong></h1>
                </div>
                <div className='p-2 w-full flex flex-col items-center justify-center shadow-inner bg-spring-200'>
                    <strong className='p-2'>Identify areas for growth.</strong>
                    <img src={wellbeingAxesImage} className='p-2 max-w-md'/>
                    <p className='p-2 max-w-md'>Understand your thoughts and behaviours relating to your body, mind, emotions, social relationships, and to society more widely (we call this spiritual wellbeing).</p>
                </div>
                <div className='m-2 p-2 flex flex-row items-center'>
                    <img src={flowerGIF} className='h-24'/>
                    <h1 className='max-w-sm'><strong>Be honest with yourself. </strong> The aim is to grow and develop, to see where you can introduce healthy habits in your life!</h1>
                </div>
                <ThemeButton value='Take the quiz!' animateAfter='5s' onClick={()=>{props.onClick.start()}} />
            </div>
        </div>        
    )
}