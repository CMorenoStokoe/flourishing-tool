export type questionnaire = Record<string, question>;

export interface question {
    id: string;
    text: string;
    axis: 'PhysicalHealth' | 'CognitiveHealth' | 'EmotionalHealth' | 'SocialHealth' | 'SpiritualHealth';
    score: number;
};

export interface results {
    PhysicalHealth: number,
    CognitiveHealth: number,
    EmotionalHealth: number,
    SocialHealth: number,
    SpiritualHealth: number
}