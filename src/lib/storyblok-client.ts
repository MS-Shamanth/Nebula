import StoryblokClient from 'storyblok-js-client';

export const storyblokClient = new StoryblokClient({
  accessToken: 'trm0PcaUyik2qglgeMsOqwtt',
  cache: {
    clear: 'auto',
    type: 'memory'
  }
});

export interface StoryblokArticle {
  uuid: string;
  slug: string;
  full_slug: string;
  content: {
    headline?: string;
    title?: string;
    image?: {
      filename: string;
      alt?: string;
    };
    text?: any; // richtext
    body?: any; // richtext alternative
    content?: string;
    excerpt?: string;
    description?: string;
    categories?: any[];
    tags?: string;
    call_to_action?: any[];
    author?: string;
    published_date?: string;
    sentiment?: string;
    read_time?: number;
  };
  created_at: string;
  published_at: string;
}

export async function fetchArticles(): Promise<StoryblokArticle[]> {
  try {
    const response = await storyblokClient.get('cdn/stories', {
      version: 'published',
      per_page: 100,
      starts_with: '',
      filter_query: {
        component: {
          in: 'article-page,article'
        }
      }
    });
    return response.data.stories || [];
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export async function fetchArticleBySlug(slug: string): Promise<StoryblokArticle | null> {
  try {
    // Always prepend 'articles/' to match Storyblok folder structure
    const fullSlug = `articles/${slug}`;
    const response = await storyblokClient.get(`cdn/stories/${fullSlug}`, {
      version: 'published'
    });
    return response.data.story;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}
