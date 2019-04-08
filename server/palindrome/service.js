import Config from '../config.js';
import { serviceFunction, HTTP_CODES } from '../express-service';

export default class PalindromeService {
  constructor(controller) {
    this.controller = controller;
    this.path = '/api';
  }

  @serviceFunction('post', '/submitEntry')
  submitEntry(request, response) {
    var { name, word } = request.body;
    if (!name || !word)
      return response.status(HTTP_CODES.BAD_REQUEST);

    const points = this.controller.processPlayerEntry(name, word);
    response.status(HTTP_CODES.OK).send(points.toString());
  }

  @serviceFunction('get', '/getScores')
  getScores(request, response) {
    const topPlayers = this.controller.getTopPlayers(Config.top_players_limit);
    response.status(HTTP_CODES.OK).send(topPlayers);
  }
}
