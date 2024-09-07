# T1 Tasks

Welcome to the **Goods4You** project! This project is built using React, TypeScript, and Vite. It includes a set of configurations and dependencies to help you to build, and preview this application efficiently.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Dev Dependencies](#dev-dependencies)
- [Author](#author)

## Getting Started

To get started with the project, follow the steps below:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Annebula77/T1-tasks
   cd t1-tasks
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

```bash
npm run dev
```

4. **Build the project:**

```bash
npm run build
```

5. **Preview the production build:**

```bash
npm run preview
```

## Features

- **React 18**: Utilizes the latest version of React for building user interfaces.
- **TypeScript**: Provides static type-checking along with modern JavaScript features.
- **Vite**: A fast build tool and development server optimized for React.
- **React Router DOM**: For managing routing and navigation within the application.
- **ESLint**: Ensures code quality and enforces consistent code style.
- **Prettier**: An opinionated code formatter integrated with ESLint.

## Available Scripts

- **`npm run dev`**: Starts the development server using Vite.
- **`npm run build`**: Builds the project for production, running TypeScript checks and bundling files using Vite.
- **`npm run lint`**: Runs ESLint to analyze the code for potential issues.
- **`npm run preview`**: Previews the production build locally.
- **`npm run storybook`**: Runs Storybook.

## Dependencies

- **normalize.css**: A modern, HTML5-ready alternative to CSS resets.
- **react**: A JavaScript library for building user interfaces.
- **react-dom**: The entry point of the DOM-related rendering paths.
- **react-helmet-async**: A thread-safe `Helmet` component to manage the document head.
- **react-router-dom**: A routing library for React applications.

## Dev Dependencies

- **@eslint/js**: ESLint configuration for JavaScript.
- **@types/react**: TypeScript definitions for React.
- **@types/react-dom**: TypeScript definitions for React DOM.
- **@types/react-helmet**: TypeScript definitions for React Helmet.
- **@vitejs/plugin-react**: Official Vite plugin to support React.
- **eslint**: A tool for identifying and fixing code quality issues.
- **eslint-plugin-prettier**: Runs Prettier as an ESLint rule.
- **eslint-plugin-react-hooks**: Linting rules for React Hooks.
- **eslint-plugin-react-refresh**: Enables fast refresh for React during development.
- **globals**: Global variables for ESLint.
- **typescript**: TypeScript compiler.
- **typescript-eslint**: TypeScript integration for ESLint.
- **vite**: Next generation frontend tooling.
- **Lodash**: Added as a utility library.
- **React Redux, Redux Toolkit, and Redux Toolkit Query**: These libraries are included as essential for state management.
- **Storybook**: A tool for developing UI components in isolation for React.
- **React Toastify**: Used for notifications.
- **Zod**: A TypeScript-first schema declaration and validation library.
- **Vitest**: A fast unit test framework.
- **Testing Library (React & Jest DOM)**: Utilities for testing React components.

## Testing

This project is set up for unit and integration testing using the following libraries:

- **Vitest (^2.0.5)**: A fast, lightweight test runner.
- **@testing-library/react (^16.0.0)**: Provides utilities to test React components in a user-centric way.
- **@testing-library/jest-dom (^6.5.0)**: Custom jest matchers to test the state of the DOM.

## Installation Tips

If you encounter any issues installing dependencies due to conflicts with peer dependencies, you can use the following command to install them while ignoring peer dependency conflicts:

```bash
npm install --save-dev --legacy-peer-deps
```

This command will allow you to bypass the peer dependency conflicts that might arise during the installation process.

## Author

👧 **Gohar Vardanyan**
