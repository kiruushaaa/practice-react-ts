import { test, expect } from '@playwright/test';

test.describe('Counter E2E', () => {
  test('should increment counter when button is clicked', async ({ page }) => {
    // Navigate to the app (assuming it's running on localhost:5173 for local tests)
    await page.goto('http://localhost:5173');

    // 1. Check counter is 0
    const counterButton = page.locator('button.counter');
    await expect(counterButton).toHaveText('Count is 0');

    // 2. Click a button to increase counter
    await counterButton.click();

    // 3. Check counter is 1
    await expect(counterButton).toHaveText('Count is 1');
  });
});
