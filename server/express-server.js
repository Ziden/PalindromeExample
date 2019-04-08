
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import { Container, DependencyBuilder } from 'slim-dependency-injector';

import DB from './palindrome/db';
import { registerService } from './express-service';
import PalindromeService from './palindrome/service';
import PalidromeController from './palindrome/controller';

export default class ExpressServer {
  constructor(port) {
    this.express = express();
    this.port = port;
    this.services = [];
  }

  /**
  * Defines the services to be exposed by the server.
  */
  buildServices() {
    this.services.push(Container.get(PalindromeService));
  }

  /**
  * Configurie dependencies.
  */
  configureDependencyInjection() {
    const dependencyBuilder = new DependencyBuilder();
    dependencyBuilder
      .whenBuild(PalidromeController)
      .inject(DB);

    dependencyBuilder
      .whenBuild(PalindromeService)
      .inject(PalidromeController);
  }

  /**
   * Starts the server backend and frontend.
   */
  startServer() {
    this.express.use(express.static(path.join(__dirname, '/..')));
    this.express.use(bodyParser.json());

    this.express.get('/', (req, res) => {
      const renderIndex = path.join(__dirname, '/../index.html');
      res.render(renderIndex);
    });

    this.configureDependencyInjection();
    this.buildServices();
    this.services.forEach(service => registerService(service, this.express));

    this.express.listen(this.port, () => {
      console.log('Server pid', process.pid, 'listening on port', this.port);
    });
  }

  /**
   * Returns the node express instance
   */
  getNodeServer() {
    return this.express;
  }
}
