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
        subtitle: 'How well you take care of your body',
        color: '#EA5455',
        icon: PhysicalHealth
    },
    SpiritualHealth:{
        title: 'Spiritual Health',
        subtitle: 'A connection to the wider and personal meanings behind your actions',
        color: '#2D4059',
        icon: SpiritualHealth
    },
    SocialHealth:{
        title: 'Social Health',
        subtitle: 'Quality social relationships and support networks',
        color: '#FFB400',
        icon: SocialHealth
    },
    EmotionalHealth:{
        title: 'Emotional Health',
        subtitle: 'Your understanding of your emotions',
        color: '#F07B3F',
        icon: EmotionalHealth
    },
    CognitiveHealth:{
        title: 'Cognitive Health',
        subtitle: 'The pattern of your internal thoughts and “mental chatter”',
        color: '#00B8A9',
        icon: CognitiveHealth
    }
}