import { test, expect } from 'playwright/test';

test('move items', async ({ page }) => {
    let requestRecieved = false;

    await page.route('**/api/umzug', async (route, request) => {
        requestRecieved = true;
        expect(request.method()).toBe('POST');

        const postData = request.postDataJSON();
        expect(postData).toEqual({
            name: 'xxx',
            time: 'xxx',
            origin: 'xxx',
            destination: 'xxx',
            item: 'xxx',
            amount: 'xxx'
        });

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
    const addButton = page.getByRole('button', { name: 'Hinzufuegen' });

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

    expect(requestRecieved).toBe(true);
})

test('error message when fields are empty not send request', async ({ page }) => {
    let requestReceived = false;

    await page.route('**/api/umzug', async (route) => {
        requestReceived = true;
        await route.abort();
    });

    await page.goto('http://localhost:4200/');

    const addButton = page.getByRole('button', { name: 'Hinzufuegen' });

    await addButton.click();

    const errorMessage = page.getByText('Bitte füllen Sie alle Felder aus.');
    await expect(errorMessage).toBeVisible();

    expect(requestReceived).toBe(false);
});

test('should show error message when backend request fails', async ({ page }) => {
    let requestReceived = false;

    await page.route('**/api/umzug', async (route) => {
        requestReceived = true;
        await route.fulfill({
            status: 500,
            body: JSON.stringify({ message: 'Server error' })
        });
    });

    await page.goto('http://localhost:4200/');

    const inputName = page.getByPlaceholder('Enter Name');
    const inputTime = page.getByPlaceholder('Enter Time');
    const inputOrigin = page.getByPlaceholder('Enter Origin');
    const inputDestination = page.getByPlaceholder('Enter Destination');
    const inputItem = page.getByPlaceholder('Enter Item');
    const inputAmount = page.getByPlaceholder('Enter Amount');
    const addButton = page.getByRole('button', { name: 'Hinzufuegen' });

    await inputName.fill('xxx');
    await inputTime.fill('xxx');
    await inputOrigin.fill('xxx');
    await inputDestination.fill('xxx');
    await inputItem.fill('xxx');
    await inputAmount.fill('xxx');
    await addButton.click();

    expect(requestReceived).toBe(true);

    const errorMessage = page.getByText('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
    await expect(errorMessage).toBeVisible();
});
