import SortedArray from 'sorted-array';

export default class DB {
  constructor() {
    this.createArray();
  }

  /**
  * Get a sorted by points array of players.
  * @return {Array}  A points sorted array of {name: {string}, points: {number}}
  */
  getLeaderboard() {
    return this.playerLadder.array;
  }

  /**
  * Save the player points in the sorted array
  * @param {string} name    Name of the playng player.
  * @param {number} points  The amount of points to store
  * @return {Array} The modified sorted array of {name: '', points: 0}
  */
  scorePoints(name, points) {
    this.playerLadder.insert({
      name: name,
      points: points,
    });
    return this.playerLadder.array;
  }

  /**
  * Re-creates the array object defining to sort by its 'points' property.
  */
  createArray() {
    this.playerLadder = SortedArray.comparing('points', []);
  }
}
