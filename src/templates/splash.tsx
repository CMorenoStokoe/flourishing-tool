import {ThemeButton} from './components';
import flowerGIF from '../assets/gfx/petal-flower.gif';
import dialHand from '../assets/gfx/fe_dial_hand.svg';
import dialFace from '../assets/gfx/fe_dial_face.svg';
import logo from '../assets/gfx/logo-flourish.svg';

export function TV(props:{
    view: string;
    content: JSX.Element;
    onClick: {
        onTurnDial: Function;
    }
}):JSX.Element {
    const TVClass = () => {
        if(props.view === 'splash'){
            return 'TV'
        } else {
            return 'TV TV-hide'
        }
    }
    return(
        <div className='w-full lg:h-full min-h-full relative flex flex-col justify-center items-center'>

            <div id='TV-border' 
                className={`w-full min-h-full lg:p-2 ${TVClass()}`}
                style={{
                    background: 'linear-gradient(41deg, #4f2d20 0%, #4f2d20 45%, #8a4e37 55%, #8a4e37 100%)'
                }}>
                <div id='TV'
                    className={`w-full lg:h-full min-h-full min-h-full p-2 lg:p-8 flex flex-col lg:flex-row rounded-xl border-r-2 border-t-2 ${TVClass()}`}
                    style={{
                        borderColor: '#fcdfc0',
                        background: 'linear-gradient(41deg, #663f30 0%, #663f30 45%, #4f2d20 55%, #4f2d20 100%)'
                    }}
                >
                    <div id='TV-inner'
                        className={`w-full lg:h-full min-h-full px-2 py-1 lg:px-12 lg:py-6 flex-grow rounded-xl ${TVClass()}`}
                        style={{
                            background: 'linear-gradient(41deg, #4f2d20 0%, #4f2d20 45%, #331d14 55%, #331d14 100%)'
                        }}
                    >
                        <div id='Screen'
                            className={`w-full lg:h-full min-h-full p-4 lg:p-12 rounded-xl border-8 ${TVClass()}`}
                            style={{
                                borderColor:'#FFC68A',
                                background: 'linear-gradient(41deg, #FFC68A 0%, #FFC68A 45%, #d1a271 55%, #d1a271 100%)'
                            }}
                        >
                            <div id='Screen-outer'
                                className={`w-full lg:h-full min-h-full border-black relative bg-black rounded-3xl ${TVClass()}`}
                                style={{
                                    borderWidth: '20px'
                                }}
                            >
                                <div id='Screen-inner'
                                    className='w-full lg:h-full min-h-full absolute rounded-3xl z-50'
                                    style={{
                                        background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)',
                                        display: `${props.view==='splash'?'flex':'none'}`
                                    }}
                                />
                                <div id='Screen-noise'
                                    className='w-full lg:h-full min-h-full absolute rounded-3xl z-50 noisy'
                                    style={{
                                        display: `${props.view==='splash'?'flex':'none'}`
                                    }}
                                />

                                <div id='CurrentView' 
                                    className={`lg:h-full min-h-full bg-white filter rounded-3xl ${props.view==='splash'?'crt-grid':''} ${TVClass()}`}
                                    style={{filter:'grayscale(75%)'}}
                                >
                                    {props.content}
                                </div>

                            </div>
                        </div>

                    </div> 

                    <div id='SidePanel'
                        className={`p-8 flex flex-row lg:flex-col flex-grow lg:flex-grow-0 justify-between overflow-hidden ${TVClass()}`}
                        style={{
                            width: `${props.view==='splash'?'auto':'0px'}`
                        }}
                    >
                        <div id='Speaker'
                            className='w-36 h-52 p-2 rounded-full border-r-2 border-t-2'
                            style={{
                                borderColor: '#fcdfc0',
                                background: `repeating-linear-gradient(
                                    180deg,
                                    #FFC68A,
                                    #FFC68A 5px,
                                    rgba(0,0,0,0.8) 5px,
                                    rgba(0,0,0,0.8) 10px
                                )`
                            }}
                        />
                        <div>
                            <h1 className='text-white text-shadow text-3xl animate__animated animate__headShake animate__delay-3s animate__slow animate__repeat-3'>
                                Tune in! ⤸
                            </h1>
                            <div id='Dials' className='w-36 h-36 p-2 relative'>
                                <img 
                                    src={dialFace} 
                                    className='absolute top-0 h-full w-auto glowing' 
                                    style={{}}
                                />
                                <img 
                                    src={dialHand} 
                                    onClick={()=>{props.onClick.onTurnDial()}} 
                                    className='absolute ml-2 mb-2 top-1/4 left-1/4 h-1/2 w-1/2 cursor-pointer animate-dial' 
                                    style={{}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Splash(props:{
    onClick: {
        start: Function;
    }
}):JSX.Element {
    return(
        <div className='w-full h-3/4 relative flex flex-col justify-center items-center '>
            <div className='w-full h-full flex flex-col justify-between items-center transition-all animate__animated animate__zoomIn animate__delay-1s'>
                    
                <img className='m-2 h-12 inline self-start' src={logo} />
                <img className='h-48 inline' src={flowerGIF} />
                <h1 className='p-2 text-5xl crt-text text-gray-500' 
                style={{
                    fontFamily:'Lobster Two, cursive', 
                    textShadow:'0px 4px #000000'
                }}>
                    Tune into your wellbeing today!
                </h1>
                
            </div>
        </div>
    )
}