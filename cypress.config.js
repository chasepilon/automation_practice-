const { defineConfig } = require("cypress");

module.exports = defineConfig({
  downloadsFolder: 'downloads',
  fixturesFolder: 'fixtures',
  screenshotsFolder: 'screenshots',
  videosFolder: 'videos',
  defaultCommandTimeout: 30000,
  pageLoadTimeout: 90000,
  retries: {
    runMode: 2,
    openMode: 1,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://automationpractice.com/',
  },
});