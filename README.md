# my-resume-page

Personal resume website for Yosef (Seffi) Yaaran, built with React, TypeScript and Vite.

## Development

```bash
npm install
npm run dev        # start the local dev server
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm run lint
npm run typecheck
```

## Configuration

The contact form sends messages through [Web3Forms](https://web3forms.com). Set the access key in a `.env.local` file (not committed):

```
VITE_WEB3FORMS_KEY=your-access-key
```

## Structure

- `src/App.tsx`: page content and layout (experience, skills and highlights are data arrays at the top)
- `src/index.css`: all site styles
- `public/Yosef-Yaaran-Resume.pdf`: downloadable résumé
