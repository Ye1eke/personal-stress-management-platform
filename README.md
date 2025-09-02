# Personal Stress Management Platform

A comprehensive web-based stress management platform designed specifically for individuals in Kazakhstan. The platform provides personalized tools for stress assessment, daily mental health check-ins, guided exercises, and progress tracking.

## 🚀 Features

- **Personalized Stress Assessment** - Initial and periodic assessments with Kazakhstan-specific stressors
- **Daily Check-ins** - Quick 2-3 minute mood and stress level tracking
- **Guided Exercises** - 5-10 minute stress relief tools (breathing, meditation, mindfulness)
- **Progress Analytics** - Visual tracking of stress levels and patterns over time
- **Cultural Integration** - Content adapted for Kazakhstani culture and values
- **Multi-language Support** - Kazakh, Russian, and English
- **Local Resources** - Directory of Kazakhstan-based mental health professionals
- **Privacy-First** - Secure data handling with GDPR-equivalent compliance

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand (planned)
- **Routing**: React Router v6 (planned)
- **Internationalization**: react-i18next (planned)
- **PWA**: Service Workers for offline functionality (planned)
- **Testing**: Jest + React Testing Library + Cypress (planned)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── features/       # Feature-specific components
│   ├── layout/         # Layout components (Header, Footer, etc.)
│   └── ui/             # Base UI components (Button, Input, etc.)
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services and external integrations
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
├── assets/             # Static assets (images, icons)
├── contexts/           # React contexts (planned)
├── store/              # State management (planned)
└── lib/                # Third-party library configurations (planned)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## 🎨 Design System

The project uses a custom design system built with Tailwind CSS:

### Colors

- **Primary**: Deep blue (#1E40AF) - stability and trust
- **Secondary**: Warm gold (#F59E0B) - Kazakhstani cultural colors
- **Success**: Green (#10B981) - positive progress
- **Warning**: Amber (#F59E0B) - moderate stress levels
- **Danger**: Red (#EF4444) - high stress alerts

### Typography

- **Font**: Inter - optimized for multiple languages including Cyrillic
- **Responsive scale**: 14px to 48px with 1.5 line height

### Spacing

- **Base unit**: 8px for consistent spacing
- **Container**: Max-width 1200px for optimal reading

## 🌍 Internationalization

The platform supports three languages:

- **Kazakh (kk)** - Primary language for local users
- **Russian (ru)** - Widely spoken in Kazakhstan
- **English (en)** - International accessibility

## 🔒 Privacy & Security

- Client-side data encryption for sensitive information
- GDPR-compliant data handling
- Complete data deletion capabilities
- Secure session management
- No data sharing without explicit consent

## 📱 Progressive Web App

The platform is designed as a PWA with:

- Offline functionality for essential features
- Push notifications for check-in reminders
- Mobile-optimized interface
- Fast loading and caching

## 🧪 Testing Strategy

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Cypress for user journeys
- **Accessibility**: axe-core for WCAG compliance
- **Performance**: Lighthouse CI monitoring

## 🚀 Deployment

The application is built for production deployment with:

- Optimized bundle size with code splitting
- Progressive image loading
- CDN-ready static assets
- Environment-based configuration

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Please read our contributing guidelines and code of conduct before submitting pull requests.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.
