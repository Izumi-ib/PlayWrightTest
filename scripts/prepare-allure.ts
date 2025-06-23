import * as fs from 'fs';
import * as path from 'path';

const resultsDir = 'allure-results';
const reportDir = 'allure-report';
fs.mkdirSync(resultsDir, { recursive: true });

const buildName = process.env.BUILD_NAME || 'Full Suite';
console.log(buildName, "Console log Build Name");

const buildOrder = Date.now();
const executor = {
  name: 'GitHub Actions',
  type: 'CI',
  url: 'https://github.com/<your-username>/<your-repo>/actions',
  buildOrder,
  buildName,
  reportUrl: 'https://<your-username>.github.io/<your-repo>/',
  buildUrl: `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`,
};
fs.writeFileSync('allure-results/executor.json', JSON.stringify(executor, null, 2));

// Write environment.properties
const env = `BROWSER=chrome\nENV=staging\nOS=${process.platform}`;
fs.writeFileSync(path.join(resultsDir, 'environment.properties'), env);

// Write categories.json
const categories = [
  {
    name: 'Assertion Errors',
    matchedStatuses: ['failed'],
    messageRegex: '.*AssertionError.*',
  },
  {
    name: 'Timeouts',
    matchedStatuses: ['failed'],
    messageRegex: '.*Timeout.*',
  },
  {
    name: 'Other Errors',
    matchedStatuses: ['broken'],
  },
];
fs.writeFileSync(path.join(resultsDir, 'categories.json'), JSON.stringify(categories, null, 2));

// Copy history from previous report (if exists)
const historySrc = path.join('.cache', 'history');
const historyDest = path.join(resultsDir, 'history');

if (fs.existsSync(historySrc) && fs.lstatSync(historySrc).isDirectory()) {
  fs.mkdirSync(historyDest, { recursive: true });
  const files = fs.readdirSync(historySrc);
  for (const file of files) {
    fs.copyFileSync(path.join(historySrc, file), path.join(historyDest, file));
  }
  console.log('🟢 History copied from cache to allure-results');
} else {
  console.warn('⚠️  No valid .cache/history directory found to copy');
}

// Ensure .cache/history exists to avoid missing trend issues
const cacheHistoryPath = path.join('.cache', 'history');

if (!fs.existsSync(cacheHistoryPath)) {
  fs.mkdirSync(cacheHistoryPath, { recursive: true });
  // Create empty trend file to satisfy Allure
  fs.writeFileSync(path.join(cacheHistoryPath, 'history-trend.json'), '[]');
  console.log('🟨 Created empty .cache/history for initial run');
} else {
  console.log('🟩 .cache/history already exists');
}

