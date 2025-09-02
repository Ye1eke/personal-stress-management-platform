# Stress-Free Relationships

A comprehensive web platform designed to help couples in Kazakhstan manage stress and build stronger relationships. The platform provides assessment tools, daily check-ins, guided conversations, and local resources in Kazakh and Russian languages.

## Features

- **Stress Assessment**: Comprehensive evaluation of stress levels and relationship impact
- **Daily Check-ins**: Track mood, stress, and relationship quality over time
- **Guided Conversations**: Structured prompts to improve communication
- **Local Resources**: Directory of Kazakhstan-based therapists and support groups
- **Multi-language Support**: Available in Kazakh, Russian, and English

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Code Quality**: ESLint + Prettier
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd stress-free-relationships

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components
│   └── features/     # Feature-specific components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
├── services/         # API services
└── assets/           # Static assets
```

## Contributing

1. Follow the existing code style
2. Run `npm run lint` and `npm run format` before committing
3. Ensure TypeScript types are properly defined
4. Write meaningful commit messages

## License

MIT License
