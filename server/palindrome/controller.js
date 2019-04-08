export default class GameController {
  constructor(database) {
    this.db = database;
  }

  /**
  * Process player input. Will score points for the player if the input
  * word is a palindrome.
  * @param {string} payerName     Name of the playng player.
  * @param {string} word          Word thats being submited.
  * @return {number}              The amount of points the player scored.
  */
  processPlayerEntry(playerName, word) {
    const points = this._getPointsFromPalindrome(word);
    if (points > 0) {
      this.db.scorePoints(playerName, points);
    }
    return points;
  }

  /**
  * Get the amount of points a player will score by checking
  * if that word is a Palindrome and stores the resulting points
  * in database in case it is.
  * @param  {number} limit      How many players will have this list.
  * @return {Array}             An sorted array of players by their points
  */
  getTopPlayers(limit) {
    const leaderboard = this.db.getLeaderboard();
    if (leaderboard.length < limit)
      limit = leaderboard.length;

    return leaderboard
      .slice(leaderboard.length - limit, leaderboard.length)
      .reverse();
  }

  /**
  * Checks if a word is a palindrome, then return the length of the palindrome
  * string if it is or 0 if its not.
  * Will not take spaces into account.
  * @param {string} str            String to be checked
  * @return {number}               The length of the stripped string
  */
  _getPointsFromPalindrome(str) {
    str = str.replace(/ /g, '');
    const len = Math.floor(str.length / 2);
    for (let i = 0; i < len; i++)
      if (str[i] !== str[str.length - i - 1])
        return 0;
    return str.length;
  }
}
