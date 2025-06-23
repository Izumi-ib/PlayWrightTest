import * as fs from 'fs';
import * as path from 'path';

const source = path.join('allure-report', 'history');
const destination = path.join('.cache', 'history');

fs.mkdirSync(destination, { recursive: true });

if (fs.existsSync(source) && fs.lstatSync(source).isDirectory()) {
  const files = fs.readdirSync(source);
  for (const file of files) {
    fs.copyFileSync(path.join(source, file), path.join(destination, file));
  }
  console.log('🟢 History copied from allure-report to .cache');
} else {
  console.log('⚠️  No history to cache');
}