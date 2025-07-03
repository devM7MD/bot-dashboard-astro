# <p align="center">Discord Bot Dashboard Using Astro :robot:</p>

<p align="center">
  <img src="https://github.com/devM7MD/bot-dashboard-astro/blob/main/screenshots/overview.png" alt="MyBot Dashboard Logo" width="1980" />
</p>

<p align="center">
  A modern, feature-rich dashboard for Discord bot management built with Astro and TailwindCSS.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-deployment">Deployment</a>
</p>

<div align="center">

![License](https://img.shields.io/github/license/devM7MD/bot-dashboard-astro)
![Stars](https://img.shields.io/github/stars/devM7MD/bot-dashboard-astro?style=social)
![Last Commit](https://img.shields.io/github/last-commit/devM7MD/bot-dashboard-astro)

</div>

## ✨ Features

- 🎨 Modern, responsive design with dark mode
- 📊 Comprehensive dashboard overview
- ⚡️ Fast and optimized performance
- 🔒 User authentication and authorization
- 🎮 Server management interface
- 💳 Premium plans and billing system
- 🛠 Command management system
- 📱 Mobile-friendly interface

## 📸 Screenshots

<div align="center">
  <!-- Add your screenshots here -->
  <img src="https://github.com/devM7MD/bot-dashboard-astro/blob/main/screenshots/overview.png" alt="Dashboard Overview" width="800"/>
  <br/>
  <em>Dashboard Overview</em>
  
  <br/><br/>
  
  <img src="https://github.com/devM7MD/bot-dashboard-astro/blob/main/screenshots/plans.png" alt="Premium Plans" width="800"/>
  <br/>
  <em>Premium Plans</em>
  
  <br/><br/>
  
  <img src="https://github.com/devM7MD/bot-dashboard-astro/blob/main/screenshots/commands.png" alt="Command Management" width="800"/>
  <br/>
  <em>Command Management</em>
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or pnpm
- Git

### Installation

**Important Note:** The backend server must be running for the dashboard to manage commands and settings. Due to current environment limitations with `run_in_bash_session` (specifically `getcwd()` errors), the backend's `npm install` and startup commands could not be verified by the AI. Please ensure you can run these commands successfully in your local environment.

**1. Clone the Repository**
```bash
git clone https://github.com/devM7MD/bot-dashboard-astro.git
cd bot-dashboard-astro
```

**2. Backend Setup**

The backend server handles API requests for managing commands and settings.

   a. Navigate to the backend directory:
      ```bash
      cd backend
      ```

   b. Install backend dependencies:
      ```bash
      # Using npm
      npm install
      ```
      This will install `express` and `sqlite3` as defined in `backend/package.json`.

   c. Start the backend server:
      ```bash
      # Using npm (runs server.js)
      npm start
      ```
      Alternatively, you can run `node server.js`.
      The backend server will start on `http://localhost:3000` by default. You should see a console message "Server is running on http://localhost:3000" and "Connected to the SQLite database.". A `mydiscordbot.db` file will be created in the `backend` directory if it doesn't exist.

**3. Frontend (Astro Dashboard) Setup**

   a. Navigate back to the project root directory (if you were in the `backend` directory):
      ```bash
      cd ..
      ```

   b. Install frontend dependencies:
      ```bash
      # Using npm
      npm install

      # Using pnpm
      pnpm install
      ```

   c. Create environment variables (if applicable for your setup, though not strictly needed for current features beyond what's in the repo):
      ```bash
      # cp .env.example .env
      # Fill in .env with your specific variables if you extend the project
      ```

   d. Start the frontend development server:
      ```bash
      # Using npm
      npm run dev

      # Using pnpm
      pnpm dev
      ```
      The Astro frontend application will be available at `http://localhost:4321`.

**Frontend-Backend Interaction**

*   The frontend (Astro) makes API calls to the backend (Express.js server).
*   The API base URL is configured in the frontend scripts (e.g., in `src/pages/dashboard/commands.astro`) to point to `http://localhost:3000/api`.
*   Ensure both the backend server (port 3000) and the frontend development server (port 4321) are running simultaneously to use the dashboard features.

## 🛠 Tech Stack

- [Astro](https://astro.build) - Web Framework
- [TailwindCSS](https://tailwindcss.com) - Styling
- [TypeScript](https://www.typescriptlang.org) - Language

## 📦 Project Structure

```
/
├── public/
├── screenshots/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── env.d.ts
├── README.md
├── astro.config.mjs
├── package.json
└── tailwind.config.mjs
```

## 🌟 Customization

### Styling

The project uses TailwindCSS for styling. You can customize the theme in `tailwind.config.cjs`:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...}
      }
    }
  }
}
```

## 🚀 Deployment

### Build

```bash
# Using npm
npm run build

# Using pnpm
pnpm build
```

### Preview

```bash
# Using npm
npm run preview

# Using pnpm
pnpm preview
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Astro community
- TailwindCSS team
- All contributors

## 📞 Support

- Create an issue
- Website: https://www.devm7md.xyz/
- Email: mhmdabas899@gmail.com

---

<p align="center">
  Made with ❤️ by devM7MD ( Mohamed Abbas )
</p>
