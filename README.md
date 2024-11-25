# 🎁 Gift Showcase

A modern **Next.js** application designed to demonstrate a cutting-edge tech stack for an e-commerce gift platform. It integrates advanced UI components, multilingual support, and state-of-the-art features, making it a perfect showcase for best practices in frontend development.

This project is complemented by an **Express backend**, serving as the application's API layer.

---

## 🚀 Features

- **Modern UI with Radix UI & Tailwind CSS**: Intuitive, customizable, and accessible components.
- **Localization**: Multilingual support using **i18next** and **react-i18next**.
- **Advanced Forms**: Validation powered by **React Hook Form** and **Zod**.
- **Interactive Visualizations**: Charts built with **Recharts** for rich analytics.
- **Server-Side Rendering (SSR)**, **Static Site Generation (SSG)**, and **Client-Side Rendering (CSR)** for a blazing-fast user experience.
- **Dark/Light Themes**: Theme preferences stored in cookies for a personalized experience.
- **State Management**: Simplified with hooks and context.
- **Error Handling**: Robust fallback UI using **React Error Boundary**.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js**: Version 15 with App Router.
- **React**: Version 18 for building UI components.
- **Tailwind CSS**: Custom styles and responsive design.
- **Radix UI**: Highly accessible primitives.
- **Lucide Icons**: Sleek, customizable icons.

### Backend
- **Express.js**: Serving the API for this project.
- **Prisma ORM**: Database schema and queries.

### Other Tools
- **Zod**: Schema validation.
- **i18next**: Multilingual support.
- **React Table**: Advanced table handling.
- **React Day Picker**: For calendars and date selection.
- **js-cookie**: Managing cookies for user preferences.
- **Faker.js**: Generating mock data for testing.

---

## 📂 Project Structure

```plaintext
├── public/               # Static assets  
├── src/                  # Main source code  
│   ├── components/       # Reusable UI components  
│   ├── pages/            # Next.js pages  
│   ├── styles/           # Tailwind CSS styles  
│   ├── hooks/            # Custom React hooks  
│   ├── utils/            # Utility functions  
│   ├── contexts/         # Context providers  
│   ├── locales/          # Language files for i18n  
│   └── services/         # API and backend communication  
```

## 💻 Installation & Setup
```
git clone https://github.com/your-repo/gift-showcase.git
cd gift-showcase
npm install
npm run dev
```


## 🌐 Localization
```
src/
└── locales/
    ├── en.json  # English translations
    └── fa.json  # Persian translations
```
