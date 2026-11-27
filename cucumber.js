module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['tsx/cjs'],
    require: ['src/support/**/*.ts', 'src/steps/**/*.ts'],
    language: 'fr',
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
    ],
    formatOptions: { snippetInterface: 'async-await' },
    publishQuiet: true,
    // Un scenario = un contexte de navigateur isole : le parallelisme reste donc possible.
    parallel: 1,
    retry: 0,
  },
};
