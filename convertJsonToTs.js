const fs = require('fs');
const path = require('path');

const inputJsonPath = path.join(__dirname, 'src/assets/homePics.json');
const outputTsPath = path.join(__dirname, 'src/app/data/homePics.d.ts');

const jsonData = JSON.parse(fs.readFileSync(inputJsonPath, 'utf-8'));
const formatValue = (value) => {
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return `[${value.map(formatValue).join(', ')}]`;
    } else {
      return `{ ${Object.entries(value).map(([key, v]) => `${key}: ${formatValue(v)}`).join(', ')} }`;
    }
  }
  return value.toString();
};
const tsData = `import { PexelResponse } from '../interfaces/home';\n\n` +
  `export const HOME_PHOTOS: PexelResponse = ${formatValue(jsonData)};`;

fs.writeFileSync(outputTsPath, tsData);
