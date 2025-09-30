export type EmotionType = 'joy' | 'pride' | 'hope' | 'solidarity' | 'excitement' | 'regret';

export interface Story {
  id: string;
  title: string;
  description: string;
  date: Date;
  emotion: EmotionType;
  impact: string;
  tags: string[];
  inspirationCount: number;
  hidden?: string; // Hidden chapter content
  imageUrl?: string;
}

export interface StoryblokStory {
  uuid: string;
  name: string;
  content: {
    title: string;
    description: string;
    date: string;
    emotion: EmotionType;
    impact: string;
    tags: string;
    hidden_chapter?: string;
    image?: {
      filename: string;
    };
  };
}
