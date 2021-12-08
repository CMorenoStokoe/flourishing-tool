interface graphLabel {
    title: string;
    subtitle: string;
}

export const labels:Record<'PhysicalHealth' | 'SpiritualHealth' | 'SocialHealth' | 'EmotionalHealth' | 'CognitiveHealth', graphLabel> = {
    PhysicalHealth: {
        title: 'Physical Health',
        subtitle: 'How well you take care of your body',
    },
    SpiritualHealth:{
        title: 'Spiritual Health',
        subtitle: 'A connection to the wider and personal meanings behind your actions',
    },
    SocialHealth:{
        title: 'Social Health',
        subtitle: 'Quality social relationships and support networks',
    },
    EmotionalHealth:{
        title: 'Emotional Health',
        subtitle: 'Your understanding of your emotions',
    },
    CognitiveHealth:{
        title: 'Cognitive Health',
        subtitle: 'The pattern of your internal thoughts and “mental chatter”',
    }
}