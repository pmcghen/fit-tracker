import { drizzle } from 'drizzle-orm/neon-http';

export const db = drizzle(process.env.DB_URL as string);
