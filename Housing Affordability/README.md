# Iowa City Housing Affordability (Full-stack)

This is a full-stack example project to explore housing affordability in the Iowa City, Iowa area.

Folders
- `backend/` - Express API server with sample data
- `frontend/` - Vite + React single page app

Overview
- REST API endpoints for neighborhoods and affordability calculations.
- React frontend with calculator, neighborhood explorer and charts.

Quick start

1. Backend

```bash
cd "./backend"
npm install
npm run start
```

Server will run on http://localhost:4000 by default.

2. Frontend

```bash
cd "./frontend"
npm install
npm run dev
```

App will run on http://localhost:5173 (Vite default) and talk to the backend at port 4000.

Notes
- Sample data is provided in `backend/data/neighborhoods.json`. The backend currently reads the sample file and returns results; you can later switch to a MongoDB or PostgreSQL DB by replacing the data layer.
- This project includes accessibility and responsive-first considerations; further polish is recommended for production use.

Disclaimer: Data is for informational purposes only.
