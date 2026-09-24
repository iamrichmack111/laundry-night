const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto('/index.html', { waitUntil: 'domcontentloaded' });
  await expect(page.getByTestId('game-title')).toBeVisible();
});

test('home screen loads and starts a daily assignment', async ({ page }) => {
  await page.getByTestId('player-name').fill('Playwright');
  await page.getByTestId('start-game').click();
  await expect(page.getByTestId('daily-screen')).toHaveClass(/active/);
  await expect(page.getByTestId('load-card')).toHaveCount(2);
  await expect(page.locator('#todaySummary')).toContainText('0/2 loads unlocked');
});

test('history screen can be opened and closed', async ({ page }) => {
  await page.getByTestId('open-history').click();
  await expect(page.getByTestId('history-screen')).toHaveClass(/active/);
  await expect(page.locator('#historyList')).toContainText('No laundry has been completed yet.');
  await page.getByTestId('history-back').click();
  await expect(page.locator('#intro')).toHaveClass(/active/);
});

test('a daily load opens its challenge', async ({ page }) => {
  await page.getByTestId('player-name').fill('Playwright');
  await page.getByTestId('start-game').click();
  await expect(page.getByTestId('load-card')).toHaveCount(2);
  await page.getByTestId('begin-challenge').first().click();
  await expect(page.getByTestId('challenge-screen')).toHaveClass(/active/);
  await expect(page.locator('#progressText')).toHaveText('Question 1 / 10');
  await expect(page.getByTestId('answer-input')).toBeVisible();
});
