
# 🍽️ MessMind AI
### AI-Powered Mess Feedback & Sentiment Intelligence

<p align="center">

**Turn 10-Second Student Feedback into Actionable Mess Intelligence**

A full-stack platform that transforms hostel mess feedback into structured data, AI-powered sentiment intelligence, recurring-issue detection, analytics, evidence, and actionable recommendations.


# 🚀 PROJECT DEPLOYED

## 🌐 Live Demo

**MessMind  is successfully deployed and live!**

👉 **[🔗 Open MessMind AI](https://mess-feedback-digest-vibe-code-hack.vercel.app/)**

> **Frontend Deployment:** Vercel  
> **Backend Deployment:** Render  
> **Backend Framework:** Django REST Framework  
> **Status:** 🟢 Live

**[🔴 Watch Demo Video](https://raw.githubusercontent.com/maazsiddiqui79/Mess-Feedback-Digest--VIBE-CODE-HACKATHON/main/docs/MessMind.mp4)** (docs/MessMind.mp4)

---

[![React](https://img.shields.io/badge/Frontend-React%2019-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Django](https://img.shields.io/badge/Backend-Django%205.2-092E20?logo=django&logoColor=white)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/API-Django%20REST%20Framework-A30000)](https://www.django-rest-framework.org/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Tailwind](https://img.shields.io/badge/UI-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![AI](https://img.shields.io/badge/AI-Groq-FF4F00)](https://groq.com/)

</p>

---

## 🏆 Vibe Coding Hackathon Project

**MessMind AI is a Vibe-Coded full-stack application built specifically for a Vibe Coding Hackathon.**

The project was developed using **Google Antigravity** and an AI-assisted engineering workflow based on structured requirements, architecture, implementation planning, iterative development, validation, and human review.

The objective was not to create a visual prototype alone, but to build a functional product with:

- Real backend persistence
- Authentication and role-based access
- AI-powered analysis
- Analytics and reporting
- Media handling
- Community features
- Moderation
- Action management
- Audit logging
- Responsive UX
- Error handling
- Edge-case protection

> **Vibe-coded does not mean prototype-only.**
>
> A feature is considered complete only when its complete flow, validation, persistence, permissions, failure states, and edge cases are handled.

---

# 📑 Contents

- [🎯 Problem Statement](#-problem-statement)
- [💡 Solution](#-solution)
- [👥 Target Users](#-target-users)
- [✨ Features](#-features)
- [🚀 What Makes MessMind Different](#-what-makes-messmind-different)
- [🧠 System Workflow](#-system-workflow)
- [🏗️ Architecture](#️-architecture)
- [🗄️ Data & AI Architecture](#️-data--ai-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [📂 Project Structure](#-project-structure)
- [🎥 Product Demo](#-product-demo)
- [⚙️ Installation](#️-installation)
- [🔑 Environment Variables](#-environment-variables)
- [🔐 Security & Reliability](#-security--reliability)
- [📱 Responsive Design](#-responsive-design)
- [🤖 Vibe Coding Workflow](#-vibe-coding-workflow)
- [🚀 Future Enhancements](#-future-enhancements)
- [👥 Team](#-team)
- [🏁 Hackathon Summary](#-hackathon-summary)

---

# 🎯 Problem Statement

## Campus Services & Sentiment Analytics

A hostel mess may serve hundreds of students multiple times every day, yet feedback is often scattered across verbal complaints, messages, isolated ratings, comments, photos, videos, and delayed reports.

This creates two problems:

- **Students** need a fast and frictionless way to report their experience.
- **Mess managers** cannot realistically read and interpret hundreds of individual responses every day.

### Core Challenge

> **How might we collect quick student feedback about meals and transform it into a concise, reliable, actionable daily intelligence system for mess managers?**


---

# 💡 Solution

## MessMind AI

MessMind AI converts individual student experiences into structured operational intelligence.

Instead of forcing managers to manually read hundreds of comments, the platform combines:

| Input | Intelligence |
|---|---|
| ⭐ Ratings | Meal performance |
| 🏷️ Issue Tags | Recurring problems |
| 👍 Positive Tags | Positive signals |
| 💬 Text | Detailed context |
| 📷 Photos | Visual evidence |
| 🎥 Videos | Rich visual evidence |
| 🤖 AI Analysis | Sentiment, themes & severity |
| 📈 Analytics | Trends and patterns |
| 🔍 Duplicate Detection | Cleaner feedback data |
| 📋 Actions | Operational response |
| 📊 Outcomes | Post-resolution comparison |

The complete product loop is:

```text
Feedback
   ↓
Analysis
   ↓
Intelligence
   ↓
Action
   ↓
Resolution
   ↓
Outcome
```

---

# 👥 Target Users

### 🎓 Students

- Rate meals
- Report problems
- Select issue and positive tags
- Write comments
- Submit voice feedback
- Upload photos and videos
- Create community posts
- Comment and react
- Participate in polls
- Report inappropriate content

### 🧑‍💼 Mess Committee / Managers

- Monitor mess sentiment
- View ratings and trends
- Identify recurring issues
- Inspect evidence
- Read AI-generated daily summaries
- Review recommendations
- Create corrective actions
- Assign and track actions
- Resolve issues
- Compare outcomes

### 🛡️ Administrators

- Manage students and accounts
- Manage meals
- Review feedback and media
- Moderate community content
- Manage actions and reports
- Review AI insights
- Access audit logs
- Suspend and restore accounts

---

# ✨ Features

## 🎓 Student Feedback

### Fast Meal Rating

A student can rate the current meal with minimal interaction.

### Structured Feedback

Issue and positive tags provide structured signals for recurring problems and positive experiences.

Supported feedback can include:

- Taste
- Quantity
- Hygiene
- Temperature
- Quality
- Delay
- Variety
- Custom comments

### Rich Media Feedback

Students can optionally provide:

- 🎙️ Voice
- 📷 Photos
- 🎥 Videos

### Duplicate Protection

Repeated submissions and accidental repeated interactions are handled to prevent unnecessary duplicate records.

---

## 🤖 AI Intelligence

AI is integrated directly into the feedback pipeline rather than being added as a standalone chatbot.

### Processing Pipeline

```text
Raw Feedback
     ↓
Validation
     ↓
Persistence
     ↓
AI Processing
     ↓
Speech / Language Processing
     ↓
Sentiment
     ↓
Themes
     ↓
Severity
     ↓
Duplicate Detection
     ↓
Structured AI Result
     ↓
Analytics + Daily Digest
```

### AI Capabilities

- Text analysis
- Speech transcription
- Sentiment classification
- Theme extraction
- Severity identification
- Duplicate detection
- Structured AI responses
- Daily summaries
- Evidence-backed insights
- Recommended actions

### AI Failure Handling

AI is treated as an external dependency and not as a guaranteed service.

The system accounts for:

- Timeouts
- Provider failures
- Rate limits
- Malformed responses
- Unavailable providers
- Partial analysis
- Bounded retries

Most importantly:

> **AI failure must not destroy the student's original feedback.**

Feedback persistence is independent from AI processing.

---

## 📊 Manager Intelligence

The manager dashboard converts raw feedback into operational information.

### Analytics

Managers can examine:

- Average meal ratings
- Rating trends
- Issue frequency
- Sentiment trends
- Recurring problems
- Positive signals
- Anomalies
- Supporting evidence
- Historical patterns

### Daily Digest

The manager receives a concise summary of:

- **Top Issues** — recurring complaints
- **Positive Signals** — what students liked
- **Evidence** — feedback supporting the insight
- **Recommendations** — possible operational actions

---

## 👥 Student Community

The platform also includes a student community layer.

Students can:

- Create posts
- Comment
- React
- Participate in polls
- Upload media
- Report content

Administrators can review and moderate reported or inappropriate content.

---

## 🛡️ Administration

The admin layer provides centralized management for:

- Students
- Accounts
- Meals
- Feedback
- Media
- Community
- Moderation
- Reports
- Actions
- Analytics
- AI insights
- Audit logs

---

# 🚀 What Makes MessMind Different

The differentiation is not simply **"we added AI."**

It is the combination of **low-friction feedback, structured data, AI intelligence, evidence, operational actions, reliability, and responsive product design**.

### ⚡ 1. 10-Second Feedback

Students should not need to write a long complaint to report a bad meal.

Structured ratings and tags reduce friction while optional text and media provide deeper context when needed.

### 🧠 2. AI Inside the Workflow

AI is part of the actual data pipeline:

```text
Feedback
 → Analysis
 → Sentiment
 → Themes
 → Severity
 → Duplicate Detection
 → Analytics
 → Digest
 → Action
```

### 📎 3. Evidence-Backed Intelligence

AI-generated insights are designed around actual application data rather than unsupported statistics.

### 🔁 4. Feedback → Action → Outcome

The platform continues beyond complaint collection:

```text
Complaint
   ↓
Insight
   ↓
Action
   ↓
Resolution
   ↓
Outcome
```

### 🛡️ 5. Edge Cases Are First-Class

The application considers:

- Invalid input
- Unauthorized access
- Network failures
- Persistence failures
- Concurrent actions
- Empty states
- Large datasets
- Deleted resources
- Unavailable AI/storage services
- Retry and recovery flows

### 🔐 6. No Exposed API Secrets

Sensitive credentials are handled through environment configuration and backend-side integration.

The React client does not act as the security boundary.

### 📱 7. Fully Responsive

The application is designed for:

- Mobile
- Tablet
- Laptop
- Desktop

The UX adapts by role:

| User | Experience |
|---|---|
| Student | Mobile-first and fast |
| Manager | Information-dense analytics |
| Administrator | Management-focused desktop workflow |

---

# 🧠 System Workflow

```text
┌─────────────────────────┐
│        STUDENT          │
│                         │
│ Rating / Tags / Text    │
│ Voice / Photo / Video   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      DJANGO REST API    │
│                         │
│ Validation              │
│ Authentication          │
│ Authorization           │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│          MYSQL          │
│                         │
│ Persist Raw Feedback    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│        AI ENGINE        │
│                         │
│ Sentiment               │
│ Themes                  │
│ Severity                │
│ Transcription           │
│ Duplicate Detection     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      INTELLIGENCE       │
│                         │
│ Analytics               │
│ Daily Digest            │
│ Trends                  │
│ Evidence                │
│ Recommendations         │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│    MANAGER / ADMIN      │
│                         │
│ Review → Act → Resolve  │
└─────────────────────────┘
```

---

# 🏗️ Architecture

```text
                     ┌────────────────────┐
                     │      Student       │
                     │   Mobile / Web UI  │
                     └─────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │                     │
                    │ React Router        │
                    │ Tailwind CSS        │
                    │ Recharts            │
                    └─────────┬───────────┘
                              │ REST API
                              ▼
                    ┌─────────────────────┐
                    │   Django REST API   │
                    │                     │
                    │ Authentication      │
                    │ RBAC                │
                    │ Validation          │
                    │ Business Logic      │
                    └─────────┬───────────┘
                              │
              ┌───────────────┼────────────────┐
              ▼               ▼                ▼
       ┌────────────┐  ┌────────────┐  ┌────────────┐
       │ PostgreSQL │  │   Media    │  │ AI Engine  │
       │  Database  │  │  Storage   │  │ Groq / LLM │
       └────────────┘  └────────────┘  └─────┬──────┘
                                             │
                                             ▼
                                    ┌────────────────┐
                                    │ Structured AI  │
                                    │    Results     │
                                    └───────┬────────┘
                                            │
                                            ▼
                                    ┌────────────────┐
                                    │ Analytics &    │
                                    │ Daily Digest   │
                                    └────────────────┘
```

---

# 🗄️ Data & AI Architecture

```text
accounts
 ├── users
 └── profiles

meals
 └── meal records

feedback
 ├── ratings
 ├── issue tags
 ├── positive tags
 └── text

media
 ├── photos
 ├── videos
 └── voice

ai_engine
 ├── sentiment
 ├── themes
 ├── severity
 ├── transcription
 └── duplicate detection

analytics
 ├── trends
 ├── metrics
 └── anomaly detection

reports
 └── daily / weekly intelligence

community
 ├── posts
 ├── comments
 ├── reactions
 └── polls

moderation
 └── content review

actions
 ├── assignment
 ├── tracking
 └── resolution

audit
 └── system activity
```

---

# 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 |
| Build Tool | Vite |
| Language | JavaScript / JSX |
| Routing | React Router |
| Styling | Tailwind CSS |
| HTTP Client | Axios |
| Icons | Lucide React |
| Charts | Recharts |
| Backend | Python |
| Framework | Django 5.2.5 |
| API | Django REST Framework |
| Authentication | Simple JWT |
| Database | PostgreSQL |
| AI | Groq / LLM |
| Media | Pillow |
| CORS | django-cors-headers |
| Production Server | Gunicorn |
| Static Files | WhiteNoise |
| Configuration | python-dotenv / environment variables |
| Version Control | Git + GitHub |

---

# 📂 Project Structure

```text
Mess-Feedback-Digest--VIBE-CODE-HACKATHON/
│
├── backend/
│   ├── config/
│   ├── accounts/
│   ├── meals/
│   ├── feedback/
│   ├── media/
│   ├── community/
│   ├── moderation/
│   ├── analytics/
│   ├── ai_engine/
│   ├── reports/
│   ├── audit/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── utils/
│   │   └── assets/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── docs/
│   ├── 00_MASTER_INSTRUCTIONS.md
│   ├── 08_IMPLEMENTATION_PLAN.md
│   ├── 09_ACCEPTANCE_CRITERIA.md
│   └── ...
│
├── .gitignore
└── README.md
```

---

# 🎥 Product Demo

## Watch MessMind AI in Action

**Demo Video:** Replace `VIDEO_URL` with the final YouTube, Google Drive, or Loom URL.

▶️ **[▶️ Watch MessMind AI Demo](https://raw.githubusercontent.com/maazsiddiqui79/Mess-Feedback-Digest--VIBE-CODE-HACKATHON/main/docs/MessMind.mp4)**

The demonstration covers:

1. Student authentication
2. Meal feedback
3. Rating and issue tagging
4. Text / voice / media feedback
5. Feedback persistence
6. AI analysis
7. Manager dashboard
8. Sentiment and issue analytics
9. Daily digest
10. Action management
11. Community features
12. Admin controls
13. Responsive mobile experience
14. Error and edge-case handling

---

# ⚙️ Installation

## Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL
- Git
- npm

### 1. Clone

```bash
git clone https://github.com/maazsiddiqui79/Mess-Feedback-Digest--VIBE-CODE-HACKATHON.git
cd Mess-Feedback-Digest--VIBE-CODE-HACKATHON
```

### 2. Backend

```bash
cd backend

python -m venv venv
```

**Windows:**

```bash
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Create:

```text
backend/.env
```

Example:

```env
DEBUG=True
SECRET_KEY=your_secret_key
DATABASE_URL=your_postgresql_database_url
GROQ_API_KEY=your_groq_api_key
ALLOWED_HOSTS=localhost,127.0.0.1
```

### 4. Database

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create Admin

```bash
python manage.py createsuperuser
```

### 6. Run Backend

```bash
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

### 7. Run Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The Vite development URL will be displayed in the terminal.

---

# 🔑 Environment Variables

| Variable | Purpose |
|---|---|
| `SECRET_KEY` | Django security |
| `DEBUG` | Development / production mode |
| `DATABASE_URL` | PostgreSQL connection |
| `GROQ_API_KEY` | Server-side AI integration |
| `ALLOWED_HOSTS` | Django allowed hosts |

Never commit:

```text
.env
.env.local
API keys
Database passwords
Secret keys
```

to GitHub.

---

# 🔐 Security & Reliability

MessMind AI treats security and reliability as product requirements.

### Authentication & Authorization

- Protected functionality requires authentication.
- Role-based access is applied to students, managers, and administrators.
- Backend authorization is the security boundary.
- Ownership and permissions are enforced server-side.

### Secrets

AI/API credentials remain outside the React client and are managed through environment configuration.

### Media

Media access is controlled according to authorization rules.

### Auditability

Important administrative and system operations can be recorded through audit logging.

### Edge-Case Handling

> **The happy path is only one path.**

Custom error pages and dedicated error states ensure that failures are handled as part of the product experience rather than exposed as generic browser/server errors.

---

# 🤖 Vibe Coding Workflow

MessMind AI was developed specifically as a **Vibe Coding Hackathon project** using **Google Antigravity** and AI-assisted development.

The project was not treated as a one-prompt generation exercise.

```text
Problem Definition
        ↓
Requirements
        ↓
Architecture
        ↓
Implementation Plan
        ↓
AI-Assisted Development
        ↓
Feature Integration
        ↓
Validation
        ↓
Edge-Case Handling
        ↓
Build Verification
        ↓
Deployment
```

### Engineering Principle

> **Generate faster. Validate harder.**

Vibe Coding was used as an engineering accelerator while maintaining focus on:

- Product requirements
- Architecture
- Data integrity
- Security
- Validation
- Error handling
- Responsive UX
- Edge cases
- Production readiness

---

# 🚀 Future Enhancements

Potential extensions include:

- 📱 Dedicated mobile application
- 🌐 Expanded multilingual feedback
- 📊 Advanced predictive analytics
- 🔔 Real-time manager notifications
- 📈 Long-term mess benchmarking
- 🧠 Advanced semantic similarity
- 🎙️ Improved multilingual speech recognition
- 📑 Automated weekly reports
- 📸 Advanced visual issue analysis
- 🔄 Deeper outcome-based recommendations

---

## 👤 Developer

### Maaz Siddiqui

Computer Engineering student and full-stack developer focused on building practical applications that **solve day to day real life problems**.

[🔗 Connect with me](https://maaz-social-card.vercel.app/)

---

# 🏁 Hackathon Summary

| Category | Details |
|---|---|
| **Project** | MessMind AI |
| **Theme** | Campus Services & Sentiment Analytics |
| **Primary Users** | Students, Mess Committee, Managers, Administrators |
| **Frontend** | React + Vite + Tailwind CSS |
| **Backend** | Django + Django REST Framework |
| **Database** | PostgreSQL |
| **AI** | Groq / LLM |
| **Development** | Vibe Coding + AI-Assisted Engineering |
| **Core Constraint** | <10-second student feedback |
| **Core Output** | AI-powered actionable mess intelligence |

### Core Idea

> **Collect feedback in seconds. Understand it with AI. Turn insights into action.**

---

# 📌 Why MessMind AI?

MessMind AI is designed as a complete operational feedback system rather than a simple complaint form.

```text
             ┌─────────────────┐
             │     STUDENT     │
             │                 │
             │ Give Feedback   │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │   AI ANALYSIS   │
             │                 │
             │ Sentiment       │
             │ Themes          │
             │ Severity        │
             │ Duplicates      │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │   INTELLIGENCE  │
             │                 │
             │ Trends          │
             │ Digest          │
             │ Evidence        │
             │ Recommendations │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │     ACTION      │
             │                 │
             │ Assign          │
             │ Track           │
             │ Resolve         │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │     OUTCOME     │
             │                 │
             │ Compare         │
             │ Improve         │
             └─────────────────┘
```

> **Make student feedback easier to give and mess problems harder to ignore.**

---

This version is substantially tighter because the repeated **“What makes it different / Product Impact / Why MessMind / Hackathon Submission”** material is consolidated instead of explained four times, while the actual technical, product, security, AI, edge-case, responsive, and hackathon information remains represented. The source material you supplied also contains the original detailed feature and workflow structure that this condensed version preserves. :chatgpt-content-reference{index="0"}
