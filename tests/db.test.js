
import DB from '../server/palindrome/db';

describe('DB Tests', () => {

  let db;

  beforeEach(() => {
    db = new DB();
  });

  test('Test Adding Player to Database', () => {
    const playerName = 'test';

    const playersLadder = db.scorePoints(playerName, 5);

    expect(playersLadder.length).toBe(1);
  });

  test('Test DB Storing name and score', () => {
    const playerName = 'test';
    const points = 5;

    const playersLadder = db.scorePoints(playerName, points);

    expect(playersLadder[0].name).toBe(playerName);
    expect(playersLadder[0].points).toBe(points);
  });

  test('Test Ordering Rank', () => {
    db.scorePoints('p2', 2);
    db.scorePoints('p3', 3);
    db.scorePoints('p6', 6);
    db.scorePoints('p1', 1);
    db.scorePoints('p5', 5);
    db.scorePoints('p4', 4);

    const playerLadder = db.getLeaderboard();

    for (let x = 1; x <= 6; x++) {
      expect(playerLadder[x - 1].name).toBe(`p${x}`);
    }
  });
});
