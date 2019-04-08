import DB from '../server/palindrome/db';
import PalindromeController from '../server/palindrome/controller';

describe('PalindromeController Tests', () => {
  const db = new DB();
  const palindromeController = new PalindromeController(db);

  beforeEach(() => {
    db.createArray();
  });

  describe('Palindrome Check Function', () => {
    test('Test Palindrome Check', () => {
      const testString = 'a man a plan a canal panama';

      const points = palindromeController._getPointsFromPalindrome(testString);

      expect(points).toBeGreaterThanOrEqual(0);
    });

    test('Test Palindrome Point Count', () => {
      const testString = 'bob';

      const points = palindromeController._getPointsFromPalindrome(testString);

      expect(points).toBe(3);
    });

    test('Test For no Whitespace Cheating', () => {
      const str1 = 'bob';
      const str2 = ' b o b ';

      const points1 = palindromeController._getPointsFromPalindrome(str1);
      const points2 = palindromeController._getPointsFromPalindrome(str2);

      expect(points1).toBe(points2);
    });

    test('Test No Points on Invalid Word', () => {
      const testString = 'invalid palindrome';

      const points = palindromeController._getPointsFromPalindrome(testString);

      expect(points).toBe(0);
    });
  });

  describe('Test Leaderboard', () => {
    test('Test Getting Top Players', () => {
      for (let x = 1; x <= 10; x++) {
        db.scorePoints(`p${x}`, x);
      }
      const limit = 3;

      const topPlayers = palindromeController.getTopPlayers(limit);

      expect(topPlayers[0].name).toBe('p10');
      expect(topPlayers.length).toBe(limit);
    });

    test('Test Getting Top Players with smaller array then limit', () => {
      db.scorePoints('A', 3);
      db.scorePoints('A', 3);
      db.scorePoints('A', 3);

      const topPlayers = palindromeController.getTopPlayers(5);

      expect(topPlayers.length).toBe(3);
    });
  });
});
