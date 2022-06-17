import { routes } from '@/routes/index';
import { defaultExceptionHandler, exceptionHandler } from '@/util/exceptionHandler';
import bodyParser from 'body-parser';
import { exec } from 'child_process';
import cors from 'cors';
import express, { Express } from 'express';
import readSecrets from '@/util/secrets';

// replace by dev environment
if (process.env.NODE_ENV_STAGE != "PROD") {
  exec("reset.sh", (error, stdout, stderr) => {
    if (!error) {
      console.log("> Database seeded");
      console.log("> Starting API")
      startApi();
    }
  });
} else {
  console.log("123456789");
  // readSecrets();
  startApi();
}

function startApi() {

  const app: Express = express();
  const port: number = 3000;

  // third parthy middleware
  app.use(cors());
  app.use(bodyParser.json());

  // my middleware

  // routers
  app.use('/entries', routes.entry);
  app.use('/', routes.user);

  // exception handlers
  app.use(exceptionHandler);
  app.use(defaultExceptionHandler);


  app.listen(port, () => {
    console.log(`> API listening on port ${port}`);
  });

}

