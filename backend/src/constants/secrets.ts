export const SECRET = process.env.APP_SECRET as string;

export const SALT = process.env.APP_SALT ? +process.env.APP_SALT : 10;
