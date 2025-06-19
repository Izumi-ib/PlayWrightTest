import * as fs from 'fs';

fs.mkdirSync('allure-results', { recursive: true }); 

const executor = {
  name: "GitHub Actions",
  type: "CI",
  url: "https://github.com/<your-username>/<your-repo>/actions",
  buildOrder: 1,
  buildName: "Run on master",
  reportUrl: "https://<your-username>.github.io/<your-repo>/",
  buildUrl: `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
};

fs.writeFileSync('allure-results/executor.json', JSON.stringify(executor, null, 2));

fs.writeFileSync('allure-results/environment.properties', `BROWSER=chrome\nENV=staging\nOS=ubuntu`);