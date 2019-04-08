
import async from 'async';
import request from 'supertest';

import ExpressServer from '../server/express-server';

describe('Sanity Test', () => {
  test('Running Sanity', done => {
    var expressServer = new ExpressServer(3000);
    expressServer.startServer();
    
    var nodeServer = expressServer.getNodeServer();

    const timeoutSeries = async.timeout(async.series, 5000);

    timeoutSeries([

      // Scores should be empty at start
      cb => request(nodeServer).get('/api/getScores')
        .expect(200, [], cb),

      // Submiting invalid entry should return 0 points
      cb => request(nodeServer).post('/api/submitEntry')
        .send({ name: 'john', word: 'invalid_word' })
        .expect(200, '0', cb),

      // scores should not take invalid entry into account
      cb => request(nodeServer).get('/api/getScores')
        .expect(200, [], cb),

      // submiting a valid 3 point entry
      cb => request(nodeServer).post('/api/submitEntry')
        .send({ name: 'john', word: 'bob' })
        .expect(200, '3', cb),

      // should be taken the score into account
      cb => request(nodeServer).get('/api/getScores')
        .expect(200, [{ name: 'john', points: 3 }], cb),

      // submiting a 5 points one
      cb => request(nodeServer).post('/api/submitEntry')
        .send({ name: 'winner', word: 'bobob' })
        .expect(200, '5', cb),

      // winner should be first in the list after submiting
      cb => request(nodeServer).get('/api/getScores')
        .expect(200, [
          { name: 'winner', points: 5 },
          { name: 'john', points: 3 },
        ], cb),

    ], done);
  });
});
