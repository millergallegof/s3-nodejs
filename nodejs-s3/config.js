import { config } from 'dotenv'

config()

export const NAME_BUCKET = process.env.NAME_BUCKET
export const REGION_BUCKET = process.env.REGION_BUCKET
export const ACCESKEY_USER_BUCKET = process.env.ACCESKEY_USER_BUCKET
export const SECRET_ACCESKEY_USER_BUCKET = process.env.SECRET_ACCESKEY_USER_BUCKET

console.log(
    NAME_BUCKET,
    REGION_BUCKET,
    ACCESKEY_USER_BUCKET,
    SECRET_ACCESKEY_USER_BUCKET
); 