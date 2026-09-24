const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS = path.resolve(__dirname, '..', 'screenshots');
fs.mkdirSync(SCREENSHOTS, { recursive: true });
const shot = (name) => path.join(SCREENSHOTS, name);

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.addInitScript(() => localStorage.clear());
  await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
  await expect(page.getByTestId('game-title')).toBeVisible();
});

test('capture main menu', async ({ page }) => {
  await page.screenshot({ path: shot('01-main-menu.png'), fullPage: true });
});

test('capture daily assignment', async ({ page }) => {
  await page.getByTestId('player-name').fill('Playwright');
  await page.getByTestId('start-game').click();
  await expect(page.getByTestId('load-card')).toHaveCount(2);
  await page.screenshot({ path: shot('02-daily-assignment.png'), fullPage: true });
});

test('capture challenge', async ({ page }) => {
  await page.getByTestId('player-name').fill('Playwright');
  await page.getByTestId('start-game').click();
  await expect(page.getByTestId('load-card')).toHaveCount(2);
  await page.getByTestId('begin-challenge').first().click();
  await expect(page.getByTestId('challenge-screen')).toHaveClass(/active/);
  await page.screenshot({ path: shot('03-challenge.png'), fullPage: true });
});

test('capture history', async ({ page }) => {
  await page.getByTestId('open-history').click();
  await expect(page.getByTestId('history-screen')).toHaveClass(/active/);
  await page.screenshot({ path: shot('04-history.png'), fullPage: true });
});
