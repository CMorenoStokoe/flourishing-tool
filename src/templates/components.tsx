import petalLogo from '../assets/gfx/logo-petal.svg'

export function ThemeButton(props:{
    value: string,
    onClick: Function,
    animateAfter?: string,
    className?: string,
    variant?: 'alt' | 'default'
}):JSX.Element{
    const defaultColors = 'bg-spring-300 text-white hover:bg-orange hover:text-white ';
    const altColors =  'bg-orange text-white hover:bg-spring-300 hover:text-black ';
    return(
        <button 
            className={'m-4 p-3 rounded-xl '.concat(
                props.variant==='alt' ? altColors : defaultColors, 
                props.animateAfter ? ' animate__animated animate__jello ' : '',
                props.className ? props.className : ''
            )} 
            style={{animationDelay: props.animateAfter ? props.animateAfter : 'none'}}
            onClick={()=>{props.onClick()}}>
            <img src={petalLogo} className='mr-2 w-8 h-auto inline'/>
            <h1 className='inline'>{props.value}</h1>
        </button>
    )
}