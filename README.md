# Personal Tracker + Challenge System

A simple web app to track daily habits (sleep, water intake, and exercise), calculate a wellness score, join challenges, and earn badges!

## 🌟 Features

- ✅ Track daily habits: Sleep (hrs), Water (liters), Exercise (minutes)
- 📊 Calculate a wellness score based on your inputs
- 📝 View past 30 habit logs with score and status
- 🎯 Join and complete habit-based challenges
- 🏅 Earn badges for completed challenges
- 📦 Backend with Express.js & MongoDB, Frontend with React

## 🛠️ Setup Instructions

### 🔧 Backend

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/tracker-app.git
   cd tracker-app/backend
Install dependencies

bash
Copy
Edit
npm install
Create .env file
Add your MongoDB connection string:

ini
Copy
Edit
MONGO_URI=mongodb+srv://<your-mongo-uri>
PORT=5000
Run the server

bash
Copy
Edit
node index.js
or with nodemon:

bash
Copy
Edit
nodemon index.js
💻 Frontend
Navigate to frontend folder

bash
Copy
Edit
cd ../frontend
Install dependencies

bash
Copy
Edit
npm install
Create .env file
Point to your backend API:

bash
Copy
Edit
REACT_APP_API_URL=http://localhost:5000/api
Start the React app

bash
Copy
Edit
npm start
📌 Folder Structure
bash
Copy
Edit
/backend
  ├── index.js (Express server and API routes)
  ├── models (Mongoose schemas for HabitLog, Challenge, Badge)
  └── .env
/frontend
  ├── App.js (React component)
  ├── App.css
  └── .env
🔒 Environment Variables
MONGO_URI: Your MongoDB connection string

PORT: Backend server port

REACT_APP_API_URL: Frontend uses this to connect to backend

🧪 Example Challenge Badges
Water Warrior – Complete the water challenge

Exercise Enthusiast – Complete the exercise challenge
