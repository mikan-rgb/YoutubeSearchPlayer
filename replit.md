# URLPlayer - YouTube Video Player Application

## Overview

URLPlayer is a modern YouTube video player application built with React and Express. It allows users to watch YouTube videos by entering URLs or searching for content, featuring a clean interface with video embedding, search functionality, and video recommendations.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom YouTube-themed design variables
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for server-side bundling

### Database & Storage
- **ORM**: Drizzle ORM with PostgreSQL support
- **Database**: PostgreSQL (configured via Neon serverless)
- **Migrations**: Drizzle Kit for schema management
- **Current Storage**: In-memory storage implementation with interface for future database integration

## Key Components

### Client-Side Components
1. **Header**: Navigation with search functionality and YouTube URL input
2. **VideoPlayer**: Embedded YouTube video player with URL loading capabilities
3. **SearchResults**: Display of search results and popular videos
4. **UI Components**: Comprehensive set of reusable components from shadcn/ui

### Server-Side Components
1. **Storage Interface**: Abstracted CRUD operations for user management
2. **Route Handler**: Express middleware for API endpoint management
3. **Vite Integration**: Development server with HMR support

### Shared Components
1. **Schema Definitions**: Drizzle ORM schemas with Zod validation
2. **Type Definitions**: Shared TypeScript interfaces

## Data Flow

1. **User Input**: Users can enter YouTube URLs or search queries through the header
2. **Video Loading**: URLs are parsed to extract video IDs and load embedded content
3. **Search Processing**: Search queries generate mock results (ready for API integration)
4. **State Management**: React Query handles caching and synchronization
5. **Storage Operations**: Currently uses in-memory storage, designed for easy database migration

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18+ with hooks and modern patterns
- **Database**: Drizzle ORM with PostgreSQL adapter
- **Validation**: Zod for schema validation and type safety
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **TypeScript**: Full type safety across the stack
- **Vite**: Fast development server and build tool
- **ESLint/Prettier**: Code quality and formatting (configured via components.json)

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev`
- **Process**: Concurrent React development server and Express API
- **Hot Reload**: Vite HMR for instant updates
- **Port**: 5000 (configured in .replit)

### Production Build
- **Client Build**: Vite builds React app to `dist/public`
- **Server Build**: esbuild bundles Express server to `dist/index.js`
- **Deployment**: Replit autoscale deployment target
- **Database**: Expects PostgreSQL connection via DATABASE_URL

### Infrastructure
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module
- **Build Process**: Two-stage build (client + server)
- **Process Management**: npm scripts for development and production

## Changelog

```
Changelog:
- June 14, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## Additional Notes

### Architecture Decisions
1. **Separation of Concerns**: Clear separation between client, server, and shared code
2. **Type Safety**: End-to-end TypeScript for better developer experience
3. **Scalable Storage**: Interface-based storage design allows easy migration from memory to database
4. **Modern Tooling**: Vite and esbuild for fast development and production builds
5. **Component Library**: shadcn/ui provides consistent, accessible UI components

### Future Considerations
- Database integration is configured but not yet implemented
- API routes are structured but not yet populated
- Storage interface is ready for PostgreSQL implementation
- Authentication system is scaffolded but not implemented