import * as dotenv from 'dotenv';

dotenv.config();
const path = `${__dirname}/../../.env.${process.env.NODE_ENV}`;

dotenv.config({ path });

export const { AUTH_SECRET } = process.env;
export const { REFRESH_TOKEN_EXPIRATION_TIME } = process.env;
export const { ACCESS_TOKEN_EXPIRATION_TIME } = process.env;
export const { APP_WEB_URL } = process.env;
