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
git clone https://github.com/YourUsername/YourRepoName.git
cd YourRepoName
