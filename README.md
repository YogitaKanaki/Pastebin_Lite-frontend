## Frontend UI

This repository contains the frontend UI for the Pastebin-Lite application.  
Users can create text pastes and view them using a shareable link.

The frontend communicates with a separately deployed Spring Boot backend API.

---

### Deployed URL
https://pastebin-lite-frontend-eight.vercel.app

---

### Tech Stack
- React (Create React App)
- React Router
- Axios
- Tailwind CSS
- Vercel (Deployment)

---

### Backend Dependency
The frontend connects to the Pastebin-Lite backend API deployed at:
https://pastebin-lite-backend-htn5.onrender.com

---

### How to Run Locally

#### Prerequisites
- Node.js 18+
- npm or yarn

#### Setup
1. Clone the repository
   ```bash
   git clone https://github.com/YogitaKanaki/Pastebin_Lite-frontend.git
   cd Pastebin_Lite-frontend
2. Install dependencies
   npm install
3. Create a .env file in the project root
   REACT_APP_API_BASE_URL=http://localhost:8080
4. Start the development server
   npm start
