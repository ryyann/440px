const { Neutrino } = require('neutrino');
const config = require('./.neutrinorc');
const api = Neutrino();

const eslintrc = api.call('eslintrc', config.use);

// These properties break eslint 3.x when used by sublime-linter
// https://github.com/mozilla-neutrino/neutrino-dev/issues/265#issuecomment-309222538
delete eslintrc.cwd;
delete eslintrc.useEslintrc;

module.exports = eslintrc;
