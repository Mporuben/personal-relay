import { readFileSync } from 'node:fs';

let config!: Config;

export function getConfig() {
  return config;
}

export function readConfig() {
  try {
    console.log('Reading config');
    const file = readFileSync('./config.json', 'utf8');
    config = JSON.parse(file);
  } catch (error) {
    console.log(error);
  }
}

readConfig();

interface Config {
  port: number;
  host: string;
  integrations: {
    twilio: {
      accountSid: string;
      token: string;
      listener: Listener;
    };
    mail: {
      host: string;
      user: string;
      password: string;
      listener: Listener;
    };
    discord: {
      username: string;
      webhook: string;
      listener: Listener;
    };
  };
}

interface Listener {
  on: string;
  sendTo: string;
}
