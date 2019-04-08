import PalindromeService from '../server/palindrome/service';

class StubRequest {
  constructor(body) {
    this.body = body;
  }
}

class StubResponse {
  status(statusCode) {
    this.statusCode = statusCode;
    return this;
  }

  send(data) {
    this.sentData = data;
    return this;
  }
}

describe('Palindrome Service Tests', () => {

  const palindromeController = jest.mock('../server/palindrome/controller');

  const palindromeService = new PalindromeService(palindromeController);
  test('Test submitEntry bad request when no data', () => {
    const response = new StubResponse();

    let request = new StubRequest({});
    palindromeService.submitEntry(request, response);
    expect(response.statusCode).toBe(400);

    request = new StubRequest({ name: 'Only Name' });
    palindromeService.submitEntry(request, response);
    expect(response.statusCode).toBe(400);

    request = new StubRequest({ word: 'Only Word' });
    palindromeService.submitEntry(request, response);
    expect(response.statusCode).toBe(400);
  });

  test('Test submitEntry correct 200 status code and return the points', () => {
    const response = new StubResponse();
    const request = new StubRequest({ name: 'Name', word: 'Word' });
    const returnData = 123;
    palindromeController.processPlayerEntry = (a, b) => { return returnData; };

    palindromeService.submitEntry(request, response);

    expect(response.statusCode).toBe(200);
    expect(response.sentData).toBe(returnData.toString());
  });

  test('Test getScores', () => {
    const response = new StubResponse();
    const request = new StubRequest();
    const topPlayers = [{ name: 'a', word: 'b' }];
    palindromeController.getTopPlayers = (a, b) => { return topPlayers; };

    palindromeService.getScores(request, response);

    expect(response.statusCode).toBe(200);
    expect(response.sentData).toBe(topPlayers);
  });
});
