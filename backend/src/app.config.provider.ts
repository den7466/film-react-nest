export const configProvider = (): AppConfig => ({
  database: {
    url: process.env.DATABASE_URL || 'localhost',
    port: Number(process.env.DATABASE_PORT) || 5432,
    driver: process.env.DATABASE_DRIVER || 'postgres',
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    name: process.env.DATABASE_NAME || '',
  },
});

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  port: number;
  username: string;
  password: string;
  name: string;
}
