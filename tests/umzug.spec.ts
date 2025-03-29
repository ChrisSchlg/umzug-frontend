import { test, expect } from 'playwright/test';

test('move items', async ({ page }) => {
    await page.route('**/api/umzug', async (route, request) => {
        expect(request.url()).toContain('/api/umzug');

        expect(request.method()).toBe('POST');

        const postData = request.postDataJSON();
        expect(postData).toContain({ text: 'xxx'});

        await route.fulfill({
            status: 200
        });
    });

    await page.goto('http://localhost:4200/');

    const inputName = page.getByPlaceholder('Enter Name');
    const inputTime = page.getByPlaceholder('Enter Time');
    const inputOrigin = page.getByPlaceholder('Enter Origin');
    const inputDestination = page.getByPlaceholder('Enter Destination');
    const inputItem = page.getByPlaceholder('Enter Item');
    const inputAmount = page.getByPlaceholder('Enter Amount');
    const addButton = page.getByRole('button', { name: 'Add' });

    await expect(inputName).toBeVisible();
    await expect(inputTime).toBeVisible();
    await expect(inputOrigin).toBeVisible();
    await expect(inputDestination).toBeVisible();
    await expect(inputItem).toBeVisible();
    await expect(inputAmount).toBeVisible();
    await expect(addButton).toBeVisible();

    await inputName.fill('xxx');
    await inputTime.fill('xxx');
    await inputOrigin.fill('xxx');
    await inputDestination.fill('xxx');
    await inputItem.fill('xxx');
    await inputAmount.fill('xxx');
    await addButton.click();

    await expect(page.getByText('xxx')).toBeVisible();
})