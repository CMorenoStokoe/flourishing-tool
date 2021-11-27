export type questionnaire = Record<string, question>;

export interface question {
    id: string;
    text: string;
    axis: 'PhysicalHealth' | 'CognitiveHealth' | 'EmotionalHealth' | 'SocialHealth' | 'SpiritualHealth';
    score: number;
};
