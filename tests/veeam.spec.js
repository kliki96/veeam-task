const { test, expect } = require('@playwright/test');
const { veeamPage } = require('../pages/veeamPage');

test('Cannot register on Veeam R&D Forum with a public email', async ({
  page,
}) => {
  const veeam = new veeamPage(page);

  await veeam.gotoHomePage();
  await veeam.handlePopupIfVisible();
  await veeam.navigateToForums();
  await veeam.acceptForumTerms();

  await veeam.fillRegistrationForm({
    username: 'InterviewUser',
    password: 'InreviewUser',
    email: 'inreviewuser@gmail.com',
  });

  await veeam.submitForm();

  await expect(veeam.errorMessage).toContainText(
    'Public email are not allowed. Please, be aware that your domain or email address was banned.'
  );
});
