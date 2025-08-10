# Exchango - A Modern Currency Converter & Transfer Tracker

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)


![Exchango Screenshot](https://github.com/karindragimhan49/Exchango-/blob/056f1f493e88f196cb3aee7702216f8a62a97a0d/exchango-app/public/main.png) 


A feature-rich, frontend-focused currency conversion application built with Next.js and Tailwind CSS. Exchango provides real-time exchange rates, a seamless user experience, and personalized features like transfer history and favorite currency pairs, all powered by the browser's local storage.

**Live Demo:** [**exchango.netlify.app**](https://exchango.netlify.app) 

---

## ✨ Features

-   **Real-time Currency Conversion:** Fetches the latest exchange rates from a reliable API.
-   **Local Storage Authentication:** Secure and simple client-side user registration and login system. No backend required!
-   **Transfer History:** Logged-in users can view a complete history of their past conversions.
-   **Favorite Currency Pairs:** Users can save their most-used currency pairs for quick access.
-   **Interactive UI:**
    -   Country flags in dropdowns for easy identification.
    -   A quick "Swap" button to interchange currencies instantly.
-   **Responsive Design:** A clean, modern, and fully responsive interface that works on all devices.
-   **Polished UX:** Smooth scrolling, clean animations, and a professional profile dropdown menu.

---

## 🛠️ Tech Stack

-   **Framework:** Next.js (React)
-   **Styling:** Tailwind CSS
-   **UI Components:** Headless UI (for the profile dropdown)
-   **Form Components:** React Select (for customizable dropdowns with flags)
-   **State Management:** React Context API (for authentication and global state)
-   **Data Storage:** Browser Local Storage
-   **External APIs:** [ExchangeRate-API](https://www.exchangerate-api.com/) for currency data.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/exchango-app.git
    cd exchango-app
    ```
  

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of your project and add your ExchangeRate-API key.
    ```env
    NEXT_PUBLIC_EXCHANGE_RATE_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📜 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

## 👤 Contact

Karindra Gimhan 

-   GitHub: [@your-username](https://github.com/your-username) 

-   LinkedIn: [Your Name](https://linkedin.com/in/your-profile) 
