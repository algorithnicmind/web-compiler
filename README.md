# 🚀 Anti-Debugger

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
</div>

<br />

<div align="center">
  <strong>A modern, powerful, and distraction-free web-based coding platform.</strong>
</div>

<br />

## 📖 Overview

**Anti-Debugger** is an advanced web-based integrated development environment (IDE). It empowers developers to write, run, and test code in multiple languages directly from their browser—no local setup required. With a clean interface and robust underlying architecture, it provides an unparalleled coding experience for developers of all levels.

## ✨ Key Features

- **💻 Advanced Editor:** At its core, it features a highly customizable **Monaco-powered** editing experience, providing syntax highlighting, intelligent auto-completion, and modern typical IDE capabilities.
- **⚡ Fast Code Execution:** Compile and execute code seamlessly with immediate, detailed execution feedback.
- **🌐 Multi-Language Support:** First-class support for a vast array of modern languages including **Python, C++, Java, JavaScript, Go**, and more.
- **🎨 Beautiful & Responsive UI:** Built with **Tailwind CSS** and **Shadcn UI**, offering a dark-mode optimized, stunning user interface.
- **🎛️ Resizable Workspaces:** Flexible, resizable panel layouts allowing you to customize your editor view and terminal output sections.

## 🛠️ Technology Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Library:** [React 18](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Code Editor:** [Monaco Editor](https://microsoft.github.io/monaco-editor/) (`@monaco-editor/react`)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Quick Start Guide

Follow these instructions to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/Anti-Debugger.git
   cd Anti-Debugger
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or 
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or 
   pnpm dev
   ```

4. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your web browser.

## 📂 Project Structure

```text
Anti-Debugger/
├── src/
│   ├── app/           # Next.js App Router (Pages & Layouts)
│   │   ├── api/       # API Routes for execution
│   │   ├── ide/       # IDE Core Interface functionality
│   │   └── page.tsx   # Landing Web Page
│   ├── components/    # Reusable React UI Components
│   │   └── ui/        # Shadcn UI base components
│   └── lib/           # Utility functions and shared logic
├── public/            # Static assets
├── tailwind.config.ts # Tailwind CSS configuration
└── next.config.mjs    # Next.js configuration
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to open an issue or submit a pull request if you want to contribute.

## 📄 License

This project is open-source and available under the terms of the MIT License.

---
<div align="center">
  Built with ❤️ for developers.
</div>
