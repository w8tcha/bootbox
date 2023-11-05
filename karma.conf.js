var baseConfig = require('./karma-base.conf');

module.exports = baseConfig({
	vendor: [
    'tests/vendor/bootstrap.bundle.min.js'
  ],
  src: ['dist/bootbox.js', 'dist/bootbox.locales.js']
});
