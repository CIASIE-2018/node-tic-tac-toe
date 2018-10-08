const uuidv4 = require("uuid/v4");
const {
  Game,
  GameFullError,
  PlayersMustBeDifferentError,
  GameNotStartedError,
  GameFinishedError
} = require("./Game");

const initializeGame = () => {
  const game = new Game();

  const player1 = uuidv4();
  game.join(player1);

  const player2 = uuidv4();
  game.join(player2);

  return game;
};

describe("Game", () => {
  test("two players can join the game", () => {
    const game = new Game();

    const player1 = uuidv4();
    game.join(player1);
    expect(game.player1).toBe(player1);

    const player2 = uuidv4();
    game.join(player2);
    expect(game.player2).toBe(player2);
  });

  test("the two players must be different from eachother", () => {
    const game = new Game();

    const player1 = uuidv4();
    game.join(player1);

    expect(() => {
      game.join(player1);
    }).toThrowError(PlayersMustBeDifferentError);
  });

  test("there can be only two players", () => {
    const game = initializeGame();

    const player3 = uuidv4();

    expect(() => {
      game.join(player3);
    }).toThrowError(GameFullError);
  });

  test("I cannot play outside the board", () => {
    const game = initializeGame();
    expect(() => {
      game.play(game.player1, 1, 17);
    }).toThrowError(RangeError);
  });

  test("I can only play when both players joined", () => {
    const game = new Game();

    const player1 = uuidv4();
    game.join(player1);

    expect(() => {
      game.play(player1, 1, 1);
    }).toThrowError(GameNotStartedError);
  });

  test("it played where I asked to play", () => {
    const game = initializeGame();

    game.play(game.player1, 1, 1);

    expect(game.board).toEqual([
      [null, null, null],
      [null, game.player1, null],
      [null, null, null]
    ]);
  });

  test("it detects winner on horizontal row", () => {
    const game = initializeGame();
    game.board = [
      [null, null, null],
      [game.player1, game.player1, game.player1],
      [null, null, null]
    ];
    expect(game.player1).not.toBe(undefined);
    expect(game.hasWinner()).toBe(game.player1);
  });

  test("it detects winner on vertical row", () => {
    const game = initializeGame();
    game.board = [
      [null, null, game.player1],
      [null, null, game.player1],
      [null, null, game.player1]
    ];
    expect(game.player1).not.toBe(undefined);
    expect(game.hasWinner()).toBe(game.player1);
  });

  test("it detects winner on diagonals", () => {
    const game = initializeGame();
    game.board = [
      [null, null, game.player1],
      [null, game.player1, null],
      [game.player1, null, null]
    ];
    expect(game.player1).not.toBe(undefined);
    expect(game.hasWinner()).toBe(game.player1);
  });

  test("I cannot play when game is over", () => {
    const game = initializeGame();
    game.board = [
      [null, null, game.player1],
      [null, game.player1, null],
      [game.player1, null, null]
    ];
    expect(() => {
      game.play(game.player1, 1, 1);
    }).toThrowError(GameFinishedError);
  });

  test("it initializes who plays first", () => {
    const game = initializeGame();
    expect(game.player1).not.toBe(undefined);
    expect(game.player2).not.toBe(undefined);
    expect(game.turn === game.player1 || game.turn === game.player2).toBe(true);
  });

  test("it switches turns when playing", () => {
    const game = initializeGame();
    expect(game.player1).not.toBe(undefined);
    expect(game.player2).not.toBe(undefined);
    const startingPlayer = game.turn;
    game.play(startingPlayer, 1, 1);
    expect(startingPlayer).toEqual(game.turn);
  });
});
