# Health Insight Dashboard - Vaccine Market Analytics Platform

A full-stack web dashboard to visualize global vaccine market data with filters, KPIs, and interactive charts.

![Dashboard Preview](https://img.shields.io/badge/Status-Complete-green) ![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

## Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [https://your-frontend-url.vercel.app](https://your-frontend-url.vercel.app) |
| **Backend API** | [https://your-backend-url.onrender.com](https://your-backend-url.onrender.com) |

> Update the URLs above after deployment

## Features

### Core Features
- **Filter data** by region, brand, year, and vaccine type
- **KPI cards** showing CAGR, market size, average price, doses, and efficacy
- **6 interactive charts** (Bar, Line, Pie, Area, Radar, Horizontal Bar)
- **Light/Dark mode** toggle
- **Responsive design** for mobile, tablet, and desktop

### Bonus Features
- **Pagination** - Navigate through large datasets
- **Sorting** - Sort by any field (asc/desc)
- **AI-Powered Insights** - Smart market analysis with 5 insight types:
  - Market Leader
  - Growth Trajectory
  - Efficacy Performance
  - Price Analysis
  - Global Reach

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Node.js, Express, MongoDB, Mongoose |
| **Frontend** | React 18, Vite, Tailwind CSS v4, Recharts |
| **Database** | MongoDB Atlas |
| **Icons** | Lucide React |

## Project Structure

```
health-insight-dashboard/
├── backend/
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   └── vaccineController.js # API logic
│   ├── models/
│   │   └── Vaccine.js          # Mongoose schema
│   ├── routes/
│   │   └── vaccineRoutes.js    # API routes
│   ├── utils/
│   │   └── calculations.js     # KPI calculations
│   ├── data/
│   │   └── vaccines.json       # Seed data
│   ├── server.js               # Entry point
│   ├── seed.js                 # Database seeder
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx     # Filter sidebar
│   │   │   ├── KPICards.jsx    # KPI display cards
│   │   │   ├── Charts.jsx      # All 6 charts
│   │   │   └── Insights.jsx    # AI insights panel
│   │   ├── context/
│   │   │   └── ThemeContext.jsx # Dark/Light mode
│   │   ├── hooks/
│   │   │   └── useApi.js       # Data fetching hooks
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # Tailwind styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/vaccines` | GET | Get vaccine data with filters, pagination, sorting |
| `/api/summary` | GET | Get KPI metrics (CAGR, market size, avg price) |
| `/api/filters` | GET | Get available filter options |
| `/api/charts` | GET | Get aggregated chart data |
| `/api/insights` | GET | Get AI-powered market insights |

### Query Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `region` | string | Filter by region | All |
| `brand` | string | Filter by brand | All |
| `year` | string | Filter by year | All |
| `vaccine` | string | Filter by vaccine type | All |
| `page` | number | Page number | 1 |
| `limit` | number | Items per page | 50 |
| `sortBy` | string | Sort field | id |
| `sortOrder` | string | asc or desc | asc |

### Example API Calls

```bash
# Get all vaccines
GET /api/vaccines

# Get vaccines with filters
GET /api/vaccines?region=Europe&brand=Pfizer&year=2022

# Get paginated & sorted data
GET /api/vaccines?page=1&limit=10&sortBy=marketSize&sortOrder=desc

# Get KPI summary
GET /api/summary?region=Asia

# Get AI insights
GET /api/insights?brand=Moderna
```

## Local Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### 1. Clone Repository

```bash
git clone https://github.com/your-username/health-insight-dashboard.git
cd health-insight-dashboard
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=5000
```

Seed the database:
```bash
npm run seed
```

Start the server:
```bash
npm run dev
```

Server runs on http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file (optional for local):
```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:
```bash
npm run dev
```

App runs on http://localhost:3000

## Deployment

### Backend (Render)

1. Create new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add Environment Variable:
   - `DATABASE_URL` = your MongoDB Atlas connection string

### Frontend (Vercel)

1. Import project on [Vercel](https://vercel.com)
2. Configure:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

## Screenshots

### Dashboard - Light Mode
*Main dashboard showing KPI cards, AI insights, and interactive charts*

### Dashboard - Dark Mode
*Same dashboard with dark theme enabled*

### Filter Panel
*Sidebar with region, brand, year, and vaccine type filters*

### AI Insights
*Smart market analysis panel with 5 different insight types*

> Add actual screenshots here before submission

## Data Schema

```javascript
{
  id: Number,
  brand: String,        // e.g., "Pfizer", "Moderna"
  vaccine: String,      // e.g., "COVID-19", "Flu"
  region: String,       // e.g., "North America", "Europe"
  year: Number,         // e.g., 2021, 2022, 2023
  marketSize: Number,   // in millions USD
  price: Number,        // per dose in USD
  dosesDistributed: Number,
  efficacy: Number      // percentage (0-100)
}
```

## 📋 Assignment Checklist

### Core Requirements
- [x] Backend APIs (`/api/vaccines`, `/api/summary`)
- [x] Filter support (region, brand, year)
- [x] KPI metrics (CAGR %, market size, avg price)
- [x] 5+ interactive charts
- [x] Modular backend structure
- [x] Sidebar + filter dropdowns
- [x] Responsive design
- [x] Light/Dark mode
- [x] Dynamic data fetching

### Bonus Features
- [x] Pagination
- [x] Sorting
- [x] GenAI Insights

### Deployment & Documentation
- [ ] Frontend deployed (Vercel/Netlify)
- [ ] Backend deployed (Render/Railway)
- [x] README with setup instructions
- [ ] Deployed URLs added
- [ ] Screenshots added

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)

## 📄 License

MIT
