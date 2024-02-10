# Code-Challenge-2024
Dynamix Code Challenge for Frontend Developer Applications

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- npm (Node Package Manager)

You can download Node.js (which includes npm) from [nodejs.org](https://nodejs.org/).

### Forking the Repository

Start by forking the repository to your own GitHub account. This creates a copy of the repository under your account, allowing you to make changes without affecting the original project.

1. Go to the original repository on GitHub.
2. Click the "Fork" button at the top right corner.

### Cloning the Repository

After forking, clone the repository to create a local copy on your computer. Replace `YourUsername` with your GitHub username.

```bash
git clone https://github.com/YourUsername/project-name.git
cd project-name
```

### Installing Dependencies

In the project directory, install the required npm packages:

```bash
npm install
```
### Initialization Script

Its good practice to start with initializing the project. To do this run:

```bash
npm run initialize
```

### Using Webpack with ESLint and StyleLint

This project uses Webpack for bundling, along with eslint and stylelint to ensure code quality and style consistency. The Webpack configuration includes loaders that run eslint and stylelint as part of the build process, automatically checking your JavaScript and CSS for common errors and style violations.

Watching for File Changes
To automatically rebuild your project when files change, use:

```bash
npm run watch
```

### Pre-Commit Hooks
To maintain code quality, this project uses pre-commit hooks that run eslint and stylelint before each commit, ensuring that only valid code is committed to the repository. If any errors are found, the commit will be aborted, and you will need to fix the issues before trying to commit again.

You can manually run the linters with the following commands:

```bash
npm run lint:js
npm run lint:css
```