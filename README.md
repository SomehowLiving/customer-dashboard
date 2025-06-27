# 📊 ACV Dashboard

A responsive and interactive dashboard to visualize ACV (Annual Contract Value) trends across customer types, industries, sales teams, and ACV ranges. Built with **React**, **TypeScript**, **Recharts**, **Material UI**, and **Express.js**.

![Screenshot](./screenshots/dashboard-preview.png) <!-- Replace with your actual screenshot -->

---

## 🚀 Features

- 📈 **Stacked and Grouped Bar Charts** – Visualize quarterly breakdowns by customer type, industry, team, and more.
- 🥧 **Donut Charts** – Clean representation of distribution data (e.g., ACV ranges).
- 📋 **Interactive Tables** – Data tables with precise breakdown of ACV and opportunity counts.
- 🎨 **Responsive Layout** – Optimized for both desktop and tablets.
- 🔍 **Hover Tooltips** – Dynamic tooltips for deeper insight.
- 💻 **Built with TypeScript** – Clean, typed frontend and backend codebase.

---

## 🧱 Tech Stack

| Layer         | Tools                                 |
|--------------|----------------------------------------|
| Frontend      | React, TypeScript, Material UI, Recharts |
| Backend       | Node.js, Express.js                   |
| Data Format   | JSON                                  |
| Styling       | Custom CSS, App-wide theme            |
| Charts        | Recharts                              |

---

## 📦 Folder Structure



---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/acv-dashboard.git
cd acv-dashboard

### 2. Install dependencies
```bash
npm install

2. Install dependencies
bash
Copy code
npm install
3. Start the frontend and backend
Start the Express server (port 3001):

bash
Copy code
npm run server
Start the React frontend (port 3000):

bash
Copy code
npm start
The frontend expects the backend to run on port 3001.

📡 API Endpoints
Endpoint	Description
/api/customer-type	ACV breakdown by customer type
/api/account-industry	ACV by industry
/api/team	ACV by team
/api/acv-range	ACV by range bucket
/api/acv-by-quarter	Combined view: ACV, #opps, % share

📷 Screenshots
Stacked Bar + Donut Chart
Team View + Table
Add actual screenshots in a screenshots/ folder.

✨ Future Improvements
    - Add filtering by quarter / industry / range.
    - Add download/export CSV option for tables.
    - Add JWT-authenticated login (admin vs. viewer).
    - Deploy via Netlify + Render or Vercel + Railway.

### 📄 License
This project is licensed under the MIT License.

### 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to open an issue.

🧑‍💻 Author
Made with 💻 by Your Name


---



