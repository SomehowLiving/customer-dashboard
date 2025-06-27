---
# 📊 ACV Dashboard

A responsive and interactive dashboard to visualize **Annual Contract Value (ACV)** trends across customer types, industries, sales teams, and ACV ranges.

Built with **React**, **TypeScript**, **Recharts**, **Material UI**, and **Express.js**.

![Dashboard Preview](./screenshots/) <!-- Replace with actual screenshot file -->

---

## 🚀 Features

- 📈 **Stacked & Grouped Bar Charts** – Visualize quarterly ACV by customer type, industry, team, and more.
- 🥧 **Donut Charts** – Clean, compact representation of ACV distribution across segments.
- 📋 **Interactive Tables** – Tabular views of quarterly metrics like ACV, opportunities, and percentage shares.
- 🎨 **Responsive Design** – Optimized for desktop and tablets.
- 🧠 **Hover Tooltips** – Reveal detailed values and insights.
- 💻 **TypeScript Codebase** – Typed components for better reliability and DX.

---

## 🧱 Tech Stack

| Layer       | Tools                                      |
|-------------|---------------------------------------------|
| **Frontend** | React, TypeScript, Material UI, Recharts   |
| **Backend**  | Node.js, Express.js                        |
| **Data Format** | JSON                                   |
| **Styling**  | MUI Theme, Custom CSS                     |
| **Charts**   | Recharts                                  |

---

## 📁 Folder Structure

```yaml
acv-dashboard/
├── backend/            # Express server + JSON APIs
├── frontend/           # React app (MUI + Recharts)
│   ├── components/     # Reusable chart & UI components
│   ├── utils/          # Formatters, color maps, etc.
│   ├── pages/          # Dashboard layout views
│   └── assets/         # Icons, screenshots
├── screenshots/        # Screenshots for README
└── README.md

```


## 🛠️ Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/acv-dashboard.git
   cd acv-dashboard
2. **Install dependencies**
    ```bash
    npm install
3. **Start the frontend and backend**
- Express server (port 3001)
    ```bash
    npm run dev

- React frontend (port 3000)
    ```bash
    npm start

- The frontend expects the backend API to run on http://localhost:3001.

---

## 📡 API Endpoints

| Endpoint                 | Description                            |
|--------------------------|----------------------------------------|
| `/api/customer-type`     | ACV breakdown by customer type         |
| `/api/account-industry`  | ACV grouped by industry                |
| `/api/team`              | ACV by regional team                   |
| `/api/acv-range`         | ACV by range buckets                   |
| `/api/acv-by-quarter`    | Combined view with all metrics         |

---

📷 Screenshots
    Check out Screenshots folder.

---

## ✨ Future Improvements
- 🔎 Filtering by quarter, industry, or range  
- 📤 CSV download/export for tables  
- 🔐 Add JWT-authenticated login (admin vs. viewer)  
- ☁️ Deploy via Netlify + Render or Vercel + Railway  

---

### 📄 License
This project is licensed under the MIT License.

### 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a PR.

### 👨‍💻 Author
Made by @SomehowLiving

