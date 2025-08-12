# Resumind AI Resume Analyzer

> A modern, accessible, and type-safe resume analysis app built with React Router, TypeScript, and PDF.js.

![AI Resume Analyzer Screenshot](/resumind-ai-resume-analyzer.png "Resume Analyzer Screenshot")

## 🚀 Features

- **Resume Upload & Parsing**: Upload PDF resumes and extract content for analysis using PDF.js
- **ATS Compatibility Scoring**: Analyze resumes for Applicant Tracking System (ATS) friendliness
- **Visual Feedback**: Score badges, gauges, and detailed feedback for resume improvements
- **Accessibility First**: Strict a11y rules and semantic HTML with comprehensive ARIA support
- **Modern UI**: TailwindCSS 4.0, custom SVG icons, and responsive design
- **No Backend Required**: All processing is done client-side with React Router 7.0

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router 7, TypeScript 5
- **Styling**: TailwindCSS 4.0 with animations
- **PDF Parsing**: [pdf.js](https://mozilla.github.io/pdf.js/) v5.3
- **State Management**: Zustand 5.0
- **File Upload**: React Dropzone 14.0
- **Lint/Format**: [Biome](https://biomejs.dev/) 2.1, [Ultracite](https://github.com/ultracite/ultracite) 5.0
- **Build Tool**: Vite 6.0

## 📂 Project Structure

- `app/` — Main app code
  - `components/` — UI components (accordion, ats, details, file-uploader, etc.)
  - `lib/` — Utility modules (pdf2img, puter, utils)
  - `routes/` — App routes (auth, home, resume, upload, wipe)
- `constants/` — App-wide constants
- `public/` — Static assets (SVGs, images, PDF worker)
  - `icons/` — SVG icons (ats-good, ats-bad, warning, etc.)
  - `images/` — Images and backgrounds
- `types/` — TypeScript type definitions

## ⚡ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

The app will be available on the development server (URL shown in console).

### 3. Type checking

```bash
npm run typecheck
```

### 4. Build for production

```bash
npm run build
npm run start
```

### 5. Docker Deployment

```bash
docker build -t ai-resume-analyzer .
docker run -p 3000:3000 ai-resume-analyzer
```

## 🧑‍💻 Accessibility & Code Quality

- Enforced by [Ultracite](https://github.com/ultracite/ultracite) and Biome
- Strict a11y, type safety, and consistent formatting
- See `.github/copilot-instructions.md` for full rules

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

All contributions are welcome!
