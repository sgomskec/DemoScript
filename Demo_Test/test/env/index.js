const path = require('path');
const nconf = require('nconf');

const ROOT = __dirname;
const ENV = process.env.DEPLOY_ENV || 'development';

const provider = new nconf.Provider();
provider
  .argv()
  .env({
    separator: '__',
  })
  .file('user-file', path.join(ROOT, 'personal.config.json'))
  .file('env-file', path.join(ROOT, `${ENV}.config.json`))
  .file('default-file', path.join(ROOT, 'default.config.json'));
const config = provider.get();

module.exports = config;
