import StoryblokClient from 'storyblok-js-client';

export const storyblok = new StoryblokClient({
  accessToken: 'trm0PcaUyik2qglgeMsOqwtt',
  cache: {
    clear: 'auto',
    type: 'memory'
  }
});

export const storyblokPersonal = new StoryblokClient({
  accessToken: 'MYLUVN0qrEMBQ06SH1bXSwtt-96161753895597-WNnT6WgyWxWGvmaNgscx',
});
