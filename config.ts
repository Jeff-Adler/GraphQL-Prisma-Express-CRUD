import { resolve } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: resolve(__dirname, `./envs/.env.${process.env.ENVIRONMENT}`) });
import convict from 'convict';

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  ip_address: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port',
  },
  db: {
    database_url: {
      doc: 'URL for postgres DB',
      format: String,
      default: '',
      env: 'DATABASE_URL',
    },
  },
});

const env = config.get('env');
config.loadFile(`./configs/${env}.json`);

config.validate({ allowed: 'strict' });

export default config;
