import { test, expect } from '@playwright/test';

test.describe('Game Logic E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL || '/');
  });

  test('should render the board correctly', async ({ page }) => {
    const board = page.locator('.board');
    await expect(board).toBeVisible();

    const columns = page.locator('.column');
    // COLS = 7 (based on standard 4-in-a-row or common project types,
    // but we should check if it's specifically 7)
    await expect(columns).toHaveCount(7);
  });

  test('should allow choosing a column and dropping a piece', async ({
    page,
  }) => {
    const firstColumn = page.locator('.column').first();

    // Check that initially the bottom slot is empty
    const slots = page.locator('.column').first().locator('.slot');
    const bottomSlot = slots.last();
    await expect(bottomSlot).not.toHaveClass(/filled/);

    // Click column to drop piece
    await firstColumn.click();

    // Check that the bottom slot is now filled
    await expect(bottomSlot).toHaveClass(/filled/);
  });

  test('should change the current player after a move', async ({ page }) => {
    const playerToken = page.locator('.player-token');

    // Initial player should be 'X'
    await expect(playerToken).toHaveText('X');

    const firstColumn = page.locator('.column').first();
    await firstColumn.click();

    // Player should change to 'O'
    await expect(playerToken).toHaveText('O');

    // Check that the marker placed in the slot is 'X'
    const bottomSlot = page.locator('.column').first().locator('.slot').last();
    await expect(bottomSlot).toHaveClass(/X/);
  });
});
