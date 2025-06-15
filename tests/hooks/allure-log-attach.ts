import fs from 'fs';
import { test as base } from '@playwright/test';
import { allure } from 'allure-playwright';

// расширяем test с afterEach
export const test = base.extend({});

test.afterEach(async () => {
  if (fs.existsSync('test-log.txt')) {
    const content = fs.readFileSync('test-log.txt', 'utf8');
    allure.attachment('Execution Log', content, 'text/plain');
  }
});