"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const readJSON = (filename) => {
    const filePath = path_1.default.join(__dirname, '../data', filename);
    return JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
};
app.get('/api/acv-by-quarter', (_, res) => {
    const data = readJSON('customer-type.json');
    const grouped = {};
    data.forEach((item) => {
        const quarter = item.closed_fiscal_quarter;
        const custType = item.Cust_Type;
        if (!grouped[quarter]) {
            grouped[quarter] = {
                quarter,
                existing: { opps: 0, acv: 0, percent: 0 },
                new: { opps: 0, acv: 0, percent: 0 },
                total: { opps: 0, acv: 0 }
            };
        }
        if (custType === 'Existing Customer') {
            grouped[quarter].existing.opps += item.count;
            grouped[quarter].existing.acv += item.acv;
        }
        else if (custType === 'New Customer') {
            grouped[quarter].new.opps += item.count;
            grouped[quarter].new.acv += item.acv;
        }
        grouped[quarter].total.opps += item.count;
        grouped[quarter].total.acv += item.acv;
    });
    for (const quarter of Object.keys(grouped)) {
        const q = grouped[quarter];
        const totalACV = q.total.acv || 1; // avoid division by 0
        q.existing.percent = Math.round((q.existing.acv / totalACV) * 100);
        q.new.percent = 100 - q.existing.percent;
    }
    const result = Object.values(grouped).sort((a, b) => a.quarter.localeCompare(b.quarter));
    res.json(result);
});
// app.get('/api/account-industry', (_, res) => res.json(readJSON('account-industry.json')));
// app.get('/api/team', (_, res) => res.json(readJSON('team.json')));
// app.get('/api/acv-range', (_, res) => res.json(readJSON('acv-range.json')));
app.listen(3001, () => console.log('Server running on port 3001'));
