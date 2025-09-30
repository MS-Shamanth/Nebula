export type SentimentType = 'joyful' | 'curious' | 'urgent' | 'calm' | 'inspiring' | 'analytical';

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  sentiment: SentimentType;
  tags: string[];
  readTime: number;
  views: number;
  karma: number;
  verifiedHash?: string;
  imageUrl?: string;
  expertQA?: ExpertQA[];
  factChecks?: FactCheck[];
  versionHistory?: ArticleVersion[];
}

export interface ExpertQA {
  id: string;
  question: string;
  answer: string;
  expertName: string;
  expertTitle: string;
  askedAt: Date;
  answeredAt: Date;
}

export interface FactCheck {
  id: string;
  section: string;
  correction: string;
  contributor: string;
  verifiedBy: string[];
  timestamp: Date;
  status: 'pending' | 'verified' | 'disputed';
}

export interface ArticleVersion {
  id: string;
  timestamp: Date;
  editor: string;
  changesSummary: string;
  contentSnapshot: string;
}

export interface Contributor {
  id: string;
  name: string;
  karma: number;
  contributions: number;
  avatar?: string;
  expertiseAreas: string[];
}

export interface StoryblokArticle {
  uuid: string;
  name: string;
  content: {
    title: string;
    content: string;
    excerpt: string;
    author: string;
    published_date: string;
    sentiment: SentimentType;
    tags: string;
    read_time: number;
    image?: {
      filename: string;
    };
  };
}
