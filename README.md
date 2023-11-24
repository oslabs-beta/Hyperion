# Hyperion

<div align="center">
  <img src="assets/logo.jpg" alt="Hyperion Logo" width="200"/>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)](https://nodejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
</div>

## Overview

**Hyperion** is a comprehensive PostgreSQL performance analysis tool that enables developers and database administrators to test and compare actual dynamic query runtimes with PostgreSQL's EXPLAIN ANALYZE profiling estimates. By providing detailed performance metrics and statistical analysis, Hyperion helps optimize database performance and validate query optimization strategies.

> **⚠️ Security Notice:** Before using Hyperion, please review our [Security Policy](SECURITY.md). Using this application constitutes acknowledgment of the disclaimers presented in that document.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)

## Features

### 🗄️ **Database Management**
- **Flexible Connection Options**: Connect to PostgreSQL databases using either connection URIs or manual connection parameters
- **Multiple Database Support**: Manage and switch between multiple database connections
- **Secure Credential Storage**: Encrypted storage of database credentials

<div align="center">
  <img src="assets/addingdatabase.gif" alt="Adding Database Demo" width="600"/>
</div>

### 🔍 **Query Management**
- **Interactive Query Editor**: Write and manage SQL queries with syntax highlighting
- **Parameter Placeholders**: Support for parameterized queries with dynamic values
- **Query Organization**: Save, edit, and organize queries by database

<div align="center">
  <img src="assets/addingquery.gif" alt="Adding Query Demo" width="600"/>
</div>

### 📊 **Performance Testing**
- **Dual Measurement System**: Compare actual CPU runtime with EXPLAIN ANALYZE estimates
- **Statistical Analysis**: Comprehensive statistics including min, max, median, standard deviation, and quartiles
- **Visual Data Representation**: Interactive charts and graphs powered by Plotly.js
- **Configurable Test Parameters**: Adjust connection limits, throttling, and repetition counts

<div align="center">
  <img src="assets/RunningTest.gif" alt="Running Test Demo" width="600"/>
</div>

### 📈 **Analytics & Insights**
- **Performance Comparison**: Side-by-side comparison of predicted vs. actual query performance
- **Historical Data**: Track query performance over time
- **Export Capabilities**: Export results for further analysis

## Demo

🚀 **[Try Hyperion Live](https://hyperion-demo.example.com)** *(Coming Soon)*

## Installation

### Prerequisites

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (for testing)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/oslabs-beta/hyperion.git
   cd hyperion
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Build the application**
   ```bash
   npm run build
   ```

5. **Start the application**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:8080`.

### Development Setup

For development with hot reloading:

```bash
npm run dev
```

This will start both the backend server and frontend development server concurrently.

### Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database Configuration (for application data)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hyperion
DB_USER=your_username
DB_PASSWORD=your_password

# Security
JWT_SECRET=your_jwt_secret
BCRYPT_ROUNDS=12

# Email Configuration (optional)
SENDGRID_API_KEY=your_sendgrid_key
```

## Usage

### Getting Started

1. **Create an Account**: Sign up with your email and create a secure password
2. **Add a Database**: Connect to your PostgreSQL database using either:
   - **Connection URI**: `postgres://username:password@host:port/database`
   - **Connection Parameters**: Individual host, port, database, username, and password
3. **Create Queries**: Write SQL queries and save them for testing
4. **Run Performance Tests**: Execute queries and analyze the performance metrics
5. **Review Results**: Compare actual runtime with PostgreSQL's estimates

### Best Practices

- **Start with Simple Queries**: Begin with basic SELECT statements to understand the tool
- **Use Parameters**: Leverage parameterized queries for testing with different data sets
- **Monitor Resource Usage**: Be mindful of query impact on production databases
- **Analyze Patterns**: Look for consistent differences between estimated and actual runtimes

## API Documentation

Hyperion provides a comprehensive REST API for programmatic access. For detailed API documentation, see [API.md](API.md).

### Key Endpoints

- `POST /api/user/new` - User registration
- `POST /api/user/login` - User authentication
- `POST /api/db/new` - Add database connection
- `POST /api/query/new` - Create new query
- `POST /api/db/runtests` - Execute performance tests

## Technologies

### Frontend
- **React** (17.0.2) - UI framework
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **Material-UI** - Component library
- **Plotly.js** - Data visualization
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** (pg) - Database driver
- **bcrypt** - Password hashing
- **JWT** - Authentication tokens

### Development & Build Tools
- **Webpack** - Module bundling
- **Babel** - JavaScript compilation
- **ESLint** - Code linting
- **Jest** - Testing framework
- **Sass** - CSS preprocessing

## Contributing

We welcome contributions to Hyperion! Please follow these steps:

1. **Fork the Repository**
2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Reporting Issues

Found a bug or have a suggestion? Please [open an issue](https://github.com/oslabs-beta/hyperion/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs. actual behavior
- Environment details

## Team

Hyperion was created and is maintained by:

- **[Olivia Carlisle](https://github.com/ogc1)** - Full Stack Developer
- **[Sankari Ayyaluru](https://github.com/sankari-ayyaluru)** - Full Stack Developer
- **[Celene Chang](https://github.com/celene-chang)** - Full Stack Developer  
- **[Nick Ozawa](https://github.com/nick-ozawa)** - Full Stack Developer

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

<div align="center">
  <p>Made with ❤️ by the Hyperion Team</p>
  <p><a href="https://github.com/oslabs-beta/hyperion">⭐ Star us on GitHub</a></p>
</div>
