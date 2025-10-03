# AIKU - AI Travel Planner Frontend

Modern travel planning application built with Next.js 15 and TypeScript, featuring AI-powered trip planning with step-by-step questionnaires and full itinerary generation.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: Shadcn-ui (Radix UI primitives)
- **Schema Validation**: Zod
- **State Management**: Zustand with persistence
- **Forms**: React Hook Form with Zod resolvers
- **Tables**: Tanstack React Table
- **Command Interface**: kbar (Command+K)
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier
- **Pre-commit Hooks**: Husky + lint-staged
- **Error Management**: Custom logger with error boundaries

## 🎨 Design System

The application uses a color palette inspired by Enuygun:

- **Primary**: `#2cbe4b` (Green - matching Enuygun brand)
- **Secondary**: `#646cff` (Blue accent)
- **Background**: White with high contrast for accessibility

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with header
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles with Tailwind
│   └── plan/
│       ├── step/          # Step-by-step planner
│       └── full/          # Full trip planner
├── components/            # React components
│   ├── ui/               # Shadcn-ui components
│   ├── kbar-provider.tsx # Command+K interface
│   └── plan-choice-modal.tsx
├── lib/                  # Utility libraries
│   ├── utils.ts         # Tailwind cn() helper
│   └── logger.ts        # Error management & logging
├── stores/              # Zustand state stores
│   └── trip-store.ts   # Trip planning state
└── utils/              # Utility functions
    ├── validation.ts   # Zod schemas & validators
    └── questionnaire.ts # Mock data & API calls
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Install dependencies
npm install

# Run development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript compiler checks
- `npm run prepare` - Install Husky hooks

## 🎯 Features

### Current Features

- **Home Page**: Trip prompt input with validation
- **Planning Modes**: Choose between step-by-step or full planning
- **Step-by-Step Planner**:
  - Interactive questionnaire with timeline visualization
  - Time-slot based selection with visual feedback
  - Progress tracking
- **Full Trip Planner**: Complete itinerary generation (in development)
- **Command+K Interface**: Quick navigation with keyboard shortcuts
  - `Cmd+K` / `Ctrl+K` - Open command palette
  - `h` - Go to home
  - `s` - Go to step planner
  - `f` - Go to full planner

### State Management

The application uses Zustand for global state with local storage persistence:

- Trip prompt
- Current step in questionnaire
- User answers
- Trip data

### Form Validation

Zod schemas are used for runtime validation:

- Prompt validation (min 1 char, max 10,000 chars)
- Type-safe form handling with React Hook Form

### Error Handling

Custom logger with:

- Console logging in development
- Log storage (last 1000 entries)
- Error context tracking
- Ready for external service integration (Sentry, LogRocket, etc.)

## 🎨 Shadcn-ui Components

To add Shadcn-ui components:

```bash
npx shadcn@latest add [component-name]
```

Example:

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
```

## 🔧 Configuration

### Tailwind CSS

Custom configuration in `tailwind.config.ts` with:

- Enuygun brand colors
- Extended color palette
- CSS variables for theming
- Custom border radius utilities

### TypeScript

Strict mode enabled with path aliases:

- `@/*` maps to `src/*`

### ESLint & Prettier

- ESLint extends Next.js config
- Prettier with 100 character line width
- Automatic formatting on save
- Pre-commit hooks ensure code quality

## 🚢 Deployment

The application is optimized for Vercel deployment:

```bash
npm run build
```

### Environment Variables

Create a `.env.local` file for local development:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

## 📝 Development Guidelines

1. **Component Structure**: Use "use client" directive only when needed
2. **Styling**: Use Tailwind utility classes; avoid inline styles
3. **State**: Use Zustand for global state, React hooks for local state
4. **Forms**: Always use React Hook Form + Zod validation
5. **API Calls**: Implement proper error handling with logger
6. **Types**: Maintain strict TypeScript types; avoid `any`

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass and code is formatted
4. Pre-commit hooks will run automatically
5. Submit a pull request

## 📄 License

Private project - All rights reserved

## 🙏 Acknowledgments

- Design inspired by [Enuygun](https://www.enuygun.com/)
- UI components from [Shadcn-ui](https://ui.shadcn.com/)
- Built with [Next.js](https://nextjs.org/)
