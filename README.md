
# Nebula Copilot

**Adaptive, Accessible, AI-Powered Content Platform**  
_Built with Storyblok, Algolia, React, and Tailwind CSS_

***

## 🚀 Overview

Nebula Copilot is a next-generation content hub where creators, editors, and teams can publish rich articles via Storyblok and deliver a delightful, personalized experience to users—complete with instant, semantic search powered by Algolia. The project was built for the Storyblok x Code & Coffee Hackathon as a showcase of modern, adaptive web content best practices.

***

## ✨ Features

- **Article-Centric Experience:** Each article features headline, hero image, rich text body, categories, and call-to-action—all managed in Storyblok.
- **Instant Global Search:** Algolia powers user-friendly, faceted search by headline, tags, categories, and full text.
- **Adaptive Accessibility:** Supports dyslexia-friendly font, dark mode, high-contrast themes, and accessible navigation.
- **Editor Live Preview:** Edits in Storyblok are live for site users within seconds.
- **Playlist & Curation:** Users can build collections/playlists for onboarding, study kits, or special sharing.
- **Extensible:** Easy to expand with more features, content types, or personalization.

***

## 🛠️ Technologies

- **Languages:** JavaScript, TypeScript
- **Frameworks:** React, Tailwind CSS, Algolia InstantSearch, Storyblok SDK
- **APIs:** Storyblok CDN API, Algolia Search API
- **Platforms:** GitHub (repo), Render (deployment)
- **Cloud Services:** Storyblok (content), Algolia (search)
- **No Supabase or external databases used**
- **Environment Variables:** All API keys/tokens stored securely

***

## 📦 Setup & Installation

1. **Clone repo from GitHub:**
   ```
   git clone https://github.com/your-username/nebula-copilot.git
   cd nebula-copilot
   ```
2. **Install dependencies:**
   ```
   npm install
   ```
3. **Environment setup:**
   - Copy `.env.example` to `.env` and add tokens/keys:
     ```
     STORYBLOK_PUBLIC_TOKEN=trm0PcaUyik2qglgeMsOqwtt
     STORYBLOK_SPACE_ID=287485743695345
     STORYBLOK_PERSONAL_TOKEN=MYLUVN0qrEMBQ06SH1bXSwtt-96161753895597-WNnT6WgyWxWGvmaNgscx
     ALGOLIA_APP_ID=XDK6HXI1LY
     ALGOLIA_SEARCH_KEY=d93493726005e2e0ab71317c027d1eb3
     ALGOLIA_WRITE_KEY=563c1f48792fbc1d6891e085d9ae0091
     ALGOLIA_INDEX=Nebula
     ```
4. **Start the development server:**
   ```
   npm run dev
   ```
   - Or use `npm run start` as needed for your setup.
5. **View app at:** `http://localhost:3000`

***

## 📚 Content Model

- Articles are modeled in Storyblok as `'article-page'` blocks, with these fields:
  - `headline` (Text)
  - `image` (Asset)
  - `text` (Richtext)
  - `call_to_action` (Multi Options/Reference)
  - `categories` (Multi Options/Reference)

***

## 🏆 Project Highlights

- *Article pages display all content fields, not just summaries or placeholders.*
- *Instant site-wide search for any article, tag, or category.*
- *Fully adaptive and accessible for diverse user needs.*

***

## 🙌 Credits

- **Built For:** Storyblok x Code & Coffee Hackathon
- **Tech:** Storyblok, Algolia, React, Tailwind, Lovable

***

## 📈 What’s Next

- Sentiment-based search and recommendations.
- Time-travel content snapshots and live collaboration.
- Advanced curation and AR overlays.
- Open source more modules for community extensibility.

***

## 📄 License

MIT

***

Let me know if you need section changes, example commands, or further details for your hackathon submission!
