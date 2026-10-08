# CodeInsight

> **Understand how you code. Discover what you need to learn next.**

CodeInsight is an AI-powered coding analytics platform that analyzes a developer's problem-solving history across coding platforms to identify strengths, weaknesses, patterns, and opportunities for improvement.

The platform brings coding activity into one place and transforms raw problem-solving data into meaningful insights and personalized learning recommendations.

---

## 🚀 Vision

Developers solve hundreds of coding problems, but most platforms only show basic statistics such as solved counts, rankings, and difficulty distribution.

**CodeInsight goes further.**

It aims to answer questions such as:

* Which programming topics am I strongest at?
* Which topics consistently cause me problems?
* Do I perform better with easy, medium, or hard problems?
* How consistent is my problem-solving?
* Which patterns appear in my failed attempts?
* Which skills are improving over time?
* What should I practice next?
* What difficulty level should I attempt next?

---

## ✨ Planned Features

### 🔐 Authentication

* User registration
* Secure password hashing
* JWT-based authentication
* Protected routes
* User profiles

### 📊 Coding Analytics

* Problem-solving statistics
* Topic-wise performance
* Difficulty-wise performance
* Success and failure analysis
* Attempt analysis
* Coding activity trends
* Platform comparison
* Consistency tracking
* Strength identification
* Weakness identification

### 🤖 AI / Machine Learning

CodeInsight will use machine learning to identify deeper patterns in coding behavior.

Planned capabilities include:

* Problem/topic classification
* Skill profiling
* Weakness pattern detection
* Performance clustering
* Difficulty prediction
* Personalized coding insights
* Learning recommendations

### 🎯 Personalized Learning

Based on a user's coding history, CodeInsight will eventually generate:

* Recommended problems
* Target topics
* Difficulty progression
* Personalized learning paths
* Weekly coding goals
* Skill improvement suggestions

---

## 🏗️ Architecture

CodeInsight is designed as a modular full-stack application.

```text
                    ┌──────────────────────┐
                    │      React Client    │
                    │   Dashboard / UI     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │      REST API        │
                    └───────┬───────┬──────┘
                            │       │
                ┌───────────┘       └────────────┐
                ▼                                ▼
      ┌──────────────────┐             ┌──────────────────┐
      │    MongoDB       │             │  Platform Data   │
      │ Users / Submissions│            │    Ingestion     │
      └──────────────────┘             └──────────────────┘
                                                │
                                                ▼
                                     ┌────────────────────┐
                                     │ Python ML Service   │
                                     │ FastAPI             │
                                     │ Pandas / NumPy      │
                                     │ Scikit-learn / NLP  │
                                     └────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* HTML
* CSS
* GSAP / Three.js where appropriate

### Backend

* Node.js
* Express.js
* REST APIs
* JWT
* bcrypt

### Database

* MongoDB
* Mongoose

### AI / Machine Learning

* Python
* FastAPI
* Pandas
* NumPy
* Scikit-learn
* NLP libraries where required

### Development & Testing

* Git
* GitHub
* Postman
* MongoDB Compass
* VS Code

---

## 📦 Data Model

CodeInsight uses a normalized internal representation for coding submissions so that analytics and ML systems remain independent of the original coding platform.

A submission can contain information such as:

```text
platform
userId
problemId
problemTitle
difficulty
topics
status
language
submittedAt
attempts
solveTime
```

This allows the analytics engine to work with data from different sources without depending directly on a particular platform.

---

## 🔄 Development Roadmap

The project is being developed in four major stages.

### Stage 1 — Data & Platform Foundation

* [x] Project setup
* [x] Express server
* [x] MongoDB connection
* [x] User model
* [x] User registration API
* [x] Password hashing
* [x] Login API
* [ ] JWT authentication
* [ ] Protected routes
* [ ] React authentication UI
* [ ] User dashboard
* [ ] Coding platform data import

### Stage 2 — Coding Analytics Engine

* [ ] Submission normalization
* [ ] Topic-wise analysis
* [ ] Difficulty analysis
* [ ] Success/failure analysis
* [ ] Attempt analysis
* [ ] Coding activity trends
* [ ] Platform comparison
* [ ] Consistency analysis
* [ ] Strength detection
* [ ] Weakness detection

### Stage 3 — ML Intelligence

* [ ] Feature engineering
* [ ] Topic classification
* [ ] Skill profiling
* [ ] Clustering
* [ ] Weakness pattern detection
* [ ] Difficulty prediction
* [ ] Model evaluation
* [ ] Python ML API
* [ ] Node.js ↔ ML service integration

### Stage 4 — Personalized Learning

* [ ] Personalized recommendations
* [ ] Recommended problems
* [ ] Difficulty progression
* [ ] Learning paths
* [ ] Weekly goals
* [ ] AI-generated insights
* [ ] Progress tracking

---

## 🔐 Security

Security is an important part of the platform.

The application is designed to use:

* Password hashing with bcrypt
* JWT authentication
* Environment variables for secrets
* Protected API routes
* Input validation
* Secure database access
* No storage of third-party platform passwords

Platform integrations will use authorized APIs or supported data-import mechanisms where available.

---

## 📁 Project Structure

The project is organized to keep the frontend, backend, and ML components modular.

```text
CodeInsight/
│
├── client/
│   └── React application
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── ml-service/
│   ├── models/
│   ├── services/
│   ├── preprocessing/
│   └── main.py
│
└── README.md
```

---

## 🧪 API Development

The backend APIs are developed and tested using **Postman** before frontend integration.

Example registration endpoint:

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "Jesse",
  "email": "jesse@example.com",
  "password": "your-password"
}
```

---

## 📈 Long-Term Goal

CodeInsight aims to become more than a coding statistics dashboard.

The goal is to build an intelligent developer learning system that understands **how a person solves problems**, identifies the areas holding them back, and continuously adapts their learning path.

```text
Coding Activity
       ↓
Data Collection
       ↓
Normalization
       ↓
Analytics
       ↓
Machine Learning
       ↓
Skill Profile
       ↓
Personalized Recommendations
       ↓
Better Problem Solving
```

---

## 👨‍💻 Author

**Jesse Priyanshu Simes**
Software Engineering · AI/ML · Full-Stack Development

**S Dhanush**
Backend Developer

**Rahul**
Software Engineering: Testing and creating end-to-end pipelines

---

## 📌 Project Status

🚧 **Currently in active development**

The project is currently focused on building the authentication, backend, database, and core platform foundation before implementing the analytics and ML layers.
