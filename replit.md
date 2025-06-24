# CyberGuard - Cyberbullying Analysis & Response System

## Overview

CyberGuard is a full-stack web application designed to analyze cyberbullying comments using AI and provide strategic response recommendations. The system offers both manual parameter configuration and autopilot modes for comment analysis, with intelligent response generation based on selected communication strategies.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with TypeScript support

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **AI Integration**: OpenAI GPT-4o for comment analysis and response generation
- **Development**: tsx for TypeScript execution
- **Production**: esbuild for server bundling

### Key Components

#### Analysis Engine
- **Manual Mode**: User-configurable parameters for severity levels, categories, and context
- **Autopilot Mode**: Context-aware automatic analysis with relationship and reaction preferences
- **AI Analysis**: Comprehensive cyberbullying detection using linguistic patterns, emotional intensity, and communication theory

#### Strategy System
- **Predefined Strategies**: Six communication strategies (Deescalation, Direct Confrontation, Ignoring, Humor/Deflection, Educational Response, Empathetic Response)
- **Risk Assessment**: Low/Medium/High risk levels for each strategy
- **Category Classification**: Defensive, assertive, passive, deflective, informative, and empathetic approaches

#### Response Generator
- **Context-Aware**: Generates responses based on selected strategy and user context
- **Editable Output**: Users can modify generated responses before use
- **Copy/Share Functionality**: Easy distribution of generated responses

## Data Flow

1. **Comment Input**: User enters potentially harmful comment
2. **Mode Selection**: Choose between manual parameter configuration or autopilot
3. **Context Collection**: Gather relationship info and desired reaction type (autopilot only)
4. **AI Analysis**: OpenAI processes comment for cyberbullying indicators
5. **Strategy Recommendation**: System suggests appropriate communication strategies
6. **Response Generation**: AI creates tailored responses based on selected strategy
7. **User Review**: Edit and finalize response before deployment

## External Dependencies

### AI Services
- **OpenAI API**: GPT-4o model for natural language processing and response generation
- **Analysis Capabilities**: Linguistic pattern recognition, emotional intensity measurement, cyberbullying classification

### Database
- **Neon Database**: Serverless PostgreSQL for production
- **Local Development**: Can use local PostgreSQL or continue with Neon

### UI/UX Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first styling
- **class-variance-authority**: Component variant management

## Deployment Strategy

### Development
- **Local Server**: tsx for TypeScript execution with hot reload
- **Vite Dev Server**: Frontend development with HMR
- **Database**: Drizzle push for schema updates

### Production
- **Build Process**: Vite builds frontend, esbuild bundles backend
- **Server**: Node.js production server
- **Database**: Neon serverless PostgreSQL
- **Deployment Target**: Configured for autoscale deployment

### Environment Configuration
- **Database URL**: Required for Drizzle configuration
- **OpenAI API Key**: Required for AI functionality
- **Port Configuration**: 5000 (local) mapping to 80 (external)

## Changelog
- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.