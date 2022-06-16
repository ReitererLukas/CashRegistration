import fs from "fs"


function read(secret: any) {
  try {
    return fs.readFileSync(`${secret}`, 'utf8');
  } catch (err: any) {
    if (err.code !== 'ENOENT') {
      console.error(`An error occurred while trying to read the secret: ${secret}. Err: ${err}`);
    } else {
      console.debug(`Could not find the secret, probably not running in swarm mode: ${secret}. Err: ${err}`);
    }
    return false;
  }
};

function readSecrets() {
  process.env.stage = process.env.NODE_ENV_STAGE;
  process.env.token = read(process.env.NODE_EMV_API_TOKEN_FILE) || process.env.NODE_EMV_API_TOKEN
}

export default readSecrets;