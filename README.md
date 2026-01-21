# Elias Immersive Website

A SvelteKit website with Sanity CMS integration for Elias Immersive - virtual tours, aerial mapping, and 3D modeling services.

## Tech Stack

- **Frontend**: SvelteKit 2 with Svelte 5
- **CMS**: Sanity Studio v3
- **Hosting**: Vercel
- **Styling**: Custom CSS with CSS variables

## Project Structure

```
el-claude/
├── src/
│   ├── lib/
│   │   ├── components/    # Reusable Svelte components
│   │   ├── sanity/        # Sanity client and queries
│   │   ├── styles/        # Global CSS styles
│   │   └── types.ts       # TypeScript type definitions
│   ├── routes/
│   │   ├── +layout.svelte # Main layout
│   │   ├── +page.svelte   # Home page
│   │   ├── portfolio/     # Portfolio pages
│   │   └── contact/       # Contact page
│   └── app.html           # HTML template
├── studio/                # Sanity Studio
│   ├── schemas/           # Content schemas
│   └── sanity.config.ts   # Studio configuration
├── static/                # Static assets
└── vercel.json            # Vercel config
```

## Getting Started

### 1. Install Dependencies

```bash
# Install main project dependencies
npm install

# Install Sanity Studio dependencies
cd studio && npm install && cd ..
```

### 2. Set Up Sanity

1. Create a new Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy your project ID
3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Add your Sanity credentials:

```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

### 3. Run Development Servers

```bash
# Run SvelteKit dev server
npm run dev

# In another terminal, run Sanity Studio
cd studio && npm run dev
```

- SvelteKit: http://localhost:5173
- Sanity Studio: http://localhost:3333

### 4. Add Content in Sanity

1. Open Sanity Studio at http://localhost:3333
2. Create site settings
3. Add services (Virtual Tours, Aerial Mapping, 3D Modeling)
4. Add projects with images and embed URLs
5. Configure the home page

## Deployment

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in [Vercel](https://vercel.com/new)
3. Add environment variables:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`
4. Deploy

### Deploy Sanity Studio

```bash
cd studio
npx sanity deploy
```

This will deploy your Studio to `https://elias-immersive.sanity.studio`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SANITY_PROJECT_ID` | Your Sanity project ID |
| `VITE_SANITY_DATASET` | Sanity dataset name (usually `production`) |

## Customization

### Colors

Edit CSS variables in `src/lib/styles/global.css`:

```css
:root {
  --color-primary: #4a5440;      /* Olive green */
  --color-background: #f5f5f0;   /* Off-white */
  --color-text: #1a1a1a;         /* Near black */
}
```

### Fonts

The site uses:
- **Headings**: Cormorant Garamond (serif, italic)
- **Body**: Inter (sans-serif)

## Adding Content Types

To add new content types:

1. Create a schema in `studio/schemas/`
2. Add it to `studio/schemas/index.ts`
3. Create corresponding TypeScript types in `src/lib/types.ts`
4. Add GROQ queries in `src/lib/sanity/queries.ts`

## License

Private - Elias Immersive
