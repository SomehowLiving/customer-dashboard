import fs from 'fs';
import path from 'path';

export const readJSON = (filename: string) => {
  const filePath = path.join(__dirname, '../../data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};
