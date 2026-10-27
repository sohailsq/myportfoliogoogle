# Sohail Shah Quadri — Software Engineer Portfolio

A static React portfolio for Sohail Shah Quadri, Software Engineer & Full-Stack Developer based in Hyderabad, India.

## Frontend Architecture

- **React + Vite:** Client-rendered single-page application.
- **Portfolio content:** Projects, experience, skills, and GitHub showcase data are bundled with the frontend.
- **Browser storage:** Optional local admin edits are saved in the current browser's `localStorage`; they are not published or shared.
- **Images:** Static files in `public/images` are copied into the production build.
- **Contact:** The form opens a prefilled email in the visitor's email application.
- **Assistant:** The portfolio helper and job-description comparison run locally against the content bundled with the site. They do not use a hosted AI service.

## Development

```bash
npm install
npm run dev
```

Create a production build and serve it locally:

```bash
npm run build
npm run preview
```

`npm run lint` runs the TypeScript check for the frontend.

## Vercel Deployment

Import the repository into Vercel and deploy with the project defaults. `vercel.json` sets `npm run build` as the build command and `dist` as the output directory. No API routes, server functions, database, or environment variables are required.

## Frontend-Only Limitations

- Admin sign-in is a local demo UI only; client-side credentials are not secure authentication.
- Admin edits and local data changes affect only the current browser and do not update the deployed site for other visitors.
- Contact messages are not collected by the website. The visitor must send the prepared email from their email application.
- Assistant replies and job matching are local content/keyword-based helpers, not generative AI.
