exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  framework: 'cucumber',

  // Spec patterns are relative to this directory.
  specs: [
    'features/**/*'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:3000',

  cucumberOpts: {
    require: 'features/step_definitions/**/*.js',
    format: 'pretty',
    timeout: 20000
  }
};
