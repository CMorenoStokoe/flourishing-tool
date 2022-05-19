import {ThemeButton} from './components';
import flowerGIF from '../assets/gfx/petal-flower.gif';
import dialHand from '../assets/gfx/fe_dial_hand.svg';
import dialFace from '../assets/gfx/fe_dial_face.svg';
import logo from '../assets/gfx/logo-flourish.svg';
import { Children } from 'react';

export function TV(props:{
    showTV: boolean;
    children: JSX.Element;
    onClick: {
        onTurnDial: Function;
    }
}):JSX.Element {
    const TVClass = ():string => {
        if(props.showTV){
            return 'TV'
        } else {
            return 'TV TV-hide'
        }
    }
    return(
        <div className='w-full h-full relative justify-center items-center'>

            <div id='TV-border' 
                className={`w-full h-full ${TVClass()}`}
                style={{
                    background: '#FAF1E6' //'linear-gradient(41deg, #92B4EC 0%, #92B4EC 45%, #2D4059 55%, #184D47 100%)'
                }}>
                <div id='TV'
                    className={`w-full h-full p-1 lg:p-8 lg:pr-2 flex flex-col lg:flex-row rounded-xl border-r-2 border-t-2 ${TVClass()}`}
                    style={{
                        boxShadow: '0px 0px 20px #000000',
                        borderColor: '#FAF1E6',
                        background: 'linear-gradient(41deg, #f1cc5d 0%, #f1cc5d 40%, #CBA92B 45%, #CBA92B 100%)'
                    }}
                >
                    <div id='TV-inner'
                        className={`lg:px-12 lg:py-6 flex-grow shadow-inner rounded-xl ${TVClass()}`}
                        style={{
                            background: 'linear-gradient(41deg, #FFE69A 0%, #FFE69A 49%, #d8c384 51%, #d8c384 100%)' //'linear-gradient(41deg, #f6c840 0%, #f6c840 49%, #FFD24C 51%, #FFD24C 100%)'
                        }}
                    >
                        <div id='Screen'
                            className={`w-full h-full p-1 lg:p-12 shadow-inner rounded-xl ${TVClass()}`}
                            style={{
                                background: 'linear-gradient(41deg, #d8c384 0%, #d8c384 49%, #beb086 51%, #beb086 100%)' //'linear-gradient(41deg, #FFD24C 0%, #FFD24C 49%, #e0b42e 51%, #e0b42e 100%)' 
                            }}
                        >
                            <div id='Screen-outer'
                                className={`w-full h-full border-black relative bg-black rounded-3xl ${TVClass()}`}
                                style={{
                                    borderWidth: '20px'
                                }}
                                onClick={()=>{ if(props.showTV){ props.onClick.onTurnDial() }}}
                            >
                                <div id='Screen-inner'
                                    className='w-full h-full absolute shadow-inner rounded-3xl z-50'
                                    style={{
                                        background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)',
                                        display: `${props.showTV ? 'flex' : 'none'}`
                                    }}
                                />
                                <div id='Screen-noise'
                                    className='w-full h-full absolute rounded-3xl z-50 noisy'
                                    style={{
                                        display: `${props.showTV ? 'flex' : 'none'}`
                                    }}
                                />

                                <div id='CurrentView' 
                                    className={`h-full min-h-full bg-white filter rounded-3xl ${props.showTV ? 'crt-g r id':''} ${TVClass()}`}
                                    style={{filter:'grayscale(75%)'}}
                                >
                                    {props.children}
                                </div>

                            </div>
                        </div>

                    </div> 

                    <div id='SidePanel'
                        className={`pt-2 lg:p-8 flex flex-row lg:flex-col flex-grow-0 justify-center items-center lg:justify-between overflow-hidden ${TVClass()}`}
                        style={{
                            width: `${props.showTV ? 'auto' : '0px'}`,
                            height: `${props.showTV ? 'auto' : '0px'}`
                        }}
                    >
                        <div id='Speaker'
                            className='hidden lg:block shadow-inner w-36 h-52 p-2 rounded-full border-r-2 border-t-2'
                            style={{
                                borderColor: '#FAF1E6',
                                background: `repeating-linear-gradient(
                                    180deg,
                                    #beb086,
                                    #beb086 5px,
                                    rgba(0,0,0,0.5) 5px,
                                    rgba(0,0,0,0.5) 10px
                                )`
                            }}
                        />
                        <div>
                            <div id='Dials' className='w-44 h-44 relative animate__animated animate__pulse animate__delay-5s animate__repeat-3'>
                                <img 
                                    src={dialFace} 
                                    className='absolute top-0 left-0 w-full h-full' 
                                    style={{
                                        filter: 'drop-shadow(0px 0px 0.25rem #FAF1E6)'
                                    }}
                                />
                                <img 
                                    src={dialHand} 
                                    onClick={()=>{props.onClick.onTurnDial()}} 
                                    className='absolute ml-2 mb-2 p-2 top-16 left-2 h-3/5 w-3/5 cursor-pointer animate-dial' 
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
        <div className='w-full h-full relative flex flex-col justify-center items-center overflow-hidden '>
            <div className='w-full h-full p-4 flex flex-col justify-between items-center transition-all animate__animated animate__zoomInDown animate__delay-1s'>
                    
                <img className='m-2 h-12 self-start' src={logo} />
                <img className='h-52' src={flowerGIF} />
                <h1 className='p-4 text-3xl lg:text-5xl crt-text text-spring-400' 
                style={{
                    fontFamily:'Lobster Two, cursive', 
                    textShadow:'0px 4px #000000'
                }}>
                    Tune into your wellbeing today!
                </h1>
                <h1 className='lg:hidden text-xl' style={{
                    fontFamily:'Lobster Two, cursive', 
                    textShadow:'0px 0px 1px #000000'
                }}>
                    Tap to continue
                </h1>
                
            </div>
        </div>
    )
}