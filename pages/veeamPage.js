exports.veeamPage = class veeamPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Selectors
    this.closeBtn = page.locator(
      'div[role="dialog"] >>> button[aria-label="Close"]'
    );
    this.supportMenuItem = page.locator('.main-navigation__item-title', {
      hasText: 'Support',
    });
    this.forumsLink = page.locator('a', { hasText: 'R&D Forums' });
    this.agreeCheckbox = page.locator('#agreed');
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#new_password');
    this.confirmPasswordInput = page.locator('#password_confirm');
    this.emailInput = page.locator('#email');
    this.submitButton = page.locator('.button1');
    this.errorMessage = page.locator('.error');
  }

  // functions
  async gotoHomePage() {
    await this.page.goto('https://www.veeam.com/');
  }

  async handlePopupIfVisible() {
    if (await this.closeBtn.isVisible()) {
      await this.closeBtn.waitFor({ state: 'visible' });
      await this.page.waitForTimeout(500);
      await this.closeBtn.click({ force: true });
    }
  }

  async navigateToForums() {
    await this.supportMenuItem.hover();
    await this.forumsLink.waitFor({ state: 'visible' });
    await this.forumsLink.click();
    await this.page.waitForLoadState('load');
    await this.page.click('text=Register');
  }

  async acceptForumTerms() {
    await this.page.waitForTimeout(500);
    await this.agreeCheckbox.waitFor({ state: 'visible' });
    await this.agreeCheckbox.click({ force: true });
  }

  async fillRegistrationForm({ username, password, email }) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.emailInput.fill(email);
  }

  async submitForm() {
    await this.page.waitForTimeout(500);
    await this.submitButton.click();
  }
};
