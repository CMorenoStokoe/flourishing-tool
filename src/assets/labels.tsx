import EmotionalHealth from '../assets/gfx/petal_EmotionalHealth.svg';
import PhysicalHealth from '../assets/gfx/petal_PhysicalHealth.svg';
import SocialHealth from '../assets/gfx/petal_SocialHealth.svg';
import SpiritualHealth from '../assets/gfx/petal_SpiritualHealth.svg';
import CognitiveHealth from '../assets/gfx/petal_CognitiveHealth.svg';

export interface graphLabel {
    title: string;
    subtitle: string;
    color: string;
    icon: string;
}

export const labels:Record<'PhysicalHealth' | 'SpiritualHealth' | 'SocialHealth' | 'EmotionalHealth' | 'CognitiveHealth', graphLabel> = {
    PhysicalHealth: {
        title: 'Physical Health',
        subtitle: 'How well you take care of your body and reduce risk of illness and injury.',
        color: '#EA5455',
        icon: PhysicalHealth
    },
    SpiritualHealth:{
        title: 'Spiritual Health',
        subtitle: 'Noticing our passions and purpose or connection with wider society.',
        color: '#2D4059',
        icon: SpiritualHealth
    },
    SocialHealth:{
        title: 'Social Health',
        subtitle: 'Taking care of social relationships and support networks.',
        color: '#FFB400',
        icon: SocialHealth
    },
    EmotionalHealth:{
        title: 'Emotional Health',
        subtitle: 'Feeling in control of your emotions.',
        color: '#F07B3F',
        icon: EmotionalHealth
    },
    CognitiveHealth:{
        title: 'Cognitive Health',
        subtitle: 'Adopting a healthy mindset and outlook on life.',
        color: '#00B8A9',
        icon: CognitiveHealth
    }
}