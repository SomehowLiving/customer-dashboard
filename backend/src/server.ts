import express from 'express';
import cors from 'cors';
import dataRoutes from './routes/dataRoutes';

const app = express();
app.use(cors());

// Logger Middleware
app.use((req, _, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route handler
app.use('/api', dataRoutes);

// Start server
app.listen(3001, () => console.log('Server running on port 3001'));


// // src/server.ts
// import express from 'express';
// import cors from 'cors';
// import fs from 'fs';
// import path from 'path';

// const app = express();
// app.use(cors()); // Enable Cross-Origin Resource Sharing

// /**
//  * Helper function to read JSON files from the /data folder.
//  * Used across multiple endpoints to load input datasets.
//  */
// const readJSON = (filename: string) => {
//   const filePath = path.join(__dirname, '../data', filename);
//   return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
// };

// // Basic request logging middleware
// app.use((req, res, next) => {
//   console.log(`Incoming ${req.method} request to ${req.url}`);
//   next();
// });

// /**
//  * GET /api/acv-by-quarter
//  * Returns ACV and opportunity breakdown by quarter, grouped into:
//  * - Existing Customers
//  * - New Customers
//  * - Percent share per type
//  */
// app.get('/api/acv-by-quarter', (_, res) => {
//   const data = readJSON('customer-type.json');
//   const grouped: Record<string, any> = {};

//   data.forEach((item: any) => {
//     const quarter = item.closed_fiscal_quarter;
//     const custType = item.Cust_Type;

//     // Initialize data for a quarter if it doesn't exist
//     if (!grouped[quarter]) {
//       grouped[quarter] = {
//         quarter,
//         existing: { opps: 0, acv: 0, percent: 0 },
//         new: { opps: 0, acv: 0, percent: 0 },
//         total: { opps: 0, acv: 0 }
//       };
//     }

//     // Aggregate based on customer type
//     if (custType === 'Existing Customer') {
//       grouped[quarter].existing.opps += item.count;
//       grouped[quarter].existing.acv += item.acv;
//     } else if (custType === 'New Customer') {
//       grouped[quarter].new.opps += item.count;
//       grouped[quarter].new.acv += item.acv;
//     }

//     // Update overall totals
//     grouped[quarter].total.opps += item.count;
//     grouped[quarter].total.acv += item.acv;
//   });

//   // Calculate percentages for existing/new customer ACV
//   for (const quarter of Object.keys(grouped)) {
//     const q = grouped[quarter];
//     const totalACV = q.total.acv || 1; // Prevent division by 0
//     q.existing.percent = Math.round((q.existing.acv / totalACV) * 100);
//     q.new.percent = 100 - q.existing.percent;
//   }

//   // Return data sorted by fiscal quarter
//   const result = Object.values(grouped).sort((a, b) =>
//     a.quarter.localeCompare(b.quarter)
//   );

//   res.json(result);
// });

// /**
//  * GET /api/customer-type
//  * Essentially the same as /acv-by-quarter.
//  * Kept as a separate endpoint for potentially different use in frontend.
//  */
// app.get('/api/customer-type', (_, res) => {
//   const data = readJSON('customer-type.json');
//   const grouped: Record<string, any> = {};

//   data.forEach((item: any) => {
//     const quarter = item.closed_fiscal_quarter;
//     const custType = item.Cust_Type;

//     if (!grouped[quarter]) {
//       grouped[quarter] = {
//         quarter,
//         existing: { opps: 0, acv: 0, percent: 0 },
//         new: { opps: 0, acv: 0, percent: 0 },
//         total: { opps: 0, acv: 0 }
//       };
//     }

//     if (custType === 'Existing Customer') {
//       grouped[quarter].existing.opps += item.count;
//       grouped[quarter].existing.acv += item.acv;
//     } else if (custType === 'New Customer') {
//       grouped[quarter].new.opps += item.count;
//       grouped[quarter].new.acv += item.acv;
//     }

//     grouped[quarter].total.opps += item.count;
//     grouped[quarter].total.acv += item.acv;
//   });

//   for (const quarter of Object.keys(grouped)) {
//     const q = grouped[quarter];
//     const totalACV = q.total.acv || 1;
//     q.existing.percent = Math.round((q.existing.acv / totalACV) * 100);
//     q.new.percent = 100 - q.existing.percent;
//   }

//   const result = Object.values(grouped).sort((a, b) =>
//     a.quarter.localeCompare(b.quarter)
//   );

//   res.json(result);
// });

// /**
//  * GET /api/account-industry
//  * Groups ACV and opps by industry for each quarter.
//  */
// app.get('/api/account-industry', (_, res) => {
//   const data = readJSON('account-industry.json');
//   const grouped: Record<string, any> = {};

//   data.forEach((item: any) => {
//     const quarter = item.closed_fiscal_quarter;
//     const industry = item.Acct_Industry;

//     if (!grouped[quarter]) {
//       grouped[quarter] = {
//         quarter,
//         industries: {},
//         total: { opps: 0, acv: 0 }
//       };
//     }

//     if (!grouped[quarter].industries[industry]) {
//       console.log("Quarter:", quarter, "| Industry:", industry);
//       grouped[quarter].industries[industry] = { opps: 0, acv: 0 };
//     }

//     grouped[quarter].industries[industry].opps += item.count;
//     grouped[quarter].industries[industry].acv += item.acv;

//     grouped[quarter].total.opps += item.count;
//     grouped[quarter].total.acv += item.acv;
//   });

//   const result = Object.values(grouped).sort((a, b) =>
//     a.quarter.localeCompare(b.quarter)
//   );

//   res.json(result);
// });

// /**
//  * GET /api/team
//  * Groups ACV and opps by sales team for each quarter.
//  */
// app.get('/api/team', (_, res) => {
//   const data = readJSON('team.json');
//   const grouped: Record<string, any> = {};

//   data.forEach((item: any) => {
//     const quarter = item.closed_fiscal_quarter;
//     const team = item.Team;

//     if (!grouped[quarter]) {
//       grouped[quarter] = {
//         quarter,
//         teams: {},
//         total: { opps: 0, acv: 0 }
//       };
//     }

//     if (!grouped[quarter].teams[team]) {
//       grouped[quarter].teams[team] = { opps: 0, acv: 0 };
//     }

//     grouped[quarter].teams[team].opps += item.count;
//     grouped[quarter].teams[team].acv += item.acv;

//     grouped[quarter].total.opps += item.count;
//     grouped[quarter].total.acv += item.acv;
//   });

//   const result = Object.values(grouped).sort((a, b) =>
//     a.quarter.localeCompare(b.quarter)
//   );

//   res.json(result);
// });

// /**
//  * GET /api/acv-range
//  * Groups ACV and opps by ACV range bucket for each quarter.
//  */
// app.get('/api/acv-range', (_, res) => {
//   const data = readJSON('acv-range.json');
//   const grouped: Record<string, any> = {};

//   data.forEach((item: any) => {
//     const quarter = item.closed_fiscal_quarter;
//     const range = item.ACV_Range;

//     if (!grouped[quarter]) {
//       grouped[quarter] = {
//         quarter,
//         ranges: {},
//         total: { opps: 0, acv: 0 }
//       };
//     }

//     if (!grouped[quarter].ranges[range]) {
//       grouped[quarter].ranges[range] = { opps: 0, acv: 0 };
//     }

//     grouped[quarter].ranges[range].opps += item.count;
//     grouped[quarter].ranges[range].acv += item.acv;

//     grouped[quarter].total.opps += item.count;
//     grouped[quarter].total.acv += item.acv;
//   });

//   const result = Object.values(grouped).sort((a, b) =>
//     a.quarter.localeCompare(b.quarter)
//   );

//   res.json(result);
// });

// // Start server on port 3001
// app.listen(3001, () => console.log('Server running on port 3001'));
