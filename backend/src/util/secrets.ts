import fs from "fs"


function read(secret: any) {
  try {
    return fs.readFileSync(`${secret}`, 'utf8');
  } catch (err: any) {
    return false;
  }
};

function readArray(secret: any): any {
  try {
    return fs.readFileSync(`${secret}`, 'utf8').split("\r\n");
  } catch (err: any) {
    return false;
  }
};


export const secrets = {
  stage: process.env.NODE_ENV_STAGE || "DEV",
  token_secret: read(process.env.NODE_ENV_API_TOKEN_FILE) || "tokenSecret",
  mails: readArray(process.env.NODE_ENV_MAILS_FILE) || []
};