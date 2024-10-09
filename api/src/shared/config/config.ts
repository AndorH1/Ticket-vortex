import * as convict from 'convict';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

interface FirebaseServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}

interface Config {
  server: {
    port: number;
    runSeeders: boolean;
    debugMode: boolean;
    targetLanguage: string;
  };
  db: {
    url: string;
  };
  auth: {
    jwtSecret: string;
  };
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPass: string;
    fromEmail: string;
  };
  firebase: {
    service_account: FirebaseServiceAccount;
  };
  clients: {
    web: {
      frontendUrl: string;
    };
  };
}

export const config = convict<Config>({
  server: {
    port: {
      doc: 'The port to bind',
      format: 'port',
      default: 3000,
      env: 'PORT',
    },
    runSeeders: {
      doc: 'If this value is true, run the seeders at start.',
      format: Boolean,
      default: false,
      env: 'RUN_SEEDERS',
    },
    debugMode: {
      doc: 'If this value is true, the logger is turned on.',
      format: Boolean,
      default: false,
      env: 'DEBUG_MODE',
    },
    targetLanguage: {
      doc: 'Application language',
      default: 'EN',
      format: String,
      env: 'TARGET_LANGUAGE',
    },
  },
  db: {
    url: {
      doc: 'The access url for mongodb',
      format: String,
      default: null,
      env: 'MONGO_DB_ACCESS_URL',
    },
  },
  auth: {
    jwtSecret: {
      doc: 'The secret used for signing JWT tokens',
      format: String,
      default: '',
      env: 'JWT_SIGNING_SECRET',
    },
  },
  email: {
    smtpHost: {
      doc: 'SMTP server host',
      format: String,
      default: '',
      env: 'SMTP_HOST',
    },
    smtpPort: {
      doc: 'SMTP server port',
      format: 'port',
      default: 587,
      env: 'SMTP_PORT',
    },
    smtpUser: {
      doc: 'SMTP server user',
      format: String,
      default: '',
      env: 'SMTP_USER',
    },
    smtpPass: {
      doc: 'SMTP server password',
      format: String,
      default: '',
      env: 'SMTP_PASS',
    },
    fromEmail: {
      doc: 'From email address',
      format: String,
      default: '',
      env: 'FROM_EMAIL',
    },
  },
  firebase: {
    service_account: {
      type: {
        doc: 'The service account type',
        format: String,
        default: '',
      },
      project_id: {
        doc: 'The Firebase project ID',
        format: String,
        default: '',
      },
      private_key_id: {
        doc: 'The Firebase private key ID',
        format: String,
        default: '',
      },
      private_key: {
        doc: 'The Firebase private key',
        format: String,
        default: '',
      },
      client_email: {
        doc: 'The Firebase client email',
        format: String,
        default: '',
      },
      client_id: {
        doc: 'The Firebase client ID',
        format: String,
        default: '',
      },
      auth_uri: {
        doc: 'The Firebase auth URI',
        format: String,
        default: '',
      },
      token_uri: {
        doc: 'The Firebase token URI',
        format: String,
        default: '',
      },
      auth_provider_x509_cert_url: {
        doc: 'The Firebase auth provider x509 cert URL',
        format: String,
        default: '',
      },
      client_x509_cert_url: {
        doc: 'The Firebase client x509 cert URL',
        format: String,
        default: '',
      },
      universe_domain: {
        doc: 'The Firebase universe domain',
        format: String,
        default: '',
      },
    },
    storageBucket: {
      doc: 'The Firebase storage bucket',
      format: String,
      default: '',
    },
  },
  clients: {
    web: {
      frontendUrl: {
        doc: 'The url of the frontend',
        format: String,
        default: 'http://localhost:3000',
        env: 'FRONTEND_URL',
      },
    },
  },
});

convict.addParser({ extension: ['yml', 'yaml'], parse: yaml.load });
const envFilePath = './.env.yml';
if (fs.existsSync(envFilePath)) {
  config.loadFile(envFilePath);
}
config.validate({ allowed: 'strict' });
