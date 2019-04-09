import Config from './server/config';
import ExpressServer from './server/express-server';

new ExpressServer(Config.port).startServer();

