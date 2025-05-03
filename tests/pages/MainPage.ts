import { Locator, Page, expect } from 'playwright/test';

export class MainPage {
  readonly page: Page;
  readonly inputName: Locator;
  readonly inputTime: Locator;
  readonly inputOrigin: Locator;
  readonly inputDestination: Locator;
  readonly inputItem: Locator;
  readonly inputAmount: Locator;
  readonly addButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputName = page.getByPlaceholder('Enter Name');
    this.inputTime = page.getByPlaceholder('Enter Time');
    this.inputOrigin = page.getByPlaceholder('Enter Origin');
    this.inputDestination = page.getByPlaceholder('Enter Destination');
    this.inputItem = page.getByPlaceholder('Enter Item');
    this.inputAmount = page.getByPlaceholder('Enter Amount');
    this.addButton = page.getByRole('button', { name: 'Hinzufuegen' });
    this.errorMessage = page.getByText('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
  }

  async navigate() {
    await this.page.goto('http://localhost:4200/');
  }

  async fillForm(data: { name: string; time: string; origin: string; destination: string; item: string; amount: string }) {
    await this.inputName.fill(data.name);
    await this.inputTime.fill(data.time);
    await this.inputOrigin.fill(data.origin);
    await this.inputDestination.fill(data.destination);
    await this.inputItem.fill(data.item);
    await this.inputAmount.fill(data.amount);
  }

  async submitForm() {
    await this.addButton.click();
  }

  async expectErrorMessageVisible() {
    await expect(this.errorMessage).toBeVisible();
  }
}
