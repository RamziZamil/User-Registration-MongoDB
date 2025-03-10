# 🚀 User Authentication API Backend & React Frontend

## 🖥️ Backend:
- **Platform:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB Atlas (via Mongoose)  
- **Authentication:** JWT (stored in HTTP-only cookies)

## 🎨 Frontend:
- **Library:** React  
- **UI Components:** Material-UI (MUI)  
- **Notifications:** SweetAlert2

## ✨ Features:
- **User Registration:** Securely register users with hashed passwords.
- **User Login:** Authenticate users using JWT; tokens are stored in HTTP-only cookies.
- **Protected Routes:** Access a user profile only with valid credentials.
- **Notifications:** SweetAlert pop-ups display success messages (including token display on login) and error messages.
- **State Isolation:** Registration and login forms use separate states to avoid overlapping inputs.

## 📝 Note:
- Ensure your environment variables in the `.env` file are correctly configured:
  - `MONGO_URI`: Your MongoDB Atlas connection string.
  - `JWT_SECRET`: Your secret key for JWT generation.
  - `PORT`: The port on which your backend server runs (e.g., 5000).

## ⚙️ Installation:

### 🔽 Clone the Repository:
```bash
git clone https://github.com/RamziZamil/User-Registration-MongoDB.git
cd User-Registration-MongoDB
```
## 🔧 Backend Setup:
1. Navigate to the backend folder (if your project is split into folders):
```bash
cd backend
```
2. Install dependencies:
```bash
npm install express mongoose bcryptjs jsonwebtoken cookie-parser cors dotenv
```

3. Create a .env file at the root with the following content:
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/auth_demo?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
PORT=5000
```
4. Start the server:
```bash
nodemon server.js
```
🎨 Frontend Setup:
1. Navigate to the frontend folder (if applicable):
```bash
cd frontend

```

2. Install dependencies:
```bash
npm install
npm install @mui/material @emotion/react @emotion/styled sweetalert2 axios
```

3. Start the development server:
```bash
npm run dev
```







