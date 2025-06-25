// src/server.ts
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());

const readJSON = (filename: string) => {
  const filePath = path.join(__dirname, '../data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

app.get('/api/customer-type', (_, res) => res.json(readJSON('customer-type.json')));
app.get('/api/account-industry', (_, res) => res.json(readJSON('account-industry.json')));
app.get('/api/team', (_, res) => res.json(readJSON('team.json')));
app.get('/api/acv-range', (_, res) => res.json(readJSON('acv-range.json')));

app.listen(3001, () => console.log('Server running on port 3001'));
