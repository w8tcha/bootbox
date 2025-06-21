var baseConfig = require('./karma-base.conf');

module.exports = baseConfig({
	vendor: [
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
  ],
  src: ['dist/bootbox.js', 'dist/bootbox.locales.js']
});
