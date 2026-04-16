import { test, expect } from '@playwright/test';

test.describe('Game Logic E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL || '/');
  });

  test('should render the board correctly', async ({ page }) => {
    const board = page.locator('.board');
    await expect(board).toBeVisible();

    const columns = page.locator('.interaction-layer .column');
    await expect(columns).toHaveCount(7);
  });

  test('should allow choosing a column and dropping a piece', async ({
    page,
  }) => {
    const interactionColumns = page.locator('.interaction-layer .column');
    const piecesSlots = page
      .locator('.pieces-layer .column')
      .first()
      .locator('.slot');
    const firstColumn = interactionColumns.first();
    const bottomSlot = piecesSlots.last();

    await expect(bottomSlot).not.toHaveClass(/filled/);

    await firstColumn.click();

    await expect(bottomSlot).toHaveClass(/filled/);
  });

  test('should change the current player after a move', async ({ page }) => {
    const playerToken = page.locator('.player-token');

    await expect(playerToken).toHaveText('X');

    const firstColumn = page.locator('.interaction-layer .column').first();
    await firstColumn.click();

    await expect(playerToken).toHaveText('O');

    const bottomSlot = page
      .locator('.pieces-layer .column')
      .first()
      .locator('.slot')
      .last();
    await expect(bottomSlot).toHaveClass(/X/);
  });
});
