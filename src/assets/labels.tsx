export interface graphLabel {
    title: string;
    subtitle: string;
    color: string;
}

export const labels:Record<'PhysicalHealth' | 'SpiritualHealth' | 'SocialHealth' | 'EmotionalHealth' | 'CognitiveHealth', graphLabel> = {
    PhysicalHealth: {
        title: 'Physical Health',
        subtitle: 'How well you take care of your body',
        color: '#EA5455'
    },
    SpiritualHealth:{
        title: 'Spiritual Health',
        subtitle: 'A connection to the wider and personal meanings behind your actions',
        color: '#2D4059'
    },
    SocialHealth:{
        title: 'Social Health',
        subtitle: 'Quality social relationships and support networks',
        color: '#FFB400'
    },
    EmotionalHealth:{
        title: 'Emotional Health',
        subtitle: 'Your understanding of your emotions',
        color: '#F07B3F'
    },
    CognitiveHealth:{
        title: 'Cognitive Health',
        subtitle: 'The pattern of your internal thoughts and “mental chatter”',
        color: '#00B8A9'
    }
}