<div align="center">
  <img src="https://raw.githubusercontent.com/vuetifyjs/vuetify/master/docs/public/logo.svg" alt="ProTasker Logo" width="120" />

# ProTasker 🚀

**A premium, fast, and feature-rich Todo Application built with Vue 3, Vite, and Vuetify 3.**

[![Vue.js](https://img.shields.io/badge/Vue%203-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite%205-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vuetify 3](https://img.shields.io/badge/Vuetify%203-1867C0?style=for-the-badge&logo=vuetify&logoColor=white)](https://vuetifyjs.com/)

</div>

---

## 📖 Overview

ProTasker is a modern task management SPA (Single Page Application) that aims to deliver a seamless and highly productive user experience. Originally a basic Vue 2 app, it has been completely rewritten using the **Vue 3 Composition API**, **TypeScript**, and **Vite** to ensure ultimate performance and maintainability.

The application operates completely offline using browser `localStorage`, ensuring maximum privacy and instant loading times.

## ✨ Key Features

- 🌗 **Dark/Light Mode**: Elegant theme toggler with persistent user preferences.
- ⚡️ **Live Search & Filters**: Instantly find tasks using the search bar or filter by completion status (All, Active, Completed).
- 🏷️ **Categories & Priorities**: Organize your tasks by categories (Work, Personal, etc.) and set priorities (High, Medium, Low).
- 📅 **Due Dates**: Assign deadlines to your tasks. Overdue tasks are automatically highlighted to keep you on track.
- 📊 **Progress Statistics**: Visual progress bar showing your daily completion rate.
- 💾 **Local Storage**: 100% private data storage right in your browser.
- 📱 **Fully Responsive**: Beautiful interface across desktops, tablets, and smartphones.

## 🛠️ Technologies & Architecture

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API & `<script setup>`)
- **Build Tool**: [Vite 5](https://vitejs.dev/)
- **UI Library**: [Vuetify 3](https://vuetifyjs.com/) (Material Design Components)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [Vue Router 4](https://router.vuejs.org/)
- **Icons**: [Material Design Icons (MDI)](https://materialdesignicons.com/)

The project follows a **Clean Architecture** approach by separating views (`Home`, `About`, `TodoDetails`) from reusable UI components (`TaskItem`, `TaskInput`, `TaskFilter`, `TaskStats`), and extracting the business logic into composables (`useTodos`).

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have Node.js installed on your machine.

- Node.js (v18.x or newer recommended)
- npm (v9.x or newer)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/laith-alskaf/vuejs-todo-app.git
   ```
2. Navigate to the project directory
   ```bash
   cd vuejs-todo-app
   ```
3. Install NPM packages
   ```bash
   npm install
   ```
4. Run the development server
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`

## 🏗️ Project Structure

```text
src/
├── components/          # Reusable Vue components
│   ├── TaskFilter.vue   # Search and status filters
│   ├── TaskInput.vue    # Task creation form
│   ├── TaskItem.vue     # Individual task display
│   └── TaskStats.vue    # Progress bar and stats
├── composables/         # Reusable Composition API logic
│   └── useTodos.ts      # LocalStorage & Todo state management
├── router/              # Vue Router configuration
│   └── index.ts
├── views/               # Main application pages
│   ├── About.vue
│   ├── Home.vue
│   └── TodoDetails.vue
├── App.vue              # Main Application layout (App Bar, Drawer)
└── main.ts              # Application entry point & Vuetify initialization
```

<div align="center">
  <i>Built with ❤️ using Vue 3 and Vuetify</i>
</div>
